---
applyTo: "src/server/**/*.cs,src/server/**/*.csproj,src/server/**/*.json,tests/server/**/*.cs"
description: "ASP.NET Core backend guidance for the Personal Music Discovery Web App"
---

# ASP.NET Core / C# Instructions

## Architecture
- Keep the HTTP API layer thin.
- Separate API/presentation concerns from application/domain/infrastructure concerns.
- Do not place business logic directly in controllers or endpoint handlers.
- Keep provider integrations and local-library integrations isolated behind abstractions.

## API contract
- Use explicit request/response DTOs.
- Do not expose persistence entities or provider-specific models directly through the API.
- Keep validation and error response behavior consistent.
- Preserve or improve OpenAPI clarity when contracts change.

## Validation and errors
- Validate input at the API boundary.
- Use consistent error shapes.
- Keep failures visible and predictable.
- Do not return ad hoc JSON error formats.

## Security and safety
- Enforce authorization on the server.
- Do not trust client-provided identifiers without server-side checks.
- Be careful with expensive endpoints and abuse-prone flows.
- Respect rate-limiting and health-check patterns where applicable.

## External integrations
- Keep AI gateway behavior behind an abstraction.
- Keep provider adapters encapsulated.
- Preserve graceful degradation behavior when dependencies fail.
- Prefer normalized domain/application outputs over leaking raw external payloads.

## Local library integration
- Clementine DB access should remain behind a dedicated adapter/service.
- If local ownership cannot be verified, do not pretend results are local.
- Surface degraded behavior safely and clearly.

## Testing
- Add or update unit/integration tests for changed behavior.
- Prioritize tests for contracts, validation, authorization, and failure paths.

## Anti-patterns to avoid
- Fat controllers
- Direct DB entity exposure over HTTP
- Hidden contract changes
- Provider-specific logic leaking into API surface
- Silent fallback behavior with misleading results
