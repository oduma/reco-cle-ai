# Phase 21 — Variable Prompts: Implementation Plan

> **STATUS: COMPLETED** — 2026-06-03
> All steps delivered. Key deviation from plan: the `{sessionMemoryInstruction}` token in the Default prompt was replaced with the full inline text via a second migration (`20260603000002_Phase21_ResolveSessionMemoryToken`) rather than being left as visible literal text. The `AiPromptDefaults.RecommendationInstruction` seed constant was updated accordingly. No other deviations.

## Goal
Introduce Prompt Sets: named, user-managed bundles that control the AI recommendation prompt and session isolation. Users select the active prompt set from a header dropdown. Each prompt set has its own isolated conversation history and active reply pointer.

---

## Prerequisites
- Phases 1–20 complete and stable.
- EF Core migrations workflow established (Phase 15).
- `app_settings` seeding in place (Phase 19).

---

## Step 1 — Database: EF Core Migration

### 1.1 New table: `prompt_sets`
```sql
CREATE TABLE prompt_sets (
    id                    INTEGER PRIMARY KEY AUTOINCREMENT,
    name                  TEXT    NOT NULL UNIQUE,
    use_session           INTEGER NOT NULL DEFAULT 1,
    recommendation_prompt TEXT    NOT NULL DEFAULT '',
    created_at            TEXT    NOT NULL,
    updated_at            TEXT    NOT NULL
);
```

### 1.2 Add column to `session_log`
```sql
ALTER TABLE session_log
  ADD COLUMN prompt_set_name TEXT NOT NULL DEFAULT 'Default';
```
All existing rows default to `'Default'`.

### 1.3 Namespaced active reply ID in `session_state`
The existing `active_reply_id` key in `session_state` is migrated to `active_reply_id:Default`. Future prompt sets use `active_reply_id:<name>`.

### 1.4 Seed Default prompt set
Inside the migration's `Up()`:
```sql
INSERT OR IGNORE INTO prompt_sets (name, use_session, recommendation_prompt, created_at, updated_at)
SELECT 'Default', 1, value, datetime('now'), datetime('now')
FROM   app_settings
WHERE  key = 'RECOMMENDATION_INSTRUCTION';
```

### 1.5 Seed ACTIVE_PROMPT_SET_NAME
```sql
INSERT OR IGNORE INTO app_settings (key, value, updated_at)
VALUES ('ACTIVE_PROMPT_SET_NAME', 'Default', datetime('now'));
```

### 1.6 Run migration
```
dotnet ef migrations add Phase21_PromptSets --project src/server/Reco.Api
dotnet ef database update             --project src/server/Reco.Api
```

---

## Step 2 — Backend: Data Layer

### 2.1 New entity — `PromptSetEntity`
File: `src/server/Reco.Api/Data/Entities/PromptSetEntity.cs`
- Properties: `Id`, `Name`, `UseSession`, `RecommendationPrompt`, `CreatedAt`, `UpdatedAt`
- Mapped to `prompt_sets` table via EF Core `OnModelCreating`.

### 2.2 New repository interface — `IPromptSetRepository`
File: `src/server/Reco.Api/Services/IPromptSetRepository.cs`
```csharp
Task<IReadOnlyList<PromptSet>> GetAllAsync();
Task<PromptSet?> GetByNameAsync(string name);
Task<PromptSet> CreateAsync(PromptSet promptSet);
Task<PromptSet> UpdateAsync(PromptSet promptSet);
Task DeleteAsync(int id);
```

### 2.3 Implement `PromptSetRepository`
File: `src/server/Reco.Api/Data/PromptSetRepository.cs`
- Raw ADO.NET (consistent with project pattern); not EF Core query methods.
- `GetAllAsync` — SELECT all, ordered by `name`.
- `GetByNameAsync` — SELECT WHERE name = ?.
- `CreateAsync` — INSERT, return new entity with generated id.
- `UpdateAsync` — UPDATE by id.
- `DeleteAsync` — DELETE by id.

### 2.4 Update `SessionHistoryRepository`
- All methods that read or write `session_log` gain a `string promptSetName` parameter.
- `GetActiveEventsAsync(name)` — WHERE `prompt_set_name = name AND is_active = 1`
- `GetHistoryWithSuggestionsAsync(name)` — scoped to prompt set name.
- `InsertEventAsync(…, name)` — writes `prompt_set_name` column.
- `GetActiveAiReplyCountAsync(name)` — scoped count.
- `SoftDeleteAllActiveAsync(name)` — soft-deletes only for that prompt set.
- `GetOldestActiveConversationBlockAsync(name)` — scoped.
- `SoftDeleteBlockAsync(block, name)` — scoped.
- `GetActiveReplyIdAsync(name)` — reads `session_state` key `active_reply_id:<name>`.
- `SetActiveReplyIdAsync(id, name)` — writes `session_state` key `active_reply_id:<name>`.

### 2.5 Update `SessionContextBuilder` (or its equivalent)
Accept `promptSetName` and pass it down to all `SessionHistoryRepository` calls.

---

## Step 3 — Backend: Service Layer

### 3.1 New model — `PromptSet`
File: `src/server/Reco.Api/Models/PromptSet.cs`
- `int Id`, `string Name`, `bool UseSession`, `string RecommendationPrompt`

### 3.2 New service interface — `IPromptSetService`
File: `src/server/Reco.Api/Services/IPromptSetService.cs`
```csharp
Task<IReadOnlyList<PromptSet>> GetAllAsync();
Task<PromptSet?> GetByNameAsync(string name);
Task<PromptSet> CreateAsync(string name, bool useSession, string recommendationPrompt);
Task<PromptSet> UpdateAsync(int id, string name, bool useSession, string recommendationPrompt);
Task DeleteAsync(int id);
Task<string> GetActivePromptSetNameAsync();
Task SetActivePromptSetNameAsync(string name);
```

### 3.3 Implement `PromptSetService`
- `GetActivePromptSetNameAsync` — reads `ACTIVE_PROMPT_SET_NAME` from `app_settings`; defaults to `"Default"`.
- `SetActivePromptSetNameAsync` — writes to `app_settings`.
- `DeleteAsync` — if deleting the currently active prompt set, switch active to first remaining; if no remaining, insert a new bare "Default".

### 3.4 Update `SessionHistoryService`
All public methods gain a `string promptSetName` parameter and pass it to the repository. Callers that know the active prompt set pass it in; any method that still needs to infer it fetches from `IPromptSetService`.

### 3.5 Update `RecommendationOrchestrationService`
Accept `string promptSetName` in `GetRecommendationsAsync`:
1. Load the prompt set via `IPromptSetService.GetByNameAsync(promptSetName)`.
2. Use `promptSet.RecommendationPrompt` as the system instruction (after substituting `{minTracks}` and `{maxTracks}` only — **no** `{sessionMemoryInstruction}` substitution).
3. If `promptSet.UseSession = false`, skip `_sessionContextBuilder.BuildAsync()` entirely; `preamble = null`; `history = []`.
4. If `promptSet.UseSession = true`, call `BuildAsync(promptSetName)` as before.
5. Pass `promptSetName` to all `_sessionHistory.*Async` calls.

### 3.6 Update `AiPromptDefaults` / `IAiPromptService`
- Remove `SessionMemoryInstructionKey` / `SessionMemoryInstruction` from the active defaults and token substitution logic.
- Keep `{minTracks}` and `{maxTracks}` substitution in place.
- The `RecommendationInstructionKey` can remain in `AppSettingDefaults` as a legacy/seed reference but is no longer read by the pipeline.

---

## Step 4 — Backend: API Layer

### 4.1 New `PromptSetsController`
File: `src/server/Reco.Api/Controllers/PromptSetsController.cs`

| Method | Route | Description |
|---|---|---|
| GET | `/api/prompt-sets` | List all prompt sets |
| POST | `/api/prompt-sets` | Create a prompt set |
| PUT | `/api/prompt-sets/{id}` | Update a prompt set |
| DELETE | `/api/prompt-sets/{id}` | Delete a prompt set |
| GET | `/api/prompt-sets/active` | Get active prompt set name |
| PUT | `/api/prompt-sets/active` | Set active prompt set name |

### 4.2 DTOs
- `PromptSetDto` — `id`, `name`, `useSession`, `recommendationPrompt`
- `CreatePromptSetRequest` — `name`, `useSession`, `recommendationPrompt`
- `UpdatePromptSetRequest` — `name`, `useSession`, `recommendationPrompt`
- `SetActivePromptSetRequest` — `name`

### 4.3 Update `RecommendationsController`
- Add `promptSetName` to the recommendation request DTO (`RecommendationRequest`).
- If omitted, default to the stored active prompt set name from `IPromptSetService`.
- Pass it through to `GetRecommendationsAsync`.

### 4.4 Update Session endpoints
- `GET /api/session/history` — accepts optional `promptSetName` query param; defaults to active.
- `POST /api/session/bust` — scoped to active prompt set.
- `GET /api/session/status` — memory counts scoped to active prompt set.

---

## Step 5 — Frontend: Services

### 5.1 New model — `PromptSet`
File: `src/client/src/app/core/models/prompt-set.model.ts`
```typescript
export interface PromptSet {
  id: number;
  name: string;
  useSession: boolean;
  recommendationPrompt: string;
}
```

### 5.2 New service — `PromptSetService`
File: `src/client/src/app/core/services/prompt-set.service.ts`
- `getAll(): Observable<PromptSet[]>`
- `create(req): Observable<PromptSet>`
- `update(id, req): Observable<PromptSet>`
- `delete(id): Observable<void>`
- `getActive(): Observable<string>` — returns active prompt set name
- `setActive(name: string): Observable<void>`
- Exposes a `BehaviorSubject<PromptSet | null>` for the currently active prompt set (used by header and chat).

### 5.3 Update `RecommendationService` / `ChatService`
- Include `promptSetName` in every recommendation request body.
- Source it from `PromptSetService.activePromptSet$`.

### 5.4 Update Session API service
- Pass `promptSetName` where relevant.

---

## Step 6 — Frontend: Header Dropdown

File: update `src/client/src/app/features/chat/` or the header component.

### 6.1 Placement
After the location chip/display, before the session memory toolbar.

### 6.2 Component
`<mat-select>` (or `<mat-form-field>` with `<mat-select>`) bound to `activePromptSetName`.

### 6.3 On selection change
Call `PromptSetService.setActive(name)` (persists to DB), then:

**If the newly selected prompt set has `useSession = false`:**
1. Clear the chat message list.
2. Clear the recommendations panel.
3. Session memory toolbar: show `0 / 0`, apply greyed-out / disabled visual state.
4. Do not call `GET /api/session/history`.

**If the newly selected prompt set has `useSession = true`:**
1. Call `GET /api/session/history?promptSetName=<name>` to restore conversation.
2. Populate the chat panel with the restored history.
3. Restore the active reply's tracks in the recommendations panel (rewind to active reply).
4. Session memory toolbar: reflect the real counts for this prompt set.

### 6.4 Initial load
On app startup, read active prompt set from `PromptSetService.getActive()` and apply the same logic as a selection change.

---

## Step 7 — Frontend: Settings — Prompt Set Management

### 7.1 New section in the Settings modal
Title: **"Prompt Sets"**
Position: near the top of the AI Settings section, or as a dedicated subsection.

### 7.2 List
- Table or expansion-panel list showing: Name, Use Session (checkbox icon), Edit button, Delete button.
- An **Add Prompt Set** button at the bottom of the list.

### 7.3 Edit / Create form (inline or inline-expanded)
Fields:
1. **Name** — `<mat-form-field>` text input; required; unique validation.
2. **Use Session** — `<mat-checkbox>`.
3. **Recommendation Prompt** — `<mat-form-field>` textarea (always enabled).

A **Save** button commits the change via the API. A **Cancel** button discards.

### 7.4 Delete
- Show a `MatDialog` confirmation: "Delete prompt set '{name}'? This cannot be undone."
- On confirm: call `DELETE /api/prompt-sets/{id}`; remove from the list; if it was the active one, switch to the first remaining.

### 7.5 Remove superseded fields
Remove `SESSION_MEMORY_INSTRUCTION` and `RECOMMENDATION_INSTRUCTION` from the **AI Settings** section in `SETTINGS_GROUPS` (settings-modal.component.ts:84–85).

---

## Step 8 — Frontend: Session Toolbar Behaviour

The session memory toolbar (progress bar + counts + bust button) must reflect the active prompt set:

- When `useSession = false`: show `0 / 0`, progress bar at zero, all controls disabled/greyed out.
- When `useSession = true`: show real counts for the active prompt set.
- On memory bust: scope to active prompt set only.

---

## Step 9 — Tests

### 9.1 Backend unit tests
- `PromptSetServiceTests`: create, update, delete (including delete-active edge case).
- `RecommendationOrchestrationServiceTests`:
  - Prompt sourced from active prompt set, not `app_settings`.
  - `useSession = false` → no preamble in enriched prompt, no session history calls.
  - `useSession = true` → preamble present, session tagged with prompt set name.
- `SessionHistoryServiceTests`: verify all operations are scoped to the supplied prompt set name.

### 9.2 Frontend tests
- `PromptSetService`: HTTP calls, BehaviorSubject updates.
- Header dropdown: switching to no-session prompt set clears chat and recs; switching to session prompt set triggers history load.
- Settings section: add, edit, delete flows; confirmation dialog on delete.

---

## Step 10 — Documentation Updates

1. Update `CLAUDE.md` — add Phase 21 summary to the phases list.
2. Update `docs/architecture/environment-variables-and-configuration.md` — note `ACTIVE_PROMPT_SET_NAME` added to `app_settings`; `RECOMMENDATION_INSTRUCTION` and `SESSION_MEMORY_INSTRUCTION` marked as superseded.
3. Update `docs/plans/phased-development-and-test-plan-personal-music-discovery-web-app.md` — add Phase 21 entry.
4. Update `docs/plans/implementation-backlog-personal-music-discovery-web-app.md` — mark Phase 21 as in progress.
5. Add `docs/architecture/phase21-variable-prompts-design.md` — reference this plan.

---

## Execution Order Summary

| # | Area | Key deliverable |
|---|---|---|
| 1 | DB / Migration | `prompt_sets` table, `session_log.prompt_set_name`, seed Default |
| 2 | Backend data | `PromptSetEntity`, `PromptSetRepository`, updated `SessionHistoryRepository` |
| 3 | Backend services | `PromptSetService`, updated `SessionHistoryService`, `RecommendationOrchestrationService` |
| 4 | Backend API | `PromptSetsController`, updated `RecommendationsController` + session endpoints |
| 5 | Frontend services | `PromptSet` model, `PromptSetService`, updated `RecommendationService` |
| 6 | Frontend header | Dropdown selector, switch logic (clear vs restore) |
| 7 | Frontend settings | Prompt set CRUD section, remove legacy fields |
| 8 | Frontend session toolbar | Greyed/0-0 state for no-session prompt sets |
| 9 | Tests | Backend unit tests, frontend component tests |
| 10 | Docs | CLAUDE.md, architecture docs, backlog |
