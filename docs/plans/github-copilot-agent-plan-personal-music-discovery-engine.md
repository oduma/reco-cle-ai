# GitHub Copilot Agent Plan — Personal Music Discovery Engine

## 1. Purpose

This document defines the recommended **GitHub Copilot agent set** for building the Personal Music Discovery Engine.

It is designed for a solution with:

- **Angular + Angular Material** on the client side
- **ASP.NET Core Web API** on the server side
- a **Gemini-assisted interpretation/explanation layer**
- external provider integration for music metadata/signals
- local-library grounding and ranking logic

The goal is to give GitHub Copilot a clear set of specialist agents with well-defined responsibilities and boundaries.

---

## 2. Agent Strategy

Do **not** use one giant generalist agent for this solution.

Use a **small set of role-specialized agents** with explicit handoffs.

### Recommended agent count for this solution

**8 agents**

This is enough to:
- preserve specialization
- reduce prompt sprawl
- enable parallel work
- and keep handoffs manageable

---

## 3. Agent List

## Agent 1 — Solution Architect Agent

### Mission
Own the overall solution shape, technical boundaries, cross-cutting patterns, and design integrity.

### Primary responsibilities
- maintain alignment with the logical architecture
- enforce separation between frontend, API, application, domain, infrastructure, and provider integration concerns
- define module boundaries and integration contracts
- review major technical trade-offs
- prevent architectural drift

### Owns
- high-level solution structure
- project/repo structure
- cross-cutting design rules
- module boundaries
- architectural decision records (if used)

### Does not own
- detailed Angular feature implementation
- low-level CSS/UI work
- individual endpoint implementation
- provider-specific coding details

### Inputs
- requirements
- architecture docs
- contracts
- sequence diagrams
- best-practices guide

### Outputs
- architecture decisions
- repo structure recommendations
- integration boundary decisions
- review comments on other agents’ work

### Definition of done
- all major modules have clear ownership
- no important concerns are orphaned
- cross-cutting patterns are documented and enforceable

---

## Agent 2 — Product Contract Agent

### Mission
Translate requirements into buildable API/UI/data contracts and keep feature scope coherent.

### Primary responsibilities
- refine functional requirements into feature slices
- define request/response DTO expectations
- define frontend-backend contract shapes
- maintain acceptance criteria at feature level
- guard against scope creep and vague implementation stories

### Owns
- feature contract definitions
- endpoint payload expectations
- validation rule summaries
- acceptance criteria for user-facing flows

### Does not own
- implementation details of Angular or .NET code
- deployment/infrastructure details

### Inputs
- requirements
- data contracts
- ranking policy
- explanation policy

### Outputs
- feature-level contracts
- acceptance criteria
- DTO / interaction expectations
- refinement notes for other agents

### Definition of done
- every major feature has a testable contract and acceptance criteria
- frontend and backend can implement against the same functional expectations

---

## Agent 3 — Angular Frontend Agent

### Mission
Build the Angular application shell, feature pages, routing, client-side orchestration, and API integration layer.

### Primary responsibilities
- implement feature modules/areas using standalone Angular patterns
- build page containers and feature flows
- integrate typed API clients
- implement route configuration and lazy loading
- manage feature-scoped client-side state
- wire validation, loading, and error states into the UX

### Owns
- Angular feature structure
- route setup
- page-level orchestration
- client-side API wiring
- state management choices in the Angular app

### Does not own
- backend business rules
- Angular Material design system strategy in depth
- server-side validation rules

### Inputs
- product contracts
- best-practices guide
- API contracts from backend work

### Outputs
- Angular pages
- feature state services/store abstractions
- API client integration
- route guards and page flows

### Definition of done
- feature flows are navigable
- API integration is typed and centralized
- loading/error/empty states are implemented consistently

---

## Agent 4 — Angular Material UX Agent

### Mission
Own the UI composition layer, Angular Material usage, theming, accessibility, and reusable visual patterns.

### Primary responsibilities
- create reusable UI wrappers over Angular Material primitives
- define theming and visual consistency rules
- ensure forms, dialogs, tables, and navigation patterns are consistent
- enforce accessibility, keyboard behavior, and focus management
- design empty/loading/error state components

### Owns
- UI primitives
- page shell/layout components
- Angular Material wrapper components
- theme tokens and UI consistency patterns
- accessibility-focused implementation guidance

### Does not own
- domain logic
- backend behavior
- API contracts

### Inputs
- frontend feature requirements
- best-practices guide
- accessibility expectations

### Outputs
- shared UI components
- Angular Material usage conventions
- accessibility implementation guidance
- theme/layout consistency assets

### Definition of done
- UI is visually consistent
- accessibility basics are implemented
- repeated patterns are abstracted, not duplicated

---

## Agent 5 — .NET API Agent

### Mission
Build the ASP.NET Core API surface, endpoint contracts, validation, authentication/authorization integration, and request orchestration.

### Primary responsibilities
- implement API endpoints
- map requests to application/use-case logic
- standardize validation and error responses
- implement OpenAPI metadata where applicable
- wire authn/authz and resource-level protections
- keep controllers/endpoints thin

### Owns
- HTTP API layer
- DTOs and endpoint wiring
- problem-details / validation response behavior
- endpoint-level policy application

### Does not own
- deep provider adapter logic
- ranking internals unless they are exposed through API calls
- Angular UI behavior

### Inputs
- product contracts
- architecture docs
- best-practices guide

### Outputs
- API controllers or endpoint handlers
- request/response DTOs
- validation behavior
- OpenAPI-ready metadata

### Definition of done
- endpoints are thin, typed, validated, and documented
- authz rules are applied at the server
- responses are consistent and predictable

---

## Agent 6 — Domain & Provider Integration Agent

### Mission
Implement application/domain services and external provider adapters for music retrieval and local-library access.

### Primary responsibilities
- implement provider adapters for MusicBrainz / Last.fm / Discogs
- implement local-library adapter(s)
- implement caching-aware retrieval orchestration support
- normalize provider payloads into domain-friendly structures
- protect the core from provider-specific quirks

### Owns
- provider adapters
- provider normalization logic
- local inventory adapter
- retrieval orchestration helper logic
- provider-facing resilience logic support

### Does not own
- Angular
- top-level HTTP endpoint design
- user-facing explanations

### Inputs
- data contracts
- caching model
- graceful degradation sequence
- architecture docs

### Outputs
- provider integration code
- local-library integration code
- normalized evidence models
- adapter tests/stubs

### Definition of done
- provider calls are encapsulated
- upstream failures are handled consistently
- normalized outputs match contract expectations

---

## Agent 7 — Ranking & Explanation Agent

### Mission
Implement the recommendation ranking pipeline and explanation payload generation support.

### Primary responsibilities
- implement scoring dimensions from ranking policy
- implement duplicate handling, diversity, confidence bands, and novelty modifiers
- emit rationale fragments for explanation
- implement explanation orchestration rules and fallback behavior
- integrate with Gemini gateway contracts where needed

### Owns
- ranking engine
- confidence band logic
- rationale fragment generation
- explanation payload assembly rules
- reduced explanation mode behavior

### Does not own
- provider retrieval code
- Angular page composition
- API authn/authz

### Inputs
- ranking policy
- explanation policy
- graceful degradation sequence
- data contracts

### Outputs
- ranking service(s)
- explanation service logic
- rationale fragment models
- test scenarios for recommendation quality

### Definition of done
- ranking behavior matches policy
- explanation inputs/outputs are deterministic and traceable
- degraded explanation paths exist

---

## Agent 8 — Platform, Quality, and DevOps Agent

### Mission
Own test scaffolding, CI/CD readiness, observability, health checks, rate limiting, security hardening, and build quality gates.

### Primary responsibilities
- establish test strategy and test project scaffolding
- implement health checks and operational endpoints
- implement rate-limiting policies where appropriate
- define logging/correlation/telemetry patterns
- create CI quality gates for client and server
- advise on deployment shape, environment config, and secrets handling

### Owns
- CI/CD guardrails
- health checks
- rate limiting
- observability setup
- environment/config patterns
- quality gate enforcement

### Does not own
- detailed feature implementation
- detailed UI design
- provider-specific business rules

### Inputs
- best-practices guide
- graceful degradation sequence
- caching model
- architecture docs

### Outputs
- health/readiness implementation guidance
- telemetry/logging standards
- CI pipeline recommendations
- quality gate definitions
- deployment hygiene guidance

### Definition of done
- the solution is buildable, testable, monitorable, and operationally safe

---

## 4. Recommended Order of Agent Activation

Use the agents in this order for the cleanest implementation path.

### Phase 1 — Solution shaping
1. Solution Architect Agent
2. Product Contract Agent

### Phase 2 — Foundation
3. .NET API Agent
4. Angular Frontend Agent
5. Angular Material UX Agent

### Phase 3 — Domain intelligence
6. Domain & Provider Integration Agent
7. Ranking & Explanation Agent

### Phase 4 — Hardening
8. Platform, Quality, and DevOps Agent

### Important note
This does **not** mean the agents must work one-by-one only.
It means this is the preferred sequence for establishing stable foundations and reducing rework.

---

## 5. Collaboration Rules for GitHub Copilot Agents

## 5.1 One source of truth per concern

Each concern should have a primary owning agent.
Other agents may consume the output, but should not silently redefine it.

## 5.2 Handoffs must be artifact-based

Agents should hand off:
- Markdown docs
- typed contracts
- code skeletons
- task lists
- acceptance criteria

not vague summaries.

## 5.3 Avoid cross-boundary implementation drift

Examples:
- frontend agents should not invent backend contracts
- backend agents should not invent UI behavior
- ranking agent should not redefine retrieval contracts
- platform agent should not redesign feature behavior

## 5.4 Review loops should be explicit

Use the Solution Architect Agent as the default review agent for:
- major structural changes
- new cross-cutting dependencies
- deviations from architecture

---

## 6. Recommended Deliverables Per Agent

## Solution Architect Agent
- solution structure markdown
- architecture guardrails
- module ownership notes

## Product Contract Agent
- feature contracts
- endpoint payload definitions
- acceptance criteria markdown

## Angular Frontend Agent
- routed feature shells
- feature state services
- typed API client integration

## Angular Material UX Agent
- page shell / form / table / dialog wrappers
- theming conventions
- accessibility checklist implementation notes

## .NET API Agent
- API endpoints
- DTOs
- validation and error contracts
- OpenAPI annotations/setup

## Domain & Provider Integration Agent
- provider adapters
- local-library adapter
- normalized domain models
- retrieval orchestration support

## Ranking & Explanation Agent
- ranking engine implementation
- rationale fragment generator
- explanation assembly logic

## Platform, Quality, and DevOps Agent
- CI quality gates
- health checks
- rate limiting policy code
- observability conventions

---

## 7. Agent Prompting Guidance for GitHub Copilot

Each agent should be prompted with:

1. **its role**
2. **its owned artifacts**
3. **what it must not change**
4. **the exact files/folders it may work in**
5. **the upstream docs it must follow**
6. **what it must hand back when done**

### Example structure for agent prompts

```text
You are the Angular Frontend Agent.
You own: Angular routed features, feature state, typed API client integration.
You do not own: backend DTO design, business rules, ranking logic.
Follow these artifacts first: <list of markdown docs>.
Work only in: src/client/angular-app/...
Output: updated code + a short implementation note + any contract mismatches found.
```

---

## 8. Minimum Viable Agent Set (If You Want Fewer Than 8)

If you want to collapse roles, the smallest reasonable set is:

1. Architect + Contracts Agent
2. Angular Agent
3. .NET API Agent
4. Domain/Provider Agent
5. Ranking/Explanation Agent
6. Platform/QA Agent

That said, **8 agents** is the better balance for this solution.

---

## 9. Executive Summary

The recommended GitHub Copilot setup for this application is a team of **8 specialist agents**.

That is the best balance between:
- specialization
- manageable handoffs
- low prompt ambiguity
- and practical delivery speed.

The most important rule is simple:

> each agent should own one architectural concern clearly, hand off with artifacts, and avoid redefining another agent’s boundary.

That is how you get Copilot to build a coherent system rather than a pile of locally-correct but globally-misaligned code.
