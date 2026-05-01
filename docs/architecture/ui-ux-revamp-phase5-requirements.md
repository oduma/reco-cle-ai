# UI/UX Revamp — Phase 5 Requirements
## Personal Music Discovery Web App

---

## 1. Overview

Phase 5 is a full visual and structural redesign of the application. It replaces the current single-column Angular Material card layout with a split-pane design, introduces album art from Last.fm, redesigns the model selector, and applies a new typographic and color system throughout.

All existing actions (add to Clementine, copy to clipboard, YouTube link, add all local) are preserved and integrated into the new tile design. No functionality is removed.

---

## 2. New Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `LASTFM_API_KEY` | Last.fm API read key for album art lookups | — (required) |
| `LASTFM_BASE_URL` | Last.fm API base URL | `https://ws.audioscrobbler.com/2.0/` |

---

## 3. Backend Changes

### 3.1 Last.fm Album Art Service

A new backend service `LastFmGatewayService` fetches album art for each track suggestion.

**Lookup strategy (in order):**

1. Call `album.getInfo` with `artist` + `album` (where album is known).
2. If album is null or `album.getInfo` returns no image, call `track.getInfo` with `artist` + `track`.
3. If neither returns an image, return `null` (frontend renders placeholder).

**Image size:** request `extralarge` (300×300). Fall back to `large` if `extralarge` is absent.

**Caching:** cache results in-memory per `(artist, title)` key for the lifetime of the process. Last.fm art does not change frequently; re-fetching on every request wastes quota unnecessarily.

**Error handling:** a failed or rate-limited Last.fm call must not block or fail the recommendation response. Log the error, return `null` for that track's art, and let the frontend show the placeholder.

**Configuration:** `LASTFM_API_KEY` (required), `LASTFM_BASE_URL` (optional, defaults to production endpoint).

### 3.2 TrackSuggestion DTO update

Add one optional field to the existing `TrackSuggestion` C# DTO and Angular interface:

```
albumArtUrl?: string | null
```

This carries the absolute HTTPS URL returned by Last.fm, or `null` when art is unavailable.

### 3.3 Recommendation orchestration update

`RecommendationOrchestrationService` calls `LastFmGatewayService` after the local-library matching step, enriching each `TrackSuggestion` with its `albumArtUrl` before the response is returned. Art fetches for all tracks in a response batch should be issued concurrently (parallel `Task.WhenAll`), not sequentially.

---

## 4. Frontend Asset Requirements

The following SVG files must be placed in `src/client/src/assets/icons/`:

| File | Description |
|---|---|
| `clementine.svg` | Clementine player logo, monochrome or full-color |
| `youtube.svg` | YouTube play button icon (red) |
| `gemini.svg` | Google Gemini multicolor star logo |

SVGs must be inline-compatible (no external references, no `<script>` tags). They will be used as `<img>` elements or Angular `NgOptimizedImage` sources scaled to fit their context.

---

## 5. Typography

### 5.1 Font

Primary font: **Inter** (Google Fonts).
Fallback chain: `'Inter', 'IBM Plex Sans', system-ui, sans-serif`.

Import in `src/client/src/styles.scss`:
```scss
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
```

Apply globally:
```scss
body { font-family: 'Inter', 'IBM Plex Sans', system-ui, sans-serif; }
```

### 5.2 Scale

| Context | Size | Weight |
|---|---|---|
| Conversation messages | 16px | 400 |
| Track titles | 14px | 700 |
| Artist names | 12px | 400 |
| Model selector labels | 14px | uppercase, 500 (active: 700) |
| Panel header labels | 12px | uppercase, 500, letter-spacing 0.06em |
| Snackbar / feedback | 14px | 400 |

---

## 6. Color System

### 6.1 Core palette

| Token | Value | Used for |
|---|---|---|
| `--color-local` | `#4CC7C7` (cyan) | Local track borders, icons, active accents |
| `--color-discovery` | `#D46FB0` (magenta) | Discovery track borders, icons |
| `--color-neutral` | `#EAEAEA` | Placeholder backgrounds, dividers |
| `--color-surface` | `#FFFFFF` | Conversation pane background |
| `--color-bubble-user` | `#F5F5F5` | User message bubbles |
| `--color-bubble-ai` | `#EAEAEA` | AI message bubbles |
| `--color-text-primary` | `#1A1A1A` | All primary text |

### 6.2 Applying tokens

CSS custom properties are set on `:root` in `styles.scss`. Components reference `var(--color-local)` etc. rather than hardcoded hex values.

---

## 7. Layout

### 7.1 Split pane

The root app layout is a horizontal flex container divided into two panes:

| Pane | Width | Content |
|---|---|---|
| Left | 40% | Conversation |
| Right | 60% | Recommendations |

Both panes are full viewport height with independent scroll.

### 7.2 Responsive breakpoint

Below `768px` (mobile): the two panes stack vertically. Recommendations pane moves above the conversation pane (matches the current mental model where suggestions appear first).

```scss
@media (max-width: 768px) {
  .app-layout { flex-direction: column; }
  .pane--recommendations { width: 100%; }
  .pane--conversation { width: 100%; }
}
```

### 7.3 Visual separation

A single `1px` border using `--mat-sys-outline-variant` separates the two panes on desktop. On mobile the recommendations pane has a bottom border of the same style.

---

## 8. Model Selector Component

### 8.1 Labels

| Provider | Label |
|---|---|
| Local LLM (Ollama) | **Inner Voice** |
| Gemini (Google) | **Cosmic Voice** |

### 8.2 Visual design

- A compact toggle strip, sitting in the conversation pane header.
- Each option is a pill/chip with its label and provider icon.
- **Active** option: bold label, opaque background, icon at full opacity.
- **Inactive** option: regular weight, transparent background, icon at 50% opacity.
- Gemini icon: `gemini.svg` scaled to the current line height (approx 18–20px).
- Inner Voice icon: `mat-icon` `memory` or a simple waveform SVG scaled to match.
- No toggle rail — just adjacent pills with active/inactive state.

### 8.3 Behavior

Unchanged from the current implementation: selection is persisted in `localStorage`, sent with every request, and respected by the backend. The fallback-to-Gemini chip behavior when Ollama is unavailable is unchanged.

---

## 9. Conversation Pane

### 9.1 Header

Contains:
- App title (left-aligned)
- Model selector (right-aligned in the same header bar)

### 9.2 Message bubbles

- Rounded corners: `border-radius: 16px`.
- User bubble: background `var(--color-bubble-user)`, aligned right.
- AI bubble: background `var(--color-bubble-ai)`, aligned left.
- Minimal box shadow: `0 1px 2px rgba(0,0,0,0.06)`.
- No avatar icons.
- Text color: `var(--color-text-primary)`, 16px, 400 weight.

### 9.3 Input area

- Sticky to the bottom of the conversation pane.
- Full-width text field, placeholder `"Type a message…"`.
- Trailing microphone icon button (decorative only in Phase 5 — no voice functionality).
- Send button (icon or text), disabled when input is empty or loading is in progress.

### 9.4 Background

Conversation pane background: `var(--color-surface)` (`#FFFFFF`).

---

## 10. Recommendation Pane

### 10.1 Header

- Label: `"Suggested Tracks"` (12px uppercase, using panel-header style).
- Animated equalizer bars during loading (existing behavior, preserved).
- **"Add N to Clementine"** stroked button (existing behavior, preserved), visible only when local tracks with file paths are present.

### 10.2 Grid layout

On desktop (≥ 768px): **2 rows × 4 columns** using CSS Grid.

```scss
.track-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  gap: 12px;
  padding: 12px;
}
```

On mobile (< 768px): single column, vertical stack.

> Note: the current layout uses a horizontal scrolling flex row. Phase 5 replaces this with a grid. If the AI returns fewer than 8 tracks, empty grid cells are not rendered (grid auto-fills from items).

### 10.3 Track tile

Each tile is a self-contained card with this internal layout:

```
┌──────────────────────────────┐
│  [ Album Art — square ]  [X] │  ← X = action icon top-right
│  [copy icon bottom-left]     │
├──────────────────────────────┤
│  Track Title (14px bold)     │
│  Artist Name (12px regular)  │
└──────────────────────────────┘
```

**Bottom border color:**
- Local track: `2px solid var(--color-local)` (`#4CC7C7`)
- Discovery track: `2px solid var(--color-discovery)` (`#D46FB0`)

#### Album art

- Square, fills the full tile width.
- Source: `albumArtUrl` from the API response (Last.fm).
- Fallback (when `albumArtUrl` is null): a placeholder — colored block with a centered `music_note` mat-icon. Color matches the tile type (cyan for local, magenta for discovery) at 20% opacity.
- `object-fit: cover` to prevent distortion.

#### Action icon (top-right corner of album art)

Positioned absolutely over the top-right corner of the album art area.

| Track type | Icon | Behavior |
|---|---|---|
| Discovery | `youtube.svg` | Opens `https://www.youtube.com/results?search_query=Artist+Title` in a new tab |
| Local | `clementine.svg` with `add` or `add_circle` mat-icon overlaid | Calls `POST /api/clementine/add` with `{ filePaths: [filePath] }` |

The action icon is always visible (not just on hover) but at reduced opacity (0.75), reaching full opacity on hover.

#### Copy icon (bottom-left corner of album art, local tracks only)

Positioned absolutely over the bottom-left corner of the album art area. Local tracks only.

- Icon: `content_copy` (mat-icon), small (16px).
- Color: `var(--color-local)`.
- Opacity: 0.6 at rest, 1.0 on hover.
- Calls `navigator.clipboard.writeText("Artist – Title")` and shows a snackbar confirmation.
- Does **not** overlap the track title/artist text below.

#### Hover state

- Transform: `scale(1.05)` on `.track-tile:hover`.
- Box shadow: `0 4px 16px rgba(0,0,0,0.18)` on hover.
- Transition: `transform 0.18s ease, box-shadow 0.18s ease`.
- Action icon fades from 0.75 → 1.0 opacity.

---

## 11. Acceptance Criteria

### Layout
- [ ] Conversation and recommendation panes are visually distinct, side by side on desktop.
- [ ] Panes stack vertically on mobile (≤ 768px), recommendations above.
- [ ] Both panes scroll independently.

### Model selector
- [ ] "Inner Voice" and "Cosmic Voice" labels replace "Local" / "Gemini".
- [ ] Active model is displayed in bold.
- [ ] Gemini logo (`gemini.svg`) is aligned to text height.
- [ ] Selection persists across page reload.

### Conversation pane
- [ ] User and AI messages are visually distinct bubbles.
- [ ] Colors match specification (`#F5F5F5` user, `#EAEAEA` AI).
- [ ] Input field shows placeholder `"Type a message…"`.
- [ ] Microphone icon is present (decorative).

### Recommendation tiles
- [ ] Grid renders 2 rows × 4 columns on desktop.
- [ ] Album art appears from Last.fm, or placeholder if unavailable.
- [ ] Local tiles have cyan (`#4CC7C7`) bottom border.
- [ ] Discovery tiles have magenta (`#D46FB0`) bottom border.
- [ ] Discovery tiles show YouTube icon top-right; clicking opens YouTube in a new tab.
- [ ] Local tiles show Clementine icon top-right; clicking calls `POST /api/clementine/add`.
- [ ] Local tiles show copy icon bottom-left of art; clicking copies `"Artist – Title"` to clipboard.
- [ ] Hover produces scale + shadow + icon opacity transition.

### Album art
- [ ] `albumArtUrl` field is present in the API response for every track.
- [ ] Art is fetched from Last.fm via backend; frontend never calls Last.fm directly.
- [ ] A placeholder is shown when `albumArtUrl` is `null`.
- [ ] A Last.fm failure does not block the recommendation response.

### Add all
- [ ] "Add N to Clementine" button appears in the recommendations header when local tracks with file paths exist.
- [ ] Clicking it adds all local tracks to the Clementine playlist in a single call.

---

## 12. Out of Scope for Phase 5

- Voice input (microphone icon is decorative only).
- Persistent user preferences beyond `localStorage`.
- Dark mode.
- Animation beyond hover states.
- Any change to recommendation logic, AI providers, or local matching.
