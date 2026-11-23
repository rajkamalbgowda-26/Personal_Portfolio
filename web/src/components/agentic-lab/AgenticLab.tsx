"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { soundSynth } from "@/lib/sound-synth";
import {
  Play,
  Pause,
  RotateCcw,
  Terminal,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface AgentStepTrace {
  step: number;
  stage: "planner" | "tool" | "memory" | "reflection" | "synthesis";
  title: string;
  detail: string;
  tokens: { prompt: number; completion: number };
  latencyMs: number;
  costUsd: number;
  payload: Record<string, unknown>;
}

interface AgentScenario {
  id: string;
  title: string;
  goal: string;
  traces: AgentStepTrace[];
}

const SCENARIOS: AgentScenario[] = [
  {
    id: "finops",
    title: "FinOps: Auto-Remediate Azure Compute Spike",
    goal: "Detected 42 unattached Standard_D16s_v5 VMs in eastus2 costing $4,800/day. Decompose task, verify safe shutdown constraints with zero production disruption, and execute automated deallocation.",
    traces: [
      {
        step: 1,
        stage: "planner",
        title: "Supervisor Planner: DAG Intent Decomposition",
        detail: "Planner decomposes prompt into 3 conditional DAG nodes: 1. Query resource graph; 2. Validate tag compliance; 3. Execute ARM deallocation.",
        tokens: { prompt: 412, completion: 128 },
        latencyMs: 95,
        costUsd: 0.0012,
        payload: {
          dag_nodes: ["resource_graph_query", "safety_policy_validator", "arm_deallocate_batch"],
          max_recursion_limit: 5,
        },
      },
      {
        step: 2,
        stage: "tool",
        title: "Tool Call: azure_resource_graph_query()",
        detail: "Invokes sandboxed tool against Azure Resource Graph to filter resources by tag: environment != 'production' and cpu_utilization < 2% over 72h.",
        tokens: { prompt: 184, completion: 92 },
        latencyMs: 142,
        costUsd: 0.0006,
        payload: {
          kusto_query: "Resources | where type =~ 'Microsoft.Compute/virtualMachines' | where tags.env != 'prod'",
          matched_vms: 42,
          total_hourly_rate: "$201.60/hr",
        },
      },
      {
        step: 3,
        stage: "memory",
        title: "Memory Read: Vector Grounding on FinOps Playbook",
        detail: "Retrieves operational compliance policy chunk from Azure AI Search: Section 4.2 requires 2-hour grace period notification before tearing down QA sandboxes.",
        tokens: { prompt: 290, completion: 64 },
        latencyMs: 38,
        costUsd: 0.0004,
        payload: {
          retrieved_doc: "FinOps_SOP_v3.4.pdf",
          chunk_similarity: 0.94,
          rule: "Graceful notification dispatched to slack webhook #finops-alerts",
        },
      },
      {
        step: 4,
        stage: "reflection",
        title: "Self-Reflection & Hallucination Guard Gate",
        detail: "Supervisor evaluates if proposed execution parameters adhere strictly to retrieved SOP. Evaluates Triad Groundedness score.",
        tokens: { prompt: 340, completion: 82 },
        latencyMs: 72,
        costUsd: 0.0008,
        payload: {
          groundedness_score: 0.99,
          safety_contract_met: true,
          action: "APPROVED_FOR_EXECUTION",
        },
      },
      {
        step: 5,
        stage: "synthesis",
        title: "Synthesis & Streaming Provenance Output",
        detail: "Generates execution certificate, updates distributed state ledger, and streams structured JSON response to client dashboard.",
        tokens: { prompt: 156, completion: 210 },
        latencyMs: 88,
        costUsd: 0.0011,
        payload: {
          deallocated_count: 42,
          projected_monthly_savings: "$144,000",
          provenance_hash: "0x8F9A3B2C1D4E",
        },
      },
    ],
  },
  {
    id: "medical",
    title: "Healthcare: Hybrid RAG Diagnostic Triage",
    goal: "Evaluate rare pediatric neurological presentation against 12M PubMed and clinical trial documents with strict zero-hallucination triad enforcement.",
    traces: [
      {
        step: 1,
        stage: "planner",
        title: "Medical Taxonomy Expansion & De-identification",
        detail: "Sanitizes clinical query, expands biomedical acronyms (GBA1, SMA-1), and forms dual BM25 + dense vector query vectors.",
        tokens: { prompt: 320, completion: 94 },
        latencyMs: 65,
        costUsd: 0.0008,
        payload: { expanded_entities: ["Spinal Muscular Atrophy", "SMN1 gene deletion"] },
      },
      {
        step: 2,
        stage: "memory",
        title: "Hybrid Search + Cohere Cross-Encoder Rerank",
        detail: "Pulls top-100 PubMed candidates via HNSW dense indexing, reranks to top-5 highest semantic precision documents using Cohere Rerank v3.",
        tokens: { prompt: 480, completion: 110 },
        latencyMs: 85,
        costUsd: 0.0014,
        payload: { top_trials: ["NCT03306277", "NCT02122952"], rerank_score: 0.982 },
      },
      {
        step: 3,
        stage: "reflection",
        title: "Hallucination Triad Guard (Score Check)",
        detail: "Reflection harness checks candidate hypothesis against source citations. Rejects unverified dosage recommendation and re-prompts.",
        tokens: { prompt: 280, completion: 74 },
        latencyMs: 54,
        costUsd: 0.0006,
        payload: { groundedness: 0.992, context_relevance: 0.965, answer_relevance: 0.981 },
      },
      {
        step: 4,
        stage: "synthesis",
        title: "Clinician Decision Support Synthesis",
        detail: "Streams synthesis with inline clickable literature provenance chips and confidence interval metrics.",
        tokens: { prompt: 190, completion: 240 },
        latencyMs: 95,
        costUsd: 0.0013,
        payload: { diagnostic_confidence: "94.2%", citations_verified: 5 },
      },
    ],
  },
];

export function AgenticLab() {
  const [scenario, setScenario] = useState<AgentScenario>(SCENARIOS[0]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const traces = scenario.traces;
  const currentTrace = traces[activeStepIndex] || traces[0];

  // Auto-step replay loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveStepIndex((prev) => {
          if (prev >= traces.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2400);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, traces.length]);

  // Compute cumulative metrics up to current step
  const accumulated = traces.slice(0, activeStepIndex + 1).reduce(
    (acc, t) => ({
      tokens: acc.tokens + t.tokens.prompt + t.tokens.completion,
      latency: acc.latency + t.latencyMs,
      cost: acc.cost + t.costUsd,
    }),
    { tokens: 0, latency: 0, cost: 0 }
  );

  return (
    <div className="w-full relative flex flex-col space-y-6">
      {/* Scenario Selector & Header */}
      <div className="relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between p-8 rounded-3xl bg-white shadow-xs gap-6">
        {/* Subtle Preview Backdrop */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <Image
            src="/assets/generated/art-agentic.png"
            alt="Agentic Lab Art"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 flex items-center gap-5">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 hidden sm:block bg-pearl">
            <Image
              src="/assets/generated/art-agentic.png"
              alt="Agentic Lab Art"
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
              <span className="font-mono text-xs text-graphite-600 uppercase tracking-widest">
                SYS.07.5 // AGENTIC AI EXECUTION LAB
              </span>
            </div>
            <h3 className="text-2xl font-display font-bold text-graphite-900">
              Watch an Agent Think
            </h3>
            <p className="font-body text-xs md:text-sm text-graphite-600 mt-1 max-w-xl">
              Replaying recorded multi-agent traces with real token allocations, latency budgets, tool
              argument validation, and reflection gates.
            </p>
          </div>
        </div>

        {/* Scenario Tabs (Interactive) */}
        <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-1">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setScenario(s);
                setActiveStepIndex(0);
                setIsPlaying(false);
              }}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap border ${
                scenario.id === s.id
                  ? "bg-graphite-900 text-white font-semibold border-graphite-900 shadow-xs"
                  : "bg-white text-graphite-600 border-silver-200 hover:border-silver-400 hover:text-graphite-900"
              }`}
            >
              {s.title.split(":")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Goal Formulation Banner */}
      <div className="p-4 rounded-xl bg-pearl/60 border border-silver-100 flex items-start gap-3">
        <Zap className="w-4 h-4 text-signal flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <strong className="font-mono text-graphite-900 block uppercase tracking-wider">
            AGENT OBJECTIVE / TASK CONTRACT:
          </strong>
          <p className="font-body text-graphite-600 mt-0.5 leading-relaxed">
            {scenario.goal}
          </p>
        </div>
      </div>

      {/* Real-time Agent Loop Node Visualization */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {traces.map((trace, idx) => {
          const isCurrent = idx === activeStepIndex;
          const isDone = idx < activeStepIndex;
          return (
            <button
              key={trace.step}
              onClick={() => {
                setActiveStepIndex(idx);
                setIsPlaying(false);
              }}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 relative ${
                isCurrent
                  ? "bg-white border-signal shadow-atelier-hover scale-[1.02]"
                  : isDone
                  ? "bg-pearl/80 border-silver-300 text-graphite-900"
                  : "bg-white/40 border-silver-100 text-graphite-400 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-2 font-mono text-[10px]">
                <span className="uppercase text-signal font-bold">{trace.stage}</span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-signal animate-ping" />
                ) : (
                  <span>0{trace.step}</span>
                )}
              </div>
              <h5 className="font-display font-bold text-xs text-graphite-900 truncate">
                {trace.title.split(":")[0]}
              </h5>
              <span className="font-mono text-[10px] text-graphite-600 block mt-1">
                {trace.latencyMs}ms • {trace.tokens.prompt + trace.tokens.completion} tok
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Terminal & Telemetry Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Terminal Execution Inspector */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-graphite-900 text-silver-100 font-mono text-xs shadow-atelier-card">
          <div className="flex items-center justify-between pb-3 border-b border-silver-700/60 mb-4">
            <div className="flex items-center gap-2 text-silver-300">
              <Terminal className="w-4 h-4 text-signal" />
              <span>STEP 0{currentTrace.step} EXECUTION LOG // {currentTrace.stage.toUpperCase()}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
              VERIFIED CONTRACT
            </span>
          </div>

          <h4 className="font-display text-base font-bold text-white mb-2">
            {currentTrace.title}
          </h4>

          <p className="font-body text-xs text-silver-300 leading-relaxed mb-4">
            {currentTrace.detail}
          </p>

          {/* JSON Payload Inspector */}
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-[11px] text-iris-cyan overflow-x-auto">
            <pre>{JSON.stringify(currentTrace.payload, null, 2)}</pre>
          </div>
        </div>

        {/* Live Counters & Playback Controls */}
        <div className="lg:col-span-4 space-y-4">
          {/* Controls Card */}
          <div className="p-5 rounded-2xl bg-white border border-silver-100 shadow-atelier-subtle">
            <div className="flex items-center justify-between mb-4">
              <span className="sys-annotation text-graphite-600">LOOP CONTROLS</span>
              <button
                onClick={() => {
                  setActiveStepIndex(0);
                  setIsPlaying(false);
                }}
                className="p-1.5 rounded-full hover:bg-silver-100 text-graphite-600 transition-colors"
                title="Reset Replay"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => {
                soundSynth.playClick();
                setIsPlaying(!isPlaying);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-graphite-900 text-white font-mono text-xs font-bold hover:bg-signal transition-colors shadow-sm"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>PAUSE EXECUTION</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 ml-0.5" />
                  <span>{activeStepIndex === traces.length - 1 ? "REPLAY TRACE" : "STEP THROUGH TRACE"}</span>
                </>
              )}
            </button>
          </div>

          {/* Live Telemetry Meters */}
          <div className="p-5 rounded-2xl bg-pearl/60 border border-silver-100 space-y-3 font-mono text-xs">
            <span className="sys-annotation text-graphite-600 block">CUMULATIVE TELEMETRY</span>

            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-silver-100">
              <span className="text-graphite-600">TOKENS CONSUMED:</span>
              <strong className="text-graphite-900">{accumulated.tokens}</strong>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-silver-100">
              <span className="text-graphite-600">TOTAL LATENCY:</span>
              <strong className="text-signal">{accumulated.latency}ms</strong>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-silver-100">
              <span className="text-graphite-600">COMPUTE COST:</span>
              <strong className="text-emerald-600 font-bold">${accumulated.cost.toFixed(4)}</strong>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-silver-100">
              <span className="text-graphite-600">DETERMINISM SLA:</span>
              <strong className="text-graphite-900">100% BOUNDED</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
