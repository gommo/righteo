import { useEffect, useState, type ReactNode } from "react";
import { navigate, useLocation } from "@/lib/router";
import { Button } from "@/ui/primitives/button";

/**
 * A review harness, not product chrome.
 *
 * The real app has one journey and no top nav. This bar exists so the screens
 * can be walked through and compared while they are still mockups. Delete it
 * when M0 wires the real navigation. See docs/mvp.md.
 */
const ROUTES = [
  ["/today", "Today"],
  ["/reconciliation", "Reconciliation"],
  ["/project", "Project detail"],
  ["/design", "Design system"],
] as const;

export function ReviewShell({ children }: { children: ReactNode }) {
  const { path } = useLocation();
  const [dark, setDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-canvas">
      <div className="border-b border-rule bg-surface-sunken">
        <div className="mx-auto max-w-[980px] px-[36px] py-[10px] flex items-center gap-4 flex-wrap">
          <span className="font-mono text-[10px] tracking-[0.11em] uppercase text-ink-faint">
            Review harness
          </span>
          <nav className="flex items-center gap-1 grow">
            {ROUTES.map(([to, label]) => (
              <button
                key={to}
                type="button"
                onClick={() => navigate(to)}
                className={`text-[13px] px-[12px] py-[6px] rounded-control cursor-pointer transition-colors duration-[120ms] ${
                  path === to ? "bg-surface text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
          <Button variant="quiet" onClick={() => setDark((d) => !d)}>
            {dark ? "Light" : "Dark"}
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-[980px] px-[36px] py-[40px]">{children}</div>
    </div>
  );
}
