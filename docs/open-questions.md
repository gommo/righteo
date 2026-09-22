# Open questions

These questions are deliberately unresolved. Move an answer into the relevant
canonical document and decision log once accepted.

## Blocking the MVP

These gate a specific increment in [mvp.md](mvp.md). They are repeated in their
topic sections below; this list exists so the blockers are visible in one place.

- Which model provider, and does the user bring their own API key? (blocks M2)
- Does narration reconcile immediately, or only after review when the change is
  material? (blocks M2)
- Which exact Claude Code record format forms the first fixture set? (blocks M1)
- How do agent worktrees and multiple local clones map to one project? (blocks
  M1)
- Three cards then reveal, or up to five in full, on Today? (blocks M0, because
  it changes the layout)

## Experience

- Does narration reconcile immediately, or is there a lightweight review step
  only when the change is material?
- How should the user distinguish "accept", "correct this one thing" and
  "answer a question" without creating a wizard?
- Should Today show three projects by default and reveal the rest, or allow up
  to five full cards?
- What is the quietest useful representation of confidence and provenance?
- When should a project disappear from the working set automatically?
- Is **Righteo** the narration submit label, the reconciliation acknowledgement,
  or both?

## Design language

- How much visual weight should evidence receive on project detail?
- Does the emphasis ladder need all four levels on Today, or do focal, active
  and peripheral cover it? The mockups only exercise three.
- Should provenance be marked per card, as drawn, or per individual claim?
  Per claim is more honest and considerably noisier. This is the concrete form
  of the confidence-and-provenance question below.
- Can project continuity be represented with a subtle thread or trace without
  becoming decorative noise?
- What Dock icon remains recognisable at small sizes and does not resemble a
  task manager tick?
- Should the primary window remember a compact card-board size or behave as a
  full desktop workspace?

## Reconciliation

- Which providers ship first behind the model-runner port, and which agent
  CLIs does the CLI transport support? (D-015 settles the shape, not the list.)
- Can the chosen CLI's user-level configuration (MCP servers, hooks,
  instruction files, session reuse) be provably suppressed? This gates whether
  it can be the default transport at all.
- What is a sane daily reconciliation budget, given subscription usage limits
  replace per-call cost? Which transformations can be done deterministically
  first?
- How does an API key reach the Keychain when there is no settings UI? Lower
  priority now that the default transport needs no key.
- Does the CLI transport need to pin the CLI version it was tested against, or
  detect capability at preflight?
- Which transformations can be deterministic before involving an LLM?
- What confidence threshold requires a question rather than an automatic
  change?
- How long should raw source records and reconciliation inputs be retained?
- How should contradictory explicit narration be surfaced?

## Collection

- Which exact Claude Code and Codex record formats form the first fixture set?
- How should agent worktrees and multiple local clones map to one project?
- Which Git events matter beyond commits and working-tree changes?
- How does a user exclude a repository, session or sensitive path?
- What is the smallest useful collector health surface?

## Platform

- Which open-source licence should the repository use?
- Should one Tauri 2 application own the Dock UI, menu-bar UI and background
  collection lifecycle, or should the collector become a helper process?
- When an Android viewer is designed, does Tauri's mobile path meet its actual
  requirements or is a separate Capacitor shell justified?
- What is the minimum supported macOS version?
- What signing, notarisation and update approach suits an open-source personal
  app?

## Notifications

- What is the default morning brief time and should it wait for first activity?
- What daily notification ceiling preserves trust?
- Should Pushover deep-link to a custom app URL immediately or start with a
  local/Tailscale web URL?
