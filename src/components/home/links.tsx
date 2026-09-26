import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Github,
  Globe,
  Linkedin,
  type LucideIcon,
} from "lucide-react";
import NextLink from "next/link";
import type { ReactNode } from "react";
import type { Link } from "@/data/profile.types";
import { focusRing } from "./theme";

const kindIcons: Record<Link["kind"], LucideIcon> = {
  website: Globe,
  github: Github,
  linkedin: Linkedin,
  article: FileText,
  repo: Github,
  company: Globe,
  other: ArrowUpRight,
};

export const iconForLink = (kind: Link["kind"]) => kindIcons[kind];

type ExternalProps = {
  href: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

/** External link that always opens safely in a new tab. */
export function ExternalLink({ href, className = "", ...rest }: ExternalProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${focusRing} ${className}`}
      {...rest}
    />
  );
}

/** Company / product name that links out when a URL exists. */
export function MaybeLink({
  href,
  className = "",
  children,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  if (!href) return <span className={className}>{children}</span>;
  return (
    <ExternalLink
      href={href}
      className={`underline decoration-[#00a3c4] dark:decoration-[#00d4ff] decoration-2 underline-offset-4 hover:text-[#00729a] dark:hover:text-[#00d4ff] transition-colors ${className}`}
    >
      {children}
    </ExternalLink>
  );
}

/** "See full experience →" style link into the /cv page. */
export function MoreLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <NextLink
      href={href}
      className={`group inline-flex min-h-10 items-center gap-2 font-bebas-neue text-xl tracking-[0.12em] text-[#1a1a1f] dark:text-white hover:text-[#c7006a] dark:hover:text-[#ff0080] transition-colors ${focusRing} ${className}`}
    >
      <span className="border-b-2 border-[#ff0080] leading-none pb-0.5">
        {children}
      </span>
      <ArrowRight
        aria-hidden="true"
        className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </NextLink>
  );
}
