import { Github, Globe, Link2, type LucideIcon, Star } from "lucide-react";
import { RichText } from "@/components/rich-text";
import type { Link, Project } from "@/data/profile.types";
import { Chips, Time } from "./primitives";

const ICONS: Partial<Record<Link["kind"], LucideIcon>> = {
  repo: Github,
  github: Github,
  website: Globe,
};

function ProjectDates({ project }: { project: Project }) {
  if (!project.start) return null;
  return (
    <p className="font-mono text-xs text-(--cv-ink-3)">
      <Time value={project.start} />
      {project.end !== undefined && (
        <>
          {" – "}
          {project.end ? <Time value={project.end} /> : "Present"}
        </>
      )}
    </p>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (project.links.length === 0) return null;
  return (
    <ul
      aria-label={`${project.title} links`}
      className="mt-auto flex flex-wrap gap-2 pt-6"
    >
      {project.links.map((link) => {
        const Icon = ICONS[link.kind] ?? Link2;
        return (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 border border-(--cv-line-strong) px-3 text-sm font-medium text-(--cv-ink) transition-colors duration-200 hover:border-(--cv-cyan) hover:text-(--cv-cyan)"
            >
              <Icon aria-hidden="true" className="size-4" />
              {link.label}
              <span className="sr-only">
                {" "}
                for {project.title} (opens in a new tab)
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`proj-${project.id}`}
      className="retro-border cv-avoid-break relative overflow-hidden bg-(--cv-surface)"
    >
      <div
        aria-hidden="true"
        className="holographic-gradient-alt pointer-events-none absolute inset-x-0 top-0 h-28 opacity-[0.14] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="relative grid gap-x-10 gap-y-5 p-5 md:p-8 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-1 bg-(--cv-ink) px-2 py-1 font-bebas-neue text-sm tracking-[0.16em] text-(--cv-bg)">
              <Star aria-hidden="true" className="size-3.5" />
              Featured
            </span>
            <ProjectDates project={project} />
          </div>
          <h3
            id={`proj-${project.id}`}
            className="mt-3 font-anton text-3xl leading-tight text-balance text-(--cv-ink) uppercase md:text-4xl"
          >
            {project.title}
          </h3>
          <p className="cv-prose mt-3 text-base leading-relaxed text-(--cv-ink) md:text-lg">
            <RichText text={project.description} />
          </p>
          <ProjectLinks project={project} />
        </div>
        <div className="flex flex-col">
          {project.highlights.length > 0 && (
            <ul className="cv-prose space-y-2 text-[15px] leading-relaxed text-(--cv-ink-2)">
              {project.highlights.map((point) => (
                <li
                  key={point}
                  className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-[2px] before:w-2.5 before:bg-(--cv-cyan)"
                >
                  <RichText text={point} />
                </li>
              ))}
            </ul>
          )}
          <Chips
            items={project.tech}
            label={`${project.title} technologies`}
            className="mt-5"
          />
        </div>
      </div>
    </article>
  );
}

function CompactProject({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`proj-${project.id}`}
      className="cv-panel cv-avoid-break flex flex-col p-5 md:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3
          id={`proj-${project.id}`}
          className="text-xl font-semibold text-(--cv-ink)"
        >
          {project.title}
        </h3>
        <ProjectDates project={project} />
      </div>
      <p className="cv-prose mt-3 max-w-[75ch] leading-relaxed text-(--cv-ink-2)">
        <RichText text={project.description} />
      </p>
      {project.highlights.length > 0 && (
        <ul className="cv-prose mt-3 max-w-[75ch] space-y-2 text-[15px] leading-relaxed text-(--cv-ink-2)">
          {project.highlights.map((point) => (
            <li
              key={point}
              className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-[2px] before:w-2.5 before:bg-(--cv-line-strong)"
            >
              <RichText text={point} />
            </li>
          ))}
        </ul>
      )}
      <Chips
        items={project.tech}
        label={`${project.title} technologies`}
        className="mt-4"
      />
      <ProjectLinks project={project} />
    </article>
  );
}

export function CvProjects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  return (
    <div className="space-y-6">
      {featured.length > 0 && (
        <div className="grid gap-6">
          {featured.map((project) => (
            <FeaturedProject key={project.id} project={project} />
          ))}
        </div>
      )}
      {others.length > 0 && (
        <div className="grid gap-6 xl:grid-cols-2 xl:[&>:last-child:nth-child(odd)]:col-span-2">
          {others.map((project) => (
            <CompactProject key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
