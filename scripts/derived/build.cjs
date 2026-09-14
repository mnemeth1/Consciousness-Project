'use strict';
// Derived evidence access layer: deterministic, regenerable, NON-CANONICAL views
// of the canonical ledgers in records/, built so agents drafting or reviewing
// thesis chapters can retrieve evidence without reading whole monolithic files.
// The canonical ledgers, work/ reports and state/ files are never modified here
// and remain the only citable authority; every derived file names its inputs.
//
//   node scripts/derived/build.cjs                  # regenerate derived/ from current inputs
//   node scripts/derived/build.cjs --check          # verify derived/ is current; no writes
//   node scripts/derived/build.cjs --sync-manifest  # regenerate, then update PUBLICATION_MANIFEST.json
//                                                   # entries for derived/ via the sanctioned
//                                                   # refresh_public_manifest.cjs (adds/removes are
//                                                   # restricted to derived/ paths; everything else
//                                                   # is only re-hashed)
//
// Maintainer flow when canonical evidence changes (new ledger records, chapter
// front matter, gap/gate files): run --sync-manifest once, then the usual
// export/validation. scripts/validate_public_snapshot.cjs fails on a stale
// derived layer, so a snapshot can never publish views that disagree with the
// ledgers.
//
// Outputs (all under derived/):
//   index/{sources,claims,arguments,cases}.jsonl   compact one-line-per-record indexes
//   by_task/<TASK>.json                            full records grouped by task prefix
//   evidence/<part>.md                             per-chapter/appendix evidence packs
//   gap_gate_register.json                         unified 35-gap + 12-gate register
//   lint_report.md                                 vocabulary-drift report (informational)
//   manifest.json                                  input/output hashes for staleness checks
// Standard library only. No timestamps: outputs depend only on input content.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const ROOT = path.resolve(__dirname, '../..');

const sha256 = text => crypto.createHash('sha256').update(text).digest('hex');
const ID_RE = /^(S|CL|A|C)-([A-Z0-9]+)-\d+$/;
const GENERATED_MD = '<!-- GENERATED FILE. Do not edit; regenerate with: node scripts/derived/build.cjs -->';

function makeReader() {
  const inputs = new Map();
  const readText = rel => {
    const body = fs.readFileSync(path.join(ROOT, rel));
    inputs.set(rel, sha256(body));
    return body.toString('utf8').replace(/^\uFEFF/, '');
  };
  return {inputs, readText, readJSON: rel => JSON.parse(readText(rel))};
}

const taskOf = id => {
  const m = id.match(ID_RE);
  assert(m, `Record ID does not match PREFIX-TASK-NNN: ${id}`);
  return m[2];
};

// Order tasks Phase 1 before Phase 2, then by letter block and number: T04 < T19 < P2T01.
function taskSortKey(task) {
  const m = task.match(/^(P2)?([A-Z]+)(\d+)$/);
  assert(m, `Unparseable task prefix: ${task}`);
  return [m[1] ? 1 : 0, m[2], Number(m[3])];
}
const byTaskOrder = (a, b) => {
  const [ka, kb] = [taskSortKey(a), taskSortKey(b)];
  for (let i = 0; i < 3; i++) if (ka[i] !== kb[i]) return ka[i] < kb[i] ? -1 : 1;
  return 0;
};

const trunc = (text, max) => {
  const s = String(text ?? '').replace(/\s+/g, ' ').trim();
  return s.length > max ? s.slice(0, max - 1).trimEnd() + '…' : s;
};
const list = arr => (arr && arr.length ? arr.join(', ') : '—');

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
  return meta;
}

// ---------------------------------------------------------------------------
// Ledger loading and grouping
// ---------------------------------------------------------------------------

function loadLedgers(io) {
  const ledgers = {
    sources: io.readJSON('records/sources.json'),
    claims: io.readJSON('records/claims.json'),
    arguments: io.readJSON('records/arguments.json'),
    cases: io.readJSON('records/cases.json'),
    reviews: io.readJSON('records/review_summaries.json'),
  };
  const byId = new Map();
  for (const [name, field] of [['sources', 'source_id'], ['claims', 'claim_id'],
                               ['arguments', 'argument_id'], ['cases', 'case_id']])
    for (const row of ledgers[name]) {
      assert(!byId.has(row[field]), `Duplicate record ID: ${row[field]}`);
      byId.set(row[field], row);
    }
  const reviewById = new Map(ledgers.reviews.map(r => [r.review_id, r]));
  assert.equal(reviewById.size, ledgers.reviews.length, 'Duplicate review_id');
  return {...ledgers, byId, reviewById};
}

function groupByTask(ledgers) {
  const groups = new Map(); // task -> {claims, arguments, cases, sourceIds}
  const group = task => {
    if (!groups.has(task)) groups.set(task, {claims: [], arguments: [], cases: [], sourceIds: new Set()});
    return groups.get(task);
  };
  for (const s of ledgers.sources) group(taskOf(s.source_id)).sourceIds.add(s.source_id);
  const collect = (rows, field, bucket) => {
    for (const row of rows) {
      const g = group(taskOf(row[field]));
      g[bucket].push(row);
      for (const sid of row.source_ids || []) g.sourceIds.add(sid);
    }
  };
  collect(ledgers.claims, 'claim_id', 'claims');
  collect(ledgers.arguments, 'argument_id', 'arguments');
  collect(ledgers.cases, 'case_id', 'cases');
  return groups;
}

// ---------------------------------------------------------------------------
// Compact indexes (derived/index/*.jsonl)
// ---------------------------------------------------------------------------

function buildIndexes(ledgers) {
  const jsonl = rows => rows.map(r => JSON.stringify(r)).join('\n') + '\n';
  return {
    'derived/index/sources.jsonl': jsonl(ledgers.sources.map(s => ({
      id: s.source_id, task: taskOf(s.source_id), title: trunc(s.title, 160),
      authors: list(s.authors), date: s.publication_date ?? null, type: s.source_type,
      access: s.access_status, locators: list(s.relevant_locators),
    }))),
    'derived/index/claims.jsonl': jsonl(ledgers.claims.map(c => ({
      id: c.claim_id, task: taskOf(c.claim_id), type: c.claim_type,
      statement: trunc(c.statement, 200), sources: c.source_ids || [],
      cases: c.case_ids || [], dg: c.dependency_group ?? null,
      reliability: c.record_reliability, strength: c.inference_strength, review: c.review_id,
    }))),
    'derived/index/arguments.jsonl': jsonl(ledgers.arguments.map(a => ({
      id: a.argument_id, task: taskOf(a.argument_id), name: trunc(a.name, 120),
      position: a.position, conclusion: trunc(a.conclusion, 200),
      claims: a.claim_ids || [], sources: a.source_ids || [],
      objection: a.strongest_objection ?? null, reply: a.strongest_reply ?? null, review: a.review_id,
    }))),
    'derived/index/cases.jsonl': jsonl(ledgers.cases.map(c => ({
      id: c.case_id, task: taskOf(c.case_id), name: trunc(c.name, 160), kind: c.kind,
      event_date: c.event_date ?? null, sources: c.source_ids || [],
      dup_group: c.duplicate_group ?? null, related: c.related_case_ids || [],
    }))),
  };
}

// ---------------------------------------------------------------------------
// Per-task shards (derived/by_task/<TASK>.json)
// ---------------------------------------------------------------------------

function buildTaskShards(ledgers, groups) {
  const out = {};
  for (const task of [...groups.keys()].sort(byTaskOrder)) {
    const g = groups.get(task);
    const sources = [...g.sourceIds].sort().map(id => {
      const s = ledgers.byId.get(id);
      assert(s, `Referenced source missing from ledger: ${id}`);
      return s;
    });
    const reportRel = `work/${task}/report.md`;
    out[`derived/by_task/${task}.json`] = JSON.stringify({
      note: 'Generated non-canonical view; canonical records live in records/*.json. Rebuild: node scripts/derived/build.cjs',
      task,
      report: fs.existsSync(path.join(ROOT, reportRel)) ? reportRel : null,
      counts: {claims: g.claims.length, arguments: g.arguments.length, cases: g.cases.length, sources: sources.length},
      claims: g.claims,
      arguments: g.arguments,
      cases: g.cases,
      sources,
    }, null, 2) + '\n';
  }
  return out;
}

// ---------------------------------------------------------------------------
// Unified gap/gate register (derived/gap_gate_register.json)
// ---------------------------------------------------------------------------

function buildGapGateRegister(io) {
  const register = io.readJSON('work/G2/gap_register.json');
  const taskMap = io.readJSON('phase2/gap_task_map.json');
  const status = io.readJSON('state/public_status.json');

  const registerRows = [...register.g1_reconciliation, ...register.later_gap_groups];
  const mapById = new Map(taskMap.mapping.map(m => [m.gap_id, m]));
  assert.equal(mapById.size, taskMap.mapping.length, 'Duplicate gap_id in phase2/gap_task_map.json');
  assert.equal(registerRows.length, taskMap.gap_count,
    'gap_register.json and gap_task_map.json disagree on the number of gap groups');
  assert.equal(registerRows.length, status.gap_groups,
    'gap_register.json and state/public_status.json disagree on the number of gap groups');

  const gaps = registerRows.map(row => {
    const mapped = mapById.get(row.gap_id);
    assert(mapped, `Gap in G2 register but not in phase2/gap_task_map.json: ${row.gap_id}`);
    mapById.delete(row.gap_id);
    return {
      gap_id: row.gap_id,
      origin: row.origin,
      register_status: row.status,
      missing_item: row.missing_item,
      consequence: row.consequence,
      closure_condition: row.closure_condition,
      priority: row.priority,
      repair_id: row.repair_id,
      phase2_research_owners: mapped.research_owners,
      phase2_status: mapped.status,
      phase2_special_rule: mapped.special_rule,
      p2a01_disposition: null,
    };
  });
  assert.equal(mapById.size, 0,
    `phase2/gap_task_map.json names gaps missing from the G2 register: ${[...mapById.keys()].join(', ')}`);

  // The canonical machine-readable gate map (work/T16/conclusion_gate_map.json) is
  // not present in this snapshot; the accepted T18 report tables the same twelve
  // gates. Parse that table and fail loudly on any drift.
  const t18 = io.readText('work/T18/report.md');
  const gateRows = [...t18.matchAll(/^\|\s*(GATE-T16-\d{2})\s*\|\s*([^|]+?)\s*\|\s*$/gm)]
    .map(m => ({gate_id: m[1], withheld_conclusion: m[2]}));
  assert.equal(gateRows.length, status.withheld_conclusion_gates,
    'Gate table in work/T18/report.md and state/public_status.json disagree on the gate count');
  gateRows.forEach((g, i) =>
    assert.equal(g.gate_id, `GATE-T16-${String(i + 1).padStart(2, '0')}`,
      `Gate table in work/T18/report.md is not sequential at position ${i + 1}: ${g.gate_id}`));
  const gates = gateRows.map(g => ({
    ...g,
    status: 'withheld',
    wording_source: 'work/T18/report.md (accepted report; tables the T16 conclusion gate map)',
  }));

  const registerJson = {
    schema: 1,
    note: 'Generated non-canonical view unifying the gap and withheld-gate layers for Appendix C '
      + 'drafting. Canonical wording: work/G2/gap_register.json (gaps) and the accepted gate table '
      + 'in work/T18/report.md (gates; the T16 conclusion_gate_map.json annex is not present in '
      + 'this snapshot). Phase 2 mapping: phase2/gap_task_map.json. p2a01_disposition is null '
      + 'because no machine-readable P2A01 disposition file is present in this snapshot; the '
      + 'narrative disposition source is work/P2A01/report.md. An entry here never closes a gap '
      + 'or opens a gate; only overseer-recorded dispositions do. Rebuild: node scripts/derived/build.cjs',
    interpretation: register.interpretation,
    counts: {gap_groups: gaps.length, withheld_conclusion_gates: gates.length},
    gaps,
    gates,
  };
  return {json: JSON.stringify(registerJson, null, 2) + '\n', gaps, gates};
}

// ---------------------------------------------------------------------------
// Evidence packs (derived/evidence/<part>.md)
// ---------------------------------------------------------------------------

function reviewLabel(ledgers, reviewId) {
  const r = ledgers.reviewById.get(reviewId);
  return r ? `${reviewId} (${r.verdict})` : `${reviewId} (not in review_summaries.json)`;
}

function renderArgument(a, ledgers) {
  const lines = [`#### ${a.argument_id} — ${a.name} (position: ${a.position})`, ''];
  lines.push(`- Premises: ${list(a.premises)}`);
  lines.push(`- Bridge principles: ${list(a.bridge_principles)}`);
  lines.push(`- Conclusion: ${a.conclusion}`);
  lines.push(`- Claims: ${list(a.claim_ids)}; sources: ${list(a.source_ids)}`);
  lines.push(`- Strongest objection: ${a.strongest_objection || '—'}; strongest reply: ${a.strongest_reply || '—'}`);
  if (a.dependency_argument_ids?.length) lines.push(`- Depends on arguments: ${list(a.dependency_argument_ids)}`);
  if (a.unresolved_issues?.length) lines.push(`- Unresolved issues: ${a.unresolved_issues.join(' ')}`);
  lines.push(`- Review: ${reviewLabel(ledgers, a.review_id)}`);
  return lines.join('\n');
}

function renderClaim(c, ledgers) {
  const lines = [`#### ${c.claim_id} [${c.claim_type}]`, '', c.statement, ''];
  const locs = (c.source_ids || []).map((sid, i) =>
    c.source_locators?.[i] ? `${sid} (${c.source_locators[i]})` : sid);
  lines.push(`- Sources: ${list(locs)}`);
  if (c.case_ids?.length) lines.push(`- Cases: ${list(c.case_ids)}`);
  if (c.dependency_group) lines.push(`- Dependency group: ${c.dependency_group}`);
  lines.push(`- Reliability: ${c.record_reliability}; inference strength: ${c.inference_strength}`);
  if (c.supporting_claim_ids?.length) lines.push(`- Supporting claims: ${list(c.supporting_claim_ids)}`);
  if (c.alternative_explanations?.length) lines.push(`- Alternative explanations: ${c.alternative_explanations.join(' ')}`);
  if (c.limitations?.length) lines.push(`- Limitations: ${c.limitations.join(' ')}`);
  lines.push(`- Review: ${reviewLabel(ledgers, c.review_id)}`);
  return lines.join('\n');
}

function renderCase(c) {
  const lines = [`#### ${c.case_id} — ${c.name} (${c.kind})`, ''];
  lines.push(`- Underlying event/sample: ${c.underlying_event_or_sample}`);
  if (c.event_date) lines.push(`- Event date: ${c.event_date}`);
  lines.push(`- Sources: ${list(c.source_ids)}`);
  if (c.duplicate_group) lines.push(`- Duplicate group: ${c.duplicate_group}`);
  if (c.reporting_dependency_group) lines.push(`- Reporting dependency group: ${c.reporting_dependency_group}`);
  if (c.overlapping_sample_ids?.length) lines.push(`- Overlapping samples: ${list(c.overlapping_sample_ids)}`);
  if (c.related_case_ids?.length) lines.push(`- Related cases: ${list(c.related_case_ids)}`);
  if (c.chronology?.length) {
    lines.push('- Chronology:');
    for (const step of c.chronology) lines.push(`  - ${step.date}: ${step.event}`);
  }
  if (c.denominators) lines.push(`- Denominators: ${JSON.stringify(c.denominators)}`);
  if (c.access_gaps?.length) {
    lines.push('- Access gaps:');
    for (const gap of c.access_gaps) lines.push(`  - ${gap}`);
  }
  for (const re of c.phase2_reinspections || [])
    lines.push(`- Phase 2 reinspection: ${re.task_id} / ${re.review_id}; claims ${list(re.reinspection_claim_ids)}; ${re.operation}`);
  return lines.join('\n');
}

function renderSource(s) {
  const authors = list(s.authors);
  const date = s.publication_date ? ` (${s.publication_date})` : '';
  const lines = [`- **${s.source_id}** — ${authors}${date}. *${s.title}*. ${s.source_type}; ${s.access_status}.`];
  if (s.relevant_locators?.length) lines.push(`  Locators: ${s.relevant_locators.join('; ')}`);
  if (s.url_or_identifier) lines.push(`  Identifier: ${s.url_or_identifier}`);
  if (s.provenance_notes) lines.push(`  Provenance: ${trunc(s.provenance_notes, 400)}`);
  if (s.related_case_ids?.length) lines.push(`  Related cases: ${list(s.related_case_ids)}`);
  return lines.join('\n');
}

function renderGapGateSection(gapGate) {
  const lines = ['## Unified gap and withheld-gate register', '',
    'Rendered from derived/gap_gate_register.json (see that file for the JSON view and provenance).',
    'An entry here never closes a gap or opens a gate; only overseer-recorded dispositions do.', ''];
  lines.push(`### Gap groups (${gapGate.gaps.length})`, '');
  for (const g of gapGate.gaps) {
    lines.push(`#### ${g.gap_id} [priority ${g.priority}] — ${g.register_status}`, '');
    lines.push(`- Origin: ${list(g.origin)}; Phase 2 research owners: ${list(g.phase2_research_owners)}`);
    lines.push(`- Missing item: ${g.missing_item}`);
    lines.push(`- Consequence: ${g.consequence}`);
    lines.push(`- Closure condition: ${g.closure_condition}`);
    lines.push(`- Repair: ${g.repair_id || '—'}; Phase 2 status: ${g.phase2_status}`);
    lines.push(`- Special rule: ${g.phase2_special_rule}`);
    lines.push('');
  }
  lines.push(`### Withheld stronger-conclusion gates (${gapGate.gates.length})`, '');
  for (const g of gapGate.gates)
    lines.push(`- **${g.gate_id}** (withheld): ${g.withheld_conclusion}`);
  return lines.join('\n');
}

function buildEvidencePacks(io, ledgers, groups, gapGate) {
  const config = io.readJSON('thesis/thesis.json');
  const map = io.readJSON('thesis/evidence_map.json');
  assert.equal(map.schema, 1, 'thesis/evidence_map.json schema must be 1');

  const parts = [
    ...config.chapters.map(c => ({file: c.file, prefix: `c${path.basename(c.file).slice(0, 2)}`})),
    ...config.appendices.map(a => ({file: a.file, prefix: `ap${path.basename(a.file)[0]}`})),
  ];
  assert.deepEqual(Object.keys(map.parts).sort(), parts.map(p => p.prefix).sort(),
    'thesis/evidence_map.json must cover exactly the parts listed in thesis/thesis.json');

  const out = {};
  for (const part of parts) {
    const rel = `thesis/${part.file}`;
    const meta = parseFrontMatter(io.readText(rel), rel);
    const entry = map.parts[part.prefix];

    // Every work/<TASK>/report.md named in front matter must be mapped, so the
    // map cannot silently fall behind the chapters it serves.
    for (const input of meta.inputs) {
      const m = input.match(/^work\/([A-Z0-9]+)\/report\.md\b/);
      if (m) assert(entry.tasks.includes(m[1]),
        `${rel}: front-matter input ${input} names task ${m[1]} missing from thesis/evidence_map.json (${part.prefix})`);
    }
    for (const task of entry.tasks)
      assert(groups.has(task) || fs.existsSync(path.join(ROOT, `work/${task}/report.md`)),
        `thesis/evidence_map.json (${part.prefix}): unknown task ${task} (no ledger records, no work/${task}/report.md)`);
    for (const sub of entry.submitted_inputs || [])
      assert(fs.existsSync(path.join(ROOT, sub)),
        `thesis/evidence_map.json (${part.prefix}): missing submitted input ${sub}`);

    const lines = [GENERATED_MD, '',
      `# Evidence pack ${part.prefix} — ${meta.title}`, '',
      `Non-canonical derived view for drafting/reviewing \`thesis/${part.file}\` (status: ${meta.status}).`,
      'Cite only canonical ledger IDs (CL-*, A-*, C-*, S-*); this file is a reading convenience, not a source.',
      'Full per-task records: derived/by_task/<TASK>.json. Single-record lookup: node scripts/derived/lookup.cjs <ID>.',
      ''];
    lines.push('## Chapter inputs (front matter)', '');
    for (const input of meta.inputs) lines.push(`- ${input}`);
    if (entry.note) lines.push('', `Note: ${entry.note}`);
    if (entry.submitted_inputs?.length) {
      lines.push('', '## Submitted (not accepted) inputs — label explicitly if used', '');
      for (const sub of entry.submitted_inputs) lines.push(`- ${sub}`);
    }
    lines.push('');

    const packSources = new Map();
    for (const task of [...entry.tasks].sort(byTaskOrder)) {
      const g = groups.get(task) || {claims: [], arguments: [], cases: [], sourceIds: new Set()};
      const reportRel = `work/${task}/report.md`;
      const hasReport = fs.existsSync(path.join(ROOT, reportRel));
      lines.push(`## Task ${task}${hasReport ? ` (narrative: ${reportRel})` : ''}`, '');
      if (!g.claims.length && !g.arguments.length && !g.cases.length && !g.sourceIds.size) {
        lines.push(`No ledger records carry the ${task} prefix; the task report is the only input.`, '');
        continue;
      }
      for (const sid of g.sourceIds) packSources.set(sid, ledgers.byId.get(sid));
      if (g.arguments.length) {
        lines.push(`### Arguments (${g.arguments.length})`, '');
        for (const a of g.arguments) lines.push(renderArgument(a, ledgers), '');
      }
      if (g.claims.length) {
        lines.push(`### Claims (${g.claims.length})`, '');
        for (const c of g.claims) lines.push(renderClaim(c, ledgers), '');
      }
      if (g.cases.length) {
        lines.push(`### Cases (${g.cases.length})`, '');
        for (const c of g.cases) lines.push(renderCase(c), '');
      }
    }

    if (entry.include_all_cases) {
      lines.push(`## All case records (${ledgers.cases.length})`, '');
      for (const c of ledgers.cases) {
        lines.push(renderCase(c), '');
        for (const sid of c.source_ids || []) packSources.set(sid, ledgers.byId.get(sid));
      }
    }
    if (entry.include_gap_gate_register) lines.push(renderGapGateSection(gapGate), '');

    if (packSources.size) {
      lines.push(`## Sources cited in this pack (${packSources.size})`, '');
      for (const sid of [...packSources.keys()].sort()) {
        const s = packSources.get(sid);
        assert(s, `Pack references source missing from ledger: ${sid}`);
        lines.push(renderSource(s));
      }
      lines.push('');
    }
    lines.push('## Standing constraints', '',
      '- Withheld stronger-conclusion gates and gap dispositions: derived/gap_gate_register.json (35 gaps, 12 gates).',
      '- Synthesis constraints, component boundaries and sensitivity designs: work/G2/synthesis_constraints.json.',
      '- Chapter obligations, budgets and gap-packet rules: phase3/Thesis_Execution_Plan.md.', '');
    out[`derived/evidence/${part.prefix}.md`] = lines.join('\n');
  }
  return out;
}

// ---------------------------------------------------------------------------
// Vocabulary drift report (derived/lint_report.md)
// ---------------------------------------------------------------------------

function buildLintReport(ledgers) {
  const histogram = (rows, field) => {
    const counts = new Map();
    for (const row of rows) {
      const value = row[field] ?? '(missing)';
      counts.set(value, (counts.get(value) || 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1));
  };
  const section = (title, rel, rows, field) => {
    const entries = histogram(rows, field);
    return [`### ${title} (\`${field}\` in ${rel}): ${entries.length} distinct values`, '',
      ...entries.map(([value, n]) => `- ${n} × \`${value}\``), ''].join('\n');
  };

  const reviewBuckets = new Map();
  const bucketOf = id =>
    /^R\d+$/.test(id) ? 'R<NN> (Phase 1 reviews)'
    : /^P2R[A-Z]*\d+$/.test(id) ? 'P2R<NN> (Phase 2 reviews)'
    : /^R-P2R\d+$/.test(id) ? 'R-P2R<NN> (prefixed Phase 2 reviews)'
    : /^RV-[A-Z0-9]+-\d+$/.test(id) ? 'RV-<TASK>-<NNN>'
    : /^G\d+$/.test(id) ? 'G<N> (gate reviews)'
    : 'other';
  for (const r of ledgers.reviews) {
    const b = bucketOf(r.review_id);
    if (!reviewBuckets.has(b)) reviewBuckets.set(b, []);
    reviewBuckets.get(b).push(r.review_id);
  }

  const emptyConflicts = ledgers.claims.filter(c => !(c.conflicting_claim_ids || []).length).length;
  const lines = [GENERATED_MD, '', '# Ledger vocabulary drift report', '',
    'Informational only. The canonical ledgers use free-text values in several fields that',
    'templates treat as enumerations; this report lists the actual value inventory so filtering',
    'agents know not to rely on exact enum matches, and so the overseer has a concrete worklist',
    'if normalization is ever authorized. Nothing here modifies or judges any record.', '',
    '## Free-text field inventories', '',
    section('Claim types', 'records/claims.json', ledgers.claims, 'claim_type'),
    section('Record reliability', 'records/claims.json', ledgers.claims, 'record_reliability'),
    section('Inference strength', 'records/claims.json', ledgers.claims, 'inference_strength'),
    section('Source types', 'records/sources.json', ledgers.sources, 'source_type'),
    section('Access status', 'records/sources.json', ledgers.sources, 'access_status'),
    section('Case kinds', 'records/cases.json', ledgers.cases, 'kind'),
    section('Argument positions', 'records/arguments.json', ledgers.arguments, 'position'),
    '## Review ID formats (records/review_summaries.json)', ''];
  for (const [bucket, ids] of [...reviewBuckets.entries()].sort((a, b) => b[1].length - a[1].length))
    lines.push(`- ${ids.length} × ${bucket}: ${ids.sort().join(', ')}`);
  lines.push('', '## Structural notes', '',
    `- \`conflicting_claim_ids\` is empty on ${emptyConflicts} of ${ledgers.claims.length} claims; ` +
    'conflicts are carried in `alternative_explanations` prose and argument objection/reply links instead.',
    '- Record IDs are uniformly `PREFIX-TASK-NNN`; review IDs are not (see buckets above).', '');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Build, manifest, check
// ---------------------------------------------------------------------------

function build() {
  const io = makeReader();
  const ledgers = loadLedgers(io);
  const groups = groupByTask(ledgers);

  const outputs = {};
  Object.assign(outputs, buildIndexes(ledgers));
  Object.assign(outputs, buildTaskShards(ledgers, groups));
  const gapGate = buildGapGateRegister(io);
  outputs['derived/gap_gate_register.json'] = gapGate.json;
  Object.assign(outputs, buildEvidencePacks(io, ledgers, groups, gapGate));
  outputs['derived/lint_report.md'] = buildLintReport(ledgers);

  outputs['derived/manifest.json'] = JSON.stringify({
    schema: 1,
    note: 'Hashes of the inputs this derived layer was generated from and of every generated file. '
      + 'Run node scripts/derived/build.cjs --check to detect staleness after ledger edits.',
    inputs: Object.fromEntries([...io.inputs.entries()].sort()),
    outputs: Object.fromEntries(Object.entries(outputs).map(([rel, text]) => [rel, sha256(text)]).sort()),
  }, null, 2) + '\n';
  return outputs;
}

function listDerivedFiles() {
  const found = [];
  const walk = dir => {
    if (!fs.existsSync(dir)) return;
    for (const item of fs.readdirSync(dir, {withFileTypes: true})) {
      const p = path.join(dir, item.name);
      if (item.isDirectory()) walk(p);
      else found.push(path.relative(ROOT, p).replaceAll('\\', '/'));
    }
  };
  walk(path.join(ROOT, 'derived'));
  return found;
}

// Regenerate in memory and report every difference from disk. Empty result
// means derived/ exactly matches the current canonical inputs. Also used by
// scripts/validate_public_snapshot.cjs to gate snapshots on derived freshness.
function checkProblems() {
  const outputs = build();
  const problems = [];
  for (const rel of Object.keys(outputs).sort()) {
    const p = path.join(ROOT, rel);
    if (!fs.existsSync(p)) { problems.push(`missing: ${rel}`); continue; }
    if (fs.readFileSync(p, 'utf8') !== outputs[rel]) problems.push(`stale: ${rel}`);
  }
  for (const rel of listDerivedFiles())
    if (!(rel in outputs)) problems.push(`stray file not produced by the build: ${rel}`);
  return problems;
}

// Update the publication manifest through the sanctioned refresh script.
// Adds and removes are restricted to derived/ paths, which are safe to
// allowlist mechanically because the build reads only manifest-listed public
// inputs; every other entry is merely re-hashed by the refresh script.
function syncManifest(outputs) {
  const {spawnSync} = require('node:child_process');
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'PUBLICATION_MANIFEST.json'), 'utf8'));
  const listed = new Set(manifest.files.map(f => f.path).filter(p => p.startsWith('derived/')));
  const produced = new Set(Object.keys(outputs));
  for (const rel of produced) assert(rel.startsWith('derived/'), `Unexpected non-derived output: ${rel}`);
  const args = [];
  for (const rel of [...produced].sort()) if (!listed.has(rel)) args.push('--add', rel);
  for (const rel of [...listed].sort()) if (!produced.has(rel)) args.push('--remove', rel);
  const run = spawnSync(process.execPath,
    [path.join(ROOT, 'scripts/refresh_public_manifest.cjs'), ...args], {encoding: 'utf8', cwd: ROOT});
  process.stdout.write(run.stdout || '');
  process.stderr.write(run.stderr || '');
  assert.equal(run.status, 0, 'Manifest refresh failed');
}

function main(args) {
  if (args.includes('--check')) {
    const problems = checkProblems();
    if (problems.length) {
      for (const p of problems) console.error(p);
      throw new Error(`derived/ is stale (${problems.length} problem(s)); run node scripts/derived/build.cjs`);
    }
    console.log('Derived layer is current: all files match the ledgers.');
    return;
  }
  const outputs = build();
  const relPaths = Object.keys(outputs).sort();
  fs.rmSync(path.join(ROOT, 'derived'), {recursive: true, force: true});
  for (const rel of relPaths) {
    const p = path.join(ROOT, rel);
    fs.mkdirSync(path.dirname(p), {recursive: true});
    fs.writeFileSync(p, outputs[rel]);
  }
  console.log(`Derived layer rebuilt: ${relPaths.length} files under derived/.`);
  console.log('Non-canonical views only; canonical records live in records/, work/ and state/.');
  if (args.includes('--sync-manifest')) syncManifest(outputs);
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(`Derived build failed: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {build, checkProblems};
