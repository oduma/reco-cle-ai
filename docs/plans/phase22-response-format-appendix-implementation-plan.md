# Phase 22: Automatic Response Format Appendix — Implementation Plan

> **STATUS: COMPLETED** — 2026-06-03
> All 8 steps delivered as planned. Build: 0 errors, 0 warnings. The interface method was renamed `BuildSystemInstruction` (as planned). Migration `20260603000003_Phase22_ExtractResponseFormatAppendix` performs the exact-match `REPLACE()` against existing databases.

## Goal

Extract the JSON output format rules from the user-editable prompt set text and apply them as a hidden, hardcoded backend appendix on every recommendation request. Users should only need to write prompts describing tone, persona, and style.

---

## What Changes

### Not changing
- Database schema — no new tables, no new columns
- Frontend — Settings modal, header dropdown, prompt set CRUD: all unchanged
- Recommendation pipeline logic (location, weather, avoid-artists, no-repeat, session preamble)

### Changing
| File | Change |
|---|---|
| `AiPromptDefaults.cs` | Add `ResponseFormatAppendix` constant; strip JSON rules from `RecommendationInstruction` |
| `IAiPromptService.cs` | Rename `SubstituteTrackTokens` → `BuildSystemInstruction` |
| `AiPromptService.cs` | Implement `BuildSystemInstruction`: substitute tokens then append format appendix |
| `RecommendationOrchestrationService.cs` | Update call site to `BuildSystemInstruction` |
| `GeminiGatewayService.cs` | Update fallback call site to `BuildSystemInstruction` |
| `OllamaGatewayService.cs` | Update fallback call site to `BuildSystemInstruction` |
| New migration `20260603000003_Phase22_ExtractResponseFormatAppendix.cs` | Data migration: REPLACE JSON-rules block in `prompt_sets` |
| New migration Designer file | EF snapshot companion (model unchanged) |

---

## Step-by-Step Implementation

### Step 1 — Add `ResponseFormatAppendix` to `AiPromptDefaults.cs`

Add a new `public const string ResponseFormatAppendix` containing the JSON format rules:

```csharp
public const string ResponseFormatAppendix =
    "\n\nFor each user request you must respond with a JSON object containing exactly two fields:\n" +
    "- \"narrative\": your recommendation text. Wrap every track title and artist name in **double asterisks** — " +
    "for example: **Kind of Blue** by **Miles Davis**.\n" +
    "- \"tracks\": an array of the specific tracks you mention in your narrative. Each track must have " +
    "\"title\", \"artist\", and optionally \"album\".\n" +
    "Return between {minTracks} and {maxTracks} tracks. Always return valid JSON and nothing else.";
```

Update `RecommendationInstruction` to remove the JSON rules block. The new value is:

```csharp
public const string RecommendationInstruction =
    "You are an expert music discovery assistant. Write a warm, conversational paragraph recommending music, " +
    "like a knowledgeable curator. Mention specific tracks and explain why you are recommending them." +
    "\n\nImportant: each user message may begin with a session history preamble that shows " +
    "the full conversation timeline — what the user said, what you recommended, and what " +
    "tracks they added to their player or looked up on YouTube. When this history is present, " +
    "always reference it in your reply. Connect your new recommendations to what the user has " +
    "demonstrably enjoyed or explored. Acknowledge the temporal context where relevant — note " +
    "how long they have been listening and whether they are likely still listening. Make every " +
    "response feel like a natural continuation of an ongoing personal conversation, not a " +
    "fresh start.";
```

`ResponseFormatAppendix` is **not added** to the `_all` dictionary — it is not a user-configurable setting.

---

### Step 2 — Rename and extend `SubstituteTrackTokens` in `IAiPromptService.cs`

Remove:
```csharp
string SubstituteTrackTokens(string template, int minTracks, int maxTracks);
```

Add:
```csharp
string BuildSystemInstruction(string template, int minTracks, int maxTracks);
```

---

### Step 3 — Implement `BuildSystemInstruction` in `AiPromptService.cs`

Remove the one-liner `SubstituteTrackTokens` method. Replace with:

```csharp
public string BuildSystemInstruction(string template, int minTracks, int maxTracks)
{
    var minStr  = minTracks.ToString(CultureInfo.InvariantCulture);
    var maxStr  = maxTracks.ToString(CultureInfo.InvariantCulture);

    var body = template
        .Replace("{minTracks}", minStr, StringComparison.Ordinal)
        .Replace("{maxTracks}", maxStr, StringComparison.Ordinal);

    var appendix = AiPromptDefaults.ResponseFormatAppendix
        .Replace("{minTracks}", minStr, StringComparison.Ordinal)
        .Replace("{maxTracks}", maxStr, StringComparison.Ordinal);

    return body + appendix;
}
```

---

### Step 4 — Update `RecommendationOrchestrationService.cs`

Rename the call on line ~68:

```csharp
// Before
var systemInstruction = _aiPrompts.SubstituteTrackTokens(
    promptSet.RecommendationPrompt, minTracks, maxTracks);

// After
var systemInstruction = _aiPrompts.BuildSystemInstruction(
    promptSet.RecommendationPrompt, minTracks, maxTracks);
```

No other changes to the orchestration service.

---

### Step 5 — Update `GeminiGatewayService.cs` fallback call site

```csharp
// Before
systemInstruction ??= await _prompts.BuildRecommendationPromptAsync(...);
systemInstruction = _prompts.SubstituteTrackTokens(systemInstruction, minTracks, maxTracks);

// After
systemInstruction ??= await _prompts.BuildRecommendationPromptAsync(...);
systemInstruction = _prompts.BuildSystemInstruction(systemInstruction, minTracks, maxTracks);
```

Note: This fallback path reads from the legacy `RECOMMENDATION_INSTRUCTION` key in `app_settings`
(which still contains the old JSON rules text). After Phase 21, the orchestration service always
resolves the active prompt set and passes a non-null systemInstruction, so this fallback is never
reached in normal operation. Updating it for naming consistency is still correct.

---

### Step 6 — Update `OllamaGatewayService.cs` fallback call site

Same rename as Step 5:

```csharp
// Before
sysInst = _prompts.SubstituteTrackTokens(sysInst, minTracks, maxTracks);

// After
sysInst = _prompts.BuildSystemInstruction(sysInst, minTracks, maxTracks);
```

---

### Step 7 — New EF Core migration: `20260603000003_Phase22_ExtractResponseFormatAppendix`

**Data-only migration** — no schema changes.

The `Up` method performs a single SQLite `REPLACE()`:

```sql
UPDATE prompt_sets
SET    recommendation_prompt = REPLACE(
           recommendation_prompt,
           ' For each user request you must respond with a JSON object containing exactly two fields:' || char(10) ||
           '- "narrative": a warm, conversational paragraph recommending music, written like a knowledgeable curator. ' ||
           'Mention specific tracks and explain why you are recommending them. ' ||
           'Wrap every track title and artist name in **double asterisks** — for example: **Kind of Blue** by **Miles Davis**.' || char(10) ||
           '- "tracks": an array of the specific tracks you mention in your narrative. Each track must have ' ||
           '"title", "artist", and optionally "album".' || char(10) ||
           'Return between {minTracks} and {maxTracks} tracks. Always return valid JSON and nothing else.',
           ' Write a warm, conversational paragraph recommending music, like a knowledgeable curator. ' ||
           'Mention specific tracks and explain why you are recommending them.'
       ),
       updated_at = datetime('now')
WHERE  recommendation_prompt LIKE '%For each user request you must respond with a JSON%';
```

The `Down` method reverses the replacement using the same pattern (new → old).

---

### Step 8 — New EF migration Designer file

Create `20260603000003_Phase22_ExtractResponseFormatAppendix.Designer.cs` — a copy of the previous
migration's Designer file with only the class name and `[Migration(...)]` attribute updated. The
model snapshot is identical because no schema changes occurred.

---

## Exact Text Transformation in the Database

| Before (stored in `prompt_sets.recommendation_prompt`) | After |
|---|---|
| `You are an expert music discovery assistant. For each user request you must respond with a JSON object containing exactly two fields:\n- "narrative": a warm, conversational paragraph... Wrap every track title and artist name in **double asterisks**...\n- "tracks": an array...\nReturn between {minTracks} and {maxTracks} tracks. Always return valid JSON and nothing else.\n\nImportant: ...` | `You are an expert music discovery assistant. Write a warm, conversational paragraph recommending music, like a knowledgeable curator. Mention specific tracks and explain why you are recommending them.\n\nImportant: ...` |

The `\n\nImportant: ...` session memory paragraph is preserved unchanged.

---

## What the AI Receives (after Phase 22)

For every recommendation request, the system instruction sent to the AI is composed of three parts in order:

```
[User's prompt set text — persona, style, session memory instruction]

[ResponseFormatAppendix — always appended, never user-visible]
  For each user request you must respond with a JSON object containing exactly two fields:
  - "narrative": your recommendation text. Wrap every track title and artist name in **double asterisks** ...
  - "tracks": an array of the specific tracks...
  Return between N and M tracks. Always return valid JSON and nothing else.
```

---

## Build / Test Verification

1. `dotnet build` — 0 errors; interface rename propagates to all callers.
2. `dotnet ef database update` — migration runs cleanly on existing `reasonic.db`.
3. Manual smoke test:
   - Open Settings → Prompt Sets → edit "Default" prompt — confirm the JSON rules block is gone.
   - Send a recommendation request — confirm AI still returns valid JSON (format appendix is working).
   - Create a new prompt set with a minimal prompt ("recommend jazz") — confirm the AI still returns proper JSON (appendix applied universally).
4. Confirm no change to frontend — Settings modal, header dropdown, CRUD forms all unaffected.

---

## Success Criteria

- Default prompt set's stored text contains only persona + session memory paragraph.
- Any prompt set (including user-created ones with minimal text) produces valid JSON recommendations.
- `ResponseFormatAppendix` does not appear in Settings modal or any API response.
- All existing tests pass; method rename is compile-checked.
