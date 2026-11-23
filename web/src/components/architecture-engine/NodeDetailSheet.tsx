"use client";

import React from "react";
import { ArchitectureNode } from "@/lib/api-client";
import { X, ShieldAlert, Cpu, Layers, DollarSign, Activity, AlertTriangle } from "lucide-react";

interface NodeDetailSheetProps {
  node: ArchitectureNode | null;
  onClose: () => void;
}

export function NodeDetailSheet({ node, onClose }: NodeDetailSheetProps) {
  if (!node) return null;

  return (
    <div className="absolute top-4 right-4 bottom-4 w-96 max-w-[calc(100vw-32px)] bg-white/95 backdrop-blur-xl border border-silver-300 rounded-2xl shadow-atelier-hover z-30 flex flex-col p-6 overflow-y-auto selection:bg-silver-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-silver-100">
        <div>
          <span className="sys-annotation text-signal font-semibold">
            LAYER // {node.layer.toUpperCase()}
          </span>
          <h3 className="font-display font-bold text-xl text-graphite-900 mt-1">
            {node.label}
          </h3>
          <span className="font-mono text-xs text-graphite-600 block mt-0.5">
            {node.tech}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-silver-100 text-graphite-600 hover:text-graphite-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Detail Body */}
      <div className="mt-5 space-y-5 text-xs">
        {/* Responsibility */}
        <div>
          <div className="flex items-center gap-1.5 text-graphite-900 font-semibold mb-1">
            <Activity className="w-3.5 h-3.5 text-signal" />
            <span>RESPONSIBILITY & ROLE</span>
          </div>
          <p className="font-body text-graphite-600 leading-relaxed">
            {node.responsibility || node.details}
          </p>
        </div>

        {/* Why Chosen */}
        {node.why_chosen && (
          <div>
            <div className="flex items-center gap-1.5 text-graphite-900 font-semibold mb-1">
              <Cpu className="w-3.5 h-3.5 text-iris-lilac" />
              <span>WHY THIS WAS CHOSEN OVER ALTERNATIVES</span>
            </div>
            <p className="font-body text-graphite-600 leading-relaxed bg-pearl/60 p-3 rounded-xl border border-silver-100">
              {node.why_chosen}
            </p>
          </div>
        )}

        {/* Scaling Strategy */}
        {node.scaling && (
          <div>
            <div className="flex items-center gap-1.5 text-graphite-900 font-semibold mb-1">
              <Layers className="w-3.5 h-3.5 text-graphite-900" />
              <span>HORIZONTAL SCALING STRATEGY</span>
            </div>
            <p className="font-body text-graphite-600 leading-relaxed">
              {node.scaling}
            </p>
          </div>
        )}

        {/* Failure Modes & Recovery */}
        {node.failure_modes && (
          <div>
            <div className="flex items-center gap-1.5 text-amber-600 font-semibold mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>FAILURE MODES & CIRCUIT BREAKERS</span>
            </div>
            <p className="font-body text-graphite-600 leading-relaxed bg-amber-50/50 p-3 rounded-xl border border-amber-200/60">
              {node.failure_modes}
            </p>
          </div>
        )}

        {/* Cost Profile */}
        {node.cost_notes && (
          <div>
            <div className="flex items-center gap-1.5 text-graphite-900 font-semibold mb-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>COST & EFFICIENCY PROFILE</span>
            </div>
            <p className="font-mono text-[11px] text-graphite-600 leading-relaxed">
              {node.cost_notes}
            </p>
          </div>
        )}

        {/* Zero-Trust Security Boundary */}
        {node.security_notes && (
          <div>
            <div className="flex items-center gap-1.5 text-graphite-900 font-semibold mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-signal" />
              <span>ZERO-TRUST SECURITY BOUNDARY</span>
            </div>
            <p className="font-body text-graphite-600 leading-relaxed bg-pearl/60 p-3 rounded-xl border border-silver-100">
              {node.security_notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

