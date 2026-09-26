import { RichText } from "@/components/rich-text";
import type { Employer } from "@/data/profile.types";
import { MaybeLink, MoreLink } from "./links";
import {
  accents,
  card,
  formatYearMonth,
  ink,
  inkMuted,
  inkSoft,
} from "./theme";

const BULLETS_PER_EMPLOYER = 2;

function Period({ employer }: { employer: Employer }) {
  const latest = employer.roles[0];
  const first = employer.roles[employer.roles.length - 1];
  return (
    <p className={`font-mono text-xs tracking-wide ${inkMuted}`}>
      <time dateTime={first.start}>{formatYearMonth(first.start)}</time>
      {" – "}
      {latest.end ? (
        <time dateTime={latest.end}>{formatYearMonth(latest.end)}</time>
      ) : (
        "Present"
      )}
    </p>
  );
}

function EmployerEntry({ employer }: { employer: Employer }) {
  const latest = employer.roles[0];
  const first = employer.roles[employer.roles.length - 1];
  const promoted = employer.roles.length > 1;

  return (
    <li className="relative flex flex-col gap-3 border-t-2 border-[#1a1a1f]/15 pt-8 dark:border-white/15">
      {/* Timeline node on the shared rule above the list. */}
      <span
        aria-hidden="true"
        className="absolute -top-[8px] left-0 size-3 ring-2 ring-white dark:ring-[#1a1a1f] outline outline-1 outline-[#1a1a1f]/30 dark:outline-white/40"
        style={{ backgroundColor: employer.color ?? "#ff0080" }}
      />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Period employer={employer} />
        {latest.end === null && (
          <span className="border border-[#007a45] px-1.5 font-bebas-neue text-sm tracking-[0.15em] text-[#007a45] dark:border-[#00ff88] dark:text-[#00ff88]">
            Current
          </span>
        )}
      </div>

      <div>
        <h3
          className={`font-anton text-2xl uppercase leading-tight text-balance md:text-[1.7rem] ${ink}`}
        >
          {latest.title}
        </h3>
        <p className={`mt-1 font-bebas-neue text-xl tracking-[0.12em] ${ink}`}>
          <MaybeLink href={employer.url}>{employer.shortName}</MaybeLink>
        </p>
      </div>

      {(promoted || employer.product) && (
        <dl className={`space-y-1 text-sm ${inkMuted}`}>
          {promoted && (
            <div className="flex flex-wrap gap-x-1.5">
              <dt className={`font-semibold ${accents.violet.text}`}>
                {employer.roles.length} roles
              </dt>
              <dd>promoted from {first.title}</dd>
            </div>
          )}
          {employer.product && (
            <div className="flex flex-wrap gap-x-1.5">
              <dt>Working on</dt>
              <dd className={`font-semibold ${ink}`}>
                <MaybeLink href={employer.product.url}>
                  {employer.product.name}
                </MaybeLink>
              </dd>
            </div>
          )}
        </dl>
      )}

      <ul className={`space-y-2 text-sm leading-relaxed ${inkSoft}`}>
        {latest.highlights.slice(0, BULLETS_PER_EMPLOYER).map((highlight) => (
          <li key={highlight.slice(0, 40)} className="flex gap-2">
            <span aria-hidden="true" className={accents.pink.text}>
              →
            </span>
            <span className="text-pretty">
              <RichText text={highlight} />
            </span>
          </li>
        ))}
      </ul>
    </li>
  );
}

/** Condensed career overview: one entry per employer, newest first. */
export function Experience({ experience }: { experience: Employer[] }) {
  if (experience.length === 0) return null;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className={`${card} scroll-mt-6 p-6 sm:p-8 md:p-10`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 holographic-gradient-alt opacity-[0.04]"
      />
      <div className="relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="experience-title"
              className={`font-anton text-5xl uppercase tracking-[-0.01em] md:text-7xl ${ink}`}
            >
              Experience
            </h2>
            <div
              aria-hidden="true"
              className="mt-4 h-1 w-48 holographic-gradient"
            />
          </div>
          <MoreLink href="/cv#experience">See full experience</MoreLink>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
          {experience.map((employer) => (
            <EmployerEntry key={employer.id} employer={employer} />
          ))}
        </ol>
      </div>
    </section>
  );
}
