# P3R02 — Independent review: thesis chapter Comparative Method and Evidence Discipline

Status: submitted to overseer. Reviewer authored none of the chapter, crosswalk, or P3C02 packet. Reviewer does not optimize for agreement with the author or overseer.

- Task: P3R02
- Chapter: `thesis/chapters/02-methodology.md` (c02, status `submitted`, 41 paragraphs c02-p001–c02-p041; p041 inserted, no renumbering)
- Crosswalk: `thesis/crosswalk/c02.json` (41 entries)
- Author packet: `work/P3C02/report.md`, `work/P3C02/result.json`
- First-review verdict: **revise** (5 material, 12 minor)
- Re-review of revision 1 verdict: **accept**
- Remaining material defects: none
- Residual non-blocking notes: see re-review section

The original review body below is retained as the first-cycle record. The operative verdict is in **Re-review of revision 1**.

## Reviewer independence and scope

The reviewer did not author P3C02, the chapter, or the crosswalk. No external web searches and no external source inspections were used (budget 0/4 queries, 0/8 inspections). The chapter cites no external sources; the load-bearing claims are about project method documents. Reading those documents is input verification, not source inspection. P3G1 has not yet allocated transferred P2R20 reopenings; none were required for this chapter.

## What was checked

Binding files read first: `AGENTS.md`, `prompts/chapter_reviewer.md`, P3R02/P3C02 contracts in `state/tasks.json`, `phase3/Thesis_Execution_Plan.md`, `prompts/thesis_author.md`.

Frozen inputs compared against every load-bearing method claim in the sampled set:

- `paper/paper.html` §2 (`p-006`, `p-007`; `p-005` read only for boundary)
- `work/T02/report.md`
- `work/G0/protocol_v1.md` (header plus §§1–7)
- `AI_Execution_Framework.md` §§5–6
- `work/G2/synthesis_constraints.json` (SC-G2-01..10, nine `component_requirements`, eight `required_sensitivity_tests`)
- `derived/gap_gate_register.json` (counts recomputed, not taken on trust)

Repository checks used to test claims about the project record (not to smuggle extra frozen inputs into the author's permission set): `STATUS.md`, `state/tasks.json`, `work/G0/gate_decision.md`, `work/G1/gate_decision.md`, `work/G2/gap_register.json`, `derived/lint_report.md`, `derived/evidence/c02.md`, `work/T03/report.md` C1–C6 table (incorporated annex named in the protocol header), `work/T18/report.md` gate table, `templates/records.json`, `thesis/thesis.json`. SHA-256 values in `work/P3C02/result.json` were recomputed for the seven listed artifacts; all matched.

Build: `node scripts/thesis/build.cjs --check` passed. `node scripts/derived/build.cjs --check` failed: `derived/evidence/c02.md` and `derived/manifest.json` stale. Process defect, reported below; verification used canonical files, not the stale pack.

Crosswalk: 40 entries, 40 unique paragraph IDs, exactly one `refs` item per entry, IDs c02-p001–c02-p040 matching the chapter. All refs are `PREMISE:method:*` labels, not ledger IDs and not findings.

No paragraph asserts a metaphysical verdict. All twelve gates in `derived/gap_gate_register.json` remain `withheld`. P2S01/P2S02 are unused. The chapter does not describe the bounded review as an exhaustive or completed systematic review.

## Verdict in one paragraph

The chapter is a competent expansion of article §2 and mostly tracks protocol §§1–7, framework §§5–6, and the G2 constraints. It also converts prescriptions into a history of compliance, misstates the frozen cutoff, omits the bootstrap exception that sits in the same protocol file, presents a closed six-type taxonomy as structurally enforced in ledgers whose vocabularies are free text, and weakens SENS-G2-05. Those are method defects, not style. They block acceptance.

---

## Fidelity sample (20 paragraphs, chosen as the ones most likely to be embellished)

Unsampled paragraphs were read in full for smuggled conclusions, invented counts, and self-inflation. They are not given line-by-line below. Nothing in the unscanned remainder reversed the verdict.

### c02-p002 — freeze provenance

Crosswalk: `PREMISE:method:protocol-freeze-provenance (work/G0/protocol_v1.md header; work/T02/report.md; work/G2/synthesis_constraints.json)`.

Compared to: protocol header (candidate freeze, T02 hash `75d89bdb...`, T01/T03 annexes, opening bootstrap exception, “T02 had not been frozen during T03”); T02 report opening (overseer freezes `work/G0/protocol_v1.md`); G2 constraints object (10 constraints, 9 components, 8 tests).

Supported: a hashed protocol file exists; G2 recorded ten constraints, nine boundaries, eight tests before cumulative synthesis; method statements are mapped as premises.

Not supported: “frozen … before the evidence tasks that it governs were executed,” stated without the header’s own exception. The same file says T01–T03 were allowed to set stipulations without a full literature comparison, T03 omitted backward/forward citation chasing, those passes “do not count … as executed,” and the six families are not “source-verified representative literature.” “Operative discipline rather than a retrospective rationalization” is a self-characterisation the inputs do not license once that exception is in view. G1 (repository check, not a P3C02 frozen input) later recorded seven procedural repairs and refused “unconditional compliance with the full v1 search coverage.” The chapter never mentions any of this.

**Material.** Exact correction: in c02-p002, state the G0 bootstrap exception in the same breath as the freeze. Say T01–T03 predate the freeze; T03’s omitted citation passes are not executed; later evidence tasks were bound by the frozen file; G2’s ten/nine/eight items are standing synthesis constraints, not proof that v1 was followed without remainder.

### c02-p003 — five criteria

Crosswalk: `paper/paper.html p-006`.

Article `p-006` names explanatory adequacy, coherence, independent motivation, fit with the evidence, and discriminatory power, without definitions. The unpacking sentences are author glosses. They are not contradicted by the article. They are also not in T02 or protocol §§1–7.

Protocol header incorporates T03’s C1–C6. T03’s table is not the article’s five: C1 coherence; C2 explanatory *scope*; C3 independent warrant and cost; C4 evidential fit; C5 discrimination; **C6 remaining problems**. The chapter presents five criteria as the method and never mentions C6 or the C1–C6 labels.

**Minor** (completeness relative to the incorporated annex, not infidelity to `p-006`). Exact correction: one sentence reconciling article-five with T03 C1–C6, including C6 remaining problems as a sixth operational check or as absorbed into the strongest-reply/remaining-cost rule in c02-p012.

### c02-p004 — accommodation vs prediction

Crosswalk: protocol s5.

Protocol s5: track accommodation separately from prior prediction; specify what would weaken as well as strengthen the favoured explanation. Chapter adds “in advance” and a standing promise that chapters will state predicted vs accommodated fit.

**Minor** (“in advance” slightly preregisters a tracking rule). Faithful in substance. Correction: drop “in advance,” or mark it as a thesis-layer tightening of s5 rather than a v1 rule.

### c02-p006 — six families and R/E/O

Crosswalk: protocol s1 plus “T03 annex R/E/O convention.”

Protocol s1 names the six families exactly (physicalist, psychophysical-law, panpsychist, dualist, idealist, theistic), strongest explicit formulations, and no inference of moral/identity positions from family membership. Header: R/E/O cells are required/excluded/open commitments of a declared model, not confidence. Content is supported.

Defects: (1) crosswalk locates T03 annex, which the author packet does not list as read; the R/E/O sentence is already in the protocol header. (2) p006 does not carry the header’s warning that the six families are not source-verified representative literature (p039 later qualifies coverage; p006 still over-claims “strongest explicit formulation available in the project record”).

**Minor.** Correction: point the crosswalk at the protocol header, not T03; add a forward pointer from p006 to the inspected-original limit in p039.

### c02-p007 — nine components

Crosswalk: G2 `component_requirements`; protocol s1.

G2’s nine IDs and the quoted boundaries match: irreducibility/necessary ground ↛ universal subject (H-F); brain influence ↛ every independence proposal (H-B); record fidelity ↛ survival (H-P); production ↛ intended production (H-I); consciousness/unity/creation/power/endurance ↛ binding moral reasons (H-A). Protocol s1’s body still lists eight older headings; the header’s T01 annex already has H-F/U/B/S/T/P/I/G/A. Using G2’s nine is correct.

The “concrete” list omits H-U, H-S, H-T, H-G boundaries. That is selection, not contradiction.

**No defect** in the sampled claims. Optional editorial: note that s1’s eight-item sentence was disaggregated.

### c02-p008 — epistemic types as ledger census

Crosswalk: protocol s5; framework §6.

Protocol s5 *requires* each claim to state one of: reported experience, observed event, documented measurement, philosophical premise, normative premise, inference. Framework §6: every claim records epistemic type. Those are rules.

The paragraph says “Every claim in the project ledgers states its epistemic type: [those six].” That is a census. `derived/lint_report.md` inventories **38** distinct `claim_type` values. Dominant extras include `philosophical_attribution` (119) and `philosophical_argument_attribution` (23). `observed_event` appears 6 times. **`normative premise` / `normative_premise` does not appear in the claim-type inventory at all.** AGENTS.md already warns that field vocabularies are free text.

“Collapsing these types is the most common way that surveys of this territory overstate their evidence” is an unsourced claim about other surveys. Not in any frozen input.

**Material.** Exact correction: write the six types as the *prescribed* recording rule. Do not claim the ledgers instantiate exactly those six. Do not claim a sociology of “surveys of this territory” without a record. If the chapter wants to talk about practice, it must say the ledgers use free-text types and that this is a remaining discipline gap.

### c02-p009 — three distinctions “enforced structurally”

Crosswalk: `paper/paper.html p-007`.

The three distinctions match `p-007` exactly. The last sentence — “enforced structurally, in the record types and review checks, rather than merely announced” — is not in the article and is not supported as a description of the ledgers (see p008 and lint_report: 38 claim types, 35 reliability strings, 72 inference-strength strings).

**Material** (same family as p008). Exact correction: “required in protocol and review checks.” Strike “enforced structurally” unless a closed schema is actually in force.

### c02-p010 — chronology and absence

Crosswalk: protocol s5; framework §5.

Protocol s5: medical events/measurements, inferred experience timing, first account, corroboration, ordinary information access, later revisions; retain uncertainty and contradictions; absent circulation, absent measurement, and demonstrated absence of processing are distinct. Framework §5: do not infer impossible brain activity from absent measurement. Match.

The monitored-channel clause (“demonstrated absence in a monitored channel is never extended to channels that were not monitored”) unpacks the third distinction. It is not extra metaphysics. Acceptable expansion.

**No material defect.**

### c02-p012 — argument anatomy and barred inferences

Crosswalk: protocol s5; framework §5.

Premises/bridges/conclusions, objection classes, strongest reply plus remaining cost, dissatisfaction ≠ impossibility, coherence ≠ actuality, subjective timelessness ≠ ontological timelessness, preserved information ≠ continuing subject: all in s5 / framework §5. Chapter uses “empirical adequacy” (framework) where protocol says “empirical fit.” Harmless.

**No material defect.**

### c02-p014 — staged execution and “forty-one”

Crosswalk: protocol s1 only.

Protocol s1: Neal dossier + qualia pilot, independently reviewed at R04/R05; no population estimate; G1 records defects and repairs before expansion; then Alexander, prospective studies, additional cases, historical/cultural reports, remaining philosophical domains. STATUS.md: “Phase 2 has 41 of 46 assignments accepted … workflow progress, not a count of independent observations.” `state/tasks.json`: 46 P2 tasks, 41 accepted, 5 not accepted (P2S01 submitted, P2S02 submitted, P2S03 blocked, P2R20 planned, P2G2 planned). The “not forty-one independent observations” clause is the right use of the number.

Defects: (1) “forty-one accepted assignments” omits Phase 2 and “of 46.” The repo has 78 accepted tasks overall. (2) Crosswalk does not name STATUS.md, which is the only source of 41. (3) “Defects found in the pilots were recorded and repaired” tracks protocol s1’s wording but is easy to read as if evidential holes were filled. G1 accepted a partial corpus and kept missing medical records, earliest narrative, and incomplete citation passes.

**Minor** (number is correct for Phase 2; presentation and crosswalk are not). Exact correction: “forty-one of forty-six Phase 2 assignments accepted as of STATUS.md (13 September 2026) are completed procedures, not independent observations.” Map STATUS.md in the crosswalk, or drop the numeral. Qualify “repaired” as method repairs plus recorded remainder, not closure of pilot evidence gaps.

### c02-p016 — screening window and citation passes

Crosswalk: protocol s2.

Protocol s2: default window = first 20 results actually exposed, *or all if fewer*; preserve ranking and identifiers; same window for favourable and unfavourable queries; do not call ranked results a random sample; for each included original, one backward-reference pass and one forward-citation search *where accessible within budget*; discovery is not inspection.

The window, equal screening, non-randomness, and discovery≠inspection are faithful. Omitting “or all if fewer” is minor.

“one backward-reference pass and one forward-citation search **were performed** where accessible within budget” is past-tense compliance. Protocol s2 is a requirement. The protocol *header* says T03’s omission of those passes is accepted only for the opening task and **does not count those passes as executed**. G1 records that T04 did not complete dedicated forward-citation passes and T05 used one shared title-OR forward query for two originals. SC-G2-08: distinct title queries are bounded discovery, not complete cited-by indexes. None of that appears here.

The hedge “where accessible within budget” does not cover recorded *omissions*. An omitted pass is not an inaccessible pass.

**Material.** Exact correction: state the requirement as a requirement. Explicitly except the recorded opening-task non-execution. Do not imply a completed citation-chasing programme. Include SC-G2-08’s limit: title queries ≠ cited-by completeness.

### c02-p021 — frozen cutoff

Crosswalk: protocol s1; SC-G2-08.

Protocol s1: “earliest retrievable **publications** through 2026-09-11 inclusive, with no lower publication-date cutoff”; event/report/publication/retrieval dates recorded separately; later contracts may freeze or extend; new material after the cutoff is an update lead. SC-G2-08: retain frozen cutoff 2026-09-11, English/accessible-translation scope, actual public-web methods; no claim of exhaustive/systematic-review completion.

The chapter: “Claims about the existing evidence rest on **searches executed up to and including 11 September 2026**, with no lower publication-date bound.”

That is a different rule. The freeze is a literature-date bound, not a stop-clock on search execution. Protocol date is 2026-09-12. STATUS.md is 13 September 2026. Phase 2 evidence tasks ran at and after that freeze; Phase 3 still allows actual-dated new searches for gap packets. English scope, four date fields, update-lead rule, and “bounded review with systematic procedures / not exhaustive or completed systematic review” are faithful.

**Material. Decisive misattribution of the protocol.** Exact correction: replace the search-execution sentence with the publication-date cutoff, keep retrieval dates distinct, and keep the “not a completed systematic review” sentence.

### c02-p024 — review duties

Crosswalk: protocol s7; framework §5.

Protocol s7: reopen every source supporting a decisive claim; check passages plus needed methods/context; sample supporting material; verify query coverage, selection/exclusion, accessibility, denominators, duplicates, chronology, strongest alternatives, counterevidence, bridges, three judgments; default eight sources; more decisive sources require a scoped extension, never silent omission. Framework §5.6 is weaker (“reopens decisive sources”). Chapter follows protocol, correctly.

**No material defect** as a statement of the *rule*. The limits section still needs to say this rule is budgeted and was not the same as a completed P2R20 (see strongest countercase).

### c02-p025 — verdicts and four blocking defects

Crosswalk: protocol s7.

Accept = method met, including honest unresolved; not metaphysical truth. Revise = repairable material defect. Unresolved = inaccessible decisive evidence or persistent disagreement, with the limited conclusion stated. Four blockers: decisive citation error, concealed missing denominator, independence overcount, unmarked report-to-event inference. Match.

“The chapters of this thesis inherit these adjudicated statuses rather than improving on them” is a thesis-layer rule, acceptable.

**No material defect.**

### c02-p026 — two revision cycles

Crosswalk: protocol s7; AGENTS.md.

“At most two substantive revision cycles,” then record disagreement or split; no self-approval; reviewers report to overseer; model agreement is not an extra observation. Match. “two systems endorsing the same claim is one claim” is a fair expansion.

**No material defect.**

### c02-p028 — acceptance is not validation

Crosswalk: protocol s7; STATUS.md.

STATUS.md: AI-assisted project research, not journal peer review; Phase 2 acceptance is workflow progress. Protocol s7: accept means method met. The paragraph correctly refuses to convert procedural acceptance into external validation.

It still under-discloses: P2R20 remains unperformed; the article this chapter expands has not had the contracted independent final review. That belongs in the limits section (minor relative to p028’s actual sentences, material as a missing weakness — see below).

**No material defect in the sentences as written.**

### c02-p037 — eight sensitivity tests

Crosswalk: G2 `required_sensitivity_tests`; article `p-007`.

Article `p-007`: qualitative withdrawal of cases or premises. G2 specifies eight tests. Protocol s6 had a shorter list (strongest disputed NDE case, all retrospective cases, uncertain-dependent contributions, central moral/meaning bridge, alternate identity assumptions). Framework §6 is shorter still. Using G2’s eight is the right standing constraint. p002 already says later phases recorded the eight tests.

Line-by-line against G2:

| Test | G2 | Chapter | Issue |
| --- | --- | --- | --- |
| 01 | Strongest disputed named **NDE** case, criterion in T16; **second candidate if ordering ambiguous** | strongest disputed named case, explicit criterion | omits NDE, omits second candidate |
| 02 | All retrospective cases/narratives, **including retrospective community arm**; retain truly prospective at real denominators | omits community arm | under-specified |
| 03 | Uncertain sample/event dependence | match | ok |
| 04 | Psychological, organism, simple-subject; **strict vs prudential continuity; M1–M4** | three identity views only | omits M1–M4 and strict/prudential |
| 05 | **endurance-required-for-value**, unity-to-obligation, consciousness-to-authority | **endurance-to-value** | **changes the bridge** |
| 06 | Global PSR, epistemic-to-metaphysical, **life-valuing** designer preferences, one at a time | “designer-preference” | omits life-valuing |
| 07 | Strongest neural intervention **or report-to-experience proxy**; independence model with predictive constraints retained | neural-intervention constraint; “symmetric” gloss | omits proxy and retained-constraints clause |
| 08 | Directly inspected **positive** original defenders and **direct** replies | original defenders and replies | omits positive/direct |

**Material** on SENS-G2-05: “endurance-to-value” is not “endurance-required-for-value.” GATE-T16-10 withholds “Endurance necessary for all meaning.” Removing a necessity-bridge is a different test from removing a contribution-to-value bridge. That is a weakening of a prespecified test.

Other compressions: **minor** as a group, still to be restored or explicitly marked as paraphrase with the omitted clauses named.

Exact correction: restore “endurance-required-for-value” (or “endurance necessary for value”). Restore, or footnote as omitted-from-prose but binding: second candidate; retrospective community arm; M1–M4 and strict vs prudential identity; life-valuing designer preferences; neural intervention *or* report-to-experience proxy with retained predictive constraints; positive original defenders and direct replies.

### c02-p038 — 35 / 12 and closure conditions

Crosswalk: SC-G2-10; `derived/gap_gate_register.json`.

Recomputed: `counts.gap_groups === 35`, `counts.withheld_conclusion_gates === 12`; 35 `gap_id` values (G1-GAP-01–G2-GAP-35); 12 `gate_id` values (GATE-T16-01–12), all `status: "withheld"`. Canonical `work/G2/gap_register.json` has 35 `gap_id` entries. T18 tables the same twelve gates. U3’s numbers are correct.

All 35 gaps have `closure_condition`. The 12 gate objects have `gate_id`, `withheld_conclusion`, `status`, `wording_source` — **no `closure_condition` field**. “each with an explicit closure condition” over-extends from gaps to gates.

“During synthesis, every stronger intended conclusion was mapped to the specific gap that blocks it”: SC-G2-10 assigns that mapping to the T16 contract. The derived register notes that `conclusion_gate_map.json` is not in this snapshot; T18 tables the gates. Treat as a constraint-description, not as an audited T16 file in this clone.

The standing rule (do not assert a gated conclusion without repair-under-review or explicit withhold) matches SC-G2-10 and the thesis plan. No gate is opened.

**Minor** on “each … closure condition.” Exact correction: thirty-five gap groups each with a closure condition, and twelve withheld-conclusion gates (GATE-T16-01–12) still withheld. Cite `work/G2/gap_register.json` and T18 for canonical wording; derived is non-canonical.

### c02-p039 — coverage limits

Crosswalk: SC-G2-02, SC-G2-08.

Asymmetry, budgeted searches, finite windows, frozen cutoff, English skew, inspected original vs secondary vs reconstruction vs uninspected variant, no broad family ranking before original-defender repair: match. This is the right place for those limits.

It still omits the recorded non-execution of citation passes, the search-date vs publication-date distinction, destination-planned-vs-accessed, irreproducible rankings, ledger vocabulary drift, and outstanding P2R20. Those omissions keep this section from doing the work its heading promises. See strongest countercase.

**Minor as a paragraph; material as a missing-limits problem for the section.**

### c02-p040 — “cannot convert rigor into truth”

Crosswalk: protocol s7; SC-G2-01.

The refusals of numerical posterior, completed systematic review, and external peer validation are correct and needed. “Procedural acceptance … is a fact about this project’s workflow” is correct.

Then the paragraph takes back the concession: the discipline is “for the purpose of this thesis, **sufficient**,” and “every substantive conclusion in the following chapters **can be** traced … tested … checked.” Other chapters are mostly skeleton (`thesis/build.cjs --check`: c01 and c03–c12 still `skeleton`). Sufficiency and traceability of undrafted conclusions are not in the frozen inputs. “The reopened sources” as a completed cost-raising fact also overstates what this chapter can certify.

**Minor** (self-inflation at the close, not a smuggled metaphysics). Exact correction: strike “sufficient.” Replace the guarantee with a requirement: later chapters *must* trace, and may not assert a gated conclusion. Do not treat undrafted crosswalks as already checkable.

---

## Numbers (repository check)

| Claim | Location | Check | Result |
| --- | --- | --- | --- |
| Five criteria | c02-p003; article p-006 | named as in p-006 | pass (C1–C6 unreconciled: minor) |
| Six families | c02-p006; protocol s1 | exact list | pass |
| Nine components | c02-p007; G2 | H-F/U/B/S/T/P/I/G/A | pass |
| Eight sensitivity tests | c02-p037; G2 | eight tests exist; SENS-G2-05 wording fails | fail (material) |
| Ten constraints | c02-p002; G2 | SC-G2-01..10 | pass |
| Forty-one accepted assignments | c02-p014; STATUS.md; tasks.json | 41 of 46 Phase 2; 78 accepted in full task list | pass only if scoped to Phase 2 (currently not) |
| Thirty-five gap groups | c02-p038 | 35 gaps, all with closure_condition | pass |
| Twelve withheld gates | c02-p038 | GATE-T16-01..12, all withheld | pass |
| Cutoff 2026-09-11 | c02-p021 | publication cutoff, not search-execution | fail (material) |
| Twenty-result window | c02-p016; protocol s2 | first 20 exposed, or all if fewer | pass with minor omission |
| Two revision cycles | c02-p026; protocol s7 | at most two substantive cycles | pass |
| Four blocking defects | c02-p025; protocol s7 | four items match | pass |

Author `input_artifact_versions` hashes: all seven listed files MATCH the files now on disk.

## Crosswalk integrity

- Exactly one entry per paragraph; 40/40; IDs match.
- Each entry has a single `PREMISE:method:*` ref. Premises are not labeled as findings. No `CL-*`/`A-*`/`C-*`/`S-*` (appropriate: T02 produced no ledger records).
- Labels generally match paragraph content. Exceptions: p014 omits STATUS.md; p006 cites T03 annex rather than the protocol header the author actually used; p021’s label “frozen-cutoff-and-scope” is right, the prose under it is not.
- U1: `PREMISE:method:… (path sN)` is acceptable for a methods chapter. Build accepts it. Overseer should freeze this as the methods-chapter convention so later chapters do not drift. Not a defect.

`node scripts/thesis/build.cjs --check`: pass (c02 `submitted`, 40 explicit IDs, 40 crosswalk entries, 0 citations).

`node scripts/derived/build.cjs --check`: **stale** (`derived/evidence/c02.md`, `derived/manifest.json`). The evidence pack still says chapter status `skeleton`. Thesis-author prompt required a derived `--check` before drafting and overseer regeneration on staleness. After status moved to `submitted`, derived was not rebuilt. Process defect; not a reason to skip verification; not by itself a chapter-text defect.

## No smuggled conclusions / no self-inflation (partial)

No paragraph asserts fundamentality, survival, theism, physicalism, a family ranking, or any GATE-T16-* conclusion. Component lists and family names are objects of assessment. Primitive examples in p005 are illustrations, not endorsements.

Self-inflation is the live problem, not metaphysics. p002’s “not a retrospective rationalization,” p009’s “enforced structurally,” p016’s performed citation passes, p021’s search-execution freeze, and p040’s “sufficient” / traceability guarantee all convert procedure into unearned credit. p028 and the “not a systematic review” sentence in p021 are the right refusals and are not enough to cancel those conversions.

## Strongest countercase: does “What this method cannot deliver” concede the real weaknesses?

p039–p040 concede: budgeted searches, finite windows, frozen cutoff, English skew, missing original defenders, no broad ranking where uninspected, procedural acceptance ≠ truth, no numerical posterior, not a completed systematic review, no journal peer review.

That is real humility, then immediately spent.

Weaknesses of the *actual* method that the section **fails to state**:

1. **Recorded non-execution.** The frozen protocol itself records that opening citation-chasing was not executed and must not be counted as executed. The limits section does not say this. A reader of p016 plus p039 would think the citation-pass rule describes what happened.

2. **Cutoff kind.** Publication-date freeze vs search-execution clock. Unstated, and p021 gets it wrong.

3. **Planned destinations ≠ accessed databases.** Protocol s2: a named venue is not a claim this host can access it; do not imply a database search when only a web index was queried. p017 logs destinations; p039 never says PubMed/PhilPapers-style names in the grid were often planned routes, not executed database searches.

4. **Irreproducible rankings.** Protocol s2 requires recording engine behaviour *because* dynamic rankings cannot be reproduced. Unstated.

5. **Closed taxonomies are not in force.** Six epistemic types and four confidence labels are protocol rules. Ledgers use free-text vocabularies (38 claim types, 35 reliability strings, 72 inference-strength strings). p009’s “enforced structurally” is the opposite of this weakness.

6. **P2R20 is outstanding.** STATUS.md: independent final review of the article remains unperformed; obligations transfer into Phase 3. A methods chapter for a thesis that *is* that transfer must say the article has not had its contracted final review. “No journal peer review” is a different, easier concession.

7. **AI-to-AI “independence” under one overseer.** p028 states AI-assisted authors/reviewers. It does not state the sharper limit: reviewer and author share protocol, owner, and toolchain; distinct-author is not specialist human re-inspection of medical charts or philosophical corpora the public snapshot omits.

8. **Sensitivity tests were elaborated after evidence gathering.** Protocol s6 listed fewer tests; G2 specified eight after the coverage audit. Prespecification relative to *synthesis* is true; prespecification relative to *evidence collection* is not. Unstated.

9. **SC-G2-08 citation-index limit.** Title queries are not complete cited-by indexes. Directly relevant to p016’s citation-pass story. Unstated in p039.

10. **Public snapshot.** AGENTS.md: omitted source files remain unavailable in this clone. Inspection standards in p020 cannot be replayed by a public reader. Unstated.

11. **No witness/author contact** is in p022 as an authorisation boundary. It is also an evidential ceiling on case work (G1 still lacks independent rescue statements and medical chronology). The limits section does not recast it as a ceiling.

p040’s “sufficient” is performed humility: name the refusals, then declare the remainder enough. For this review, it is not enough until the non-execution, cutoff kind, and enforcement-gap items are in the limits section.

## Author packet

`work/P3C02/result.json` has the required template fields: task_id P3C02, status submitted, artifact_paths, empty claims_added/sources_inspected, dependencies, uncertainties U1–U3, empty contradictions, budget 0/0, recommended_next_action, protocol_version, input_artifact_versions. `report.md` matches. Uncertainties are honestly flagged. No packet-level blocking defect.

### U1 — `PREMISE:method:*` labels with locators

**Recommendation: accept for methods chapters.** The thesis plan allows labeled premises. T02 produced no ledger records. Locators inside the label are more auditable than bare tags. Overseer should freeze the prefix `PREMISE:method:` plus a canonical-path locator so P3C01/P3C11 do not invent a second convention.

### U2 — mutable “forty-one”

**Recommendation: require a dated, scoped wording or delete the numeral.** 41 of 46 Phase 2 is correct today and will drift. The paragraph’s point (accepted assignments are procedures, not observations) does not need a live headcount. If kept: “as of STATUS.md (13 September 2026), forty-one of forty-six Phase 2 assignments.”

### U3 — 35/12 uncomputed

**Recommendation: the numbers are correct; the uncertainty was avoidable.** The derived register the author opened already contains `"counts": {"gap_groups": 35, "withheld_conclusion_gates": 12}` and 35+12 enumerated objects. Canonical `work/G2/gap_register.json` also has 35 `gap_id`s. Cite those canonical/derived objects and drop U3 as a live doubt. Keep the caveat that derived is non-canonical.

## G2 / Phase 3 obligations

- Nine component boundaries: respected as method, not treated as findings.
- Eight tests: listed, but SENS-G2-05 wording is wrong (material).
- Withheld gates: none opened; p038’s standing rule is right.
- P2S01/P2S02: unused (only P3C11 may use them, labeled).
- Report/event, reliability/inference/component: required in the chapter; over-claimed as ledger enforcement.

## Corrections required (bounded revision)

The author can repair these without new searches. Do not silently weaken a criterion.

1. **c02-p021 (material):** Replace “searches executed up to and including 11 September 2026” with the protocol’s publication-date cutoff (through 2026-09-11 inclusive, no lower bound), with retrieval dates separate, and with post-cutoff items as update leads.
2. **c02-p016 (material):** State citation passes as a protocol requirement. Record the G0 exception: T03’s omitted passes are not executed. Do not write “were performed” as a universal history. Add SC-G2-08 (title queries ≠ cited-by indexes). Restore “or all exposed results if fewer.”
3. **c02-p002 (material):** Include the bootstrap exception from the protocol header (T01–T03 before freeze; citation-chasing not counted as executed; six families not source-verified representative literature). Do not claim freeze-before-all-evidence without that remainder. Soften “rather than a retrospective rationalization” or drop it.
4. **c02-p008 and c02-p009 (material):** Six types and three distinctions are *rules*. Do not census the ledgers or claim structural enforcement. Delete the unsourced “most common way that surveys…” line.
5. **c02-p037 (material):** Restore “endurance-required-for-value.” Restore or explicitly bind the omitted G2 clauses listed in the p037 table.
6. **c02-p014 (minor, required if the number stays):** Scope 41 as Phase 2, 41 of 46, dated to STATUS.md; put STATUS.md in the crosswalk; qualify “repaired.”
7. **c02-p038 (minor):** Closure conditions on gap groups; twelve gates withheld; do not attribute a `closure_condition` field to gate objects in the derived register.
8. **c02-p039–p040 (minor as wording, required for the countercase obligation):** Add non-execution of opening citation passes, planned-vs-accessed destinations, irreproducible rankings, free-text ledger vocabularies, outstanding P2R20, and public-snapshot unverifiability. Strike “sufficient” and the guarantee about undrafted chapters.
9. **Crosswalk:** p014 add STATUS.md (or remove 41); p006 locate R/E/O in the protocol header; p021 must match the corrected cutoff prose.
10. **Process:** overseer regenerate derived (`node scripts/derived/build.cjs --sync-manifest` or equivalent) so `derived/evidence/c02.md` is not stale at `skeleton`.

## What does *not* require revision

Faithful expansions include: five named article criteria as the article’s list; three empirical distinctions; six families; nine G2 components and the quoted boundaries; inclusion/exclusion semantics; inspection standards; authorisation boundaries; contract workflow; verdict vocabulary; four blockers; two revision cycles; source/case/sample deduplication; denominator anatomy; three assessments not averaged; quantitative restraint; refusal of exhaustive systematic-review status; refusal to convert acceptance into journal validation; no metaphysical conclusions; no unlabeled P2S01/P2S02.

## Recommended next action (first review)

Return the chapter to the P3C02 author for bounded revision against the ten numbered corrections. Re-review under P3R02 (revision cycle 1 of 2). Do not accept this submission.

---

## Re-review of revision 1

Date: 2026-09-13. Cycle: 1 of 2. Same reviewer; still authored none of the chapter. Standard unchanged: accept means method fidelity, honest limits, crosswalk integrity, and no smuggled conclusions. No new objections were manufactured to keep the review looking severe.

Revised artifacts match the author's declared hashes: chapter `f3e08e392abf3c360f71b1a8602bba54ec93b21e05bc51a4b2d91bf0c51a744d`, crosswalk `23ae5b1511a0b91805bfb97e8351cf32f0117e0eab927e18d159dad874fff472`.

### Build checks

- `node scripts/thesis/build.cjs --check`: **pass**. c02 `submitted`; 41 explicit IDs; 41 crosswalk entries; 0 citations.
- `node scripts/derived/build.cjs --check`: **current**. `derived/evidence/c02.md` now lists chapter status `submitted`. First-review process defect closed.

### Ten required corrections

| # | Target | Applied? | Check |
| --- | --- | --- | --- |
| 1 | p021 cutoff kind | yes | Now "frozen by publication date, not by a stop-clock on searching"; corpus through 11 September 2026 inclusive; four date fields; search logs carry actual execution dates; post-cutoff items are update leads; extension is a prospective contract decision. Matches protocol s1 and SC-G2-08. |
| 2 | p016 citation passes | yes | Stated as a protocol requirement. Opening non-execution named. "later gate records note further incomplete passes" matches G1 (T04/T05). SC-G2-08 title-query limit present. "or all exposed results if fewer" restored. |
| 3 | p002 bootstrap exception | yes | Opening tasks predate freeze; omitted citation passes not counted as executed; six families not source-verified representative literature. "operative discipline rather than retrospective rationalization" removed. G2 items are standing constraints, not compliance certification. |
| 4 | p008/p009 taxonomy-as-rule | yes | "The protocol requires" six types. Free-text drift and discipline-gap language added. Survey-sociology sentence gone. p009: required and review-checked, not a closed schema. |
| 5 | p037 SENS-G2-05 and restored clauses | yes | Exact string **endurance-required-for-value**. Restored: near-death case + second candidate if ordering ambiguous; retrospective community arm; strict vs prudential identity + four preservation models (M1–M4); life-valuing designer preferences; neural intervention or report-to-experience proxy with retained predictive constraints; positive original defenders and direct replies. Line-checked against `required_sensitivity_tests`. |
| 6 | p014 41 scoped | yes | "as of 13 September 2026, forty-one of the forty-six Phase 2 assignments." Procedural repairs vs remaining evidence gaps. STATUS.md and G1 in the crosswalk. |
| 7 | p038 closure vs gates | yes | Closure conditions on the 35 gap groups; twelve gates "all currently withheld." Mapping stated as a constraint requirement, not an audited T16 file. |
| 8 | p039–p040 limits + new p041 | yes | p039: planned-vs-accessed destinations, irreproducible rankings, citation-pass non-execution, publication cutoff. p041: free-text vocabularies, AI-to-AI limits, outstanding P2R20 with unweakened transfer, sensitivity-test provenance, public-snapshot unverifiability. p040: "sufficient" gone; traceability is a requirement decided by later reviews. |
| 9 | Crosswalk | yes | 41 entries, one per paragraph including p041; IDs not renumbered. p006 now header R/E/O; p003 names T03 C1–C6 annex; p014 names STATUS.md and G1; p016 names header exception and SC-G2-08. Residual: p002 still omits G1 for the v2 sentence (non-blocking). |
| 10 | Derived regeneration | yes | `--check` current. |

Also applied as claimed: p003 C1–C6 / C6 absorbed into remaining-cost; p004 "in advance" dropped; p006 forward pointer to inspected-original limits.

M1–M5 are closed. No remaining material defect from the first review.

### New text checked (not rubber-stamped)

**p002 protocol v2 / seven repairs.** Compared to `work/G1/gate_decision.md` Method and data disposition: "Protocol v2 inherits the exact v1 and annexes, with seven procedural repairs." The chapter's "numbered successor, which inherits the exact frozen text together with seven recorded procedural repairs" is G1's own wording. It does not invent a `protocol_v2.md` path (none exists). Supported.

**p014 remaining pilot evidence gaps.** G1: medical records, earliest narrative, direct critic, audio alignment, prefulfillment documentation remain missing; G2 table still marks those Neal handoffs open. "several of which remain open in the project's register" is supported.

**p016 later incomplete passes.** G1 deviations: T04 no dedicated forward-citation passes; T05 one shared title-OR forward query. Supported.

**p041 P2R20 transfer.** `STATUS.md`: "P2R20: independent final review remains unperformed. Its decisive-source obligations transfer, without weakening, into the Phase 3 chapter reviews plus a whole-thesis adversarial review (P3R20)." Chapter wording matches. "until that closure the article's own conclusions hold the corresponding provisional status" is a fair gloss of authorized working draft + outstanding P2R20/P2G2, not a new metaphysical claim.

**p041 sensitivity-test provenance.** G2 `gate_decision.md` is a coverage audit that attaches `synthesis_constraints.json` with eight tests and states G2 is not a metaphysical verdict. Protocol s6's earlier list was shorter. The eight tests are therefore prespecified relative to cumulative synthesis, not relative to all evidence collection. That is the required honesty. Two loosenesses, neither material: (1) G2 names itself a coverage audit, not a "synthesis audit"; (2) "after most evidence gathering" is uncounted — Phase 2 packets post-date G2 — but the clause that matters ("not relative to evidence collection") is correct.

**p041 AI-to-AI and public snapshot.** STATUS.md (AI-assisted, not journal peer review) and AGENTS.md / STATUS.md (downloaded originals and private archives excluded) support both. Protocol s3 supports no medical-chart / private-record access.

**p041 taxonomies as rules, not schema.** Matches AGENTS.md free-text note and the repaired p008.

**p003 C1–C6.** T03 table C6 is remaining problems / residual cost. "essentially these criteria" hedges the adequacy-vs-scope and motivation-vs-warrant differences. Acceptable.

No new unsupported load-bearing claim. No withheld gate opened. No P2S01/P2S02 use. No smuggled metaphysical conclusion.

### Residual notes that do not block acceptance

These were first-review minors not in the ten required corrections, or tiny leftovers from new sentences. They are not revision-cycle-2 material.

- c02-p018 still says the popular stratum is dominated by favorable narratives (unsourced; original m12).
- c02-p030 still includes "sermons" (not in protocol s4; original m8).
- c02-p002 crosswalk still omits `work/G1/gate_decision.md` for the v2/seven-repairs sentence (content is true; p014 already maps G1).
- c02-p041 "synthesis audit" / "most evidence gathering" could be tighter ("G2 coverage audit, after Wave 1 evidence and before cumulative synthesis").
- SENS-G2-05's "no moral nihilism assumed" remains implicit.

### Verdict

**accept.** Revision 1 meets the P3C02/P3R02 method contract: fidelity to the named inputs, honest limits including the recorded non-executions, crosswalk completeness at 41/41, no smuggled conclusions, no conversion of procedural acceptance into validation. Acceptance is about method, not truth of any later chapter.

Recommended next action: overseer adjudication of P3C02/P3R02 as accepted. Cycle 2 is unused.
