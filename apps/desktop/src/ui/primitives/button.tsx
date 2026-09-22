import type { ReactNode } from "react";

/**
 * Three variants and no more. "action" is the graphite fill: always the
 * inverse of the page, so it stays the loudest contrast in either theme.
 */
export type ButtonVariant = "action" | "outline" | "quiet";

const VARIANT: Record<ButtonVariant, string> = {
  action:
    "bg-action text-on-action font-semibold px-[18px] py-[10px] rounded-control",
  outline:
    "border border-border-token text-ink px-[15px] py-[8px] rounded-control hover:border-ink-muted",
  quiet: "text-ink-muted px-[6px] py-[8px] hover:text-ink",
};

export function Button({
  variant = "outline",
  type = "button",
  onClick,
  className = "",
  children,
}: {
  variant?: ButtonVariant;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-[14px] leading-none inline-flex items-center gap-2 cursor-pointer transition-colors duration-[120ms] ${VARIANT[variant]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
