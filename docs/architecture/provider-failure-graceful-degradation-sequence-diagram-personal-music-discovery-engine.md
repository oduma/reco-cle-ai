# Provider Failure / Graceful Degradation Sequence Diagram — Personal Music Discovery Engine

## Purpose

This sequence diagram describes how the Personal Music Discovery Engine behaves when dependencies fail or degrade during request execution.

This document covers the following failure classes in the current architecture:

1. Ollama (local LLM) is unavailable — fallback to Gemini
2. Gemini is unavailable or returns an error
3. Clementine DB copy is missing or unreadable
4. Clementine Remote is unavailable (Phase 4)

---

## Failure Modes Covered

### FM-1 — Ollama unavailable (timeout or connection refused)
User selected "local" provider but Ollama is not running, or CPU inference exceeded the 5-minute timeout.

### FM-2 — Gemini unavailable or returns an error
The Gemini API returns a rate-limit, auth, or server error.

### FM-3 — Clementine DB copy unreadable
The configured DB copy path is wrong, the file is missing, or the SQLite read fails.

### FM-4 — Clementine Remote unavailable (Phase 4)
The user clicks "Add to playlist" or "Build playlist" but Clementine is not running or Remote is not enabled.

---

## Main Graceful Degradation Sequence

```mermaid
sequenceDiagram
    autonumber

    actor User
    participant UI as Chat UI (Angular)
    participant API as Recommendations API
    participant Orch as Recommendation Orchestration Service
    participant Gemini as Gemini Gateway
    participant Ollama as Ollama Gateway
    participant DB as Clementine DB Adapter

    User->>UI: Submit prompt (provider = "local")
    UI->>API: POST /api/recommendations { provider: "local" }
    API->>Orch: GetRecommendationsAsync(prompt, history, "local")

    Orch->>Ollama: GetMusicRecommendationAsync(prompt, history)

    alt FM-1: Ollama unavailable
        Ollama-->>Orch: TaskCanceledException (timeout) or HttpRequestException (connection refused)
        Orch->>Gemini: GetMusicRecommendationAsync(prompt, history)
        alt Gemini succeeds
            Gemini-->>Orch: MusicRecommendationResult
            note over Orch: usedFallback = true, providerUsed = "gemini"
        else FM-2: Gemini also fails
            Gemini-->>Orch: Exception (auth / rate limit / server error)
            Orch-->>API: Propagate exception
            API-->>UI: HTTP 500 or 503
            UI-->>User: Error state shown in chat
        end
    else Ollama succeeds
        Ollama-->>Orch: MusicRecommendationResult
    end

    Orch->>DB: LoadInventoryAsync()

    alt FM-3: DB unavailable
        DB-->>Orch: Exception (file not found, SQLite error)
        note over Orch: All tracks annotated as inLocalLibrary = false
        note over Orch: message = "Your local library is currently unavailable. Showing all tracks as discovery suggestions."
    else DB available
        DB-->>Orch: Local inventory snapshot
        Orch->>Orch: Fuzzy-match each track, set inLocalLibrary
    end

    Orch-->>API: RecommendationResponse (narrative, tracks, usedFallback, message?)
    API-->>UI: HTTP 200

    alt usedFallback = true
        UI->>UI: Show amber chip "Local model unavailable — used Gemini" (auto-dismiss 8s)
    end
    alt message present (DB unavailable)
        UI->>UI: Show info message below suggestion panel
    end
    UI-->>User: Display results (degraded but usable)
```

---

## Phase 4 Failure Diagram — Clementine Remote

```mermaid
sequenceDiagram
    autonumber

    actor User
    participant UI as Chat UI (Angular)
    participant API as Playlist API
    participant Remote as Clementine Remote Service

    User->>UI: Click "Add to playlist" on a local track card
    UI->>API: POST /api/playlist/track { filePath }

    API->>Remote: AddTrackToCurrentPlaylistAsync(filePath)

    alt FM-4: Clementine not running / Remote not enabled
        Remote-->>API: SocketException (connection refused)
        API-->>UI: HTTP 503 "Clementine is not running or Remote is not enabled."
        UI->>UI: MatSnackBar warning shown
        UI-->>User: "Could not add track — is Clementine running and Remote enabled?"
    else Clementine available
        Remote-->>API: Success
        API-->>UI: HTTP 204
        UI->>UI: MatSnackBar confirmation
        UI-->>User: "Added to playlist"
    end
```

---

## Failure-Handling Policy by Component

## 1. Ollama Gateway

### Failure posture
Ollama is optional. Its unavailability must never hard-fail the user's request.

### Graceful behavior
- Catch `TaskCanceledException` (inference timeout, 5 min) and `HttpRequestException` with `StatusCode is null` (connection refused).
- Fall back to Gemini automatically.
- Set `usedFallback = true` and `providerUsed = "gemini"` on the response.

### User-facing outcome
The response arrives normally. An amber chip informs the user that Gemini was used instead of the local model.

---

## 2. Gemini Gateway

### Failure posture
Gemini is the primary and fallback LLM. Its failure should surface as a visible error, not a silent empty response.

### Graceful behavior
- Propagate the exception to the controller.
- Return an appropriate HTTP error code (500 or 503).
- Do not return a partial or fabricated narrative.

### User-facing outcome
The chat shows an error state with a retry affordance.

---

## 3. Clementine DB Adapter

### Failure posture
The local library is best-effort. Its unavailability should degrade to a discovery-only view, not a hard failure.

### Graceful behavior
- Catch all exceptions from SQLite access.
- Annotate all tracks as `inLocalLibrary = false`.
- Set `message` to inform the user that local filtering is unavailable.
- Return all tracks as discovery (magenta) so the user still gets recommendations.

### User-facing outcome
All tracks are shown as magenta discovery cards. A message explains that the local library is temporarily unavailable.

---

## 4. Clementine Remote Service (Phase 4)

### Failure posture
Playlist operations are interactive actions. Failure must be immediately visible to the user.

### Graceful behavior
- Catch `SocketException` (connection refused on port 5501).
- Return HTTP 503 with a human-readable message.
- Do not retry silently.

### User-facing outcome
A `MatSnackBar` warning tells the user that Clementine is not running or Remote is not enabled.

---

## Summary of Degradation Outcomes

| Failure | Outcome | User sees |
|---|---|---|
| Ollama timeout / unavailable | Falls back to Gemini | Amber chip, response still arrives |
| Gemini error | Hard error | Error state in chat, retry affordance |
| Clementine DB unavailable | All tracks shown as discovery | Info message, magenta cards only |
| Clementine Remote unavailable | 503 response | Snackbar warning on playlist action |
