import { Stack } from "@/ui/primitives/layout";
import { SectionLabel, Text } from "@/ui/primitives/text";
import { Disclosure } from "@/ui/primitives/disclosure";

export type EvidenceItem = {
  id: string;
  source: string;
  detail: string;
};

/** Says what appears to have happened. Never that it mattered. */
export function EvidenceList({
  label,
  items,
}: {
  label: string;
  items: readonly EvidenceItem[];
}) {
  return (
    <Stack gap={12}>
      <SectionLabel>{label}</SectionLabel>
      <Stack gap={9}>
        {items.map((e) => (
          <div key={e.id} className="flex flex-col gap-[2px]">
            <span className="font-mono text-[10px] text-evidence">{e.source}</span>
            <Text role="meta">{e.detail}</Text>
          </div>
        ))}
      </Stack>
    </Stack>
  );
}

/**
 * The trail and the interpretation. Never internal reasoning: the user is owed
 * an explanation, not a transcript of the model thinking.
 */
export function WhyIsThisHere({
  trail,
  interpretation,
}: {
  trail: readonly EvidenceItem[];
  interpretation: string;
}) {
  return (
    <div className="bg-surface-sunken rounded-card px-[22px] py-[20px]">
      <Disclosure label="Why is this here?" defaultOpen>
        <Stack gap={16}>
          <Stack gap={12}>
            {trail.map((e) => (
              <div
                key={e.id}
                className="grid grid-cols-[148px_minmax(0,1fr)] gap-4 items-baseline"
              >
                <span className="font-mono text-[10px] text-evidence">{e.source}</span>
                <Text role="secondary">{e.detail}</Text>
              </div>
            ))}
          </Stack>
          <Text role="secondary" className="text-ink-muted">
            {interpretation}
          </Text>
        </Stack>
      </Disclosure>
    </div>
  );
}
