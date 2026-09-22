import type { ElementType, ReactNode } from "react";

/**
 * Roles, not sizes. Callers never pass a font size, so the type ramp lives in
 * one place and a screen cannot invent a size. See design/TOKENS.md.
 */
export type TextRole =
  | "sheet"
  | "display"
  | "title"
  | "tile-title"
  | "prompt"
  | "lead"
  | "body"
  | "secondary"
  | "meta"
  | "mono"
  | "label";

const ROLE_CLASS: Record<TextRole, string> = {
  sheet: "font-display text-[38px] leading-[1.05] font-medium text-ink",
  display: "font-display text-[34px] leading-[1.1] font-medium text-ink",
  title: "font-display text-[20px] leading-[1.2] font-semibold text-ink",
  "tile-title": "font-display text-[15px] leading-[1.3] font-medium text-ink",
  prompt: "font-display text-[19px] leading-[1.3] text-ink-faint",
  lead: "text-[17px] leading-[1.45] text-ink",
  body: "text-[15px] leading-[1.45] text-ink",
  secondary: "text-[13px] leading-[1.45] text-ink-secondary",
  meta: "text-[12px] leading-[1.4] text-ink-muted",
  mono: "font-mono text-[11px] leading-[1.4] text-evidence",
  label:
    "font-mono text-[10px] leading-[1.4] tracking-[0.11em] uppercase text-ink-muted",
};

type TextProps = {
  role: TextRole;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Text({ role, as, className = "", children }: TextProps) {
  const Tag: ElementType = as ?? (role === "label" ? "span" : "p");
  return <Tag className={`${ROLE_CLASS[role]} ${className}`.trim()}>{children}</Tag>;
}

/** The only place uppercase is allowed. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return <Text role="label">{children}</Text>;
}
