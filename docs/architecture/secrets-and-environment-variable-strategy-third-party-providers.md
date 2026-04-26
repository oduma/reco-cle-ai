# Secrets & Environment Variable Strategy

## 1. Purpose

This document defines how the Personal Music Discovery Web App handles **external-service credentials and secrets** using **environment variables**.

Credentials must be:

- never hardcoded in source code,
- never committed to Git,
- kept on the **backend only**,
- and injected through environment-specific configuration.

---

## 2. Core Rule

**All third-party credentials must be supplied through environment variables or a secure secret store.**

### Never do this
- hardcode secrets in C# source files
- hardcode secrets in Angular source files
- commit secrets to `appsettings.json`
- commit secrets to `appsettings.Development.json`
- commit secrets to `.env` files unless the file is explicitly ignored and used only locally
- expose any provider credentials to the browser

---

## 3. Scope of Secrets

## 3.1 Gemini Developer API

### Secret type
- API key

### Required
Yes

### Recommended environment variable
```text
GEMINI_API_KEY
```

### Notes
This secret must only be used by the backend API when calling Gemini.

---

## 4. Non-Secret but Important Provider Configuration

The following values are not necessarily secrets, but should still be centrally configured and not scattered throughout the codebase.

## 4.1 Gemini
```text
GEMINI_MODEL
GEMINI_BASE_URL
```

## 4.2 Ollama (local LLM)
```text
OLLAMA_BASE_URL
OLLAMA_MODEL
```

No secret is required for Ollama — it runs locally and has no API key.

## 4.3 Clementine DB access
```text
CLEMENTINE_DB_PATH
CLEMENTINE_MATCH_THRESHOLD
```

## 4.4 Clementine Remote (Phase 4)
```text
CLEMENTINE_REMOTE_HOST
CLEMENTINE_REMOTE_PORT
```

## 4.5 Recommendation behavior
```text
RECOMMENDATION_MIN_TRACKS
RECOMMENDATION_MAX_TRACKS
RECOMMENDATION_SUGGESTION_CACHE_MINUTES
```

## 4.6 Shared application identification
```text
APP_PUBLIC_URL
APP_CONTACT_EMAIL
APP_VERSION
```

---

## 5. Backend-Only Rule

All provider credentials must be available to the **ASP.NET Core backend only**.

### Requirement
The Angular frontend must never receive, store, or use any secret or API key.

### Implication
All external provider calls must be made by the backend.
The frontend should only call the backend API.

---

## 6. Recommended Environment Variable Set

## 6.1 Minimum current set

```text
GEMINI_API_KEY=
```

## 6.2 Recommended full set

```text
# AI providers
GEMINI_API_KEY=
GEMINI_MODEL=
GEMINI_BASE_URL=

# Local LLM (optional — no key required)
OLLAMA_BASE_URL=
OLLAMA_MODEL=

# Clementine
CLEMENTINE_DB_PATH=
CLEMENTINE_MATCH_THRESHOLD=
CLEMENTINE_REMOTE_HOST=
CLEMENTINE_REMOTE_PORT=

# Recommendation tuning
RECOMMENDATION_MIN_TRACKS=
RECOMMENDATION_MAX_TRACKS=
RECOMMENDATION_SUGGESTION_CACHE_MINUTES=

# App identity
APP_PUBLIC_URL=
APP_CONTACT_EMAIL=
APP_VERSION=
```

### Placeholder rule
Leave values blank in committed templates.
Actual values should be provided later through local environment configuration or secret storage.

---

## 7. Recommended .NET Configuration Mapping

The backend maps environment variables into strongly-typed options classes.

### GeminiOptions
- ApiKey
- Model
- BaseUrl

### OllamaOptions
- BaseUrl
- Model

### ClementineOptions
- DbPath
- MatchThreshold

### ClementineRemoteOptions
- Host
- Port

### RecommendationOptions
- MinTracks
- MaxTracks
- SuggestionCacheDurationMinutes

### AppIdentityOptions
- PublicUrl
- ContactEmail
- Version

---

## 8. Local Development Guidance

## 8.1 Preferred local approach

For local development, use environment variables configured on the machine or via a local, ignored secrets mechanism.

### Acceptable local methods
- system/user environment variables
- IDE launch configuration with environment variables
- local secret manager / secret store
- local `.env` file only if it is ignored and never committed

## 8.2 Linux deployment

On Linux, use a `.env.local` file sourced by `start.sh` (never committed). See `linux/deploy-linux.md`.

## 8.3 Do not commit local secret files

If a local developer convenience file is used, it must be ignored in Git.

Examples to ignore if used locally:
- `.env`
- `.env.local`
- `secrets.local.json`

---

## 9. Deployment Guidance

## 9.1 Environment variables in hosted environments

For deployed environments, supply secrets through the hosting platform's secret/configuration system.

Examples:
- Azure App Service application settings
- container environment variables
- GitHub Actions secrets feeding deployment config
- systemd `EnvironmentFile` (Linux)

## 9.2 Separate values per environment

Keep separate secret values for:
- local development
- test / staging
- production

Do not reuse personal development credentials as production credentials.

---

## 10. Git Hygiene Rules

## 10.1 Never commit actual values

No committed file in the repository should contain real values for:
- `GEMINI_API_KEY`
- any future service secret

## 10.2 Commit templates only

If you want to help onboarding, commit only template/example files such as:
- `.env.example`
- `secrets.example.md`
- configuration documentation with empty placeholders

---

## 11. Rotation / Revocation Guidance

If any secret is suspected to be exposed:

1. revoke or rotate it at the provider,
2. update the environment value,
3. verify the backend picks up the new value,
4. check logs and history for accidental leakage,
5. if needed, purge the secret from Git history if it was committed by mistake.

---

## 12. Missing Secret Handling Policy

If a required secret is missing at runtime:

### Gemini
The backend logs a warning on startup. All recommendation requests return 403 until the key is set.

### Rule
Do not silently pretend that provider integration is working when required credentials are absent.

---

## 13. Executive Summary

The preferred secret strategy for this project is simple:

- keep all third-party credentials on the **backend only**
- supply them through **environment variables**
- never commit actual values
- and keep provider authentication centralized and testable

The only secret-bearing variable currently required is:

- `GEMINI_API_KEY`

All other configuration values (Ollama URL, Clementine paths, tuning parameters) are non-secret and can be committed as defaults in `appsettings.json`, with environment variable overrides for deployment.
