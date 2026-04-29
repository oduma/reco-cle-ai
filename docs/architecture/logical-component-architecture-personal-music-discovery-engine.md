# Logical Component Architecture — Personal Music Discovery Engine

## 1. Document Purpose

This document defines the **logical component architecture** for the Personal Music Discovery Engine.

It translates the previously defined:

- high-level requirements,
- recommendation pipeline,
- and stage-by-stage data contracts

into a concrete set of **components**, **services**, and **modules**.

This version reflects the following implementation:

- the system uses **Gemini** (cloud) or **Ollama** (local LLM) for recommendation narrative and structured track list generation — no external music metadata providers (MusicBrainz, Last.fm, Discogs) are used,
- the user's local music inventory is grounded via the **Clementine SQLite-backed library** using normalised fuzzy string matching,
- and Phase 4 adds a **copy-to-clipboard** action on local track cards.

> **Note:** Some sections of this document describe components planned for a more complex future architecture (retrieval orchestrator, world candidate graph, ranking engine, etc.). These have not been implemented. The current implementation is the Recommendation Orchestration Service described in the query execution sequence diagram.

---

## 2. Architecture Goals

The architecture must:

1. accept natural-language music requests,
2. interpret them with AI,
3. retrieve external music evidence at query time,
4. ground all results against the user's local music collection,
5. rank and explain only locally-owned recommendations,
6. remain modular and testable,
7. and be resilient to provider limits and partial provider failures.

---

## 3. Key Runtime Assumptions

### 3.1 LLM Layer

The system uses either:
- **Gemini** (cloud, via Gemini Developer API) — default provider
- **Ollama** (local, OpenAI-compatible API) — optional, user-selectable per request via UI toggle

The active LLM returns a conversational narrative and a structured track list in a single call. No separate interpretation or ranking stage is needed.

### 3.2 LLM Provider Constraints

- Gemini is rate-limited per project. The app avoids unnecessary API calls.
- Ollama runs locally with no API key. CPU inference takes 60–120 seconds per request. The HTTP client timeout is set to 5 minutes.
- If Ollama is selected but unavailable (timeout or connection refused), the system falls back to Gemini automatically.

### 3.3 Local Inventory Layer

The user's locally-owned collection is retrieved from the **Clementine SQLite database copy** at the path configured by `CLEMENTINE_DB_PATH`. The copy is read-only and does not affect the running player.

---

## 4. Architecture Style

The recommended architecture style is:

> **layered, modular, retrieval-and-grounding architecture with AI-assisted interpretation and explanation**

This is not a monolith and not a pure chatbot.

The system should be treated as:

- an **AI-assisted orchestration layer**,
- over a **retrieval layer**,
- over a **grounding and ranking layer**,
- with a **collection-scoped response contract**.

---

## 5. High-Level Logical View

```text
User Interface (provider toggle: Gemini / Local)
    ↓
Recommendation Orchestration Service
    ↓
LLM Gateway (Gemini or Ollama)
    ↓
Clementine DB Adapter (local inventory fuzzy matching)
    ↓
Suggestion Cache Service
    ↓
API Response (narrative + annotated tracks)
```

Supporting all of the above:

```text
Cache + Observability + Configuration + Rate-Limit Handling
```

---

## 6. Component Catalog

## 6.1 User Interaction Layer

### Purpose
Provide the user-facing entry point for natural-language requests and follow-up refinements.

### Logical components
- Chat UI
- Session context holder
- Request dispatcher

### Responsibilities
- accept user prompts,
- display ranked recommendations,
- show short explanations,
- capture thumbs up/down and refinement prompts.

### Notes
This layer should remain thin. It should not contain recommendation logic.

---

## 6.2 Request Intake Service

### Purpose
Normalize incoming user requests into the Stage 0 **Request Envelope** contract.

### Responsibilities
- generate request IDs,
- capture timestamp,
- attach session metadata,
- record requested result type when known,
- preserve raw prompt text unchanged.

### Inputs
- UI prompt
- session context

### Outputs
- Request Envelope

### Rules
- immutable record of original request
- no interpretation logic here

---

## 6.3 Session Context Service

### Purpose
Maintain current-session constraints and recommendation history.

### Responsibilities
- keep prior request references,
- store active exclusions or modifiers,
- store most recent recommendation set,
- support follow-ups like “more like this” or “less gloomy”.

### Inputs
- prior requests
- feedback events

### Outputs
- conversation context summary
- session constraints

### Notes
Session context is not the same as long-term preference learning.

---

## 6.4 Intent Interpretation Service

### Purpose
Transform the raw request into the Stage 1 **Intent Profile**.

### Runtime dependency
- **Gemini 2.5 Pro** via Gemini Developer API free tier

### Responsibilities
- map raw prompts into structured descriptors,
- produce mood axes and theme axes,
- infer likely genres / style families,
- preserve ambiguity where needed,
- suggest clarification only when necessary.

### Inputs
- Request Envelope
- session context summary

### Outputs
- Intent Profile

### Why this service is separate
Interpretation is AI-centric and should remain independent from retrieval and local grounding.

### Architectural constraint
Because Gemini 2.5 Pro free-tier rate limits are project-scoped and can vary over time, this service must be called through a gateway that can:
- observe quota errors,
- back off gracefully,
- and support future model fallback or paid-tier migration.

---

## 6.5 Gemini Gateway

### Purpose
Provide a stable adapter between application logic and the Gemini Developer API.

### Responsibilities
- authenticate API calls,
- enforce project-level usage policies,
- centralize model selection,
- handle retry/backoff behavior,
- surface rate-limit errors consistently,
- support future switch to paid tier without changing higher-level components.

### Inputs
- structured prompts for interpretation or explanation

### Outputs
- structured model responses
- normalized AI errors

### Why this is required
The application should never scatter direct Gemini API calls across multiple modules.

### Special note for this architecture
Because **Gemini 2.5 Pro free tier does not provide grounding with Google Search / Maps**, this gateway should only be used for:
- interpretation,
- explanation,
- and optionally structured summarization.

It should **not** be treated as the world-retrieval layer.

---

## 6.6 External Retrieval Orchestrator

### Purpose
Coordinate query-time retrieval across multiple music knowledge providers.

### Responsibilities
- accept an Intent Profile,
- generate provider-specific retrieval strategies,
- dispatch parallel or staged calls to provider adapters,
- collect **External Evidence Packets**,
- tolerate missing or partial provider responses.

### Inputs
- Intent Profile

### Outputs
- list of External Evidence Packets

### Notes
This layer owns provider fan-out and collection of provider evidence, but not provider-specific request logic.

---

## 6.7 LLM Gateways

> **Note:** External music metadata provider adapters (originally planned for MusicBrainz, Last.fm, Discogs) are not implemented. The LLM gateway is the sole music knowledge source.

### Purpose
Encapsulate each LLM provider behind a clean gateway boundary implementing `ILLMGatewayService`.

### Gateways
- GeminiGatewayService
- OllamaGatewayService

### Responsibilities
- send conversation history + prompt to the LLM,
- parse structured JSON track list from the response,
- return a `MusicRecommendationResult` (narrative + track list).

### Notes
Gateways are stateless. Provider routing (Gemini vs Ollama) and fallback logic live in the orchestration service.

---

## 6.8 World Candidate Graph Builder

### Purpose
Merge provider packets into the Stage 3 **World Candidate Graph**.

### Responsibilities
- normalize artists/albums/tracks across providers,
- consolidate tags/styles/themes,
- merge aliases and canonical IDs where possible,
- assign consensus scores,
- preserve evidence links for later explanation.

### Inputs
- External Evidence Packets

### Outputs
- World Candidate Graph

### Notes
This is the “world meaning” layer of the architecture. It must remain independent of local collection concerns.

---

## 6.9 Local Collection Adapter

### Purpose
Expose the user's local music inventory from Clementine as the Stage 4 **Local Inventory Snapshot**.

### Responsibilities
- query the Clementine-backed library,
- return locally-owned artists, albums, and tracks,
- expose comparison-safe local metadata,
- optionally expose play counts, last played, and ratings.

### Inputs
- request scope
- optional narrowing hints

### Outputs
- Local Inventory Snapshot

### Notes
This adapter is the authoritative “what do I actually own?” layer.

---

## 6.10 Grounding Engine

### Purpose
Map the world candidate graph to the local inventory.

### Responsibilities
- perform exact identity matching,
- perform fuzzy matching,
- perform semantic-neighbour matching when exact matches do not exist,
- generate the Stage 5 **Grounded Local Candidate Set**,
- preserve evidence links from external world graph to local candidates.

### Inputs
- World Candidate Graph
- Local Inventory Snapshot

### Outputs
- Grounded Local Candidate Set

### Notes
This is the most important “collection-aware” service in the system.

---

## 6.11 Ranking Engine

### Purpose
Rank grounded local candidates into the best final recommendations.

### Responsibilities
- compute intent fit,
- compute evidence strength contribution,
- compute local grounding confidence,
- apply novelty / recency modifiers,
- apply diversity controls,
- produce the Stage 6 **Recommendation Set**.

### Inputs
- Grounded Local Candidate Set
- Intent Profile
- session modifiers

### Outputs
- Recommendation Set

### Notes
This component should remain deterministic and inspectable even if some scoring assistance later comes from AI.

---

## 6.12 Explanation Service

### Purpose
Turn ranked recommendations into a curator-style answer.

### Runtime dependency
- **Gemini 2.5 Pro** via Gemini Gateway

### Responsibilities
- produce a short overall summary,
- produce per-item rationales,
- convert evidence and ranking signals into user-friendly language,
- avoid unsupported or fabricated explanations.

### Inputs
- Recommendation Set
- Intent Profile
- evidence links

### Outputs
- Explanation Payload

### Notes
This service should only explain what upstream services already established.

---

## 6.13 Response Composer

### Purpose
Assemble the final user response payload.

### Responsibilities
- combine recommendation list and explanation payload,
- add confidence signals where appropriate,
- attach optional refinement suggestions,
- hand the final response back to the UI layer.

### Inputs
- Recommendation Set
- Explanation Payload

### Outputs
- final response DTO / payload

---

## 6.14 Clarification Decision Service

### Purpose
Decide whether the system should ask one clarifying question.

### Responsibilities
- inspect ambiguity in the Intent Profile,
- inspect dispersion / confidence in the World Candidate Graph,
- inspect confidence spread in the Recommendation Set,
- emit a **Clarification Request** only when useful.

### Inputs
- Intent Profile
- World Candidate Graph
- Recommendation Set (or pre-rank confidence)

### Outputs
- Clarification Request or null

### Notes
This should remain a narrow policy service, not a general conversational agent.

---

## 6.15 Feedback Capture Service

### Purpose
Capture user reactions and refinement signals.

### Responsibilities
- record thumbs up/down,
- record textual refinement prompts,
- create Stage 9 **Feedback Event** objects,
- update session-level preference state.

### Inputs
- response interaction
- UI events

### Outputs
- Feedback Event
- updated session constraints

---

## 6.16 Cache Layer

### Purpose
Reduce repeated provider calls and soften free-tier API constraints.

### Cache domains
- Gemini interpretation results
- Gemini explanation results
- normalized artist identities
- provider evidence packets
- world candidate graphs
- local inventory snapshots
- past recommendation/explanation bundles

### Responsibilities
- reduce repeated AI/API work,
- avoid unnecessary provider fan-out,
- lower exposure to rate-limit errors,
- improve responsiveness.

### Notes
This cache is especially important because:
- Gemini free-tier limits are project-scoped,
- Ollama CPU inference takes 60–120 seconds per request — avoiding duplicate calls matters.

---

## 6.17 Observability & Diagnostics Layer

### Purpose
Make the system explainable, debuggable, and benchmarkable.

### Responsibilities
- request tracing across all stages,
- structured logging of stage outputs and latencies,
- provider failure tracking,
- Gemini quota / rate-limit event tracking,
- recommendation trace inspection.

### Minimum telemetry to capture
- request ID
- stage start/end timestamps
- provider latency
- cache hit/miss
- Gemini error category
- ranking score breakdown availability

---

## 6.18 Configuration & Policy Module

### Purpose
Centralize non-code behavior and routing decisions.

### Responsibilities
- model selection policy (e.g. Gemini 2.5 Pro free tier)
- provider enable/disable flags
- ranking-policy knobs
- clarification thresholds
- explanation style policy
- caching TTLs
- feature flags for future paid-tier enablement

### Notes
This is the module that should make later migration from:
- Gemini free tier → paid tier,
- or Gemini 2.5 Pro → other Gemini routes,

low-friction.

---

## 7. Layered Module View

## 7.1 Interaction Layer

Modules:
- Chat UI
- Request Dispatcher
- Session Context Service
- Response Composer
- Feedback Capture Service

## 7.2 AI Orchestration Layer

Modules:
- Request Intake Service
- Intent Interpretation Service
- Explanation Service
- Clarification Decision Service
- Gemini Gateway

## 7.3 LLM Gateway Layer

Modules:
- GeminiGatewayService
- OllamaGatewayService
- Recommendation Orchestration Service
- Suggestion Cache Service

## 7.4 Collection Grounding Layer

Modules:
- Local Collection Adapter
- Grounding Engine
- Ranking Engine

## 7.5 Cross-Cutting Infrastructure Layer

Modules:
- Cache Layer
- Observability & Diagnostics
- Configuration & Policy
- Secrets / credentials handling

---

## 8. Mapping Components to Data Contracts

| Contract | Producing Component | Consuming Components |
|---|---|---|
| Request Envelope | Request Intake Service | Intent Interpretation Service, Local Collection Adapter |
| Intent Profile | Intent Interpretation Service | External Retrieval Orchestrator, Ranking Engine, Explanation Service |
| External Evidence Packet | Provider Adapters | World Candidate Graph Builder |
| World Candidate Graph | World Candidate Graph Builder | Grounding Engine, Clarification Decision Service |
| Local Inventory Snapshot | Local Collection Adapter | Grounding Engine |
| Grounded Local Candidate Set | Grounding Engine | Ranking Engine |
| Recommendation Set | Ranking Engine | Explanation Service, Response Composer |
| Explanation Payload | Explanation Service | Response Composer |
| Clarification Request | Clarification Decision Service | UI / Session Layer |
| Feedback Event | Feedback Capture Service | Session Context Service |

---

## 9. Gemini-Specific Architectural Decisions

## 9.1 Why Gemini 2.5 Pro Is Used Only for Certain Responsibilities

Gemini 2.5 Pro is a strong fit here for:
- interpretation,
- explanation,
- and possibly structured summarization,

because it is available on the free tier for input/output token usage.

However, the architecture deliberately uses Ollama as a cost-free local alternative:
- free-tier Gemini usage is subject to project-level rate limits,
- and local inference has no API cost, only CPU time.

## 9.2 Rate-Limit Safety

Because rate limits are:
- per project,
- variable by model,
- and surfaced through AI Studio rather than a single fixed universal quota table,

the Gemini Gateway must support:
- retry/backoff,
- graceful degradation,
- and future fallback to cheaper or lighter Gemini routes if needed.

## 9.3 Free-Tier Data Policy Implication

Because free-tier Gemini content may be used to improve Google products, the architecture should avoid sending unnecessary local-library detail to Gemini when it is not needed.

This leads to a design preference:
- use Gemini for prompt interpretation and explanation,
- keep local inventory matching logic outside Gemini where possible,
- minimize unnecessary raw local-library data exposure to the AI layer.

---

## 10. Recommended First-Cut Implementation Boundaries

For V1, the most practical implementation boundaries are:

### Core components (current implementation)
1. GeminiGatewayService
2. OllamaGatewayService
3. Recommendation Orchestration Service
4. Clementine DB Adapter (ClementineService)
5. Suggestion Cache Service
6. Recommendations API endpoint

### Components that can stay simple in V1
- Clarification Decision Service
- long-term preference persistence
- advanced personalization
- multi-agent decomposition

---

## 11. Suggested Logical Folder / Module Layout

```text
music-discovery-engine/
  docs/
    requirements/
    architecture/
    contracts/
  src/
    UI/
    Interaction/
    Orchestration/
    AI/
    Retrieval/
    Providers/
    WorldModel/
    Collection/
    Grounding/
    Ranking/
    Explanation/
    Feedback/
    Cache/
    Observability/
    Configuration/
```

Alternative namespace-oriented grouping is also valid, but the implementation should preserve the same logical boundaries.

---

## 12. Failure and Degradation Paths

The architecture should degrade gracefully in these cases:

### Gemini unavailable or rate-limited
- return a temporary “AI interpretation unavailable” path,
- reuse cached interpretation if available,
- optionally fall back to simpler template-based explanation.

### One external provider fails
- continue with remaining providers,
- lower confidence where appropriate,
- keep evidence provenance clear.

### Clementine inventory unavailable
- stop recommendation generation,
- because final results must remain scoped to local ownership.

### World graph is weak or ambiguous
- invoke Clarification Decision Service,
- ask one focused question if useful.

---

## 13. Security and Privacy Considerations

### Architectural principles
- keep Gemini calls centralized,
- minimize sending unnecessary local inventory details to Gemini,
- keep provider API secrets outside application code,
- maintain local inventory as the source of truth,
- log identifiers and stage metadata, but avoid full sensitive prompt/data dumps by default.

---

## 14. Executive Summary

The logical architecture for the Personal Music Discovery Engine is built around three major concerns:

1. **LLM-based recommendation** using **Gemini** (cloud) or **Ollama** (local) — the LLM is both the recommender and the narrative explainer in a single call,
2. **local library annotation** using the **Clementine-backed SQLite copy** with normalised fuzzy string matching,
3. **Phase 4 copy-to-clipboard** — one-click copy of artist + title from local track cards.

No external music metadata providers (MusicBrainz, Last.fm, Discogs) are used. Local music files do not carry provider-assigned identifiers, so direct fuzzy matching against the Clementine DB is both simpler and more effective.

The result is a modular, testable architecture that preserves the core product promise:

> ask about music in natural language → see what you own (blue) and what you could discover (magenta) → copy the best local tracks to clipboard with one click.
