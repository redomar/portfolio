import { Github } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import type { Link, Project } from "@/data/profile.types";
import { ExternalLink, MoreLink } from "./links";
import { accentCycle, card, ink, inkSoft } from "./theme";

/** Featured side projects, with the section intro as the first bento cell. */
export function Projects({
  projects,
  github,
}: {
  projects: Project[];
  github?: Link;
}) {
  if (projects.length === 0) return null;

  // Keep rows full on the 3-column grid: the intro sits beside the cards when
  // that fills the row (2, 5, … projects); otherwise it becomes a header row.
  const introBesideCards = (projects.length + 1) % 3 === 0;
  // On the 2-column grid an odd last card would leave a gap, so let it span.
  const oddOnTablet = projects.length % 2 === 1;

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className={`grid scroll-mt-6 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 ${oddOnTablet ? "md:max-lg:[&>*:last-child]:col-span-2" : ""}`}
    >
      <div
        className={`${card} vhs-scanlines flex flex-col gap-6 p-6 sm:p-8 md:col-span-2 ${introBesideCards ? "lg:col-span-1" : "lg:col-span-3 lg:flex-row lg:items-end lg:justify-between lg:gap-10"}`}
      >
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-24 size-72 rounded-full bg-[#00d4ff]/15 blur-3xl"
        />
        <div className="relative z-20">
          <h2
            id="projects-title"
            className={`font-anton text-5xl uppercase leading-[0.95] tracking-[-0.01em] md:text-6xl ${ink}`}
          >
            Featured
            <br />
            projects
          </h2>
          <div
            aria-hidden="true"
            className="mt-4 h-1 w-40 holographic-gradient"
          />
          <p className={`mt-6 max-w-[45ch] text-lg leading-relaxed ${inkSoft}`}>
            What I build outside client work, with the source code and the stack
            behind each one.
          </p>
        </div>
        <div
          className={`relative z-20 mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 ${introBesideCards ? "" : "lg:mt-0 lg:shrink-0"}`}
        >
          <MoreLink href="/cv#projects">All projects</MoreLink>
          {github && (
            <ExternalLink
              href={github.url}
              className={`inline-flex min-h-10 items-center gap-2 font-mono text-sm underline decoration-[#00a3c4] dark:decoration-[#00d4ff] underline-offset-4 ${ink}`}
            >
              <Github aria-hidden="true" className="size-4" />
              {new URL(github.url).host}
              {new URL(github.url).pathname}
            </ExternalLink>
          )}
        </div>
      </div>

      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          accent={accentCycle[index % accentCycle.length]}
        />
      ))}
    </section>
  );
}
