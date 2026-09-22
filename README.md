# Righteo

**Working memory for people building with AI.**

Righteo is a local-first desktop application that turns what you intended to
do, what your coding agents actually did, and what changed in your projects
into a small, current working set.

It is designed to answer three questions:

1. What am I actually trying to accomplish?
2. Where did I get to?
3. What are the one to three things that move it forward now?

The product acknowledgement is deliberately simple:

> **Righteo. Here's today.**

## Status

Righteo is in a docs-first product and experience design phase. This is a
greenfield rebuild. There is intentionally no application scaffold yet.

Two earlier private projects are references for lessons and proven ingestion
behaviour only. Righteo will not extend either codebase or inherit their
orchestration and project-management models.

## Current direction

- Dock-first macOS application, with a secondary menu-bar presence.
- A visual Today view built around a few project cards.
- A prominent Narrate input for an unstructured morning brain dump.
- Automatic reconciliation of narration, prior project state, agent sessions,
  Git activity and other evidence.
- Local-first SQLite storage on one primary machine.
- A hub-and-collector boundary that can later accept evidence from other Macs.
- Pushover briefs for deliberately low-noise notifications.
- Tauri 2 as the desktop shell, with TypeScript shared across the product.
- React, Vite, Tailwind CSS and shadcn/ui using Base UI primitives as the
  current UI direction.

## Running it

Requires Node 22, pnpm, Rust and the Xcode command line tools.

```bash
pnpm install
pnpm dev          # web only, http://localhost:5273
pnpm tauri:dev    # the real desktop app
```

Building a distributable macOS bundle:

```bash
pnpm tauri:build  # .app and .dmg in apps/desktop/src-tauri/target/release/bundle
```

Two caveats on that bundle. It is ad-hoc signed, so Gatekeeper will refuse it
on any machine other than the one that built it, and it is arm64 only unless
you install rustup and add the `x86_64-apple-darwin` target. Both are tracked
in `docs/open-questions.md`.

```bash
pnpm build      # typecheck and production build of the web assets
pnpm typecheck  # types only
```

Screens are still rendered from fixtures. Nothing reads your real projects
yet: that is M1, described in `docs/mvp.md`. The review harness carries a
`Shell probe` route that reports the SQLite database the Rust process is
actually using, which is how the M0 spike was verified.

## Documentation

Start with [the documentation index](docs/README.md).

The most important documents are:

- [Product definition](docs/product.md)
- [Experience model](docs/experience.md)
- [Design language](docs/design-language.md)
- [Architecture](docs/architecture.md)
- [Domain model](docs/domain-model.md)
- [Decisions](docs/decisions.md)
- [Open questions](docs/open-questions.md)
- [Legacy lessons](docs/legacy-lessons.md)

## Working with coding agents

[AGENTS.md](AGENTS.md) is the only instruction file, read by every agent.
There is deliberately no `CLAUDE.md`: Claude Code loads `AGENTS.md` in its
place when a project has none, so adding one would quietly demote the shared
file and let the two drift apart.

Skills live in `.agents/skills/`. `.claude/skills` is a symlink to that
directory, because Claude Code hardcodes its skill lookup to `.claude/skills`.

## House rules

These apply to anyone working here, human or agent. The full set, with the
reasoning, is in [AGENTS.md](AGENTS.md). The ones that bite most often:

- **This repository is public.** No real names, no employer or client names,
  no private paths, hostnames or ticket IDs. Demo content uses the fictional
  projects Harbour, Ledger, Toolbox and Skirmish, and the fictional user Sam.
- **Righteo is an attention-compression product, not a task manager.** At most
  three next actions per project. Deferring, parking and dropping are
  successful outcomes, not failures. No streaks, scores or overdue-red walls.
- **Design-system first.** New UI is built in the design canvas with realistic
  content before it is wired into a screen. Screens compose Righteo
  components, never raw primitives with inline styles, and components use
  tokens, never literal colours or font sizes.
- **Invariants are types, not review comments.** The cap of three next actions
  is a tuple type. Emphasis is derived and must never be persisted.
- **Reconciliation gets no tools.** Structured input, validated structured
  output, no shell and no filesystem access.
- **Secrets never touch the repository.** Credentials live in the macOS
  Keychain, never in SQLite and never in a committed file.
- **No em dashes, and Australian spelling in user-facing copy.**
- **Nothing is complete until it has been run.** Show the output.

Decisions are recorded in [docs/decisions.md](docs/decisions.md) and
unresolved choices in [docs/open-questions.md](docs/open-questions.md). A
material product or architecture change updates the affected document in the
same commit.

## Licence

[MIT](LICENSE).

