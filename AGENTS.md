# Righteo agent instructions

Righteo is a greenfield, docs-first product. It is not a continuation of any
earlier system.

## Unbreakable rules

Numbered so they can be cited. Breaking one is a discussion, not a refactor.
Where a rule has no automated enforcement, it says so, and the enforcement is
you.

1. **This repository is public. Never write a real identity into it.** Full
   rule below, because it has the most ways to go wrong.
2. **Commit and push straight to `main`.** This is a single-maintainer
   repository and there is nobody to review a pull request. Do not create a
   branch or open a PR unless asked for one: it adds ceremony and leaves work
   stranded off `main`. Revisit this rule the moment a second contributor
   arrives. The irreversible-action guard still stands on its own: before
   anything that cannot be undone, such as a force push, a history rewrite, a
   published release or a deletion, ask first. One question costs seconds.
3. **Never start a dev server or a build watcher.** Assume one is already
   running. When verification needs a live app, ask which port. Otherwise
   prefer the routes that need no server: tests, typecheck, build, reading
   output. Do not `kill` or `pkill` to tidy up without saying what you are
   killing first, because the process tree may not be yours.
4. **Never give human time estimates, and never scope work down on your own.**
   No "half a day", no "that's a big one". Those numbers are invented and they
   get used to make real decisions. If the work is asked for, do all of it.
   Scaling down is the maintainer's call. If something is genuinely blocked,
   name exactly what is blocked, finish everything that is not, and say plainly
   what was left.
5. **Never use the em dash character.** Not in code, comments, commits, docs or
   chat. Use a colon, a comma, a full stop or brackets. Search for it before
   delivering anything written.
6. **Never mark work complete without proving it works.** Run it, show the
   output, diff the behaviour. "Should work" is not done. Ask whether a staff
   engineer would approve it before presenting it.
7. **Do not make things up.** If a source, format or value is not available,
   say so and stop. Never invent a plausible file path, API shape, record
   format or fixture and present it as real. A guess dressed as a fact is worse
   than an unanswered question.
8. **Design-system first.** Any new component or non-trivial UI is built and
   iterated in the design canvas with realistic content before it is wired into
   the app. Do not build UI directly in a screen and design as you go. If you
   change a shared component, update its canvas entry in the same change. A new
   component with no canvas entry is incomplete.
9. **Screens compose Righteo components, never raw primitives with inline
   styles.** A component uses tokens, never literal colours or font sizes. See
   `docs/ui-inventory.md`. This is the rule that keeps the design system from
   decaying into decoration.
10. **Product invariants are enforced by types, not by review.** A cap of three
    next actions is a tuple type. Emphasis is derived and must never become a
    persisted column. See D-014.
11. **Comments default to none.** Self-documenting code. At most one terse line,
    and only to record a constraint the code cannot show. Never narrate what the
    next line does, never restate the change for a reviewer, never leave a
    history preamble.
12. **No dead code.** Delete it. Do not comment it out and do not park it behind
    a flag that nothing toggles. Git is the history.
13. **Secrets never touch the repository or raw `process.env`.** Pushover and
    model credentials live in the macOS Keychain, never in SQLite and never in a
    committed file. Truncate any token to its first characters if it must appear
    in a log.
14. **Reconciliation gets no tools.** Bounded structured input, validated
    structured output. The model never gets a shell, a filesystem or a tool.
    Righteo may run an agent CLI as a transport (D-015), which is not the same
    thing and only stays that way under the CliRunner constraints in
    `docs/architecture.md`: explicit argv, no permission-bypass flag, a fresh
    empty working directory per run, input on stdin, a minimal environment
    allowlist, a hard timeout. Never relax one of those for convenience. See
    D-011 and the security lesson in `docs/legacy-lessons.md`.
15. **Plan before anything non-trivial.** Three or more steps, or any
    architectural choice, means a plan first and a check-in before
    implementation. If it goes sideways, stop and re-plan rather than pushing on.
16. **After a correction, consider a lesson.** Ask before writing to
    `tasks/lessons.md`, then record it in the Mistake / Correction / Rule
    format. Read that file at the start of a session.

## The repository is public

Righteo is open source. Everything checked in is world-readable: documentation,
design files, fixtures, commit messages and branch names.

- **Never write the maintainer's real name.** Product copy and mockups use the
  fictional first name **Sam**. Documentation says "the maintainer" or "the
  user".
- **Never name, path or link another repository, project, employer or client.**
  That includes local paths such as `../something` or `~/something`, private
  hostnames, dashboards, ticket IDs and internal tool names.
- **Never name a real person.** Demo content uses no name where it can manage
  without one.
- **Demo and fixture content uses the fictional project set:** Harbour, Ledger,
  Toolbox, Skirmish. Keep it realistic in texture, because lorem ipsum hides
  the hierarchy problems that matter, but keep it fictional. Do not add a real
  project to a fixture "just to test it".
- **Behavioural references to prior systems stay unnamed.** Describe the
  lesson, never the source. `docs/legacy-lessons.md` is written this way
  deliberately.
- **If a rule or lesson only makes sense with private context**, write the
  general form here and keep the specifics out of the repository entirely.

Commit metadata is world-readable too. This repository sets a local git
identity so commits do not carry a work address:

```text
user.name   gommo
user.email  43087+gommo@users.noreply.github.com
```

That is deliberate and must not be reset to the global identity, which is an
employer address. Check `git config --local user.email` if commits start
looking wrong.

There is no automated check for this. Before committing, grep the diff for the
maintainer's name and for the names of other projects.

## Agent configuration in this repository

`AGENTS.md` is the only instruction file. There is no `CLAUDE.md`, and one must
not be added: Claude Code loads `AGENTS.md` in exactly the place it would have
loaded `CLAUDE.md` whenever the project has no `CLAUDE.md` of its own. Adding
one silently demotes this file. The same applies to any other vendor-specific
instruction file.

```text
AGENTS.md              instructions, for every agent
.agents/skills/        skills, canonical
.claude/skills         symlink to ../.agents/skills
tasks/lessons.md       corrections worth persisting
```

Claude Code hardcodes skill discovery to `.claude/skills/<name>/SKILL.md`, so
the symlink exists to satisfy that lookup. A session follows it, verified by
probing a real session with and without the link. `.claude/` holds nothing else
that is committed; local settings there are ignored. Write skills to
`.agents/skills/`, not through the symlink.

One trap: `claude plugin validate` reads component directories without
following symlinks, so `claude plugin validate .claude/skills` reports that it
validated nothing. Validate the real path, `claude plugin validate
.agents/skills`. This affects the validator only, not skill loading.

Instructions and skills are different things. A rule that must hold for every
task belongs in this file. A procedure invoked deliberately for one kind of
task belongs in a skill, where only its one-line description stays resident.

## Read before working

For any non-trivial task, read these files in order:

1. `docs/README.md`
2. `docs/product.md`
3. `docs/decisions.md`
4. The task-relevant design or architecture document

Treat accepted decisions as the current source of truth. Treat provisional
decisions as directions that can be challenged with explicit reasoning.

## Product invariants

- Righteo is an attention-compression product, not a task manager.
- The system maintains current project state; it does not generate exhaustive
  task lists.
- Preserve explicit user goals. Do not silently replace them with inferred
  goals.
- Suggest no more than three next actions for a project.
- Keep evidence, user narration and model inference distinguishable.
- Passive activity is evidence, not proof of importance or intent.
- Deferring, parking and dropping work are successful outcomes.
- Avoid guilt mechanics: no overdue-red walls, streak pressure, productivity
  scores or noisy task counts.
- The initial product runs on one machine. Do not introduce distributed-system
  complexity into the first release.
- Preserve a clean collector protocol so remote collectors can be added later.
- Only the hub emits user notifications, preventing duplicate messages.

## Scope discipline

- Do not edit or import code from any earlier private system unless the user
  explicitly asks, and never name one in this repository.
- Those systems may be inspected locally as behavioural references.
- Do not begin implementation when the request is explicitly for discussion or
  design.
- Do not publish repositories, commits, packages or releases without an
  explicit request.
- Do not add conventional PM concepts merely because they are familiar.

## Documentation discipline

- Update `docs/decisions.md` when a material product or architecture decision is
  accepted.
- Put unresolved choices in `docs/open-questions.md`; do not bury them in prose.
- Keep documents concise and link to the canonical definition instead of
  duplicating it.
- Label assumptions as provisional.
- Use Australian/British spelling in user-facing copy.
- The product name is **Righteo**, never Righto.

## Implementation direction

The desktop shell decision is Tauri 2. The current application direction is
React, Vite, TypeScript and SQLite, with Tailwind CSS and shadcn/ui using Base UI
primitives. The UI stack remains provisional until the first vertical slice,
but do not reopen the Tauri-versus-Electron decision without new evidence.

Treat shadcn/ui as source-owned component scaffolding, not as Righteo's visual
identity. Adapt generated components to `docs/design-language.md`; do not let
stock dashboard styling define the product. Do not mix Base UI, Radix and React
Aria implementations casually within the same component layer.

Keep domain, reconciliation, collector protocol and notification policy out of
the UI shell. Platform-specific code should be an adapter at the edge.

LLM reconciliation must use structured inputs and outputs without filesystem,
shell or general tool access. Raw evidence must remain available for audit and
reprocessing.

## Voice

Righteo should sound calm, direct and lightly Australian. It acknowledges the
mess, compresses it and moves on.

Good:

> Righteo. I folded those ten thoughts into three active projects.

Avoid motivational coaching, corporate status-report language and fake
certainty.
