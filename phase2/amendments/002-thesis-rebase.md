# P2-AMEND-002: thesis programme rebase of the Phase 2 synthesis

13 September 2026. Overseer scope amendment authorized by the project owner: the publication deliverable expands from the compact research article into a doctoral-thesis-style manuscript, and the paused Phase 2 synthesis is completed through that manuscript. This amendment records the scope decision; it launches no research, accepts no evidence and closes no gate.

## What changes

1. **Phase 3 is created.** `phase3/Thesis_Execution_Plan.md` defines the thesis programme: chapter tasks P3C01–P3C12, paired chapter reviews P3R01–P3R12, bounded gap packets P3T*, coverage gate P3G1, whole-thesis adversarial review P3R20 and release gate P3G2. Chapters are authored in `thesis/` as Markdown and compiled by `scripts/thesis/build.cjs`.
2. **P2S03 is rebased, not waived.** P2S03 was blocked awaiting corrected S02 inputs and an explicit frozen-input rebase. That rebase is executed through Phase 3: each chapter contract freezes its exact accepted-ledger versions and the corrected S02 outputs at dispatch. The thesis cumulative chapter (P3C11) together with the assembled thesis discharges the S03 deliverables — source-linked synthesis, strongest case and countercase, conclusion crosswalk and open questions. P2S03 remains `blocked` in `state/tasks.json` until the assembled thesis draft actually exists; at that point the overseer marks it `submitted` with the thesis as its artifact. No status changes now.
3. **P2R20's obligations transfer without weakening.** The single final adversarial review is replaced by two layers: an independent review per chapter (P3R01–P3R12, distinct author and reviewer, decisive originals reopened) and a whole-thesis adversarial review (P3R20) checking integration, cumulative sensitivity execution, circular bridges and cross-chapter double counting. The provisional 240-inspection final-review budget (one recorded increase to 320 permitted) is allocated across the chapter reviews by P3G1's actual decisive-source inventory. P2R20 is closed only by an explicit overseer adjudication that the two layers jointly satisfy its contract; no decisive source is silently skipped and no numerical cap waives reopening a decisive source.
4. **P2G2 remains the final gate.** P3G2 executes P2G2's adjudication obligation at thesis scope. Closing P3G2 with acceptance closes P2G2; neither closes without the other. Until then, the public status assertions (P2S03 blocked, P2R20/P2G2 pending) remain accurate and the snapshot validator's current-status checks are unchanged.

## What does not change

- All twelve withheld stronger-conclusion gates and all thirty-five historical gap groups remain binding. Each must receive an explicit disposition in the thesis gap/gate register (`thesis/appendices/C-gap-gate-disposition-register.md`): resolved by cited reviewed evidence, addressed by a bounded new P3T packet, or stated as a standing limitation in the relevant chapter. Nothing closes silently or by boilerplate caveat.
- G2 synthesis constraints (SC-G2-01 through SC-G2-10), the nine-component boundaries and the eight required sensitivity tests in `work/G2/synthesis_constraints.json` bind every thesis chapter and the cumulative chapter exactly as they bound P2S01–S03.
- The frozen 2026-09-11 literature cutoff governs claims about the existing evidence base. New P3T packet searches log their actual dates; later publications remain separately identified leads requiring a dated supplement before use.
- Version 1 remains a frozen historical release. The research article (`paper/paper.html`, 0.4.x) remains published and frozen; the thesis is a new versioned artifact with its own release records.
- Acceptance remains methodological. No gate requires a particular metaphysical answer, and thesis publication asserts no external peer review.

## Roles and model allocation

Thesis drafting and the cumulative chapter run on the long-form prose configuration (Claude Fable in the owner's model routing); chapter and whole-thesis reviews use distinct reviewer contexts (Fable and Opus review panels per the owner's routing configuration). Author and reviewer are always distinct contexts and are recorded in each task contract. The existing agent caps (seven including overseer, or the lower host limit; depth two; no worker spawning) are unchanged.

## Records

- New role prompts: `prompts/thesis_author.md`, `prompts/chapter_reviewer.md`.
- New task graph entries: P3 tasks appended to `state/tasks.json`; P2 entries byte-preserved.
- The thesis source-crosswalk convention and build validation are specified in `phase3/Thesis_Execution_Plan.md` and `thesis/README.md`.

Research scope, source budgets, independent-review requirements and stronger-conclusion gates are otherwise unchanged. Exact source choices remain dispatch work; unresolved access and philosophical gaps remain research outcomes, not reasons to rewrite this plan.
