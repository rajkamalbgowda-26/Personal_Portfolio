"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { soundSynth } from "@/lib/sound-synth";
import {
  Building2,
  X,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Cpu,
  Target,
  ChevronLeft,
  ChevronRight,
  Zap,
  Info,
  Megaphone,
  VolumeX,
} from "lucide-react";
import { ExtendedProject } from "@/lib/projects-data";
import { PROJECTS, Project } from "@/content/projects";

interface CardTheme {
  topBar: string;
  glowAura: string;
  imageTint: string;
  imageOverlay: string;
  domainBadge: string;
  metricBadge: string;
  clientText: string;
  clientIcon: string;
  titleHover: string;
  chipStyle: string;
  ctaStyle: string;
  borderHover: string;
  spotlightColor: string;
  dotColor: string;
}

const PROJECT_THEMES: CardTheme[] = [
  {
    // 0: Cyber Blue & Cyan
    topBar: "from-blue-600 via-cyan-400 to-indigo-600",
    glowAura: "from-blue-500/35 via-cyan-400/25 to-indigo-500/35",
    imageTint: "bg-gradient-to-tr from-blue-600/45 via-cyan-500/25 to-indigo-600/40 mix-blend-color",
    imageOverlay: "bg-gradient-to-t from-slate-950/90 via-blue-950/35 to-blue-900/15",
    domainBadge: "border-cyan-400/40 bg-blue-950/80 text-cyan-200 shadow-cyan-500/10",
    metricBadge: "border-cyan-400/40 bg-gradient-to-r from-blue-600/90 to-cyan-600/90 text-white",
    clientText: "text-blue-700",
    clientIcon: "text-blue-600",
    titleHover: "group-hover/card:text-blue-600",
    chipStyle: "border-blue-200/80 bg-blue-50/80 text-blue-700",
    ctaStyle: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/25 group-hover/card:shadow-md group-hover/card:from-blue-500 group-hover/card:to-cyan-500",
    borderHover: "hover:border-blue-400",
    spotlightColor: "rgba(37, 99, 235, 0.10)",
    dotColor: "bg-cyan-400",
  },
  {
    // 1: Electric Violet & Fuchsia
    topBar: "from-violet-600 via-fuchsia-500 to-purple-600",
    glowAura: "from-violet-500/35 via-fuchsia-400/25 to-purple-500/35",
    imageTint: "bg-gradient-to-tr from-violet-600/50 via-fuchsia-500/30 to-purple-600/40 mix-blend-color",
    imageOverlay: "bg-gradient-to-t from-slate-950/90 via-purple-950/35 to-violet-900/15",
    domainBadge: "border-fuchsia-400/40 bg-purple-950/80 text-fuchsia-200 shadow-fuchsia-500/10",
    metricBadge: "border-fuchsia-400/40 bg-gradient-to-r from-violet-600/90 to-fuchsia-600/90 text-white",
    clientText: "text-violet-700",
    clientIcon: "text-violet-600",
    titleHover: "group-hover/card:text-violet-600",
    chipStyle: "border-violet-200/80 bg-violet-50/80 text-violet-700",
    ctaStyle: "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-violet-500/25 group-hover/card:shadow-md group-hover/card:from-violet-500 group-hover/card:to-fuchsia-500",
    borderHover: "hover:border-violet-400",
    spotlightColor: "rgba(139, 92, 246, 0.10)",
    dotColor: "bg-fuchsia-400",
  },
  {
    // 2: Emerald & Cyber Teal
    topBar: "from-emerald-500 via-teal-400 to-cyan-500",
    glowAura: "from-emerald-500/35 via-teal-400/25 to-cyan-500/35",
    imageTint: "bg-gradient-to-tr from-emerald-600/50 via-teal-500/30 to-cyan-600/40 mix-blend-color",
    imageOverlay: "bg-gradient-to-t from-slate-950/90 via-emerald-950/35 to-teal-900/15",
    domainBadge: "border-emerald-400/40 bg-emerald-950/80 text-emerald-200 shadow-emerald-500/10",
    metricBadge: "border-emerald-400/40 bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white",
    clientText: "text-emerald-700",
    clientIcon: "text-emerald-600",
    titleHover: "group-hover/card:text-emerald-600",
    chipStyle: "border-emerald-200/80 bg-emerald-50/80 text-emerald-700",
    ctaStyle: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/25 group-hover/card:shadow-md group-hover/card:from-emerald-500 group-hover/card:to-teal-500",
    borderHover: "hover:border-emerald-400",
    spotlightColor: "rgba(16, 185, 129, 0.10)",
    dotColor: "bg-emerald-400",
  },
  {
    // 3: Laser Rose & Sunset Orange
    topBar: "from-rose-500 via-pink-500 to-orange-500",
    glowAura: "from-rose-500/35 via-pink-400/25 to-orange-500/35",
    imageTint: "bg-gradient-to-tr from-rose-600/45 via-pink-500/30 to-orange-500/40 mix-blend-color",
    imageOverlay: "bg-gradient-to-t from-slate-950/90 via-rose-950/35 to-pink-900/15",
    domainBadge: "border-rose-400/40 bg-rose-950/80 text-rose-200 shadow-rose-500/10",
    metricBadge: "border-rose-400/40 bg-gradient-to-r from-rose-600/90 to-orange-500/90 text-white",
    clientText: "text-rose-700",
    clientIcon: "text-rose-600",
    titleHover: "group-hover/card:text-rose-600",
    chipStyle: "border-rose-200/80 bg-rose-50/80 text-rose-700",
    ctaStyle: "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-rose-500/25 group-hover/card:shadow-md group-hover/card:from-rose-500 group-hover/card:to-orange-500",
    borderHover: "hover:border-rose-400",
    spotlightColor: "rgba(244, 63, 94, 0.10)",
    dotColor: "bg-rose-400",
  },
  {
    // 4: Amber Gold & Electric Orange
    topBar: "from-amber-500 via-orange-500 to-rose-500",
    glowAura: "from-amber-500/35 via-orange-400/25 to-yellow-500/35",
    imageTint: "bg-gradient-to-tr from-amber-600/45 via-orange-500/30 to-yellow-500/35 mix-blend-color",
    imageOverlay: "bg-gradient-to-t from-slate-950/90 via-amber-950/35 to-orange-900/15",
    domainBadge: "border-amber-400/40 bg-amber-950/80 text-amber-200 shadow-amber-500/10",
    metricBadge: "border-amber-400/40 bg-gradient-to-r from-amber-600/90 to-orange-600/90 text-white",
    clientText: "text-amber-800",
    clientIcon: "text-amber-600",
    titleHover: "group-hover/card:text-amber-700",
    chipStyle: "border-amber-200/80 bg-amber-50/80 text-amber-800",
    ctaStyle: "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-amber-500/25 group-hover/card:shadow-md group-hover/card:from-amber-500 group-hover/card:to-red-500",
    borderHover: "hover:border-amber-400",
    spotlightColor: "rgba(245, 158, 11, 0.10)",
    dotColor: "bg-amber-400",
  },
  {
    // 5: Deep Indigo & Sky Cyan
    topBar: "from-indigo-600 via-blue-500 to-sky-400",
    glowAura: "from-indigo-500/35 via-sky-400/25 to-blue-500/35",
    imageTint: "bg-gradient-to-tr from-indigo-600/50 via-blue-500/30 to-sky-400/40 mix-blend-color",
    imageOverlay: "bg-gradient-to-t from-slate-950/90 via-indigo-950/35 to-sky-900/15",
    domainBadge: "border-sky-400/40 bg-indigo-950/80 text-sky-200 shadow-sky-500/10",
    metricBadge: "border-sky-400/40 bg-gradient-to-r from-indigo-600/90 to-sky-600/90 text-white",
    clientText: "text-indigo-700",
    clientIcon: "text-indigo-600",
    titleHover: "group-hover/card:text-indigo-600",
    chipStyle: "border-indigo-200/80 bg-indigo-50/80 text-indigo-700",
    ctaStyle: "bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-indigo-500/25 group-hover/card:shadow-md group-hover/card:from-indigo-500 group-hover/card:to-sky-500",
    borderHover: "hover:border-indigo-400",
    spotlightColor: "rgba(79, 70, 229, 0.10)",
    dotColor: "bg-sky-400",
  },
];

type ShowcaseProject = ExtendedProject & { detail?: Project };

export type IndustryKey =
  | "all"
  | "banking"
  | "healthcare"
  | "enterprise"
  | "retail"
  | "legal";

export const INDUSTRY_CATEGORIES: {
  key: IndustryKey;
  label: string;
  badgeColor: string;
}[] = [
  {
    key: "all",
    label: "All Industries",
    badgeColor: "from-blue-600 via-indigo-600 to-violet-600",
  },
  {
    key: "banking",
    label: "Banking & FinTech",
    badgeColor: "from-emerald-600 to-teal-600",
  },
  {
    key: "healthcare",
    label: "Healthcare & Life Sciences",
    badgeColor: "from-rose-600 to-pink-600",
  },
  {
    key: "enterprise",
    label: "Enterprise SaaS & Cloud",
    badgeColor: "from-blue-600 to-cyan-600",
  },
  {
    key: "retail",
    label: "Retail, CPG & Consumer",
    badgeColor: "from-violet-600 to-fuchsia-600",
  },
  {
    key: "legal",
    label: "Legal & Compliance",
    badgeColor: "from-amber-600 to-orange-600",
  },
];

const PROJECT_INDUSTRY_META: Record<
  string,
  { industryLabel: string; categories: IndustryKey[] }
> = {
  "digital-onboarding-video-kyc": {
    industryLabel: "Banking & FinTech",
    categories: ["banking", "legal"],
  },
  "conversational-banking-chatbot": {
    industryLabel: "Banking & Financial Services",
    categories: ["banking"],
  },
  "microsoft-azure-pii-detection": {
    industryLabel: "Enterprise SaaS & Cloud",
    categories: ["enterprise", "legal"],
  },
  "poca-partner-capability-assessment": {
    industryLabel: "Retail, CPG & Enterprise",
    categories: ["retail", "enterprise"],
  },
  "chat-with-pi": {
    industryLabel: "Retail & Enterprise GenAI",
    categories: ["retail", "enterprise"],
  },
  txtsense: {
    industryLabel: "Enterprise BI, SaaS & Research",
    categories: ["enterprise", "retail", "healthcare"],
  },
  "scrapy-web-social-intelligence": {
    industryLabel: "Retail, Social & Enterprise BI",
    categories: ["retail", "enterprise"],
  },
  "brandtrax-competitive-banking-intelligence": {
    industryLabel: "Banking & Competitive Intelligence",
    categories: ["banking", "enterprise"],
  },
  "brandtrust-linkedin-trust-intelligence": {
    industryLabel: "Enterprise SaaS & Brand Intelligence",
    categories: ["enterprise", "retail"],
  },
  "bioconferix-agentic-conference-planner": {
    industryLabel: "Healthcare, Pharma & Life Sciences",
    categories: ["healthcare", "enterprise"],
  },
  "synthetic-virtual-persona-mars": {
    industryLabel: "Retail, CPG & Consumer AI",
    categories: ["retail", "enterprise"],
  },
  "lenovo-4p-compass-inventory-health": {
    industryLabel: "Enterprise Supply Chain & Retail",
    categories: ["enterprise", "retail"],
  },
  "voc-agentic-customer-intelligence": {
    industryLabel: "Retail, Consumer & Enterprise AI",
    categories: ["retail", "enterprise"],
  },
  "nexora-agentic-document-intelligence": {
    industryLabel: "Enterprise Knowledge & Document AI",
    categories: ["enterprise"],
  },
  "data-to-deck-multi-agent-ppt-automation": {
    industryLabel: "Enterprise Multi-Agent Automation",
    categories: ["enterprise", "retail"],
  },
  "retailer-ai-maturity-microsoft": {
    industryLabel: "Retail AEO & AI Readiness",
    categories: ["retail", "enterprise"],
  },
  "beacon-retail-sku-execution-scorecard": {
    industryLabel: "Retail Digital Shelf & AI Automation",
    categories: ["retail", "enterprise"],
  },
};

const PROJECT_CARDS: ShowcaseProject[] = PROJECTS.map(
  (project): ShowcaseProject => ({
    slug: project.slug,
    shortTitle: project.title,
    title: project.title,
    tagline: project.summary,
    domain: project.domain,
    client: project.client,
    year: project.year ?? 0,
    role: project.role,
    cover_image: project.images[0].src,
    architecture_id: "portfolio-architecture",
    summary: project.summary,
    problem: project.problem,
    solution: project.solution,
    metrics: project.outcomes
      .filter((outcome) => outcome.status !== "TODO")
      .map(({ label, value }) => ({ label, value })),
    stack: project.stack,
    categorizedStack: [],
    screenshots: project.images.map(({ src, alt, caption }) => ({
      title: alt,
      caption,
      url: src,
    })),
    keyHighlights: [],
    detail: project,
  })
);

interface ProjectDetailViewProps {
  project: Project;
  onClose: () => void;
}

function ProjectDetailView({ project, onClose }: ProjectDetailViewProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-slate-950/80 backdrop-blur-md sm:items-center sm:p-5 md:p-8"
      data-lenis-prevent="true"
      onClick={onClose}
    >
      <article
        aria-label={`${project.title} project details`}
        className="flex h-dvh w-full min-w-0 max-w-6xl flex-col overflow-hidden bg-white shadow-2xl sm:h-[92dvh] sm:rounded-3xl sm:border sm:border-white/80"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-white p-4 sm:p-6">
          <div className="min-w-0 space-y-2">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700">{project.domain}</p>
            <h2 className="font-display text-xl font-extrabold leading-tight text-slate-950 sm:text-3xl">{project.title}</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-600">{project.summary}</p>
            <dl className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-slate-600">
              <div><dt className="inline font-bold text-slate-800">Client: </dt><dd className="inline">{project.client}</dd></div>
              <div className="basis-full sm:basis-auto"><dt className="inline font-bold text-slate-800">Role: </dt><dd className="inline">{project.role}</dd></div>
            </dl>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="shrink-0 rounded-full bg-slate-100 p-2 text-slate-700 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-7" data-lenis-prevent="true">
          <div className="mx-auto max-w-5xl space-y-10">
            <section aria-labelledby="project-gallery-heading" className="space-y-4">
              <h3 id="project-gallery-heading" className="font-display text-lg font-bold text-slate-900">Image gallery</h3>
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                {project.images.map((image) => (
                  <figure key={image.src} className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <div className="relative aspect-[16/9] w-full bg-slate-100">
                      <Image src={image.src} alt={image.alt} fill unoptimized className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                    </div>
                    <figcaption className="p-3 text-sm leading-relaxed text-slate-600">{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section aria-labelledby="project-problem-heading" className="space-y-2">
              <h3 id="project-problem-heading" className="font-display text-lg font-bold text-slate-900">Problem</h3>
              <p className="leading-relaxed text-slate-700">{project.problem}</p>
            </section>

            <section aria-labelledby="project-solution-heading" className="space-y-2">
              <h3 id="project-solution-heading" className="font-display text-lg font-bold text-slate-900">Solution overview</h3>
              <p className="leading-relaxed text-slate-700">{project.solution}</p>
            </section>

            <section aria-labelledby="project-features-heading" className="space-y-4">
              <h3 id="project-features-heading" className="font-display text-lg font-bold text-slate-900">Feature-by-feature breakdown</h3>
              <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
                {project.features.map((feature, index) => {
                  const featureId = `feature-${project.slug}-${index}`;
                  return (
                    <article id={featureId} key={feature.name} className="min-w-0 scroll-mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <h4 className="mb-3 font-display text-base font-bold text-slate-900">{feature.name}</h4>
                      <dl className="space-y-3 text-sm leading-relaxed">
                        <div><dt className="font-semibold text-slate-800">What it does</dt><dd className="text-slate-600">{feature.whatItDoes}</dd></div>
                        <div><dt className="font-semibold text-slate-800">How it works (technical)</dt><dd className="text-slate-600">{feature.howItWorks}</dd></div>
                        <div><dt className="font-semibold text-slate-800">Stack used</dt><dd className="text-slate-600">{feature.stack.join(", ")}</dd></div>
                        <div><dt className="font-semibold text-slate-800">Why this approach</dt><dd className="text-slate-600">{feature.whyThisApproach}</dd></div>
                      </dl>
                    </article>
                  );
                })}
              </div>
            </section>

            <section aria-labelledby="project-architecture-heading" className="space-y-4">
              <h3 id="project-architecture-heading" className="font-display text-lg font-bold text-slate-900">Architecture</h3>
              <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-slate-800">Layers and responsibilities</h4>
                  <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
                    {project.architecture.layers.map((layer) => <li key={layer.name}><strong className="text-slate-800">{layer.name}: </strong>{layer.responsibility}</li>)}
                  </ol>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-slate-800">Data flow</h4>
                  <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
                    {project.architecture.dataFlow.map((step, index) => <li key={`${index}-${step}`}>{step}</li>)}
                  </ol>
                </div>
              </div>
            </section>

            <section aria-labelledby="project-decisions-heading" className="space-y-4">
              <h3 id="project-decisions-heading" className="font-display text-lg font-bold text-slate-900">Key technical decisions</h3>
              <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
                {project.decisions.map((decision) => (
                  <article key={decision.title} className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed">
                    <h4 className="font-semibold text-slate-900">{decision.title}</h4>
                    <p className="mt-2 text-slate-600"><strong className="text-slate-800">Options considered: </strong>{decision.options.join(" · ")}</p>
                    <p className="mt-2 text-slate-600"><strong className="text-slate-800">Chosen: </strong>{decision.chosen}</p>
                    <p className="mt-2 text-slate-600"><strong className="text-slate-800">Trade-off: </strong>{decision.tradeoff}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="project-challenges-heading" className="space-y-4">
              <h3 id="project-challenges-heading" className="font-display text-lg font-bold text-slate-900">Challenges and how they were solved</h3>
              <div className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <article key={`${index}-${challenge.problem}`} className="rounded-xl border border-slate-200 p-4 text-sm leading-relaxed">
                    <p className="text-slate-700"><strong className="text-slate-900">Challenge: </strong>{challenge.problem}</p>
                    <p className="mt-2 text-slate-600"><strong className="text-slate-800">Resolution: </strong>{challenge.resolution}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="project-contribution-heading" className="space-y-3">
              <h3 id="project-contribution-heading" className="font-display text-lg font-bold text-slate-900">My contribution</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                {project.myContribution.map((contribution, index) => <li key={`${index}-${contribution}`}>{contribution}</li>)}
              </ul>
            </section>

            <section aria-labelledby="project-outcomes-heading" className="space-y-4">
              <h3 id="project-outcomes-heading" className="font-display text-lg font-bold text-slate-900">Outcomes</h3>
              <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.outcomes.filter((outcome) => outcome.status !== "TODO").map((outcome) => (
                  <article key={`${outcome.value}-${outcome.label}`} className="min-w-0 rounded-xl border border-slate-200 p-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 font-mono text-[10px] font-bold ${outcome.status === "verified" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}>
                      {outcome.status === "verified" ? "Verified" : "Vendor claim"}
                    </span>
                    {outcome.status === "vendor-claim" && <p className="mt-2 font-mono text-[10px] text-amber-800">Vendor-stated</p>}
                    <p className="mt-3 break-words font-display text-xl font-bold text-slate-900">{outcome.value}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{outcome.label}</p>
                  </article>
                ))}
                {project.outcomes.every((outcome) => outcome.status === "TODO") && (
                  <p className="text-sm text-slate-500">No confirmed outcome metrics are published for this project.</p>
                )}
              </div>
            </section>

            <section aria-labelledby="project-stack-heading" className="space-y-3 pb-3">
              <h3 id="project-stack-heading" className="font-display text-lg font-bold text-slate-900">Tech stack</h3>
              <div className="flex min-w-0 flex-wrap gap-2">
                {project.stack.map((technology) => {
                  const featureIndex = project.features.findIndex((feature) => feature.stack.includes(technology));
                  return featureIndex >= 0 ? (
                    <a key={technology} href={`#feature-${project.slug}-${featureIndex}`} className="max-w-full break-words rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 font-mono text-xs text-blue-800 hover:bg-blue-100">{technology}</a>
                  ) : (
                    <span key={technology} className="max-w-full break-words rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 font-mono text-xs text-slate-700">{technology}</span>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<ShowcaseProject[]>(PROJECT_CARDS);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey>("all");
  const [activeModalProject, setActiveModalProject] = useState<ShowcaseProject | null>(null);
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);
  const [hoveredTooltipSlug, setHoveredTooltipSlug] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopSpeech = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Dismiss tooltip on Escape key (WCAG 1.4.13 Dismissible requirement)
  useEffect(() => {
    if (!hoveredTooltipSlug) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHoveredTooltipSlug(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [hoveredTooltipSlug]);

  const buildProjectSpeechText = (proj: ShowcaseProject) => {
    const parts = [
      `Project: ${proj.title}.`,
      `Client: ${proj.client}.`,
      `Domain: ${proj.domain}.`,
      proj.role ? `Role: ${proj.role}.` : "",
      `Description: ${proj.summary}`,
      proj.problem ? `Problem solved: ${proj.problem}` : "",
      proj.solution ? `Solution overview: ${proj.solution}` : "",
      proj.stack.length > 0 ? `Tech Stack: ${proj.stack.join(", ")}.` : "",
    ];
    return parts.filter(Boolean).join(" ");
  };

  const playSpeechText = (id: string, text: string) => {
    stopSpeech();
    soundSynth.playTransmit();
    setSpeakingId(id);

    const ttsUrl = `/api/tts?text=${encodeURIComponent(text)}`;
    const audio = new Audio(ttsUrl);
    audioRef.current = audio;

    audio.onended = () => {
      setSpeakingId(null);
      audioRef.current = null;
    };

    audio.onerror = () => {
      audioRef.current = null;
      // Fallback to browser Web Speech API if offline
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.onend = () => setSpeakingId(null);
        utterance.onerror = () => setSpeakingId(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setSpeakingId(null);
      }
    };

    audio.play().catch(() => {
      audio.onerror?.(new Event("error"));
    });
  };

  const handleSpeakProject = (e: React.MouseEvent, proj: ShowcaseProject) => {
    e.stopPropagation();
    if (speakingId === proj.slug) {
      soundSynth.playClick();
      stopSpeech();
      return;
    }
    playSpeechText(proj.slug, buildProjectSpeechText(proj));
  };

  const handleSpeakAllCards = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (speakingId === "all-cards") {
      soundSynth.playClick();
      stopSpeech();
      return;
    }
    const intro = `Featured Production Architectures. Showing ${filteredProjects.length} projects. `;
    const cardsNarration = filteredProjects
      .map((proj, idx) => `Project ${idx + 1}. ${buildProjectSpeechText(proj)}`)
      .join(" ");
    playSpeechText("all-cards", intro + cardsNarration);
  };

  const filteredProjects =
    selectedIndustry === "all"
      ? projects
      : projects.filter((p) => {
          const meta = PROJECT_INDUSTRY_META[p.slug];
          return meta ? meta.categories.includes(selectedIndustry) : true;
        });

  const CARDS_PER_PAGE = 6; // Show up to 6 projects per page (3x2 grid)
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / CARDS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages - 1);
  const startIndex = safeCurrentPage * CARDS_PER_PAGE;
  const endIndex = Math.min(startIndex + CARDS_PER_PAGE, filteredProjects.length);
  const visibleProjects = filteredProjects.slice(startIndex, endIndex);

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

  // Auto-move projects carousel after 5s, pause on hover or when modal is open
  useEffect(() => {
    if (isProjectsHovered || activeModalProject || totalPages <= 1) return;
    const timer = setInterval(() => {
      setSlideDirection(1);
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(timer);
  }, [isProjectsHovered, activeModalProject, totalPages]);

  const handlePrevPhoto = () => {
    if (!activeModalProject?.screenshots?.length) return;
    const count = activeModalProject.screenshots.length;
    setActiveScreenshotIndex((prev) => (prev - 1 + count) % count);
    soundSynth.playClick();
  };

  const handleNextPhoto = () => {
    if (!activeModalProject?.screenshots?.length) return;
    const count = activeModalProject.screenshots.length;
    setActiveScreenshotIndex((prev) => (prev + 1) % count);
    soundSynth.playClick();
  };

  // Autoplay photo carousel inside modal (auto-moves every 3.5s if not hovered)
  useEffect(() => {
    if (!activeModalProject || activeModalProject.detail || isPhotoHovered) return;
    const shots = activeModalProject.screenshots;
    if (!shots || shots.length <= 1) return;

    const timer = setInterval(() => {
      setActiveScreenshotIndex((prev) => (prev + 1) % shots.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [activeModalProject, isPhotoHovered]);

  useEffect(() => {
    setProjects(PROJECT_CARDS);
  }, []);

  // Keyboard navigation, Lenis stop, & page scroll lock when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalProject(null);
      }
    };

    const lenisInstance =
      typeof window !== "undefined"
        ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
        : null;

    if (activeModalProject) {
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
  }, [activeModalProject]);

  const openModal = (proj: ShowcaseProject) => {
    setActiveModalProject(proj);
    setActiveScreenshotIndex(0);
    setIsPhotoHovered(false);
    soundSynth.playClick();
  };

  const closeModal = () => {
    setActiveModalProject(null);
    setIsPhotoHovered(false);
    soundSynth.playClick();
  };

  return (
    <section
      id="projects"
      className="relative w-full h-[calc(100vh-3.5rem)] min-h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] flex flex-col justify-between py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1800px] mx-auto selection:bg-blue-500 selection:text-white snap-start overflow-hidden"
    >
      {/* Ambient Living Aurora Orbs Behind Grid */}
      <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute top-1/3 right-1/6 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl animate-pulse" />

      {/* Consolidated Executive Header Plinth & Industry Categories Bar */}
      <div className="relative group mb-2 lg:mb-2.5 shrink-0 z-10">
        <div className="absolute -inset-1.5 rounded-[24px] bg-gradient-to-r from-blue-500/25 via-violet-500/20 to-emerald-400/25 opacity-80 group-hover:opacity-100 blur-xl pointer-events-none transition-opacity duration-500" />
        <div className="relative overflow-hidden px-4 py-2 md:px-5 md:py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-sm flex flex-col gap-2">
          {/* Rainbow Top Accent Line on Header */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-violet-500 to-emerald-500" />

          {/* Top Row: Eyebrow + Title + Live Progress & Pagination Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
            {/* Left: Eyebrow + Title */}
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                  </span>
                  <span className="font-mono text-[10px] text-slate-700 uppercase tracking-widest font-bold">
                    FEATURED PRODUCTION ARCHITECTURES
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-mono text-[10px] font-bold shadow-xs">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-200 animate-spin" style={{ animationDuration: "6s" }} />
                  <span>TOTAL PROJECTS: {projects.length}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 font-mono text-[9.5px] text-blue-800 font-bold">
                  <span>
                    PAGE {safeCurrentPage + 1} OF {totalPages}
                  </span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-baseline gap-1 lg:gap-2.5 mt-0.5">
                <h2 className="text-lg sm:text-xl lg:text-[21px] font-display font-extrabold tracking-tight text-slate-900 leading-tight shrink-0">
                  Engineered platforms.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600">
                    Measurable impact.
                  </span>
                </h2>
                <p className="font-body text-[11.5px] text-slate-500 truncate">
                  Production AI systems delivered across Banking, Healthcare, Enterprise SaaS, Retail &amp; Legal sectors.
                </p>
              </div>
            </div>

            {/* Right: Quick Carousel Controls & Live Progress Status */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              {/* Megaphone: Read All Project Cards Section Button */}
              <button
                type="button"
                onClick={handleSpeakAllCards}
                aria-label={
                  speakingId === "all-cards"
                    ? "Stop reading all project cards"
                    : "Read all project cards aloud"
                }
                aria-pressed={speakingId === "all-cards"}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-mono text-[10px] font-bold border transition-all duration-200 cursor-pointer shadow-2xs ${
                  speakingId === "all-cards"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-md shadow-emerald-500/20 animate-pulse"
                    : "bg-slate-900 hover:bg-blue-600 text-white border-slate-800 hover:border-blue-500"
                }`}
              >
                {speakingId === "all-cards" ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-amber-300" />
                    <span className="hidden sm:inline">Stop Reading</span>
                  </>
                ) : (
                  <>
                    <Megaphone className="w-3.5 h-3.5 text-cyan-300" />
                    <span className="hidden sm:inline">Read All Cards</span>
                  </>
                )}
              </button>

              {/* Live Auto-Advance Progress Pill */}
              <div className="hidden xl:flex flex-col gap-1 px-2.5 py-1 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-xs min-w-[128px]">
                <div className="flex items-center justify-between gap-2 font-mono text-[9.5px] font-bold">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <span className={`h-1.5 w-1.5 rounded-full ${isProjectsHovered ? "bg-amber-400" : "bg-emerald-400 animate-ping"}`} />
                    {isProjectsHovered ? "PAUSED" : "LIVE STREAM"}
                  </span>
                  <span className="text-slate-400">5.0s</span>
                </div>
                <div className="h-1 w-full rounded-full bg-slate-800 overflow-hidden">
                  {!isProjectsHovered && !activeModalProject ? (
                    <motion.div
                      key={`timer-${safeCurrentPage}-${selectedIndustry}-${isProjectsHovered}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                    />
                  ) : (
                    <div className="h-full w-1/2 rounded-full bg-amber-400/80" />
                  )}
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
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

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100/90 border border-slate-200/90 shadow-2xs font-mono text-xs font-bold text-slate-700">
                <button
                  onClick={handlePrev}
                  aria-label="Previous 6 projects"
                  className="px-2 py-0.5 rounded-lg bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200/70 transition-all duration-200 cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                <span className="px-2 text-[10.5px] text-slate-800 font-extrabold">
                  {filteredProjects.length === 0
                    ? "0 of 0 Total"
                    : startIndex + 1 === endIndex
                    ? `${endIndex} of ${filteredProjects.length} Total`
                    : `${startIndex + 1}–${endIndex} of ${filteredProjects.length} Total`}
                </span>
                <button
                  onClick={handleNext}
                  aria-label="Next 6 projects"
                  className="px-2 py-0.5 rounded-lg bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200/70 transition-all duration-200 cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row: Industries / Sectors Category Filter Bar */}
          <div className="pt-1.5 border-t border-slate-200/75 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-blue-600" />
                <span>Industries &amp; Sectors:</span>
              </span>

              {INDUSTRY_CATEGORIES.map((cat) => {
                const isSelected = selectedIndustry === cat.key;
                const count =
                  cat.key === "all"
                    ? projects.length
                    : projects.filter((p) =>
                        PROJECT_INDUSTRY_META[p.slug]?.categories.includes(cat.key)
                      ).length;

                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => {
                      setSlideDirection(1);
                      setSelectedIndustry(cat.key);
                      setCurrentPage(0);
                      soundSynth.playClick();
                    }}
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 border ${
                      isSelected
                        ? `bg-gradient-to-r ${cat.badgeColor} text-white border-transparent shadow-xs scale-[1.02]`
                        : "bg-slate-50/90 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border-slate-200/90 hover:border-blue-300"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0 rounded-full ${
                        isSelected
                          ? "bg-white/25 text-white"
                          : "bg-slate-200/80 text-slate-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 6 Project Cards Single-Screen 3x2 Showcase Grid */}
      <div
        className="relative group/carousel flex-1 min-h-0 flex flex-col justify-center z-10"
        onMouseEnter={() => setIsProjectsHovered(true)}
        onMouseLeave={() => setIsProjectsHovered(false)}
        onMouseMove={() => setIsProjectsHovered(true)}
        onPointerEnter={() => setIsProjectsHovered(true)}
        onPointerLeave={() => setIsProjectsHovered(false)}
      >
        {/* Left Carousel Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous 6 projects carousel arrow"
          className="absolute left-1 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 hover:bg-blue-600 text-white shadow-lg border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group/arrow"
        >
          <ChevronLeft className="w-5 h-5 relative z-10 transition-transform group-hover/arrow:-translate-x-0.5" />
        </button>

        {/* Right Carousel Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next 6 projects carousel arrow"
          className="absolute right-1 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/90 hover:bg-blue-600 text-white shadow-lg border border-white/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group/arrow"
        >
          <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover/arrow:translate-x-0.5" />
        </button>

        {/* Animated 6-Project 3x2 Grid with Horizontal Slide Transition */}
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={`${selectedIndustry}-${safeCurrentPage}`}
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
            className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(2,minmax(0,1fr))] gap-3 lg:gap-3.5 items-stretch"
          >
            {visibleProjects.map((proj, idx) => {
              const globalIdx = startIndex + idx;
              const theme = PROJECT_THEMES[globalIdx % PROJECT_THEMES.length];
              const industryMeta = PROJECT_INDUSTRY_META[proj.slug];
              const isTooltipOpen = hoveredTooltipSlug === proj.slug;
              const isSpeakingCard = speakingId === proj.slug;
              const tooltipId = `project-desc-tooltip-${proj.slug}`;

              return (
                <motion.div
                  key={proj.slug}
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 26,
                    delay: idx * 0.045,
                  }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`relative group/card flex min-w-0 min-h-0 flex-col ${
                    isTooltipOpen ? "z-40" : "z-10"
                  }`}
                >
                  {/* Multi-Spectrum Radiant Aura Behind Card */}
                  <div
                    className={`absolute -inset-1.5 rounded-2xl bg-gradient-to-tr ${theme.glowAura} opacity-35 group-hover/card:opacity-100 blur-xl pointer-events-none transition-opacity duration-500`}
                  />

                  <article
                    onClick={() => openModal(proj)}
                    className={`relative flex h-full w-full min-w-0 min-h-0 flex-col justify-between rounded-2xl border border-slate-200/90 ${theme.borderHover} bg-white/95 p-2.5 sm:p-3 text-left shadow-sm hover:shadow-xl backdrop-blur-xl transition-all duration-300 cursor-pointer`}
                  >
                    {/* Vibrant Top Gradient Beam */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 overflow-hidden rounded-t-2xl">
                      <div className={`h-full w-full bg-gradient-to-r ${theme.topBar}`} />
                    </div>

                    {/* Top Visual Cover Banner with Balanced Height for 3x2 Grid */}
                    <div className="relative w-full h-32 sm:h-36 lg:h-[132px] xl:h-[146px] shrink-0 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-950 shadow-xs mt-0.5">
                      <Image
                        src={proj.cover_image}
                        alt={proj.title}
                        fill
                        priority={idx < 3}
                        unoptimized
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-110 contrast-125 brightness-95"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Vibrant Theme Color Duotone Wash */}
                      <div className={`absolute inset-0 ${theme.imageTint} pointer-events-none transition-opacity duration-500 group-hover/card:opacity-90`} />
                      {/* Deep Rich Vignette for Crisp Badge Contrast */}
                      <div className={`absolute inset-0 ${theme.imageOverlay} pointer-events-none`} />

                      {/* Animated Shimmer Sweep on Hover */}
                      <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                      {/* Top-Left Pulsing Domain Pill */}
                      <div
                        className={`absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-lg border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-sm ${theme.domainBadge}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${theme.dotColor} animate-pulse shrink-0`} />
                        <span className="truncate">{proj.domain}</span>
                      </div>

                      {/* Bottom-Left Vivid Gradient Metric Pill */}
                      {proj.metrics && proj.metrics.length > 0 && (
                        <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between gap-1.5">
                          <span
                            className={`inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 font-mono text-[9px] font-bold backdrop-blur-md shadow-sm max-w-full ${theme.metricBadge}`}
                          >
                            <Zap className="h-2.5 w-2.5 fill-current shrink-0" />
                            <span className="truncate">
                              {proj.metrics[0].value} · {proj.metrics[0].label}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Middle Content Section */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1 min-w-0">
                          <Building2 className={`h-3 w-3 ${theme.clientIcon} shrink-0`} />
                          <p className={`font-mono text-[9.5px] font-bold uppercase tracking-wider ${theme.clientText} truncate`}>
                            {proj.client}
                          </p>
                        </div>

                        {industryMeta && (
                          <span
                            className={`px-1.5 py-0.5 rounded-md border font-mono text-[8.5px] font-bold uppercase tracking-wider shrink-0 ${theme.chipStyle}`}
                          >
                            {industryMeta.industryLabel}
                          </span>
                        )}
                      </div>

                      <h3
                        className={`font-display text-[13px] xl:text-[13.5px] font-extrabold text-slate-900 ${theme.titleHover} transition-colors line-clamp-1 mt-0.5 leading-snug`}
                      >
                        {proj.title}
                      </h3>

                      <p className="font-body text-[11px] xl:text-[11.5px] text-slate-600 line-clamp-2 mt-0.5 leading-snug">
                        {proj.summary}
                      </p>
                    </div>

                    {/* Bottom Footer: Tech Stack Chips + Megaphone Audio Reader + Info Full Description Tooltip + Explore CTA */}
                    <div className="relative flex items-center justify-between gap-1.5 pt-2 border-t border-slate-100 shrink-0">
                      <div className="flex items-center gap-1 min-w-0 overflow-hidden">
                        {proj.stack.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className={`rounded-md border px-2 py-0.5 font-mono text-[9.5px] font-semibold truncate max-w-[110px] shrink-0 transition-transform group-hover/card:scale-[1.02] ${theme.chipStyle}`}
                          >
                            {tech}
                          </span>
                        ))}
                        {proj.stack.length > 2 && (
                          <span className="rounded-md bg-slate-100 border border-slate-200/80 px-1.5 py-0.5 font-mono text-[9px] font-bold text-slate-600 shrink-0">
                            +{proj.stack.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Right End Action Controls: Megaphone (Read Aloud), Info (Full Description Tooltip), Explore */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Megaphone Button: Read Project Description & Card Details Aloud */}
                        <button
                          type="button"
                          onClick={(e) => handleSpeakProject(e, proj)}
                          aria-label={
                            isSpeakingCard
                              ? `Stop reading ${proj.title}`
                              : `Read ${proj.title} description aloud`
                          }
                          aria-pressed={isSpeakingCard}
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                            isSpeakingCard
                              ? "border-emerald-500 bg-emerald-600 text-white shadow-md shadow-emerald-500/30 animate-pulse"
                              : "border-slate-200 bg-slate-100/90 text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                          }`}
                        >
                          {isSpeakingCard ? (
                            <VolumeX className="h-3.5 w-3.5" />
                          ) : (
                            <Megaphone className="h-3.5 w-3.5" />
                          )}
                        </button>

                        {/* Info Symbol Trigger (Hovered/Focused Shows Full Card Tooltip Without Any Scrollbar) */}
                        <div
                          onMouseEnter={() => setHoveredTooltipSlug(proj.slug)}
                          onMouseLeave={() => setHoveredTooltipSlug(null)}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setHoveredTooltipSlug((prev) =>
                                prev === proj.slug ? null : proj.slug
                              );
                            }}
                            onFocus={() => setHoveredTooltipSlug(proj.slug)}
                            onBlur={() => setHoveredTooltipSlug(null)}
                            aria-label={`Complete project description for ${proj.title}`}
                            aria-describedby={tooltipId}
                            aria-expanded={isTooltipOpen}
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                              isTooltipOpen
                                ? "border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-500/25"
                                : "border-slate-200 bg-slate-100/90 text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                            }`}
                          >
                            <Info className="h-3.5 w-3.5" />
                          </button>

                          {/* Complete Unclamped Project Description Tooltip Inside Card Width — Solid White Background & Zero Scrollbar */}
                          <div
                            id={tooltipId}
                            role="tooltip"
                            onClick={(e) => e.stopPropagation()}
                            className={`
                              absolute bottom-full left-0 right-0 mb-2 rounded-2xl border border-slate-200 bg-white p-3.5 text-left text-slate-900 shadow-2xl ring-1 ring-slate-900/10 transition-all duration-200 z-50 overflow-hidden
                              ${
                                isTooltipOpen
                                  ? "opacity-100 translate-y-0 pointer-events-auto visible"
                                  : "opacity-0 translate-y-1.5 pointer-events-none invisible"
                              }
                            `}
                          >
                            {/* Top Theme Gradient Accent Strip */}
                            <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.topBar}`} />

                            <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-slate-200">
                              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-blue-700">
                                Complete Project Description
                              </span>
                              <span className="font-mono text-[8.5px] font-semibold text-slate-500 truncate">
                                {proj.domain}
                              </span>
                            </div>
                            <h4 className="font-display text-xs font-extrabold text-slate-900 leading-snug">
                              {proj.title}
                            </h4>
                            <p className="mt-1 font-body text-[10.5px] leading-snug text-slate-700">
                              {proj.summary}
                            </p>
                            {proj.problem && (
                              <div className="mt-1.5 pt-1.5 border-t border-slate-100">
                                <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-rose-600 block">
                                  Problem Solved
                                </span>
                                <p className="mt-0.5 font-body text-[10px] leading-snug text-slate-700">
                                  {proj.problem}
                                </p>
                              </div>
                            )}
                            {proj.solution && (
                              <div className="mt-1.5 pt-1.5 border-t border-slate-100">
                                <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-emerald-700 block">
                                  Solution Overview
                                </span>
                                <p className="mt-0.5 font-body text-[10px] leading-snug text-slate-700">
                                  {proj.solution}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Explore Modal CTA Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(proj);
                          }}
                          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-[10px] font-bold shadow-xs transition-all duration-300 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${theme.ctaStyle}`}
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3 group-hover/card:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Complete Project Details Modal / Popup */}
      {activeModalProject && !activeModalProject.detail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          data-lenis-prevent="true"
          onClick={closeModal}
          onWheel={(e) => e.stopPropagation()}
        >
          <div
            className="relative w-full max-w-5xl h-[92vh] max-h-[92vh] flex flex-col group"
            data-lenis-prevent="true"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Spreading Radiant Aurora Glow Halo behind Modal */}
            <div className="absolute -inset-3 rounded-[38px] bg-gradient-to-tr from-cyan-400/30 via-blue-500/25 to-purple-500/30 opacity-90 blur-3xl pointer-events-none" />

            <div
              className="relative w-full h-full bg-white rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Modal Sticky Header */}
              <div className="p-5 sm:p-6 border-b border-slate-200 bg-white/95 backdrop-blur-md flex items-start justify-between gap-4 z-10 shrink-0">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {activeModalProject.domain}
                    </span>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-1 font-mono text-xs text-slate-700 font-bold">
                      <Building2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Client: {activeModalProject.client}</span>
                    </div>
                  </div>

                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
                    {activeModalProject.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-slate-500">
                    {activeModalProject.tagline}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  aria-label="Close project modal"
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body - Strictly Bounded with flex-1 min-h-0 and smooth scrolling */}
              <div
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-7 md:p-8 space-y-8 [scrollbar-gutter:stable]"
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
              >
                {/* 1. Photo Part: Interactive Carousel with Arrows + Auto-Advance */}
                {activeModalProject.screenshots && activeModalProject.screenshots.length > 0 && (
                  <div
                    className="space-y-3"
                    onMouseEnter={() => setIsPhotoHovered(true)}
                    onMouseLeave={() => setIsPhotoHovered(false)}
                    onMouseMove={() => setIsPhotoHovered(true)}
                    onPointerEnter={() => setIsPhotoHovered(true)}
                    onPointerLeave={() => setIsPhotoHovered(false)}
                    onMouseOver={() => setIsPhotoHovered(true)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold">
                          System Architecture & Screenshots
                        </span>
                        {isPhotoHovered && (
                          <span className="font-mono text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                            Slideshow Paused (Hovered)
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                        Photo 0{activeScreenshotIndex + 1} / 0{activeModalProject.screenshots.length}
                      </span>
                    </div>

                    {/* Active Screenshot Display Frame with Floating Left/Right Arrows */}
                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-lg group/gallery">
                      <Image
                        src={activeModalProject.screenshots[activeScreenshotIndex].url}
                        alt={activeModalProject.screenshots[activeScreenshotIndex].title}
                        fill
                        priority
                        unoptimized
                        className="object-cover object-top transition-all duration-500"
                      />

                      {/* Left Navigation Arrow */}
                      {activeModalProject.screenshots.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevPhoto();
                          }}
                          aria-label="Previous photo"
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-xl group-hover/gallery:opacity-100 opacity-80"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                      )}

                      {/* Right Navigation Arrow */}
                      {activeModalProject.screenshots.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextPhoto();
                          }}
                          aria-label="Next photo"
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-xl group-hover/gallery:opacity-100 opacity-80"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      )}

                      {/* Slide Indicator Dots Overlay */}
                      {activeModalProject.screenshots.length > 1 && (
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                          {activeModalProject.screenshots.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveScreenshotIndex(dotIdx);
                                soundSynth.playSelect();
                              }}
                              className={`h-2 rounded-full transition-all cursor-pointer ${
                                dotIdx === activeScreenshotIndex
                                  ? "w-6 bg-cyan-400"
                                  : "w-2 bg-white/50 hover:bg-white"
                              }`}
                              aria-label={`Go to photo ${dotIdx + 1}`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Screenshot Bottom Caption Bar */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-900/75 to-transparent p-4 sm:p-5 text-white pointer-events-none">
                        <p className="font-display font-bold text-sm sm:text-base text-cyan-300">
                          {activeModalProject.screenshots[activeScreenshotIndex].title}
                        </p>
                        <p className="font-body text-xs text-slate-300 mt-0.5 line-clamp-2">
                          {activeModalProject.screenshots[activeScreenshotIndex].caption}
                        </p>
                      </div>
                    </div>

                    {/* Screenshot Thumbnail Switcher Buttons */}
                    {activeModalProject.screenshots.length > 1 && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        {activeModalProject.screenshots.map((shot, sIdx) => {
                          const isCurrent = sIdx === activeScreenshotIndex;
                          return (
                            <button
                              key={sIdx}
                              onClick={() => {
                                setActiveScreenshotIndex(sIdx);
                                soundSynth.playSelect();
                              }}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                isCurrent
                                  ? "bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20"
                                  : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                              }`}
                            >
                              <span className="font-mono text-[10px] text-blue-600 font-bold block mb-0.5">
                                0{sIdx + 1} · PREVIEW
                              </span>
                              <span className="font-display font-semibold text-xs text-slate-800 line-clamp-1 block">
                                {shot.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Tech Stack Used for the Project (List of all tech stack buttons) */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-600 shrink-0" />
                    <h4 className="font-display font-bold text-base text-slate-900">
                      Tech Stack Used for this Project
                    </h4>
                  </div>

                  {/* Primary Tech Stack Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.stack.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => soundSynth.playSelect()}
                        className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-mono text-xs font-semibold shadow-xs hover:shadow-md hover:shadow-blue-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-white" />
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Which Client */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-blue-700 block">
                        Delivered Client & Enterprise Partner
                      </span>
                      <h4 className="font-display font-extrabold text-base sm:text-lg text-slate-900 mt-0.5">
                        {activeModalProject.client}
                      </h4>
                      <p className="font-body text-xs text-slate-600 mt-0.5">
                        Domain: <span className="font-medium text-slate-800">{activeModalProject.domain}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Enterprise Delivery
                    </span>
                  </div>
                </div>

                {/* 4. Summary and What Problem it solves */}
                <div className="space-y-4">
                  {/* Executive Summary */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                      <h4 className="font-display font-bold text-sm sm:text-base text-slate-900">
                        Executive Project Summary
                      </h4>
                    </div>
                    <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {activeModalProject.summary}
                    </p>
                  </div>

                  {/* Problem It Solves */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-rose-600 shrink-0" />
                      <h4 className="font-display font-bold text-sm sm:text-base text-rose-950">
                        What Problem It Solves & Enterprise Challenge
                      </h4>
                    </div>
                    <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {activeModalProject.problem}
                    </p>
                  </div>
                </div>

                {/* 5. My Role in this Project */}
                <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-500 text-white shrink-0">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-amber-950">
                        My Role in This Project
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      {activeModalProject.role}
                    </span>
                  </div>

                  {activeModalProject.leadership && (
                    <div className="pt-1">
                      <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {activeModalProject.leadership}
                      </p>
                    </div>
                  )}
                </div>

                {/* 6. Description of the Project: Single Unified Container with Detailed Explanation in Paragraphs */}
                <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/90 border border-slate-200/90 space-y-5 shadow-xs">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200/80">
                    <div className="p-1.5 rounded-lg bg-emerald-500 text-white shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
                      Project Description & Architectural Breakdown
                    </h4>
                  </div>

                  {activeModalProject.solution && (
                    <div className="space-y-1.5">
                      <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-800">
                        System Architecture & Core Technical Solution
                      </h5>
                      <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {activeModalProject.solution}
                      </p>
                    </div>
                  )}

                  {activeModalProject.keyHighlights && activeModalProject.keyHighlights.length > 0 && (
                    <div className="space-y-1.5 pt-3 border-t border-slate-200/60">
                      <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-800">
                        Production Highlights & Enterprise Impact
                      </h5>
                      <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {activeModalProject.keyHighlights.join(". ")}.
                      </p>
                    </div>
                  )}

                  {activeModalProject.decisions && activeModalProject.decisions.length > 0 && (
                    <div className="space-y-2 pt-3 border-t border-slate-200/60">
                      <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-800">
                        Key Architectural Decisions & Engineering Trade-Offs (ADRs)
                      </h5>
                      <div className="space-y-2.5">
                        {activeModalProject.decisions.map((dec, dIdx) => (
                          <p key={dIdx} className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                            <strong className="font-mono text-blue-700">✓ {dec.choice}:</strong> Selected over{" "}
                            {dec.over.toLowerCase()} because{" "}
                            {dec.because.toLowerCase().startsWith("because")
                              ? dec.because.slice(7).trim()
                              : dec.because}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {(activeModalProject.deployment || activeModalProject.evaluation) && (
                    <div className="space-y-2.5 pt-3 border-t border-slate-200/60">
                      <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-800">
                        Cloud Deployment Infrastructure & Quality Benchmarks
                      </h5>
                      {activeModalProject.deployment && (
                        <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <strong className="font-semibold text-slate-800">Deployment Architecture: </strong>
                          {activeModalProject.deployment}
                        </p>
                      )}
                      {activeModalProject.evaluation && (
                        <p className="font-body text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <strong className="font-semibold text-slate-800">Quality & Reliability Benchmarks: </strong>
                          {activeModalProject.evaluation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Sticky Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-4 shrink-0">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeModalProject?.detail && (
        <ProjectDetailView project={activeModalProject.detail} onClose={closeModal} />
      )}
    </section>
  );
}
