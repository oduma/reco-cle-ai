# Environment Variables & Configuration Reference

## Summary (Phase 19+)

Only **two environment variables are required** to run Reasonic. Everything else is
seeded into `reasonic.db` on first run and managed from the in-app settings panel.

| Variable | Required | Notes |
|---|---|---|
| `GEMINI_API_KEY` | **Yes** | Google Gemini authentication key. Seeded to DB on first run; env var kept as fallback. |
| `LASTFM_API_KEY` | **Yes** | Last.fm key for album art. Same seeding behaviour. |
| `REASONIC_DB_PATH` | No | Path to `reasonic.db`. Default: `reasonic.db` next to the binary. **Not UI-configurable.** Needed only when the DB lives in a non-default location. |
| `CLEMENTINE_DB_PATH` | No | Clementine database copy path. Seeded to DB from env var on first run if present; configure via settings panel afterward. No longer needed in `.env.local` after first run. |

---

## Complete variable reference

### Always env-var-only
| Variable | Default | Notes |
|---|---|---|
| `REASONIC_DB_PATH` | `reasonic.db` next to binary | Resolved at startup before the DB can be opened. Not shown in the settings panel. |

### API keys (env var + DB, env var retained as fallback)
| Variable | Default | Notes |
|---|---|---|
| `GEMINI_API_KEY` | — | Required. Set in `.env.local`; seeded to `app_settings` on first run. Env var still checked if DB row is absent. |
| `LASTFM_API_KEY` | — | Required. Same behaviour. |

### First-run seeded from env var (no longer needed afterward)
| Variable | Default | Notes |
|---|---|---|
| `CLEMENTINE_DB_PATH` | — | Seeded from env var on first run; configure via settings panel thereafter. |

### DB-only after first run (never need to be env vars)
All of these are seeded into `app_settings` on startup using built-in defaults. Set them
from the in-app settings panel (gear icon) if you need different values.

| Variable | Default | Notes |
|---|---|---|
| `GEMINI_MODEL` | `gemini-2.5-pro` | |
| `GEMINI_BASE_URL` | `https://generativelanguage.googleapis.com` | |
| `LASTFM_BASE_URL` | `https://ws.audioscrobbler.com/2.0/` | |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | |
| `OLLAMA_WHISPER_MODEL` | `llama3.1:8b` | Inner Whisper model |
| `OLLAMA_SHOUT_MODEL` | `gemma4:e4b` | Inner Shout model |
| `CLEMENTINE_EXE_PATH` | `clementine` (Linux) / `C:\Program Files (x86)\Clementine\clementine.exe` (Windows) | OS-detected at startup |
| `CLEMENTINE_MATCH_THRESHOLD` | `0.75` | Fuzzy-match threshold 0–1 |
| `RECOMMENDATION_MIN_TRACKS` | `10` | |
| `RECOMMENDATION_MAX_TRACKS` | `20` | |
| `RECOMMENDATION_SUGGESTION_CACHE_MINUTES` | `60` | |
| `RECOMMENDATION_HISTORY_MAX_ROWS` | `10000` | |
| `SESSION_MEMORY_SIZE` | `25` | Max AI replies before FIFO eviction |
| `SESSION_DEFAULT_TRACK_DURATION_SECONDS` | `210` | 3.5 min assumed for tracks with no Clementine data |
| `USE_USER_LOCATION` | `false` | UI-only toggle; send city/country to AI |
| `USE_CURRENT_WEATHER` | `false` | UI-only toggle; send current weather to AI |

---

## Order of precedence (Phase 19)

```
For API keys (GEMINI_API_KEY, LASTFM_API_KEY):
  1. app_settings table (DB)    ← user override or first-run seed from env var
  2. Environment variable        ← fallback retained for bootstrapping
  3. Code default (empty)        ← safety net

For all other settings:
  1. app_settings table (DB)    ← user override or startup seed
  3. Code default (hardcoded)    ← safety net only; normally never reached

For REASONIC_DB_PATH:
  1. Environment variable
  2. Code default (reasonic.db next to binary)
```

### Blank-field save rule

If the user clears a field in the settings panel and saves, the row is deleted from
`app_settings`. The next startup re-seeds the hardcoded default for non-secret settings.
For API keys, the env var fallback becomes active immediately.

### `app_setting_defaults` table

A separate `app_setting_defaults` table in `reasonic.db` stores the canonical hardcoded
defaults. It is written by the app on every startup (UPSERT — updates when defaults change
between app versions). The `GET /api/settings/defaults` endpoint reads from this table and
the settings panel uses it for "Reset to default" buttons.

---

## `.env.local` template (Phase 19+)

```bash
# .env.local — place in the same folder as the Reco.Api binary
# Only these entries are needed. Everything else is auto-configured.

# Required: API keys (seeded to reasonic.db on first run; kept as fallback)
GEMINI_API_KEY=your-gemini-key-here
LASTFM_API_KEY=your-lastfm-key-here

# Optional: Clementine integration (seeded to DB on first run)
# CLEMENTINE_DB_PATH=/path/to/clementine.db

# Optional: non-default DB location (not seeded; must remain here every run)
# REASONIC_DB_PATH=/path/to/reasonic.db
```

---

## History of changes

| Phase | Change |
|-------|--------|
| Phase 8 | `SESSION_DB_PATH` introduced; `SESSION_MEMORY_SIZE`; `SESSION_DEFAULT_TRACK_DURATION_SECONDS` |
| Phase 11 | `SESSION_DB_PATH` → `REASONIC_DB_PATH`; `session_history.db` → `reasonic.db`; `app_settings` table; all variables except `REASONIC_DB_PATH` become UI-configurable |
| Phase 15 | EF Core migrations introduced; `__EFMigrationsHistory` table |
| Phase 17 | `RECOMMENDATION_HISTORY_MAX_ROWS` added |
| Phase 18 | `AppSettingDefaults` class; `GET /api/settings/defaults` extended to cover all non-secret settings |
| Phase 19 | `app_setting_defaults` table; all non-secret settings seeded to DB on startup; `AppSettingsService` bypasses env vars for non-secrets; only `GEMINI_API_KEY`, `LASTFM_API_KEY`, `CLEMENTINE_DB_PATH` seeded from env var; `REASONIC_DB_PATH` remains env-var-only |
