"use client";

import React, { useState } from "react";
import { soundSynth } from "@/lib/sound-synth";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

interface Contribution {
  id: string;
  title: string;
  desc: string;
}

const CONTRIBUTIONS: Contribution[] = [
  {
    id: "01",
    title: "Separate sentiment channels",
    desc: "Maintains direct evidence and sentiment inherited from descendant themes independently, preserving their origins.",
  },
  {
    id: "02",
    title: "Traceable contribution chains",
    desc: "Links sentiment updates to source evidence, predecessor contributions, and transformation records.",
  },
  {
    id: "03",
    title: "Version-validated transactions",
    desc: "Checks graph and node versions before committing related updates, helping prevent stale or partially applied chains.",
  },
  {
    id: "04",
    title: "Contradiction handling",
    desc: "Preserves conflicting sentiment and supports controlled attenuation or quarantine of disputed propagation.",
  },
  {
    id: "05",
    title: "Reversible updates",
    desc: "Supports targeted correction and retraction using the original committed contribution path, even after the hierarchy changes.",
  },
  {
    id: "06",
    title: "Recovery and replay",
    desc: "Uses committed records and version-bound path certificates to reconstruct state without repeating inference on unchanged evidence.",
  },
];

const DOMAINS = [
  "Natural Language Processing",
  "Hierarchical Sentiment Analysis",
  "Graph State Management",
  "Data Provenance",
  "Transactional Consistency",
  "Incremental Analytics",
];

const APPLICATIONS = [
  "Customer experience analytics",
  "Support-ticket intelligence",
  "Contact-centre analytics",
  "Product-feedback monitoring",
  "Survey analysis",
  "Enterprise text analytics",
];

export function PatentSection() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const handleStepClick = (step: number) => {
    setActiveStep(step);
    soundSynth.playClick();
  };

  return (
    <section id="patent" className="py-24 px-6 md:px-16 max-w-7xl mx-auto selection:bg-silver-300 border-t border-silver-100">
      {/* Section Annotation */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-signal" />
        <span className="sys-annotation text-graphite-600">SYS.05 // INTELLECTUAL PROPERTY & PATENTS</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-silver-200 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-graphite-900 leading-tight">
            Original thinking. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-graphite-900 via-silver-700 to-signal">
              A traceable foundation.
            </span>
          </h2>
          <p className="font-body text-base md:text-lg text-graphite-600 mt-4 max-w-3xl leading-relaxed">
            An architecture for sentiment that stays consistent, traceable, and reversible as evidence and theme hierarchies change.
          </p>
        </div>

        {/* Single Verified Status Badge for Section */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pearl border border-silver-300 font-mono text-xs text-graphite-900 font-semibold shrink-0">
          <span className="w-2 h-2 rounded-full bg-signal" />
          <span>APPLICATION NO. 202641107255</span>
        </div>
      </div>

      {/* Main Patent Showcase (Clean Spacing, No Arbitrary Border Beams) */}
      <div className="bg-white rounded-3xl p-8 md:p-12 mb-16 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Patent Dossier */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="font-mono text-xs text-signal font-semibold uppercase tracking-wider">
                PUBLISHED PATENT APPLICATION · GRANT PENDING
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-graphite-900 leading-snug">
                Causal-Consistent Hierarchical Sentiment State Reconciliation Using Version-Fenced Reversible Contribution Chains
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-pearl/60 space-y-3">
              <span className="font-mono text-xs text-graphite-500 font-semibold uppercase tracking-wider block">
                TECHNICAL ABSTRACT & PROBLEM STATEMENT:
              </span>
              <p className="font-body text-sm text-graphite-700 leading-relaxed">
                Designed a computer-implemented architecture for maintaining consistent, traceable sentiment
                across a thematic hierarchy, including macro-themes, themes, and micro-themes. The invention
                addresses how sentiment states must be updated when source evidence changes, conflicting
                sentiment appears, or the theme hierarchy evolves over time.
              </p>
            </div>

            {/* Interactive Concept Walkthrough Steps */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-graphite-900 uppercase tracking-wider block">
                CONCEPTUAL TRACE WALKTHROUGH:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { step: 1, label: "01 Add evidence" },
                  { step: 2, label: "02 Conflict" },
                  { step: 3, label: "03 Stale update" },
                  { step: 4, label: "04 Retract" },
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => handleStepClick(s.step)}
                    className={`px-3 py-2 rounded-xl font-mono text-xs text-left transition-all border ${
                      activeStep === s.step
                        ? "bg-graphite-900 text-white border-graphite-900 shadow-sm"
                        : "bg-white text-graphite-600 border-silver-200 hover:border-silver-400"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Active Step State Commentary */}
              <div className="p-4 rounded-xl bg-pearl border border-silver-200 font-mono text-xs text-graphite-800">
                {activeStep === 1 && (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-graphite-900">E01 / POSITIVE EVIDENCE:</strong> &ldquo;The support team resolved my incident in 10 minutes.&rdquo;
                      <p className="text-graphite-600 mt-1 font-sans text-xs">
                        Direct evidence commits to Micro-Theme (Resolution Quality, v1). Inherited sentiment propagates to Theme (Support, v1) and Macro-Theme (CX, v1) with forward certificate.
                      </p>
                    </div>
                  </div>
                )}
                {activeStep === 2 && (
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-graphite-900">E02 / CONTRADICTION DETECTED:</strong> &ldquo;Resolution failed after agent closed ticket.&rdquo;
                      <p className="text-graphite-600 mt-1 font-sans text-xs">
                        Contradiction handling activates: preserves opposing sentiment vectors independently without destructive scalar averaging, quarantining disputed branch propagation.
                      </p>
                    </div>
                  </div>
                )}
                {activeStep === 3 && (
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-signal shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-graphite-900">VERSION FENCE REJECTION:</strong> Stale transaction from node.v1 rejected by graph.v2.
                      <p className="text-graphite-600 mt-1 font-sans text-xs">
                        Graph topology evolved; transaction commits require version-matched certificates, preventing phantom overwrites and race conditions.
                      </p>
                    </div>
                  </div>
                )}
                {activeStep === 4 && (
                  <div className="flex items-start gap-2">
                    <RotateCcw className="w-4 h-4 text-iris-lilac shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-graphite-900">REVERSIBLE CONTRIBUTION RETRACTION:</strong> Rollback applied cleanly.
                      <p className="text-graphite-600 mt-1 font-sans text-xs">
                        Targeted retraction traces original committed hash chain back through parent nodes without triggering re-inference on unchanged historical evidence.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Conceptual Graph Hierarchy Model */}
          <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-silver-200 lg:pl-8">
            <div className="flex items-center justify-between pb-2 border-b border-silver-100">
              <span className="font-mono text-xs font-bold text-graphite-900 uppercase">
                VERSION-FENCED GRAPH MODEL
              </span>
              <span className="font-mono text-[10px] text-signal font-bold">
                graph.v2 / node.v2
              </span>
            </div>

            {/* 3-Tier Hierarchy Topology */}
            <div className="space-y-3">
              {/* Tier 01: Macro-Theme */}
              <div className="p-4 rounded-2xl bg-white border border-silver-300 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-graphite-900 text-white font-bold">
                    01 // MACRO-THEME
                  </span>
                  <span className="text-graphite-600">node.v2</span>
                </div>
                <div className="font-display font-bold text-sm text-graphite-900">
                  Customer Experience
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-graphite-600 pt-1 border-t border-silver-100">
                  <span>Direct: 0.88</span>
                  <span className="text-signal font-semibold">Inherited: +0.74</span>
                </div>
              </div>

              {/* Connecting Pipe */}
              <div className="flex justify-center -my-1 text-silver-400 font-mono text-xs">
                ↕ Reversible Chain
              </div>

              {/* Tier 02: Theme */}
              <div className="p-4 rounded-2xl bg-white border border-silver-300 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-silver-200 text-graphite-900 font-bold">
                    02 // THEME
                  </span>
                  <span className="text-graphite-600">node.v2</span>
                </div>
                <div className="font-display font-bold text-sm text-graphite-900">
                  Customer Support
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-graphite-600 pt-1 border-t border-silver-100">
                  <span>Direct: 0.82</span>
                  <span className="text-signal font-semibold">Inherited: +0.79</span>
                </div>
              </div>

              {/* Connecting Pipe */}
              <div className="flex justify-center -my-1 text-silver-400 font-mono text-xs">
                ↕ Reversible Chain
              </div>

              {/* Tier 03: Micro-Theme */}
              <div className="p-4 rounded-2xl bg-white border border-signal shadow-xs space-y-1.5 ring-1 ring-signal/20">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-signal text-white font-bold">
                    03 // MICRO-THEME
                  </span>
                  <span className="text-signal font-bold">node.v2</span>
                </div>
                <div className="font-display font-bold text-sm text-graphite-900">
                  Resolution Quality
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-graphite-600 pt-1 border-t border-silver-100">
                  <span className="text-emerald-600 font-bold">Evidence: E01, E02</span>
                  <span className="text-graphite-900 font-semibold">Net: +0.76</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-pearl/60 border border-silver-100 text-[10px] font-mono text-graphite-600 text-center">
              COMMIT · TRACE · RECONCILE // REVERSIBLE CONTRIBUTION CHAINS
            </div>
          </div>
        </div>
      </div>

      {/* 6 Key Technical Contributions Grid */}
      <div className="mb-12">
        <div className="mb-6">
          <span className="sys-annotation text-graphite-600 block mb-1">
            PATENT CLAIMS & INNOVATION SPECIFICATION
          </span>
          <h3 className="font-display font-bold text-2xl text-graphite-900">
            Six Key Technical Contributions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONTRIBUTIONS.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl bg-white border border-silver-200 hover:border-silver-400 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-signal block mb-2">
                  {c.id} {"//"}
                </span>
                <h4 className="font-display font-bold text-base text-graphite-900 mb-2">
                  {c.title}
                </h4>
                <p className="font-body text-xs text-graphite-600 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Applications & Technical Domains Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-pearl/50 border border-silver-200">
          <span className="font-mono text-xs font-bold text-graphite-900 uppercase tracking-wider block mb-3">
            ENTERPRISE APPLICATIONS:
          </span>
          <div className="flex flex-wrap gap-2">
            {APPLICATIONS.map((app) => (
              <span
                key={app}
                className="px-3 py-1 rounded-lg bg-white border border-silver-200 font-mono text-xs text-graphite-800"
              >
                {app}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-pearl/50 border border-silver-200">
          <span className="font-mono text-xs font-bold text-graphite-900 uppercase tracking-wider block mb-3">
            RESEARCH DOMAINS:
          </span>
          <div className="flex flex-wrap gap-2">
            {DOMAINS.map((domain) => (
              <span
                key={domain}
                className="px-3 py-1 rounded-lg bg-white border border-silver-200 font-mono text-xs text-graphite-800"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
