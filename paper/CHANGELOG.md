# Paper versions

## 0.4.0 - 2026-09-13

Adds a public landing page and a plain-language companion overview, published together with the article as one versioned artifact. The site root becomes a reader chooser; the research article moves to `paper.html` with an unchanged argument (version metadata only). The companion summarizes the article for general readers and is bound to it by a build-validated crosswalk (`paper/lay_crosswalk.json`) mapping every companion claim block to the article paragraphs it summarizes. The release pipeline, artifact validators and release records now bind the landing, companion and crosswalk hashes alongside the existing HTML/PDF pair.

Article content is unchanged from 0.3.0 apart from the version number. Pending-review status (P2R20/P2G2) and the absence of external peer review remain recorded and visible on all pages.

## 0.3.0 - 2026-09-13

Replaces the project-status summary with a complete philosophical article, **Consciousness, Existence, and the Grounds of Significance**. Develops a connected argument about experiential explanation, neural constraints, survival and timelessness, meaning and moral authority, and evil and hiddenness. Adds direct literature citations and a focused source crosswalk. HTML and PDF are generated and released together.

This is a versioned scholarly manuscript for criticism and further refinement. Publication does not assert external peer review or completion of the project's outstanding final source review and adjudication (P2R20/P2G2). Those workflow facts remain in release records rather than the article's argument.

## 0.2.0 - 2026-09-13

First public Phase 2 working draft. Summarizes the current comparative analysis and corrected source-eligibility sensitivity work. Adds matching generated HTML/PDF publication and an immutable GitHub prerelease. Final synthesis, independent final source review and release adjudication remain pending; all twelve stronger-conclusion gates remain withheld. This is not the completed or externally peer-reviewed Phase 2 paper.

Future releases must use a new version and describe changes. CI rebuilds the PDF from the exact HTML and deploys the pair together. See ../docs/PAPER_RELEASE.md for draft and reviewed release procedures.
