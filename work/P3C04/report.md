# P3C04 — Thesis chapter: What Experiential Primitiveness Explains

Status: revision 1 submitted for re-review (P3R04). Author: thesis-author context (Claude Fable 5), per `prompts/thesis_author.md`. Date: 2026-09-13.

## Revision 1 (response to P3R04 first review: revise; 4 material, 12 minor)

All four material and all twelve minor defects repaired with the reviewer's exact corrections:

- **M1 (c04-p023):** Deleted "which the record's idealism material independently supports." The reversal stays as article p-015 framing; "public regularity" replaced with the article's private-perspectives / physical-structure wording; CL-P2T03-018 now used only for non-entailment of a universal subject, stated in a new closing sentence.
- **M2 (c04-p008, c04-p027):** CL-T12-003 dropped from the p008 crosswalk and replaced with A-T05-004/CL-T05-004; the near-copy sentence reworded to T05-scoped identity discipline. p027 now names the four dependency groups exactly and states the gap thread is a single Chalmers-Papineau group, not two.
- **M3 (c04-p026):** Restored CL-P2T03-019's content: the inspected chapter treats experience as requiring time; the reply distinguishes activity from intentional agency; neither supplies timelessness/preservation/intention/goodness/authority as established. No claim of silence.
- **M4 (c04-p025):** Neural-dependence reproduction re-scoped to the 2005 maintenance model (CL-P2T01-010); constitution's bound stated as Strawson's brain-state acceptance (CL-P2T03-018, added to the p025 crosswalk).
- **Minor 1–12:** p006 C/E horns restored with truth and justification, A-T05-002 added to crosswalk; p013 "genuine dialectical advantage for the realist"; p011 byte-level/visual verification limit restored (c03-p007 wording); p015 2008-reprint limit at first use; p007 "cleanest" dropped, *Philosophia* 2011 added; p024 relabeled as chapter-level application of the article's two listed advantages, not a ledger census; p009 "whether physical or nonphysical" restored; p019 "not independent corroboration" added; p028 rank-refusal rescoped to inspected models plus the uninspected article reversal; p005 relevant-sections access stated; p022 "every family" pointed back to the alternatives chapter; p003 "integration" dropped.
- **Editorial:** Citation count corrected below (14, not 12); the U3 packet note's author mix-up superseded by the reviewer's adjudication; p008 portraiture removed.

`node scripts/thesis/build.cjs --check` passes after revision. Revision cycle 1 of 2.

## What was done

Drafted `thesis/chapters/04-phenomenal.md` (28 paragraphs, c04-p001 to c04-p028), expanding article section 3 (p-008 to p-015) per the P3C04 contract and the skeleton's planned sections. The chapter analyzes four recorded exchanges — explanatory gap (T05), illusionism/acquaintance (P2T05), causal emergence/exclusion/latent powers (P2T01), constitution/combination (P2T03) — and closes with the transferred burdens of any conscious-ground proposal, the component boundaries, a dependency accounting (four dependency groups) and an explicit what-this-chapter-cannot-conclude paragraph.

## Inputs actually used (all frozen contract inputs; no searches)

All five front-matter inputs, read through `derived/evidence/c04.md` (verified current before drafting) plus the article paragraphs p-008 to p-015 extracted from `paper/paper.html`. Standing constraints from work/G2/synthesis_constraints.json and the gap/gate register. Records from P2T01/P2T03/P2T05 overlap the accepted c03 chapter's inputs; reuse across chapters is by design and visible in the crosswalks.

## Crosswalk approach

Per the frozen pilot calibration: paragraphs resting on evidence map to ledger IDs (A-*, CL-*, S-*); `PREMISE:article:p-0NN` labels carry framing inherited directly from the article's frozen paragraphs; `PREMISE:structure/method` labels carry thesis-structural and dependency-accounting statements. 28 entries, one per paragraph. 14 unique [@S-...] citations (count corrected in revision 1; the originally filed "12" was an author-packet error flagged by the reviewer).

## Fidelity conventions observed

- Version disclosures at first use: S-T03-001 author-hosted 1995 article, relevant sections; S-T05-003 author PDF with 2006/2007 year variants; S-T05-004 year unresolved; S-T05-005 published article; Nida-Rümelin non-final manuscript; Strawson 2008-chapter-not-2006-journal (one work-version family); O'Connor/Wong, Kim reprint, Shoemaker inspected originals.
- The Chalmers phenomenal-concepts dilemma (c04-p006) is summarized as "roughly" and marked as an attributed argument; CL-T05-002 records only "argues against the phenomenal-concept strategy."
- Fundamentality readings hedged to the recorded conditional forms (CL-P2T01-009).
- No family ranking, no ontology asserted, all twelve gates stated as withheld.

## Uncertainties (first draft; all adjudicated by P3R04 and resolved in revision 1)

- U1 (adjudicated: minor): the c04-p006 dilemma gloss was fair to work/T05/report.md but not to mapped CL-T05-002 alone; A-T05-002 added to the crosswalk and the C/E formulation restored with truth and justification.
- U2 (adjudicated: material, M1): the "record's idealism material independently supports" clause reached outside the freeze; deleted in revision 1.
- U3 (adjudicated: material with M2): four dependency groups is the correct freeze count only with CL-T12-003 dropped; there is one Chalmers-Papineau group, not two. Both fixed in revision 1.

## Contradictions

None found among the inputs.

## Budget

Search queries: 0 of 0. Source inspections: 0 of 0. Revision cycles used: 1 of 2.

## Input and artifact hashes

| File | SHA-256 |
| --- | --- |
| thesis/chapters/04-phenomenal.md (rev 1) | 671a46d641facdb3cc02955991d651b34832e795132388b391561d196e2a8263 |
| thesis/crosswalk/c04.json (rev 1) | 3ccd303da3a9b7812106852bfdc8444ac571efbecfff57eec4ecc88a18a3d776 |
| paper/paper.html | d31eab14ead977930fe47b46e6fd253df0da0b7fdf6a49391943ab1e5952a277 |
| work/T05/report.md | 126d942622383ea87071ed7dedc394dccaa2200976a31618cdc251101452437f |
| work/P2T01/report.md | 090b5d3d2828cc47b7a39de6f076217e9c2d3f146295c5c3a0289018b39eeef6 |
| work/P2T03/report.md | a32265ac69edac3c35d482c826df38cb1ed1ecb40151860924713142df658bb2 |
| work/P2T05/report.md | 575ac90e41ed84682ddd82db3adeca6f532910fa3b03abd95b3465b0004a4444 |

## Recommended next action

P3R04 re-review returned accept on revision 1 (cycle 2 unused). Overseer adjudication and acceptance recording.
