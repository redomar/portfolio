import { ExternalLink, iconForLink } from "@/components/home/links";
import {
  type AccentName,
  accents,
  card,
  chip,
  formatYearMonth,
  ink,
  inkMuted,
  inkSoft,
} from "@/components/home/theme";
import { RichText } from "@/components/rich-text";
import type { Project } from "@/data/profile.types";

const MAX_TECH = 6;

function ProjectPeriod({ project }: { project: Project }) {
  if (!project.start) return null;
  return (
    <p className={`font-mono text-xs tracking-wide ${inkMuted}`}>
      <time dateTime={project.start}>{formatYearMonth(project.start)}</time>
      {" – "}
      {project.end ? (
        <time dateTime={project.end}>{formatYearMonth(project.end)}</time>
      ) : (
        "Ongoing"
      )}
    </p>
  );
}

type ProjectCardProps = {
  project: Project;
  accent?: AccentName;
};

/** A project with its description, stack and real links. Wraps on any width. */
export function ProjectCard({ project, accent = "pink" }: ProjectCardProps) {
  const extraTech = project.tech.length - MAX_TECH;
  const tone = accents[accent];

  return (
    <article
      className={`${card} group flex h-full flex-col gap-6 p-6 sm:p-8`}
      aria-labelledby={`project-${project.id}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 holographic-gradient transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100 motion-reduce:transition-none"
      />
      <header className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className={`flex size-14 shrink-0 items-center justify-center font-anton text-3xl text-[#0d0d10] ${tone.fill}`}
        >
          {project.title.charAt(0)}
        </span>
        <div className="min-w-0">
          <h3
            id={`project-${project.id}`}
            className={`font-anton text-3xl uppercase leading-tight text-balance ${ink}`}
          >
            {project.title}
          </h3>
          <ProjectPeriod project={project} />
        </div>
      </header>

      <p className={`text-base leading-relaxed text-pretty ${inkSoft}`}>
        <RichText text={project.description} />
      </p>

      {project.tech.length > 0 && (
        <ul aria-label="Tech stack" className="flex flex-wrap gap-2">
          {project.tech.slice(0, MAX_TECH).map((tech) => (
            <li key={tech} className={chip}>
              {tech}
            </li>
          ))}
          {extraTech > 0 && (
            <li className={`${chip} ${tone.text}`}>+{extraTech} more</li>
          )}
        </ul>
      )}

      {project.links.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-3 pt-2">
          {project.links.map((link) => {
            const Icon = iconForLink(link.kind);
            return (
              <li key={link.url}>
                <ExternalLink
                  href={link.url}
                  aria-label={`${link.label}: ${project.title}`}
                  className={`inline-flex min-h-11 items-center gap-2 border-2 border-[#1a1a1f] px-4 font-bebas-neue text-lg tracking-[0.12em] transition-colors hover:bg-[#1a1a1f] hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-[#0d0d10] ${ink}`}
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {link.label}
                </ExternalLink>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
