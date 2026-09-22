import type { ReactNode } from "react";

/**
 * Flex and grid with gap. Never margin-based spacing: gap survives
 * direct manipulation, reordering and deletion. Margins do not.
 */
type StackProps = {
  direction?: "row" | "column";
  gap?: number;
  align?: "start" | "center" | "baseline" | "stretch";
  justify?: "start" | "center" | "between" | "end";
  wrap?: boolean;
  className?: string;
  children: ReactNode;
};

const ALIGN = {
  start: "items-start",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
} as const;

const JUSTIFY = {
  start: "justify-start",
  center: "justify-center",
  between: "justify-between",
  end: "justify-end",
} as const;

export function Stack({
  direction = "column",
  gap = 14,
  align = "stretch",
  justify = "start",
  wrap = false,
  className = "",
  children,
}: StackProps) {
  return (
    <div
      className={`flex ${direction === "row" ? "flex-row" : "flex-col"} ${ALIGN[align]} ${JUSTIFY[justify]} ${wrap ? "flex-wrap" : ""} ${className}`.trim()}
      style={{ gap: `${gap}px` }}
    >
      {children}
    </div>
  );
}

export function Grid({
  columns,
  gap = 18,
  className = "",
  children,
}: {
  columns: number;
  gap?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`grid ${className}`.trim()}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap}px`,
      }}
    >
      {children}
    </div>
  );
}

export function Rule() {
  return <hr className="border-0 border-t border-rule m-0" />;
}
