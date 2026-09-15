# Paper versions

## 0.4.5 - 2026-09-15

Ships the released thesis (thesis-v1.0.0) on the site: all Phase 3 gates are closed with recorded decisions (P3G1 coverage, P3R20 whole-thesis adversarial review, P3G2 final adjudication), and P2R20/P2G2 close through them, so release records stop listing those reviews as pending. Three bounded P3R20 corrections are included (apD-p015 PSR clause per T17-06A, c11-p016 per T17-04, c06-p028 AWARE II citation to S-T07-007). The article argument is unchanged; the article remains an authorized working draft with scientific acceptance false, and all twelve withheld stronger-conclusion gates remain withheld.

## 0.4.4 - 2026-09-14

Republishes the thesis working draft in full: the complete abstract (the published page previously carried the pre-draft "abstract pending" placeholder frozen at 0.4.2), chapters 1–12 and appendices A–D, all internally accepted after the owner-adjudicated P3RX cross-model review (state/adjudication_P3RX.json). The thesis page banner now reports acceptance state accurately. The article argument is unchanged apart from version metadata. Coverage gate P3G1, whole-thesis review P3R20 and release adjudication P3G2 remain open; pending-review status (P2R20/P2G2) remains recorded in release records.

## 0.4.3 - 2026-09-14

Renderer determinism fix only; article, companion, landing and thesis content are unchanged apart from version metadata. The PDF renderer now strips the Chromium structure tree completely (outline /SE references removed and unreachable objects swept) so repeated renders of identical HTML produce identical PDF bytes. A new version is required because release assets are immutable and the renderer hash changed. Pending-review status (P2R20/P2G2) remains recorded in release records.

## 0.4.2 - 2026-09-14

Adds an incomplete thesis working draft (`thesis.html`) to the public site and a landing-page link to it. Chapters 1–10 of the thesis expansion are included as internally accepted text; front matter, chapters 11–12 and appendices A–D remain labeled skeletons. No thesis PDF is published. The article argument is unchanged apart from version/date metadata and a navigation link. Pending-review status (P2R20/P2G2) remains recorded in release records.

## 0.4.1 - 2026-09-13

Adds companion-style top navigation on the research article page: start page, plain-language overview, and PDF download. The article argument is unchanged. Pending-review status (P2R20/P2G2) remains recorded in release records.

## 0.4.0 - 2026-09-13

Adds a public landing page and a plain-language companion overview, published together with the article as one versioned artifact. The site root becomes a reader chooser; the research article moves to `paper.html` with an unchanged argument (version metadata only). The companion summarizes the article for general readers and is bound to it by a build-validated crosswalk (`paper/lay_crosswalk.json`) mapping every companion claim block to the article paragraphs it summarizes. The release pipeline, artifact validators and release records now bind the landing, companion and crosswalk hashes alongside the existing HTML/PDF pair.

Article content is unchanged from 0.3.0 apart from the version number. Pending-review status (P2R20/P2G2) and the absence of external peer review remain recorded and visible on all pages.

## 0.3.0 - 2026-09-13

Replaces the project-status summary with a complete philosophical article, **Consciousness, Existence, and the Grounds of Significance**. Develops a connected argument about experiential explanation, neural constraints, survival and timelessness, meaning and moral authority, and evil and hiddenness. Adds direct literature citations and a focused source crosswalk. HTML and PDF are generated and released together.

This is a versioned scholarly manuscript for criticism and further refinement. Publication does not assert external peer review or completion of the project's outstanding final source review and adjudication (P2R20/P2G2). Those workflow facts remain in release records rather than the article's argument.

## 0.2.0 - 2026-09-13

First public Phase 2 working draft. Summarizes the current comparative analysis and corrected source-eligibility sensitivity work. Adds matching generated HTML/PDF publication and an immutable GitHub prerelease. Final synthesis, independent final source review and release adjudication remain pending; all twelve stronger-conclusion gates remain withheld. This is not the completed or externally peer-reviewed Phase 2 paper.

Future releases must use a new version and describe changes. CI rebuilds the PDF from the exact HTML and deploys the pair together. See ../docs/PAPER_RELEASE.md for draft and reviewed release procedures.
