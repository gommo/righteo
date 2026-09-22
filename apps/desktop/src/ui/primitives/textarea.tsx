import { useEffect, useRef } from "react";

/** Grows with its content. No row counter, no scrollbar mid-thought. */
export function TextArea({
  value,
  onChange,
  placeholder,
  minRows = 2,
  className = "",
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  minRows?: number;
  className?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={minRows}
      value={value}
      placeholder={placeholder ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full resize-none overflow-hidden bg-transparent border-0 p-0 text-ink placeholder:text-ink-faint focus:outline-none ${className}`.trim()}
    />
  );
}
