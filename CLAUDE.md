# CLAUDE.md

## Project Summary
This repository contains **Reasonic** — a Personal Music Discovery Web App.

> *The music hiding in your mind.*

The current intended architecture is:
- **Frontend:** Angular + Angular Material SPA
- **Backend:** ASP.NET Core Web API
- **Current delivery approach:** phased vertical slices

The app is being built in phases:
1. **Phase 1:** chat-only AI prototype
2. **Phase 2:** chat + web suggestions above the chat
3. **Phase 3:** chat + web suggestions filtered/grounded using the local Clementine library
4. **Phase 4:** local track actions — copy artist+title to clipboard, and add track(s) to Clementine playlist via `clementine -a <path>` CLI (cross-platform)
5. **Phase 5:** full UI/UX revamp — split-pane layout (40/60), album art from Last.fm, 2×4 recommendation grid, redesigned model selector ("Inner Voice" / "Cosmic Voice"), Inter font, CSS color tokens
6. **Phase 6:** Reasonic brand identity — product renamed to Reasonic, new logo/favicon, tagline "The music hiding in your mind", overhauled empty/loading states, unified magenta tile styling
7. **Phase 7:** Dual Inner Voice models — "Inner Whisper" (llama3.1:8b) and "Inner Shout" (gemma4:e4b) selectable via a 3-button toggle; `OLLAMA_MODEL` replaced by `OLLAMA_WHISPER_MODEL` and `OLLAMA_SHOUT_MODEL`
8. **Phase 8:** Fluent conversation memory — server-side SQLite session log recording user prompts, AI replies, and track interactions (Clementine adds + YouTube clicks); FIFO memory capped at 25 AI replies; AI context rebuilt from the log and enriched with a temporal preamble; all providers instructed to reference listening history in replies and recommendations; memory progress bar + bust button in UI

## How to Navigate This Repository
Use these locations as the primary sources of truth:

### Project entry points
- `README.md`
- `docs/README.md`

### Delivery and planning
- `docs/plans/phased-development-and-test-plan-personal-music-discovery-web-app.md`
- `docs/plans/implementation-backlog-personal-music-discovery-web-app.md`
- `docs/plans/github-copilot-agent-plan-personal-music-discovery-engine.md`

### Architecture
- `docs/architecture/phase8-session-memory-design.md` — Phase 8 session memory: SQLite schema, FIFO eviction, preamble injection, API surface
- `docs/architecture/angular-material-dotnet-api-architecture-best-practices.md`
- `docs/architecture/logical-component-architecture-personal-music-discovery-engine.md`
- `docs/architecture/query-execution-sequence-diagram-personal-music-discovery-engine.md`
- `docs/architecture/provider-failure-graceful-degradation-sequence-diagram-personal-music-discovery-engine.md`

### Contracts
- `docs/contracts/stage-by-stage-data-contracts-personal-music-discovery-engine.md`

### Policies
- `docs/policies/ranking-policy-personal-music-discovery-engine.md`
- `docs/policies/explanation-policy-personal-music-discovery-engine.md`
- `docs/policies/provider-caching-and-persistence-model-personal-music-discovery-engine.md`
- `docs/architecture/secrets-and-environment-variable-strategy-third-party-providers.md`

### Governance
- `docs/governance/agent-handover-matrix-personal-music-discovery-engine.md`

## Primary Working Rules
- Build the system in **vertical slices**.
- Prefer a feature that is runnable and testable end-to-end over disconnected frontend/backend work.
- End each phase with a correction/stabilization loop before adding the next major capability.
- Do not jump ahead to a later phase while earlier phase work is still incomplete unless explicitly asked.

## Stack Rules

### Frontend
- Keep Angular code organized by **feature area**.
- Prefer **standalone Angular patterns**.
- Keep components small and focused.
- Use typed client-side API services.
- Implement loading, empty, and error states deliberately.
- Use Angular Material consistently.
- Preserve accessibility basics.

### Backend
- Keep ASP.NET Core endpoints/controllers thin.
- Put business/application logic behind the HTTP layer.
- Use explicit request/response DTOs.
- Preserve consistent validation and error handling.
- Keep provider integrations isolated behind dedicated adapters/services.
- Keep local Clementine DB access behind a dedicated adapter/service.

## Provider Rules
- All provider calls must happen on the **backend only**.
- Never expose provider credentials to the frontend.
- Gemini, Ollama, and Clementine DB access must all remain behind backend abstractions.
- Normalize provider data into application-owned models before returning results.
- Respect provider-specific rate limits and graceful degradation behavior.

## Secrets Rule
- Third-party credentials must come from **environment variables** or a secure secret store.
- Never hardcode secrets.
- Never commit secrets.
- Never put secrets in Angular/browser-delivered configuration.

## Current Known Environment Variables
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `GEMINI_BASE_URL`
- `OLLAMA_BASE_URL`
- `OLLAMA_WHISPER_MODEL` — model tag for "Inner Whisper" (default: `llama3.1:8b`); replaces `OLLAMA_MODEL`
- `OLLAMA_SHOUT_MODEL` — model tag for "Inner Shout" (default: `gemma4:e4b`)
- `CLEMENTINE_DB_PATH`
- `CLEMENTINE_MATCH_THRESHOLD`
- `RECOMMENDATION_MIN_TRACKS`
- `RECOMMENDATION_MAX_TRACKS`
- `RECOMMENDATION_SUGGESTION_CACHE_MINUTES`
- `CLEMENTINE_EXE_PATH` — path to Clementine executable (default: `C:\Program Files (x86)\Clementine\clementine.exe` on Windows, `clementine` on Linux)
- `LASTFM_API_KEY` — Last.fm read API key for album art (required in Phase 5)
- `LASTFM_BASE_URL` — Last.fm API base URL (optional, defaults to `https://ws.audioscrobbler.com/2.0/`)
- `SESSION_DB_PATH` — path to the session history SQLite database (Phase 8; default: `session_history.db` next to the binary)
- `SESSION_MEMORY_SIZE` — max number of active AI replies kept in memory (Phase 8; default: `25`)
- `SESSION_DEFAULT_TRACK_DURATION_SECONDS` — assumed duration in seconds for tracks with no Clementine data (Phase 8; default: `210` = 3.5 min)
- `APP_PUBLIC_URL`
- `APP_CONTACT_EMAIL`
- `APP_VERSION`

## Build / Test Expectations
When making changes, always consider:
- how to build the client
- how to build the server
- what tests must be added or updated
- what success criteria prove the change works

If exact commands are missing, update the documentation or ask for the missing build/test commands instead of inventing elaborate workflows.

## Documentation Update Rule
If a change materially affects:
- architecture
- contracts
- provider behavior
- ranking/explanation rules
- secrets strategy
- or backlog sequencing

then update the relevant docs or explicitly note that documentation must be updated.

## Existing GitHub Copilot Files
This repository may also contain `.github/copilot-instructions.md`, `.github/instructions/*`, and `.github/agents/*` files. Those files remain useful. Treat them as complementary repository guidance, not conflicting guidance.
