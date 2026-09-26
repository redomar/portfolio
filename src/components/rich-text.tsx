import type { ReactNode } from "react";
import type { RichText as RichTextValue } from "@/data/profile.types";

// Matches [label](https://url), **bold** and *italic*, in that priority.
const TOKEN =
  /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;

type Props = {
  text: RichTextValue;
  /** Extra classes for links, e.g. to match a section's accent. */
  linkClassName?: string;
};

export function RichText({ text, linkClassName = "" }: Props) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of text.matchAll(TOKEN)) {
    const [whole, label, url, bold, italic] = match;
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));

    if (label && url) {
      nodes.push(
        <a
          key={key++}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline decoration-[#00d4ff] decoration-2 underline-offset-2 hover:text-[#00d4ff] transition-colors ${linkClassName}`}
        >
          {label}
        </a>,
      );
    } else if (bold) {
      nodes.push(
        <strong key={key++} className="font-semibold">
          {bold}
        </strong>,
      );
    } else if (italic) {
      nodes.push(<em key={key++}>{italic}</em>);
    }
    last = index + whole.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
