"use client";

import React, { useState } from "react";
import Image from "next/image";
import { soundSynth } from "@/lib/sound-synth";
import { Download } from "lucide-react";

interface JourneyMilestone {
  period: string;
  isCurrent?: boolean;
  role: string;
  company: string;
  location: string;
  logo: string;
  logoAlt: string;
  description: string;
  tags: string[];
}

const CAREER_MILESTONES: JourneyMilestone[] = [
  {
    period: "AUG 2022 - PRESENT",
    isCurrent: true,
    role: "AI Manager & Practice Lead",
    company: "C5i (Course5 Intelligence)",
    location: "Bengaluru",
    logo: "/assets/logos/c5i-logo.svg",
    logoAlt: "C5i Course5 Intelligence Logo",
    description:
      "Lead cross-functional AI squads designing and deploying cloud-native Generative AI, multi-agent systems, and large-scale data intelligence platforms for Fortune 500 clients (Microsoft, LinkedIn, Lenovo, Amazon, Mars, GSK, BMS-Heme, Amgen, Organon, and Dubai Islamic Bank). Architected and delivered 15+ flagship products—including VoC (Multi-Agent RAG, Databricks & Cowork MCP Plugin), Nexora, Data to Deck, Retailer AI Maturity, Beacon, Lenovo 4P Compass, Bio Conferix, Synthetic Virtual Persona, BrandTrax, BrandTrust, POCA, Chat with Pi, TxtSense, Scrapy, and Azure PII Detection—owning delivery from discovery and architecture to client cloud migration and SSO.",
    tags: [
      "15+ Flagship AI Products Shipped",
      "Multi-Agent RAG, MCP & Copilot Plugins",
      "Azure Databricks, Blob & OpenAI",
      "Playwright / Scrapy & AEO Intelligence",
      "12+ Engineers Mentored & Led",
    ],
  },
  {
    period: "MAR 2020 - AUG 2022",
    role: "Full-Stack Python Engineer & AI Lead",
    company: "Modefin",
    location: "Bengaluru",
    logo: "/assets/logos/modefin-logo.svg",
    logoAlt: "Modefin Logo",
    description:
      "Built digital banking products on Modefin’s omnichannel platform for banks across 20+ countries. Developed Python backends with FastAPI and conversational banking chatbots using Rasa NLU and Dialogflow, integrated with core banking APIs and real-time WebSockets. Designed and shipped computer-vision onboarding for banks, including OCR on identity documents, face match, and video-based KYC. Led the AI workstream, owning features from development through deployment.",
    tags: [
      "Full-Stack & AI Engineering",
      "Banking Chatbots (FastAPI & Rasa)",
      "Digital KYC & Video Verification",
      "Biometric Face Match & OCR",
    ],
  },
];

export function JourneySection() {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  return (
    <section
      id="journey"
      className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-hidden selection:bg-silver-300 snap-start py-4 md:py-6"
    >
      {/* End-to-End Full Experience Background with Subtle Edge Feathering */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 28px, black calc(100% - 28px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 28px, black calc(100% - 28px), transparent 100%)",
        }}
      >
        <Image
          src="/assets/generated/experience-bg.png"
          alt="Work Experience Background"
          fill
          priority
          unoptimized
          className="object-cover object-center opacity-80"
        />
        {/* Subtle edge blend gradient overlays to prevent hard borders */}
        <div className="absolute inset-x-0 top-0 h-8 md:h-10 bg-gradient-to-b from-slate-50/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-8 md:h-10 bg-gradient-to-t from-slate-50/40 to-transparent" />
      </div>

      {/* Main Content Container Layer over Background */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col justify-center">
        {/* Station Eyebrow & Header Glass Container */}
        <div className="relative group mb-3.5">
          <div className="absolute -inset-2.5 rounded-[32px] bg-gradient-to-r from-blue-500/20 via-indigo-500/15 to-cyan-400/20 opacity-70 group-hover:opacity-100 blur-xl pointer-events-none transition-opacity duration-500" />
          <div className="relative p-3.5 sm:p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-white/90 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-signal" />
                <span className="font-mono text-xs text-graphite-600 uppercase tracking-widest font-semibold">
                  05 — WORK EXPERIENCE & LEADERSHIP
                </span>
              </div>

              <a
                href="/assets/Rajkamal_Resume.pdf"
                download="Rajkamal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundSynth.playClick()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-slate-50 text-graphite-900 border border-silver-300 font-mono text-[11px] font-semibold transition-colors shadow-2xs shrink-0"
              >
                <span>Full Resume</span>
                <Download className="w-3 h-3 text-signal" />
              </a>
            </div>

            <div className="flex flex-col pt-1.5 border-t border-slate-200/70 gap-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold tracking-tight text-graphite-900 leading-tight">
                Always evolving.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                  Always building.
                </span>
              </h2>
              <p className="font-body text-xs text-graphite-600 max-w-2xl">
                From full-stack digital banking &amp; conversational AI at Modefin, to Generative AI platforms as AI Manager at C5i.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
          {/* Left Column: Enlarged Working Office Atelier Card with Controlled Height */}
          <div className="lg:col-span-4 xl:col-span-4 flex items-center justify-center">
            <div className="relative group max-w-[340px] mx-auto w-full">
              {/* Spreading Aurora Radiant Background Glow Halo */}
              <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-tr from-cyan-400/30 via-blue-500/20 to-indigo-500/25 opacity-80 blur-xl pointer-events-none animate-pulse-subtle" />

              {/* Main Photo Frame with Controlled Aspect Ratio */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full max-h-[360px] sm:max-h-[380px] bg-white border border-white/95 shadow-lg ring-1 ring-blue-500/15">
                <Image
                  src="/assets/generated/working-office.png"
                  alt="Rajkamal B Gowda — AI Architecture & Engineering Leadership"
                  fill
                  priority
                  unoptimized
                  className="object-cover object-top sm:object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Chronological Timeline Cards */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-3">
            {CAREER_MILESTONES.map((m, idx) => {
              const isSelected = selectedMilestone === idx;
              return (
                <div key={idx} className="relative group">
                  {/* Spreading Background Glow Halo behind each company card */}
                  <div className="absolute -inset-2 rounded-[24px] bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-cyan-400/15 opacity-70 group-hover:opacity-100 blur-lg pointer-events-none transition-opacity duration-500" />
                  <div
                    onClick={() => {
                      setSelectedMilestone(idx);
                      soundSynth.playClick();
                    }}
                    className={`relative p-3.5 sm:p-4 rounded-2xl transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-white/90 backdrop-blur-md shadow-md border-signal/40 ring-2 ring-signal/20"
                        : "bg-white/85 backdrop-blur-md hover:bg-white/95 border-white/90 shadow-2xs hover:border-slate-300"
                    }`}
                  >
                    {/* Header: Company Logo, Name, Location & Period */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        {/* Official Company SVG Logo Container */}
                        <div className="relative h-8 w-24 sm:w-28 rounded-lg bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center p-1 shrink-0">
                          <Image
                            src={m.logo}
                            alt={m.logoAlt}
                            width={110}
                            height={30}
                            unoptimized
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                            {m.company}
                          </h4>
                          <span className="font-mono text-[10px] text-slate-500">
                            {m.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-slate-500 font-semibold">
                          {m.period}
                        </span>
                        {m.isCurrent && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[9.5px] font-bold border border-emerald-200 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            CURRENT
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 mb-1">
                      {m.role}
                    </h3>
                    <p className="font-body text-xs sm:text-[12.5px] text-slate-600 leading-relaxed mb-2.5">
                      {m.description}
                    </p>

                    {/* Impact Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 font-mono text-[10.5px]">
                      {m.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-md bg-slate-50/90 border border-slate-200/80 text-slate-700 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
