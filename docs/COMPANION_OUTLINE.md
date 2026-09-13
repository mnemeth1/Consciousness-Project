# Companion page outline

The design record for the plain-language companion to the research article. **Status: implemented as of paper version 0.4.0** — `paper/companion.html` (overview), `paper/landing.html` (site chooser) and `paper/lay_crosswalk.json` ship inside the versioned release artifact. The maintainer chose to write the companion early as a full process dry run while the main article continues to expand; each article expansion updates the companion in the same version.

## Purpose and principles

- Audience: a general reader with no philosophy background; roughly magazine reading level.
- Length target: 800–1200 words plus one diagram and one table.
- Lead with the reader's questions, not the thesis. Candidate openers: Does your brain create your mind? Do near-death experiences prove an afterlife? Does anything matter if we die?
- Preserve the paper's calibration. Convert it to plain verdict language (well-supported / still an open puzzle / possible but unproven), never to yes/no answers the paper does not give.
- The draft or reviewed status badge and the absence of external peer review stay visible on the companion.
- One analogy per hard idea, each checked against the paper's actual argument before use.
- The companion summarizes; it never introduces evidence, sources or conclusions absent from the paper.

## Fixed structure

1. **The questions** — three to five lay questions the article answers, each with a one-paragraph plain answer and a link to the relevant paper section.
2. **The ladder diagram** — one figure showing the argument ladder: experience is real and puzzling → consciousness as fundamental → one universal mind → an intending agent → personal survival → cosmic purpose and moral authority. Visual encoding marks where evidence is stronger (lower rungs) and where each higher rung adds commitments the evidence does not yet support.
3. **The verdict table** — one row per component assessed by the paper (fundamentality, universal dependence, brain independence, survival, timelessness, preservation, intention, goodness, moral authority), with a plain-language verdict phrase per row. Cell contents are written at writing time from the then-current paper.
4. **What would change the picture** — a short plain restatement of the paper's discriminating-evidence section.
5. **How to read the full article** — links to the HTML, the PDF and the changelog, with a one-line description of each section.

## Section mapping

One companion paragraph per paper section, in paper order, keyed to the paper's stable section anchors (`#phenomenal`, `#existence`, `#empirical`, `#continuity`, `#value`, `#goodness`, `#discussion`, `#conclusion`). A paper section without a companion paragraph, or the reverse, is a sync defect.

## Sync policy (as implemented)

- The companion publishes inside the same versioned artifact as the paper, so they are synced by construction: one version, one release, no independent drift. Its `#version-notice` states the described version and date, which the build requires to match the paper exactly.
- `paper/lay_crosswalk.json` maps every claim-bearing companion block (`lay-NNN` and `lay-vN` ids) to the paper paragraph IDs (`p-001` style) it summarizes. The build fails if a mapped ID is missing on either side, if any claim block lacks an entry, or if the crosswalk names a different paper version.
- Cadence: every paper version that changes argument content must revisit the companion in the same change; the build's crosswalk check catches removed or renamed paragraphs but not silently changed meaning, so the companion text is reviewed whenever mapped paragraphs are edited.

## Rule for paper expansion (applies now)

While the main article grows, existing paragraph IDs and section anchors are never renumbered or reused; new content receives new IDs. This keeps every future crosswalk entry stable against past versions.
