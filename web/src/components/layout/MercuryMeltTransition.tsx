"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

export function MercuryMeltTransition() {
  const pathname = usePathname();
  const calmMode = usePortfolioStore((s) => s.calmMode);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      triggerTransition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const triggerTransition = () => {
    if (calmMode) return;
    setIsTransitioning(true);
    progressRef.current = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const startTime = performance.now();
    const duration = 750; // ms

    const render = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1.0);
      progressRef.current = t;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (t < 1.0) {
        const w = canvas.width;
        const h = canvas.height;

        // Wave phase: 0 -> 0.5 (melt down), 0.5 -> 1.0 (rise out)
        const waveProgress = t < 0.5 ? t * 2 : (1.0 - t) * 2;
        const yOffset = h * (1.0 - waveProgress);

        // Fluid liquid metal curtain
        const gradient = ctx.createLinearGradient(0, yOffset - 80, 0, h);
        gradient.addColorStop(0, "rgba(247, 248, 250, 0)");
        gradient.addColorStop(0.3, "rgba(201, 205, 211, 0.85)");
        gradient.addColorStop(0.7, "rgba(228, 231, 235, 0.98)");
        gradient.addColorStop(1, "rgba(247, 248, 250, 1)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(0, yOffset);

        // Sinusoidal liquid wave ripples
        const slices = 16;
        for (let i = 0; i <= slices; i++) {
          const x = (i / slices) * w;
          const wave = Math.sin((i / slices) * Math.PI * 4 + t * 8.0) * 35 * waveProgress;
          ctx.lineTo(x, yOffset + wave);
        }

        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();

        // Iridescent reflection highlight rim on wave crest
        ctx.strokeStyle = "rgba(159, 231, 245, 0.8)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i <= slices; i++) {
          const x = (i / slices) * w;
          const wave = Math.sin((i / slices) * Math.PI * 4 + t * 8.0) * 35 * waveProgress;
          if (i === 0) ctx.moveTo(x, yOffset + wave);
          else ctx.lineTo(x, yOffset + wave);
        }
        ctx.stroke();

        requestAnimationFrame(render);
      } else {
        setIsTransitioning(false);
      }
    };

    requestAnimationFrame(render);
  };

  if (!isTransitioning) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
      style={{
        opacity: isTransitioning ? 1 : 0,
      }}
    />
  );
}
