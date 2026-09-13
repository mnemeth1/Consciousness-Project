# Paper release pipeline

The repository currently contains the v1 research snapshot. Installing this tooling does not release a v2 paper. With no `paper/paper.html`, CI reports **waiting** and creates no Pages artifact, tag, or release. The synthetic fixture is only a software test.

## One source, one paired release

The canonical paper is `paper/paper.html`, a self-contained UTF-8 HTML file. Chromium prints that exact file, and the renderer normalizes PDF dates and identity metadata. CI checks semantic text blocks, title/version/date, link annotations, outline, page numbers, and hashes. Every distinct internal target expected in `main#paper` must have a named PDF link annotation resolving to an actual page. This checks final print output, including print-media CSS; a missing second target fails even when another survives. Repeated occurrences and annotation geometry are not claimed equivalent and still need appropriate document review. It never consumes a prebuilt PDF.

Two optional reader-facing pages may accompany the paper, and must ship together or not at all: `paper/landing.html` (published as `index.html`, the site chooser) and `paper/companion.html` (the plain-language overview), bound by `paper/lay_crosswalk.json`. When present, the staged directory contains exactly `index.html` (byte copy of the landing page), `paper.html` (byte copy of the canonical paper), `companion.html`, `paper.pdf`, and `release.json`; the manifest and the release record bind `landing_html_sha256`, `companion_html_sha256`, and `crosswalk_sha256` alongside the paper hashes, and released versions are immutable across all five. Auxiliary pages pass the same security contract (no scripts, external resources, or non-HTTPS links), must state the paper version and date, and may only link artifact files. The crosswalk is validated at build time: every claim-bearing companion block (`lay-NNN`/`lay-vN` ids) must map to existing paper paragraph ids, so the companion cannot drift from the article it summarizes. Without those sources, the staged directory contains exactly `index.html` (byte copy of the paper), `paper.pdf`, and `release.json` as before. Only the paper is printed to PDF; the companion and landing pages have no generated PDF.

For paragraphs spanning pages, the verifier requires each exact generated trailing `Page N of M` footer, removes only that known printer text, then compares the uninterrupted semantic text. Substantive text is not discarded to make a comparison pass.

Install Node 24.19.0 and pnpm 11.19.0, then run:

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm exec playwright install chromium --only-shell
pnpm test
node scripts/paper/cli.cjs status
node scripts/paper/cli.cjs recipe
node scripts/paper/cli.cjs build --source paper/paper.html --out .paper-build/preview --mode preview
```

Use a fresh empty output directory for each build. A zero source commit marks a local preview; release mode requires the actual 40-character commit. Preview files must not be deployed. Optional local `PAPER_NODE_MODULES` and `PAPER_BROWSER_EXECUTABLE` overrides are recorded as local preview conditions and forbidden for release mode.

CI uses `mcr.microsoft.com/playwright:v1.62.1-noble`, Node 24.19.0, and the committed pnpm lockfile. Renderer/toolchain changes invalidate the approved renderer hash. Reproducibility means the same HTML, recipe, locked browser/packages, platform and fonts; it is not a claim of Windows/Linux byte identity. The image is version-pinned, not digest-pinned; any changed image output is rejected for an existing release version by the asset hash checks. A future image/package upgrade requires review and a new version when bytes or recipe change.

**Before merging a final release, inspect the PDF from the pull request's `paper-pair` artifact.** That is the actual pinned Linux rendering. Review all pages, citations, tables, mobile HTML and the download link. Local Windows preview checks do not replace this. PR artifacts have finite retention and are previews for review, not published versions. PRs have no write permissions and never upload a Pages artifact or publish a release.

## S03 draft and honest review status

S03 writes a draft with `paper-stage=draft` and visible `Draft: P2R20 and P2G2 pending`. It does not author an approval record. Required structure is specified in `docs/s03_integration_contract.json`.

## Explicitly authorized working-draft publication

The user has authorized publishing a Phase 2 working draft that can improve later. This separate path does not require or claim scientific acceptance. Use version **0.2.0** for the initial draft, with a title and h1 beginning `Phase 2 working draft`, and retain the pending-review stage/badge. Record actual omissions and unfinished work in the paper.

Root adds `paper/draft-release.json` with `schema: 1`, `status: "authorized-draft"`, matching `version`, `date`, `html_sha256`, `renderer_sha256`, `fixture: false`, `scientific_acceptance: false`, `pending_reviews: ["P2R20", "P2G2"]`, accountable `author`, `publication_authorized_by`, and the actual user `authorization` text. Add the exact version/date changelog heading and change notes. Do not create a scientific review record. Draft and reviewed release records cannot coexist.

This yields `draft-candidate`. PRs validate the authorization and build `mode=preview` artifacts with no write permissions. Main builds `mode=draft-release`, generates and verifies the fresh pair, then publishes a conspicuously labelled GitHub **prerelease** and deploys the pair to Pages. This draft path does not require a preapproved Linux PDF hash or a scientific-review loop. Root inspects the actual Linux output and live artifacts after execution. Ordinary drafts without authorization stay previews. A changed version's HTML, PDF, renderer or authorization hash cannot overwrite its existing assets; later improvements use a new documented version.

After substantive review, root may mechanically change the status metadata and visible badge to `reviewed` / `Reviewed research synthesis`. That exact change requires a recorded before/after HTML hash, a precise change summary, and approval by the distinct reviewer. Both final public review summaries and the release record bind the final HTML hash. Any substantive change requires renewed scientific review; a status change cannot silently alter claims. Render and inspect the final presentation again. The release record is an auditable gate assertion controlled by the reviewers and repository protections, not automated proof that a review happened.

## Review record and versions

Only after actual P2R20 acceptance recommendation and P2G2 acceptance, root adds `paper/reviewed-release.json`, `paper/reviews/P2R20.json`, `paper/reviews/P2G2.json`, and `paper/CHANGELOG.md`. Do not copy a test record as an actual approval. The fields enforced by `validateReview` are:

- `schema: 1`, `status: "approved"`, `fixture: false`, stable semantic `version` and ISO `date` matching HTML.
- `html_sha256`, exact reviewed Linux `pdf_sha256`, and `renderer_sha256` (the latter printed by the recipe command). Build the final presentation on a PR in preview mode before adding the approval record, inspect that artifact, then bind its PDF hash. The final candidate/main render must match it exactly.
- Accountable `author`, distinct `reviewer`, `adjudicator`, actual `reviewed_at` timestamp.
- `review_id: "P2R20"`, `review_verdict: "accept"`, `gate_id: "P2G2"`, `gate_status: "accepted"`.
- `presentation.scientifically_reviewed_html_sha256` and `presentation.published_html_sha256`. If different, require `change_kind: "presentation-only"`, `approved_by` equal to the reviewer, and an exact `change_summary`.
- Exactly two `records`, each with `id`, fixed path `paper/reviews/P2R20.json` or `paper/reviews/P2G2.json`, and `sha256` of that sanitized public record. Each record contains `id`, `version`, `html_sha256`, `status` (`accept` or `accepted` respectively), and a readable summary retaining release conditions and scope.

The changelog must have one heading `## VERSION - YYYY-MM-DD` followed by actual release notes. Use major versions for changed scope or substantial interpretive revision, minor versions for added reviewed analysis, and patch versions for corrections or presentation changes. Any changed HTML bytes, PDF bytes, renderer hash or review-record hash requires a new documented version after release. The policy is deliberately stricter than trying to guess whether an edit is substantive.

For a new revision, remove the old approval record from the working PR, set the HTML stage/badge back to pending, and choose the new version. That gives reviewers a fresh preview artifact. A stale approval record deliberately fails validation instead of certifying the changed source. Add the new final-presentation approval record only after its actual review and Linux PDF inspection.

An unchanged later main commit may rerun the pipeline. If all release identity/content hashes match, it preserves the original release manifest and original tag commit. It does not replace assets or rewrite provenance. The current run must still match main. Older versions cannot displace a newer paper.

## Release and Pages workflow

The read-only build job runs on all PRs and main pushes, including renderer changes. Unauthorised drafts generate preview artifacts only. Validated reviewed or explicitly authorized draft candidates on main proceed to a job with only `contents: write`. This first creates an unpublished GitHub Release named `paper-vVERSION`, uploads and downloads all three assets to verify hashes, then publishes the complete release. Working drafts use `prerelease: true` and do not claim final review. It never uses an overwrite/clobber operation. Interrupted upload drafts with a manifest can resume after verifying existing bytes; an empty/inconsistent draft or orphan tag stops for inspection instead of guessing.

The release job uploads only the verified three-file directory using the official Pages artifact action. The deployment job has `pages: write`, `id-token: write`, and read-only contents for a main-head check. It depends on the release job and deploys one artifact containing both HTML and PDF. Main runs are serialized. A newer main commit aborts a stale run at the release/deploy guards; GitHub's deployment service is still an external system, so the final live verification remains required.

`GITHUB_TOKEN` is the only credential. Do not add a PAT. All checkouts disable persisted credentials. There is no `pull_request_target`, privileged PR workflow, shared privileged dependency cache, or publication from a fork. Protect main and require review for `paper/**`, renderer files, lockfile and this workflow; review-file syntax alone is not an authorization boundary against a maintainer changing the checks.

Pages must use **GitHub Actions** as its source, with HTTPS enabled and the `github-pages` environment restricted to main. Root reports those Pages settings are already configured. Verify branch protections and allowed action policy before integration. After actual release, verify the live HTML, PDF and `release.json` hashes against the tagged release. The project paper is provisional research, not an externally peer-reviewed journal publication.

## Public snapshot boundaries and integration

Copy only the proposed source files, never `node_modules`, `.paper-build`, browser caches, QA outputs, downloaded originals or private audit inputs. Regenerate `PUBLICATION_MANIFEST.json` using the existing publication workflow after integrating code. The snapshot validator proposal only excludes dependency/build directories; it retains **all current v1 and blocked Phase 2 checks** and all third-party PDF bans for the pipeline-only commit.

The repository continues to reject every PDF; generated PDFs remain build artifacts. The separate three-file artifact validator permits exactly the generated `paper.pdf` tied to its HTML and explicit draft-authorization or final-review manifest. This is the sole PDF publication exception. Run `python scripts/validate_paper_artifact.py .paper-build/site` if an additional standard-library artifact check is useful. Never broadly permit `.pdf` in the snapshot export.

When P2G2 actually releases v2, root must make a separate reviewed update to the snapshot validator's current-status assertions and public entrypoints. Bind them to the actual accepted S03/R20/G2 state; do not simply delete current checks in advance. Refresh the publication inventory at that transition. The Pages paper deployment is not a substitute for canonical research acceptance.

The workflow follows [GitHub's custom Pages workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [GitHub's release API](https://docs.github.com/en/rest/releases/releases), and [Playwright's PDF printing API](https://playwright.dev/docs/api/class-page#page-pdf). Dependency/browser version matching follows [Playwright's container documentation](https://playwright.dev/docs/docker).
