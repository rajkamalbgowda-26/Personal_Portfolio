"use client";

import React from "react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Compass, Sparkles, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-porcelain flex flex-col items-center justify-center px-6 relative overflow-hidden selection:bg-silver-300">
      {/* Background Subtle Dot Grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      {/* Decorative Silver Mercury Droplet Glow in Background */}
      <div className="absolute w-96 h-96 rounded-full bg-radial from-silver-300/40 via-pearl to-transparent blur-3xl pointer-events-none -top-20" />

      <div className="relative z-10 max-w-lg text-center space-y-6">
        {/* System Error Code Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-silver-100 shadow-xs">
          <AlertTriangle className="w-3.5 h-3.5 text-signal" />
          <span className="font-mono text-xs text-graphite-600 uppercase tracking-widest">
            ERROR.404 // LATENT_SPACE_UNRESOLVED
          </span>
        </div>

        {/* Large Chrome Number Display */}
        <div className="font-display font-extrabold text-7xl md:text-9xl text-graphite-900 tracking-tighter leading-none select-none">
          4<span className="text-silver-500">0</span>4
        </div>

        <div>
          <h1 className="font-display font-bold text-2xl text-graphite-900 tracking-tight">
            Latent Coordinates Not Found
          </h1>
          <p className="font-body text-xs md:text-sm text-graphite-600 mt-2 leading-relaxed">
            The requested vector embedding does not converge with any documented architecture
            station, case study, or research paper in the Quicksilver atelier.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <Link href="/">
            <MagneticButton variant="primary" cursorLabel="HOME" className="text-xs px-6 py-2.5">
              <Compass className="w-4 h-4" />
              <span>Return to Atelier</span>
            </MagneticButton>
          </Link>

          <Link href="/lab">
            <MagneticButton variant="pill" cursorLabel="LAB" className="text-xs px-5 py-2.5">
              <Sparkles className="w-4 h-4 text-signal" />
              <span>Material Lab</span>
            </MagneticButton>
          </Link>
        </div>

        {/* System Monospace Annotation */}
        <div className="font-mono text-[10px] text-graphite-600 uppercase tracking-widest pt-8 border-t border-silver-100">
          QUICKSILVER // RAJKAMAL B GOWDA // AI ARCHITECTURE
        </div>
      </div>
    </div>
  );
}

