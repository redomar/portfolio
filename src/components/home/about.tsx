import Image from "next/image";
import { RichText } from "@/components/rich-text";
import type { Profile } from "@/data/profile.types";
import { card, ink, inkSoft } from "./theme";

/**
 * Intro from `profile.summary`: the first paragraph in the About card, any
 * further paragraphs (the AI focus) in the gradient card beside it.
 */
export function About({ summary }: { summary: Profile["summary"] }) {
  const [intro, ...rest] = summary;
  if (!intro) return null;

  return (
    <section
      aria-labelledby="about-title"
      className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6"
    >
      <div
        className={`${card} p-6 sm:p-8 md:p-10 ${rest.length ? "md:col-span-7" : "md:col-span-12"}`}
      >
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 size-64 rounded-full bg-[#ff0080]/10 blur-3xl"
        />
        <div className="relative z-10">
          <h2
            id="about-title"
            className={`font-anton text-5xl uppercase tracking-[-0.01em] md:text-6xl ${ink}`}
          >
            About
          </h2>
          <div
            aria-hidden="true"
            className="mt-4 mb-6 h-1 w-32 holographic-gradient"
          />
          <p
            className={`max-w-[68ch] text-lg leading-relaxed text-pretty ${inkSoft}`}
          >
            <RichText text={intro} />
          </p>
        </div>
      </div>

      {rest.length > 0 && (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#006d94] via-[#5b17c2] to-[#9a00dd] p-6 text-white vhs-scanlines sm:p-8 md:col-span-5 md:p-10">
          <div aria-hidden="true" className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover mix-blend-overlay"
              unoptimized
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -right-12 -bottom-12 size-64 rounded-full border-4 border-white/20"
          />
          <div className="relative z-20">
            <h2 className="font-anton text-4xl uppercase leading-[0.95] md:text-5xl">
              Building
              <br />
              with AI
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/90 text-pretty [&_a]:decoration-white [&_a:hover]:text-white [&_strong]:text-white">
              {rest.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
