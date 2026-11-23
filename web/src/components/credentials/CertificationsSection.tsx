"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import { soundSynth } from "@/lib/sound-synth";

export interface Certification {
  id: string;
  title: string;
  platform: string;
  bgImage: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: "udemy-genai-langchain",
    title: "Complete Generative AI Course With Langchain and Huggingface",
    platform: "Done from Udemy",
    bgImage: "/assets/certifications/atelier-bg-1.png",
  },
  {
    id: "udemy-ds-ml-dl-nlp",
    title: "Complete Data Science, Machine Learning, DL, NLP Bootcamp",
    platform: "Done from Udemy",
    bgImage: "/assets/certifications/atelier-bg-2.png",
  },
  {
    id: "udemy-seq2seq-chatgpt",
    title: "Deep Learning and NLP: Seq2Seq Model Theory + ChatGPT Prizes",
    platform: "Done from Udemy",
    bgImage: "/assets/certifications/atelier-bg-3.png",
  },
  {
    id: "udemy-ai-engineer-core",
    title: "AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents",
    platform: "Done from Udemy",
    bgImage: "/assets/certifications/atelier-bg-4.png",
  },
  {
    id: "udemy-master-sql",
    title: "Master SQL For Data Science",
    platform: "Done from Udemy",
    bgImage: "/assets/generated/art-architecture.png",
  },
  {
    id: "udemy-complete-python",
    title: "Learn Complete Python In Simple Way",
    platform: "Done from Udemy",
    bgImage: "/assets/generated/art-capabilities.png",
  },
  {
    id: "udemy-ai-103-azure",
    title: "AI-103: Develop AI Apps & Agents on Azure Exam Prep",
    platform: "Done from Udemy",
    bgImage: "/assets/generated/bg-atelier.png",
  },
  {
    id: "udemy-data-science-az",
    title: "Data Science A-Z: Hands-On Exercises & ChatGPT Prize",
    platform: "Done from Udemy",
    bgImage: "/assets/generated/art-agentic.png",
  },
  {
    id: "udemy-python-cli-langchain",
    title: "Python CLI Chat Using Langchain",
    platform: "Done from Udemy",
    bgImage: "/assets/generated/art-journey.png",
  },
  {
    id: "udemy-django-master",
    title: "Django Master Course With Real World Practical Project",
    platform: "Done from Udemy",
    bgImage: "/assets/certifications/atelier-bg-1.png",
  },
  {
    id: "udemy-rest-apis-flask",
    title: "REST APIs with Flask and Python",
    platform: "Done from Udemy",
    bgImage: "/assets/certifications/atelier-bg-2.png",
  },
  {
    id: "udemy-intro-python",
    title: "Introduction To Python Programming",
    platform: "Done from Udemy",
    bgImage: "/assets/certifications/atelier-bg-3.png",
  },
  {
    id: "udemy-python-ds-ml-bootcamp",
    title: "Python for Data Science and Machine Learning Bootcamp",
    platform: "Done from Udemy",
    bgImage: "/assets/certifications/atelier-bg-4.png",
  },
  {
    id: "udemy-azure-devops-cicd",
    title: "Azure DevOps Crash Course - Build CI/CD Release Pipelines",
    platform: "Done from Udemy",
    bgImage: "/assets/generated/art-architecture.png",
  },
  {
    id: "udemy-docker-django",
    title: "Build and Deploy a Dockerised Django Project",
    platform: "Done from Udemy",
    bgImage: "/assets/generated/art-capabilities.png",
  },
  {
    id: "inventateq-data-science",
    title: "Data Science Training (6 Months)",
    platform: "Inventateq Institute of Technology",
    bgImage: "/assets/generated/bg-atelier.png",
  },
  {
    id: "6benches-fullstack-python",
    title: "Fullstack Python Application Development Training (6 Months)",
    platform: "6Benches Institute",
    bgImage: "/assets/generated/art-agentic.png",
  },
];

export function CertificationsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const CERTS_PER_PAGE = 6;
  const totalPages = Math.max(1, Math.ceil(CERTIFICATIONS.length / CERTS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages - 1);
  const startIndex = safeCurrentPage * CERTS_PER_PAGE;
  const endIndex = Math.min(startIndex + CERTS_PER_PAGE, CERTIFICATIONS.length);
  const visibleCerts = CERTIFICATIONS.slice(startIndex, endIndex);

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

  // Auto-advance when not hovered and modal is closed
  useEffect(() => {
    if (isHovered || selectedCert || totalPages <= 1) return;
    const timer = setInterval(() => {
      setSlideDirection(1);
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, selectedCert, totalPages]);

  // Lock scroll & support Escape when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };

    const lenisInstance =
      typeof window !== "undefined"
        ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
        : null;

    if (selectedCert) {
      lenisInstance?.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      lenisInstance?.start();
      document.documentElement.style.overflow = "unset";
      document.body.style.overflow = "unset";
    }

    return () => {
      lenisInstance?.start();
      document.documentElement.style.overflow = "unset";
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert]);

  return (
    <section
      id="certifications"
      className="relative w-full h-[calc(100vh-3.5rem)] min-h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] flex flex-col justify-between py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1800px] mx-auto selection:bg-blue-500 selection:text-white snap-start overflow-hidden"
    >
      {/* Full-Width Home-Hero-Style Atelier Background with Subtle Edge Feathering */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 28px, black calc(100% - 28px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 28px, black calc(100% - 28px), transparent 100%)",
        }}
      >
        <Image
          src="/assets/generated/certifications-bg.png"
          alt="Certifications Atelier Background"
          fill
          priority
          unoptimized
          className="object-cover object-center brightness-[0.99] contrast-[1.03] opacity-75"
        />
        <div className="absolute inset-x-0 top-0 h-8 md:h-10 bg-gradient-to-b from-slate-50/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-8 md:h-10 bg-gradient-to-t from-slate-50/50 to-transparent" />
      </div>

      {/* Executive Header Plinth */}
      <div className="relative group mb-2.5 lg:mb-3 shrink-0 z-10">
        <div className="absolute -inset-1.5 rounded-[24px] bg-gradient-to-r from-blue-500/20 via-indigo-500/18 to-violet-500/20 opacity-75 group-hover:opacity-100 blur-xl pointer-events-none transition-opacity duration-500" />
        <div className="relative overflow-hidden px-4 py-2.5 md:px-5 md:py-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
          {/* Unified Top Accent Beam */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

          {/* Left: Eyebrow + Heading */}
          <div className="min-w-0 space-y-0.5 pt-0.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
                </span>
                <span className="font-mono text-[10.5px] text-slate-700 uppercase tracking-widest font-bold">
                  08 - CERTIFICATIONS, COURSES &amp; TRAINING
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/90 font-mono text-[10px] text-blue-800 font-bold shadow-2xs">
                <CheckCircle2 className="w-3 h-3 text-blue-600" />
                <span>{CERTIFICATIONS.length} TOTAL · UDEMY &amp; INSTITUTE TRAINING</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <h2 className="text-lg sm:text-xl font-display font-extrabold tracking-tight text-slate-900 leading-tight shrink-0">
                Certifications, Courses &amp;{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                  Professional Training.
                </span>
              </h2>
            </div>
          </div>

          {/* Right: Page Dots + Pagination Controls */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0 self-end lg:self-center">
            {/* Page Dots */}
            <div className="flex items-center gap-1.5 mr-1">
              {Array.from({ length: totalPages }).map((_, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => {
                    setSlideDirection(pIdx >= safeCurrentPage ? 1 : -1);
                    setCurrentPage(pIdx);
                    soundSynth.playClick();
                  }}
                  aria-label={`Go to page ${pIdx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    safeCurrentPage === pIdx
                      ? "w-6 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-xs"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 text-white font-mono text-[10.5px] font-bold shadow-xs">
              <span>
                Page {safeCurrentPage + 1} of {totalPages}
              </span>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100/90 border border-slate-200/90 shadow-2xs font-mono text-xs font-bold text-slate-700">
                <button
                  onClick={handlePrev}
                  aria-label="Previous certifications page"
                  className="px-2 py-1 rounded-lg bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200/70 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                <span className="px-2 text-[11px] text-slate-700 font-bold">
                  {startIndex + 1 === endIndex
                    ? `${endIndex} of ${CERTIFICATIONS.length} Total`
                    : `${startIndex + 1}–${endIndex} of ${CERTIFICATIONS.length} Total`}
                </span>
                <button
                  onClick={handleNext}
                  aria-label="Next certifications page"
                  className="px-2 py-1 rounded-lg bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200/70 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6-Card Single-Screen 3x2 Showcase Grid with Unified Atelier Background Graphics & Crisp Front Typography */}
      <div
        className="relative group/carousel flex-1 min-h-0 flex flex-col justify-center z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {totalPages > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous certifications"
              className="absolute left-1 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 hover:bg-blue-600 text-white shadow-lg border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group/arrow"
            >
              <ChevronLeft className="w-5 h-5 relative z-10 transition-transform group-hover/arrow:-translate-x-0.5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next certifications"
              className="absolute right-1 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 hover:bg-blue-600 text-white shadow-lg border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group/arrow"
            >
              <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover/arrow:translate-x-0.5" />
            </button>
          </>
        )}

        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={safeCurrentPage}
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
            className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(2,minmax(0,1fr))] gap-3.5 lg:gap-4 items-stretch"
          >
            {visibleCerts.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 26,
                  delay: idx * 0.05,
                }}
                whileHover={{ y: -5, scale: 1.012 }}
                whileTap={{ scale: 0.99 }}
                className="relative group/card flex min-w-0 min-h-0 flex-col"
              >
                {/* Unified Sapphire-Indigo Atelier Aura Behind Card */}
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-blue-500/25 via-indigo-500/20 to-violet-500/25 opacity-45 group-hover/card:opacity-100 blur-xl pointer-events-none transition-opacity duration-500" />

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCert(cert);
                    soundSynth.playSelect();
                  }}
                  className="relative flex h-full w-full min-w-0 min-h-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/95 hover:border-blue-400 bg-white/95 p-2.5 sm:p-3 text-left shadow-sm hover:shadow-xl backdrop-blur-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                >
                  {/* Unified Top Gradient Accent Bar */}
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

                  {/* Main Card Stage: Home-Hero-Style 3D Atelier Background Graphic + Front HTML Typography */}
                  <div className="relative w-full flex-1 min-h-[155px] overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50 shadow-inner mt-0.5 flex flex-col justify-between p-4 sm:p-5">
                    {/* 3D Atelier Background Image */}
                    <Image
                      src={cert.bgImage}
                      alt={cert.title}
                      fill
                      priority={idx < 3}
                      unoptimized
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-110 brightness-[1.02] contrast-[1.04]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Luminous Frosted Porcelain & Silver Glass Veil so Front Typography Pops with Razor Clarity */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/82 via-white/68 to-blue-50/75 backdrop-blur-[2px] transition-opacity duration-500 group-hover/card:from-white/78 group-hover/card:via-white/62 group-hover/card:to-indigo-50/70" />

                    {/* Subtle Iridescent Shimmer Sweep on Hover */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                    {/* Inner Architectural Hairline Frame */}
                    <div className="pointer-events-none absolute inset-2.5 rounded-lg border border-slate-300/60 group-hover/card:border-blue-400/60 transition-colors" />

                    {/* Top Row Inside Stage: Done from Udemy / Institute Pill + Expand Icon */}
                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 border border-blue-200/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-blue-800 shadow-2xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse shrink-0" />
                        <Award className="w-3 h-3 text-blue-600 shrink-0" />
                        <span className="truncate">{cert.platform}</span>
                      </span>

                      <div className="p-1.5 rounded-lg bg-white/90 border border-slate-200/90 text-slate-600 group-hover/card:bg-blue-600 group-hover/card:text-white group-hover/card:border-blue-500 transition-colors shadow-2xs shrink-0">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Center/Bottom Front Typography: Certification Name */}
                    <div className="relative z-10 my-auto py-2">
                      <h3 className="font-display text-base sm:text-[17px] xl:text-[18px] font-extrabold tracking-tight text-slate-900 group-hover/card:text-blue-700 transition-colors leading-snug line-clamp-3 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                        {cert.title}
                      </h3>
                    </div>

                    {/* Bottom Subtle Architectural Accent Bar */}
                    <div className="relative z-10 flex items-center justify-between pt-1">
                      <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 group-hover/card:w-20 transition-all duration-300" />
                      <span className="font-mono text-[9.5px] font-semibold uppercase tracking-widest text-slate-500 group-hover/card:text-blue-700 transition-colors">
                        Verified Completion
                      </span>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Full-Screen Atelier Lightbox Modal (3D Atelier Background + Crisp Front Typography) */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/85 backdrop-blur-xl"
            data-lenis-prevent="true"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative w-full max-w-4xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Floating Top-Right */}
              <div className="w-full flex items-center justify-between gap-4 mb-3 px-4 py-2.5 rounded-2xl bg-white/95 border border-slate-200 text-slate-900 shadow-xl">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 font-mono text-xs font-bold uppercase tracking-wider text-blue-800 shrink-0">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    <span>{selectedCert.platform}</span>
                  </span>
                  <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 truncate">
                    {selectedCert.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close certificate view"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-rose-600 text-slate-700 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large Atelier Certificate Showcase Canvas */}
              <div className="relative w-full aspect-[16/10] max-h-[75vh] rounded-3xl overflow-hidden bg-white border-2 border-white/90 shadow-[0_25px_70px_rgba(0,0,0,0.5)] flex items-center justify-center p-8 sm:p-14">
                <Image
                  src={selectedCert.bgImage}
                  alt={selectedCert.title}
                  fill
                  priority
                  unoptimized
                  className="object-cover object-center"
                  sizes="100vw"
                />

                {/* Frosted Glass Center Plinth */}
                <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-white/85 backdrop-blur-md border border-blue-200/90 shadow-2xl p-8 sm:p-12 text-center space-y-6">
                  <div className="mx-auto w-24 h-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 font-mono text-xs font-bold uppercase tracking-widest text-blue-800 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>{selectedCert.platform}</span>
                  </div>

                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 leading-tight tracking-tight">
                    {selectedCert.title}
                  </h2>

                  <div className="mx-auto w-16 h-1 rounded-full bg-slate-300" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
