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
9. **Phase 9:** History hydration & suggestion rewind — full conversation restored on page load; every AI bubble gains a rewind button (`history` icon) to swap the suggestions panel to that reply's tracks; active reply identity persisted in `session_state` table across refreshes
10. **Phase 10:** Progressive retry & auto-focus — transparent 4-attempt retry on transient 502 errors (3/5/7/10 s delays) with a bold in-bubble notice; prompt input auto-focused on load and after each AI response/error
11. **Phase 11:** In-app settings panel — gear button in header opens a modal where every provider URL, API key, model name, path, and threshold can be viewed and overwritten; settings persisted in `reasonic.db`; take effect on next request without restart; DB renamed from `session_history.db` to `reasonic.db`
12. **Phase 12:** UI polish — moveable split-pane divider (25 % min chat, max = viewport minus one card width) with auto-reflow card grid (`auto-fill`/`minmax`); full "Reasonic" title rendered with CSS gradient (cyan → magenta); VU meter bars coloured magenta; provider icons added to Inner Whisper (llama3) and Inner Shout (gemma4) toggle buttons; double-click prevention (1 s lock) on all Add-to-Clementine buttons; no-Clementine mode hides all Clementine buttons and removes dimming from discovery tiles; consistent card heights via `height: 100%` + `flex: 1` on track-info; chat loading phrase and retry notice use cyan; Courier font applied to loading bubble and chat error banner only (not suggestion-panel error)
13. **Phase 13:** User changes their mind — mood badge (label + picker icon) in top-right corner of every user bubble; floating mood picker with 9 moods (Normal, Poetic, Humorous, Cosmic, Minimalist, Romantic, Chaotic, Noir, Psychedelic); clicking a different mood re-sends the same prompt appended to the conversation with a mood annotation injected into the AI prompt; Normal sends as-is; mood stored in session DB; historical bubbles restored with their mood on page load
14. **Phase 14:** Musical Diary — calendar icon in header opens a Musical Diary modal; inline MatCalendar highlights past days with activity (cyan) and today (charcoal); clicking a past active day generates a first-person AI diary entry via Gemini covering mood summary, listening critique, most interesting request, and conclusion; entries cached in `diary_entries` table in `reasonic.db`; forced regeneration supported; today never generates a diary
15. **Phase 15:** Safe DB upgrades — EF Core migrations introduced (hybrid mode: repositories keep raw ADO.NET, EF only tracks migration history); `__EFMigrationsHistory` table; `DatabaseBaseline` stamps existing databases at `InitialSchema` so only new migrations run; `CleanupRenamedPromptKeys` migration renames `GEMINI_RECOMMENDATION_INSTRUCTION` → `RECOMMENDATION_INSTRUCTION` and removes dead keys; `dotnet ef migrations add` workflow documented in linux deployment guide
16. **Phase 16:** Environmental context — voice toggle buttons moved from header to Settings modal under "Active Voice" section with model names as labels (reads configured `GEMINI_MODEL`, `OLLAMA_WHISPER_MODEL`, `OLLAMA_SHOUT_MODEL`); header now shows current city/country from IP geolocation (`geo.kamero.ai`); new "Environmental Context" settings section with "Use User Location" and "Use Current Weather" checkboxes (persisted in `reasonic.db`); when enabled, location and/or WMO weather interpretation is appended to each recommendation prompt (not diary); weather uses Open-Meteo free API; geo/weather resolved browser-side for accurate user IP
17. **Phase 17:** Recommendation history no-repeat — persistent `recommendation_history` table (never soft-deleted, survives memory busts); every batch of AI-suggested tracks is written to this table after a response; the last 100 recently recommended tracks are injected into every recommendation prompt as a "do not suggest again" block; table capped at `RECOMMENDATION_HISTORY_MAX_ROWS` rows (default 10,000, oldest deleted first, configurable via Settings modal under Recommendations)
18. **Phase 18:** Settings improvements — two standing rules applied: (1) all non-secret settings have per-field reset-to-default buttons and "Leave blank to use environment variable or default" hint; defaults served by `GET /api/settings/defaults` from new `AppSettingDefaults` class (not hardcoded in Angular); `isSecret: true` field flag controls API key exclusion; (2) `floatLabel="always"` on every form field in the settings modal eliminates label-overlaps-value rendering bug caused by Angular Material outline notch width
19. **Phase 19:** Settings DB seeding — all non-secret defaults seeded into `app_settings` on startup (INSERT OR IGNORE); new `app_setting_defaults` table stores canonical defaults (always UPSERT on startup so they update with app upgrades); `GET /api/settings/defaults` now reads from DB; `AppSettingsService` bypasses env var lookup for non-secret settings (DB-only after seeding); API keys (`GEMINI_API_KEY`, `LASTFM_API_KEY`) retain env var fallback; `CLEMENTINE_DB_PATH` seeded from env var on first run; only `REASONIC_DB_PATH` and the two API keys need to be in `.env.local`

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
- `docs/architecture/phase12-ui-polish-design.md` — Phase 12 UI polish: moveable divider, gradient title, magenta VU meter, provider icons, double-click prevention, no-Clementine mode, card heights, chat text styling
- `docs/architecture/phase13-mood-picker-design.md` — Phase 13 mood picker: mood badge on user bubbles, floating picker, 9 moods, re-send logic, mood annotation in AI prompt, session DB column
- `docs/architecture/phase14-musical-diary-design.md` — Phase 14 musical diary: calendar modal, active-dates query, Gemini diary generation, diary_entries schema, caching and forced regeneration
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

From Phase 19 onward, only three environment variables are needed. All other settings are
seeded into `reasonic.db` on first run and managed exclusively from the in-app settings panel.

### Required on every run
- `GEMINI_API_KEY` — Google Gemini authentication key. Seeded from env var into DB on first run; env var retained as fallback thereafter.
- `LASTFM_API_KEY` — Last.fm authentication key for album art. Same seeding behaviour as above.

### Required only when using a non-default location
- `REASONIC_DB_PATH` — path to `reasonic.db` (default: `reasonic.db` next to the binary). **Not UI-configurable.** Only needed in `.env.local` if you store the DB elsewhere.

### First-run only (seeded to DB, then no longer needed)
- `CLEMENTINE_DB_PATH` — path to the Clementine SQLite database copy. Read from env var on first run and stored in DB; configure via settings panel afterward.

### No longer needed as environment variables (Phase 19+)
All of the following are seeded into `reasonic.db` automatically. Set them from the in-app
settings panel if you need non-default values:

| Setting key | Default |
|---|---|
| `GEMINI_MODEL` | `gemini-2.5-pro` |
| `GEMINI_BASE_URL` | `https://generativelanguage.googleapis.com` |
| `LASTFM_BASE_URL` | `https://ws.audioscrobbler.com/2.0/` |
| `OLLAMA_BASE_URL` | `http://localhost:11434` |
| `OLLAMA_WHISPER_MODEL` | `llama3.1:8b` |
| `OLLAMA_SHOUT_MODEL` | `gemma4:e4b` |
| `CLEMENTINE_EXE_PATH` | `clementine` (Linux) / `C:\Program Files (x86)\Clementine\clementine.exe` (Windows) |
| `CLEMENTINE_MATCH_THRESHOLD` | `0.75` |
| `RECOMMENDATION_MIN_TRACKS` | `10` |
| `RECOMMENDATION_MAX_TRACKS` | `20` |
| `RECOMMENDATION_SUGGESTION_CACHE_MINUTES` | `60` |
| `RECOMMENDATION_HISTORY_MAX_ROWS` | `10000` |
| `SESSION_MEMORY_SIZE` | `25` |
| `SESSION_DEFAULT_TRACK_DURATION_SECONDS` | `210` |
| `USE_USER_LOCATION` | `false` |
| `USE_CURRENT_WEATHER` | `false` |

## Settings Modal Rules (Phase 18+)

When adding a new setting to the settings modal:

1. **Non-secret settings** (URLs, model names, thresholds, numeric limits):
   - Add a constant to `AppSettingDefaults.All` in `Reco.Api/Services/AppSettingDefaults.cs`.
   - Add a `SettingField` entry in `SETTINGS_GROUPS` with **no** hardcoded `placeholder` (the API-loaded default will be used as placeholder automatically).
   - The reset button and "Leave blank to use default" hint appear automatically.

2. **Secret / API key settings**:
   - Set `isSecret: true` on the `SettingField`.
   - Do **not** add to `AppSettingDefaults` — secrets have no meaningful default.
   - The hint still appears; the reset button does not.

3. **Label length**: `floatLabel="always"` is already on every form field. Labels always sit above the input; no notch sizing issues can occur. Keep labels concise but there is no hard limit.

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
