import type { Certification } from "@/data/profile.types";
import { MaybeLink, MoreLink } from "./links";
import { accents, card, ink, inkMuted, inkSoft } from "./theme";

const TEASER_COUNT = 3;

/** Count by issuer, in first-seen order: [["Anthropic", 4], ...]. */
function tallyIssuers(certifications: Certification[]) {
  const counts = new Map<string, number>();
  for (const cert of certifications) {
    counts.set(cert.issuer, (counts.get(cert.issuer) ?? 0) + 1);
  }
  return [...counts];
}

/** Count, issuers and a few names; the full list lives on /cv. */
export function Certifications({
  certifications,
}: {
  certifications: Certification[];
}) {
  const earned = certifications.filter((cert) => !cert.inProgress);
  const inProgress = certifications.filter((cert) => cert.inProgress);
  if (certifications.length === 0) return null;

  const teaser = [...inProgress, ...earned.slice(0, TEASER_COUNT)];
  const issuers = tallyIssuers(earned);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className={`${card} flex scroll-mt-6 flex-col gap-8 p-6 sm:p-8 md:p-10 lg:col-span-5`}
    >
      <div className="flex items-end gap-5">
        <p
          className={`font-anton text-8xl leading-[0.8] ${accents.cyan.text}`}
          aria-hidden="true"
        >
          {earned.length}
        </p>
        <div>
          <h2
            id="certifications-title"
            className={`font-anton text-4xl uppercase leading-none md:text-5xl ${ink}`}
          >
            <span className="sr-only">{earned.length} </span>
            Certifications
          </h2>
          {inProgress.length > 0 && (
            <p className={`mt-2 font-mono text-xs ${inkMuted}`}>
              + {inProgress.length} in progress
            </p>
          )}
        </div>
      </div>

      {issuers.length > 0 && (
        <ul aria-label="By issuer" className="flex flex-wrap gap-2">
          {issuers.map(([issuer, count]) => (
            <li
              key={issuer}
              className={`border-2 border-[#1a1a1f] px-3 py-1 font-bebas-neue text-lg tracking-[0.12em] dark:border-white ${ink}`}
            >
              {issuer}
              {count > 1 && (
                <span
                  className={`ml-1.5 font-mono text-sm ${accents.pink.text}`}
                >
                  ×{count}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      <ul className="space-y-4">
        {teaser.map((cert) => (
          <li key={cert.name} className="flex flex-col gap-0.5">
            <span className={`font-semibold leading-snug ${ink}`}>
              <MaybeLink href={cert.url}>{cert.name}</MaybeLink>
            </span>
            <span className={`font-mono text-xs ${inkSoft}`}>
              {cert.issuer}
              {" · "}
              {cert.inProgress ? (
                <span className={accents.mint.text}>In progress</span>
              ) : (
                cert.awarded
              )}
            </span>
          </li>
        ))}
      </ul>

      <MoreLink href="/cv#certifications" className="mt-auto self-start">
        All certifications
      </MoreLink>
    </section>
  );
}
