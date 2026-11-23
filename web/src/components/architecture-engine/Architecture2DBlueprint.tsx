"use client";

import React from "react";
import Image from "next/image";
import { Architecture, ArchitectureNode, RequestFlowStep } from "@/lib/api-client";
import { ArrowRight } from "lucide-react";

interface Architecture2DBlueprintProps {
  architecture: Architecture;
  activeStep: RequestFlowStep | null;
  selectedNode: ArchitectureNode | null;
  onSelectNode: (node: ArchitectureNode) => void;
  overlay: "none" | "latency" | "cost" | "security";
}

export function Architecture2DBlueprint({
  architecture,
  activeStep,
  selectedNode,
  onSelectNode,
  overlay,
}: Architecture2DBlueprintProps) {
  const nodes = architecture.nodes || [];

  return (
    <div className="w-full min-h-[540px] md:min-h-[640px] p-8 rounded-2xl bg-white border border-silver-300 shadow-atelier-card relative overflow-x-auto bg-studio-grid">
      {/* Background Blueprint CAD Schematic */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay">
        <Image
          src="/assets/generated/bg-blueprint.png"
          alt="Blueprint CAD grid"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-silver-100 mb-6">
        <div>
          <span className="sys-annotation text-signal font-semibold">
            BLUEPRINT CAD // 2D TOPOLOGY SCHEMATIC
          </span>
          <h4 className="font-display font-bold text-lg text-graphite-900 mt-0.5">
            {architecture.title}
          </h4>
        </div>
        <span className="font-mono text-xs text-graphite-600">
          OVERLAY ACTIVE: {overlay.toUpperCase()}
        </span>
      </div>

      {/* Grid of Nodes in Topological Sequence */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          return (
            <div
              key={node.id}
              onClick={() => onSelectNode(node)}
              className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-pearl border-signal shadow-atelier-hover scale-[1.02]"
                  : "bg-white hover:bg-pearl/40 border-silver-100 hover:border-silver-300 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="sys-annotation text-graphite-600">
                  {node.layer.toUpperCase()}
                </span>
                <span className="font-mono text-[10px] text-signal font-bold px-2 py-0.5 rounded-full bg-signal/10">
                  {node.type.toUpperCase()}
                </span>
              </div>

              <h5 className="font-display font-bold text-base text-graphite-900">
                {node.label}
              </h5>

              <p className="font-mono text-xs text-graphite-600 mt-1 font-medium">
                {node.tech}
              </p>

              <p className="font-body text-xs text-graphite-600 mt-3 leading-relaxed border-t border-silver-100/60 pt-2.5">
                {node.details}
              </p>

              {/* Overlay Badges */}
              {overlay === "cost" && node.cost_notes && (
                <div className="mt-3 p-2 rounded-lg bg-emerald-50 text-emerald-800 font-mono text-[10px]">
                  COST: {node.cost_notes}
                </div>
              )}
              {overlay === "security" && node.security_notes && (
                <div className="mt-3 p-2 rounded-lg bg-purple-50 text-purple-900 font-mono text-[10px]">
                  ZONE: {node.security_notes}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Request Flow Sequence Summary Bar */}
      <div className="mt-8 pt-6 border-t border-silver-100">
        <span className="sys-annotation text-graphite-600 block mb-3">
          VERIFIED REQUEST TRACE STEPS
        </span>
        <div className="flex items-center flex-wrap gap-3">
          {architecture.request_flow.map((rf) => {
            const isCurrent = activeStep?.step === rf.step;
            return (
              <div
                key={rf.step}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                  isCurrent
                    ? "bg-graphite-900 text-white font-bold border-graphite-900 shadow-sm"
                    : "bg-pearl/60 text-graphite-900 border-silver-100"
                }`}
              >
                <span>0{rf.step}.</span>
                <span className="truncate max-w-[120px]">{rf.source}</span>
                <ArrowRight className="w-3 h-3 text-signal" />
                <span className="truncate max-w-[120px]">{rf.target}</span>
                <span className="text-signal font-bold">[{rf.latency}]</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
