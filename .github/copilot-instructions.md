# Repository Instructions for GitHub Copilot

## Project Summary
This repository contains the **Personal Music Discovery Web App**.

The app is built as:
- **Angular + Angular Material** frontend
- **ASP.NET Core Web API** backend
- AI-assisted chat and recommendation flow
- later web-based music suggestion retrieval
- later Clementine local-library grounding/filtering

## Source of Truth Documents
When working in this repository, follow these documents first:

### Plans
- `docs/plans/phased-development-and-test-plan-personal-music-discovery-web-app.md`
- `docs/plans/implementation-backlog-personal-music-discovery-web-app.md`
- `docs/plans/github-copilot-agent-plan-personal-music-discovery-engine.md`

### Architecture
- `docs/architecture/angular-material-dotnet-api-architecture-best-practices.md`
- `docs/architecture/logical-component-architecture-personal-music-discovery-engine.md`
- `docs/architecture/query-execution-sequence-diagram-personal-music-discovery-engine.md`
- `docs/architecture/provider-failure-graceful-degradation-sequence-diagram-personal-music-discovery-engine.md`

### Contracts
- `docs/contracts/stage-by-stage-data-contracts-personal-music-discovery-engine.md`

### Policies
- `docs/policies/ranking-policy-personal-music-discovery-engine.md`
- `docs/policies/explanation-policy-personal-music-discovery-engine.md`
- `docs/policies/provider-caching-and-persistence-model-personal-music-discovery-engine.md`

### Governance
- `docs/governance/agent-handover-matrix-personal-music-discovery-engine.md`

## Delivery Model
Build the app in **vertical slices**.

Always prefer:
1. a small end-to-end usable feature,
2. a test pass,
3. a correction loop,
4. then the next feature increment.

Do not build large isolated frontend or backend work that cannot be tested through the real application.

## Current Delivery Phases
- **Phase 1:** chat-only AI prototype
- **Phase 2:** chat + web suggestions above the chat
- **Phase 3:** chat + web suggestions filtered/grounded to Clementine local ownership

Do not jump ahead to later-phase features unless explicitly requested.

## Frontend Rules
- Keep Angular code **feature-based**, not organized as one giant technical-type structure.
- Prefer **standalone Angular patterns**.
- Keep components small and focused.
- Keep templates simple.
- Use typed API client services instead of scattering raw HTTP calls.
- Use Angular Material through reusable app-specific wrappers when patterns repeat.
- Implement loading, empty, and error states intentionally.
- Preserve accessibility basics in all UI work.

## Backend Rules
- Keep ASP.NET Core endpoints/controllers **thin**.
- Put business/application logic behind the HTTP layer.
- Use explicit request/response DTOs.
- Use consistent validation and error responses.
- Preserve OpenAPI contract clarity.
- Keep external provider integration isolated from HTTP and UI concerns.
- Do not expose database or provider internals directly through the API.

## Cross-Cutting Rules
- Do not silently redefine contracts from other docs.
- If implementation conflicts with a documented contract or architecture rule, surface the mismatch explicitly.
- Preserve backward usability from one phase to the next.
- Add or update tests when behavior changes materially.
- Prefer maintainable code over clever code.

## Agent Usage
If custom agents are used, they should respect their ownership boundaries and use artifact-based handoffs.
See:
- `.github/agents/`
- `docs/governance/agent-handover-matrix-personal-music-discovery-engine.md`

## Build / Test Expectations
Before proposing a change, take into account:
- how the client should be built and run,
- how the server should be built and run,
- what tests or validation should be updated,
- and whether the change fits the current development phase.

If exact build commands are missing, do not invent complex toolchains. Add the missing documentation or ask for the missing command conventions if needed.

## Documentation Update Rule
If a change affects architecture, contracts, policies, or backlog sequencing, update the relevant Markdown docs or explicitly note that documentation must be updated.
