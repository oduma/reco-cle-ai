# Phase 14 — Musical Diary Design

## 1. Overview

Phase 14 adds a Musical Diary to Reasonic — a calendar-based view of past listening days with AI-generated introspective diary entries.

When the user opens the diary, an inline calendar highlights every day in the past where they sent at least one prompt. Clicking any highlighted date triggers a Gemini-powered, first-person narrative entry that covers the musical mood of the day, an honest critique of their listening habits, the most interesting request they made, and a reflective conclusion. Entries are cached per date so the AI is only called once per day unless the user forces regeneration.

The diary is a personal artefact, not a utility. It turns a usage log into something that feels like a genuine record of how a person's listening life unfolded.

---

## 2. UI Placement

A `calendar_month` icon button is added to the header bar in `chat.component.html`, positioned between the provider toggle (Inner Whisper / Inner Shout / Cosmic Voice) and the memory widget (progress bar + bust button).

| Header element | Position |
|---|---|
| Logo | left |
| Title ("Reasonic") | left |
| Provider toggle | centre-left |
| **Musical Diary button (new)** | **centre** |
| Memory widget | centre-right |
| Settings gear | right |

Button appearance: `mat-icon-button`, icon `calendar_month`, tooltip "Musical Diary" (via `matTooltip`).

---

## 3. Modal Layout

Opened via `MatDialog`. Default `MatDialog` behaviour closes the modal when the user clicks outside it.

### 3.1 Structure

```
┌─────────────────────────────────────────────────────┐
│  Musical Diary                                 [×]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│          ┌──────────────────────────┐               │
│          │   MatCalendar (month)    │               │
│          │  [prev] November 2025 [next]             │
│          │  Mo Tu We Th Fr Sa Su   │               │
│          │   ...  [cyan] ... [charcoal] ...         │
│          └──────────────────────────┘               │
│                                                     │
├─────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────┐ │
│  │  Diary area (min-height ~160px, overflow-y)    │ │
│  │  [empty / loading / error / loaded state]      │ │
│  │                                                │ │
│  │  [Regenerate] button (shown when loaded)       │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### 3.2 Calendar date styling

| Date type | Visual |
|---|---|
| Today | Charcoal background — `--reco-surface-2` token (or override Material's built-in `.mat-calendar-body-today`) |
| Past day with activity | Cyan background — `--reco-primary` token via `.diary-date--active` class |
| Future days | Default (no highlight, not clickable) |

### 3.3 Diary area states

| State | Content |
|---|---|
| Empty | Muted prompt: "Select a past day to read your diary entry." |
| Loading | `MatProgressSpinner` + message: "Writing your diary entry…" |
| Error | Error message + **Regenerate** button |
| Loaded | Diary text, generated-at timestamp, **Regenerate** button |

---

## 4. Calendar Implementation

Use `MatCalendar` from `@angular/material/datepicker`, rendered inline — no datepicker trigger field.

### 4.1 Required Angular Material imports

```typescript
MatDatepickerModule
MatNativeDateModule   // provides DateAdapter
MatCalendarModule     // re-exported by MatDatepickerModule
```

`MatNativeDateModule` must be provided at the component level (or app level) to supply the `DateAdapter`.

### 4.2 Template bindings

```html
<mat-calendar
  [dateClass]="dateClassFn"
  (selectedChange)="onDateSelected($event)"
  [selected]="selectedDate()">
</mat-calendar>
```

`maxDate` is intentionally **not set** — forward month navigation is allowed (future months will simply contain no cyan highlights).

### 4.3 `dateClass` function

```typescript
dateClassFn: MatCalendarCellClassFunction<Date> = (date: Date) => {
  const key = formatDateKey(date); // YYYY-MM-DD
  const today = formatDateKey(new Date());
  if (key === today) return 'diary-date--today';
  if (this.activeDates().has(key)) return 'diary-date--active';
  return '';
};
```

The function is bound at component construction time. `activeDates` is a `Signal<Set<string>>` populated when the modal opens.

### 4.4 `selectedChange` handler

```typescript
onDateSelected(date: Date): void {
  const key = formatDateKey(date);
  const today = formatDateKey(new Date());
  if (key >= today) return;           // guard: today and future are no-ops
  if (!this.activeDates().has(key)) return; // guard: no activity
  this.selectedDate.set(key);
  this.loadEntry(key, false);
}
```

### 4.5 Active dates loading

On `ngOnInit`, the component calls `GET /api/diary/active-dates` and stores the result as a `Set<string>` for O(1) lookup during the `dateClass` callback, which fires once per visible date cell.

---

## 5. Database Changes

### 5.1 New table: `diary_entries`

Added via an additive migration in `SessionHistoryRepository.EnsureCreatedAsync()`:

```sql
CREATE TABLE IF NOT EXISTS diary_entries (
    date       TEXT PRIMARY KEY,   -- YYYY-MM-DD local date (user's timezone)
    content    TEXT NOT NULL,
    created_at TEXT NOT NULL       -- ISO 8601 UTC timestamp
);
```

The migration is wrapped in a try/catch block so it is safe to run against an existing database that was created before Phase 14.

### 5.2 Existing tables (unchanged)

| Table | Role |
|---|---|
| `session_events` | Source of truth for diary activity and day data |
| `session_state` | Active reply persistence |
| `app_settings` | Provider configuration |

---

## 6. API Surface

Two new endpoints on a new `DiaryController`:

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/diary/active-dates` | Returns `string[]` of YYYY-MM-DD dates (past only, today excluded) where at least one `user-chat` event exists in `session_events` (any `is_active` value) |
| `POST` | `/api/diary/entry` | Body: `{ date: string, force: boolean }`. Returns `{ content, isFromCache, generatedAt }`. If `force=false` and entry cached: return cache. If `force=false` and no cache: generate+save+return. If `force=true`: generate+save (overwrite)+return. |

### 6.1 Request and response shapes

**`GET /api/diary/active-dates` response:**
```json
["2025-11-10", "2025-11-12", "2025-11-14"]
```

**`POST /api/diary/entry` request:**
```json
{ "date": "2025-11-12", "force": false }
```

**`POST /api/diary/entry` response:**
```json
{
  "content": "Dear Diary, today is Wednesday, 12 November 2025...",
  "isFromCache": true,
  "generatedAt": "2025-11-12T22:14:05Z"
}
```

### 6.2 Validation

The `POST /api/diary/entry` endpoint validates:
- `date` is a valid YYYY-MM-DD string
- `date` is strictly before today (UTC) — backend double-check; the frontend also guards

Returns `400 Bad Request` if validation fails.

---

## 7. Active Dates Query

```sql
SELECT DISTINCT DATE(timestamp) AS activity_date
FROM   session_events
WHERE  event_type   = 'user-chat'
  AND  DATE(timestamp) < DATE('now')
ORDER  BY activity_date ASC;
```

**No `is_active` filter** — this is intentional. The diary reflects all historical behaviour including FIFO-evicted sessions. FIFO eviction is a memory management mechanism, not a historical erasure.

---

## 8. Day Data Query (for diary generation)

For a given date (`$date` = YYYY-MM-DD), three queries gather the day's events across all `session_events` rows (no `is_active` filter):

```sql
-- User prompts
SELECT content, mood, timestamp
FROM   session_events
WHERE  event_type     = 'user-chat'
  AND  DATE(timestamp) = $date
ORDER  BY timestamp ASC;

-- Tracks added to Clementine
SELECT artist, title
FROM   session_events
WHERE  event_type     = 'track-added'
  AND  DATE(timestamp) = $date
ORDER  BY timestamp ASC;

-- YouTube listens
SELECT artist, title
FROM   session_events
WHERE  event_type     = 'track-youtube'
  AND  DATE(timestamp) = $date
ORDER  BY timestamp ASC;
```

---

## 9. Gemini Diary Generation

### 9.1 Interface addition

Add to `IGeminiGatewayService`:

```csharp
Task<string> GenerateDiaryEntryAsync(string userPrompt, CancellationToken cancellationToken);
```

### 9.2 Implementation notes

- Uses the same API key, base URL, and model as existing Gemini calls — reads from `IAppSettingsService`
- System instruction is diary-specific (see below) — NOT the music recommendation instruction
- Single-turn call, no conversation history
- Response mime type: `text/plain` (not `application/json` — no schema)
- Reuses the existing rate-limit retry logic from `GeminiGatewayService`

### 9.3 System instruction

```
You are a reflective writing assistant. Your job is to write a personal diary entry on behalf of a music enthusiast, in their voice, in the first person. The entry must start with exactly the words "Dear Diary, today is" followed by the formatted date and then continue naturally. The tone must be: introspective, a little self-deprecating but never cruel, honest about listening habits, never congratulatory or self-praising, gentle but truthful. If no tracks were listened to or added, acknowledge that honestly — maybe the user was indecisive, testing the app, or just not in the mood. The entry must cover four things: (1) the musical mood of the day, (2) an honest critique of their listening habits, (3) the most interesting or revealing request they made, (4) a reflective conclusion for the day. Write as a single flowing paragraph or a few short paragraphs — not as a numbered list.
```

### 9.4 User prompt template

```
Date: {long-form date, e.g. "Wednesday, 12 November 2025"}

Requests made today ({count}):
{numbered list: timestamp - "prompt text" (Mood: mood)}

Tracks added to Clementine ({count}):
{list: Artist – Title}
[or "None" if empty]

Tracks listened to via YouTube ({count}):
{list: Artist – Title}
[or "None" if empty]
```

Example populated prompt:

```
Date: Wednesday, 12 November 2025

Requests made today (3):
1. 14:05 - "melancholy post-rock" (Mood: Noir)
2. 16:20 - "something upbeat for coding" (Mood: Normal)
3. 19:43 - "70s prog rock epics" (Mood: Cosmic)

Tracks added to Clementine (2):
Godspeed You! Black Emperor – The Dead Flag Blues
Mogwai – Like Herod

Tracks listened to via YouTube (1):
King Crimson – Epitaph
```

---

## 10. Backend Service Layer

### 10.1 New files

| File | Description |
|---|---|
| `Models/DiaryDayData.cs` | Record holding prompts (with mood + timestamp), added tracks, and YouTube tracks for a given date |
| `DTOs/DiaryEntryRequest.cs` | `{ Date: string, Force: bool }` — request body for `POST /api/diary/entry` |
| `DTOs/DiaryEntryResponse.cs` | `{ Content: string, IsFromCache: bool, GeneratedAt: string }` — response from both generation and cache hit |
| `Services/IDiaryRepository.cs` | Interface: `GetActiveDatesAsync()`, `GetDayDataAsync(DateOnly)`, `GetEntryAsync(DateOnly)`, `SaveEntryAsync(DateOnly, string)` |
| `Services/DiaryRepository.cs` | SQLite implementation of `IDiaryRepository` |
| `Services/IDiaryService.cs` | Interface: `GetActiveDatesAsync()`, `GetOrGenerateDiaryEntryAsync(DateOnly date, bool force)` |
| `Services/DiaryService.cs` | Orchestrates: check cache → build prompt → call Gemini → save → return |
| `Controllers/DiaryController.cs` | Two thin endpoints wiring `IDiaryService` |

### 10.2 Modified files

| File | Change |
|---|---|
| `Services/SessionHistoryRepository.cs` | Add `diary_entries` table migration in `EnsureCreatedAsync()` |
| `Services/IGeminiGatewayService.cs` | Add `GenerateDiaryEntryAsync` signature |
| `Services/GeminiGatewayService.cs` | Implement `GenerateDiaryEntryAsync` |
| `Program.cs` | Register `IDiaryRepository` → `DiaryRepository`, `IDiaryService` → `DiaryService` as scoped services |

### 10.3 `DiaryService` logic

```
GetOrGenerateDiaryEntryAsync(date, force):
  if force == false:
    entry = await repository.GetEntryAsync(date)
    if entry != null:
      return DiaryEntryResponse { content=entry.content, isFromCache=true, generatedAt=entry.createdAt }
  dayData = await repository.GetDayDataAsync(date)
  prompt = BuildPrompt(date, dayData)
  content = await gemini.GenerateDiaryEntryAsync(prompt, cancellationToken)
  await repository.SaveEntryAsync(date, content)    // INSERT OR REPLACE
  return DiaryEntryResponse { content, isFromCache=false, generatedAt=UtcNow }
```

---

## 11. Frontend Service

New file: `src/client/src/app/core/services/diary.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class DiaryService {
  getActiveDates(): Observable<string[]>
  getOrGenerateEntry(date: string, force: boolean): Observable<DiaryEntryResponse>
}

interface DiaryEntryResponse {
  content: string;
  isFromCache: boolean;
  generatedAt: string;
}
```

`getActiveDates()` calls `GET /api/diary/active-dates`.
`getOrGenerateEntry(date, force)` calls `POST /api/diary/entry` with `{ date, force }` body.

---

## 12. Frontend Component

New feature area: `src/client/src/app/features/diary/`

Component: `musical-diary-modal/musical-diary-modal.component.ts`

### 12.1 Component summary

| Aspect | Detail |
|---|---|
| Type | Standalone component, opened via `MatDialog` |
| Selector | `app-musical-diary-modal` |
| Template file | `musical-diary-modal.component.html` |
| Style file | `musical-diary-modal.component.scss` |

### 12.2 Required Angular Material imports (in `imports` array)

```typescript
MatDialogModule
MatButtonModule
MatIconModule
MatProgressSpinnerModule
MatDatepickerModule
MatNativeDateModule
MatTooltipModule
```

### 12.3 Signals

| Signal | Type | Purpose |
|---|---|---|
| `activeDates` | `Signal<Set<string>>` | Set of YYYY-MM-DD strings with activity |
| `selectedDate` | `WritableSignal<string \| null>` | Currently selected date |
| `diaryContent` | `WritableSignal<string \| null>` | Loaded diary text |
| `diaryGeneratedAt` | `WritableSignal<string \| null>` | ISO timestamp string |
| `loading` | `WritableSignal<boolean>` | True while API call in progress |
| `error` | `WritableSignal<string \| null>` | Error message if generation fails |

### 12.4 Key methods

| Method | Behaviour |
|---|---|
| `ngOnInit()` | Calls `getActiveDates()`, populates `activeDates` signal as `Set<string>` |
| `dateClassFn` | Returns `'diary-date--active'` for past active dates; `'diary-date--today'` for today; `''` otherwise |
| `onDateSelected(date: Date)` | Guards today/future; formats as YYYY-MM-DD; calls `loadEntry(key, false)` |
| `onRegenerate()` | Calls `loadEntry(selectedDate(), true)` |
| `loadEntry(date, force)` | Sets `loading(true)`, clears `error`, calls `getOrGenerateEntry`, sets `diaryContent` + `diaryGeneratedAt`, handles errors |

### 12.5 SCSS considerations

```scss
// Cyan highlight for active past dates
::ng-deep .diary-date--active .mat-calendar-body-cell-content {
  background-color: var(--reco-primary);
  color: var(--reco-on-primary);
  border-radius: 50%;
}

// Charcoal for today (override or complement Material's built-in today circle)
::ng-deep .diary-date--today .mat-calendar-body-cell-content {
  background-color: var(--reco-surface-2);
  border: 2px solid var(--reco-primary);
}

.diary-text-area {
  min-height: 160px;
  overflow-y: auto;
  white-space: pre-wrap;
  font-family: var(--reco-font-body);
  line-height: 1.6;
}
```

`::ng-deep` is required because `mat-calendar` renders cells outside the component's view encapsulation.

---

## 13. Files Changed Summary

| File | Change type |
|---|---|
| `src/server/Reco.Api/Models/DiaryDayData.cs` | New |
| `src/server/Reco.Api/DTOs/DiaryEntryRequest.cs` | New |
| `src/server/Reco.Api/DTOs/DiaryEntryResponse.cs` | New |
| `src/server/Reco.Api/Services/IDiaryRepository.cs` | New |
| `src/server/Reco.Api/Services/DiaryRepository.cs` | New |
| `src/server/Reco.Api/Services/IDiaryService.cs` | New |
| `src/server/Reco.Api/Services/DiaryService.cs` | New |
| `src/server/Reco.Api/Controllers/DiaryController.cs` | New |
| `src/server/Reco.Api/Services/SessionHistoryRepository.cs` | `diary_entries` migration in `EnsureCreatedAsync()` |
| `src/server/Reco.Api/Services/IGeminiGatewayService.cs` | Add `GenerateDiaryEntryAsync` |
| `src/server/Reco.Api/Services/GeminiGatewayService.cs` | Implement `GenerateDiaryEntryAsync` |
| `src/server/Reco.Api/Program.cs` | Register `IDiaryRepository`, `IDiaryService` |
| `src/client/src/app/core/services/diary.service.ts` | New |
| `src/client/src/app/features/diary/musical-diary-modal/musical-diary-modal.component.ts` | New |
| `src/client/src/app/features/diary/musical-diary-modal/musical-diary-modal.component.html` | New |
| `src/client/src/app/features/diary/musical-diary-modal/musical-diary-modal.component.scss` | New |
| `src/client/src/app/features/chat/chat.component.ts` | Add diary button + `openDiary()` method |
| `src/client/src/app/features/chat/chat.component.html` | Add `calendar_month` icon button in header |
| `src/client/src/app/features/chat/chat.component.scss` | Diary button style (if needed) |

---

## 14. Tests

### 14.1 Backend — new test classes

**`DiaryServiceTests.cs`**

| Test | Assertion |
|---|---|
| Cache hit with `force=false` | Returns cached entry without calling Gemini |
| Cache miss with `force=false` | Calls Gemini, saves entry, returns with `isFromCache=false` |
| `force=true` when entry cached | Calls Gemini anyway, overwrites cache, returns `isFromCache=false` |
| Day with no tracks | Prompt contains "None" for both track lists; Gemini is still called |
| Date format in prompt | Long-form date (e.g. "Wednesday, 12 November 2025") is present in the generated prompt |
| `date >= today` | `POST /api/diary/entry` returns `400 Bad Request` |

**`DiaryRepositoryTests.cs`** (integration-style with in-memory or temp SQLite)

| Test | Assertion |
|---|---|
| Active-dates query includes soft-deleted rows (`is_active = 0`) | Dates from evicted sessions appear in the result |
| Today excluded from active dates | A `user-chat` event with today's timestamp does not appear in the result |
| Day data collects `user-chat`, `track-added`, `track-youtube` | All three event types for the given date are returned |
| `SaveEntryAsync` + `GetEntryAsync` round-trip | Written content is returned correctly |
| `SaveEntryAsync` second call overwrites | Only the latest entry is returned |

### 14.2 Frontend — new spec files

**`diary.service.spec.ts`**

| Test | Assertion |
|---|---|
| `getActiveDates()` | Issues `GET /api/diary/active-dates`; returns parsed string array |
| `getOrGenerateEntry(date, false)` | Issues `POST /api/diary/entry` with `{ date, force: false }` |
| `getOrGenerateEntry(date, true)` | Issues `POST /api/diary/entry` with `{ date, force: true }` |

**`musical-diary-modal.component.spec.ts`**

| Test | Assertion |
|---|---|
| Today is not selectable | `onDateSelected` with today's date is a no-op; `loadEntry` not called |
| Future date is not selectable | `onDateSelected` with a future date is a no-op; `loadEntry` not called |
| Active past date click triggers service | `getOrGenerateEntry` called with correct date and `force=false` |
| Regenerate button triggers service | `getOrGenerateEntry` called with `force=true` |
| Loading state shown during generation | `loading` signal is `true` while observable is pending |
| Error state on failure | `error` signal is set; Regenerate button visible |
| Inactive dates not in `activeDates` set | `onDateSelected` is a no-op for dates absent from the set |

---

## 15. Key Design Decisions

### Today excluded from diary
Today is a live session; generating a diary mid-day would produce an incomplete entry and caching it would lock in a partial record. Only closed past days (before today) can produce a diary entry.

### All `session_events` queried without `is_active` filter
The diary reflects all real historical behaviour. FIFO eviction is a memory management mechanism that limits the AI conversation context window — it is not a deletion of the user's history. Soft-deleted rows still represent real events the user took.

### Gemini always used for diary
The diary is a literary writing task, not a music recommendation. Using the currently selected provider would degrade quality when Ollama models are active (they are smaller, faster models tuned for recommendation) and could cause timeouts. Gemini is consistently available and produces prose quality suited to the diary format.

### Single POST endpoint for get-or-generate
A GET (miss) → POST (generate) flow would cause a double round-trip on the first click of every new date. One `POST /api/diary/entry` with `force: false` handles both cache-hit and cache-miss in a single call.

### Date stored as local date (YYYY-MM-DD)
Timestamps in `session_events` are UTC. `DATE(timestamp)` in SQLite uses UTC, which means events near midnight could be assigned to a different calendar day than the user experienced. The frontend is responsible for sending the user's local date; the backend validates that the date is strictly before today (UTC) as a secondary safety check. This is an acceptable pragmatic tradeoff — the vast majority of sessions do not span the UTC midnight boundary.

### Diary entries never auto-deleted
Diary entries accumulate as a permanent record. They are not subject to FIFO eviction, space-based purging, or any other automatic deletion. The user can force regeneration of any entry but cannot delete it via the UI (and the backend has no delete endpoint).

### `MatCalendar.dateClass` uses a pre-loaded `Set<string>`
The `dateClass` function is called once per visible date cell when the calendar renders or navigates. Calling the backend on each invocation would generate dozens of HTTP requests per render cycle. Loading active dates once on modal open and caching them in a `Set<string>` gives O(1) lookup with zero additional network overhead. The set is not mutated after load; if the user regenerates a diary entry the calendar state does not change.

### Forward calendar navigation allowed
Future months are navigable so the user can orient themselves temporally (e.g. "what was I doing around Christmas?"). Future months will simply contain no cyan highlights. There is no `maxDate` restriction on the calendar.
