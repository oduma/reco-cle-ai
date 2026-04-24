# RECO-CLE-AI

Personal Music Discovery Web App built as an **Angular + Angular Material SPA** with an **ASP.NET Core Web API** backend.

The application is being developed incrementally so it can be tested continuously as it grows.

## Current Product Direction
The roadmap is intentionally phased:

1. **Phase 1 — Chat-only AI prototype**  
   A web app with a chat window where you can interact with the AI.

2. **Phase 2 — Web suggestions above the chat**  
   The app keeps the chat and adds a structured suggestion list above it.

3. **Phase 3 — Clementine local filtering**  
   Web suggestions are filtered or grounded against the local Clementine music library.

## Repository Layout
```text
.github/
  agents/
  instructions/
  copilot-instructions.md

docs/
  plans/
  architecture/
  contracts/
  policies/
  governance/

src/
  client/
  server/

tests/
```

## Documentation Map
See [docs/README.md](docs/README.md) for the documentation index and recommended reading order.

## Key Documentation
### Planning
- `docs/plans/phased-development-and-test-plan-personal-music-discovery-web-app.md`
- `docs/plans/implementation-backlog-personal-music-discovery-web-app.md`
- `docs/plans/github-copilot-agent-plan-personal-music-discovery-engine.md`

### Architecture and design
- `docs/architecture/angular-material-dotnet-api-architecture-best-practices.md`
- `docs/architecture/logical-component-architecture-personal-music-discovery-engine.md`
- `docs/architecture/query-execution-sequence-diagram-personal-music-discovery-engine.md`
- `docs/architecture/provider-failure-graceful-degradation-sequence-diagram-personal-music-discovery-engine.md`

### Contracts and policies
- `docs/contracts/stage-by-stage-data-contracts-personal-music-discovery-engine.md`
- `docs/policies/ranking-policy-personal-music-discovery-engine.md`
- `docs/policies/explanation-policy-personal-music-discovery-engine.md`
- `docs/policies/provider-caching-and-persistence-model-personal-music-discovery-engine.md`

### Governance
- `docs/governance/agent-handover-matrix-personal-music-discovery-engine.md`

## Copilot Customization
This repository is intended to work well with GitHub Copilot custom instructions and specialized agents.

### Repository-wide instructions
- `.github/copilot-instructions.md`

### Path-specific instructions
- `.github/instructions/angular.instructions.md`
- `.github/instructions/dotnet.instructions.md`
- `.github/instructions/tests.instructions.md`

### Agents
- `.github/agents/`

## Development Principle
Build in **vertical slices**.

Every phase should produce something that can be:
- run,
- tested manually,
- corrected,
- and stabilized before the next phase begins.

## Notes
If repo structure or document locations change, update both:
- `.github/copilot-instructions.md`
- `docs/README.md`
so humans and Copilot stay aligned.
