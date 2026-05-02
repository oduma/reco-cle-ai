# Phase 10 — Progressive Retry & Auto-focus Design

## Purpose

Two targeted UX improvements delivered together:

1. **Progressive retry** — transparent resilience against transient AI overload (HTTP 502).
2. **Auto-focus** — the prompt input is always focused so the user can keep typing without touching the mouse.

---

## Progressive Retry

### Trigger condition

Only HTTP **502 Bad Gateway** is treated as a transient, retryable failure. This status indicates the backend received an error response from the upstream AI provider (Gemini busy, Ollama gateway down), not a logic fault.

Non-retryable statuses — 429 (rate limit), 500 (server error), 400 (bad request), 404, etc. — surface as error banners immediately.

### Retry schedule

| Retry | Delay before attempt |
|-------|---------------------|
| 1st   | 3 s                 |
| 2nd   | 5 s                 |
| 3rd   | 7 s                 |
| 4th   | 10 s                |

Total maximum wait before failure: 25 s + 4 × AI response time.

### Implementation

RxJS `retry` operator with a `delay` callback:

```typescript
private readonly RETRY_DELAYS = [3000, 5000, 7000, 10000];

private isRetryableError(err: unknown): boolean {
  return (err as { status?: number })?.status === 502;
}

// Inside send():
this.recommendationService.getRecommendations(text, this.provider()).pipe(
  retry({
    count: 4,
    delay: (err, retryCount) => {
      if (!this.isRetryableError(err)) return throwError(() => err);
      this.retryNotice.set(`The AI is a bit busy right now… retrying (${retryCount}/4)`);
      return timer(this.RETRY_DELAYS[retryCount - 1]);
    },
  }),
).subscribe({ ... });
```

`retryNotice` is cleared to `null` on both success and final error so the notice does not linger.

### UI — retry notice in loading bubble

The loading bubble (`.message-bubble--loading`) gains a second row below the cycling loading phrase:

```html
<div class="message-bubble message-bubble--loading" role="status" aria-live="polite">
  <div class="loading-row">
    <mat-icon class="loading-icon">music_note</mat-icon>
    <span class="loading-phrase">{{ loadingPhrase() }}</span>
  </div>
  @if (retryNotice()) {
    <span class="retry-notice">{{ retryNotice() }}</span>
  }
</div>
```

The bubble switches from `flex-direction: row` to `flex-direction: column` (with an inner `.loading-row` preserving the icon+phrase horizontal layout).

`.retry-notice` styling:

```scss
.retry-notice {
  font-style: normal;
  font-size: 0.8rem;
  font-weight: 700;
  font-family: var(--reco-font);
  color: var(--reco-warning);
}
```

---

## Auto-focus

### When focus is applied

| Moment | Why |
|--------|-----|
| `ngAfterViewInit` | On initial page load — user can start typing immediately |
| After successful AI response | Conversation continues without mouse intervention |
| After any error (final or immediate) | User can rephrase or retry |

### Implementation

Same deferred-flag pattern as `shouldScroll`:

```typescript
@ViewChild('promptInput') private promptInputRef!: ElementRef<HTMLInputElement>;
private shouldFocusInput = false;

ngAfterViewInit(): void {
  this.focusPromptInput();
}

ngAfterViewChecked(): void {
  if (this.shouldScroll) { this.scrollToBottom(); this.shouldScroll = false; }
  if (this.shouldFocusInput) {
    this.shouldFocusInput = false;
    // Deferred to avoid ExpressionChangedAfterItHasBeenCheckedError when
    // onFocus mutates signals inside the same change-detection cycle.
    setTimeout(() => this.promptInputRef?.nativeElement?.focus(), 0);
  }
}

private focusPromptInput(): void {
  this.shouldFocusInput = true;
}
```

The template adds `#promptInput` to the input element:

```html
<input #promptInput matInput ... />
```

### Why `setTimeout`

Calling `.focus()` synchronously inside `ngAfterViewChecked` fires the `(focus)` event handler (`onFocus`), which sets Angular signals (`isHintPreview`, `prompt`). Changing signals after the view has been checked triggers `NG0100: ExpressionChangedAfterItHasBeenCheckedError`. Deferring with `setTimeout(fn, 0)` pushes the call to the next macrotask, after Angular's current change-detection cycle has completed.

---

## Test impact

| File | Change |
|------|--------|
| `chat.component.spec.ts` | "shows error banner" test changed from `status: 502` to `status: 500` — 502 now triggers retry logic, which would add extra HTTP requests the mock does not expect |

No new tests are added for retry delay timing (requires timer fake infrastructure incompatible with zoneless/Vitest setup) or for auto-focus (DOM focus state is not reliably testable in JSDOM).

---

## Files changed

| File | Change |
|------|--------|
| `src/client/src/app/features/chat/chat.component.ts` | `retry` pipe in `send()`; `retryNotice` signal; `shouldFocusInput` flag; `focusPromptInput()`; `ngAfterViewInit`; `isRetryableError()` |
| `src/client/src/app/features/chat/chat.component.html` | `#promptInput` on input element; `loading-row` wrapper + `retry-notice` in loading bubble |
| `src/client/src/app/features/chat/chat.component.scss` | `&--loading` changed to `flex-direction: column`; added `.loading-row` and `.retry-notice` |
| `src/client/src/app/features/chat/chat.component.spec.ts` | 502 → 500 in error banner test |
