"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  CheckCircle2,
} from "lucide-react";
import { soundSynth } from "@/lib/sound-synth";

export interface AwardItem {
  id: string;
  name: string;
  issuer: string;
  badge: string;
  category: string;
  photo: string;
  glowColor: "gold" | "blue" | "emerald" | "violet" | "rose" | "cyan";
  citation?: string;
}

const AWARDS_DATA: AwardItem[] = [
  {
    id: "c5i-star-of-quarter",
    name: "Star of the Quarter Award",
    issuer: "C5i (Course5 Intelligence)",
    badge: "C5i · Star of the Quarter",
    category: "Individual Excellence & AI Delivery",
    photo: "/assets/awards/c5i-award-star-quarter.png",
    glowColor: "violet",
    citation:
      "Conferred by C5i Chief Executive Officer Nitesh Jain in recognition of outstanding individual performance, commitment, and engineering excellence delivering high-impact enterprise AI solutions.",
  },
  {
    id: "c5i-ideathon-winner",
    name: "IDEATHON Winner Award — Team Zenoencipher",
    issuer: "Course5 Intelligence (C5i)",
    badge: "C5i · Ideathon Winner",
    category: "Innovation & High-Impact AI Idea",
    photo: "/assets/awards/c5i-award-ideathon.png",
    glowColor: "gold",
    citation:
      "Crowned Winner at the Course5 Intelligence IDEATHON (Team Zenoencipher) in recognition of sharing and engineering an innovative, high-impact AI product concept.",
  },
  {
    id: "c5i-best-team-msft",
    name: "Best Team / LOB Award — MSFT Team (Digital & Advanced Analytics)",
    issuer: "Course5 Intelligence (C5i)",
    badge: "C5i · Best Team / LOB",
    category: "Digital & Advanced Analytics · MSFT Team",
    photo: "/assets/awards/c5i-award-msft-team.png",
    glowColor: "blue",
    citation:
      "Awarded both the Plaque and Certificate of Appreciation by CEO Ashwin Mittal for valuable contributions and excellence delivering enterprise analytics and AI solutions on the Microsoft (MSFT) account.",
  },
  {
    id: "c5i-best-team-tmt",
    name: "Best Team / LOB Award — TMT DE & BI Team",
    issuer: "C5i (Course5 Intelligence)",
    badge: "C5i · Best Team / LOB",
    category: "TMT Data Engineering & BI Team",
    photo: "/assets/awards/c5i-award-tmt-team.png",
    glowColor: "cyan",
    citation:
      "Honored with the C5i Best Team / LOB Plaque and Certificate of Appreciation by CEO Nitesh Jain for excellent performance across Technology, Media & Telecom (TMT) Data Engineering and BI delivery.",
  },
  {
    id: "c5i-spot-award",
    name: "Spot Award — Building Better Solutions for Key Clients",
    issuer: "Course5 Intelligence (C5i)",
    badge: "C5i · Spot Award",
    category: "Creative & Innovative Client Delivery",
    photo: "/assets/awards/c5i-award-spot.png",
    glowColor: "rose",
    citation:
      "Presented by CEO Ashwin Mittal in recognition of building better technical solutions and delivering excellent services to key enterprise clients through creativity, innovation, and dedication.",
  },
  {
    id: "c5i-long-service-award",
    name: "Long Service Award — 3 Years Milestone at C5i",
    issuer: "C5i (Course5 Intelligence)",
    badge: "C5i · 3 Years Milestone",
    category: "Loyal & Dedicated Service",
    photo: "/assets/awards/c5i-award-long-service.png",
    glowColor: "emerald",
    citation:
      "Presented with the sculpted '3 Years' milestone trophy and Certificate of Appreciation by CEO Nitesh Jain in grateful recognition of 3 years of loyal and dedicated engineering service at C5i.",
  },
  {
    id: "modefin-vkyc-award",
    name: "Full-Stack & AI Engineering Excellence Award — Video KYC",
    issuer: "Modefin",
    badge: "Modefin · FinTech & AI",
    category: "Digital Onboarding & Video KYC",
    photo: "/assets/awards/modefin-award-vkyc.png",
    glowColor: "blue",
    citation:
      "Recognized at Modefin for end-to-end full-stack Python/Django engineering and AI biometric face-match, liveness detection, and OCR verification on the Digital Onboarding & Video KYC platform.",
  },
  {
    id: "modefin-chatbot-award",
    name: "AI & Conversational Banking Innovation Award — Banking Chatbot",
    issuer: "Modefin",
    badge: "Modefin · Conversational AI",
    category: "Conversational Banking Chatbot",
    photo: "/assets/awards/modefin-award-chatbot.png",
    glowColor: "emerald",
    citation:
      "Awarded at Modefin for architecting and delivering the AI-powered Conversational Banking Chatbot—combining NLP intent classification, dialogue management, and secure core-banking API integration.",
  },
  {
    id: "modefin-hackathon-award",
    name: "Project Hackathon Winner Award — 1st Place",
    issuer: "Modefin",
    badge: "Modefin · Hackathon Winner",
    category: "Internal Project Hackathon",
    photo: "/assets/awards/modefin-award-hackathon.png",
    glowColor: "gold",
    citation:
      "Crowned 1st Place Winner in the Modefin Internal Project Hackathon for rapid full-stack and AI product innovation, building and demonstrating a production-ready banking solution.",
  },
];

export function AwardsSection() {
  const [awards] = useState<AwardItem[]>(AWARDS_DATA);
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Responsive: 3 per page on desktop, 2 on tablet, 1 on mobile
  const AWARDS_PER_PAGE = 3;
  const totalPages = Math.max(1, Math.ceil(awards.length / AWARDS_PER_PAGE));
  const startIndex = currentPage * AWARDS_PER_PAGE;
  const visibleAwards = awards.slice(startIndex, startIndex + AWARDS_PER_PAGE);

  const handlePrev = () => {
    setSlideDirection(-1);
    setCurrentPage((p) => (p - 1 + totalPages) % totalPages);
    soundSynth.playClick();
  };

  const handleNext = () => {
    setSlideDirection(1);
    setCurrentPage((p) => (p + 1) % totalPages);
    soundSynth.playClick();
  };

  // Auto-advance awards carousel every 3.5 seconds when not hovered and modal is closed
  useEffect(() => {
    if (isCarouselHovered || selectedAward || totalPages <= 1) return;
    const timer = setInterval(() => {
      setSlideDirection(1);
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 3500);

    return () => clearInterval(timer);
  }, [isCarouselHovered, selectedAward, totalPages]);

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedAward(null);
    };
    if (selectedAward) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedAward]);

  const getGlowClasses = (glow: AwardItem["glowColor"]) => {
    switch (glow) {
      case "gold":
        return {
          halo: "from-amber-400/30 via-yellow-500/25 to-orange-400/25",
          border: "border-amber-200/90 group-hover:border-amber-400",
          tag: "bg-amber-50 text-amber-700 border-amber-200",
          accent: "text-amber-500",
        };
      case "blue":
        return {
          halo: "from-blue-500/30 via-indigo-500/25 to-cyan-400/25",
          border: "border-blue-200/90 group-hover:border-blue-400",
          tag: "bg-blue-50 text-blue-700 border-blue-200",
          accent: "text-blue-500",
        };
      case "emerald":
        return {
          halo: "from-emerald-400/30 via-teal-500/25 to-blue-400/25",
          border: "border-emerald-200/90 group-hover:border-emerald-400",
          tag: "bg-emerald-50 text-emerald-700 border-emerald-200",
          accent: "text-emerald-500",
        };
      case "violet":
        return {
          halo: "from-purple-500/30 via-violet-500/25 to-indigo-400/25",
          border: "border-purple-200/90 group-hover:border-purple-400",
          tag: "bg-purple-50 text-purple-700 border-purple-200",
          accent: "text-purple-500",
        };
      case "rose":
        return {
          halo: "from-pink-500/30 via-rose-500/25 to-purple-400/25",
          border: "border-pink-200/90 group-hover:border-pink-400",
          tag: "bg-pink-50 text-pink-700 border-pink-200",
          accent: "text-pink-500",
        };
      case "cyan":
      default:
        return {
          halo: "from-cyan-400/30 via-sky-500/25 to-blue-400/25",
          border: "border-cyan-200/90 group-hover:border-cyan-400",
          tag: "bg-cyan-50 text-cyan-700 border-cyan-200",
          accent: "text-cyan-500",
        };
    }
  };

  return (
    <section
      id="awards"
      className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-hidden selection:bg-amber-400 selection:text-slate-900 snap-start py-8 md:py-14"
    >
      {/* Radiant Golden & Neon Aurora Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-400/12 via-yellow-400/8 to-transparent blur-[120px] animate-pulse-subtle" />
        <div className="absolute top-[40%] right-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-purple-500/12 via-blue-400/10 to-transparent blur-[130px]" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14 flex flex-col justify-center">
        {/* Section Header Plinth */}
        <div className="relative group mb-6">
          <div className="absolute -inset-3 rounded-[36px] bg-gradient-to-r from-amber-400/25 via-blue-500/18 to-purple-500/25 opacity-70 group-hover:opacity-100 blur-xl pointer-events-none transition-opacity duration-500" />
          <div className="relative p-5 md:p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-white/90 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-mono text-xs text-graphite-600 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  HONORS & RECOGNITION
                </span>
              </div>

              {/* Status and Carousel Indicator */}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/90 font-mono text-xs text-amber-800 font-bold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{awards.length} VERIFIED ACCOLADES</span>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-slate-200 shadow-2xs font-mono text-xs font-bold text-slate-700">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous awards"
                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-amber-600 cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-1.5 text-[11px]">
                      0{currentPage + 1} / 0{totalPages}
                    </span>
                    <button
                      onClick={handleNext}
                      aria-label="Next awards"
                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-amber-600 cursor-pointer transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/70 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-slate-900 leading-tight">
                  Awards & Industry Recognition
                </h2>
                <p className="font-body text-xs md:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  Enterprise executive honors, global AI summit recognitions, and distinguished architectural citations for technical excellence.
                </p>
              </div>

              {/* Page Dots & Status */}
              <div className="flex items-center gap-3 self-start md:self-auto font-mono text-xs">
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => {
                        setSlideDirection(pIdx >= currentPage ? 1 : -1);
                        setCurrentPage(pIdx);
                        soundSynth.playClick();
                      }}
                      aria-label={`Go to awards page ${pIdx + 1}`}
                      className={`transition-all rounded-full cursor-pointer ${
                        currentPage === pIdx
                          ? "w-7 h-2 bg-gradient-to-r from-amber-500 to-orange-500 shadow-xs"
                          : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  {isCarouselHovered ? "⏸ Paused" : "⟳ Auto-moving"}
                </span>
              </div>
            </div>

            {/* Moving Animated Golden Ticker Line */}
            <div className="absolute bottom-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent animate-cyber-glow pointer-events-none" />
          </div>
        </div>

        {/* Animated Glowing Awards Carousel with Floating Left & Right Arrow Marks */}
        <div
          className="relative group/carousel my-2"
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
          onMouseMove={() => setIsCarouselHovered(true)}
          onPointerEnter={() => setIsCarouselHovered(true)}
          onPointerLeave={() => setIsCarouselHovered(false)}
        >
          {/* Left Carousel Arrow Button */}
          {totalPages > 1 && (
            <button
              onClick={handlePrev}
              aria-label="Previous awards carousel arrow"
              className="absolute -left-4 sm:-left-6 md:-left-7 lg:-left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-amber-600 shadow-[0_10px_30px_rgba(245,158,11,0.18)] border border-amber-200/90 hover:border-amber-400 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group/arrow"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400/30 to-yellow-400/30 blur-sm opacity-0 group-hover/arrow:opacity-100 transition-opacity" />
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform group-hover/arrow:-translate-x-0.5" />
            </button>
          )}

          {/* Right Carousel Arrow Button */}
          {totalPages > 1 && (
            <button
              onClick={handleNext}
              aria-label="Next awards carousel arrow"
              className="absolute -right-4 sm:-right-6 md:-right-7 lg:-right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-amber-600 shadow-[0_10px_30px_rgba(245,158,11,0.18)] border border-amber-200/90 hover:border-amber-400 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group/arrow"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400/30 to-yellow-400/30 blur-sm opacity-0 group-hover/arrow:opacity-100 transition-opacity" />
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform group-hover/arrow:translate-x-0.5" />
            </button>
          )}

          {/* Awards Cards Grid with Horizontal Slide Transition & Spring Elevation */}
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={currentPage}
              custom={slideDirection}
              variants={{
                enter: (dir: number) => ({
                  opacity: 0,
                  x: dir > 0 ? 110 : -110,
                }),
                center: {
                  opacity: 1,
                  x: 0,
                },
                exit: (dir: number) => ({
                  opacity: 0,
                  x: dir > 0 ? -110 : 110,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 280, damping: 28 },
                opacity: { duration: 0.22 },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch"
            >
              {visibleAwards.map((item, idx) => {
                const styles = getGlowClasses(item.glowColor);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 26,
                      delay: idx * 0.05,
                    }}
                    whileHover={{ y: -6, scale: 1.012 }}
                    className="relative group/card flex flex-col"
                  >
                    {/* Spreading Radiant Aurora Glow Halo Behind Card with Breathing Animation */}
                    <div
                      className={`absolute -inset-3 rounded-[36px] bg-gradient-to-tr ${styles.halo} opacity-75 group-hover/card:opacity-100 blur-2xl pointer-events-none transition-all duration-500 group-hover/card:scale-105 animate-pulse-subtle`}
                    />

                    {/* Main Award Card Container */}
                    <div
                      onClick={() => {
                        setSelectedAward(item);
                        soundSynth.playSelect();
                      }}
                      className={`relative flex flex-col justify-between h-full rounded-3xl bg-white/95 backdrop-blur-md border ${styles.border} shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 overflow-hidden cursor-pointer`}
                    >
                      {/* Animated Golden Border-Beam Shimmer */}
                      <div className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent animate-cyber-glow" />

                      <div>
                        {/* Award Certificate Photo Frame with Continuous Moving Metallic Glint */}
                        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/80 shadow-md mb-5 group-hover/card:shadow-xl transition-shadow">
                          <Image
                            src={item.photo}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
                          />

                          {/* Continuous Moving Metallic Light Sweep Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-glint pointer-events-none" />

                          {/* Top Overlay Badges */}
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-xs">
                            <Trophy className="w-3 h-3 text-amber-400" />
                            <span>{item.badge}</span>
                          </div>

                          <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/70 backdrop-blur-md text-white/80 group-hover/card:text-white group-hover/card:scale-110 transition-all">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>

                          {/* Bottom Gradient Overlay on Photo */}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent p-3 pt-6 flex items-center justify-between">
                            <span className="font-mono text-[10px] uppercase font-bold text-cyan-300">
                              {item.category}
                            </span>
                            <span className="font-mono text-[9.5px] text-slate-300">
                              Click to Expand
                            </span>
                          </div>
                        </div>

                        {/* Header: Award Name Right Below the Photo */}
                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-center gap-2">
                            <Award className={`w-4 h-4 ${styles.accent} shrink-0`} />
                            <span className="font-mono text-[10.5px] uppercase font-bold text-slate-500 tracking-wider truncate">
                              {item.issuer}
                            </span>
                          </div>

                          <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 leading-snug group-hover/card:text-blue-700 transition-colors">
                            {item.name}
                          </h3>
                        </div>

                        {/* Citation / Accolade Narrative */}
                        {item.citation && (
                          <p className="font-body text-xs text-slate-600 leading-relaxed line-clamp-3">
                            {item.citation}
                          </p>
                        )}
                      </div>

                      {/* Bottom Status Plinth */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-[11px]">
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified Honor
                        </span>

                        <span className="text-blue-600 font-semibold group-hover/card:underline inline-flex items-center gap-1 text-[11px]">
                          Inspect Award →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Full-Screen Glowing Lightbox Modal for Certificate Inspection */}
      {selectedAward && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedAward(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col group/modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Modal Glowing Halo */}
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-amber-400/30 via-yellow-500/20 to-purple-500/30 blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="relative z-10 p-5 sm:p-6 border-b border-slate-200 bg-white/95 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/25">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 leading-tight">
                    {selectedAward.name}
                  </h3>
                  <p className="font-mono text-xs text-slate-500 mt-0.5">
                    Conferred by {selectedAward.issuer} · {selectedAward.category}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAward(null)}
                aria-label="Close award modal"
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Large High-Resolution Certificate View */}
            <div className="relative z-10 p-5 sm:p-8 bg-slate-950 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-[4/3] max-w-2xl rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <Image
                  src={selectedAward.photo}
                  alt={selectedAward.name}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>

              {selectedAward.citation && (
                <div className="mt-5 p-4 rounded-2xl bg-slate-900/90 border border-white/10 max-w-2xl w-full text-center">
                  <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed">
                    “{selectedAward.citation}”
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="relative z-10 p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Executive Accolade</span>
              </div>
              <button
                onClick={() => setSelectedAward(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
