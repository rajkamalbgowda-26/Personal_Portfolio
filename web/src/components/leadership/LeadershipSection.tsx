"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Rocket, Users, Building2, CheckCircle2 } from "lucide-react";

interface LeadershipPillar {
  id: string;
  title: string;
  category: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  iconBg: string;
}

const LEADERSHIP_PILLARS: LeadershipPillar[] = [
  {
    id: "adr",
    category: "ARCHITECTURAL GOVERNANCE",
    title: "ADR-Driven Technical Governance",
    summary:
      "Every core architectural choice - LLM orchestration strategy, vector index partitioning, state persistence, or fallback policies - is documented as an immutable Architectural Decision Record (ADR). This ensures clear technical alignment and leaves a permanent audit trail.",
    icon: ShieldCheck,
    accentColor: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-100",
  },
  {
    id: "pod",
    category: "POD DIRECTION & MENTORSHIP",
    title: "Cross-Functional Pod Direction",
    summary:
      "I direct multi-disciplinary delivery pods (AI/ML, Data, Cloud & Full-Stack) from discovery through production deployment. I run active code reviews, unblock team members daily, and empower engineers to take full ownership of core subsystems.",
    icon: Users,
    accentColor: "text-indigo-600",
    iconBg: "bg-indigo-50 border-indigo-100",
  },
  {
    id: "evals",
    category: "PRODUCTION RIGOR",
    title: "Deterministic Guardrails & Evals",
    summary:
      "AI prototypes fail without production guardrails. I establish structured evaluation suites (Evals), automated token cost tracking, and OpenTelemetry distributed tracing so systems meet strict reliability, latency, and budget SLAs.",
    icon: Rocket,
    accentColor: "text-purple-600",
    iconBg: "bg-purple-50 border-purple-100",
  },
  {
    id: "handover",
    category: "FORWARD DEPLOYED PROTOCOL",
    title: "Client Handover & Operational Autonomy",
    summary:
      "Success is defined by what happens after deployment. Every engagement delivers automated CI/CD infrastructure, comprehensive runbooks, and hands-on enablement so internal client teams can operate and scale the platform independently.",
    icon: Building2,
    accentColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-100",
  },
];

export function LeadershipSection() {
  return (
    <section
      id="squad"
      aria-labelledby="leadership-heading"
      className="w-full min-h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] flex flex-col justify-between py-4 md:py-6 px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto selection:bg-blue-500 selection:text-white snap-start overflow-hidden"
    >
      {/* Eyebrow Row */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="font-mono text-xs sm:text-sm text-slate-600 uppercase tracking-widest font-bold">
            ENGINEERING LEADERSHIP &amp; PRACTICE GOVERNANCE
          </span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 font-mono text-xs text-blue-800 font-bold shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Technical Leadership Summary</span>
        </div>
      </div>

      {/* Main 2-Column Executive Summary Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch my-auto">
        {/* Left Column: 4 Substantive Leadership Pillars */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="mb-2">
            <h2
              id="leadership-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Technical leadership built on{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                accountability &amp; rigor.
              </span>
            </h2>
            <p className="font-body text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              How I direct delivery pods, govern architectural decisions, and ensure operational readiness.
            </p>
          </div>

          {/* 4 Detailed Leadership Execution Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {LEADERSHIP_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="p-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {pillar.category}
                      </span>
                      <div className={`p-1.5 rounded-xl border ${pillar.iconBg} ${pillar.accentColor} shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {pillar.title}
                    </h3>

                    <p className="font-body text-xs text-slate-600 leading-relaxed">
                      {pillar.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Hero Presentation Frame & Leadership Philosophy */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
          {/* Hero Image Card */}
          <div className="relative w-full group">
            <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-tr from-blue-500/20 via-indigo-500/15 to-purple-500/20 opacity-80 blur-xl pointer-events-none" />

            <div className="relative w-full aspect-[16/9.5] max-h-[320px] rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-lg ring-1 ring-blue-500/15">
              <Image
                src="/assets/portrait/leadership.png"
                alt="Rajkamal B Gowda - Enterprise AI Architecture & Squad Leadership Presentation"
                fill
                priority
                unoptimized
                className="object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1280px) 100vw, 600px"
              />

              {/* Frosted Glass Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-transparent p-4 sm:p-5 pt-12 flex flex-col justify-end text-white">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-widest uppercase text-cyan-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>PRACTICE LEAD · AI &amp; ML ARCHITECTURE</span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    Rajkamal B Gowda
                  </h3>
                  <p className="font-mono text-xs text-slate-300 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Forward Deployed AI Architect &amp; Squad Lead</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Executive Philosophy Callout Box */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-indigo-600 font-bold uppercase tracking-widest">
                EXECUTIVE SUMMARY
              </span>
              <span className="font-mono text-[11px] text-slate-500 font-medium">
                Leadership Philosophy
              </span>
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base text-slate-900">
              Pragmatic ownership over demo hype.
            </h4>
            <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
              When directing teams, I focus on clarity over complexity. I ensure technical tradeoffs are explicit, code reviews maintain high production standards, and systems perform predictably under real-world enterprise load.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Line */}
      <div className="pt-2 border-t border-slate-200/80 shrink-0">
        <p className="font-mono text-xs text-slate-500 text-center font-medium">
          Focusing on structured governance, pod mentorship, and production operational readiness.
        </p>
      </div>
    </section>
  );
}
