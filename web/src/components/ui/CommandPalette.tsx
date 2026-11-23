"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { soundSynth } from "@/lib/sound-synth";
import {
  Search,
  Compass,
  Layers,
  Sparkles,
  Sliders,
  Volume2,
  VolumeX,
  ArrowRight,
  X,
  Cpu,
  Mail,
  FileCode,
  Zap,
  GraduationCap,
} from "lucide-react";

interface CommandItem {
  id: string;
  category: "Stations" | "Case Studies" | "Actions";
  title: string;
  detail: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const calmMode = usePortfolioStore((s) => s.calmMode);
  const toggleCalmMode = usePortfolioStore((s) => s.toggleCalmMode);
  const soundEnabled = usePortfolioStore((s) => s.soundEnabled);
  const toggleSound = usePortfolioStore((s) => s.toggleSound);

  // Global key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const items: CommandItem[] = [
    // Stations
    {
      id: "station-hero",
      category: "Stations",
      title: "Home · Hero Atelier",
      detail: "Forward Deployed Engineer · AI & Cloud",
      icon: <Compass className="w-4 h-4 text-signal" />,
      action: () => {
        router.push("/#hero");
        setIsOpen(false);
      },
    },
    {
      id: "station-about",
      category: "Stations",
      title: "About Me",
      detail: "Engineering principles, delivery philosophy & core stack",
      icon: <Layers className="w-4 h-4 text-graphite-600" />,
      action: () => {
        router.push("/#about");
        setIsOpen(false);
      },
    },
    {
      id: "station-skills",
      category: "Stations",
      title: "Technical Skills (10 Core Pillars)",
      detail: "Agentic AI, MCP, RAG, Scraping/AEO, Databricks, NLP & Cloud",
      icon: <Cpu className="w-4 h-4 text-signal" />,
      action: () => {
        router.push("/#skills");
        setIsOpen(false);
      },
    },
    {
      id: "station-education",
      category: "Stations",
      title: "Academic Foundation",
      detail: "M.S. in AI & ML (Scaler Neoversity) · B.E. in ECE (VTU)",
      icon: <GraduationCap className="w-4 h-4 text-signal" />,
      action: () => {
        router.push("/#education");
        setIsOpen(false);
      },
    },
    {
      id: "station-journey",
      category: "Stations",
      title: "Work Experience",
      detail: "AI Manager at C5i · Full-Stack & AI Lead at Modefin",
      icon: <Layers className="w-4 h-4 text-silver-500" />,
      action: () => {
        router.push("/#journey");
        setIsOpen(false);
      },
    },
    {
      id: "station-projects",
      category: "Stations",
      title: "Enterprise Projects (17 Products)",
      detail: "VoC, Nexora, Data to Deck, Retailer AI Maturity, Beacon, TxtSense & more",
      icon: <FileCode className="w-4 h-4 text-signal" />,
      action: () => {
        router.push("/#projects");
        setIsOpen(false);
      },
    },
    {
      id: "station-awards",
      category: "Stations",
      title: "Awards & Recognition (9 Honors)",
      detail: "6 C5i Awards & 3 Modefin Awards",
      icon: <Sparkles className="w-4 h-4 text-signal" />,
      action: () => {
        router.push("/#awards");
        setIsOpen(false);
      },
    },
    {
      id: "station-certifications",
      category: "Stations",
      title: "Certifications, Courses & Training (17 Total)",
      detail: "15 Udemy Courses & 2 Six-Month Institute Trainings",
      icon: <Sparkles className="w-4 h-4 text-iris-cyan" />,
      action: () => {
        router.push("/#certifications");
        setIsOpen(false);
      },
    },
    {
      id: "station-contact",
      category: "Stations",
      title: "Direct Connect (WhatsApp & LinkedIn)",
      detail: "Message directly via WhatsApp (+91 70199 53165) or LinkedIn",
      icon: <Mail className="w-4 h-4 text-signal" />,
      action: () => {
        router.push("/#contact");
        setIsOpen(false);
      },
    },
    // Case Studies
    {
      id: "proj-voc",
      category: "Case Studies",
      title: "VoC: Multi-Agent RAG, Databricks & MCP Copilot Plugin",
      detail: "Microsoft · Biweekly Databricks lakehouse, Skills router & Cowork MCP",
      icon: <Zap className="w-4 h-4 text-signal" />,
      action: () => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "proj-nexora",
      category: "Case Studies",
      title: "Nexora: Agentic Document Intelligence & Multi-Deck RAG",
      detail: "Microsoft · Azure Blob PPTX/PDF repository with slide-level citations",
      icon: <Sparkles className="w-4 h-4 text-iris-cyan" />,
      action: () => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "proj-data-to-deck",
      category: "Case Studies",
      title: "Data to Deck: Multi-Agent Excel-to-PPTX Wave Automation",
      detail: "C5i · Blueprint reverse-engineering, HITL clarification & Wave Memory",
      icon: <Zap className="w-4 h-4 text-signal" />,
      action: () => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "proj-ai-maturity",
      category: "Case Studies",
      title: "Retailer AI Maturity: 191-Question Agentic AEO Platform",
      detail: "Microsoft · D1–D4 dimensions & L1–L5 Crawl/Walk/Run scoring",
      icon: <Sparkles className="w-4 h-4 text-iris-cyan" />,
      action: () => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "proj-beacon",
      category: "Case Studies",
      title: "Beacon: Automated Retail SKU Execution Scorecard & Emails",
      detail: "Microsoft · Weekly Surface & M365 digital-shelf auditing & recovery",
      icon: <Zap className="w-4 h-4 text-signal" />,
      action: () => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    // Actions
    {
      id: "act-resume",
      category: "Actions",
      title: "Download ATS Resume (Rajkamal_Resume.pdf)",
      detail: "Complete 4-page ATS-friendly PDF with 17 projects, 9 awards & 17 certifications",
      icon: <FileCode className="w-4 h-4 text-signal" />,
      action: () => {
        const link = document.createElement("a");
        link.href = "/assets/Rajkamal_Resume.pdf";
        link.download = "Rajkamal_Resume.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsOpen(false);
      },
    },
    {
      id: "act-calm",
      category: "Actions",
      title: `Toggle Calm Mode (${calmMode ? "Disable" : "Enable"})`,
      detail: "Reduce heavy motion, parallax & velocity stretches",
      icon: <Sliders className="w-4 h-4 text-graphite-600" />,
      action: () => {
        toggleCalmMode();
        setIsOpen(false);
      },
    },
    {
      id: "act-sound",
      category: "Actions",
      title: `Toggle Web Audio Design (${soundEnabled ? "Mute" : "Unmute"})`,
      detail: "Subtle glassy UI feedback and packet synthesis",
      icon: soundEnabled ? <Volume2 className="w-4 h-4 text-signal" /> : <VolumeX className="w-4 h-4 text-graphite-600" />,
      action: () => {
        toggleSound();
        if (!soundEnabled) soundSynth.playGlassClick();
        setIsOpen(false);
      },
    },
  ];

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.detail.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Modal Dialog */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-graphite-900/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4 select-none animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white border border-silver-300 rounded-2xl shadow-atelier-hover overflow-hidden flex flex-col"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-silver-100">
              <Search className="w-4 h-4 text-signal mr-3 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search stations, case studies, architectures, or toggle settings..."
                className="w-full bg-transparent font-body text-sm text-graphite-900 placeholder:text-graphite-400 focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-graphite-400 hover:text-graphite-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List Results */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-1">
              {filtered.length > 0 ? (
                filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        if (soundEnabled) soundSynth.playGlassClick();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                        isSelected ? "bg-pearl border border-silver-100" : "hover:bg-pearl/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white border border-silver-100 shadow-xs">
                          {item.icon}
                        </div>
                        <div>
                          <span className="font-display font-semibold text-xs text-graphite-900 block">
                            {item.title}
                          </span>
                          <span className="font-body text-[11px] text-graphite-600 block mt-0.5">
                            {item.detail}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-graphite-400">
                          {item.category}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-silver-300" />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center font-mono text-xs text-graphite-600">
                  No commands matching &quot;{search}&quot;
                </div>
              )}
            </div>

            {/* Keyboard Footer */}
            <div className="px-4 py-2.5 bg-pearl/60 border-t border-silver-100 flex items-center justify-between text-[11px] font-mono text-graphite-600">
              <div className="flex items-center gap-3">
                <span>[↑↓] Navigate</span>
                <span>[ENTER] Select</span>
                <span>[ESC] Close</span>
              </div>
              <span className="text-[10px] text-signal font-semibold">QUICKSILVER NAVIGATION</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
