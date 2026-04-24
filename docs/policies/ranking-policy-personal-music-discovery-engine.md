# Ranking Policy — Personal Music Discovery Engine

## 1. Document Purpose

This document defines the **ranking policy** for the Personal Music Discovery Engine.

It describes how the system should score, prioritize, diversify, and confidence-band locally-owned music candidates after they have been grounded from outside-world music evidence.

This document is intended to sit alongside:

- high-level requirements,
- stage-by-stage data contracts,
- logical component architecture,
- query execution sequence diagrams,
- and the provider caching & persistence model.

---

## 2. Architectural Context

The current architecture assumes:

1. **Gemini 2.5 Pro** via the **Gemini Developer API free tier** is used for:
   - intent interpretation,
   - explanation generation,
   - and optionally limited AI-assisted summarization.

2. **Outside-world retrieval** is performed through dedicated provider adapters for:
   - MusicBrainz,
   - Last.fm,
   - Discogs.

3. **Local collection grounding** is performed against the **Clementine-backed local inventory**.

Because of this architecture, ranking is not a generic recommender task.
The ranking engine is specifically responsible for answering:

> “Of the things I actually own, which are the best matches for this request right now?”

---

## 3. Role of the Ranking Engine

The ranking engine sits after grounding.
It does **not** decide what music means in the outside world, and it does **not** decide what the user owns.

Instead, it receives a **Grounded Local Candidate Set** and applies policy to produce the final **Recommendation Set**.

The ranking engine is therefore responsible for:

1. measuring how well each local candidate fits the interpreted request,
2. measuring how strong the outside-world support is,
3. accounting for grounding confidence,
4. applying local/user-sensitive modifiers,
5. preventing redundant result sets,
6. and producing a stable score breakdown suitable for later explanation.

---

## 4. Ranking Design Principles

### 4.1 Local Ownership Is Absolute

No recommendation may outrank into existence an item that is not present in the local inventory.

### 4.2 Directness Matters, But Is Not Everything

An exact match to a strong world-facing entity is valuable.
However, a highly suitable local substitute may still outrank a weak exact match if the overall evidence is stronger.

### 4.3 Ranking Must Remain Explainable

Every score should be decomposable into understandable dimensions.
The system must be able to explain:
- why an item ranked highly,
- and why similar items ranked lower.

### 4.4 Determinism Is Preferred

Given the same:
- intent profile,
- world candidate graph,
- local inventory snapshot,
- and ranking policy version,

the ranking engine should produce the same recommendation ordering.

### 4.5 Diversity Improves Usefulness

The engine should avoid result sets that are technically correct but monotonous.

### 4.6 Novelty Is a Modifier, Not a Primary Truth Source

Play history and recency should shape ranking, not replace relevance.

---

## 5. Ranking Inputs

The ranking engine consumes the following logical inputs:

1. **Intent Profile**
2. **Grounded Local Candidate Set**
3. **Session Constraints / Modifiers**
4. **Ranking Policy Configuration**
5. optionally, local listening-history signals

The ranking engine should not call external providers directly.
It operates on already-grounded candidates.

---

## 6. Ranking Output

The ranking engine produces a **Recommendation Set**.

Each recommendation should contain at minimum:

- recommendation ID
- local entity reference
- final rank
- final score
- score breakdown
- concise rationale fragments
- confidence band

The score breakdown should preserve at least these dimensions:

- intent fit score
- external evidence strength score
- local grounding confidence score
- personalization modifier
- diversity modifier
- total composite score

---

## 7. Core Scoring Dimensions

## 7.1 Intent Fit

### Purpose
Measure how well the local candidate matches the interpreted request.

### Signals may include
- descriptor overlap with the Intent Profile
- mood-axis similarity
- theme-axis similarity
- style-family compatibility
- lyrical / instrumental / textural suitability where inferable

### Interpretation
This is the most important score dimension.
If an item does not fit the request well, it should be difficult for other signals to rescue it.

### Design note
Intent fit can be derived from:
- symbolic descriptor overlap,
- embedding similarity,
- rule-based matching,
- or an AI-assisted fit score.

However, whatever method is used, the result should be surfaced as a stable score, not a vague black-box judgment.

---

## 7.2 External Evidence Strength

### Purpose
Measure how strongly the outside world supported this candidate or its matched world entities.

### Signals may include
- number of providers that supported the matched artist / album / track
- consensus strength in the world candidate graph
- recurrent tags/styles/themes
- centrality of the matched world entity in the graph
- quality of supporting evidence links

### Interpretation
A candidate that sits on top of strong consensus evidence should generally rank above one supported by only weak or isolated provider evidence.

---

## 7.3 Local Grounding Confidence

### Purpose
Measure how certain the system is that the local candidate really corresponds to the intended world entity or semantic neighborhood.

### Signals may include
- exact match vs fuzzy match vs semantic-neighbour match
- alias resolution strength
- metadata cleanliness / completeness
- duplicate ambiguity
- edition / remaster ambiguity

### Interpretation
A high-quality exact match should receive a higher confidence contribution than a speculative semantic substitute.

### Important distinction
Grounding confidence is **not** the same thing as external evidence strength.
A candidate may be well-supported in the outside world but weakly grounded locally, or vice versa.

---

## 7.4 Personalization Modifier

### Purpose
Apply user- and session-sensitive adjustments without overriding core relevance.

### Signals may include
- play count
- last played
- rating
- session exclusions
- requested novelty bias
- album-vs-track preference

### Interpretation
This is a secondary modifier.
It helps answer “best fit right now for this user in this moment,” not “most culturally canonical result.”

### Policy rule
Personalization should shift the ordering of already-relevant items.
It should not force weak matches into the top results.

---

## 7.5 Diversity Modifier

### Purpose
Prevent the result set from becoming overly repetitive.

### Signals may include
- repeated artist frequency in the top-N window
- repeated album frequency in the top-N window
- duplicate / alternate-version clustering
- excessive descriptor similarity across adjacent items

### Interpretation
Diversity is a result-set quality adjustment, not a truth signal.

### Policy rule
Diversity should act as a gentle corrective force, not a hard contradiction of the strongest evidence.

---

## 8. Recommended V1 Scoring Philosophy

For the first implementation, the ranking engine should behave approximately as if these dimensions matter in this order:

1. **Intent Fit** — dominant
2. **External Evidence Strength** — strong secondary factor
3. **Local Grounding Confidence** — strong secondary factor
4. **Personalization Modifier** — moderate adjustment
5. **Diversity Modifier** — mild corrective adjustment

### Example conceptual weighting
A reasonable conceptual starting point is:

- Intent Fit: **40%**
- External Evidence Strength: **25%**
- Local Grounding Confidence: **20%**
- Personalization Modifier: **10%**
- Diversity Modifier: **5%**

These are policy guidance numbers, not a hard contractual requirement.
The real value of the policy is the relative priority ordering.

---

## 9. Match-Type Policy

## 9.1 Exact Matches

### Definition
The local candidate clearly corresponds to a world entity surfaced in the world candidate graph.

### Policy
Exact matches should receive:
- higher grounding confidence,
- and usually a ranking advantage when other signals are similar.

### Caveat
Exactness alone should not dominate all other dimensions.
A weak exact match may still rank below a far more musically suitable local substitute.

---

## 9.2 Fuzzy Matches

### Definition
The local candidate appears to correspond to a world entity with minor naming or metadata variation.

### Policy
Fuzzy matches should receive:
- slightly reduced grounding confidence compared to exact matches,
- but may still rank very highly if overall evidence and intent fit are strong.

### Caveat
High duplicate ambiguity or edition ambiguity should reduce confidence.

---

## 9.3 Semantic-Neighbour Matches

### Definition
The local candidate does not correspond directly to a surfaced world entity, but appears to be the best local equivalent in the same semantic cluster.

### Policy
Semantic-neighbour matches should:
- be allowed,
- remain first-class citizens in the ranking system,
- but carry a lower baseline grounding confidence than exact or well-supported fuzzy matches.

### When they should rank highly
Semantic-neighbour matches should outrank exact matches when:
- intent fit is significantly better,
- outside-world evidence strongly supports the semantic cluster,
- and the exact match is weak, noisy, or musically inferior for the given request.

---

## 10. Duplicate and Variant Handling Policy

## 10.1 Duplicate Cluster Principle

If the local inventory contains multiple variants of effectively the same item, the ranking engine should avoid flooding the top results with all of them.

### Common cases
- remasters
- alternate editions
- duplicate file copies
- same track on multiple compilations
- live version vs studio version when the distinction is weakly relevant

## 10.2 Policy
The engine should:
- cluster likely duplicates or close variants,
- choose the strongest representative,
- and demote near-duplicates unless the prompt explicitly calls for that distinction.

## 10.3 Variant Promotion Rule

A variant may rank above the cluster default if it clearly improves:
- intent fit,
- evidence strength,
- or personalization value.

Example:
A quieter live version may outrank the studio version for a request centered on intimacy and atmosphere.

---

## 11. Album / Artist Overconcentration Policy

### Problem
Without correction, the top-N results may contain:
- too many tracks by one artist,
- or too many tracks from the same album.

### Policy
The ranking engine should apply a diminishing-return style penalty when:
- too many top-ranked candidates share the same artist,
- or too many share the same album.

### Suggested V1 behavior
Within the top 10 recommendations:
- avoid more than 3 tracks from the same artist unless strongly justified
- avoid more than 2 tracks from the same album unless album-level intent is explicit

These are heuristic policy targets, not hard universal constraints.

---

## 12. Novelty / Recency Policy

### Purpose
Support requests like:
- “something I own but haven’t listened to in a while”
- “don’t give me the usual things”

### Signals
- last played timestamp
- play count
- rating
- explicit novelty request in session constraints

### Policy
Use novelty as a multiplier or adjustment on already-relevant candidates.

### V1 rule
- no novelty request → mild effect only
- explicit novelty request → stronger effect
- avoid promoting obscure but poor-fit items solely because they are underplayed

---

## 13. Confidence Band Policy

Each ranked recommendation should be assigned a confidence band.

## 13.1 High Confidence

Use when:
- intent fit is strong,
- external evidence is strong,
- local grounding is high-confidence,
- and there is little ambiguity.

## 13.2 Medium Confidence

Use when:
- overall score is solid,
- but one of the major dimensions is weaker,
- or semantic substitution played a meaningful role.

## 13.3 Low Confidence

Use when:
- the item is still one of the best available local answers,
- but ambiguity is high,
- evidence is sparse,
- or grounding is weak.

### Policy rule
Low-confidence recommendations may still be shown, but explanations should disclose their uncertainty carefully.

---

## 14. Clarification Trigger Policy (Ranking-Adjacent)

Although clarification is owned by a separate service, ranking should provide the signals that make clarification worthwhile.

### Ranking should trigger clarification candidates when:
- top candidates have similar scores across very different interpretation branches,
- confidence bands are mostly medium/low,
- diversity correction is masking deeper ambiguity,
- or the best exact matches and best semantic substitutes point in noticeably different stylistic directions.

### Ranking should avoid clarification when:
- the top results are clearly strong,
- the score spread is healthy,
- and uncertainty is not likely to change the user-visible answer materially.

---

## 15. Explainability Requirements for Ranking

The ranking engine must emit enough structured detail for the Explanation Service to say:

- why this item ranked highly,
- what kind of match it was,
- what outside-world evidence mattered,
- and whether novelty/diversity modifiers influenced the final placement.

### Minimum rationale fragments to preserve
For each recommendation, preserve short machine-readable rationale fragments such as:
- strong nocturnal / quiet fit
- multi-provider artist support
- exact local match
- semantic substitute for surfaced reference
- boosted by novelty preference
- slightly demoted for duplicate clustering

These fragments are not user-facing copy yet, but they are the backbone of later explanation.

---

## 16. Ranking Stability and Versioning

### Versioning rule
The ranking policy must carry a version identifier.

Any change to:
- scoring dimensions,
- weighting philosophy,
- duplicate handling,
- diversity rules,
- or confidence-band thresholds

should be treated as a ranking policy version change.

### Why
This is required so that:
- cached recommendation sets remain coherent,
- score changes can be audited,
- and explanation behavior remains aligned with the scoring system.

---

## 17. Minimum V1 Ranking Requirements

For V1, the system should support at minimum:

1. track-level recommendations only
2. exact / fuzzy / semantic-neighbour match handling
3. score breakdown across the five core dimensions
4. duplicate and overconcentration correction
5. novelty-aware reranking when explicit or when weakly enabled by default
6. confidence-band assignment
7. rationale fragment emission for explanation

This is sufficient to deliver a strong first recommendation experience without overcomplicating the engine.

---

## 18. Suggested Evaluation Criteria

The ranking policy should later be evaluated against:

1. **Relevance**
   - Do top results feel like strong answers to the request?

2. **Grounding quality**
   - Are recommendations truly local and plausibly connected to the world graph?

3. **Diversity quality**
   - Is the result set varied without feeling random?

4. **Explainability**
   - Can the system honestly explain the ranking?

5. **User satisfaction**
   - Do feedback signals validate the ranking order?

---

## 19. Suggested Next Design Artifacts

After this ranking policy, the most useful next artifacts are:

1. explanation policy document
2. provider failure / graceful degradation sequence diagram
3. cache key schema appendix
4. observability event taxonomy
5. ranking evaluation plan with sample scenarios

---

## 20. Executive Summary

The Ranking Policy defines how the Personal Music Discovery Engine should choose the **best** local recommendations after grounding.

The most important policy decision is that ranking should be driven primarily by:

- **Intent Fit**,
- then **External Evidence Strength**,
- then **Local Grounding Confidence**,

with **Personalization** and **Diversity** acting as secondary modifiers.

This ensures the system remains:
- relevant,
- collection-grounded,
- explainable,
- and pleasant to use.

The ranking engine should favor exact matches when they are strong, but should still allow semantic substitutes to outrank them when they better satisfy the request.

The result is a recommendation policy that behaves like a thoughtful curator rather than a brittle filter or a popularity list.
