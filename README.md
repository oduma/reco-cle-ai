# Reasonic

Personal Music Discovery Web App built as an **Angular + Angular Material SPA** with an **ASP.NET Core Web API** backend.

> *The music hiding in your mind.*

The application is being developed incrementally so it can be tested continuously as it grows.

## Current Product Direction
The roadmap is intentionally phased:

1. **Phase 1 — Chat-only AI prototype**  
   A web app with a chat window where you can interact with the AI.

2. **Phase 2 — Web suggestions above the chat**  
   The app keeps the chat and adds a structured suggestion list above it.

3. **Phase 3 — Clementine local filtering**  
   Web suggestions are filtered or grounded against the local Clementine music library.

4. **Phase 4 — Clementine player control**  
   Copy artist+title to clipboard; add local tracks to the Clementine playlist via CLI.

5. **Phase 5 — UI/UX revamp**  
   Split-pane layout, album art from Last.fm, 2×4 recommendation grid, redesigned model selector, Inter font, CSS color tokens.

6. **Phase 6 — Reasonic brand identity**  
   Product renamed to Reasonic, new logo and favicon, tagline, overhauled empty/loading states, unified magenta tile styling.

7. **Phase 7:** Dual Inner Voice models — "Inner Whisper" (llama3.1:8b) and "Inner Shout" (gemma4:e4b) selectable via a 3-button toggle; `OLLAMA_MODEL` replaced by `OLLAMA_WHISPER_MODEL` and `OLLAMA_SHOUT_MODEL`
8. **Phase 8:** Fluent conversation memory — server-side SQLite session log recording user prompts, AI replies, and track interactions (Clementine adds + YouTube clicks); FIFO memory capped at 25 AI replies; AI context rebuilt from the log and enriched with a temporal preamble; all providers instructed to reference listening history in replies and recommendations; memory progress bar + bust button in UI
9. **Phase 9:** History hydration & suggestion rewind — full conversation restored on page load; every AI bubble gains a rewind button (`history` icon) to swap the suggestions panel to that reply's tracks; active reply identity persisted in `session_state` table across refreshes
10. **Phase 10:** Progressive retry & auto-focus — transparent 4-attempt retry on transient 502 errors (3/5/7/10 s delays) with a bold in-bubble notice; prompt input auto-focused on load and after each AI response/error
11. **Phase 11:** In-app settings panel — gear button in header opens a modal where every provider URL, API key, model name, path, and threshold can be viewed and overwritten; settings persisted in `reasonic.db`; take effect on next request without restart; DB renamed from `session_history.db` to `reasonic.db`

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
- `docs/architecture/phase9-history-hydration-design.md` — Phase 9 history hydration: session restore on load, rewind button, active reply persistence
- `docs/architecture/phase10-progressive-retry-and-autofocus-design.md` — Phase 10 progressive retry (502 only, 4 attempts) and auto-focus design
- `docs/architecture/phase11-settings-panel-design.md` — Phase 11 in-app settings panel: app_settings table, IAppSettingsService, service migration, API endpoints, modal design
- `docs/architecture/environment-variables-and-configuration.md` — complete variable reference, recommended precedence order, and known config issues
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

These are bootstrap / fallback values. From Phase 11 onward, all except `REASONIC_DB_PATH` can be overridden at runtime via the in-app settings panel.

- `REASONIC_DB_PATH` — path to the main SQLite database (default: `reasonic.db` next to the binary); **not UI-configurable**
- `GEMINI_API_KEY` — required; Google Gemini authentication key
- `GEMINI_MODEL` — Gemini model tag (default: `gemini-2.5-pro`)
- `GEMINI_BASE_URL` — Gemini API base URL (default: `https://generativelanguage.googleapis.com`)
- `LASTFM_API_KEY` — required; Last.fm authentication key for album art
- `LASTFM_BASE_URL` — Last.fm API base URL (default: `https://ws.audioscrobbler.com/2.0/`)
- `OLLAMA_BASE_URL` — Ollama server URL (default: `http://localhost:11434`)
- `OLLAMA_WHISPER_MODEL` — model tag for "Inner Whisper" (default: `llama3.1:8b`)
- `OLLAMA_SHOUT_MODEL` — model tag for "Inner Shout" (default: `gemma4:e4b`)
- `CLEMENTINE_DB_PATH` — path to the Clementine SQLite database copy (no default; must be set)
- `CLEMENTINE_MATCH_THRESHOLD` — fuzzy-match similarity threshold 0–1 (default: `0.75`)
- `CLEMENTINE_EXE_PATH` — path to Clementine executable (default: `C:\Program Files (x86)\Clementine\clementine.exe` on Windows, `clementine` on Linux)
- `RECOMMENDATION_MIN_TRACKS` — minimum tracks to request from AI (default: `10`)
- `RECOMMENDATION_MAX_TRACKS` — maximum tracks to request from AI (default: `20`)
- `RECOMMENDATION_SUGGESTION_CACHE_MINUTES` — suggestion cache lifetime in minutes (default: `60`)
- `SESSION_MEMORY_SIZE` — max AI replies kept before FIFO eviction (default: `25`)
- `SESSION_DEFAULT_TRACK_DURATION_SECONDS` — assumed duration for tracks with no Clementine data (default: `210` = 3.5 min)

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
