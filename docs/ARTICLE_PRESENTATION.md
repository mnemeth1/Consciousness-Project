# Research article presentation, version 0.3.0

Use an ordinary scholarly title, identical in `<title>` and `h1#paper-title`. Add `<meta name="paper-presentation" content="research-article">` and display `Research article` in `#publication-status`. Keep `<meta name="paper-stage" content="draft">` internally. The scholarly title/badge must not contain project gate codes or the earlier working-draft prefix.

The explicit `paper/draft-release.json` authorization must also contain `"presentation": "research-article"`. Keep `status: authorized-draft`, `scientific_acceptance: false`, and `pending_reviews: ["P2R20", "P2G2"]` in the release records. Match version **0.3.0**, date, HTML hash, updated renderer hash and changelog. No scientific approval is created by a presentation choice.

The artifact manifest carries `presentation` at its top level and in draft provenance. GitHub retains prerelease status and may name the release `Research article 0.3.0`; its body identifies a versioned manuscript, pending internal review records and no claim of external peer review. The page can read as a scholarly article while those workflow facts remain accurate in release records.

Omitting this optional presentation preserves the existing working-draft title/badge. Final reviewed-release checks, explicit authorization, fixture exclusion, HTML/PDF/version/hash guards and immutable released versions remain in force. A presentation change uses a new version. The Node24 Pages workflow and renderer dependency versions are unchanged.
