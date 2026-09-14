# P3R05 — Independent review: thesis chapter From an Experiential Ground to an Intending Agent

Status: submitted to overseer. Reviewer authored none of the chapter, crosswalk, or P3C05 packet. Reviewer does not optimize for agreement with the author, the overseer, or another model.

- Task: P3R05
- Chapter: `thesis/chapters/05-existence.md` (c05, status `submitted`, 28 paragraphs c05-p001–c05-p028)
- Crosswalk: `thesis/crosswalk/c05.json` (28 entries)
- Author packet: `work/P3C05/report.md`, `work/P3C05/result.json`
- First-review verdict: **revise** (3 material, 11 minor)
- Re-review of revision 1 verdict: **accept**
- Remaining material defects: none
- Residual non-blocking notes: see re-review section

The original review body below is retained as the first-cycle record. The operative verdict is in **Re-review of revision 1**.

---

## Re-review of revision 1

Revision 1 was re-read in full (`thesis/chapters/05-existence.md`, `thesis/crosswalk/c05.json`). Each claimed M1–M3 and N1–N11 repair was checked against the actual prose and, where load-bearing, against `node scripts/derived/lookup.cjs` for CL-P2T10-020, CL-P2T11-013, CL-P2T11-014, CL-P2T11-015, S-P2T11-001, and S-T10-007. The author packet was not taken on trust. `node scripts/thesis/build.cjs --check`: **pass**. `node scripts/derived/build.cjs --check`: **stale** (`derived/manifest.json` still has the pre-revision chapter hash). SHA-256 values in `work/P3C05/result.json` were recomputed for the revised chapter and crosswalk; both match.

No new paragraph IDs. Crosswalk still 28 entries, one per paragraph, all freeze-task refs (T10, P2T10, P2T11) or PREMISE labels. A-P2T10-002 added to p012. p007 article label split to `p-017-criticism`. p027 PREMISE label now names four groups plus T10 per-source groups. No out-of-freeze import. No withheld gate opened. No necessary being, designer, or posterior asserted.

### Material repairs verified

**M1 (c05-p020) — closed.** Prose now: Bradley reply remains mediated through the Weisberg manuscript and uninspected; White's article is inspected separately as above. Lookup S-P2T11-001: independently inspected published 2011 article. Lookup S-T10-007 provenance still records T10's White-and-Bradley mediation; the chapter no longer treats that as current access for White. Seven-page author manuscript versus journal pagination kept. No meaning drift in the screening-off or matching-assumption clauses.

**M2 (c05-p027) — closed.** DG-P2T10-PSR-EXCHANGE scoped to the 1999/2000/2002 exchange only. "The cosmological material is one dependent exchange" and the "behind it" placement are gone. Leibniz/Hume "carry their own T10 dependency groups"; CL-P2T10-020's v1 derivative-input statement is named as **DG-P2T10-V1-INFERENCE**. Lookup CL-P2T10-020 confirms that group. LENNOX-ORDER and the fine-tuning shared group plus CL-T10-020's retain-shared-dependencies instruction unchanged. Crosswalk PREMISE lists the four groups plus "T10 per-source groups." T10 group IDs (PSR, Leibniz_bridge, Hume_contingency, Hume_design) are not listed by name; that was the optional half of the correction, not the required deletion of the invented parent relation.

**M3 (c05-p021) — closed.** Tiny no-design likelihood is "source-assumed from Collins 2003, a distinct source not inspected here and not either of the two Collins versions above" (CL-P2T11-013). Robustness is "those departures from exact indifference that preserve the likelihood separation" (CL-P2T11-014). Laxity disfavors design after conditioning on life exactly where stringency favors it, while the unconditional relation can differ (CL-P2T11-015). No meaning drift in the mixture sufficient-condition sentence.

### Minor repairs verified

| ID | Paragraph | Repair present? |
| --- | --- | --- |
| N1 | p005 | Yes. Objection/reply in recorded roles; scope is an unresolved issue, not a symmetric burden; modal necessity is not temporal or causal priority. |
| N2 | p004 | Yes. Hume's own Bennett / relevant-sections / marked editorial additions / speaker-discipline limits. French-not-compared gone. |
| N3 | p022 | Yes. Small-interval approximation and assumed-from-the-exchange input attached to about-sixty-one; linear life-world weighting; count-versus-proportion and maximum-versus-typical. |
| N4 | p007 | Yes. Selected manuscript text; print pagination not collated. Label is `PREMISE:article:p-017-criticism`. |
| N5 | p008 | Yes. "By anyone in the exchange" deleted; totality ontology remains a separate open issue. |
| N6 | p009 | Yes. Davey and Clifton named; originals uninspected; Pruss 2001 cardinality proof uninspected. |
| N7 | p012 | Yes. `A-P2T10-002` added to p012 refs. |
| N8 | p017 | Yes. 1999 excerpt: printed formula missing a division, preserved as a reproduction issue, at S-T10-004 first use. |
| N9 | p019 | Yes. White's stated target is uninspected Weisberg 2010; inspected Weisberg is the 2012 manuscript. |
| N10 | p023 | Yes. Weisberg 2005 named; "does not claim the design probabilities actually equal zero." |
| N11 | p025 | Yes. "Inherited framing" only; "the record supports at each clause" gone. |

Editorial items claimed: p016 "reconstruction's conditional maximum" present; p020 method-selection and Divine-Intent unconditional-derivation clauses present; p022 "record's verdict is symmetrical" gone.

### New-defect hunt on reworded sentences

p005, p009, p020, p021, p022, p027 re-read for drift. None convert a conditional into an actuality claim, reopen a gate, or re-invent a DG parent. p009's "whose original was not inspected" is slightly singular for two critics, and "Pruss 2001 cardinality proof behind the construction" uses "behind" as source-history, not as a DG edge; both are residual, not a return of M2. p004 says "marked editorial additions" and does not repeat "omissions"; S-T10-003 has both. p027 does not enumerate the four T10 group IDs. None of these block acceptance.

### Author packet

`work/P3C05/result.json` is honest: `revision_cycles_used` is 1; hashes match the revised files; U1–U3 marked adjudicated. `work/P3C05/report.md` Revision 1 heading lists the right repairs, but the leftover first-draft Uncertainties block, "Revision cycles used: 0 of 2," and the Fidelity-conventions list (Hume "same series," White/Bradley still mediated, "Collins figure," three DGs only) are stale. Same packet-staleness class as P3R03/P3R04. Not a chapter-text defect.

### Residual notes (non-blocking)

- `derived/manifest.json` is stale on the revised chapter hash. Overseer should `--sync-manifest` at acceptance.
- Author packet report.md still has first-draft U1–U3 wording and "Revision cycles used: 0 of 2" below the Revision 1 heading; result.json is honest.
- p009 "original" singular; "behind the construction" is source-history wording.
- p004 omits Bennett "omissions" next to additions.
- p027 names T10 groups as a class, not by ID.
- S-T10-006 ledger access_status remains `inspected_abstract_notes_references_only`. Chapter split disclosure still honest. Records/overseer, not this revision.

### Re-review verdict

The contract is now met. Acceptance is about method fidelity, not worldview truth. Revision cycle 2 unused.

---

## Reviewer independence and scope

The reviewer did not author P3C05, the chapter, or the crosswalk. No subagents were spawned. No external web searches and no external source inspections were used (budget 0/4 queries, 0/8 inspections). Load-bearing claims are about accepted ledger records; those records, their derived views, the named task reports, the frozen article paragraphs, and the gap/gate register were read as input verification, not as original-text reopenings. P3G1 has not allocated transferred P2R20 reopenings. No original-text dispute required an extension request; where a version, count, or reach claim was decisive, the accepted source records, task reports, and article paragraphs were sufficient to show the defect.

## What was checked

Binding files read first: `AGENTS.md`, `prompts/chapter_reviewer.md`, P3R05/P3C05 contracts in `state/tasks.json`, `phase3/Thesis_Execution_Plan.md`, `phase3/pilot_calibration.md`.

`node scripts/derived/build.cjs --check` was run before relying on the evidence pack: **current**. `derived/evidence/c05.md` lists chapter status `submitted` and tasks T10, P2T10, P2T11 only. `node scripts/thesis/build.cjs --check`: **pass**.

Frozen inputs compared against sampled prose: `derived/evidence/c05.md`; `paper/paper.html` p-016–p-021; `work/T10/report.md` (A-T10-003 reconstruction and objection/reply pair); `work/P2T10/report.md` (v1 derivative-input wording, Davey/Clifton, Oppy manuscript); `work/P2T11/report.md` (Sober pp. 63–90, McCutcheon ~61, Collins 2003, Dorst defects); `work/G2/synthesis_constraints.json` (SC-G2-01–10 and nine component boundaries); `derived/gap_gate_register.json` (12 gates, all `withheld`); `thesis/evidence_map.json` c05 tasks. Single-record resolution used `node scripts/derived/lookup.cjs` for the thirteen first-use sources and for CL-T10-017, A-T10-003, CL-P2T10-016, CL-P2T10-020, A-P2T10-002, CL-P2T11-013, CL-P2T11-015, CL-P2T11-019, CL-P2T11-024, CL-P2T11-025, CL-P2T11-026. SHA-256 values in `work/P3C05/result.json` were recomputed for the six listed artifacts; all matched.

Crosswalk: 28 entries, 28 unique paragraph IDs, exactly one entry per paragraph, IDs c05-p001–c05-p028 matching the chapter. Ledger refs resolve (thesis `--check` pass). Two paragraphs are PREMISE-only (p001, p002). No evidence-bearing paragraph is mapped only to PREMISE labels. No out-of-freeze record ID is imported.

No paragraph asserts a necessary being, a designer, a posterior, or opens a GATE-T16-* conclusion. P2S01/P2S02 are unused. The chapter does not rank families by name. Circularity of goodness credit is stated as a recorded inference (CL-P2T11-021). The live method defects are version-identity and dependence-accounting, not worldview smuggling.

Recurring defect class watched (from P3R02/P3R03/P3R04): (1) record-scoped attributions converted into flat assertions; (2) homemade censuses presented as ledger facts; (3) model-scoped obligations generalized to whole families; (4) version limits parked away from first use or dropped; (5) out-of-freeze records imported through the crosswalk; (6) invented dependency-group relations. Found here: class 1 (p005, p023, p025), class 2 (p008, p027), class 4 (p004, p007, p017, p020, p021), class 6 (p027). Class 3 is mostly avoided (Weisberg matching and the sixty-one ratio are scoped). Class 5 is avoided as a crosswalk import; p021's unnamed Collins 2003 is the adjacent prose failure.

## Verdict in one paragraph

The chapter is a competent expansion of article §4 and, in the Gale–Pruss/Oppy stretch, the Quinn disclosure, the two Collins versions, McCutcheon authentication, Sober's access split, circular credit, and the twelve-gate withhold, often tracks inspected versions with their recorded costs. It also carries T10's "White uninspected" limit into a paragraph written after White 2011 has been independently inspected, places Leibniz and Hume "behind" DG-P2T10-PSR-EXCHANGE although CL-P2T10-020 lives in DG-P2T10-V1-INFERENCE, and lets Dorst's numerical bound rest on "an uninspected Collins figure" without naming the uninspected 2003 paper as distinct from the two Collins versions just distinguished. Those are method defects, not style. They block acceptance.

---

## Fidelity sample (26 paragraphs, chosen as the ones most likely to be embellished)

Unsampled paragraphs (c05-p001, p002) were read in full for smuggled conclusions, invented counts, dropped limitations, and dependence overclaim. They are not given line-by-line below. Nothing in the remainder reversed the verdict. p001's two-route scope matches the plan row. p002's attribution-only caution and shared-group warning are sound.

### c05-p003 — Leibniz PSR and article demand (PREMISE:article:p-016)

Crosswalk: `CL-T10-004`, `CL-T10-005`, `CL-T10-006`, `S-T10-002`, `PREMISE:article:p-016`.

Article p-016 first sentence: a foundational theory must also address why this concrete order exists. S-T10-002: Bennett English modernization, relevant sections, original French not compared. CL-T10-006: unity, perfection, understanding and will are a distinct move; necessity establishes none of them.

Supported, including the French-not-compared limit at first use of S-T10-002. The rest of article p-016 (Gale–Pruss) is deferred to p006, which is the right split.

**No material defect.** Marked editorial additions/omissions in the Bennett text are not restated here; they are at S-T10-002 and are not decision-changing for these attributions.

### c05-p004 — Hume Dialogues (S-T10-003 first use)

Crosswalk: `CL-T10-007`, `CL-T10-008`, `S-T10-003`.

CL-T10-007/008 and speaker discipline match. S-T10-003 is a Bennett modernization of an English original: relevant sections; additions/omissions marked; no speaker uniformly expresses Hume. It does **not** carry "original French was not compared."

p003's Leibniz limit is French-not-compared. p004 says Hume was inspected "in the same modernization series with the same limits." That transfers a false language-comparison limit onto Hume.

CL-T10-008 limitations also record that Part XII complicates a wholly negative reading. Dropped; speaker discipline still stated.

**Minor (N2, class 4).** Exact correction: drop "the same limits." State Hume's own limits (Bennett modernization; relevant sections; additions/omissions marked; speaker discipline). Do not import French-not-compared.

### c05-p005 — T10 reconstruction (U1)

Crosswalk: `CL-T10-017`, `A-T10-003`.

CL-T10-017 statement is reproduced almost verbatim, including "mentality needs further premises." Alternative explanations (brute totality, necessary impersonal ground, rejection of the concrete-ground premise) match. Totality-not-from-parts matches the claim's limitations and the T10 report.

A-T10-003 strongest objection: "Local explanations may exhaust the legitimate demand; necessary impersonal reality remains possible." Strongest reply: "Local causal links can leave why the totality obtains unanswered; exemptions from PSR need justification." Unresolved issues include "PSR scope." T10 report: the defender says selectively exempting the whole needs justification; "this dispute concerns PSR scope and explanatory sufficiency."

The balance sentence — "exemptions from the principle need justification but so does the principle's scope" — converts a one-sided reply plus an unresolved-issue label into two parallel recorded marks that "the record marks" as equally substantive. The reply does not say the principle's scope needs justification in the same sense exemptions do. Class 1, not a new metaphysical assertion.

CL-T10-017's other limitation ("Modal necessity is not temporal or causal priority") is dropped here. Later paragraphs do not convert necessity into temporal priority; still a first-use drop.

**Minor (N1 / U1, class 1).** Exact correction: restore the T10 pairing. Keep totality-not-from-parts. Attribute "local explanations may exhaust the demand; a necessary impersonal ground remains possible" as the strongest objection, and "local links can leave the totality unanswered; exemptions from PSR need justification" as the strongest reply. Describe the dispute as concerning PSR scope without converting that into a second recorded justification-burden parallel to the exemption reply. Restore "modal necessity is not temporal or causal priority" at first use of the reconstruction, or point to it explicitly.

### c05-p006 — Gale–Pruss 1999 (PREMISE:article:p-016-attraction)

Crosswalk: `CL-P2T10-001`, `CL-P2T10-002`, `A-P2T10-001`, `S-P2T10-001`, `PREMISE:article:p-016-attraction`.

Article p-016 attraction sentence: explain contingency through something that does not merely add another unexplained contingent member. CL-P2T10-001: W-PSR over propositions true in any possible world; formal scope broader than an actual-world-only gloss. CL-P2T10-002: maximal BCCF, bivalence, compossibility. S-P2T10-001: `full_selected_text_inspected`.

Supported as attribution of their advertised derivation, not as actuality. First use of S-P2T10-001 is adequate ("full selected text of the 1999 article"). Pages 461–476 and the wrapper-inclusive scan are not required in prose.

**No material defect.**

### c05-p007 — Oppy 2000 (PREMISE:article:p-017)

Crosswalk: `CL-P2T10-012`, `CL-P2T10-013`, `CL-P2T10-014`, `A-P2T10-003`, `S-P2T10-002`, `PREMISE:article:p-017`.

CL-P2T10-012/013/014 and the independent-grounds condition match, including "a condition of the argument, not a demonstrated fact about all non-theists." Article p-017's withdraw-assent clause is here; the reply half is p009.

S-P2T10-002 locators are manuscript sections. P2T10 report: Oppy's print version remains uncollated. The chapter says "full selected text of the 2000 reply" without "manuscript" and without the print-uncollated limit. Weisberg later gets an explicit manuscript-versus-journal disclosure; Oppy does not.

PREMISE:article:p-017 names the whole article paragraph, half of which is the 2002 reply.

**Minor (N4, class 4).** Exact correction: "inspected in the full selected manuscript text of the 2000 reply; the print version remains uncollated." Move or split the p-017 label so the reply half is not tagged on the Oppy-only paragraph (p009 already has `p-017-reply`).

### c05-p008 — Oppy counterpart / totality ontology

Crosswalk: `CL-P2T10-015`, `CL-P2T10-016`.

Counterpart/duplicate distinction matches CL-P2T10-015. Oppy's statement that the main criticism does not depend on resolving abstract-proposition / BCF–BCCF questions matches CL-P2T10-016.

"No independent resolution of the totality ontology is supplied by anyone in the exchange" converts Oppy's scoped limitation into an exchange-wide census. The 2002 reply's BCCF* fallback (CL-P2T10-026, used in p009) is a conditional construction on the table. Class 2.

**Minor (N5, class 2).** Exact correction: keep Oppy's statement that his main criticism does not depend on resolving those questions; delete "by anyone in the exchange." Totality ontology remains open; do not census the 2002 fallback out of existence.

### c05-p009 — Gale–Pruss 2002 (PREMISE:article:p-017-reply)

Crosswalk: `CL-P2T10-023`, `CL-P2T10-024`, `CL-P2T10-026`, `CL-P2T10-027`, `S-P2T10-003`, `PREMISE:article:p-017-reply`.

Entailment conceded, contingent-proposition reformulation, understanding-without-all-consequences, explanation-seeking appeal, epistemic-to-logical possibility as defeasible, and "as presented in the reply itself, whose originals were not inspected" all track the mapped claims. S-P2T10-003: `full_selected_version_inspected`. Article p-017 reply sentences track.

Davey and Clifton are in the source title and in CL-P2T10-026; the chapter says only "separate critics." Pruss 2001 cardinality proof uninspected is in CL-P2T10-026 limitations and dropped. CL-P2T10-024's admission that stronger plausibility of W-PSR over materialism is not argued there is dropped here (p010's "not a further theorem" is weaker). BCCF* "conditional on enough atomic facts and additional totality and explanation clauses" is compressed to "conditionally."

**Minor (N6).** Exact correction: name Davey and Clifton at first use of S-P2T10-003 / the fallback; keep originals uninspected; restore the Pruss 2001 uninspected limit next to the fallback; optionally restore the materialism-plausibility-not-argued admission (or keep it only if p010 cites CL-P2T10-024 for that clause).

### c05-p010 — article verdict (PREMISE:article:p-018-structured-challenge)

Crosswalk: `PREMISE:article:p-018-structured-challenge`, `CL-P2T10-014`, `CL-P2T10-024`.

Article p-018: blocks easy unintelligibility; does not make disclosed consequences costless; whether the principle remains better justified than the alternatives once modal force is understood; cosmological argument as structured challenge to brute contingency, not an uncontested passage from intelligibility to providence.

Supported as inherited framing plus the two mapped claims. "Comparison of intuitions and practices, not a further theorem" is a fair gloss of CL-P2T10-024's warrant gap. Mentality-not-selected is correctly deferred to p011–p016.

**No material defect.**

### c05-p011 — personal explanation

Crosswalk: `CL-P2T10-004`, `CL-P2T10-005`, `CL-P2T10-006`, `CL-P2T10-007`, `A-P2T10-002`.

Exhaustiveness qualified by unconceived kinds, scientific exclusion, necessary existence versus contingent action, libertarian free action as context-sensitive self-explainer, exhaustiveness not a measured inventory, free-action exception as a substantive premise: all match. Conditional throughout. Does not assert a necessary being.

**No material defect.** A-P2T10-002's strongest project question is used in p012, not here (see p012).

### c05-p012 — Quinn (CL-P2T10-008/009)

Crosswalk: `CL-P2T10-008`, `CL-P2T10-009`.

Reported correspondence only, not an independent Quinn original: matches CL-P2T10-008 limitations. Fallback plus order/free-versus-indeterministic defense: matches CL-P2T10-009. Question left open on both sides: matches inference strength.

"The project's strongest recorded question" is A-P2T10-002's `strongest_objection`, mapped on p011, not on p012.

**Minor (N7).** Exact correction: add `A-P2T10-002` to p012 refs (keep it on p011 if the personal-explanation route stays there), or move the "strongest recorded question" sentence up to p011.

### c05-p013 — attribute stage

Crosswalk: `CL-P2T10-010`, `CL-P2T10-011`, `CL-P2T10-025`.

Teleology with withheld omni-properties, theodicy/faith for actual benevolence, 1999 footnote disagreement, 2002 goodness gap, "nothing in the exchange converts a necessary source into a good one": all match. No circular goodness credit.

**No material defect.**

### c05-p014 — Lennox (S-T10-001 first use)

Crosswalk: `CL-T10-001`, `CL-T10-002`, `CL-T10-003`, `CL-P2T10-017`, `CL-P2T10-018`, `A-T10-001`, `S-T10-001`.

S-T10-001: full HTML, apologetic venue, historical/resurrection material as context not corroborated events. Compatibility versus positive intelligibility/order claims kept distinct. Matches.

**No material defect.** Access status is `inspected_relevant_full_text`; "full essay in HTML" is slightly stronger than "relevant" but T10 reports the full article accessible.

### c05-p015 — compatibility versus comparison

Crosswalk: `CL-T10-016`, `A-T10-002`, `A-P2T10-004`, `CL-P2T10-022`.

Compatibility favors nothing; comparative support needs independently motivated expectations; fitted preferences, untested selection-plus-learning, no equation of nonintentional origins with unreliable reason; shared assumptions with the cosmological attribute stage: all match.

**No material defect.** Model-scoping is kept. Class 3 not triggered.

### c05-p016 — open bridge (PREMISE:article:p-018-personal-privilege)

Crosswalk: `CL-P2T10-021`, `CL-T10-019`, `PREMISE:article:p-018-personal-privilege`.

Component non-entailment matches CL-P2T10-021 / CL-T10-019. Article p-018: personal explanation cannot be privileged solely because the intended conclusion is personal.

"What the contingency route delivers, at maximum and conditionally, is a necessary concrete ground" is A-T10-003's reconstruction maximum, not Gale–Pruss's advertised personal-explanation conclusion. p011 already priced that further argument as separate and contested. Acceptable if read as the reconstruction's max after refusing extra premises; it is not a silent denial of A-P2T10-002.

**No material defect.** Optional editorial: "the T10 reconstruction's maximum."

### c05-p017 — two Collins versions (PREMISE:article:p-019)

Crosswalk: `CL-T10-009`, `CL-P2T11-001`, `CL-P2T11-003`, `CL-P2T11-004`, `CL-P2T11-023`, `S-T10-004`, `S-P2T11-003`, `PREMISE:article:p-019`.

S-T10-004: abridged 1999 teaching excerpt, ellipses, no probability appendix, `inspected_partial_original`. S-P2T11-003: 1998 webpage, appendix, not an authenticated complete 1999 chapter, malformed endnote 2 with labeled reconstruction. Comparative, short of proof, epistemic probability, atheistic single universe: match. Article p-019's Collins framing is here; circularity is p018.

S-T10-004 provenance also records the excerpt's p.17 formula, visually inspected, missing division preserved. CL-T10-018: "excerpt endnote2 is malformed." That 1999-excerpt defect is disclosed only for the 1998 webpage ("its second endnote repeats…"). First use of S-T10-004 drops the excerpt's own malformation. Discovery Institute grant and seventeen-page length are dropped (not decision-changing).

CL-P2T11-004's distinctive content (removing already-known life from the hypothesis-alone expectation) is not in the prose. Over-mapping, not a false attribution.

**Minor (N8, class 4).** Exact correction: at S-T10-004 first use, disclose the excerpt's malformed endnote 2 / missing division (and that the Bayes identity is the project's reconstruction). Keep the 1998 repeat/reconstruction disclosure.

### c05-p018 — designer motivations / circularity (PREMISE:article:p-019-circularity)

Crosswalk: `CL-T10-010`, `CL-P2T11-002`, `CL-P2T11-021`, `PREMISE:article:p-019-circularity`.

Goodness and life-value as likelihood premises, not independently established conclusions: CL-T10-010 / CL-P2T11-021. Article p-019 circularity sentences are tracked almost verbatim.

**No material defect.** No circular goodness credit.

### c05-p019 — White 2011 (PREMISE:article:p-020)

Crosswalk: `CL-P2T11-005`, `CL-P2T11-006`, `CL-P2T11-007`, `S-P2T11-001`, `PREMISE:article:p-020`.

Four-page 2011 article, old life versus newly learned stringency, three premises, evidential probabilities, absence of repeated creation not a refutation, third premise motivated by no known designer preference, bounded by other fine-tuning objections: match. S-P2T11-001: published Analysis 71(4):676–679, four PDF pages. Article p-020 White sentences track; Weisberg half of p-020 is in p020 without a second article label, which is acceptable.

White's actual bibliography is a single Weisberg 2010 entry. A-P2T11-002 unresolved: Weisberg 2010 original omitted; do not impersonate 2012 attribution as 2010 coverage. Not disclosed at White first use.

**Minor (N9).** Exact correction: at S-P2T11-001 first use, note that White 2011 replies to Weisberg 2010, that 2010 original remains uninspected, and that the inspected Weisberg in the next paragraph is the 2012 author manuscript.

### c05-p020 — Weisberg screening (U2-adjacent; S-T10-007 first use)

Crosswalk: `CL-P2T11-008`, `CL-P2T11-009`, `CL-P2T11-010`, `CL-T10-013`, `CL-T10-014`, `CL-T10-015`, `S-T10-007`.

Seven-page author manuscript rather than journal pagination: matches S-T10-007. Judge example, screening-off from matched distributions, valid under matching and not a measure-free refutation of all design arguments, initial life may support design, uniformity/unbounded-space/parameterization: match. Class 3 avoided: "under those matching assumptions."

S-T10-007 provenance (T10): "White 2011 and Bradley reply mediated through this source, not independently inspected." P2T11 then inspected White independently as S-P2T11-001, which this chapter already used in p019. p020 still says "the White and Bradley replies are mediated through it, not independently inspected."

That is a packet-scoped T10 limit flattened into a current access claim, in contradiction of p019 and of S-P2T11-001. Bradley remains uninspected. White does not. Recurring class 4, the same class as P3R03's "in this packet" remainder and P3R04's 2005-maintenance generalization.

CL-P2T11-010's method-selection problem and CL-P2T11-009's Divine-Intent unconditional derivation are dropped. Secondary to M1.

**Material (M1, class 4).** Exact correction: keep the seven-page author-manuscript versus journal-pagination limit. Scope remaining mediation to Bradley (and, if wanted, to T10's then-access). Do not say White is not independently inspected. White 2011 is independently inspected in this chapter as S-P2T11-001.

### c05-p021 — Dorst mixture and defects

Crosswalk: `CL-P2T11-011`, `CL-P2T11-012`, `CL-P2T11-013`, `CL-P2T11-014`, `CL-P2T11-015`, `CL-P2T11-024`, `S-P2T11-002`.

Ten-page 2022 Online First PDF, visible formula/bibliography defects, final inequality conflicting with earlier equality, recast as indifference over stringency classes, opposite support from the two uniformities, mixture with sufficient weight, diagrams as stipulated spaces, weighting depends on disputed views of designer/time/laws: match CL-P2T11-011/012/014/024. S-P2T11-002: complete 10-page PDC Online First 2022-10-21; pages unnumbered, use PDF-page locators. "Unnumbered / PDF-page locators" dropped (minor).

CL-P2T11-013 limitations: "Tiny numerical scale is source-assumed via Collins2003, not verified here." A-P2T11-003 unresolved: "Collins2003 numerical premise not independently inspected/validated." The chapter says "source-assumed from an uninspected Collins figure."

p017 has just distinguished two inspected Collins versions (1999 excerpt without appendix; 1998 webpage with appendix). "An uninspected Collins figure" lets the bound look like a gap in those versions (the missing 1999 appendix, or some unread figure) rather than a third, out-of-freeze Collins 2003 paper that Dorst assumes and this freeze never inspected. Not a crosswalk import of a 2003 record (class 5 avoided as mapping), but a version-identity failure at first use of the numerical scale (class 4; class 5-adjacent in prose).

CL-P2T11-014: robustness is to "departures preserving the likelihood separation." Chapter: "some departures from exact indifference." Flattened. CL-P2T11-024 also records missing conditioning/negation and a White-author error; "including" the inequality sign does not restore them. CL-P2T11-015 (laxity disfavors after conditioning when stringency favors) is mapped and not stated. Over-mapping plus dropped robustness scope: minor, beside M3.

**Material (M3, class 4).** Exact correction: identify the tiny no-design likelihood as source-assumed from an uninspected **Collins 2003** figure, distinct from S-T10-004 and S-P2T11-003. Restore "departures preserving the likelihood separation." Optionally restore the White-author error and missing conditioning/negation as named defects, and either state CL-P2T11-015 or drop it from the refs.

### c05-p022 — McCutcheon (U2)

Crosswalk: `CL-P2T11-025`, `CL-P2T11-026`, `CL-P2T11-027`, `CL-P2T11-028`, `CL-P2T11-029`, `S-P2T11-005`.

Unauthenticated supplied manuscript, no byline, archive attribution, uniform-range-prior example about sixty-one with residual positive evidence, power priors near unity with improper endpoint, challenges scale/robustness without invalidating the mixture sufficient condition, near-neutral conclusion conditional on added model assumptions, capped search not absence of reply: all match the claim statements. "About sixty-one" is a fair rendering of "around 61." S-P2T11-005 first use is strong on authentication.

CL-P2T11-025 limitations, not in the prose: linear life-world weighting; count/proportion and maximum/typical interpretations not independently established. CL-P2T11-026 limitations, not attached to the sixty-one: small-interval approximation with ε ≪ a=10^(−53); a assumed from the exchange, not empirically validated. The paragraph hangs "added model assumptions" on the near-neutral (power-prior) conclusion, not on the sixty-one. CL-P2T11-029's Dorst-2002 misprint and May 17 compilation-metadata-is-not-a-publication-date are dropped; authentication is already stated.

Decision-relevant drop: the sixty-one is a recorded approximation under an assumed a, not a free-standing collapse of the ratio. Not a false number. Not a conversion into evidence of actuality.

**Minor (N3 / U2, class 4).** Exact correction: restore linear life-world weighting and the count/proportion (and maximum/typical) interpretation limits on the critique. Attach the small-interval / assumed-a limits to the sixty-one figure, not only a generic "model assumptions" clause on the near-neutral limit. Keep residual positive evidence and the mixture-sufficient-condition survival.

### c05-p023 — Sober access history (S-T10-006 first use)

Crosswalk: `CL-P2T11-016`, `CL-P2T11-017`, `CL-P2T11-018`, `CL-P2T11-019`, `S-T10-006`.

T10 abstract/notes/references of the publisher preview versus P2T11 full published scan pages 63–90: matches `work/P2T11/report.md` ("Sober's full published pp. 63–90 are now read") and the author packet. Qualitative versus numerical, inequality granted for argument, earlier-observer conditioning not automatically newly learned stringency, 2004 firing-squad retraction after a 2005 objection with both older originals uninspected, declines to debunk every design argument: match the claim statements.

Lookup S-T10-006: access_status is still `inspected_abstract_notes_references_only`; provenance still says main body paywalled and "No Sober substantive conclusion promoted from this partial view." P2T11 claims (including locators "Publishedpp86–87§9") cite this same ID. The chapter's split disclosure is the honest rendering of the task-report upgrade; it does not pretend the source record was rewritten. Citation `[@S-T10-006]` is attached to the preview clause, which is correct for the ledger object.

CL-P2T11-018 names Weisberg 2005; the chapter says "a 2005 objection." CL-P2T11-019 limitations: "He does not claim the design probabilities actually equal zero." The chapter converts that into "explicit refusal to … set the design likelihoods to zero." Class 1, mild.

**Minor (N10, class 1).** Exact correction: name Weisberg 2005 as the recorded 2005 objection. Replace "refusal to set the design likelihoods to zero" with the limitation wording (does not claim they equal zero / does not set them to zero as a demonstrated result). Keep the T10-versus-P2T11 access split. Residual, not a chapter-text defect: the S-T10-006 ledger object remains un-upgraded; overseer/records, not this revision, would have to add a distinct scan source or update access_status.

### c05-p024 — refusals (PREMISE:article:p-021-invented-distribution)

Crosswalk: `CL-T10-018`, `CL-P2T11-020`, `A-T10-005`, `CL-P2T11-009`, `PREMISE:article:p-021-invented-distribution`.

Conditional qualitative support without a posterior; sensitivity identifies neither measure nor preferences; matching distributions neutralize stringency where those assumptions hold **and nowhere else**; no physical measure; brute reality not a uniform sampler. Article p-021 invented-distribution sentences track. A-T10-005 scoped to matching assumptions. Class 3 avoided.

**No material defect.** This is the chapter's cleanest model-scoping paragraph.

### c05-p025 — conditional discrimination (PREMISE:article:p-021)

Crosswalk: `PREMISE:article:p-021`, `CL-P2T11-019`, `CL-P2T11-021`, `PREMISE:article:p-019-circularity`.

Article p-021's conclusion is kept. Sober's decline of an indiscriminate recipe supports the observer-selection clause as a recorded Sober position, not as a project proof that selection never erases differences. Circularity has teeth via CL-P2T11-021.

"Which this chapter keeps **and the record supports at each clause**" converts article method-framing into a record-supported finding for every clause, including "a useful design argument must identify…" which is article/method, not a ledger result.

**Minor (N11, class 1).** Exact correction: keep the article conclusion as inherited framing. Attribute Sober's decline of the indiscriminate recipe to CL-P2T11-019. Do not say "the record supports at each clause."

### c05-p026 — component boundaries and twelve gates

Crosswalk: `CL-T10-019`, `CL-P2T10-021`, `CL-P2T11-021`, `CL-P2T11-022`.

Component list matches CL-T10-019 / CL-P2T10-021. Circular-credit prohibition matches CL-P2T11-021 as a recorded inference. Twelve gates withheld matches CL-P2T11-022 and `derived/gap_gate_register.json` (`withheld_conclusion_gates`: 12; GATE-T16-01..12 all `withheld`, including GATE-T16-08). No gate opened.

**No material defect.**

### c05-p027 — dependence accounting (U3)

Crosswalk: `PREMISE:method:dependency-accounting (...)`, `CL-P2T10-020`, `CL-P2T10-022`, `CL-T10-020`.

DG-P2T10-PSR-EXCHANGE spanning 1999/2000/2002 is correct for that group. DG-P2T10-LENNOX-ORDER sharing assumptions with the cosmological attribute stage matches CL-P2T10-022. DEP-P2T11-FINETUNING-SHARED-LIFE-MEASURE-PREFERENCES as one shared fine-tuning group matches P2T11. CL-T10-020's retain-shared-dependencies instruction matches the last sentence.

CL-P2T10-020 lookup: statement is "The v1 Hume and Leibniz claims remain derivative historical inputs…"; dependency_group is **`DG-P2T10-V1-INFERENCE`**, not DG-P2T10-PSR-EXCHANGE; `source_ids` empty; limitations: no new original-language inspection; dialogue roles cannot be collapsed into Hume. P2T10 report: Leibniz 004–006 and Hume 007–008 remain derivative accepted inputs at Bennett-modernization scope. T10's own groups for those texts are PSR, Leibniz_bridge, Hume_contingency, Hume_design, plus T10_PSR_reconstruction for CL-T10-017.

"The cosmological material is one dependent exchange — DG-P2T10-PSR-EXCHANGE spans … with the historical Leibniz and Hume texts recorded as derivative inputs **behind it**" invents a parent/child relation the ledger does not record, and flattens several T10 groups plus DG-P2T10-V1-INFERENCE into the modern exchange. Homemade census (class 2) plus invented DG relation (class 6). Same family as P3R04 M2 (a fifth group through the back door / a false group count).

**Material (M2, class 6).** Exact correction: DG-P2T10-PSR-EXCHANGE spans only the 1999 argument, 2000 criticism, and 2002 reply. State CL-P2T10-020 separately: v1 Hume and Leibniz claims remain derivative historical inputs, group **DG-P2T10-V1-INFERENCE**. Do not place those texts "behind" the modern exchange. If the historical texts are counted, name their T10 groups as their own groups (or as retained v1 attributions), not as members of PSR-EXCHANGE. Delete "the cosmological material is one dependent exchange." Keep LENNOX-ORDER, the fine-tuning shared group, and CL-T10-020's cumulative-use instruction.

### c05-p028 — what this chapter cannot conclude

Crosswalk: `CL-P2T11-022`, `CL-T10-019`, `CL-P2T10-021`, `PREMISE:structure:withheld-gates`.

Cannot conclude an actual explanation of the totality, a necessary foundation, a personal foundation, or all-things-considered design support; every support claim is a conditional likelihood comparison; cannot use assumed goodness as evidence of goodness; all twelve gates remain withheld. Matches the mapped records and the register. No posterior, no designer asserted, GATE-T16-08 unopened.

**No material defect.** This paragraph does the honesty work the defects above threaten to undo if left in p020/p021/p027.

---

## Material defects (exact corrections)

1. **M1 (c05-p020, class 4).** After p019 independently inspects White 2011 (`S-P2T11-001`), p020 still says "the White and Bradley replies are mediated through it, not independently inspected" (`S-T10-007` T10 provenance). Exact correction: keep seven-page author manuscript versus journal pagination; scope remaining mediation to Bradley (and T10's then-access if needed); do not say White is uninspected.

2. **M2 (c05-p027, class 6, U3).** Leibniz/Hume placed as "derivative inputs behind" DG-P2T10-PSR-EXCHANGE; cosmological material called "one dependent exchange." CL-P2T10-020 is DG-P2T10-V1-INFERENCE. Exact correction: as under p027 above. Name DG-P2T10-V1-INFERENCE. Do not invent a behind-relation.

3. **M3 (c05-p021, class 4).** Tiny no-design likelihood called "an uninspected Collins figure" after two inspected Collins versions have been distinguished. Recorded limit is Collins **2003**, uninspected, not S-T10-004 / S-P2T11-003. Exact correction: name Collins 2003 as a distinct uninspected source of that figure. Restore "departures preserving the likelihood separation."

## Minor defects (exact corrections)

1. **N1 (c05-p005, U1, class 1).** Restore A-T10-003 objection/reply roles; do not mark "principle's scope needs justification" as a parallel recorded burden; restore modal-necessity-is-not-temporal-priority at first use.
2. **N2 (c05-p004, class 4).** Do not transfer Leibniz's French-not-compared limit onto Hume.
3. **N3 (c05-p022, U2, class 4).** Restore linear life-world weighting, count/proportion (and maximum/typical) limits, and the small-interval / assumed-a caveats on about-sixty-one.
4. **N4 (c05-p007, class 4).** Oppy: selected manuscript text; print version uncollated. Split the p-017 article label.
5. **N5 (c05-p008, class 2).** Delete "by anyone in the exchange" from the totality-ontology sentence.
6. **N6 (c05-p009).** Name Davey and Clifton; restore Pruss 2001 uninspected next to the BCCF* fallback.
7. **N7 (c05-p012).** Map `A-P2T10-002` on the paragraph that uses its strongest project question.
8. **N8 (c05-p017, class 4).** Disclose S-T10-004's own malformed endnote 2 / missing division at 1999 first use.
9. **N9 (c05-p019).** White 2011 replies to uninspected Weisberg 2010; inspected Weisberg is the 2012 manuscript.
10. **N10 (c05-p023, class 1).** Name Weisberg 2005; do not convert "does not claim equal zero" into a refusal to set likelihoods to zero.
11. **N11 (c05-p025, class 1).** Do not say "the record supports at each clause" of the article's method conclusion.

## Editorial (non-blocking)

- p007's `PREMISE:article:p-017` covers the reply half that lives in p009.
- p016 "at maximum and conditionally, is a necessary concrete ground" is the T10 reconstruction max; optional to label it as such.
- p021 drops unnumbered PDF-page locators, the White-author error, and missing conditioning/negation; maps CL-P2T11-015 without stating laxity-versus-stringency after conditioning.
- p022 "the record's verdict is symmetrical" is portraiture; CL-P2T11-028 is a two-sided inference, not a named "symmetrical verdict."
- p020 drops method-selection (CL-P2T11-010) and the Divine-Intent unconditional derivation (CL-P2T11-009 extra clause).
- Author packet's 13 unique `[@S-...]` citations is correct. Packet U1–U3 flag the right paragraphs.

Residual, not a chapter-text defect: S-T10-006's ledger access_status remains `inspected_abstract_notes_references_only` while accepted P2T11 claims use published-page locators. The chapter's T10/P2T11 split is the right prose for that mess. Overseer/records, not P3C05 revision, would upgrade the source object.

---

## Numbers table

| Claim | Location | Check | Result |
| --- | --- | --- | --- |
| 28 paragraphs, c05-p001–p028 | chapter / crosswalk | IDs unique, one entry each | **pass** |
| About sixty-one | p022 | CL-P2T11-026 "around 61" | **pass** as rendering; approximation/assumed-a limits dropped (N3) |
| Twelve gates | p026, p028 | register `withheld_conclusion_gates=12`, GATE-T16-01..12 all withheld | **pass** |
| Pages 63 to 90 | p023 | P2T11 report; S-T10-006 provenance issue 2009 vol. 143 pp. 63–90 | **pass** as task-report access history |
| Seven-page author manuscript | p020 | S-T10-007: inspected author manuscript is 7 pages | **pass** |
| Ten-page 2022 Online First PDF | p021 | S-P2T11-002: complete 10-page PDC Online First 2022-10-21 | **pass**; unnumbered/PDF-page locators dropped |
| Four-page 2011 article | p019 | S-P2T11-001: four PDF pages, Analysis 71(4):676–679 | **pass** |
| 13 unique S citations | chapter / packet | S-T10-001/002/003/004/006/007, S-P2T10-001/002/003, S-P2T11-001/002/003/005 | **pass** |
| Three named DGs in p027 | p027 | PSR-EXCHANGE, LENNOX-ORDER, FINETUNING named; V1-INFERENCE and T10 groups omitted; "behind" invented | **fail** (M2) |
| Four-page McCutcheon manuscript | p022 | S-P2T11-005: exact supplied four-page manuscript | not claimed in prose; not required |

---

## Version-boundary checks at first use

| Source | First use | Recorded limit | Chapter |
| --- | --- | --- | --- |
| S-T10-001 | p014 | full HTML; apologetic venue; historical/resurrection not corroborated | disclosed |
| S-T10-002 | p003 | Bennett modernization; relevant sections; French not compared | disclosed |
| S-T10-003 | p004 | Bennett modernization; relevant sections; speaker discipline; English original | **"same limits" falsely imports French-not-compared** (N2) |
| S-T10-004 | p017 | abridged excerpt, ellipses, no appendix; p17 missing division | appendix/ellipses disclosed; **malformed p17 dropped** (N8) |
| S-T10-006 | p023 | ledger: abstract/notes only, paywalled; P2T11 report: full scan pp. 63–90 | **split disclosed**; ledger object un-upgraded |
| S-T10-007 | p020 | 7-page author MS, not journal pagination; T10: White and Bradley mediated | manuscript/pagination disclosed; **White "uninspected" carried forward after p019** (M1) |
| S-P2T10-001 | p006 | full selected text 1999, pp. 461–476 | "full selected text of the 1999 article" adequate |
| S-P2T10-002 | p007 | full selected manuscript text; print uncollated | **"2000 reply" without manuscript/print limit** (N4) |
| S-P2T10-003 | p009 | full selected version 2002; Davey/Clifton in title; originals of those critics uninspected | selected version disclosed; **Davey/Clifton unnamed** (N6) |
| S-P2T11-001 | p019 | published 4-page 2011 article; bibliography is Weisberg 2010 | four-page 2011 disclosed; **2010 original not flagged** (N9) |
| S-P2T11-002 | p021 | 10-page Online First PDF, unnumbered, formula/bibliography defects | ten-page and inequality defect disclosed; unnumbered locators and White-author error dropped |
| S-P2T11-003 | p017 | 1998 webpage, appendix, not authenticated 1999 chapter; malformed endnote 2 | disclosed |
| S-P2T11-005 | p022 | supplied four-page MS; no byline; version unauthenticated | authentication disclosed; four-page length not stated |

---

## Crosswalk findings

- 28/28 paragraphs mapped; IDs match; thesis `--check` pass; all ledger IDs belong to freeze tasks T10, P2T10, P2T11. No T12/P2T04/S-T10-005 (Friederich) import. Class 5 as mapping: **pass**.
- Findings paragraphs that rest on evidence carry `CL-*`/`A-*`/`S-*` IDs. PREMISE:article labels are used for inherited §4 framing. Sampled PREMISE:article paragraphs track the named article sentences: p003 (p-016 demand), p006 (p-016 attraction), p007/p009 (p-017 split), p010 (p-018 costless/structured challenge), p016 (p-018 personal privilege), p017/p018 (p-019 Collins/circularity), p019 (p-020 White), p024/p025 (p-021 invented distribution / conditional discrimination). Exception: p007's label names whole p-017.
- p012's strongest project question is not in mapped CL-P2T10-008/009; it is A-P2T10-002 (N7). p021 maps CL-P2T11-015 without stating it. p017 maps CL-P2T11-004's already-known-life clause without stating it. Over-mapping, not out-of-freeze.
- p001 and p002 are PREMISE-only and contain no evidence claim. p027 is not PREMISE-only; it maps three claims and then misstates one of their DGs (M2).
- No evidence-bearing philosopher-attribution paragraph is mapped only to PREMISE labels.

---

## Smuggled conclusions and gates

No paragraph asserts a necessary being, a designer as actual, a posterior, or a family ranking. GATE-T16-08 ("Necessary consciousness or intentional creator established by strongest PSR/fine-tuning literature") remains withheld; p026/p028 say all twelve gates stay withheld. Conditional likelihood support is not converted into evidence of actuality. CL-P2T11-021's circular-credit prohibition is stated as a recorded inference. SC-G2-03/04/07 are respected in the closing stretch.

The live smuggle is weaker and worse for method: a T10 access limit presented as current fact (M1), a homemade cosmological super-group (M2), and an uninspected 2003 numerical premise presented as a generic Collins figure (M3). Those are identity defects, not worldview upgrades.

P2S01/P2S02 unused. Nine component boundaries in p016/p026 match CL-T10-019 / CL-P2T10-021 (H-U/B/S/T/P/G/A listed; H-F/H-I are the routes under analysis, correctly not treated as established).

---

## U1–U3 adjudications

**U1 (p005 balance sentence vs CL-T10-017 / A-T10-003 / T10 report).** Confirmed as over-symmetrization, not as a new conclusion. The reconstruction statement, alternatives, and totality-not-from-parts are faithful. "Exemptions need justification" is the strongest reply; "PSR scope" is an unresolved-issue / dispute-topic label, not a second recorded burden parallel to the reply. Adjudication: **minor (N1). Restore objection/reply roles. Do not treat as material conversion of a contested reply into a finding.**

**U2 (p022 McCutcheon compression vs CL-P2T11-025..029).** The authentication, sixty-one rendering, residual positive evidence, power-prior near-unity with improper endpoint, mixture-sufficient-condition survival, and capped-search clause are faithful. Decision-relevant drops are the linear-weighting / count-proportion interpretation limits and the small-interval / assumed-a caveats on the sixty-one. Adjudication: **minor (N3). Restore those limits. The number itself passes.**

**U3 (p027 Leibniz/Hume "behind" DG-P2T10-PSR-EXCHANGE vs CL-P2T10-020 and ledger DGs).** Confirmed. CL-P2T10-020 is a derivative-scope statement in **DG-P2T10-V1-INFERENCE**, not a child of the modern exchange. T10's PSR / Leibniz_bridge / Hume_contingency / Hume_design groups are not that exchange either. "Behind it" and "the cosmological material is one dependent exchange" are invented relations. Adjudication: **material (M2). Repair as specified.**

---

## Strongest countercase (what does this chapter get away with?)

If accepted as filed, later chapters can cite p020 as if White 2011 were still uninspected, which would either double-count T10's mediation limit against an already-inspected freeze source or license treating S-P2T11-001 as optional. They can cite p027 as if Leibniz, Hume, and Gale–Pruss/Oppy were one cosmological observation with the historical texts as parents, which is exactly the multiplication CL-T10-020 forbids — only inverted, as a false unification rather than a false independence. They can cite p021's Dorst bound as if its numerical scale were a gap in the two Collins versions this chapter actually read, rather than an uninspected 2003 figure.

The closing paragraph blocks conversion into a probability of a designer and blocks gate-opening. It does not block those three identity moves from entering the cumulative dependence map. The version-discipline in p017, p022, and p023 is real and often exact; that thoroughness is what the three defects hide behind. The chapter does not get away with a necessary being, a posterior, or circular goodness. It gets away with looking like the project's most careful version chapter while mis-stating White's current access, the cosmological DG graph, and the Collins year on Dorst's bound.

---

## Build checks

- `node scripts/derived/build.cjs --check`: derived layer current.
- `node scripts/thesis/build.cjs --check`: pass (c05 status `submitted`, 28 explicit IDs in this chapter, 28 crosswalk entries).

## Hash verification (matches `work/P3C05/result.json`)

| File | SHA-256 |
| --- | --- |
| thesis/chapters/05-existence.md | b19f2b2c76027ef587e2bc647f4b1c2529b0668b929ba8b132bdb9c80fc26a7e |
| thesis/crosswalk/c05.json | 9ce0b7adc1b029eabfd712800cd2537967d7ed14538e3fcac15711b81ec6f76c |
| paper/paper.html | d31eab14ead977930fe47b46e6fd253df0da0b7fdf6a49391943ab1e5952a277 |
| work/T10/report.md | bfeecf01ba354461b31e329516835b84a44789987a9af7062fc0d13752322616 |
| work/P2T10/report.md | 34381b39a9c40455d72805f47de3cf7792c99a97234d86e5da3ad20a30bd90ca |
| work/P2T11/report.md | 47714d78359aecc205f90f3e52a278107d9f17886b5497b6af35994e18e6ea86 |

## Recommended next action

Author revision of P3C05 addressing M1–M3 (and the listed minors at reviewer/overseer discretion), then P3R05 re-review in this same reviewer context. Revision cycle 1 of 2. Do not accept as filed.
