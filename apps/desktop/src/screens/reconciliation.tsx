import { Button } from "@/ui/primitives/button";
import { Stack } from "@/ui/primitives/layout";
import { Text } from "@/ui/primitives/text";
import {
  ChangeSummary,
  ClarifyingQuestions,
  ParkedList,
} from "@/ui/components/reconciliation";
import { CHANGES, PARKED, QUESTION } from "@/design/mock-data";

/**
 * The screen the product lives or dies on. It must read as compression and
 * relief, not as eleven tasks being created.
 */
export function ReconciliationScreen() {
  return (
    <Stack gap={40}>
      <Stack gap={8}>
        <Text role="display" as="h1">
          Righteo.
        </Text>
        <Text role="body" className="text-ink-muted max-w-[620px]">
          I folded eleven thoughts into three active projects, parked two and kept one
          question.
        </Text>
      </Stack>

      <ChangeSummary changes={CHANGES} />

      <ClarifyingQuestions questions={[QUESTION]} />

      <ParkedList items={PARKED} />

      <div className="flex items-center gap-3 flex-wrap pt-[6px]">
        <Button variant="action">Accept all</Button>
        <Button variant="outline">Correct one thing</Button>
        <Button variant="quiet">Show the raw narration</Button>
      </div>
    </Stack>
  );
}
