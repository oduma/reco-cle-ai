# Phase 12 — UI Polish: Design Document

## Overview

Phase 12 delivers eight targeted UX and visual improvements to Reasonic with no new AI features.

---

## 1. Moveable Split-Pane Divider

### Goal
Replace the static 40/60 split with a user-draggable divider. The card grid reflows as the right pane resizes.

### Implementation

**`chat.component.ts`**
- `splitPercent = signal(40)` — current chat-pane width as a percentage
- `dragging = signal(false)` — drag-in-progress flag
- `containerWidth: number` — cached from `@ViewChild('splitContainer')`
- `onDividerMousedown(event)` — sets `dragging = true`, caches container width
- `@HostListener('document:mousemove', ['$event']) onMouseMove(event)` — updates `splitPercent`, clamped to `[minPct, maxPct]`
- `@HostListener('document:mouseup') onMouseUp()` — clears `dragging`
- `minPct = 25` (constant)
- `maxPct` — computed: `(containerWidth - ONE_CARD_MIN_PX) / containerWidth * 100`, where `ONE_CARD_MIN_PX = 220`

**`chat.component.html`**
```html
<div class="split-layout" #splitContainer>
  <section class="pane pane--chat" [style.flex-basis.%]="splitPercent()">
  <div class="split-divider" (mousedown)="onDividerMousedown($event)"></div>
  <section class="pane pane--reco">
```

**`chat.component.scss`**
```scss
.split-divider {
  width: 5px;
  flex-shrink: 0;
  cursor: col-resize;
  background: var(--reco-border);
  &:hover { background: var(--reco-primary); }
}
.pane--chat { flex: 0 0 auto; }
.pane--reco { flex: 1 1 0; min-width: 220px; }
```

**`suggestions-panel.component.scss`** (card grid)
```scss
.suggestions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
```

---

## 2. Gradient "Reasonic" Title

### Implementation

**`chat.component.scss`**
```scss
.chat-title {
  background: linear-gradient(90deg, var(--reco-info), var(--reco-accent));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
```

No template or TypeScript change needed.

---

## 3. Magenta VU Meter

### Implementation

**`suggestion-card.component.scss`**
```scss
.music-bar {
  background: var(--reco-accent);
}
```

No logic change needed.

---

## 4. Provider Model Icons

### Files
- `public/icons/llama3-logo.png` — copy from `z-ai-comm/llama3-logo.png`
- `public/icons/gemma4.png` — copy from `z-ai-comm/gemma4.png`

### Template change (`chat.component.html`)
```html
<mat-button-toggle value="inner-whisper">
  <img src="/icons/llama3-logo.png" class="provider-icon" alt="" aria-hidden="true" />
  Inner Whisper
</mat-button-toggle>
<mat-button-toggle value="inner-shout">
  <img src="/icons/gemma4.png" class="provider-icon" alt="" aria-hidden="true" />
  Inner Shout
</mat-button-toggle>
```

---

## 5. Double-Click Prevention on Add-to-Clementine Buttons

### Per-card button (`suggestion-card.component.ts`)
- `addingToClementine = signal(false)` — replaces any existing loading flag
- On click: `addingToClementine.set(true)` → call service → in `finalize()`: `setTimeout(() => addingToClementine.set(false), 1000)`
- `[disabled]="addingToClementine()"` on the button

### Panel "Add all" button (`suggestions-panel.component.ts`)
- Same pattern: `addingAll = signal(false)`, 1-second re-enable after observable completes

---

## 6. No-Clementine Mode — No Dimming, Hide Buttons

### Signal derivation (`chat.component.ts`)
```typescript
protected clementineUnavailable = computed(() =>
  this.suggestionsMessage()?.toLowerCase().includes('clementine') === true &&
  this.suggestionsMessage()?.toLowerCase().includes('unavailable') === true
);
```

The server already sends a `message` value when Clementine is absent (e.g. `"Clementine library unavailable — showing web suggestions only"`). No new API surface needed.

### Propagation
```
ChatComponent [clementineUnavailable] → SuggestionsPanelComponent @Input() → SuggestionCardComponent @Input()
```

### Card template changes (`suggestion-card.component.html`)
- Remove `[class.tile--discovery]` when `clementineUnavailable` is true
- Wrap all Clementine action buttons in `@if (!clementineUnavailable)`

---

## 7. Consistent Card Heights

### Implementation (`suggestion-card.component.scss`)
```scss
:host { display: flex; flex-direction: column; height: 100%; }
.tile { height: 100%; display: flex; flex-direction: column; }
.track-info { flex: 1; }
```

The suggestions-panel grid already uses `align-items: stretch` (CSS Grid default), so this is sufficient.

---

## 8. Chat Text Styling — Courier Font + Cyan / Red

### Affected elements (chat pane only)
- `.message-bubble--loading` — loading bubble container
- `.loading-phrase` — cycling text inside loading bubble
- `.retry-notice` — retry attempt counter inside loading bubble
- `.error-banner` inside the chat pane

### Colour decisions (confirmed by user)
- Loading phrase: `var(--reco-info)` (cyan)
- Retry notice: `var(--reco-info)` (cyan) — was `var(--reco-warning)` (amber)
- Error banner text: `var(--reco-error)` (red) — unchanged
- Error banner uses Courier font

### Scope boundary
`.error-banner` inside `suggestions-panel` is **not** affected. The style is scoped to `chat.component.scss`.

### Implementation (`chat.component.scss`)
```scss
.message-bubble--loading {
  font-family: var(--reco-font-bubble); // Courier
}
.loading-phrase {
  color: var(--reco-info);
  font-family: var(--reco-font-bubble);
}
.retry-notice {
  color: var(--reco-info); // was var(--reco-warning)
  font-family: var(--reco-font-bubble);
}
.error-banner {
  font-family: var(--reco-font-bubble);
}
```

---

## Files Changed

| File | Change |
|------|--------|
| `src/client/src/app/features/chat/chat.component.ts` | `splitPercent`, `dragging`, drag HostListeners, `clementineUnavailable` computed |
| `src/client/src/app/features/chat/chat.component.html` | Divider element, provider icons, pass `clementineUnavailable` to panel |
| `src/client/src/app/features/chat/chat.component.scss` | Divider styles, gradient title, loading/error font + colour changes |
| `src/client/src/app/features/chat/suggestions-panel/suggestions-panel.component.ts` | `clementineUnavailable @Input()`, `addingAll` signal, double-click lock |
| `src/client/src/app/features/chat/suggestions-panel/suggestions-panel.component.html` | Pass input to cards, disable Add-all button |
| `src/client/src/app/features/chat/suggestions-panel/suggestion-card/suggestion-card.component.ts` | `clementineUnavailable @Input()`, `addingToClementine` signal, double-click lock |
| `src/client/src/app/features/chat/suggestions-panel/suggestion-card/suggestion-card.component.html` | Conditional dimming, hide Clementine buttons, disable on click |
| `src/client/src/app/features/chat/suggestions-panel/suggestion-card/suggestion-card.component.scss` | Card height, VU meter colour |
| `src/client/src/app/features/chat/suggestions-panel/suggestions-panel.component.scss` | `auto-fill` grid |
| `public/icons/llama3-logo.png` | New asset |
| `public/icons/gemma4.png` | New asset |

## Tests to Update

- `chat.component.spec.ts` — add tests for `clementineUnavailable` derivation
- `suggestion-card.component.spec.ts` — add tests for double-click lock and no-Clementine mode
- `suggestions-panel.component.spec.ts` — add test for Add-all double-click lock
