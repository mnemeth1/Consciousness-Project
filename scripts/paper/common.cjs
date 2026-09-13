'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const ROOT = path.resolve(__dirname, '../..');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const readJSON = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
const writeJSON = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const HASH = /^[a-f0-9]{64}$/;
const COMMIT = /^[a-f0-9]{40}$/;
const requiredIDs = ['paper', 'paper-title', 'authors', 'ai-disclosure', 'abstract',
  'introduction', 'methods', 'findings', 'discussion', 'limitations', 'conclusion', 'references',
  'paper-version', 'paper-date', 'publication-status', 'download-pdf'];
function inside(root, relative) {
  assert(typeof relative === 'string' && relative && !relative.includes('\\'), 'Use a relative POSIX path');
  const file = path.resolve(root, relative);
  const rel = path.relative(root, file);
  assert(rel && !rel.startsWith('..') && !path.isAbsolute(rel), 'Path escapes root');
  let current = path.resolve(root);
  for (const part of rel.split(path.sep)) {
    current = path.join(current, part);
    if (fs.existsSync(current)) assert(!fs.lstatSync(current).isSymbolicLink(), 'No symlinked source/output path');
  }
  return file;
}
function regular(file) {
  assert(fs.lstatSync(file).isFile() && !fs.lstatSync(file).isSymbolicLink(), `Not a regular file: ${file}`);
  return fs.readFileSync(file);
}
function recipe(root = ROOT) {
  const files = ['package.json', 'pnpm-lock.yaml', 'scripts/paper/toolchain.json',
    'scripts/paper/common.cjs', 'scripts/paper/build.cjs'];
  return sha(files.map(rel => `${rel}\0${sha(regular(inside(root, rel)))}\n`).join(''));
}
function status(root = ROOT) {
  const source = fs.existsSync(path.join(root, 'paper/paper.html'));
  const review = fs.existsSync(path.join(root, 'paper/reviewed-release.json'));
  const draft = fs.existsSync(path.join(root, 'paper/draft-release.json'));
  assert(!(review && draft), 'Draft and reviewed release records cannot coexist');
  if (!source && !review && !draft) return {state: 'waiting', reason: 'No HTML paper supplied. Nothing will be published.'};
  assert(source, 'Release record exists without paper HTML');
  if (draft) return {state: 'draft-candidate', reason: 'Explicit working-draft publication authorization requires validation.'};
  return {state: review ? 'candidate' : 'draft', reason: review ? 'Review record requires validation.' : 'Draft may be built, never published.'};
}
function validateChangelog(root, meta) {
  const changelog = regular(path.join(root, 'paper/CHANGELOG.md')).toString('utf8');
  const marker = `## ${meta.version} - ${meta.date}`;
  const section = changelog.split(marker);
  assert.equal(section.length, 2, 'Require one exact version/date changelog heading');
  assert(section[1].split(/^## /m)[0].trim().length >= 20, 'Document the release changes');
}
function validateDraft(root, meta, htmlHash, rendererHash) {
  assert.equal(status(root).state, 'draft-candidate', 'Explicit draft authorization required');
  const draft = readJSON(path.join(root, 'paper/draft-release.json'));
  assert.equal(draft.schema, 1);
  assert.equal(draft.status, 'authorized-draft', 'Explicit draft publication authorization required');
  assert.equal(draft.fixture, false, 'A fixture cannot be published');
  assert.equal(draft.scientific_acceptance, false, 'Working draft must not claim scientific acceptance');
  assert.deepEqual(draft.pending_reviews, ['P2R20', 'P2G2'], 'Final review and release adjudication remain pending');
  assert.equal(meta.stage, 'draft', 'Working draft must retain draft stage');
  validateDraftPresentation(meta, draft.presentation);
  assert.equal(draft.version, meta.version, 'Draft version mismatch');
  assert(SEMVER.test(draft.version), 'Stable numeric semantic draft version required');
  assert.equal(draft.date, meta.date, 'Draft date mismatch');
  assert.equal(draft.html_sha256, htmlHash, 'Authorized draft HTML hash mismatch');
  assert.equal(draft.renderer_sha256, rendererHash, 'Authorized draft renderer hash mismatch');
  assert(draft.author?.trim() && draft.publication_authorized_by?.trim(), 'Draft author and publication authorizer required');
  assert(draft.authorization?.trim().length >= 20, 'Record the actual user publication authorization');
  validateChangelog(root, meta);
  return draft;
}
function validateDraftPresentation(meta, authorizedPresentation) {
  const presentation = meta.presentation ?? null;
  assert([null, 'research-article'].includes(presentation), 'Unsupported paper presentation');
  assert.equal(authorizedPresentation ?? null, presentation, 'Draft presentation authorization mismatch');
  if (presentation === 'research-article') {
    assert(typeof meta.title === 'string' && meta.title.trim() && !/P2R20|P2G2|Phase\s*2\s*working\s*draft/i.test(meta.title),
      'Research article requires an ordinary scholarly title');
  } else {
    assert(/^Phase 2 working draft(?:[: -]|$)/.test(meta.title), 'Title must conspicuously identify Phase 2 working draft; Working-draft label required');
  }
}
function validateReview(root, meta, htmlHash, rendererHash) {
  assert(!fs.existsSync(path.join(root, 'paper/draft-release.json')), 'Draft and reviewed release records cannot coexist');
  const review = readJSON(path.join(root, 'paper/reviewed-release.json'));
  assert.equal(review.schema, 1, 'Review schema');
  assert.equal(review.status, 'approved', 'Explicit approval required');
  assert.equal(review.version, meta.version, 'Review version mismatch');
  assert.equal(review.date, meta.date, 'Review date mismatch');
  assert.equal(review.html_sha256, htmlHash, 'Reviewed HTML hash mismatch');
  assert.equal(review.renderer_sha256, rendererHash, 'Reviewed renderer hash mismatch');
  assert(HASH.test(review.pdf_sha256), 'Exact reviewed Linux PDF hash required');
  assert.equal(review.fixture, false, 'Real release must explicitly exclude fixture');
  assert.equal(meta.stage, 'reviewed', 'Published HTML must carry reviewed presentation status');
  assert(review.author && review.reviewer && review.adjudicator, 'Name accountable author, reviewer and adjudicator');
  assert.notEqual(review.author, review.reviewer, 'Author cannot independently review own paper');
  const presentation = review.presentation;
  assert(presentation && HASH.test(presentation.scientifically_reviewed_html_sha256), 'Scientific review HTML hash required');
  assert.equal(presentation.published_html_sha256, htmlHash, 'Published presentation hash mismatch');
  if (presentation.scientifically_reviewed_html_sha256 !== htmlHash) {
    assert.equal(presentation.change_kind, 'presentation-only', 'A substantive change requires renewed scientific review');
    assert.equal(presentation.approved_by, review.reviewer, 'Reviewer must approve the mechanical presentation change');
    assert(presentation.change_summary?.trim().length >= 20, 'Document exact before/after presentation changes');
  }
  assert.equal(review.review_id, 'P2R20', 'Final review ID required');
  assert.equal(review.review_verdict, 'accept', 'Final review must recommend acceptance');
  assert.equal(review.gate_id, 'P2G2', 'Release adjudication ID required');
  assert.equal(review.gate_status, 'accepted', 'Release gate must actually be accepted');
  assert(/^\d{4}-\d{2}-\d{2}T/.test(review.reviewed_at) && Number.isFinite(Date.parse(review.reviewed_at)), 'Review timestamp required');
  assert.equal(review.records?.length, 2, 'Require public review and gate summaries');
  assert.deepEqual(new Set(review.records.map(x => x.id)), new Set(['P2R20', 'P2G2']));
  for (const record of review.records) {
    assert.equal(record.path, `paper/reviews/${record.id}.json`, 'Only sanitized public review records');
    assert(HASH.test(record.sha256), 'Review record hash required');
    const bytes = regular(inside(root, record.path));
    assert.equal(sha(bytes), record.sha256, 'Review evidence hash mismatch');
    const evidence = JSON.parse(bytes);
    assert.equal(evidence.id, record.id);
    assert.equal(evidence.version, meta.version);
    assert.equal(evidence.html_sha256, htmlHash);
    assert.equal(evidence.status, record.id === 'P2R20' ? 'accept' : 'accepted');
    assert(evidence.summary?.trim(), 'Human-readable review/gate summary required');
  }
  validateChangelog(root, meta);
  return review;
}
function assertSameRelease(previous, next) {
  for (const key of ['schema', 'version', 'date', 'title', 'fixture', 'mode', 'html_sha256',
    'pdf_sha256', 'renderer_sha256', 'review_sha256', 'draft_authorization_sha256', 'presentation']) {
    assert.deepEqual(previous[key], next[key], `Released version cannot be reused with different ${key}`);
  }
  assert(['release', 'draft-release'].includes(next.mode));
  assert.equal(next.fixture, false);
}
module.exports = {ROOT, sha, readJSON, writeJSON, SEMVER, HASH, COMMIT, requiredIDs, inside,
  regular, recipe, status, validateReview, validateDraft, validateDraftPresentation, assertSameRelease};
