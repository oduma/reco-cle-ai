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

### Why external providers (Last.fm, MusicBrainz, Discogs) are not used here

Gemini is the recommender. The providers are not needed as a second opinion or a separate data source in Phase 2.

The value of those providers becomes clear in Phase 3: Gemini can suggest tracks that are hard to match against local files by name alone. Last.fm and MusicBrainz give each track a canonical identity (e.g. a MusicBrainz ID) that makes matching against the Clementine library reliable rather than a fragile fuzzy string search. That grounding role belongs in Phase 3, not Phase 2.

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
- external provider calls (Last.fm, MusicBrainz, Discogs) — these belong in Phase 3
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

### Why external providers (Last.fm, MusicBrainz) are not used here

The plan originally assumed that Last.fm and MusicBrainz could provide canonical track identities to make local matching reliable. This assumption does not hold: local music files do not carry MusicBrainz IDs or Last.fm identifiers in their tags, so a provider lookup produces no identifier that can be compared against the local file. The canonical identity would still have to be reconciled with local tags by string comparison — so the provider step adds cost and latency without improving match quality.

Instead, Phase 3 uses **normalised fuzzy string matching** directly against the Clementine library:
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
- external provider calls (Last.fm, MusicBrainz, Discogs) — not useful for matching without local MusicBrainz IDs
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

## 8. Correction Loop Template for Every Phase

Each phase should end with a structured correction cycle.

## 8.1 Step 1 — Demo the phase

Run the application and use it like a real user.
Do not validate only through unit tests.

## 8.2 Step 2 — Capture issues

Split findings into:
- **functional bugs**
- **UX issues**
- **AI/relevance issues**
- **performance/stability issues**
- **contract/shape issues**

## 8.3 Step 3 — Triage

Classify issues as:
- must-fix before next phase
- should-fix soon
- can wait

## 8.4 Step 4 — Stabilization mini-sprint

Apply only the corrections needed to make the phase stable enough to build on.
Avoid mixing in unrelated future work.

## 8.5 Step 5 — Re-test phase exit criteria

Re-run the phase checklist and confirm the phase can now serve as a base for the next one.

---

## 9. Suggested Backlog Structure

Maintain backlog items under these headings.

## 9.1 Shared foundation
- project setup
- environment config
- logging / diagnostics
- UI shell
- API shell

## 9.2 Phase 1 backlog
- chat UI
- chat endpoint
- AI gateway
- message history handling
- loading/error states
- Phase 1 corrections

## 9.3 Phase 2 backlog
- web suggestion panel
- suggestion DTOs
- retrieval orchestration
- provider integration stubs/adapters
- partial failure handling
- Phase 2 corrections

## 9.4 Phase 3 backlog
- Clementine adapter
- local inventory loading
- suggestion-to-local matching
- local metadata rendering
- degraded behavior when DB is unavailable
- Phase 3 corrections

---

## 10. Suggested Branch / Delivery Strategy

A clean way to work is:

- `main` → stable baseline
- `phase-1-chat`
- `phase-2-web-suggestions`
- `phase-3-clementine-filtering`

Within each phase branch, keep sub-work small and merge frequently.

At the end of each phase:
- stabilize,
- re-test,
- then merge into main.

---

## 11. Recommended Testing Strategy by Phase

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

---

## 12. Recommended Definition of Done Per Phase

A phase is done only when all of the following are true:

1. The feature works end-to-end from the real UI.
2. The backend contract is stable enough for the next phase.
3. The main error states are visible and understandable.
4. A minimum manual test checklist has been passed.
5. A correction loop has been completed.
6. The app is still usable after the new phase is added.

---

## 13. Suggested Roadmap Summary

## Phase 1
**Deliverable:** Chat-only AI web app

## Phase 2
**Deliverable:** Chat + web suggestion list above the chat

## Phase 3
**Deliverable:** Chat + web suggestions filtered/grounded to local Clementine collection

## Correction model
After each phase:
- review,
- correct,
- stabilize,
- proceed.

---

## 14. Executive Summary

Yes — this project should absolutely be developed in phased increments so you can test it as it evolves.

The cleanest plan is:

1. **Phase 1:** basic chat with the AI
2. **Phase 2:** add web-based structured suggestions above the chat
3. **Phase 3:** use the Clementine database to restrict or ground results to your local music

The most important rule is not just the phases themselves, but the **correction loop after every phase**.

That is what will keep the app usable while it grows, and it will stop you from stacking new capabilities on top of unstable behavior.
