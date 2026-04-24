---
applyTo: "tests/**/*,src/**/*.spec.ts,src/**/*test*.ts,src/**/*Tests.cs,src/**/*Test.cs"
description: "Testing guidance for frontend, backend, integration, and end-to-end work"
---

# Testing Instructions

## General rule
When changing behavior, consider whether tests must be added or updated.

## Test layering
Prefer clear separation between:
- unit tests
- integration tests
- end-to-end tests

## Frontend tests
- Focus on user-visible behavior.
- Verify loading, empty, error, and success states.
- Avoid brittle tests tied too closely to internal implementation details.

## Backend tests
- Verify request/response behavior.
- Verify validation and error behavior.
- Verify security-sensitive behavior where relevant.
- Verify degraded/failure paths for dependency-driven features.

## End-to-end tests
At least one meaningful end-to-end flow should exist per implemented phase:
- Phase 1: send prompt → receive chat response
- Phase 2: send prompt → receive chat + web suggestions
- Phase 3: send prompt → receive locally-grounded suggestions

## Correction loops
If a bug is found during a phase correction loop, add or update a test where practical so the issue does not silently return.

## Anti-patterns to avoid
- brittle snapshot-heavy tests with little behavioral value
- tests that only confirm implementation details but not outcomes
- no failure-path tests for critical flows
