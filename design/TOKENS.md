# Righteo design tokens: direction A, paper and graphite

Provisional. This is the token contract every artboard and, later, every
component must use. Values are literal because `.dc.html` artboards carry
inline styles; in the app these become CSS custom properties.

Light is the primary environment: this direction is paper, graphite and a
highlighter. Dark is a designed counterpart, not an inversion. Paper does not
become black; the material changes from paper to a graphite board, the
highlighter becomes a warm lamp mark, and the action button flips to cream so
it stays the darkest-to-lightest contrast on the page either way.

## Colour

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `canvas` | `#f5f2ea` | `#1c1b18` | Window background |
| `surface` | `#fffdf7` | `#24231f` | Cards, narrate surface |
| `surface-sunken` | `#f2efe6` | `#1f1e1a` | Blocked note, parked rows |
| `border` | `#ddd6c7` | `#35332d` | Card edge |
| `rule` | `#e0dacd` | `#2e2c27` | Hairline inside a card |
| `ink` | `#23211d` | `#ede9df` | Outcome, titles, next actions |
| `ink-secondary` | `#4c4840` | `#c3bdb0` | The Now line, body detail |
| `ink-muted` | `#6b6659` | `#948e80` | Labels, meta, peripheral copy |
| `ink-faint` | `#7a7466` | `#8f8a7c` | Placeholder only. Never body copy. |
| `highlight-wash` | `#f6e3b4` | `rgba(224,174,84,0.26)` | The mark under the outcome line |
| `highlight-mark` | `#d9a441` | `#e0ae54` | Bullets and small non-text marks. **Never text.** |
| `highlight-strong` | `#9a6316` | `#f0c473` | Links, structural labels that lead somewhere, component names |
| `link-hover` | `#74490f` | `#f8dda6` | Hover on a link |
| `evidence` | `#465b66` | `#9db4bd` | Evidence text and provenance chips |
| `evidence-bg` | `#e2e9ec` | `rgba(157,180,189,0.13)` | Provenance chip background |
| `action` | `#23211d` | `#ede9df` | The Righteo button fill |
| `on-action` | `#f8f4ea` | `#23211d` | Text on the Righteo button |

Every text token above clears 4.5:1 on its own surface in both modes,
`ink-faint` included, so placeholders stay readable.

There is no red. Lateness and incompletion get no colour at all.

The action button is always the inverse of the page: graphite on paper, cream
on the board. It is the one deliberately loud object, and it is loud through
contrast rather than through saturation.

## Type

- Display: **Literata**. Sheet title 38/1.05, greeting and project-detail title
  34/1.1, narrate prompt 19/1.3, project card title 20/1.2, detail outcome
  17/1.4, peripheral tile title 15/1.3. Never used below 15px.
- Interface: **Public Sans**. Body 15/1.45, list 14/1.45, secondary 13/1.45,
  meta 12/1.4.
- Evidence: **IBM Plex Mono**. Evidence 11 to 12, structural labels 10
  uppercase with 0.11em tracking.

Those are the sizes in use. Anything outside this list is drift, not a
decision.

Mono means "this came from a machine". Never use it for state the user wrote.
Uppercase is reserved for the structural labels (OUTCOME, NOW, NEXT, BLOCKED,
PRIMARY, ALSO ACTIVE, NARRATE).

## The highlighter

The signature of this direction. The outcome line, and only the outcome line,
carries a highlighter mark:

```css
background: linear-gradient(transparent 62%, #f6e3b4 62%);
```

It marks the one sentence that must survive everything else on the card. Do not
use it for emphasis anywhere else, or it stops meaning anything.

## Space, radius, elevation

- Space: a 2px base. Structural rhythm (section gaps, card padding, column
  gutters) uses the coarse steps **8, 14, 18, 22, 30, 44**. Inside a component,
  the finer steps **4, 6, 7, 9, 10, 12, 13, 15, 16, 20, 24, 26** are allowed
  where optical alignment beats grid purity.

  This is deliberately not a strict 4/8 grid. A card whose padding is 22 and
  whose internal gaps are 17 reads better than one snapped to 24 and 16, and
  the earlier attempt at a nine-value scale was contradicted on nearly every
  line of every artboard. The rule that matters is that structural spacing is
  consistent across screens, not that every number divides by four.
- Radius: 4 chip, 7 control, 8 tile, 10 card.
- Cards sit on the page like paper: a 1px border plus a shadow no larger than
  `0 2px 5px rgba(35,33,29,0.05)`. In dark mode the shadow is dropped entirely
  and the border does the work.

## Focus

`box-shadow: 0 0 0 3px rgba(217,164,65,0.42)` plus a `1px solid` highlight-mark
border, in both modes. Focus is always visible, never suppressed on mouse
input.

## Motion

- 120ms: control feedback.
- 220ms: a card changing emphasis level.
- 320ms: narration fragments folding into a project; deferred work receding.
- Easing `cubic-bezier(0.2, 0, 0, 1)`.
- Under `prefers-reduced-motion`, every one of these becomes an instant state
  change. No essential meaning may live in the transition itself.

## The emphasis ladder

Emphasis is derived from the working set at render time. It is not a status
field and must never be persisted as one.

| Level | Light treatment | Redundant cue |
| --- | --- | --- |
| Focal | `surface`, `border`, shadow, highlighted outcome | Ordinal `01` in `ink`, first position |
| Active | `surface`, `border`, no shadow, unhighlighted outcome | Ordinal `02`, `03` in `ink-muted` |
| Peripheral | `surface-sunken`, no border, 15px title | Under the ALSO ACTIVE label |
| Parked | No fill, `ink-muted`, inset left rule | Under a PARKED label, in words |

This direction spends the highlighter rather than luminance on the top step, so
every level also carries a cue that is not colour: the ordinal, the label it
sits under, or the absence of the mark.

## Provenance marks

Three variants, distinguished by border style as well as colour, so the
distinction survives greyscale and colour blindness:

- `narrated`: filled `evidence-bg`, no border. The user said it.
- `observed`: `evidence-bg` with a 1px solid `evidence` border. A collector
  saw it.
- `inferred`: transparent with a 1px dashed `evidence` border. The model
  concluded it.

## Invariants the components enforce

- `NextActions` accepts at most three actions.
- `BlockedNote` renders nothing when there is no blocker.
- `ClarifyingQuestions` accepts at most three questions.
- Emphasis is a prop derived from the working set, never a stored field.
- `OutcomeLine` is the only element allowed to carry the highlighter.
