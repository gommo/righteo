import type { Emphasis } from "@/domain/types";
import { useSearchParam } from "@/lib/router";
import { Button } from "@/ui/primitives/button";
import { Grid, Stack } from "@/ui/primitives/layout";
import { SectionLabel, Text } from "@/ui/primitives/text";
import { OrientationHeader } from "@/ui/components/controls";
import { NarrateSurface } from "@/ui/components/narrate-surface";
import { PeripheralLine, ProjectCard } from "@/ui/components/project-card";
import { WORKING_SET } from "@/design/mock-data";

const ORDINALS = ["01", "02", "03", "04", "05"] as const;

/**
 * Emphasis is derived here, at render time, from position in the working set.
 * It is never read from a project and never written back. See D-014.
 *
 * Projects past the card count become one quiet line below, so a card is only
 * ever focal or active and the type says so.
 */
type CardEmphasis = Extract<Emphasis, "focal" | "active">;

function emphasisFor(index: number): CardEmphasis {
  return index === 0 ? "focal" : "active";
}

export function TodayScreen() {
  const [size, setSize] = useSearchParam("set", "two");
  const fullCards = size === "five" ? 5 : size === "three" ? 3 : 2;

  const cards = WORKING_SET.slice(0, fullCards);
  const rest = WORKING_SET.slice(fullCards);

  return (
    <Stack gap={30}>
      <OrientationHeader
        greeting="Morning Sam"
        account="You touched five projects yesterday. Two look like the main thread."
        date="Wed 19 Aug"
      />

      <NarrateSurface />

      <Grid columns={2}>
        {cards.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            emphasis={emphasisFor(i)}
            ordinal={ORDINALS[i] ?? "0"}
          />
        ))}
      </Grid>

      {rest.length > 0 && (
        <Stack gap={10}>
          <SectionLabel>Also active</SectionLabel>
          <PeripheralLine names={rest.map((p) => p.name)} />
        </Stack>
      )}

      {/* Review control, not product chrome. Answers the open question in docs/mvp.md. */}
      <div className="flex items-center gap-2 pt-[10px] border-t border-rule">
        <Text role="meta">Working set</Text>
        {(["two", "three", "five"] as const).map((s) => (
          <Button
            key={s}
            variant="quiet"
            onClick={() => setSize(s)}
            className={size === s ? "text-ink" : ""}
          >
            {s}
          </Button>
        ))}
      </div>
    </Stack>
  );
}
