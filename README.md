# Consciousness and Existence Project

An open research project investigating consciousness, existence, personal identity, time, meaning, purpose and morality. It examines whether fundamental or enduring consciousness provides a warranted explanation, alongside physicalist, emergentist, dualist, panpsychist and idealist alternatives. The aim is a defensible assessment with explicit uncertainty.

**Current public manuscript: the working draft in `paper/`, published with the released thesis.** Phase 2 is complete within project procedure (46 of 46 assignments accepted; the synthesis, final review and release gate closed through the Phase 3 thesis gates on 15 September 2026). Acceptance refers to this project's review process, not journal peer review or proof that a hypothesis is true. The former Version 1 synthesis files have been retired; they were a historical internal-review snapshot, not this paper's working draft.

**Research article 0.4.8 and thesis 1.0.3 — Consciousness, Existence, and the Grounds of Significance:** [start here](https://mnemeth1.github.io/Consciousness-Project/) to choose between the [plain-language overview](https://mnemeth1.github.io/Consciousness-Project/companion.html), the [full research article](https://mnemeth1.github.io/Consciousness-Project/paper.html), the [released thesis](https://mnemeth1.github.io/Consciousness-Project/thesis.html), [download the matching article PDF](https://mnemeth1.github.io/Consciousness-Project/paper.pdf), or [view the versioned releases](https://github.com/mnemeth1/Consciousness-Project/releases) (article and thesis, with PDFs). The article is a working-draft philosophical manuscript; the thesis is its released, source-linked expansion, accepted within project procedure and not externally peer reviewed. [Release procedure](docs/PAPER_RELEASE.md) · [Changelog](paper/CHANGELOG.md).

Start with the [research article](paper/paper.html) and [plain-language companion](paper/companion.html). Read [STATUS.md](STATUS.md) for the current publication scope and the remaining post-release maintenance.

The investigation separates nine questions: fundamentality, a universal conscious ground, brain independence, personal survival, timelessness, preservation, intention, goodness and moral authority. Evidence for one does not automatically establish the others. Reports of experiences, observed events, philosophical premises and project inferences are recorded separately. Shared sources and overlapping samples are tracked; source counts are not treated as independent evidence or probability estimates.

## What is included

- [Research plan](Research_Plan.md) and [execution framework](AI_Execution_Framework.md).
- [Accepted task reports](REPORTS.md).
- [Evidence ledgers](records/README.md): 173 sources, 717 claims, 124 arguments and 23 case/study records, including accepted Phase 2 contributions.
- [Phase 2 plan](phase2/Phase_2_Execution_Plan.md), [task status snapshot](state/tasks.json), reusable [role prompts](prompts/) and [record templates](templates/).
- [Phase 3 thesis programme](phase3/Thesis_Execution_Plan.md): the doctoral-thesis-style expansion of the article, released as thesis-v1.0.3 with all chapters and appendices accepted; sources in [thesis/](thesis/README.md), the published page at [paper/thesis.html](paper/thesis.html), gate records in `state/acceptance_P3G1.json`, `state/acceptance_P3R20.json` and `state/acceptance_P3G2.json`.
- Generated agent-access views in `derived/` — compact record indexes, per-task shards, per-chapter evidence packs and the unified [gap/gate register](derived/gap_gate_register.json) — regenerated deterministically from the ledgers by `scripts/derived/build.cjs` and kept in lockstep with them by validation.
- A standard-library Node.js validator for the public snapshot.

This repository is a curated research snapshot. Downloaded books, papers, transcripts, source screenshots, full-text extracts and private operational files are excluded. Relative references to omitted source files remain provenance locators; they are not download links. The ledgers include the accepted Phase 2 findings; the thesis integrates them, and the article remains an authorized working draft that does not. See [publication notes](PUBLICATION_NOTES.md) for scope and reproducibility limits.

## Check the public snapshot

With Node.js 20 or later installed:

```sh
git clone https://github.com/mnemeth1/Consciousness-Project.git
cd Consciousness-Project
node scripts/validate_public_snapshot.cjs
```

This checks file integrity, task dependencies, record references, status-page consistency with `state/*.json`, publication boundaries and that the derived views in `derived/` exactly match the current ledgers. It does not verify the truth of claims, reopen original sources or rerun the unpublished Phase 2 sensitivity analysis. No paid service or package installation is needed for this check. Continuous integration runs the same validation on every push and pull request.

Maintainers publish from a verified export, never directly from the mixed private/public working tree: `node scripts/export_public_snapshot.cjs` materializes exactly the manifest-allowlisted files into `.public-export/` with per-file hash verification, then runs this validator inside the export. `scripts/refresh_public_manifest.cjs` is the only sanctioned way to change the allowlist (explicit `--add`/`--remove`, never filesystem discovery). After canonical evidence changes, `node scripts/derived/build.cjs --sync-manifest` regenerates the derived views and updates their manifest entries in one step; its mechanical adds and removes are restricted to `derived/` paths.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [START_HERE.md](START_HERE.md). Useful contributions include exact source corrections, stronger arguments and objections, dependence checks, and tests that could change a conclusion. Preserve disagreements and distinguish access to an abstract from inspection of a paper's relevant text. Disclose AI assistance and require a reviewer distinct from the author for research acceptance.

The repository retains its existing [Unlicense](LICENSE). It applies to project-owned contributions to the extent the contributors can grant those rights. Cited publications and any short attributed quotations retain their own rights; citation does not relicense them.
