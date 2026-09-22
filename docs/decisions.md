# Decision log

This is a lightweight decision record. Add formal ADRs only when a decision
needs deeper alternatives, consequences or migration notes.

## D-001: Greenfield rebuild

**Status:** Accepted

Righteo is all-new code. Two earlier private systems are behavioural
references only and are deliberately not named in this repository.

## D-002: Attention compression over task capture

**Status:** Accepted

The product maintains a compact current state and up to three next actions per
project. It does not generate a task for every conversation or activity.

## D-003: Dock-first desktop presence

**Status:** Accepted

The primary macOS experience is a visible Dock application. A menu-bar surface
may provide quick access but is not the only interface.

## D-004: Narrate is a core input

**Status:** Accepted

The Today screen includes an unstructured narration surface. Righteo blends it
with existing state and evidence rather than treating every line as a task.

## D-005: One-machine first

**Status:** Accepted

The first release runs a hub and collector on one primary Mac. Multi-hub and
distributed coordination are out of scope.

## D-006: Preserve a remote-collector seam

**Status:** Accepted

Collectors communicate through a versioned evidence boundary so another Mac
can submit evidence later without rewriting the domain.

## D-007: Local-first SQLite system of record

**Status:** Accepted

Canonical state, provenance and ingestion cursors live locally. Derived data is
rebuildable and ingestion is idempotent.

## D-008: Pushover is a first-class notification adapter

**Status:** Accepted

The hub sends low-noise briefs, revisits and explicit reminders. Collectors do
not emit notifications directly.

## D-009: Product name is Righteo

**Status:** Accepted

The repository, app and voice use the Australian term **Righteo**. Existing
commercial uses are not a blocker for this personal open-source repository.

## D-010: Tauri 2 application shell

**Status:** Accepted

Use Tauri 2 as the desktop application shell. Begin with macOS while preserving
shared boundaries that can support later mobile work. A spike must still prove
Dock presence, menu-bar presence, background behaviour, local storage and
distribution, but those findings refine the Tauri architecture rather than
reopening the shell choice by default.

## D-011: Reconciliation is tool-less

**Status:** Accepted

The LLM reconciliation process receives bounded structured input and returns
validated structured output. It has no shell, filesystem or general tool
access.

## D-012: TypeScript and shadcn/Base UI direction

**Status:** Provisional

Use React, Vite and TypeScript for the application UI, with Tailwind CSS and
shadcn/ui generated from its Base UI implementation. Keep the generated source
inside the repository and adapt it to Righteo's design language. Avoid mixing
primitive bases without a component-level reason and migration plan.

## D-013: Paper and graphite visual direction

**Status:** Provisional

Three directions were mocked against real Harbour and Ledger content:
paper and graphite, morning light on a dark desk, and a native macOS utility.
**Paper and graphite** is the chosen direction.

It won because it is the furthest of the three from a backlog tool, and because
the highlighter gives the focal card its emphasis without inventing a status
colour. Its known risk is looking like a note-taking app rather than something
with live evidence behind it, which is why evidence is drawn in a cool slate
and provenance chips are always present.

Literata for state and titles, Public Sans for interface, IBM Plex Mono for
evidence and structural labels only. The token contract is `design/TOKENS.md`.

Light is the primary environment. Dark is a designed counterpart, not an
inversion: the material changes from paper to a graphite board, the highlighter
goes translucent so it does not glare, and the action button inverts from
graphite-on-paper to cream-on-board so it stays the loudest contrast in either
mode.

The two runners-up are kept in the design canvas as the record. Neither is a
dead idea: B's emphasis-as-light-level extends to four steps more gracefully
than the highlighter does, and C's persistent sidebar makes parked work visible
without spending main-column space.

## D-014: Product invariants are enforced by component APIs

**Status:** Provisional

The Righteo component layer sits above shadcn and Base UI primitives and exists
to encode product invariants in its types rather than in review discipline:

- `NextActions` accepts at most three actions.
- `ClarifyingQuestions` accepts at most three questions.
- `BlockedNote` renders nothing when there is no blocker.
- Emphasis is a prop derived from the working set, never a persisted status.
- `ProvenanceMark` is a single component with narrated, observed and inferred
  variants, distinguished by border style as well as colour.

## D-015: Model access is a port, with the local CLI as the default transport

**Status:** Accepted

Reconciliation depends on a `ModelRunner` port, never on a provider SDK.

- **Local CLI is the default.** Shells out to an installed agent CLI in print
  mode, so reconciliation runs against a subscription already being paid for.
  Righteo reconciles several times a day; metered billing would turn a routine
  action into a decision about whether it is worth the money, which is the
  friction the product exists to remove.
- **API key is supported, not primary.** Direct calls to a provider, with
  credentials in the macOS Keychain, never in SQLite and never committed. It
  stays because an abstraction with one implementation is not an abstraction,
  and because a future headless collector has no interactive login.

The port accepts a bounded, serialised, schema-versioned request and returns
output validated against the declared schema, or a typed error. Validation sits
above the transport so both adapters give the same guarantee. Free text never
crosses the boundary.

**This does not overturn D-011, but it is the most likely way D-011 becomes
quietly false.** The model still gets no shell, filesystem or tool access.
Righteo runs a subprocess; the model does not. Keeping those separate depends
on the CliRunner constraints in `architecture.md`, which are part of this
decision rather than implementation detail: explicit argv rather than a shell
string, no permission-bypass flag, a fresh empty working directory per run,
input on stdin rather than a file path, a minimal environment allowlist, and a
hard timeout.

The constraint that matters most is the one a fresh working directory does not
cover. An agent CLI loads the user's own configuration: MCP servers, hooks,
instruction files, sessions. **Configured MCP servers are tools.** If they
load, reconciliation has tools and nothing in the code will say so. User-level
configuration must be explicitly suppressed, the mechanism verified against the
installed CLI rather than assumed, and the suppression covered by a test that
asserts a run cannot reach a tool. A CLI whose suppression cannot be proven is
not a supported transport.

The related failure is recorded in `legacy-lessons.md`.

The two transports are not equally capable and the abstraction must not hide
it. Structured-output enforcement differs, so the CLI adapter carries a
stricter parse and a bounded repair retry, and every reconciliation run records
which transport produced it.
