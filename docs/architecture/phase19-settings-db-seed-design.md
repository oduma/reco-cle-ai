# Phase 19 — Settings DB Seeding Design

## Purpose

Eliminate the need for environment variables for all settings except the two API keys and
`REASONIC_DB_PATH`. All defaults are seeded into `reasonic.db` on first run so the app is
fully self-configuring after the initial API key setup.

---

## Design principles

| Category | Runtime source | Env var after first run |
|---|---|---|
| Non-secret settings (URLs, model names, thresholds, prompts) | `app_settings` in DB only | Bypassed — DB always has a seeded value |
| API keys (`GEMINI_API_KEY`, `LASTFM_API_KEY`) | `app_settings` (DB), then env var fallback | Kept as live fallback |
| `REASONIC_DB_PATH` | Env var only | Unchanged — can't be in the DB |
| Machine-specific paths (`CLEMENTINE_DB_PATH`) | `app_settings` after first-run seeding | Seeded from env var if present on first run, ignored thereafter |

---

## New DB table: `app_setting_defaults`

Created by the `Phase19_AppSettingDefaults` EF Core migration via raw SQL.

```sql
CREATE TABLE app_setting_defaults (
    key        TEXT PRIMARY KEY,
    value      TEXT NOT NULL,
    updated_at TEXT NOT NULL
);
```

**Properties:**
- Written by the app on **every startup** via `WriteDefaultsAsync` (UPSERT — values update when a new app version ships different defaults).
- **Never written by user actions** — it is a read-only canonical reference from the user's perspective.
- Used by `GET /api/settings/defaults` to serve the reset-to-default values for the settings UI.
- No EF entity or `DbSet` — accessed entirely via raw ADO.NET.

The existing `app_settings` table remains the user-editable store. These two tables serve
different purposes:

| Table | Written by | Read by |
|---|---|---|
| `app_settings` | User (via settings panel) + startup seeding (INSERT OR IGNORE) | All runtime settings lookups |
| `app_setting_defaults` | App on every startup (UPSERT) | `GET /api/settings/defaults` (reset button) |

---

## Startup seeding sequence

After `MigrateAsync()` completes, `Program.cs` performs these steps in order:

```
1. WriteDefaultsAsync(allDefaults)
   → Upserts AppSettingDefaults.All + AiPromptDefaults.All into app_setting_defaults.
   → Always overwrites so canonical defaults stay current across upgrades.

2. SeedDefaultsAsync(allDefaults)
   → INSERT OR IGNORE into app_settings.
   → Non-secret settings now always have a DB row after this point.
   → Existing user overrides are never touched.

3. For each of { GEMINI_API_KEY, LASTFM_API_KEY, CLEMENTINE_DB_PATH }:
   → Read from IConfiguration (env var / .env.local).
   → If present: INSERT OR IGNORE into app_settings.
   → One-time migration from .env.local into the DB.
```

After step 3, `.env.local` only needs the two API keys as an ongoing fallback, and
`REASONIC_DB_PATH` if the DB lives in a non-default location.

---

## `AppSettingsService` changes

A private `_secretKeys` set (`GEMINI_API_KEY`, `LASTFM_API_KEY`) controls which keys
retain an environment-variable fallback.

```
GetStringAsync(key, fallback):
  1. _repo.GetAsync(key)         → app_settings (user override or seeded value)
  2. if _secretKeys.Contains(key):
       _config[key]              → env var / .env.local (API keys only)
  3. fallback                    → hardcoded constant (safety net)
```

For non-secret settings, step 2 is skipped. Since these settings are always seeded into
`app_settings` at startup, step 1 always returns a value under normal operation.

---

## `GET /api/settings/defaults` changes

Reads from `_repo.GetAllDefaultsAsync()` (the `app_setting_defaults` table) instead of
merging two code-level dictionaries. `IAiPromptService` is no longer injected into
`SettingsController`.

---

## `AppSettingDefaults.cs`

Introduced in Phase 18. Contains hardcoded defaults for all non-secret, non-prompt
settings. Used in Phase 19 as input to both `WriteDefaultsAsync` and `SeedDefaultsAsync`.

`AppSettingDefaults.ClementineExePath` is OS-detected at startup:
- Windows → `C:\Program Files (x86)\Clementine\clementine.exe`
- Linux → `clementine`

---

## Effect on `.env.local` / deployment

**Before Phase 19:** `.env.local` required all settings that differed from defaults.

**After Phase 19:** `.env.local` needs only:

```bash
GEMINI_API_KEY=your-key-here
LASTFM_API_KEY=your-key-here
# Optional — only if you want Clementine or a non-default DB path:
# CLEMENTINE_DB_PATH=/path/to/clementine.db
# REASONIC_DB_PATH=/path/to/reasonic.db
```

---

## Files changed

| File | Change |
|---|---|
| `Migrations/20260508120000_Phase19_AppSettingDefaults.cs` | **New** — creates `app_setting_defaults` table |
| `Migrations/20260508120000_Phase19_AppSettingDefaults.Designer.cs` | **New** — migration snapshot |
| `Services/IAppSettingsRepository.cs` | `WriteDefaultsAsync` + `GetAllDefaultsAsync` + `GetDefaultAsync` added |
| `Services/AppSettingsRepository.cs` | Three new method implementations |
| `Services/AppSettingsService.cs` | `_secretKeys` set; env var bypass for non-secrets |
| `Controllers/SettingsController.cs` | `GetDefaults()` reads from DB; `IAiPromptService` removed |
| `Program.cs` | Extended seeding sequence; startup warnings use `IAppSettingsService` |
| `linux/deploy-linux.md` | Env var table simplified; first-run seeding documented |
| `CLAUDE.md` | Phase 19 bullet; env vars section rewritten |
