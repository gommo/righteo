# Lessons

Corrections that are general enough to be worth persisting. Review at session
start. After any correction from the maintainer, ask before adding an entry: is this
mistake general, or was it a one-off?

Format:

```
### YYYY-MM-DD: [Short description]
**Mistake:** What was done wrong.
**Correction:** What the user corrected.
**Rule:** The principle to follow going forward.
```

---

### 2026-08-19: Trust the corroborating detail, not the option label

**Mistake:** Presented three design directions labelled A (paper and graphite),
B (morning light on a dark desk) and C (native macOS utility). The maintainer replied
"I like the morning light one, we'd want a dark mode of that". I matched on the
label and built the entire token set, component sheet and four screens on B.
They had meant A.

**Correction:** "I wanted Direction A." The whole system had to be rebuilt
in the other direction.

**Rule:** The clue was in the same sentence and I explained it away: "we'd want
a dark mode of that" only makes sense for a light direction, and B was already
dark. When any detail in a choice contradicts the option that appears to have
been named, the detail wins, because the labels are mine and the description is
theirs. Name options after the visible material (warm paper, dark board) rather
than with poetic names that can attach to more than one option. Before building
anything substantial on a choice, state which option is being proceeded with in
one line, so a mismatch costs a sentence instead of a rebuild.
