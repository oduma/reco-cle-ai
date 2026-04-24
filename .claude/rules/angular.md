# Angular / Angular Material Rule

Use this rule when working in frontend files under Angular feature areas.

## Architecture
- Keep the Angular app organized by **feature**, not by broad technical type only.
- Prefer **standalone Angular components** and modern Angular patterns.
- Keep routed features isolated and lazy-loadable when useful.
- Keep page orchestration out of overly generic shared components.

## Components and templates
- Keep components small and single-purpose.
- Avoid heavy logic in templates.
- Shape data in TypeScript rather than building complex templates.
- Explicitly implement loading, empty, error, and success states.

## API usage
- Use typed API client services.
- Do not scatter `HttpClient` calls across unrelated components.
- Keep backend DTOs separate from frontend view models where helpful.

## Angular Material
- Prefer reusable wrappers for repeated UI patterns.
- Keep dialogs, forms, tables, and layout patterns visually consistent.
- Avoid one-off styling drift.
- Preserve accessibility and keyboard behavior.

## Testing
- Add or update tests when user-visible behavior changes.
- Prefer behavior-focused component/service tests over brittle implementation-detail tests.

## Anti-patterns to avoid
- giant all-purpose components
- business logic embedded directly in templates
- inconsistent error handling
- duplicated Material usage that should become shared UI primitives
