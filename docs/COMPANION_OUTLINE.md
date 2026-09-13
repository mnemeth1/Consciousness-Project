# Companion page outline

A locked skeleton for a future plain-language companion to the research article. It fixes structure, principles and sync policy in advance so the companion can be written quickly once the main article stabilizes. **This outline contains no claims.** All verdicts, summaries and analogies are written later, from the paper version current at writing time, and must not assert anything the paper does not.

## Trigger for writing the companion

Prose is written only when one of these holds:

1. The paper passes P2R20 review and P2G2 adjudication and its badge changes to reviewed; or
2. The maintainer declares an expansion milestone complete: every evidence category intended for the paper is represented in a published version.

Until then this outline is the only companion artifact.

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

## Sync policy

- The companion is a distinct page, not part of the versioned paper pair. It states plainly which paper version it describes.
- A `lay_crosswalk.json` maps every companion claim to the paper paragraph IDs (`p-001` style) it summarizes. A future CI check verifies each referenced ID still exists and flags companion sections whose underlying paragraphs changed since the described version.
- Cadence: the companion is rewritten for major paper versions, reviewed for minor versions, and left unchanged for patch versions. If it lags, its version notice must say so; a stale companion that admits staleness is acceptable, a silently wrong one is not.

## Rule for paper expansion (applies now)

While the main article grows, existing paragraph IDs and section anchors are never renumbered or reused; new content receives new IDs. This keeps every future crosswalk entry stable against past versions.
