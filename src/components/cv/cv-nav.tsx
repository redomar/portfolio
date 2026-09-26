"use client";

import { useEffect, useRef, useState } from "react";

export type CvNavItem = { id: string; label: string };

/**
 * In-page section navigation. The markup is plain anchor links (works without
 * JS); the client part only tracks which section is in view so the matching
 * link can be highlighted, and keeps it visible in the mobile scroller.
 */
export function CvNav({
  items,
  className = "",
}: {
  items: CvNavItem[];
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom && items.length > 0) {
        const last = document.getElementById(items[items.length - 1].id);
        if (last && last.getBoundingClientRect().top < window.innerHeight) {
          current = items[items.length - 1].id;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  // Keep the active link in view inside the horizontal (mobile) scroller,
  // without scrolling the page itself.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !active || list.scrollWidth <= list.clientWidth) return;
    const link = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!link) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    list.scrollTo({
      left: link.offsetLeft - list.clientWidth / 2 + link.clientWidth / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active]);

  return (
    <nav
      aria-label="CV sections"
      data-print="hide"
      className={`cv-nav ${className}`}
    >
      <p className="mb-4 hidden font-bebas-neue text-lg tracking-[0.2em] text-(--cv-ink-3) lg:block">
        On this page
      </p>
      <ul
        ref={listRef}
        className="cv-nav-list flex gap-1 overflow-x-auto px-3 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
      >
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              data-id={item.id}
              aria-current={active === item.id ? "true" : undefined}
              className="cv-nav-link flex min-h-11 items-center gap-3 px-2.5 font-bebas-neue text-lg tracking-[0.14em] whitespace-nowrap text-(--cv-ink-3) hover:text-(--cv-ink) lg:px-0 lg:text-xl"
            >
              <span
                aria-hidden="true"
                className="cv-nav-mark holographic-gradient hidden h-[3px] w-5 lg:block"
              />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
