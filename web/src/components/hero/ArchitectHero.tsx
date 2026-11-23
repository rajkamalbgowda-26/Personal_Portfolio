"use client";

import React from "react";
import Image from "next/image";
import { soundSynth } from "@/lib/sound-synth";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight, Cpu, ExternalLink } from "lucide-react";
import { SystemTicker } from "@/components/hero/SystemTicker";

export function ArchitectHero() {
  return (
    <section id="hero" className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden selection:bg-silver-300 snap-start">
      {/* End-to-End Full-Width Atelier Background with Subtle Edge Feathering */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, black calc(100% - 28px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black calc(100% - 28px), transparent 100%)",
        }}
      >
        <Image
          src="/assets/generated/bg-atelier.png"
          alt="Architect Atelier Studio Background"
          fill
          priority
          unoptimized
          className="object-cover object-center brightness-[0.98] contrast-[1.06] opacity-80"
        />
        {/* Subtle bottom edge fade */}
        <div className="absolute inset-x-0 bottom-0 h-8 md:h-10 bg-gradient-to-t from-slate-50/40 to-transparent" />
      </div>

      {/* Main Container Centered Vertically */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto pt-3 md:pt-6 pb-3 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Typography, Narrative & Metrics (Clean Floating Layout over Atelier) */}
          <div className="lg:col-span-7 space-y-4 lg:space-y-4.5 bg-white/40 backdrop-blur-[2px] p-4 sm:p-5 rounded-3xl">
            {/* Professional Role Indicator */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal" />
              <span className="font-mono text-xs text-graphite-600 uppercase tracking-wider font-semibold">
                FORWARD DEPLOYED ENGINEER · AI & CLOUD
              </span>
            </div>

            {/* Display Headline */}
            <div>
              <h1 className="font-display font-extrabold text-[clamp(2.1rem,5vw,3.75rem)] text-slate-900 tracking-tight leading-[1.08]">
                Human vision. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                  Deployed
                </span> <br />
                intelligence.
              </h1>
              <p className="font-body text-sm md:text-base text-slate-600 mt-3 max-w-2xl leading-relaxed">
                <span>
                  I’m a Forward Deployed Engineer with 7+ years of turning AI ambition into systems that run inside real enterprises. I’ve delivered 17+ production AI platforms for 10+ global clients—including Microsoft, LinkedIn, Lenovo, Amazon, Mars, GSK, BMS, Amgen, and Dubai Islamic Bank—designing the architecture, shipping on Azure &amp; Databricks, and staying until the team runs it with confidence.
                </span>{" "}
                <span className="hidden sm:inline">
                  From multi-agent workflows, MCP servers, and RAG to web-scraping/AEO engines and full-stack command portals, my work is measured by what’s live in production.
                </span>
              </p>
            </div>

            {/* Metrics Stat Bar — Pure Typography & Spacing, Zero Box Borders */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 sm:py-3.5 border-y border-slate-200/90">
              <div>
                <div className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
                  7+
                </div>
                <div className="font-mono text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  Years in the Field
                </div>
              </div>

              <div>
                <div className="font-display font-bold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
                  17+
                </div>
                <div className="font-mono text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  AI Products Shipped
                </div>
              </div>

              <div>
                <div className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
                  10+
                </div>
                <div className="font-mono text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  Enterprise Clients
                </div>
              </div>

              <div>
                <div className="font-display font-bold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tight">
                  12+
                </div>
                <div className="font-mono text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  Engineers Led
                </div>
              </div>
            </div>

            {/* Client strip (small text under the stats) */}
            <div className="pt-0">
              <p className="font-mono text-[11px] sm:text-xs text-slate-500 tracking-wide">
                <span className="font-semibold text-slate-700">Delivered for</span>{" "}
                Microsoft · LinkedIn · Lenovo · Amazon · Mars · GSK · BMS · Amgen · Dubai Islamic Bank
              </p>
            </div>

            {/* Interactive Action Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a href="#projects">
                <MagneticButton
                  variant="primary"
                  onClick={() => soundSynth.playClick()}
                  cursorLabel="WORK"
                  className="text-xs px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-mono font-bold shadow-lg shadow-blue-500/25 border-none"
                >
                  <span>Explore Deployments</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </MagneticButton>
              </a>

              <a href="#skills">
                <MagneticButton
                  variant="secondary"
                  onClick={() => soundSynth.playClick()}
                  cursorLabel="SKILLS"
                  className="text-xs px-5 py-2.5 bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200/90 hover:border-indigo-400 font-mono font-semibold shadow-xs"
                >
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  <span>Technical Skills</span>
                </MagneticButton>
              </a>

              <a
                href="/assets/Rajkamal_Resume.pdf"
                download="Rajkamal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-400 font-mono text-xs font-semibold transition-colors shadow-xs"
              >
                <span>Download Resume</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Executive Portrait & Atelier Framing */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            <div className="relative w-full max-w-[370px] lg:max-w-[390px] mx-auto lg:mr-0 group">
              {/* Radiant Colored Aurora Halo */}
              <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-blue-500/25 via-indigo-500/20 to-violet-500/25 opacity-80 blur-2xl pointer-events-none animate-pulse-subtle" />

              {/* Executive Portrait Frame with fine iridescent glow */}
              <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-white border border-white/80 shadow-[0_20px_50px_rgba(37,99,235,0.12)] ring-1 ring-blue-500/15 transition-all duration-500">
                <Image
                  src="/assets/portrait/hero-portrait.png"
                  alt="Rajkamal B Gowda — Forward Deployed Engineer · AI & Cloud"
                  fill
                  priority
                  unoptimized
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 320px, 420px"
                />

                {/* Bottom Architectural Credential Card */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-transparent p-6 pt-20 flex flex-col justify-end text-white">
                  <div className="font-display font-bold text-xl tracking-tight text-white drop-shadow-sm">
                    Rajkamal B Gowda
                  </div>
                  <div className="font-mono text-xs text-blue-300 mt-1 flex items-center gap-2 font-medium">
                    <span>Forward Deployed Engineer · AI & Cloud</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-300 mt-2 pt-2 border-t border-white/20 flex items-center justify-between">
                    <span>Bengaluru · Global Delivery</span>
                    <span className="text-emerald-400 font-semibold">12+ Engineers Led</span>
                  </div>
                </div>
              </div>

              {/* Sub-Card Technical Metadata Strip */}
              <div className="mt-3 px-2 flex items-center justify-between font-mono text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5 text-blue-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Agentic AI in Production
                </span>
                <span className="text-indigo-700 font-medium">Azure Deployments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live System Metrics Bar Ticker at Station 1 Base */}
      <div className="w-full relative z-20 border-t border-silver-200/80 bg-white/70 backdrop-blur-xs">
        <SystemTicker />
      </div>
    </section>
  );
}
