# CLAUDE.md

## Project Summary
This repository contains the **Personal Music Discovery Web App**.

The current intended architecture is:
- **Frontend:** Angular + Angular Material SPA
- **Backend:** ASP.NET Core Web API
- **Current delivery approach:** phased vertical slices

The app is being built in phases:
1. **Phase 1:** chat-only AI prototype
2. **Phase 2:** chat + web suggestions above the chat
3. **Phase 3:** chat + web suggestions filtered/grounded using the local Clementine library

## How to Navigate This Repository
Use these locations as the primary sources of truth:

### Project entry points
- `README.md`
- `docs/README.md`

### Delivery and planning
- `docs/plans/phased-development-and-test-plan-personal-music-discovery-web-app.md`
- `docs/plans/implementation-backlog-personal-music-discovery-web-app.md`
- `docs/plans/github-copilot-agent-plan-personal-music-discovery-engine.md`

### Architecture
- `docs/architecture/angular-material-dotnet-api-architecture-best-practices.md`
- `docs/architecture/logical-component-architecture-personal-music-discovery-engine.md`
- `docs/architecture/query-execution-sequence-diagram-personal-music-discovery-engine.md`
- `docs/architecture/provider-failure-graceful-degradation-sequence-diagram-personal-music-discovery-engine.md`
- `docs/architecture/musicbrainz-integration-requirements-and-architecture-implications.md`
- `docs/architecture/discogs-integration-requirements-and-architecture-implications.md`

### Contracts
- `docs/contracts/stage-by-stage-data-contracts-personal-music-discovery-engine.md`

### Policies
- `docs/policies/ranking-policy-personal-music-discovery-engine.md`
- `docs/policies/explanation-policy-personal-music-discovery-engine.md`
- `docs/policies/provider-caching-and-persistence-model-personal-music-discovery-engine.md`
- `docs/policies/secrets-and-environment-variable-strategy-third-party-providers.md`

### Governance
- `docs/governance/agent-handover-matrix-personal-music-discovery-engine.md`

## Primary Working Rules
- Build the system in **vertical slices**.
- Prefer a feature that is runnable and testable end-to-end over disconnected frontend/backend work.
- End each phase with a correction/stabilization loop before adding the next major capability.
- Do not jump to Phase 3 features while Phase 1 or Phase 2 work is still incomplete unless explicitly asked.

## Stack Rules

### Frontend
- Keep Angular code organized by **feature area**.
- Prefer **standalone Angular patterns**.
- Keep components small and focused.
- Use typed client-side API services.
- Implement loading, empty, and error states deliberately.
- Use Angular Material consistently.
- Preserve accessibility basics.

### Backend
- Keep ASP.NET Core endpoints/controllers thin.
- Put business/application logic behind the HTTP layer.
- Use explicit request/response DTOs.
- Preserve consistent validation and error handling.
- Keep provider integrations isolated behind dedicated adapters/services.
- Keep local Clementine DB access behind a dedicated adapter/service.

## Provider Rules
- All provider calls must happen on the **backend only**.
- Never expose provider credentials to the frontend.
- MusicBrainz, Last.fm, Discogs, Gemini, and Clementine access must all remain behind backend abstractions.
- Normalize provider data into application-owned models before returning results.
- Respect provider-specific rate limits and graceful degradation behavior.

## Secrets Rule
- Third-party credentials must come from **environment variables** or a secure secret store.
- Never hardcode secrets.
- Never commit secrets.
- Never put secrets in Angular/browser-delivered configuration.

## Current Known Environment Variables
- `GEMINI_API_KEY`
- `LAST_FM_API_KEY`
- `LASTFM_API_SECRET`
- `DISCOGS_USER_TOKEN`
- `GEMINI_MODEL`
- `GEMINI_BASE_URL`
- `LASTFM_BASE_URL`
- `DISCOGS_BASE_URL`
- `DISCOGS_USER_AGENT`
- `APP_PUBLIC_URL`
- `APP_CONTACT_EMAIL`
- `APP_VERSION`

## Build / Test Expectations
When making changes, always consider:
- how to build the client
- how to build the server
- what tests must be added or updated
- what success criteria prove the change works

If exact commands are missing, update the documentation or ask for the missing build/test commands instead of inventing elaborate workflows.

## Documentation Update Rule
If a change materially affects:
- architecture
- contracts
- provider behavior
- ranking/explanation rules
- secrets strategy
- or backlog sequencing

then update the relevant docs or explicitly note that documentation must be updated.

## Existing GitHub Copilot Files
This repository may also contain `.github/copilot-instructions.md`, `.github/instructions/*`, and `.github/agents/*` files. Those files remain useful. Treat them as complementary repository guidance, not conflicting guidance.
