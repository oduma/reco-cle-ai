# Discogs Integration Requirements & Architectural Implications

## 1. Purpose

This document defines the **requirements** and **architectural implications** for integrating **Discogs** into the Personal Music Discovery Web App.

It is intended to be used by **GitHub Copilot** as a project guidance artifact when implementing any Discogs-related functionality.

This document assumes the current application architecture:

- **Frontend:** Angular + Angular Material SPA
- **Backend:** ASP.NET Core Web API
- **Current delivery model:** phased vertical slices
- **Discogs usage phase:** Phase 2 (web suggestions and music metadata enrichment)

---

## 2. Integration Summary

Discogs is a **public RESTful music database and marketplace API** that exposes JSON-formatted information about music database objects such as artists, releases, and labels.

For this project, Discogs should be treated as:

- a **read-only external metadata provider**
- used for **artist / release / label / search enrichment**
- accessed only from the **backend**
- protected by **strict throttling** and **meaningful client identification**
- configured to use **authenticated access** for better operational limits

---

## 3. External Service Rules That Must Be Respected

## 3.1 Discogs requires identifiable application behavior

Discogs explicitly requires that applications provide a **User-Agent** string that identifies the application.

### Requirement
Every request sent by this application to Discogs must include a User-Agent that identifies:
- application name
- application version
- contact URL or project URL where practical

### Recommended format
```text
RECO-CIF-AI/<version> +<project-url-or-contact-page>
```

### Implication
The User-Agent must be:
- centrally configured
- not hardcoded ad hoc in scattered request code
- owned by the backend integration layer

---

## 3.2 Discogs supports authenticated and unauthenticated access

Discogs allows API requests without authentication, but authenticated requests receive more generous rate limits than unauthenticated requests.

### Requirement
For this project, Discogs should be used in **authenticated mode** from the backend.

### Reason
Authenticated access is preferred because the official Discogs developer docs state that requests are throttled by source IP to:
- **60 per minute for authenticated requests**
- **25 per minute for unauthenticated requests**

### Implication
The application should not rely on unauthenticated access as its main production integration path.

---

## 3.3 Discogs credentials must be treated as backend-only configuration

Discogs developer usage may involve a token or key/secret, depending on the authentication model selected.

### Requirement
Any Discogs credentials must be stored in backend-only configuration.

### Implication
The Angular frontend must never contain:
- Discogs tokens
- Discogs keys
- Discogs secrets
- direct Discogs authentication logic

---

## 3.4 Discogs API usage is subject to Discogs API terms and application policy

Discogs states that API consumers are subject to the **API Terms of Use** and that applications should follow the **Discogs Application Name and Description Policy**.

### Requirement
The integration must use:
- a real application name
- a real application description where registration/setup requires one
- behavior consistent with Discogs API policy expectations

### Implication
This app must not behave like an anonymous scraper.

---

## 4. Functional Requirements for This App

## 4.1 Role of Discogs in the recommendation flow

Discogs should support the app by providing:
- structured release metadata
- artist metadata
- label information
- search support for releases and artists
- additional metadata enrichment that complements other providers

### Requirement
Discogs should help the app answer questions like:
- which specific releases correspond to a music idea?
- what release-level metadata can enrich a candidate result?
- what additional structure can help distinguish similar artists or releases?

---

## 4.2 Discogs is one provider among several

Discogs must fit a provider-based architecture and must not become the only web music source.

### Requirement
The integration must fit a model where:
- Discogs contributes release- and catalog-oriented metadata
- MusicBrainz contributes canonical metadata and identity normalization
- other providers may contribute discovery, tags, popularity, or community signals
- the app can continue to function if Discogs is temporarily degraded

---

## 4.3 Discogs results must be normalized

Raw Discogs payloads must not be passed directly to the frontend or downstream logic unchanged.

### Requirement
Normalize Discogs results into internal models such as:
- artist candidate
- release candidate
- label candidate
- external evidence packet
- provider metadata enrichment block

### Implication
Frontend DTOs and recommendation-layer models must not depend directly on Discogs response shape.

---

## 4.4 Discogs should improve release-level enrichment

Discogs is especially useful for richer release-oriented metadata and catalog context.

### Requirement
Use Discogs to improve:
- release identification
- edition/release differentiation support
- label context
- release metadata enrichment for later ranking and explanation

### Implication
Discogs should not be treated as a generic search API only; it should be treated as a structured metadata enrichment provider.

---

## 5. Non-Functional Requirements

## 5.1 Backend-only access

### Requirement
The Angular frontend must **not call Discogs directly**.

### Reason
Backend-only access is required to:
- protect credentials
- enforce rate limiting
- centralize User-Agent handling
- normalize provider responses
- simplify retries and graceful degradation
- preserve a stable application contract

---

## 5.2 Centralized configuration

### Requirement
Discogs integration settings must be configured centrally.

### Configuration items
- base URL
- User-Agent application name
- User-Agent application version
- User-Agent contact/project URL
- authentication token or key/secret
- throttle settings
- timeout settings
- retry policy settings (if any)

### Implication
No Discogs request code should define these values inline in multiple places.

---

## 5.3 Graceful degradation

### Requirement
If Discogs fails, times out, or rate-limits the app, the app must degrade gracefully.

### Acceptable degraded behavior
- continue with other providers if available
- return reduced-confidence web suggestions if architecture supports that
- return partial provider evidence
- log the failure clearly
- avoid failing the whole request unnecessarily

### Unacceptable behavior
- silent failure
- hanging requests with no user-visible outcome
- pretending Discogs data was retrieved when it was not

---

## 5.4 Observability

### Requirement
The application must log and trace Discogs interactions sufficiently to diagnose:
- throttling problems
- repeated 429 / limit-related outcomes if surfaced
- timeout patterns
- malformed requests
- provider quality issues

### Minimum telemetry
- request correlation ID
- provider name = Discogs
- query type
- request duration
- success / failure outcome
- authentication mode used
- rate-limit detection where possible

---

## 5.5 Testability

### Requirement
Discogs integration must be testable without hitting the live service in every automated test.

### Implication
The backend must use:
- adapter interfaces
- mockable HTTP boundary
- testable normalization logic
- provider contract tests where practical

---

## 6. Architectural Implications

## 6.1 Discogs requires a dedicated provider adapter

### Requirement
Create a dedicated **Discogs Adapter** in the backend provider integration layer.

### Responsibilities of the adapter
- build Discogs requests
- attach the correct User-Agent
- attach the selected authentication credentials
- enforce or respect throttling rules
- deserialize responses
- normalize responses into internal models
- surface provider-specific failure information cleanly

### Anti-pattern to avoid
Do not call Discogs directly from:
- controllers
- Angular code
- ranking logic
- explanation logic

---

## 6.2 Discogs must sit behind a retrieval orchestration layer

### Requirement
The Discogs Adapter should be used by a higher-level **retrieval orchestration service**, not directly by every endpoint.

### Implication
The orchestration layer should be responsible for:
- deciding when to call Discogs
- combining Discogs with other providers
- handling partial provider success/failure
- building normalized external evidence sets

---

## 6.3 Throttling must be application-enforced

### Requirement
Implement request throttling in the backend integration layer.

### Preferred target
Design for **authenticated Discogs usage**, with a ceiling consistent with the official authenticated rate limit of **60 requests per minute**.

### Preferred pattern
Use one of:
- a provider-specific request scheduler
- a dedicated throttled HTTP wrapper
- a provider policy service

### Anti-pattern to avoid
Do not assume that:
- low traffic will always keep the app compliant
- frontend debounce is sufficient
- retries can happen freely

---

## 6.4 Caching is required

### Requirement
Discogs results should be cached where appropriate.

### Reason
Caching reduces:
- repeated calls for common artists/releases
- rate-limit pressure
- latency
- repeated normalization work

### Recommended cache candidates
- release lookup results
- artist lookup results
- search results for repeated queries
- label lookup results

### Implication
The Discogs adapter must work with the broader caching/persistence model rather than bypassing it.

---

## 6.5 Internal response model must remain provider-agnostic

### Requirement
Downstream layers must consume a provider-agnostic model.

### Implication
Do not expose raw Discogs fields such as exact API payload structure directly to:
- recommendation response DTOs
- Angular suggestion cards
- ranking engine inputs
- explanation text generation inputs

Instead, map to application-owned internal types.

---

## 6.6 Discogs should complement, not replace, MusicBrainz

### Requirement
Discogs should be used to **complement** other providers, especially MusicBrainz.

### Implication
Discogs is particularly valuable for:
- release-oriented enrichment
- catalog context
- label information
- edition-sensitive metadata

MusicBrainz remains more suitable for canonical identity normalization, while Discogs can enrich release-level detail.

This division of responsibilities should remain clear in the architecture.

---

## 7. Suggested Phase Usage

## Phase 2
Use Discogs for:
- release and artist enrichment
- search result enrichment
- supplemental metadata for web suggestions

## Phase 3
Use Discogs-derived metadata to support:
- better release-level matching context
- richer explanation content where supported by normalized evidence
- differentiation between similar release candidates

---

## 8. Suggested Backend Design Shape

```text
ASP.NET Core API
  ↓
Retrieval Orchestrator
  ↓
Discogs Adapter
  ↓
Authenticated & Throttled HTTP Client + Cache
  ↓
Discogs API
```

### Supporting services
- configuration provider
- credentials provider
- telemetry/logging
- cache provider
- normalization mapper
- graceful degradation policy

---

## 9. Required Implementation Constraints for GitHub Copilot

GitHub Copilot should follow these constraints when generating Discogs-related code.

## 9.1 Must do
- create a dedicated Discogs adapter abstraction
- attach a meaningful User-Agent centrally
- keep authentication configuration backend-only
- enforce or respect authenticated rate limiting behavior
- keep Discogs calls on the backend only
- normalize provider results into internal models
- make the integration testable and mockable
- integrate with the broader caching and graceful degradation patterns

## 9.2 Must not do
- call Discogs from Angular directly
- expose tokens, keys, or secrets to the frontend
- scatter Discogs HTTP calls across multiple backend layers
- hardcode request metadata in many places
- expose raw Discogs response shapes directly to the frontend
- ignore rate limiting because the app is “small”
- assume Discogs is always available

---

## 10. Suggested Backlog Implications

The implementation backlog should include Discogs-oriented items such as:

- create Discogs adapter interface
- configure User-Agent and provider settings
- configure Discogs credentials in backend settings
- implement throttled authenticated HTTP client behavior
- implement Discogs search/lookup normalization
- add cache integration for Discogs results
- add provider failure handling and telemetry
- add tests for normalization and failure behavior

---

## 11. Definition of Done for Discogs Integration

Discogs integration is considered implementation-ready when:

1. the backend can query Discogs with a valid User-Agent,
2. authenticated requests are configured and kept on the backend only,
3. requests are throttled safely,
4. results are normalized into internal models,
5. provider failures degrade safely,
6. repeated requests can benefit from caching,
7. no frontend code depends directly on Discogs response format,
8. and Discogs complements the broader provider architecture rather than distorting it.

---

## 12. Executive Summary

For this project, Discogs should be treated as a **backend-only, authenticated, throttled metadata enrichment provider**.

The official Discogs developer docs make three things especially important:

1. send a **meaningful User-Agent**
2. prefer **authenticated access** for the better published rate limit
3. respect the official **60 requests per minute authenticated** ceiling

Architecturally, that means Discogs must be implemented as a **backend-only, credential-protected, throttled, cached, normalized provider adapter**.

If GitHub Copilot follows that rule, Discogs becomes a strong complement to MusicBrainz by enriching release-level metadata and improving provider diversity in **Phase 2** and **Phase 3**.

If GitHub Copilot ignores that rule, the project will accumulate fragile provider coupling, avoidable credential exposure risk, and preventable rate-limit problems.
