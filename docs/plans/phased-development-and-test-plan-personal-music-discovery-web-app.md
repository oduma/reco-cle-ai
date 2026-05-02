# Incremental Development & Test Plan — Personal Music Discovery Web App

## 1. Purpose

This document defines a **phased development plan** for the Personal Music Discovery Web App so that the application can be **tested continuously as it is being built**.

The plan is intentionally incremental:

- each phase delivers a **working, testable application**,
- each phase adds one major capability,
- and each phase ends with a **correction/stabilization loop** before moving on.

This plan assumes the current technical direction:

- **Frontend:** Angular + Angular Material
- **Backend:** ASP.NET Core Web API
- **Initial AI interaction:** Gemini-backed conversational flow
- **Later retrieval:** web-based music suggestions
- **Final grounding:** Clementine local database filtering

---

## 2. Core Delivery Principle

The app should be built in **vertical slices**, not in isolated technical layers.

That means each phase should produce:

1. a usable UI,
2. the backend endpoints needed for that UI,
3. enough logic to demonstrate the feature end-to-end,
4. a test checklist,
5. and a short correction cycle before phase completion.

### Why this approach is important

This avoids a situation where:
- the frontend is “mostly done” but unusable,
- or the backend is “mostly done” but untestable,
- or the AI/retrieval logic exists but cannot be validated from a real user flow.

Instead, every phase should end with something you can actually **run, click, observe, and correct**.

---

## 3. Phase Overview

## Phase 1 — Chat-Only AI Prototype

### Goal
Deliver a minimal web app where you can:
- open the app,
- type into a chat window,
- send prompts to the AI,
- and receive responses back in a basic conversation flow.

### Main user value
You can validate:
- the overall feel of the app,
- the AI chat behavior,
- conversation handling,
- and whether the stack wiring is correct.

---

## Phase 2 — Web Suggestions Above the Chat

### Goal
Extend the app so the AI returns:
- a normal chat response,
- and above the chat a **structured list of music suggestions from the web**.

### Main user value
You can validate:
- whether the web retrieval is useful,
- whether the suggested items make sense,
- whether the UI layout works,
- and whether the recommendation flow begins to feel like a discovery tool rather than just a chatbot.

---

## Phase 3 — Clementine Local Filtering

### Goal
Extend the app so the suggestions are filtered or grounded against your **local Clementine library**, using the Clementine database.

### Main user value
You can validate:
- whether the app can move from “interesting things on the web” to
- “interesting things that I actually own locally”.

This is the point where the product becomes meaningfully personal.

---

## Phase 4 — Local Track Actions

### Goal
Add per-card actions for local tracks: a copy-to-clipboard button and an "Add to Clementine playlist" button using the `clementine -a <path>` CLI. Also add a panel-level "Add all local tracks" button. Both actions are permanent features of the app.

### Main user value
With one click the user can either copy the track name or queue it directly in the running Clementine player, without leaving the app.

---

## Phase 5 — UI/UX Revamp + Album Art

### Goal
Redesign the full application UI: split-pane layout, redesigned model selector ("Inner Voice" / "Cosmic Voice"), new conversation bubble design, recommendation grid (2×4) with album art from Last.fm, and updated color/typography system. Existing actions are retained in the new tile design.

### Main user value
The app goes from a functional prototype to a polished, visually coherent product. Album art makes the recommendation pane scannable and immediately meaningful. The split-pane layout gives both conversation and recommendations the space they need.

---

## Phase 6 — Reasonic Brand Identity

### Goal
Apply the Reasonic brand: rename the product everywhere, introduce the new logo/favicon, add the tagline "The music hiding in your mind", overhaul the empty and loading states in both panes, and unify track tile styling with magenta outline/text (local = prominent, discovery = dimmed, YouTube button always prominent).

### Main user value
The app has a clear product identity. First impressions (tab title, header, empty states) communicate brand personality. The tile styling visually communicates the difference between locally-owned tracks and fresh discoveries.

---

## Phase 7 — Dual Inner Voice Models

### Goal
Expose two local Ollama models through a 3-button toggle: "Inner Whisper" (llama3.1:8b, thoughtful/detailed), "Inner Shout" (gemma4:e4b, bold/fast), and "Cosmic Voice" (Gemini). The backend routes each provider value to the correct model. `OLLAMA_MODEL` is retired in favour of `OLLAMA_WHISPER_MODEL` and `OLLAMA_SHOUT_MODEL`.

### Main user value
Users can choose the personality and speed of the local AI voice. Inner Whisper gives careful, nuanced recommendations; Inner Shout gives bold, fast picks.

---

## Phase 8 — Fluent Conversation Memory

### Goal
Give the AI a persistent, time-aware memory of the full session — what the user said, what the AI recommended, and what the user chose to listen to. The AI should feel like a continuous conversation partner that remembers everything and naturally references the user's listening behaviour in its replies and recommendations.

The memory is stored in a server-side SQLite database. It is capped at the last 25 AI replies (FIFO soft-delete). The user can see memory usage via a progress bar in the header and flush it with a single button.

### What is recorded
- **`user-chat`** — every prompt the user sends, with timestamp
- **`ai-reply`** — every AI narrative response, with timestamp
- **`track-added`** — every "Add to Clementine" action (one event per track), with artist / album / title / duration / timestamp
- **`track-youtube`** — every YouTube link click on a discovery tile, with the same fields

### How the AI receives context (Option A — Preamble Injection)
The conversation history (user/model turns) is reconstructed from the SQLite log. For each new prompt, a temporal preamble is prepended to the user's message. The preamble contains:
- The full session timeline (all active events, timestamped)
- A "since your last reply" window listing recent track interactions
- A calculated note: "I may still be listening" if queued track time > elapsed time, or "I have most likely finished" otherwise

All AI providers (Gemini, Ollama Whisper, Ollama Shout, future providers) receive a system-level instruction to reference listening history in every response.

### Listening time calculation
- Local tracks use `lengthnanosec` from Clementine's SQLite database
- Discovery and YouTube tracks use a configurable default (210 seconds = 3.5 min)

### Main user value
The AI stops feeling like a stateless question-answering tool and starts behaving like a music companion that knows what you have been listening to, for how long, and what mood or taste it suggests. Recommendations become genuinely personal over a session.

---

## 4. Cross-Phase Working Rules

These rules apply to **every phase**.

## 4.1 End each phase with a correction loop

Each phase should end with:

1. **feature-complete milestone for the phase**,
2. **manual test pass**,
3. **correction backlog**,
4. **small stabilization sprint**,
5. **sign-off to proceed to next phase**.

## 4.2 Do not start the next phase before the current one is testable

The next phase should only start when the current phase is:
- runnable,
- demoable,
- and stable enough that feedback is about the feature itself rather than basic breakage.

## 4.3 Preserve backward usability

When moving from one phase to the next:
- do not break the existing chat flow,
- do not remove working capabilities unless intentionally redesigned,
- keep prior functionality available while new capability is introduced.

## 4.4 Track corrections separately from new feature work

Every phase should maintain two lists:

### Feature tasks
New capability needed to complete the phase.

### Correction tasks
Fixes, refinements, UI adjustments, ranking tweaks, API bugs, and usability corrections discovered during testing.

---

## 5. Phase 1 — Chat-Only AI Prototype

## 5.1 Objective

Create the smallest useful version of the application:

- one page,
- one chat window,
- one input box,
- one send action,
- one backend call,
- one AI response stream or full response,
- and a visible conversation history.

## 5.2 Scope

### In scope
- Angular app shell
- Angular Material layout for basic page and chat panel
- chat input + send button
- message list / conversation history
- backend API endpoint for chat
- AI provider integration through the backend
- error state when AI request fails
- loading state while waiting for response

### Out of scope
- web suggestions panel
- structured recommendation list
- Clementine integration
- ranking logic
- local filtering
- advanced settings panel
- authentication (unless you want it from day one)

## 5.3 Recommended deliverables

### Frontend
- chat page
- message list component
- input composer component
- loading indicator
- error banner / retry affordance

### Backend
- `/api/chat/send` endpoint (or equivalent)
- request/response DTOs
- AI gateway abstraction
- basic logging and exception handling

### Shared behavior
- correlation ID or request tracing if possible
- configurable AI model settings in config, not hardcoded in UI

## 5.4 Testable user story

> “As a user, I can open the web app, type a music-related prompt, send it to the AI, and see a useful response in the chat window.”

## 5.5 Manual test checklist

- Can I load the app?
- Can I type in the chat box?
- Can I send a prompt?
- Do I see a loading state?
- Do I receive a response?
- Is the response attached to the right turn in the chat?
- If the AI call fails, do I see a clear error?
- If I send multiple messages, is history preserved correctly?
- If I refresh the page, is current behavior acceptable (cleared or retained, depending on design)?

## 5.6 Technical acceptance criteria

- frontend and backend communicate successfully
- AI responses appear in the chat without manual refresh
- error handling is visible and not silent
- conversation history is rendered consistently
- no suggestion panel exists yet

## 5.7 Likely correction themes after Phase 1

- message spacing / layout problems
- loading indicator behavior
- input UX issues
- retry behavior
- AI tone / verbosity issues
- backend timeout tuning
- conversation state bugs

## 5.8 Phase 1 exit criteria

Move to Phase 2 only when:
- chat works end-to-end,
- failures are visible and understandable,
- the interaction is stable enough for repeated use,
- and the remaining issues are not fundamental blockers.

---

## 6. Phase 2 — Structured Track Suggestions Above the Chat

## 6.1 Objective

Enhance the application so that each user request produces two coordinated outputs from a **single Gemini call**:

1. a conversational AI response in the chat (the narrative explanation),
2. a structured **suggestions panel above the chat** showing the specific tracks Gemini recommended — the same tracks the chat is already talking about, surfaced as machine-readable cards.

The suggestions panel is not a separate retrieval from a different source. It is the structured form of what Gemini already said. Gemini is asked to return both a free-text narrative and a JSON track list in one response.

### Why only Gemini is used here

Gemini is the recommender. No external provider calls are made in Phase 2. Local library matching, which requires the Clementine DB, belongs in Phase 3.

## 6.2 Scope

### In scope
- suggestion panel above the chat
- single Gemini call returning both the chat narrative and a structured track list
- response contract containing both:
  - chat narrative (string)
  - structured suggestion list (track title, artist, album per item)
- list card or table UI for suggestions
- loading state for suggestions
- empty state when Gemini returns no tracks
- partial-failure behavior when parsing fails but the chat narrative still succeeds

### Out of scope
- Clementine local-library filtering — belongs in Phase 3
- local-library filtering
- Clementine integration
- final personal-only ranking
- persistent likes/dislikes unless specifically needed now

## 6.3 Recommended deliverables

### Frontend
- suggestions panel above chat
- suggestion card component (title, artist, album)
- states for loading / empty / partial failure
- update flow so new suggestions replace or refresh the previous list intentionally

### Backend
- dedicated recommendations endpoint (`/api/recommendations`)
- single Gemini call that returns structured JSON containing both the chat narrative and the track list
- track suggestion DTO (title, artist, album)
- graceful degradation when Gemini's structured output cannot be parsed

### Response shape
A single call to the recommendations endpoint should return:
- chat narrative (the conversational answer Gemini produced)
- suggestion list (the specific tracks Gemini named, structured)
- optional message when no tracks could be extracted

## 6.4 Testable user story

> “As a user, I can ask for music in the chat, see Gemini's conversational recommendation in the chat area, and see the specific tracks it mentioned structured as cards above the chat.”

## 6.5 Manual test checklist

- Does the suggestions panel render above the chat consistently?
- Do the tracks in the panel match what Gemini described in the chat?
- Do suggestions change when I submit a new prompt?
- Are suggestion cards readable (title, artist, album visible)?
- Does the chat response still work as in Phase 1?
- If structured parsing fails, does the chat narrative still appear?
- If Gemini returns no tracks, do I get a meaningful empty state?
- Are suggestion items clearly distinct from normal chat messages?

## 6.6 Technical acceptance criteria

- structured suggestions appear separately from chat messages
- the track list in the panel reflects what Gemini recommended in the narrative
- both outputs come from a single backend call, not two independent calls
- parsing failures do not destroy the chat experience
- UI supports empty, loading, and partial-failure states
- response contract is stable enough for iterative correction

## 6.7 Likely correction themes after Phase 2

- Gemini sometimes not returning structured output in the expected format
- suggestion layout and density
- too many / too few tracks in the structured list
- mismatch between what Gemini says in the narrative and what appears in the panel
- weak empty-state wording
- confusion between “chat answer” and “result list”

## 6.8 Phase 2 exit criteria

Move to Phase 3 only when:
- the suggestions panel is stable and reflects what Gemini actually recommended,
- chat remains stable,
- and the UI clearly separates conversational explanation from structured result display.

---

## 7. Phase 3 — Clementine Local Filtering

## 7.1 Objective

Turn the app into a **personal collection discovery tool** by filtering Gemini's track suggestions against your local Clementine library.

This phase should transform the app from:
- “Gemini recommends interesting tracks”

into:
- “Gemini recommends interesting tracks, and the app shows only the ones you actually own locally”.

Tracks that Gemini suggests but are not found in the local library are **hidden from the suggestions panel**. The result is a clean, personal list — not a general web recommendation.

### Why external providers are not used for local matching

Local music files do not carry MusicBrainz IDs or other provider-assigned identifiers in their tags. Any provider lookup would still require string comparison against local file tags to find a match — adding latency and cost without improving match quality.

Phase 3 instead uses **normalised fuzzy string matching** directly against the Clementine library:
- both sides are normalised: lowercase, punctuation stripped, whitespace collapsed
- artist + title are matched using a similarity measure (e.g. Jaro-Winkler or token overlap)
- album is used as an optional tiebreaker where available
- a configurable similarity threshold distinguishes “clear match” from “no match”

This is simpler, faster, requires no external API calls, and is honest about what can be achieved with the tag data that actually exists.

### Clementine database access strategy

The app reads from a **copy** of the Clementine SQLite database, not the live database. This avoids any risk of locking, corruption, or interference with the running Clementine player.

The path to the database copy is configurable via the `CLEMENTINE_DB_PATH` environment variable, with a default value in `appsettings.json`. The initial default is `C:\Code\clementine.db`.

## 7.2 Scope

### In scope
- configurable path to the Clementine database copy
- Clementine adapter/service to read the local library from the SQLite copy
- local inventory snapshot model (title, artist, album, file path)
- normalised fuzzy string matching of Gemini suggestions against local inventory
- suggestions panel updated to show **only locally matched tracks** (unmatched tracks are hidden)
- safe degraded behavior when the database copy is missing or unreadable

### Out of scope
- external music metadata provider calls — not needed; fuzzy string matching is sufficient
- “local equivalent” approximate-match UI — Phase 3 is match or hide; equivalents can be a later refinement
- automatic play triggering in Clementine
- bulk library metadata correction tooling
- advanced personalization beyond local ownership filtering

## 7.3 Recommended deliverables

### Frontend
- suggestions panel updated to show only locally matched tracks
- empty state when no Gemini suggestions match the local library
- safe message when the local library could not be loaded

### Backend
- `CLEMENTINE_DB_PATH` environment variable and `appsettings.json` default (`C:\Code\clementine.db`)
- Clementine adapter/service reading from the SQLite copy
- local inventory snapshot model
- normalised fuzzy matching logic (artist + title, album as tiebreaker)
- updated recommendation response including only locally matched tracks
- fallback behavior when DB path is wrong or file is unreadable

## 7.4 Testable user story

> “As a user, I can ask for music and see only suggestions from Gemini that I actually have in my local Clementine library.”

## 7.5 Manual test checklist

- Does the backend successfully read the Clementine database copy?
- Are tracks Gemini suggested that I own locally appearing in the panel?
- Are tracks Gemini suggested that I do not own hidden from the panel?
- If no suggestions match locally, is the empty state understandable?
- Does the app behave safely if the DB copy path is wrong or the file is missing?
- Does changing `CLEMENTINE_DB_PATH` redirect the app to a different copy?
- Does Phase 2 chat behavior remain unaffected?

## 7.6 Technical acceptance criteria

- Clementine DB copy can be read reliably from the configured path
- fuzzy matching is applied before suggestions are returned
- only locally matched tracks appear in the suggestion payload
- DB unavailable state produces a visible, safe outcome
- the configured path is not hardcoded in source

## 7.7 Likely correction themes after Phase 3

- fuzzy match threshold too strict (misses obvious owned tracks) or too loose (false positives)
- tag inconsistencies in the local library causing misses
- empty results for most prompts if the library is small or tags are poor
- DB path misconfiguration not producing a clear error
- need to tune normalisation logic for specific tagging conventions

## 7.8 Phase 3 exit criteria

Phase 3 is complete when:
- the suggestions panel reliably shows only tracks from the local Clementine library copy,
- tracks not in the library are hidden,
- DB access failures are visible and safe,
- the configured path works without code changes,
- and the product meaningfully reflects owned music rather than general web discovery.

---

## 8. Phase 4 — Copy to Clipboard

## 8.1 Objective

Add a copy-to-clipboard icon on each local (blue) track card. Clicking it copies `Artist – Title` to the system clipboard using the browser Clipboard API.

This is a purely frontend change — no new backend endpoints, no network calls, no external dependencies.

## 8.2 Scope

### In scope
- Copy icon on local (blue) track cards only
- Browser Clipboard API (`navigator.clipboard.writeText`)
- `MatSnackBar` confirmation: "Copied to clipboard"
- Error snackbar if clipboard access is denied

### Out of scope
- Discovery (magenta) tracks — copy icon not shown
- Any backend changes
- Any Clementine player communication

## 8.3 Recommended deliverables

### Frontend only
- Copy icon (`content_copy`) on local track cards
- `copyToClipboard()` method using `navigator.clipboard.writeText`
- Success snackbar: `"Copied: Artist – Title"`
- Error snackbar if clipboard write fails

## 8.4 Testable user story

> "As a user, I can click the copy icon on a local track card and the artist and title are on my clipboard, ready to paste anywhere."

## 8.5 Manual test checklist

- Is the copy icon visible on local (blue) cards and absent on discovery (magenta) cards?
- Does clicking the icon copy `Artist – Title` to the clipboard?
- Does the success snackbar confirm what was copied?
- If clipboard access is denied (e.g. non-HTTPS context), does the error snackbar appear?

## 8.6 Technical acceptance criteria

- Clipboard write uses the async `navigator.clipboard` API
- No backend calls are made
- Icon is hidden on discovery tracks
- Snackbar feedback is visible within 100ms of clicking

## 8.7 Phase 4 exit criteria

Phase 4 is complete when:
- the copy icon places `Artist – Title` on the clipboard for local tracks,
- the add-to-Clementine button queues tracks in the running player via `clementine -a <path>`,
- the "Add all local" panel button sends all local file paths in a single call,
- and both actions produce visible snackbar feedback on success and failure.

---

## 9. Phase 5 — UI/UX Revamp + Album Art

## 9.1 Objective

Redesign the full application UI from a functional prototype into a polished, visually coherent product. The redesign introduces:

- a **split-pane layout** (40% conversation / 60% recommendations),
- a **redesigned model selector** with branded labels ("Inner Voice" for local LLM, "Cosmic Voice" for Gemini) and provider logos,
- **album art** sourced from Last.fm for every track tile,
- a **recommendation grid** (2 rows × 4 columns on desktop) replacing the horizontal scroll strip,
- a new **color and typography system** (`#4CC7C7` cyan for local, `#D46FB0` magenta for discovery, Inter font),
- and **redesigned tile action icons** integrating all existing actions (YouTube, add to Clementine, copy to clipboard) into the new tile layout.

All existing functionality from Phases 1–4 is preserved. This phase changes only presentation — no AI logic, matching, or action behavior is altered.

## 9.2 Scope

### In scope
- Last.fm gateway service (backend) — fetch album art per track, cache in-memory, fail gracefully
- `albumArtUrl` field added to `TrackSuggestion` DTO and Angular model
- Recommendation orchestration enriched to call Last.fm concurrently after local matching
- SVG assets: `clementine.svg`, `youtube.svg`, `gemini.svg` in Angular assets
- Global typography: Inter font, CSS custom property color tokens
- Model selector redesign: "Inner Voice" / "Cosmic Voice" pill toggle with logos
- App layout: horizontal flex split pane, responsive mobile stack
- Conversation pane: bubble design, new colors, sticky input with microphone icon (decorative)
- Recommendation pane: CSS grid 2×4, album art tiles, bottom border color by type
- Tile action icons: YouTube top-right (discovery), Clementine+add top-right (local), copy bottom-left of art (local)
- Hover state: scale 1.05×, shadow, icon opacity transition
- Full test suite update to reflect new DOM structure

### Out of scope
- Voice input functionality (microphone icon is decorative only)
- Dark mode
- Any change to AI providers, matching logic, or action behavior
- Persistent preferences beyond `localStorage`

## 9.3 Recommended deliverables

### Backend
- `LastFmGatewayService` with `ILastFmGatewayService` interface
- `LastFmOptions` configuration (`LASTFM_API_KEY`, `LASTFM_BASE_URL`)
- `albumArtUrl` on `TrackSuggestion` C# DTO
- Parallel art enrichment in `RecommendationOrchestrationService`

### Frontend
- `src/assets/icons/clementine.svg`, `youtube.svg`, `gemini.svg`
- CSS custom properties in `styles.scss` (color tokens, Inter font import)
- Redesigned `ModelSelectorComponent` with "Inner Voice" / "Cosmic Voice" labels and logos
- Split-pane root layout in `AppComponent` or a dedicated layout component
- Redesigned conversation pane: bubbles, colors, sticky input, microphone icon
- Redesigned `SuggestionCardComponent`: album art, bottom border, action icons, hover state
- Placeholder art component/directive for `albumArtUrl === null` cases
- Updated tests for all affected components

## 9.4 Testable user story

> "As a user, I open the app and see a polished split-pane interface. The left side shows my conversation with bubble messages. The right side shows a grid of track tiles with album art, artist names, and clear visual distinction between local and discovery tracks. Each tile has action icons that work as before."

## 9.5 Manual test checklist

- Do conversation and recommendation panes sit side by side on desktop?
- Do panes stack correctly on mobile (recommendations above conversation)?
- Does the model selector show "Inner Voice" and "Cosmic Voice" with logos?
- Is the active model label bold?
- Does the Gemini logo align to text height?
- Do recommendation tiles appear in a 2×4 grid on desktop?
- Does album art load from Last.fm?
- Is the placeholder visible when art is unavailable?
- Do local tiles have a cyan bottom border?
- Do discovery tiles have a magenta bottom border?
- Does the YouTube icon appear top-right on discovery tiles and open YouTube in a new tab?
- Does the Clementine icon appear top-right on local tiles and add the track to Clementine?
- Does the copy icon appear bottom-left of the art on local tiles and copy to clipboard?
- Does hovering a tile produce scale + shadow?
- Does the "Add all local" button appear and work when local tracks are present?
- Do all Phase 1–4 behaviors still work correctly?

## 9.6 Technical acceptance criteria

- `albumArtUrl` is present on every track in the API response (null when unavailable)
- Last.fm failure does not block the recommendation response
- Last.fm is called from the backend only — never from Angular
- SVG assets are served from Angular's static assets
- Color tokens are CSS custom properties, not scattered hardcoded hex values
- Tile grid uses CSS Grid, not flexbox, on desktop
- Responsive breakpoint at 768px produces correct mobile layout
- All Angular component tests pass with the new DOM structure

## 9.7 Likely correction themes after Phase 5

- Album art aspect ratio or crop issues for non-square artwork
- Last.fm art missing for niche or non-English artists — placeholder frequency
- Last.fm rate limit behaviour under repeated rapid queries
- Grid layout with fewer than 8 tracks looking sparse
- Icon overlap with album art edges on small screens
- Model selector width on narrow viewports
- Conversation bubble alignment or wrapping edge cases

## 9.8 Phase 5 exit criteria

Phase 5 is complete when:
- the split-pane layout is stable on both desktop and mobile,
- album art loads from Last.fm or falls back to a placeholder without errors,
- all tile action icons work identically to their Phase 4 counterparts,
- the model selector shows the correct labels and logos,
- and no Phase 1–4 functionality has regressed.

---

## 10. Correction Loop Template for Every Phase

Each phase should end with a structured correction cycle.

## 9.1 Step 1 — Demo the phase

Run the application and use it like a real user.
Do not validate only through unit tests.

## 9.2 Step 2 — Capture issues

Split findings into:
- **functional bugs**
- **UX issues**
- **AI/relevance issues**
- **performance/stability issues**
- **contract/shape issues**

## 9.3 Step 3 — Triage

Classify issues as:
- must-fix before next phase
- should-fix soon
- can wait

## 9.4 Step 4 — Stabilization mini-sprint

Apply only the corrections needed to make the phase stable enough to build on.
Avoid mixing in unrelated future work.

## 9.5 Step 5 — Re-test phase exit criteria

Re-run the phase checklist and confirm the phase can now serve as a base for the next one.

---

## 10. Suggested Backlog Structure

Maintain backlog items under these headings.

## 10.1 Shared foundation
- project setup
- environment config
- logging / diagnostics
- UI shell
- API shell

## 10.2 Phase 1 backlog
- chat UI
- chat endpoint
- AI gateway
- message history handling
- loading/error states
- Phase 1 corrections

## 10.3 Phase 2 backlog
- web suggestion panel
- suggestion DTOs
- retrieval orchestration
- provider integration stubs/adapters
- partial failure handling
- Phase 2 corrections

## 10.4 Phase 3 backlog
- Clementine adapter
- local inventory loading
- suggestion-to-local matching
- local metadata rendering
- degraded behavior when DB is unavailable
- Phase 3 corrections

## 10.5 Phase 4 backlog
- Copy-to-clipboard icon on local track cards
- Add-to-Clementine button (per card) via `clementine -a <path>` CLI
- `POST /api/clementine/add` endpoint accepting `{ filePaths: string[] }`
- `ClementineLauncherService` — cross-platform, configurable exe path
- "Add all local" panel button
- Phase 4 corrections

## 10.6 Phase 5 backlog
- Last.fm gateway service + configuration + in-memory cache
- `albumArtUrl` on `TrackSuggestion` DTO and Angular interface
- Parallel art enrichment in orchestration service
- SVG assets (clementine.svg, youtube.svg, gemini.svg)
- Global CSS custom properties + Inter font
- Model selector redesign ("Inner Voice" / "Cosmic Voice")
- Split-pane root layout + responsive breakpoint
- Conversation pane redesign (bubbles, colors, sticky input)
- Recommendation tile redesign (album art, grid, icons, hover)
- Test suite update for new DOM structure
- Phase 5 corrections

---

## 11. Suggested Branch / Delivery Strategy

A clean way to work is:

- `main` → stable baseline
- `phase-1-chat`
- `phase-2-web-suggestions`
- `phase-3-clementine-filtering`
- `phase-4-clementine-player`

Within each phase branch, keep sub-work small and merge frequently.

At the end of each phase:
- stabilize,
- re-test,
- then merge into main.

---

## 12. Recommended Testing Strategy by Phase

## Phase 1

### Focus
- basic end-to-end chat flow
- backend integration
- error handling

### Minimum tests
- frontend component tests for chat behaviors
- backend endpoint tests for request/response shape
- one end-to-end test: send prompt → receive response

## Phase 2

### Focus
- dual-output response from a single Gemini call: chat narrative + structured track list
- suggestions panel rendering
- partial failure behavior when structured parsing fails but chat narrative succeeds

### Minimum tests
- endpoint tests for recommendation payload shape (suggestions + message)
- frontend tests for suggestion card rendering (title, artist, album)
- one end-to-end test: send prompt → see track cards above chat that match the narrative
- one failure-path test: structured parsing fails, chat narrative still appears correctly

## Phase 3

### Focus
- Clementine DB copy access (configured path)
- normalised fuzzy matching correctness
- suggestions panel showing only locally matched tracks
- degraded behavior when the DB copy is missing or unreadable

### Minimum tests
- unit tests for normalisation and fuzzy matching logic
- integration tests for the Clementine adapter (reads from a test SQLite fixture)
- one end-to-end test: send prompt → suggestions panel shows only tracks owned locally
- one failure-path test: DB copy missing or path misconfigured → safe, visible outcome with chat narrative intact

## Phase 4

### Focus
- copy icon and add-to-Clementine icon visible on local tracks only
- clipboard write and `POST /api/clementine/add` both succeed
- "Add all local" button sends correct file paths

### Minimum tests
- frontend component test: copy and add-btn icons present on local cards, absent on discovery cards
- frontend component test: `copyToClipboard()` calls `navigator.clipboard.writeText` with correct string
- frontend component test: add-all-btn visible with correct count when local tracks with file paths exist

## Phase 5

### Focus
- Last.fm art fetched correctly and enriched into response
- art failure does not block recommendations
- split-pane layout renders correctly on desktop and mobile
- tile grid, action icons, and hover states work as specified
- all Phase 1–4 behaviors still pass

### Minimum tests
- backend unit test: `LastFmGatewayService` returns art URL when Last.fm responds, null on failure
- backend unit test: orchestration correctly enriches track suggestions with `albumArtUrl`
- frontend component test: tile renders album art when `albumArtUrl` provided; placeholder when null
- frontend component test: action icons correct per tile type (YouTube top-right / Clementine top-right / copy bottom-left)
- frontend component test: model selector shows correct labels and active state

## Phase 6

### Focus
- Reasonic name appears in browser tab and header
- New logo/favicon render correctly; old mainimage.png removed
- Tagline visible in header
- Empty chat state shows muted logo and updated texts; hint is random from trylines.txt
- Right-panel empty state text updated
- Right-panel loading state overlays empty state text correctly
- All track tiles have magenta border and text; local = full opacity, discovery = dimmed except YouTube button
- All Phase 1–5 behaviors still pass

### Minimum tests
- frontend component test: empty chat state text "What does your mind sound like today?"
- frontend component test: hint element present in empty state
- frontend component test: right-panel shows loading phrase when loading and no suggestions yet
- frontend component test: local tile has full opacity; discovery tile has reduced opacity wrapper; YouTube button unaffected

## Phase 7

### Focus
- 3-button toggle renders "Inner Whisper", "Inner Shout", "Cosmic Voice" with correct icons
- `POST /api/recommendations` with `provider: "inner-whisper"` routes to `OLLAMA_WHISPER_MODEL`
- `POST /api/recommendations` with `provider: "inner-shout"` routes to `OLLAMA_SHOUT_MODEL`
- Provider selection persists via `localStorage` across page loads
- All Phase 1–6 behaviors still pass

### Minimum tests
- frontend component test: three provider toggle buttons render with correct labels
- backend unit test: `inner-whisper` routes to Ollama whisper model, `inner-shout` routes to Ollama shout model

## Phase 8

### Focus
- `POST /api/session/events` records track-added and track-youtube events in SQLite
- `GET /api/session/memory` returns `{ used, total }` correctly
- `DELETE /api/session/memory` busts memory and resets used to 0
- Preamble injected into prompt when history exists; absent on first turn
- AI reply and user prompt both recorded after each recommendation call
- FIFO eviction caps active AI replies at SESSION_MEMORY_SIZE (default 25)
- Memory progress bar visible in header; updates after each exchange
- Bust button shows confirmation, clears memory, and refreshes bar
- Track events fired on "Add to Clementine" (per card and add-all) and YouTube click
- All Phase 1–7 behaviors still pass

### Minimum tests
- backend unit test: `SessionContextBuilder` maps user-chat/ai-reply to ConversationTurns, excludes track events from history
- backend unit test: preamble is null when event log is empty; contains timeline and "Since your last reply" section when populated
- backend unit test: listening estimate correctly reports "still listening" vs "finished"
- backend unit test: provider routing tests include `ISessionContextBuilder` and `ISessionHistoryService` mocks
- frontend service test: `SessionService.logTrackEvent` POSTs correct body; `getMemoryStatus` returns parsed response; `bustMemory` sends DELETE
- frontend component test: `ChatComponent` provides stub `SessionService` so memory HTTP calls do not leak into `httpMock.verify()`

---

## 13. Recommended Definition of Done Per Phase

A phase is done only when all of the following are true:

1. The feature works end-to-end from the real UI.
2. The backend contract is stable enough for the next phase.
3. The main error states are visible and understandable.
4. A minimum manual test checklist has been passed.
5. A correction loop has been completed.
6. The app is still usable after the new phase is added.

---

## 14. Suggested Roadmap Summary

## Phase 1
**Deliverable:** Chat-only AI web app

## Phase 2
**Deliverable:** Chat + web suggestion list above the chat

## Phase 3
**Deliverable:** Chat + web suggestions filtered/grounded to local Clementine collection

## Phase 4
**Deliverable:** Per-card local track actions — copy to clipboard and add to Clementine playlist; panel-level "Add all local" button

## Phase 5
**Deliverable:** Full UI/UX revamp — split-pane layout, album art from Last.fm, recommendation grid, redesigned model selector, new color and typography system

## Phase 6
**Deliverable:** Reasonic brand identity — renamed product, new logo/favicon, tagline, overhauled empty/loading states, unified magenta tile styling

## Phase 7
**Deliverable:** Dual Inner Voice models — "Inner Whisper" (llama3.1:8b) and "Inner Shout" (gemma4:e4b) selectable from a 3-button toggle alongside Cosmic Voice (Gemini)

## Phase 8
**Deliverable:** Fluent conversation memory — server-side SQLite session log; FIFO memory capped at 25 AI replies; temporal preamble injected into every AI call; memory progress bar and bust button in the header; track events logged on Clementine add and YouTube click

## Correction model
After each phase:
- review,
- correct,
- stabilize,
- proceed.

---

## 15. Executive Summary

Yes — this project should absolutely be developed in phased increments so you can test it as it evolves.

The cleanest plan is:

1. **Phase 1:** basic chat with the AI
2. **Phase 2:** add web-based structured suggestions above the chat
3. **Phase 3:** use the Clementine database to restrict or ground results to your local music
4. **Phase 4:** per-card actions for local tracks (copy to clipboard, add to Clementine) and panel-level "Add all" button
5. **Phase 5:** full UI/UX revamp with album art, split-pane layout, recommendation grid, and polished visual system

The most important rule is not just the phases themselves, but the **correction loop after every phase**.

That is what will keep the app usable while it grows, and it will stop you from stacking new capabilities on top of unstable behavior.
