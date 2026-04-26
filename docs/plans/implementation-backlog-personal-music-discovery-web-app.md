# Implementation Backlog — Personal Music Discovery Web App

## 1. Purpose

This document defines the **implementation backlog** for the Personal Music Discovery Web App.

It turns the phased development plan into a concrete, execution-friendly backlog that can be used for:

- GitHub issues
- GitHub Projects / boards
- GitHub Copilot multi-agent execution
- sprint planning
- milestone tracking

This backlog is designed so the application remains **testable at the end of every phase**.

---

## 2. Delivery Model

The backlog is organized into:

1. **Shared Foundation Work**
2. **Phase 1 — Chat-only AI prototype**
3. **Phase 1 Correction Loop**
4. **Phase 2 — Web suggestions above the chat**
5. **Phase 2 Correction Loop**
6. **Phase 3 — Clementine local filtering**
7. **Phase 3 Correction Loop**
8. **Cross-cutting Hardening / Production Readiness**

Each backlog item contains:

- **ID**
- **Title**
- **Goal**
- **Suggested owner / agent**
- **Dependencies**
- **Definition of done**

---

## 3. Suggested Working Conventions

### 3.1 Keep items small

A single backlog item should normally fit into one focused implementation task or one small vertical slice.

### 3.2 Separate new capability from corrections

Do not mix:
- “add a new feature”
with
- “stabilize the feature that already exists”.

### 3.3 Prefer vertical slice completion

Where possible, deliver thin end-to-end functionality instead of building isolated frontend or backend fragments that are not yet usable.

### 3.4 Re-test the app at the end of every phase

Each phase should end with:
- demo,
- manual test pass,
- corrections,
- stabilization,
- sign-off.

---

## 4. Shared Foundation Backlog

## FND-001 — Create solution / repo skeleton

### Goal
Create the base repo structure for:
- Angular app
- ASP.NET Core API
- shared docs
- tests

### Suggested owner / agent
- Solution Architect Agent
- Platform, Quality, and DevOps Agent

### Dependencies
- none

### Definition of done
- repo structure exists
- client and server can build independently
- docs folder exists
- tests folder exists

---

## FND-002 — Establish frontend project shell

### Goal
Create Angular application shell with:
- base app layout
- routing foundation
- Angular Material installed/configured
- initial theme setup

### Suggested owner / agent
- Angular Frontend Agent
- Angular Material UX Agent

### Dependencies
- FND-001

### Definition of done
- Angular app runs locally
- Angular Material is configured
- a minimal page shell renders
- routing foundation exists

---

## FND-003 — Establish backend API shell

### Goal
Create ASP.NET Core API foundation with:
- startup/configuration
- base routing
- one sample health endpoint
- base error handling
- OpenAPI enabled

### Suggested owner / agent
- .NET API Agent
- Platform, Quality, and DevOps Agent

### Dependencies
- FND-001

### Definition of done
- API runs locally
- OpenAPI UI/spec is exposed in development
- health endpoint responds
- base error handling path exists

---

## FND-004 — Define initial API contract conventions

### Goal
Define and implement conventions for:
- DTO naming
- error shape
- validation response style
- endpoint naming

### Suggested owner / agent
- Product Contract Agent
- .NET API Agent
- Solution Architect Agent

### Dependencies
- FND-003

### Definition of done
- initial contract conventions are documented
- example endpoint follows those conventions

---

## FND-005 — Add baseline logging and request correlation

### Goal
Introduce request logging and correlation IDs/trace propagation between frontend and backend where feasible.

### Suggested owner / agent
- Platform, Quality, and DevOps Agent
- .NET API Agent

### Dependencies
- FND-003

### Definition of done
- request IDs or correlation IDs are visible in backend logs
- errors can be traced by request

---

## FND-006 — Define local environment configuration strategy

### Goal
Set up safe local configuration for:
- AI provider settings
- API URLs
- future provider credentials
- future Clementine DB path settings

### Suggested owner / agent
- Platform, Quality, and DevOps Agent

### Dependencies
- FND-002
- FND-003

### Definition of done
- local config strategy is documented
- secrets are not hardcoded in code files

---

## 5. Phase 1 Backlog — Chat-Only AI Prototype

## P1-001 — Build chat page layout

### Goal
Create the Phase 1 page with:
- chat container
- message list area
- input composer area

### Suggested owner / agent
- Angular Frontend Agent
- Angular Material UX Agent

### Dependencies
- FND-002

### Definition of done
- chat page renders
- page layout is usable
- message area and input area are visually separated

---

## P1-002 — Build message list component

### Goal
Implement a reusable component to display conversation history.

### Suggested owner / agent
- Angular Frontend Agent

### Dependencies
- P1-001

### Definition of done
- user and assistant messages render distinctly
- messages display in order
- long messages wrap sensibly

---

## P1-003 — Build input composer component

### Goal
Implement text input + send action with disabled/loading states.

### Suggested owner / agent
- Angular Frontend Agent
- Angular Material UX Agent

### Dependencies
- P1-001

### Definition of done
- input accepts prompt text
- send action can be triggered
- input state reflects loading/disabled behavior correctly

---

## P1-004 — Create chat endpoint contract

### Goal
Define request/response DTOs for the Phase 1 chat flow.

### Suggested owner / agent
- Product Contract Agent
- .NET API Agent

### Dependencies
- FND-004

### Definition of done
- chat request DTO exists
- chat response DTO exists
- contract supports conversation turn response

---

## P1-005 — Implement backend chat endpoint

### Goal
Add backend API endpoint for the chat flow.

### Suggested owner / agent
- .NET API Agent

### Dependencies
- P1-004
- FND-003

### Definition of done
- endpoint accepts prompt request
- returns structured response
- errors are surfaced consistently

---

## P1-006 — Implement AI gateway abstraction

### Goal
Create backend abstraction for sending prompts to the AI provider.

### Suggested owner / agent
- .NET API Agent
- Solution Architect Agent

### Dependencies
- P1-005

### Definition of done
- AI provider integration is behind a gateway/service abstraction
- endpoint does not call provider directly in controller logic

---

## P1-007 — Wire Angular chat flow to backend

### Goal
Connect the frontend chat page to the backend endpoint using a typed API client.

### Suggested owner / agent
- Angular Frontend Agent

### Dependencies
- P1-005
- P1-003

### Definition of done
- sending a prompt hits the backend
- returned assistant message appears in the UI
- loading state is visible while waiting

---

## P1-008 — Add error and retry UX for chat failures

### Goal
Support visible error handling when the chat request fails.

### Suggested owner / agent
- Angular Frontend Agent
- Angular Material UX Agent
- .NET API Agent

### Dependencies
- P1-007

### Definition of done
- failed calls show a clear user-visible error
- retry path exists or is clearly handled
- silent failure does not occur

---

## P1-009 — Preserve conversation state in-memory

### Goal
Keep conversation turns visible while the app remains open.

### Suggested owner / agent
- Angular Frontend Agent

### Dependencies
- P1-007

### Definition of done
- multiple turns remain visible in order
- new assistant responses appear on the correct turn sequence

---

## P1-010 — Phase 1 demo and manual test pass

### Goal
Run the full Phase 1 checklist from the phased development plan.

### Suggested owner / agent
- Platform, Quality, and DevOps Agent
- Angular Frontend Agent
- .NET API Agent

### Dependencies
- P1-001 through P1-009

### Definition of done
- phase 1 manual checklist completed
- issues logged into Phase 1 correction backlog

---

## 6. Phase 1 Correction Loop Backlog

## P1C-001 — Fix chat layout and spacing issues

### Goal
Address UX problems discovered during Phase 1 demo.

### Suggested owner / agent
- Angular Material UX Agent
- Angular Frontend Agent

### Dependencies
- P1-010

### Definition of done
- major layout defects are resolved
- chat is visually stable enough for repeated use

---

## P1C-002 — Fix chat loading / error state issues

### Goal
Stabilize any defects in loading indicators, duplicate sends, or retry behavior.

### Suggested owner / agent
- Angular Frontend Agent
- .NET API Agent

### Dependencies
- P1-010

### Definition of done
- chat state transitions behave reliably
- error handling is understandable

---

## P1C-003 — Tune AI response behavior if needed

### Goal
Refine response shape/verbosity/tone if Phase 1 reveals obvious issues.

### Suggested owner / agent
- Product Contract Agent
- .NET API Agent

### Dependencies
- P1-010

### Definition of done
- response format is stable enough to build Phase 2 on top of

---

## P1C-004 — Phase 1 stabilization sign-off

### Goal
Confirm Phase 1 is ready to serve as the base for Phase 2.

### Suggested owner / agent
- Solution Architect Agent
- Product Contract Agent

### Dependencies
- P1C-001 through P1C-003

### Definition of done
- Phase 1 exit criteria passed
- proceed/no-proceed decision documented

---

## 7. Phase 2 Backlog — Web Suggestions Above the Chat

## P2-001 — Define dual-output response contract

### Goal
Define the response contract that contains:
- chat response
- structured suggestion list

### Suggested owner / agent
- Product Contract Agent
- .NET API Agent

### Dependencies
- P1C-004

### Definition of done
- DTO contract exists for chat + suggestions
- response supports empty/partial states

---

## P2-002 — Build suggestions panel UI above the chat

### Goal
Add a dedicated structured suggestions area above the chat window.

### Suggested owner / agent
- Angular Frontend Agent
- Angular Material UX Agent

### Dependencies
- P2-001

### Definition of done
- suggestions panel renders above chat
- panel is visually distinct from chat messages

---

## P2-003 — Build suggestion item component

### Goal
Implement reusable card/list item UI for suggestions.

### Suggested owner / agent
- Angular Material UX Agent
- Angular Frontend Agent

### Dependencies
- P2-002

### Definition of done
- suggestion items render consistently
- loading/empty state compatibility exists

---

## P2-004 — Implement Gemini dual-output orchestration

### Goal
Add a backend service that issues a single Gemini call returning both:
- the conversational chat narrative, and
- a structured JSON track list (title, artist, album per item).

Gemini is the sole source of recommendations in Phase 2. External providers (Last.fm, MusicBrainz) are not called here — their role is canonical identity resolution for local library matching, which belongs in Phase 3.

### Suggested owner / agent
- .NET API Agent
- Domain & Provider Integration Agent

### Dependencies
- P2-001

### Definition of done
- orchestration service calls Gemini once and parses both outputs
- structured track list and chat narrative are returned together
- parsing failure is handled gracefully (narrative preserved, track list empty with message)

---

## P2-006 — Return dual output through API endpoint

### Goal
Expose the recommendations endpoint so the frontend receives the chat narrative and structured track list together.

### Suggested owner / agent
- .NET API Agent

### Dependencies
- P2-004

### Definition of done
- endpoint returns both chat narrative and structured track suggestions
- API contract matches P2-001

---

## P2-007 — Wire suggestions panel to backend response

### Goal
Render structured suggestions in Angular using the new response contract.

### Suggested owner / agent
- Angular Frontend Agent

### Dependencies
- P2-006
- P2-002

### Definition of done
- suggestions render above chat after prompt submission
- suggestion list refresh behavior is intentional and stable

---

## P2-008 — Add loading / empty / partial failure UX for suggestions

### Goal
Handle cases where:
- suggestions are still loading
- no suggestions are found
- suggestion retrieval fails but chat still succeeds

### Suggested owner / agent
- Angular Frontend Agent
- Angular Material UX Agent
- .NET API Agent

### Dependencies
- P2-007

### Definition of done
- all three states are user-visible and understandable
- chat still remains usable if suggestions are weak or absent

---

## P2-009 — Phase 2 demo and manual test pass

### Goal
Run the full Phase 2 checklist from the phased development plan.

### Suggested owner / agent
- Platform, Quality, and DevOps Agent
- Angular Frontend Agent
- .NET API Agent

### Dependencies
- P2-001 through P2-004, P2-006 through P2-008

### Definition of done
- Phase 2 manual checklist completed
- issues logged into Phase 2 correction backlog

---

## 8. Phase 2 Correction Loop Backlog

## P2C-001 — Fix suggestion panel layout and density

### Goal
Refine how suggestions are displayed above the chat.

### Suggested owner / agent
- Angular Material UX Agent
- Angular Frontend Agent

### Dependencies
- P2-009

### Definition of done
- layout is stable and readable
- suggestions are visually distinct and usable

---

## P2C-002 — Reduce duplicate / weak web suggestions

### Goal
Correct obvious retrieval quality issues discovered in Phase 2 review.

### Suggested owner / agent
- Domain & Provider Integration Agent
- Product Contract Agent

### Dependencies
- P2-009

### Definition of done
- most obvious duplicate/low-value results are reduced
- suggestion quality is directionally acceptable

---

## P2C-003 — Stabilize mixed chat + suggestion timing issues

### Goal
Fix race conditions or confusing UI sequencing between chat response and suggestions.

### Suggested owner / agent
- Angular Frontend Agent
- .NET API Agent

### Dependencies
- P2-009

### Definition of done
- response flow feels coherent to the user
- chat and suggestion updates no longer appear broken or out of sync

---

## P2C-005 — Replace chat loading spinner with rotating music phrases

### Goal
Replace the `mat-spinner` in the chat loading bubble with a rotating phrase that cycles every second through a curated pool of music-themed loading messages. A `music_note` icon pulses alongside the phrase.

The phrase pool:
Holding the note / Staying on the downbeat / Lingering in the intro / Looping the pre‑chorus / Riding the sustain pedal / Tuning up forever / Hovering on the fermata / Chilling in the green room / Stuck in soundcheck mode / Spinning the vinyl before the needle drops / Hanging on the last chord / Paused between tracks / Letting the beat simmer / Idling in the bridge / Waiting for the bass to kick in / Floating in reverb / Queued in the playlist / Stuck in the encore gap / Listening to the orchestra warm up / Waiting for the DJ to unmute

### Suggested owner / agent
- Angular Frontend Agent
- Angular Material UX Agent

### Dependencies
- P2-009

### Definition of done
- `mat-spinner` removed from chat loading bubble
- phrase rotates every 1 second while loading is in progress
- a pulsing music note icon accompanies the phrase

---

## P2C-006 — Replace suggestions panel header spinner with animated music bars

### Goal
Replace the `mat-spinner` in the suggestions panel header with a CSS-only animated equalizer bars indicator while suggestions are loading.

### Suggested owner / agent
- Angular Frontend Agent
- Angular Material UX Agent

### Dependencies
- P2-009

### Definition of done
- `mat-spinner` removed from suggestions panel header
- animated equalizer bars render during loading state
- animation is smooth and clearly communicates loading

---

## P2C-007 — Rename suggestions panel title to "Local Suggested Tracks"

### Goal
Update the suggestions panel header label from "Suggested Tracks" to "Local Suggested Tracks" to clearly indicate the results are filtered against the local Clementine library.

### Suggested owner / agent
- Angular Frontend Agent

### Dependencies
- P2-009

### Definition of done
- panel header reads "Local Suggested Tracks"

---

## P2C-008 — Fix initial layout cramped on left before first message

### Goal
The chat component starts visually cramped on the left side of the screen before the first message is sent, then expands. This is caused by the root app component using `display: flex` which makes the chat only as wide as its content. Fix so the chat fills the full viewport from load.

### Suggested owner / agent
- Angular Frontend Agent

### Dependencies
- P2-009

### Definition of done
- chat component fills full viewport width on initial load without any interaction

---

## P2C-004 — Phase 2 stabilization sign-off

### Goal
Confirm Phase 2 is stable enough to support local-library grounding work.

### Suggested owner / agent
- Solution Architect Agent
- Product Contract Agent

### Dependencies
- P2C-001 through P2C-003

### Definition of done
- Phase 2 exit criteria passed
- proceed/no-proceed decision documented

---

## 9. Phase 3 Backlog — Clementine Local Filtering

### Matching strategy

Phase 3 checks each Gemini suggestion against the local Clementine library using **normalised fuzzy string matching**. Both the Gemini suggestion and the local track tag are normalised (lowercase, punctuation stripped, whitespace collapsed) before comparison. Artist + title are the primary match keys; album is an optional tiebreaker.

All tracks are returned to the frontend tagged with an `inLocalLibrary` flag. Tracks found in the local library are shown with a **blue** visual treatment; tracks not found are shown with a **magenta** treatment and a YouTube icon for quick discovery. Nothing is hidden from the user.

External providers (Last.fm, MusicBrainz) are not used for matching. Local music files do not carry provider-assigned identifiers in their tags, so a canonical identity lookup would still resolve to a string comparison — adding latency with no improvement in match quality.

### Clementine database access strategy

The app reads from a **copy** of the Clementine SQLite database. The path to that copy is set via `CLEMENTINE_DB_PATH` (environment variable), with a fallback default in `appsettings.json` (`C:\Code\clementine.db`).

---

## P3-001 — Define filtered suggestion contract

### Goal
Update the suggestion response contract so it carries only locally matched tracks. Tracks that do not match the local library are excluded from the payload rather than annotated.

### Suggested owner / agent
- Product Contract Agent
- .NET API Agent

### Dependencies
- P2C-004

### Definition of done
- response contract reflects a filtered (local-only) suggestion list
- empty list + message is supported for the case where no local matches are found

---

## P3-002 — Implement Clementine DB path configuration

### Goal
Introduce backend configuration for the path to the Clementine database copy.

### Suggested owner / agent
- Domain & Provider Integration Agent
- Platform, Quality, and DevOps Agent

### Dependencies
- FND-006
- P2C-004

### Definition of done
- `CLEMENTINE_DB_PATH` environment variable is read by the backend
- a default of `C:\Code\clementine.db` is set in `appsettings.json`
- an invalid or missing path produces a visible, controlled error

---

## P3-003 — Build Clementine adapter/service

### Goal
Implement backend access to the Clementine SQLite database copy. Read the local track inventory (title, artist, album, file path) into an in-memory snapshot.

### Suggested owner / agent
- Domain & Provider Integration Agent

### Dependencies
- P3-002

### Definition of done
- backend can load local music inventory from the configured SQLite copy
- adapter is abstracted behind an interface and independently testable
- DB read failure is surfaced cleanly rather than silently swallowed

---

## P3-004 — Implement local inventory snapshot model

### Goal
Define the normalised backend model for a local track entry used by the matching step.

### Suggested owner / agent
- Domain & Provider Integration Agent

### Dependencies
- P3-003

### Definition of done
- local inventory snapshot model exists (title, artist, album, file path)
- normalised forms (lowercase, punctuation stripped) are computed on load
- data shape is stable for the matching logic

---

## P3-005 — Implement normalised fuzzy matching logic

### Goal
Match each Gemini-suggested track against the local inventory using normalised fuzzy string comparison on artist + title.

### Suggested owner / agent
- Domain & Provider Integration Agent

### Dependencies
- P3-004
- P3-001

### Definition of done
- normalisation is applied to both the Gemini suggestion and the local track before comparison
- similarity threshold is configurable (default in `appsettings.json`)
- tracks below the threshold are excluded from results
- album is used as an optional tiebreaker where title + artist alone are ambiguous

---

## P3-006 — Return locally filtered results from the recommendations endpoint

### Goal
Update the recommendations endpoint so the suggestion list contains only tracks that matched the local library.

### Suggested owner / agent
- .NET API Agent

### Dependencies
- P3-005

### Definition of done
- response suggestions contain only locally matched tracks
- if no tracks match, an empty list with an explanatory message is returned
- existing chat narrative is unaffected

---

## P3-007 — Update frontend suggestions panel to show both local and discovery tracks

### Goal
Update the suggestions panel and track card component to render two visual variants based on the `inLocalLibrary` flag returned by the API.

- Local tracks (blue `#00C8FF`): owned, playable from local library
- Discovery tracks (magenta `#FF2EBE`): recommended but not owned; include a YouTube icon that links to a YouTube search for the track

### Suggested owner / agent
- Angular Frontend Agent
- Angular Material UX Agent

### Dependencies
- P3-006

### Definition of done
- local tracks render with blue card border and title
- discovery tracks render with magenta card border and title
- discovery tracks show a YouTube icon linking to a YouTube search in a new tab
- empty state is still handled when Gemini returns zero tracks

---

## P3-008 — Add safe degraded behavior for DB unavailable states

### Goal
Handle cases where the Clementine database copy is missing, unreadable, or at a misconfigured path.

### Suggested owner / agent
- Domain & Provider Integration Agent
- .NET API Agent
- Angular Frontend Agent

### Dependencies
- P3-003
- P3-007

### Definition of done
- user sees a clear, safe message when local filtering cannot run
- the app does not silently return an unfiltered list pretending it has been locally matched
- the chat narrative is still returned even when local filtering fails

---

## P3-009 — Phase 3 demo and manual test pass

### Goal
Run the full Phase 3 checklist from the phased development plan.

### Suggested owner / agent
- Platform, Quality, and DevOps Agent
- Angular Frontend Agent
- .NET API Agent
- Domain & Provider Integration Agent
- Ranking & Explanation Agent

### Dependencies
- P3-001 through P3-008

### Definition of done
- Phase 3 manual checklist completed
- issues logged into Phase 3 correction backlog

---

## 10. Phase 3 Correction Loop Backlog

## P3C-001 — Improve local match quality

### Goal
Correct false positives / false negatives in local matching behavior.

### Suggested owner / agent
- Domain & Provider Integration Agent
- Ranking & Explanation Agent

### Dependencies
- P3-009

### Definition of done
- most obvious incorrect matches are resolved
- exact vs approximate behavior is more believable

---

## P3C-002 — Tune fuzzy match threshold

### Goal
Adjust the similarity threshold and normalisation rules based on real library data discovered during Phase 3 testing.

### Suggested owner / agent
- Domain & Provider Integration Agent

### Dependencies
- P3-009

### Definition of done
- threshold is set to a value that catches obvious owned tracks without producing false positives
- normalisation handles common tagging conventions found in the actual library

---

## P3C-003 — Stabilize DB failure and stale-data behavior

### Goal
Fix awkward degraded states discovered during Phase 3 testing.

### Suggested owner / agent
- Domain & Provider Integration Agent
- .NET API Agent
- Platform, Quality, and DevOps Agent

### Dependencies
- P3-009

### Definition of done
- DB failure behavior is safe and predictable
- stale or invalid DB conditions are handled visibly

---

## P3C-006 — Show both local and discovery tracks with distinct visual styling

### Goal
Return all tracks that Gemini recommends — not just the ones present in the local library. Each track is tagged with whether it was found locally (`inLocalLibrary`).

**Visual treatment:**
- **In local library** → light blue accent (`#00C8FF`) card border and title
- **Not in local library (discovery)** → magenta accent (`#FF2EBE`) card border and title, plus a YouTube icon that opens a YouTube search for that track in a new browser tab

**Ordering:** locally owned tracks appear first, discovery tracks follow.

**DB unavailable degradation:** when the Clementine DB cannot be loaded, all tracks are shown as discovery (magenta) with a warning message, rather than returning an empty list.

**Suggestion cache:** caching still applies only to locally owned tracks (as per P3C-005). Discovery tracks are not cached.

### Suggested owner / agent
- Angular Frontend Agent
- .NET API Agent

### Dependencies
- P3C-005

### Definition of done
- Both track types are returned from the API with `inLocalLibrary` flag
- Blue cards for local tracks, magenta cards + YouTube icon for discovery tracks
- YouTube icon opens `https://www.youtube.com/results?search_query=Artist+Title` in a new tab
- DB failure returns all tracks as discovery rather than empty

---

## P3C-005 — Cache recently suggested tracks to avoid repetition

### Goal
Add a server-side in-memory cache that tracks which local suggestions have already been returned to the user. Within a configurable time window (default 1 hour), exclude previously suggested tracks from new responses.

Override rule: if excluding cached tracks would leave an empty result but the local library filter matched tracks, ignore the cache for that request and return the matched set anyway.

Configuration:
- `SuggestionCacheDurationMinutes` in `appsettings.json` Recommendation section (default: `60`)
- `RECOMMENDATION_SUGGESTION_CACHE_MINUTES` environment variable override

### Suggested owner / agent
- Domain & Provider Integration Agent
- .NET API Agent

### Dependencies
- P3-008

### Definition of done
- Previously suggested tracks are not returned again within the cache window
- Override fires correctly when all local matches are cached (returns full matched set instead of empty)
- Cache duration is read from configuration, not hardcoded
- Cache is cleared of expired entries lazily on each write

---

## P3C-004 — Phase 3 stabilization sign-off

### Goal
Confirm the product now behaves as a personal local-collection discovery tool.

### Suggested owner / agent
- Solution Architect Agent
- Product Contract Agent

### Dependencies
- P3C-001 through P3C-003

### Definition of done
- Phase 3 exit criteria passed
- proceed/no-proceed decision documented

---

## 11. Cross-Cutting Hardening Backlog

## X-001 — Add backend health checks beyond baseline

### Goal
Expand health checks to include important dependencies where appropriate.

### Suggested owner / agent
- Platform, Quality, and DevOps Agent
- .NET API Agent

### Dependencies
- FND-003
- later phases as needed

### Definition of done
- liveness/readiness behavior is meaningful for current architecture

---

## X-002 — Add endpoint-level rate limiting where needed

### Goal
Protect expensive or abuse-prone endpoints.

### Suggested owner / agent
- Platform, Quality, and DevOps Agent
- .NET API Agent

### Dependencies
- Phase 1 or later, depending on endpoint readiness

### Definition of done
- appropriate endpoints have rate-limiting policy applied
- rejection behavior is predictable

---

## X-003 — Add structured telemetry / observability events

### Goal
Improve traceability for chat, suggestions, and local filtering flows.

### Suggested owner / agent
- Platform, Quality, and DevOps Agent

### Dependencies
- FND-005

### Definition of done
- key request lifecycle events are observable
- degraded paths are diagnosable

---

## X-004 — Add end-to-end test suite per phase

### Goal
Ensure each phase has at least one real user-flow test.

### Suggested owner / agent
- Platform, Quality, and DevOps Agent
- Angular Frontend Agent
- .NET API Agent

### Dependencies
- relevant phase completion

### Definition of done
- minimum E2E test exists for each completed phase

---

## X-005 — Prepare deployment baseline

### Goal
Define deployment-ready defaults for:
- environment config
- secrets handling
- API base URL routing
- logging
- health endpoints

### Suggested owner / agent
- Platform, Quality, and DevOps Agent

### Dependencies
- after basic end-to-end functionality exists

### Definition of done
- deployment baseline is documented and minimally testable

---

## 12. Suggested Milestones

## Milestone A — Foundation Ready
Includes:
- FND-001 through FND-006

## Milestone B — Phase 1 Complete
Includes:
- P1-001 through P1-010
- P1C-001 through P1C-004

## Milestone C — Phase 2 Complete
Includes:
- P2-001 through P2-009
- P2C-001 through P2C-004

## Milestone D — Phase 3 Complete
Includes:
- P3-001 through P3-009
- P3C-001 through P3C-004

## Milestone E — Hardening Baseline
Includes:
- X-001 through X-005 as appropriate

---

## 13. Recommended First Execution Order

If you want the smallest practical path to a working build, start in this order:

1. FND-001
2. FND-002
3. FND-003
4. FND-004
5. FND-005
6. FND-006
7. P1-001
8. P1-002
9. P1-003
10. P1-004
11. P1-005
12. P1-006
13. P1-007
14. P1-008
15. P1-009
16. P1-010
17. P1 correction loop

Only then move into Phase 2.

---

## 14. Executive Summary

This backlog turns the phased development plan into an actionable implementation roadmap.

The delivery sequence is intentionally incremental:

- **Phase 1:** chat-only
- **Phase 2:** chat + web suggestions
- **Phase 3:** chat + web suggestions filtered/grounded to Clementine local ownership

The critical rule is this:

> **each phase must become testable, then corrected, before the next phase begins.**

That is the safest and most practical way to build this app without losing control of quality as it grows.
