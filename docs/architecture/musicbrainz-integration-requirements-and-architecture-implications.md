# MusicBrainz Integration — Archived

> **This document is archived and no longer reflects the current architecture.**

## Why this was removed

MusicBrainz was originally planned as a provider for canonical track identity resolution to support local library matching.

This plan was superseded in Phase 3 for the following reason:

Local music files do not carry MusicBrainz IDs in their tags. A MusicBrainz lookup would return a canonical ID for a given track name, but matching that ID against a local file would still require a string comparison against the file's tag data — the same operation that a direct fuzzy match already performs. The provider step added latency and an external API dependency without improving match quality.

Phase 3 instead uses **normalised fuzzy string matching** directly against the Clementine library (artist + title, album as tiebreaker, configurable similarity threshold). This is simpler, faster, offline, and produces equivalent or better results given the actual tag data available.

## Current architecture

See:

- `logical-component-architecture-personal-music-discovery-engine.md`
- `query-execution-sequence-diagram-personal-music-discovery-engine.md`
- `clementine-remote-integration-architecture.md`
