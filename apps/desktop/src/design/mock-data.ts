import type { ProjectState } from "@/domain/types";
import type { Change, Question } from "@/ui/components/reconciliation";
import type { EvidenceItem } from "@/ui/components/evidence";

/**
 * Fictional projects only. This repository is public: see AGENTS.md.
 * Realistic in texture on purpose, because lorem ipsum hides the hierarchy
 * problems that matter here.
 */
export const HARBOUR: ProjectState = {
  id: "harbour",
  name: "Harbour",
  outcome: {
    text: "Players can see what changed in their scene without asking in chat.",
    provenance: "narrated",
  },
  now: {
    text: "Activity feed renders from the events table. Ranking recalc still runs off the old cron path.",
    provenance: "observed",
  },
  next: [
    { id: "h1", text: "Point recalc at the events table" },
    { id: "h2", text: "Settle the forum schema before the migration" },
    { id: "h3", text: "Review the tournament import PR" },
  ],
  sessionCount: 11,
  sources: ["claude", "git"],
};

export const LEDGER: ProjectState = {
  id: "ledger",
  name: "Ledger",
  outcome: {
    text: "The season runs on the new data model with no manual reconciliation.",
    provenance: "inferred",
  },
  now: {
    text: "Migration passes on staging. Production cutover is not scheduled.",
    provenance: "observed",
  },
  next: [
    { id: "l1", text: "Dry-run against a production snapshot" },
    { id: "l2", text: "Pick a cutover window" },
  ],
  blocked: {
    text: "Cutover needs a sign-off date. Asked Tuesday, nothing back.",
    provenance: "narrated",
  },
  sessionCount: 4,
  sources: ["git"],
};

export const TOOLBOX: ProjectState = {
  id: "toolbox",
  name: "Toolbox",
  outcome: {
    text: "One command sets up a new machine without a checklist.",
    provenance: "narrated",
  },
  now: {
    text: "Quiet since Friday. The installer works; the uninstall path is untested.",
    provenance: "observed",
  },
  next: [{ id: "t1", text: "Test the uninstall path on a clean machine" }],
  sessionCount: 2,
  sources: ["git"],
};

export const SKIRMISH: ProjectState = {
  id: "skirmish",
  name: "Skirmish",
  outcome: {
    text: "Players can build a list on a phone without pinching to zoom.",
    provenance: "narrated",
  },
  now: {
    text: "Release candidate is cut. You asked to keep the check until Friday.",
    provenance: "narrated",
  },
  next: [{ id: "s1", text: "Release check, Friday morning" }],
  sessionCount: 1,
  sources: ["git"],
};

export const RIGHTEO: ProjectState = {
  id: "righteo",
  name: "Righteo",
  outcome: {
    text: "A working set that survives a week away from a project.",
    provenance: "narrated",
  },
  now: {
    text: "Design system runs. No collector, no storage, no reconciliation yet.",
    provenance: "observed",
  },
  next: [
    { id: "r1", text: "Decide three cards or five on Today" },
    { id: "r2", text: "Stand up the Claude Code transcript collector" },
  ],
  sessionCount: 6,
  sources: ["claude", "git"],
};

/** Ordered as the working set, focal first. Emphasis is never stored. */
export const WORKING_SET: readonly ProjectState[] = [
  HARBOUR,
  LEDGER,
  RIGHTEO,
  TOOLBOX,
  SKIRMISH,
];

export const PERIPHERAL = [
  { name: "Toolbox", note: "Quiet since Friday" },
  { name: "Righteo", note: "Design docs, no code yet" },
  { name: "Skirmish", note: "Release check kept for Friday" },
] as const;

export const CHANGES: readonly Change[] = [
  {
    id: "c1",
    icon: "target",
    text: "Focused Harbour around the activity feed.",
    provenance: "narrated",
  },
  {
    id: "c2",
    icon: "clock",
    text: "Moved the Skirmish release check to Friday.",
    provenance: "narrated",
  },
  {
    id: "c3",
    icon: "bookmark",
    text: "Kept the forum schema as a decision, not a task list.",
    provenance: "narrated",
  },
  {
    id: "c4",
    icon: "pause",
    text: "Ledger looks blocked on a sign-off date rather than on code.",
    provenance: "inferred",
  },
  {
    id: "c5",
    icon: "tray",
    text: "Two unrelated ideas went to the parking lot.",
    provenance: "narrated",
  },
];

export const QUESTION: Question = {
  id: "q1",
  text: "Is the import PR more important than the Ledger migration this morning?",
  options: ["The import PR first", "Ledger migration first"],
};

export const PARKED: readonly string[] = [
  "Try a menu-bar spike",
  "Look at how other tools do keyboard navigation",
];

export const HARBOUR_TRAIL: readonly EvidenceItem[] = [
  {
    id: "t1",
    source: "narration · wed 8:14",
    detail: "“Harbour is the main thing today, the feed is nearly there”",
  },
  {
    id: "t2",
    source: "claude · tue 16:02",
    detail: "Session touched src/feed/events.ts and src/rank/recalc.ts",
  },
  { id: "t3", source: "git · tue 17:40", detail: "4 commits on feed-events, none on main" },
];

export const HARBOUR_EVIDENCE: readonly EvidenceItem[] = [
  { id: "e1", source: "claude", detail: "11 sessions" },
  { id: "e2", source: "git", detail: "4 commits" },
  { id: "e3", source: "git", detail: "branch feed-events" },
  { id: "e4", source: "claude · tue 16:02", detail: "Touched src/feed/events.ts" },
  { id: "e5", source: "narration · wed 8:14", detail: "The feed is nearly there" },
];
