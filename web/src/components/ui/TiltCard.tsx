"use client";

import React, { useRef, useState } from "react";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tiltIntensity?: number;
}

export function TiltCard({
  children,
  className = "",
  glowColor = "rgba(0, 243, 255, 0.15)",
  tiltIntensity = 10,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (calmMode || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -tiltIntensity;
    const rotY = ((x - centerX) / centerX) * tiltIntensity;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlowPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          isHovered && !calmMode
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className={`relative overflow-hidden rounded-3xl preserve-3d ${className}`}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      {isHovered && !calmMode && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(450px circle at ${glowPos.x}px ${glowPos.y}px, ${glowColor}, transparent 60%)`,
          }}
        />
      )}
      <div className="relative z-20">{children}</div>
    </div>
  );
}

