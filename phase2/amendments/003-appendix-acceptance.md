# P2-AMEND-003: appendix acceptance path, front-matter rule and P3RX credit

14 September 2026. Overseer scope amendment authorized by the project owner (owner rulings recorded this date; adjudication in `state/adjudication_P3RX.json`). This amendment repairs a gap in the Phase 3 plan's acceptance machinery; it launches no research, accepts no evidence and closes no gate.

## The gap

`phase3/Thesis_Execution_Plan.md` names appendices A–D as deliverables but defines no task IDs, no paired reviews and no acceptance path for them, and they appear in no gate's dependency list. Likewise the front matter (`thesis/chapters/00-front-matter.md`) is declared overseer-maintained and build-validated rather than separately reviewed, yet nothing records how it reaches `accepted`. Both gaps would leave P3G1 unable to certify coverage over parts the thesis actually ships.

## What changes

1. **Appendix acceptance is added to P3G1's prerequisites.** P3G1's coverage decision must verify a recorded appendix acceptance (`state/acceptance_P3AP.json`) covering all four appendices, and must examine Appendix C's gap/gate disposition register in full as part of its own decision. No new task IDs are created; the appendices are accepted as parts, not tasks, and the register work they carry is adjudicated at the gates that own it.
2. **The P3RX reviews are credited as the appendix paired review.** Each appendix received the full adversarial protocol from a distinct-model reviewer (xAI Grok 4.6): initial verdict revise (apA 40, apB 64, apC 32, apD 40 record inspections), remediation under recorded owner decisions, delta re-review accept, and a clean cycle-2 re-review. This meets the plan's independence requirement — no author approved their own output — under the owner's recorded waiver D1 of the distinct-author drafting rule for the P3RX cycle.
3. **The front-matter rule is recorded.** `00-front-matter.md` is overseer-maintained and accepted by overseer decision, consistent with plan line "validated at build, not separately reviewed". Its acceptance and hashes are recorded in `state/adjudication_P3RX.json`. The P3RX delta re-review additionally reviewed it (accept, zero findings), which the record notes without making such review a standing requirement.
4. **P2S03 flips to `submitted`.** The assembled thesis draft now exists (all 17 parts written, reviewed and accepted), which is exactly the trigger P2-AMEND-002 §2 defined: the overseer marks P2S03 `submitted` with the assembled thesis as its artifact. It is adjudicated at P3G2, not before. The snapshot validator's hardcoded P2S03 `blocked` assertion is updated to `submitted` in the same change, superseding P2-AMEND-002 §4's "unchanged" note, which described the state before this trigger fired.

## What does not change

- All twelve withheld stronger-conclusion gates and thirty-five gap groups remain binding and receive explicit dispositions at P3G1. Nothing in this amendment closes any of them.
- P3R20 runs after P3G1 on frozen inputs; per the owner's D7 ruling the P3RX integration pass is not credited toward it.
- P2R20 and P2G2 close only through P3G2 with recorded justification.
- Acceptance remains methodological: fidelity and honest limits, not metaphysical truth or external peer review.
