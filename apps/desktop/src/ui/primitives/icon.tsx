import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  CircleHelp,
  Clock,
  Dot,
  Inbox,
  Pause,
  Plus,
  Target,
  type LucideIcon,
} from "lucide-react";

/**
 * Lucide, behind a wrapper.
 *
 * Two reasons for the wrapper rather than importing lucide at each call site:
 * it pins stroke weight and size so icons stay calm and consistent, and adding
 * an icon means editing this map, which keeps the set deliberately small. See
 * docs/ui-inventory.md.
 *
 * Lucide's default stroke is 2, which reads heavier than this design language
 * wants next to Public Sans, so the default here is 1.8.
 */
const ICONS = {
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  "chevron-down": ChevronDown,
  target: Target,
  clock: Clock,
  bookmark: Bookmark,
  pause: Pause,
  tray: Inbox,
  plus: Plus,
  dot: Dot,
  check: Check,
  question: CircleHelp,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  size = 15,
  strokeWidth = 1.8,
  className = "",
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const Glyph = ICONS[name];
  return (
    <Glyph size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />
  );
}
