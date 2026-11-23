"use client";

import React from "react";
import { Award, Briefcase, Users, CheckCircle2 } from "lucide-react";

export function SystemTicker() {
  return (
    <div className="w-full border-t border-silver-100 bg-white/70 backdrop-blur-md px-6 py-2.5 flex flex-wrap items-center justify-between text-xs font-mono text-graphite-600 gap-4 shadow-sm select-none z-20 pointer-events-auto">
      {/* Category Label */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-signal" />
        <span className="font-semibold text-graphite-900 tracking-wider uppercase text-[11px]">
          Engineering Track Record
        </span>
      </div>

      {/* Primary Metrics */}
      <div className="flex items-center flex-wrap gap-4 md:gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-signal" />
          <span>Products Delivered:</span>
          <strong className="text-graphite-900 font-bold">17+ Enterprise Systems</strong>
        </div>

        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-graphite-700" />
          <span>Team Led:</span>
          <strong className="text-graphite-900 font-bold">12+ Engineers</strong>
        </div>

        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-graphite-700" />
          <span>Verified Accolades:</span>
          <strong className="text-graphite-900 font-bold">9 C5i &amp; Modefin Awards</strong>
        </div>

        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Global Clients:</span>
          <strong className="text-graphite-900 font-bold">10+ Fortune 500 &amp; Enterprise</strong>
        </div>
      </div>
    </div>
  );
}
