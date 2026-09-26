import { BadgeCheck, Hourglass } from "lucide-react";
import { RichText } from "@/components/rich-text";
import type {
  Certification,
  Education,
  Leadership,
  SkillGroup,
  Writing,
} from "@/data/profile.types";
import { MaybeLink, Time } from "./primitives";

export function CvSkills({ skills }: { skills: SkillGroup[] }) {
  return (
    <dl className="border-t border-(--cv-line)">
      {skills.map((group) => (
        <div
          key={group.name}
          className="cv-avoid-break grid gap-3 border-b border-(--cv-line) py-4 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8"
        >
          <dt className="font-bebas-neue text-xl leading-tight tracking-[0.1em] text-(--cv-ink) md:pt-1">
            {group.name}
          </dt>
          <dd>
            <ul aria-label={group.name} className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li key={skill} className="cv-chip">
                  {skill}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function CvCertifications({
  certifications,
}: {
  certifications: Certification[];
}) {
  const earned = certifications.filter((c) => !c.inProgress);
  const pending = certifications.filter((c) => c.inProgress);

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <div>
          <h3 className="sr-only">In progress</h3>
          <ul className="space-y-3">
            {pending.map((cert) => (
              <li
                key={cert.name}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 border-2 border-dashed border-(--cv-amber)/70 p-4"
              >
                <Hourglass
                  aria-hidden="true"
                  className="size-5 shrink-0 text-(--cv-amber)"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-(--cv-ink)">
                    <MaybeLink href={cert.url}>{cert.name}</MaybeLink>
                  </p>
                  <p className="text-sm text-(--cv-ink-3)">{cert.issuer}</p>
                </div>
                <span className="bg-(--cv-amber) px-2 py-1 font-bebas-neue text-sm tracking-[0.16em] text-(--cv-bg)">
                  In progress
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {earned.length > 0 && (
        <div>
          <h3 className="sr-only">Earned</h3>
          <ul className="grid border-t border-(--cv-line) md:grid-cols-2 md:gap-x-8">
            {earned.map((cert) => (
              <li
                key={cert.name}
                className="flex gap-3 border-b border-(--cv-line) py-3.5"
              >
                <BadgeCheck
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-(--cv-mint)"
                />
                <div className="min-w-0">
                  <p className="font-semibold leading-snug text-(--cv-ink)">
                    <MaybeLink href={cert.url}>{cert.name}</MaybeLink>
                  </p>
                  <p className="mt-0.5 text-sm text-(--cv-ink-3)">
                    {cert.issuer}
                    {cert.awarded && (
                      <>
                        <span aria-hidden="true"> · </span>
                        <span className="font-mono text-xs">
                          {cert.awarded}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function CvEducation({ education }: { education: Education[] }) {
  return (
    <ol className="space-y-5">
      {education.map((item) => (
        <li
          key={`${item.qualification}-${item.period}`}
          className="cv-avoid-break border-b border-(--cv-line) pb-5 last:border-b-0"
        >
          <h3 className="text-lg font-semibold leading-snug text-(--cv-ink)">
            {item.qualification}
          </h3>
          <p className="mt-1 text-(--cv-ink-2)">
            <MaybeLink href={item.url}>{item.institution}</MaybeLink>
          </p>
          <p className="mt-1 font-mono text-xs text-(--cv-ink-3)">
            {item.period} · {item.location}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function CvLeadership({ leadership }: { leadership: Leadership[] }) {
  return (
    <ul className="space-y-5">
      {leadership.map((item) => (
        <li
          key={`${item.role}-${item.period}`}
          className="cv-avoid-break border-b border-(--cv-line) pb-5 last:border-b-0"
        >
          <h3 className="text-lg font-semibold leading-snug text-(--cv-ink)">
            {item.role}
          </h3>
          <p className="mt-1 text-(--cv-ink-2)">
            <MaybeLink href={item.url}>{item.org}</MaybeLink>
          </p>
          <p className="mt-1 font-mono text-xs text-(--cv-ink-3)">
            {item.period} · {item.location}
          </p>
          {item.description && (
            <p className="cv-prose mt-2 text-[15px] leading-relaxed text-(--cv-ink-2)">
              <RichText text={item.description} />
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export function CvWriting({ writing }: { writing: Writing[] }) {
  return (
    <ul className="space-y-4">
      {writing.map((item, index) => (
        <li key={item.url}>
          <article
            aria-labelledby={`writing-${index}`}
            className="cv-panel cv-avoid-break group relative p-5 transition-colors duration-200 hover:border-(--cv-cyan) md:p-6"
          >
            <p className="font-mono text-xs text-(--cv-ink-3)">
              {item.publisher}
              {item.date && (
                <>
                  <span aria-hidden="true"> · </span>
                  <Time value={item.date} />
                </>
              )}
            </p>
            <h3
              id={`writing-${index}`}
              className="mt-2 font-anton text-2xl leading-tight text-(--cv-ink) uppercase md:text-3xl"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors after:absolute after:inset-0 group-hover:text-(--cv-cyan)"
              >
                {item.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </h3>
            <p className="cv-prose mt-3 max-w-[70ch] leading-relaxed text-(--cv-ink-2)">
              <RichText text={item.summary} />
            </p>
            <p
              aria-hidden="true"
              className="mt-4 font-bebas-neue text-base tracking-[0.16em] text-(--cv-pink)"
            >
              Read the article ↗
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export function CvAdditional({ additional }: { additional: string[] }) {
  return (
    <ul className="cv-prose max-w-[70ch] space-y-3 leading-relaxed text-(--cv-ink-2)">
      {additional.map((item) => (
        <li
          key={item}
          className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-[2px] before:w-2.5 before:bg-(--cv-violet)"
        >
          <RichText text={item} />
        </li>
      ))}
    </ul>
  );
}
