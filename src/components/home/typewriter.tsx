"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

function nextIndex(current: number, count: number) {
  if (count < 2) return current;
  const offset = 1 + Math.floor(Math.random() * (count - 1));
  return (current + offset) % count;
}

type Props = {
  words: string[];
  /** Milliseconds per typed character. */
  speed?: number;
  /** Milliseconds a finished word stays on screen. */
  hold?: number;
  className?: string;
};

/**
 * Types one word at a time, then jumps to a random other word. Starts with the
 * first word. With reduced motion, words swap whole instead of being typed.
 * Screen readers get the full list once instead of the animation.
 */
export function Typewriter({
  words,
  speed = 100,
  hold = 3000,
  className = "",
}: Props) {
  const [state, setState] = useState({ word: 0, length: 0 });
  const reduced = usePrefersReducedMotion();
  const current = words[state.word] ?? "";

  useEffect(() => {
    if (state.length < current.length) {
      const timeout = setTimeout(
        () =>
          setState((s) => ({
            ...s,
            length: reduced ? current.length : s.length + 1,
          })),
        reduced ? 0 : speed,
      );
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(
      () =>
        setState((s) => ({ word: nextIndex(s.word, words.length), length: 0 })),
      hold,
    );
    return () => clearTimeout(timeout);
  }, [state, current, words.length, speed, hold, reduced]);

  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {current.slice(0, state.length)}
        <span className="ml-1 inline-block text-[#00d4ff] motion-safe:animate-pulse">
          ▁
        </span>
      </span>
    </span>
  );
}
