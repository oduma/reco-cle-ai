# Agent Handover Matrix — Personal Music Discovery Engine

## 1. Purpose

This document defines the **agent handover matrix** for the GitHub Copilot agent set used to build the Personal Music Discovery Engine.

It describes:

- which agent hands work to which other agent,
- what artifacts are handed over,
- when the handoff occurs,
- and what each receiving agent should validate before proceeding.

This matrix is designed to reduce:
- duplicated work
- contract drift
- prompt ambiguity
- and architecture erosion

---

## 2. Agents Covered

1. Solution Architect Agent
2. Product Contract Agent
3. Angular Frontend Agent
4. Angular Material UX Agent
5. .NET API Agent
6. Domain & Provider Integration Agent
7. Ranking & Explanation Agent
8. Platform, Quality, and DevOps Agent

---

## 3. Handover Rules

## 3.1 Use artifact-based handoffs

Every handoff should include one or more of:
- markdown spec/update note
- DTO/interface definitions
- code skeletons
- test cases / acceptance criteria
- implementation notes
- identified risks / mismatches

## 3.2 No silent reinterpretation

The receiving agent must not silently redefine the meaning of a handed-off artifact.
If the artifact is insufficient or contradictory, the agent should raise a mismatch note.

## 3.3 Architect review for cross-cutting changes

Any handoff that changes:
- shared contracts
- module boundaries
- authentication/authorization shape
- caching behavior
- ranking or explanation policy behavior

should be reviewed by the **Solution Architect Agent**.

---

## 4. Handover Matrix

## 4.1 Solution Architect Agent → All agents

### Handover artifacts
- architecture guardrails
- module boundaries
- repo/folder structure
- cross-cutting design rules
- approved implementation slices

### Receiving agents
- all

### Validation expected from receiving agent
- confirm work fits assigned module boundary
- flag architectural gaps or collisions early

---

## 4.2 Product Contract Agent → .NET API Agent

### Handover artifacts
- endpoint expectations
- request/response DTO intent
- acceptance criteria
- validation rule summary
- error contract expectations

### Receiving agent responsibilities
- translate into concrete API contracts
- identify missing or contradictory details
- keep endpoint shapes aligned with feature intent

### Exit condition
- endpoint DTOs and API behaviors are sufficiently concrete for implementation

---

## 4.3 Product Contract Agent → Angular Frontend Agent

### Handover artifacts
- feature flows
- view-level acceptance criteria
- expected request/response shape summaries
- interaction rules
- empty/loading/error state expectations

### Receiving agent responsibilities
- build page/container behavior against the contract
- identify UI/contract mismatches early

### Exit condition
- feature pages can be scaffolded against a stable contract

---

## 4.4 Product Contract Agent → Ranking & Explanation Agent

### Handover artifacts
- recommendation-oriented acceptance criteria
- user-visible intent/refinement expectations
- feature notes on recommendation and explanation behavior

### Receiving agent responsibilities
- align ranking/explanation implementation to user-facing expectations
- flag impossible or underspecified product behavior

---

## 4.5 .NET API Agent → Angular Frontend Agent

### Handover artifacts
- concrete DTOs
- endpoint paths/methods
- authentication/authorization expectations
- validation/error response shapes
- OpenAPI contract location

### Receiving agent responsibilities
- wire typed API clients
- align frontend error handling and UX states
- identify backend contract drift quickly

### Exit condition
- Angular can call the API through typed integration points

---

## 4.6 .NET API Agent → Angular Material UX Agent

### Handover artifacts
- validation payload shapes
- problem-details structure
- auth-related response behavior
- paging/filtering contract shape

### Receiving agent responsibilities
- design reusable validation/error/loading UI behaviors
- ensure UI wrappers reflect real API response conventions

---

## 4.7 Domain & Provider Integration Agent → .NET API Agent

### Handover artifacts
- application service interfaces
- provider adapter interfaces
- normalized provider models
- local-library adapter interfaces
- integration failure behavior notes

### Receiving agent responsibilities
- expose domain/application behavior through stable API contracts
- avoid leaking provider-specific details to HTTP clients

### Exit condition
- API can call stable domain/application services without knowing provider internals

---

## 4.8 Domain & Provider Integration Agent → Ranking & Explanation Agent

### Handover artifacts
- grounded candidate structures
- provider evidence structures
- world graph structures
- local inventory structures
- fallback/partial-evidence notes

### Receiving agent responsibilities
- implement ranking and explanation logic against the normalized domain outputs
- avoid direct provider-coupled assumptions

### Exit condition
- ranking logic can operate on normalized, grounded inputs only

---

## 4.9 Ranking & Explanation Agent → .NET API Agent

### Handover artifacts
- recommendation response structures
- explanation payload structures
- confidence band model
- rationale fragment model
- degraded explanation behavior notes

### Receiving agent responsibilities
- expose recommendation/explanation payloads through API endpoints cleanly
- preserve response consistency and error behavior

---

## 4.10 Ranking & Explanation Agent → Angular Frontend Agent

### Handover artifacts
- recommendation payload shape
- explanation payload shape
- confidence display rules
- refinement/follow-up suggestions shape

### Receiving agent responsibilities
- render recommendation and explanation flows correctly
- map confidence and refinement cues to UI in a user-friendly way

---

## 4.11 Angular Material UX Agent → Angular Frontend Agent

### Handover artifacts
- reusable page shell components
- table/form/dialog wrappers
- theme/layout primitives
- accessibility conventions
- loading/empty/error components

### Receiving agent responsibilities
- compose features using shared UI abstractions
- avoid reinventing local UI patterns in each feature

---

## 4.12 Angular Frontend Agent → Angular Material UX Agent

### Handover artifacts
- repeated UI composition pain points
- missing reusable UI primitives
- feature-specific layout constraints
- accessibility gaps discovered during implementation

### Receiving agent responsibilities
- upgrade or create shared UI wrappers
- refine accessibility and consistency patterns

---

## 4.13 Platform, Quality, and DevOps Agent → All implementation agents

### Handover artifacts
- CI constraints
- lint/test/build requirements
- observability conventions
- health check/rate limiting guidance
- environment/config conventions

### Receiving agent responsibilities
- keep new work compatible with build/test/deploy requirements
- surface operational implications of design decisions

---

## 4.14 All implementation agents → Solution Architect Agent

### Handover artifacts
- architecture mismatch notes
- proposed boundary changes
- cross-cutting dependency requests
- risk notes

### Receiving agent responsibilities
- accept, reject, or refine changes to preserve design coherence

---

## 5. Recommended Phase-by-Phase Handover Flow

## Phase 1 — Foundation

### Handover sequence
1. Solution Architect Agent → all
2. Product Contract Agent → .NET API Agent / Angular Frontend Agent / Ranking & Explanation Agent

### Goal
Create stable boundaries and buildable feature contracts.

---

## Phase 2 — Core implementation

### Handover sequence
1. Domain & Provider Integration Agent → .NET API Agent
2. .NET API Agent → Angular Frontend Agent
3. Angular Material UX Agent → Angular Frontend Agent

### Goal
Establish stable vertical slices from API to UI.

---

## Phase 3 — Recommendation intelligence

### Handover sequence
1. Domain & Provider Integration Agent → Ranking & Explanation Agent
2. Ranking & Explanation Agent → .NET API Agent
3. .NET API Agent → Angular Frontend Agent

### Goal
Expose recommendation and explanation capabilities through the end-to-end stack.

---

## Phase 4 — Hardening

### Handover sequence
1. Platform, Quality, and DevOps Agent → all
2. all agents → Solution Architect Agent for final cross-cutting review

### Goal
Make the system operationally safe, testable, and deployable.

---

## 6. Handover Acceptance Checklist

The receiving agent should verify the following before starting work from a handoff:

1. Is the artifact specific enough to implement against?
2. Does it conflict with architecture or existing contracts?
3. Does it redefine another agent’s ownership boundary?
4. Does it include enough detail about errors, edge cases, and degraded behavior?
5. If incomplete, can the gap be resolved locally, or must it be escalated?

If the answer to #2 or #3 is yes, escalate to the **Solution Architect Agent**.
If the answer to #1 or #4 is no, escalate to the **Product Contract Agent** or the original handoff owner.

---

## 7. Minimal Handover Payload Template

Every handoff should include a compact note using this structure:

```text
From Agent:
To Agent:
Feature/Concern:
Artifacts Included:
Files/Folders Affected:
Known Constraints:
Open Questions:
Definition of Ready for Receiver:
```

This keeps GitHub Copilot handoffs disciplined and machine-friendly.

---

## 8. High-Risk Handoffs to Watch Closely

These are the handoffs most likely to create rework if handled poorly:

### Product Contract Agent → .NET API Agent
Risk: vague DTOs, missing validation rules, unstable endpoint semantics

### .NET API Agent → Angular Frontend Agent
Risk: contract drift, weak error handling assumptions, auth mismatch

### Domain & Provider Integration Agent → Ranking & Explanation Agent
Risk: provider-specific leakage into ranking logic

### Ranking & Explanation Agent → Angular Frontend Agent
Risk: UI assumptions about confidence, degraded mode, or explanation availability

### Any agent → Solution Architect Agent
Risk: boundary changes introduced too late

---

## 9. Executive Summary

A GitHub Copilot multi-agent build only works well if handoffs are explicit.

The key rules are:
- hand off artifacts, not vague summaries
- do not silently reinterpret another agent’s ownership
- escalate cross-cutting changes through the Solution Architect Agent
- and treat frontend-backend contract handoffs as especially sensitive

If these handoff rules are followed, the 8-agent setup becomes practical, predictable, and much easier to scale across a real build workflow.
