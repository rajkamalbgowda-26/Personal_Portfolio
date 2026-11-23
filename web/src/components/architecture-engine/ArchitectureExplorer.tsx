"use client";

import React, { useState, useEffect, useRef } from "react";
import { Architecture, ArchitectureNode, RequestFlowStep } from "@/lib/api-client";
import { Architecture3DScene } from "./Architecture3DScene";
import { Architecture2DBlueprint } from "./Architecture2DBlueprint";
import { NodeDetailSheet } from "./NodeDetailSheet";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Orbit,
  Layers,
  LayoutGrid,
  Activity,
} from "lucide-react";

interface ArchitectureExplorerProps {
  architecture: Architecture;
  architecturesList?: Architecture[];
  onSelectArchitecture?: (arch: Architecture) => void;
}

export function ArchitectureExplorer({
  architecture,
  architecturesList,
  onSelectArchitecture,
}: ArchitectureExplorerProps) {
  const [viewMode, setViewMode] = useState<"orbit" | "exploded" | "2d">("2d");
  const [overlay, setOverlay] = useState<"none" | "latency" | "cost" | "security">("none");
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);

  // "Play the Request" Stepper State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const requestFlow = architecture.request_flow || [];
  const currentStep: RequestFlowStep | null = requestFlow[currentStepIndex] || null;

  // Auto-play stepper loop
  useEffect(() => {
    if (isPlaying && requestFlow.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => (prev + 1) % requestFlow.length);
      }, 2600);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, requestFlow.length]);

  return (
    <div className="w-full relative flex flex-col space-y-4">
      {/* Top Toolbar Controls */}
      <div className="flex flex-wrap items-center justify-between p-4 rounded-2xl bg-white border border-silver-100 shadow-atelier-card gap-4">
        {/* Spec Selector Dropdown / Tabs */}
        {architecturesList && architecturesList.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {architecturesList.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  if (onSelectArchitecture) onSelectArchitecture(a);
                  setCurrentStepIndex(0);
                }}
                className={`px-3 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  architecture.id === a.id
                    ? "bg-graphite-900 text-white font-bold shadow-sm"
                    : "bg-pearl/80 hover:bg-white text-graphite-600 hover:text-graphite-900 border border-silver-100"
                }`}
              >
                {a.title.split(":")[0]}
              </button>
            ))}
          </div>
        )}

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("orbit")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs transition-colors ${
              viewMode === "orbit"
                ? "bg-silver-100 text-graphite-900 font-bold border border-silver-300"
                : "text-graphite-600 hover:text-graphite-900"
            }`}
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>3D Orbit</span>
          </button>

          <button
            onClick={() => setViewMode("exploded")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs transition-colors ${
              viewMode === "exploded"
                ? "bg-silver-100 text-graphite-900 font-bold border border-silver-300"
                : "text-graphite-600 hover:text-graphite-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Exploded Tiers</span>
          </button>

          <button
            onClick={() => setViewMode("2d")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs transition-colors ${
              viewMode === "2d"
                ? "bg-silver-100 text-graphite-900 font-bold border border-silver-300"
                : "text-graphite-600 hover:text-graphite-900"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>2D Blueprint</span>
          </button>
        </div>

        {/* Overlays Toggle */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="text-graphite-600 text-[10px] uppercase tracking-wider mr-1">
            Overlays:
          </span>
          <button
            onClick={() => setOverlay(overlay === "latency" ? "none" : "latency")}
            className={`px-2.5 py-1 rounded-full border transition-colors ${
              overlay === "latency"
                ? "bg-signal text-white font-bold border-signal"
                : "bg-pearl/60 text-graphite-600 border-silver-100"
            }`}
          >
            Latency
          </button>
          <button
            onClick={() => setOverlay(overlay === "cost" ? "none" : "cost")}
            className={`px-2.5 py-1 rounded-full border transition-colors ${
              overlay === "cost"
                ? "bg-emerald-600 text-white font-bold border-emerald-600"
                : "bg-pearl/60 text-graphite-600 border-silver-100"
            }`}
          >
            Cost
          </button>
          <button
            onClick={() => setOverlay(overlay === "security" ? "none" : "security")}
            className={`px-2.5 py-1 rounded-full border transition-colors ${
              overlay === "security"
                ? "bg-purple-600 text-white font-bold border-purple-600"
                : "bg-pearl/60 text-graphite-600 border-silver-100"
            }`}
          >
            Zero-Trust
          </button>
        </div>
      </div>

      {/* Main View Canvas / Blueprint */}
      <div className="relative">
        {viewMode === "2d" ? (
          <Architecture2DBlueprint
            architecture={architecture}
            activeStep={currentStep}
            selectedNode={selectedNode}
            onSelectNode={(node) => setSelectedNode(node)}
            overlay={overlay}
          />
        ) : (
          <Architecture3DScene
            architecture={architecture}
            mode={viewMode}
            activeStep={currentStep}
            selectedNode={selectedNode}
            onSelectNode={(node) => setSelectedNode(node)}
            overlay={overlay}
          />
        )}

        {/* Node Detail Sheet Overlay */}
        <NodeDetailSheet
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      </div>

      {/* "Play the Request" Narrated Stepper Banner */}
      <div className="p-5 rounded-2xl bg-white border border-silver-100 shadow-atelier-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Playback Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-graphite-900 text-white hover:bg-signal transition-colors shadow-sm"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={() =>
              setCurrentStepIndex((currentStepIndex - 1 + requestFlow.length) % requestFlow.length)
            }
            className="p-2 rounded-full hover:bg-silver-100 text-graphite-600 transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentStepIndex((currentStepIndex + 1) % requestFlow.length)}
            className="p-2 rounded-full hover:bg-silver-100 text-graphite-600 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs text-graphite-900 font-bold ml-1">
            HOP 0{currentStepIndex + 1} / 0{requestFlow.length}
          </span>
        </div>

        {/* Narrator Caption */}
        {currentStep && (
          <div className="flex-1 md:mx-6 p-3 rounded-xl bg-pearl/60 border border-silver-100 flex items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] text-signal font-bold uppercase tracking-wider block">
                STEP 0{currentStep.step}: {currentStep.source} → {currentStep.target}
              </span>
              <p className="font-body text-xs text-graphite-900 font-medium mt-0.5">
                {currentStep.label}
              </p>
            </div>
            <div className="flex items-center gap-1 font-mono text-xs text-graphite-900 font-bold px-2 py-1 rounded bg-white border border-silver-100 shadow-sm flex-shrink-0">
              <Activity className="w-3.5 h-3.5 text-signal" />
              <span>{currentStep.latency}</span>
            </div>
          </div>
        )}

        <div className="font-mono text-xs text-graphite-600 hidden lg:block">
          TOTAL BUDGET: ~340ms P99
        </div>
      </div>
    </div>
  );
}
