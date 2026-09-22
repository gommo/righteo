# UI inventory

**Status: proposal.** Derived from the four screens in `design/`, not from a
generic component checklist. If something is not on one of those screens, it is
not in this list.

Token values live in `design/TOKENS.md`. Visual and voice principles live in
`design-language.md`. This document is the build list that sits between them.

## The four layers

```text
Tokens          design/TOKENS.md, as CSS custom properties. Two themes.
  ↓
Primitives      Thin adaptations of shadcn on Base UI. Deliberately boring.
  ↓
Righteo layer   Where product invariants become types.
  ↓
Screens         Today, reconciliation result, project detail.
```

The rule that makes this worth doing: **a screen may not reach past its layer.**
A screen composes Righteo components, not raw primitives with inline styles. A
Righteo component uses tokens, never literal colours. Break that and the design
system becomes decoration.

## Layer 1: primitives

Generated from shadcn on the Base UI implementation (D-012), then adapted to
the tokens. Keep the generated source in the repository.

| Primitive | Source | MVP | Notes |
| --- | --- | --- | --- |
| `Surface` | Card | Yes | Three levels: raised (border plus shadow), flat, sunken. Dark drops the shadow. |
| `Stack` / `Grid` | Hand-written | Yes | Flex and grid with gap. No margin-based spacing anywhere. |
| `Text` | Hand-written | Yes | Roles, not sizes: `display`, `title`, `body`, `secondary`, `meta`, `label`, `mono`. Callers never pass a font size. |
| `Button` | Button | Yes | Three variants: `action` (graphite fill), `outline`, `quiet`. No other variants. |
| `TextArea` | Textarea | Yes | Auto-growing, for Narrate. |
| `Chip` | Badge | Yes | Base for `ProvenanceMark`. Fill, solid-border and dashed-border forms. |
| `Icon` | lucide-react | Yes | Wrapped, not imported at call sites: the wrapper pins stroke 1.8 and the name map keeps the set small. |
| `Rule` | Separator | Yes | The hairline inside a card. |
| `Disclosure` | Collapsible | Yes | Backs "Why is this here?". |
| `Menu` | Menu | M4 | Backs the defer presets in `RevisitControl`. |
| `Tooltip` | Tooltip | No | Not on any screen. Do not generate it. |
| `Dialog` | Dialog | No | The journey has no modal. Adding one is a design change, not a component. |

Twelve icons, and no more without a reason: target, clock, bookmark, pause,
tray, chevron-down, arrow-right, arrow-left, plus, dot, check, question.

The icon set is **lucide-react**, behind the `Icon` wrapper. Importing lucide
directly at a call site is the anti-pattern the wrapper exists to prevent: it
is how stroke weights and sizes drift apart, and how the set quietly grows.
Adding an icon is an edit to the map in `icon.tsx`, which is the point.

Lucide's default stroke of 2 reads heavy beside Public Sans, so the wrapper
defaults to 1.8. It tree-shakes: the twelve icons cost under 6 kB.

The `.dc.html` mockups in `design/` still carry inline SVG, because they are
static hand-authored HTML and cannot import a package. Match their look from
lucide rather than porting their paths.

### What primitives must cover before they are done

Every primitive ships with: default, hover, focus-visible, active, disabled;
both themes; and a reduced-motion path. A primitive with only a default state
is not finished, it is a screenshot.

## Layer 2: the Righteo components

These exist because they encode an invariant. Each entry names the invariant it
enforces, because that is the reason it is a component rather than a div.

| Component | Invariant it enforces | Used on |
| --- | --- | --- |
| `ProvenanceMark` | Narration, evidence and inference stay distinguishable, by border style as well as colour | All three screens |
| `OutcomeLine` | The only element allowed to carry the highlighter. Preserved verbatim; passive activity can never overwrite it | Today, detail, components sheet |
| `NowLine` | State, not history. One or two sentences, never a log | Today, detail |
| `NextActions` | Accepts a tuple of at most three. The cap is a type, not a review comment | Today, detail |
| `NextAction` | Carries Defer and Park inline, so parking is as easy as doing | Detail |
| `BlockedNote` | Renders nothing when there is no blocker. No empty field, no green all-clear | Today, detail |
| `ProjectCard` | Composes the four fields. Emphasis is a prop derived from the working set, never a stored status. Collapsed by default: identity, outcome, now, and the one next move. Everything else waits behind the disclosure | Today |
| `EmphasisSurface` | The four levels, each with a cue that is not colour | Today |
| `PeripheralLine` | One line of names, not tiles. Giving every live project a card is how Today becomes a wall | Today |
| `NarrateSurface` | No project, priority or date field. Ever | Today |
| `ChangeSummary` / `ChangeRow` | Every line carries provenance. Describes compression, not task creation | Reconciliation |
| `ClarifyingQuestions` | At most three, and skipping is always allowed | Reconciliation |
| `EvidenceList` / `EvidenceRow` | Says what appears to have happened, never that it mattered | Detail |
| `WhyIsThisHere` | Shows the trail and the interpretation, never internal reasoning | Detail |
| `RevisitControl` | Defer, park and drop read as successful outcomes | Detail |
| `CorrectionActions` | Correction is a one-click aside, not a form | Detail |
| `OrientationHeader` | Counts are descriptive. No score, no streak, no red | Today |
| `SectionLabel` | The only place uppercase is allowed | All three screens |

### Two type-level commitments

These are the ones worth writing down before anyone opens an editor, because
they are cheap now and expensive later:

```ts
type NextActionList = [] | [Action] | [Action, Action] | [Action, Action, Action]

type Emphasis = 'focal' | 'active' | 'peripheral' | 'parked'
// derived at render time from the working set.
// It must not appear on the persisted ProjectState type.
```

If `Emphasis` ever becomes a column, the product has quietly turned into a
workflow engine and the design language's warning about permanent statuses has
been ignored.

## Keeping Today quiet

Today is the screen most likely to drift back into a checklist, so the
constraints are written down rather than left to taste:

- **No structural labels on a collapsed card.** A stack of labelled fields
  reads as a form. Typography carries the hierarchy instead: outcome in body
  with the highlighter, now in muted secondary, the next move in ink.
- **No bullets or boxes on next actions.** A bulleted list of three is exactly
  the shape the product is not. A single directional arrow, and only for the
  immediate move.
- **One next action visible, the rest behind the disclosure.** The card answers
  "what is this and what is the one move", not "what are all the moves".
- **Two full cards by default.** Three is defensible; five is the wall of
  equal-priority cards the design language warns about.
- **Everything else is one line of names.** Not tiles, not cards.
- **The window is narrow on purpose.** This is a desk tool, not a dashboard,
  and a wide canvas invites filling.

## What we deliberately do not build

- A table or data grid. There is no tabular data in this product.
- A generic modal or drawer system. The journey has no modal.
- A toast or notification-badge system. The hub owns notifications, and badges
  are attention-seeking chrome.
- A theme switcher beyond following the system, until someone asks.
- Skeleton loaders. Reconciliation is the only slow operation and it deserves a
  designed waiting state, not a shimmer.
- Any component whose name contains "Widget", "Panel" or "Container".

## What exists now

Running in `apps/desktop` at `pnpm dev`, behind a review harness with four
routes: `/today`, `/reconciliation`, `/project`, `/design`.

- **Tokens**, both themes, as CSS custom properties in one file
  (`src/styles/tokens.css`). Dark is a real palette, not a filter.
- **Primitives**: `Text`, `Stack`, `Grid`, `Rule`, `Surface`, `Button`, `Icon`,
  `Chip`, `TextArea`, `Disclosure`.
- **Righteo layer**: `ProvenanceMark`, `SectionLabel`, `OutcomeLine`, `NowLine`,
  `NextActions`, `BlockedNote`, `ProjectCard`, `PeripheralLine`,
  `NarrateSurface`, `ChangeSummary`, `ClarifyingQuestions`, `ParkedList`,
  `EvidenceList`, `WhyIsThisHere`, `RevisitControl`, `CorrectionActions`,
  `OrientationHeader`.
- **Screens**: Today, reconciliation result, project detail, all from mock data.

Verified rather than asserted: a fourth next action is a compile error, and no
file under `src/ui/` or `src/screens/` contains a literal colour.

View state lives in the URL, never in `useState`: the design tab is `?tab=`, and
Today's working-set size is `?set=`, so any view can be linked and reloaded.

`ReviewShell` in `src/design/` is a harness, not product chrome. The real app
has one journey and no top nav. Delete it when M0 wires real navigation.

Still to build: `Menu` (defer presets), and the empty, loading and error states
for every screen. Nothing here has a waiting state yet, which reconciliation
will need.

## Build order

1. **Tokens as CSS custom properties, both themes, in one definition.** Every
   defect in the last design review was a rule that held in light and was lost
   in dark. One definition is the fix.
2. `Text`, `Stack`, `Surface`, `Icon`. Enough to render something.
3. `ProvenanceMark` and `SectionLabel`. Small, and they set the conventions the
   rest inherit.
4. `OutcomeLine`, `NowLine`, `NextActions`, `BlockedNote`, then `ProjectCard`.
5. Today, from a fixture. This is M0 done.
6. `NarrateSurface`, `ChangeSummary`, `ClarifyingQuestions`. This is what M2
   needs.
7. Detail-screen components last. They are the largest group and the least
   risky, because by then the vocabulary is settled.

## Verification

A component is done when it renders in both themes, covers its states, has no
literal colour or font size in its source, and its invariant is enforced by the
type rather than by a comment. A screen is done when it composes only Righteo
components and contains no inline style.

The mockups in `design/` are the reference for appearance, not the source of
truth for structure: they are hand-authored HTML and their spacing is optical.
Match their look, not their markup.
