# Functional Requirements — Phase 21: Variable Prompts

> **STATUS: COMPLETED**
> Delivered across migrations `20260603000001_Phase21_PromptSets` and `20260603000002_Phase21_ResolveSessionMemoryToken`.
> See corrections in [§ Phase 21 Delivery Notes](#phase-21-delivery-notes) below.

## Overview

Introduce **Prompt Sets** — named, user-configurable bundles that control how the AI recommends music. Each prompt set carries its own recommendation prompt and its own conversation session history. The active prompt set is selected from a header dropdown and persists across browser refreshes.

---

## FR-1: Prompt Set Data Model

A **prompt set** is defined by four properties:

| Field | Type | Notes |
|---|---|---|
| `name` | string (unique) | User-visible label; used as identifier |
| `useSession` | boolean | Whether session/conversation history is sent to the AI |
| `recommendationPrompt` | text | The full instruction sent to the AI as its system prompt |
| Timestamps | created_at / updated_at | Audit trail |

---

## FR-2: Default Prompt Set (Migration)

On first upgrade, the system automatically creates a prompt set named **"Default"** with:
- `useSession = true`
- `recommendationPrompt` = the current value of `RECOMMENDATION_INSTRUCTION` in `app_settings` (which contains the `{sessionMemoryInstruction}` token as **literal visible text** — no substitution is performed; the user may edit or remove it)

The `SESSION_MEMORY_INSTRUCTION` and `RECOMMENDATION_INSTRUCTION` keys in `app_settings` are superseded by prompt sets and no longer used by the recommendation pipeline. They are removed from the Settings modal AI Settings section.

---

## FR-3: Session Isolation per Prompt Set

- Every record in `session_log` is tagged with the name of the prompt set that created it.
- Each prompt set maintains its own **FIFO memory** (capped at `SESSION_MEMORY_SIZE`), its own **active reply ID** (rewind pointer), and its own **conversation history** displayed in the chat panel.
- Switching prompt sets swaps the entire session context. No session data from another prompt set bleeds in.

---

## FR-4: Settings — Prompt Set Management

Inside the existing **Settings modal**, a new **"Prompt Sets"** section provides full CRUD:

### FR-4.1 List view
- All prompt sets are listed (at minimum: Name, Use Session flag).
- An **Add** button opens an inline or inline-expanded form to create a new prompt set.

### FR-4.2 Create / Edit form
Each form exposes:
1. **Name** — text input; required; must be unique.
2. **Use Session** — checkbox.
3. **Recommendation Prompt** — multi-line textarea; enabled regardless of the Use Session checkbox (the prompt is always editable).

### FR-4.3 Delete
- Any prompt set can be deleted, including "Default".
- Deleting the currently active prompt set resets the active selection to the first remaining prompt set (or creates a new "Default" if none remain).
- The user is asked to confirm deletion before it is executed.

### FR-4.4 Persistence
Changes are saved immediately to the database. No separate Save button is required, but the UX may use an explicit save-per-row button for clarity.

---

## FR-5: Header — Active Prompt Set Selector

A **dropdown selector** is added to the application header:
- Position: **after the location display**, **before the session memory toolbar**.
- Displays the name of the currently active prompt set.
- Lists all prompt set names for selection.
- The last-used prompt set is restored on page load (persisted in the database).

---

## FR-6: Activating a Prompt Set

When the user selects a prompt set from the header dropdown:

### FR-6.1 Prompt set with `useSession = false`
- The **session memory toolbar** is greyed out and displays **0 / 0**.
- The **chat panel** is visually cleared (no messages shown).
- The **recommendations panel** is cleared of all current tiles.
- No session preamble is sent to the AI on any recommendation request while this prompt set is active.
- DB records belonging to other prompt sets are untouched.

### FR-6.2 Prompt set with `useSession = true`
- The **last existing session** for that prompt set is **restored**: conversation history reappears in the chat panel, the active reply ID (rewind pointer) is reinstated, and the recommendations panel shows the tracks from the active reply.
- The session memory toolbar reflects the correct used / max counts for this prompt set.
- If the prompt set has no prior session, the chat and recommendations panel are empty (same as a fresh start).

---

## FR-7: Recommendation Pipeline — Prompt Set Awareness

When a recommendation request is made:
1. The active prompt set's `recommendationPrompt` is used as the AI system instruction (replacing the global `RECOMMENDATION_INSTRUCTION` setting).
2. The `{minTracks}` and `{maxTracks}` tokens continue to be substituted at call time.
3. The `{sessionMemoryInstruction}` token is **not substituted** — it is treated as plain text in whatever the user wrote.
4. If `useSession = false`, the session preamble is **not** prepended to the user message.
5. If `useSession = true`, the session preamble is built and prepended as before.
6. All session log writes (user-chat, ai-reply, track suggestions) are tagged with the active prompt set name.

---

## FR-8: Active Prompt Set Persistence

- The name of the currently active prompt set is stored in the database (e.g., `app_settings` key `ACTIVE_PROMPT_SET_NAME`).
- On page load, the frontend reads this value and restores the correct prompt set state without any additional user action.

---

## FR-9: Prompt Set Not Applicable to the Diary

The Musical Diary feature continues to use its own `DIARY_SYSTEM_INSTRUCTION` setting. Prompt sets have no effect on diary generation.

---

## Out of Scope

- Prompt sets for mood annotations — mood annotations remain global settings.
- Per-prompt-set recommendation history deduplication — the no-repeat block remains global.
- Per-prompt-set avoided artists — the avoided artists list remains global.
- Export or import of prompt sets.

---

## Phase 21 Delivery Notes

### FR-2 correction — `{sessionMemoryInstruction}` token
The original plan called for the Default prompt to contain `{sessionMemoryInstruction}` as visible literal text for the user to edit. During implementation the decision was revised: the token is distracting and confusing for non-technical users. Instead:
- The Default prompt seed in `AiPromptDefaults.RecommendationInstruction` was updated to inline the full session memory paragraph directly (no token).
- Migration `20260603000002_Phase21_ResolveSessionMemoryToken` patched existing databases via an exact-match SQLite `REPLACE()` to substitute the token with the full paragraph text.
- The `{sessionMemoryInstruction}` token is no longer meaningful. `AiPromptService.GetPromptAsync` still performs the substitution for legacy code paths but the primary prompt-set flow never uses that method.

### FR-4 correction — Settings modal `SESSION_MEMORY_INSTRUCTION` field
The `SESSION_MEMORY_INSTRUCTION` settings field was removed from the Settings modal (as per the FR). The `RECOMMENDATION_INSTRUCTION` global setting was also removed. Both are now superseded by the Prompt Sets CRUD section.

### Active Voice selector moved to Settings
In Phase 16 the voice toggle (Inner Whisper / Inner Shout / Cosmic Voice) was moved from the header into the Settings modal under **Active Voice**. This persisted into Phase 21. The header shows: location → prompt-set dropdown → session toolbar.

---

# Functional Requirements — Phase 22: Automatic Response Format Appendix

> **STATUS: COMPLETED**
> Delivered in migration `20260603000003_Phase22_ExtractResponseFormatAppendix`.
> See corrections in [§ Phase 22 Delivery Notes](#phase-22-delivery-notes) below.

## Overview

The JSON output format rules (response structure, bold formatting of track names, track count constraint) are extracted from the user-editable prompt set text and applied as a **hidden, hardcoded system appendix** on every recommendation request. Users write prompts that describe tone, persona, and style only. The plumbing is invisible to them.

---

## FR-22-1: Response Format Appendix (Backend Constant)

A new `ResponseFormatAppendix` constant is added to `AiPromptDefaults`. It contains:

- The JSON response shape requirement (`narrative` + `tracks` fields)
- The bold-asterisks formatting rule for track titles and artist names
- The `{minTracks}` and `{maxTracks}` track count constraint
- The "always return valid JSON and nothing else" instruction

This constant is **never user-visible** — it is not displayed in the Settings modal, not stored in the database, and has no settings key.

---

## FR-22-2: Automatic Appendix Application

The `BuildSystemInstruction` method (renamed from `SubstituteTrackTokens`) in `AiPromptService`:

1. Substitutes `{minTracks}` and `{maxTracks}` tokens in the user-supplied prompt template.
2. Appends the `ResponseFormatAppendix` (with tokens substituted) to the result.
3. Returns the final composed string as the AI system instruction.

This is the single place where appendix injection happens. No other service or gateway duplicates this logic.

---

## FR-22-3: Default Prompt Set — Clean User-Facing Text

`AiPromptDefaults.RecommendationInstruction` (the seed value for the "Default" prompt set on fresh installs) is updated to contain only user-meaningful text:

- The assistant persona description
- The session memory instruction paragraph

All JSON format rules are removed from this constant. They are provided exclusively via the appendix at call time.

---

## FR-22-4: Database Migration — Strip Extracted Rules from Existing Installs

A new EF Core migration performs an exact-match `REPLACE()` on the `prompt_sets` table:

- **Target rows:** any row whose `recommendation_prompt` contains the literal string `For each user request you must respond with a JSON object`
- **Operation:** replaces the entire JSON-rules block (from ` For each user request...` through `...nothing else.`) with the new clean persona sentence
- **Scope:** data-only; no schema changes

The migration is idempotent — rows that do not contain the old block are not touched.

---

## FR-22-5: No Frontend Changes Required

The appendix is a backend concern. The Settings modal, the header dropdown, and the prompt set CRUD forms are unchanged.

---

## Phase 22 Delivery Notes

### FR-22-2 correction — method rename
`SubstituteTrackTokens` in `IAiPromptService` / `AiPromptService` was renamed to `BuildSystemInstruction`. The new implementation substitutes `{minTracks}` and `{maxTracks}` in the user template, then appends the `ResponseFormatAppendix` constant (with the same tokens substituted). All three callers were updated: `RecommendationOrchestrationService`, `GeminiGatewayService`, `OllamaGatewayService`.

### FR-22-4 correction — migration text precision
The exact old text replaced by the migration spans from ` For each user request you must respond with a JSON object containing exactly two fields:` (note the leading space, so "assistant." remains intact) through `...Always return valid JSON and nothing else.` — stopping before the `\n\nImportant:` paragraph. The replacement inserts ` Write a warm, conversational paragraph recommending music, like a knowledgeable curator. Mention specific tracks and explain why you are recommending them.` The `\n\nImportant:` session memory paragraph is preserved unchanged.
