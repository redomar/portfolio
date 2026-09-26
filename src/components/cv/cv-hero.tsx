import {
  ArrowLeft,
  Github,
  Globe,
  Link2,
  Linkedin,
  type LucideIcon,
  MapPin,
  Send,
} from "lucide-react";
import Link from "next/link";
import type {
  Employer,
  Profile,
  Link as ProfileLink,
} from "@/data/profile.types";
import { Chips, DateRange, MaybeLink } from "./primitives";

const LINK_ICONS: Partial<Record<ProfileLink["kind"], LucideIcon>> = {
  website: Globe,
  github: Github,
  linkedin: Linkedin,
};

/** Accent per stat, cycling through the brand palette. */
const STAT_ACCENTS = [
  "text-(--cv-pink)",
  "text-(--cv-cyan)",
  "text-(--cv-mint)",
  "text-(--cv-violet)",
  "text-(--cv-amber)",
];

export function CvTopBar() {
  return (
    // Left padding keeps clear of the fixed ThemeToggle (top-8 left-8, ~52px).
    <div
      data-print="hide"
      className="mt-8 flex min-h-[52px] items-center pl-20 md:pl-16"
    >
      <Link
        href="/"
        className="group inline-flex min-h-11 items-center gap-2 px-1 font-bebas-neue text-xl tracking-[0.18em] text-(--cv-ink-2) transition-colors hover:text-(--cv-pink)"
      >
        <ArrowLeft
          aria-hidden="true"
          className="size-5 transition-transform duration-200 ease-out group-hover:-translate-x-1"
        />
        Back to home
      </Link>
    </div>
  );
}

function LatestRole({ employer }: { employer: Employer }) {
  const role = employer.roles[0];
  if (!role) return null;
  return (
    <aside
      aria-label="Latest role"
      className="cv-enter hidden self-end border border-(--cv-line-strong) bg-(--cv-surface)/85 p-5 lg:block"
      style={{ "--i": 5 } as React.CSSProperties}
    >
      <p className="font-bebas-neue text-base tracking-[0.18em] text-(--cv-cyan)">
        Latest role
      </p>
      <p className="mt-2 text-xl leading-snug font-semibold text-(--cv-ink)">
        {role.title}
      </p>
      <p className="mt-1 text-(--cv-ink-2)">
        <MaybeLink href={employer.url}>{employer.shortName}</MaybeLink>
        {employer.product && (
          <>
            <span aria-hidden="true"> · </span>
            <MaybeLink href={employer.product.url}>
              {employer.product.name}
            </MaybeLink>
          </>
        )}
      </p>
      <p className="mt-1 font-mono text-xs text-(--cv-ink-3)">
        <DateRange start={role.start} end={role.end} />
      </p>
      <Chips
        items={employer.tech}
        label={`Technologies used at ${employer.shortName}`}
        className="mt-4"
      />
    </aside>
  );
}

export function CvHero({
  profile,
  latest,
}: {
  profile: Profile;
  latest?: Employer;
}) {
  return (
    <header className="retro-border vhs-scanlines relative mt-6 overflow-hidden bg-(--cv-surface) transition-colors duration-300">
      <div
        aria-hidden="true"
        className="holographic-gradient pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.16]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[#ff0080]/15 blur-3xl"
      />

      <div className="relative z-20 gap-10 px-5 pt-8 pb-6 sm:px-8 md:px-12 md:pt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:pb-10 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div>
          <div
            className="cv-enter flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-(--cv-ink-2) sm:text-sm"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            {profile.openToWork && (
              <p className="inline-flex items-center gap-2.5 border border-(--cv-mint)/50 bg-(--cv-surface) px-3 py-1.5 text-(--cv-ink)">
                <span aria-hidden="true" className="cv-status-dot" />
                Open to new roles
              </p>
            )}
            <p className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-4 text-(--cv-pink)" />
              {profile.location}
            </p>
          </div>

          <h1
            className="cv-enter cv-name mt-6 font-anton uppercase text-(--cv-ink)"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {profile.name}
          </h1>

          <p
            className="cv-enter mt-3 font-bebas-neue text-3xl tracking-[0.12em] text-(--cv-pink) md:text-4xl"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {profile.headline}
          </p>

          <p
            className="cv-enter mt-4 max-w-[62ch] text-lg leading-relaxed text-pretty text-(--cv-ink-2) md:text-xl"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {profile.tagline}
          </p>

          <ul
            aria-label="Profiles"
            className="cv-enter mt-7 flex flex-wrap gap-2.5"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <li>
              <Link
                href="/#contact"
                className="group inline-flex min-h-11 items-center gap-2 border-2 border-(--cv-pink) bg-(--cv-pink) px-3.5 font-bebas-neue text-lg tracking-[0.14em] text-white transition-colors duration-200 hover:border-(--cv-ink) hover:bg-(--cv-ink) hover:text-(--cv-surface)"
              >
                <Send aria-hidden="true" className="size-[18px]" />
                Get in touch
              </Link>
            </li>
            {profile.links.map((link) => {
              const Icon = LINK_ICONS[link.kind] ?? Link2;
              return (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-2 border-2 border-(--cv-ink)/80 bg-(--cv-surface) px-3.5 font-bebas-neue text-lg tracking-[0.14em] text-(--cv-ink) transition-colors duration-200 hover:border-(--cv-pink) hover:bg-(--cv-pink) hover:text-white"
                  >
                    <Icon aria-hidden="true" className="size-[18px]" />
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        {latest && <LatestRole employer={latest} />}
      </div>

      <dl className="relative z-20 grid grid-cols-1 gap-px border-t border-(--cv-line) bg-(--cv-line) sm:grid-cols-2 lg:grid-cols-5">
        {profile.highlights.map((item, index) => (
          <div
            key={item.label}
            className="flex items-baseline gap-4 bg-(--cv-surface) px-5 py-4 sm:flex-col sm:items-start sm:gap-1.5 sm:px-8 sm:[&:last-child:nth-child(odd)]:col-span-2 lg:px-6 lg:py-5 lg:[&:last-child:nth-child(odd)]:col-span-1"
          >
            <dt className="order-2 text-sm leading-snug text-(--cv-ink-2)">
              {item.label}
            </dt>
            <dd
              className={`order-1 min-w-[3ch] font-anton text-4xl leading-none ${STAT_ACCENTS[index % STAT_ACCENTS.length]}`}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
