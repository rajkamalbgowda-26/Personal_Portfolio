"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import { soundSynth } from "@/lib/sound-synth";

/** Auto-advance interval in milliseconds */
export const INTERVAL_MS = 2800;

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type SkillKind = "production";

export type Skill = {
  name: string;
  kind: SkillKind;
};

export type SkillCategory = {
  id: string;
  label: string;
  title: string;
  description: string;
  accentColor: string;
  dotColor: string;
  skills: Skill[];
};

type StatItem = {
  value: string;
  label: string;
  colorClass?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Data — Comprehensive Production Stack Across All 17 Delivered Projects
// ─────────────────────────────────────────────────────────────────────────────

const RAW_CATEGORIES: Omit<SkillCategory, "id">[] = [
  {
    label: "Agentic AI",
    title: "Agentic AI, Multi-Agent Workflows & MCP",
    description:
      "Production multi-agent orchestration, MCP servers, Microsoft Cowork Copilot plugins, persistent wave memory, and human-in-the-loop (HITL) clarification engines.",
    accentColor: "indigo",
    dotColor: "bg-indigo-500",
    skills: [
      { name: "Multi-Agent Orchestration", kind: "production" },
      { name: "LangGraph", kind: "production" },
      { name: "Semantic Kernel", kind: "production" },
      { name: "Model Context Protocol (MCP) Servers", kind: "production" },
      { name: "Microsoft Cowork Copilot Plugins", kind: "production" },
      { name: "Agent Skills & Dynamic Tool Routing", kind: "production" },
      { name: "Agentic RAG Tooling (ragtool)", kind: "production" },
      { name: "Persistent Agent & Wave Memory", kind: "production" },
      { name: "Human-in-the-Loop (HITL) State Machines", kind: "production" },
      { name: "Excel-to-PPTX Blueprint Reverse-Engineering Agents", kind: "production" },
      { name: "Automated Schema & Math Validation Agents", kind: "production" },
      { name: "Synthetic Persona & Focus-Group Moderator Agents", kind: "production" },
      { name: "Agentic Biomedical & Conference Scrapers", kind: "production" },
      { name: "NL-to-SQL & Structured Query Planners", kind: "production" },
      { name: "Multi-Turn Session Context & Memory", kind: "production" },
      { name: "Tool Calling & Function Execution", kind: "production" },
      { name: "CrewAI", kind: "production" },
      { name: "AutoGen", kind: "production" },
      { name: "OpenAI Agents SDK", kind: "production" },
      { name: "LLM Guardrails & Consistency Verification", kind: "production" },
      { name: "Agent Observability (LangSmith)", kind: "production" },
      { name: "Agent-to-Agent (A2A) Protocol", kind: "production" },
    ],
  },
  {
    label: "Generative AI & RAG",
    title: "Generative AI, Multi-Deck RAG & Automated Reporting",
    description:
      "Enterprise LLM platforms, slide-aware PPTX/PDF RAG, source-cited document intelligence, custom prompt studios, and automated PowerPoint/HTML report generation.",
    accentColor: "violet",
    dotColor: "bg-violet-500",
    skills: [
      { name: "Azure OpenAI (GPT-4o / Embeddings)", kind: "production" },
      { name: "Claude & Multimodal LLMs", kind: "production" },
      { name: "Hybrid RAG (BM25 + Dense Vector Search)", kind: "production" },
      { name: "Slide-Aware Multi-Deck PPTX & PDF RAG", kind: "production" },
      { name: "Parent-Child Hierarchical Document Chunking", kind: "production" },
      { name: "Cross-Document Knowledge Graph Linking", kind: "production" },
      { name: "Slide & Page-Level Citation Grounding", kind: "production" },
      { name: "Azure AI Search", kind: "production" },
      { name: "Custom Prompt Studio & Column-Level LLM Execution", kind: "production" },
      { name: "Automated PowerPoint Generation (python-pptx)", kind: "production" },
      { name: "Executive 'Why This Matters' Narrative Synthesis", kind: "production" },
      { name: "Synthetic Survey & Interview Data Generation", kind: "production" },
      { name: "Fine-Tuning & SLMs (LoRA / QLoRA)", kind: "production" },
      { name: "Embeddings & pgvector", kind: "production" },
      { name: "Vector Databases (Qdrant, Pinecone, Chroma)", kind: "production" },
      { name: "Structured Outputs (Pydantic Schema Extraction)", kind: "production" },
      { name: "LLM Evaluation (RAGAS & Calibration Harnesses)", kind: "production" },
      { name: "Prompt Caching & Token Cost Optimization", kind: "production" },
      { name: "Local Models (Ollama, vLLM)", kind: "production" },
    ],
  },
  {
    label: "Scraping & AEO",
    title: "Web Scraping, AEO Readiness & Digital Shelf Intelligence",
    description:
      "Global retail, social media, and clinical-conference scraping engines, 191-question Answer Engine Optimization (AEO) probes, and weekly SKU execution auditing.",
    accentColor: "teal",
    dotColor: "bg-teal-500",
    skills: [
      { name: "Playwright & Headless Browser Automation", kind: "production" },
      { name: "Scrapy & Distributed Web Crawlers", kind: "production" },
      { name: "BeautifulSoup4 & Dynamic DOM Parsing", kind: "production" },
      { name: "Selenium & Scripted Cart-Journey Probes", kind: "production" },
      { name: "Answer Engine Optimization (AEO) Auditing", kind: "production" },
      { name: "AI Crawler Governance (robots.txt / GPTBot / ClaudeBot)", kind: "production" },
      { name: "/llms.txt Machine-Readable Indexing", kind: "production" },
      { name: "JSON-LD, Schema.org & GTIN/MPN Validation", kind: "production" },
      { name: "Non-JS Server HTML & XML Sitemap Auditing", kind: "production" },
      { name: "On-Site Retailer AI Shopping Assistant Probes", kind: "production" },
      { name: "Retail Digital Shelf & SKU Compliance Auditing", kind: "production" },
      { name: "PDP Video, Gallery, Specs & AI Bullet Verification", kind: "production" },
      { name: "In-Cart Accessory & M365 Cross-Sell UX Auditing", kind: "production" },
      { name: "Brandwatch API & Multi-Platform Social Listening", kind: "production" },
      { name: "YouTube, Facebook, Instagram & Reddit Scraping", kind: "production" },
      { name: "Medical Conference Scraping (AAD, AACR, ASRS, ASCO, EHA)", kind: "production" },
      { name: "Macroeconomic & Consumer Sentiment Web Scraping", kind: "production" },
      { name: "Crawler Allowlisting & Anti-Bot Workflows", kind: "production" },
    ],
  },
  {
    label: "Data Engineering",
    title: "Data Engineering, Databricks Lakehouse & ETL Pipelines",
    description:
      "Biweekly multi-million-row Azure Databricks pipelines, omnichannel VoC unification, live ERP/supply-chain ingestion, and Power BI / Tableau data delivery.",
    accentColor: "cyan",
    dotColor: "bg-cyan-500",
    skills: [
      { name: "Azure Databricks (PySpark)", kind: "production" },
      { name: "Delta Lake & Medallion Lakehouse Architecture", kind: "production" },
      { name: "Multi-Million-Row Biweekly ETL / ELT Pipelines", kind: "production" },
      { name: "Omnichannel VoC Unification (Online, Store, HML/HMC, WOTS)", kind: "production" },
      { name: "Supply Chain ERP Feeds (Dynamics, ECC, SCI, Flash)", kind: "production" },
      { name: "Azure Blob Storage & ADLS Gen2 Containers", kind: "production" },
      { name: "PostgreSQL, SQLite & Relational Data Modeling", kind: "production" },
      { name: "PySpark, Polars, pandas & NumPy", kind: "production" },
      { name: "Large-Scale Excel Processing (openpyxl / ExcelJS)", kind: "production" },
      { name: "Power BI & Tableau Analytics Feeds", kind: "production" },
      { name: "Apache Kafka & Azure Event Hubs", kind: "production" },
      { name: "Apache Airflow & Automated Schedulers", kind: "production" },
      { name: "Redis Feature Store & Caching", kind: "production" },
      { name: "MongoDB & Document Stores", kind: "production" },
      { name: "dbt, Snowflake & Microsoft Fabric", kind: "production" },
      { name: "SHA-256 Deduplication & Data Quality Pipelines", kind: "production" },
    ],
  },
  {
    label: "NLP & Text AI",
    title: "Natural Language Processing, PII & Brand Analytics",
    description:
      "Enterprise PII redaction, 3-level theme hierarchies, churn/purchase-stage classification, biomedical NER, and 4-pillar Brand Trust & Health scoring.",
    accentColor: "rose",
    dotColor: "bg-rose-500",
    skills: [
      { name: "Microsoft Presidio & Azure AI Language (PII Redaction)", kind: "production" },
      { name: "Regex & Contextual PII Guardrails", kind: "production" },
      { name: "Theme -> Subtheme -> Sub-Subtheme Hierarchy Extraction", kind: "production" },
      { name: "Sentiment & Multi-Class Emotion Detection", kind: "production" },
      { name: "Customer Churn Risk & Purchase-Stage Classification", kind: "production" },
      { name: "Gibberish, Spam & Noise Detection", kind: "production" },
      { name: "4-Pillar Brand Trust AI (Loyalty, Benevolence, Integrity, Competence)", kind: "production" },
      { name: "Composite Brand Health & Tracking Score Models", kind: "production" },
      { name: "Biomedical NER (NCT IDs, Drug Names, Mechanisms, Indications)", kind: "production" },
      { name: "BERTopic, HDBSCAN & Topic Taxonomy Modeling", kind: "production" },
      { name: "Named Entity Recognition (NER) & Text Classification", kind: "production" },
      { name: "Semantic Search & Dense Embedding Models", kind: "production" },
      { name: "Conversational Banking AI (Rasa NLU & Dialogflow)", kind: "production" },
      { name: "spaCy & Hugging Face Transformers", kind: "production" },
      { name: "Text-to-Speech (TTS) & Audio Narration Pipelines", kind: "production" },
    ],
  },
  {
    label: "Backend & APIs",
    title: "High-Concurrency Python Backends & Enterprise APIs",
    description:
      "FastAPI, Django, and Flask microservices, Microsoft Entra ID SSO, async batch workers, Evidence Registers, and automated weekly HTML email engines.",
    accentColor: "blue",
    dotColor: "bg-blue-600",
    skills: [
      { name: "Python 3.12 (Asyncio)", kind: "production" },
      { name: "FastAPI", kind: "production" },
      { name: "Django & Django REST Framework", kind: "production" },
      { name: "Flask & RESTful Microservices", kind: "production" },
      { name: "Microsoft Entra ID (Azure AD) SSO & OAuth2", kind: "production" },
      { name: "Async Batch Workers & Celery Task Queues", kind: "production" },
      { name: "WebSockets & Server-Sent Events (SSE) Streaming", kind: "production" },
      { name: "Pydantic v2 & Deterministic Contract Validation", kind: "production" },
      { name: "SQLAlchemy & Database Migrations", kind: "production" },
      { name: "Automated Weekly HTML Scorecard Email Engine (Jinja2 / SMTP / Graph)", kind: "production" },
      { name: "Competitor Anomaly & Launch Email Alerting", kind: "production" },
      { name: "Versioned Evidence & Score Snapshot Registers", kind: "production" },
      { name: "Azure Blob Pre-Signed SAS Download Streaming", kind: "production" },
      { name: "Core Banking & Omnichannel Messaging APIs", kind: "production" },
      { name: "GraphQL, gRPC & Rate-Limited API Gateways", kind: "production" },
      { name: "Role-Based Access Control (RBAC) & Audit Trails", kind: "production" },
    ],
  },
  {
    label: "ML & Risk Engines",
    title: "Machine Learning, Risk Scoring & Computer Vision",
    description:
      "5-dimension supply-chain risk engines, sequential L1–L5 maturity gates, SKU recovery calculators, statistical driver analysis, and biometric Video KYC.",
    accentColor: "emerald",
    dotColor: "bg-emerald-500",
    skills: [
      { name: "PyTorch & Deep Learning", kind: "production" },
      { name: "scikit-learn, SciPy & statsmodels", kind: "production" },
      { name: "5-Dimension Supply Chain & SKU Risk Scoring Engine", kind: "production" },
      { name: "50-Rule Inventory Threshold & Depletion Modeling", kind: "production" },
      { name: "Sequential L1–L5 (Crawl · Walk · Run) Level-Gate Scoring", kind: "production" },
      { name: "SKU Driver Recovery & Priority Impact Calculator", kind: "production" },
      { name: "3-Way Momentum & Partner Adoption Velocity Modeling", kind: "production" },
      { name: "Regression Driver & Purchase-Intent Uplift Analysis", kind: "production" },
      { name: "Real-vs-Synthetic Research Calibration & Validation", kind: "production" },
      { name: "105-Criteria Partner Capability Scoring (POCA)", kind: "production" },
      { name: "OpenCV, Biometric Face Match & Liveness Detection", kind: "production" },
      { name: "OCR & Document Layout Parsing (PyMuPDF / python-pptx)", kind: "production" },
      { name: "Time-Series Trend & Anomaly Detection", kind: "production" },
      { name: "MLflow, Model Serving & ONNX Quantization", kind: "production" },
    ],
  },
  {
    label: "Cloud & DevOps",
    title: "Azure Cloud Infrastructure, Security & DevOps",
    description:
      "Microsoft client environment migrations, Azure App Service, Blob Storage, Databricks, Dockerized deployments, and Azure DevOps CI/CD release pipelines.",
    accentColor: "teal",
    dotColor: "bg-teal-500",
    skills: [
      { name: "Microsoft Azure Cloud Architecture", kind: "production" },
      { name: "Azure App Service & Web Apps", kind: "production" },
      { name: "Azure Blob Storage & Container Registry (ACR)", kind: "production" },
      { name: "Azure AI Foundry & Azure OpenAI Provisioning", kind: "production" },
      { name: "Enterprise Client Environment Migration & Isolation", kind: "production" },
      { name: "Docker & Containerized Application Deployment", kind: "production" },
      { name: "Kubernetes (AKS) & Azure Container Apps", kind: "production" },
      { name: "Azure DevOps CI/CD Release Pipelines", kind: "production" },
      { name: "GitHub Actions & Automated Testing", kind: "production" },
      { name: "Azure Key Vault, Managed Identity & RBAC", kind: "production" },
      { name: "Terraform & Bicep (Infrastructure as Code)", kind: "production" },
      { name: "Azure Monitor, OpenTelemetry & FinOps Governance", kind: "production" },
    ],
  },
  {
    label: "Frontend & Portals",
    title: "Frontend Engineering, Executive Portals & Visualization",
    description:
      "Interactive command centers, multi-tab supply-chain and AEO scorecards, SVG geospatial maps, and conversational AI workspaces.",
    accentColor: "amber",
    dotColor: "bg-amber-500",
    skills: [
      { name: "React 18+", kind: "production" },
      { name: "Next.js 14+ (App Router)", kind: "production" },
      { name: "TypeScript", kind: "production" },
      { name: "Tailwind CSS", kind: "production" },
      { name: "Framer Motion & GSAP Animations", kind: "production" },
      { name: "Multi-Tab Executive Command Portals", kind: "production" },
      { name: "Interactive SVG Geospatial DC & Transit Maps", kind: "production" },
      { name: "Recharts & CustomKPI / Radar Visualizations", kind: "production" },
      { name: "Conversational Copilot & Citation Workspaces", kind: "production" },
      { name: "Persona Studio & Focus-Group Simulation UI", kind: "production" },
      { name: "One-Click ExcelJS & Print/PDF Report Exporters", kind: "production" },
      { name: "HTML5, CSS3 & JavaScript (ES6+)", kind: "production" },
      { name: "Core Web Vitals (LCP, INP, CLS) & WCAG Accessibility", kind: "production" },
    ],
  },
  {
    label: "Architecture",
    title: "Systems & Enterprise AI Solution Architecture",
    description:
      "End-to-end architecture for Fortune 500 retail, pharma, banking, and CPG platforms with strict security, governance, and production SLAs.",
    accentColor: "purple",
    dotColor: "bg-purple-600",
    skills: [
      { name: "End-to-End GenAI & Multi-Agent Solution Architecture", kind: "production" },
      { name: "Enterprise Lakehouse-to-Copilot Architecture", kind: "production" },
      { name: "Zero-Hallucination Citation & Evidence Governance", kind: "production" },
      { name: "Maker-Checker & Multi-Role Approval Workflows", kind: "production" },
      { name: "Zero Trust, Entra ID SSO & PII Compliance (GDPR / HIPAA)", kind: "production" },
      { name: "Architecture Decision Records (ADR) Governance", kind: "production" },
      { name: "High-Availability Production SLA Design", kind: "production" },
      { name: "Event-Driven & Microservices Architecture", kind: "production" },
      { name: "Multi-Tenant Enterprise SaaS Design", kind: "production" },
      { name: "Engineering Leadership & Cross-Functional Delivery", kind: "production" },
    ],
  },
];

export const CATEGORIES: SkillCategory[] = RAW_CATEGORIES.map((c) => ({
  ...c,
  id: c.label.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
}));

const TOTAL_SKILLS_COUNT = CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);

const STATS: StatItem[] = [
  { value: "7+ Years", label: "Hands-On Engineering" },
  { value: "17 Products", label: "Enterprise AI Delivered" },
  { value: `${TOTAL_SKILLS_COUNT}+ Skills`, label: "Production AI & Cloud Stack" },
  {
    value: "10+ Clients",
    label: "Global Enterprise Impact",
    colorClass: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SkillTabs
// ─────────────────────────────────────────────────────────────────────────────

interface SkillTabsProps {
  categories: SkillCategory[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function SkillTabs({ categories, activeIndex, onSelect }: SkillTabsProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const btn = buttonRefs.current[activeIndex];
    if (btn) {
      btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <div
      aria-label="Skill Categories"
      className="flex w-full min-w-0 flex-nowrap justify-start gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible"
    >
      {categories.map((cat, idx) => {
        const isActive = activeIndex === idx;
        return (
          <button
            key={cat.id}
            id={`tab-${cat.id}`}
            ref={(el) => {
              buttonRefs.current[idx] = el;
            }}
            aria-controls={`panel-${cat.id}`}
            aria-pressed={isActive}
            tabIndex={0}
            onClick={() => onSelect(idx)}
            className={`relative shrink-0 px-3 py-1.5 rounded-full text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 select-none cursor-pointer flex items-center gap-1.5 ${
              isActive
                ? "text-white font-bold"
                : "text-slate-600 hover:text-slate-900 bg-white/75 hover:bg-white border border-slate-200/80"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeCategoryPill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 shadow-sm shadow-indigo-500/25"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
            <span
              className={`relative z-10 text-[10px] px-1.5 py-0 rounded-full ${
                isActive ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-600"
              }`}
            >
              {cat.skills.length}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SkillChip
// ─────────────────────────────────────────────────────────────────────────────

interface SkillChipProps {
  skill: Skill;
  dotColor: string;
  reducedMotion?: boolean | null;
}

export function SkillChip({ skill, dotColor, reducedMotion }: SkillChipProps) {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 12,
      scale: reducedMotion ? 1 : 0.92,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={reducedMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center gap-2 rounded-xl shadow-2xs hover:shadow-xs transition-colors cursor-default select-none px-3 py-1.5 text-xs bg-white/95 border border-slate-200/90 hover:border-indigo-300"
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
      <span className="font-mono text-slate-800 font-medium tracking-tight">
        {skill.name}
      </span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CategoryPanel
// ─────────────────────────────────────────────────────────────────────────────

interface CategoryPanelProps {
  category: SkillCategory;
  reducedMotion?: boolean | null;
}

export function CategoryPanel({ category, reducedMotion }: CategoryPanelProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 },
    },
  };

  return (
    <div
      role="region"
      id={`panel-${category.id}`}
      aria-labelledby={`tab-${category.id}`}
      className="flex min-h-[540px] flex-col sm:min-h-[380px] md:min-h-[390px]"
    >
      {/* Category Header */}
      <div className="space-y-1 mb-2.5">
        <h3 className="font-display font-bold text-base sm:text-lg text-slate-900">
          {category.title}
        </h3>
        <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          {category.description}
        </p>
      </div>

      {/* Category Stack Count Badge */}
      <div className="flex items-center gap-4 mb-2.5">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-600 font-semibold">
          <span className={`w-1.5 h-1.5 rounded-full ${category.dotColor} shrink-0`} />
          Delivered in Enterprise Production ({category.skills.length} Skills)
        </span>
      </div>

      {/* Skill Chips */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-2 items-start content-start min-h-[420px] sm:min-h-[320px] md:min-h-[290px]"
      >
        {category.skills.map((skill, sIdx) => (
          <SkillChip
            key={`${category.id}-${skill.name}-${sIdx}`}
            skill={skill}
            dotColor={category.dotColor}
            reducedMotion={reducedMotion}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProgressBar
// ─────────────────────────────────────────────────────────────────────────────

interface ProgressBarProps {
  activeId: string;
  isPaused: boolean;
  reducedMotion?: boolean | null;
}

export function ProgressBar({ activeId, isPaused, reducedMotion }: ProgressBarProps) {
  return (
    <div className="w-full h-1 bg-slate-200/70 rounded-full overflow-hidden my-3">
      <motion.div
        key={`${activeId}-${isPaused}`}
        className="h-full bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: isPaused || reducedMotion ? "0%" : "100%" }}
        transition={{
          duration: isPaused || reducedMotion ? 0 : INTERVAL_MS / 1000,
          ease: "linear",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StatBlock
// ─────────────────────────────────────────────────────────────────────────────

function StatBlock({ value, label, colorClass = "text-slate-900" }: StatItem) {
  return (
    <div>
      <div className={`font-display font-bold text-xl sm:text-2xl tracking-tight ${colorClass}`}>
        {value}
      </div>
      <div className="font-mono text-[10px] sm:text-[11px] text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main: SkillsShowcase
// ─────────────────────────────────────────────────────────────────────────────

export default function SkillsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationEpoch, setRotationEpoch] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const isPaused = isHovered || isFocused || !isInView || Boolean(reducedMotion);
  const activeCategory = CATEGORIES[activeIndex];

  // Auto-advance rotation every INTERVAL_MS when not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % CATEGORIES.length);
    }, INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, isPaused, rotationEpoch]);

  // Pause when scrolled out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSelectTab = useCallback((index: number) => {
    setActiveIndex(index);
    setRotationEpoch((epoch) => epoch + 1);
    soundSynth.playClick();
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="relative bg-white/75 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/70 shadow-[0_12px_40px_rgba(0,0,0,0.05)] space-y-4"
    >
      {/* 1. Header */}
      <div>
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="font-mono text-xs text-slate-600 uppercase tracking-wider font-semibold">
              TECHNICAL ARCHITECTURE &amp; SKILLS
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 font-mono text-xs text-emerald-800 font-bold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>
              {TOTAL_SKILLS_COUNT} Production Skills · {CATEGORIES.length} Core Pillars
            </span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
          Architectural Skills &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600">
            Enterprise AI Stack.
          </span>
        </h2>
        <p className="font-body text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-3xl">
          Hands-on production stack across Multi-Agent Systems, MCP &amp; Copilot Plugins, Azure Databricks Lakehouses, Web Scraping &amp; AEO Auditing, NLP/PII Pipelines, and Full-Stack Portals.
        </p>
      </div>

      {/* 2. Category Tabs */}
      <SkillTabs
        categories={CATEGORIES}
        activeIndex={activeIndex}
        onSelect={handleSelectTab}
      />

      {/* 3. Animated Category Panel */}
      <div aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16, filter: "blur(6px)" }
            }
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -16, filter: "blur(6px)" }
            }
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <CategoryPanel
              category={activeCategory}
              reducedMotion={reducedMotion}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Progress Bar */}
      <ProgressBar
        activeId={activeCategory.id}
        isPaused={isPaused}
        reducedMotion={reducedMotion}
      />

      {/* 5. Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-200/80">
        {STATS.map((stat) => (
          <StatBlock key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}
