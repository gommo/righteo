# Righteo documentation

This folder is the shared product memory for humans, Codex and Claude.

## Source-of-truth map

| Document | Purpose | Status |
| --- | --- | --- |
| [Product](product.md) | Problem, promise, boundaries and first-release scope | Active |
| [MVP](mvp.md) | The smallest slice worth building, and its acceptance test | Proposal |
| [UI inventory](ui-inventory.md) | Primitives, components and build order | Proposal |
| [Experience](experience.md) | Daily loop, screens and interaction behaviour | Draft |
| [Design language](design-language.md) | Visual, interaction and voice direction | Active |
| [Design tokens](../design/TOKENS.md) | The literal token contract for the chosen direction | Provisional |
| [Architecture](architecture.md) | System boundaries and provisional technology direction | Draft |
| [Domain model](domain-model.md) | Shared concepts and invariants | Draft |
| [Decisions](decisions.md) | Accepted and provisional decisions | Active |
| [Open questions](open-questions.md) | Choices still requiring design or validation | Active |
| [Legacy lessons](legacy-lessons.md) | What to retain and reject from two prior private systems | Active |

## The design canvas

The visual work lives in `design/` as `.dc.html` artboards plus `canvas.json`,
published as an editable canvas. It carries the chosen direction applied to
Today (dark and light), the reconciliation result and project detail, alongside
the token and component sheets. Edit the `.dc.html` files and re-seed; never
edit the generated `righteo-today-directions.html`.

## Suggested working order

For initial product-design work:

1. Refine `product.md` until the promise and exclusions are sharp.
2. Explore the morning loop and project cards in `experience.md`.
3. Turn `design-language.md` into a small visual system and two or three
   competing screen directions. **Done: see D-013.**
4. Resolve only the architecture needed to prototype those directions.
5. Record accepted choices in `decisions.md`.

Do not let the architecture document become a substitute for testing the core
experience.

## Documentation convention

- **Accepted** means agents may build against it.
- **Provisional** means it is the current direction but still needs validation.
- **Open** means no choice has been made.
- Evidence and external references should be linked directly.
- A material change should update the affected document and the decision log in
  the same change.

