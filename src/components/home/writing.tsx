import { ArrowUpRight } from "lucide-react";
import { RichText } from "@/components/rich-text";
import type { Writing as WritingItem } from "@/data/profile.types";
import { ExternalLink } from "./links";
import {
  accents,
  card,
  formatYearMonth,
  ink,
  inkMuted,
  inkSoft,
} from "./theme";

/** Published articles; the newest one gets the full treatment. */
export function Writing({ writing }: { writing: WritingItem[] }) {
  const [latest] = writing;
  if (!latest) return null;

  return (
    <section
      id="writing"
      aria-labelledby="writing-title"
      className={`${card} flex scroll-mt-6 flex-col gap-6 p-6 sm:p-8 md:p-10 lg:col-span-5`}
    >
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 size-64 rounded-full bg-[#b200ff]/15 blur-3xl"
      />
      <h2
        id="writing-title"
        className={`relative z-10 font-anton text-4xl uppercase leading-none md:text-5xl ${ink}`}
      >
        Writing
      </h2>

      <article className="relative z-10 flex flex-1 flex-col gap-4">
        <p className={`font-mono text-xs tracking-wide ${inkMuted}`}>
          <span className={accents.violet.text}>{latest.publisher}</span>
          {latest.date && (
            <>
              {" · "}
              <time dateTime={latest.date}>{formatYearMonth(latest.date)}</time>
            </>
          )}
        </p>
        <h3
          className={`font-bebas-neue text-3xl leading-tight tracking-wide text-balance md:text-4xl ${ink}`}
        >
          {latest.title}
        </h3>
        <p className={`leading-relaxed text-pretty ${inkSoft}`}>
          <RichText text={latest.summary} />
        </p>
        <ExternalLink
          href={latest.url}
          className="group mt-auto inline-flex min-h-12 items-center gap-2 self-start bg-[#b200ff] px-5 font-bebas-neue text-xl tracking-[0.12em] text-white transition-colors hover:bg-[#8a00c7]"
        >
          Read the article
          <span className="sr-only"> on {latest.publisher}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </ExternalLink>
      </article>
    </section>
  );
}
