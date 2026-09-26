import { TrendingUp } from "lucide-react";
import type { CSSProperties } from "react";
import { RichText } from "@/components/rich-text";
import type { Employer, YearMonth } from "@/data/profile.types";
import {
  currentYearMonth,
  formatDuration,
  formatDurationLong,
  formatYearMonth,
  monthIndex,
  monthsBetween,
  yearOf,
} from "./format";
import { Chips, DateRange, MaybeLink } from "./primitives";

const FALLBACK_COLOR = "#b200ff";

function empStyle(employer: Employer): CSSProperties {
  return { "--emp": employer.color ?? FALLBACK_COLOR } as CSSProperties;
}

/** Oldest start and newest end across an employer's roles. */
function tenure(employer: Employer): {
  start: YearMonth;
  end: YearMonth | null;
} {
  const starts = employer.roles.map((r) => r.start);
  const start = starts.reduce((a, b) =>
    monthIndex(a) < monthIndex(b) ? a : b,
  );
  const current = employer.roles.some((r) => r.end === null);
  const end = current
    ? null
    : employer.roles
        .map((r) => r.end as YearMonth)
        .reduce((a, b) => (monthIndex(a) > monthIndex(b) ? a : b));
  return { start, end };
}

function tenureMonths(employer: Employer): number {
  const { start, end } = tenure(employer);
  return monthsBetween(start, end);
}

/** Total months in industry, summed per employer (they don't overlap). */
export function totalExperienceMonths(experience: Employer[]): number {
  return experience.reduce((sum, e) => sum + tenureMonths(e), 0);
}

/**
 * Horizontal overview of the whole career: one coloured segment per employer
 * on a shared time axis, with a legend underneath.
 */
function CareerSpan({ experience }: { experience: Employer[] }) {
  const spans = experience
    .map((employer) => ({ employer, ...tenure(employer) }))
    .sort((a, b) => monthIndex(a.start) - monthIndex(b.start));
  if (spans.length === 0) return null;

  const min = monthIndex(spans[0].start);
  const max = Math.max(
    ...spans.map((s) => monthIndex(s.end ?? currentYearMonth()) + 1),
  );
  const range = Math.max(1, max - min);

  const firstYear = Math.floor(min / 12);
  const lastYear = Math.floor((max - 1) / 12);
  const years: number[] = [];
  for (let y = firstYear + 1; y <= lastYear; y++) years.push(y);

  const summary = spans
    .map(
      (s) =>
        `${s.employer.shortName} ${formatYearMonth(s.start)} to ${s.end ? formatYearMonth(s.end) : "present"}`,
    )
    .join("; ");

  return (
    <figure className="cv-panel cv-avoid-break mb-10 p-5 md:p-6">
      <figcaption className="mb-4 font-bebas-neue text-lg tracking-[0.16em] text-(--cv-ink-2)">
        Career at a glance
      </figcaption>
      <div role="img" aria-label={`Career timeline: ${summary}.`}>
        <div className="relative h-4 bg-(--cv-chip-bg)">
          {spans.map((s) => {
            const left = ((monthIndex(s.start) - min) / range) * 100;
            const width =
              ((monthIndex(s.end ?? currentYearMonth()) +
                1 -
                monthIndex(s.start)) /
                range) *
              100;
            return (
              <span
                key={s.employer.id}
                className="cv-span-seg"
                style={{
                  ...empStyle(s.employer),
                  left: `${left}%`,
                  width: `calc(${width}% - 2px)`,
                }}
              />
            );
          })}
        </div>
        <div className="relative mt-1.5 h-4 font-mono text-[11px] text-(--cv-ink-3)">
          {years.map((y) => {
            const left = ((y * 12 - min) / range) * 100;
            return (
              <span
                key={y}
                className="absolute top-0 -translate-x-1/2 before:absolute before:-top-1.5 before:left-1/2 before:h-1 before:w-px before:bg-(--cv-line-strong) max-sm:[&:nth-child(even)]:hidden"
                style={{ left: `${left}%` }}
              >
                {y}
              </span>
            );
          })}
        </div>
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {[...spans].reverse().map((s) => (
          <li
            key={s.employer.id}
            className="inline-flex items-center gap-2 text-(--cv-ink-2)"
          >
            <span
              aria-hidden="true"
              className="cv-swatch rotate-45"
              style={empStyle(s.employer)}
            />
            <a
              href={`#exp-${s.employer.id}`}
              className="font-semibold text-(--cv-ink) underline-offset-4 hover:underline"
            >
              {s.employer.shortName}
            </a>
            <span className="font-mono text-xs text-(--cv-ink-3)">
              {formatDuration(monthsBetween(s.start, s.end))}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** Oldest to newest role titles as rising bars, for promotions. */
function PromotionLadder({ employer }: { employer: Employer }) {
  const steps = [...employer.roles].reverse();
  return (
    <div className="mt-5">
      <p className="mb-3 inline-flex items-center gap-1.5 font-bebas-neue text-base tracking-[0.16em] text-(--cv-mint)">
        <TrendingUp aria-hidden="true" className="size-4" />
        {`Promoted ${steps.length - 1} ${steps.length - 1 === 1 ? "time" : "times"}`}
      </p>
      <ol
        aria-label={`Career progression at ${employer.shortName}, earliest first`}
        className="grid items-end gap-2 sm:gap-3"
        style={{
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
        }}
      >
        {steps.map((role, index) => (
          <li
            key={`${role.title}-${role.start}`}
            className="cv-rung flex flex-col"
            data-top={index === steps.length - 1}
          >
            <div
              aria-hidden="true"
              className="cv-rung-bar"
              style={{ "--step": index + 1 } as CSSProperties}
            />
            <p className="mt-2 text-xs leading-snug font-semibold text-(--cv-ink) sm:text-sm">
              {role.title}
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-(--cv-ink-3)">
              <time dateTime={role.start}>{yearOf(role.start)}</time>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function EmployerEntry({ employer }: { employer: Employer }) {
  const { start, end } = tenure(employer);
  const months = monthsBetween(start, end);
  const promoted = employer.roles.length > 1;

  return (
    <li
      id={`exp-${employer.id}`}
      className="relative scroll-mt-24 pl-10 md:pl-14"
      style={empStyle(employer)}
    >
      <span aria-hidden="true" className="cv-node" />
      <article aria-labelledby={`exp-${employer.id}-name`}>
        <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3
            id={`exp-${employer.id}-name`}
            className="font-anton text-3xl leading-tight tracking-[-0.005em] text-(--cv-ink) uppercase md:text-4xl"
          >
            <MaybeLink href={employer.url} className="decoration-[3px]">
              {employer.company}
            </MaybeLink>
          </h3>
          <p className="font-mono text-xs text-(--cv-ink-3) sm:text-sm">
            <DateRange start={start} end={end} />
            <span aria-hidden="true"> · </span>
            <span aria-hidden="true">{formatDuration(months)}</span>
            <span className="sr-only">, {formatDurationLong(months)}</span>
          </p>
        </header>

        {employer.product && (
          <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed text-(--cv-ink-2)">
            <span className="mr-2 font-bebas-neue text-base tracking-[0.16em] text-(--cv-cyan)">
              Product
            </span>
            <MaybeLink
              href={employer.product.url}
              className="font-semibold text-(--cv-ink)"
            >
              {employer.product.name}
            </MaybeLink>
            <span aria-hidden="true">: </span>
            <span className="cv-prose">
              <RichText text={employer.product.blurb} />
            </span>
          </p>
        )}

        {promoted && <PromotionLadder employer={employer} />}

        <ol
          aria-label={`Roles at ${employer.shortName}, newest first`}
          className="cv-roles mt-7 space-y-7"
        >
          {employer.roles.map((role, index) => {
            const roleMonths = monthsBetween(role.start, role.end);
            const isPromotion = index < employer.roles.length - 1;
            return (
              <li
                key={`${role.title}-${role.start}`}
                className="cv-role"
                data-current-step={index === 0}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h4 className="text-lg font-semibold leading-snug text-(--cv-ink) md:text-xl">
                    {role.title}
                  </h4>
                  {promoted && isPromotion && (
                    <span className="inline-flex items-center gap-1 border border-(--cv-mint)/60 px-1.5 py-0.5 font-mono text-[11px] text-(--cv-mint)">
                      <TrendingUp aria-hidden="true" className="size-3" />
                      Promotion
                    </span>
                  )}
                </div>
                <p className="mt-1 flex flex-wrap gap-x-2 font-mono text-xs text-(--cv-ink-3)">
                  <DateRange start={role.start} end={role.end} />
                  <span aria-hidden="true">·</span>
                  <span>
                    <span aria-hidden="true">{formatDuration(roleMonths)}</span>
                    <span className="sr-only">
                      {formatDurationLong(roleMonths)}
                    </span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{role.location}</span>
                </p>
                <ul className="cv-prose mt-3 max-w-[75ch] space-y-2 text-[15px] leading-relaxed text-(--cv-ink-2) md:text-base">
                  {role.highlights.map((point) => (
                    <li
                      key={point}
                      className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-[2px] before:w-2.5 before:bg-(--cv-pink)"
                    >
                      <RichText text={point} />
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        <Chips
          items={employer.tech}
          label={`Technologies used at ${employer.shortName}`}
          className="mt-6"
        />
      </article>
    </li>
  );
}

export function CvExperience({ experience }: { experience: Employer[] }) {
  return (
    <>
      <CareerSpan experience={experience} />
      <ol className="cv-timeline space-y-14 md:space-y-16">
        {experience.map((employer) => (
          <EmployerEntry key={employer.id} employer={employer} />
        ))}
      </ol>
    </>
  );
}
