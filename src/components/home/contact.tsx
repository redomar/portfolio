import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import type { Profile } from "@/data/profile.types";
import { ExternalLink, iconForLink } from "./links";

const button =
  "group inline-flex min-h-12 items-center gap-3 border-2 border-white bg-black/80 px-5 transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Closing call to action: public profile links only (no email or phone). */
export function Contact({
  profile,
  wide = false,
}: {
  profile: Profile;
  /** Span the full row when nothing sits beside it. */
  wide?: boolean;
}) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className={`relative scroll-mt-6 overflow-hidden bg-gradient-to-br from-[#e00070] via-[#9a00dd] to-[#0089b3] p-6 text-white vhs-scanlines sm:p-8 md:p-12 ${wide ? "lg:col-span-12" : "lg:col-span-7"}`}
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/10"
      />
      <div className="relative z-20 flex h-full flex-col gap-10">
        <div className="lens-flare">
          <h2
            id="contact-title"
            className="font-anton text-6xl uppercase leading-[0.9] md:text-8xl"
          >
            Let’s
            <br />
            connect
          </h2>
          <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-white/90">
            {profile.openToWork
              ? `Open to new roles. Based in ${profile.location}.`
              : `Based in ${profile.location}.`}
          </p>
        </div>

        <ul className="mt-auto flex flex-wrap gap-3">
          <li>
            <NextLink href="/cv" className={button}>
              <span className="font-bebas-neue text-xl tracking-[0.12em]">
                Full CV
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-5 transition-colors group-hover:text-[#00d4ff]"
              />
            </NextLink>
          </li>
          {profile.links.map((link) => {
            const Icon = iconForLink(link.kind);
            return (
              <li key={link.url}>
                <ExternalLink href={link.url} className={button}>
                  <Icon
                    aria-hidden="true"
                    className="size-5 transition-colors group-hover:text-[#00d4ff]"
                  />
                  <span className="font-bebas-neue text-xl tracking-[0.12em]">
                    {link.label}
                  </span>
                </ExternalLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
