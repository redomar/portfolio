import { About } from "@/components/home/about";
import { Certifications } from "@/components/home/certifications";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";
import { Projects } from "@/components/home/projects";
import { Skills } from "@/components/home/skills";
import { Writing } from "@/components/home/writing";
import { ThemeToggle } from "@/components/theme-toggle";
import { content } from "@/data/profile";

const flowingLines = [
  { top: "top-[20%]", color: "text-[#ff0080]", delay: "0s" },
  { top: "top-[40%]", color: "text-[#00d4ff]", delay: "2s" },
  { top: "top-[60%]", color: "text-[#00ff88]", delay: "4s" },
];

export default function Home() {
  const { profile } = content;
  const featured = content.projects.filter((project) => project.featured);
  const github = profile.links.find((link) => link.kind === "github");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F9F7F3] transition-colors duration-300 dark:bg-[#0d0d10]">
      <ThemeToggle />
      {flowingLines.map((line) => (
        <div
          key={line.top}
          aria-hidden="true"
          className={`flowing-line ${line.top} ${line.color} opacity-60 motion-reduce:hidden`}
          style={{ animationDelay: line.delay }}
        />
      ))}

      <main className="mx-auto flex max-w-[1600px] flex-col gap-4 p-4 md:gap-6 md:p-8">
        <Hero profile={profile} />
        <Highlights highlights={profile.highlights} />
        <About summary={profile.summary} />
        <Experience experience={content.experience} />
        <Projects projects={featured} github={github} />
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-12">
          <Skills skills={content.skills} />
          <Certifications certifications={content.certifications} />
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-12">
          <Writing writing={content.writing} />
          <Contact profile={profile} wide={content.writing.length === 0} />
        </div>
      </main>
    </div>
  );
}
