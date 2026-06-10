# Functional Requirements — Phase 22: Small UI Fixes (Chat Input Cleanup + Lightbulb Suggestions)

> **STATUS: PLANNED**

---

## Overview

Two focused UI improvements to the chat input area:

1. Simplify the chat box to show only a single dim-gray placeholder string, removing the floating `mat-label`.
2. Add a lightbulb icon button that exposes all "Try:" suggestion lines as a clickable dropdown; selecting one populates the input and immediately sends it to the AI.

---

## FR-1: Simplified Placeholder Text

### FR-1.1 Remove the floating label
- The `<mat-label>` element ("Speak your mind if you want to hear me") inside the chat `mat-form-field` is **removed entirely**.
- The Material outlined text field no longer has a floating label. The field border will not show an interrupted notch when active.

### FR-1.2 Placeholder text content
- The `placeholder` attribute on the `<input>` is set to:
  > **"Speak your mind if you want to hear me"**
- This text is visible only when the field is empty and unfocused.

### FR-1.3 Placeholder color
- The placeholder text is styled in **very dim gray** — approximately 30–35% opacity of the normal input text color.
- Implemented via the MDC CSS custom property `--mdc-outlined-text-field-input-placeholder-text-color` scoped to the `.input-area` container.

---

## FR-2: Remove Hint-Preview Behavior

The existing "hint preview" feature (showing a random Try: line as ghost text when the input is focused and empty) is **removed**.

### FR-2.1 Signal cleanup
- The `isHintPreview` signal is removed.
- The `tryLineHint` signal (a single randomly chosen line) is replaced by a `tryLines` signal that holds the full array of all parsed suggestion strings.

### FR-2.2 Handler cleanup
- `onFocus()` and `onBlur()` handlers that operated on `isHintPreview` / `tryLineHint` are removed.
- `updatePrompt()` is simplified to only track the typed value — no hint-injection or hint-clearing logic.
- The `isHintPreview()` guard is removed from the send button's `[disabled]` binding.
- The `.prompt-field--hint` CSS modifier class and its binding are removed.

---

## FR-3: Lightbulb Suggestion Button

### FR-3.1 Button placement
- A new **lightbulb icon button** appears in the `.input-area` row, **to the left of the existing send button** (between the text field and the send FAB).
- Uses `mat-icon-button` with the `lightbulb` Material icon.
- The button is **disabled while loading** (same condition as the send button).

### FR-3.2 Dropdown menu
- Clicking the lightbulb opens an **Angular Material `MatMenu`** anchored below the button (`yPosition="above"` so it opens upward above the input bar).
- The menu lists **all** suggestion lines loaded from `public/trylines.txt` (all 11 lines).
- Each menu item displays only the **suggestion text**, with the `Try: "` prefix and the closing `"` stripped — e.g.:
  - Raw: `Try: "I have a glass of champagne…"`
  - Displayed: `I have a glass of champagne…`

### FR-3.3 Menu item presentation
- Each item uses `mat-menu-item`.
- Items are visually consistent with the app's dark theme (no special per-item theming required).
- The menu scrolls if the viewport is short enough that all items don't fit.

---

## FR-4: Auto-Send on Suggestion Selection

When the user clicks a suggestion item:

1. The dropdown closes immediately.
2. The stripped suggestion text is set as the prompt value.
3. `send()` is called programmatically — the message is dispatched to the AI without the user needing to press Send or Enter.

The auto-send must respect the same guards as a normal send (i.e. not fire if `loading()` is true). In practice the lightbulb button is disabled during loading so this state is unreachable, but the implementation must not bypass the guard.

---

## Out of Scope for This Phase

- Changes to `trylines.txt` content.
- Changes to the empty-state hint text displayed above the chat input.
- Changes to any server-side behavior.
- Changes to the send button icon or behavior beyond removing the `isHintPreview` guard.

---

## Previous Phases

| Phase | Status |
|---|---|
| Phase 21: Variable Prompts | COMPLETED — migrations `20260603000001` / `20260603000002` |
| Phase 22: Automatic Response Format Appendix | COMPLETED — migration `20260603000003` |
| Phase 22 (this): Small UI Fixes | PLANNED |
