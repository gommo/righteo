import type { Provenance } from "@/domain/types";
import { useSearchParam } from "@/lib/router";
import { Button } from "@/ui/primitives/button";
import { Icon, type IconName } from "@/ui/primitives/icon";
import { Grid, Rule, Stack } from "@/ui/primitives/layout";
import { Surface } from "@/ui/primitives/surface";
import { SectionLabel, Text } from "@/ui/primitives/text";
import { NarrateSurface } from "@/ui/components/narrate-surface";
import { ProvenanceMark } from "@/ui/components/provenance-mark";
import {
  BlockedNote,
  NextActions,
  PeripheralLine,
  ProjectCard,
} from "@/ui/components/project-card";
import { HARBOUR, LEDGER, PERIPHERAL } from "./mock-data";

const TABS = ["Foundations", "Primitives", "Components"] as const;
type Tab = (typeof TABS)[number];

const COLOUR_TOKENS = [
  ["canvas", "Window background"],
  ["surface", "Cards, narrate surface"],
  ["surface-sunken", "Blocked note, parked rows"],
  ["border", "Card edge"],
  ["rule", "Hairline inside a card"],
  ["ink", "Outcome, titles, next actions"],
  ["ink-secondary", "The Now line, body detail"],
  ["ink-muted", "Labels, meta, peripheral copy"],
  ["ink-faint", "Placeholder only. Never body copy."],
  ["highlight-wash", "The mark under the outcome line"],
  ["highlight-mark", "Bullets and small marks. Never text."],
  ["highlight-strong", "Links and Why is this here?"],
  ["evidence", "Evidence text and provenance chips"],
  ["evidence-bg", "Provenance chip background"],
  ["action", "The Righteo button fill"],
  ["on-action", "Text on the Righteo button"],
] as const;

const PROVENANCES: readonly Provenance[] = ["narrated", "observed", "inferred"];

const ICON_NAMES: readonly IconName[] = [
  "target",
  "clock",
  "bookmark",
  "pause",
  "tray",
  "chevron-down",
  "arrow-right",
  "arrow-left",
  "plus",
  "dot",
  "check",
  "question",
];

function Section({ name, note, children }: { name: string; note: string; children: React.ReactNode }) {
  return (
    <Stack gap={14}>
      <div className="flex items-baseline gap-[14px] flex-wrap">
        <span className="font-mono text-[13px] text-highlight-strong">{name}</span>
        <Text role="secondary" className="text-ink-muted">
          {note}
        </Text>
      </div>
      {children}
    </Stack>
  );
}

function Foundations() {
  return (
    <Stack gap={44}>
      <Section name="Colour" note="One definition, both themes. Toggle the theme to check every pair.">
        <Stack gap={10}>
          {COLOUR_TOKENS.map(([token, use]) => (
            <div key={token} className="flex items-center gap-[14px]">
              <span
                className="w-[56px] h-[32px] rounded-chip border border-border-token shrink-0"
                style={{ background: `var(--${token})` }}
              />
              <span className="font-mono text-[12px] text-ink w-[150px] shrink-0">{token}</span>
              <Text role="meta">{use}</Text>
            </div>
          ))}
        </Stack>
      </Section>

      <Section name="Type" note="Roles, not sizes. A caller never passes a font size.">
        <Stack gap={14}>
          <Text role="display">Morning Sam</Text>
          <Text role="title">Harbour</Text>
          <Text role="body">
            Players can see what changed in their scene without asking in chat.
          </Text>
          <Text role="secondary">Cutover needs a sign-off date. Asked Tuesday, nothing back.</Text>
          <Text role="mono">git · 4 commits on feed-events</Text>
          <SectionLabel>Outcome · Now · Next · Blocked</SectionLabel>
        </Stack>
      </Section>

      <Section name="The highlighter" note="Only OutcomeLine may carry it. Used elsewhere it stops meaning anything.">
        <Surface className="px-[20px] py-[18px]">
          <Text role="body">
            <span className="highlighted">
              Players can see what changed in their scene without asking in chat.
            </span>
          </Text>
        </Surface>
      </Section>
    </Stack>
  );
}

function Primitives() {
  return (
    <Stack gap={44}>
      <Section name="Button" note="Three variants and no more. Action is always the inverse of the page.">
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="action">
            Righteo
            <Icon name="arrow-right" />
          </Button>
          <Button variant="outline">Correct one thing</Button>
          <Button variant="quiet">Show the raw narration</Button>
        </div>
      </Section>

      <Section name="Surface" note="Raised carries the shadow. In dark mode the shadow token resolves to none.">
        <Grid columns={3} gap={14}>
          <Surface level="raised" className="p-[16px]">
            <Text role="meta">raised</Text>
          </Surface>
          <Surface level="flat" className="p-[16px]">
            <Text role="meta">flat</Text>
          </Surface>
          <Surface level="sunken" className="p-[16px]">
            <Text role="meta">sunken</Text>
          </Surface>
        </Grid>
      </Section>

      <Section
        name="Icon"
        note="Lucide behind a wrapper, at stroke 1.8. Adding one means editing the map, which keeps the set small."
      >
        <div className="flex items-center gap-4 text-ink flex-wrap">
          {ICON_NAMES.map((n) => (
            <span key={n} className="flex flex-col items-center gap-2">
              <Icon name={n} size={20} />
              <span className="font-mono text-[10px] text-ink-muted">{n}</span>
            </span>
          ))}
        </div>
      </Section>

      <Section name="Rule" note="The hairline inside a card.">
        <Rule />
      </Section>
    </Stack>
  );
}

function Components() {
  return (
    <Stack gap={44}>
      <Section name="ProvenanceMark" note="Border style carries the distinction, so it survives greyscale.">
        <div className="flex items-center gap-3">
          {PROVENANCES.map((p) => (
            <ProvenanceMark key={p} provenance={p} />
          ))}
        </div>
      </Section>

      <Section name="NarrateSurface" note="No project, priority or date field. Ever.">
        <NarrateSurface />
      </Section>

      <Section name="ProjectCard" note="Emphasis is a prop derived from the working set, never a stored field.">
        <Grid columns={2}>
          <ProjectCard project={HARBOUR} emphasis="focal" ordinal="01" />
          <ProjectCard project={LEDGER} emphasis="active" ordinal="02" />
        </Grid>
      </Section>

      <Section name="NextActions" note="Takes a tuple of at most three. A fourth is a compiler error.">
        <Surface className="px-[22px] py-[20px]">
          <NextActions actions={HARBOUR.next} />
        </Surface>
      </Section>

      <Section name="BlockedNote" note="Renders nothing when there is no blocker. No empty field, no all-clear.">
        <Grid columns={2}>
          <BlockedNote claim={LEDGER.blocked} />
          <Surface level="sunken" className="px-[16px] py-[14px]">
            <Text role="meta">Harbour has no blocker, so the component renders null.</Text>
          </Surface>
        </Grid>
      </Section>

      <Section
        name="PeripheralLine"
        note="One quiet line, not tiles. Giving every live project a card is how Today becomes a wall."
      >
        <PeripheralLine names={PERIPHERAL.map((p) => p.name)} />
      </Section>
    </Stack>
  );
}

export function DesignShowcase() {
  const [tabParam, setTab] = useSearchParam("tab", "Foundations");
  const tab: Tab = (TABS as readonly string[]).includes(tabParam)
    ? (tabParam as Tab)
    : "Foundations";

  return (
    <Stack gap={30}>
      <Stack gap={8}>
        <Text role="sheet" as="h1">
          Design system
        </Text>
        <Text role="secondary" className="text-ink-muted max-w-[640px]">
          Paper and graphite. Every component here is built before it is wired into a
          screen, and the contract it obeys is design/TOKENS.md.
        </Text>
      </Stack>

      <div className="flex gap-2 border-b border-rule">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`text-[13px] px-[14px] py-[10px] cursor-pointer border-b-2 -mb-px transition-colors duration-[120ms] ${
              tab === t
                ? "border-highlight-mark text-ink"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Foundations" && <Foundations />}
      {tab === "Primitives" && <Primitives />}
      {tab === "Components" && <Components />}
    </Stack>
  );
}
