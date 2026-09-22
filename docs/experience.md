# Experience model

This document describes the intended daily experience before committing to a
visual treatment.

## Experience principle

Righteo should feel like returning to a desk that someone quietly reset using
what actually happened, while leaving the important work in place.

It should not feel like opening a control room or being inspected by a project
manager.

## Morning loop

### 1. Arrive

The Dock app opens directly to Today.

```text
Morning Sam                                      Wed 19 Aug

You touched 5 projects yesterday.
2 appear to be the main thread.

┌────────────────────────────────────────────────────────────┐
│ NARRATE                                                   │
│ What's in your head today?                                │
│                                                            │
│                                                Righteo →   │
└────────────────────────────────────────────────────────────┘

PRIMARY
┌───────────────────────────┐  ┌───────────────────────────┐
│ Harbour        │  │ Ledger                       │
│ Outcome                   │  │ Outcome                   │
│ Now                       │  │ Now                       │
│ Next · up to three        │  │ Next · up to three        │
│ Blocked, only if true     │  │                           │
└───────────────────────────┘  └───────────────────────────┘

ALSO ACTIVE
Toolbox · Righteo · Skirmish
```

The counts are descriptive, not scores. They should not dominate the screen.

### 2. Narrate

The input expands into a calm writing surface. The user can type or paste a
messy list without selecting projects, dates or task types.

The call to action can simply be **Righteo**. It means "understood; deal with
this" rather than "create ten tasks".

### 3. Reconcile

Righteo produces a compact change summary before or alongside the updated
Today view:

```text
Righteo.

Focused Harbour around the activity feed.
Moved the Skirmish release check to Friday.
Kept the forum schema as a decision, not a task list.
Parked two unrelated ideas.

One thing needs your call:
Is the import PR more important than the Ledger migration this morning?
```

The user should be able to accept the whole reconciliation quickly, correct a
single attribution, or answer the important question without editing a complex
plan.

### 4. Work

Today remains visually useful in the Dock throughout the day. A project card
can be expanded, but Righteo does not become the place where all implementation
work occurs.

## During the day

Narration remains available for corrections and changes of intent:

- "Forget Toolbox today; the production issue wins."
- "That investigation is done but we still need the migration."
- "Bring this back Friday morning."
- "The notification issue is part of Harbour, not Righteo."

Small explicit corrections should be applied immediately and preserved as
higher-confidence evidence than passive inference.

## Returning after several days

Opening a dormant project should emphasise:

1. the outcome that was preserved;
2. the last credible current state;
3. what changed since it was active;
4. the smallest useful restart action;
5. any uncertainty caused by missing evidence.

It should not dump a chronological transcript on the user.

## Notifications

Pushover is an output of the attention policy, not a stream of activity.

Useful notifications include:

- the morning brief is ready;
- a deliberately deferred item has become relevant;
- a genuine blocker appears to have cleared;
- an explicitly requested reminder;
- one decision is needed before the plan can be compressed.

Do not notify for every agent session, commit, project touched or inferred next
action. Only the hub sends notifications.

## Correction and trust

Every inferred state needs a quiet path to "Why is this here?" The answer
should show the relevant narration, session or repository evidence and the
model's interpretation without exposing internal chain-of-thought.

Corrections should improve future attribution while preserving the original
evidence and reconciliation history.

