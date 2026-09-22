import { Button } from "@/ui/primitives/button";
import { Icon } from "@/ui/primitives/icon";
import { Stack } from "@/ui/primitives/layout";
import { Text } from "@/ui/primitives/text";

/** Deferring, parking and dropping are successful outcomes, not failures. */
export function RevisitControl() {
  return (
    <div className="flex items-center gap-[9px] flex-wrap">
      <Button variant="outline">
        <Icon name="clock" size={14} className="text-ink-muted" />
        Friday morning
      </Button>
      <Button variant="outline">
        <Icon name="tray" size={14} className="text-ink-muted" />
        Park it
      </Button>
      <Button variant="quiet">Drop it</Button>
    </div>
  );
}

/** A one-click aside, never a form. */
export function CorrectionActions() {
  return (
    <Stack gap={10}>
      <Text role="secondary" className="text-ink-muted">
        Not right?
      </Text>
      <div className="flex items-center gap-[9px] flex-wrap">
        <Button variant="outline">Rewrite the outcome</Button>
        <Button variant="outline">This belongs to another project</Button>
        <Button variant="outline">This is finished</Button>
      </div>
    </Stack>
  );
}

/**
 * Counts are descriptive, never a score. No streak, no red, no badge.
 */
export function OrientationHeader({
  greeting,
  account,
  date,
}: {
  greeting: string;
  account: string;
  date: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 flex-wrap">
      <Stack gap={7}>
        <Text role="display" as="h1">
          {greeting}
        </Text>
        <Text role="body" className="text-ink-muted max-w-[560px]">
          {account}
        </Text>
      </Stack>
      <span className="font-mono text-[12px] tracking-[0.04em] text-ink-muted uppercase">
        {date}
      </span>
    </div>
  );
}
