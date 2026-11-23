"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

gsap.registerPlugin(ScrollTrigger);

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: Record<string, unknown>) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

export function LenisScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  useEffect(() => {
    // If calmMode is active or user prefers reduced motion, we can use softer or native scroll
    const lenis = new Lenis({
      duration: calmMode ? 0.6 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard quintic out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [calmMode]);

  const scrollTo = (target: string | HTMLElement | number, options?: Record<string, unknown>) => {
    lenisRef.current?.scrollTo(target, options);
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
