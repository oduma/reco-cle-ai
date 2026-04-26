# Documentation Index

This folder contains the project documentation for the **Personal Music Discovery Web App**.

The docs are intentionally split by purpose so both humans and GitHub Copilot can navigate them clearly.

## Recommended Reading Order

If you are new to the repository, read in this order:

1. `../README.md`
2. `plans/phased-development-and-test-plan-personal-music-discovery-web-app.md`
3. `plans/implementation-backlog-personal-music-discovery-web-app.md`
4. `architecture/angular-material-dotnet-api-architecture-best-practices.md`
5. `architecture/logical-component-architecture-personal-music-discovery-engine.md`
6. `architecture/secrets-and-environment-variable-strategy-third-party-providers.md`
7. `contracts/stage-by-stage-data-contracts-personal-music-discovery-engine.md`
8. `policies/ranking-policy-personal-music-discovery-engine.md`
9. `policies/explanation-policy-personal-music-discovery-engine.md`
10. `policies/provider-caching-and-persistence-model-personal-music-discovery-engine.md`
11. `architecture/clementine-remote-integration-architecture.md`
12. `governance/agent-handover-matrix-personal-music-discovery-engine.md`

## Folder Purpose

### `plans/`
Execution-facing documents.

Use these to understand:
- delivery phases
- backlog sequencing
- implementation order
- how the app remains testable while being built

Expected documents:
- phased development and test plan
- implementation backlog
- Copilot agent plan

### `architecture/`
Structural and runtime design documents.

Use these to understand:
- Angular + .NET architectural approach
- logical components and responsibilities
- normal execution flow
- degraded/failure behavior
- provider-specific integration requirements and constraints
- secrets and environment variable strategy

Expected documents:
- Angular + .NET architecture best practices
- logical component architecture
- query execution sequence diagram
- provider failure / graceful degradation sequence diagram
- Clementine Remote integration architecture
- secrets and environment variable strategy

### `contracts/`
Data-flow and interface-oriented design docs.

Use these to understand:
- what each major stage produces and consumes
- how backend services exchange structured data

Expected documents:
- stage-by-stage data contracts

### `policies/`
Behavioral rule documents.

Use these to understand:
- ranking behavior
- explanation behavior
- caching and persistence behavior

Expected documents:
- ranking policy
- explanation policy
- provider caching & persistence model

### `governance/`
Docs that define how work is coordinated.

Use these to understand:
- multi-agent collaboration rules
- handoff expectations
- execution governance

Expected documents:
- agent handover matrix

## Authoritative Documents by Concern

### Product delivery
- `plans/phased-development-and-test-plan-personal-music-discovery-web-app.md`
- `plans/implementation-backlog-personal-music-discovery-web-app.md`

### Frontend / backend architectural conventions
- `architecture/angular-material-dotnet-api-architecture-best-practices.md`

### Core system shape
- `architecture/logical-component-architecture-personal-music-discovery-engine.md`

### Runtime behavior
- `architecture/query-execution-sequence-diagram-personal-music-discovery-engine.md`
- `architecture/provider-failure-graceful-degradation-sequence-diagram-personal-music-discovery-engine.md`

### Player integration requirements
- `architecture/clementine-remote-integration-architecture.md`

### Secrets and configuration
- `architecture/secrets-and-environment-variable-strategy-third-party-providers.md`

### Contracts
- `contracts/stage-by-stage-data-contracts-personal-music-discovery-engine.md`

### Recommendation behavior
- `policies/ranking-policy-personal-music-discovery-engine.md`
- `policies/explanation-policy-personal-music-discovery-engine.md`

### Resilience and reuse
- `policies/provider-caching-and-persistence-model-personal-music-discovery-engine.md`

### Agent coordination
- `governance/agent-handover-matrix-personal-music-discovery-engine.md`

## Maintenance Rule
If files are renamed or folders are reorganized, update:
- this file
- `../.github/copilot-instructions.md`
- and the root `../README.md`

That keeps the repository understandable for both humans and Copilot.
