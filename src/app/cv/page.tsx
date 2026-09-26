import type { Metadata } from "next";
import {
  CvAdditional,
  CvCertifications,
  CvEducation,
  CvLeadership,
  CvSkills,
  CvWriting,
} from "@/components/cv/cv-details";
import {
  CvExperience,
  totalExperienceMonths,
} from "@/components/cv/cv-experience";
import { CvHero, CvTopBar } from "@/components/cv/cv-hero";
import { CvNav, type CvNavItem } from "@/components/cv/cv-nav";
import { CvProjects } from "@/components/cv/cv-projects";
import { formatDuration, plainText } from "@/components/cv/format";
import { Section } from "@/components/cv/primitives";
import { RichText } from "@/components/rich-text";
import { ThemeToggle } from "@/components/theme-toggle";
import { content } from "@/data/profile";
import "./cv.css";

const { profile } = content;

const description = `${profile.headline} based in ${profile.location}. ${plainText(profile.tagline)}`;

export const metadata: Metadata = {
  title: "CV",
  description,
  alternates: { canonical: "/cv" },
  openGraph: {
    type: "profile",
    url: "/cv",
    title: `CV · ${profile.name}`,
    description,
  },
  twitter: {
    card: "summary",
    title: `CV · ${profile.name}`,
    description,
  },
};

export default function CvPage() {
  const {
    experience,
    projects,
    skills,
    certifications,
    education,
    leadership,
    writing,
    additional,
  } = content;

  const skillCount = skills.reduce((n, g) => n + g.skills.length, 0);
  const earnedCount = certifications.filter((c) => !c.inProgress).length;
  const pendingCount = certifications.length - earnedCount;

  // Only list sections that have content, so the nav never points at nothing.
  const nav: CvNavItem[] = [
    { id: "summary", label: "Summary", show: profile.summary.length > 0 },
    { id: "experience", label: "Experience", show: experience.length > 0 },
    { id: "projects", label: "Projects", show: projects.length > 0 },
    { id: "skills", label: "Skills", show: skills.length > 0 },
    {
      id: "certifications",
      label: "Certifications",
      show: certifications.length > 0,
    },
    { id: "education", label: "Education", show: education.length > 0 },
    { id: "leadership", label: "Leadership", show: leadership.length > 0 },
    { id: "writing", label: "Writing", show: writing.length > 0 },
    { id: "additional", label: "Additional", show: additional.length > 0 },
  ]
    .filter((item) => item.show)
    .map(({ id, label }) => ({ id, label }));

  return (
    <div className="cv min-h-screen overflow-x-clip transition-colors duration-300">
      <ThemeToggle />
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <CvTopBar />
        <CvHero profile={profile} latest={experience[0]} />

        <div className="mt-12 flex flex-col gap-12 md:mt-16 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[13rem_minmax(0,1fr)]">
          <CvNav
            items={nav}
            className="sticky bottom-0 order-last lg:top-28 lg:bottom-auto lg:order-none lg:self-start"
          />

          <main className="min-w-0 space-y-20 pb-16 md:space-y-24 md:pb-24">
            {profile.summary.length > 0 && (
              <Section id="summary" title="Summary">
                <div className="cv-prose max-w-[70ch] space-y-5 text-lg leading-relaxed text-pretty text-(--cv-ink-2)">
                  {profile.summary.map((paragraph, index) => (
                    <p
                      key={paragraph}
                      className={
                        index === 0
                          ? "text-xl leading-relaxed text-(--cv-ink) md:text-[1.35rem]"
                          : undefined
                      }
                    >
                      <RichText text={paragraph} />
                    </p>
                  ))}
                </div>
              </Section>
            )}

            {experience.length > 0 && (
              <Section
                id="experience"
                title="Experience"
                aside={`${formatDuration(totalExperienceMonths(experience))} across ${experience.length} companies`}
              >
                <CvExperience experience={experience} />
              </Section>
            )}

            {projects.length > 0 && (
              <Section
                id="projects"
                title="Projects"
                aside={`${projects.length} projects`}
              >
                <CvProjects projects={projects} />
              </Section>
            )}

            {skills.length > 0 && (
              <Section
                id="skills"
                title="Skills"
                aside={`${skillCount} skills across ${skills.length} areas`}
              >
                <CvSkills skills={skills} />
              </Section>
            )}

            {certifications.length > 0 && (
              <Section
                id="certifications"
                title="Certifications"
                aside={`${earnedCount} earned${pendingCount ? ` · ${pendingCount} in progress` : ""}`}
              >
                <CvCertifications certifications={certifications} />
              </Section>
            )}

            <div className="grid gap-20 md:gap-24 xl:grid-cols-2 xl:gap-14">
              {education.length > 0 && (
                <Section id="education" title="Education">
                  <CvEducation education={education} />
                </Section>
              )}
              {leadership.length > 0 && (
                <Section id="leadership" title="Leadership">
                  <CvLeadership leadership={leadership} />
                </Section>
              )}
            </div>

            <div className="grid gap-20 md:gap-24 xl:grid-cols-2 xl:gap-14">
              {writing.length > 0 && (
                <Section id="writing" title="Writing">
                  <CvWriting writing={writing} />
                </Section>
              )}
              {additional.length > 0 && (
                <Section id="additional" title="Additional">
                  <CvAdditional additional={additional} />
                </Section>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
