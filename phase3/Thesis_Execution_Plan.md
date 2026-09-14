# Phase 3 — Thesis programme through version 2 release

Created 13 September 2026 under [P2-AMEND-002](../phase2/amendments/002-thesis-rebase.md). This plan governs the expansion of the research article into a doctoral-thesis-style manuscript that completes the rebased Phase 2 synthesis. It is an execution plan, not a report of completed findings.

## Objective and completion

Deliver a reviewed, source-linked thesis whose chapters expand the ten article sections with the accepted evidence base (173 sources, 717 claims, 124 arguments, 23 case records and 80+ accepted task reports), discharge the rebased P2S03 synthesis contract, and give every one of the twelve withheld stronger-conclusion gates and thirty-five gap groups an explicit disposition. Completion means all Phase 3 assignments have an adjudicated outcome, the whole-thesis adversarial review and final adjudication (closing P2R20 and P2G2) are complete, and the thesis is released as a versioned artifact. Some gaps may remain unresolved after bounded work; that limits conclusions but need not prevent a complete, honest thesis. This plan does not promise proof, a worldview winner, or exhaustive literature coverage.

## Relation to Phase 2

- P2S03 is discharged through the thesis (marked `submitted` when the assembled draft exists; adjudicated at P3G2).
- P2R20's decisive-source obligations are split across chapter reviews (P3R01–P3R12) and the whole-thesis review (P3R20); its provisional 240-inspection budget (one recorded increase to 320) is allocated by P3G1's actual inventory.
- P3G2 executes P2G2. All G2 synthesis constraints, component boundaries and the eight sensitivity tests in `work/G2/synthesis_constraints.json` bind Phase 3 work unchanged.

## Team and models

| Role | Prompt | Allocation | Responsibility |
| --- | --- | --- | --- |
| Overseer | `prompts/overseer.md` | 1 | Contracts, scheduling, canonical records, adjudication, release |
| Thesis authors | `prompts/thesis_author.md` | Up to 2 | Chapter drafts from accepted ledgers; bounded gap packets |
| Chapter reviewers | `prompts/chapter_reviewer.md` | Up to 2 | Independent chapter review with decisive-source reopening |

Drafting and the cumulative chapter run on the long-form prose model configuration (Claude Fable in the owner's routing); reviews run in distinct reviewer contexts (Fable and Opus panels). Author and reviewer are always distinct and recorded in each contract. Project agent caps and no-worker-spawning rules are unchanged. Reused legacy prompts (`researcher.md`, `reviewer.md`) govern any P3T gap packets and their reviews.

## Deliverable format

The thesis lives in `thesis/`:

- `thesis/thesis.json` — build configuration: title, version, date, chapter order and structural roles.
- `thesis/chapters/NN-name.md` — one Markdown file per chapter with a YAML-style front-matter block (`chapter`, `title`, `status`, `inputs`). `status` is `skeleton`, `drafted`, `submitted`, `accepted`.
- `thesis/appendices/` — case evidence tables, alternatives matrix, gap/gate disposition register, dependence map.
- `thesis/crosswalk/<part>.json` — one crosswalk file per thesis part (`c04.json`, `apA.json`, …) mapping every paragraph ID in a `drafted`-or-later part to claim/argument/case/source record IDs (`CL-*`, `A-*`, `C-*`, `S-*`) or labeled premises (`PREMISE:*`). Authors edit only their own part's file; a drafted chapter with an unmapped paragraph fails the build.
- Paragraph IDs use the form `cNN-pNNN`, declared with an HTML comment `<!-- id: cNN-pNNN -->` on the line before the paragraph. Inserted paragraphs take new IDs; IDs are never renumbered.
- Citations use `[@S-...]` record references, resolved at build time against `records/sources.json`; the bibliography is generated, not hand-maintained.

`scripts/thesis/build.cjs` compiles chapters into per-chapter HTML and one stitched, self-contained thesis HTML conforming to the existing paper security and structure contract (required IDs, no scripts or external resources, print CSS). PDF generation is delegated to the existing pinned pipeline: `node scripts/paper/cli.cjs build --source .paper-build/thesis/thesis.html --out .paper-build/thesis/site --mode preview`. Release-critical renderer files (`scripts/paper/*.cjs`, lockfile, workflow) are not modified; the approved renderer hash is preserved. Thesis releases reuse the draft/reviewed release machinery in `docs/PAPER_RELEASE.md` with a distinct `thesis-v` tag namespace when the first thesis version is published; that wiring is a separate reviewed change at first release.

## Chapter tasks and inputs

Each chapter task P3Cnn has a paired independent review P3Rnn. Chapters draw on accepted records and reports; conversation history and unaccepted drafts are leads, not inputs.

| Task | Chapter file | Scope | Principal accepted inputs |
| --- | --- | --- | --- |
| P3C01 | `01-introduction.md` | Unification and its price; restricted-unification thesis | Article §1; T01 |
| P3C02 | `02-methodology.md` | Comparative method, evidence taxonomy, review protocol, dependence tracking | Article §2; T02; `work/G0/protocol_v1.md`; framework §§5–6 |
| P3C03 | `03-alternatives.md` | Six-family comparison as literature review | T03; T12; P2T01–P2T05 |
| P3C04 | `04-phenomenal.md` | Experiential primitiveness, illusionism, emergence, combination | Article §3; T05; P2T01, P2T03, P2T05 |
| P3C05 | `05-existence.md` | Sufficient reason, necessary foundation, fine-tuning | Article §4; T10; P2T10, P2T11 |
| P3C06 | `06-empirical.md` | Neural dependence; crisis-experience evidence with case dossiers | Article §5; T04, T06–T09, T19; P2T09, P2T14–P2T19 |
| P3C07 | `07-continuity.md` | Survival, timelessness, personal identity | Article §6; T11, T13; P2T12 |
| P3C08 | `08-meaning.md` | Endurance and finite meaning | Article §7 (first half); T14; P2T13 |
| P3C09 | `09-morality.md` | Moral authority, constructivism, realism, conscious grounding | Article §7 (second half); T15; P2T06, P2T07 |
| P3C10 | `10-goodness.md` | Evil, hiddenness, goodness as constraint | Article §8; T15; P2T08 |
| P3C11 | `11-cumulative.md` | Dependence map, sensitivity, holistic support; discharges S03 synthesis core | Article §9; T16–T18; P2S01/P2S02 submitted analyses (as rebased inputs, labeled) |
| P3C12 | `12-conclusion.md` | Restricted unification restated; nine-component confidence | Article §10; T17; G2 component requirements |

`00-front-matter.md` (title, abstract, disclosures) is overseer-maintained and is validated at build, not separately reviewed. P3C11 may use the submitted-but-unaccepted P2S01/P2S02 analyses only as explicitly labeled rebased inputs, never silently as accepted findings.

## Gap packets

When drafting exposes a decision-changing gap — a stronger intended conclusion blocked by a specific missing source or unresolved defect from the gap register — the overseer dispatches a bounded P3T packet under the Phase 2 packet rules: stable ID (P3T01, P3T02, …), exact selected originals, affected claim or bridge, withheld conclusion if access fails, budgets of 12 search queries and 8 source inspections, paired independent review, and the 2026-09-11 cutoff discipline for claims about the existing base with actual-dated logging for new searches. Persistent philosophical disagreement does not justify new packets; a concrete missing source or material defect does.

## Gates and reviews

| Task | Prerequisite | Deliverable |
| --- | --- | --- |
| P3R01–P3R12 | Paired chapter submitted | Independent chapter review: decisive originals reopened, crosswalk spot-checked, strongest countercase verified, accept/revise/unresolved |
| P3G1 | All chapters and gap packets adjudicated | Coverage decision; complete gap/gate disposition register; decisive-source inventory and review-budget allocation; frozen inputs for the whole-thesis review |
| P3R20 | P3G1 accepted; assembled thesis draft exists (P2S03 marked submitted) | Whole-thesis adversarial review: integration, cumulative sensitivity execution, circular bridges, cross-chapter double counting, withheld conclusions |
| P3G2 | P3R20 accepted | Final adjudication and versioned thesis release; closes P2R20 and P2G2 with recorded justification |

Chapter reviews take submitted drafts; a blocked chapter does not stop unrelated ready chapters. Two substantive revision cycles per task precede explicit adjudication, narrowing or a recorded scope amendment. No author approves their own output; disagreements are preserved.

## Budgets and stopping rules

Chapter drafting tasks start at 0 search queries — they write from accepted records. A chapter needing new evidence returns a gap-packet request instead of searching. Chapter reviews start at 4 queries and 8 inspections plus their P3G1-allocated decisive-source reopenings. Gap packets and their reviews use the Phase 2 packet budgets. The overseer may approve one bounded extension per task with a recorded reason. If decisive evidence is missing, return a partial draft and the specific missing item.

## Honesty constraints

- Distinguish reported experiences, observed events, philosophical premises and inferences; a verified report is not a verified event.
- Keep record reliability, inference strength and component confidence separate; no pooled posteriors without defensible likelihoods.
- Preserve event/sample/source dependence; repeated retellings are not independent cases.
- Every substantive conclusion traces to a reviewed record or a labeled premise via the crosswalk.
- Thesis publication does not assert external peer review or convert methodological acceptance into metaphysical truth.

## Final deliverables

- Assembled source-linked thesis (HTML and generated PDF) with generated bibliography and appendices.
- Complete gap/gate disposition register and updated dependence map, alternatives matrix and executed sensitivity results.
- Exact deltas from the 0.4.x article and the frozen v1 release, with retained disagreements.
- Whole-thesis adversarial review, final adjudication and release records closing P2R20/P2G2.
- Remaining questions clearly separated from completed assignments, with no unreviewed decisive claim promoted into the result.
