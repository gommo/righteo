# Domain model

The domain should remain small. These are semantic concepts, not a commitment
to one database table per heading.

## Project

A stable body of work with a human-readable identity and one or more source
aliases.

Important properties:

- stable ID;
- display name;
- repository remote identities where available;
- collector-scoped local paths;
- archived or active visibility;
- manual identity corrections.

## Project state

The canonical, current interpretation of a project.

```text
Outcome
Now
Next: zero to three actions
Blocked: optional
Active threads: optional
Parking lot: optional
```

A project state is versioned. It records whether each material claim came from
explicit narration, passive evidence or model inference.

## Working set

The small set of projects currently deserving visible attention. Membership is
derived from explicit intent, recent meaningful activity, blockers and revisit
instructions. Recency alone is insufficient.

The working set is not a backlog and does not need to contain every active
project.

## Source record

An immutable record observed by a collector, such as an agent transcript event,
Git commit, repository state or explicit integration event.

It retains source identity, timestamps, content hash and raw provenance.

## Evidence

A normalised, project-attributed observation derived from one or more source
records.

Evidence says what appears to have happened. It does not decide whether the
activity was important, complete or intentional.

## Narration

Raw text deliberately supplied by the user. Narration has higher authority for
goals and intent than passive evidence, but may still be ambiguous or
contradictory.

The raw entry is preserved even after its fragments are reconciled.

## Explicit correction

A user instruction that changes attribution, meaning or canonical state. A
correction is durable provenance and should influence future reconciliation.

## Revisit

An instruction to keep something outside the current working set until a time
or condition makes it relevant again.

Revisit is not a generic task due date.

## Reconciliation run

A recorded proposal that compares prior state, new evidence, narration and
revisit instructions.

It contains:

- input references;
- structured proposed changes;
- concise reasons for material changes;
- unresolved questions;
- confidence and uncertainty;
- acceptance or correction outcome;
- notification intents.

## Notification intent

A provider-neutral request created by policy, not directly by a collector.

Likely kinds:

- morning brief;
- revisit;
- time-sensitive item;
- blocker cleared;
- decision needed;
- explicit reminder;
- system warning.

An intent includes a deduplication key, delivery window, optional deep link and
optional expiry.

## Invariants

- A source record may be reprocessed without being imported twice.
- A claim can be traced to its provenance.
- Manual correction outranks model inference.
- Passive activity cannot silently replace an explicit outcome.
- A project exposes no more than three next actions.
- A parked item is not presented as active merely because a collector sees it.
- A normal source import cannot directly send a notification.

