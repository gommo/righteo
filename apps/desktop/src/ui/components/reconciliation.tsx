import type { Provenance } from "@/domain/types";
import { Button } from "@/ui/primitives/button";
import { Icon, type IconName } from "@/ui/primitives/icon";
import { Stack } from "@/ui/primitives/layout";
import { Surface } from "@/ui/primitives/surface";
import { SectionLabel, Text } from "@/ui/primitives/text";
import { ProvenanceMark } from "./provenance-mark";

export type Change = {
  id: string;
  icon: IconName;
  text: string;
  provenance: Provenance;
};

export type Question = {
  id: string;
  text: string;
  options: readonly [string, string];
};

/**
 * Describes compression, not task creation. Every line carries its provenance
 * so an inferred change never passes as something the user said.
 */
export function ChangeSummary({ changes }: { changes: readonly Change[] }) {
  return (
    <Stack gap={14}>
      <SectionLabel>What changed</SectionLabel>
      <Stack gap={10}>
        {changes.map((c) => (
          <div key={c.id} className="flex items-start gap-[11px]">
            <Icon name={c.icon} size={16} className="mt-[2px] shrink-0 text-highlight-strong" />
            <span className="text-[15px] leading-[1.45] grow text-ink">{c.text}</span>
            <ProvenanceMark provenance={c.provenance} />
          </div>
        ))}
      </Stack>
    </Stack>
  );
}

/**
 * At most three, and skipping is always allowed. The type caps it so a screen
 * cannot open an interrogation.
 */
export type QuestionList = readonly [] | readonly [Question] | readonly [Question, Question] | readonly [Question, Question, Question];

export function ClarifyingQuestions({ questions }: { questions: QuestionList }) {
  if (questions.length === 0) return null;
  return (
    <Stack gap={14}>
      <SectionLabel>
        {questions.length === 1 ? "One thing needs your call" : "A few things need your call"}
      </SectionLabel>
      <Stack gap={14}>
        {questions.map((q) => (
          <Surface key={q.id} level="raised" className="px-[22px] py-[20px]">
            <Stack gap={14}>
              <p className="font-display text-[20px] leading-[1.3] text-ink">
                <span className="highlighted">{q.text}</span>
              </p>
              <div className="flex items-center gap-[9px] flex-wrap">
                <Button variant="action">{q.options[0]}</Button>
                <Button variant="outline">{q.options[1]}</Button>
                <Button variant="quiet">Ask me later</Button>
              </div>
            </Stack>
          </Surface>
        ))}
      </Stack>
      <Text role="meta">
        Answering changes today's order. Skipping leaves it as it is.
      </Text>
    </Stack>
  );
}

export function ParkedList({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <Stack gap={12}>
      <SectionLabel>Parked</SectionLabel>
      <Text role="meta">Out of the way, not gone.</Text>
      <Stack gap={8}>
        {items.map((item) => (
          <div
            key={item}
            className="bg-surface-sunken rounded-tile px-[16px] py-[11px] flex items-center gap-3"
          >
            <Icon name="tray" size={14} className="text-ink-muted shrink-0" />
            <Text role="secondary" className="text-ink-muted">
              {item}
            </Text>
          </div>
        ))}
      </Stack>
    </Stack>
  );
}
