"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, FastForward } from "lucide-react";

interface CondensationPreloaderProps {
  onComplete: () => void;
}

export function CondensationPreloader({ onComplete }: CondensationPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState("CONDENSING SILVER DUST");
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("rg_preloaded")) {
      onComplete();
      return;
    }

    const startTime = performance.now();
    const duration = 750; // Brisk 750ms total calibration

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const raw = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(raw));

      if (raw > 75) {
        setPhaseText("FORMING MONOGRAM RG");
      } else if (raw > 45) {
        setPhaseText("CALIBRATING NEURAL CORE");
      } else if (raw > 20) {
        setPhaseText("SYNCHRONIZING ATELIER MESH");
      }

      if (raw >= 100) {
        clearInterval(interval);
        sessionStorage.setItem("rg_preloaded", "1");
        setTimeout(() => {
          setIsDismissed(true);
          setTimeout(onComplete, 200);
        }, 100);
      }
    }, 24);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        sessionStorage.setItem("rg_preloaded", "1");
        setIsDismissed(true);
        setTimeout(onComplete, 100);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsDismissed(true);
    setTimeout(onComplete, 200);
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-porcelain flex flex-col items-center justify-center p-8 select-none"
        >
          {/* Central Condensation Monogram Assembly */}
          <div className="relative flex flex-col items-center">
            {/* Ambient Silver Glow */}
            <motion.div
              animate={{
                scale: [0.8, 1.25, 1],
                opacity: [0.3, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-10 rounded-full bg-radial from-iris-cyan/30 via-iris-lilac/20 to-transparent blur-2xl pointer-events-none"
            />

            {/* Condensing Droplet & Monogram */}
            <div className="relative w-28 h-28 rounded-full border border-silver-300 dark:border-slate-700 bg-gradient-to-b from-white via-silver-100 to-silver-300 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 shadow-atelier-card flex items-center justify-center overflow-hidden">
              <div className="relative w-20 h-20">
                <Image
                  src="/assets/generated/monogram.png"
                  alt="RG Monogram"
                  fill
                  priority
                  unoptimized
                  className="object-contain drop-shadow-md"
                />
              </div>

              {/* Holographic rim border */}
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-iris-cyan border-r-iris-lilac animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>

            {/* System Status Ticker */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-graphite-900 font-semibold tracking-wider">
                <Activity className="w-3.5 h-3.5 text-signal animate-pulse" />
                <span>{phaseText}</span>
                <span className="text-signal">{progress}%</span>
              </div>

              {/* Progress Track */}
              <div className="w-56 h-1 rounded-full bg-silver-100 overflow-hidden mt-1 border border-silver-300/40">
                <motion.div
                  className="h-full bg-gradient-to-r from-silver-500 via-signal to-iris-cyan"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="font-mono text-[10px] text-graphite-600 tracking-widest uppercase mt-1">
                RAJKAMAL B GOWDA · AI APPLICATION ARCHITECT
              </span>
            </div>
          </div>

          {/* Bottom Skip Pill */}
          <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pearl border border-silver-100 hover:border-silver-300 font-mono text-[11px] text-graphite-600 hover:text-graphite-900 transition-colors shadow-sm"
          >
            <span>SKIP INITIALIZATION</span>
            <FastForward className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
