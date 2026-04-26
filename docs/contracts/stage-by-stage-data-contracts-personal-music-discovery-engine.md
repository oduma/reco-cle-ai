# Stage-by-Stage Data Contracts — Personal Music Discovery Engine (Option 1 / Level 3)

## 1. Document Purpose

This document defines the **stage-by-stage data contracts** for the Personal Music Discovery Engine described previously.

It is intended to make the recommendation pipeline implementation-ready by specifying, in plain English, what each stage:

- receives,
- produces,
- must preserve,
- and may optionally enrich.

This document is aligned to the following design mode:

- **Option 1** — Live hybrid lookup at query time
- **Level 3** — Near-Gemini behavior, grounded to the user's local collection

The target behavior is a system that:

1. sends a music request to an LLM (Gemini or local Ollama),
2. receives a conversational narrative and a structured track list in a single response,
3. annotates each track against the user's Clementine-backed local library (fuzzy matching),
4. returns all tracks tagged with `inLocalLibrary` — owned tracks (blue) and discovery tracks (magenta),
5. and explains the result through the LLM's conversational narrative.

---

## 2. Design Principles

### 2.1 Stable IDs Everywhere

Every major object in the pipeline should carry a stable internal identifier so that:

- data can be traced end-to-end,
- logs can be correlated,
- recommendations can be explained,
- and debugging remains practical.

### 2.2 Provenance Must Be Preserved

If the system recommends something, the path from:

- user prompt,
- to interpreted intent,
- to external evidence,
- to grounded local match,
- to final explanation

must remain inspectable.

### 2.3 Canonical Identity and Display Labels Are Different

Where possible, the system should distinguish between:

- a canonical music entity identity, and
- the user-facing display label.

This is important because local metadata and external provider naming may differ.

### 2.4 Uncertainty Is a First-Class Signal

The contracts should allow uncertainty to be represented explicitly through:

- confidence scores,
- ambiguity flags,
- unresolved alternatives,
- and “best local equivalent” markers.

### 2.5 Local Inventory Scope Is Absolute

Regardless of what outside-world evidence suggests, final recommendations must remain constrained to the user's locally-owned collection.

---

## 3. Shared Conceptual Types

These shared conceptual types should be reused consistently across the pipeline.

### 3.1 Descriptor

Represents a semantic label that may describe:

- mood,
- texture,
- atmosphere,
- theme,
- style,
- era,
- geography,
- literary or cultural anchor.

#### Minimum fields
- descriptor ID
- descriptor label
- descriptor category
- confidence / strength
- source attribution

---

### 3.2 Entity Reference

Represents a music entity such as:

- artist,
- album,
- track.

#### Minimum fields
- entity reference ID
- entity type
- display label
- canonical label if known
- aliases if known
- provider/source IDs if known
- confidence

---

### 3.3 Evidence Link

Represents a traceable connection between a recommendation and its supporting evidence.

#### Minimum fields
- evidence link ID
- source provider
- source entity or descriptor
- strength / confidence
- short explanation fragment

---

### 3.4 Score Breakdown

Represents the major dimensions of ranking.

#### Minimum fields
- intent fit score
- external evidence score
- local grounding confidence
- personalization modifier
- diversity modifier
- total composite score

---

## 4. Stage 0 — Query Intake

### 4.1 Purpose

Capture the user's request and the minimum session state required for the rest of the pipeline.

### 4.2 Input

The stage receives:

- the raw user message,
- current conversation/session context,
- existing session preferences or exclusions,
- UI context indicating whether the user expects tracks, albums, artists, or a mix.

### 4.3 Output Contract

#### Object name
**Request Envelope**

#### Required fields
- `request_id`
- `timestamp`
- `raw_prompt`
- `conversation_context_summary`
- `requested_result_type`
  - track / album / artist / mixed / unspecified
- `session_constraints`
- `source_mode`
  - live hybrid lookup

#### Optional fields
- language / locale
- prior recommendation set reference
- refinement-of request reference
- user-visible session label

### 4.4 Rules

- The raw prompt must remain unchanged and preserved.
- This object is the immutable anchor for downstream stages.
- No interpretation should happen here beyond minimal routing metadata.

### 4.5 Example semantics

A prompt like:

> “I want something quiet and Baudelaire-like”

should enter the system here only as a raw user request plus session metadata.

---

## 5. Stage 1 — Intent Interpretation

### 5.1 Purpose

Translate the raw request into a structured music-intent model.

### 5.2 Input

This stage receives:

- the request envelope,
- optional prior refinement information,
- optional session preference history.

### 5.3 Output Contract

#### Object name
**Intent Profile**

#### Required fields
- `intent_id`
- `request_id`
- `primary_descriptors`
- `secondary_descriptors`
- `anti_descriptors`
- `mood_axes`
- `theme_axes`
- `candidate_style_families`
- `interpretation_notes`

#### Optional fields
- era preference
- geography preference
- language preference
- literary/cultural anchors
- ambiguity score
- clarification suggested flag

### 5.4 Meaning of key fields

#### `primary_descriptors`
The most important interpreted qualities of the request.

Examples:
- quiet
- nocturnal
- melancholic

#### `secondary_descriptors`
Supporting qualities that deepen the interpretation but are less central.

Examples:
- decadent
- urban
- literary

#### `anti_descriptors`
Things the user likely does **not** want.

Examples:
- too dramatic
- too loud
- too orchestral

#### `mood_axes`
Structured continuous or bucketed dimensions such as:
- energy
- darkness/lightness
- sparseness/density
- warmth/coolness
- vocal/instrumental bias

#### `theme_axes`
Structured thematic dimensions such as:
- solitude
- beauty-in-decay
- intimacy
- urban melancholy
- memory

### 5.5 Rules

- The intent profile must stay **world-facing**, not collection-facing.
- Do not inject local-library assumptions into this stage.
- Preserve ambiguity where confidence is low.

---

## 6. Stage 2 — External Knowledge Expansion

### 6.1 Purpose

Retrieve outside-world music evidence that corresponds to the interpreted intent.

### 6.2 Input

This stage receives:

- the intent profile,
- retrieval strategy settings,
- enabled provider configuration.

### 6.3 Output Contract

#### Object name
**External Evidence Packet**

Each provider should produce one packet per query variant.

#### Required fields
- `evidence_packet_id`
- `intent_id`
- `provider_name`
- `query_variant`
- `returned_entities`
- `returned_descriptors`
- `provider_confidence`
- `retrieval_timestamp`

#### For each returned entity
Required fields:
- provider entity ID
- display label
- entity type
- local descriptor set from that provider
- provider-local evidence strength

#### Optional fields
- similar artists
- related tracks
- profile snippets
- release metadata
- source references / URLs
- cache hit indicator
- retrieval latency

### 6.4 Rules

- Preserve provider boundaries at this stage.
- Do not merge providers yet.
- Keep the original provider-level evidence strength visible.
- A packet may be partial or sparse and still valid.

### 6.5 Note on current architecture

External evidence packets from third-party providers are not used in the current implementation. The LLM (Gemini or Ollama) is the sole source of music knowledge. If a future version re-introduces external evidence retrieval, this section describes the expected packet structure.

---

## 7. Stage 3 — World Candidate Graph Construction

### 7.1 Purpose

Merge all external evidence packets into one normalized graph representing the outside-world interpretation of the request.

### 7.2 Input

This stage receives:

- all external evidence packets for the request,
- normalization rules,
- canonicalization rules,
- alias-resolution rules.

### 7.3 Output Contract

#### Object name
**World Candidate Graph**

#### Required fields
- `world_graph_id`
- `intent_id`
- `normalized_entities`
- `descriptor_nodes`
- `edges`
- `consensus_scores`
- `graph_summary`

#### Each normalized entity must contain
- `world_entity_id`
- entity type
- preferred display label
- aliases
- canonical external IDs where known
- merged descriptor set
- provider evidence count
- consensus strength
- explanation evidence fragments

#### Optional fields
- prominence / centrality
- ambiguity score
- exemplar flag
- weak-support flag

### 7.4 Meaning of key sections

#### `normalized_entities`
The merged artist/album/track candidates that represent the “world interpretation” of the request.

#### `descriptor_nodes`
The merged moods, tags, styles, themes, and other semantic descriptors extracted from all providers.

#### `edges`
Relationships such as:
- artist → album
- artist → descriptor
- track → descriptor
- entity → provider support

#### `consensus_scores`
A summary of how strongly the graph believes a given artist, album, track, or descriptor is central to the request.

### 7.5 Rules

- This graph must still remain independent of the local collection.
- It should represent the best world-facing answer to:
  > “What music does this prompt mean?”
- Provider disagreements should not be erased; they should be represented through confidence or support counts.

---

## 8. Stage 4 — Local Collection Retrieval

### 8.1 Purpose

Retrieve the current local inventory snapshot from the user's collection authority.

### 8.2 Input

This stage receives:

- request envelope,
- optional scope narrowing from the intent profile,
- access to the local library layer.

### 8.3 Output Contract

#### Object name
**Local Inventory Snapshot**

#### Required fields
- `inventory_snapshot_id`
- `request_id`
- `local_artists`
- `local_albums`
- `local_tracks`
- `inventory_timestamp`

#### Minimum local track fields
- `local_track_id`
- artist
- album
- title
- canonicalized comparison strings
- local library identity reference

#### Recommended additional local fields
- play count
- last played
- rating
- duration
- year
- genre
- album artist
- duplicate cluster ID
- edition / remaster hints

### 8.4 Rules

- This snapshot is the local truth for the request.
- The pipeline must not recommend outside this scope.
- If some personalization signals are missing, the snapshot is still valid.

---

## 9. Stage 5 — Grounding / Crosswalk

### 9.1 Purpose

Map the world candidate graph onto the local inventory.

### 9.2 Input

This stage receives:

- the world candidate graph,
- the local inventory snapshot,
- matching logic for exact, fuzzy, and semantic equivalence.

### 9.3 Output Contract

#### Object name
**Grounded Local Candidate Set**

#### Required fields
- `grounding_id`
- `world_graph_id`
- `inventory_snapshot_id`
- `local_candidates`

#### Each local candidate must contain
- `local_candidate_id`
- local entity reference
- matched world entity references
- `match_type`
  - exact / fuzzy / semantic-neighbour
- `match_confidence`
- `evidence_links`
- `grounding_notes`

#### Optional fields
- duplicate / edition warning
- ambiguity flag
- local-only semantic fit flag
- “best local substitute” flag

### 9.4 Rules

- Every grounded local candidate must link back to at least one world-facing evidence path.
- Candidates may exist because they are exact matches **or** because they are the best local substitutes.
- The grounding set is allowed to contain low-confidence candidates, provided confidence is explicit.

---

## 10. Stage 6 — Semantic Re-Ranking

### 10.1 Purpose

Take grounded local candidates and rank them into the best final recommendations.

### 10.2 Input

This stage receives:

- the grounded local candidate set,
- the intent profile,
- session modifiers,
- ranking policy.

### 10.3 Output Contract

#### Object name
**Recommendation Set**

#### Required fields
- `recommendation_set_id`
- `request_id`
- `ranked_recommendations`
- `ranking_summary`

#### Each recommendation must contain
- `recommendation_id`
- local entity reference
- rank
- total score
- score breakdown
- concise rationale fragments
- confidence band

#### Score breakdown should include
- intent fit score
- external evidence strength score
- local match confidence score
- personalization modifier
- diversity modifier
- total composite score

### 10.4 Suggested conceptual ranking factors

These are conceptual design factors, not fixed implementation weights:

- **Intent fit**
  - How well does the local item match the interpreted request?
- **External evidence strength**
  - How strongly was the item supported by world-facing retrieval?
- **Local confidence**
  - How certain is the grounding?
- **Session/user modifiers**
  - novelty, recency, overplay avoidance
- **Diversity correction**
  - prevent redundant result sets

### 10.5 Rules

- The recommendation set must remain local-only.
- The ranking must preserve enough detail for later explanation.
- Diversity controls should improve UX without erasing the strongest matches.

---

## 11. Stage 7 — Explanation Generation

### 11.1 Purpose

Transform the recommendation set into a conversational, curator-style answer.

### 11.2 Input

This stage receives:

- recommendation set,
- intent profile,
- evidence links,
- explanation policy.

### 11.3 Output Contract

#### Object name
**Explanation Payload**

#### Required fields
- `explanation_id`
- `recommendation_set_id`
- `overall_summary`
- `per_recommendation_explanations`
- `follow_up_suggestions`

#### Each recommendation explanation should include
- recommendation ID
- user-facing rationale
- dominant evidence trail summary
- confidence or caution note if needed

### 11.4 Rules

- Explanations must not invent unsupported reasons.
- The explanation layer may rephrase, summarize, and prioritize, but not fabricate.
- The overall summary should sound like a curator, not a raw search engine.

---

## 12. Stage 8 — Clarification (Conditional)

### 12.1 Purpose

Ask one high-value clarifying question only when ambiguity materially harms recommendation quality.

### 12.2 Input

This stage receives:

- intent ambiguity indicators,
- world graph ambiguity indicators,
- recommendation confidence spread.

### 12.3 Output Contract

#### Object name
**Clarification Request**

#### Required fields
- `clarification_id`
- `request_id`
- `question_text`
- `clarification_type`
- `why_needed`

#### Optional fields
- interpretation branches under consideration
- likely ranking improvement if clarified

### 12.4 Rules

- Ask at most one focused question per ambiguity event.
- Do not convert the experience into a multi-step questionnaire.
- If the system can proceed with good-enough confidence, it should prefer action over questioning.

---

## 13. Stage 9 — Feedback Capture

### 13.1 Purpose

Capture user reactions that improve current-session and future recommendations.

### 13.2 Input

This stage receives:

- shown recommendation set,
- explicit user feedback event.

### 13.3 Output Contract

#### Object name
**Feedback Event**

#### Required fields
- `feedback_id`
- `request_id`
- `recommendation_set_id`
- feedback type
- target scope
- timestamp

#### Optional fields
- textual refinement content
- inferred preference delta
- session-only vs persistent flag

### 13.4 Typical feedback types

- thumbs up
- thumbs down
- more like this
- less like this
- too dark
- more instrumental
- wrong genre / right mood

### 13.5 Rules

- Feedback should be lightweight.
- Session-level use is required.
- Persistent learning is optional and may be introduced later.

---

## 14. Cross-Stage Traceability Requirements

Every final recommendation should be traceable through these links:

1. `recommendation_id` → `local_candidate_id`
2. `local_candidate_id` → `world_entity_id` or semantic substitute mapping
3. `world_entity_id` → one or more `evidence_packet_id` values
4. `evidence_packet_id` → `intent_id`
5. `intent_id` → `request_id`

This traceability is what allows:
- explanation,
- debugging,
- benchmarking,
- and trust.

---

## 15. Minimum Viable Contract Set for V1

To avoid overcomplication, the first full implementation should support the following minimum contract path:

1. **Request Envelope**
2. **Intent Profile**
3. **External Evidence Packet**
4. **World Candidate Graph**
5. **Local Inventory Snapshot**
6. **Grounded Local Candidate Set**
7. **Recommendation Set**
8. **Explanation Payload**
9. **Feedback Event**

Recommended V1 simplifications:
- tracks only
- one recommendation list per request
- one explanation per recommendation
- one optional clarification question
- lightweight thumbs up/down feedback

---

## 16. Suggested Next Design Artifacts

After this document, the next useful artifacts would be:

1. logical component architecture
2. sequence diagram for query execution
3. persistence model for cached provider evidence
4. ranking policy document
5. explanation policy document
6. feedback policy document
7. test/evaluation criteria for recommendation quality

---

## 17. Executive Summary

The stage-by-stage data contracts defined here are intended to keep the Personal Music Discovery Engine coherent as it evolves.

The most important design property is that the system should remain **traceable and grounded**:

- the user prompt becomes an **intent profile**,
- external providers produce **evidence packets**,
- those packets merge into a **world candidate graph**,
- that graph is grounded against a **local inventory snapshot**,
- grounding produces **local candidates**,
- ranking produces a **recommendation set**,
- explanation produces a user-facing **curator response**,
- and feedback produces a **learning signal**.

This is the cleanest contract model for implementing a live hybrid, Level 3 personal music recommendation engine that behaves like a strong AI assistant while remaining constrained to the user's own collection.
