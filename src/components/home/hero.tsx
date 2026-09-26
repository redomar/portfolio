import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import type { Profile } from "@/data/profile.types";
import { ExternalLink, iconForLink } from "./links";
import { accents, card, focusRing, ink, inkSoft } from "./theme";
import { Typewriter } from "./typewriter";

/** Personal interests for the photo card (not CV facts). */
const INTERESTS = [
  "Programmer",
  "Photographer",
  "Adventurer",
  "Scripter",
  "Gamer",
  "Muslim",
  "Reader",
  "Bot_Laner",
];

const siteHost = (profile: Profile) => {
  const site = profile.links.find((link) => link.kind === "website");
  return site ? new URL(site.url).host : undefined;
};

export function Hero({ profile }: { profile: Profile }) {
  const socials = profile.links.filter(
    (link) => link.kind === "github" || link.kind === "linkedin",
  );
  const host = siteHost(profile);

  return (
    <section
      aria-labelledby="hero-name"
      className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6"
    >
      <div className={`${card} vhs-scanlines md:col-span-8`}>
        <div
          aria-hidden="true"
          className="absolute inset-0 holographic-gradient opacity-15 dark:opacity-20"
        />
        <div className="relative z-10 flex h-full flex-col gap-10 p-6 sm:p-8 md:p-12">
          {/* Status sits in the same top-right spot, at the same height, as the
              terminal badge on the photo card beside it. */}
          <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
            {profile.openToWork && (
              <p className="inline-flex h-12 items-center gap-2 border-2 border-[#007a45] dark:border-[#00ff88] bg-white/80 dark:bg-black/80 px-4 font-bebas-neue text-lg tracking-[0.15em] text-[#007a45] dark:text-[#00ff88]">
                <span aria-hidden="true" className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full rounded-full bg-[#00ff88] opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-[#00c96b] dark:bg-[#00ff88]" />
                </span>
                Open to new roles
              </p>
            )}
            <p
              className={`inline-flex items-center gap-1.5 font-mono text-xs ${inkSoft}`}
            >
              <MapPin aria-hidden="true" className="size-4" />
              {profile.location}
            </p>
          </div>
          {/* Keeps the name clear of the theme toggle and the status badge. */}
          <div aria-hidden="true" className="h-12" />

          <div className="lens-flare">
            <h1
              id="hero-name"
              className={`font-anton uppercase leading-[0.9] tracking-[-0.02em] text-balance text-[clamp(3.25rem,10vw,6rem)] ${ink}`}
            >
              {profile.name}
            </h1>
            {host && (
              <p
                className={`mt-3 font-bebas-neue text-xl tracking-[0.3em] md:text-2xl ${inkSoft}`}
              >
                {host}
              </p>
            )}
          </div>

          <div className="mt-auto space-y-6">
            <div className="space-y-3">
              <p
                className={`font-bebas-neue text-4xl tracking-wide md:text-6xl ${accents.pink.text}`}
              >
                {profile.headline}
              </p>
              <p
                className={`max-w-[60ch] text-lg leading-relaxed text-pretty md:text-xl ${inkSoft}`}
              >
                {profile.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <NextLink
                href="/cv"
                className={`group inline-flex min-h-12 items-center gap-3 bg-[#ff0080] px-6 font-bebas-neue text-2xl tracking-[0.12em] text-[#0d0d10] shadow-[5px_5px_0_#00a3c4] dark:shadow-[5px_5px_0_#00d4ff] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#00a3c4] dark:hover:shadow-[7px_7px_0_#00d4ff] motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 ${focusRing}`}
              >
                View full CV
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </NextLink>
              {socials.map((link) => {
                const Icon = iconForLink(link.kind);
                return (
                  <ExternalLink
                    key={link.url}
                    href={link.url}
                    className={`inline-flex min-h-12 items-center gap-2 border-2 border-[#1a1a1f] dark:border-white px-5 font-bebas-neue text-xl tracking-[0.12em] hover:bg-[#1a1a1f] hover:text-white dark:hover:bg-white dark:hover:text-[#0d0d10] transition-colors ${ink}`}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                    {link.label}
                  </ExternalLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="group relative min-h-[420px] overflow-hidden bg-[#1a1a1f] retro-border vhs-scanlines md:col-span-4">
        <Image
          src="/outlook.jpeg"
          alt={`Portrait of ${profile.name}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-70 motion-reduce:transition-none"
          style={{ objectPosition: "87% center" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#ff0080]/40 to-[#00d4ff]/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
        />
        <p className="absolute top-4 right-4 z-20 min-w-[50px] border-2 border-[#00d4ff] bg-black/80 px-5 py-3 font-mono text-sm font-bold tracking-wider text-white">
          <Typewriter words={INTERESTS} speed={100} hold={3000} />
        </p>
      </div>
    </section>
  );
}
