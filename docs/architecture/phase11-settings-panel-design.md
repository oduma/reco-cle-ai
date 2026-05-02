# Phase 11 — In-App Settings Panel Design

## Purpose

Give the user full control over all runtime configuration from inside the app. A gear button in the header opens a modal where every provider URL, API key, model name, path, and threshold can be read and overwritten. Changes take effect on the next request — no server restart required. The database becomes the primary source of truth for settings; environment variables and `appsettings.json` serve as the bootstrap / fallback layer.

---

## Summary of changes

| Area | Change |
|------|--------|
| DB rename | `session_history.db` → `reasonic.db`; env var `SESSION_DB_PATH` → `REASONIC_DB_PATH` |
| New DB table | `app_settings` — key/value store for user-overridden settings |
| New backend service | `IAppSettingsService` — replaces `IOptions<T>` for all runtime-overridable settings |
| Service migrations | All gateway/feature services switch from `IOptions<T>` to `IAppSettingsService` |
| Clementine DB | Connection opened with `Mode=ReadOnly` (fix if not already) |
| `appsettings.json` | Remove stale `Ollama:Model`; remove machine-specific `Clementine:DbPath`; align `Gemini:Model` default |
| New API endpoints | `GET /api/settings`, `PUT /api/settings` |
| New Angular service | `SettingsService` |
| New Angular component | `SettingsModalComponent` (standalone, `MatDialog`) |
| ChatComponent header | Gear icon button after memory-bust button |

---

## 1. DB rename

| Before | After |
|--------|-------|
| env var: `SESSION_DB_PATH` | env var: `REASONIC_DB_PATH` |
| default filename: `session_history.db` | default filename: `reasonic.db` |

The database now owns more than session history (it will also own app settings), so the name should reflect the whole application.

`SessionMemoryOptions.DbPath` default changes from `"session_history.db"` to `"reasonic.db"`. All code that reads the path env var is updated to read `REASONIC_DB_PATH`.

**Migration:** no automatic migration. The old `session_history.db` file (if present) is left in place and ignored. The new `reasonic.db` starts fresh. This is acceptable for a single-developer personal app in active development.

`REASONIC_DB_PATH` is the **only** variable that is not UI-configurable, because the DB must exist before the settings table can be read.

---

## 2. New `app_settings` table

Added to `reasonic.db` by `EnsureCreatedAsync`.

```sql
CREATE TABLE IF NOT EXISTS app_settings (
    key        TEXT PRIMARY KEY,
    value      TEXT NOT NULL,
    updated_at TEXT NOT NULL   -- ISO 8601, UTC
);
```

Keys are the flat env var names (`GEMINI_API_KEY`, `OLLAMA_BASE_URL`, etc.). Values are always strings; the backend parses to the correct type when reading. A missing row means "no user override — use fallback."

---

## 3. Updated configuration precedence

```
1. app_settings table (DB)       ← user's explicit choice; highest authority
2. Environment variables          ← deployment / bootstrap seed values
3. appsettings.{Env}.json         ← environment-specific non-secret overrides
4. appsettings.json               ← committed non-secret defaults
5. Code defaults (Options classes) ← last-resort safety net
```

**Blank-field save rule:** if the user clears a field and saves, the row is deleted from `app_settings`. The env var / appsettings value becomes effective again on the next request.

**First-launch seeding (optional enhancement, not in Phase 11):** on first startup, read env vars and pre-populate the `app_settings` table so the user sees existing values in the modal. This can be added later without breaking anything.

---

## 4. `IAppSettingsService` — new central settings service

This service is the single point of access for all runtime-overridable configuration. It replaces direct `IOptions<T>` injection in gateway and feature services.

### Interface

```csharp
public interface IAppSettingsService
{
    // Generic accessors — DB row wins, then IConfiguration fallback, then hardcoded default
    Task<string>  GetStringAsync(string key, string  fallback);
    Task<int>     GetIntAsync   (string key, int     fallback);
    Task<double>  GetDoubleAsync(string key, double  fallback);

    // Called by the settings controller after a successful PUT /api/settings
    // to clear the in-memory cache (if any)
    void Invalidate();
}
```

### Behaviour

1. Look up `key` in the `app_settings` table.
2. If found, return the value (parsed to the requested type).
3. If not found, fall back to `IConfiguration[key]` (which already resolves env vars → `appsettings.json` → nothing).
4. If still not found, return `fallback`.

### Caching

For Phase 11, no explicit cache is needed. The `app_settings` table is tiny (≤ 16 rows); a SQLite key-lookup is sub-millisecond. `Invalidate()` is kept in the interface as a no-op for now so the controller can call it without a code change if caching is added later.

### Registration

```csharp
builder.Services.AddSingleton<IAppSettingsRepository, AppSettingsRepository>();
builder.Services.AddSingleton<IAppSettingsService, AppSettingsService>();
```

`AppSettingsRepository` handles the raw SQL. `AppSettingsService` owns the fallback logic and the `Invalidate()` call.

---

## 5. Service migrations

Every service that currently injects `IOptions<T>` for a runtime-overridable setting switches to `IAppSettingsService`. The call moves from constructor-time binding to per-request async lookup.

| Service | Currently uses | After |
|---------|---------------|-------|
| `GeminiGatewayService` | `IOptions<GeminiOptions>` | `IAppSettingsService` |
| `OllamaGatewayService` | `IOptions<OllamaOptions>` | `IAppSettingsService` |
| `LastFmGatewayService` | `IOptions<LastFmOptions>` | `IAppSettingsService` |
| `ClementineService` | `IOptions<ClementineOptions>` | `IAppSettingsService` |
| `ClementineLauncherService` | `IOptions<ClementineLauncherOptions>` | `IAppSettingsService` |
| `RecommendationOrchestrationService` | `IOptions<RecommendationOptions>` | `IAppSettingsService` |
| `SessionContextBuilder` | `IOptions<SessionMemoryOptions>` | `IAppSettingsService` |
| `SessionHistoryService` | `IOptions<SessionMemoryOptions>` | `IAppSettingsService` |

The `Options` classes (`GeminiOptions`, `OllamaOptions`, etc.) and their registration in `Program.cs` are **removed**. They are no longer needed as the single source of truth for runtime values.

---

## 6. Clementine DB read-only

`ClementineService` opens the Clementine SQLite copy for read-only queries. The connection string must include `Mode=ReadOnly`:

```csharp
$"Data Source={path};Mode=ReadOnly"
```

This prevents any accidental writes to the user's music library database. Verify this is already the case; fix it if not.

---

## 7. `appsettings.json` cleanup (done as part of this phase)

| Change | Reason |
|--------|--------|
| Remove `Ollama:Model` | Stale key from Phase 6; no corresponding property in `OllamaOptions` |
| Remove `Clementine:DbPath` | Machine-specific path; should come from env var or UI, not a committed file |
| Align `Gemini:Model` to `"gemini-2.5-pro"` and update `GeminiOptions.cs` default to match | Two different values for the same field across two files |

After cleanup, `appsettings.json` holds only URL defaults and non-sensitive numeric defaults. All machine-specific paths and API keys must come from env vars or the UI.

---

## 8. New API endpoints

Both are added to `SettingsController`.

### `GET /api/settings`

Returns all current effective settings — DB value if set, otherwise the resolved fallback. API key fields that have a value are returned in full (this is a personal, locally-served app; no masking needed for the edit form). Fields with no value (neither DB nor fallback) return an empty string.

**Response:**
```json
{
  "geminiApiKey":                       "AIza…",
  "geminiModel":                        "gemini-2.5-pro",
  "geminiBaseUrl":                      "https://generativelanguage.googleapis.com",
  "lastFmApiKey":                       "abc123…",
  "lastFmBaseUrl":                      "https://ws.audioscrobbler.com/2.0/",
  "ollamaBaseUrl":                      "http://localhost:11434",
  "ollamaWhisperModel":                 "llama3.1:8b",
  "ollamaShoutModel":                   "gemma4:e4b",
  "clementineDbPath":                   "C:\\Music\\clementine.db",
  "clementineMatchThreshold":           0.75,
  "clementineExePath":                  "C:\\Program Files (x86)\\Clementine\\clementine.exe",
  "recommendationMinTracks":            10,
  "recommendationMaxTracks":            20,
  "recommendationSuggestionCacheMinutes": 60,
  "sessionMemorySize":                  25,
  "sessionDefaultTrackDurationSeconds": 210.0
}
```

### `PUT /api/settings`

Accepts a full or partial settings object. For each provided field:
- **Non-empty value** → upsert into `app_settings` (insert or replace)
- **Empty or null value** → delete the row from `app_settings` (fall back to env var / defaults)

Calls `IAppSettingsService.Invalidate()` after persisting.

Returns `204 No Content` on success. Returns `400` with a validation message if any value fails type/range validation (e.g., `matchThreshold` outside 0–1, `minTracks` < 1).

**Request body** — same shape as the response, all fields optional/nullable.

---

## 9. New DTOs

```csharp
// Returned by GET /api/settings
public record SettingsResponse(
    string  GeminiApiKey,
    string  GeminiModel,
    string  GeminiBaseUrl,
    string  LastFmApiKey,
    string  LastFmBaseUrl,
    string  OllamaBaseUrl,
    string  OllamaWhisperModel,
    string  OllamaShoutModel,
    string  ClementineDbPath,
    double  ClementineMatchThreshold,
    string  ClementineExePath,
    int     RecommendationMinTracks,
    int     RecommendationMaxTracks,
    int     RecommendationSuggestionCacheMinutes,
    int     SessionMemorySize,
    double  SessionDefaultTrackDurationSeconds
);

// Body for PUT /api/settings — all fields nullable; null = "leave unchanged"
public record UpdateSettingsRequest(
    string?  GeminiApiKey,
    string?  GeminiModel,
    string?  GeminiBaseUrl,
    string?  LastFmApiKey,
    string?  LastFmBaseUrl,
    string?  OllamaBaseUrl,
    string?  OllamaWhisperModel,
    string?  OllamaShoutModel,
    string?  ClementineDbPath,
    double?  ClementineMatchThreshold,
    string?  ClementineExePath,
    int?     RecommendationMinTracks,
    int?     RecommendationMaxTracks,
    int?     RecommendationSuggestionCacheMinutes,
    int?     SessionMemorySize,
    double?  SessionDefaultTrackDurationSeconds
);
```

---

## 10. Frontend

### `SettingsService`

```typescript
export interface AppSettings {
  geminiApiKey:                       string;
  geminiModel:                        string;
  geminiBaseUrl:                      string;
  lastFmApiKey:                       string;
  lastFmBaseUrl:                      string;
  ollamaBaseUrl:                      string;
  ollamaWhisperModel:                 string;
  ollamaShoutModel:                   string;
  clementineDbPath:                   string;
  clementineMatchThreshold:           number;
  clementineExePath:                  string;
  recommendationMinTracks:            number;
  recommendationMaxTracks:            number;
  recommendationSuggestionCacheMinutes: number;
  sessionMemorySize:                  number;
  sessionDefaultTrackDurationSeconds: number;
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  getSettings(): Observable<AppSettings>
  saveSettings(settings: Partial<AppSettings>): Observable<void>
}
```

Location: `src/client/src/app/core/services/settings.service.ts`

### `SettingsModalComponent`

Location: `src/client/src/app/features/settings/settings-modal.component.ts` (+ `.html`, `.scss`)

- Standalone Angular component
- Opened via `MatDialog.open(SettingsModalComponent)`
- On open: calls `SettingsService.getSettings()` to populate the form
- Form: Angular reactive form (`FormGroup`) with one control per field
- API key fields (`geminiApiKey`, `lastFmApiKey`): `type="password"` with a `mat-icon-button` suffix to toggle visibility
- Numeric fields: `type="number"` with `min`/`max` attributes
- Grouped by provider using `<h3>` headings and `<mat-divider>`
- Cancel button: closes the dialog without saving
- Save button: calls `SettingsService.saveSettings()` with the form value, closes dialog on success, shows a `MatSnackBar` confirmation ("Settings saved")
- Save button disabled while the save request is in flight

**Modal section layout:**

```
Gemini (Cosmic Voice)
  API Key      [password field  👁]
  Model        [text field        ]
  Base URL     [text field        ]

Last.fm
  API Key      [password field  👁]
  Base URL     [text field        ]

Ollama (Inner Voice)
  Server URL   [text field        ]
  Whisper model [text field       ]
  Shout model  [text field        ]

Clementine
  Database path   [text field     ]
  Executable path [text field     ]
  Match threshold [number 0–1     ]

Recommendations
  Min tracks   [number]  Max tracks [number]
  Cache (mins) [number]

Session memory
  Memory size              [number]
  Default track duration (s) [number]
```

### `ChatComponent` header change

Add a `mat-icon-button` with the `settings` icon immediately after the existing memory-bust button:

```html
<button mat-icon-button class="settings-btn"
        (click)="openSettings()"
        matTooltip="App settings"
        aria-label="Open settings">
  <mat-icon>settings</mat-icon>
</button>
```

`openSettings()` calls `this.dialog.open(SettingsModalComponent)`. `MatDialog` is injected into `ChatComponent`.

---

## 11. Test coverage

### Backend

| Test class | New cases |
|------------|-----------|
| `AppSettingsRepositoryTests` (new) | `GetAsync` returns DB value; `GetAsync` returns null when row absent; `UpsertAsync` inserts new row; `UpsertAsync` updates existing row; `DeleteAsync` removes row |
| `AppSettingsServiceTests` (new) | Returns DB value when present; falls back to `IConfiguration` when no DB row; falls back to code default when neither; `Invalidate()` clears cache (if caching is added) |
| `SettingsControllerTests` (new) | `GET /settings` returns all resolved values; `PUT /settings` with non-empty value upserts; `PUT /settings` with empty string deletes row; `PUT /settings` with invalid range returns 400 |
| Existing gateway service tests | Update to provide `IAppSettingsService` mock instead of `IOptions<T>` mock |

### Frontend

| Test file | New cases |
|-----------|-----------|
| `settings.service.spec.ts` (new) | `getSettings` GETs `/api/settings`; `saveSettings` PUTs `/api/settings` with correct body |
| `settings-modal.component.spec.ts` (new) | Form populated from service response on open; save calls service with form values; blank API key sends empty string; cancel closes without saving |

---

## 12. Files changed

### New files
- `src/server/Reco.Api/Controllers/SettingsController.cs`
- `src/server/Reco.Api/DTOs/SettingsResponse.cs`
- `src/server/Reco.Api/DTOs/UpdateSettingsRequest.cs`
- `src/server/Reco.Api/Services/IAppSettingsRepository.cs`
- `src/server/Reco.Api/Services/AppSettingsRepository.cs`
- `src/server/Reco.Api/Services/IAppSettingsService.cs`
- `src/server/Reco.Api/Services/AppSettingsService.cs`
- `src/server/Reco.Api.Tests/Services/AppSettingsRepositoryTests.cs`
- `src/server/Reco.Api.Tests/Services/AppSettingsServiceTests.cs`
- `src/server/Reco.Api.Tests/Controllers/SettingsControllerTests.cs`
- `src/client/src/app/core/services/settings.service.ts`
- `src/client/src/app/core/services/settings.service.spec.ts`
- `src/client/src/app/features/settings/settings-modal.component.ts`
- `src/client/src/app/features/settings/settings-modal.component.html`
- `src/client/src/app/features/settings/settings-modal.component.scss`
- `src/client/src/app/features/settings/settings-modal.component.spec.ts`

### Modified files
- `src/server/Reco.Api/Configuration/SessionMemoryOptions.cs` — rename `DbPath` default; update to `reasonic.db`
- `src/server/Reco.Api/Configuration/GeminiOptions.cs` — align default model to `gemini-2.5-pro`
- `src/server/Reco.Api/Program.cs` — rename `SESSION_DB_PATH` → `REASONIC_DB_PATH`; remove Options registrations for migrated services; register `AppSettingsRepository` and `AppSettingsService`
- `src/server/Reco.Api/appsettings.json` — remove stale `Ollama:Model`; remove `Clementine:DbPath`
- `src/server/Reco.Api/Services/GeminiGatewayService.cs` — switch to `IAppSettingsService`
- `src/server/Reco.Api/Services/OllamaGatewayService.cs` — switch to `IAppSettingsService`
- `src/server/Reco.Api/Services/LastFmGatewayService.cs` — switch to `IAppSettingsService`
- `src/server/Reco.Api/Services/ClementineService.cs` — switch to `IAppSettingsService`; add `Mode=ReadOnly` to connection string
- `src/server/Reco.Api/Services/ClementineLauncherService.cs` — switch to `IAppSettingsService`
- `src/server/Reco.Api/Services/RecommendationOrchestrationService.cs` — switch to `IAppSettingsService`
- `src/server/Reco.Api/Services/SessionContextBuilder.cs` — switch to `IAppSettingsService`
- `src/server/Reco.Api/Services/SessionHistoryService.cs` — switch to `IAppSettingsService`
- `src/server/Reco.Api/Services/SessionHistoryRepository.cs` — update DB filename default to `reasonic.db`; add `CREATE TABLE app_settings` to `EnsureCreatedAsync`
- `src/client/src/app/features/chat/chat.component.ts` — inject `MatDialog`; add `openSettings()` method
- `src/client/src/app/features/chat/chat.component.html` — add gear icon button
- `src/client/src/app/features/chat/chat.component.scss` — add `.settings-btn` style
- `src/client/src/app/features/chat/chat.component.spec.ts` — no new test cases needed (gear button has no testable state)

### Deleted (if Options classes become unused)
- `src/server/Reco.Api/Configuration/GeminiOptions.cs`
- `src/server/Reco.Api/Configuration/OllamaOptions.cs`
- `src/server/Reco.Api/Configuration/LastFmOptions.cs`
- `src/server/Reco.Api/Configuration/ClementineOptions.cs`
- `src/server/Reco.Api/Configuration/ClementineLauncherOptions.cs`
- `src/server/Reco.Api/Configuration/RecommendationOptions.cs`
- `src/server/Reco.Api/Configuration/SessionMemoryOptions.cs`

> All Options classes can be deleted once all consumers have been migrated to `IAppSettingsService`. `Program.cs` will no longer call `Configure<T>()` for these.
