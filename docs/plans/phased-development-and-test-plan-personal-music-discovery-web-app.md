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

## 6. Phase 2 — Web Suggestions Above the Chat

## 6.1 Objective

Enhance the application so that each user request can produce two coordinated outputs:

1. a conversational AI response in the chat,
2. a structured **suggestions area above the chat** showing music suggestions retrieved from web sources.

## 6.2 Scope

### In scope
- suggestion panel above the chat
- backend retrieval orchestration for web suggestions
- response contract containing both:
  - chat narrative,
  - structured suggestions
- list card or table UI for suggestions
- loading state for suggestions
- empty state when no good suggestions exist
- partial-failure behavior when chat works but suggestions do not (or vice versa)

### Out of scope
- local-library filtering
- Clementine integration
- final personal-only ranking
- persistent likes/dislikes unless specifically needed now

## 6.3 Recommended deliverables

### Frontend
- suggestions panel above chat
- suggestion list item/card component
- states for loading / empty / partial failure
- update flow so new suggestions replace or refresh the previous list intentionally

### Backend
- recommendation query endpoint or upgraded chat endpoint response
- retrieval orchestration service
- provider adapter(s) or web suggestion provider abstraction
- normalized suggestion DTO
- graceful degradation behavior for partial provider failures

### Suggested response shape
A single response per prompt should return:
- chat answer
- suggestion list
- optional confidence metadata
- optional message when suggestion quality is weak

## 6.4 Testable user story

> “As a user, I can ask for music in the chat and see a list of suggested songs/artists/albums from the web displayed above the chat response.”

## 6.5 Manual test checklist

- Does the suggestions panel render above the chat consistently?
- Do suggestions change when I submit a new prompt?
- Are suggestions structured and readable?
- Does the chat response still work as in Phase 1?
- If suggestion retrieval fails, does chat still work?
- If no suggestions are found, do I get a meaningful empty state?
- Are suggestion items clearly distinct from normal chat messages?
- Are duplicate or obviously poor suggestions appearing?

## 6.6 Technical acceptance criteria

- structured suggestions appear separately from chat messages
- chat and suggestions can coexist in one request/response flow
- retrieval failures do not destroy the whole user experience unnecessarily
- UI supports empty, loading, and partial-failure states
- response contract is stable enough for iterative correction

## 6.7 Likely correction themes after Phase 2

- suggestion layout and density
- too many / too few suggestions
- poor web relevance
- duplicate suggestions
- weak empty-state wording
- mixed timing between chat and suggestion rendering
- confusion between “chat answer” and “result list”

## 6.8 Phase 2 exit criteria

Move to Phase 3 only when:
- the suggestions panel is stable,
- web suggestions are at least directionally useful,
- chat remains stable,
- and the UI clearly separates conversational explanation from structured result display.

---

## 7. Phase 3 — Clementine Local Filtering

## 7.1 Objective

Turn the app into a **personal collection discovery tool** by filtering or grounding the web suggestions against your local Clementine library.

This phase should transform the app from:
- “interesting web suggestions”

into:
- “interesting suggestions that match what I already own locally”.

## 7.2 Scope

### In scope
- Clementine database access from backend
- adapter/service to read local library entities
- matching/filtering logic from web suggestions to local collection
- UI signal indicating that results are local-only or locally-matched
- reduced-confidence or no-match behavior when suggestions do not exist locally
- optional explanation note when an item is a local equivalent rather than an exact surfaced suggestion

### Out of scope
- advanced personalization beyond basic filtering (unless intentionally added)
- full library maintenance tooling
- automatic play triggering in Clementine
- bulk correction tooling for library metadata

## 7.3 Recommended deliverables

### Frontend
- suggestion cards/list updated to reflect local match status
- indicators such as:
  - exact local match
  - local equivalent
  - no local match (if shown at all)
- optional local metadata in suggestion cards (album, artist, etc.)

### Backend
- Clementine adapter/service
- local inventory snapshot model
- matching/filtering logic
- updated recommendation DTO with local match fields
- fallback behavior when DB is unavailable or stale

## 7.4 Testable user story

> “As a user, I can ask for music and see only suggestions that I actually have in my local Clementine library, or the best local equivalents where exact matches are not available.”

## 7.5 Manual test checklist

- Does the backend successfully read the Clementine database?
- Are locally matched results clearly identified?
- If no local matches exist, is the result understandable?
- Are web suggestions correctly reduced to local suggestions?
- Do obviously owned tracks/albums surface when expected?
- Are incorrect local matches appearing?
- Does the app behave safely if the Clementine DB path is wrong or unavailable?
- Does Phase 2 behavior remain understandable while filtered through local ownership?

## 7.6 Technical acceptance criteria

- local collection can be loaded reliably
- filtering/matching is applied before final suggestion rendering
- result payload includes local-match metadata
- failures in local DB access are visible and safe
- the app no longer behaves like a generic web recommender only

## 7.7 Likely correction themes after Phase 3

- bad match quality
- too-strict vs too-loose local matching
- duplicate local entries
- stale DB assumptions
- missing metadata in Clementine records
- weak explanation of why a local equivalent was chosen
- need for refinement of exact vs approximate local matches

## 7.8 Phase 3 exit criteria

Phase 3 is complete when:
- the app can reliably restrict or ground suggestions to your local collection,
- match behavior is understandable,
- failures around local DB access are handled safely,
- and the product now meaningfully reflects your owned music rather than only web discovery.

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
- dual-output response: chat + suggestions
- panel rendering
- partial failure behavior

### Minimum tests
- endpoint tests for suggestion payload shape
- frontend tests for suggestion rendering
- one end-to-end test: send prompt → see suggestions above chat
- one failure-path test: chat succeeds, suggestions fail gracefully

## Phase 3

### Focus
- Clementine DB access
- local filtering correctness
- degraded behavior when local DB is missing/unavailable

### Minimum tests
- integration tests for Clementine adapter
- matching/filtering tests
- one end-to-end test: send prompt → suggestions filtered to owned music
- one failure-path test: local DB unavailable → safe user-visible outcome

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
