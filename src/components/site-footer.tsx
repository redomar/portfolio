import { getBuildInfo } from "@/lib/build-info";

const FIRST_YEAR = 2025;

export function SiteFooter() {
  const info = getBuildInfo();
  const year = info.builtAt.getUTCFullYear();
  const years = year > FIRST_YEAR ? `${FIRST_YEAR}–${year}` : `${FIRST_YEAR}`;
  const builtAt = `${info.builtAt.toISOString().slice(0, 16).replace("T", " ")} UTC`;

  return (
    <footer className="relative bg-[#F9F7F3] dark:bg-[#0d0d10] transition-colors duration-300">
      <div className="h-1 w-full holographic-gradient" />
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="font-bebas-neue text-xl tracking-[0.2em] text-[#1a1a1f] dark:text-white">
          © {years} Mohamed Omar · All rights reserved
        </p>
        <dl className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-[#1a1a1f]/70 dark:text-white/60">
          <div className="flex gap-1.5">
            <dt>version</dt>
            <dd className="text-[#1a1a1f] dark:text-white">v{info.version}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt>commit</dt>
            <dd className="text-[#1a1a1f] dark:text-white">
              {info.commitUrl ? (
                <a
                  href={info.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[#00d4ff] underline-offset-2 hover:text-[#00d4ff]"
                >
                  {info.commit}
                </a>
              ) : (
                "unknown"
              )}
              {info.branch && info.branch !== "HEAD" && (
                <span className="text-[#1a1a1f]/50 dark:text-white/40">
                  {" "}
                  ({info.branch})
                </span>
              )}
            </dd>
          </div>
          {info.dirty && (
            <div className="text-[#ff0080] font-bold">
              + uncommitted changes
            </div>
          )}
          <div className="flex gap-1.5">
            <dt>built</dt>
            <dd className="text-[#1a1a1f] dark:text-white">{builtAt}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt>env</dt>
            <dd className="text-[#1a1a1f] dark:text-white">
              {info.environment}
            </dd>
          </div>
        </dl>
      </div>
    </footer>
  );
}
