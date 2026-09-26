import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { YearMonth } from "@/data/profile.types";
import { formatYearMonth } from "./format";

/** External link with the site-wide rules baked in. */
export function ExternalLink({
  href,
  children,
  className = "",
  showIcon = true,
  label,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
  /** Accessible name when the visible text is not enough. */
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`cv-link ${className}`}
    >
      {children}
      {showIcon && (
        <ArrowUpRight
          aria-hidden="true"
          className="cv-link-icon inline-block size-[0.9em] shrink-0"
        />
      )}
    </a>
  );
}

/** Optional link: renders plain text when there is no url. */
export function MaybeLink({
  href,
  children,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  if (!href) return <span className={className}>{children}</span>;
  return (
    <ExternalLink href={href} className={className}>
      {children}
    </ExternalLink>
  );
}

export function Chips({
  items,
  label,
  className = "",
}: {
  items: string[];
  label: string;
  className?: string;
}) {
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="cv-chip">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Time({ value }: { value: YearMonth }) {
  return <time dateTime={value}>{formatYearMonth(value)}</time>;
}

/** "Jul 2024 – Aug 2025" with semantic <time> elements. */
export function DateRange({
  start,
  end,
}: {
  start: YearMonth;
  end: YearMonth | null;
}) {
  return (
    <span className="whitespace-nowrap">
      <Time value={start} /> –{" "}
      {end ? <Time value={end} /> : <span>Present</span>}
    </span>
  );
}

export function Section({
  id,
  title,
  aside,
  children,
}: {
  id: string;
  title: string;
  /** Short supporting fact shown beside the heading. */
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="cv-section scroll-mt-24 lg:scroll-mt-10"
    >
      <header className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 md:mb-8">
        <div>
          <h2
            id={`${id}-heading`}
            className="font-anton text-4xl uppercase leading-none tracking-[-0.01em] text-(--cv-ink) md:text-5xl"
          >
            {title}
          </h2>
          <div
            aria-hidden="true"
            className="holographic-gradient mt-3 h-1 w-20"
          />
        </div>
        {aside && (
          <p className="font-mono text-xs text-(--cv-ink-3)">{aside}</p>
        )}
      </header>
      {children}
    </section>
  );
}
