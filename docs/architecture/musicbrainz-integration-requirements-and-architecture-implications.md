# MusicBrainz Integration Requirements & Architectural Implications

## 1. Purpose

This document defines the **requirements** and **architectural implications** for integrating **MusicBrainz** into the Personal Music Discovery Web App.

It is intended to be used by **GitHub Copilot** as a project guidance artifact when implementing any MusicBrainz-related functionality.

This document assumes the current application architecture:

- **Frontend:** Angular + Angular Material SPA
- **Backend:** ASP.NET Core Web API
- **Current delivery model:** phased vertical slices
- **MusicBrainz usage phase:** Phase 2 (web suggestions and music metadata enrichment)

---

## 2. Integration Summary

MusicBrainz is a **public music metadata web service** intended for applications such as media players, taggers, and other systems that need structured music metadata.

For this project, MusicBrainz should be treated as:

- a **read-only external metadata provider**
- used for **artist / release / recording / release-group lookup and search**
- accessed only from the **backend**
- protected by **strict throttling** and **meaningful client identification**

---

## 3. External Service Rules That Must Be Respected

## 3.1 No API key is required

MusicBrainz does **not currently require an API key** for standard public API usage.

### Implication
The application does **not** need:
- a MusicBrainz signup flow
- API key storage
- secret rotation for MusicBrainz

---

## 3.2 A meaningful User-Agent is required

MusicBrainz explicitly requires clients to send a **meaningful User-Agent string**.

### Requirement
Every request sent by this application to MusicBrainz must include a User-Agent that identifies:
- application name
- application version
- contact information

### Recommended format
```text
RECO-CIF-AI/<version> (<contact-email-or-project-url>)
```

### Implication
The User-Agent must be:
- centrally configured
- not hardcoded ad hoc in scattered request code
- owned by the backend integration layer

---

## 3.3 Rate limit must be respected

MusicBrainz rate limits requests and currently enforces a practical **1 request per second per source IP address** unless a different agreement exists.

### Requirement
The backend must enforce MusicBrainz request throttling so the app does not exceed:
- **1 request per second on average**

### Implication
The application must **not** rely on frontend discipline or user behavior to stay within limits.
Throttling must exist in the backend integration layer.

---

## 3.4 Public metadata only for this project scope

For this application, MusicBrainz should be treated as a **public metadata source** only.

### Requirement
Use MusicBrainz only for:
- public search
- public lookup
- metadata enrichment
- identifier normalization support

### Out of scope
Do not implement:
- edit submission
- authenticated write operations
- user collection operations
- account-based MusicBrainz features

unless those are explicitly introduced in a future phase.

---

## 4. Functional Requirements for This App

## 4.1 Role of MusicBrainz in the recommendation flow

MusicBrainz should support the app by providing:
- canonical music metadata
- structured entity lookup
- search support for artists, releases, release groups, and recordings
- metadata normalization support for later downstream matching

### Requirement
MusicBrainz should help the app answer questions like:
- which canonical artist/release entities correspond to a music idea?
- what releases or recordings are associated with a known artist?
- how should ambiguous names be normalized before later filtering or ranking?

---

## 4.2 MusicBrainz is not the only provider

MusicBrainz should be integrated as **one provider among several**, not as the sole recommendation engine.

### Requirement
The integration must fit a provider-based architecture where:
- MusicBrainz contributes structured metadata
- other providers may contribute tags, style signals, or community discovery signals
- the app can continue to function if MusicBrainz is temporarily degraded

---

## 4.3 MusicBrainz results must be normalized

Raw MusicBrainz payloads must not be passed directly to the frontend or deeper layers unchanged.

### Requirement
Normalize MusicBrainz results into internal models such as:
- artist candidate
- release candidate
- recording candidate
- release-group candidate
- external evidence packet

### Implication
Frontend DTOs and recommendation-layer models must not depend directly on MusicBrainz response shape.

---

## 4.4 MusicBrainz should support later Clementine matching

MusicBrainz should help build a cleaner bridge between web-discovered entities and the local Clementine library.

### Requirement
Where possible, use MusicBrainz metadata to improve:
- canonical artist naming
- release normalization
- recording-level matching preparation
- duplicate and alias handling support

### Implication
MusicBrainz integration should be designed with **Phase 3 local grounding** in mind, not as a throwaway Phase 2 prototype.

---

## 5. Non-Functional Requirements

## 5.1 Backend-only access

### Requirement
The Angular frontend must **not call MusicBrainz directly**.

### Reason
Backend-only access is required to:
- enforce rate limiting
- centralize User-Agent handling
- shield the frontend from provider-specific details
- simplify retries and graceful degradation
- preserve a stable application contract

---

## 5.2 Centralized configuration

### Requirement
MusicBrainz integration settings must be configured centrally.

### Configuration items
- base URL
- User-Agent application name
- User-Agent application version
- User-Agent contact string
- throttle settings
- timeout settings
- retry policy settings (if any)

### Implication
No MusicBrainz request code should define these values inline in multiple places.

---

## 5.3 Graceful degradation

### Requirement
If MusicBrainz fails, times out, or is throttled, the app must degrade gracefully.

### Acceptable degraded behavior
- continue with other providers if available
- return reduced-confidence web suggestions if architecture supports that
- return partial provider evidence
- log the failure clearly
- avoid crashing the whole request unnecessarily

### Unacceptable behavior
- silent failure
- hanging requests with no user-visible outcome
- pretending MusicBrainz data was retrieved when it was not

---

## 5.4 Observability

### Requirement
The application must log and trace MusicBrainz interactions sufficiently to diagnose:
- throttling problems
- timeout patterns
- repeated failed queries
- malformed request generation
- provider quality issues

### Minimum telemetry
- request correlation ID
- provider name = MusicBrainz
- query type
- request duration
- success / failure outcome
- rate-limit or 503 detection

---

## 5.5 Testability

### Requirement
MusicBrainz integration must be testable without hitting the live service in every automated test.

### Implication
The backend must use:
- adapter interfaces
- mockable HTTP boundary
- testable normalization logic
- provider contract tests where practical

---

## 6. Architectural Implications

## 6.1 MusicBrainz requires a dedicated provider adapter

### Requirement
Create a dedicated **MusicBrainz Adapter** in the backend provider integration layer.

### Responsibilities of the adapter
- build MusicBrainz requests
- attach the correct User-Agent
- enforce or respect throttling rules
- deserialize responses
- normalize responses into internal models
- surface provider-specific failure information cleanly

### Anti-pattern to avoid
Do not call MusicBrainz directly from:
- controllers
- Angular code
- ranking logic
- explanation logic

---

## 6.2 MusicBrainz must sit behind a retrieval orchestration layer

### Requirement
The MusicBrainz Adapter should be used by a higher-level **retrieval orchestration service**, not directly by every endpoint.

### Implication
The orchestration layer should be responsible for:
- deciding when to call MusicBrainz
- combining MusicBrainz with other providers
- handling partial provider success/failure
- building normalized external evidence sets

---

## 6.3 Throttling must be application-enforced

### Requirement
Implement request throttling in the backend integration layer.

### Preferred pattern
Use one of:
- a provider-specific request scheduler
- a dedicated throttled HTTP wrapper
- a provider policy service

### Anti-pattern to avoid
Do not assume that:
- low user traffic alone will keep the app compliant
- frontend debounce is sufficient
- retries can happen freely

---

## 6.4 Caching is required

### Requirement
MusicBrainz results should be cached where appropriate.

### Reason
Caching reduces:
- repeated calls for common artists/releases
- rate-limit pressure
- latency
- repeated normalization work

### Recommended cache candidates
- artist lookup results
- release lookup results
- search results for repeated queries
- canonical identity mappings

### Implication
The MusicBrainz adapter must work with the broader caching/persistence model rather than bypassing it.

---

## 6.5 Internal response model must remain provider-agnostic

### Requirement
Downstream layers must consume a provider-agnostic model.

### Implication
Do not expose raw MusicBrainz fields such as exact API payload structure directly to:
- recommendation response DTOs
- Angular suggestion cards
- ranking engine inputs
- explanation text generation inputs

Instead, map to application-owned internal types.

---

## 6.6 MusicBrainz should improve canonical identity resolution

### Requirement
Use MusicBrainz primarily as a **metadata normalization and canonical identity provider**.

### Implication
In this architecture, MusicBrainz is especially valuable for:
- resolving artist naming ambiguity
- structuring releases / release groups / recordings
- preparing cleaner input for later local-library matching

This means its greatest long-term value is not merely “getting suggestions,” but **making downstream matching and ranking cleaner**.

---

## 7. Suggested Phase Usage

## Phase 2
Use MusicBrainz for:
- initial web suggestions support
- canonical artist/release lookup
- basic metadata enrichment

## Phase 3
Use MusicBrainz-derived normalization to support:
- Clementine local matching
- exact vs approximate match improvement
- duplicate reduction
- canonical naming alignment

---

## 8. Suggested Backend Design Shape

```text
ASP.NET Core API
  ↓
Retrieval Orchestrator
  ↓
MusicBrainz Adapter
  ↓
Throttled HTTP Client + Cache
  ↓
MusicBrainz Web Service
```

### Supporting services
- configuration provider
- telemetry/logging
- cache provider
- normalization mapper
- graceful degradation policy

---

## 9. Required Implementation Constraints for GitHub Copilot

GitHub Copilot should follow these constraints when generating MusicBrainz-related code.

## 9.1 Must do
- create a dedicated MusicBrainz adapter abstraction
- attach a meaningful User-Agent centrally
- enforce or respect 1 req/sec rate limiting behavior
- keep MusicBrainz calls on the backend only
- normalize provider results into internal models
- make the integration testable and mockable
- integrate with the broader caching and graceful degradation patterns

## 9.2 Must not do
- call MusicBrainz from Angular directly
- scatter MusicBrainz HTTP calls across multiple backend layers
- hardcode request metadata in many places
- expose raw MusicBrainz response shapes directly to the frontend
- ignore rate limiting because the app is “small”
- assume MusicBrainz is always available

---

## 10. Suggested Backlog Implications

The implementation backlog should include MusicBrainz-oriented items such as:

- create MusicBrainz adapter interface
- configure User-Agent and provider settings
- implement throttled HTTP client behavior
- implement MusicBrainz search/lookup normalization
- add cache integration for MusicBrainz results
- add provider failure handling and telemetry
- add tests for normalization and failure behavior

---

## 11. Definition of Done for MusicBrainz Integration

MusicBrainz integration is considered implementation-ready when:

1. the backend can query MusicBrainz with a valid User-Agent,
2. requests are throttled safely,
3. results are normalized into internal models,
4. provider failures degrade safely,
5. repeated requests can benefit from caching,
6. no frontend code depends directly on MusicBrainz response format,
7. and the integration improves later Phase 3 local matching rather than fighting it.

---

## 12. Executive Summary

For this project, MusicBrainz is a **public, no-signup, no-API-key metadata provider**, but it comes with two important technical obligations:

1. send a **meaningful User-Agent**
2. respect the effective **1 request per second** limit

Architecturally, that means MusicBrainz must be implemented as a **backend-only, throttled, cached, normalized provider adapter**.

If GitHub Copilot follows that rule, MusicBrainz becomes a clean metadata-normalization asset for both:
- **Phase 2 web suggestions**
- and **Phase 3 Clementine local matching**

If GitHub Copilot ignores that rule, the project will accumulate fragile provider coupling, rate-limit problems, and messy downstream matching behavior.
