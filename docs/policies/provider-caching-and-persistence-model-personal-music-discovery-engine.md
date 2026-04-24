# Provider Caching & Persistence Model — Personal Music Discovery Engine

## 1. Document Purpose

This document defines the **provider caching and persistence model** for the Personal Music Discovery Engine.

It specifies:

- what data should be cached,
- what data should be persisted,
- the boundaries between ephemeral cache and durable storage,
- cache keys,
- expiration strategies,
- invalidation rules,
- and how caching supports resilience against rate limits, latency, and provider variability.

This document is intended to sit alongside:

- high-level requirements,
- stage-by-stage data contracts,
- logical component architecture,
- and query execution sequence diagrams.

---

## 2. Architectural Context

The current architecture assumes:

1. **Gemini 2.5 Pro** is used via the **Gemini Developer API free tier** for:
   - intent interpretation,
   - structured intent generation,
   - explanation generation,
   - and optionally limited AI-assisted summarization.

2. **External music evidence retrieval** is performed through dedicated provider adapters for:
   - MusicBrainz,
   - Last.fm,
   - Discogs.

3. **Local collection grounding** is performed against a **Clementine-backed local inventory**.

Because the system depends on multiple remote services with differing rate limits, availability profiles, and response characteristics, caching is not optional. It is a first-class architectural concern.

---

## 3. Why Caching Is Required

### 3.1 Gemini Free-Tier Constraints

The Gemini Developer API free tier is useful for prototyping, but it has architectural implications:

- model availability differs between free and paid routes,
- limits are applied **per project**, not per API key,
- active limits may vary over time,
- and free-tier content may be used to improve Google products.

This means repeated unnecessary calls to Gemini should be avoided wherever possible.

### 3.2 External Provider Constraints

The retrieval layer depends on providers such as MusicBrainz, Last.fm, and Discogs, each of which can:

- rate-limit requests,
- return partial or inconsistent data,
- vary in latency,
- or occasionally be unavailable.

Caching reduces provider churn and improves recommendation responsiveness.

### 3.3 End-User Experience Constraints

For a chat-like recommendation system, the user experience should feel:

- responsive,
- stable,
- and repeatable.

Without caching, repeated requests for related prompts may cause:

- inconsistent world graphs,
- slower responses,
- unnecessary API exposure,
- and avoidable quota pressure.

---

## 4. Design Principles

### 4.1 Cache by Stage Boundary

Caching should align with stage outputs already defined in the data contracts.

This means the main cacheable artifacts are:

1. Intent Profile
2. External Evidence Packet
3. World Candidate Graph
4. Local Inventory Snapshot
5. Recommendation Set
6. Explanation Payload

### 4.2 Differentiate Cache from Persistence

Not everything cached should be durably persisted forever.

This architecture distinguishes between:

- **ephemeral cache**: optimized for latency and quota protection,
- **durable persistence**: optimized for auditability, reproducibility, and long-lived reuse.

### 4.3 Preserve Provenance

Every cached object must preserve enough metadata to answer:

- where it came from,
- when it was produced,
- what inputs produced it,
- whether it was partial,
- and whether it is still considered fresh.

### 4.4 Cache Only Stable Enough Outputs

Some outputs are highly stable and should be cached aggressively.
Others are more session-specific and should be cached carefully.

### 4.5 Support Graceful Degradation

Caches must support fallback behavior when:

- Gemini is temporarily unavailable,
- one or more providers fail,
- or rate limits are reached.

---

## 5. Cache Domains

## 5.1 Intent Cache

### Object cached
**Intent Profile**

### Why cache it
Interpretation prompts such as:
- “quiet music inspired by Baudelaire”
- “something nocturnal and modernist”

are often repeated, rephrased, or refined in the same session.

### Scope
- session-aware
- optionally cross-session if normalized prompt similarity is high

### Cache key inputs
- normalized prompt text
- requested result type
- major session constraints
- interpretation model version
- interpretation prompt template version

### TTL recommendation
- **short to medium**
- e.g. 24 hours for cross-session reuse
- longer in durable store if desired for analytics

### Invalidation triggers
- prompt-template change
- model route change
- major interpretation policy change

---

## 5.2 Gemini Explanation Cache

### Object cached
**Explanation Payload**

### Why cache it
The same ranked recommendation set may be displayed multiple times:
- after UI refresh,
- after repeat request,
- after small follow-up interactions that do not change ranking.

### Scope
- strongly tied to recommendation set ID

### Cache key inputs
- recommendation set ID
- explanation policy version
- tone/style version
- explanation model version

### TTL recommendation
- **short to medium**
- e.g. 24–72 hours

### Invalidation triggers
- recommendation set changed
- explanation style policy changed
- explanation model changed

---

## 5.3 Provider Evidence Cache

### Object cached
**External Evidence Packet** per provider and query variant

### Why cache it
This is one of the most important cache layers because provider requests are:
- externally rate-limited,
- operationally variable,
- and often semantically repetitive across related prompts.

### Scope
- cross-session
- reusable across requests when normalized retrieval intent is similar

### Cache key inputs
- provider name
- normalized retrieval query / query variant
- adapter version
- provider response-normalization version

### TTL recommendation
Different providers should have different TTLs:

#### MusicBrainz
- **longer TTL**
- canonical metadata is relatively stable
- suggested TTL: 7–30 days

#### Last.fm
- **medium TTL**
- tags/similarity can be treated as semi-stable
- suggested TTL: 1–7 days

#### Discogs
- **medium to long TTL**
- release/style metadata is relatively stable
- suggested TTL: 7–30 days

### Invalidation triggers
- provider schema normalization changes
- adapter changes
- explicit manual invalidation for troubleshooting
- provider-specific data refresh policy

---

## 5.4 World Candidate Graph Cache

### Object cached
**World Candidate Graph**

### Why cache it
The graph is a synthesis of multiple provider packets and can be expensive to rebuild repeatedly.

### Scope
- cross-session
- especially valuable for recurring aesthetic queries

### Cache key inputs
- intent profile fingerprint
- set of contributing evidence packet IDs
- graph-builder version
- canonicalization rules version

### TTL recommendation
- **medium**
- e.g. 1–7 days

### Invalidation triggers
- any contributing packet invalidated
- graph-building logic changes
- canonicalization logic changes

---

## 5.5 Local Inventory Snapshot Cache

### Object cached
**Local Inventory Snapshot**

### Why cache it
Repeatedly reading and normalizing the local collection can be avoided when the library has not changed.

### Scope
- local-machine only
- cross-session

### Cache key inputs
- library source ID
- collection version / scan timestamp if available
- local adapter version
- inventory projection version

### TTL recommendation
- **short to medium**, but freshness should be event-driven rather than TTL-only
- suggested fallback TTL: 15 minutes to 24 hours depending on update frequency

### Preferred invalidation strategy
- invalidate when Clementine library scan timestamp changes
- invalidate when local DB file modified time changes
- invalidate when user forces refresh

---

## 5.6 Grounded Candidate Cache

### Object cached
**Grounded Local Candidate Set**

### Why cache it
Grounding exact/fuzzy/semantic matches can be expensive if repeated across the same world graph and same inventory snapshot.

### Scope
- cross-session when both world graph and inventory snapshot match

### Cache key inputs
- world graph ID
- inventory snapshot ID
- grounding engine version
- matching policy version

### TTL recommendation
- tied to lifetime of world graph and inventory snapshot validity

### Invalidation triggers
- world graph invalidated
- local inventory snapshot invalidated
- grounding logic changed

---

## 5.7 Recommendation Cache

### Object cached
**Recommendation Set**

### Why cache it
Useful when:
- same request is repeated,
- same session constraints still apply,
- same ranking policy still applies.

### Scope
- session and cross-session

### Cache key inputs
- grounded local candidate set ID
- intent profile ID
- ranking policy version
- session modifier fingerprint

### TTL recommendation
- **short to medium**
- often 1–24 hours depending on personalization sensitivity

### Invalidation triggers
- ranking policy changes
- session modifiers change materially
- local inventory changes

---

## 5.8 Feedback-Influenced Session Cache

### Object cached
Session preference state derived from feedback

### Why cache it
Needed for conversational refinement.

### Scope
- session only by default

### Cache key inputs
- session ID
- latest feedback event ID

### TTL recommendation
- session lifetime

### Invalidation triggers
- session end
- user resets context

---

## 6. Persistence Model

## 6.1 Persistence Categories

The system should distinguish three persistence categories:

### A. Ephemeral in-memory cache
Used for:
- current request execution,
- high-speed stage reuse within one request or session,
- short-lived provider or Gemini responses.

### B. Durable local cache store
Used for:
- provider evidence packets,
- world graphs,
- inventory snapshots,
- interpretation results,
- recommendation sets,
- explanation payloads.

This store should survive process restarts.

### C. Audit / trace store
Used for:
- request traces,
- stage metadata,
- cache provenance,
- failure diagnostics,
- benchmarking and evaluation data.

This store should not necessarily hold full raw payloads forever, but it should preserve stage references and major metadata.

---

## 6.2 Recommended Storage Split

### In-memory cache
Best for:
- hot request path,
- deduplicating repeated work inside a live session,
- avoiding repeated identical Gemini calls during one interaction loop.

### Local durable store
Best for:
- provider evidence packet storage,
- world graph persistence,
- reusable intent and explanation payloads,
- inventory snapshots keyed to local-library version.

### Trace/audit store
Best for:
- request-level logs,
- stage-level timings,
- confidence drift analysis,
- failure replay references.

---

## 7. Cache Keying Strategy

## 7.1 General Rules

Every cache entry should include:

- cache key
- object type
- object ID
- created timestamp
- expires timestamp or freshness policy
- source fingerprint
- producer version
- partial/full flag
- provenance metadata

### 7.2 Fingerprinting Guidance

To prevent fragile cache hits, use normalized fingerprints rather than raw strings alone.

Recommended normalized dimensions include:
- prompt normalization
- descriptor-set normalization
- provider query normalization
- session constraint fingerprint
- model version / policy version

---

## 8. Freshness and TTL Policy Summary

## 8.1 Recommended TTL bands

### Very short-lived (seconds to minutes)
- in-flight request-local objects
- partial provider results
- temporary explanation drafts

### Short-lived (minutes to hours)
- recommendation sets
- explanation payloads
- session interpretation variants

### Medium-lived (hours to days)
- world candidate graphs
- Last.fm evidence packets
- intent profiles for common prompts

### Long-lived (days to weeks)
- MusicBrainz evidence packets
- Discogs evidence packets
- normalized artist identity maps

### Event-driven freshness
- local inventory snapshots
- anything tied to local-library scan/update state

---

## 9. Invalidation Model

## 9.1 Passive expiration

Most remote evidence should expire naturally via TTL.

## 9.2 Version-driven invalidation

Any change to these should invalidate dependent caches:
- Gemini prompt template version
- explanation policy version
- provider adapter version
- graph-builder version
- grounding engine version
- ranking policy version

## 9.3 Event-driven invalidation

Used for:
- local library updates,
- explicit user refresh,
- provider adapter deployments,
- troubleshooting / forced refresh actions.

## 9.4 Dependency invalidation chain

Invalidate in this order when needed:

1. provider evidence packet
2. world candidate graph
3. grounded candidate set
4. recommendation set
5. explanation payload

This preserves consistency across downstream artifacts.

---

## 10. Graceful Degradation Rules Supported by Cache

## 10.1 Gemini unavailable or rate-limited

If Gemini cannot be called:
- reuse cached intent profile if available,
- otherwise degrade to simpler rule-based or fallback interpretation if supported,
- reuse cached explanation payload if recommendation set already exists,
- otherwise return recommendations with thinner explanation.

## 10.2 One provider unavailable

If one external provider fails:
- use cached evidence packet if available,
- otherwise continue with remaining providers,
- lower confidence appropriately,
- preserve partial provenance.

## 10.3 Local inventory temporarily unavailable

If local inventory cannot be refreshed:
- use cached inventory snapshot only if freshness policy allows,
- otherwise fail recommendation generation because local scope cannot be guaranteed.

---

## 11. Security and Privacy Considerations

## 11.1 Gemini-specific privacy caution

Because free-tier Gemini content may be used to improve Google products, the caching model should support minimizing repeated raw data submission.

### Practical implications
- cache intent profiles aggressively enough to reduce duplicate Gemini interpretation calls
- cache explanation payloads when recommendation sets are unchanged
- avoid sending raw local inventory details to Gemini unless strictly necessary

## 11.2 Local cache safety

The durable cache store should:
- remain local to the user's environment by default,
- avoid unnecessary storage of raw prompts if privacy policy requires minimization,
- keep provider credentials outside cached payloads,
- and separate secrets/configuration from cached artifacts.

---

## 12. Minimum V1 Caching Scope

For V1, the system should implement caching for at least:

1. Intent Profile
2. External Evidence Packet
3. World Candidate Graph
4. Local Inventory Snapshot
5. Recommendation Set
6. Explanation Payload

### V1 persistence recommendation
- in-memory cache for hot path
- one local durable store for reusable artifacts
- one trace/audit log for request and stage metadata

This is enough to protect:
- Gemini free-tier usage,
- external provider limits,
- and responsiveness for repeat queries.

---

## 13. Suggested Next Design Artifacts

After this caching and persistence model, the most useful next artifacts are:

1. ranking policy document
2. explanation policy document
3. provider failure / graceful degradation sequence diagram
4. cache key schema appendix
5. observability event taxonomy

---

## 14. Executive Summary

The Provider Caching & Persistence Model exists to make the Personal Music Discovery Engine operationally viable.

The architecture depends on:
- Gemini 2.5 Pro on the free tier,
- multiple external provider adapters,
- and a Clementine-backed local collection.

That combination makes caching essential.

The cache strategy should therefore:
- align with stage outputs,
- distinguish ephemeral cache from durable persistence,
- preserve provenance,
- support version-based invalidation,
- and enable graceful degradation under rate limits or partial failures.

In practical terms, the most important cache domains are:
- intent profiles,
- provider evidence packets,
- world candidate graphs,
- local inventory snapshots,
- recommendation sets,
- and explanation payloads.

This model is the architectural bridge between a clean design on paper and a responsive system that can survive real-world provider limits and free-tier constraints.
