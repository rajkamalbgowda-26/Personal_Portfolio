"use client";

import React from "react";
import Image from "next/image";
import SkillsShowcase from "@/components/SkillsShowcase";

export function CapabilitiesSection() {
  return (
    <section
      id="skills"
      className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-hidden selection:bg-blue-500 selection:text-white snap-start"
    >
      {/* End-to-End Full-Width Background: OG Portrait with Subtle Edge Feathering */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 28px, black calc(100% - 28px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 28px, black calc(100% - 28px), transparent 100%)",
        }}
      >
        <Image
          src="/assets/portrait/og-portrait.png"
          alt="Technical Skills Architecture Background"
          fill
          priority
          unoptimized
          className="object-cover object-[85%_center] lg:object-[82%_center] opacity-100"
        />
        {/* Subtle top, bottom, and left edge fades */}
        <div className="absolute inset-x-0 top-0 h-8 md:h-10 bg-gradient-to-b from-slate-50/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-8 md:h-10 bg-gradient-to-t from-slate-50/40 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-slate-50/40 to-transparent" />
      </div>

      {/* Main Container with Floating Transparent Box */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-8 md:py-10 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Floating Transparent Box: Houses all skills cleanly over the background */}
          <div className="lg:col-span-8 xl:col-span-8 relative group">
            {/* Spreading Radiant Aurora Glow Halo behind skills box */}
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-blue-500/25 via-indigo-500/20 to-violet-500/25 opacity-80 group-hover:opacity-100 blur-2xl pointer-events-none transition-opacity duration-500 animate-pulse-subtle" />

            <SkillsShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
