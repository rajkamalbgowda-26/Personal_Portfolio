"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LabMaterialSpheres } from "@/components/3d/LabMaterialSpheres";
import { usePortfolioStore, QualityTier } from "@/stores/usePortfolioStore";
import {
  Sparkles,
  Zap,
  Activity,
  Cpu,
  Eye,
  Sliders,
  Layers,
  ArrowRight,
  ShieldCheck,
  Compass,
} from "lucide-react";

export default function LabPage() {
  const qualityTier = usePortfolioStore((s) => s.qualityTier);
  const setQualityTier = usePortfolioStore((s) => s.setQualityTier);
  const calmMode = usePortfolioStore((s) => s.calmMode);
  const toggleCalmMode = usePortfolioStore((s) => s.toggleCalmMode);
  const fps = usePortfolioStore((s) => s.fps);
  const gpuRenderer = usePortfolioStore((s) => s.gpuRenderer);

  const [counter, setCounter] = useState(0);

  return (
    <main className="min-h-screen bg-porcelain px-6 py-12 md:px-16 max-w-7xl mx-auto selection:bg-silver-300">
      {/* Top Bar Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-silver-100 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-graphite-900 text-white font-mono font-bold text-xs tracking-wider">
              RG
            </span>
            <span className="sys-annotation text-graphite-600">
              SYS.01 // DESIGN SYSTEM & MATERIAL LAB
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-semibold text-graphite-900 tracking-tight mt-2">
            Liquid Silver Atelier
          </h1>
          <p className="text-graphite-600 text-sm md:text-base mt-1 max-w-2xl font-body">
            High-key daylight materials, thin-film iridescence, precision typography tokens, and
            hardware-adaptive rendering loop.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pearl border border-silver-100 font-mono text-xs text-graphite-600">
            <Activity className="w-3.5 h-3.5 text-signal animate-pulse" />
            <span>{fps} FPS</span>
            <span className="text-silver-500">|</span>
            <span className="uppercase text-[10px] font-semibold tracking-wider text-graphite-900">
              {qualityTier} TIER
            </span>
          </div>

          <MagneticButton
            variant={calmMode ? "primary" : "secondary"}
            onClick={toggleCalmMode}
            cursorLabel="TOGGLE"
            className="text-xs px-4 py-2"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Calm Mode: {calmMode ? "ON" : "OFF"}</span>
          </MagneticButton>

          <Link href="/">
            <MagneticButton variant="pill" cursorLabel="HOME" className="px-4 py-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Enter Portfolio</span>
            </MagneticButton>
          </Link>
        </div>
      </header>

      {/* SECTION 1: 3D MATERIAL SPHERES */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="sys-annotation">3D PHYSICAL SHADERS</span>
            <h2 className="text-xl md:text-2xl font-display font-semibold text-graphite-900">
              Light Studio Materials (High-Key HDRI)
            </h2>
          </div>
          <span className="font-mono text-xs text-graphite-600">
            Rendered with ACES Filmic Tone Mapping & Soft Ambient Occlusion
          </span>
        </div>

        <LabMaterialSpheres />
      </section>

      {/* SECTION 2: HARDWARE DETECTION & QUALITY TIERS */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-pearl/60 border border-silver-100 shadow-atelier-card">
          <div className="flex items-center gap-2 text-graphite-900 font-mono text-xs uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4 text-signal" />
            <span>GPU Hardware Detected</span>
          </div>
          <p className="font-mono text-sm text-graphite-900 font-medium break-words">
            {gpuRenderer}
          </p>
          <span className="sys-annotation text-graphite-600 block mt-3">
            AUTOMATIC ADAPTIVE DPR & DRAW-CALL SCALING
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-pearl/60 border border-silver-100 shadow-atelier-card">
          <div className="flex items-center gap-2 text-graphite-900 font-mono text-xs uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4 text-signal" />
            <span>Active Tier Override</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {(["high", "medium", "low", "calm"] as QualityTier[]).map((tier) => (
              <button
                key={tier}
                onClick={() => setQualityTier(tier)}
                className={`px-3 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                  qualityTier === tier
                    ? "bg-graphite-900 text-white font-bold shadow-sm"
                    : "bg-white text-graphite-600 hover:text-graphite-900 border border-silver-100"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
          <span className="sys-annotation text-graphite-600 block mt-3">
            DYNAMIC SHADOW MAP & SAMPLES TOGGLE
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-pearl/60 border border-silver-100 shadow-atelier-card">
          <div className="flex items-center gap-2 text-graphite-900 font-mono text-xs uppercase tracking-wider mb-2">
            <Eye className="w-4 h-4 text-signal" />
            <span>Reduced Motion Status</span>
          </div>
          <p className="font-body text-sm text-graphite-900">
            {calmMode
              ? "Active (Soft transitions, disabled heavy parallax & velocity stretches)"
              : "Standard (Fluid liquid metal easing, full physics & inertia)"}
          </p>
          <span className="sys-annotation text-graphite-600 block mt-3">
            WCAG 2.1 COMPLIANCE: PREFERS-REDUCED-MOTION
          </span>
        </div>
      </section>

      {/* SECTION 3: DESIGN TOKENS (NEUTRALS, SILVER, IRIDESCENCE, SIGNAL) */}
      <section className="mt-16">
        <span className="sys-annotation">COLOR HIERARCHY</span>
        <h2 className="text-xl md:text-2xl font-display font-semibold text-graphite-900 mb-6">
          Porcelain, Chrome & Thin-Film Iridescence
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl bg-porcelain border border-silver-300">
            <div className="h-14 rounded-lg bg-porcelain border border-silver-300 mb-3 shadow-inner" />
            <span className="font-mono text-xs font-semibold block text-graphite-900">Porcelain</span>
            <span className="font-mono text-[11px] text-graphite-600">#F7F8FA (90% Canvas)</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-silver-100">
            <div className="h-14 rounded-lg bg-pearl border border-silver-100 mb-3" />
            <span className="font-mono text-xs font-semibold block text-graphite-900">Pearl</span>
            <span className="font-mono text-[11px] text-graphite-600">#EEF0F3 (Surfaces)</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-silver-100">
            <div className="h-14 rounded-lg bg-silver-300 mb-3" />
            <span className="font-mono text-xs font-semibold block text-graphite-900">Silver 300</span>
            <span className="font-mono text-[11px] text-graphite-600">#C9CDD3 (Brushed)</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-silver-100">
            <div className="h-14 rounded-lg bg-silver-700 mb-3" />
            <span className="font-mono text-xs font-semibold block text-graphite-900">Silver 700</span>
            <span className="font-mono text-[11px] text-graphite-600">#6E747C (Shadow)</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-silver-100">
            <div className="h-14 rounded-lg bg-iris-spectrum mb-3 shadow-iris-glow" />
            <span className="font-mono text-xs font-semibold block text-graphite-900">Iris Thin-Film</span>
            <span className="font-mono text-[11px] text-graphite-600">#9FE7F5 → #C9B8FF (2%)</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-silver-100">
            <div className="h-14 rounded-lg bg-signal mb-3 shadow-md" />
            <span className="font-mono text-xs font-semibold block text-graphite-900">Signal Blue</span>
            <span className="font-mono text-[11px] text-graphite-600">#2F6BFF (Telemetry)</span>
          </div>
        </div>
      </section>

      {/* SECTION 4: EDITORIAL TYPOGRAPHY SPEC */}
      <section className="mt-16 p-8 rounded-2xl bg-white border border-silver-100 shadow-atelier-card">
        <span className="sys-annotation">TYPOGRAPHY SCALING</span>
        <h2 className="text-xl md:text-2xl font-display font-semibold text-graphite-900 mb-6">
          Swiss Editorial & Space Grotesk
        </h2>

        <div className="space-y-6">
          <div className="border-b border-silver-100 pb-6">
            <span className="font-mono text-xs text-graphite-600 block mb-1">
              DISPLAY HERO HEADLINE (Space Grotesk - Tight Tracking)
            </span>
            <h3 className="text-4xl md:text-7xl font-display font-bold tracking-tight text-graphite-900 leading-none">
              LIQUID MERCURY INTELLIGENCE
            </h3>
          </div>

          <div className="border-b border-silver-100 pb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="font-mono text-xs text-graphite-600 block mb-1">
                BODY & EDITORIAL PHILOSOPHY (Inter - 400/500)
              </span>
              <p className="font-body text-base text-graphite-900 leading-relaxed">
                Architecture is the deliberate reduction of entropy in distributed systems. An AI
                agent is only as dependable as the determinism of its grounding tools, its execution
                provenance, and its latency SLAs.
              </p>
            </div>
            <div>
              <span className="font-mono text-xs text-graphite-600 block mb-1">
                SYSTEM ANNOTATIONS & TELEMETRY (JetBrains Mono)
              </span>
              <div className="space-y-1">
                <p className="font-mono text-xs text-graphite-900">
                  SYS.04 / AGENTIC_LAYER / LATENCY 182ms / P99_OK
                </p>
                <p className="font-mono text-xs text-graphite-600">
                  TOPOLOGY: MULTI_AGENT_DAG_ORCHESTRATOR / SOC2_COMPLIANT
                </p>
                <p className="font-mono text-xs text-signal font-semibold">
                  AZURE_CONTAINER_APPS: CANARY_HEALTHY (12/12 PODS)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: MAGNETIC BUTTONS & INTERACTION RIG */}
      <section className="mt-16 mb-24">
        <span className="sys-annotation">MICRO-INTERACTIONS</span>
        <h2 className="text-xl md:text-2xl font-display font-semibold text-graphite-900 mb-6">
          Magnetic Controls & Interactive Lens Triggers
        </h2>

        <div className="p-8 rounded-2xl bg-pearl/50 border border-silver-100 flex flex-wrap items-center gap-6">
          <MagneticButton
            variant="primary"
            cursorLabel="INSPECT"
            onClick={() => setCounter((c) => c + 1)}
          >
            <Sparkles className="w-4 h-4 text-signal" />
            <span>Primary Magnetic ({counter})</span>
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            cursorLabel="EXPLORE"
            onClick={() => setCounter((c) => c + 1)}
          >
            <Layers className="w-4 h-4 text-graphite-600" />
            <span>Secondary Pearl</span>
          </MagneticButton>

          <MagneticButton
            variant="pill"
            cursorLabel="STATUS"
            onClick={() => setCounter((c) => c + 1)}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-signal" />
            <span>Chrome Pill Badge</span>
          </MagneticButton>

          <MagneticButton variant="ghost" cursorLabel="VIEW">
            <span>Ghost Action</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </MagneticButton>

          <div className="border-holo p-4 rounded-xl bg-white shadow-atelier-card ml-auto">
            <span className="font-mono text-xs text-graphite-900 font-semibold block">
              Thin-film Iridescence Border Card
            </span>
            <span className="font-mono text-[11px] text-graphite-600">
              Hover to test custom chrome lens & halo
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

