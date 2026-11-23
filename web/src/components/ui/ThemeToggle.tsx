"use client";

import React, { useEffect, useState } from "react";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { soundSynth } from "@/lib/sound-synth";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const theme = usePortfolioStore((s) => s.theme);
  const toggleTheme = usePortfolioStore((s) => s.toggleTheme);
  const setTheme = usePortfolioStore((s) => s.setTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize theme from localStorage or system preference
    const saved = localStorage.getItem("kairos_theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else {
      // Default to dark mode for cyberpunk aesthetic or match media
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "dark");
    }
  }, [setTheme]);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full border border-silver-300 bg-white/80 dark:bg-slate-900/80" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => {
        soundSynth.playClick();
        toggleTheme();
      }}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="group relative flex items-center justify-center w-9 h-9 rounded-full border border-silver-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 text-graphite-700 dark:text-silver-300 hover:text-signal dark:hover:text-iris-cyan transition-all duration-300 shadow-xs hover:scale-105"
    >
      <div className="relative w-4 h-4">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform duration-500 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 rotate-0 transition-transform duration-500 group-hover:-rotate-12" />
        )}
      </div>
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
}

