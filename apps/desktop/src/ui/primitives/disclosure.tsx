import { useId, useState, type ReactNode } from "react";
import { Icon } from "./icon";

export function Disclosure({
  label,
  defaultOpen = false,
  children,
}: {
  label: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="flex flex-col gap-[14px]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 cursor-pointer text-highlight-strong hover:text-link-hover self-start"
      >
        <Icon
          name="chevron-down"
          size={13}
          className={`transition-transform duration-[120ms] ${open ? "" : "-rotate-90"}`}
        />
        <span className="font-mono text-[10px] tracking-[0.11em] uppercase">{label}</span>
      </button>
      {open && <div id={id}>{children}</div>}
    </div>
  );
}
