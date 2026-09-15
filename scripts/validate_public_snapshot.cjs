'use strict';
// Validate the public snapshot's structure and integrity, not scientific truth.
// Node standard library only; run: node scripts/validate_public_snapshot.cjs
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const ROOT = path.resolve(__dirname, '..');

const read = rel => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/^\uFEFF/, ''));
const readText = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const posix = p => path.relative(ROOT, p).replaceAll('\\', '/');
const utf8 = new TextDecoder('utf-8', {fatal: true});

function* walk(dir, depth = 0) {
  for (const item of fs.readdirSync(dir, {withFileTypes: true})) {
    if (item.isDirectory()) {
      if (['.git', '__pycache__', 'node_modules'].includes(item.name)) continue;
      if (depth === 0 && ['.paper-build', '.pnpm-store', '.pnpm-cache', '.browsers', '.public-export'].includes(item.name)) continue;
      yield* walk(path.join(dir, item.name), depth + 1);
    } else yield path.join(dir, item.name);
  }
}

function validate() {
  const manifest = read('PUBLICATION_MANIFEST.json');
  const entries = new Map(manifest.files.map(e => [e.path, e]));
  assert.equal(entries.size, manifest.files.length, 'Duplicate manifest path');
  const actual = new Set([...walk(ROOT)].map(posix));
  const expected = new Set([...entries.keys(), 'PUBLICATION_MANIFEST.json']);
  const unlisted = [...actual].filter(p => !expected.has(p));
  const missing = [...expected].filter(p => !actual.has(p));
  assert(!unlisted.length && !missing.length,
    `File inventory differs from the public manifest: ${unlisted.length} not allowlisted, ` +
    `${missing.length} missing (e.g. ${[...unlisted, ...missing].slice(0, 5).join(', ')})`);

  const forbiddenExtensions = new Set(['.pdf', '.epub', '.djvu', '.mobi', '.mp3', '.mp4', '.wav',
    '.png', '.jpg', '.jpeg', '.webp', '.zip', '.7z', '.sqlite', '.db', '.pem', '.key']);
  const forbiddenParts = new Set(['downloaded papers', 'tmp', 'cache', 'screenshots', 'source_text',
    'source_texts', 'extracted_text', 'downloads', 'input_snapshots', 'versions', '.env']);
  // The two project-owned site identity images are the sole binary exemption;
  // their exact bytes are pinned by the release record (favicon_sha256,
  // social_image_sha256), and the hash/size checks above still apply.
  const siteImageFiles = new Set(['paper/favicon.png', 'paper/social-preview.jpg']);
  const privatePath = /[A-Za-z]:[\\/]+Users[\\/]+|(?:file|sandbox):\/\//i;
  const secret = /(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----)/;
  for (const [rel, entry] of entries) {
    const p = path.join(ROOT, rel);
    assert(!path.relative(ROOT, p).startsWith('..') && fs.existsSync(p), `Unsafe or missing: ${rel}`);
    const body = fs.readFileSync(p);
    assert.equal(crypto.createHash('sha256').update(body).digest('hex'), entry.sha256, `Hash mismatch: ${rel}`);
    assert.equal(body.length, entry.bytes, `Size mismatch: ${rel}`);
    if (siteImageFiles.has(rel)) continue;
    const suffix = path.extname(rel).toLowerCase();
    assert(!forbiddenExtensions.has(suffix), `Source binary or secret file: ${rel}`);
    assert(!rel.split('/').some(part => forbiddenParts.has(part)), `Private category: ${rel}`);
    let text;
    try { text = utf8.decode(body); } catch { assert.fail(`Not valid UTF-8: ${rel}`); }
    // Validator code legitimately contains the detection patterns themselves.
    if (suffix !== '.py' && rel !== 'scripts/validate_public_snapshot.cjs') {
      assert(!privatePath.test(text), `Local path remaining: ${rel}`);
      assert(!secret.test(text), `Credential-like content: ${rel}`);
    }
    if (suffix === '.json') JSON.parse(text);
  }

  const sets = {}, data = {};
  for (const [name, field] of [['sources', 'source_id'], ['claims', 'claim_id'],
                               ['cases', 'case_id'], ['arguments', 'argument_id']]) {
    const rows = read(`records/${name}.json`);
    const ids = new Set(rows.map(r => r[field]));
    assert.equal(ids.size, rows.length, `Duplicate ${field}`);
    sets[name] = ids;
    data[name] = rows;
  }
  for (const name in data) {
    for (const row of data[name]) {
      for (const [key, target] of [['source_ids', 'sources'], ['claim_ids', 'claims'], ['case_ids', 'cases'],
                                   ['supporting_claim_ids', 'claims'], ['conflicting_claim_ids', 'claims'],
                                   ['dependency_argument_ids', 'arguments']]) {
        for (const id of row[key] || [])
          assert(sets[target].has(id), `Unresolved ${key}: ${row.claim_id ?? row.argument_id ?? name}`);
      }
    }
  }

  const tasks = read('state/tasks.json');
  const byId = new Map(tasks.map(t => [t.id, t]));
  assert.equal(byId.size, tasks.length, 'Duplicate task ID');
  const done = new Set(), visiting = new Set();
  const visit = id => {
    assert(byId.has(id), `Missing dependency: ${id}`);
    if (done.has(id)) return;
    assert(!visiting.has(id), `Dependency cycle: ${id}`);
    visiting.add(id);
    for (const dep of byId.get(id).dependencies) visit(dep);
    visiting.delete(id);
    done.add(id);
  };
  for (const id of byId.keys()) visit(id);

  const status = read('state/public_status.json');
  const p2 = tasks.filter(t => t.id.startsWith('P2'));
  assert.equal(p2.length, status.phase2_total_tasks);
  assert.equal(p2.filter(t => t.status === 'accepted').length, status.phase2_accepted_tasks);
  assert.equal(status.current_reviewed_release, 'retired');
  // P3G2 (work/P3G2/gate_decision.md; state/acceptance_P3G2.json) closed
  // P2R20 and P2G2 and adjudicated P2S01-P2S03 at their rebased scope, so
  // Phase 2 is complete and the draft lists no pending reviews. The article
  // remains an authorized working draft with scientific_acceptance false.
  assert.equal(status.phase2_completed, true);
  assert.equal(byId.get('P2S02').status, 'accepted');
  assert.equal(status.current_public_draft.stage, 'draft');
  assert.equal(status.current_public_draft.scientific_acceptance, false);
  assert.deepEqual(status.current_public_draft.pending_reviews, []);
  assert.equal(byId.get('P2S03').status, 'accepted');

  // Phase 3 thesis programme: structure and crosswalk integrity (build-time
  // validation in scripts/thesis/build.cjs is stricter; this is the light check).
  const thesis = read('thesis/thesis.json');
  const paraIds = new Set();
  const parts = [];
  for (const item of [...thesis.chapters, ...thesis.appendices]) {
    const rel = `thesis/${item.file}`;
    assert(fs.existsSync(path.join(ROOT, rel)), `Missing thesis part: ${item.file}`);
    const name = path.basename(item.file);
    const prefix = item.file.startsWith('chapters/') ? `c${name.slice(0, 2)}` : `ap${name[0]}`;
    const text = readText(rel);
    assert(/^---\r?\n/.test(text), `Thesis part lacks front matter: ${item.file}`);
    const partStatus = text.match(/^status:\s*(\S+)$/m);
    assert(partStatus && ['skeleton', 'drafted', 'submitted', 'accepted'].includes(partStatus[1]),
      `Invalid thesis part status: ${item.file}`);
    const own = new Set();
    for (const [, pid] of text.matchAll(/<!--\s*id:\s*(\S+)\s*-->/g)) {
      assert(/^(c\d{2}|ap[A-Z])-p\d{3}$/.test(pid), `Bad paragraph id ${pid} in ${item.file}`);
      assert(pid.startsWith(`${prefix}-`), `Paragraph id ${pid} has the wrong prefix in ${item.file}`);
      assert(!paraIds.has(pid), `Duplicate thesis paragraph id: ${pid}`);
      paraIds.add(pid);
      own.add(pid);
    }
    parts.push({prefix, status: partStatus[1], own});
  }
  const recordIds = new Set([...sets.sources, ...sets.claims, ...sets.cases, ...sets.arguments]);
  // One crosswalk file per thesis part in thesis/crosswalk/; no strays, no misses.
  assert.deepEqual(new Set(fs.readdirSync(path.join(ROOT, 'thesis/crosswalk'))),
    new Set(parts.map(part => `${part.prefix}.json`)), 'thesis/crosswalk/ must hold exactly one file per part');
  for (const part of parts) {
    const crosswalk = read(`thesis/crosswalk/${part.prefix}.json`);
    assert.equal(crosswalk.thesis_version, thesis.version, `Crosswalk version mismatch: ${part.prefix}`);
    assert.equal(crosswalk.part, part.prefix, `Crosswalk part mismatch: ${part.prefix}`);
    const seen = new Set();
    for (const entry of crosswalk.entries) {
      assert(part.own.has(entry.paragraph_id), `Crosswalk names missing or foreign paragraph: ${entry.paragraph_id}`);
      assert(!seen.has(entry.paragraph_id), `Duplicate crosswalk entry: ${entry.paragraph_id}`);
      seen.add(entry.paragraph_id);
      assert(entry.refs.length, `Empty crosswalk refs: ${entry.paragraph_id}`);
      for (const ref of entry.refs)
        assert(ref.startsWith('PREMISE:') || recordIds.has(ref), `Unresolved crosswalk ref: ${ref}`);
    }
    if (part.status !== 'skeleton')
      for (const pid of part.own)
        assert(seen.has(pid), `Unmapped paragraph in non-skeleton part ${part.prefix}: ${pid}`);
  }

  const p3 = tasks.filter(t => t.id.startsWith('P3'));
  const p3Statuses = new Set(['planned', 'ready', 'in_progress', 'submitted', 'reviewing',
                              'revision_needed', 'accepted', 'blocked']);
  assert(p3.every(t => p3Statuses.has(t.status)), 'Invalid P3 task status');
  // Status prose is commentary; state/*.json and front matter are the single source.
  assert.equal(status.phase3.total_tasks, p3.length, 'phase3.total_tasks differs from state/tasks.json');
  assert.equal(status.phase3.accepted_tasks, p3.filter(t => t.status === 'accepted').length);
  const drafted = parts.filter(part => part.prefix.startsWith('c') && part.prefix !== 'c00'
    && part.status !== 'skeleton').length;
  assert.equal(status.phase3.chapters_drafted, drafted, 'chapters_drafted differs from thesis front matter');
  const statusMd = readText('STATUS.md');
  assert(statusMd.includes(`${status.phase2_accepted_tasks} of ${status.phase2_total_tasks} assignments accepted`),
    'STATUS.md acceptance count differs from state/tasks.json');
  const draftVersion = status.current_public_draft.version;
  assert(statusMd.includes(`(version ${draftVersion})`), 'STATUS.md names a different draft version');
  const paperMeta = readText('paper/paper.html').match(/<meta name="paper-version" content="([^"]+)"/);
  assert(paperMeta && paperMeta[1] === draftVersion, 'paper.html version differs from public status');
  // paper/lay_crosswalk.json names the article version it maps; the paper
  // pipeline rejects a mismatch, and site 0.4.6 was pushed with the field
  // still at 0.4.5, so the check runs here before any push.
  assert.equal(JSON.parse(readText('paper/lay_crosswalk.json')).paper_version, draftVersion,
    'paper/lay_crosswalk.json paper_version differs from the public draft version');
  assert.equal(JSON.parse(readText('paper/draft-release.json')).version, draftVersion,
    'paper/draft-release.json version differs from the public draft version');

  // Site entry pages must describe the same release state as the records.
  // thesis-v1.0.0 shipped with a start page that still called the thesis
  // incomplete and P2R20/P2G2 pending; nothing checked the prose, so the
  // published words and the gate records disagreed. These assertions bind
  // the reader-facing pages to state/public_status.json and thesis/thesis.json.
  const thesisConfig = read('thesis/thesis.json');
  const pages = Object.fromEntries(['paper/landing.html', 'paper/companion.html', 'paper/paper.html', 'paper/methodology.html']
    .map(rel => [rel, readText(rel)]));
  if (status.current_public_draft.pending_reviews.length === 0) {
    for (const [rel, text] of Object.entries(pages)) {
      assert(!/P2R20[^.]*remain(?:s)? pending|remain(?:s)? pending[^.]*P2R20/i.test(text),
        `${rel} still says P2R20/P2G2 remain pending after the recorded P3G2 closure`);
    }
  }
  if (thesisConfig.stage === 'released') {
    assert.equal(status.thesis_release?.stage, 'released', 'public_status thesis_release.stage must be released');
    assert.equal(status.thesis_release?.version, thesisConfig.version, 'public_status thesis_release.version differs from thesis.json');
    for (const [rel, text] of Object.entries(pages)) {
      assert(!/incomplete thesis|thesis expansion \(incomplete\)|not yet written|remain(?:s)? placeholders|marked as skeletons/i.test(text),
        `${rel} still describes the released thesis as incomplete`);
    }
    assert(/Thesis \(released/.test(pages['paper/landing.html']), 'landing.html must present the thesis as released');
  }

  // Historical reports intentionally retain links to omitted audit/source files.
  // New public entry points must link to material present in this snapshot.
  for (const rel of ['README.md', 'CURRENT_RELEASE.md', 'START_HERE.md', 'REPORTS.md', 'records/README.md']) {
    const text = readText(rel);
    for (const [, target] of text.matchAll(/\]\(([^)]+)\)/g)) {
      if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#')) continue;
      const resolved = path.join(ROOT, path.dirname(rel), decodeURIComponent(target.split('#')[0]));
      assert(fs.existsSync(resolved), `Broken entry-point link: ${rel} -> ${target}`);
    }
  }

  // The derived evidence layer is published alongside the ledgers; a snapshot
  // may never carry derived views that disagree with the canonical records.
  // checkProblems regenerates the views in memory from this tree's own inputs
  // and reports any file that differs, is missing or is stray.
  const derivedProblems = require('./derived/build.cjs').checkProblems();
  assert(!derivedProblems.length, 'Derived evidence layer is stale ' +
    `(${derivedProblems.length} problem(s), e.g. ${derivedProblems.slice(0, 3).join('; ')}); ` +
    'run node scripts/derived/build.cjs --sync-manifest');

  console.log(`Validated ${actual.size} public files, ${tasks.length} tasks, ` +
    `${sets.sources.size} sources, ${sets.claims.size} claims, ` +
    `${sets.arguments.size} arguments and ${sets.cases.size} cases.`);
  console.log('Working draft in paper/ is the public manuscript; former Version 1 files are retired.');
  console.log('This is a structural and publication-boundary check, not scientific verification.');
}

if (require.main === module) {
  try {
    validate();
  } catch (error) {
    console.error(`Validation failed: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {validate};
