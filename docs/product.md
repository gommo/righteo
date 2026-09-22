# Product definition

## One sentence

Righteo is a local-first working memory that turns scattered AI-assisted work
and an unstructured brain dump into a small, current view of what matters now.

## The problem

AI makes investigation, branching and task generation nearly free. A simple
request can produce many conversations, possible improvements and unfinished
threads. Conventional task managers capture all of them and increase the load
they were meant to reduce.

The missing layer is not more capture. It is attention compression:

- What am I actually trying to accomplish?
- Where did I get to?
- What should remain active now?
- Which rabbit holes can be parked, deferred or dropped?

## Primary user

The first user is one person building several products with coding agents
across local repositories. They context-switch frequently, have more active
threads than working memory can comfortably retain, and do not want to maintain
another project-management system.

The first release should be excellent for this user before generalising to
teams or broad knowledge management.

## Product promise

When the user opens Righteo in the morning, it should already know enough about
yesterday to say:

> Morning Sam. You touched five projects yesterday. Two appear to be your
> main focus.

The user can narrate everything currently in their head. Righteo then blends
that narration with preserved goals, yesterday's project states and fresh
evidence. The result is a concise Today view, not a larger inbox.

## Core loop

1. **Collect** evidence from agent sessions, repositories and explicit input.
2. **Distil** noisy evidence into attributable project activity.
3. **Narrate** whatever is in the user's head without requiring structure.
4. **Reconcile** intent, prior state and evidence.
5. **Compress** the result into a small working set.
6. **Clarify** only the few decisions that materially change the plan.
7. **Brief** the user in the app and, when useful, through Pushover.
8. **Rewrite** project state as reality changes.

## Canonical project card

Every active project should be understandable through four primary fields:

```text
Outcome
What success currently means.

Now
Where the work has actually reached.

Next
No more than three actions that materially move the outcome forward.

Blocked
Only a real dependency or decision preventing progress.
```

Supporting detail can include recent evidence, active threads and a parking
lot, but should not compete with those four fields.

## Narration

Narration is not another task-entry box. It accepts fragments, anxieties,
reminders, decisions and contradictions.

The system should:

- preserve the raw narration;
- attach fragments to likely projects without hiding uncertainty;
- collapse duplicates and elaborations;
- distinguish a commitment from an idea;
- propose deferral when timing matters;
- ask no more than three high-value clarifying questions at once;
- explain material changes to the working set;
- avoid turning every sentence into a task.

## First-release scope

- Dock-first macOS application and optional menu-bar access.
- Today view with approximately three to five visible project cards.
- Project detail with outcome, now, next, blocked, recent evidence and parked
  threads.
- Narrate flow with reconciliation preview and a lightweight change summary.
- Local collection from Claude Code, Codex and Git repositories.
- Local SQLite persistence and restart-safe incremental ingestion.
- Manual correction of project attribution and state.
- Pushover morning brief, revisit reminders and explicit reminders.
- One local hub and one local collector, while preserving the remote-collector
  protocol boundary.

## Explicit non-goals

- Team project management.
- Agent orchestration or autonomous code execution.
- Slack command routing.
- A complete task, issue or dependency tracker.
- Time tracking, productivity scoring or employee monitoring.
- Generating tasks from every session or conversation.
- Multi-machine consensus, high availability or cloud sync in the first
  release.
- Replacing GitHub, Linear, Jira, calendars or reminder systems.
- Treating inference as fact.

## Measures of success

The first version succeeds if:

- the user can understand their active work within one minute of opening it;
- a ten-item brain dump becomes a smaller, credible working set;
- returning to a project requires substantially less reconstruction;
- project cards remain useful without daily manual administration;
- the user trusts why something appeared, changed or disappeared;
- notifications are rare enough that they remain worth reading.

