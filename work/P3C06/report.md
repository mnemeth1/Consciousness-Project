# P3C06 report — Thesis chapter: Neural Dependence and the Evidential Role of Crisis Experiences

Status: accepted (re-review verdict accept; overseer adjudication 2026-09-13)
Author: overseer session (thesis_author role), 2026-09-13

## What was done

Drafted `thesis/chapters/06-empirical.md` from skeleton to a full 45-paragraph chapter and created `thesis/crosswalk/c06.json` with one entry per paragraph. The chapter covers, in order: the controlled intervention stream (Parvizi single-patient fusiform stimulation, Tasserie macaque thalamic DBS, Scheinin anesthesia-and-sleep interviews, Cogitate adversarial collaboration with its protocol audit and critique chain); the conjunctive evidential standard for crisis-report discrimination and its symmetry; the four case dossiers (Neal, Alexander, Reynolds, dentures/TG) with their critic-and-reply chains; the prospective studies (AWARE I, Dutch cohort, AWARE II including the EEG arm and both published correspondence exchanges); the historical and cross-cultural corpus (Bede, Heim, India 1986, Japan reanalysis, retrospective collections, Parnia 2001 and the Augustine–Greyson exchange); the evidential asymmetry and its sensitivity form; and the dependence accounting, access gaps and explicit non-conclusions.

## Inputs used

- `derived/evidence/c06.md` (read in full, in sections) covering T04, T06, T07, T08, T09, T19, P2T09, P2T14–P2T19.
- `paper/paper.html` section 5 (p-022 to p-029), extracted verbatim before drafting.
- Pilot calibration conventions from P3C02 adjudication (findings-chapter length 30–55 paragraphs; closing non-conclusion statement inside the final section; crosswalk granularity one entry per paragraph).

## Crosswalk approach

Same conventions as accepted chapters c02–c05: every paragraph maps to ledger IDs; structural/methodological paragraphs use labeled `PREMISE:` entries with explicit locators (article paragraph IDs, protocol sections, dependency-group names). The dependency-accounting paragraph (c06-p043) lists the dependence groups by name inside its `PREMISE:method:dependency-accounting` label. No paragraph is unmapped.

## Fidelity conventions applied

- Attribution-first: every clinical number, timing estimate and experience description is attributed to an identified inspected version; verified report ≠ verified event stated in the standing caution (c06-p002).
- Version limits disclosed in text: user-supplied audio-unverified transcripts (Neal, Alexander), converted ebooks with postdated conversion metadata, unauthenticated current webpages, uninspected originals (Sabom 1998 chapter, Meijers 1991, 1994 full transcript, Noyes–Kletti translation, 2011 Neal first edition, 2012 AANS text, AWARE II supplement, OSF version chain), and the Phase 2 dentures reinspection's single reopened page against T19's historical inspection (c06-p044).
- Unit discipline: people/episodes/interviews/images/analysis-windows kept apart (AWARE I 140 vs 142 vs 143; Dutch 344 people vs 509 episodes; AWARE II 851 images vs 85 subjects; suppression 47% of EEG data, not patients).
- Preserved nulls: unrecovered interview integers (Scheinin), Dutch 74% denominator, AWARE II delivered-stimulus-by-interview intersections, withheld twelve-case effective-trial denominator in the Augustine–Greyson exchange.
- Symmetric standard: no critic's mechanism upgraded to demonstrated cause; no report upgraded to extracerebral perception (c06-p011, dossier verdict paragraphs).
- No component of the fundamental-consciousness package receives support; all twelve withheld gates remain withheld (c06-p045).

## Revision 1 (response to P3R06 review, verdict revise: 3 material, 12 minor, 5 editorial)

Material repairs:
- M1 (c06-p017): Split the invented hybrid Alexander webpage into its two real sources — Lam's research report with the October 11, 2011 publication label and April 2014 update (S-P2T15-003) and the Skeptiko interview whose November 22, 2011 date is archive-search metadata only (S-P2T15-002) — and mapped the current author page (S-T06-005). Crosswalk updated.
- M2 (c06-p025): The February 1994 document is now the Addink interview of February 2, 1994 (transcript dated February 3); the television-interview mislabel is removed. Television captions stay with the 2008 Dutch reprint in c06-p026 (CL-P2T17-010 added to p025 refs).
- M3 (c06-p011): CL-T19-021's traceable-perception finding is now restricted to the Reynolds and dentures dossiers by name; Neal and Alexander are stated from their own packet conclusions (A-P2T14-001, CL-P2T15-032 added to refs).

Minor repairs (N1–N12): Tasserie blinding/condition-order limit added (p004); Parvizi nonspecific nonface changes restored (p003); "open-label" restored (p005); Cogitate DFC posterior-connectivity failure restored (p006); TG pre-Thumper/bystander-CPR limit added (p026); 24 ± 15 years (p038); Charland Figure 1 legend restored with Parnia 2001 and the 2013/2014 legend-year mismatch (p040); macaque outcomes restated as arousal/access markers with awareness inferred from signatures (p041); study-level dependence groups named with the P2T09 overlay separated (p043); AANS access gap remapped to S-P2T15-001/CL-P2T15-026 (p044 crosswalk); 35–60 minutes attributed as the authors' body-text summary with the exact-maximum null (p031); all nine package components named including fundamentality (p045).

Editorial (E1–E5): closing heading renamed to "Dependence accounting, access gaps and non-conclusions" (c11's reserved heading avoided; cannot-conclude paragraph stays inside the final section per calibration); "popular case for survival" dropped (p001); Q&A first-edition change stated in the record's wording (p012); 25-site phase named (p030); "best-developed" ranking dropped (p022).

## Uncertainties

- U1: The `PREMISE:` labels for article framing paragraphs (standard, asymmetry) follow the convention accepted in c02–c05 adjudications; reviewer should confirm the locators suffice.
- U2: c06-p024's characterization of the uninspected "Successful Test" webpage (S-P2T16-005) as title-only is drawn from the P2T16 gap disposition; reviewer should confirm no stronger status exists in the ledger.
- U3: The chapter states the Cogitate amendment file's internal identification (v4 file, Version 4.5, 2022-12-22) from CL-P2T19-001–005; date attributions follow the packet's own limits.

## Contradictions or blockers

None blocking. Known unreconciled source conflicts (Neal accident date and intervals; Alexander day-6/day-7 and GCS 11/8; AWARE I 140/142/143) are preserved in text as version limits per ledger records, not harmonized.

## Budget

2 sessions, 0 new source inspections (drafting and revision from ledger and evidence pack only), 1 revision cycle used of 2.

## Artifacts

- `thesis/chapters/06-empirical.md` — sha256 bd180f8bd586e99486e4627609112f0fe348c7c45e1edd18222a41ad32927fb4 (revision 1)
- `thesis/crosswalk/c06.json` — sha256 8e22d7428fef56eaf66c985c712b8ac3348f4b8120103d90b524d798ba81b6a3 (revision 1)
- `node scripts/thesis/build.cjs --check` passed on 2026-09-13 after revision (197 paragraphs, 92 citations, 183 crosswalk entries, c06 submitted).

## Recommended next action

Re-review returned accept; adjudicated accepted. Non-blocking residuals (p017 April 7 day, p005 open-label vs open, p025 caption mention) recorded in state/acceptance_P3C06.json for the pre-P3G1 consistency pass. Next: P3C07 per phase3/Thesis_Execution_Plan.md.
