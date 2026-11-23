"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, CheckCircle2, Clock, ExternalLink } from "lucide-react";

interface EducationEntry {
  id: string;
  institution: string;
  statusBadge: {
    label: string;
    type: "pursuing" | "completed";
  };
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  periodText: string;
  affiliation: string;
  paragraph: string;
  logo: string;
  logoAlt: string;
}

const EDUCATION_ENTRIES: EducationEntry[] = [
  {
    id: "scaler-ms",
    institution: "SCALER NEOVERSITY",
    statusBadge: {
      label: "Currently Pursuing",
      type: "pursuing",
    },
    degree: "Master of Science (M.S.)",
    field: "Artificial Intelligence & Machine Learning",
    startDate: "2026",
    endDate: "2028",
    periodText: "2026 - 2028",
    affiliation: "In collaboration with Woolf University",
    paragraph:
      "This is a postgraduate program focused on artificial intelligence and machine learning, with an applied, research-oriented approach to foundation models and AI systems. It adds formal research training to the production AI work I already do in client projects.",
    logo: "/images/education/scaler-neoversity.png",
    logoAlt: "Scaler Neoversity logo",
  },
  {
    id: "rit-be",
    institution: "RAJEEV INSTITUTE OF TECHNOLOGY",
    statusBadge: {
      label: "Graduated with Distinction",
      type: "completed",
    },
    degree: "Bachelor of Engineering (B.E.)",
    field: "Electronics & Communication Engineering",
    startDate: "2015",
    endDate: "2019",
    periodText: "2015 - 2019",
    affiliation: "Affiliated with Visvesvaraya Technological University (VTU)",
    paragraph:
      "A four-year electronics and communication engineering degree, graduated with distinction. It covers hardware, signal processing, and computer architecture, and it is the technical base I build on in my AI work.",
    logo: "/images/education/rit.png",
    logoAlt: "Rajeev Institute of Technology logo",
  },
];

export function EducationSection() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative w-full h-[calc(100vh-3.5rem)] min-h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] flex flex-col justify-between py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1800px] mx-auto selection:bg-blue-500 selection:text-white snap-start overflow-hidden"
    >
      {/* Ambient Aurora Glow Orbs */}
      <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl animate-pulse" />

      {/* Top Executive Header Plinth */}
      <div className="relative group shrink-0 z-10">
        <div className="absolute -inset-1.5 rounded-[24px] bg-gradient-to-r from-indigo-500/25 via-blue-500/20 to-violet-500/25 opacity-75 group-hover:opacity-100 blur-xl pointer-events-none transition-opacity duration-500" />
        <div className="relative overflow-hidden px-5 py-3 md:px-6 md:py-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Top Gradient Accent Bar */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600" />

          <div className="min-w-0 space-y-0.5 pt-0.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600" />
                </span>
                <span className="font-mono text-[10.5px] text-slate-700 uppercase tracking-widest font-bold">
                  04 - ACADEMIC BACKGROUND
                </span>
              </div>
            </div>

            <h2
              id="education-heading"
              className="text-xl sm:text-2xl lg:text-[26px] font-display font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Education &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600">
                Academic Foundation
              </span>
            </h2>
            <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
              Electronics engineering training, followed by postgraduate study in AI and machine learning.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200/90 font-mono text-xs text-indigo-900 font-bold shadow-2xs shrink-0 self-start sm:self-center">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Formal Higher Education</span>
          </div>
        </div>
      </div>

      {/* Middle 2-Column Side-by-Side Academic Showcase Grid */}
      <div className="relative z-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch my-3">
        {EDUCATION_ENTRIES.map((entry, idx) => {
          const isPursuing = entry.statusBadge.type === "pursuing";

          return (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 26,
                delay: idx * 0.08,
              }}
              whileHover={{ y: -5, scale: 1.008 }}
              className="relative group flex flex-col min-h-0"
            >
              {/* Multi-Spectrum Radiant Aura Halo */}
              <div
                className={`absolute -inset-2 rounded-[28px] blur-xl pointer-events-none transition-opacity duration-500 ${
                  isPursuing
                    ? "bg-gradient-to-tr from-indigo-500/30 via-violet-500/20 to-emerald-400/25 opacity-60 group-hover:opacity-100"
                    : "bg-gradient-to-tr from-blue-500/30 via-cyan-500/20 to-amber-400/25 opacity-60 group-hover:opacity-100"
                }`}
              />

              <div
                className={`relative flex-1 min-h-0 rounded-3xl bg-white/95 backdrop-blur-xl border ${
                  isPursuing
                    ? "border-indigo-200/90 hover:border-indigo-400"
                    : "border-blue-200/90 hover:border-blue-400"
                } shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between`}
              >
                {/* Top Gradient Accent Beam */}
                <div
                  className={`h-1.5 w-full shrink-0 bg-gradient-to-r ${
                    isPursuing
                      ? "from-indigo-600 via-violet-500 to-emerald-500"
                      : "from-blue-600 via-cyan-500 to-amber-500"
                  }`}
                />

                {/* Top Royal Crest Stage Banner (Expanded to showcase the 3D Crest & Degree) */}
                <div
                  className={`relative mx-4 mt-4 rounded-2xl overflow-hidden border ${
                    isPursuing
                      ? "border-indigo-900/40 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"
                      : "border-blue-900/40 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
                  } p-5 sm:p-6 flex items-center gap-5 sm:gap-6 shadow-md flex-1 min-h-0`}
                >
                  {/* Ambient Radial Spotlight Inside Stage */}
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full blur-2xl ${
                      isPursuing ? "bg-violet-500/30" : "bg-cyan-500/30"
                    }`}
                  />
                  {/* Shimmer Sweep on Hover */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Large Ornate Institutional Crest Medallion */}
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 xl:w-40 xl:h-40 rounded-2xl overflow-hidden border-2 border-amber-300/45 shadow-2xl bg-slate-900 shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={entry.logo}
                      alt={entry.logoAlt}
                      fill
                      unoptimized
                      className="object-cover object-top"
                      sizes="180px"
                    />
                  </div>

                  {/* Stage Right Column: Institution, Status Badge, Degree & Field */}
                  <div className="relative z-10 min-w-0 flex-1 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span
                        className={`font-mono text-[10.5px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg border ${
                          isPursuing
                            ? "bg-indigo-950/90 border-indigo-400/40 text-indigo-200"
                            : "bg-blue-950/90 border-blue-400/40 text-cyan-200"
                        }`}
                      >
                        {entry.institution}
                      </span>

                      {isPursuing ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-[10.5px] font-bold backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {entry.statusBadge.label}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 font-mono text-[10.5px] font-bold backdrop-blur-md">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          {entry.statusBadge.label}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl xl:text-[26px] text-white leading-tight">
                        {entry.degree}
                      </h3>
                      <p
                        className={`font-body text-sm sm:text-base font-bold mt-1 ${
                          isPursuing ? "text-cyan-300" : "text-amber-300"
                        }`}
                      >
                        {entry.field}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Body: Meta Affiliation Strip + Narrative Callout */}
                <div className="p-4 sm:p-5 shrink-0 flex flex-col gap-3">
                  {/* Meta Line with Time element & Affiliation */}
                  <div
                    className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 flex-wrap font-mono text-xs font-semibold ${
                      isPursuing
                        ? "bg-indigo-50/80 border-indigo-200/80 text-indigo-900"
                        : "bg-blue-50/80 border-blue-200/80 text-blue-900"
                    }`}
                  >
                    <Clock
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isPursuing ? "text-indigo-600" : "text-blue-600"
                      }`}
                    />
                    <time dateTime={`${entry.startDate}/${entry.endDate}`} className="font-bold">
                      {entry.periodText}
                    </time>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-700">{entry.affiliation}</span>
                  </div>

                  {/* Narrative Paragraph Box */}
                  <div
                    className={`p-4 rounded-2xl bg-slate-50/95 border border-slate-200/85 border-l-4 ${
                      isPursuing ? "border-l-indigo-600" : "border-l-blue-600"
                    }`}
                  >
                    <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {entry.paragraph}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Bottom Closing Bar (with right margin clearance for the floating AI Twin widget) */}
      <div className="relative group shrink-0 z-10">
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-blue-500/15 to-violet-500/20 opacity-70 group-hover:opacity-100 blur-xl pointer-events-none transition-opacity duration-500" />
        <div className="relative px-5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <p className="font-body text-xs sm:text-sm text-slate-800 font-semibold">
              Engineering foundations, now focused on AI systems.
            </p>
          </div>

          <a
            href="/assets/Rajkamal_Resume.pdf"
            download="Rajkamal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 py-2 px-4 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-indigo-600 hover:to-blue-600 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-sm transition-all duration-300 cursor-pointer"
          >
            <span>Official Verified CV</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
export default EducationSection;
