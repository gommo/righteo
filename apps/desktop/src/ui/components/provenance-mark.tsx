import type { Provenance } from "@/domain/types";

/**
 * Border style carries the distinction as well as colour, so it survives
 * greyscale and colour blindness. One component, so narration, evidence and
 * inference can never drift apart across surfaces.
 */
const VARIANT: Record<Provenance, string> = {
  narrated: "bg-evidence-bg px-[7px] py-[3px]",
  observed: "bg-evidence-bg border border-evidence px-[6px] py-[2px]",
  inferred: "bg-transparent border border-dashed border-evidence px-[6px] py-[2px]",
};

const TITLE: Record<Provenance, string> = {
  narrated: "You said it.",
  observed: "A collector saw it. Not proof it mattered.",
  inferred: "The model concluded it. Correctable.",
};

export function ProvenanceMark({ provenance }: { provenance: Provenance }) {
  return (
    <span
      title={TITLE[provenance]}
      className={`font-mono text-[10px] leading-none text-evidence rounded-chip ${VARIANT[provenance]}`}
    >
      {provenance}
    </span>
  );
}
