# Architecture

**Status: mixed.** Tauri 2 is accepted as the application shell. The remaining
package boundaries and UI choices must still be validated by a vertical slice.

## Architectural intent

Build for one primary Mac now without closing the door on remote collectors or
mobile viewers later.

```text
Local sources
Claude · Codex · Git · Narration
             │
             ▼
        Local collector
 parse · attribute · deduplicate · distil
             │ evidence protocol
             ▼
          Local hub
 SQLite · reconciliation · notification policy
             │
        ┌────┴─────────┐
        ▼              ▼
  Dock desktop       Pushover
      app              brief
```

The first release colocates hub and collector on one machine. They should be
separable logical modules, not necessarily separate processes on day one.

## Technology direction

- Tauri 2 application shell. **Accepted.**
- React, Vite and TypeScript frontend. **Provisional.**
- Tailwind CSS and shadcn/ui generated from the Base UI implementation.
  **Provisional.**
- Rust only where the Tauri boundary or native integration requires it.
- SQLite as the local system of record.
- Zod schemas for TypeScript protocol and model boundaries.
- A headless collector entry point that can later run on another Mac.

Tauri 2 currently supports desktop, Android and iOS targets with web frontend
frameworks. Start with macOS and share domain and UI code deliberately rather
than treating mobile compatibility as automatic. Capacitor remains a possible
later mobile-only viewer only if a concrete mobile requirement exposes a gap.

shadcn/ui now offers Base UI, React Aria and Radix implementations. Base UI is
the current default and the preferred starting point here. Generated
components live in the repository and should be shaped into Righteo's design
language rather than retained as stock shadcn styling.

References:

- [Tauri 2 overview](https://v2.tauri.app/start/)
- [Tauri mobile prerequisites](https://v2.tauri.app/start/prerequisites/)
- [Capacitor documentation](https://capacitorjs.com/docs)
- [shadcn/ui Vite setup](https://ui.shadcn.com/docs/installation/vite)
- [Base UI overview](https://base-ui.com/react/overview/about)

## Proposed repository shape

```text
apps/
  desktop/                 Tauri + React application
  service/                 local hub and collection runtime
  collector-cli/           future headless installation

packages/
  domain/                  project-state concepts and invariants
  protocol/                versioned evidence envelopes
  collector-sdk/           collector contracts and test harness
  collectors/
    claude/
    codex/
    git/
  synthesis/               distillation and reconciliation
  storage/                 SQLite repositories and migrations
  notifications/           intents, policy and provider adapters
  ui/                      shared visual system
  fixtures/                sanitised transcripts and expected results
```

This is a boundary proposal, not permission to create empty packages before
the vertical slice needs them.

## Collection boundary

A collector turns a source-specific record into a versioned evidence envelope.
It owns:

- incremental cursors;
- source file hashes and idempotency;
- parsing source formats;
- source-local paths;
- local project attribution signals;
- noise filtering;
- retryable parse failures.

The hub must not depend on Claude or Codex transcript layouts directly.

Stable project identity should prefer repository remote identity when
available. Local paths remain collector-scoped aliases because paths differ
between machines.

## Reconciliation boundary

Reconciliation consumes:

- the previous canonical project state;
- new evidence summaries;
- raw user narration and explicit corrections;
- current revisit instructions;
- source confidence and provenance.

It returns structured proposed state changes, questions and notification
intents. The model receives no shell, filesystem or general tool access.

The system stores the proposal and its input provenance before applying it so
the result can be explained, corrected and reprocessed.

## Model runner boundary

Reconciliation depends on a narrow port, never on a provider. Two transports
sit behind it, and the choice between them is configuration, not code.

```text
Reconciliation
      │  ModelRequest (bounded, serialised, schema-versioned)
      ▼
  ModelRunner  (port)
      ├── ApiKeyRunner   direct HTTPS, credentials from Keychain
      └── CliRunner      spawns a local agent CLI in print mode
      │  ModelResult (validated against the output schema, or an error)
      ▼
Reconciliation run record
```

The port returns **validated structured output or an error, never free text**.
Validation sits above the transport so both adapters offer the same guarantee.

### The CLI transport is the default

Righteo is a personal tool that reconciles several times a day, every day.
Metered API billing for that is the wrong shape: it turns a routine action into
a decision about whether it is worth the money, which is exactly the friction
the product exists to remove. The CLI transport runs against a subscription
already being paid for, so reconciliation is free at the point of use.

So: **the CLI transport is the default and the one the first release has to get
right.** The API transport stays, for two reasons. It keeps the port honest,
because an abstraction with one implementation is not an abstraction and will
quietly absorb the CLI's assumptions. And it is the answer for anyone without a
subscription, or for a future headless collector where no interactive login
exists.

Optimise the CLI path. Do not let the API path rot.

### The CLI inherits the user's agent configuration

This is the sharpest edge in the whole design, and it is easy to miss.

An agent CLI is not a raw model endpoint. Invoked plainly it may load the
user's global instruction file, project instruction files from the working
directory and its parents, configured MCP servers, hooks, skills and settings.
That means:

- **Configured MCP servers are tools.** If they load, reconciliation has tools,
  D-011 is false, and nothing in the code will say so.
- **Hooks can execute arbitrary commands** on events, in a process Righteo
  spawned.
- **Instruction files silently join the prompt**, so reconciliation output
  starts depending on files that have nothing to do with Righteo and change
  without warning.
- **Private content can reach the request** through those same files.

A fresh empty working directory removes the project-level sources. It does
**not** remove the user-level ones. The CLI transport must run with user-level
configuration explicitly suppressed: no MCP servers, no hooks, no inherited
instruction files, no session reuse.

The exact flags and environment variables for that must be **verified against
the installed CLI, not assumed**, and pinned to a version the preflight check
confirms. Do not guess a flag name from memory. If suppression cannot be proven
for a given CLI, that CLI is not a supported transport.

A test that asserts a reconciliation run cannot reach a tool is worth more than
any amount of care here, because this is the failure that will not announce
itself.

### What CLI-primary costs elsewhere

- **Latency.** A process spawn plus an auth check is slower than an HTTPS call.
  Reconciliation needs a designed waiting state, not a spinner bolted on later.
- **Usage limits replace cost.** Free at the point of use is not unlimited.
  Reconciliation should do as much deterministically as it can before involving
  a model, and should not run on every keystroke, collector tick or app focus.
- **Structured output is the weak point, and it is now the main path.** The
  repair retry is not an edge case. Budget for it.
- **Version drift is on the critical path.** When the CLI changes its flags,
  the product breaks. Preflight must fail loudly with a plain statement of what
  is wrong.

### This does not weaken D-011

D-011 says reconciliation has no shell, filesystem or general tool access. The
CLI transport means **Righteo** runs a subprocess. It must not mean the
**model** gains tools. The distinction is the whole design, and the constraints
below are what keep it true. `legacy-lessons.md` records what happens when they
are skipped: a CLI model invoked with bypassed permissions in a writable
working directory, accumulating unrelated files.

### CliRunner constraints

Non-negotiable, each one closing a specific failure:

- **Explicit argv array, never a shell string.** No `sh -c`, so no injection.
- **Never a permission-bypass flag.** Tools are disabled explicitly, not
  assumed off.
- **A fresh empty working directory per run**, created in the system temp area
  and removed afterwards. Never the project directory, never a repository,
  never the app support directory.
- **Input on stdin.** Never interpolated into argv, and never written to a file
  whose path is passed to the model, because a path is an invitation to read
  more than we sent.
- **A minimal environment allowlist**, not the inherited environment, so no
  stray credentials reach the subprocess.
- **A hard timeout with a kill**, and a bounded output size.
- **stdout parsed and validated** against the same schema the API transport
  uses. Prose around the JSON is a parse failure, not something to tolerate
  silently.

### The transports are not equally capable

Do not pretend otherwise in the abstraction. The API transport can constrain
output structurally. A CLI in print mode returns text that may wrap or preface
the JSON, so `CliRunner` needs a stricter parse and a bounded repair retry.
The port exposes a `capabilities` field rather than hiding the difference, and
the reconciliation run records which transport produced a result so behaviour
can be compared later.

### Health and degradation

A CLI transport fails in ways an API does not: not installed, not
authenticated, flags changed under us. The runner needs a preflight check and a
plain statement of what is wrong, surfaced in the app rather than in a log.

When no runner is available, Righteo still opens, still shows the last working
set, and still accepts narration for later reconciliation. The storage
principle that the system stays useful offline applies to the model too.

### Provenance

Every run records prompt identifier, prompt version, schema version, provider,
model identifier and transport. Without those a stored reconciliation cannot be
explained or reprocessed, which `domain-model.md` requires of a reconciliation
run.

## Storage principles

- SQLite is the local source of truth.
- Raw imported records are immutable except for retention policy.
- Derived evidence and project state are rebuildable.
- Ingestion is incremental and idempotent.
- Schema migrations are explicit and tested.
- Secrets such as Pushover credentials live in macOS Keychain, not SQLite.
- The system remains useful when external AI or network services are offline.

## Notification boundary

```text
Reconciliation event
      → notification policy
      → notification intent
      → Pushover adapter
```

Only the hub produces notification intents. Each intent has a deduplication key,
delivery window and optional expiry. Provider-specific fields stay inside the
adapter.

## Future remote collectors

A future collector may run on another Mac and submit evidence over Tailscale or
another authenticated transport. The evidence protocol must therefore include:

- collector and source identity;
- stable event identifiers;
- observed-at and occurred-at timestamps;
- project identity claims and aliases;
- payload schema version;
- provenance and confidence;
- idempotency information.

Transport, remote authentication and multi-hub behaviour are outside the first
release.

## First vertical-slice proof

Before expanding the package graph, prove this path:

1. Launch Righteo from the Dock.
2. Read a small fixture of Codex or Claude activity.
3. Attribute it to one project.
4. Persist evidence and a project state in SQLite.
5. Enter narration in the app.
6. Produce and review a structured reconciliation.
7. Render the updated project card after restart.
8. Generate a deduplicated test notification intent.
