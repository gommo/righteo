/**
 * Product invariants live here as types, so a screen cannot quietly break one.
 * See docs/domain-model.md and D-014.
 */

/** Narration outranks observation, which outranks inference. */
export type Provenance = "narrated" | "observed" | "inferred";

export type Claim = {
  text: string;
  provenance: Provenance;
};

export type NextAction = {
  id: string;
  text: string;
};

/**
 * At most three. The cap is a type, not a review comment: there is no way to
 * pass a fourth action without a compiler error.
 */
export type NextActionList =
  | readonly []
  | readonly [NextAction]
  | readonly [NextAction, NextAction]
  | readonly [NextAction, NextAction, NextAction];

/**
 * Derived from the working set at render time. Deliberately absent from
 * ProjectState: if this ever becomes a persisted column, the product has
 * turned into a workflow engine. See docs/design-language.md.
 */
export type Emphasis = "focal" | "active" | "peripheral" | "parked";

export type ProjectState = {
  id: string;
  name: string;
  outcome: Claim;
  now: Claim;
  next: NextActionList;
  /** Absent means there is no blocker. Never an empty string. */
  blocked?: Claim;
  sessionCount: number;
  sources: readonly string[];
};
