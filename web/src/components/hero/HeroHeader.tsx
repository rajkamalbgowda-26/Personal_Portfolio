"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowUpRight, Sparkles, Terminal } from "lucide-react";

const ROTATING_LINES = [
  "Designing agentic systems with dynamic tool orchestration",
  "Shipping GenAI to production at enterprise scale",
  "Leading 12 full-stack AI engineers from discovery to SLA",
  "Architecting Azure end-to-end cloud & MLOps pipelines",
];

const NAME = "RAJKAMAL B GOWDA";

export function HeroHeader() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % ROTATING_LINES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-start justify-center max-w-2xl z-20 pointer-events-auto">
      {/* System Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pearl border border-silver-100 font-mono text-xs text-graphite-600 mb-6 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
        <span className="tracking-wide">SYS.00 // AI APPLICATION ARCHITECT</span>
      </div>

      {/* Split-Letter Name Reveal */}
      <h1
        className="font-display font-extrabold tracking-tighter text-graphite-900 leading-[0.92] select-none"
        style={{ fontSize: "clamp(3.2rem, 8.5vw, 7.8rem)" }}
      >
        {NAME.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-4 whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, y: 35, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: wordIndex * 0.2 + charIndex * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </h1>

      {/* Subtitle & Rotating Mono Statement */}
      <div className="mt-6 flex flex-col gap-2">
        <h2 className="font-display text-xl md:text-2xl font-semibold text-graphite-900">
          AI Application Architect
        </h2>

        <div className="h-10 flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="font-mono text-xs md:text-sm text-graphite-600 flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5 text-signal flex-shrink-0" />
              <span>{ROTATING_LINES[lineIndex]}</span>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-wrap items-center gap-4 mt-8">
        <Link href="/lab">
          <MagneticButton variant="primary" cursorLabel="LAB" className="text-sm px-6 py-3">
            <Sparkles className="w-4 h-4 text-signal" />
            <span>Enter Design Lab</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </MagneticButton>
        </Link>

        <a href="#architectures">
          <MagneticButton variant="secondary" cursorLabel="EXPLORE" className="text-sm px-5 py-3">
            <span>Explore 3D Architectures</span>
          </MagneticButton>
        </a>
      </div>
    </div>
  );
}

