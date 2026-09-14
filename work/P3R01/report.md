# P3R01 — Independent review: thesis chapter Unification and Its Price

Status: submitted to overseer. Reviewer authored none of the chapter, crosswalk, or P3C01 packet. Reviewer does not optimize for agreement with the author, the overseer, or another model.

- Task: P3R01
- Chapter: `thesis/chapters/01-introduction.md` (c01, status `submitted`, 27 paragraphs c01-p001–c01-p027)
- Crosswalk: `thesis/crosswalk/c01.json` (27 entries, one per paragraph)
- Author packet: `work/P3C01/report.md`, `work/P3C01/result.json`
- First-review verdict: **revise** (3 material, 12 minor, 5 editorial)
- Re-review of revision 1 verdict: **accept**
- Remaining material defects: none
- Residual non-blocking notes: see re-review section
- Revision cycles used by author: 1 of 2

The original review body below is retained as the first-cycle record. The operative verdict is in **Re-review of revision 1**.

---

## Re-review of revision 1

Revision 1 was re-read in full. Touched paragraphs and neighbors (`c01-p003`, `p004`, `p007`, `p009`–`p012`, `p017`, `p019`, `p022`–`p026`) were checked against the claimed repairs and against the source texts, not against the author packet. Unchanged paragraphs (`p001`–`p002`, `p005`–`p006`, `p008`, `p013`–`p016`, `p018`, `p020`–`p021`, `p027`) were re-read for silent edits; they are intact.

SHA-256 recomputed and matched the claimed revision-1 hashes and `work/P3C01/result.json`:

- `thesis/chapters/01-introduction.md` — `16b520ab454811ad7cf14405b6eab4e8aa296b6e3a6c1b6afe350584f1fa41e8`
- `thesis/crosswalk/c01.json` — `b927bbf8fe9a8c931b27ca36fc5feaf2c93d8618d68e3837ea1578ea5da6dd61`

`node scripts/thesis/build.cjs --check`: **pass** (340 paragraphs, 128 citations, 331 crosswalk entries, c01 `submitted`). Crosswalk still 27 entries, one per paragraph `c01-p001`–`c01-p027`. A-T01-003 is gone from p022 and present on p024 with A-T01-001 and A-T01-002. p012 no longer carries the bridge-register PREMISE. Front-matter inputs now include p-001. No withheld gate opened. No component, package, bridge or article asymmetry asserted as established.

### Material repairs verified

**M1 (c01-p022) — closed.** Six families stated in c03-p001's wording: physicalism with its illusionist edge; psychophysical-law and strong-emergence views; panpsychism; substance dualism; idealism in universal and plural forms; and theism. "The last present mainly by stipulation" matches c03-p040/p041. Fairness rule is now "the strongest formulation available in the project record, a bounded claim about this record rather than the literature as a whole" — c03-p001's own bound. No ranking attributed. Invented "neutral" family is gone.

**M2 (c01-p023) — closed.** Homemade triad gone. Prose uses c06-p010 / article p-024 wording: "externally accurate content, a defensible interval of acquisition and adequate information about the processes available during that interval." "Never to establish together" matches c06-p045's "nowhere are … established together" / "no inspected crisis case establishes the conjunction." Both-directions causal-constraint sentence retained. Prospective studies and historical/cross-cultural corpus named (N11).

**M3 (c01-p022/p024) — closed.** Chapter 5 sentence is existence, necessity, design, and "the foundation-to-mind bridge remains open" (c05-p001). Production-to-purpose is on the chapter 8 sentence with the consciousness-factory discrimination design (c08-p018–p022). Crosswalk A-T01-003 moved from p022 to p024.

### Minor and editorial repairs verified

| ID | Paragraph | Disposition |
| --- | --- | --- |
| N1 | p010 | Closed. A-T01-003: "with the occurrence of experience treated as an assumed explanandum without empirical assessment." |
| N2 | front matter | Closed. `paper/paper.html p-001 (abstract, announced position only)` added to inputs. |
| N3 | p017 | Closed. H-B: not all-substrate independence; does not establish survival, fundamentality or timelessness; measurement-not-satisfaction kept. |
| N4 | p017 | Closed. H-S: "survival need not be timeless, universal, morally good or unlimited in duration." |
| N5 | p009 | Closed. "from proposed purpose to goodness — the bridge chapter 10 prices" (B13). |
| N6 | p025 | Closed. "discriminates weakly, unable to face qualitative tests until its ends, population, means, constraints and tradeoffs are fixed in advance." |
| N7 | p022 | Closed with M1. Bounded strongest-available wording. |
| N8 | p026 | Closed. "every accepted chapter closes by stating that all twelve remain withheld." |
| N9 | p003 | Closed. Expansion marked as "a gloss on the article's double-position sentence, which is itself the opening claim." |
| N10 | p012 | Closed. Concession points at p-004 only; bridge-register ref removed from the p012 crosswalk entry. B14 objection remains at p013. |
| N11 | p023 | Closed with M2. Prospective studies and historical, cross-cultural corpus named. |
| N12 | p026 | Closed. Appendices are case tables, alternatives matrix, gap/gate register, dependence map. |
| E1 | p004 | Closed. "Each larger than the last" dropped. |
| E2 | p007 | Closed. Article's "each transition may be defensible" restored. |
| E3 | p011 | Closed. "The thesis this work seeks to earn." |
| E4 | p017 | Closed. "bodily/neural processes." |
| E5 | p019 | Closed. Replacement-substrate compatibility sentence added to the logical qualification. |

### New-defect check

No new material defects. No new overstatement of an accepted chapter's verdict. Crosswalk refs resolve; A-T01-003 is no longer padded onto c03–c05.

Residuals, not blocking:

- p022 still says chapter 3 "builds" the families; c03-p001 says "presents." Bounded by "of the accepted record."
- p023's "that frame them" slightly demotes the prospective studies and historical corpus relative to c06-p001's "are assessed against that standard."
- p025's "unconstrained specification" is a gloss of c10-p024's "specified benevolent foundation that predicts nothing"; the recorded verbs are present.
- Crosswalk factory locator is `c08-p018 to p021`; the discrimination-design paragraph is c08-p022. The factory section begins at p018, so the placement is right; the end-ID is one paragraph short.
- Author-packet opening U1–U3 and the first "Artifacts" hashes are still first-draft; `revision_cycles_used: 1` and the Revision 1 hashes are honest.
- p001 still says "the restricted-unification thesis the whole work defends" (unchanged; E3 was p011).

### Unchanged paragraphs

p001, p002, p005, p006, p008, p013–p016, p018, p020, p021 and p027 are intact. Announced/deferred frame at p002, p014 and p027 still holds. Twelve gates remain withheld.

### Recommended next action

Overseer adjudication: accept P3C01 (revision 1) and P3R01. Revision cycle 2 unused. Sync the derived manifest at acceptance.

---

## Reviewer independence and scope (first cycle)

The reviewer did not author P3C01, the chapter, or the crosswalk. No subagents were spawned. No external web searches and no external source inspections were used (budget 0/4 queries, 0/8 inspections). The chapter cites no external sources; load-bearing claims are about the published article, the T01 stipulative memo, four G0-accepted argument skeletons, and the accepted chapters c02–c10. Reading those files is input verification, not source inspection. P3G1 has not allocated transferred P2R20 reopenings; none were required. No extension requested.

SHA-256 of `thesis/chapters/01-introduction.md` and `thesis/crosswalk/c01.json` recomputed; both match `work/P3C01/result.json`.

## What was checked

Binding files read first: `AGENTS.md`, `prompts/chapter_reviewer.md`, P3R01/P3C01 contracts in `state/tasks.json`, `phase3/Thesis_Execution_Plan.md`, `phase3/pilot_calibration.md`.

Frozen and comparison inputs reopened in full or at the cited locators:

- `paper/paper.html` p-001 (abstract) and section 1 p-002 to p-005, extracted before scoring
- `work/T01/report.md` in full (ss1–8)
- `node scripts/derived/lookup.cjs` on A-T01-001, A-T01-002, A-T01-003, A-T01-004
- `derived/evidence/c01.md` (stale pack; verification used canonical files)
- `derived/by_task/T01.json` and `derived/index/arguments.jsonl` (T01 prefix census: four arguments, zero claims/cases/sources)
- `derived/gap_gate_register.json` (counts recomputed: 35 gap groups, 12 gates GATE-T16-01..12, all `status: withheld`)
- `work/G0/gate_decision.md` and `work/G0/protocol_v1.md` header (T01 method-material acceptance)
- Accepted chapters c02–c10, their closing non-conclusion registers, and `state/acceptance_P3C02.json` through `state/acceptance_P3C10.json`
- `thesis/thesis.json`, chapter 00 front matter, Appendix C skeleton title
- `node scripts/thesis/build.cjs --check` (pass) and `node scripts/derived/build.cjs --check` (stale)

Crosswalk: 27 entries, 27 unique paragraph IDs, c01-p001–c01-p027 matching the chapter. Four non-PREMISE IDs resolve (A-T01-001..004). PREMISE locators were checked against the named files and sections.

All twelve GATE-T16-* remain withheld. P2S01/P2S02 unused. No paragraph of this chapter asserts a metaphysical component, package, bridge, or article asymmetry as an established finding of *this* chapter. The defects that block acceptance are roadmap mischaracterizations of already-accepted chapters, not illicit upgrades of T01 stipulations.

## Verdict in one paragraph

The introduction is a competent expansion of article section 1 and of T01's stipulative register. It keeps components, packages, bridges and the article's asymmetries in the announced/deferred frame, reproduces the nine-component table including the logical qualification, and closes on explicit non-conclusions. Three roadmap sentences then fail against the accepted chapters they claim to describe: chapter 3's six-family comparison space is replaced by four families including a family c03 does not use; chapter 6's conjunctive standard is replaced by a triad that appears nowhere else in the repository; and chapter 5 is said to test the production-to-purpose bridge that c05 does not discuss and that chapter 8 actually develops. Those are material. Verdict: revise.

---

## Check 1 — Article fidelity

Compared c01-p003/p004 to p-002; c01-p007/p008 to p-003; c01-p011/p012/p013 to p-004; c01-p014 to p-005; c01-p002 to p-001.

**p-002 / c01-p003–p004.** The attractiveness sentence, the double position of experience, the three conditionals and the unification sentence are tracked. p003's "omitted the phenomenon in which theories are entertained, tested and found significant" is author expansion, then called "the article's opening claim" (N9). p004's "each larger than the last" is a gloss (E1). The distance-between-antecedents sentence is thesis framing, not an upgrade of p-002 into a result.

**p-003 / c01-p007–p008.** The illicit-economy definition, the meaning sequence (qualitative character → unified subject → necessary agent → good authority that preserves persons) and the three contrasts match. "The word remains constant while the commitment grows" and "not that this progression is fraudulent" are glosses of "each transition may be defensible" (E2). Not an upgrade.

**p-004 / c01-p011–p013.** Restricted-unification both-halves, the joint-theory concession, heterogeneous contributions and the "convergence becomes evidential only when connections are specified" standard match. Linking the concession to B14 as the thing that "holds the concession's terms" overstates what B14 is (N10). p013's manufactured-convergence wording tracks T01 B14's objection, not an article finding.

**p-005 / c01-p014.** Both directional asymmetries (neural participation vs exhaustive physical ontology; immortality necessity vs any value) and the local-conclusions/unsettled-ontology sentence are tracked. "These are the article's announced positions; the empirical, meaning and cumulative chapters carry the records that are meant to earn them" does the deferred-framing job. p-005's closing article-roadmap sentence is not reproduced; that is thesis-layer substitution, not an upgrade.

**p-001 / c01-p002.** "an asymmetric verdict in which stronger grounds for embodied neural dependence coexist with an unresolved phenomenal explanation and a viable, conditional conscious-foundation programme" is a close paraphrase of p-001's "The resulting position is asymmetric…" sentence. Marked as announced, not earned. U3: the abstract is used while front-matter inputs list p-002 to p-005 (N2).

**Announced/deferred frame (p002, p014, p027).** Holds. p001 "Nothing in this chapter is a finding"; p002 "states that thesis; it does not yet argue it"; p014 "announced positions"; p027 "claims with their evidence still ahead of them." No article position is converted into an established result of this chapter.

## Check 2 — T01 fidelity

**ss1, s5, s7 / c01-p002, p027.** No-entity / no-coherence / no-verification; project-authored definitions; operational-not-measurement ("precise enough to classify claims and expose contradictions, not measurements of metaphysical structure"); revisable by versioned protocol change; G0-accept as method material with premises unresolved (p001, p010). p027's "only through versioned protocol change" drops s5's remaining "at G0" path; after T01 acceptance that is a tightening, not a defect. s7's "truth, coherence, comparative evidence and confidence unassessed" is in the crosswalk locator and is carried in substance by p027's stipulation register plus p010's "no premise resolved."

**s2 table including limits and logical qualification / c01-p016–p019.** H-F, H-U, H-T, H-P, H-I, H-G, H-A definitions and the main non-entailments are tracked, including irreducibility-not-fundamentality, subject-versus-whole, measurement-not-satisfaction, resuscitation-not-death, information-not-subject, production-not-purpose, goodness-not-whatever-the-foundation-does, and power/authorship/unity/reward-not-authority. Two limits-column compressions drop load-bearing non-entailments: H-B keeps the measurement guardrail and the actual/possible and temporary/after-death distinctions but drops "not synonymous with independence of all physical substrates" and "does not establish that a particular person survives death, that a mind is fundamental, or that experience is timeless" (N3); H-S drops "need not be timeless, universal, morally good, or unlimited in duration" (N4). The logical qualification is reproduced (H-S without replacement substrate entails that instance of H-B; H-S entails narrow H-P without complete preservation). The complementary sentence — replacement-substrate survival may remain compatible with dependence on a brain of some kind — is omitted (E5).

**s3 packages plus s2 IR / X-EX reconciliation / c01-p020.** All seven named packages appear in order (F-min, CF, TC, ES, UP, CP, full). Required/open glosses, the default-optional list (necessity, omnipotence, omniscience, particular religious identity, unlimited duration for every person), the revision rule and the F-min-after-abandoning-survival example match. IR as weaker subsidiary claim and X-EX as the four-part cross-cutting target rather than a tenth attribute match. The s2 sentence "support for IR must not be entered directly as support for H-F without a bridge" is not restated here; B01 at p009 carries the same rule at one remove. Not material.

**s6 bridge register / c01-p009.** Fourteen transitions; premises to investigate not accepted inferences; motivation-plus-vulnerability claimed; new-bridge anti-bypass rule almost verbatim. The grouped sweep names B01, the fundamentality/universality/survival/timelessness cluster, B10–B12 and B14 with B14's manufactured-convergence objection. B08 and B09 appear at p010 via the skeletons. B13 (H-I to H-G) is never named in the introduction (N5).

Bearer rule at p015 matches s2's opening paragraph, including "an existential finding cannot silently become a universal claim."

## Check 3 — Argument skeletons (c01-p010)

Opener: "reviewed and accepted as method material with no premise resolved" matches lookup `review_status: accepted` / `review_id: G0` and T01 s7. All four are labeled skeletons, not findings.

**A-T01-001.** Premises (H-P-information) plus B05 subject-preserving identity relation; conditional yield of H-S; objection that preservation can occur while the original subject ceases and duplicates expose the identity problem. Consistent. Strongest reply omitted in all four compressions, by design.

**A-T01-002.** Persistence contributes significance only under stated normative premises; objection that duration alone need not increase value and finite value may exist without persistence. Consistent. Unresolved necessity/sufficiency/contributory distinction not stated (completeness, not a dropped objection).

**A-T01-003.** Bridge (independently specified end) and byproduct objection match. The premise qualifier "treated here as an assumed explanandum without empirical assessment" is absent (U1). Adjudication: absence does not convert the skeleton into a finding — the paragraph opener already says no premise is resolved, and the sentence does not assert that production has been empirically assessed. It is still a missing qualifier unique to this skeleton, whose only premise is an unassessed empirical explanandum. Minor (N1). Repair: add the clause.

**A-T01-004.** "binding obligations require a normative relation beyond descriptive unity, origin, power or reward" folds the recorded objection into the positive requirement. Content matches; unlike the other three, it is not framed as "against the objection." Not material. Existence-assumed-for-argument-only is covered by the opener.

Roadmap reuse: A-T01-001 and A-T01-002 at p024 (c07–c08) are the right chapters. A-T01-004 at p025 (c09–c10) is the right pair, with authority living in c09. A-T01-003 at p022 (c03–c05) is the wrong place (M3).

## Check 4 — Roadmap accuracy (c01-p021 to p026)

**c02 / p021.** Ledger, independent review, dependence accounting, sensitivity tests, withheld-conclusion gates, paragraph-level crosswalk. Matches accepted c02. Does not convert method into a metaphysical result.

**c03 / p022.** **Material (M1).** Accepted c03-p001 and c03-p040/p041, and `state/acceptance_P3C03.json` scope, present **six** families: physicalism with its illusionist edge; psychophysical-law and strong-emergence views; panpsychism; substance dualism; idealism in universal and plural forms; and theism. The introduction lists four — "physicalist, dualist, idealist and neutral families." "Neutral" occurs nowhere in c03 (the article's only "neutral" is p-005's "should not be neutral by default"). Panpsychism, the psychophysical-law family and theism are omitted. Theism's "present mainly by stipulation" coverage mark is a load-bearing fact of the accepted chapter. "Best formulation" also upgrades c03's "strongest formulation available in the project record" / "bounded claim about this record, not about the literature as a whole" (N7). The introduction does not say c03 ranks the families; that half is clean.

**c04 / p022.** "what experiential primitiveness would and would not explain, holding the line between an unresolved explanatory gap and a fundamentality conclusion" matches c04's closing (cannot convert the gap into a fundamentality or realism probability) and B01. Consistent.

**c05 / p022.** "from an experiential ground to an intending agent, where the existence, necessity and design questions live" matches c05's title, opening and `acceptance_P3C05.json` (contingency route, open foundation-to-mind bridge, fine-tuning as conditional likelihood). **"where the register's production-to-purpose bridge is tested" does not.** Grep of `thesis/chapters/05-existence.md` finds no B08, factory, byproduct, or production-to-purpose discussion. That bridge is A-T01-003 / B08, developed in c08 as the consciousness-factory proposal (c08-p001, c08-p019–p021). **Material (M3).** Crosswalk A-T01-003 on p022 does not support the paragraph.

**c06 / p023.** "causal-constraint verdicts, not ontology verdicts, in both directions" matches c06-p045 and `acceptance_P3C06.json` (no brain independence, no demonstrated ordinary mechanism, no physicalist identity). **The crisis conjunction does not.** c06-p001 / c06-p010 and article p-024: "externally accurate content, a defensible interval of acquisition and adequate information about the processes available during that interval." c06-p045: "nowhere are externally verified content, an independently fixed acquisition interval and adequate process information established together." The introduction's "verified perception, established unconsciousness and excluded ordinary acquisition" appears **nowhere else in the repository**. "Established unconsciousness" is the substitution c06 was written to block: a physiological interval does not establish when remembered content was formed. **Material (M2).** p023 also omits the three prospective studies and the historical/cross-cultural corpus that c06-p001 names alongside the dossiers (N11).

**c07 / p024.** Identity side: timeless foundations, temporal persons, ownership, eternal representation vs survival. Matches c07-p001 and c07-p038 ("the preservation substitution fails as an answer to survival"). "Tests" is weaker than the accepted closing's "fails"; conservative, not an upgrade.

**c08 / p024.** "whether significance requires endurance, where the article's asymmetry between necessity and value claims about immortality is defended." c08-p001 / c08-p024 / c08-p027 and `acceptance_P3C08.json`: necessity thesis lacks a defended bridge; conditional worthwhile continuation remains open; finite meaning and valuable endurance are compatible. "Is defended" matches the accepted chapter's own claim to have grounded the article's constructive conclusion record by record. Not an upgrade. (The factory/B08 test that belongs here is missing because it was parked on c05.)

**c09 / p025.** "every route from a conscious foundation to binding obligation crossing a contested normative bridge" matches c09-p001 / c09-p027 (inspected records supply no derivation from consciousness, unity, creation, power or endurance; H-A as a finding about the ledger). Consistent.

**c10 / p025.** Expected-world constraint matches c10-p024 almost verbatim ("A benevolent unification must allow its claims about goodness to restrict what counts as an expected world"). Omits the recorded weak-discrimination verbs that `acceptance_P3C10.json` treats as the accepted wording ("discriminates weakly"; unable to face qualitative tests until ends, population, means, constraints and tradeoffs are fixed) (N6). Does not repeat the first-cycle "removed from the comparison" error. Suffering and hiddenness with strongest inspected replies match. Symmetry rule on both c09 and c10 matches c09-p022 and c10-p001.

**c11–c12 / appendices / gates / p026.** Twelve withheld gates confirmed against `derived/gap_gate_register.json` `counts.withheld_conclusion_gates: 12` and GATE-T16-01..12 all `withheld`. c11/c12 are still skeletons; the prospectus is appropriate. "Every chapter that follows names the gates its material leaves closed" overstates: accepted c03–c10 typically say "all twelve remain withheld" without naming GATE-T16-* IDs (N8). Appendices are A case tables, B alternatives matrix, C gap/gate register (still skeleton), D dependence map — not "the review architecture and the reproducibility apparatus" (N12).

## Check 5 — Epistemic discipline

No component, package, or bridge is asserted as established. p016–p019 "holds that" is definitional of the specification. p020 "required" is explicitly "not established truth." p009 register is "premises to investigate." Restricted-unification is the thesis to be earned (p002, p011 as the work's thesis, p027 "evidence still ahead"). p011 "the thesis this work defends" is article p-004's own verb, slightly stronger in-paragraph than p002/p027's deferred frame (E3). No withheld gate is opened. T01 stipulations are marked as stipulations.

## Check 6 — Crosswalk

- 27/27 paragraphs have an entry; IDs match.
- PREMISE locators for T01 ss1, s2 (including limits and logical qualification), s3, s5, s6, s7 and article p-002..p-005 are real.
- p-001 is a real locator; it is not in the chapter front-matter inputs list (N2).
- A-T01-001 and A-T01-002 at p010 and p024 support those paragraphs.
- A-T01-004 at p010 and p025 supports those paragraphs.
- A-T01-003 at p010 supports p010; at p022 it does not (M3).
- p025's PREMISE string mentions A-T15-006 as recorded in the accepted chapters; it is not imported as a c01 ledger ref. Acceptable for a structural locator.
- No padded ledger IDs beyond the misplaced A-T01-003.
- PREMISE density matches the accepted c02 methods-chapter pattern, as the author packet claimed. Appropriate for a framing chapter with no CL/C/S T01 records.

## Check 7 — Author uncertainties U1–U3

**U1.** Confirmed as a missing qualifier, not an epistemic upgrade. See N1. Presence would be better; absence is not material.

**U2.** Confirmed as a live problem. Three characterizations attribute the wrong comparison space (c03), the wrong evidential standard (c06), or the wrong tested bridge (c05/B08). Those are M1–M3. c04, c07, c09, c06's both-directions clause, c08's necessity/value asymmetry, and c10's expected-world constraint (minus the weak-discrimination verbs) match.

**U3.** The review task's evidence base explicitly includes p-001 for the announced asymmetric position. Use of the abstract is permitted and correctly marked announced. The chapter's declared inputs still start at p-002. Repair: add `paper/paper.html p-001 (abstract)` to the front-matter inputs list. Minor (N2), not a forbidden-source defect. A front-matter addition is the right fix; no need to recast the PREMISE citation as something else.

## Check 8 — Build

`node scripts/thesis/build.cjs --check`: **pass**. 340 paragraphs, 128 citations, 331 crosswalk entries; c01 `submitted`; c02–c10 `accepted`; c11–c12 `skeleton`.

`node scripts/derived/build.cjs --check`: **stale** (`derived/evidence/c01.md`, `derived/manifest.json`). The pack still headers c01 as `skeleton` and says "no ledger records carry the T01 prefix" while listing A-T01-001..004 in the same file. Process defect for the overseer at acceptance (`--sync-manifest`); not a chapter-text defect. Verification used canonical files and `lookup.cjs`.

---

## Defect list

### Material

**M1 — c01-p022.** Roadmap misrepresents accepted chapter 3's comparison space.

- Defect: four families ("physicalist, dualist, idealist and neutral") instead of c03's six; invents "neutral families"; omits panpsychism, psychophysical-law/strong-emergence, and theism.
- Evidence: c03-p001, c03-p040, c03-p041; `work/T03/report.md` M-T03-PH/PL/PA/DU/ID/TH; `state/acceptance_P3C03.json` ("six comparison families"). "Neutral" does not occur in c03.
- Repair: name the six families as c03-p001 names them. Keep the fairness rule in c03's wording (strongest formulation available in the project record, bounded to this record). Do not say the chapter ranks them.

**M2 — c01-p023.** Roadmap substitutes a different conjunctive standard for accepted chapter 6 and article p-024.

- Defect: "verified perception, established unconsciousness and excluded ordinary acquisition" is not c06's hinge and appears nowhere else in the repository. "Established unconsciousness" is the substitution c06/p-024 warn against.
- Evidence: c06-p001, c06-p010, c06-p045; article p-024 ("externally accurate content, a defensible interval of acquisition and adequate information about the processes available during that interval"). Both-directions causal-constraint sentence is otherwise correct.
- Repair: use c06/p-024's triad. Keep "causal-constraint verdicts, not ontology verdicts, in both directions."

**M3 — c01-p022 (crosswalk A-T01-003).** Attributes the production-to-purpose bridge test to chapter 5; maps A-T01-003 onto that paragraph.

- Defect: c05 does not test B08. The factory/production-versus-intended-production distinction is c08.
- Evidence: c05-p001 and `acceptance_P3C05.json` (PSR, open mind-bridge, fine-tuning); no B08/factory/byproduct hits in `thesis/chapters/05-existence.md`; c08-p001, c08-p019–p021, c08-p027.
- Repair: drop production-to-purpose from the c05 sentence; describe c05 as existence, necessity, design, and the open foundation-to-mind bridge. Put the factory/B08 test on the c08 sentence. Move A-T01-003 from p022 to p024.

### Minor

**N1 — c01-p010 (U1).** A-T01-003 omits "treated here as an assumed explanandum without empirical assessment." Add that clause. Not an upgrade given the opener.

**N2 — front matter / c01-p002 (U3).** p-001 is used and correctly marked announced; add it to the `inputs` list.

**N3 — c01-p017.** H-B limits column drops all-substrate independence and the non-entailments of survival, fundamentality and timelessness. Restore at least H-B ↛ H-S.

**N4 — c01-p017.** H-S limits drop "need not be timeless, universal, morally good, or unlimited in duration."

**N5 — c01-p009.** Named sweep never mentions B13 (purpose to goodness). Name it or point it at chapter 10.

**N6 — c01-p025.** Expected-world constraint is right; add c10-p024's "discriminates weakly" / precommitment verbs so the constraint is not read as a stronger expected-world elimination.

**N7 — c01-p022.** "Best formulation" → c03's "strongest formulation available in the project record," bounded to this record.

**N8 — c01-p026.** "Names the gates its material leaves closed" → "states that all twelve remain withheld," matching accepted chapter closings.

**N9 — c01-p003.** "Entertained, tested and found significant" is author expansion, then called "the article's opening claim." Restrict that label to p-002's actual double-position sentence, or mark the expansion as a gloss.

**N10 — c01-p012.** B14 is the disputed convergence inference, not the holder of the article's joint-theory concession. Point the concession at p-004's "suitably constrained" sentence; keep B14 for the manufactured-convergence objection (already at p013).

**N11 — c01-p023.** c06 also assesses three prospective studies and a historical/cross-cultural corpus. One clause would prevent the empirical center from looking like intervention-plus-dossiers only.

**N12 — c01-p026.** Appendices are A–D (case tables, alternatives matrix, gap/gate register, dependence map). Appendix C is still a skeleton. Do not assign "review architecture and the reproducibility apparatus" to them; those live in c02.

### Editorial

**E1 — c01-p004.** "Each larger than the last" is not in p-002. Harmless if kept; better dropped.

**E2 — c01-p007.** "Not that this progression is fraudulent" is a gloss of "each transition may be defensible." Prefer the article's verb.

**E3 — c01-p011.** "The thesis this work defends" is p-004's verb. In this chapter, "will defend" or "seeks to earn" would match p002/p027 in the same breath.

**E4 — c01-p017.** H-B: T01 says "bodily/neural processes"; the chapter has "bodily processes."

**E5 — c01-p019.** Logical qualification omits T01's complementary sentence that replacement-substrate survival may remain compatible with dependence on a brain of some kind.

---

## What does not need rewriting

Article p-002–p-005 tracking at p003–p014, with the announced frame at p002/p014/p027. T01 purpose/epistemic register, bearer rule, package glosses, revision rule, IR/X-EX reconciliation, B14 objection, new-bridge rule, and G0-accept-as-method. A-T01-001, A-T01-002 and A-T01-004 compressions. Roadmap sentences for c02, c04, c07, c09, c06's both-directions clause, c08's necessity/value asymmetry, c10's expected-world constraint (add the verbs), and the twelve-gate count. Closing non-conclusions paragraph.

## Recommended next action

Author revision cycle 1 of 2: repair M1–M3 (and N1–N12 if budget allows). Independent re-review of the touched sentences, especially p022–p025. Do not edit canonical `records/` or `state/`. Overseer should `--sync-manifest` when accepting, not before the revision lands.
