# P3RX remediation — revision packet (cycle 1)

Date: 2026-09-14. Author: Claude Fable (Cowork session), under the owner decisions in `decisions.md` (D1 records the owner's waiver of the distinct-author drafting rule for this cycle; independence sits in the Grok re-review). Voice: the saved `lennox-voice` skill. Source of findings: `work/P3RX_GROK_20260914/report.md` (Grok 4.6 cross-model review, 17 parts).

Status: submitted for Grok delta re-review (`delta_review/`). Nothing here is accepted by its author. No file under `records/`, `state/`, `derived/` or `STATUS.md` was changed.

## What was done

All 3 blocking and 29 major findings (packets R1 to R7 of the orchestrator's remediation plan) were applied, plus the two "plausible" findings in the narrowing direction (GRX-c05-002, GRX-apB-001) and three minor findings that sat inside edited sentences (GRX-integration-007, GRX-integration-008, GRX-apB-003). 48 text blocks changed across 14 parts (40 identified paragraphs, the rest Appendix A/B/C list rows); 36 crosswalk entries changed; two paragraphs added (apA-p025, apA-p026) so that the three Bede case records each have a table. Paragraph IDs were never renumbered or reordered. Every `[@S-...]` citation stayed in its paragraph; no em-dash was introduced; no number, date or record id was dropped (mechanical check over every before/after pair in `changes.json`).

`node scripts/thesis/build.cjs --check` passes on the revised tree: 467 paragraphs, 467 explicit ids, 467 crosswalk entries, 128 citations. The stitched HTML builds. Chapters 11 and 12 and Appendices A to D were set from `drafted` to `submitted`; chapters 1 to 10 remain `submitted` from the style pass; the front matter stays `drafted` (overseer-maintained).

## Finding by finding

Each line: finding, the text blocks that answer it, and what changed. Full before/after text is in `changes.json`; crosswalk before/after in `crosswalk_changes.json`.

- **GRX-integration-002** (c11-p032, c12-p002): Circularity of the thesis-level verdict. c11-p032 and c12-p002 now say what earns each half: the second half is traced to the chapter 3–10 records (A-P2T03-003, A-T10-003, A-T09-001/002, CL-T19-021, A-T13-005, CL-T13-015, A-T14-001/002, CL-T14-009, A-T15-001, CL-T15-019, A-T15-004, A-P2T08-001); the first half is stated as a conditional claim whose condition (correct identification of the explanatory demand) the identity and illusionist records contest (A-T05-001, CL-T05-001, CL-T05-003/004, A-T12-001, CL-P2T05-018). PREMISE:article:p-004 stays, relabeled as the source of the restated wording.
- **GRX-integration-005** (c00-p001, c11-p032, c12-p002): The first-half condition from c04-p004 is carried into the abstract (c00-p001) and the conclusion (c12-p002).
- **GRX-integration-001** (apC-p017, c01-p026, c01-p027, c02-p040, c03-p041): The false universal "every accepted chapter closes by stating that all twelve remain withheld" is made true rather than merely restricted: the twelve-gates sentence is added to the actual closing paragraphs of chapters 1, 2 and 3 (c01-p027, c02-p040, c03-p041), and c01-p026 and apC-p017 now state the inventory with the twelve closing paragraph ids in their crosswalks. No paragraph was reordered (decisions.md D6).
- **GRX-c01-001** (c01-p026, c01-p027, c02-p040, c03-p041): See GRX-integration-001.
- **GRX-apC-003** (apC-p017, c01-p026, c01-p027, c02-p040, c03-p041): See GRX-integration-001.
- **GRX-integration-008** (see cross-reference): c01-p026 crosswalk no longer calls chapters 11–12 skeletons.
- **GRX-apC-001** (apC row G1-GAP-05, apC row G2-GAP-09, apC-p008, c02-p017, c02-p039): c02-p017 is recast as the s3 recording rule and names the three permanent losses (lost T03 work, mixed pilot ranks, uncaptured T05 OR query) with the register's "permanent audit loss" wording; c02-p039 states the reconstruction limit beside the citation-pass exception; the G2-GAP-09 and G1-GAP-05 rows and apC-p008 now point at paragraphs that actually state the items.
- **GRX-c02-001** (c02-p017, c02-p039): See GRX-apC-001 (c02-p017 no longer asserts a completed census).
- **GRX-apC-002** (apC row G2-GAP-15, c11-p034): c11-p034 names the Asian historical, African, Melanesian, Indigenous and Muslim strata as never selected; the G2-GAP-15 row points there for the strata and at c06-p037/c06-p044 for the Japan/India limits.
- **GRX-apC-004** (apC row GATE-T16-12, apC-p017): GATE-T16-12 row cites c11-p032 (not c11-p033) for the historic-search withholding and c02-p017/c02-p039 alongside c02-p021.
- **GRX-integration-006** (apC row GATE-T16-01, apC row GATE-T16-07, apC-p004): GATE-T16-01 (and, for consistency, GATE-T16-07) rows state that G2-GAP-35 is proposed resolved at inspected scope and no longer blocks, while the remaining gaps still withhold the gate; apC-p004 says the same in prose.
- **GRX-apD-001** (apD-p005): apD-p005 assigns the four H-B support routes to the T16 clusters (AWARE DEP-G2-03; Reynolds DEP-G2-10; dentures DEP-G2-04 and DEP-G2-10; Alexander DEP-G2-02) and keeps Neal (DEP-G2-01) on none of them.
- **GRX-integration-003** (apD-p005): See GRX-apD-001.
- **GRX-apD-002** (apD-p002): apD-p002 says three premises (NECESSITY, UNITYNORM, AGENCY) are required inputs of no route and thirty-one are; AGENCY described per work/T17/report.md and cumulative_positive.added_commitments; A-T14-004 mapped.
- **GRX-c12-002** (c12-p024, c12-p026): c12-p024 drops "genuine result" and "on the record, is real"; finite significance is a labeled, contested conditional (CL-T14-009, A-T14-002). c12-p026 no longer lists it as a met empirical requirement.
- **GRX-c12-001** (c00-p001, c12-p026): c12-p026 closes with A-T09-001/CL-T09-019 wording (embodied neural contribution in the tested stimulation contexts) and A-T09-002's two-way boundary.
- **GRX-integration-007** (c00-p001): Abstract asymmetry sentence carries the same scoping.
- **GRX-integration-004** (c12-p008): c12-p008 calls study counts supported records of what each paper says and states the unresolved 140 / 52+90 / 142 / 143 conflict (CL-T07-001 mapped).
- **GRX-c12-003** (c12-p023): c12-p023 splits the list: philosophical originals clarify debates and supply no measurement; the Sabom, dentures, earliest Neal and Alexander documents bear on chronology and attribution per G2-GAP-33, G1-GAP-01-S2, G1-GAP-06-S2, without manufacturing private charts or timed exclusions (decisions.md D4).
- **GRX-c11-001** (c11-p010, c11-p036): c11-p010 credits the positive gap, named-case, prospective and order routes as evidence with limits, calls the identity, presence, evil/hiddenness and naturalist routes philosophical challenges, and restricts discriminating observations to the neural-intervention records; c11-p036 calls finite engagement an argument under a labeled premise.
- **GRX-c11-002** (apD-p015, c00-p001, c02-p037, c11-p001, c11-p012, c11-p021, c11-p031): Downgraded per decisions.md D3: c11-p012 and c11-p021 say the chapter restates the accepted T17 execution and re-reads it against chapters 3–10, and that P2S02 agreement is one reading reached twice; c11-p031 credits the asymmetry to the chapter records; c11-p001, c02-p037, apD-p015 and the abstract no longer say the chapter "executes" the tests.
- **GRX-c11-003** (c11-p014): c11-p014 withdraws Heim (S-P2T18-001, mapped) under the second design and keeps Southampton at its prospective denominator only.
- **GRX-c05-001** (c05-p028): c05-p028 restricts the likelihood-comparison sentence to the fine-tuning claims and states the PSR route as conditional deduction and the intelligibility route as conditional abduction (A-T10-003, A-T10-002 mapped).
- **GRX-c05-002** (c05-p025): c05-p025 drops the Sober clause (page-level reading unverifiable by anyone in the project); CL-P2T11-019 unmapped from that paragraph (it stays correctly stated at c05-p023).
- **GRX-c07-001** (c07-p020): c07-p020 attributes to Stump and Kretzmann only the 1981 not-eternal point (CL-P2T12-003 mapped) and labels the further-subjectivity and same-person requirements as the project's analysis (CL-P2T12-023).
- **GRX-c07-002** (c07-p023): c07-p023 restores CL-P2T12-025's scope: the selected exchange supports no family winner; no six-family ranking is completed.
- **GRX-c09-001** (c09-p001, c09-p027): c09-p027 and c09-p001 use H-A's wording (not automatically; not established as unique ground; no completed relation) and price Korsgaard's derivation as the constructivist remainder (A-P2T06-001 mapped).
- **GRX-c03-001** (c03-p031): c03-p031 discloses that the Monadology claims were inspected in the 1998 Francks and Woolhouse translation (pp. 268–270, 274–277, 279) carried under the S-T10-002 identity, and that the Bennett text was not reinspected for the mill argument; the ledger identity split is flagged for the overseer below.
- **GRX-c04-001** (c04-p005): c04-p005 states the three bridges as the T05 report records them (B-T05-M, B-T05-K additional for the knowledge argument, B-T05-E transparent derivability).
- **GRX-apA-001** (apA-p013 (+ new apA-p025, apA-p026), apA-p024): C-T08-001, C-T08-002 and C-T08-003 each get a table (apA-p013 rewritten for Dryhthelm; apA-p025, apA-p026 added), built only from records/cases.json fields; the twenty-three-table count in apA-p001/apA-p024 is now true.
- **GRX-apA-002** (apA-p023 row (denominators)): The DMT denominators row prints the ledger dose counts (7 mg: 3; 14 mg: 4; 18 mg: 1; 20 mg: 5) and keeps only the time-item counts and approached totals unknown.
- **GRX-apA-003** (apA-p024): apA-p024 keeps documented findings to counts, scores, associations, trial outcomes and unlinked EEG units, and leaves dependence, awareness and disconnection readings in the interpretation cell.
- **GRX-apB-001** (apB-p002, apB-p010): apB-p002 and apB-p010 label the printed cells frozen version 1 reconstructions not to be used to grade a family against chapter 3 (decisions.md D5).
- **GRX-apB-002** (apB-p002, apB-p008 row C5, apB-p010): apB-p002 states the accepted T18 correction (CF0 production, CF1 intentional production) and labels the descriptive-occurrence reading as P2S01, submitted not accepted; the theistic C5 cell is restored to the accepted T18 wording and apB-p002 says that one cell changed.
- **GRX-apB-003** (apB-p002): apB-p002 crosswalk premise no longer collapses the two CF0 readings.

## Verification before submission

1. Mechanical: for every before/after pair, identical citation set, no em-dash, no lost number token, no lost hedge term (may, conditional, contested, unresolved, withheld, not established, cannot, unknown, uninspected, submitted-not-accepted); every chapter's last paragraph contains the twelve-gates sentence; every new sentence under 45 words (inherited long sentences were split where the paragraph was touched).
2. Independent Claude-family verifier (adversarial, read-only) checked all changes against the findings' resolutions, the decisions, and the ledger records. It confirmed two must-fix problems, both fixed before this packet was closed: (a) c11-p010 had over-corrected into a new universal ("the one place in the map where a controlled measurement bears on a component"), false of RT-T16-B-PROSPECT's documented measurements; rewritten to "discriminating observations"; (b) the downgrade of the re-execution claim left c11-p001, c02-p037, apD-p015 and the abstract still saying the chapter "executes" the tests; all four aligned. It also raised eight judgment calls, all adopted: illusionism record CL-P2T05-018 mapped where "illusionist records contest" is said; three glosses in c11-p032 brought down to record wording ("supplies a phenomenal explanatory demand", "finite value supported under a labeled premise", "presupposes continued same-person life that it cannot itself supply"); GATE-T16-07 given the same G2-GAP-35 annotation as GATE-T16-01; c12-p023 premise extended to G1-GAP-01-S2 and G1-GAP-06-S2; apB-p010 notes the single C5 correction; c03-p031 page range corrected to 268–270, 274–277 and 279; c11-p034 crosswalk locator names the strata; apD-p002 says "sensitivity report" for T17. This verifier is same-family and approves nothing; the verdict re-review is Grok's.
3. `node scripts/thesis/build.cjs --check` and a full build pass.

## For the overseer (canonical follow-ups, not done here)

- Ledger identity: `S-T10-002` (Bennett Monadology modernization) carries CL-P2T04-011 to 013 whose locators are the 1998 Francks/Woolhouse translation (V-P2T04-004). Either add that version to S-T10-002 or give the 1998 Monadology its own source identity; chapter 3 now discloses the situation but cannot fix `records/`.
- `work/T17/*.json` still carry `draft_pending_R18` although records/decisions.json records G3 acceptance of T16–T18; chapter 12 calls the stage accepted on the decision record.
- Regenerate the derived layer (`node scripts/derived/build.cjs --sync-manifest`): evidence packs for c11/c12 are stubs and `derived/gap_gate_register.json` is stale on P2A01 dispositions, both noted by Grok as process defects.
- Record decisions.md D7 (crediting toward P3R11/P3R12 and the P3R01–P3R10 re-review; not P3R20) in `state/tasks.json` if adopted; update STATUS.md, which still calls chapters 11–12 skeletons.
- The 53 minor findings remain for a low-priority sweep after this cycle.

## Next step

Run the Grok delta re-review in `delta_review/` (one prompt per changed part; `run_delta.sh <part>`), file its findings, and adjudicate. If Grok accepts the deltas, this closes revision cycle 1 for c11, c12 and the appendices and the re-review of the rewritten chapters; then P3G1 on the remediated text, then P3R20.

## Hashes (SHA-256, before → after)

- `thesis/appendices/A-case-evidence-tables.md`: e44d7807c2554ba359e1424bb950a453a45f1c94c753b3cb1ab2e0c2f6867d5a → 4cd4b88ed90a2cb59c5544e80dcdc924532c4cbb292fac1b50d1d4d19a3763b8
- `thesis/appendices/B-alternatives-matrix.md`: 987668a64193ea6a2dbf4e2abe28a84eb82c0ba35210171ec0b4afc05e930093 → 41e74b70dd0a490b5b5dba2730c4d81fa522aa03427d7d3390fbb4c86ca5d5ba
- `thesis/appendices/C-gap-gate-disposition-register.md`: 0326983cce69f26ba6e017d5d2a5e5917a41a8d91ae22d0f8fffa898d24ade57 → c30154d31f6776790ddd6c1837d502db2a75e5b466f48fb27e6d2f7fd93a079e
- `thesis/appendices/D-dependence-map.md`: 69365446333a341d302bfcd0eb3d1f1ba759be83a0ba7791b82e7973421ce4cd → 0d59bf94f558c84e42eb3884c35845cd27bf7fc59eebd9487df821f8d7b82f67
- `thesis/chapters/00-front-matter.md`: 019a0165f6e58289982d5b48eb3ec52a5e14c0598e4dd036484e3f1d8a3a650a → c4a4e688851100ac7d151abf7f41ed27ac83ab80a5cc8e770432fe439bf28287
- `thesis/chapters/01-introduction.md`: 068e899ab0ede238fd2d9d4fc0c959d95055d161a8514c2baad500b21ab8300a → d798de3a69982f12119e3b08e4f1076fa7e01c026bbaa30700990869de751dc7
- `thesis/chapters/02-methodology.md`: c3711452b7e9cda998ff37a3c060a5703ed8a976976d93de17bc21e6f1ed7caa → 09274765756cbf07e076d6944ed6ce0c57cded4665d35ab8b15fb407fb7a428d
- `thesis/chapters/03-alternatives.md`: 6a6dd503508da06da84da3db822285b32983ad28cd2304576b4bd2cdb33ffc86 → 998b7534df64a1cded714a090ef202ed36ee36514b9b9b81529f4ce31c67ef78
- `thesis/chapters/04-phenomenal.md`: 192260f4dd84ad3b48f0221ee3bdca4e4832fac3e2e95ea6d66339c71daed3ba → c455747044e7d5948831cd7ce3fc7372f61e4e48a19e6ec069ddffdea44e12c2
- `thesis/chapters/05-existence.md`: 51463d51a986ea2fe83420a57805911431829bac553c7f95d3a4d37a7f63ed93 → ce24fc83444caf602d0d9b1357f64a8b9027f6ba58488b145fcd1c109d6a0462
- `thesis/chapters/07-continuity.md`: 682bdc2fe6a1a2d212fa7bf64b6833c9e897ddfd8da0bce74e1008f81739b4a5 → 79f69c88414a949a0b708133c0bb8269a7670e2859dae0d87c6f03d3b3391159
- `thesis/chapters/09-morality.md`: 050e77b9b1c45b91ab5d623910eada3baa63ffadce3f75a9e612e9f0c866f0a5 → 2c81ed300f84691d533bfc524f505e11b625cfd51bbca127cf357552180d1fcc
- `thesis/chapters/11-cumulative.md`: 135acd1e18e32887bd3a80b9235a497feda4965b16b680e2492a4c98079fcc69 → 99d2030fd987b18f42f832cdee1c0400c2ecd2b8fb99c64f9caad08f56018226
- `thesis/chapters/12-conclusion.md`: 357d1f18ac8055601ec14384490914acf7f179e9ebe363f82fde422bd2fc78f0 → 23a9cf91e4489d09c0ae577391d865e3a7417e00c3b8438f8c995540289f5a17
- `thesis/crosswalk/apA.json`: c66bf775e08acc98f14bbb4bdd512a8aea47a5350a58c0211d74c344bc1ff62b → 4f63f1c1ec3ffde51719f06c9e21cb5100c83d01da22f714b1007b15647fa249
- `thesis/crosswalk/apB.json`: 021fa6b705088b77d36b1ed871cd515d3e9dce0b26d8a6803277d4829051a9e3 → 916021488622fd4390a205f4ea3c100851edeedb4ed5ae3ddb2aad1027848e0d
- `thesis/crosswalk/apC.json`: 8fdb8585f3dc76f72a1b36b47f1f46017af9d64b924b98d5f0569b49a34db8e7 → aad90ac4c3ab827336e14ef27a5cbfd4f694b34b757f789319fb0b1ba00342a0
- `thesis/crosswalk/apD.json`: e808c34dfe1ff80f4f8dd3f5f1062106e4413796bd944e36ead8b31f6a8da8c4 → ad78ed4c697066e7bd132cd1be4274caa6d226663d5f43a63b8370e9e22c9837
- `thesis/crosswalk/c00.json`: d920872577956f47da917adc90adb0ed821b90cf92761069304a3fff6216d4ac → 667451d5e79d82ec24496aa84f47367ae5d03db4abb9c5b6808d4b4bf0067417
- `thesis/crosswalk/c01.json`: b927bbf8fe9a8c931b27ca36fc5feaf2c93d8618d68e3837ea1578ea5da6dd61 → de048c741e94256feb274b53e22301c4ae1d4a1268f99d027b8e69cc6ba1b204
- `thesis/crosswalk/c02.json`: 23ae5b1511a0b91805bfb97e8351cf32f0117e0eab927e18d159dad874fff472 → 3f92a57e6f21aee6b033b0382ca31baa2caf3273dcdc2db02f3431fea3b7e684
- `thesis/crosswalk/c03.json`: e57f5b2f13a8b846e5aeeef4e6e9e50c2f76cb0541ee2b6318e7a9e109f6b4d3 → 9ae73930cd35d3e5c72d99ee9c2842ee574755cd3816a303634dd1347f88e5ec
- `thesis/crosswalk/c04.json`: 3ccd303da3a9b7812106852bfdc8444ac571efbecfff57eec4ecc88a18a3d776 → 0ddddb7fdf8aef60633c1796bd381fe2795ff3e35714326fd4a0c0718df5ce03
- `thesis/crosswalk/c05.json`: 201f5c565e388fae644709785c914d94d30679334873ed8b5d7d042f3d461891 → e2f3025ffec66628aed66fa9b60a73ce6c7ce70ac9b67bac0ad3e13b461138c3
- `thesis/crosswalk/c07.json`: 0d0d06cfabeacf13c2ef7d089abd047782c77390dd92c5b103657f60a0bf9e3c → 953a6b0f9b8c43da7c2812d072e13d287ce6c2b3e31c5ef2e97ac14e8b6cb815
- `thesis/crosswalk/c09.json`: f3aa63d7c5bea5a7152223a0229bc9ca3e9ec78864ce02b01112aecf99e27c2f → 4b929144bda23a9323c3fa95bb339cf3543f5bf16561f2e54efe37ff17bbd484
- `thesis/crosswalk/c11.json`: ba50e0062cf18789327990b1deba5b5cb092b1a3125da8524e35430d52c326d8 → fb06bcf94f385b0f413a5c288dc60a4716be8d92cf47b06a2633498806245a97
- `thesis/crosswalk/c12.json`: 90448a1f14f3f2e71ea801f63a85a55d6b0665595bd8766c2eb6cd8f9a2f2514 → a89a8931310e958268c730e1f82d2e0e0c041e222aac09a6229c9915c6f0ada2

Unchanged: `thesis/chapters/06-empirical.md`, `thesis/chapters/08-meaning.md`, `thesis/chapters/10-goodness.md`, `thesis/crosswalk/c06.json`, `thesis/crosswalk/c08.json`, `thesis/crosswalk/c10.json`.
