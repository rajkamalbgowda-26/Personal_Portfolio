"use client";

import { useEffect, useRef } from "react";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

export function QualityDetector() {
  const setQualityTier = usePortfolioStore((s) => s.setQualityTier);
  const setFps = usePortfolioStore((s) => s.setFps);
  const setGpuRenderer = usePortfolioStore((s) => s.setGpuRenderer);
  const setCalmMode = usePortfolioStore((s) => s.setCalmMode);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  const frameTimes = useRef<number[]>([]);
  const lastTimeRef = useRef<number>(performance.now());
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // 1. Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setCalmMode(true);
      setQualityTier("calm");
    }

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setCalmMode(true);
        setQualityTier("calm");
      }
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // 2. Detect GPU Renderer string
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        const renderer = debugInfo
          ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          : gl.getParameter(gl.RENDERER);

        const rendererStr = String(renderer || "Standard WebGL");
        setGpuRenderer(rendererStr);

        // Low-power / mobile GPU detection heuristic
        const isLowTier =
          /swiftshader|llvmpipe|mali-4|adreno (3|4|50)|intel hd graphics (3|4|5)/i.test(
            rendererStr
          ) ||
          (window.matchMedia("(pointer: coarse)").matches &&
            window.navigator.hardwareConcurrency < 4);

        if (isLowTier && !calmMode) {
          setQualityTier("low");
        }
      } else {
        setGpuRenderer("Software Canvas (No WebGL)");
        setQualityTier("low");
      }
    } catch {
      setGpuRenderer("Generic Hardware");
    }

    // 3. Live FPS Monitor
    let sampleCount = 0;
    const measureFps = (now: number) => {
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (delta > 0 && delta < 1000) {
        const currentFps = 1000 / delta;
        frameTimes.current.push(currentFps);
        if (frameTimes.current.length > 60) {
          frameTimes.current.shift();
        }
      }

      sampleCount++;
      if (sampleCount % 45 === 0 && frameTimes.current.length > 0) {
        const avgFps = Math.round(
          frameTimes.current.reduce((a, b) => a + b, 0) / frameTimes.current.length
        );
        setFps(avgFps);

        // Adapt tier dynamically if performance drops consistently
        if (!calmMode) {
          if (avgFps < 28) {
            setQualityTier("low");
          } else if (avgFps < 48) {
            setQualityTier("medium");
          } else {
            setQualityTier("high");
          }
        }
      }

      rafId.current = requestAnimationFrame(measureFps);
    };

    rafId.current = requestAnimationFrame(measureFps);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, [calmMode, setCalmMode, setFps, setGpuRenderer, setQualityTier]);

  return null;
}
