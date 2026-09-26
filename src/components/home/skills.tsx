import type { SkillGroup } from "@/data/profile.types";
import { MoreLink } from "./links";
import { accentAt, card, ink, inkMuted, inkSoft } from "./theme";

const SKILLS_PER_GROUP = 4;

/** Every skill group, trimmed to its first few skills; full list on /cv. */
export function Skills({ skills }: { skills: SkillGroup[] }) {
  if (skills.length === 0) return null;

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className={`${card} scroll-mt-6 p-6 sm:p-8 md:p-10 lg:col-span-7`}
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-[#ff0080] blur-3xl" />
        <div className="absolute -right-24 -bottom-24 size-96 rounded-full bg-[#00d4ff] blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="skills-title"
              className={`font-anton text-5xl uppercase tracking-[-0.01em] md:text-6xl ${ink}`}
            >
              Tech stack
            </h2>
            <div
              aria-hidden="true"
              className="mt-4 h-1 w-40 holographic-gradient"
            />
          </div>
          <MoreLink href="/cv#skills">All skills</MoreLink>
        </div>

        <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
          {skills.map((group, index) => {
            const accent = accentAt(index);
            const extra = group.skills.length - SKILLS_PER_GROUP;
            return (
              <div key={group.name}>
                <dt
                  className={`flex items-center gap-2 font-bebas-neue text-xl tracking-[0.1em] ${accent.text}`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-2 ${accent.fill}`}
                  />
                  {group.name}
                </dt>
                <dd
                  className={`mt-1 text-[0.95rem] leading-relaxed ${inkSoft}`}
                >
                  {group.skills.slice(0, SKILLS_PER_GROUP).join(" · ")}
                  {extra > 0 && (
                    <span className={`ml-1.5 font-mono text-xs ${inkMuted}`}>
                      +{extra} more
                    </span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
