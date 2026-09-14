# P3R07 — Independent review: thesis chapter Continuation, Timelessness and the Ownership of Experience

Status: submitted to overseer. Reviewer authored none of the chapter, crosswalk, or P3C07 packet. Reviewer does not optimize for agreement with the author, the overseer, or another model.

- Task: P3R07
- Object: P3C07
- Chapter: `thesis/chapters/07-continuity.md` (c07, status `submitted`, 38 paragraphs c07-p001–c07-p038)
- Crosswalk: `thesis/crosswalk/c07.json` (38 entries)
- Author packet: `work/P3C07/report.md`, `work/P3C07/result.json`
- First-review verdict: **revise** (1 material, 12 minor, 5 editorial)
- Re-review of revision 1 verdict: **accept**
- Remaining material defects: none
- Residual non-blocking notes: see re-review section

The original review body below is retained as the first-cycle record. The operative verdict is in **Re-review of revision 1**.

---

## Re-review of revision 1

Revision 1 was re-read in the touched paragraphs and their neighbors (`c07-p002`, `p003`, `p005`, `p007`, `p009`–`p010`, `p013`, `p015`, `p021`–`p022`, `p026`, `p029`, `p032`–`p033`, `p036`, `p038`). Each claimed M1, N1–N12 and E1–E5 repair was checked against the prose and, where load-bearing, against `node scripts/derived/lookup.cjs`. The author packet was not taken on trust. SHA-256 values match the claimed revision-1 hashes: chapter `b361f48a09eea280841983362d6bd98960bca249fbefa655f612e3b93adfefea`, crosswalk `0d0d06cfabeacf13c2ef7d089abd047782c77390dd92c5b103657f60a0bf9e3c`. `node scripts/thesis/build.cjs --check`: **pass** (234 paragraphs, 107 citations, 221 crosswalk entries, c07 `submitted`). `node scripts/derived/build.cjs --check`: **stale** on `derived/evidence/c07.md` and `derived/manifest.json`. Crosswalk still 38 entries, one per paragraph `c07-p001`–`c07-p038`; 111 ledger IDs; 0 missing. New refs resolve (`A-T13-005` on p032; `A-T11-005` and G2 H-S PREMISE on p003; `PREMISE:article:p-033` on p021). No withheld gate opened. No fundamental-consciousness component supported. Enlarged-history stays conditional.

### Material repair verified

**M1 (c07-p002) — closed.** Prose now: "The six journal articles of the two eternity-related exchanges — four in the eternity-personhood exchange and two in the Lewis–Oaklander exchange — were inspected as exact user-supplied journal copies." That is the required four-plus-two census. Crosswalk still lists `S-P2T12-001..006`. c07-p037 still names the same six papers. The homemade five is gone.

### Minor and editorial repairs verified

| ID | Paragraph | Disposition |
| --- | --- | --- |
| N1 | p033 | Repaired. 1.15 (SD 0.80) / 1.54 (SD 0.78); threshold "a score of 7 or above"; comparator "above the standard threshold" with no raw boundary-score list; sex counts seven women / six men vs six women / seven men (`CL-T13-012`, `C-T13-001`). Residual: ledger says female/male. |
| N2 | p013 | Repaired. Volume 77 vs inspected 1981 header 78 (`CL-P2T12-026`). |
| N3 | p002 | Repaired. "H. R. James's 1897 English translation" at first use (`S-T11-003`). p009 still says "the inspected 1897 translation" without repeating the name. |
| N4 | p015 | Repaired. Lewis 1988 paired with a Hasker objection, identified in note 35; 1984 non-citation kept (`CL-P2T12-017`). |
| N5 | p032 | Repaired. `A-T13-005` mapped. Composite-instrument sentence now backed. |
| N6 | p038 | Repaired. Oaklander absence is a forward-search result; 1992's lack of a Lewis 1984 citation is an inspection finding in the exact 1992 copy. Residual: the p038 PREMISE label still groups `CL-P2T12-017` under "bounded searches." |
| N7 | p021 | Repaired. `PREMISE:article:p-033` added beside p-034. |
| N8 | p026 | Repaired. "includes a 2006 reference" (`S-T13-002`). |
| N9 | p007 | Repaired. Body title date "October 23, 2018" (`S-T11-002`). |
| N10 | p029 | Repaired. "he concludes conditionally" (`CL-P2T12-030`). |
| N11 | p036 | Repaired. "documented and recurrent reports"; "real" gone. |
| N12 | p022 | Repaired. Organism rejection of disembodied extension unless a same-organism relation is defended (`A-T13-004`); "beyond" specified relationally if not temporally (`CL-T13-017`). Proposal still "could satisfy"; no observation; no physics prediction. |
| E1 | p015 | Repaired. "Its revised relation, ET′." |
| E2 | p038 | Repaired. "The eternity proposal remains an improved, still-unproven relation." |
| E3 | p005 | Repaired. Refs trimmed to `A-T11-005`, `CL-T11-017`, `CL-T13-018`. |
| E4 | p010 | Repaired. "or that God must be eternal" (`CL-P2T12-001` limitations). |
| E5 | p003 | Repaired. `A-T11-005` and `PREMISE:method:component-definitions` (G2 H-S) mapped. |

### New-defect hunt on reworded sentences

Touched paragraphs re-read for drift. None restore the five-copy census, reopen a gate, treat attribution as premise truth, upgrade reports to events, sum Timmermann samples, or convert the enlarged-history proposal into an actuality claim. p033's "women/men" vs the ledger's "female/male," p009's unnamed James after p002's first-use naming, and p038's PREMISE still listing `CL-P2T12-017` under "bounded searches" are residuals, not new material defects.

### Residual notes (non-blocking)

- `derived/evidence/c07.md` and `derived/manifest.json` are stale on the revised chapter. Overseer should `--sync-manifest` at acceptance.
- p038 PREMISE label still says "bounded searches per CL-P2T12-017, CL-P2T12-036" after the prose split the inspection from the search.
- p033 writes "women/men"; `C-T13-001` writes "female/male."
- p009 does not repeat H. R. James after p002's first use.
- Author-packet Uncertainties still carry first-draft U1–U3 wording, including the wrong CL-T08-023 pointer; `result.json` hashes and `revision_cycles_used: 1` are honest.

### Re-review verdict

The contract is now met. Acceptance is method fidelity, not worldview truth. Revision cycle 2 unused.

---

## Reviewer independence and scope

The reviewer did not author P3C07, the chapter, or the crosswalk. No subagents were spawned. No external web searches and no original-text reopenings were used (budget 0/4 queries, 0/8 inspections). Load-bearing claims are attributions to accepted ledger records; those records, their derived views, named task reports, frozen article paragraphs p-030–p-034, `work/G2/synthesis_constraints.json`, and `derived/gap_gate_register.json` were read as input verification. This clone is a public snapshot; omitted source files remain unavailable. P3G1 has not allocated transferred P2R20 decisive-source reopenings. None were skipped. No extension is requested: the material defect is a census error against accepted source records, not an original-text dispute.

## What was checked

Binding files read first: `AGENTS.md`, `prompts/chapter_reviewer.md`, P3R07/P3C07 contracts in `state/tasks.json`, `phase3/Thesis_Execution_Plan.md`, `phase3/pilot_calibration.md`, `state/acceptance_P3C02.json`, `state/acceptance_P3C06.json`.

`node scripts/thesis/build.cjs --check`: **pass** (234 paragraphs, 107 citations, 221 crosswalk entries, c07 `submitted`). `node scripts/derived/build.cjs --check`: **stale** on `derived/evidence/c07.md` and `derived/manifest.json` (pack header still says chapter status `skeleton`). Non-blocking. Contested wording was resolved with `node scripts/derived/lookup.cjs` against the derived index, not against the stale chapter-status header.

Frozen inputs compared against sampled prose: `derived/evidence/c07.md` (T11, T13, P2T12 in full); `paper/paper.html` p-030–p-034; `work/G2/synthesis_constraints.json` (nine components; SC-G2-01–10; H-S/H-T/H-P boundaries); `derived/gap_gate_register.json` (12 gates, all `withheld`); `thesis/chapters/06-empirical.md` c06-p038 and c06-p041 for the U3 cohort pointer and the opening asymmetry. SHA-256 values in `work/P3C07/result.json` were recomputed for the chapter and crosswalk; both match.

Crosswalk: 38 entries, 38 unique paragraph IDs, exactly one entry per paragraph, IDs c07-p001–c07-p038 matching the chapter. 111 mapped ledger IDs; zero missing from `derived/index/*.jsonl`. PREMISE labels follow the accepted convention (canonical-path locators inside the label string).

No paragraph opens a GATE-T16-* conclusion. P2S01/P2S02 are unused. Philosophical_attribution records are generally framed as attributions, not premise truth. P2T12 reliability labels (`original_attribution_supported`, `source_assertion_not_premise_truth`, `bounded_conditional_analysis`) are respected in the eternity and identity stretches. Citation-chain discipline is kept: 1992 answers Lewis 1988 and does not cite Lewis 1984; Lewis 1988's moral-persons claim is traced to 1986; Oaklander's reply relation is from body and reference; no later Lewis rebuttal is a search result. Timmermann units are 13 people in repeated conditions, not 26. Rovelli header/body dates, the 1992 issue-header anomaly, and the 1984 volume misprint are retained rather than harmonized. Enlarged-history remains conditional. All twelve gates stay withheld. The nine G2 components are named as unestablished in c07-p038.

Recurring defect class watched (from P3R02–P3R06): converting record-scoped attributions into flat assertions; version limits parked away from first use; homemade censuses; dropped decisive limitations; reports upgraded to events; numbers stripped of their recorded precision. The chapter is often careful on those points. It still miscounts the inspected journal-copy base in the standing-caution paragraph.

## Verdict in one paragraph

The chapter is a competent expansion of article §6. Attribution discipline, the survival/recurrence/preservation split, the eternity critic-and-reply chain, the Lewis–Oaklander hedge, Timmermann's 13-not-26 unit, and the withheld-gate close are largely faithful. It also tells the reader that five journal articles of the eternity exchange were inspected as exact copies, while the same paragraph's crosswalk lists `S-P2T12-001..006` and c07-p037 names six papers. That is a homemade census of the inspected base, not style. It blocks acceptance.

---

## Material defects

### M1 — c07-p002 miscounts the inspected journal copies as five

Quoted chapter text:

> The five journal articles of the eternity exchange were inspected as exact user-supplied journal copies with recorded version anomalies.

The same paragraph's crosswalk reads `exact journal copies S-P2T12-001..006 with CL-P2T12-026 anomalies`.

The derived pack lists six sources, each `inspected_exact_user_supplied_journal_copy`:

- S-P2T12-001 Stump and Kretzmann 1981
- S-P2T12-002 Lewis 1984
- S-P2T12-003 Lewis 1988
- S-P2T12-004 Stump and Kretzmann 1992
- S-P2T12-005 Lewis 1986
- S-P2T12-006 Oaklander 1987–88

c07-p037 then names those six: "the eternity-personhood exchange (Stump–Kretzmann 1981 and 1992, Lewis 1984 and 1988), with the Lewis 1986–Oaklander 1987–88 exchange as its own group." c07-p029–p030 add the last two as "exact journal copies." There is no ledger total of five. Charity that "eternity exchange" excludes Oaklander still fails: that cut is four (1981/1984/1988/1992) or six, never five.

Classification: **material** (homemade census; misstates the inspected-source inventory; contradicts the paragraph's own crosswalk and c07-p037).

Required repair: Replace "five" with six. If the eternity-personhood group is being distinguished from Lewis–Oaklander, say so in words that add to six (four plus two), and keep `S-P2T12-001..006`.

---

## Minor defects

### N1 — c07-p033 drops recorded Timmermann numbers

Quoted chapter text:

> The time-item means were 1.15 under DMT and 1.54 in the separate 13-person retrospectively recruited NDE comparator, with no response-category counts supplied; non-significance is not an equivalence test. The recorded case notes add that the comparator's published sex counts differ from the experimental group's despite described matching

Lookup `CL-T13-012`: "The DMT study’s time-item means were1.15(SD0.80) under DMT and1.54(SD0.78) in its13-person NDE comparator; Table1 supplies scores, not response-category counts."

Lookup `C-T13-001` access_gaps: "Published comparator sex counts7female/6male differ from experimental6female/7male despite described age/gender matching." Denominators: `DMT_scale_threshold_ge7`: 13; "paper uses above/≥7 language; no raw boundary-score list."

The 13-not-26 unit, the 13-vs-1 threshold contrast, no category counts, non-significance-is-not-equivalence, overlap unestablished, and do-not-add are present. The SDs, the 7F/6M vs 6F/7M direction, and the ≥7 / no-raw-boundary-score limits are not.

Classification: **minor** (dropped recorded numbers and a denominator limit; does not invent or reverse a figure).

Required repair: Restore 1.15 (SD 0.80) and 1.54 (SD 0.78). Name comparator 7 female / 6 male vs experimental 6 female / 7 male. Attach ≥7 and the missing raw boundary-score list to the threshold sentence.

### N2 — c07-p013 drops the 77 vs 78 volume numbers

Quoted chapter text:

> The inspected copy misprints the 1981 source volume, a recorded provenance anomaly that establishes no alternative chronology.

Lookup `CL-P2T12-026`: "Lewis1984misprints the1981sourcevolume as77, while the inspected1981header is78. These facts do not establish a later revision or alternative publication chronology." Locator: S-P2T12-002, 79n1.

Classification: **minor** (version anomaly recorded without its identifying numbers).

Required repair: State volume 77 vs inspected 1981 header 78.

### N3 — c07-p002 / c07-p009 never name the James translation

Quoted chapter text (p002):

> the Boethius is an 1897 English translation

Quoted chapter text (p009):

> In the inspected 1897 translation of Boethius

Lookup `S-T11-003` provenance: "H. R. James 1897 translation, preface identifies Peiper 1874 Latin text." The review contract's version list is the James translation. The Latin original is correctly withheld; the translator is never named.

Classification: **minor** (version limit incomplete at first use and at the Boethius paragraph).

Required repair: Name H. R. James at first use.

### N4 — c07-p015 drops Hasker as co-target and note 35

Quoted chapter text:

> the paper identifies Lewis's 1988 article in a note and does not cite Lewis 1984 in its complete body or notes, so the direct reply relation is established only for the 1988 target.

Lookup `CL-P2T12-017`: "The 1992 paper explicitly answers Lewis’s 1988 existential-presence objection, paired with a Hasker objection, and identifies Lewis 1988 in note35; it does not cite Lewis 1984 in its complete body or notes." Limitations: "Direct relation is established only for the specified1988target."

The 1984 non-citation is correct. The 1992 target is Lewis 1988 paired with Hasker, identified in note 35, not "a note."

Classification: **minor** (citation-chain incomplete, not reversed).

Required repair: "paired with a Hasker objection" and "note 35."

### N5 — c07-p032 generalizes past its mapped records

Quoted chapter text:

> Composite instruments mix distinct phenomenologies; any argument from scale endorsements to a specific temporal ontology inherits that mixture.

Crosswalk: `CL-T13-010`, `S-T08-006` only. Lookup `CL-T13-010` supports the grouped highest-response option and "not a count of one uniquely defined timeless experience." The composite-instrument / any-argument sentence is a premise of `A-T13-005`, which is mapped to c07-p034, not here.

Classification: **minor** (paragraph asserts beyond its refs).

Required repair: Map `A-T13-005` on c07-p032, or confine the sentence to the Greyson 1990 time item.

### N6 — c07-p038 labels the 1992/1984 non-citation a forward-search result

Quoted chapter text:

> Bounded forward searches located no later Lewis rebuttal to Oaklander and no direct 1992 reply to Lewis 1984 — search results, not literature facts.

Lookup `CL-P2T12-036` limitations: "No later Lewis rebuttal located in the bounded forward searches; the absence of a located reply is not proof none exists." That conjunct is a search result.

Lookup `CL-P2T12-017`: 1992 "does not cite Lewis 1984 in its complete body or notes." That is an inspection of S-P2T12-004, locators 475–478 and 482 nn. 34–35, not a forward search. The record already refuses the further claim that no other reply exists.

Classification: **minor** (true facts, wrong method label on the 1984 conjunct).

Required repair: Keep the Oaklander search as a search. State the 1984 non-citation as an inspection of the 1992 copy.

### N7 — c07-p021 maps article p-034 for a p-033 sentence

Quoted chapter text:

> Complete divine awareness could preserve the truth about a finite life while adding no further experience for its subject; a theory that preserves information while ending its owner answers a different existential concern than the one that motivates survival hope.

`paper/paper.html` p-033 ends: "Complete divine awareness could preserve the truth about a finite life while adding no further experience for its subject." p-034 carries the preservation-substitution diagnosis and "wanting one's relationships and activity to continue." Crosswalk of c07-p021 is `PREMISE:article:p-034` only. c07-p020 already maps p-033 for the 1981 denial.

Classification: **minor** (content is in the frozen article; locator is off by one).

Required repair: Add `PREMISE:article:p-033` to c07-p021, or keep the p-033 sentence in c07-p020.

### N8 — c07-p026 withholds the 2006 Olson reference year

Quoted chapter text:

> inspected as a repository accepted version that includes a later reference and cannot be assumed identical to the published 2003 chapter

Lookup `S-T13-002` provenance: "Deposited version includes a2006reference and cannot be assumed identical to published2003text." The 2006 year is why identity with the 2003 chapter is forbidden. "A later reference" is weaker than the record.

Classification: **minor** (version limit incomplete).

Required repair: "includes a 2006 reference."

### N9 — c07-p007 drops Rovelli's 23 October 2018 body date

Quoted chapter text:

> the arXiv v3 header is dated 21 January 2002 while the rendered body carries a 2018 title date, a retained discrepancy

Lookup `S-T11-002` provenance: "arXiv gr-qc/0110035v3 header dated 21 January 2002; body title date October 23, 2018 is inconsistent and retained as a rendering/version-date discrepancy, not a 2018 new paper."

The discrepancy is retained. The day-month is not.

Classification: **minor**.

Required repair: "23 October 2018" (or "October 23, 2018") for the body title date.

### N10 — c07-p029 drops Lewis 1986's "conditionally"

Quoted chapter text:

> Embodied actions and many mental actions, he argues, require an interval with a persisting agent, so tenseless persons cannot be morally responsible agents.

Lookup `CL-P2T12-030`: "concluding conditionally that tenseless persons cannot be morally responsible agents." Inference strength: `source_assertion_not_premise_truth`. c07-p030–p031 contest the necessity. The "so" still presents the conclusion without Lewis's own conditional.

Classification: **minor** (attribution flattening).

Required repair: "he concludes conditionally that tenseless persons cannot be morally responsible agents."

### N11 — c07-p036 can be read as upgrading reports to events

Quoted chapter text:

> The explananda are real, documented and recurrent; their ontological interpretation is exactly as open as the eternity exchange left it.

Lookup `CL-T13-020`: "testimony may support the occurrence of an experience without establishing the ontology attributed to it." `A-T13-005` premises: "Altered-time reports are documented as reports." The same paragraph preserves the testimony/ontology split. "Real" still invites a report-to-event reading the rest of the section refuses.

Classification: **minor** (ambiguity a careful reader could misread).

Required repair: "documented and recurrent as reports" — drop "real."

### N12 — c07-p022 omits two recorded costs of the enlarged-history proposal

Quoted chapter text:

> The strongest survival-compatible proposal in the record is stated with its costs. An enlarged first-person history … could satisfy the survival requirement even if the foundation has no intrinsic succession. The recorded objection is the honest one: the asserted ownership or extension may simply restate survival … No observation in the record establishes an enlarged history, and the physics of the earlier section supplies no discriminating prediction for one.

Lookup `A-T13-004` unresolved issues: "Strict organism criterion rejects disembodied extension unless same-organism relation defended." "Timeless individual model must explain non-successive awareness; the temporal-individual model does not solve that separate issue." Lookup `CL-T13-017` limitations: "Conditional coherent proposal, not proof of actual extension; beyond must be specified relationally if not temporally."

The ownership-restatement cost, "no observation," and no physics prediction are present. The organism rejection of disembodied extension — a named cost of this proposal, not only a later animalism exhibit — is not. Nor is the relational specification of "beyond" if the continuation is not temporal. c07-p026 later records that a disembodied copy does not preserve the organism, but not as a cost of the p022 proposal.

Classification: **minor** (dropped recorded costs; the proposal stays conditional; not a smuggled actuality).

Required repair: Name the organism-criterion cost and the "beyond must be specified relationally if not temporally" limit in c07-p022.

---

## Editorial notes

- **E1 (c07-p015).** The 1992 revision is ET′ in `CL-P2T12-018` and article p-032. The chapter says "revised relation." Render the name once.
- **E2 (c07-p038).** "The eternity proposal survives as an improved, still-unproven relation" is a fair gloss of p-033, but "survives" is an unfortunate verb in a survival chapter. Use "remains."
- **E3 (c07-p005).** Crosswalk includes `CL-T11-020` (Boethius/Craig shared premises) and `CL-T11-019` (underdetermination). The paragraph is the identity handoff; those claims are unused here. Leftover mapping, same class as P3R06's leftover `CL-P2T17-010` on c06-p025.
- **E4 (c07-p010).** `CL-P2T12-001` limitations disclaim proving "an eternal entity exists or that God must be eternal." The chapter keeps the first clause only.
- **E5 (c07-p003).** "same person's subjectivity beyond irreversible bodily death" is T01/G2 H-S wording (`A-T11-005` premises; H-S `required_boundary`). p003 maps article p-030, `CL-T11-017`, `CL-T13-016` — not `A-T11-005` or the G2 constraint. The sentence is correct; the locator is thin.

---

## Uncertainty adjudications

**U1 — four-model wording.** Confirmed against `CL-T11-017`, `CL-T13-016`, `CL-T13-017`, `CL-T13-018`. The renderings live in c07-p004 (c07-p003 is the H-S/recurrence/preservation boundary, not the M-labels). M1 temporal continuation within time, no timeless foundation required, matches M1 vs M2's added foundation; `CL-T13-016`'s "without timeless persons" is carried by "personal persistence within time." M2's additional survival condition, M3 complete-history inclusion, and M4 preservation-while-the-subject-ceases match. "Present to an eternal knower" on M3 is a gloss of inclusion, not a silent ET identification; c07-p012 keeps the 1981 denial that presence confers eternal existence.

**U2 — 1981 p. 443 pairing.** Confirmed. Lookup `CL-P2T12-003` locator: "442–444 §III, especially443." Article p-033 cites 1981 p. 443 for the denial that presence to eternity makes the temporal person eternal. c07-p012 correctly calls it a 1981 hypothetical and maps both the claim and `PREMISE:article:p-033`. Reliability remains `source_assertion_not_premise_truth`; the Nixon scenario is not treated as a biographical observation.

**U3 — Greyson 1990 cohort vs CL-T08-023.** Confirmed that chapter 6 met the 1990 comparison, with a locator caveat. c06-p038: "Greyson's 1990 comparison of 183 self-described experiencers with 63 deniers, recruited through a newsletter." That is `CL-T08-021`, not `CL-T08-023`. `CL-T08-023` is the scale-item differentiation claim and the expanded time item's effect on comparability. "Self-selected" is `S-T08-006` provenance ("self-selected through IANDS newsletter"), which c07-p032 maps. Not a chapter defect. Optional repair: say "recruited through a newsletter, as in chapter 6," and do not rest U3 on `CL-T08-023`.

---

## Smuggled conclusions and gates

Checked with extra hostility: c07-p019, c07-p022, c07-p023, c07-p031, c07-p038.

- c07-p019: project reconstruction, contested distinctions, shared-premise non-independence, neither actuality nor equal support. No actuality claim.
- c07-p022: "could satisfy," named objection, no observation, no physics prediction. GATE-T16-09 stays closed. N12 is a dropped cost, not an opened gate.
- c07-p023: analogies, no family winner, no upgrade from coherence to actuality/fundamentality/universality/survival/timelessness, twelve gates withheld.
- c07-p031: incompatibility contested, no evidential same-person test, tenseless identity ≠ nonsuccessive ground, argument coverage not evidence. Lookup `CL-P2T12-038` matches the distinction sentence.
- c07-p038: cannot conclude actual or impossible timelessness, a correct identity criterion, anyone's survival, or phenomenological ontology. Nine components unestablished. Twelve gates intact. "Preservation substitution fails as an answer to survival" is H-P ≠ H-S (`CL-T13-018`, H-P boundary), not a negative existence proof.

`derived/gap_gate_register.json`: GATE-T16-01 through GATE-T16-12 all `withheld`. GATE-T16-09 ("Same-person survival or actual timeless bearer empirically established") is the load-bearing gate for this chapter; it is not opened.

Reliability labels: eternity and identity attributions stay inside `original_attribution_supported` / `source_assertion_not_premise_truth`. Project inferences stay inside `bounded_conditional_analysis` or T11/T13 inference records. No paragraph treats attribution accuracy as premise truth.

---

## Checks run

- `node scripts/thesis/build.cjs --check`: pass (234 paragraphs, 107 citations, 221 crosswalk entries, c07 submitted)
- `node scripts/derived/build.cjs --check`: stale (`derived/evidence/c07.md`, `derived/manifest.json`); non-blocking
- SHA-256 of chapter `d89aea78692d6f8c7fddfe7d3d1d980e2f9e59eaa9ec4c2ef33e97cbbd78ce67` and crosswalk `452078fade6565a7731df34734bf20d2cdefae07829a116b8ae79b747387acf9` match `work/P3C07/result.json` and the author report
- Crosswalk: 38 entries, one per paragraph c07-p001–c07-p038; 111 ledger IDs; 0 missing from the derived index
- `lookup.cjs` on M1, N1–N12, U1–U3, CL-P2T12-038, A-T13-004, C-T13-001, S-T11-001, S-T11-002 (see `source_checks.json`)
- `paper/paper.html` p-030–p-034 compared with c07-p003, p010–p012, p014, p016, p020–p021
- `derived/gap_gate_register.json`: all 12 GATE-T16-* still withheld
- `work/G2/synthesis_constraints.json` nine-component list matches c07-p038
- c06-p038 read for U3; c06-p041 for the opening asymmetry

---

## Recommended next action

Author revision of M1 (required) and the listed minors; then re-review in this same reviewer context. Cycle 1 of 2. Overseer should `--sync-manifest` on the derived layer at acceptance, not before the revision is in.
