# Phase 9 — History Hydration & Suggestion Rewind Design

## Purpose

Phase 9 puts the user first: on every page load the app restores the full session conversation and the active suggestion set, so the user never loses context. Every AI bubble gains a rewind button that lets the user view the track suggestions that accompanied any past reply. The active bubble is visually distinguished, and its identity persists across page refreshes.

---

## Core Concepts

### Session Hydration
On load, the frontend calls `GET /api/session/history`. If history exists, the full conversation is populated into the chat panel and the suggestions panel is re-enriched with the tracks for the active reply. Re-enrichment means the local library match and Last.fm album art are always recalculated fresh — no stale data is served.

### Active Reply
One AI reply is designated *active* at any time. Its identity (`session_events.id`) is persisted in the session database. The suggestions panel always shows the tracks for the active reply.

Active reply changes when:
- A new AI response arrives (auto-activates to the new reply)
- The user clicks the rewind button on any past AI bubble

### Rewind (Go Back)
A small icon button (Material `history`) appears in the top-right corner of every inactive AI bubble that has associated suggestions. Clicking it:
1. Fetches and re-enriches that reply's raw tracks
2. Swaps the suggestions panel to show those tracks
3. Marks the clicked bubble as active (persisted to DB)

The active bubble shows no rewind button and receives a double-border visual treatment.

### Track Context Continuity
"Go back" is a **display-only** operation. The AI context is never rewound — the backend always uses the full event timeline for new prompts. Track events (Add to Clementine, YouTube click) fired while viewing any suggestion set are recorded in the session log as normal.

---

## Schema Changes (session_history.db)

### New event type: `track-suggestions`

Stored in the existing `session_events` table. No column additions are needed.

| column             | content                                                                       |
|--------------------|-------------------------------------------------------------------------------|
| `event_type`       | `"track-suggestions"`                                                         |
| `content`          | JSON array: `[{"title":"…","artist":"…","album":"…"}, …]` — raw, un-enriched |
| `conversation_block` | Same ID as the associated `ai-reply` event — evicted together                |
| `artist`, `album`, `title`, `duration_seconds` | `NULL`                               |

**Insertion order within a turn:**

```
1. INSERT user-chat                  (no conversation_block yet)
2. INSERT ai-reply                   (no conversation_block yet)
3. AssignConversationBlockAsync(aiReplyId)   ← assigns block to steps 1 + 2
4. INSERT track-suggestions          ← block passed explicitly to skip re-assignment
5. SetActiveReplyIdAsync(aiReplyId)
6. FIFO eviction check               ← count of ai-reply rows; track-suggestions evicted with block
```

Step 4 bypasses `AssignConversationBlockAsync` because that call has already run. The `conversation_block` is passed directly to `InsertEventAsync`, so eviction (`UPDATE … WHERE conversation_block = X`) correctly soft-deletes `track-suggestions` alongside its parent block.

### New table: `session_state`

Single-row key-value store for UI persistence.

```sql
CREATE TABLE IF NOT EXISTS session_state (
    key   TEXT PRIMARY KEY,
    value TEXT
);
```

Used key: `active_reply_id` — stores the `session_events.id` of the currently active AI reply as a text integer.

**Stale-ID guard:** when reading `active_reply_id`, the backend validates it against active events. If the stored ID no longer exists (evicted or busted), the backend falls back to the latest active `ai-reply`.

---

## New Backend Components

### `RawTrack` model

```csharp
public record RawTrack(string Title, string Artist, string? Album);
```

Used exclusively for storage and retrieval of un-enriched track data.

### `ITrackEnrichmentService`

Extracted from `RecommendationOrchestrationService`. Provides:

```csharp
Task<IReadOnlyList<TrackSuggestion>> EnrichAsync(
    IReadOnlyList<RawTrack> rawTracks,
    CancellationToken cancellationToken = default);
```

Runs the same pipeline as before: Clementine library match → Last.fm album art fetch. Both `RecommendationOrchestrationService` and the new session endpoint use this service.

Registered as `AddSingleton<ITrackEnrichmentService, TrackEnrichmentService>` in `Program.cs`.

### New DTOs

```csharp
// Returned by GET /api/session/history
public record SessionHistoryResponse(
    IReadOnlyList<HistoryTurnDto> Turns,
    int? ActiveReplyId
);

public record HistoryTurnDto(
    string Role,              // "user" | "model"
    string Text,
    DateTimeOffset Timestamp,
    int EventId,
    bool HasSuggestions       // true when a track-suggestions row exists for this reply
);

// Returned by GET /api/session/reply/{replyId}/suggestions
public record EnrichedSuggestionsResponse(
    IReadOnlyList<TrackSuggestion> Suggestions,
    string? Message
);

// Body for POST /api/session/active-reply
public record SetActiveReplyRequest([Required] int ReplyId);
```

### Updated `RecommendationResponse`

```csharp
public record RecommendationResponse(
    string Narrative,
    IReadOnlyList<TrackSuggestion> Suggestions,
    string? Message,
    string ProviderUsed,
    bool UsedFallback,
    int AiReplyEventId   // ← NEW: enables the frontend to auto-activate the new bubble
);
```

---

## Updated Repository Interface

### New / changed methods on `ISessionHistoryRepository`

| Method | Change |
|--------|--------|
| `InsertEventAsync(…)` | Signature gains an optional `int? conversationBlock` parameter so `track-suggestions` events can be pre-assigned |
| `LogAiReplyAsync` (service layer) | Returns `Task<int>` (the new event ID) instead of `Task` |
| `InsertTrackSuggestionsAsync(IReadOnlyList<RawTrack>, int conversationBlock)` | **New** — serialises tracks to JSON, inserts with pre-assigned block |
| `GetHistoryWithSuggestionsAsync()` | **New** — returns all active `user-chat` and `ai-reply` events ordered by timestamp; for each `ai-reply` includes `HasSuggestions` flag (whether a matching `track-suggestions` row exists) |
| `GetRawSuggestionsAsync(int replyId)` | **New** — returns the `IReadOnlyList<RawTrack>` stored for a given AI reply event ID |
| `GetActiveReplyIdAsync()` | **New** — reads `session_state.active_reply_id`; validates; falls back to latest active `ai-reply` |
| `SetActiveReplyIdAsync(int? replyId)` | **New** — upserts `session_state` key |

`EnsureCreatedAsync` is extended to also create the `session_state` table.

---

## New API Endpoints

All three are added to `SessionController`.

### `GET /api/session/history`

Returns the full active conversation and the current active reply ID.

**Response:**
```json
{
  "turns": [
    {
      "role": "user",
      "text": "Recommend some melancholic jazz",
      "timestamp": "2026-05-02T09:14:00Z",
      "eventId": 1,
      "hasSuggestions": false
    },
    {
      "role": "model",
      "text": "Here are some melancholic jazz picks…",
      "timestamp": "2026-05-02T09:14:08Z",
      "eventId": 2,
      "hasSuggestions": true
    }
  ],
  "activeReplyId": 2
}
```

Empty turns array + null `activeReplyId` when there is no history.

---

### `GET /api/session/reply/{replyId}/suggestions`

Re-enriches and returns the suggestions for one AI reply.

Runs: `GetRawSuggestionsAsync(replyId)` → `ITrackEnrichmentService.EnrichAsync` → response.

**Response:**
```json
{
  "suggestions": [
    {
      "title": "Blue in Green",
      "artist": "Miles Davis",
      "album": "Kind of Blue",
      "inLocalLibrary": true,
      "filePath": "C:\\Music\\miles-davis\\blue-in-green.flac",
      "albumArtUrl": "https://…",
      "durationSeconds": 337.0
    }
  ],
  "message": null
}
```

Returns `404` if `replyId` is not found or not active.

---

### `POST /api/session/active-reply`

Persists the active reply ID.

**Request body:**
```json
{ "replyId": 4 }
```

**Response:** `204 No Content`

Returns `404` if `replyId` is not an active AI reply.

---

### `POST /api/recommendations` (updated)

`AiReplyEventId` is added to the response.

```json
{
  "narrative": "…",
  "suggestions": […],
  "message": null,
  "providerUsed": "gemini",
  "usedFallback": false,
  "aiReplyEventId": 7
}
```

---

## Updated Orchestration Flow

```
GetRecommendationsAsync(prompt, provider, cancellationToken):

  1. Build session context (unchanged)
  2. Call AI provider (unchanged)
  3. var aiReplyId = await LogAiReplyAsync(narrative, now)   ← now returns int
  4. var rawTracks = result.Tracks.Select(t => new RawTrack(t.Title, t.Artist, t.Album))
  5. await LogTrackSuggestionsAsync(rawTracks, aiReplyId)
  6. await SetActiveReplyIdAsync(aiReplyId)
  7. Enrich tracks (unchanged)
  8. return new RecommendationResponse(…, AiReplyEventId: aiReplyId)
```

---

## Frontend Design

### Updated `Message` interface

```typescript
interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  eventId?: number;         // undefined for messages sent this session before a refresh
  hasSuggestions?: boolean; // only relevant on model messages
}
```

### New signals in `ChatComponent`

| Signal | Type | Purpose |
|--------|------|---------|
| `activeReplyId` | `signal<number \| null>` | Which AI reply's tracks are shown |

### `ngOnInit` hydration flow

```
1. refreshMemory()                                          (unchanged)
2. GET /api/session/history
   a. If turns empty → stop (empty state unchanged)
   b. Populate messages[] from turns (role, text, timestamp, eventId, hasSuggestions)
   c. Set activeReplyId from response.activeReplyId
   d. hasSuggestions(true), suggestionsLoading(true)
   e. GET /api/session/reply/{activeReplyId}/suggestions
      → update suggestions, suggestionsMessage, suggestionsLoading(false)
   f. Scroll chat to bottom
```

### `activateReply(eventId: number)` method

```
1. If activeReplyId() === eventId → no-op
2. activeReplyId.set(eventId)
3. suggestionsLoading(true), hasSuggestions(true)
4. GET /api/session/reply/{eventId}/suggestions
   → update suggestions, suggestionsMessage, suggestionsLoading(false)
   → guard: ignore response if activeReplyId() !== eventId (race protection)
5. POST /api/session/active-reply  (fire-and-forget)
```

### New reply auto-activation (in `send()` success handler)

```typescript
activeReplyId.set(response.aiReplyEventId);
// Add model message with eventId: response.aiReplyEventId, hasSuggestions: response.suggestions.length > 0
```

No extra HTTP call — suggestions are already in the response.

### Session service additions

```typescript
getHistory(): Observable<SessionHistoryResponse>
getEnrichedSuggestions(replyId: number): Observable<EnrichedSuggestionsResponse>
setActiveReply(replyId: number): Observable<void>
```

---

## UI Changes

### AI bubble: rewind button

- Condition: `msg.role === 'model' && msg.hasSuggestions && msg.eventId !== activeReplyId()`
- Position: top-right corner of the bubble (absolute, overlaid)
- Icon: Material `history`
- Style: small (18 px), faint (`var(--reco-text-muted)` at low opacity), brightens on hover to `var(--reco-primary)`
- Click: `activateReply(msg.eventId!)`

### AI bubble: active state

- Condition: `msg.role === 'model' && msg.eventId === activeReplyId()`
- Style: `outline: 2px solid var(--reco-primary); outline-offset: 2px` (double-border effect without affecting layout); slightly darker background (`var(--reco-surface-1)` instead of `var(--reco-surface-2)`)
- No rewind button rendered

### Message bubble layout

```
┌─────────────────────────────── ⟳ ┐  ← rewind button (inactive) or absent (active)
│ AI narrative text…                │
│                                   │
│ 14:32                             │  ← existing timestamp
└───────────────────────────────────┘
```

---

## Edge Cases

| Case | Handling |
|------|----------|
| No history on load | Empty turns; empty state unchanged |
| `activeReplyId` evicted since last visit | Backend falls back to latest active reply |
| AI reply with 0 tracks | `hasSuggestions = false`; no rewind button |
| Rapid "go back" clicks | Guard in `activateReply`: response ignored if `activeReplyId` changed before response arrives |
| Memory bust | Clears all events + removes `active_reply_id` from `session_state` |
| Track event fired from old suggestion view | Recorded as normal `track-added` / `track-youtube`; not linked to old reply |

---

## Test Coverage

### Backend

| Test class | New cases |
|------------|-----------|
| `SessionHistoryRepositoryTests` (new) | `InsertTrackSuggestionsAsync` stores JSON correctly; `GetRawSuggestionsAsync` returns parsed tracks; `GetActiveReplyIdAsync` falls back when stored ID is evicted; `SetActiveReplyIdAsync` upserts; `EnsureCreatedAsync` creates `session_state` table |
| `SessionControllerTests` (new) | `GET /history` empty; `GET /history` populated with hasSuggestions flag; `GET /reply/{id}/suggestions` enriches and returns; `GET /reply/{id}/suggestions` 404 on unknown; `POST /active-reply` stores and returns 204 |
| `AlbumArtEnrichmentTests` | Assert `LogTrackSuggestionsAsync` is called; assert `AiReplyEventId` is present in response |
| `ProviderRoutingTests` | Assert `AiReplyEventId` is present in response for all provider paths |

### Frontend

| Test file | New cases |
|-----------|-----------|
| `session.service.spec.ts` | `getHistory` GET; `getEnrichedSuggestions` GET; `setActiveReply` POST |
| `chat.component.spec.ts` | Init with history → messages populated; init with history → suggestions loaded; rewind button absent when no history; rewind button present on inactive bubble with suggestions; active bubble has no rewind button |

---

## Configuration

No new environment variables. All Phase 9 behaviour is driven by data in the existing `SESSION_DB_PATH` database.
