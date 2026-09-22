# MVP definition

**Status: proposal.** This narrows `product.md`'s first-release scope into the
smallest thing worth building. Decisions marked **OPEN** are not mine to make
and are mirrored in `open-questions.md`.

## What the MVP has to prove

Righteo's thesis is attention compression, not capture. The MVP exists to
falsify one claim:

> A messy brain dump, laid over a week of real agent and repository activity,
> becomes a small working set that is credible enough to act on and still
> correct the next morning.

Everything that does not serve that claim is deferred, including things listed
in `product.md`'s first-release scope.

### The acceptance test

The MVP succeeds if, on the maintainer's real machine and real projects:

1. A ten-item narration produces a working set of no more than five projects,
   each with no more than three next actions.
2. They agree with the result after at most three corrections.
3. Every claim on a card can be traced to narration, evidence or inference in
   one click.
4. Closing and reopening the app the next morning shows the same working set,
   updated only by what actually happened overnight.
5. Nothing in the run required editing a database by hand.

If step 1 produces a list rather than a working set, or step 2 needs more than
three corrections, the product thesis is wrong and no amount of UI fixes it.
That is the point of testing it this early.

## The one journey

The MVP supports exactly one path, end to end:

```text
Open from the Dock
  → see yesterday's working set, rebuilt from evidence
  → narrate whatever is in your head
  → read a change summary, accept it or correct one thing
  → open a project, ask why something is there, correct it
  → quit, reopen tomorrow
```

No second entry point, no menu bar, no settings screen beyond what the journey
strictly needs.

## In scope

| Area | MVP | Why |
| --- | --- | --- |
| Shell | Tauri 2, one window, Dock presence | D-010 |
| Collectors | Claude Code transcripts, Git | The two sources with the most signal |
| Storage | SQLite, idempotent incremental ingest | D-007 |
| Reconciliation | One tool-less structured model call | D-011 |
| Model access | The `ModelRunner` port. CLI transport is the default and must work; API adapter built but not the tested path | D-015 |
| Screens | Today, reconciliation result, project detail | The journey above |
| Correction | Reattribute, rewrite outcome, mark finished | Trust is the whole product |
| Provenance | Every claim traceable, three-way marked | Domain invariant |
| Revisit | Defer, park, drop | Product invariant: these are successes |
| Theme | Light and dark, both designed | D-013 |
| Accessibility | Keyboard navigation, visible focus, reduced motion | Design language, from the first prototype |

## Out of scope, deliberately

| Deferred | Until |
| --- | --- |
| Pushover delivery | The in-app loop is trusted. Intents are still generated and inspectable. |
| Codex collector | The Claude Code collector proves the protocol boundary |
| Menu-bar surface | Dock-first is the bet; a second surface doubles the UI work |
| Archiving, search, history browsing | There is no volume problem yet |
| Multi-machine, remote collectors | D-005. The protocol seam stays; the transport does not. |
| Onboarding, settings UI | One user, one machine. Config is a file. |
| Project creation by hand | Projects are discovered from evidence. Creating them by hand is a task manager. |

Deferring Pushover is the one that will feel wrong, because the morning brief
is a headline promise. The reason: a notification the user does not yet trust
is worse than no notification, and trust is built in-app first. Generating the
intents without delivering them costs almost nothing and proves the policy.

## The screens, reduced

The mockups in `design/` show more than the MVP needs. What must actually work:

- **Today.** Orientation line, narrate surface, focal plus active cards, an
  "also active" row. **OPEN:** three cards then reveal, or up to five in full.
- **Reconciliation result.** Change summary with provenance per line, at most
  one clarifying question, accept or correct. **OPEN:** whether this is a
  separate step or folds inline when the change is small.
- **Project detail.** Outcome, now, next, blocked, why-is-this-here, the three
  corrections, recent evidence. Parking lot can be a list without controls.

Everything else in the mockups is a later increment, not a promise.

## Increments

Each one ends in something demonstrable. Do not start the next until the
previous one runs on real data.

**M0. Shell and system.** Tauri window opening from the Dock, the token layer,
the primitives, and a static Today rendered from a fixture. Proves the design
survives contact with real components and that both themes are one definition
rather than two.

**M1. Evidence in.** Claude Code transcript and Git collectors writing through
the evidence protocol into SQLite. Incremental, idempotent, restart-safe.
Proves ingestion against a sanitised fixture corpus and then live.

**M2. Compression.** The `ModelRunner` port with both transports, then narrate,
one structured reconciliation call, a proposed change set, the change summary,
accept. This is the increment that tests the thesis. Everything before it is
scaffolding.

Build the port and both adapters before the reconciliation logic, not after.
Retrofitting a second transport behind a shape built for the first is how the
abstraction ends up leaking one provider's assumptions.

M2 is not done until a test proves a CLI-transport run cannot reach a tool.
That is the increment's real acceptance criterion, above the change summary
rendering correctly.

**M3. Trust.** Why-is-this-here, the three corrections, project detail, and
corrections influencing the next run.

**M4. Continuity.** Revisit and defer, emphasis changing as the working set
changes, notification intents with deduplication keys.

## Open decisions that block work

These are in `open-questions.md`; repeated here because they gate increments.

- **Blocks M2:** which agent CLI ships first, and can its user-level
  configuration (MCP servers, hooks, instruction files) be provably suppressed?
  If not, it cannot be the default transport.
- **Blocks M2:** does narration reconcile immediately, or only after review
  when the change is material?
- **Blocks M1:** which exact Claude Code record format is the fixture set?
- **Blocks M1:** how do agent worktrees and multiple clones map to one project?
- **Blocks M0:** three cards or five on Today. Both are now rendered: use the
  working-set toggle on `/today` to decide by looking rather than arguing.

## How to work through this

The design canvas settled the direction. The remaining questions are not
answerable by drawing: they need a running slice. Prefer building M0 and M1
thinly over specifying them thoroughly. Record what you learn in
`decisions.md`, and move an answered question out of `open-questions.md` in the
same change.
