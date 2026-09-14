---
name: lennox-voice
description: Rewrite or draft Consciousness Project thesis chapters in John Lennox's plain, persuasive prose (minimal em-dashes) while preserving paragraph IDs, crosswalks, citations and every hedge.
---

# Lennox voice for the thesis

Use this skill whenever you draft or rewrite a chapter or appendix in `thesis/` for the Consciousness Project, or when Michael asks for prose in "Lennox's style". The goal is the manner of John Lennox's writing (God's Undertaker, Can Science Explain Everything?, his op-eds): plain, confident, fair to opponents, built on distinctions and homely analogies, with a human voice and almost no em-dashes. The goal is not his conclusions. The thesis argues for restricted unification and withheld gates; the prose must persuade the reader that those careful verdicts are right, never nudge toward theism or naturalism.

## What the Lennox voice sounds like

These features come from his published prose (the Henry Ford essay, the Galileo chapter, the Higgs boson op-ed):

- One idea per sentence. Medium sentences (18 to 24 words on average) with a short one dropped in for emphasis: "Relevant to what?" "Natural shenanigans?" "Simply this: God created it, Higgs predicted it and Cern found it."
- The argument advances by distinctions stated crisply: how versus why, mechanism versus agency, law versus lawgiver. In this thesis the equivalents are report versus event, dependence versus identity, preservation versus survival, production versus intended production, coherence versus actuality.
- Everyday analogies do the explaining: a Ford engine with no Mr Ford inside, Aunt Matilda's cake analysed by chemists, particles of paint and the Sistine ceiling. One analogy per point, developed for two or three sentences, then dropped.
- Opponents are quoted in their own words, at length, and then answered on exactly those words: "What does Krauss mean by 'more relevant than God'? Relevant to what?"
- Concessions are made plainly and early: "There is, of course, no excuse whatsoever for...", "it must be said", "rightly celebrated". Fairness is part of the persuasion.
- Rhetorical questions open sections and drive the reader forward, and each is answered within a paragraph or two.
- Colons deliver the point: "The issue at stake was clear: ..." Commas and full stops carry the rest. Em-dashes are rare (none in the Ford essay). Parentheses are for dates and brief asides.
- Connectives are plain: However, Furthermore, Indeed, Yet, Clearly, Surely, Of course, In reality, For instance, In other words, The point is this, Notice what has happened, Let me put it another way, It should also be noted.
- First person is natural: "we" for shared reasoning, "I" for a stance ("I want to suggest", "let me emphasise"), "you" only inside a question.
- Light wit and understatement, never sarcasm: "a classic case of shooting oneself in the foot", "in a delightful irony".
- Paragraphs of three to seven sentences. The first sentence says what the paragraph is for; the last sentence lands it.

## Hard rules that never bend

The thesis is a reviewed, source-linked document. Style changes nothing about its evidence.

1. Keep every `<!-- id: cNN-pNNN -->` marker and keep exactly one paragraph under each. Never split, merge, reorder or renumber paragraphs; the crosswalk in `thesis/crosswalk/<part>.json` maps each ID to records and must stay valid. A new chapter takes new IDs in sequence.
2. Keep every `[@S-...]` citation in the paragraph where it stands. Keep every record ID, number, date, name, version note, page range and quoted term exactly.
3. Keep every hedge, boundary and non-conclusion. Restate them in plainer words; never drop, soften or strengthen one. "may" stays "may"; "conditionally" stays conditional; "attribution, not premise truth" survives in some form. Every chapter still ends by saying what it cannot conclude and that all twelve withheld stronger-conclusion gates remain withheld.
4. Add no claims. No new facts, anecdotes, quotations, statistics, case details or literature. An analogy is allowed only when it is transparently illustrative, asserts nothing about the world or the literature, and smuggles no verdict (a kettle, a recipe, a car engine: yes; "like a ghost story" or "like a miracle": no).
5. Terms of art keep their meaning: established, supported, contested, unresolved, challenged, inspected, attributed, withheld, dependence group, component labels H-F through H-A, gate IDs. Explain a term in plain words on first use in a chapter; do not replace it.
6. Build constraints: no raw HTML or Markdown tables; `##` and `###` headings only; lists with `- `; exactly one `Limitations` heading in the whole thesis (chapter 11). American spelling, as in the existing chapters.
7. Persuade toward the thesis's actual verdicts (the asymmetries, restricted unification, the withheld gates). Do not optimize for agreement with anyone, and do not let Lennox's apologetic conclusions leak in.

## Punctuation and rhythm budget

- Em-dashes: at most one per 1,000 words in a chapter, never two in one sentence, never as an appositive chain. No spaced hyphens used as dashes. Replace with a comma, a colon, a parenthesis, or a new sentence.
- Semicolons: occasional; at most about one per paragraph on average.
- Sentence length: no sentence over 45 words unless it is a quotation; most paragraphs contain at least one sentence under ten words.
- Rhetorical questions: one to three per section, each answered.
- Nominalizations and abstract noun stacks ("the inference from record to component passes through stated bridge premises") become verbs with agents ("a record only supports a component through premises we have to state and defend").

## Fable-isms to remove on sight

- Em-dash interruptions and appositive chains ("X — Y — Z").
- "The record marks / prices / preserves / holds / retains / refuses ..." used as a tic. Say who did what: "the reviewers recorded", "the ledger records", "the reply concedes", or simply state the qualification as its own sentence. Keep the phrase only where the reader needs provenance.
- Formula endings: "What this chapter cannot conclude, it now states." Write instead: "Let me be clear about what this chapter has not shown."
- Fragment openers: "Not explanatory superiority: ..." Write full sentences.
- The reflexive contrast tic ("not X but Y", "X, not Y") on every sentence. Keep it where the contrast is the point.
- "inherited", "load-bearing", "exactly", "precisely", "on the record as inspected", "the recorded upshot", "and says so" as habitual fillers.
- Sentences with three or more nested qualifications. Give each qualification its own sentence.
- Colon-driven lists of parallel abstractions. Turn them into a short sequence: "First... Second... Third..." or plain sentences.

## The Lennox turn (how to argue a point)

1. State the opposing view in its strongest form, in its own words where the ledger has them.
2. Concede what is right in it, plainly.
3. Draw the distinction that dissolves the confusion.
4. Illustrate once if an everyday picture makes the distinction obvious.
5. Land the point in one short sentence.

## Worked example

Before (c01-p007, original):

> The proposal's danger is an illicit economy. One may purchase several conclusions for the price of a single primitive by changing what the primitive means along the way. Consciousness first means the qualitative character neglected by a structural description; it later means a unified subject, then a necessary agent, and finally a good authority that preserves persons. The word remains constant while the commitment grows. The article's own verdict is measured — each transition may be defensible — and its diagnosis is that this is a progression: each step adds content the starting point did not contain.

After (same ID, same content, Lennox voice):

> Here is the danger. The proposal offers several conclusions for the price of one primitive, and it can only do so by quietly changing what that primitive means along the way. At the start, "consciousness" names the qualitative character that a purely structural description leaves out. A few steps later it names a unified subject. Then it names a necessary agent. Finally it names a good authority who preserves persons. The word never changes; the commitment grows at every step. The article is careful about this, and so is this thesis: each transition may be defensible. But notice what has happened. This is a progression, not an unpacking, and each step adds content that the starting point did not contain.

Every claim, hedge and term survives. The em-dashes are gone, the sentences are shorter, and the paragraph ends on its point.

## Procedure for rewriting an existing chapter

1. Read the chapter, its crosswalk file and `state/acceptance_P3Cnn.json` (reviewer notes tell you which sentences are fragile).
2. Rewrite paragraph by paragraph under the existing IDs. Reword headings freely except `Limitations`.
3. After each paragraph, check the original against the rewrite: every citation, number, name, hedge and non-conclusion present? If a qualification would not fit, give it its own sentence rather than dropping it.
4. Mechanical checks: `grep -o '—' <file> | wc -l` (within budget), scan for sentences over 45 words, then `node scripts/thesis/build.cjs --check` must pass.
5. Procedure: a rewritten accepted chapter is a new revision, not an accepted one. Set `status: submitted` (or as the overseer's style amendment directs), record the style pass with new SHA-256 hashes in `work/P3Cnn/report.md`, and route it to re-review (P3Rnn) or the pre-P3G1 consistency pass. Never mark your own rewrite accepted.
6. New chapters and appendices (c11, c12, A to D) are drafted in this voice from the first sentence.

## Self-check before you stop

- Would an intelligent non-specialist follow every paragraph on one reading?
- Does every paragraph open on its point and close on its point?
- Did you state the opponent's best case before answering it, and concede what was right?
- Is there at least one plain, short sentence in most paragraphs, and no run-on over 45 words?
- Em-dash count within budget? Any "the record marks" tics left?
- Did any hedge, boundary, citation or number vanish? If so, put it back.
- Does the chapter still say what it cannot conclude and that all twelve gates remain withheld?
