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

// Citation forms (Phase 3 plan, "Deliverable format"): [@S-…] cites one source
// record and links to its generated bibliography entry; [@S-a; @S-b] cites
// several at once, each linked; [@A-…], [@C-…] and [@CL-…] name an argument,
// case or claim record as a validated plain identifier (those ledgers have no
// bibliography entry). Any bracket that starts with @ and does not resolve is
// an error, never silently passed through as text: thesis-v1.0.0 shipped with
// twelve unrendered brackets and seven sources missing from References
// because the earlier single-form regex ignored everything else.
const CITE_ITEM = /^@((?:S|A|C|CL)-[A-Za-z0-9_-]+)$/;
function inline(text, ctx, file, paragraphId = null) {
  let html = esc(text);
  html = html.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
  html = html.replace(/\[(@[^\]]*)\]/g, (whole, body) => {
    const items = body.split(';').map(s => s.trim());
    const rendered = items.map(item => {
      const m = item.match(CITE_ITEM);
      assert(m, `${file}: malformed citation ${whole}; use [@S-…], [@S-a; @S-b] or [@A-…]/[@C-…]/[@CL-…]`);
      const id = m[1];
      const kind = id.match(/^(CL|A|C|S)-/)[1];
      assert(ctx.records[kind].has(id), `${file}: citation of unknown ${kind} record ${id}`);
      if (paragraphId) ctx.paragraphCites.get(paragraphId).add(id);
      if (kind === 'S') { ctx.cited.add(id); return `<a href="#ref-${id}" class="cite" data-cite="${citePreview(id, ctx)}">${id}</a>`; }
      return id;
    });
    // The single-source form keeps its bracketed [S-…] label; every source
    // anchor carries a data-cite text preview for the stylesheet's hover
    // popover (pure CSS content:attr(), no script).
    if (rendered.length === 1 && items[0].startsWith('@S-')) {
      const id = items[0].slice(1);
      return `<a href="#ref-${id}" class="cite" data-cite="${citePreview(id, ctx)}">[${id}]</a>`;
    }
    return `[${rendered.join('; ')}]`;
  });
  assert(!/\[@/.test(html), `${file}: unrendered citation syntax remains in: ${text.slice(0, 80)}`);
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    assert(/^(https:\/\/|#)/.test(href), `${file}: only HTTPS or internal links: ${href}`);
    return `<a href="${esc(href)}">${label}</a>`;
  });
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(^|[\s(>])\*([^*]+)\*/g, '$1<em>$2</em>');
  return html;
}

// Plain-text reference preview for the popover: the bibliography entry's
// leading fields without links, attribute-escaped exactly once.
function citePreview(id, ctx) {
  const row = ctx.sourceRows.get(id);
  if (!row) return '';
  const dot = t => /[.?!]$/.test(t) ? t : `${t}.`;
  const parts = [`[${id}]`];
  const authors = (row.authors || []).map(a => String(a).trim()).filter(Boolean).join(', ');
  if (authors) parts.push(dot(authors));
  if (row.publication_date) parts.push(dot(String(row.publication_date)));
  parts.push(dot(row.title));
  return esc(parts.join(' '));
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
      out.push(`<h${block.level + 1} id="${id}">${inline(block.text, ctx, prefix)}</h${block.level + 1}>`);
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
      ctx.paragraphCites.set(id, new Set());
      if (block.id) lintStatusLanguage(block.text, id, ctx);
      if (block.id) ctx.paragraphPaths.set(id, new Set(block.text.match(RECORD_PATH) || []));
      // Explicit paragraph ids also render as a data-pid attribute so the
      // stylesheet can label each traced paragraph in the margin.
      out.push(`<p id="${id}"${block.id ? ` data-pid="${id}"` : ''}>${inline(block.text, ctx, prefix, id)}</p>`);
    } else if (block.type === 'list') {
      out.push('<ul>' + block.items.map(x => `<li>${inline(x, ctx, prefix)}</li>`).join('') + '</ul>');
    }
  }
  closeLimits();
  return out.join('\n');
}

// Released-stage status language. Once thesis.json says `released`, no
// paragraph may still describe the review record as it stood while drafting
// (gates unrun, article review unperformed, thesis a working draft). The
// patterns are deliberately narrow; a dated statement that must stay (for
// example a count "as of" a named day) is exempted in thesis.json
// `status_language_allowlist` with a reason. thesis-v1.0.0 shipped with eight
// such paragraphs because nothing checked prose against the stage.
const STATUS_LANGUAGE = [
  /\b(?:has|have) not (?:yet )?been run\b/i,
  /\bremains? unperformed\b/i,
  /\bat this writing\b/i,
  /\b(?:this|the thesis|the manuscript) (?:is|remains) (?:a |an )?(?:complete |incomplete )?working draft\b/i,
  /\bthesis working draft\b/i,
  /\bworking draft until\b/i,
  /\bnot (?:yet )?(?:drafted|written) at this\b/i,
  /\b(?:is|are) not drafted\b/i,
  /\bremain(?:s)? unaccepted\b/i,
  /\b(?:P2R20|P2G2|P3G1|P3R20|P3G2)\b[^.]*\b(?:remains? pending|remains? open|not (?:yet )?(?:run|closed|recorded))\b/i,
  /\b(?:pending|still open)\b[^.]*\b(?:P2R20|P2G2|P3G1|P3R20|P3G2)\b/i,
  /\buntil (?:its|those|these|the) (?:own )?gates? close\b/i,
  /\blabeled submitted, not accepted\b/i,
  /\bcoverage gate must\b/i,
  /\bbefore coverage is accepted\b/i,
  /\bthis draft\b/i,
];
// A repository path named in prose (state/acceptance_P3G1.json, work/G0/...)
// is a citation of a record and must appear in the paragraph's crosswalk
// entry, so the crosswalk stays the complete trace. thesis-v1.0.1 shipped
// with two paragraphs (apC-p001, apC-p018) naming gate records their
// crosswalk did not list; the distinct-model reviewer recorded the gap.
const RECORD_PATH = /\b(?:state|work|records|phase2|phase3|derived|reports|docs|paper|thesis|scripts)\/[A-Za-z0-9_./-]*[A-Za-z0-9_]/g;

function lintStatusLanguage(text, id, ctx) {
  if (!ctx.released) return;
  for (const pattern of STATUS_LANGUAGE) {
    const hit = text.match(pattern);
    if (!hit) continue;
    const allowed = ctx.statusAllowlist.get(id);
    assert(allowed, `${id}: released-stage status language "${hit[0]}" (add to thesis.json status_language_allowlist with a reason, or update the text)`);
  }
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
  // Every record cited inline in a paragraph must also be in that paragraph's
  // crosswalk entry, so the crosswalk stays the complete trace and an inline
  // citation can never reach a record the crosswalk does not name.
  for (const prefix of prefixes) {
    for (const entry of readJSON(`thesis/crosswalk/${prefix}.json`).entries) {
      const refs = new Set(entry.refs);
      for (const id of ctx.paragraphCites.get(entry.paragraph_id) || [])
        assert(refs.has(id), `${entry.paragraph_id} cites ${id} inline but its crosswalk entry does not list it`);
      const joined = entry.refs.join('\n');
      for (const p of ctx.paragraphPaths.get(entry.paragraph_id) || [])
        assert(joined.includes(p), `${entry.paragraph_id} names ${p} in prose but its crosswalk entry does not cite it`);
    }
  }
  return mapped.size;
}

// A ledger locator is linked when it is a URL (https or http) or a DOI, bare
// or with a doi: prefix; DOIs resolve through https://doi.org/. Anything else
// prints as text. Punctuation is added only where the field does not already
// end with a terminal mark, so "Gap?" and "et al." do not double up, and an
// empty author list (an unsigned erratum) is omitted rather than printed as
// a stray full stop.
const DOI = /^(?:doi:\s*|https?:\/\/(?:dx\.)?doi\.org\/)?(10\.\d{4,9}\/\S+?)\.?$/i;
function locatorLink(value) {
  if (!value) return '';
  const doi = value.match(DOI);
  if (doi) return `<a href="https://doi.org/${esc(doi[1])}">doi:${esc(doi[1])}</a>.`;
  // The artifact contract admits only HTTPS links inside main#paper, so an
  // http:// locator links through https (the printed label stays "Source").
  if (/^https?:\/\//.test(value)) return `<a href="${esc(value.replace(/^http:\/\//, 'https://'))}">Source</a>.`;
  return terminal(value);
}
function terminal(text) {
  return /[.?!]$/.test(text) ? esc(text) : `${esc(text)}.`;
}

function bibliography(cited, ctx) {
  const rows = readJSON('records/sources.json').filter(r => cited.has(r.source_id));
  const body = rows.length
    ? rows.map(r => {
        const parts = [`[${r.source_id}]`];
        const authors = (r.authors || []).map(a => String(a).trim()).filter(Boolean).join(', ');
        if (authors) parts.push(terminal(authors));
        if (r.publication_date) parts.push(terminal(String(r.publication_date)));
        parts.push(terminal(r.title));
        const locator = locatorLink(r.url_or_identifier);
        if (locator) parts.push(locator);
        // An optional ledger note states what the linked copy is (a third-party
        // rehost, a second inspected version) so the reader is not left to infer
        // provenance from the URL alone.
        if (r.bibliography_note) parts.push(esc(r.bibliography_note));
        return `<p id="ref-${r.source_id}">${parts.join(' ')}</p>`;
      }).join('\n')
    : '<p id="references-pending">The bibliography is generated from chapter citations against the source ledger; skeleton chapters carry no citations yet.</p>';
  return `<section id="references">\n<h2>References</h2>\n${body}\n</section>`;
}

// Site redesign (applied 2026-09-15 from the "Consciousness Project redesign"
// Claude Design package): warm paper palette, serif stack with local fallbacks
// only (the contract forbids external font loads), a sticky contents rail in a
// two-column grid, margin paragraph-id labels driven by data-pid, and hover
// citation popovers driven by data-cite. The inline styles the design package
// emitted are expressed here as stylesheet rules so the generated markup stays
// clean and the visual layer lives in one place.
const STYLE = [
  ':root{--color-bg:#f3f2f2;--color-surface:#eae9e9;--color-text:#201f1d;--color-accent:#b68235;--color-accent-600:#a06f24;--color-accent-700:#7d5411;--color-divider:color-mix(in srgb,#201f1d 16%,transparent);--font-heading:"Cormorant Garamond",Georgia,"Times New Roman",serif;--font-body:"Lora",Georgia,"Times New Roman",serif}',
  '*,*::before,*::after{box-sizing:border-box}',
  '.shell{min-height:100vh}',
  'body{margin:0;background:var(--color-bg);color:var(--color-text);font-family:var(--font-body);font-size:17px;line-height:28px;text-wrap:pretty}',
  'a{color:var(--color-accent-700);text-underline-offset:3px}a:hover{color:var(--color-accent-600)}',
  ':focus{outline:none}:focus-visible{outline:2px solid var(--color-accent);outline-offset:2px}',
  '::selection{background:color-mix(in srgb,var(--color-accent) 30%,transparent)}',
  'em{font-style:italic}code{font-family:ui-monospace,Menlo,monospace;font-size:14px}',
  'nav.site{display:flex;align-items:center;gap:18.4px;padding:13.8px max(clamp(20px,5vw,72px),calc((100% - 1200px)/2 + clamp(20px,5vw,72px)));border-bottom:1px solid var(--color-divider)}',
  'nav.site .brand{font-family:var(--font-heading);font-weight:600;font-size:18px;margin-right:auto;color:inherit;text-decoration:none}',
  '.navlinks{display:flex;gap:18.4px;font-size:14px}.navlinks a{color:inherit;text-decoration:none;white-space:nowrap}',
  '.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;text-decoration:none;font-family:var(--font-heading);font-weight:600;font-size:14px;line-height:1.2;background:transparent;border:1px solid transparent;padding:9.2px 16.56px;border-radius:4px;white-space:nowrap}',
  '.btn-primary{color:var(--color-accent);border-color:var(--color-accent)}.btn-primary:hover{background:color-mix(in srgb,var(--color-accent) 12%,transparent)}.btn-primary:active{background:color-mix(in srgb,var(--color-accent) 22%,transparent)}',
  '.page{max-width:1200px;margin:0 auto;padding:0 clamp(20px,5vw,72px);display:grid;grid-template-columns:200px minmax(0,1fr);gap:0 clamp(72px,8vw,120px);align-items:start}',
  '.rail{position:sticky;top:0;padding:56px 0;font-size:13px;line-height:20px;max-height:100vh;overflow:auto;color:color-mix(in srgb,var(--color-text) 70%,transparent)}',
  '.toc a{color:inherit;text-decoration:none;display:block;padding:4px 0}.toc a:hover{color:var(--color-accent-700)}',
  ".toc .num{display:inline-block;width:2.4em;font-feature-settings:'tnum' 1;color:color-mix(in srgb,var(--color-text) 45%,transparent)}",
  'main{max-width:66ch;padding:56px 0;position:relative}',
  'h1,h2,h3,h4{font-family:var(--font-heading)}',
  'h1{font-weight:400;font-size:clamp(40px,4.4vw,56px);line-height:1.08;letter-spacing:-.01em;margin:0 0 28px -.042em}',
  'h2{font-weight:400;font-size:34px;line-height:40px;letter-spacing:-.008em;margin:84px 0 28px}',
  'h3{font-weight:400;font-size:25px;line-height:30px;margin:42px 0 14px}',
  'h4{font-weight:600;font-size:19px;line-height:26px;margin:28px 0 9px}',
  '.secno{display:block;font-weight:400;font-size:64px;line-height:64px;font-variant-numeric:lining-nums tabular-nums;letter-spacing:-.01em;color:color-mix(in srgb,var(--color-text) 40%,transparent);margin:0 0 9px}',
  '.sectitle{display:block}',
  'p{margin:0 0 14px}main p{position:relative;text-align:justify;hyphens:auto}',
  'ul{margin:0 0 14px;padding-left:1.2em}li{margin:0 0 9px}',
  "main p.kicker,p.kicker{font-size:13px;line-height:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-accent-700);font-feature-settings:'tnum' 1;margin:0 0 28px;text-align:left;hyphens:manual}",
  '.rail .kicker{font-size:11px;line-height:14px;margin:0 0 14px}',
  'main p.meta{margin:0;font-size:13px;line-height:20px;color:color-mix(in srgb,var(--color-text) 70%,transparent);text-align:left;hyphens:manual}',
  'main p.status-line{font-size:13px;line-height:20px;margin:28px 0 0;padding:14px 0;border-top:1px solid var(--color-divider);border-bottom:1px solid var(--color-divider);color:color-mix(in srgb,var(--color-text) 70%,transparent);text-align:left;hyphens:manual}',
  '#abstract{border-top:1px solid var(--color-divider);border-bottom:1px solid var(--color-divider);padding:0 0 14px;margin-top:56px}#abstract h2{margin:42px 0 28px}',
  '#contents ul{list-style:none;margin:0;padding:0;columns:2;column-gap:28px}#contents li{margin:0 0 6px;font-size:15px;line-height:24px;break-inside:avoid}#contents a{color:inherit}',
  '#references p{margin:0 0 9px;padding-left:1.4em;text-indent:-1.4em;font-size:14px;line-height:22px;overflow-wrap:anywhere;text-align:left;hyphens:manual}',
  '.cite{position:relative;text-decoration:none;border-bottom:1px solid var(--color-accent);color:inherit}.cite:hover,.cite:focus-visible{color:var(--color-accent-700)}',
  '.cite::after{content:attr(data-cite);position:absolute;left:0;top:calc(100% + 6px);z-index:5;width:min(38ch,70vw);padding:9.2px 13.8px;font-size:13px;line-height:20px;text-align:left;hyphens:manual;font-style:normal;font-weight:400;color:var(--color-text);background:var(--color-surface);border:1px solid var(--color-divider);border-radius:4px;box-shadow:0 3px 10px color-mix(in srgb,#2d2b2b 16%,transparent);display:none;text-indent:0}',
  '.cite:hover::after,.cite:focus-visible::after{display:block}',
  "p[data-pid]::before{content:attr(data-pid);position:absolute;right:calc(100% + 18px);top:0;width:80px;text-align:right;font-size:11px;line-height:28px;letter-spacing:.04em;font-feature-settings:'tnum' 1;color:color-mix(in srgb,var(--color-text) 45%,transparent);white-space:nowrap}",
  '#status{grid-column:2;max-width:66ch;padding:28px 0 84px;border-top:1px solid var(--color-divider)}',
  '#status p,#status .status,.status{margin:0 0 9px;font-size:14px;line-height:22px;color:color-mix(in srgb,var(--color-text) 70%,transparent);text-align:justify;hyphens:auto}',
  '.meta{font-size:13px;line-height:20px;color:color-mix(in srgb,var(--color-text) 70%,transparent)}',
  '@media (max-width:1000px){.rail{display:none}.page{grid-template-columns:minmax(0,1fr)}#status{grid-column:auto}p[data-pid]::before{display:none}}',
  '@media (max-width:640px){.navlinks{display:none}}',
  '@page{size:A4;margin:20mm 19mm 22mm}',
  // Print keeps the PDF text layer faithful to the HTML text: no auto
  // hyphenation (real hyphen glyphs would break the PDF/HTML text
  // correspondence check), no uppercase transform on kickers, and static
  // positioning everywhere (positioned elements paint in a separate phase,
  // which scrambles PDF text-extraction order mid-paragraph).
  '@media print{body{background:white;color:black;font-size:10.7pt;line-height:1.43}nav.site,.rail,.screen-only{display:none}.page{display:block;padding:0}main{max-width:none;padding:0;position:static}main p,.cite{position:static}main p,p,li{hyphens:manual}main p.kicker,p.kicker{text-transform:none;letter-spacing:normal}p[data-pid]::before{display:none}.cite{border:0;color:#163f52}.cite::after{display:none!important}h1{font-size:23pt}h2{font-size:14pt;margin:20pt 0 8pt}h3{font-size:11.5pt}h4{font-size:10.5pt}.secno{font-size:14pt;line-height:1.2;display:inline;margin-right:6pt}.sectitle{display:inline}h1,h2,h3,h4{break-after:avoid}p{orphans:3;widows:3}main p.kicker,p.kicker{margin:0 0 8pt}#references p{break-inside:avoid}a{color:#163f52}}',
].join('');

function readPaperMeta() {
  const html = readText('paper/paper.html');
  const version = html.match(/<meta name="paper-version" content="([^"]+)"/);
  const date = html.match(/<meta name="paper-date" content="([^"]+)"/);
  assert(version && date, 'paper/paper.html must declare paper-version and paper-date');
  return {version: version[1], date: date[1]};
}

function remainingWorkBanner(front, numbered, appendices, released = false) {
  const parts = [{label: 'front matter', meta: front.meta},
    ...numbered.map(c => ({label: `chapter ${c.number} (${c.meta.title})`, meta: c.meta})),
    ...appendices.map(a => ({label: `Appendix ${a.meta.appendix}`, meta: a.meta}))];
  // A part is unwritten only while it is a skeleton; drafted or submitted parts
  // are written but await acceptance, and the banner must not conflate the two.
  const unwritten = parts.filter(p => p.meta.status === 'skeleton').map(p => p.label);
  const pending = parts.filter(p => p.meta.status === 'drafted' || p.meta.status === 'submitted').map(p => p.label);
  const gates = released
    ? 'Coverage gate P3G1, whole-thesis review P3R20 and release adjudication P3G2 are closed with recorded decisions, and P2R20 and P2G2 close through them (state/acceptance_P3G1.json, state/acceptance_P3R20.json, state/acceptance_P3G2.json). Acceptance is methodological and does not establish a metaphysical result; all twelve stronger-conclusion gates remain withheld.'
    : 'Coverage gate P3G1, whole-thesis review P3R20, and release adjudication P3G2 (which would close P2G2) have not been run; P2R20 remains pending. Chapter acceptance is methodological and does not establish a metaphysical result.';
  if (!unwritten.length && !pending.length) {
    return released
      ? `<p class="status" id="remaining-work">This is the released thesis: every part has been drafted, independently reviewed and accepted within project procedure, and the release is adjudicated at P3G2. It is a companion to the <a href="paper.html">research article</a> and not an externally peer-reviewed publication. ${gates}</p>`
      : `<p class="status" id="remaining-work">This is a complete thesis working draft: every part has been drafted, independently reviewed and accepted within project procedure. It is not yet a released manuscript, not a substitute for the <a href="paper.html">research article</a>, and not an externally peer-reviewed publication. ${gates}</p>`;
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
  // The released stage is admitted only once the P3G2 gate record actually
  // exists; until then the stage stays draft (P2-AMEND-002/003, Phase 3 plan).
  const released = config.stage === 'released' && fs.existsSync(path.join(ROOT, 'state/acceptance_P3G2.json'));
  assert(config.stage === 'draft' || released,
    'Thesis stage must remain draft until P3G2/P2G2 actually close (state/acceptance_P3G2.json)');
  assert(config.title?.trim() && config.authors?.trim(), 'Thesis title and authors required');

  const records = loadRecords();
  const usedIds = new Set();
  const statusAllowlist = new Map();
  for (const row of config.status_language_allowlist || []) {
    assert(PARA_ID.test(row.paragraph_id) && row.reason?.trim().length >= 20,
      'status_language_allowlist rows need a paragraph_id and a stated reason');
    statusAllowlist.set(row.paragraph_id, row.reason);
  }
  const ctx = {
    sources: records.S, records, cited: new Set(), paragraphIds: new Set(), chapterParagraphs: [],
    sourceRows: new Map(readJSON('records/sources.json').map(r => [r.source_id, r])),
    paragraphCites: new Map(), paragraphPaths: new Map(), released, statusAllowlist,
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
  // Section headings render the chapter number (or appendix letter) as a
  // large block span above the title, per the site redesign.
  const sectionHeading = (no, title) =>
    `<h2><span class="secno">${esc(String(no))}</span><span class="sectitle">${esc(title)}</span></h2>`;
  const renderChapter = (c, sectionId) => {
    usedIds.add(sectionId);
    c.html = `<section id="${sectionId}">\n${sectionHeading(c.number, c.meta.title)}\n${statusNote(c.meta)}\n` +
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

  // "Appendix A. Case evidence tables" renders as letter A over the bare title.
  const appendixTitle = a => a.title.replace(new RegExp(`^Appendix ${a.meta.appendix}[.:]?\\s*`), '');
  const appendixSections = appendices.map(a => {
    const id = `appendix-${a.meta.appendix.toLowerCase()}`;
    usedIds.add(id);
    a.html = `<section id="${id}">\n${sectionHeading(a.meta.appendix, appendixTitle(a))}\n${statusNote(a.meta)}\n` +
      renderBlocks(a.blocks, a.prefix, a.meta, ctx) + '\n</section>';
    return a.html;
  }).join('\n');

  // Sticky contents rail (screen only; the in-document Contents section stays
  // for print and for narrow viewports where the rail is hidden).
  const rail = '<aside class="rail toc" aria-label="Contents">\n<p class="kicker">Contents</p>\n' +
    numbered.map(c => `<a href="#${c.sectionId}"><span class="num">${c.number}</span>${esc(c.meta.title)}</a>`).join('') +
    appendices.map(a => `<a href="#appendix-${a.meta.appendix.toLowerCase()}"><span class="num">${esc(a.meta.appendix)}</span>${esc(appendixTitle(a))}</a>`).join('') +
    '<a href="#references"><span class="num"></span>References</a>\n</aside>';

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
  const remaining = remainingWorkBanner(front, numbered, appendices, released);
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="author" content="${esc(config.authors)}">
<meta name="paper-version" content="${esc(paperMeta.version)}">
<meta name="paper-date" content="${esc(paperMeta.date)}">
<meta name="paper-stage" content="${released ? 'reviewed' : 'draft'}">
<meta name="paper-fixture" content="false">
<title>${esc(config.title)}</title>
<style>${STYLE}</style>
</head>
<body>
<div class="shell">
<nav class="site screen-only" aria-label="Thesis navigation"><a class="brand" href="index.html">Consciousness Project</a><div class="navlinks"><a href="companion.html">Overview</a><a href="paper.html">Article</a><a href="thesis.html" aria-current="page">Thesis</a><a href="methodology.html">Method</a></div>${released ? `<a class="btn btn-primary" href="https://github.com/mnemeth1/Consciousness-Project/releases/download/thesis-v${esc(config.version)}/thesis.pdf">Thesis PDF</a>` : ''}</nav>
<div class="page">
${rail}
<main id="paper">
<header>
<p id="publication-status" class="kicker">${released ? 'Reviewed research synthesis' : 'Draft: P2R20 and P2G2 pending'}</p>
<h1 id="paper-title">${esc(config.title)}</h1>
<p id="authors" class="meta">${esc(config.authors)}</p>
<p class="meta">Project direction: ${esc(config.project_direction)}</p>
<p id="ai-disclosure" class="meta">${esc(config.ai_disclosure)}</p>
<p id="version-notice" class="meta">Published with article version <span id="paper-version">${esc(paperMeta.version)}</span> · <span id="paper-date">${esc(paperMeta.date)}</span>. ${released ? `Thesis ${esc(config.version)}.` : `Thesis working draft ${esc(config.version)}.`}</p>
<p class="status-line">${released ? `The released thesis, version ${esc(config.version)}: internally reviewed and accepted, not externally peer reviewed.` : `Thesis working draft ${esc(config.version)}: not a released manuscript and not externally peer reviewed.`} <a href="#status">Read the full statement.</a></p>
</header>

${bodySections}
</main>
<section id="status">
<p class="kicker">Status of this text</p>
${remaining}
</section>
</div>
</div>
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
