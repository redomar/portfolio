import type { Profile } from "@/data/profile.types";
import { accentAt, inkSoft } from "./theme";

/** Scannable facts strip, straight from `profile.highlights`. */
export function Highlights({
  highlights,
}: {
  highlights: Profile["highlights"];
}) {
  if (highlights.length === 0) return null;

  return (
    <section aria-label="Highlights" className="retro-border">
      <dl className="grid grid-cols-2 gap-px bg-[#1a1a1f]/10 dark:bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
        {highlights.map((item, index) => {
          const accent = accentAt(index);
          return (
            <div
              key={item.label}
              className={`flex flex-col-reverse justify-end gap-2 bg-white p-5 dark:bg-[#1a1a1f] md:p-6 transition-colors duration-300 ${
                index === 0 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <dt className={`text-sm leading-snug text-pretty ${inkSoft}`}>
                {item.label}
              </dt>
              <dd
                className={`font-anton text-5xl leading-none md:text-6xl ${accent.text}`}
              >
                {item.value}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
