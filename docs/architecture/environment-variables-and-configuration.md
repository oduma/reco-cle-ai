# Environment Variables & Configuration Reference

## Complete variable list

| Variable | UI-configurable | Required | Default | Purpose |
|---|---|---|---|---|
| `REASONIC_DB_PATH` | **No** | No | `reasonic.db` (next to binary) | Path to the main SQLite database; must exist before the app can read any other setting |
| `GEMINI_API_KEY` | Yes | **Yes** | — | Google Gemini authentication key |
| `GEMINI_MODEL` | Yes | No | `gemini-2.5-pro` | Gemini model tag |
| `GEMINI_BASE_URL` | Yes | No | `https://generativelanguage.googleapis.com` | Gemini API base URL |
| `LASTFM_API_KEY` | Yes | **Yes** | — | Last.fm authentication key (album art) |
| `LASTFM_BASE_URL` | Yes | No | `https://ws.audioscrobbler.com/2.0/` | Last.fm API base URL |
| `OLLAMA_BASE_URL` | Yes | No | `http://localhost:11434` | Ollama server URL |
| `OLLAMA_WHISPER_MODEL` | Yes | No | `llama3.1:8b` | Model tag for "Inner Whisper" |
| `OLLAMA_SHOUT_MODEL` | Yes | No | `gemma4:e4b` | Model tag for "Inner Shout" |
| `CLEMENTINE_DB_PATH` | Yes | No | — | Path to the Clementine SQLite database copy |
| `CLEMENTINE_MATCH_THRESHOLD` | Yes | No | `0.75` | Fuzzy-match similarity threshold for local library matching (0–1) |
| `CLEMENTINE_EXE_PATH` | Yes | No | `C:\Program Files (x86)\Clementine\clementine.exe` (Windows) / `clementine` (Linux) | Path to the Clementine executable |
| `RECOMMENDATION_MIN_TRACKS` | Yes | No | `10` | Minimum number of tracks to request from the AI |
| `RECOMMENDATION_MAX_TRACKS` | Yes | No | `20` | Maximum number of tracks to request from the AI |
| `RECOMMENDATION_SUGGESTION_CACHE_MINUTES` | Yes | No | `60` | How long enriched suggestion results are cached (minutes) |
| `SESSION_MEMORY_SIZE` | Yes | No | `25` | Maximum AI replies kept before FIFO eviction |
| `SESSION_DEFAULT_TRACK_DURATION_SECONDS` | Yes | No | `210` (3.5 min) | Assumed duration for tracks with no Clementine data |

---

## Order of precedence (Phase 11 onward)

Highest wins. Each layer only needs to supply values that differ from the layer below it.

```
1. app_settings table (DB)        ← user's explicit choice via the settings panel
2. Environment variables           ← deployment / bootstrap seed values
3. appsettings.{Environment}.json  ← environment-specific non-secret overrides
4. appsettings.json                ← committed non-secret defaults
5. Code defaults (Options classes) ← last-resort safety net
```

### What belongs in each layer

| Layer | Secrets (API keys) | Non-secret config | Notes |
|---|---|---|---|
| `app_settings` DB table | ✅ | ✅ | User-controlled at runtime; highest authority |
| Environment variables | ✅ | ✅ | Seed values on first launch; authoritative in production environments where the UI is not used |
| `appsettings.{Env}.json` | ❌ never | ✅ | Environment-specific URL overrides |
| `appsettings.json` | ❌ never | ✅ | Shared defaults (URLs, thresholds, counts) |
| Code defaults | ❌ never | ✅ conservative | Safety net only |

**Rule: API keys must never appear in any `.json` file, committed or otherwise.**

### Blank-field save rule

If the user clears a field in the settings panel and saves, the corresponding row is deleted from `app_settings`. The env var or `appsettings.json` value becomes effective again on the next request.

### `REASONIC_DB_PATH` exception

`REASONIC_DB_PATH` is the only variable that bypasses the precedence chain. The database must exist before the `app_settings` table can be read. It is therefore resolved once at startup from env var → code default only, and is not shown in the settings modal.

---

## `appsettings.json` — intended state (Phase 11)

Non-secret defaults only. Machine-specific paths and API keys must never appear here.

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Gemini": {
    "BaseUrl": "https://generativelanguage.googleapis.com",
    "Model": "gemini-2.5-pro"
  },
  "Ollama": {
    "BaseUrl": "http://localhost:11434",
    "WhisperModel": "llama3.1:8b",
    "ShoutModel": "gemma4:e4b"
  },
  "Recommendation": {
    "MinTracks": 10,
    "MaxTracks": 20,
    "SuggestionCacheDurationMinutes": 60
  },
  "Clementine": {
    "MatchThreshold": 0.75
  }
}
```

---

## `.env` file (local development)

A `.env` file at the repository root (gitignored) provides the initial bootstrap values for local development. Once the app is running and the settings panel has been used to configure things, the `.env` file is no longer the primary source — the DB takes over.

A `.env.example` template (committed) should be kept up to date:

```
# .env.example — copy to .env and fill in real values; never commit .env

# Only REASONIC_DB_PATH is not configurable via the UI
# REASONIC_DB_PATH=reasonic.db

# Required on first launch (can be set via the settings panel afterwards)
GEMINI_API_KEY=your-gemini-key-here
LASTFM_API_KEY=your-lastfm-key-here

# Optional overrides — uncomment to change bootstrap defaults
# GEMINI_MODEL=gemini-2.5-pro
# GEMINI_BASE_URL=https://generativelanguage.googleapis.com
# LASTFM_BASE_URL=https://ws.audioscrobbler.com/2.0/
# OLLAMA_BASE_URL=http://localhost:11434
# OLLAMA_WHISPER_MODEL=llama3.1:8b
# OLLAMA_SHOUT_MODEL=gemma4:e4b
# CLEMENTINE_DB_PATH=C:\path\to\your\clementine.db
# CLEMENTINE_MATCH_THRESHOLD=0.75
# CLEMENTINE_EXE_PATH=C:\Program Files (x86)\Clementine\clementine.exe
# RECOMMENDATION_MIN_TRACKS=10
# RECOMMENDATION_MAX_TRACKS=20
# RECOMMENDATION_SUGGESTION_CACHE_MINUTES=60
# SESSION_MEMORY_SIZE=25
# SESSION_DEFAULT_TRACK_DURATION_SECONDS=210
```

---

## History of changes

| Phase | Change |
|-------|--------|
| Phase 8 | `SESSION_DB_PATH` introduced; `SESSION_MEMORY_SIZE`; `SESSION_DEFAULT_TRACK_DURATION_SECONDS` |
| Phase 11 | `SESSION_DB_PATH` renamed to `REASONIC_DB_PATH`; default file renamed `session_history.db` → `reasonic.db`; `app_settings` DB table added; all variables except `REASONIC_DB_PATH` become UI-configurable |
