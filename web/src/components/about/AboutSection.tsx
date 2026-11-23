"use client";

import React from "react";
import Image from "next/image";
import { soundSynth } from "@/lib/sound-synth";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MapPin, Briefcase, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";

const PRINCIPLES = [
  {
    num: "01",
    title: "Understand the workflow first",
    desc: "I learn how the business actually runs, including its data, constraints, and edge cases, before I write any code. The solution fits the work, not the other way around.",
  },
  {
    num: "02",
    title: "Production over prototypes",
    desc: "Every agent and RAG system ships with evaluation, guardrails, and clear latency and cost targets from day one, so it holds up under real use.",
  },
  {
    num: "03",
    title: "Handover that sticks",
    desc: "Migrations, documentation, and hands-on training leave the client’s team owning the system. I stay until they’re confident running it.",
  },
];

const CORE_STACK = [
  "Multi-Agent AI & MCP",
  "Azure OpenAI (GPT-4o)",
  "Hybrid RAG & Vector DBs",
  "Azure Databricks (PySpark)",
  "Python 3.12",
  "FastAPI & Django",
  "Playwright, Scrapy & AEO",
  "Microsoft Presidio (PII)",
  "React & Next.js",
  "Azure Blob & Entra SSO",
  "PostgreSQL & Docker",
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="w-full min-h-[100dvh] flex flex-col justify-center py-6 md:py-8 px-6 md:px-12 max-w-7xl mx-auto selection:bg-blue-500 selection:text-white snap-start"
    >
      {/* Station Annotation */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-signal" />
          <span className="font-mono text-xs text-slate-500 uppercase tracking-widest font-semibold">
            ABOUT THE ENGINEER
          </span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 font-mono text-xs text-emerald-800 font-bold shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>7+ Years in the Field · Forward Deployed</span>
        </div>
      </div>

      {/* Main 2-Column Executive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center">
        {/* Left Column: Prominently Large Executive Portrait */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px] group">
            {/* Soft Ambient Aurora Halo */}
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-blue-500/25 via-indigo-500/20 to-purple-500/25 opacity-80 blur-2xl pointer-events-none animate-pulse-subtle" />

            {/* Main Portrait Frame — Large, Crisp, Unfiltered */}
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-white border border-white/80 shadow-[0_25px_60px_rgba(37,99,235,0.16)] ring-1 ring-blue-500/20 transition-all duration-500">
              <Image
                src="/assets/portrait/about-portrait.png"
                alt="Rajkamal B Gowda — Forward Deployed Engineer · AI & Cloud"
                fill
                priority
                unoptimized
                className="object-cover object-top"
                sizes="(max-width: 768px) 380px, (max-width: 1200px) 460px, 480px"
              />

              {/* Bottom Architectural Credential Card */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-transparent p-5 sm:p-6 pt-16 flex flex-col justify-end text-white">
                <span className="font-mono text-[10px] tracking-widest uppercase text-cyan-400 font-bold">
                  FORWARD DEPLOYED ENGINEER · AI & CLOUD
                </span>
                <span className="font-display font-extrabold text-xl text-white mt-0.5">
                  Rajkamal B Gowda
                </span>
                <span className="font-mono text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  Bengaluru, India · Global Enterprise Delivery
                </span>
              </div>
            </div>

            {/* Quick Context Chips directly underneath photo */}
            <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-slate-700 font-medium truncate">Azure & Python Delivery</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-slate-700 font-medium truncate">10+ Enterprise Clients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio, Three Principles, Core Stack & Action Buttons */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-3.5">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
              Built in the room. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                Proven in production.
              </span>
            </h2>
            <p className="font-body text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
              I’m a Forward Deployed Engineer who works inside the client’s environment, not just alongside it. Over seven-plus years, I’ve taken 17+ AI, data-engineering, and cloud products from an unclear problem to a live enterprise system—building multi-agent workflows, MCP servers &amp; Cowork Copilot plugins, Azure Databricks pipelines, web-scraping/AEO engines, and full-stack command portals for global clients including Microsoft, LinkedIn, Lenovo, Amazon, Mars, GSK, BMS-Heme, Amgen, Organon, Dubai Islamic Bank, and Modefin partner banks.
            </p>
          </div>

          {/* Three Principles (short cards, no stats repeated from hero) */}
          <div className="space-y-2 pt-0.5">
            {PRINCIPLES.map((pr) => (
              <div
                key={pr.num}
                className="p-3 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all space-y-1"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {pr.num}
                  </span>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900">
                    {pr.title}
                  </h4>
                </div>
                <p className="font-body text-xs text-slate-600 leading-relaxed pl-7">
                  {pr.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Core stack (a single row of tags) */}
          <div className="pt-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">
                Core Stack:
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CORE_STACK.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/90 text-slate-700 font-mono text-[11px] font-medium shadow-2xs hover:border-blue-400 hover:text-blue-700 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href="#contact">
              <MagneticButton
                variant="primary"
                onClick={() => soundSynth.playClick()}
                cursorLabel="DEPLOY"
                className="text-xs px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-mono font-bold shadow-lg shadow-blue-500/25 border-none"
              >
                <span>Let’s Talk Deployment</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
      </div>
    </section>
  );
}
