# ASP.NET Core / C# Rule

Use this rule when working in backend API, application, or infrastructure code.

## Architecture
- Keep the HTTP layer thin.
- Separate API concerns from application/domain/infrastructure concerns.
- Do not place business logic directly in controllers or endpoint handlers.
- Provider integrations and local Clementine access must sit behind dedicated adapters/services.

## API contracts
- Use explicit request/response DTOs.
- Do not expose persistence entities or raw provider payloads through the API.
- Preserve clear, predictable OpenAPI-facing contracts.

## Validation and errors
- Validate input at the API boundary.
- Use consistent error shapes.
- Keep failures visible and safe.
- Do not return ad hoc JSON error formats.

## Security and secrets
- All third-party credentials must come from environment-backed configuration.
- Never hardcode secrets.
- Never leak credentials to the frontend.

## Providers
- Gemini, Ollama, Clementine DB, and Clementine Remote must all be backend-only integrations.
- Normalize provider data into application-owned models.
- Respect rate limits and graceful degradation.
- Caching should be used where appropriate to reduce repeated provider calls.

## Testing
- Add or update unit/integration tests when behavior changes.
- Prioritize tests for contracts, validation, degraded behavior, and provider-failure paths.

## Anti-patterns to avoid
- fat controllers
- provider-specific logic leaking into endpoint handlers
- direct frontend-facing exposure of provider response shapes
- silent fallback behavior that misleads the user
