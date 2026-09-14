# P3R09 — Independent review: thesis chapter Moral Authority and Its Grounds

Status: submitted to overseer. Reviewer authored none of the chapter, the crosswalk, or the P3C09 packet. Reviewer does not optimize for agreement with the author, the overseer, or another model.

- Task: P3R09
- Object: P3C09
- Chapter: `thesis/chapters/09-morality.md` (c09, status `submitted`, 27 paragraphs c09-p001–c09-p027)
- Crosswalk: `thesis/crosswalk/c09.json` (27 entries)
- Author packet: `work/P3C09/report.md`, `work/P3C09/result.json`
- First-review verdict: **revise** (2 material, 12 minor, 5 editorial)
- Re-review of revision 1 verdict: **accept**
- Remaining material defects: none
- Residual non-blocking notes: see re-review section

The original review body below is retained as the first-cycle record. The operative verdict is in **Re-review of revision 1**.

---

## Re-review of revision 1

Revision 1 was re-read in the touched paragraphs and their neighbors (`c09-p001`, `p003`–`p004`, `p007`–`p008`, `p010`, `p013`, `p015`–`p016`, `p018`–`p019`, `p021`–`p026`). Each claimed M1–M2, N1–N12 and E1–E5 repair was checked against the prose and, where load-bearing, against `node scripts/derived/lookup.cjs`. The author packet was not taken on trust. SHA-256 values match the claimed revision-1 hashes and `work/P3C09/result.json`: chapter `afc80054a4281015c9cd4bb42bc5330c6c382fb38cc7aff14cca0f9e869b4c89`, crosswalk `f3aa63d7c5bea5a7152223a0229bc9ca3e9ec78864ce02b01112aecf99e27c2f`. `node scripts/thesis/build.cjs --check`: **pass** (286 paragraphs, 122 citations, 275 crosswalk entries, c09 `submitted`). `node scripts/derived/build.cjs --check`: **stale** on `derived/evidence/c09.md` and `derived/manifest.json`. Crosswalk still 27 entries, one per paragraph `c09-p001`–`c09-p027`. New refs resolve (`CL-P2T06-014` on p010; `CL-T15-016`/`017` on p019; `A-T15-001` on p021; `CL-P2T06-015` on p024). No withheld gate opened. No fundamental-consciousness component supported. No Nagel unified-subject argument remains. No “superseded” status remains in the chapter.

### Material repairs verified

**M1 (c09-p021) — closed.** Lookup `A-T15-001` strongest objection: “Calling a being good or creative may presuppose the normativity being explained; **unity and sanctions can yield only self-interest.**” Lookup `CL-T15-017`: shared subjecthood could align prudential incentives but does not by itself establish impartial obligations, permissible tradeoffs or protection of distinct persons. Lookup `CL-T15-018`: neither duration nor sanctions alone explains why an act is wrong. Prose: “The prudential shortcut is recorded as insufficient.” The diachronic Nagel sentence is gone. `CL-P2T06-010` is not on this entry. The self-harm clause is the recorded objection (“unity and sanctions can yield only self-interest, so an account on which wrongdoing is ultimately self-harm has moved from obligation to prudence rather than deriving one from the other”). That gloss stays inside “only self-interest” plus CL-T15-017’s prudence-versus-impartial-obligation split. Mapped: `CL-T15-017`, `CL-T15-018`, `A-T15-001`. Nagel remains only at p009, p011, p019, p024 as the recorded rival.

**M2 (c09-p024) — closed.** Lookup `A-T15-002` unresolved-issues: “Constructivism and non-natural realism reconstructed in matrix but no decisive original defender inspected.” Lookup `CL-P2T06-015`: “This developed rational grounding proposal **narrows** the v1 source gap.” `derived/gap_gate_register.json` G2-GAP-30: `open_primary_moral_families`, `phase2_status` `unassessed_in_phase2`, special rule that task completion never closes it. Prose: reconstruction “recorded with no decisive original defender inspected — is **not withdrawn**”; Phase 2 inspections “supply this chapter’s constructivist and robust-realist attributions and **narrow** that source gap, while the corresponding gap register entry remains **partial and open**.” `CL-P2T06-015` is mapped. PREMISE renamed `narrowed-reconstruction` with the register locator. “Superseded” is gone from the chapter.

### Minor and editorial repairs verified

| ID | Paragraph | Disposition |
| --- | --- | --- |
| N1 | p010 | Repaired. `CL-P2T06-014` mapped on the “recorded adjudication” sentence. |
| N2 | p019 | Repaired. `CL-T15-016` and `CL-T15-017` mapped for the shared-subjecthood genesis/force fork. |
| N3 | p003 | Repaired. “Each of its three stopping points, constructivism, realism and conscious authority.” |
| N4 | p015 | Repaired. “The reply defends the claimed reason; it is not a substitute for the uninspected developed case at pages 53 to 83.” |
| N5 | p016 | Repaired. Cumulative-cost acknowledged; chapters 6–9 unread; local nonmoral expressivism not ruled out; morality need not source the reasons; weak conclusion differs from, but does not by itself refute, Railton. |
| N6 | p008 / p010 | Repaired. “Psychological explanation alone is not her criterion of justification” (p008); “retaining a sense of nonmoral obligation under incomplete reflection” (p010). |
| N7 | p018 | Repaired. “A recorded secular alternative … with other secular families retained in the record.” |
| N8 | p007 | Repaired. “Value from right action and authoritative requirements.” |
| N9 | p022 / p025 | Repaired. p022 maps only `A-T15-006`. Reuse rule binds this chapter and chapter 10; endurance share with chapter 8 is “their own recorded supporting claims, a separate relation.” p025 names chapter 10 only. |
| N10 | p025 | Repaired. Invented `DG-P2T06 project inferences` gone. PREMISE and prose place CL-P2T06-014/015 inside `DG-P2T06-SOURCES-EXCHANGE`. |
| N11 | p001 | Repaired. H-A is “the project’s declared boundary, which the chapter documents the inspected records leaving unmet, not as a theorem about the world.” |
| N12 | p026 | Repaired in prose: p.52 footnote into the gap; chapter 2; chapters 6–9; §5.2; first-printing byte equivalence; Railton journal-hosted comparison. |
| E1 | p019 | Repaired. “Documented exchange by exchange.” |
| E2 | p023 | Repaired. “Stands as recorded.” |
| E3 | p004 | Repaired. “Doubly qualified.” |
| E4 | p013 | Repaired. “Each step is contested in the exchange reported below.” |
| E5 | p021 | Repaired with M1. “Recorded as insufficient.” |

### New-defect hunt on reworded sentences

Touched paragraphs re-read for drift. None restore the Nagel-inside-unity present-will argument, restore “superseded,” reopen GATE-T16-02, convert H-A into a world-claim, declare a family winner, or use deferred evil/hiddenness IDs. p016’s restored chapter-4 limits stay inside CL-P2T07-015/017. p021’s “moved from obligation to prudence rather than deriving one from the other” is a gloss of A-T15-001’s “only self-interest” plus CL-T15-017, not a new Nagel attribution. p024’s “robust-realist attributions” names the Phase 2 Enoch inspection of the family T15 recorded as non-natural realism; not a status change. p022’s chapter-8 endurance sentence is the requested scoping, not a new endurance finding. p026 PREMISE string was not expanded with every new gap locator; the prose carries them. No new material defect.

### Residual notes (non-blocking)

- `derived/evidence/c09.md` and `derived/manifest.json` are stale on the revised chapter. Overseer should `--sync-manifest` at acceptance.
- `c09-p026` PREMISE still lists the first-cycle gap set; the new items live in the prose. Not a chapter-text defect.
- Author-packet `## What was done` / Uncertainties still carry first-draft U1–U3 wording, including the withdrawn “superseded” and “chapters 8, 9 and 10” reuse-rule sentences. The `## Revision 1` section and `result.json` hashes / `revision_cycles_used: 1` are honest.

### Re-review verdict

The contract is now met. Acceptance is method fidelity, not worldview truth. Revision cycle 2 unused.

---

## First-cycle record (superseded)

First-review verdict was **revise**. Remaining material defects after revision 1: none. The first-cycle body follows without change.

---

## Reviewer independence and scope

The reviewer did not author P3C09, the chapter, or the crosswalk. No subagents were spawned. No external web searches and no original-text reopenings were used (budget 0/4 queries, 0/8 inspections). Load-bearing claims are attributions to accepted ledger records; those records, their derived views, named task reports, frozen article paragraphs p-039–p-042, `work/G2/synthesis_constraints.json`, and `derived/gap_gate_register.json` were read as input verification. This clone is a public snapshot; omitted source files remain unavailable. P3G1 has not allocated transferred P2R20 decisive-source reopenings. None were skipped. No extension is requested: both material defects are misreadings of accepted records, not original-text disputes.

## What was checked

Binding files read first: `AGENTS.md`, `prompts/chapter_reviewer.md`, P3R09/P3C09 contracts in `state/tasks.json`, `phase3/Thesis_Execution_Plan.md`, `phase3/pilot_calibration.md`, `work/P3C09/report.md`, `work/P3C09/result.json`.

`node scripts/thesis/build.cjs --check`: **pass** (286 paragraphs, 122 citations, 275 crosswalk entries, c09 `submitted`). `node scripts/derived/build.cjs --check`: **stale** on `derived/evidence/c09.md` and `derived/manifest.json` (pack header still says chapter status `skeleton`). Non-blocking. Contested wording was resolved with `node scripts/derived/lookup.cjs` against the derived index, not against the stale chapter-status header.

Frozen inputs compared against the full chapter: `derived/evidence/c09.md` (T15, P2T06 and P2T07 in full); `paper/paper.html` p-039–p-042 (extracted verbatim); `work/G2/synthesis_constraints.json` (nine components; H-A required_boundary; SC-G2-01–10); `derived/gap_gate_register.json` (12 gates, all `withheld`; G2-GAP-30 still `open_primary_moral_families`); `thesis/chapters/10-goodness.md` front matter (evil/hiddenness assigned to c10); `work/T15/report.md`, `work/P2T06/report.md`, `work/P2T07/report.md` for version relation and gap wording. SHA-256 values in `work/P3C09/result.json` were recomputed; both match: chapter `b1b534497d6aec14cf8b8ec2715d9c58b46c3573b7802e0392420d872a02a091`, crosswalk `7b33ee9aff2e7c8f45000ad9eb7b2e7d7485adb63349a89e5697bb9751594207`.

Crosswalk: 27 entries, 27 unique paragraph IDs, exactly one entry per paragraph, IDs c09-p001–c09-p027 matching the chapter. Extracted ledger IDs all exist in `derived/index/*.jsonl`. PREMISE labels follow the accepted convention (canonical-path locators inside the label string).

No paragraph opens a GATE-T16-* conclusion. P2S01/P2S02 are unused. Philosophical_attribution records are generally framed as attributions, not premise truth. Project inferences (CL-T15-016–019, CL-P2T06-014/015, CL-P2T07-013) are mostly marked as such. All twelve gates stay withheld. The nine G2 components are named as unestablished in c09-p027. T15 evil/hiddenness IDs are unused; deferral is stated at p001 and p022.

Recurring defect class watched (from P3R02–P3R08): converting record-scoped attributions into flat assertions; version limits parked away from first use; homemade censuses; dropped decisive limitations; homemade syntheses mapped as if they were the cited record. The chapter is often careful on those points. It still maps Nagel’s recorded egoist onto an unrecorded diachronic unified-subject argument, and it assigns “superseded” status to T15’s matrix reconstruction against the recorded “narrows” relation and an still-open G2-GAP-30.

## Verdict in one paragraph

The chapter is a competent expansion of article §7 second half. Version limits, Craig transcript provenance, Korsgaard’s own listed self-limits, Nagel-as-rival, the Enoch chapter-3 gap at first indispensability use, the weak conditional chapter-4 bridge, §5.1’s priced impasse, Railton’s contested naturalistic route, H-A as a ledger finding in the close, no family winner, and the withheld-gate close are largely faithful. It also tells the reader that Nagel’s reflective egoist reappears inside a unified subject as a present-will problem, which neither CL-P2T06-010 nor CL-T15-017 contains, and that T15’s reconstruction of constructivism and non-natural realism was “superseded,” which is not the recorded relation (narrowing; G2-GAP-30 remains partial). Those are status and attribution errors against accepted records, not style. They block acceptance.

## Check 1 — Fidelity

Substantive assertions were read against `derived/evidence/c09.md` and, for contested items, `node scripts/derived/lookup.cjs`.

**(a) Korsgaard (CL-P2T06-001 through 008, 011–013).** p007 tracks 001 (authority in reflective agency, not proof of a metaphysical self), 002 (reasons/obligations to practical identity; value vs right action), 004 first half (valuing humanity), 005 (shareability). p008 tracks 003 (formal universalization vs moral law ranging over rational beings; first argument does not establish the interpersonal domain), 004 second half (interpersonal extension needs an additional argument), 006 (animals, with the empirical-illustration limit), 007 (bare endorsement does not make every action right), 008 (conflicts; does not disprove complete practical normative skepticism). p010 tracks 011 (general commitments constitute willing; new argument limited to formal universality; no new humanity/publicity defense), 012 (incentive vs endorsement; not seeking a reward), 013 (justificatory work in endorsement; Mafioso as attributed; Cohen uninspected). Sequence is proposal then own limits, then reply. Not overstated as success. Understated secondary limits: 002’s “authoritative requirements” (N8); 007’s “psychological explanation alone is not her criterion”; 013’s “retains a sense of nonmoral obligation under incomplete reflection” (N6). None of those omitted clauses converts the remaining-steps map into a completed moral law.

**(b) Nagel (CL-P2T06-009/010).** p009: causation need not be law-like; external reflective standpoint as alternative explanation of generality; reasons ground identity rather than derive from it; egoism need not violate publicity; “public intelligibility is not obviously impartial justification” is article p-040, mapped. Limitations used almost verbatim: realism is a substantive evaluative rival, not a proof by rejection of Korsgaard; warrant equally contested. p024: not vindicated by Korsgaard’s concessions. p011 keeps Nagel’s alternative live (evaluative reasons independently justifying self-conceptions). The recorded rival status holds — except where p021 sends the egoist into unified-subject diachronic binding (M1).

**(c) Adjudication CL-P2T06-014/015.** p011 is nearly verbatim: selected reply leaves direction-of-justification open; the developed proposal narrows the v1 source gap while establishing neither a fundamental conscious foundation nor its moral authority; no new evidence of a universal subject, survival, timelessness, preservation, cosmic intention or foundational goodness. p010 already states 014 as “the recorded adjudication” without mapping 014 on that paragraph (N1). p024’s no-winner clauses for this exchange match 014’s limitation (neither challenge nor reply establishes complete failure).

**(d) Enoch (CL-P2T07-001–004, 008–011, 014–020).** p012: robust realism as objective irreducible normative truth; attitudes may matter without constitutively determining fundamental truths; ontology separated from warrant (compatible with normative skepticism); combined objectivity and metanormative-realism arguments do not entail robust metaethical realism. Characterization, not proof. p013: indispensability outline; chapter 3 opening targets general normative realism, not moral realism; concluding page makes the reason defeasible and acknowledges incomplete rejection of alternatives; pages 53–83 including the epistemological derivation uninspected. Recorded argument form matches A-P2T07-001’s inspected premises/bridge, not a reconstruction of the missing pages. p015: reply without truth-making; Moorean criterion needed and unsupplied; Joyce uninspected; symmetric upshot matches A-P2T07-003 conclusion plus strongest objection. p016: chapter 4 conditional and weak; denies entailment; unconsidered motivations remain; categorical-sense distinction including Schroeder note 13; weak moral rationalism (not wholly contingent; no every-agent guarantee, no overriding priority, exceptional cases). Antecedent chapters as assumptions. p017: §5.1 distinctions; framing imprecise and inconclusive against all naturalisms; reduction objections inconclusive; Schroeder response does not prove irreducibility; impasse over initial normative-force intuition; open to abandoning the intuition; parsimony; token-level reduction worth developing; cited critics uninspected. Missing secondary: p015 does not re-declare pp. 53–83 though A-P2T07-003 lists that gap as unresolved (N4); p016 drops cumulative-cost p.91, chapters 6–9, local nonmoral expressivism, and “does not require morality itself to source the reasons” / “does not by itself refute Railton” (N5).

**(e) Lenman (CL-P2T07-005/006/007).** p014: schmeliberation; joint non-optionality and robust-truth not satisfied; only thinner practice indispensable; expressivism ≠ descriptive naturalism; psychological vs constitutive truth conditions as conditional normative independence, not evidence about fundamental consciousness; no population finding. Matches. Not a winner against Enoch.

**(f) Craig (CL-T15-001/002) with S-T15-001.** p005: value in God’s nature, obligation in commands from a qualified authority; reasons for commands need not constitute obligations; contingent commands consistent with essential goodness, correcting an earlier necessary-command formulation. Transcript 2022 author-hosted; quoted third parties uninspected; audio alignment unverified; attribution only; no independent proof of the authority relation (A-T15-001 unresolved). Provenance matches S-T15-001. Quoted authors named at p026 (Baggett, Huemer, Shafer-Landau, Robert Adams).

**(g) Railton (CL-T15-003/004/005, CL-P2T07-012) with A-T15-002.** p018: objective interests; natural dispositional facts ground the idealized informed preference; impartial consideration under full information, labeled controversial; applicability of obligation separated from categorical reasons for every rational agent; reforming definitions as theoretical proposals whose empirical success remains a burden; audit conclusion that a physicalist ontology has a substantive route, remaining contested, not settling every categorical-reason demand; fully informed egoist may reject impartiality; reply separating truth/applicability from motivation. Matches A-T15-002. “The recorded secular alternative that takes the reduction option seriously” can read as the only secular family (N7); A-T15-002’s position is “other secular families retained.” Evolution disclaimer and aggregative/rights objections dropped (secondary).

**(h) Project normative bridges (CL-T15-016–019) and A-T15-001/006.** p004: strongest integrated case as a chain of contestable bridges; premises and bridge principles track A-T15-001; conclusion conditional; consciousness alone proves none of the later bridges; objection that calling a being good or creative may presuppose the normativity being explained; reply that grounding need not be definition or temporal production, still owing warrant. p006: all four inferences, “project-authored conditional analyses, marked as such.” p020 restates the unmet relation from those bridges. p022: A-T15-006 reuse rule and H-G/H-A burden mapping, neither numerical posterior nor winning metaphysics. Not treated as established truths. p022 maps CL-T15-016/017 which the paragraph does not use (N9). p025 extends the reuse rule to chapter 8; A-T15-006 is recorded for the moral-grounding/evil pair (N9).

**(i) H-A as ledger finding, not world-claim.** Required_boundary: “Consciousness, unity, creation, power and endurance do not automatically supply binding reasons; absent primary rival defenders prohibits broad elimination claims.” p020: “This is component boundary H-A applied, not a refutation: the records leave open that such warrant could be supplied; they document that nothing inspected supplies it.” p027: cannot conclude that a conscious foundation has or lacks moral authority — only that inspected records supply no derivation; H-A “as a finding about the ledger rather than about the world.” p001 states the boundary as binding in the opening; that can be read as a world-rule before p020/p027 price it (N11). No component support; GATE-T16-02 unopened.

**Deferred evil/hiddenness.** c10 skeleton assigns Adams–Sutherland and Howard-Snyder–Schellenberg plus evil/hiddenness to c10 under H-G and H-I. c09-p001 and p022 state the deferral. Grep of the chapter and crosswalk: no A-T15-003/004/005, no CL-T15-006–015, no CL-T15-020–024, no Rowe/Schellenberg/Sutherland/Howard-Snyder as used sources. p022 uses A-T15-006’s reuse rule and burden mapping, not Rowe’s evidential argument or hiddenness premises. p026’s “Robert Adams” is S-T15-001’s quoted-author gap, not S-T15-004. Deferral is clean.

**A-T15-001 authorship.** Lookup: “Project-authored reconstruction; source attributions confined to linked claims.” p004 presents it as “the audit’s strongest integrated consciousness-grounding case” / “recorded,” which is the right register.

## Check 2 — Crosswalk

27/27 paragraphs have exactly one entry. All extracted ledger IDs exist. Structural/method paragraphs (p001, p002, p025, p026, p027) use PREMISE labels with locators, as in accepted c03–c08.

Load-bearing mismatches:

- **c09-p021** maps `CL-T15-017`, `CL-T15-018`, `CL-P2T06-010`. The first two support the prudential/endurance clauses. CL-P2T06-010 is Nagel on reasons grounding identity and egoism not violating publicity (S-P2T06-002 pp. 204–208). It does not support the diachronic “reappears inside the unified subject as the question of why my future or extended interests bind my present will.” Crosswalk does not support that sentence (M1). A-T15-001’s unity/self-interest objection, which would cover the self-harm clause, is not mapped here.
- **c09-p024** maps `A-T15-002` plus `PREMISE:method:superseded-reconstruction (...)`. A-T15-002’s unresolved-issues note says constructivism and non-natural realism were reconstructed without a decisive original defender. It does not say the reconstruction is superseded. The PREMISE’s own gloss (“original inspections supplied by P2T06 and P2T07”) is weaker than the prose verb (M2).
- **c09-p010** states CL-P2T06-014 almost verbatim as “the recorded adjudication” without mapping it (N1). A-P2T06-003’s conclusion is close but not the same sentence.
- **c09-p019** maps only `CL-P2T07-013` plus the article PREMISE. CL-P2T07-013 is that inspected arguments do not establish consciousness as unique ground of several distinct burdens. The shared-subjecthood genesis/force sentence needs CL-T15-017 (N2).
- **c09-p022** maps `CL-T15-016` and `CL-T15-017`, unused in the paragraph (N9 pad).
- **c09-p025** PREMISE invents `DG-P2T06 project inferences`. Lookup: CL-P2T06-014 and 015 have `dependency_group` `DG-P2T06-SOURCES-EXCHANGE`. Prose does not name that invented group (N10).

## Check 3 — Epistemic discipline

Standing caution (c09-p002) states attribution accuracy ≠ premise truth and that nothing here is an established moral or metaphysical truth. Craig, Korsgaard, Nagel, Enoch, Lenman, and Railton are generally held as attributions. Project-authored conditionals are marked at p006, p011, p022. No family is declared the winner at p024. No fundamental-consciousness component is implied as established. GATE-T16-02 (“All strong moral rivals eliminated or consciousness uniquely grounds obligation”) remains withheld: the chapter does not eliminate rivals or uniquely ground obligation. SC-G2-02’s ban on a broad strongest-family ranking is kept. SC-G2-05’s unification gain is preserved as conditional at p004. SC-G2-07: no posterior (p022, p027).

Breaks: M1 presents an unrecorded intra-subject application as continuous with “the recorded analysis” and a named Nagel figure. M2 assigns replacement status to a reconstruction the ledger still carries, against CL-P2T06-015’s “narrows the v1 source gap” (already used correctly at p011) and G2-GAP-30’s still-open register row. p003’s “every family owing something” is a homemade widening of p-042’s three named stopping points (N3).

## Check 4 — Dependence accounting (c09-p025)

Named groups versus `dependency_group` fields:

| Chapter grouping | Ledger groups |
| --- | --- |
| Craig transcript | T15-source-1 |
| Railton article | T15-source-2 (CL-P2T07-012 also lives here) |
| Korsgaard–Nagel exchange, one exchange-level group | DG-P2T06-SOURCES-EXCHANGE (CL-P2T06-001–015, including project inferences 014/015) |
| Enoch line (book plus 2014 reply) | P2T07-Enoch-line |
| Lenman critique | P2T07-Lenman-critique |
| Project normative-bridge and comparative-bridge inferences | T15-normative-bridges; P2T07-comparative-bridges |

Authorial grouping of one author’s texts is stated: Enoch book+reply are one; Korsgaard chapters+reply are one. No empirical sample is claimed. S-P2T06-001/002/003 share `shared_volume_id` `VOL-P2T06-001` and the same teaching-copy hash. P2T06 report: “Sharing one volume does not make these independent bodies of evidence” while still distinguishing the two-chapter positive account from Nagel and the separately authored reply.

**U2 — one exchange-level group for the three 1996-volume texts.** Confirmed against the ledger. All three sources, and CL-P2T06-001–015, share `DG-P2T06-SOURCES-EXCHANGE`. The chapter names “two Korsgaard contributions and Nagel’s,” so distinct authors are not collapsed into one speaker. This is not the P3R08-M2 pattern (collapsing two ledger groups). Adams–Sutherland in T15 used two DGs for one PDF; P2T06 chose one DG for this volume. The chapter follows P2T06. Residual: the crosswalk PREMISE’s extra `DG-P2T06 project inferences` is not a ledger group (N10). Nagel’s distinct-author status is named in the three-text list and could be one explicit clause parallel to “Korsgaard’s reply and her chapters are likewise one”; not required for acceptance of the census.

## Check 5 — Access gaps (c09-p026)

Declared gaps checked against source/claim limitations:

| Declared | Record |
| --- | --- |
| Enoch ch. 3 pp. 53–83, developed indispensability and epistemological defense | CL-P2T07-014; CL-P2T07-004; S-P2T07-001 provenance |
| Manne/Sobel branches | S-P2T07-003 |
| Joyce original | CL-P2T07-011 |
| Schroeder original; Moral Twin Earth; Smith; Fine; Parfit | CL-P2T07-016; CL-P2T07-019 |
| Cohen’s original chapter | CL-P2T06-013 |
| Craig quoted authors (Baggett, Huemer, Shafer-Landau, Robert Adams); audio alignment | S-T15-001 |
| Korsgaard–Nagel selected chapters of a teaching copy, not the whole volume | S-P2T06-001/002/003 |
| Railton third-party archive; footer anomaly; no established content difference | S-T15-002 |

No declared gap is silently filled: chapter 3 is not reconstructed as if read; Cohen is flagged at p010; Joyce at p015; Schroeder/Twin Earth/Smith/Fine/Parfit at p017; Craig quotes at p005; Manne/Sobel at p002. Residual undeclared gaps (N12): Enoch chapter 2 (assumed by chapter 4; p016 covers this as “antecedent chapters” but p026 does not name ch. 2); chapters 6–9 (CL-P2T07-015); §5.2 fictionalism/error theory (CL-P2T07-020); p.52 footnote continuing into the gap (CL-P2T07-014); first-printing byte equivalence not established (S-P2T07-001); exact journal-hosted Railton comparison still open (S-T15-002). Animal illustrations as unverified empirical claims are priced at p008, not as a p026 access gap — acceptable.

The chapter-3 gap is declared at p002, p013, and p026, and priced as “the single most load-bearing gap.” It is not restated at p015 where the reply defends remaining justificatory force (N4). p016’s “antecedent chapters function as assumptions” is the right status for chapter 4.

## Check 6 — Article fidelity (p-039 to p-042)

| Article | Chapter | Finding |
| --- | --- | --- |
| p-039 existence vs owing; shared consciousness would not settle an overriding reason; Korsgaard reflection/practical identity; connect humanity rather than power/origin | c09-p003, p007 | p003 takes the burden sentences almost verbatim. “Even valuable agents” is extra (c08 hangover, not in p-039). “Every family owing something at precisely this point” is p-042’s three stopping points widened (N3). p007 keeps the article’s Korsgaard sentences and adds the ledger claims. |
| p-040 Nagel identity/reasons; reflective egoist; public intelligibility ≠ impartial justification; Korsgaard incentive/endorsement and constitutive willing; formal universality ≠ humanity-wide scope/publicity; common-consciousness would face the same burden | c09-p009, p010, p019 | Split is appropriate. p009/p010 match the article plus CL-P2T06-009’s causation clause. The common-consciousness burden is at p019, not lost. |
| p-041 robust realism as stopping point; Enoch indispensability; Lenman thinner practice; Enoch reply on allegiance; how a demand arises vs why it merits compliance | c09-p012, p013–p015, p019 | p012 is characterization; indispensability and Lenman follow. Chapter 3 gap is an honest addition the article omitted. p019 takes the how/why diagnosis and grounds it in the five named positions. |
| p-042 comparison remains substantive without an ontology verdict; three “owes”; none exempt by naming a stopping point; metaphysics of consciousness could illuminate bearers/objects of value and would still need the normative relation, including why reasons apply and when they override | c09-p023 | Close paraphrase, then ledger locators (Korsgaard remainder, Enoch impasse, unmet bridges). p024’s no-winner is not in the article and is required by the records. |

p015’s Moorean-criterion concession is correctly marked as something “the article does not reach.” p-041’s “whether that richer demand is unavoidable or imports the realist commitment” is captured in p015’s “deserved-allegiance demand may restate rather than resolve the disputed richness.”

## Check 7 — Author-packet uncertainties U1–U3

**U1 — c09-p021 unified-subject egoism synthesis.** Not confirmed as staying within mapped records’ content. CL-T15-017 lookup: shared subjecthood could align prudential incentives but does not by itself establish impartial obligations, permissible tradeoffs or protection of distinct persons. CL-T15-018: endurance/sanctions do not explain wrongness. CL-P2T06-010 lookup: Nagel argues that reasons ground practical identity rather than derive from it, and that egoism need not violate publicity; locator pp. 204–208; limitation is rival-not-victor. A-T15-001’s strongest objection (“unity and sanctions can yield only self-interest”) would cover the self-harm/prudence clauses if mapped; it is not. The sentence “Nagel’s reflective egoist … reappears inside the unified subject as the question of why my future or extended interests bind my present will” is a diachronic intrapersonal application. Nagel’s recorded egoist is interpersonal publicity versus impartial force. CL-T15-017’s “permissible tradeoffs” does not name present-will versus future/extended interests. See M1.

**U2 — one exchange-level group (DG-P2T06-SOURCES-EXCHANGE).** Confirmed. See Check 4. Distinct authors are named. The invented `DG-P2T06 project inferences` in the PREMISE is N10, not a collapse of Nagel into Korsgaard.

**U3 — “superseded” framing of T15’s matrix reconstruction.** Not confirmed. A-T15-002 lookup, unresolved issues: “Constructivism and non-natural realism reconstructed in matrix but no decisive original defender inspected.” CL-P2T06-015: “This developed rational grounding proposal **narrows** the v1 source gap.” `work/P2T06/report.md`: source gap “is narrowed”; “materially improves v1’s constructivist coverage.” `work/P2T07/report.md`: “G2-GAP-30 remains partial and unresolved”; “frozen v1 baseline remains historical.” `derived/gap_gate_register.json` G2-GAP-30: `open_primary_moral_families`, `phase2_status` `unassessed_in_phase2`, special rule “Task completion alone never closes this evidence gap.” “Superseded” assigns replacement status the records do not use. p011 already has the recorded verb. See M2.

## Check 8 — Build

- `node scripts/thesis/build.cjs --check`: **pass** (286 paragraphs, 122 citations, 275 crosswalk entries, c09 `submitted`).
- `node scripts/derived/build.cjs --check`: **stale** (`derived/evidence/c09.md`, `derived/manifest.json`). Process note for the overseer at acceptance; not a chapter-text defect.

---

## Material defects

### M1 — c09-p021 sends Nagel’s recorded egoist into an unrecorded unified-subject present-will argument

Quoted chapter text:

> An account on which wrongdoing is ultimately self-harm answers the egoist by dissolving the distinction the answer needed: Nagel's reflective egoist, who understands a public demand while disputing its force, reappears inside the unified subject as the question of why my future or extended interests bind my present will.

Lookup `CL-P2T06-010`: statement is reasons-ground-identity and “egoism need not violate publicity”; locator S-P2T06-002 pp. 204–208; limitation is rival-not-proof. Lookup `CL-T15-017`: shared subjecthood / prudential incentives vs impartial obligations, permissible tradeoffs, protection of distinct persons. Neither record contains a diachronic “why my future or extended interests bind my present will,” nor an application of Nagel’s egoist to a metaphysically unified subject. Article p-040’s “understand a public demand while disputing its force” is the interpersonal publicity point, already used at p009 with an article PREMISE. The author packet flags this formulation as chapter synthesis, not a single record’s wording. The paragraph does not label it as such. It reads as continuous with “the recorded analysis is explicit that…” and maps `CL-P2T06-010` as if that ID contained the unity application. That is a misattribution of Nagel’s figure and a crosswalk pointing to a record that does not support the sentence. The conclusion “the normative gap survives the metaphysical merger” is still the right CL-T15-017 upshot; the mechanism and the Nagel attachment are not.

Classification: **material** (misattribution; crosswalk does not support the text; overstatement of what the mapped records contain).

Required repair: Drop the diachronic “reappears inside the unified subject as … present will” sentence, or mark it explicitly as unsourced chapter commentary and remove `CL-P2T06-010` from this paragraph. Rest the shortcut on CL-T15-017/018. If the self-harm/prudence unpacking is kept, map `A-T15-001`’s recorded objection that unity and sanctions can yield only self-interest. Do not present Nagel as the source of a unified-subject argument.

### M2 — c09-p024 says T15’s constructivism/non-natural-realism reconstruction was “superseded”

Quoted chapter text:

> The audit's earlier reconstruction-based treatment of constructivism and non-natural realism was superseded by the Phase 2 original inspections, which is a gain in fidelity, not a change in verdict.

A-T15-002 unresolved-issues: reconstructed in matrix, no decisive original defender inspected. That is a coverage limitation, not a withdrawal. CL-P2T06-015, already used correctly at p011, records the relation as **narrowing** the v1 source gap. P2T06 report: narrowed / materially improved coverage. P2T07 report: G2-GAP-30 remains partial and unresolved. Gap register: G2-GAP-30 still open; task completion never closes it. A-T15-002 remains an accepted argument and is used in this chapter for Railton (p018). “Superseded” changes the reconstruction’s epistemic status from “incomplete original-defender coverage, later narrowed by original inspections” to “replaced.” The mitigating clause (“gain in fidelity, not a change in verdict”) saves the no-winner result; it does not save the status verb. The crosswalk PREMISE is more careful (“original inspections supplied”) than the prose.

Classification: **material** (overstatement changing epistemic status of the T15/Phase 2 relation).

Required repair: Match the recorded relation. Original inspections now supply this chapter’s constructivist and non-natural-realist attributions and **narrow** the v1 source gap; T15’s matrix reconstruction is not withdrawn; G2-GAP-30 remains partial; A-T15-002 remains the Railton naturalistic argument.

---

## Minor defects

### N1 — c09-p010 “recorded adjudication” is CL-P2T06-014, unmapped here

p010: “The recorded adjudication: the reply answers a formal-agency objection without independently settling every bridge from agency to impartial moral authority.” That is CL-P2T06-014’s statement. Refs: 011–013, A-P2T06-003, S-P2T06-003. 014 is only on p011. Repair: add `CL-P2T06-014` to p010, or move the sentence to p011.

### N2 — c09-p019 missing CL-T15-017 for the shared-subjecthood fork

p019: a common-consciousness proposal can explain genesis of demands through shared subjecthood or assert objective force, but the inspected records contain no derivation of the second from the first. Mapped: article PREMISE + `CL-P2T07-013`. 013 is unique-ground of several distinct burdens, not the shared-subjecthood bridge. Repair: map `CL-T15-017` (and `CL-T15-016` if the valence/extension bridges are kept in view).

### N3 — c09-p003 “every family owing something at precisely this point”

Article p-042 names constructivism, realism, and conscious authority. p-039 does not say every family. Repair: “the article’s three stopping points each owe something at this point,” or name the three.

### N4 — c09-p015 indispensability reply without restating the chapter-3 gap

A-P2T07-003 unresolved: “Developed chapter3 vindication on pp.53–83 remains absent.” The reply defends remaining justificatory force for a reason whose developed book case is uninspected. p013 and p026 declare the gap; p015 does not. Repair: one clause at p015 that the reply is not a substitute for pp. 53–83.

### N5 — c09-p016 dropped chapter-4 limitations

CL-P2T07-015 limitations: cumulative-cost counterexample p.91; detailed replies deferred to chapters 6–9; local nonmoral expressivism not ruled out. CL-P2T07-017: he does not require morality itself to source the reasons; the weak conclusion “differs from, but does not by itself refute, Railton’s specifically acknowledged limitation.” p016 already denies entailment and treats antecedents as assumptions. Repair: restore the morality-not-the-source clause and the non-refutation of Railton; name chapters 6–9 as unread if “metaphysical and epistemic objections generalize” is kept.

### N6 — c09-p008/p010 dropped Korsgaard limit on incomplete reflection

CL-P2T06-013 limitation: she retains a sense of nonmoral obligation under incomplete reflection. CL-P2T06-007 also: psychological explanation alone is not her criterion of justification. p008 covers endorsement-not-rightness and skepticism-not-disproved. Repair: add the incomplete-reflection/nonmoral-obligation clause at the Mafioso discussion.

### N7 — c09-p018 “the recorded secular alternative”

A-T15-002 position: “Positive naturalistic account with other secular families retained.” Korsgaard and Enoch are also secular. The qualifier “that takes the reduction option seriously” helps. Repair: “a recorded secular alternative” or “the inspected naturalistic route.”

### N8 — c09-p007 dropped “authoritative requirements”

CL-P2T06-002: distinguishing value from right action **and authoritative requirements**. Repair: restore the third limb, or drop 002 from any sentence that only covers value vs right action.

### N9 — c09-p022 padded CL-T15-016/017; p025 extends A-T15-006 to chapter 8

p022’s content is A-T15-006 (reuse of moral premises across grounding and evil; symmetry of stopping-point standards; H-G/H-A burdens). 016/017 are unused. p025: “the reused-premise rule of c09-p022 governs the normative premises this chapter shares with chapters 8 and 10.” A-T15-006 is the grounding/evil pair. Chapter 8 dependence is CL-T15-018’s supporting claims (CL-T14-010/013), a different relation. Repair: drop 016/017 from p022 or use them; say the reuse rule binds c09–c10, and name any c08 share separately.

### N10 — c09-p025 PREMISE invents `DG-P2T06 project inferences`

CL-P2T06-014/015 are `DG-P2T06-SOURCES-EXCHANGE`. Prose already folds them into the exchange group, which is correct. Repair: delete the invented name from the PREMISE.

### N11 — c09-p001 states H-A as a binding rule before the ledger-finding price

p001: “Component boundary H-A binds throughout: consciousness, unity, creation, power and endurance do not automatically supply binding reasons.” That is the G2 wording, but the paragraph is PREMISE-only. p020/p027 later make it a ledger finding. Repair: one clause at first use that this is the project boundary the records will be shown to leave unmet, not a world-theorem.

### N12 — c09-p026 gap list omits several recorded Enoch/Railton limits

Chapter 2 unread (assumed by ch. 4); chapters 6–9; §5.2; p.52 footnote into the gap; first-printing byte equivalence; exact journal-hosted Railton comparison. p002’s positive inspection list implies some of these. Repair: name chapter 2 and chapters 6–9 in p026 if chapter 4’s objection-generalization sentence is kept; at least the p.52-footnote-into-gap and Railton journal-hosted comparison.

---

## Editorial notes

- **E1 (c09-p019).** “This chapter has now grounded exchange by exchange” reads as establishment. “Documented” or “reported.”
- **E2 (c09-p023).** “Survives the record intact” is the P3R07 flourish already retired elsewhere. “Remains” is enough.
- **E3 (c09-p004).** “Conditional in both directions” is an odd label for one conditional conclusion plus a negative clause.
- **E4 (c09-p013).** “Every step is contested in the inspected exchange” points forward to Lenman before he appears. Fine after p014 exists; clumsy here.
- **E5 (c09-p021).** “The prudential shortcut is separately closed” is a verdict-verb; even after M1, “is recorded as insufficient” would match inference strength.

---

## What is not a defect

- Korsgaard’s listed self-limits (formal vs moral law; interpersonal additional argument; animals; endorsement not rightness; skepticism left open) are present and not converted into success.
- Nagel is held as a rival at p009, p011, p024 (aside from M1).
- Enoch chapter-3 gap is declared at the first indispensability use; chapter 4 is conditional and weak; §5.1 is left open by Enoch’s own text.
- Lenman is not a population finding and not evidence about fundamental consciousness.
- Craig transcript provenance and “no independent proof” are stated.
- CL-T15-016–019 and A-T15-001/006 are marked conditional.
- H-A is a ledger finding at p020 and p027; no world-claim that a conscious foundation lacks authority.
- No winner among constructivism, robust realism, naturalism, or conscious authority.
- Evil/hiddenness deferral is stated and clean; no silent use of A-T15-003/004/005 or CL-T15-006–015/020–024.
- Nine-component close matches accepted c06–c08 wording; all twelve GATE-T16-* remain `withheld`.
- One crosswalk entry per paragraph; hashes match the author packet.
- U2’s one-group treatment matches DG-P2T06-SOURCES-EXCHANGE.

## Residual notes (non-blocking)

- `derived/evidence/c09.md` and `derived/manifest.json` are stale on the drafted chapter. Overseer should `--sync-manifest` after acceptance, not before the revision is in.
- P3G1 has not allocated transferred P2R20 decisive-source reopenings. None were skipped. No extension requested.
- G2-GAP-30’s machine-readable `phase2_status` is still `unassessed_in_phase2` even though P2T06/P2T07 exist. That is a register issue, not something the chapter can close. It does bear on M2’s “superseded.”

## Recommended next action

**Superseded by re-review of revision 1:** overseer adjudication to accept P3C09 (revision 1) and P3R09. No remaining material defects. Revision cycle 2 unused. Sync derived manifest at acceptance.
