# Design language

**Status: direction chosen, token contract provisional.**

The three exploratory directions have been drawn and **paper and graphite** was
selected. See [D-013](decisions.md) for the reasoning and `design/TOKENS.md`
for the resulting token contract. The principles below still govern; the colour
and typography sections now have answers rather than questions.

## Desired feeling

Righteo should feel:

- calm but awake;
- warm, direct and capable;
- visual enough to orient at a glance;
- forgiving of mess and unfinished work;
- grounded in evidence without looking forensic;
- personal without pretending to be a person;
- native to the Dock rather than a web dashboard trapped in a window.

The emotional transition is:

```text
scattered → acknowledged → compressed → oriented
```

## What it must not resemble

- A Jira or Linear backlog.
- A wall of equal-priority cards.
- A productivity analytics dashboard.
- A chat application with the useful state buried in messages.
- A command centre full of live agent status.
- A gamified habit tracker.
- An urgent red overdue list.

## Visual hierarchy

The interface should have three perceptual layers:

1. **Orientation**: greeting, date and a one-sentence account of the day.
2. **Working set**: the few project cards that deserve attention.
3. **Evidence**: recent activity and reasoning available on demand.

Evidence should create trust without becoming the primary visual material.

## Project cards

Cards are state summaries, not task containers.

Each card should make these readable in a five-second scan:

- project identity;
- outcome;
- current state;
- the next one to three moves;
- a blocker, only when one exists.

Cards should vary in emphasis according to attention, not grow endlessly with
content. Secondary material belongs in the project detail.

Possible emphasis levels:

- **Primary**: likely deserves attention today.
- **Active**: still live, but not necessarily first.
- **Peripheral**: touched or relevant, shown compactly.
- **Parked**: deliberately outside the working set.

Avoid turning those levels into permanent statuses or a workflow engine.

## Narrate surface

Narrate should feel more like clearing a desk than completing a form.

- It is prominent on arrival.
- It accepts paragraphs, fragments and pasted lists.
- It has no required project, priority or date fields.
- Voice input is a future extension of the same surface.
- The primary action can be labelled **Righteo**.
- Processing feedback should describe compression, not task creation.

Example:

> Righteo. I found three active threads, parked two ideas and kept one question
> for you.

## Colour direction

**Settled by D-013.** The palette is paper, graphite and highlighter: a warm
paper canvas, graphite ink, one warm highlighter reserved for the outcome line,
and one cool slate reserved for evidence. Literal values, light and dark, are
in `design/TOKENS.md`.

The properties below were the brief, and remain the test any future change to
the palette has to pass:

- a quiet neutral canvas rather than pure white productivity software;
- one warm orientation colour;
- one cool evidence colour;
- restrained semantic colour used only when meaning changes;
- no default red for lateness or incompletion;
- dark mode designed as a first-class environment, not an inversion.

Potential material metaphors worth exploring:

- paper, graphite and highlighter;
- morning light across a dark desk;
- layered translucent cards with a single warm focal plane;
- topographic or thread-like traces used sparingly to show continuity.

Do not combine all metaphors in one direction.

## Typography direction

**Settled by D-013.** Literata for the greeting, project titles and state,
Public Sans for interface and body, IBM Plex Mono for evidence and the small
structural labels only. Mono means a machine said it; it is never used for
state the user wrote.

The brief below still holds:

- a warm, highly legible UI sans for state;
- a restrained mono face only for evidence, repositories and agent sources;
- large enough body text for a Dock-first app used early in the morning;
- sentence case throughout;
- minimal uppercase, reserved for small structural labels such as NOW or NEXT.

## Motion

Motion should make reconciliation understandable:

- narration fragments can visibly fold into projects;
- cards can shift emphasis when the working set changes;
- deferred work can recede rather than disappear abruptly;
- evidence can reveal from beneath a state summary;
- nothing should pulse merely to demand attention.

All essential state changes must remain understandable with reduced motion.

## Voice

Righteo uses Australian/British spelling and plain language.

Good voice:

- "Righteo. Here's today."
- "This looks related to Harbour."
- "You said Friday, so I've kept it out of today."
- "This may be a rabbit hole. Park it?"
- "I can't tell whether this is finished or merely investigated."

Avoid:

- "Crush your goals."
- "You are falling behind."
- "Seven tasks are overdue."
- "AI has optimised your productivity."
- fake certainty about inferred intent.

## Accessibility and calm

- Never encode project state through colour alone.
- Support keyboard navigation and visible focus from the first prototype.
- Design for increased text size before polishing dense layouts.
- Keep hit targets appropriate for a desktop app that may later share surfaces
  with touch devices.
- Avoid constant animation, notification badges and attention-seeking chrome.
- Ensure the useful reading order survives screen readers and narrow widths.

## Initial design exercises

Produce three frames for each visual direction:

1. Morning arrival before narration.
2. Reconciliation result after a ten-item brain dump.
3. Project detail showing state, evidence and a manual correction.

Test every direction with realistic Harbour, Ledger, Toolbox and Righteo content.
Lorem ipsum will hide the hierarchy problems that matter here.

