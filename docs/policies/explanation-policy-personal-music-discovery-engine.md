# Explanation Policy — Personal Music Discovery Engine

## 1. Document Purpose

This document defines the **Explanation Policy** for the Personal Music Discovery Engine.

It describes how the system should turn:

- interpreted user intent,
- outside-world evidence,
- local grounding results,
- and ranking rationale fragments

into **user-facing explanations** that are:

- helpful,
- concise,
- confidence-aware,
- curator-like,
- and faithful to actual upstream evidence.

This document is intended to sit alongside:

- high-level requirements,
- stage-by-stage data contracts,
- logical component architecture,
- query execution sequence diagrams,
- provider caching & persistence model,
- ranking policy,
- and provider failure / graceful degradation behavior.

---

## 2. Role of the Explanation Layer

The explanation layer exists to answer the user’s implicit question:

> “Why did you recommend these particular items from my own collection?”

It is not responsible for:

- deciding what the music request means,
- retrieving world knowledge,
- grounding against the local collection,
- or ranking candidates.

Those responsibilities belong to other stages of the system.

The explanation layer is responsible for:

1. presenting the final recommendation set in understandable language,
2. exposing the dominant reasoning pattern,
3. preserving trust by avoiding unsupported claims,
4. making confidence visible without being clumsy,
5. and encouraging useful follow-up refinement.

---

## 3. Architectural Context

The current architecture assumes:

1. **Gemini 2.5 Pro** via the **Gemini Developer API free tier** is used for:
   - intent interpretation,
   - explanation generation,
   - and optionally light summarization.

2. **Outside-world retrieval** is performed through dedicated adapters for:
   - MusicBrainz,
   - Last.fm,
   - Discogs.

3. **Local collection grounding** is performed against the **Clementine-backed local inventory**.

4. The **Ranking Engine** emits:
   - score breakdown,
   - confidence band,
   - and rationale fragments suitable for explanation.

Because explanation is generated through Gemini on the free tier, the system should:
- centralize explanation generation through the Gemini Gateway,
- minimize unnecessary raw local-data exposure,
- cache explanation payloads when appropriate,
- and support degraded explanation modes if Gemini is unavailable.

---

## 4. Explanation Design Principles

### 4.1 Faithfulness Over Fluency

The system must prefer an explanation that is slightly plainer but true over one that is elegant but unsupported.

### 4.2 Explain What the System Actually Knows

The explanation layer may summarize, reorder, and phrase evidence naturally.
It must not invent:
- unsupported tags,
- unsupported stylistic claims,
- imaginary lyrical or emotional knowledge,
- or false precision.

### 4.3 Keep the User in the Loop

The explanation should help the user understand:
- why these recommendations surfaced,
- and what kind of refinement would change the result set.

### 4.4 Sound Like a Knowledgeable Curator, Not a Debugger

The explanation should feel like an informed music guide, not a diagnostic dump.
However, confidence and uncertainty must still be visible.

### 4.5 Confidence Must Be Honest

If the recommendation is a semantic substitute rather than an exact match, the explanation should not imply exact certainty.

### 4.6 Local Ownership Must Stay Visible

The explanation should reinforce that the results are drawn from the user’s own collection, not recommended from the internet at large.

---

## 5. Explanation Inputs

The explanation layer should consume only structured upstream outputs.

## 5.1 Required inputs

1. **Intent Profile**
2. **Recommendation Set**
3. **Evidence Links**
4. **Confidence Band** per recommendation
5. **Rationale Fragments** emitted by the ranking engine

## 5.2 Optional inputs

- clarification context
- session modifiers
- cached prior explanation payloads
- local metadata details useful for display only

## 5.3 Prohibited input behavior

The explanation layer should not make independent external provider calls.
It should not retrieve fresh world evidence on its own.

---

## 6. Explanation Output Contract

The explanation layer produces an **Explanation Payload**.

### Required fields
- explanation ID
- recommendation set ID
- overall summary
- per-recommendation explanations
- optional follow-up suggestions

### Optional fields
- tone variant
- clarification hint
- degraded-explanation indicator

---

## 7. Allowed Evidence Sources for Explanations

The explanation layer may use only the following evidence categories.

## 7.1 Intent-derived evidence

Allowed examples:
- the request emphasized quiet / nocturnal / melancholic qualities
- the request suggested literary or urban melancholy
- the request excluded dramatic or loud results

## 7.2 World-evidence-derived evidence

Allowed examples:
- multiple providers supported this artist cluster
- the matched world graph repeatedly surfaced related nocturnal / melancholic styles
- this artist or album was central in the world candidate graph

## 7.3 Local-grounding-derived evidence

Allowed examples:
- this is an exact local match
- this appears to be a strong local equivalent
- this is a semantic substitute rather than the exact surfaced reference

## 7.4 Ranking-derived evidence

Allowed examples:
- strong fit to the interpreted mood
- boosted slightly by novelty preference
- lowered slightly because of duplicate clustering
- medium confidence because support was partial

---

## 8. Disallowed Explanation Behavior

The explanation layer must not do any of the following.

## 8.1 Fabricate unsupported cultural claims

Do not say:
- “this track is famous for Baudelaire-inspired lyrics”
- unless that is actually supported upstream.

## 8.2 Claim exactness where only approximation exists

Do not say:
- “this is the exact song that matches the request”
- when the system actually found a semantic substitute.

## 8.3 Overstate provider support

Do not say:
- “all sources strongly agree”
- if only one provider or weak evidence supported the item.

## 8.4 Expose irrelevant internal machinery

Do not dump:
- raw API payloads,
- score formulas,
- object IDs,
- or provider response noise

unless explicitly requested in a technical/debug mode.

## 8.5 Pretend uncertainty does not exist

Low-confidence or weakly grounded items must not be described with full certainty.

---

## 9. Explanation Structure Policy

The explanation should normally have three layers.

## 9.1 Overall summary

A short paragraph explaining the dominant interpretation of the request and how the system approached the task.

### Example shape

> “Your prompt points toward quiet, nocturnal, melancholic music with literary and urban undertones. I used that interpretation to gather outside-world music signals, then matched those patterns against your own collection. These are the strongest local fits.”

### Required qualities
- 2–4 sentences maximum for normal responses
- no unnecessary technical jargon
- explicitly reinforce that recommendations are local-only

---

## 9.2 Per-recommendation rationale

Each recommendation should have a short explanation.

### Recommended length
- 1 sentence minimum
- 2 short sentences maximum in normal mode

### Good explanation patterns
- strong mood / texture fit
- exact local match + world support
- best local equivalent to a surfaced reference
- novelty-aware recommendation from relevant cluster

### Example shapes

- “This is a strong fit because its sparse, intimate tone lines up closely with the quiet and nocturnal mood in your request.”
- “This artist surfaced repeatedly in the outside-world evidence, and this track is one of the strongest exact matches from your own library.”
- “You don’t seem to own the exact externally surfaced reference, but this is one of the best local equivalents in the same melancholic and late-night cluster.”

---

## 9.3 Follow-up refinement prompt

The response should usually end with a lightweight refinement invitation.

### Example shapes
- “If you want, I can make this more instrumental, more French, or less dark.”
- “I can refine this toward albums, toward quieter tracks, or toward things you haven’t played recently.”

---

## 10. Tone and Style Policy

## 10.1 Default tone

The default tone should be:
- informed,
- calm,
- concise,
- and curator-like.

## 10.2 Tone characteristics

The explanation should sound like:
- someone who understands music mood and context,
- but is still grounded in actual system evidence.

It should not sound like:
- marketing copy,
- academic criticism,
- or a robotic score readout.

## 10.3 Recommended wording style

Prefer:
- “fits the quiet / nocturnal mood”
- “strong local match”
- “best local equivalent”
- “supported by multiple outside-world signals”

Avoid:
- “the algorithm determined”
- “confidence score 0.73 indicates”
- “semantic vector neighborhood”

in default user-facing mode.

---

## 11. Confidence Communication Policy

## 11.1 High-confidence items

### Explanation style
Use clear but not boastful phrasing.

### Example patterns
- “This is one of the strongest fits in your library.”
- “This is a strong exact match to the type of music your prompt points toward.”

## 11.2 Medium-confidence items

### Explanation style
Use balanced phrasing that remains useful while signaling some approximation.

### Example patterns
- “This is a good fit for the mood, though the match is more thematic than exact.”
- “This seems to sit in the same stylistic neighborhood as the strongest outside-world references.”

## 11.3 Low-confidence items

### Explanation style
Be honest, but still constructive.

### Example patterns
- “This is a more approximate fit, but it is one of the better local options available for the mood you described.”
- “The supporting evidence here is weaker than for the top results, but it still aligns with part of the request.”

### Policy rule
Low confidence must never be hidden.
However, it should be expressed in natural language rather than blunt numeric warnings.

---

## 12. Match-Type Explanation Policy

## 12.1 Exact match explanations

When the recommendation is an exact local match to a surfaced world entity, the explanation may say:
- strong exact match
- direct local match
- clearly present in your library and aligned with the retrieved evidence

## 12.2 Fuzzy match explanations

When the recommendation is a fuzzy local match, the explanation may say:
- likely local match
- appears to correspond closely
- strong fit from your library despite metadata variation

## 12.3 Semantic-neighbour explanations

When the recommendation is a semantic substitute, the explanation should use phrases like:
- best local equivalent
- same stylistic cluster
- musically adjacent fit
- similar atmosphere rather than exact match

### Policy rule
Semantic-neighbour matches must not be described as exact references.

---

## 13. Personalization Disclosure Policy

When personalization materially affects ranking, the explanation may disclose it briefly.

## Allowed examples
- “I biased this slightly toward things you haven’t played recently.”
- “This surfaced partly because it fits the mood and also hasn’t been overplayed.”

## Avoid over-disclosure
Do not explain every minor ranking modifier in normal mode.
Only mention personalization when it meaningfully shaped the result.

---

## 14. Diversity Disclosure Policy

Diversity controls should usually remain implicit.

### Mention diversity only when helpful
Examples:
- “I spread the results across a few different artists so the set isn’t too repetitive.”
- “I avoided stacking too many tracks from the same album.”

### Default rule
Do not mention diversity mechanics unless:
- the user asks,
- the set would otherwise appear strangely varied,
- or a clarification or explanation would benefit from the note.

---

## 15. Degraded Explanation Modes

The explanation layer must support degraded operation.

## 15.1 Cached explanation fallback

If Gemini explanation generation fails but a valid cached explanation payload exists:
- reuse the cached explanation.

## 15.2 Reduced explanation mode

If Gemini explanation generation fails and no cached explanation exists:
- build a minimal explanation from ranking rationale fragments.

### Reduced mode should include
- a short overall note,
- one short rationale per item,
- optional confidence wording,
- and no fabricated curator-style flourish.

### Example reduced-mode overall note

> “These are the strongest local matches I could identify from your library based on the interpreted mood and the outside-world evidence currently available.”

## 15.3 Policy rule
Reduced explanation mode is preferable to returning raw ranked items with no explanation at all.

---

## 16. Clarification-Aware Explanation Policy

If the system chose not to ask a clarification question but ambiguity remains noticeable, the explanation may lightly signal the dominant interpretation branch.

### Example patterns
- “I interpreted your request more toward quiet, literary melancholy than toward dark romantic orchestral music.”
- “I leaned toward intimate late-night tracks rather than broader dramatic album picks.”

This can reduce confusion and invite a more targeted follow-up.

---

## 17. Technical / Debug Explanation Mode (Optional Future Mode)

The system may later support a more technical explanation mode for advanced users.

This mode could expose:
- match type,
- provider support counts,
- confidence band rationale,
- and selected ranking factors.

### Important rule
This is not the default mode.
The default explanation policy must remain curator-facing and non-technical.

---

## 18. Explanation Stability and Versioning

The explanation policy must carry a version identifier.

Any change to:
- tone,
- confidence phrasing,
- allowed evidence types,
- degraded mode behavior,
- or template strategy

should count as an explanation policy version change.

### Why
This is required so that:
- cached explanation payloads remain coherent,
- recommendation/explanation regressions can be audited,
- and future refinement experiments remain traceable.

---

## 19. Minimum V1 Explanation Requirements

For V1, the system should support at minimum:

1. one short overall summary
2. one short explanation per recommendation
3. confidence-aware phrasing
4. distinction between exact and substitute-style matches
5. optional lightweight follow-up refinement suggestion
6. reduced explanation fallback mode when Gemini is unavailable

This is enough to deliver a trustworthy and useful first explanation experience.

---

## 20. Suggested Evaluation Criteria

The explanation policy should later be evaluated against:

1. **Faithfulness**
   - does the explanation stay aligned with upstream evidence?

2. **User clarity**
   - can the user quickly understand why the item was recommended?

3. **Tone quality**
   - does it feel curator-like rather than robotic?

4. **Confidence honesty**
   - does low certainty remain visible without becoming awkward?

5. **Refinement usefulness**
   - do the explanations make it easier for the user to refine the result set?

---

## 21. Suggested Next Design Artifacts

After this explanation policy, the most useful next artifacts are:

1. observability event taxonomy
2. cache key schema appendix
3. ranking evaluation plan with sample scenarios
4. clarification loop sequence diagram
5. implementation backlog / repository planning documents

---

## 22. Executive Summary

The Explanation Policy ensures that the Personal Music Discovery Engine can explain recommendations in a way that is:

- clear,
- curator-like,
- confidence-aware,
- and faithful to actual evidence.

The explanation layer should never invent reasons.
Instead, it should transform:
- interpreted intent,
- world evidence,
- local grounding,
- and ranking rationale fragments

into concise user-facing guidance.

The most important policy decision is this:

> **Explanations must be elegant, but never at the cost of truth.**

That is the rule that preserves trust and makes the overall recommendation experience feel intelligent rather than theatrical.
