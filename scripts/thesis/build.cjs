'use strict';
// Phase 3 thesis compiler: Markdown chapters -> per-chapter HTML + one stitched,
// self-contained thesis.html conforming to the paper security/structure contract.
// Standard library only; PDF rendering is delegated to the pinned paper pipeline:
//   node scripts/paper/cli.cjs build --source .paper-build/thesis/thesis.html \
//     --out .paper-build/thesis/site --mode preview
// This script validates the per-part thesis crosswalk files (paragraph -> record IDs)
// in thesis/crosswalk/ at build time.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const ROOT = path.resolve(__dirname, '../..');

const readText = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/^\uFEFF/, '');
const readJSON = rel => JSON.parse(readText(rel));
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const STATUSES = ['skeleton', 'drafted', 'submitted', 'accepted'];
const PARA_ID = /^(c\d{2}|ap[A-Z])-p\d{3}$/;
const RECORD_REF = /^(CL|A|C|S)-[A-Za-z0-9_-]+$/;
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

function parseFrontMatter(text, file) {
  const lines = text.split(/\r?\n/);
  assert.equal(lines[0], '---', `${file}: front matter must open with ---`);
  const end = lines.indexOf('---', 1);
  assert(end > 0, `${file}: front matter must close with ---`);
  const meta = {inputs: []};
  let inInputs = false;
  for (const line of lines.slice(1, end)) {
    if (!line.trim()) continue;
    const item = line.match(/^\s+-\s+(.+)$/);
    if (inInputs && item) { meta.inputs.push(item[1].trim()); continue; }
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    assert(kv, `${file}: unparseable front-matter line: ${line}`);
    inInputs = kv[1] === 'inputs';
    if (!inInputs) meta[kv[1]] = kv[2].trim();
  }
  return {meta, body: lines.slice(end + 1).join('\n')};
}

function parseBlocks(body, file) {
  const blocks = [];
  let pendingId = null, para = [];
  const flush = () => {
    if (para.length) { blocks.push({type: 'para', id: pendingId, text: para.join(' ')}); pendingId = null; para = []; }
  };
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trimEnd();
    const idMark = line.match(/^<!--\s*id:\s*([^\s]+)\s*-->$/);
    if (idMark) { flush(); pendingId = idMark[1]; continue; }
    assert(!/[<>]/.test(line.replace(/<!--.*?-->/g, '')), `${file}: raw HTML is not allowed in chapter text: ${line}`);
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flush();
      assert(heading[1].length >= 2, `${file}: use ## or deeper; the chapter title comes from front matter`);
      blocks.push({type: 'heading', level: heading[1].length, text: heading[2].trim()});
      continue;
    }
    const item = line.match(/^-\s+(.+)$/);
    if (item) {
      flush();
      if (blocks.at(-1)?.type !== 'list') blocks.push({type: 'list', items: []});
      blocks.at(-1).items.push(item[1].trim());
      continue;
    }
    if (!line.trim()) { flush(); continue; }
    para.push(line.trim());
  }
  flush();
  return blocks;
}

function inline(text, sources, cited, file) {
  let html = esc(text);
  html = html.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
  html = html.replace(/\[@(S-[A-Za-z0-9_-]+)\]/g, (_, id) => {
    assert(sources.has(id), `${file}: citation of unknown source record ${id}`);
    cited.add(id);
    return `<a href="#ref-${id}">[${id}]</a>`;
  });
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    assert(/^(https:\/\/|#)/.test(href), `${file}: only HTTPS or internal links: ${href}`);
    return `<a href="${esc(href)}">${label}</a>`;
  });
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(^|[\s(>])\*([^*]+)\*/g, '$1<em>$2</em>');
  return html;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function renderBlocks(blocks, prefix, meta, ctx) {
  // Wraps a Limitations heading and its content in <section id="limitations">.
  const out = [];
  let auto = 0, limitLevel = null;
  const closeLimits = () => { if (limitLevel !== null) { out.push('</section>'); limitLevel = null; } };
  for (const block of blocks) {
    if (block.type === 'heading') {
      if (limitLevel !== null && block.level <= limitLevel) closeLimits();
      if (block.text === 'Limitations') {
        assert(!ctx.limitationsSeen, 'Only one Limitations heading is permitted');
        ctx.limitationsSeen = true;
        limitLevel = block.level;
        out.push('<section id="limitations">');
        out.push(`<h${block.level + 1}>Limitations</h${block.level + 1}>`);
        continue;
      }
      const id = ctx.uniqueId(`${prefix}-${slugify(block.text)}`);
      out.push(`<h${block.level + 1} id="${id}">${inline(block.text, ctx.sources, ctx.cited, prefix)}</h${block.level + 1}>`);
    } else if (block.type === 'para') {
      let id = block.id;
      if (id) {
        assert(PARA_ID.test(id), `${prefix}: paragraph id ${id} must match cNN-pNNN or apX-pNNN`);
        assert(id.startsWith(`${prefix}-`), `${prefix}: paragraph id ${id} has the wrong chapter prefix`);
        assert(!ctx.paragraphIds.has(id), `Duplicate paragraph id ${id}`);
        ctx.paragraphIds.add(id);
      } else {
        assert(meta.status === 'skeleton', `${prefix}: every paragraph in a ${meta.status} chapter needs an explicit id`);
        id = ctx.uniqueId(`${prefix}-auto${++auto}`);
      }
      ctx.chapterParagraphs.push({id, explicit: !!block.id, status: meta.status, prefix});
      out.push(`<p id="${id}">${inline(block.text, ctx.sources, ctx.cited, prefix)}</p>`);
    } else if (block.type === 'list') {
      out.push('<ul>' + block.items.map(x => `<li>${inline(x, ctx.sources, ctx.cited, prefix)}</li>`).join('') + '</ul>');
    }
  }
  closeLimits();
  return out.join('\n');
}

function loadRecords() {
  const ledger = (file, field) => new Set(readJSON(`records/${file}`).map(r => r[field]));
  return {
    S: ledger('sources.json', 'source_id'),
    CL: ledger('claims.json', 'claim_id'),
    A: ledger('arguments.json', 'argument_id'),
    C: ledger('cases.json', 'case_id'),
  };
}

function validateCrosswalk(config, ctx, records, prefixes) {
  // One crosswalk file per thesis part (thesis/crosswalk/<prefix>.json): authors
  // edit only their own chapter's file and diffs stay reviewable per chapter.
  const files = fs.readdirSync(path.join(ROOT, 'thesis/crosswalk')).sort();
  assert.deepEqual(files, prefixes.map(p => `${p}.json`).sort(),
    'thesis/crosswalk/ must contain exactly one file per thesis part');
  const mapped = new Set();
  for (const prefix of prefixes) {
    const rel = `thesis/crosswalk/${prefix}.json`;
    const crosswalk = readJSON(rel);
    assert.equal(crosswalk.schema, 1, `${rel}: crosswalk schema must be 1`);
    assert.equal(crosswalk.thesis_version, config.version, `${rel}: describes a different thesis version`);
    assert.equal(crosswalk.part, prefix, `${rel}: part must be ${prefix}`);
    for (const entry of crosswalk.entries) {
      assert(PARA_ID.test(entry.paragraph_id), `${rel}: paragraph id invalid: ${entry.paragraph_id}`);
      assert(entry.paragraph_id.startsWith(`${prefix}-`), `${rel}: entry ${entry.paragraph_id} belongs to another part`);
      assert(!mapped.has(entry.paragraph_id), `Duplicate crosswalk entry: ${entry.paragraph_id}`);
      mapped.add(entry.paragraph_id);
      assert(ctx.paragraphIds.has(entry.paragraph_id), `Crosswalk names missing paragraph ${entry.paragraph_id}`);
      assert(Array.isArray(entry.refs) && entry.refs.length, `Crosswalk entry needs refs: ${entry.paragraph_id}`);
      for (const ref of entry.refs) {
        if (ref.startsWith('PREMISE:')) { assert(ref.length > 8, `Empty premise label: ${entry.paragraph_id}`); continue; }
        const match = ref.match(RECORD_REF);
        assert(match, `Crosswalk ref must be a record ID or PREMISE label: ${ref}`);
        assert(records[match[1]].has(ref), `Crosswalk ref not in ledgers: ${ref}`);
      }
    }
  }
  for (const para of ctx.chapterParagraphs) {
    if (para.status !== 'skeleton' && para.explicit)
      assert(mapped.has(para.id), `Paragraph ${para.id} in a ${para.status} chapter lacks a crosswalk entry`);
  }
  return mapped.size;
}

function bibliography(cited, ctx) {
  const rows = readJSON('records/sources.json').filter(r => cited.has(r.source_id));
  const body = rows.length
    ? rows.map(r => {
        const authors = (r.authors || []).join(', ');
        const date = r.publication_date ? ` ${esc(String(r.publication_date))}.` : '';
        const locator = /^https:\/\//.test(r.url_or_identifier || '')
          ? ` <a href="${esc(r.url_or_identifier)}">Source</a>.` : r.url_or_identifier ? ` ${esc(r.url_or_identifier)}.` : '';
        return `<p id="ref-${r.source_id}">[${r.source_id}] ${esc(authors)}.${date} ${esc(r.title)}.${locator}</p>`;
      }).join('\n')
    : '<p id="references-pending">The bibliography is generated from chapter citations against the source ledger; skeleton chapters carry no citations yet.</p>';
  return `<section id="references">\n<h2>References</h2>\n${body}\n</section>`;
}

const STYLE = '*{box-sizing:border-box}body{margin:0;background:#f1f2f1;color:#20262b;font:18px/1.65 Georgia,"Times New Roman",serif}main,nav{max-width:900px;margin:auto}main{padding:48px 60px 64px;background:white}nav{padding:18px 24px;font:15px/1.5 Arial,sans-serif}h1,h2,h3,h4{font-family:Arial,sans-serif;line-height:1.2;color:#203a49}h1{font-size:2.3rem;margin:0 0 24px}h2{font-size:1.4rem;margin:34px 0 16px}h3{font-size:1.1rem;margin:24px 0 14px}h4{font-size:1rem;margin:20px 0 12px}p{margin:0 0 17px}a{color:#075c75;text-underline-offset:.15em}.meta{font:14px/1.5 Arial,sans-serif;color:#48565f}.status{font:14px/1.6 Arial,sans-serif;color:#5a4a22;background:#faf5e6;border:1px solid #e3d5a8;border-radius:6px;padding:10px 14px;margin:16px 0 26px}#abstract{border-block:1px solid #bfcdd3;padding-bottom:8px}#references{font-size:.85em;overflow-wrap:anywhere}#references p{padding-left:1.4em;text-indent:-1.4em}em{font-style:italic}@media(max-width:640px){body{font-size:17px}main{padding:28px 23px 40px}h1{font-size:1.85rem}}@page{size:A4;margin:20mm 19mm 22mm}@media print{body{background:white;color:black;font-size:10.7pt;line-height:1.43}main{margin:0;padding:0;max-width:none}.screen-only{display:none}h1{font-size:23pt}h2{font-size:14pt;margin-top:20pt}h3{font-size:11.5pt}h4{font-size:10.5pt}h1,h2,h3,h4{break-after:avoid}p{orphans:3;widows:3}.meta,.status{font-size:9pt}#references{font-size:9pt}#references p{break-inside:avoid}a{color:#163f52}}';

function readPaperMeta() {
  const html = readText('paper/paper.html');
  const version = html.match(/<meta name="paper-version" content="([^"]+)"/);
  const date = html.match(/<meta name="paper-date" content="([^"]+)"/);
  assert(version && date, 'paper/paper.html must declare paper-version and paper-date');
  return {version: version[1], date: date[1]};
}

function remainingWorkBanner(front, numbered, appendices) {
  const parts = [{label: 'front matter', meta: front.meta},
    ...numbered.map(c => ({label: `chapter ${c.number} (${c.meta.title})`, meta: c.meta})),
    ...appendices.map(a => ({label: `Appendix ${a.meta.appendix}`, meta: a.meta}))];
  // A part is unwritten only while it is a skeleton; drafted or submitted parts
  // are written but await acceptance, and the banner must not conflate the two.
  const unwritten = parts.filter(p => p.meta.status === 'skeleton').map(p => p.label);
  const pending = parts.filter(p => p.meta.status === 'drafted' || p.meta.status === 'submitted').map(p => p.label);
  const gates = 'Coverage gate P3G1, whole-thesis review P3R20, and release adjudication P3G2 (which would close P2G2) have not been run; P2R20 remains pending. Chapter acceptance is methodological and does not establish a metaphysical result.';
  if (!unwritten.length && !pending.length) {
    return `<p class="status" id="remaining-work">This is a complete thesis working draft: every part has been drafted, independently reviewed and accepted within project procedure. It is not yet a released manuscript, not a substitute for the <a href="paper.html">research article</a>, and not an externally peer-reviewed publication. ${gates}</p>`;
  }
  const accepted = numbered.filter(c => c.meta.status === 'accepted').map(c => c.number);
  const acceptedSpan = accepted.length ? `chapters ${accepted[0]}–${accepted.at(-1)}` : 'no numbered chapters';
  let text = `This is an incomplete thesis working draft. It is not a finished manuscript, not a substitute for the <a href="paper.html">research article</a>, and not an externally peer-reviewed publication. ${acceptedSpan.charAt(0).toUpperCase()}${acceptedSpan.slice(1)} have been drafted, independently reviewed and accepted within project procedure.`;
  if (pending.length) text += ` Written and awaiting acceptance: ${esc(pending.join('; '))}.`;
  if (unwritten.length) text += ` Still unwritten: ${esc(unwritten.join('; '))}.`;
  return `<p class="status" id="remaining-work">${text} ${gates}</p>`;
}

function build({check = false, out = '.paper-build/thesis', publish = false} = {}) {
  const config = readJSON('thesis/thesis.json');
  assert.equal(config.schema, 1, 'thesis.json schema must be 1');
  assert(SEMVER.test(config.version), 'Stable semantic thesis version required');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(config.date), 'Valid ISO thesis date required');
  assert.equal(config.stage, 'draft', 'Thesis stage must remain draft until P3G2/P2G2 actually close');
  assert(config.title?.trim() && config.authors?.trim(), 'Thesis title and authors required');

  const records = loadRecords();
  const usedIds = new Set();
  const ctx = {
    sources: records.S, cited: new Set(), paragraphIds: new Set(), chapterParagraphs: [],
    limitationsSeen: false,
    uniqueId(base) {
      let id = base, n = 1;
      while (usedIds.has(id)) id = `${base}-${++n}`;
      usedIds.add(id);
      return id;
    },
  };

  const chapters = [];
  for (const item of config.chapters) {
    const rel = `thesis/${item.file}`;
    const {meta, body} = parseFrontMatter(readText(rel), rel);
    assert(STATUSES.includes(meta.status), `${rel}: status must be one of ${STATUSES.join('/')}`);
    const number = Number(meta.chapter);
    assert(Number.isInteger(number), `${rel}: integer chapter number required`);
    const fileNumber = Number(path.basename(item.file).slice(0, 2));
    assert.equal(number, fileNumber, `${rel}: chapter number must match the file prefix`);
    const prefix = `c${String(number).padStart(2, '0')}`;
    chapters.push({...item, rel, meta, number, prefix, blocks: parseBlocks(body, rel)});
  }
  const appendices = (config.appendices || []).map(item => {
    const rel = `thesis/${item.file}`;
    const {meta, body} = parseFrontMatter(readText(rel), rel);
    assert(STATUSES.includes(meta.status), `${rel}: status must be one of ${STATUSES.join('/')}`);
    assert(/^[A-Z]$/.test(meta.appendix || ''), `${rel}: single-letter appendix key required`);
    return {...item, rel, meta, prefix: `ap${meta.appendix}`, blocks: parseBlocks(body, rel)};
  });

  const front = chapters.find(c => c.role === 'front-matter');
  assert(front, 'A front-matter chapter is required');
  const roleOf = role => chapters.filter(c => c.role === role);
  for (const role of ['introduction', 'methods', 'discussion', 'conclusion'])
    assert.equal(roleOf(role).length, 1, `Exactly one chapter must carry role ${role}`);
  assert(roleOf('findings').length >= 1, 'At least one findings chapter required');

  const statusNote = meta => meta.status === 'accepted' ? ''
    : `<p class="meta">Chapter status: ${meta.status}; not an accepted research deliverable.</p>`;
  const renderChapter = (c, sectionId) => {
    usedIds.add(sectionId);
    c.html = `<section id="${sectionId}">\n<h2>${c.number}. ${esc(c.meta.title)}</h2>\n${statusNote(c.meta)}\n` +
      renderBlocks(c.blocks, c.prefix, c.meta, ctx) + '\n</section>';
    return c.html;
  };

  // Front matter: the Abstract section becomes section#abstract; later sections keep their own ids.
  const splitFront = [];
  for (const block of front.blocks) {
    if (block.type === 'heading' && block.level === 2) splitFront.push({title: block.text, blocks: []});
    else { assert(splitFront.length, `${front.rel}: content before the first ## heading`); splitFront.at(-1).blocks.push(block); }
  }
  assert(splitFront.some(s => s.title === 'Abstract'), 'Front matter requires an Abstract section');
  const frontSections = splitFront.map(section => {
    const id = section.title === 'Abstract' ? 'abstract' : ctx.uniqueId(slugify(section.title));
    if (id === 'abstract') usedIds.add(id);
    return `<section id="${id}">\n<h2>${esc(section.title)}</h2>\n` +
      renderBlocks(section.blocks, front.prefix, front.meta, ctx) + '\n</section>';
  }).join('\n');

  const numbered = chapters.filter(c => c.role !== 'front-matter');
  for (const c of numbered)
    c.sectionId = c.role === 'findings' ? `chapter-${c.number}` : c.role;
  const contents = '<section id="contents">\n<h2>Contents</h2>\n<ul>' +
    numbered.map(c => `<li><a href="#${c.sectionId}">${c.number}. ${esc(c.meta.title)}</a></li>`).join('') +
    appendices.map(a => `<li><a href="#appendix-${a.meta.appendix.toLowerCase()}">${esc(a.title)}</a></li>`).join('') +
    '<li><a href="#references">References</a></li></ul>\n</section>';

  const appendixSections = appendices.map(a => {
    const id = `appendix-${a.meta.appendix.toLowerCase()}`;
    usedIds.add(id);
    a.html = `<section id="${id}">\n<h2>${esc(a.title)}</h2>\n${statusNote(a.meta)}\n` +
      renderBlocks(a.blocks, a.prefix, a.meta, ctx) + '\n</section>';
    return a.html;
  }).join('\n');

  const bodySections = [
    frontSections,
    contents,
    renderChapter(roleOf('introduction')[0], roleOf('introduction')[0].sectionId),
    renderChapter(roleOf('methods')[0], roleOf('methods')[0].sectionId),
    '<section id="findings">\n' + roleOf('findings').map(c => renderChapter(c, c.sectionId)).join('\n') + '\n</section>',
    renderChapter(roleOf('discussion')[0], roleOf('discussion')[0].sectionId),
    renderChapter(roleOf('conclusion')[0], roleOf('conclusion')[0].sectionId),
    appendixSections,
    bibliography(ctx.cited, ctx),
  ].join('\n\n');

  assert(ctx.limitationsSeen, 'The thesis requires exactly one Limitations heading (expected in the discussion chapter)');
  const crosswalkEntries = validateCrosswalk(config, ctx, records,
    [...chapters.map(c => c.prefix), ...appendices.map(a => a.prefix)]);

  const paperMeta = readPaperMeta();
  const remaining = remainingWorkBanner(front, numbered, appendices);
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="author" content="${esc(config.authors)}">
<meta name="paper-version" content="${esc(paperMeta.version)}">
<meta name="paper-date" content="${esc(paperMeta.date)}">
<meta name="paper-stage" content="draft">
<meta name="paper-fixture" content="false">
<title>${esc(config.title)}</title>
<style>${STYLE}</style>
</head>
<body>
<nav class="screen-only" aria-label="Thesis navigation"><a href="index.html">Start page</a> · <a href="companion.html">Plain-language overview</a> · <a href="paper.html">Research article</a></nav>
<main id="paper">
<header>
<h1 id="paper-title">${esc(config.title)}</h1>
<p id="authors">${esc(config.authors)}</p>
<p class="meta">Project direction: ${esc(config.project_direction)}</p>
<p id="ai-disclosure" class="meta">${esc(config.ai_disclosure)}</p>
<p id="version-notice" class="meta">Published with article version <span id="paper-version">${esc(paperMeta.version)}</span> · <span id="paper-date">${esc(paperMeta.date)}</span>. Thesis working draft ${esc(config.version)}.</p>
<p id="publication-status" class="meta">Draft: P2R20 and P2G2 pending</p>
</header>
${remaining}

${bodySections}
</main>
</body>
</html>
`;

  const stats = {
    version: config.version, date: config.date,
    chapters: numbered.length, appendices: appendices.length,
    paragraphs: ctx.chapterParagraphs.length, explicit_paragraph_ids: ctx.paragraphIds.size,
    citations: ctx.cited.size, crosswalk_entries: crosswalkEntries,
    statuses: Object.fromEntries(numbered.map(c => [c.prefix, c.meta.status])),
  };
  if (!check) {
    const target = path.join(ROOT, out);
    fs.mkdirSync(path.join(target, 'chapters'), {recursive: true});
    fs.writeFileSync(path.join(target, 'thesis.html'), html);
    for (const c of [...chapters, ...appendices]) {
      const name = path.basename(c.file, '.md') + '.html';
      const section = c.role === 'front-matter' ? frontSections : c.html;
      const title = c.meta.title || c.title;
      fs.writeFileSync(path.join(target, 'chapters', name),
        `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${esc(title)}</title>\n<style>${STYLE}</style>\n</head>\n<body>\n<main>\n<p class="meta">Working preview of one thesis part (status: ${c.meta.status}). The stitched thesis.html is the validated artifact; anchors may resolve only there.</p>\n${section}\n</main>\n</body>\n</html>\n`);
    }
    stats.output = `${out}/thesis.html`;
    if (publish) {
      fs.writeFileSync(path.join(ROOT, 'paper/thesis.html'), html);
      stats.published = 'paper/thesis.html';
    }
  }
  return stats;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const publish = args.includes('--publish');
  const outIndex = args.indexOf('--out');
  try {
    assert(!(check && publish), 'Use --check or --publish, not both');
    const stats = build({check, publish, out: outIndex >= 0 ? args[outIndex + 1] : undefined});
    console.log(JSON.stringify(stats, null, 2));
    console.log(check ? 'Thesis validation passed (no output written).' : 'Thesis build complete.');
  } catch (error) {
    console.error(`Thesis build failed: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {build};
