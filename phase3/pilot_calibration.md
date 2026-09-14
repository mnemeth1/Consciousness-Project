# Phase 3 pilot calibration — conventions from P3C02/P3R02

Recorded 2026-09-13 by the overseer after the methodology-chapter pilot (drafted, reviewed with one revision cycle, accepted; `state/acceptance_P3C02.json`). These conventions bind subsequent Phase 3 chapter and review tasks unless a recorded amendment changes them.

## Chapter shape

- The methods pilot settled at 41 paragraphs (about 5,000 words) for a full expansion of one article section. Findings chapters should land in the 30–55 paragraph range; length follows the evidence pack, not a quota.
- Section headings follow the skeleton's planned sections; the reserved `Limitations` heading belongs to the discussion chapter (c11) only. Each chapter closes with an explicit what-this-chapter-cannot-conclude passage under its own heading.
- Paragraph IDs `cNN-pNNN` are never renumbered; insertions during revision take the next free ID regardless of position (pilot precedent: c02-p041 inserted between p039 and p040).

## Crosswalk conventions

- Methods-chapter paragraphs map to `PREMISE:method:<label>` refs with canonical-path locators inside the label string (frozen per P3R02 U1).
- Findings chapters (c03–c10) must map paragraphs to ledger record IDs (`CL-*`, `A-*`, `C-*`, `S-*`) wherever the paragraph rests on evidence; `PREMISE:<label>` is reserved for genuinely philosophical or normative premises and for thesis-structural statements. A findings paragraph mapped only to premises must actually contain no evidence claim.
- One crosswalk entry per paragraph; multiple refs per entry are expected in findings chapters.

## Review workflow

- Author: Fable context, drafting from `derived/evidence/<part>.md` and the frozen contract inputs, zero searches. Reviewer: distinct Grok 4.6 xhigh context per owner routing decision (2026-09-13); resume the same reviewer context for revision re-review so cycle continuity is preserved.
- Expect a `revise` verdict on first submission; the contract's two revision cycles are the working budget, not a failure signal.
- Recurring defect class from the pilot, to be avoided at drafting time: converting protocol prescriptions into a history of compliance. State rules as rules; disclose recorded non-executions and exceptions alongside the rule they qualify; quote prespecified test and constraint wordings exactly (SENS-G2-05's bridge is "endurance-required-for-value"); scope and date any mutable count; attribute register fields only where the register actually carries them.

## Overseer acceptance checklist (run at every chapter acceptance)

1. Chapter front matter `status` and `state/tasks.json` statuses (chapter task and paired review) updated.
2. `state/acceptance_P3Cnn.json` written with artifact hashes, review history, and non-blocking notes preserved.
3. `state/public_status.json` phase3 counters (`accepted_tasks`, `chapters_drafted`) and STATUS.md prose updated together — the export validator enforces consistency.
4. New packet files added to `PUBLICATION_MANIFEST.json` via `refresh_public_manifest.cjs --add` and force-tracked in git (`git add -f`; `/work/` and `/state/*` are locally excluded).
5. `node scripts/derived/build.cjs --sync-manifest`, thesis `--check`, then `node scripts/export_public_snapshot.cjs` must all pass before commit.
6. Non-blocking editorial notes from reviews accumulate in the acceptance records for a single pre-P3G1 consistency pass; accepted text is not edited outside a review cycle.
