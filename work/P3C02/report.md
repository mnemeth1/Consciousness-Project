# P3C02 — Thesis chapter: Comparative Method and Evidence Discipline

Status: submitted for independent review (P3R02). Author: thesis-author context (Claude Fable 5), per `prompts/thesis_author.md`. Date: 2026-09-13.

## What was done

Drafted `thesis/chapters/02-methodology.md` (40 paragraphs, c02-p001 to c02-p040) expanding article section 2 (`paper/paper.html` p-006 to p-007) into a full methodology chapter, per the P3C02 contract in `state/tasks.json`. The chapter covers the six planned skeleton sections: comparative criteria and the role of primitives; evidence taxonomy and the report/event distinction; search, inclusion and the frozen literature cutoff; independent review and acceptance semantics; dependence tracking and double-counting controls; sensitivity testing and quantitative restraint. A closing section, "What this method cannot deliver", states what the chapter and the method cannot conclude, per the contract's withheld-conclusion obligation. The reserved `Limitations` heading was not used (it belongs to the discussion chapter per the build contract).

## Inputs actually used (all frozen contract inputs; no searches)

- `paper/paper.html` section 2, paragraphs p-006 and p-007 (also p-005 for transition context, read only).
- `work/T02/report.md` — the method proposal; hash matches the value recorded in `work/G0/protocol_v1.md` (`75d89bdb...`).
- `work/G0/protocol_v1.md` — the frozen protocol; sections 1-7 are the chapter's principal substance.
- `AI_Execution_Framework.md` sections 5-6.
- `work/G2/synthesis_constraints.json` — SC-G2-01..10, nine component boundaries, eight sensitivity tests (standing constraint, read per evidence pack `derived/evidence/c02.md`).
- `derived/gap_gate_register.json` — consulted for the counts (35 gap groups, 12 withheld gates) referenced in c02-p038; derived view, cited in prose by its canonical role only.

## Crosswalk approach

T02 produced no ledger records (`derived/evidence/c02.md`: "No ledger records carry the T02 prefix"), so no `CL-*`/`A-*`/`C-*`/`S-*` references are available or appropriate for this chapter. Every paragraph is mapped in `thesis/crosswalk/c02.json` to a labeled method premise (`PREMISE:method:*`) whose label names the specific protocol/framework/constraints section the paragraph describes. This treats methodology statements as project method commitments, not evidence claims, consistent with the crosswalk rule "record IDs or labeled premises". Reviewer should confirm this convention is acceptable for the methods chapter and spot-check labels against the named sections.

## Validation

`node scripts/thesis/build.cjs --check` passes with chapter status `submitted`: 40 explicit paragraph IDs, 40 crosswalk entries, 0 citations (no source-ledger citations are needed; the chapter cites project documents in prose, not external sources).

## Uncertainties

- U1: Whether `PREMISE:method:*` labels (with parenthetical canonical-path locators inside the label string) are the intended crosswalk convention for method chapters, or whether the overseer prefers bare labels with locators kept in this report. Build accepts both; consistency across chapters should be fixed at the pilot.
- U2: c02-p014 states "forty-one accepted assignments" from STATUS.md (41 of 46); this number will drift as Phase 3 proceeds. Reviewer may prefer wording that does not embed a mutable count.
- U3: c02-p021/c02-p038 summarize SC-G2-08 and the register counts (35/12); counts were taken from the derived register and AGENTS.md, not recomputed from canonical state.

## Contradictions

None found among the frozen inputs. Protocol section numbering in crosswalk labels follows `work/G0/protocol_v1.md` section headings (s1-s7).

## Budget

Search queries: 0 of 0. Source inspections: 0 of 0. External sources: none opened. Revision cycles used: 0 of 2.

## Recommended next action

Independent review under P3R02 (distinct reviewer; Grok per owner routing decision of 2026-09-13), with attention to: fidelity of every paragraph to the named protocol/framework/constraints sections; no silent strengthening of what the method claims for itself; U1 convention decision; and whether the chapter anywhere converts procedural acceptance into evidential weight.

---

## Revision 1 (2026-09-13, responding to P3R02 review verdict: revise)

All ten required corrections from `work/P3R02/report.md` applied, plus the flagged minors:

1. c02-p021 (material): replaced the search-execution freeze with the protocol's publication-date cutoff (through 2026-09-11 inclusive, no lower bound); search logs carry actual execution dates; post-cutoff items are update leads; prospective extension is a contract decision.
2. c02-p016 (material): citation passes now stated as a protocol requirement with the recorded opening non-execution and later incomplete passes named; SC-G2-08 title-query limit added; "or all exposed results if fewer" restored.
3. c02-p002 (material): bootstrap exception stated in full (T01-T03 predate freeze; omitted passes not counted as executed; six families not source-verified representative literature); "operative discipline rather than retrospective rationalization" removed; G2 items described as standing constraints, not compliance certification; protocol v2 succession (seven procedural repairs, per work/G1/gate_decision.md) added.
4. c02-p008/p009 (material): six types now a prescribed recording rule, not a ledger census; free-text vocabulary drift disclosed as a discipline gap; unsourced "surveys of this territory" sociology deleted; "enforced structurally" replaced with protocol-required, review-checked, no closed schema.
5. c02-p037 (material): SENS-G2-05 restored to "endurance-required-for-value"; all omitted G2 clauses restored (NDE case + second candidate; retrospective community arm; strict vs prudential identity + M1-M4 preservation models; life-valuing designer preferences; report-to-experience proxy + retained predictive constraints; positive original defenders + direct replies).
6. c02-p014 (minor): count scoped and dated ("as of 13 September 2026, forty-one of the forty-six Phase 2 assignments"); "repaired" qualified as procedural repairs with evidence gaps remaining open; STATUS.md and work/G1/gate_decision.md added to crosswalk.
7. c02-p038 (minor): closure conditions attributed to the 35 gap groups only; 12 gates described as withheld; T16 mapping stated as a constraint requirement, not an audited fact.
8. c02-p039/p040 + new c02-p041 (countercase obligation): added planned-vs-accessed destinations, irreproducible rankings, non-executed citation passes, free-text ledger vocabularies, outstanding P2R20 with transferred obligations, AI-to-AI review independence limits, sensitivity-test provenance (specified at synthesis audit, not before evidence collection), and public-snapshot unverifiability of inspections; struck "sufficient" and the undrafted-chapter traceability guarantee (now a requirement decided by each chapter's own review). New paragraph c02-p041 inserted (new ID; no renumbering).
9. Crosswalk: labels updated for p002, p003 (C1-C6 annex), p006 (header R/E/O), p008, p014, p016, p039; entry added for p041.
10. Process: overseer regenerated the derived layer (`node scripts/derived/build.cjs --sync-manifest`); `--check` now current; thesis build check passes (41 paragraphs, 41 crosswalk entries).

Also applied from minors: c02-p003 reconciliation of the article's five criteria with the annex's C1-C6 (C6 absorbed into strongest-reply-and-remaining-cost); c02-p004 "in advance" dropped; c02-p006 forward pointer to inspected-original limits.

Revised artifact hashes: `thesis/chapters/02-methodology.md` `f3e08e392abf3c360f71b1a8602bba54ec93b21e05bc51a4b2d91bf0c51a744d`; `thesis/crosswalk/c02.json` `23ae5b1511a0b91805bfb97e8351cf32f0117e0eab927e18d159dad874fff472`. Revision cycles used: 1 of 2. Recommended next action: P3R02 re-review of the revision.
