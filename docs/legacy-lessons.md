# Legacy lessons

Righteo is not a migration of any earlier system. This document records the
useful behavioural lessons from two prior local tools so agents do not need to
rediscover them.

The prior systems are private and are not named or linked here. One was a
transcript ingestion and recap daemon; the other was a chat-driven agent
orchestrator. The lessons stand on their own without the sources.

## Retain from the ingestion daemon

- Incremental transcript parsing rather than rescanning everything as new.
- Content hashes, stable identifiers and idempotent imports.
- Project attribution using working directory and Git identity.
- Source-specific noise filtering.
- Local recaps that reduce raw transcript volume before central synthesis.
- Explicit handling of stray or unattributed work.
- Manual correction paths for project attribution.
- Local operation even when sync or networking fails.

## Reject from the ingestion daemon

- Distributed-machine assumptions in the first release.
- Tailscale or remote DNS as a requirement for local usefulness.
- A broad hierarchy of active time, goals, focus, alignment and tasks.
- Turning observed activity into a complete project-management model.
- Interfaces dominated by status administration.
- Sync complexity before the personal daily loop is proven.

## Security lesson

The old summarisation process invoked a CLI model with bypassed permissions in
a writable working directory. Unrelated files accumulated in that workspace.

Righteo reconciliation must instead:

- receive bounded, serialised input;
- run without shell, filesystem or tool permissions;
- return validated structured output;
- keep prompts and schema versions attributable;
- store enough provenance to explain and reprocess the result.

## Retain from the agent orchestrator

- Clear project-local instructions shared between agents.
- Explicit plans and decisions for architectural work.
- Verification before declaring implementation complete.
- Secret-handling discipline.

## Reject from the agent orchestrator

- Slack as the primary user interface.
- A central agent persona that routes work to project bots.
- Submodules and one bot configuration per project.
- Autonomous agent execution as the product's purpose.
- Scheduled jobs and message routing before the working-memory experience.

## Summary

The old systems tried to coordinate the work. Righteo should understand enough
of the work to help the user decide where their attention belongs.

