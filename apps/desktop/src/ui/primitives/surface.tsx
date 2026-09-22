import type { ReactNode } from "react";

/**
 * Three levels. "raised" carries the shadow that makes paper sit on a desk;
 * in dark mode the shadow token resolves to none, because a graphite board
 * has nothing to cast one onto and the border does the work instead.
 */
export type SurfaceLevel = "raised" | "flat" | "sunken";

const LEVEL: Record<SurfaceLevel, string> = {
  raised: "bg-surface border border-border-token",
  flat: "bg-surface border border-border-token",
  sunken: "bg-surface-sunken",
};

export function Surface({
  level = "flat",
  className = "",
  children,
}: {
  level?: SurfaceLevel;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-card ${LEVEL[level]} ${className}`.trim()}
      style={level === "raised" ? { boxShadow: "var(--card-shadow)" } : undefined}
    >
      {children}
    </div>
  );
}
