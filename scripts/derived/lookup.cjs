'use strict';
// Look up canonical ledger records by ID and print them with resolved
// cross-references, so an agent can inspect single records without reading
// whole ledger files. Reads records/*.json directly (always current); the
// output is a non-canonical convenience view.
//
//   node scripts/derived/lookup.cjs CL-T05-001 A-T05-001      # human-readable
//   node scripts/derived/lookup.cjs --json S-T05-003          # structured JSON
//
// Accepted IDs: S-* (sources), CL-* (claims), A-* (arguments), C-* (cases),
// and review IDs from records/review_summaries.json (e.g. R05, P2R14).
// Standard library only.
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '../..');

const readJSON = rel =>
  JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/^\uFEFF/, ''));

function loadWorld() {
  const ledgers = {
    sources: readJSON('records/sources.json'),
    claims: readJSON('records/claims.json'),
    arguments: readJSON('records/arguments.json'),
    cases: readJSON('records/cases.json'),
    reviews: readJSON('records/review_summaries.json'),
  };
  const byId = new Map();
  for (const [name, field] of [['sources', 'source_id'], ['claims', 'claim_id'],
                               ['arguments', 'argument_id'], ['cases', 'case_id'],
                               ['reviews', 'review_id']])
    for (const row of ledgers[name]) byId.set(row[field], {type: name, row});

  // Reverse index: which records cite a given source, case or claim.
  const citedBy = new Map();
  const note = (target, byType, byIdValue) => {
    if (!citedBy.has(target)) citedBy.set(target, []);
    citedBy.get(target).push(`${byIdValue} (${byType})`);
  };
  for (const c of ledgers.claims) {
    for (const sid of c.source_ids || []) note(sid, 'claim', c.claim_id);
    for (const cid of c.case_ids || []) note(cid, 'claim', c.claim_id);
    for (const scid of c.supporting_claim_ids || []) note(scid, 'supported claim', c.claim_id);
  }
  for (const a of ledgers.arguments) {
    for (const sid of a.source_ids || []) note(sid, 'argument', a.argument_id);
    for (const clid of a.claim_ids || []) note(clid, 'argument', a.argument_id);
  }
  for (const c of ledgers.cases)
    for (const sid of c.source_ids || []) note(sid, 'case', c.case_id);
  return {ledgers, byId, citedBy};
}

const shortOf = entry => {
  const r = entry.row;
  switch (entry.type) {
    case 'sources': return `${r.source_id}: ${(r.authors || []).join(', ')}${r.publication_date ? ` (${r.publication_date})` : ''}. ${r.title} [${r.access_status}]`;
    case 'claims': return `${r.claim_id} [${r.claim_type}]: ${r.statement}`;
    case 'arguments': return `${r.argument_id} (${r.position}): ${r.name} -> ${r.conclusion}`;
    case 'cases': return `${r.case_id} (${r.kind}): ${r.name}`;
    case 'reviews': return `${r.review_id} [task ${r.task_id}]: verdict ${r.verdict}`;
  }
};

function resolve(world, entry) {
  const {byId, citedBy} = world;
  const r = entry.row;
  const short = ids => (ids || []).map(id => byId.has(id) ? shortOf(byId.get(id)) : `${id} (NOT IN LEDGERS)`);
  const related = {};
  if (entry.type === 'claims') {
    related.sources = short(r.source_ids);
    related.cases = short(r.case_ids);
    related.supporting_claims = short(r.supporting_claim_ids);
    related.review = r.review_id && byId.has(r.review_id) ? shortOf(byId.get(r.review_id)) : r.review_id;
    related.cited_by = citedBy.get(r.claim_id) || [];
  } else if (entry.type === 'arguments') {
    related.claims = short(r.claim_ids);
    related.sources = short(r.source_ids);
    related.dependency_arguments = short(r.dependency_argument_ids);
    for (const key of ['strongest_objection', 'strongest_reply'])
      if (r[key] && byId.has(r[key])) related[key] = shortOf(byId.get(r[key]));
    related.review = r.review_id && byId.has(r.review_id) ? shortOf(byId.get(r.review_id)) : r.review_id;
  } else if (entry.type === 'cases') {
    related.sources = short(r.source_ids);
    related.related_cases = short(r.related_case_ids);
    related.cited_by = citedBy.get(r.case_id) || [];
  } else if (entry.type === 'sources') {
    related.related_cases = short(r.related_case_ids);
    related.cited_by = citedBy.get(r.source_id) || [];
  }
  return related;
}

function printHuman(id, entry, related) {
  console.log(`${'='.repeat(78)}\n${shortOf(entry)}\n${'-'.repeat(78)}`);
  console.log(JSON.stringify(entry.row, null, 2));
  for (const [key, value] of Object.entries(related)) {
    const items = Array.isArray(value) ? value : [value];
    if (!items.length || items[0] == null) continue;
    console.log(`\n${key.replaceAll('_', ' ')}:`);
    for (const item of items) console.log(`  - ${item}`);
  }
  console.log('');
}

function main(args) {
  const json = args.includes('--json');
  const ids = args.filter(a => a !== '--json');
  if (!ids.length) {
    console.error('Usage: node scripts/derived/lookup.cjs [--json] <RECORD-ID> [<RECORD-ID> ...]');
    process.exitCode = 1;
    return;
  }
  const world = loadWorld();
  const results = [];
  let missing = 0;
  for (const id of ids) {
    const entry = world.byId.get(id);
    if (!entry) {
      missing++;
      console.error(`Not found in any ledger: ${id}`);
      continue;
    }
    const related = resolve(world, entry);
    if (json) results.push({id, type: entry.type, record: entry.row, related});
    else printHuman(id, entry, related);
  }
  if (json) console.log(JSON.stringify(results, null, 2));
  if (missing) process.exitCode = 1;
}

if (require.main === module) main(process.argv.slice(2));
