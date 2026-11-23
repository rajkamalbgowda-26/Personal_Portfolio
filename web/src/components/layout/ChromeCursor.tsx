"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

export function ChromeCursor() {
  const cursorState = usePortfolioStore((s) => s.cursor);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Smooth position & velocity tracking
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const vel = useRef({ x: 0, y: 0 });
  const lastTime = useRef(performance.now());

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => {
      usePortfolioStore.getState().setCursorState({ isDown: true });
    };

    const onMouseUp = () => {
      usePortfolioStore.getState().setCursorState({ isDown: false });
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);

    // Physics render loop for liquid metal stretching
    let rafId: number;
    const updatePhysics = (now: number) => {
      lastTime.current = now;

      // Lerp towards target
      const lerpSpeed = calmMode ? 0.35 : 0.18;
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;

      pos.current.x += dx * lerpSpeed;
      pos.current.y += dy * lerpSpeed;

      vel.current.x = dx;
      vel.current.y = dy;

      if (cursorRef.current) {
        const speed = Math.hypot(vel.current.x, vel.current.y);
        const angle = Math.atan2(vel.current.y, vel.current.x);

        // Calculate stretch based on velocity
        const maxStretch = calmMode ? 1.05 : 1.45;
        const stretch = Math.min(1 + speed * 0.008, maxStretch);
        const squash = Math.max(1 / stretch, 0.75);

        const isHovered = cursorState.variant === "lens" || cursorState.variant === "magnetic";
        const isDown = cursorState.isDown;

        let scaleX = stretch;
        let scaleY = squash;
        let rotate = (angle * 180) / Math.PI;

        if (isHovered) {
          scaleX = 1.35;
          scaleY = 1.35;
          rotate = 0;
        } else if (isDown) {
          scaleX = 0.85;
          scaleY = 0.85;
        }

        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) rotate(${rotate}deg) scale(${scaleX}, ${scaleY})`;

        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
        }
      }

      rafId = requestAnimationFrame(updatePhysics);
    };

    rafId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [calmMode, cursorState.isDown, cursorState.variant, isVisible]);

  if (isTouch || !isVisible) return null;

  const isLens = cursorState.variant === "lens" || cursorState.variant === "magnetic";

  return (
    <>
      {/* Soft Ambient Refraction Halo */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-50 transition-opacity duration-300"
        style={{
          width: isLens ? "80px" : "40px",
          height: isLens ? "80px" : "40px",
          opacity: isLens ? 0.85 : 0.4,
          background:
            "radial-gradient(circle, rgba(159, 231, 245, 0.45) 0%, rgba(201, 184, 255, 0.2) 50%, transparent 70%)",
          filter: "blur(8px)",
          willChange: "transform",
        }}
      />

      {/* Main Liquid Chrome Droplet / Lens */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center transition-[width,height,border-radius,box-shadow,background] duration-200"
        style={{
          width: isLens ? "52px" : "16px",
          height: isLens ? "52px" : "16px",
          borderRadius: "9999px",
          background: isLens
            ? "radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.95), rgba(228, 231, 235, 0.6) 60%, rgba(167, 173, 181, 0.4) 100%)"
            : "radial-gradient(circle at 35% 35%, #FFFFFF 0%, #C9CDD3 55%, #6E747C 100%)",
          backdropFilter: isLens ? "blur(3px) contrast(1.1)" : "none",
          border: isLens ? "1.5px solid rgba(159, 231, 245, 0.8)" : "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow: isLens
            ? "0 0 20px rgba(159, 231, 245, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.9)"
            : "0 2px 8px rgba(22, 24, 28, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.8)",
          willChange: "transform",
        }}
      >
        {isLens && cursorState.label && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-graphite-900 font-bold select-none">
            {cursorState.label}
          </span>
        )}
      </div>
    </>
  );
}
