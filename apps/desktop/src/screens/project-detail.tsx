import { navigate } from "@/lib/router";
import { Button } from "@/ui/primitives/button";
import { Icon } from "@/ui/primitives/icon";
import { Stack } from "@/ui/primitives/layout";
import { SectionLabel, Text } from "@/ui/primitives/text";
import { CorrectionActions, RevisitControl } from "@/ui/components/controls";
import { EvidenceList, WhyIsThisHere } from "@/ui/components/evidence";
import { BlockedNote, NowLine } from "@/ui/components/project-card";
import { ProvenanceMark } from "@/ui/components/provenance-mark";
import { HARBOUR, HARBOUR_EVIDENCE, HARBOUR_TRAIL } from "@/design/mock-data";

export function ProjectDetailScreen() {
  const project = HARBOUR;

  return (
    <Stack gap={30}>
      <div className="flex items-start justify-between gap-6 pb-[22px] border-b border-rule flex-wrap">
        <Stack gap={8}>
          <Text role="display" as="h1">
            {project.name}
          </Text>
          <span className="font-mono text-[11px] text-evidence">
            github.com/example/harbour
          </span>
        </Stack>
        <Button variant="outline" onClick={() => navigate("/today")}>
          <Icon name="arrow-left" size={14} />
          Back to today
        </Button>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_282px] gap-[30px] items-start max-[900px]:grid-cols-1">
        <Stack gap={32}>
          <Stack gap={12}>
            <div className="flex items-center gap-[10px]">
              <SectionLabel>Outcome</SectionLabel>
              <ProvenanceMark provenance={project.outcome.provenance} />
            </div>
            <Text role="lead">
              <span className="highlighted">{project.outcome.text}</span>
            </Text>
          </Stack>

          <Stack gap={12}>
            <div className="flex items-center gap-[10px]">
              <SectionLabel>Now</SectionLabel>
              <ProvenanceMark provenance={project.now.provenance} />
            </div>
            <NowLine claim={project.now} />
          </Stack>

          <Stack gap={14}>
            <SectionLabel>Next</SectionLabel>
            <Stack gap={10}>
              {project.next.map((action, i) => (
                <div
                  key={action.id}
                  className="bg-surface border border-border-token rounded-tile px-[18px] py-[15px] flex items-center gap-[14px] flex-wrap"
                >
                  <span className="font-mono text-[11px] text-ink-muted shrink-0">
                    {`0${i + 1}`}
                  </span>
                  <span className="text-[15px] leading-[1.4] grow text-ink">{action.text}</span>
                  <RevisitControl />
                </div>
              ))}
            </Stack>
          </Stack>

          <WhyIsThisHere
            trail={HARBOUR_TRAIL}
            interpretation="Righteo read those as one thread and kept your outcome as you wrote it."
          />

          <CorrectionActions />
        </Stack>

        <Stack gap={30}>
          <Stack gap={10}>
            <SectionLabel>Blocked</SectionLabel>
            <BlockedNote claim={project.blocked} />
            {!project.blocked && <Text role="secondary">Nothing blocked.</Text>}
          </Stack>

          <EvidenceList label="Recent evidence" items={HARBOUR_EVIDENCE} />

          <Stack gap={12}>
            <SectionLabel>Active threads</SectionLabel>
            <Stack gap={6}>
              <Text role="secondary">Forum schema decision</Text>
              <Text role="secondary">Tournament import PR</Text>
            </Stack>
          </Stack>

          <Stack gap={12}>
            <SectionLabel>Parking lot</SectionLabel>
            <Stack gap={8}>
              {["Rework the chat webhook", "Sponsor logos on the ladder page"].map((item) => (
                <div key={item} className="flex items-baseline justify-between gap-3">
                  <Text role="secondary" className="text-ink-muted">
                    {item}
                  </Text>
                  <button
                    type="button"
                    className="text-[12px] text-highlight-strong hover:text-link-hover cursor-pointer shrink-0"
                  >
                    Bring back
                  </button>
                </div>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </div>
    </Stack>
  );
}
