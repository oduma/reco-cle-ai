# Query Execution Sequence Diagram — Personal Music Discovery Engine

## Purpose

This sequence diagram shows the end-to-end execution flow for a single music recommendation request in the current architecture.

This version assumes:

- **Gemini 2.5 Pro** via the **Gemini Developer API free tier** is used for:
  - intent interpretation,
  - structured intent generation,
  - and explanation generation.
- **MusicBrainz**, **Last.fm**, and **Discogs** are used for external music evidence retrieval.
- **Clementine** remains the local inventory authority.

---

## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber

    actor User
    participant UI as Chat UI
    participant Intake as Request Intake Service
    participant Session as Session Context Service
    participant Intent as Intent Interpretation Service
    participant Gemini as Gemini Gateway (Gemini 2.5 Pro)
    participant Retrieve as External Retrieval Orchestrator
    participant MB as MusicBrainz Adapter
    participant LF as Last.fm Adapter
    participant DG as Discogs Adapter
    participant Graph as World Candidate Graph Builder
    participant Local as Local Collection Adapter (Clementine)
    participant Ground as Grounding Engine
    participant Rank as Ranking Engine
    participant Explain as Explanation Service
    participant Clarify as Clarification Decision Service
    participant Compose as Response Composer
    participant Feedback as Feedback Capture Service
    participant Cache as Cache Layer
    participant Obs as Observability / Diagnostics

    User->>UI: Submit natural-language music request
    UI->>Intake: Create request envelope
    Intake->>Session: Load active session context
    Session-->>Intake: Context summary + session constraints
    Intake->>Obs: Log request received

    Intake->>Cache: Check cached intent profile
    alt Cached intent exists
        Cache-->>Intent: Cached intent profile
    else No cached intent
        Intake->>Intent: Interpret request
        Intent->>Gemini: Send structured interpretation prompt
        Gemini-->>Intent: Intent interpretation result
        Intent->>Cache: Store intent profile
    end
    Intent-->>Retrieve: Intent Profile
    Intent-->>Rank: Intent Profile
    Intent-->>Explain: Intent Profile
    Intent->>Obs: Log intent profile generated

    Retrieve->>Cache: Check cached provider evidence
    alt Cached provider evidence exists
        Cache-->>Retrieve: External evidence packets
    else No cached evidence
        par Query MusicBrainz
            Retrieve->>MB: Provider-specific retrieval request
            MB-->>Retrieve: External Evidence Packet
        and Query Last.fm
            Retrieve->>LF: Provider-specific retrieval request
            LF-->>Retrieve: External Evidence Packet
        and Query Discogs
            Retrieve->>DG: Provider-specific retrieval request
            DG-->>Retrieve: External Evidence Packet
        end
        Retrieve->>Cache: Store provider evidence packets
    end
    Retrieve->>Graph: Build world candidate graph
    Graph-->>Ground: World Candidate Graph
    Graph-->>Clarify: Graph ambiguity signals
    Graph->>Obs: Log world graph generated

    Intake->>Local: Request local inventory snapshot
    Local->>Cache: Check cached inventory snapshot
    alt Cached inventory snapshot exists
        Cache-->>Local: Local Inventory Snapshot
    else No cached inventory snapshot
        Local-->>Ground: Local Inventory Snapshot
        Local->>Cache: Store local inventory snapshot
    end
    Local-->>Ground: Local Inventory Snapshot
    Local->>Obs: Log inventory snapshot loaded

    Ground->>Ground: Exact matching
    Ground->>Ground: Fuzzy matching
    Ground->>Ground: Semantic-neighbour matching
    Ground-->>Rank: Grounded Local Candidate Set
    Ground->>Obs: Log grounding result

    Rank->>Rank: Score intent fit
    Rank->>Rank: Score evidence strength
    Rank->>Rank: Score local match confidence
    Rank->>Rank: Apply novelty / diversity modifiers
    Rank-->>Clarify: Recommendation confidence spread
    Rank-->>Explain: Recommendation Set
    Rank-->>Compose: Recommendation Set
    Rank->>Obs: Log ranked recommendations

    Clarify->>Clarify: Evaluate ambiguity threshold
    alt Clarification required
        Clarify-->>Compose: Clarification Request
        Compose-->>UI: Return one clarifying question
    else No clarification needed
        Explain->>Cache: Check cached explanation payload
        alt Cached explanation exists
            Cache-->>Explain: Explanation Payload
        else No cached explanation
            Explain->>Gemini: Generate curator-style explanation
            Gemini-->>Explain: Explanation Payload
            Explain->>Cache: Store explanation payload
        end
        Explain-->>Compose: Explanation Payload
        Explain->>Obs: Log explanation generated

        Compose->>Compose: Build final response payload
        Compose-->>UI: Ranked local recommendations + explanations
        UI-->>User: Show recommendations
    end

    User->>UI: Provide feedback / refinement
    UI->>Feedback: Capture feedback event
    Feedback->>Session: Update session constraints
    Feedback->>Obs: Log feedback event
```

---

## Step-by-Step Flow Summary

### 1. Request intake
The user submits a natural-language music prompt through the chat UI.
The system creates a **Request Envelope**, loads session context, and records the request for traceability.

### 2. Intent interpretation
The request is converted into a structured **Intent Profile** using the **Intent Interpretation Service**, which calls the **Gemini Gateway** to use **Gemini 2.5 Pro** for prompt understanding.

### 3. External evidence retrieval
The **External Retrieval Orchestrator** fans out to:
- MusicBrainz,
- Last.fm,
- Discogs

Each adapter returns an **External Evidence Packet**.

### 4. World candidate graph construction
The **World Candidate Graph Builder** merges all provider packets into one normalized graph representing the “outside-world meaning” of the request.

### 5. Local inventory retrieval
The **Local Collection Adapter** queries the **Clementine** collection and produces a **Local Inventory Snapshot**.

### 6. Grounding / crosswalk
The **Grounding Engine** maps the world graph to the local inventory using:
- exact matches,
- fuzzy matches,
- semantic-neighbour matches.

### 7. Ranking
The **Ranking Engine** produces a **Recommendation Set** using:
- intent fit,
- evidence strength,
- local confidence,
- novelty / recency,
- diversity controls.

### 8. Clarification decision
If ambiguity is too high, the **Clarification Decision Service** emits one focused **Clarification Request**.

### 9. Explanation generation
If clarification is not needed, the **Explanation Service** calls **Gemini 2.5 Pro** to produce a curator-style **Explanation Payload**.

### 10. Response composition
The **Response Composer** assembles the final response:
- ranked recommendations,
- explanations,
- optional refinement prompts.

### 11. Feedback capture
User feedback is captured and converted into a **Feedback Event**, which updates session context for later turns.

---

## Why This Sequence Matches the Current Architecture

### Gemini is used where it is strongest in this version
Gemini 2.5 Pro is used for:
- intent interpretation,
- and explanation generation,

but not for world retrieval.

### External music retrieval remains provider-based
Because free-tier Gemini 2.5 Pro does not provide free grounding with Google Search / Maps, the architecture keeps world retrieval in dedicated adapters:
- MusicBrainz,
- Last.fm,
- Discogs.

### Local ownership remains authoritative
The system does not recommend from the internet.
It recommends only from the **Clementine-backed local inventory** after the world graph has been grounded locally.

### Cache and observability are first-class participants
Both are shown directly in the diagram because:
- free-tier AI/API usage can be rate-limited,
- external provider calls are operationally variable,
- and traceability is essential for debugging and explanation.

---

## Suggested Follow-On Diagram Variants

After this sequence diagram, the most useful variants would be:

1. **happy-path only sequence diagram**
   - no ambiguity branch
   - no provider failure branch

2. **provider failure / graceful degradation sequence diagram**
   - one external provider unavailable
   - cached world evidence fallback

3. **clarification loop sequence diagram**
   - user clarifies
   - pipeline reruns from intent interpretation or ranking

4. **feedback refinement sequence diagram**
   - “more like this”
   - session modifier update
   - rerank-only path

---

## Suggested Filename

`docs/architecture/query-execution-sequence-diagram.md`
