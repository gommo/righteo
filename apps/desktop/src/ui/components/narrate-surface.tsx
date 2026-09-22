import { Button } from "@/ui/primitives/button";
import { Icon } from "@/ui/primitives/icon";
import { Stack } from "@/ui/primitives/layout";
import { Surface } from "@/ui/primitives/surface";
import { SectionLabel, Text } from "@/ui/primitives/text";

/**
 * No project, priority or date field. Ever. Adding one turns it back into a
 * task box, which is the thing this product is not.
 */
export function NarrateSurface() {
  return (
    <Surface className="px-[24px] pt-[22px] pb-[18px]">
      <Stack gap={16}>
        <Stack gap={10}>
          <span className="font-mono text-[10px] tracking-[0.11em] uppercase text-highlight-strong">
            Narrate
          </span>
          <textarea
            rows={2}
            placeholder="What's in your head today?"
            className="w-full resize-none bg-transparent border-0 p-0 font-display text-[19px] leading-[1.3] text-ink placeholder:text-ink-faint focus:outline-none"
          />
        </Stack>
        <div className="flex items-center justify-between gap-5 pt-[14px] border-t border-rule">
          <Text role="secondary" className="text-ink-faint">
            Paste a list, ramble, contradict yourself. No project or date needed.
          </Text>
          <Button variant="action">
            Righteo
            <Icon name="arrow-right" />
          </Button>
        </div>
      </Stack>
    </Surface>
  );
}

export { SectionLabel };
