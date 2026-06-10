# Implementation Plan — Phase 22 Small UI Fixes
## Chat Input Cleanup + Lightbulb Suggestions

**Status:** AWAITING APPROVAL  
**Source requirements:** `docs/requirements/FUNCTIONAL_REQUIREMENTS.md`

---

## Scope

Pure frontend change. No backend migrations, no new API endpoints, no DB schema changes.

**Files touched:**
- `src/client/src/app/features/chat/chat.component.ts`
- `src/client/src/app/features/chat/chat.component.html`
- `src/client/src/app/features/chat/chat.component.scss`

---

## Step 1 — Load all Try: lines into a signal (TypeScript)

**File:** `chat.component.ts`

### 1.1 Replace `tryLineHint` signal with `tryLines` array signal

```ts
// REMOVE:
protected tryLineHint = signal('');

// ADD:
protected tryLines = signal<string[]>([]);
```

### 1.2 Parse all lines in `ngOnInit`

In `ngOnInit`, replace the random-selection block:

```ts
// REMOVE (current):
this.tryLineHint.set(lines[Math.floor(Math.random() * lines.length)]);

// ADD:
this.tryLines.set(
  lines
    .map(l => l.replace(/^Try:\s*"/, '').replace(/"$/, '').trim())
    .filter(l => l.length > 0)
);
```

The regex strips the `Try: "` prefix and the trailing `"` from each line, producing clean suggestion strings.

### 1.3 Remove `isHintPreview` signal

```ts
// REMOVE:
protected isHintPreview = signal(false);
```

### 1.4 Remove `onFocus()` and `onBlur()` handlers (or gut them)

These methods exist solely for hint-preview logic. Remove them entirely from the class.

### 1.5 Simplify `updatePrompt()`

Remove all hint-preview branches. The method becomes:

```ts
protected updatePrompt(event: Event): void {
  this.historyIndex = -1;
  this.prompt.set((event.target as HTMLInputElement).value);
}
```

### 1.6 Fix remaining `isHintPreview` references

Search for all remaining uses of `isHintPreview` in the class (the `onKeydown` handler references `isHintPreview` when handling ArrowUp — check line ~470) and remove or simplify them:

```ts
// In onKeydown ArrowUp handler — REMOVE the isHintPreview guard:
this.currentDraft = this.isHintPreview() ? '' : this.prompt();
// becomes:
this.currentDraft = this.prompt();
```

### 1.7 Add `selectSuggestion()` method

```ts
protected selectSuggestion(text: string): void {
  this.prompt.set(text);
  this.send();
}
```

---

## Step 2 — Update the template (HTML)

**File:** `chat.component.html`

### 2.1 Remove the floating label

```html
<!-- REMOVE this line: -->
<mat-label>Speak your mind if you want to hear me</mat-label>
```

### 2.2 Update placeholder text

```html
<!-- CHANGE placeholder attribute: -->
placeholder="Speak your mind if you want to hear me"
```

### 2.3 Remove `isHintPreview` class binding and event handlers

```html
<!-- CHANGE mat-form-field opening tag from: -->
<mat-form-field class="prompt-field" [class.prompt-field--hint]="isHintPreview()" appearance="outline" subscriptSizing="dynamic">

<!-- TO: -->
<mat-form-field class="prompt-field" appearance="outline" subscriptSizing="dynamic">
```

```html
<!-- REMOVE (focus) and (blur) bindings from the input: -->
(focus)="onFocus($event)"
(blur)="onBlur()"
```

### 2.4 Remove `isHintPreview()` from send button disabled binding

```html
<!-- CHANGE [disabled] on the send button from: -->
[disabled]="!prompt().trim() || loading() || isHintPreview()"

<!-- TO: -->
[disabled]="!prompt().trim() || loading()"
```

### 2.5 Add lightbulb button and MatMenu

Insert **before** the send button, inside `.input-area`:

```html
<!-- Lightbulb suggestion button -->
<button
  mat-icon-button
  [matMenuTriggerFor]="suggestionsMenu"
  [disabled]="loading()"
  aria-label="Browse suggestions"
  class="lightbulb-btn"
>
  <mat-icon>lightbulb</mat-icon>
</button>

<!-- Suggestion dropdown -->
<mat-menu #suggestionsMenu yPosition="above">
  @for (line of tryLines(); track line) {
    <button mat-menu-item (click)="selectSuggestion(line)">{{ line }}</button>
  }
</mat-menu>
```

### 2.6 Add `MatMenu` and `MatMenuModule` imports

In the `@Component` `imports` array (standalone component), add:
- `MatMenuModule` (or `MatMenu`, `MatMenuItem` standalone imports)
- `MatIconButton` is likely already imported; confirm

---

## Step 3 — Update styles (SCSS)

**File:** `chat.component.scss`

### 3.1 Add dim placeholder color to `.input-area`

Inside the `.input-area` rule block, add:

```scss
--mdc-outlined-text-field-input-placeholder-text-color: rgba(255, 255, 255, 0.28);
```

This produces a very dim placeholder consistent with the dark theme. (Adjust opacity to taste — 0.25–0.35 is the target range.)

### 3.2 Remove `.prompt-field--hint` block

```scss
// REMOVE entirely:
&--hint {
  --mdc-outlined-text-field-input-text-color: var(--reco-text-disabled);
}
```

### 3.3 Style the lightbulb button

Add to the `.input-area` block or as a sibling rule:

```scss
.lightbulb-btn {
  color: var(--reco-text-muted);
  flex-shrink: 0;

  &:hover {
    color: var(--reco-primary);
  }
}
```

---

## Step 4 — Verify imports are present

In `chat.component.ts` imports array, confirm or add:
- `MatMenuModule` (from `@angular/material/menu`)

If `MatMenuModule` is already available via a shared module, no change is needed. If standalone imports are used, add `MatMenu` and `MatMenuItem`.

---

## Step 5 — Manual verification checklist

1. **Placeholder text**: Launch the app, focus the chat input — the field shows "Speak your mind if you want to hear me" as dim gray text. No floating label appears above the field.
2. **No hint preview**: Clicking into the empty field no longer injects a ghost Try: line.
3. **Lightbulb opens dropdown**: Click the lightbulb icon — a menu appears above the input bar listing all 11 suggestions (no `Try: "` or trailing `"`).
4. **Suggestion auto-sends**: Clicking a suggestion closes the menu, puts the text in the input, and immediately fires the AI request.
5. **No regression on normal send**: Typing a custom message and pressing Enter or clicking send works as before.
6. **No regression on loading state**: Lightbulb button is disabled while a request is in flight.
7. **Keyboard navigation**: Arrow-up history recall still works (test with a prior message in session).

---

## No backend changes required

This phase touches only the Angular frontend. No API endpoints, migrations, or server-side services are added or modified.
