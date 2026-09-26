"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
      className="absolute md:fixed top-8 left-8 z-50 group"
      aria-label="Toggle theme"
    >
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff0080] via-[#b200ff] to-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

        {/* Button container */}
        <div className="relative bg-[#1a1a1f] dark:bg-[#1a1a1f] border-2 border-[#00d4ff] dark:border-[#00d4ff] p-3 group-hover:border-[#ff0080] transition-all duration-300">
          {/* VHS scanlines effect */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="w-full h-full bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)]"></div>
          </div>

          <div className="relative">
            {isDark ? (
              <Sun className="w-6 h-6 text-[#ffff00] group-hover:text-[#ff0080] transition-colors duration-300" />
            ) : (
              <Moon className="w-6 h-6 text-[#b200ff] group-hover:text-[#00d4ff] transition-colors duration-300" />
            )}
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#ff0080] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#00ff88] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#ffff00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Tooltip */}
      <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-black/90 text-white text-xs font-bebas-neue tracking-wider px-3 py-2 border border-[#00d4ff] whitespace-nowrap">
          {isDark ? "LIGHT MODE" : "DARK MODE"}
        </div>
      </div>
    </button>
  );
}
