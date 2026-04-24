# Testing Rule

Use this rule whenever changing behavior that affects frontend flows, backend contracts, provider logic, or local library matching.

## General rule
If behavior changes, assess whether tests must be added or updated.

## Test layers
Prefer clear separation between:
- unit tests
- integration tests
- end-to-end tests

## Frontend tests
- Focus on user-visible behavior.
- Verify loading, empty, error, and success states.
- Avoid brittle implementation-detail tests.

## Backend tests
- Verify request/response behavior.
- Verify validation and error handling.
- Verify provider failure and graceful degradation paths.
- Verify local Clementine matching/filtering behavior where relevant.

## End-to-end expectations by phase
- Phase 1: send prompt → receive chat response
- Phase 2: send prompt → receive chat + web suggestions
- Phase 3: send prompt → receive locally-grounded suggestions

## Correction loop rule
If a bug is fixed after testing, add or update a test where practical so the issue does not quietly return.

## Anti-patterns to avoid
- snapshot-heavy tests with little behavioral value
- tests that prove internals but not outcomes
- missing failure-path tests for critical flows
