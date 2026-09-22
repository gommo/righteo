# Skills

Canonical home for this repository's agent skills. One directory per skill,
each containing a `SKILL.md` with `name` and `description` frontmatter.

```text
.agents/skills/<name>/SKILL.md
```

`.claude/skills` is a symlink to this directory, because Claude Code hardcodes
skill discovery to `.claude/skills/<name>/SKILL.md`. Add skills here, never
through the symlink, and never duplicate a skill on both paths.

Instructions live in `AGENTS.md` at the repository root. Skills are invocable
procedures, not instructions: if something must hold for every task, it is a
rule in `AGENTS.md` instead.

Validate with `claude plugin validate .agents/skills`, using the real path.
Passing `.claude/skills` silently validates nothing, because the validator does
not follow symlinks. Skill loading in a session does follow it.
