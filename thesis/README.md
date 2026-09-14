# Thesis working directory

Phase 3 authoring space for the doctoral-thesis-style expansion of the research article, governed by [phase3/Thesis_Execution_Plan.md](../phase3/Thesis_Execution_Plan.md) and [P2-AMEND-002](../phase2/amendments/002-thesis-rebase.md). Everything here is working-draft material until the Phase 3 gates close; nothing in this directory asserts scientific acceptance or external peer review.

## Layout

- `thesis.json` — build configuration: title, version, date, chapter order and structural roles.
- `chapters/NN-name.md` — one chapter per file. Chapter 00 is overseer-maintained front matter.
- `appendices/` — case evidence tables, alternatives matrix, gap/gate disposition register, dependence map.
- `crosswalk/<part>.json` — paragraph-to-record mapping, one file per thesis part (see below).
- `evidence_map.json` — curated mapping from thesis parts to evidence-ledger task prefixes; consumed by the derived evidence layer (see Evidence retrieval below).

## Chapter file conventions

Each chapter starts with a front-matter block:

```
---
chapter: 4
title: What Experiential Primitiveness Explains
status: skeleton
inputs:
  - work/T05/report.md
  - work/P2T01/report.md
---
```

`status` is one of `skeleton`, `drafted`, `submitted`, `accepted`. Task status in `state/tasks.json` remains canonical; this field controls build strictness.

- Paragraph IDs: declare `<!-- id: cNN-pNNN -->` on the line before a paragraph (`c04-p012` is chapter 4, paragraph 12). Inserted paragraphs take new IDs; never renumber existing IDs.
- Citations: reference source records inline as `[@S-T03-001]`; the build resolves them against `records/sources.json` and generates the bibliography. An unknown source ID fails the build.
- Headings: use `##` for sections and `###` for subsections. The build renders the chapter title as the section heading; do not add a top-level `#` heading in the body.

## Crosswalk

Each thesis part has its own crosswalk file, named by its paragraph prefix: `crosswalk/c04.json` for chapter 4, `crosswalk/apA.json` for Appendix A. A chapter author edits only their own part's file; the build rejects stray files, missing files and entries whose paragraph IDs belong to another part.

In any chapter with status `drafted` or later, every paragraph must carry an explicit ID and appear in its part's crosswalk file, mapped to record IDs (`CL-*`, `A-*`, `C-*`, `S-*`) or labeled premises (`PREMISE:<label>`). Skeleton chapters are exempt. This enforces the project rule that every substantive conclusion traces to a reviewed record or an explicitly identified philosophical premise.

## Building

```sh
node scripts/thesis/build.cjs            # validate and compile to .paper-build/thesis/
node scripts/thesis/build.cjs --check    # validate only, no output
```

The build writes per-chapter HTML and a stitched, self-contained `thesis.html` conforming to the paper security contract. For a PDF preview, run the existing pinned renderer against the stitched file:

```sh
node scripts/paper/cli.cjs build --source .paper-build/thesis/thesis.html --out .paper-build/thesis/site --mode preview
```

Build outputs live under `.paper-build/` and are never committed. Release wiring for the thesis is a separate reviewed change at first publication.

## Evidence retrieval

Chapter authors and reviewers work from the generated derived layer instead of reading whole ledger files:

```sh
node scripts/derived/build.cjs --check      # confirm derived/ matches the current ledgers
node scripts/derived/lookup.cjs CL-T05-001  # one record with resolved cross-references
```

- `derived/evidence/<part>.md` — the evidence pack for one thesis part: every mapped argument, claim, case and source in full, from `evidence_map.json` and the chapter front matter.
- `derived/index/*.jsonl` — one compact line per record, for keyword search across the ledgers.
- `derived/by_task/<TASK>.json` — full records grouped by task prefix.
- `derived/gap_gate_register.json` — the 35 gap groups and 12 withheld stronger-conclusion gates unified with closure conditions (Appendix C's working input).

Derived files are regenerable, non-canonical conveniences (`node scripts/derived/build.cjs`); crosswalk entries and citations must reference canonical ledger IDs only.

## Review workflow

Chapters are drafted under P3C tasks, reviewed under paired P3R tasks by a distinct reviewer, and accepted only by the overseer. Decision-changing evidence gaps become bounded P3T packets rather than in-chapter searches. See the Phase 3 plan for budgets, gates and the gap/gate disposition rules.
