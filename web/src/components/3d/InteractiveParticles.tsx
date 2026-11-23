"use client";

import React, { useEffect, useRef } from "react";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  useEffect(() => {
    if (calmMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Vibrant luminous aurora palette: electric cyan, royal azure, vivid violet, and rose stardust
    const colors = [
      "rgba(37, 99, 235, 0.40)",   // Royal azure
      "rgba(124, 58, 237, 0.35)",  // Electric violet
      "rgba(6, 182, 212, 0.38)",   // Vibrant cyan
      "rgba(219, 39, 119, 0.28)",  // Soft rose shimmer
      "rgba(147, 197, 253, 0.50)", // Radiant sky dust
    ];

    // Gentle, airy count so it never clutters the screen
    const count = Math.min(Math.floor((width * height) / 24000), 50);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Gentle drift
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce boundaries
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Soft cursor deflection
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p1.x += (dx / dist) * force * 2.5;
          p1.y += (dy / dist) * force * 2.5;
        }

        // Render delicate silver particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.shadowBlur = 0;
        ctx.fill();

        // Connect nearby points with faint silver threads
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d2 = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          const maxDist = 110;
          if (d2 < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - d2 / maxDist) * 0.12;
            ctx.strokeStyle = `rgba(203, 213, 225, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [calmMode]);

  if (calmMode) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-60 transition-opacity duration-700"
    />
  );
}
