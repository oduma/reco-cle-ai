# Phase 8 — Session Memory Design

## Purpose

Phase 8 introduces a **server-side session memory** that makes every AI interaction aware of the full conversation history and the user's listening behaviour. The AI can reference what the user has been listening to, connect new recommendations to demonstrated taste, and reason about temporal context ("you may still be listening to those tracks").

---

## Core Concepts

### Session Log
A chronological record of everything that happens in a session, stored in a server-side SQLite database. Four event types:

| `event_type`    | Trigger                                    | Key fields                              |
|-----------------|--------------------------------------------|-----------------------------------------|
| `user-chat`     | User sends a prompt                        | `content` (prompt text)                 |
| `ai-reply`      | AI responds                                | `content` (narrative)                   |
| `track-added`   | User clicks "Add to Clementine"            | `artist`, `album`, `title`, `duration_seconds` |
| `track-youtube` | User clicks a YouTube link on a tile       | `artist`, `album`, `title`, `duration_seconds` |

### Memory
The **active window** of the session log. Memory is defined as the last **N active AI replies** (default N = 25, configurable via `SESSION_MEMORY_SIZE`). When a new AI reply would push the count over N, the oldest **conversation block** is soft-deleted (FIFO). A conversation block is:

> `user-chat(k)` + any `track-added`/`track-youtube` events between `ai-reply(k-1)` and `ai-reply(k)` + `ai-reply(k)`

### Soft Delete
Records are never physically deleted. The `is_active` column (1 = active, 0 = evicted/busted) controls visibility. Eviction and bust both flip `is_active` to 0. This preserves the full audit trail.

### Bust
The user can manually flush the entire memory from the UI. All active records are soft-deleted at once.

---

## SQLite Schema

Database file: configured by `SESSION_DB_PATH` (default: `session_history.db` next to the API binary).

```sql
CREATE TABLE IF NOT EXISTS session_events (
    id                   INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type           TEXT    NOT NULL,   -- 'user-chat' | 'ai-reply' | 'track-added' | 'track-youtube'
    timestamp            TEXT    NOT NULL,   -- ISO 8601 UTC (e.g. "2026-05-01T14:26:00Z")
    user_label           TEXT    NOT NULL DEFAULT 'me',
    content              TEXT,              -- prompt or narrative (user-chat, ai-reply)
    artist               TEXT,              -- track events
    album                TEXT,              -- track events (nullable)
    title                TEXT,              -- track events
    duration_seconds     REAL,              -- track events; NULL means use SESSION_DEFAULT_TRACK_DURATION_SECONDS
    is_active            INTEGER NOT NULL DEFAULT 1,
    conversation_block   INTEGER            -- groups events for FIFO eviction; set to the id of the ai-reply that closes the block
);
```

`conversation_block` is set to the `id` of the `ai-reply` event that closes the block. All events in the same block share the same `conversation_block` value. This makes FIFO eviction a single UPDATE by `conversation_block`.

---

## Memory Progress Calculation

```
memory_used  = COUNT(*) WHERE event_type = 'ai-reply' AND is_active = 1
memory_total = SESSION_MEMORY_SIZE  (default 25)
progress     = memory_used / memory_total   (0.0 – 1.0)
```

---

## FIFO Eviction Algorithm

Runs after each new `ai-reply` is saved:

1. Count active AI replies → `used`.
2. While `used > SESSION_MEMORY_SIZE`:
   a. Find the `conversation_block` value of the oldest active `ai-reply` (lowest `id`).
   b. `UPDATE session_events SET is_active = 0 WHERE conversation_block = <that value>`.
   c. Decrement `used`.

---

## AI Context Construction (Option A — Preamble Injection)

On every `POST /api/recommendations`, the backend:

1. Loads all active events ordered by `timestamp ASC`.
2. **Reconstructs conversation turns** (`ConversationTurn[]`) from `user-chat` and `ai-reply` events in order — these are passed as the historical turns to the AI provider.
3. **Builds a temporal preamble** to inject into the *current* user prompt:

```
[<day> <date>, <time>]

Full session history:
- <HH:mm> — me: "<user-chat content>"
- <HH:mm> — Reasonic: "<ai-reply content>" (truncated to ~120 chars if long)
- <HH:mm> — me: added "<title>" · <artist> · <album>
- <HH:mm> — me: looked up "<title>" · <artist> on YouTube
...

Since your last reply (<HH:mm>):
- <HH:mm> — me: added "<title>" · <artist>
- <HH:mm> — me: looked up "<title>" · <artist> on YouTube
→ ~<X> min of music. <Y> min has passed — [I may still be listening to those tracks. | I have most likely finished listening.]

My question: <actual user prompt>
```

4. The enriched prompt (preamble + actual prompt) becomes the **latest user turn** in the conversation. Prior turns carry no preamble.

---

## Listening Time Estimation

```
total_track_seconds = SUM of duration_seconds for all track events (track-added, track-youtube)
                      since the last active ai-reply timestamp
                      (using SESSION_DEFAULT_TRACK_DURATION_SECONDS for NULLs)

elapsed_seconds     = NOW_UTC - last_ai_reply_timestamp

if total_track_seconds > elapsed_seconds:
    → "I may still be listening to those tracks."
else:
    → "I have most likely finished listening."
```

---

## System Prompt Instruction (All Providers)

The following instruction is prepended to the system/instruction context for every AI provider call (Gemini, Ollama Whisper, Ollama Shout, and any future provider):

> *"You are Reasonic, a personal music discovery assistant. You have access to the user's full session history, including what they have said, what you have recommended, and what tracks they have added to their player or looked up on YouTube. Always reference this listening history when making new recommendations — connect what you suggest to what the user has demonstrably enjoyed or explored. Note temporal context where relevant: how long they have been listening, and whether they are likely still listening. Make the conversation feel continuous and personal."*

---

## New API Surface

### `POST /api/session/events`
Records a track interaction event (frontend fires this on "Add to Clementine" or YouTube click).

**Request body:**
```json
{
  "eventType": "track-added" | "track-youtube",
  "artist": "Miles Davis",
  "album": "Kind of Blue",
  "title": "Blue in Green",
  "durationSeconds": 337.0,    // null if unknown (backend uses default)
  "timestamp": "2026-05-01T14:26:00Z"
}
```
**Response:** `204 No Content`

### `GET /api/session/memory`
Returns current memory status for the UI progress bar.

**Response:**
```json
{ "used": 18, "total": 25 }
```

### `DELETE /api/session/memory`
Soft-deletes all active session events (bust memory).

**Response:** `204 No Content`

### `POST /api/recommendations` (modified)
`history` is removed from the request. The backend loads history from SQLite.

**Request body (before → after):**
```json
// Before Phase 8
{ "prompt": "...", "history": [...], "provider": "gemini" }

// Phase 8
{ "prompt": "...", "provider": "gemini" }
```

`history` is also removed from the response — the backend is now the single source of truth.

---

## Track Duration Source

| Track type       | Duration source                                    |
|------------------|----------------------------------------------------|
| Local (Clementine-matched) | `lengthnanosec / 1_000_000_000.0` from Clementine SQLite |
| Discovery / YouTube | `SESSION_DEFAULT_TRACK_DURATION_SECONDS` (default 210 s) |

`lengthnanosec` is added to the `ClementineService` SQL query, `LocalTrack` model, `TrackSuggestion` DTO, and Angular `TrackSuggestion` interface.

---

## Frontend Changes

| Change | Detail |
|--------|--------|
| Remove `history` from `RecommendationRequest` | No more client-side history tracking |
| Remove `history` from `RecommendationResponse` | Server is the source of truth |
| Add `SessionService` | Wraps `POST /api/session/events` and `GET/DELETE /api/session/memory` |
| Fire `track-added` event on "Add to Clementine" click | Per card and "Add all" (one event per track) |
| Fire `track-youtube` event on YouTube link click | Per card |
| Add memory progress bar to header | Shows `used / total`; colour shifts when memory > 80% |
| Add "bust memory" icon button to header | Calls `DELETE /api/session/memory`; confirms before executing |

---

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `SESSION_DB_PATH` | `session_history.db` | Path to session SQLite file |
| `SESSION_MEMORY_SIZE` | `25` | Max active AI replies |
| `SESSION_DEFAULT_TRACK_DURATION_SECONDS` | `210` | Assumed duration for tracks with no Clementine data |
