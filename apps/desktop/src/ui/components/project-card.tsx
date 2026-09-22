import { useState } from "react";
import type { Claim, Emphasis, NextActionList, ProjectState } from "@/domain/types";
import { Icon } from "@/ui/primitives/icon";
import { Stack } from "@/ui/primitives/layout";
import { Surface } from "@/ui/primitives/surface";
import { SectionLabel, Text } from "@/ui/primitives/text";
import { ProvenanceMark } from "./provenance-mark";

/** The only element allowed to carry the highlighter. */
export function OutcomeLine({ claim, marked }: { claim: Claim; marked: boolean }) {
  return (
    <Text role="body" className="text-pretty">
      <span className={marked ? "highlighted" : undefined}>{claim.text}</span>
    </Text>
  );
}

export function NowLine({ claim }: { claim: Claim }) {
  return (
    <p className="text-[13px] leading-[1.5] text-ink-muted text-pretty">{claim.text}</p>
  );
}

/**
 * Next moves, not a checklist. No bullets, no boxes, no counter: a bulleted
 * list of three is the shape the product is trying not to be. The card shows
 * the immediate move and keeps the rest behind the disclosure.
 */
export function NextActions({ actions }: { actions: NextActionList }) {
  if (actions.length === 0) return null;
  return (
    <Stack gap={8}>
      <SectionLabel>Next</SectionLabel>
      <Stack gap={7}>
        {actions.map((action) => (
          <div key={action.id} className="flex gap-[10px] items-baseline">
            <Icon
              name="arrow-right"
              size={13}
              className="text-highlight-mark shrink-0 translate-y-[2px]"
            />
            <span className="text-[14px] leading-[1.45] text-ink">{action.text}</span>
          </div>
        ))}
      </Stack>
    </Stack>
  );
}

/** Renders nothing when there is no blocker. No empty field, no all-clear. */
export function BlockedNote({ claim }: { claim: Claim | undefined }) {
  if (!claim) return null;
  return (
    <div className="bg-surface-sunken rounded-tile px-[14px] py-[11px] flex items-baseline gap-[10px]">
      <Icon name="pause" size={13} className="text-ink-muted shrink-0 translate-y-[2px]" />
      <p className="text-[13px] leading-[1.45] text-ink-secondary text-pretty">
        {claim.text}
      </p>
    </div>
  );
}

/**
 * A five-second scan: who, what success means, where it got to, the one move
 * that matters. Everything else waits behind the disclosure or lives on the
 * project detail. Structural labels are deliberately absent when collapsed,
 * because a stack of labelled fields reads as a form.
 */
export function ProjectCard({
  project,
  emphasis,
  ordinal,
}: {
  project: ProjectState;
  emphasis: Extract<Emphasis, "focal" | "active">;
  ordinal: string;
}) {
  const [open, setOpen] = useState(false);
  const focal = emphasis === "focal";
  const [first, ...rest] = project.next;

  return (
    <Surface level={focal ? "raised" : "flat"} className="px-[22px] pt-[20px] pb-[16px]">
      <Stack gap={14}>
        <div className="flex items-baseline gap-[10px]">
          <span className={`font-mono text-[11px] ${focal ? "text-ink" : "text-ink-muted"}`}>
            {ordinal}
          </span>
          <Text role="title" as="h3">
            {project.name}
          </Text>
        </div>

        <OutcomeLine claim={project.outcome} marked={focal} />
        <NowLine claim={project.now} />

        {first && (
          <div className="flex gap-[10px] items-baseline">
            <Icon
              name="arrow-right"
              size={13}
              className="text-highlight-mark shrink-0 translate-y-[2px]"
            />
            <span className="text-[14px] leading-[1.45] text-ink">{first.text}</span>
          </div>
        )}

        <BlockedNote claim={project.blocked} />

        {open && (
          <Stack gap={14} className="pt-[4px]">
            {rest.length > 0 && (
              <Stack gap={7}>
                {rest.map((action) => (
                  <div key={action.id} className="flex gap-[10px] items-baseline">
                    <Icon
                      name="arrow-right"
                      size={13}
                      className="text-ink-faint shrink-0 translate-y-[2px]"
                    />
                    <span className="text-[14px] leading-[1.45] text-ink-secondary">
                      {action.text}
                    </span>
                  </div>
                ))}
              </Stack>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              <ProvenanceMark provenance={project.outcome.provenance} />
              <ProvenanceMark provenance={project.now.provenance} />
              <span className="font-mono text-[10px] text-evidence">
                {project.sessionCount} sessions · {project.sources.join(", ")}
              </span>
            </div>
          </Stack>
        )}

        <div className="flex items-center gap-3 pt-[2px]">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex items-center gap-[6px] text-[12px] text-ink-muted hover:text-ink cursor-pointer"
          >
            <Icon
              name="chevron-down"
              size={13}
              className={`transition-transform duration-[120ms] ${open ? "" : "-rotate-90"}`}
            />
            {open ? "Less" : rest.length > 0 ? `${rest.length} more` : "More"}
          </button>
          <span className="grow" />
          {open && (
            <button
              type="button"
              className="text-[12px] text-highlight-strong hover:text-link-hover cursor-pointer"
            >
              Why is this here?
            </button>
          )}
        </div>
      </Stack>
    </Surface>
  );
}

/**
 * One quiet line, not a tile. These projects are alive but not today's
 * business, and giving each a card is how Today becomes a wall.
 */
export function PeripheralLine({ names }: { names: readonly string[] }) {
  if (names.length === 0) return null;
  return (
    <div className="flex items-baseline gap-[10px] flex-wrap">
      {names.map((name, i) => (
        <span key={name} className="flex items-baseline gap-[10px]">
          {i > 0 && <span className="text-ink-faint">·</span>}
          <button
            type="button"
            className="text-[14px] text-ink-muted hover:text-ink cursor-pointer"
          >
            {name}
          </button>
        </span>
      ))}
    </div>
  );
}
