# P3R06 — Independent review: thesis chapter Neural Dependence and the Evidential Role of Crisis Experiences

Status: submitted to overseer. Reviewer authored none of the chapter, crosswalk, or P3C06 packet. Reviewer does not optimize for agreement with the author, the overseer, or another model.

- Task: P3R06
- Object: P3C06
- Chapter: `thesis/chapters/06-empirical.md` (c06, status `submitted`, 45 paragraphs c06-p001–c06-p045)
- Crosswalk: `thesis/crosswalk/c06.json` (45 entries)
- Author packet: `work/P3C06/report.md`, `work/P3C06/result.json`
- First-review verdict: **revise** (3 material, 12 minor, 5 editorial)
- Re-review of revision 1 verdict: **accept**
- Remaining material defects: none
- Residual non-blocking notes: see re-review section

The original review body below is retained as the first-cycle record. The operative verdict is in **Re-review of revision 1**.

---

## Re-review of revision 1

Revision 1 was re-read in the touched paragraphs and their neighbors (`c06-p001`, `p003`–`p006`, `p011`–`p012`, `p017`, `p022`, `p025`–`p026`, `p030`–`p031`, `p038`, `p040`–`p041`, `p043`–`p045`, and the renamed closing heading). Each claimed M1–M3, N1–N12 and E1–E5 repair was checked against the prose and, where load-bearing, against `node scripts/derived/lookup.cjs`. The author packet was not taken on trust. SHA-256 values match the claimed revision-1 hashes: chapter `bd180f8bd586e99486e4627609112f0fe348c7c45e1edd18222a41ad32927fb4`, crosswalk `8e22d7428fef56eaf66c985c712b8ac3348f4b8120103d90b524d798ba81b6a3`. `node scripts/thesis/build.cjs --check`: **pass** (197 paragraphs, 183 crosswalk entries, c06 `submitted`). `node scripts/derived/build.cjs --check`: **stale** on `derived/evidence/c06.md` and `derived/manifest.json`. Crosswalk still 45 entries, one per paragraph `c06-p001`–`c06-p045`; new refs resolve. No withheld gate opened. No fundamental-consciousness component supported.

### Material repairs verified

**M1 (c06-p017) — closed.** Prose now splits Lam's research report (October 11, 2011 publication label; April 2014 update; `@S-P2T15-003`) from the Skeptiko interview whose November 22, 2011 date is archive-search metadata only (`@S-P2T15-002`) and maps the author's current account page (`@S-T06-005`). Lookup `CL-P2T15-001` / `S-P2T15-003` and `CL-P2T15-002` / `S-P2T15-002` confirm the split. The hybrid “interview transcript with a November 2011 publication label” is gone. Residual: the update day is April 7 in the record, written as “April 2014.”

**M2 (c06-p025) — closed.** The 1994 document is now “an Addink interview with nurse TG on February 2, 1994, its transcript dated February 3.” Lookup `CL-P2T17-001` matches those dates; `CL-T19-004` is Addink, not television. Television captions remain in `c06-p026` with the 2008 Dutch reprint (`CL-P2T17-010`). Residual: `CL-P2T17-010` is also listed on p025 refs though p025 does not mention captions.

**M3 (c06-p011) — closed.** `CL-T19-021` is restricted to “the Reynolds and dentures dossiers” / “those two dossiers.” Neal is stated from `A-P2T14-001` (“attributed experience and a conditional argument, not survival”); Alexander from `CL-P2T15-032` (“richer attributions without independently fixing all recalled stages”). Both IDs added to refs. The general symmetry sentence stays under the article PREMISE plus `CL-P2T17-027`, as the first review allowed.

### Minor and editorial repairs verified

| ID | Paragraph | Disposition |
| --- | --- | --- |
| N1 | p004 | Repaired. “Blinding and randomized condition order were not established in the inspected text” (`CL-T09-008`). |
| N2 | p003 | Repaired. “Nonspecific nonface changes also occurred” (`CL-T09-002`). |
| N3 | p005 | Repaired. “Randomized open-label propofol.” Residual: ledger wording is “open,” not “open-label.” |
| N4 | p026 | Repaired. Ambulance/bystander resuscitation not excluded; Dutch no-massage wording weakened in a later translation (`CL-P2T17-014`). |
| N5 | p038 | Repaired. “24 ± 15 years” (`CL-T08-017`). |
| N6 | p040 | Repaired. Legend names Greyson 1990 and Parnia 2001; 2013/2014 mismatch; no separate 2013 sample (`CL-P2T18-026`). |
| N7 | p041 | Repaired. Human side is reported perceptual content; macaque side is arousal/access markers with awareness inferred from signatures (`CL-T09-009`). |
| N8 | p043 | Repaired. Study-level groups named (AWARE I, AWARE II with article-linked ancillary narratives, Dutch cohort); P2T09 overlay separate, adding no participants. |
| N9 | p044 | Repaired. AANS gap mapped to `S-P2T15-001` / `CL-P2T15-026`; `CL-P2T15-001` dropped from this paragraph. |
| N10 | p045 | Repaired. Nine names including fundamentality; matches G2 H-F/U/B/S/T/P/I/G/A. |
| N11 | p031 | Repaired. 35–60 minutes attributed as the authors' body-text summary; figure points extend; exact maximum unresolved (`CL-T07-017`). |
| N12 | p006 | Repaired. Exploratory DFC still lacked sustained posterior connectivity (`CL-T09-014`). |
| E1 | heading | Repaired. “Dependence accounting, access gaps and non-conclusions.” |
| E2 | p001 | Repaired. “Popular case for survival” dropped. |
| E3 | p012 | Repaired. Q&A: first edition did not clearly identify Jesus (`CL-P2T14-026`). |
| E4 | p030 | Repaired. “25 sites in its main phase” (`C-T07-002`). |
| E5 | p022 | Repaired. “Best-developed” ranking dropped. |

### New-defect hunt on reworded sentences

Touched paragraphs re-read for drift. None re-invent a hybrid webpage, restore the television-interview label, re-apply T19's two-dossier positive finding to Neal or Alexander, open a gate, or upgrade a report to extracerebral perception. p017's missing April 7 day, p005's “open-label” synonym and p025's unused `CL-P2T17-010` mapping are residuals, not new material defects.

### Residual notes (non-blocking)

- `derived/evidence/c06.md` and `derived/manifest.json` are stale on the revised chapter. Overseer should `--sync-manifest` at acceptance.
- p017 writes “April 2014 update”; `CL-P2T15-001` is April 7, 2014.
- p005 writes “open-label”; `CL-T09-003` writes “open.”
- p025 maps `CL-P2T17-010` without mentioning television captions (p026 still locates them correctly).
- Author-packet Uncertainties still carry first-draft U1–U3 wording; `result.json` hashes and `revision_cycles_used: 1` are honest.

### Re-review verdict

The contract is now met. Acceptance is method fidelity, not worldview truth. Revision cycle 2 unused.

---

## Reviewer independence and scope

The reviewer did not author P3C06, the chapter, or the crosswalk. No subagents were spawned. No external web searches and no original-text reopenings were used (budget 0/4 queries, 0/8 inspections). Load-bearing claims are attributions to accepted ledger records; those records, their derived views, named task reports, frozen article paragraphs p-022–p-029, `work/G2/synthesis_constraints.json`, and `derived/gap_gate_register.json` were read as input verification. P3G1 has not allocated transferred P2R20 decisive-source reopenings. None were skipped. The first-cycle defects below are the historical record; they do not require an extension request.

## What was checked

Binding files read first: `AGENTS.md`, `prompts/chapter_reviewer.md`, P3R06/P3C06 contracts in `state/tasks.json`, `phase3/Thesis_Execution_Plan.md`, `phase3/pilot_calibration.md`, `state/acceptance_P3C02.json`, `state/acceptance_P3C03.json`.

`node scripts/thesis/build.cjs --check`: **pass** (197 paragraphs, 183 crosswalk entries, c06 `submitted`). `node scripts/derived/build.cjs --check`: **stale** on `derived/evidence/c06.md` and `derived/manifest.json` (pack header still says chapter status `skeleton`). Non-blocking. Contested wording was resolved with `node scripts/derived/lookup.cjs` against the derived index, not against the stale chapter-status header.

Frozen inputs compared against sampled prose: `derived/evidence/c06.md` (read in sections covering T04, T06–T09, T19, P2T09, P2T14–P2T19); `paper/paper.html` p-022–p-029; `work/G2/synthesis_constraints.json` (nine components; SC-G2-01–10); `derived/gap_gate_register.json` (12 gates, all `withheld`). SHA-256 values in `work/P3C06/result.json` were recomputed for the chapter and crosswalk; both match.

Crosswalk: 45 entries, 45 unique paragraph IDs, exactly one entry per paragraph, IDs c06-p001–c06-p045 matching the chapter. Ledger refs resolve (thesis `--check` pass). PREMISE labels follow the accepted convention (canonical-path locators inside the label string) for article-framing and method paragraphs.

No paragraph opens a GATE-T16-* conclusion. P2S01/P2S02 are unused. The four named dossiers, three prospective studies, historical corpus, asymmetry, dependence accounting and explicit non-conclusions match the P3C06 contract. Unit discipline on AWARE I 140/142/143, Dutch 344 people / 509 episodes, AWARE II 851 images / 85 subjects, 47% of EEG *data*, and the 28-interviewed / 2-with-EEG intersection is faithful. Neal date and interval variants, Alexander day-6/day-7 and GCS 11 versus 8, and the Greyson-four versus Parnia-zero OBE conflict are preserved, not harmonized. The twelve-case effective-trial denominator stays withheld.

Recurring defect class watched (from P3R02–P3R05): converting record-scoped attributions into flat assertions; version limits parked away from first use; homemade censuses; dropped decisive limitations; critic mechanisms upgraded to demonstrated causes. The chapter is often careful on those points. It still invents a hybrid Alexander webpage, mislabels the 1994 Addink interview as television, and applies T19’s two-dossier positive finding to Neal and Alexander.

## Verdict in one paragraph

The chapter is a competent expansion of article §5 and, in the prospective-denominator and contradiction-preservation stretches, tracks inspected versions with unusual care. It also fuses two distinct Alexander web sources into a nonexistent November-2011-labeled interview, calls the 1994 Addink interview a television interview although the record locates television captions on the 2008 Dutch reprint, and quotes CL-T19-021’s “two dossiers” finding as if it covered all four retrospective dossiers. Those are method defects, not style. They block acceptance.

---

## Material defects

### M1 — c06-p017 invents a hybrid Alexander webpage

Quoted chapter text:

> current webpages — an interview transcript with a November 2011 publication label and the author's current account page — none authenticated as original historical wording

Crosswalk maps both `CL-P2T15-001` and `CL-P2T15-002` (and names neither `S-P2T15-002`, `S-P2T15-003`, nor `S-T06-005`).

Lookup `CL-P2T15-001`: “Lam’s current report bears an October11,2011 publication label and April7,2014 update; its present wording is not an authenticated2011 snapshot.” Source: `S-P2T15-003`, a research-series webpage, not an interview transcript.

Lookup `CL-P2T15-002`: “The current Skeptiko154 transcript contains early-book planning and approximately100pages/two-month writing testimony; its November22,2011 date comes from archive search metadata.” Limitations: “No dated original draft, historical webpage or audio authentication.”

No inspected source is both an interview transcript and a page with a November 2011 *publication label*. The chapter fuses Lam’s “publication label” language (October) with Skeptiko’s interview genre and November archive-search date. The author’s current account page is `S-T06-005` / `CL-P2T15-026`; that source ID is not in the p017 refs.

Classification: **material** (invents a fact; misstates mapped records; version-limit first-use failure).

Required repair: Split the two webpages. Call Lam’s page a current report with an October 11, 2011 publication label and a 2014 update, not an authenticated 2011 snapshot. Call Skeptiko an interview transcript whose November 22, 2011 date is archive-search metadata, not a publication label. Map `S-P2T15-002`, `S-P2T15-003`, and `S-T06-005`. Keep “none authenticated as original historical wording.”

### M2 — c06-p025 labels the 1994 Addink interview as television

Quoted chapter text:

> through a February 1994 television interview with nurse TG (translated excerpts only; the full twelve-page transcript was never recovered)

Crosswalk: `CL-T19-004`, `CL-P2T17-001`, `S-T19-002`.

Lookup `CL-T19-004`: “Smit2008 traces the dentures narrative through a1991 Meijers article and a February1994 Addink interview with nurse TG.”

Lookup `CL-P2T17-001`: “Smit identifies Meijers 1991 and an Addink interview on February 2, 1994 (transcript dated February 3) as earlier documents. The selected 1991 original and full unpublished 12-page 1994 transcript have not been recovered here.”

Lookup `CL-P2T17-010` (used in c06-p026, not p025): “The drawer word occurs in the Dutch patient-attributed report as well as in a television caption.” Locator: “PDF5/reprint4, patient account and BBC caption” on the 2008 Rivas reprint (`S-P2T17-003`).

The 1994 document is the Addink interview. Television/BBC captions belong to the 2008 Dutch interview article. The chapter itself later places “the television caption the defenders blame” on that Dutch interview article (c06-p026). Calling the 1994 interview a television interview invents a source genre.

Classification: **material** (invents a fact; misattributes genre).

Required repair: “February 1994 Addink interview with nurse TG (Smit’s translated excerpts only; the full unpublished twelve-page transcript was never recovered).” Keep television captions with the 2008 Dutch reprint in c06-p026.

### M3 — c06-p011 applies T19’s two-dossier finding to all four dossiers

Quoted chapter text:

> the recorded cross-case inference for the retrospective dossiers states both directions: the inspected material supports specific, traceable perception claims and substantive disputes, but lacks independently fixed perception timing plus complete information-access controls needed to identify extracerebral acquisition

Crosswalk: `CL-T19-021`, `CL-P2T17-027`.

Lookup `CL-T19-021`: “The **two dossiers** support specific, traceable perception claims and substantive disputes…” Cases: `C-T19-001`, `C-T19-002` only (dentures and Reynolds). Supporting claims are surgical-tool / cart-shelf perception items, not Neal or Alexander.

`CL-P2T17-027` is dentures-only: a plausible ordinary account is not a demonstrated explanation; rejecting the metal-drawer mechanism does not establish extracerebral perception.

Neal’s own packet is weaker on the positive side. `A-P2T14-001`: “the experiential attribution is supported, its external accuracy is not thereby established.” Alexander’s `CL-P2T15-032`: “richer attributions” that “do not independently fix all recalled stages.” Neither packet states T19’s “specific, traceable perception claims.”

c06-p011 sits immediately before the four-dossier section. “The retrospective dossiers” reads as Neal, Alexander, Reynolds, and dentures. That upgrades Neal and Alexander to T19’s positive finding.

Classification: **material** (overreaches evidence; misattributes a scoped inference).

Required repair: Keep the T19 sentence for Reynolds and dentures, named as such. State Neal and Alexander from their own audit conclusions. The symmetry sentence (critic mechanisms also undemonstrated) may remain general if mapped to the per-dossier records, not to `CL-T19-021` alone.

---

## Minor defects

### N1 — c06-p004 drops Tasserie’s blinding/order limit

Quoted: high central-thalamic stimulation “raised the reported behavioral arousal score from 0 of 11 to 9 of 11 in both stimulated animals,” with listed qualifications that omit blinding.

Lookup `CL-T09-008` limitations: “Blinding and randomized condition order were not established in the inspected text.”

c06-p003 states the analogous Parvizi limit (“randomization and assessor masking were not established”). Tasserie does not.

Required repair: Add the blinding and condition-order limit at first use of the macaque arousal numbers.

### N2 — c06-p003 drops nonspecific nonface changes

Quoted: “the two stimulated regions were not separated, current can affect connected sites, the small famous-face and place naming tests differed procedurally and their null differences support no equivalence conclusion.”

`CL-T09-002`: “nonspecific nonface changes occurred, naming tests were small and procedurally different…”

Required repair: Restore nonspecific nonface changes alongside the naming-test limit.

### N3 — c06-p005 drops “open” (unblinded) assignment

Quoted: “39 underwent randomized propofol (19) or dexmedetomidine (20) anesthesia.”

`CL-T09-003`: “39 underwent randomized **open** propofol (19) or dexmedetomidine (20).”

Required repair: Restore “open.”

### N4 — c06-p026 drops the pre-Thumper / bystander-CPR limit

Quoted: TG “estimates more than five minutes of transport without cardiac massage — late estimates by the same witness.”

`CL-P2T17-014` limitations: “Ambulance/bystander resuscitation is not excluded; pre-Thumper does not mean no prior CPR.”

Required repair: Add that pre-Thumper transport is not a measured zero-CPR interval.

### N5 — c06-p038 drops the Charland delay dispersion

Quoted: “at a mean reporting delay of 24 years.”

`CL-T08-017`: “mean reporting interval24±15years.”

Required repair: “24 ± 15 years.”

### N6 — c06-p040 drops the Figure 1 legend-year mismatch

Quoted: “Its broader figure pools 429 retrospective and 47 prospective reports across published datasets including Greyson 1990.”

`CL-P2T18-026`: “the legend names Greyson 1990 and Parnia 2001. Its current-study legend says 2013 although this article was published in 2014.”

Required repair: Restore Parnia 2001 in the Figure 1 list and the 2013/2014 legend mismatch, with the recorded statement that it does not create a separate 2013 sample.

### N7 — c06-p041 upgrades macaque markers to “experience-related outcomes”

Quoted: “controlled stimulation provides positive evidence of neural influence on experience-related outcomes — content-specific in one human case, state-specific in two macaques.”

`CL-T09-009`: “subjective awareness was inferred from signatures.” c06-p009 is more careful (“arousal and access markers”). Article p-029 mentioned only the single-patient stimulation case.

Required repair: Keep “experience-related” for the human report contrast; call the macaque side arousal/access markers inferred from signatures.

### N8 — c06-p043 collapses distinct prospective samples into one Phase 2 group

Quoted: “The AWARE and Dutch reinspection material forms a single Phase 2 group across both studies and their correspondence.”

T07 kept separate sample groups (`C-T07-001`, `C-T07-002`, `C-T07-003`, `C-T07-004`). `DG-P2T09-AWARE-DUTCH-REINSPECTION` is the reinspection overlay, not one underlying sample. The chapter correctly refuses a pooled rate in c06-p034, so this is grouping language, not a computed double count.

Required repair: Name the study-level groups, then the P2T09 overlay as correspondence/reinspection dependence, not as one sample.

### N9 — c06-p044 maps Lam where the prose states uninspected AANS

Quoted: “the original 2011 Neal edition, the 2012 AANS Alexander text.”

Crosswalk includes `CL-P2T15-001` (Lam, October 2011), which does not mention AANS. The AANS gap is `S-P2T15-001` (`exact_original_inaccessible`) and `CL-P2T15-026`. The PREMISE access-gap list includes `C-T06-001`, whose access gaps do mention AANS2012, so the sentence is not unsupported — only the chosen CL is wrong.

Required repair: Map `S-P2T15-001` and/or `CL-P2T15-026`; do not use `CL-P2T15-001` for AANS.

### N10 — c06-p045 omits H-F from the nine-component list

Quoted: “No component of the fundamental-consciousness package — brain independence, survival beyond irreversible death, universal subjecthood, timelessness, preservation, intention, goodness, moral authority — receives support.”

That is eight names. `work/G2/synthesis_constraints.json` lists nine; mapped `CL-T09-020` includes “fundamentality.” The no-support claim is still true of H-F; the list is not the package.

Required repair: Name all nine, including conscious fundamentality (H-F), or drop the dash-list and say “none of the nine components.”

### N11 — c06-p031 treats 35–60 minutes as the late bound without the figure-bin limit

Quoted: “near-normal or physiological rhythms appeared as late as 35 to 60 minutes into resuscitation.”

`CL-T07-017` limitations: “Figure points/bins extend beyond the body timing summary; exact maximum unresolved.”

Required repair: Attribute 35–60 minutes as the authors’ body-text summary and keep the exact-maximum null.

### N12 — c06-p006 drops the DFC’s remaining posterior-connectivity failure

Quoted: “An exploratory amplitude-based dynamic functional connectivity analysis partly supported the workspace theory’s expectation; the record refuses to relabel it as preregistered confirmation.”

`CL-T09-014`: DFC “partly supported GNWT and still lacked sustained posterior connectivity.”

Required repair: Restore the failed sustained-posterior-connectivity remainder.

---

## Editorial notes (non-blocking)

- **E1 c06 heading “Limitations and access gaps.”** `phase3/pilot_calibration.md` reserves the `Limitations` heading for c11 and asks each findings chapter to close with an explicit cannot-conclude passage under its own heading. Accepted c02/c03 used dedicated cannot-conclude headings; c04/c05 folded the passage into the last section without using “Limitations.” Repair in revision if cheap: rename (e.g. “Access gaps and what this chapter cannot conclude”) or split a final heading for c06-p045.
- **E2 c06-p001** “the near-death and resuscitation material that dominates the popular case for survival” is unsourced framing (same class as the P3R02 note on “popular stratum”).
- **E3 c06-p012** “doctrinally relevant identification” glosses `CL-P2T14-026` (“the first edition did not clearly identify Jesus”). Prefer the record’s wording.
- **E4 c06-p030** “multi-center design” is true and thinner than `C-T07-002`’s 25-site phase.
- **E5 c06-p022** “the record’s best-developed critic-and-reply chain” is an internal ranking.

---

## Checks that passed (not defects)

- AWARE I: 2,060 events, 330 discharge survivors, 140 / 52+90=142 / later 143; 101 stage-two; 46 / 46 / 9 Greyson including two event-recall cases without shelves; author chart check and ~three-minute AED inference kept in distinct units (`CL-T07-001`–`004`, `CL-P2T09-007`–`010`).
- Dutch: 344 people, 509 episodes, 62 / 41, 18% / 12%; 248 (74%) denominator refused; 37/37 → 35/39 and 23 / 15; 2002 correction is one drug name (`CL-T07-005`–`007`, `CL-P2T09-018`, `CL-P2T09-019`, `CL-P2T09-021`).
- AWARE II: 567 / 213 / 53 / 28 / 11; 25 uninterviewed; 365 equipment ≠ delivery; 851 images / 85 subjects; 466 / 53; 49 oximetry; 47% of EEG data; exactly two of 28 interviewed had EEG, neither with explicit cognitive recall; 126 community arm selected (`CL-T07-011`–`020`, `CL-P2T09-011`–`017`).
- Parvizi 7 / 4 / 3 trials, one 45-year-old; 2013 correction is an author name (`CL-T09-001`, `S-T09-005`).
- Cogitate 256 (120 / 102 / 34) retaining 108 / 97 / 32; 73 / 65 held-out; iEEG unsplit; v4 file / Version 4.5 / 22 December 2022 internal identification (`CL-P2T19-001`); 110 versus 36/80 versus 35/73 (`CL-P2T19-003`).
- Neal accident date January 14 versus February 3, 1999; 11–14 versus 15 versus estimated 30 minutes; Willie 19 versus 20 (`CL-P2T14-008`, `CL-P2T14-028`).
- Alexander day-6 extubation / day-7 improvement versus day-7 awakening; GCS 11 versus 8 (`CL-P2T15-013`, `CL-P2T15-030`).
- Greyson four Parnia OBE cases versus Parnia’s explicit none; twelve-case denominator withheld (`CL-P2T18-021`, `CL-P2T18-033`).
- User-supplied transcripts audio-unverified (`S-T04-009`, `S-T06-001`); converted ebooks with postdated conversion metadata (`S-P2T14-009`, `S-T06-006`); Sabom 1998 chapter uninspected (`CL-P2T16-001`, `S-P2T16-001`); Noyes–Kletti body-uninspected (`CL-P2T18-008`); AWARE II supplement uninspected (`C-T07-002` access gaps).
- P2T17 reopened only Woerlee 2010 p.181; `S-T19-003` remains `inspected_original` with T19 locators pp. 181–191; `CL-P2T17-019` limitations keep CL-T19-006 / CL-T19-010 as historical attributions. c06-p044 states this correctly.
- c06-p041–p045 do not support any fundamental-consciousness component and do not open GATE-T16-01–12. c06-p045’s non-conclusion list is otherwise aligned with the withheld gates (H-F omission is N10, not a smuggled conclusion).
- Successful Test webpage: `S-P2T16-005` access_status `uninspected_stopped_route`; `CL-P2T16-026` “title supplies no outcome.” No stronger status exists.

---

## Uncertainty adjudications

- **U1.** PREMISE locators for article-framing and method paragraphs follow the accepted c02–c05 convention and suffice. Not a defect. p044’s Lam/AANS mapping error is N9, not a PREMISE-convention failure.
- **U2.** Confirmed. `S-P2T16-005` is `uninspected_stopped_route`; `CL-P2T16-026` says the title supplies no outcome. No stronger ledger status exists. c06-p024 is faithful.
- **U3.** Confirmed within packet limits. `CL-P2T19-001`: v4-named file, internally Version 4.5 dated 22 December 2022; OSF created 23 December 2022 is a separate metadata fact the chapter correctly does not treat as the internal date. `CL-P2T19-002`: the contrast with February 2023 half-split wording cannot date the change.

---

## Recommended next action (first cycle; superseded)

Author revision cycle 1 of 2: apply M1–M3; sweep N1–N12. Then the same reviewer context re-reviews. Overseer should `--sync-manifest` when accepting, because the derived layer is already stale on this submitted chapter.

**Superseded by re-review of revision 1:** overseer adjudication to accept P3C06 (revision 1) and P3R06. No remaining material defects. Revision cycle 2 unused. Sync derived manifest at acceptance.
