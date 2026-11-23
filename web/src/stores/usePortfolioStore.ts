import { create } from "zustand";

export type QualityTier = "high" | "medium" | "low" | "calm";
export type CursorVariant = "default" | "lens" | "magnetic" | "text" | "hidden";
export type ThemeMode = "dark" | "light";

export interface CursorState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  hoverTarget: string | null;
  isDown: boolean;
  label: string | null;
  variant: CursorVariant;
  magneticOffset: { x: number; y: number };
}

interface PortfolioState {
  // Theme Mode (Pure Luxury Light Mode)
  theme: ThemeMode;
  setTheme: (theme?: ThemeMode) => void;
  toggleTheme: () => void;

  // Navigation & Sections
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Performance & Quality Tier
  qualityTier: QualityTier;
  setQualityTier: (tier: QualityTier) => void;
  calmMode: boolean;
  setCalmMode: (calm: boolean) => void;
  toggleCalmMode: () => void;
  fps: number;
  setFps: (fps: number) => void;
  gpuRenderer: string;
  setGpuRenderer: (info: string) => void;

  // Global Cursor State
  cursor: CursorState;
  setCursorPos: (x: number, y: number) => void;
  setCursorState: (partial: Partial<CursorState>) => void;
  resetCursorState: () => void;

  // Sound effects toggle
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  theme: "light",
  setTheme: () => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
    set({ theme: "light" });
  },
  toggleTheme: () => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
    set({ theme: "light" });
  },

  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),

  qualityTier: "high",
  setQualityTier: (qualityTier) => set({ qualityTier }),
  calmMode: false,
  setCalmMode: (calmMode) =>
    set({
      calmMode,
      qualityTier: calmMode ? "calm" : "high",
    }),
  toggleCalmMode: () =>
    set((state) => {
      const next = !state.calmMode;
      return {
        calmMode: next,
        qualityTier: next ? "calm" : "high",
      };
    }),
  fps: 60,
  setFps: (fps) => set({ fps }),
  gpuRenderer: "Detecting...",
  setGpuRenderer: (gpuRenderer) => set({ gpuRenderer }),

  cursor: {
    x: -100,
    y: -100,
    targetX: -100,
    targetY: -100,
    hoverTarget: null,
    isDown: false,
    label: null,
    variant: "default",
    magneticOffset: { x: 0, y: 0 },
  },
  setCursorPos: (x, y) =>
    set((state) => ({
      cursor: {
        ...state.cursor,
        x,
        y,
      },
    })),
  setCursorState: (partial) =>
    set((state) => ({
      cursor: {
        ...state.cursor,
        ...partial,
      },
    })),
  resetCursorState: () =>
    set((state) => ({
      cursor: {
        ...state.cursor,
        hoverTarget: null,
        isDown: false,
        label: null,
        variant: "default",
        magneticOffset: { x: 0, y: 0 },
      },
    })),

  soundEnabled: false,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));

