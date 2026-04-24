---
applyTo: "src/client/**/*.{ts,html,scss,css},src/client/**/*.spec.ts"
description: "Angular, Angular Material, and frontend-specific guidance for the Personal Music Discovery Web App"
---

# Angular / Angular Material Instructions

## Architecture
- Keep the Angular app organized by **feature area**.
- Prefer **standalone Angular patterns**.
- Keep routed features isolated and lazy-loadable where appropriate.
- Keep components presentation-focused unless a container/component split is intentional.

## Components
- Keep components small and single-purpose.
- Avoid putting heavy orchestration logic directly into templates.
- Prefer view-model shaping in TypeScript over template complexity.
- Keep loading, empty, and error states explicit.

## State
- Keep local UI state local.
- Use feature-scoped services or store abstractions for feature workflows.
- Avoid unnecessary global state.

## API usage
- Use typed API client services.
- Do not scatter raw `HttpClient` calls across random components.
- Keep backend DTOs and frontend view models intentionally mapped when useful.

## Angular Material
- Prefer reusable wrapper components for repeated UI patterns.
- Keep layout, form, dialog, and table patterns visually consistent.
- Avoid ad hoc styling drift.
- Respect theming and accessibility.

## Accessibility
- Ensure keyboard usability for forms, dialogs, menus, and actionable controls.
- Preserve visible focus behavior.
- Use semantic markup where possible.
- Ensure labels, validation messages, and hints are understandable.

## Testing
- Add or update component/service tests when behavior changes materially.
- Prefer tests that verify user-visible behavior over brittle implementation details.

## Anti-patterns to avoid
- Huge all-purpose components
- Business logic hidden in templates
- Inconsistent error handling
- Repeated direct Material usage where a shared wrapper should exist
- Unbounded list rendering when paging/virtualization is needed
