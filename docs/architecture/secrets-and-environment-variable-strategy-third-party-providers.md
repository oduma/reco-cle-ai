# Secrets & Environment Variable Strategy

## 1. Purpose

This document defines how the Personal Music Discovery Web App should handle **external-service credentials and secrets** using **environment variables**.

This document currently covers:

- **Gemini Developer API**
- **Last.fm API**
- **Discogs API**

It is intended to be used by **GitHub Copilot** and by developers working on the solution so that secrets are:

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

## 3.2 Last.fm API

### Secret types
- API key
- shared secret

### Required
Yes

### Recommended environment variables
```text
LASTFM_API_KEY
LASTFM_API_SECRET
```

### Notes
Even if only read-oriented integration is used initially, keep both values backend-only.

---

## 3.3 Discogs API

### Secret type (preferred current mode)
- personal/user token

### Required
Yes, if authenticated Discogs access is used

### Recommended environment variable
```text
DISCOGS_USER_TOKEN
```

### Notes
The current preferred integration path is authenticated access using a personal/user token rather than full OAuth.

---

## 3.4 Discogs future optional OAuth mode

If the project later chooses to implement full OAuth/application registration, the following additional variables may be introduced.

### Optional future environment variables
```text
DISCOGS_CONSUMER_KEY
DISCOGS_CONSUMER_SECRET
```

### Current rule
Do **not** implement or require these yet unless the project explicitly decides to move to the full OAuth path.

---

## 4. Non-Secret but Important Provider Configuration

The following values are not necessarily secrets, but should still be centrally configured and not scattered throughout the codebase.

## 4.1 Gemini
```text
GEMINI_MODEL
GEMINI_BASE_URL
```

## 4.2 Last.fm
```text
LASTFM_BASE_URL
```

## 4.3 Discogs
```text
DISCOGS_BASE_URL
DISCOGS_USER_AGENT
```

## 4.4 Shared application identification
```text
APP_PUBLIC_URL
APP_CONTACT_EMAIL
APP_VERSION
```

These can help construct meaningful provider-facing `User-Agent` values where required.

---

## 5. Backend-Only Rule

All provider credentials must be available to the **ASP.NET Core backend only**.

### Requirement
The Angular frontend must never receive, store, or use:
- `GEMINI_API_KEY`
- `LASTFM_API_KEY`
- `LASTFM_API_SECRET`
- `DISCOGS_USER_TOKEN`
- any future Discogs consumer secret

### Implication
All external provider calls must be made by the backend.
The frontend should only call the backend API.

---

## 6. Recommended Environment Variable Set

## 6.1 Minimum current set

```text
GEMINI_API_KEY=
LASTFM_API_KEY=
LASTFM_API_SECRET=
DISCOGS_USER_TOKEN=
```

## 6.2 Recommended extended set

```text
GEMINI_API_KEY=
GEMINI_MODEL=
GEMINI_BASE_URL=

LASTFM_API_KEY=
LASTFM_API_SECRET=
LASTFM_BASE_URL=

DISCOGS_USER_TOKEN=
DISCOGS_BASE_URL=
DISCOGS_USER_AGENT=

APP_PUBLIC_URL=
APP_CONTACT_EMAIL=
APP_VERSION=
```

### Placeholder rule
Leave values blank in committed templates.
Actual values should be provided later through local environment configuration or secret storage.

---

## 7. Recommended .NET Configuration Mapping

The backend should map environment variables into strongly-typed options classes.

## 7.1 Suggested options groups

### GeminiOptions
- ApiKey
- Model
- BaseUrl

### LastFmOptions
- ApiKey
- ApiSecret
- BaseUrl

### DiscogsOptions
- UserToken
- BaseUrl
- UserAgent

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

## 8.2 Do not commit local secret files

If a local developer convenience file is used, it must be ignored in Git.

Examples to ignore if used locally:
- `.env`
- `.env.local`
- `secrets.local.json`

---

## 9. Deployment Guidance

## 9.1 Environment variables in hosted environments

For deployed environments, supply secrets through the hosting platform’s secret/configuration system.

Examples:
- Azure App Service application settings
- container environment variables
- GitHub Actions secrets feeding deployment config
- secure orchestration platform secret injection

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
- `LASTFM_API_KEY`
- `LASTFM_API_SECRET`
- `DISCOGS_USER_TOKEN`
- future OAuth secrets if introduced

## 10.2 Commit templates only

If you want to help onboarding, commit only template/example files such as:
- `.env.example`
- `secrets.example.md`
- configuration documentation with empty placeholders

### Example pattern
```text
GEMINI_API_KEY=
LASTFM_API_KEY=
LASTFM_API_SECRET=
DISCOGS_USER_TOKEN=
```

---

## 11. Rotation / Revocation Guidance

If any secret is suspected to be exposed:

1. revoke or rotate it at the provider,
2. update the environment value,
3. verify the backend picks up the new value,
4. check logs and history for accidental leakage,
5. if needed, purge the secret from Git history if it was committed by mistake.

---

## 12. Validation Rules for GitHub Copilot

GitHub Copilot should follow these rules when generating code.

## 12.1 Must do
- read provider credentials from backend configuration
- use environment variable-backed options
- keep provider secrets out of Angular code
- fail clearly when a required secret is missing
- allow blank placeholder values in templates and docs
- keep authentication configuration centralized

## 12.2 Must not do
- hardcode secrets in code
- place secrets in frontend environment files intended for browser delivery
- duplicate secret-loading logic across many files
- silently fall back to fake or placeholder secrets at runtime
- log full secret values

---

## 13. Missing Secret Handling Policy

If a required secret is missing at runtime:

### Gemini
The backend should fail the Gemini-dependent operation clearly and return a safe provider-unavailable error.

### Last.fm
The backend should fail the Last.fm-dependent operation clearly and allow graceful degradation if other providers can still answer.

### Discogs
The backend should fail the Discogs-dependent operation clearly and allow graceful degradation if other providers can still answer.

### Rule
Do not silently pretend that provider integration is working when required credentials are absent.

---

## 14. Suggested Backlog Implications

The implementation backlog should include items such as:

- add provider options classes
- bind options from environment variables
- validate required secrets on startup or first use
- add secure local development setup documentation
- add `.env.example` or equivalent template if desired
- ensure logging never emits full secrets

---

## 15. Ready-to-Fill Placeholder Block

Use this block later when you are ready to provide the actual values.

```text
GEMINI_API_KEY=
GEMINI_MODEL=
GEMINI_BASE_URL=

LASTFM_API_KEY=
LASTFM_API_SECRET=
LASTFM_BASE_URL=

DISCOGS_USER_TOKEN=
DISCOGS_BASE_URL=
DISCOGS_USER_AGENT=

APP_PUBLIC_URL=
APP_CONTACT_EMAIL=
APP_VERSION=
```

---

## 16. Executive Summary

The preferred secret strategy for this project is simple:

- keep all third-party credentials on the **backend only**
- supply them through **environment variables**
- never commit actual values
- and keep provider authentication centralized and testable

For the current known dependencies, the required secret-bearing variables are:

- `GEMINI_API_KEY`
- `LASTFM_API_KEY`
- `LASTFM_API_SECRET`
- `DISCOGS_USER_TOKEN`

Actual values can be supplied later without changing the repository structure or code patterns, as long as the backend is built to consume environment-backed configuration.
