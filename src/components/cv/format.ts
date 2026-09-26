import type { YearMonth } from "@/data/profile.types";

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

function parts(value: YearMonth): [number, number] {
  const [year, month] = value.split("-").map(Number);
  return [year, month];
}

/** Absolute month index, handy for arithmetic. */
export function monthIndex(value: YearMonth): number {
  const [year, month] = parts(value);
  return year * 12 + (month - 1);
}

export function currentYearMonth(now = new Date()): YearMonth {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${now.getFullYear()}-${month}` as YearMonth;
}

/** "2024-07" → "Jul 2024". */
export function formatYearMonth(value: YearMonth): string {
  const [year, month] = parts(value);
  return `${MONTHS[month - 1]} ${year}`;
}

export function yearOf(value: YearMonth): number {
  return parts(value)[0];
}

/** Inclusive month count, LinkedIn style (Jul 2024 to Aug 2025 = 14 months). */
export function monthsBetween(start: YearMonth, end: YearMonth | null): number {
  const last = end ?? currentYearMonth();
  return Math.max(1, monthIndex(last) - monthIndex(start) + 1);
}

/** 14 → "1 yr 2 mos". */
export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const out: string[] = [];
  if (years) out.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (rest) out.push(`${rest} ${rest === 1 ? "mo" : "mos"}`);
  return out.join(" ") || "1 mo";
}

/** Long form for screen readers: "1 year 2 months". */
export function formatDurationLong(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const out: string[] = [];
  if (years) out.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (rest) out.push(`${rest} ${rest === 1 ? "month" : "months"}`);
  return out.join(" ") || "1 month";
}

/** Strips the RichText markup so strings can be used in metadata. */
export function plainText(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");
}
