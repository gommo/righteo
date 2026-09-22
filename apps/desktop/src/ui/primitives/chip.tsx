import type { ReactNode } from "react";

export type ChipFill = "solid" | "outlined" | "dashed";

const FILL: Record<ChipFill, string> = {
  solid: "bg-evidence-bg px-[7px] py-[3px]",
  outlined: "bg-evidence-bg border border-evidence px-[6px] py-[2px]",
  dashed: "bg-transparent border border-dashed border-evidence px-[6px] py-[2px]",
};

export function Chip({
  fill = "solid",
  title,
  children,
}: {
  fill?: ChipFill;
  title?: string;
  children: ReactNode;
}) {
  return (
    <span
      title={title}
      className={`font-mono text-[10px] leading-none text-evidence rounded-chip whitespace-nowrap ${FILL[fill]}`}
    >
      {children}
    </span>
  );
}
