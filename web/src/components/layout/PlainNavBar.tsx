"use client";

import React from "react";

export function PlainNavBar() {
  return (
    <header
      aria-hidden="true"
      className="fixed top-0 left-0 lg:left-72 xl:left-80 right-0 z-30 h-14 bg-white/75 backdrop-blur-md border-b border-slate-200/60 shadow-[0_1px_4px_rgba(0,0,0,0.02)] pointer-events-none"
    />
  );
}
