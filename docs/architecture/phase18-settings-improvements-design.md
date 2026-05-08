# Phase 18 — Settings Improvements Design

## Purpose

Establish two standing rules for the settings modal that apply from Phase 18 onward, and fix a label-clipping visual bug.

---

## Principle 1 — Defaults come from the API; all non-secret fields are resettable

### What changed

| Before | After |
|--------|-------|
| Only "AI Settings" fields had per-field reset buttons | Every non-secret field has a reset button |
| "Leave blank to use environment variable or default" hint was hidden on the AI Settings group | Hint is shown on every field |
| Non-AI defaults (model names, URLs, thresholds) were hardcoded as `placeholder` strings in Angular TypeScript | All defaults are served by `GET /api/settings/defaults` from the backend |
| AI key fields had no `isSecret` flag — the group-level `hasResets` flag controlled reset visibility | `isSecret: true` on the `SettingField` definition controls both reset button visibility and excludes the field from the defaults map |

### Rule going forward

> For every new setting added to the settings modal:
> - If it is a secret/API key: set `isSecret: true`, do not add it to `AppSettingDefaults`.
> - For all others: add a constant to `AppSettingDefaults.All`; the reset button and "Leave blank" hint are applied automatically.

### Backend: `AppSettingDefaults`

New static class `Reco.Api.Services.AppSettingDefaults`.

- `ClementineExePath` is OS-detected at startup: `C:\Program Files (x86)\Clementine\clementine.exe` on Windows, `clementine` on Linux.
- No migration, no new DB table.

`GET /api/settings/defaults` now merges `AppSettingDefaults.All` + `AiPromptDefaults.All` into a single dictionary.

### Frontend: `SettingField` interface

```typescript
export interface SettingField {
  key: string;
  label: string;
  type: 'text' | 'password' | 'number' | 'textarea';
  placeholder?: string;   // Descriptive hint for fields with no API default (e.g. CLEMENTINE_DB_PATH)
  isSecret?: boolean;     // True for API keys — no reset button, not in defaults
}
```

`SettingsGroup.hasResets` is removed. Reset visibility is field-level (`!field.isSecret`).

`placeholderFor(field)` in the component resolves `defaults()[field.key] ?? field.placeholder ?? ''`, so the placeholder always reflects the live API-returned default.

---

## Principle 2 — Setting labels never overlap values (label bug fix)

### Root cause

Angular Material's `appearance="outline"` variant draws a notch in the top border sized to 75 % of the label's natural width. For long labels like "History cap (rows)" the notch was too narrow, causing the label text to be clipped or to overflow the border gap.

### Fix

`floatLabel="always"` is added to every `<mat-form-field>` in the settings modal. Labels permanently render above the input border — no notch sizing is ever needed, and the problem cannot recur regardless of label length.

---

## Files changed

| File | Change |
|------|--------|
| `src/server/Reco.Api/Services/AppSettingDefaults.cs` | **New** — all non-secret setting defaults |
| `src/server/Reco.Api/Controllers/SettingsController.cs` | `GetDefaults()` merges both defaults dicts |
| `src/client/src/app/features/settings/settings-modal.component.ts` | `isSecret` field flag; removed `hasResets`; `placeholderFor()` helper; cleaned group definitions |
| `src/client/src/app/features/settings/settings-modal.component.html` | `floatLabel="always"`; reset button on `!field.isSecret`; hint always shown; `placeholderFor()` |
| `CLAUDE.md` | Phase 18 bullet; two settings principles noted |
| `docs/architecture/phase18-settings-improvements-design.md` | This file |
