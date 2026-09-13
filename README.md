# Consciousness and Existence Project

An open research project investigating consciousness, existence, personal identity, time, meaning, purpose and morality. It examines whether fundamental or enduring consciousness provides a warranted explanation, alongside physicalist, emergentist, dualist, panpsychist and idealist alternatives. The aim is a defensible assessment with explicit uncertainty.

**Current reviewed release: Version 1. Phase 2 is in progress (41 of 46 assignments accepted as of 13 September 2026).** Phase 2's cumulative synthesis and final independent review are unfinished. Acceptance refers to this project's review process, not journal peer review or proof that a hypothesis is true.

**Research article 0.4.0 — Consciousness, Existence, and the Grounds of Significance:** [start here](https://mnemeth1.github.io/Consciousness-Project/) to choose between the [plain-language overview](https://mnemeth1.github.io/Consciousness-Project/companion.html) and the [full research article](https://mnemeth1.github.io/Consciousness-Project/paper.html), [download the matching PDF](https://mnemeth1.github.io/Consciousness-Project/paper.pdf), or [view the versioned release](https://github.com/mnemeth1/Consciousness-Project/releases/tag/paper-v0.4.0). A complete philosophical manuscript based on the research available so far; later versions will refine arguments and supporting evidence. [Release procedure](docs/PAPER_RELEASE.md) · [Changelog](paper/CHANGELOG.md).

Start with the [executive summary](release/v1/Executive_Summary.md), [full synthesis](release/v1/Consciousness_and_Existence_Synthesis.md), and [open questions](release/v1/Open_Questions_and_Next_Research.md). The [source appendix](release/v1/source_appendix.md) supplies citations and locators. Read [STATUS.md](STATUS.md) for the current Phase 2 correction and remaining work.

The investigation separates nine questions: fundamentality, a universal conscious ground, brain independence, personal survival, timelessness, preservation, intention, goodness and moral authority. Evidence for one does not automatically establish the others. Reports of experiences, observed events, philosophical premises and project inferences are recorded separately. Shared sources and overlapping samples are tracked; source counts are not treated as independent evidence or probability estimates.

## What is included

- [Research plan](Research_Plan.md) and [execution framework](AI_Execution_Framework.md).
- [Version 1 reports and structured analyses](release/v1/) and [accepted task reports](REPORTS.md).
- [Evidence ledgers](records/README.md): 173 sources, 717 claims, 124 arguments and 23 case/study records, including accepted Phase 2 contributions.
- [Phase 2 plan](phase2/Phase_2_Execution_Plan.md), [task status snapshot](state/tasks.json), reusable [role prompts](prompts/) and [record templates](templates/).
- A standard-library Python validator for the public snapshot.

This repository is a curated research snapshot. Downloaded books, papers, transcripts, source screenshots, full-text extracts and private operational files are excluded. Relative references to omitted source files remain provenance locators; they are not download links. The current ledgers include Phase 2 findings that have not yet been integrated into a reviewed Version 2 synthesis. See [publication notes](PUBLICATION_NOTES.md) for scope and reproducibility limits.

## Check the public snapshot

With Python 3.10 or later installed:

```sh
git clone https://github.com/mnemeth1/Consciousness-Project.git
cd Consciousness-Project
python scripts/validate_public_snapshot.py
```

This checks file integrity, task dependencies, record references and publication boundaries. It does not verify the truth of claims, reopen original sources or rerun the unpublished Phase 2 sensitivity analysis. No paid service or package installation is needed for this check.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [START_HERE.md](START_HERE.md). Useful contributions include exact source corrections, stronger arguments and objections, dependence checks, and tests that could change a conclusion. Preserve disagreements and distinguish access to an abstract from inspection of a paper's relevant text. Disclose AI assistance and require a reviewer distinct from the author for research acceptance.

The repository retains its existing [Unlicense](LICENSE). It applies to project-owned contributions to the extent the contributors can grant those rights. Cited publications and any short attributed quotations retain their own rights; citation does not relicense them.
