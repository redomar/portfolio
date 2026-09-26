import type { YearMonth } from "@/data/profile.types";

/**
 * Accent palette for the home page. Each accent has a darker text shade for the
 * light theme (the neon originals fail contrast on white) and the neon shade
 * for the dark theme. Fills keep the neon colour in both themes.
 */
export const accents = {
  pink: {
    text: "text-[#c7006a] dark:text-[#ff0080]",
    fill: "bg-[#ff0080]",
  },
  cyan: {
    text: "text-[#00729a] dark:text-[#00d4ff]",
    fill: "bg-[#00d4ff]",
  },
  mint: {
    text: "text-[#007a45] dark:text-[#00ff88]",
    fill: "bg-[#00ff88]",
  },
  violet: {
    text: "text-[#8a00c7] dark:text-[#c65cff]",
    fill: "bg-[#b200ff]",
  },
  yellow: {
    text: "text-[#806600] dark:text-[#ffff00]",
    fill: "bg-[#ffff00]",
  },
} as const;

export type AccentName = keyof typeof accents;

/** Order used when cycling accents through lists. */
export const accentCycle: AccentName[] = [
  "pink",
  "cyan",
  "mint",
  "violet",
  "yellow",
];

export const accentAt = (index: number) =>
  accents[accentCycle[index % accentCycle.length]];

/** Shared surface classes so every card reads the same in both themes. */
export const card =
  "relative overflow-hidden bg-white dark:bg-[#1a1a1f] retro-border transition-colors duration-300";

export const ink = "text-[#1a1a1f] dark:text-white";
export const inkSoft = "text-[#1a1a1f]/80 dark:text-white/80";
export const inkMuted = "text-[#1a1a1f]/70 dark:text-white/65";

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a3c4] dark:focus-visible:outline-[#00d4ff]";

export const chip =
  "inline-flex items-center border border-[#1a1a1f]/15 dark:border-white/15 bg-[#1a1a1f]/[0.03] dark:bg-white/[0.04] px-2 py-1 font-mono text-xs text-[#1a1a1f]/85 dark:text-white/85";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2024-07" -> "Jul 2024". Locale-free so server and client always agree. */
export function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}
