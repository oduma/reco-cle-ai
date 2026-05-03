# Phase 13 — User Changes Their Mind: Design Document

## Overview

Every user message bubble gains a **mood badge** (label + trigger icon) in the top-right corner.
Clicking the icon opens a **mood picker** — a small floating panel positioned near the bubble —
where the user can choose from nine named moods.

Selecting a different mood re-sends the exact same prompt text to the AI with a mood annotation
prepended. A new user bubble (with the chosen mood badge) and a new AI reply are appended at
the end of the conversation. Selecting the current mood closes the picker with no side effects.

Moods are stored in the session database alongside user-chat events and restored during
history hydration. Rows without a mood value are treated as **Normal** everywhere.

---

## 1. Mood Vocabulary

| Value (stored) | Label (displayed) | AI annotation prepended to prompt |
|----------------|-------------------|-----------------------------------|
| `normal` | Normal | *(none — prompt sent as-is)* |
| `poetic` | Poetic | "I'm in a poetic mood — please respond with lyrical, flowing language." |
| `humorous` | Humorous | "I'm feeling playful and humorous — bring some wit to your response." |
| `cosmic` | Cosmic | "I'm in a cosmic mood — think vast, universal, and transcendent." |
| `minimalist` | Minimalist | "I'm in a minimalist mood — keep your response focused and stripped back." |
| `romantic` | Romantic | "I'm feeling romantic — bring warmth, emotion, and longing to your reply." |
| `chaotic` | Chaotic | "I'm in a chaotic mood — be bold, unpredictable, and eclectic." |
| `noir` | Noir | "I'm in a noir mood — keep things dark, brooding, and atmospheric." |
| `psychedelic` | Psychedelic | "I'm in a psychedelic mood — go surreal, swirling, and mind-expanding." |

---

## 2. Prompt Construction

### Without mood (Normal) — no change to existing behaviour
```
{preamble}

My question: {original prompt}
```

### With non-Normal mood
```
{preamble}

{mood annotation}

My question: {original prompt}
```

When there is no session preamble, mood annotation is prepended directly:
```
{mood annotation}

{original prompt}
```

The **original prompt text** (without annotation) is what is stored in `session_events` and
displayed in the chat bubble. The annotation is injected in `RecommendationOrchestrationService`
before the enriched prompt reaches any AI gateway.

---

## 3. Backend Changes

### 3.1 `session_events` schema

Add a nullable `mood` column to the `session_events` table.

```sql
ALTER TABLE session_events ADD COLUMN mood TEXT NULL;
```

This is applied once in `SessionHistoryRepository.EnsureCreatedAsync()` using
`IF NOT EXISTS` guard. Existing rows have `NULL` mood → treated as `'normal'`.

### 3.2 `SessionEvent` model (`Models/SessionEvent.cs`)

```csharp
public record SessionEvent(
    int Id,
    string EventType,
    DateTimeOffset Timestamp,
    string UserLabel,
    string? Content,
    string? Artist,
    string? Album,
    string? Title,
    double? DurationSeconds,
    bool IsActive,
    int? ConversationBlock,
    string? Mood             // new — null means 'normal'
);
```

### 3.3 `ISessionHistoryService` + `SessionHistoryService`

```csharp
Task LogUserChatAsync(string prompt, DateTimeOffset timestamp, string? mood = null);
```

Implementation stores `mood` in the `mood` column when inserting a `user-chat` event.

### 3.4 `SessionHistoryRepository`

- **INSERT** includes the `mood` column for `user-chat` rows.
- **SELECT** for history fetch includes `mood` on `user-chat` rows.
- **Schema migration**: `EnsureCreatedAsync` runs `ALTER TABLE session_events ADD COLUMN mood TEXT NULL`
  guarded so it is safe to call on an existing database.

### 3.5 `HistoryTurnDto` (`DTOs/SessionHistoryResponse.cs`)

```csharp
public record HistoryTurnDto(
    string Role,
    string Text,
    DateTimeOffset Timestamp,
    int EventId,
    bool HasSuggestions,
    string? Mood             // new — null on model turns and on legacy user turns
);
```

### 3.6 `RecommendationRequest` (`DTOs/RecommendationRequest.cs`)

```csharp
public record RecommendationRequest(
    [Required][MinLength(1)] string Prompt,
    string? Provider,
    string? Mood             // new — null / "normal" = no annotation
);
```

### 3.7 `IRecommendationOrchestrationService`

```csharp
Task<RecommendationResponse> GetRecommendationsAsync(
    string prompt,
    string? preferredProvider = null,
    string? mood = null,
    CancellationToken cancellationToken = default);
```

### 3.8 `RecommendationOrchestrationService`

Inject mood annotation after the session preamble, before the user's question:

```csharp
private static readonly IReadOnlyDictionary<string, string> MoodAnnotations =
    new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
    {
        ["poetic"]      = "I'm in a poetic mood — please respond with lyrical, flowing language.",
        ["humorous"]    = "I'm feeling playful and humorous — bring some wit to your response.",
        ["cosmic"]      = "I'm in a cosmic mood — think vast, universal, and transcendent.",
        ["minimalist"]  = "I'm in a minimalist mood — keep your response focused and stripped back.",
        ["romantic"]    = "I'm feeling romantic — bring warmth, emotion, and longing to your reply.",
        ["chaotic"]     = "I'm in a chaotic mood — be bold, unpredictable, and eclectic.",
        ["noir"]        = "I'm in a noir mood — keep things dark, brooding, and atmospheric.",
        ["psychedelic"] = "I'm in a psychedelic mood — go surreal, swirling, and mind-expanding.",
    };

// In GetRecommendationsAsync:
var moodLine = (!string.IsNullOrWhiteSpace(mood) && MoodAnnotations.TryGetValue(mood, out var annotation))
    ? $"{annotation}\n\n"
    : string.Empty;

var enrichedPrompt = sessionContext.Preamble is not null
    ? $"{sessionContext.Preamble}\n\n{moodLine}My question: {prompt}"
    : $"{moodLine}{prompt}";
```

`LogUserChatAsync` is called with the **original prompt** (no annotation) and the `mood` value.

### 3.9 `RecommendationsController`

```csharp
var result = await _orchestration.GetRecommendationsAsync(
    request.Prompt, request.Provider, request.Mood, cancellationToken);
```

---

## 4. Frontend Changes

### 4.1 Mood constants (`core/models/mood.ts` — new file)

```typescript
export type Mood = 'normal' | 'poetic' | 'humorous' | 'cosmic' | 'minimalist'
                 | 'romantic' | 'chaotic' | 'noir' | 'psychedelic';

export const MOODS: { value: Mood; label: string }[] = [
  { value: 'normal',      label: 'Normal'      },
  { value: 'poetic',      label: 'Poetic'      },
  { value: 'humorous',    label: 'Humorous'    },
  { value: 'cosmic',      label: 'Cosmic'      },
  { value: 'minimalist',  label: 'Minimalist'  },
  { value: 'romantic',    label: 'Romantic'    },
  { value: 'chaotic',     label: 'Chaotic'     },
  { value: 'noir',        label: 'Noir'        },
  { value: 'psychedelic', label: 'Psychedelic' },
];
```

### 4.2 `MoodPickerComponent` (new: `features/chat/mood-picker/`)

**Inputs / outputs:**
```typescript
currentMood = input<Mood>('normal');
moodSelected = output<Mood>();
```

**Template structure** — trigger button + `MatMenu`:
```html
<button mat-icon-button class="mood-trigger" [matMenuTriggerFor]="picker"
        aria-label="Change mood">
  <mat-icon>expand_circle_down</mat-icon>
</button>

<mat-menu #picker class="mood-menu" xPosition="before">
  <div class="mood-menu-title" (click)="$event.stopPropagation()">Change my mood</div>
  @for (m of moods; track m.value) {
    <button mat-menu-item class="mood-menu-item"
            [class.mood-menu-item--active]="currentMood() === m.value"
            (click)="select(m.value)">
      <mat-icon class="mood-check">{{ currentMood() === m.value ? 'check' : '' }}</mat-icon>
      {{ m.label }}
    </button>
  }
</mat-menu>
```

**`select(mood)` method:**
```typescript
select(mood: Mood): void {
  this.moodSelected.emit(mood);
}
```

The parent (`ChatComponent`) handles the same-mood-no-op check so the component stays simple.

**Styling** — dark floating card, matches Reasonic theme:
```scss
// Host: inline-flex so it sits snug next to the label
:host { display: inline-flex; align-items: center; }

.mood-trigger {
  width: 18px; height: 18px;
  --mdc-icon-button-state-layer-size: 18px;
  --mdc-icon-button-icon-size: 14px;
  color: rgba(255,255,255,0.7);
  &:hover { color: #fff; }
}

// Panel override via ViewEncapsulation.None + ::ng-deep or panelClass
::ng-deep .mood-menu {
  background: var(--reco-surface-1);
  border: 1px solid var(--reco-border);
  border-radius: 10px;
  min-width: 160px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);

  .mood-menu-title {
    padding: 8px 14px 4px;
    font-family: var(--reco-font);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--reco-text-muted);
    pointer-events: none;
  }

  .mood-menu-item {
    font-family: var(--reco-font);
    font-size: 0.82rem;
    color: var(--reco-text);
    &--active {
      color: var(--reco-accent);
      font-weight: 600;
    }
    .mood-check { font-size: 14px; width: 14px; height: 14px; margin-right: 6px; }
  }
}
```

### 4.3 `Message` interface (`chat.component.ts`)

```typescript
interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  eventId?: number;
  hasSuggestions?: boolean;
  mood?: Mood;               // new — undefined = 'normal'
}
```

### 4.4 `ChatComponent` logic

**Refactor `send()`** into two parts:
- `send()` — public, reads from `prompt()` signal, mood = `'normal'`, same as before
- `resendWithMood(originalText: string, mood: Mood)` — called from template when picker selects
- `_executeRequest(displayText: string, promptForAI: string, mood: Mood)` — shared private core
  (adds user bubble, calls service, handles retry/error, adds AI bubble)

**`onMoodSelected(mood: Mood, msg: Message)`** — called from template:
```typescript
protected onMoodSelected(mood: Mood, msg: Message): void {
  if (mood === (msg.mood ?? 'normal')) return;
  this.resendWithMood(msg.text, mood);
}
```

**`resendWithMood`**:
```typescript
protected resendWithMood(originalText: string, mood: Mood): void {
  if (this.loading()) return;
  // mood != 'normal' — the mood annotation is applied server-side
  // we pass mood in the request body; display text is always the original
  this._executeRequest(originalText, originalText, mood);
}
```

The `mood` field is passed to `RecommendationService.getRecommendations()` which puts it in the request body. Server handles the annotation.

**History hydration** — map `turn.mood` from `HistoryTurnDto`:
```typescript
this.messages.set(history.turns.map(t => ({
  role: t.role,
  text: t.text,
  timestamp: new Date(t.timestamp),
  eventId: t.eventId,
  hasSuggestions: t.hasSuggestions,
  mood: (t.mood ?? 'normal') as Mood,
})));
```

### 4.5 `chat.component.html` — user bubble changes

```html
<div class="message-bubble">
  <div class="mood-badge">
    <span class="mood-label">{{ msg.mood ?? 'Normal' | titlecase }}</span>
    <app-mood-picker
      [currentMood]="msg.mood ?? 'normal'"
      (moodSelected)="onMoodSelected($event, msg)" />
  </div>
  <span>{{ msg.text }}</span>
  <span class="message-time">{{ formatMessageTime(msg.timestamp) }}</span>
</div>
```

### 4.6 `chat.component.scss` — mood badge styles

```scss
// Extra padding on user bubbles to make room for the badge
.message--user .message-bubble {
  padding-top: 22px;
}

.mood-badge {
  position: absolute;
  top: 4px;
  right: 6px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.mood-label {
  font-family: var(--reco-font);
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
}
```

### 4.7 `RecommendationService`

```typescript
getRecommendations(
  prompt: string,
  provider: Provider,
  mood: string = 'normal'
): Observable<RecommendationResponse> {
  return this.http.post<RecommendationResponse>(
    '/api/recommendations',
    { prompt, provider, mood }
  );
}
```

---

## 5. Files Changed

| File | Change |
|------|--------|
| `src/server/Reco.Api/Models/SessionEvent.cs` | Add `Mood` property |
| `src/server/Reco.Api/DTOs/RecommendationRequest.cs` | Add `Mood` field |
| `src/server/Reco.Api/DTOs/SessionHistoryResponse.cs` | Add `Mood` to `HistoryTurnDto` |
| `src/server/Reco.Api/Services/ISessionHistoryService.cs` | Add `mood` param to `LogUserChatAsync` |
| `src/server/Reco.Api/Services/SessionHistoryService.cs` | Pass mood through to repository |
| `src/server/Reco.Api/Services/SessionHistoryRepository.cs` | Schema migration, mood in INSERT/SELECT |
| `src/server/Reco.Api/Services/IRecommendationOrchestrationService.cs` | Add `mood` param |
| `src/server/Reco.Api/Services/RecommendationOrchestrationService.cs` | Mood annotation injection, log mood |
| `src/server/Reco.Api/Controllers/RecommendationsController.cs` | Pass `request.Mood` |
| `src/client/src/app/core/models/mood.ts` | New — `Mood` type + `MOODS` constant |
| `src/client/src/app/core/services/recommendation.service.ts` | Add `mood` parameter |
| `src/client/src/app/features/chat/mood-picker/mood-picker.component.ts` | New |
| `src/client/src/app/features/chat/mood-picker/mood-picker.component.html` | New |
| `src/client/src/app/features/chat/mood-picker/mood-picker.component.scss` | New |
| `src/client/src/app/features/chat/chat.component.ts` | Message interface, send refactor, mood logic |
| `src/client/src/app/features/chat/chat.component.html` | Mood badge on user bubbles |
| `src/client/src/app/features/chat/chat.component.scss` | Mood badge styles |

---

## 6. Tests

### Backend
- `ProviderRoutingTests.cs` — update `BuildService()` for new `GetRecommendationsAsync` signature
- `SessionContextBuilderTests.cs` — add test: mood annotation appears in enriched prompt for non-Normal moods
- New `MoodAnnotationTests.cs` — unit tests for each mood → correct annotation string; Normal → no annotation; unknown value → no annotation

### Frontend
- New `mood-picker.component.spec.ts` — test: emits on selection, does NOT emit on same mood, current mood receives active class
- `chat.component.spec.ts` — test: mood badge appears on user bubbles; `onMoodSelected` with same mood does nothing; `onMoodSelected` with different mood adds new message

---

## 7. Key Design Decisions

- **No-op on same mood is frontend-only** — the picker emits all selections; `ChatComponent.onMoodSelected()` does the same-mood guard. This keeps `MoodPickerComponent` stateless.
- **Original prompt stored, annotation is ephemeral** — session DB stores only the original user text + mood value. Annotation is reconstructed on every request. This keeps the history clean and allows annotation wording to change without DB migration.
- **`Normal` mood sends no annotation** — plain request, identical to current behaviour. Fully backward-compatible.
- **Mood picker on all bubbles** — the icon appears on every historical user bubble. Re-sends append to the end of the conversation; nothing is truncated or replaced.
- **Schema migration is additive** — `ALTER TABLE … ADD COLUMN mood TEXT NULL` only adds; never modifies existing rows. Safe on first startup after upgrade.
