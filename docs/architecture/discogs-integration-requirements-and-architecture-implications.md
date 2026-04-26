# Discogs Integration — Archived

> **This document is archived and no longer reflects the current architecture.**

## Why this was removed

Discogs was originally planned as a provider for release metadata enrichment and cover art, complementing MusicBrainz and Last.fm for track identity resolution.

This plan was superseded for the same reason as MusicBrainz: local music files do not carry Discogs release IDs, so a Discogs lookup provides no identifier that can be matched against local tags. The integration would add an external API dependency, rate-limit exposure, and a required `DISCOGS_USER_TOKEN` secret without delivering better local matching than fuzzy string comparison already provides.

No Discogs integration exists in the current codebase. The `DISCOGS_USER_TOKEN` environment variable is not required.

## Current architecture

See:

- `logical-component-architecture-personal-music-discovery-engine.md`
- `query-execution-sequence-diagram-personal-music-discovery-engine.md`
- `clementine-remote-integration-architecture.md`
