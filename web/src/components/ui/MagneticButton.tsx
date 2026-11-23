"use client";

import React, { useRef, useState } from "react";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "pill";
  cursorLabel?: string;
  magneticStrength?: number;
}

export function MagneticButton({
  children,
  variant = "primary",
  cursorLabel,
  magneticStrength = 0.35,
  className = "",
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const setCursorState = usePortfolioStore((s) => s.setCursorState);
  const resetCursorState = usePortfolioStore((s) => s.resetCursorState);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (calmMode || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;

    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCursorState({
      variant: cursorLabel ? "lens" : "magnetic",
      label: cursorLabel || null,
    });
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOffset({ x: 0, y: 0 });
    resetCursorState();
    if (onMouseLeave) onMouseLeave(e);
  };

  // Base styling for each variant
  let variantStyles = "";
  if (variant === "primary") {
    variantStyles =
      "relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold border-transparent shadow-md shadow-blue-500/25";
  } else if (variant === "secondary") {
    variantStyles =
      "bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-blue-400 shadow-xs";
  } else if (variant === "pill") {
    variantStyles =
      "bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 hover:border-blue-400 text-xs uppercase tracking-wider font-mono shadow-xs";
  } else if (variant === "ghost") {
    variantStyles = "bg-transparent text-slate-600 hover:text-blue-700 border-none shadow-none";
  }

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 && offset.y === 0 ? "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
        willChange: "transform",
      }}
      className={`inline-flex items-center justify-center font-medium rounded-full px-5 py-2.5 transition-colors duration-200 select-none cursor-pointer ${variantStyles} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

