# Best Practices for an Angular + Angular Material SPA with a .NET API Backend

## 1. Purpose

This document captures practical best practices for building a modern web application with:

- **Angular** on the client side
- **Angular Material** for the UI component system
- **ASP.NET Core Web API** on the server side using **C# / .NET**

The goal is a solution that is:

- maintainable
- scalable
- secure
- testable
- observable
- and friendly to long-term team development

---

## 2. Recommended High-Level Architecture

Use a **SPA + API** architecture with a clear separation of concerns:

- **Angular SPA** handles presentation, local UI state, routing, and user interaction.
- **.NET API** owns authentication, authorization, business logic orchestration, data access, integration with external systems, and cross-cutting server concerns.
- The browser should talk only to the **API contract**, never directly to databases or sensitive third-party services.

### Recommended runtime topology

```text
Browser
  ↓
Angular SPA (Angular + Angular Material)
  ↓ HTTPS / JSON / OpenAPI-backed contract
ASP.NET Core API
  ↓
Application / Domain / Infrastructure
  ↓
Databases, caches, external providers, queues, search, etc.
```

### Design rule

Keep the Angular app focused on:
- UX
- view composition
- client-side validation
- API orchestration

Keep the API focused on:
- domain rules
- security
- persistence
- external integrations
- server-side validation

---

## 3. Frontend Best Practices (Angular)

## 3.1 Prefer standalone Angular architecture

For new Angular applications, use **standalone components** instead of building around NgModules.

### Why
- simpler mental model
- less boilerplate
- better alignment with modern Angular
- easier feature-level composition

### Practical guidance
- use standalone components by default
- use standalone route definitions
- keep bootstrapping simple in `main.ts`

---

## 3.2 Organize the Angular app by feature area, not technical type

Avoid giant folders like:
- `components/`
- `services/`
- `models/`

at the top level of the app.

Instead, group by **feature/domain area**.

### Recommended structure

```text
src/app/
  core/
  shared/
  features/
    search/
    recommendations/
    playlists/
    account/
```

### Meaning
- `core/` → app-wide singleton concerns
- `shared/` → reusable UI primitives and helpers
- `features/` → business-facing vertical slices

---

## 3.3 Keep components small and presentation-focused

Angular components should mostly handle:
- rendering
- user interactions
- UI composition
- local UI state

Avoid putting heavy orchestration, transformation, or data-fetching rules directly into large page components.

### Good pattern
Split components into:
- **container/smart components**
- **presentational/dumb components**

### Example
- page component loads data and coordinates actions
- reusable list/card/form components only receive inputs and emit outputs

---

## 3.4 Keep templates simple

Avoid complicated conditional logic, large inline expressions, and data transformation chains directly in templates.

### Prefer
- derived view models
- computed state
- small reusable child components
- pipes only for simple presentation transforms

### Avoid
- business logic in HTML
- long nested structural directives in a single template
- repeated template logic across pages

---

## 3.5 Use a clear client-side state strategy

Do not let state management become accidental.

### Recommended approach
Use a tiered strategy:

#### Local component state
Use Angular-native local state for:
- UI toggles
- dialog state
- current tab
- simple in-view selections

#### Feature state
Use feature-scoped services/store abstractions for:
- search result state
- currently selected filters
- recommendation request/response lifecycle

#### Global application state
Only keep truly global concerns globally, such as:
- authenticated user profile
- theme preference
- app configuration
- global notifications

### Rule
Global state should be the exception, not the default.

---

## 3.6 Use typed API clients, not raw HTTP scattered everywhere

Do not call `HttpClient` ad hoc across many components.

### Best practice
Create **typed API client services** per backend domain.

### Example
```text
api-clients/
  recommendations-api.service.ts
  account-api.service.ts
  playlist-api.service.ts
```

### Benefits
- centralizes endpoint URLs
- centralizes DTO typing
- makes retry/error handling consistent
- improves testability
- makes refactoring easier

---

## 3.7 Centralize route guards, interceptors, and app-wide policies

Use Angular’s interception and routing infrastructure for cross-cutting frontend concerns.

### Interceptors should handle
- auth token injection
- correlation/request IDs where needed
- consistent error mapping
- retry for safe idempotent reads only
- loading or telemetry hooks if required

### Route guards should handle
- authentication checks
- role/permission gating
- feature-flag gating where needed

---

## 3.8 Use lazy loading for feature areas

Feature routes should be lazy loaded where possible.

### Benefits
- smaller initial bundle
- faster first load
- cleaner feature boundaries
- easier future modularization

### Rule
Do not put all routed screens into the initial bundle unless there is a strong reason.

---

## 3.9 Prefer strict typing throughout the Angular app

Use strict TypeScript settings and avoid `any`.

### Best practices
- define DTOs explicitly
- define view models explicitly
- isolate API types from UI types where useful
- avoid leaking raw backend contracts deep into presentation logic

---

## 4. Angular Material Best Practices

## 4.1 Treat Angular Material as a design system foundation, not a full product UI

Angular Material is excellent for consistency, accessibility, and baseline UX.
But you should still create an application-level design layer on top of it.

### Best practice
Wrap repeated Material patterns into app-specific UI primitives.

### Example
Instead of using raw `mat-card`, `mat-table`, and `mat-form-field` everywhere, create:
- `app-page-shell`
- `app-filter-panel`
- `app-empty-state`
- `app-confirm-dialog`
- `app-data-table`

This prevents your app from becoming a pile of low-level Material components.

---

## 4.2 Build one coherent theming strategy early

Do not sprinkle ad hoc colors and spacing overrides throughout the app.

### Best practice
Define a consistent theming layer for:
- color
- typography
- spacing
- density
- dark/light behavior

### Rule
Use Angular Material theming and design tokens consistently.
Avoid one-off overrides unless they are encapsulated.

---

## 4.3 Prioritize accessibility from day one

Material guidance emphasizes semantic HTML, standard controls, focus visibility, and WCAG-aligned accessibility behavior.

### Best practices
- use semantic HTML and native controls where appropriate
- ensure keyboard navigation works across dialogs, menus, tables, and forms
- verify focus management explicitly for overlays/dialogs
- maintain sufficient color contrast
- ensure labels, hints, and errors are screen-reader friendly

### Rule
A component is not done until it is keyboard-usable and screen-reader reasonable.

---

## 4.4 Use Material tables, dialogs, and forms carefully

Material can accelerate development, but large enterprise apps often become brittle when every screen directly hand-builds custom tables and forms.

### Best practice
Standardize:
- table patterns
- form field patterns
- dialog behaviors
- validation message rendering
- loading / empty / error states

### Goal
Users should feel one product, not many mini-apps.

---

## 5. Backend Best Practices (.NET / ASP.NET Core API)

## 5.1 Keep the API as a real application boundary

The backend should not be a thin pass-through to the database.

It should own:
- domain/application rules
- input validation
- authorization
- integration orchestration
- persistence boundaries
- audit/security-critical behavior

---

## 5.2 Choose one HTTP API style and stay consistent

ASP.NET Core supports both **Minimal APIs** and **controller-based APIs**.

### Practical recommendation
For a non-trivial Angular-backed business application:
- use **controllers** if your team prefers MVC conventions, filters, and a more explicit class-based structure
- use **Minimal APIs** if you want a lighter endpoint style and are disciplined about route grouping and separation

### Decision rule
Pick one style as the default for the solution and apply it consistently.

### Pragmatic note
If the app will have many endpoints, richer validation rules, versioning, and a larger team, controller-based APIs are often easier to govern consistently.

---

## 5.3 Use layered or modular boundaries on the server

Even if you deploy as one API, avoid putting everything into controllers.

### Recommended logical layers
- **API / Presentation**
- **Application**
- **Domain**
- **Infrastructure**

### Meaning
- API layer: HTTP contract, authz, request/response mapping
- Application layer: use-case orchestration
- Domain layer: business rules and domain concepts
- Infrastructure layer: DB, external services, file storage, messaging, search, etc.

### Goal
A thin HTTP layer, a strong application/domain core, and isolated infrastructure concerns.

---

## 5.4 Keep controllers/endpoints thin

Controllers or endpoint handlers should:
- receive the request
- validate/bind input
- call the appropriate application service/use case
- return the result

They should **not** contain:
- core business logic
- data access logic
- long orchestration flows
- large mapping blocks

---

## 5.5 Use explicit request/response DTOs

Do not expose persistence entities directly over the wire.

### Best practice
Define dedicated contracts for:
- requests
- responses
- search/filter payloads
- validation errors
- problem/error payloads

### Benefits
- prevents contract leakage
- prevents accidental over-posting / over-returning
- keeps API evolution manageable
- decouples backend internals from frontend assumptions

---

## 5.6 Standardize validation and error responses

For Web APIs, use consistent server-side validation and standard error shapes.

### Best practice
- validate all inputs at the API boundary
- return predictable validation responses
- use **Problem Details** / problem-style responses consistently for errors
- avoid ad hoc JSON error shapes

### Rule
A client should never have to guess what an error payload looks like.

---

## 5.7 Generate and maintain OpenAPI documentation

Your Angular client and your API should share a contract mindset.

### Best practice
- generate OpenAPI for every environment where appropriate
- document security requirements, response codes, and DTO schemas
- use OpenAPI for client generation or at least contract validation

### Goal
Reduce drift between frontend expectations and backend behavior.

---

## 5.8 Secure the API as if it were public, even if it starts internal-only

OWASP’s API Security Top 10 highlights recurring risks such as:
- broken object-level authorization
- broken authentication
- broken function-level authorization
- unrestricted resource consumption
- security misconfiguration
- unsafe consumption of APIs

### Practical best practices
- enforce authorization per resource, not just per endpoint group
- do not trust IDs from the client without ownership/access checks
- use short-lived tokens and correct token validation
- validate every input model
- protect expensive endpoints with rate limiting and bounded resource usage
- separate admin and user flows clearly
- review external API consumption carefully

---

## 5.9 Implement rate limiting intentionally

ASP.NET Core provides built-in rate limiting middleware.

### Best practice
Use rate limiting as part of your API governance strategy, especially for:
- login/auth endpoints
- expensive search/recommendation endpoints
- export/import endpoints
- externally exposed APIs

### Rule
Partition limits by a meaningful identity when appropriate:
- user
- client app
- tenant
- IP (as a fallback)

### Important note
Rate limiting is not a full DDoS solution, but it is still important for fairness, abuse prevention, and resource protection.

---

## 5.10 Expose health checks and readiness endpoints

ASP.NET Core health checks should be first-class in production deployments.

### Best practice
Expose separate checks for:
- liveness
- readiness
- critical dependencies where appropriate

### Use cases
- container orchestrators
- load balancers
- monitoring systems
- deployment verification

### Rule
Do not expose sensitive internals in public health endpoints.

---

## 5.11 Use structured logging and correlation IDs

When Angular calls your API, cross-layer debugging matters.

### Best practice
- emit structured logs
- include request correlation IDs / trace IDs
- propagate trace context where possible
- log major business events and failure points

### Goal
A production bug should be traceable from browser action to API request to downstream dependency call.

---

## 5.12 Keep configuration externalized and environment-specific

Do not hardcode secrets, URLs, or environment-specific behavior.

### Best practice
- keep secrets in a secure store
- keep environment config separate from code
- use strong defaults for local development
- validate critical config at startup

---

## 6. Cross-Cutting Best Practices Across Client and Server

## 6.1 Design the API contract first for critical flows

For major user journeys, define the request/response contract intentionally.

Examples:
- login/session bootstrap
- search request / response
- recommendation response
- pagination/filtering shape
- validation error contract

### Goal
Prevent frontend and backend from evolving independently by accident.

---

## 6.2 Be explicit about authentication and authorization boundaries

### Frontend
The Angular app should:
- react to authentication state
- hide or disable inaccessible UI affordances
- never be treated as the source of truth for permissions

### Backend
The API must:
- enforce authorization server-side
- validate resource ownership and action permission
- never rely on the client for privilege decisions

---

## 6.3 Prefer same-origin deployment if feasible

If practical, serve the SPA and API under the same parent domain/reverse proxy setup.

### Benefits
- simpler CORS posture
- simpler cookie/token behavior
- easier operational routing
- fewer local-vs-prod surprises

### If cross-origin is required
- make CORS explicit and minimal
- never use broad wildcard policies casually

---

## 6.4 Use pagination, filtering, and sorting intentionally

Do not return unbounded collections to the Angular client.

### Best practice
All list-heavy endpoints should define:
- pagination rules
- sorting semantics
- filter shape
- maximum page size limits

### Goal
Protect both UX and backend resource usage.

---

## 6.5 Treat performance as an architectural concern

### Frontend
- lazy load features
- optimize change detection
- avoid unnecessary rerenders
- use virtual scrolling for large data sets where needed
- load only the data the page needs

### Backend
- avoid N+1 access patterns
- avoid over-fetching
- use caching for expensive read paths where appropriate
- add rate limiting for expensive endpoints
- measure before optimizing blindly

---

## 7. Testing Strategy Best Practices

## 7.1 Frontend testing

Use layered testing:
- unit tests for isolated logic and services
- component tests for UI behavior
- end-to-end tests for critical business journeys

### Prioritize tests for
- auth flows
- route guards
- API client behavior
- critical Angular Material interactions
- accessibility-sensitive flows

---

## 7.2 Backend testing

Use layered testing:
- unit tests for domain/application rules
- integration tests for HTTP endpoints
- integration tests for persistence and external providers where valuable

### Prioritize tests for
- authorization rules
- validation behavior
- error contract consistency
- important workflows
- recommendation/search correctness if applicable

---

## 7.3 Contract testing

For SPA + API systems, contract drift is a common source of pain.

### Best practice
- validate OpenAPI changes in CI
- use generated clients or schema checks where useful
- treat breaking API changes as explicit, reviewed decisions

---

## 8. DevOps and Delivery Best Practices

## 8.1 Build independently, version together intentionally

The SPA and API should be independently buildable and testable.
But releases should still be coordinated when contracts change.

### Best practice
- version API changes clearly
- keep a deployment compatibility matrix if needed
- avoid silent contract breaks

---

## 8.2 Use CI/CD quality gates

### Frontend gates
- linting
- unit tests
- build
- accessibility checks where possible

### Backend gates
- build
- unit/integration tests
- API contract checks
- security scanning

---

## 8.3 Observe production actively

Monitor:
- frontend errors
- API error rates
- endpoint latency
- health check status
- rate-limiting events
- authentication/authorization failures

### Rule
Do not wait for users to become your monitoring system.

---

## 9. Recommended Reference Solution Shape

```text
repo/
  docs/
  src/
    client/
      angular-app/
        src/app/
          core/
          shared/
          features/
          api-clients/
    server/
      web-api/
      application/
      domain/
      infrastructure/
  tests/
    client/
    server/
    contract/
```

### Why this works well
- clear separation of frontend and backend concerns
- feature-driven Angular structure
- layered backend structure
- room for shared documentation and contract artifacts

---

## 10. Common Mistakes to Avoid

### Frontend mistakes
- putting too much logic into components
- scattering `HttpClient` calls everywhere
- overusing global state
- building screens directly from raw Material primitives without app-level abstractions
- poor accessibility validation

### Backend mistakes
- fat controllers
- returning EF/domain entities directly
- inconsistent error responses
- missing authorization checks on object access
- no rate limiting on expensive endpoints
- no health checks / no observability

### System-level mistakes
- frontend and backend evolving contracts informally
- unbounded list endpoints
- weak production diagnostics
- cross-origin setup left as an afterthought

---

## 11. Practical Recommendation for Your Stack

For **Angular + Angular Material + ASP.NET Core API**, a strong default architecture is:

- **Angular standalone SPA**, organized by feature area
- **Angular Material** as the UI foundation with your own reusable UI wrappers
- **thin API controllers/endpoints** over a layered backend
- **typed DTO contracts** and **OpenAPI**
- **server-side validation + Problem Details**
- **resource-based authorization**
- **health checks + structured logging + rate limiting**
- **feature-based frontend lazy loading**
- **shared documentation and contract discipline**

This combination is simple enough to ship, but disciplined enough to scale.

---

## 12. Executive Summary

If you want this architecture to work well long term:

- keep Angular focused on presentation and UX
- keep .NET focused on business rules, security, and persistence
- keep contracts explicit
- keep components/endpoints thin
- keep accessibility, observability, and security as first-class concerns
- and organize both sides by feature/domain rather than by framework artifact type

That is the most reliable way to avoid building a solution that works at first but becomes painful at scale.
