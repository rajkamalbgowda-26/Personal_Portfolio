export type Feature = {
  name: string;
  whatItDoes: string;
  howItWorks: string;
  stack: string[];
  whyThisApproach: string;
};

export type Decision = {
  title: string;
  options: string[];
  chosen: string;
  tradeoff: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  domain: string;
  year: number | null;
  summary: string;
  role: string;
  problem: string;
  solution: string;
  features: Feature[];
  architecture: {
    layers: { name: string; responsibility: string }[];
    dataFlow: string[];
  };
  decisions: Decision[];
  challenges: { problem: string; resolution: string }[];
  myContribution: string[];
  outcomes: {
    value: string;
    label: string;
    status: "verified" | "vendor-claim" | "TODO";
  }[];
  stack: string[];
  images: { src: string; alt: string; caption: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "digital-onboarding-video-kyc",
    title: "Digital Banking Core: Video-Based Digital Onboarding & AI KYC",
    client: "Tier-1 International Retail Banks (via Modefin)",
    domain: "Fintech · Digital Onboarding, Biometric Face Match & Video KYC",
    year: null,
    summary:
      "Replaced paper-heavy branch onboarding with a self-led and agent-assisted digital flow at Modefin—using document OCR, liveness detection, biometric facial matching, and Video KYC to verify customer identity in minutes.",
    role: "Full-Stack Python Engineer & AI Lead at Modefin · OCR, Face Match, Liveness & Onboarding Backend",
    problem:
      "Customer onboarding previously required up to 5 business days of manual document handling, physical verification, and in-person branch visits. Manual KYC was slow, expensive, and difficult to scale to remote banking customers.",
    solution:
      "Engineered an end-to-end digital onboarding and Video KYC platform combining self-led mobile/web journeys and agent-assisted workflows. The system captures identity documents, extracts structured fields via OCR, performs real-time liveness detection and 1:1 biometric facial matching against the ID photo, evaluates configurable pass/reject/manual-review rules, and integrates directly with core banking APIs for instant account provisioning.",
    features: [
      {
        name: "Self-led & Agent-Assisted Digital Onboarding Journeys",
        whatItDoes:
          "Enables customers to complete account onboarding independently on mobile/web or transition seamlessly into a live agent-assisted Video KYC session.",
        howItWorks:
          "Manages stateful onboarding sessions across mobile and web clients with real-time WebSocket synchronization so customers or assisting bank agents can capture documents and complete verification steps without branch visits.",
        stack: ["Python", "FastAPI / Django", "WebSockets", "React / Mobile Web"],
        whyThisApproach:
          "Combining self-service and assisted Video KYC maximizes completion rates across both tech-savvy and assisted banking segments.",
      },
      {
        name: "Automated Document Capture & Identity OCR",
        whatItDoes:
          "Captures national IDs, passports, and tax documents and automatically extracts structured customer fields for downstream KYC validation.",
        howItWorks:
          "Applies image preprocessing (deskewing, glare/blur detection, and ROI cropping) followed by OCR text extraction and regex/checksum validation to populate customer onboarding records.",
        stack: ["OpenCV", "OCR Engine", "Python", "FastAPI"],
        whyThisApproach:
          "Eliminates manual data-entry errors and accelerates customer form completion.",
      },
      {
        name: "Biometric Liveness Detection & 1:1 Facial Matching",
        whatItDoes:
          "Verifies that a live person is present in front of the camera and matches their live selfie/video frame against the portrait on their official ID document.",
        howItWorks:
          "Runs anti-spoofing liveness checks and deep facial embedding similarity scoring, returning confidence scores to the decisioning engine.",
        stack: ["OpenCV", "Biometric Face Match", "Liveness Detection", "Python"],
        whyThisApproach:
          "Prevents presentation attacks (printed photos or screen replays) and ensures high-assurance remote identity verification.",
      },
      {
        name: "Configurable Decisioning Rules & Core Banking Provisioning",
        whatItDoes:
          "Routes each onboarding case to automatic approval, manual compliance officer review, or rejection, and triggers core banking account creation upon approval.",
        howItWorks:
          "Evaluates OCR field confidence, liveness pass status, and facial similarity thresholds against bank-configurable business rules before invoking core banking CIF/account creation APIs.",
        stack: ["Rule Engine", "PostgreSQL", "Core Banking REST APIs", "Docker"],
        whyThisApproach:
          "Gives bank compliance teams full control over risk thresholds while automating straight-through processing for clear-cut cases.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Customer & Agent Onboarding Layer",
          responsibility:
            "Exposes responsive self-led mobile/web onboarding screens and live agent-assisted Video KYC workspaces.",
        },
        {
          name: "AI Verification Layer (OCR, Liveness & Face Match)",
          responsibility:
            "Processes identity documents and camera streams to extract OCR fields, verify liveness, and compute 1:1 facial similarity scores.",
        },
        {
          name: "Compliance Rule & Maker-Checker Layer",
          responsibility:
            "Applies configurable threshold rules to route applications to auto-approve, manual compliance review, or reject.",
        },
        {
          name: "Core Banking Integration Layer",
          responsibility:
            "Syncs verified customer KYC profiles and triggers real-time account provisioning in the bank's core banking system.",
        },
      ],
      dataFlow: [
        "Customer initiates a self-led mobile/web onboarding session or connects with an agent for Video KYC.",
        "Identity documents are uploaded and processed by the OCR pipeline to extract structured customer fields.",
        "Liveness detection and 1:1 facial matching compare the live camera stream against the ID document photo.",
        "Configurable decision rules classify the application as Approved, Manual Review, or Rejected.",
        "Approved applications trigger core banking APIs to provision the customer's account.",
      ],
    },
    decisions: [
      {
        title: "Supporting both self-led and agent-assisted Video KYC flows",
        options: ["Self-led only", "Agent-assisted only", "Unified self-led + agent-assisted Video KYC"],
        chosen: "Build a unified state machine supporting both self-led onboarding and live agent-assisted Video KYC.",
        tradeoff:
          "Allows customers to start on their own and seamlessly get live agent assistance if document lighting or verification requires help.",
      },
      {
        title: "Three-stage risk routing (Auto-Approve, Manual Review, Reject)",
        options: ["Binary pass/fail only", "Configurable tri-state routing with maker-checker review queue"],
        chosen: "Route borderline OCR or face-match scores to a compliance review queue rather than hard-rejecting the customer.",
        tradeoff:
          "Preserves customer conversion when ID cards are slightly worn while maintaining strict regulatory compliance.",
      },
    ],
    challenges: [
      {
        problem:
          "Variable smartphone camera quality, glare, and low-bandwidth mobile networks across retail banking markets.",
        resolution:
          "Implemented client-side frame quality checks and lightweight OpenCV preprocessing to reject blurry/glare-heavy captures before running OCR and face matching.",
      },
      {
        problem:
          "Reducing multi-day branch KYC turnaround while meeting strict banking audit and compliance requirements.",
        resolution:
          "Built a complete digital audit trail recording document captures, OCR outputs, face-match confidence scores, and reviewer sign-offs in PostgreSQL.",
      },
    ],
    myContribution: [
      "Architected and built the Python backend services and AI verification pipelines (document OCR, liveness detection, and 1:1 facial matching) at Modefin.",
      "Engineered the real-time WebSocket session orchestration supporting both self-led customer onboarding and agent-assisted Video KYC.",
      "Implemented the configurable pass/reject/manual-review rule engine and core banking API integration.",
    ],
    outcomes: [
      {
        value: "< 5 Mins",
        label: "digital KYC & onboarding turnaround (down from up to 5 business days)",
        status: "verified",
      },
      {
        value: "Up to 90%",
        label: "reduction in physical branch KYC handling & verification cost",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "FastAPI / Django",
      "OpenCV & Face Match",
      "OCR & Liveness AI",
      "WebSockets",
      "PostgreSQL",
      "Docker",
    ],
    images: [
      {
        src: "/images/projects/digital-onboarding-1.png",
        alt: "Five-step digital onboarding flow showing identity capture, OCR, liveness, face matching, and account opening.",
        caption: "Identity capture, document extraction, liveness, facial match, and account-opening journey.",
      },
      {
        src: "/images/projects/digital-onboarding-2.png",
        alt: "Layered digital banking architecture connecting customer app, API gateway, AI services, core banking, and secure data.",
        caption: "Illustrated application, API, verification, banking-connector, and data layers.",
      },
      {
        src: "/images/projects/digital-onboarding-3.png",
        alt: "Verification decision flow routing onboarding cases to approved, manual review, or rejected outcomes.",
        caption: "Decision outcomes: approved, manual review, and rejected.",
      },
      {
        src: "/images/projects/digital-onboarding-4.png",
        alt: "Comparison of self-led customer onboarding and an agent-assisted onboarding path.",
        caption: "Self-led and assisted onboarding journeys.",
      },
    ],
  },
  {
    slug: "conversational-banking-chatbot",
    title: "Conversational Banking Chatbot: 24/7 Omnichannel AI Customer Assistant",
    client: "Commercial & Retail Banks — incl. Universal Merchant Bank, Ghana (via Modefin)",
    domain: "Fintech · Conversational AI, Rasa NLU / Dialogflow & Core Banking Integration",
    year: null,
    summary:
      "Built an omnichannel conversational banking AI assistant at Modefin that resolves customer FAQs, executes authenticated account inquiries via core banking APIs, and supports seamless human-agent handoff 24/7 across web, mobile, and messaging channels.",
    role: "Full-Stack Python & Conversational AI Engineer at Modefin · NLU, Dialog Management & Banking APIs",
    problem:
      "Retail banking customers faced long call-center wait times for routine account inquiries, card/branch requests, and product FAQs, with zero live support outside standard banking hours.",
    solution:
      "Engineered a 24/7 conversational banking chatbot built with Python, FastAPI, Rasa NLU, Dialogflow, and real-time WebSockets. The assistant classifies banking intents, extracts entities (account types, transaction dates, branch locations), connects securely to core banking APIs for authenticated balance and mini-statement checks, and transfers complex cases to live support agents with full conversation context.",
    features: [
      {
        name: "Banking Intent Classification & Entity Extraction (Rasa NLU & Dialogflow)",
        whatItDoes:
          "Understands natural-language customer questions across retail banking topics—including account balances, card services, loan eligibility, branch/ATM locators, and banking FAQs.",
        howItWorks:
          "Uses custom-trained NLU pipelines (Rasa NLU and Dialogflow) with domain-specific banking vocabularies, synonym mappings, and confidence thresholds to classify intents and extract structured slot entities.",
        stack: ["Rasa NLU", "Dialogflow", "Python", "NLP Intent & Entity Extraction"],
        whyThisApproach:
          "Domain-tuned NLU accurately handles banking terminology and regional phrasing while falling back gracefully when confidence is low.",
      },
      {
        name: "Multi-Turn Dialog Management & Authenticated Core Banking Queries",
        whatItDoes:
          "Guides customers through multi-step conversational workflows and executes secure core banking API calls for routine account and service requests.",
        howItWorks:
          "Maintains slot-filling state machines in Python/FastAPI that validate customer session tokens/OTPs before querying core banking middleware for account summaries, recent transactions, or service request logging.",
        stack: ["FastAPI", "Core Banking REST APIs", "Session State Machine", "Python"],
        whyThisApproach:
          "Separates public FAQ responses from authenticated transactional workflows so sensitive account data is protected by strict session verification.",
      },
      {
        name: "Omnichannel Web, Mobile & Messaging Delivery via WebSockets",
        whatItDoes:
          "Delivers instant, real-time conversational responses across the bank's web portal, mobile banking app, and social messaging channels.",
        howItWorks:
          "Uses bidirectional WebSockets and channel webhook adapters to stream bot responses, interactive quick-reply buttons, and carousel cards with sub-second latency.",
        stack: ["WebSockets", "FastAPI", "Omnichannel Webhook Adapters"],
        whyThisApproach:
          "Lets customers interact with the bank on their preferred everyday channel 24/7 without waiting in phone queues.",
      },
      {
        name: "Context-Preserving Live Agent Handoff & Conversation Analytics",
        whatItDoes:
          "Transfers complex or escalated customer conversations to a human support agent along with the full chat transcript and detected intent.",
        howItWorks:
          "Triggers an agent escalation event when a user requests human help or hits consecutive NLU fallbacks, routing the session and conversation history to the support desk while logging intent analytics.",
        stack: ["Human-in-the-Loop Handoff", "PostgreSQL", "Conversation Analytics"],
        whyThisApproach:
          "Ensures customers never have to repeat their problem when transitioning from the AI assistant to a human banking representative.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Omnichannel Customer Interface Layer",
          responsibility:
            "Captures customer messages and renders interactive cards/quick-replies across web, mobile banking, and messaging channels.",
        },
        {
          name: "Real-Time WebSocket & API Gateway Layer",
          responsibility:
            "Manages low-latency bidirectional WebSocket sessions, rate limiting, and channel webhook normalization.",
        },
        {
          name: "NLU & Multi-Turn Dialog Engine",
          responsibility:
            "Runs Rasa NLU / Dialogflow intent classification, slot extraction, and stateful multi-turn conversation flows.",
        },
        {
          name: "Core Banking & Live Agent Handoff Layer",
          responsibility:
            "Executes authenticated core banking API lookups and routes escalated sessions to human support agents with full transcript context.",
        },
      ],
      dataFlow: [
        "Customer sends a query via the web widget, mobile banking app, or messaging channel.",
        "The FastAPI & WebSocket gateway normalizes the message and forwards it to the NLU & Dialog Engine.",
        "Rasa NLU / Dialogflow classifies the banking intent and extracts required slot entities.",
        "For account-specific requests, the service verifies authentication and queries Core Banking APIs.",
        "If escalation is needed, the session and full transcript are routed to a live support agent; otherwise, the response is streamed back immediately.",
      ],
    },
    decisions: [
      {
        title: "Combining deterministic dialog state machines with NLU intent classification",
        options: ["Rule-only menu tree", "Free-form NLU + structured slot-filling dialog state machines"],
        chosen: "Pair NLU intent/entity recognition with deterministic slot-filling flows for banking transactions.",
        tradeoff:
          "Allows customers to ask questions naturally in their own words while ensuring regulated banking steps follow strict validation order.",
      },
      {
        title: "Seamless human-agent escalation with full transcript context",
        options: ["Bot-only dead ends on low confidence", "Automatic context-preserving handoff to live banking agents"],
        chosen: "Transfer the active session and conversation history to a human agent whenever confidence drops or escalation is requested.",
        tradeoff:
          "Guarantees high customer satisfaction even on complex edge-case banking disputes.",
      },
    ],
    challenges: [
      {
        problem:
          "Customers previously waited in long queues for routine FAQs and had no support outside standard banking hours.",
        resolution:
          "Deployed a 24/7 conversational AI assistant capable of resolving routine FAQs and account inquiries instantaneously across web and mobile channels.",
      },
      {
        problem:
          "Handling diverse customer phrasing, banking abbreviations, and multi-step service requests accurately.",
        resolution:
          "Trained domain-specific NLU intents and entity extractors with iterative conversation-log refinement and interactive quick-reply disambiguation.",
      },
    ],
    myContribution: [
      "Engineered the Python/FastAPI conversational backend, WebSocket transport, and NLU intent/entity pipelines (Rasa NLU & Dialogflow) at Modefin.",
      "Built the multi-turn dialog flows, core banking API connectors, and context-preserving human-agent handoff workflow.",
      "Delivered the production chatbot for retail banking deployments, including Universal Merchant Bank (Ghana).",
    ],
    outcomes: [
      {
        value: "24/7 Instant Support",
        label: "automated resolution for banking FAQs & routine account requests",
        status: "verified",
      },
      {
        value: "Omnichannel AI",
        label: "live across web, mobile banking & messaging with core banking integration",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Rasa NLU",
      "Dialogflow",
      "WebSockets",
      "Core Banking APIs",
      "PostgreSQL",
    ],
    images: [
      {
        src: "/images/projects/conversational-banking-1.png",
        alt: "Conversational banking chatbot concept shown on a mobile device with messaging and around-the-clock availability symbols.",
        caption: "Conversational banking service on a customer messaging interface.",
      },
      {
        src: "/images/projects/conversational-banking-2.png",
        alt: "Banking chatbot architecture connecting a customer app, API gateway, AI services, core banking connector, and secure data.",
        caption: "Layered chatbot and banking-service architecture illustration.",
      },
      {
        src: "/images/projects/conversational-banking-3.png",
        alt: "Chatbot service represented across web, mobile, messaging, customer-support, and banking channels.",
        caption: "Omnichannel banking chatbot across web, mobile, and messaging surfaces.",
      },
      {
        src: "/images/projects/conversational-banking-4.png",
        alt: "Customer messaging conversation alongside a human support agent desktop interface.",
        caption: "Seamless context-preserving handoff between the AI assistant and human support agents.",
      },
    ],
  },
  {
    slug: "microsoft-azure-pii-detection",
    title: "Microsoft Azure PII Detection",
    client: "Microsoft — Azure CSAT & Cloud Native (via C5i)",
    domain: "Cloud Customer Intelligence · PII Masking & Automated Insights",
    year: null,
    summary:
      "Delivered at C5i for Microsoft: processed Azure CSAT and Azure Cloud Native customer verbatims by detecting and masking sensitive PII, extracting Theme, Subtheme, Sentiment, and Emotion, and delivering automated weekly PowerPoint insight dashboards tracking top pain points and complaint trends.",
    role: "AI & NLP Engineer at C5i · End-to-End Pipeline & Automated Reporting Ownership",
    problem:
      "Microsoft Azure CSAT and Azure Cloud Native feedback streams contained thousands of raw customer verbatims, complaints, and support comments carrying sensitive Personally Identifiable Information (PII). Manually scrubbing PII, classifying verbatims into themes and subthemes, evaluating customer sentiment and emotion, and assembling weekly executive PowerPoint reports was time-consuming and delayed visibility into emerging cloud product pain points.",
    solution:
      "Engineered an automated PII detection, masking, and verbatim intelligence pipeline for Microsoft Azure CSAT and Cloud Native feedback. The pipeline automatically detects and masks all PII entities first, extracts structured Theme, Subtheme, Sentiment polarity, and granular Emotion from every verbatim, and compiles an automated weekly PowerPoint (.pptx) dashboard highlighting top customer pain points, key complaints, and week-over-week increasing or decreasing theme trends.",
    features: [
      {
        name: "Automated PII detection and masking",
        whatItDoes:
          "Identifies and redacts sensitive Personally Identifiable Information (names, emails, phone numbers, subscription/tenant IDs, IPs, and credentials) across Azure CSAT and Cloud Native verbatims.",
        howItWorks:
          "Incoming raw feedback verbatims pass through an NER and pattern-based PII detection stage that masks sensitive tokens with standardized redaction placeholders before downstream theme and sentiment processing.",
        stack: ["Python", "Azure AI Language / Presidio", "NLP NER", "Regex Guardrails"],
        whyThisApproach:
          "Masking PII at ingestion guarantees enterprise privacy compliance and prevents sensitive customer identifiers from leaking into downstream analytics or LLM prompts.",
      },
      {
        name: "Theme and subtheme extraction",
        whatItDoes:
          "Categorizes each scrubbed customer verbatim into structured Azure product Themes and granular Subthemes.",
        howItWorks:
          "Semantic classification models map free-text complaints and feedback into primary themes (e.g., Compute, Kubernetes/AKS, Billing, Portal UX, Networking, Reliability) and specific actionable subthemes.",
        stack: ["Azure OpenAI", "NLP Classification", "Python", "Semantic Taxonomy"],
        whyThisApproach:
          "Two-level hierarchy (Theme → Subtheme) gives executives macro visibility while giving product engineering teams specific root-cause categories.",
      },
      {
        name: "Sentiment and emotion intelligence",
        whatItDoes:
          "Detects both overall Sentiment polarity and fine-grained customer Emotion across every Azure verbatim.",
        howItWorks:
          "Scores verbatims for sentiment (Positive, Neutral, Negative) alongside distinct emotional states (Frustration, Urgency, Confusion, Satisfaction, Escalation Risk) to surface high-severity customer complaints.",
        stack: ["Sentiment Analysis", "Emotion Classification", "Azure OpenAI", "Python"],
        whyThisApproach:
          "Pairing emotion with sentiment separates mild dissatisfaction from severe customer frustration that requires immediate engineering intervention.",
      },
      {
        name: "Automated weekly PowerPoint dashboard generation",
        whatItDoes:
          "Compiles weekly executive PowerPoint (.pptx) insight decks automatically from processed verbatim telemetry.",
        howItWorks:
          "Aggregates weekly theme volumes, sentiment shifts, top pain points, and complaint drivers, then programmatically generates presentation slides with charts, tables, and executive takeaways.",
        stack: ["python-pptx", "Pandas", "Automated Reporting", "Data Visualization"],
        whyThisApproach:
          "Delivering native PowerPoint dashboards every week eliminates manual slide creation and gives Microsoft stakeholders ready-to-present executive insights.",
      },
      {
        name: "Top pain-points and WoW trend velocity tracking",
        whatItDoes:
          "Tracks how themes, subthemes, and complaint clusters are increasing or decreasing week-over-week.",
        howItWorks:
          "Compares current-week verbatim distributions against historical baselines to highlight surging complaints, resolved pain points, and net sentiment movement.",
        stack: ["Time-Series Trend Analysis", "Python", "SQL / Data Pipelines"],
        whyThisApproach:
          "Tracking directional velocity (increasing vs. decreasing themes) helps product leaders measure whether recent Azure releases fixed or worsened customer pain points.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Verbatim ingestion layer",
          responsibility:
            "Ingests weekly batches of Microsoft Azure CSAT survey responses and Azure Cloud Native customer verbatims.",
        },
        {
          name: "PII detection and redaction shield",
          responsibility:
            "Scans raw text to detect and mask all PII entities before analytical storage or model inference.",
        },
        {
          name: "Theme, subtheme, sentiment & emotion engine",
          responsibility:
            "Extracts hierarchical Themes, Subthemes, Sentiment polarity, and Emotion tags from every scrubbed verbatim.",
        },
        {
          name: "Weekly trend aggregation & PowerPoint compiler",
          responsibility:
            "Computes week-over-week theme velocity, ranks top pain points and complaints, and generates the weekly PowerPoint executive dashboard.",
        },
      ],
      dataFlow: [
        "Raw Azure CSAT and Azure Cloud Native customer verbatims are ingested.",
        "PII detection engine identifies and masks sensitive customer and tenant identifiers.",
        "NLP classification pipeline extracts Theme and Subtheme for each masked verbatim.",
        "Sentiment and Emotion models score customer polarity and emotional intensity.",
        "Trend engine calculates top pain points, complaint clusters, and week-over-week theme increases/decreases.",
        "Automated reporting engine compiles and delivers the weekly PowerPoint (.pptx) insight dashboard.",
      ],
    },
    decisions: [
      {
        title: "PII masking prior to theme and sentiment extraction",
        options: ["Analyze raw verbatims directly", "Mask PII before downstream NLP analysis"],
        chosen: "Mask all detected PII entities first before running theme, subtheme, and sentiment extraction.",
        tradeoff:
          "Adds an initial scrubbing step in exchange for strict customer privacy compliance and zero PII leakage into downstream dashboards.",
      },
      {
        title: "Joint Theme/Subtheme + Sentiment/Emotion extraction",
        options: ["Sentiment score only", "Flat topic tags only", "Hierarchical Theme + Subtheme with Sentiment + Emotion"],
        chosen: "Extract Theme, Subtheme, Sentiment, and Emotion together for every verbatim.",
        tradeoff:
          "Richer multi-label classification enables pinpointing exact product pain points and emotional severity rather than generic CSAT averages.",
      },
      {
        title: "Automated native PowerPoint (.pptx) weekly delivery",
        options: ["Static CSV exports", "Manual slide preparation", "Automated PowerPoint dashboard generation"],
        chosen: "Programmatic weekly PowerPoint dashboard generation.",
        tradeoff:
          "Requires structured slide templating upfront, but saves hours of weekly manual reporting and delivers executive-ready insight decks on schedule.",
      },
    ],
    challenges: [
      {
        problem:
          "Customer verbatims contained diverse, unstructured PII mixed with technical Azure terminology (resource names, GUIDs, subscription IDs, emails).",
        resolution:
          "Combined contextual NER with domain-specific pattern rules so sensitive PII was accurately masked without corrupting technical Azure product terms needed for theme classification.",
      },
      {
        problem:
          "Stakeholders needed to understand not just static complaint counts, but which cloud pain points were surging or declining week over week.",
        resolution:
          "Built automated week-over-week delta tracking into the weekly PowerPoint dashboard, surfacing top pain points, emerging complaints, and increasing/decreasing theme trends.",
      },
    ],
    myContribution: [
      "Built the PII detection and masking workflow for Azure CSAT and Azure Cloud Native customer verbatims.",
      "Implemented the NLP extraction pipeline for Theme, Subtheme, Sentiment, and Emotion classification.",
      "Engineered the automated weekly PowerPoint dashboard generator delivering top pain points, complaint breakdowns, and week-over-week theme trend insights.",
    ],
    outcomes: [
      {
        value: "100% Automated",
        label: "PII masking & weekly PowerPoint insight deck generation",
        status: "verified",
      },
      {
        value: "Weekly Cadence",
        label: "Executive CSAT & Cloud Native pain-point trend delivery",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "Azure OpenAI",
      "Azure AI Language (PII)",
      "NLP Sentiment & Emotion",
      "python-pptx",
      "Pandas",
      "Azure Cloud",
    ],
    images: [
      {
        src: "/images/projects/azure-pii-detection-1.png",
        alt: "Four-stage pipeline showing Azure CSAT verbatim ingestion, PII detection and masking, theme/subtheme/sentiment/emotion extraction, and automated weekly PowerPoint dashboard delivery.",
        caption: "End-to-end Azure CSAT & Cloud Native PII masking, NLP theme/emotion extraction, and weekly PowerPoint insight pipeline.",
      },
      {
        src: "/images/projects/azure-pii-detection-2.png",
        alt: "Executive PowerPoint insight dashboard displaying top Azure customer pain points, sentiment and emotion breakdown, and week-over-week theme trends.",
        caption: "Automated weekly PowerPoint executive dashboard tracking top pain points, complaints, and increasing/decreasing themes.",
      },
    ],
  },
  {
    slug: "poca-partner-capability-assessment",
    title: "POCA: Partner Opportunity Capability Assessment",
    client: "Microsoft — Global Retail Partner Ecosystem (via C5i)",
    domain: "Retail Partner Intelligence · Capability Assessment & Analytics",
    year: null,
    summary:
      "Replaced fragmented manual retailer tracking with a centralized assessment and analytics platform for Microsoft, evaluating global retail partners across 4 capability pillars and 12 strategic categories in a single unified view.",
    role: "Full-Stack Python & AI Engineer at C5i · Assessment Engine & Unified Analytics",
    problem:
      "Tracking and comparing retail partner capabilities across regions and subsidiaries was previously handled manually through scattered spreadsheets and disconnected reviews. Leadership lacked a single consolidated view to benchmark retailers across digital marketing, e-commerce execution, omnichannel fulfillment, and in-store innovation over multiple fiscal years.",
    solution:
      "Built the Partner Opportunity Capability Assessment (POCA) platform to standardize and automate partner evaluations across 105 capability criteria, 12 strategic categories, and 4 core pillars (Business Operations, Digital Demand Generation, E-Commerce & CRM, and Leadership & Retail Innovation). The platform scores partners on a standardized maturity scale, estimates enablement effort, and consolidates multi-year progression into one unified executive view.",
    features: [
      {
        name: "4-pillar & 12-category capability framework",
        whatItDoes:
          "Evaluates retail partners across Business Operations & Systems (B), Digital Demand Generation & Search (D), E-Commerce Execution & CRM (E), and Leadership & Retail Innovation (L).",
        howItWorks:
          "Maps 105 structured assessment criteria into 12 strategic retail categories—covering social commerce, SEO/discoverability, PDP experience, BOPIS/Click & Collect, ESD delivery, in-store digital kiosks, and loyalty CRM.",
        stack: ["Python", "FastAPI", "Structured Taxonomy", "PostgreSQL / SQL"],
        whyThisApproach:
          "Grouping granular criteria into 4 pillars and 12 categories lets stakeholders inspect high-level pillar maturity or drill down into specific operational gaps.",
      },
      {
        name: "Standardized maturity scoring & effort estimation",
        whatItDoes:
          "Grades each partner capability quantitatively while tracking the effort required to close gaps.",
        howItWorks:
          "Records standardized attribute scores (0.0 Not Started, 1.0 Developing, 2.0 Advanced) alongside enablement effort ratings (Low, Medium, High) and qualitative assessor remarks.",
        stack: ["Scoring Engine", "Python", "Data Validation"],
        whyThisApproach:
          "Pairing maturity scores with enablement effort helps partner teams prioritize quick wins (high impact, low effort) across global retail accounts.",
      },
      {
        name: "Multi-year longitudinal tracking",
        whatItDoes:
          "Tracks retail partner capability growth across multiple financial years (FY22, FY23, FY24, and Live cycles) across regions and subsidiaries.",
        howItWorks:
          "Maintains over 8,300+ populated assessment records normalized by partner account, subsidiary, region, and fiscal year for year-over-year benchmarking.",
        stack: ["Relational Data Modeling", "Time-Series Benchmarking", "Analytics API"],
        whyThisApproach:
          "Multi-year normalization reveals whether partner investments in omnichannel, AI guided selling, and digital fulfillment are improving year over year.",
      },
      {
        name: "Single-view retailer comparison & opportunity radar",
        whatItDoes:
          "Eliminates manual spreadsheet consolidation by surfacing all retail partners, pillar scores, and capability gaps in one interactive view.",
        howItWorks:
          "Aggregates assessment records into comparative scorecards by region, subsidiary, pillar, and strategic category so account managers can immediately spot growth opportunities.",
        stack: ["React / Next.js", "REST APIs", "Executive Dashboards"],
        whyThisApproach:
          "A unified view replaces tedious manual tracking and enables instant side-by-side comparison of retail partner readiness.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Assessment capture & validation layer",
          responsibility:
            "Collects and validates partner evaluations across 105 criteria, enforcing standardized scoring (0.0–2.0), effort tiers, and assessor remarks.",
        },
        {
          name: "Pillar & category aggregation engine",
          responsibility:
            "Rolls up criterion-level scores into the 12 strategic categories and 4 core capability pillars (B, D, E, L).",
        },
        {
          name: "Multi-year repository",
          responsibility:
            "Stores 8,385+ historical and live assessment records indexed by retail partner, subsidiary, region, and fiscal year.",
        },
        {
          name: "Unified executive analytics view",
          responsibility:
            "Presents side-by-side retailer scorecards, year-over-year progression, and enablement opportunity matrices in a single view.",
        },
      ],
      dataFlow: [
        "Assessors evaluate retail partners across 105 capability criteria spanning 12 categories.",
        "Each response is validated with a quantitative score (0.0, 1.0, 2.0), enablement effort (Low/Medium/High), and remarks.",
        "The aggregation engine computes category averages and roll-up scores across the 4 core capability pillars.",
        "Historical and current fiscal year records are linked to track year-over-year partner maturity.",
        "Leadership inspects all retailers, regional benchmarks, and enablement priorities in one consolidated dashboard.",
      ],
    },
    decisions: [
      {
        title: "Structured 4-pillar taxonomy over ad-hoc retailer reviews",
        options: ["Unstructured qualitative notes", "Flat checklist", "Hierarchical 4 Pillars → 12 Categories → 105 Criteria"],
        chosen: "Hierarchical 4-pillar and 12-category capability model.",
        tradeoff:
          "Requires upfront taxonomy alignment across global teams, but enables consistent apples-to-apples benchmarking across every retail partner.",
      },
      {
        title: "Combining capability scores with enablement effort tiers",
        options: ["Capability score alone", "Capability score (0.0–2.0) paired with Effort-to-Enable (Low/Medium/High)"],
        chosen: "Capture both capability maturity and enablement effort for every criterion.",
        tradeoff:
          "Adds an extra input field during assessment, but directly translates score gaps into actionable partner enablement roadmaps.",
      },
    ],
    challenges: [
      {
        problem:
          "Retail partner assessments were previously scattered across manual files, making it hectic to understand partner readiness across regions in a single view.",
        resolution:
          "Centralized all 105 criteria, 12 categories, and 4 capability pillars into a unified data model and single-pane dashboard spanning 8,385+ assessment records.",
      },
      {
        problem:
          "Comparing retailer progression across multiple fiscal years required normalizing inconsistent historical records.",
        resolution:
          "Standardized the scoring schema (0.0, 1.0, 2.0, and omitted flags) across FY22–Live cycles to enable seamless year-over-year capability tracking.",
      },
    ],
    myContribution: [
      "Engineered the POCA assessment data pipeline and scoring aggregation across the 4 capability pillars and 12 strategic categories.",
      "Structured multi-year retail partner records (8,385+ assessments) to support longitudinal benchmarking across regions and subsidiaries.",
      "Delivered the unified analytics workflow that replaced manual retailer tracking with a single-view capability and opportunity dashboard.",
    ],
    outcomes: [
      {
        value: "8,385+",
        label: "populated partner capability assessment records unified across fiscal years",
        status: "verified",
      },
      {
        value: "105 Criteria",
        label: "standardized across 12 categories & 4 core capability pillars",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL / SQL",
      "Pandas",
      "React / Next.js",
      "Azure Cloud",
    ],
    images: [
      {
        src: "/images/projects/poca-retail-assessment-1.png",
        alt: "3D isometric diagram of the POCA framework showing the 4 core capability pillars feeding into a unified retail partner scoring matrix.",
        caption: "POCA 4-pillar capability framework (Business Operations, Digital Demand, E-Commerce & CRM, Leadership & Innovation).",
      },
      {
        src: "/images/projects/poca-retail-assessment-2.png",
        alt: "3D isometric executive dashboard displaying global retail partner capability heatmaps across 12 categories and multi-year fiscal trends.",
        caption: "Unified single-view retailer capability scorecard, multi-year progression, and enablement effort matrix.",
      },
    ],
  },
  {
    slug: "chat-with-pi",
    title: "Chat with Pi: GenAI Retailer Assessment Insights Chatbot",
    client: "Microsoft — Global Retail Partner Ecosystem (via C5i)",
    domain: "Generative AI & Conversational BI · Partner Assessment Intelligence",
    year: null,
    summary:
      "Delivered at C5i for Microsoft: a Generative AI conversational insights assistant built over completed retailer capability assessments, allowing stakeholders to ask natural-language questions and receive instant, data-backed answers on partner maturity, gaps, and multi-year trends.",
    role: "AI & Generative AI Engineer at C5i · Conversational Analytics & Agentic Retrieval",
    problem:
      "After all retail partner capability assessments were completed across regions, subsidiaries, and fiscal years, stakeholders still had to manually filter large datasets or request custom analyst cuts whenever they had specific questions about retailer scores, pillar gaps, or enablement priorities.",
    solution:
      "Created 'Chat with Pi', a Generative AI chatbot engineered on top of the completed retailer assessment repository. Stakeholders ask plain-English questions about any retail partner, capability pillar, category, or fiscal year, and the system combines structured data querying with semantic retrieval over qualitative assessor remarks to deliver immediate, grounded insights.",
    features: [
      {
        name: "Natural-language querying over retailer assessments",
        whatItDoes:
          "Lets business users ask conversational questions about retailer capability scores, category performance, and regional benchmarks without writing SQL or navigating complex filters.",
        howItWorks:
          "An LLM-powered query planner interprets user intent (entities such as retailer name, region, pillar, category, or fiscal year) and executes structured lookups against the assessment dataset.",
        stack: ["Python", "Azure OpenAI", "FastAPI", "NL-to-SQL / Structured Tooling"],
        whyThisApproach:
          "Translating natural language into deterministic data queries guarantees accurate numerical answers across all 8,385+ assessment records.",
      },
      {
        name: "Hybrid synthesis of quantitative scores and qualitative remarks",
        whatItDoes:
          "Combines numerical maturity scores (0.0–2.0) and enablement effort tiers with free-text assessor remarks to explain the 'why' behind a retailer's rating.",
        howItWorks:
          "Retrieves both structured attribute scores and qualitative audit commentary for the queried partner or category, synthesizing a cohesive executive response.",
        stack: ["Azure OpenAI", "RAG / Semantic Retrieval", "Python"],
        whyThisApproach:
          "Stakeholders need both the exact score and the contextual justification recorded by assessors during partner evaluations.",
      },
      {
        name: "Comparative retailer & multi-year trend insights",
        whatItDoes:
          "Answers comparative questions across retailers, subsidiaries, and fiscal years (FY22–FY26 Live) in seconds.",
        howItWorks:
          "Computes deltas across fiscal years and ranks partner gaps by enablement effort (Low, Medium, High) to recommend high-impact partner opportunities.",
        stack: ["Pandas", "Python", "Conversational Analytics"],
        whyThisApproach:
          "Automated comparison turns static assessment tables into an interactive decision-support advisor for partner account teams.",
      },
      {
        name: "Context-aware follow-up conversations",
        whatItDoes:
          "Supports multi-turn dialogue so users can drill down from a regional summary into a specific retailer, pillar, or capability criterion.",
        howItWorks:
          "Maintains conversation session context across turns so follow-up questions automatically inherit the active retailer, region, or fiscal year scope.",
        stack: ["Session Memory", "FastAPI", "React / Next.js"],
        whyThisApproach:
          "Executive exploration is iterative; multi-turn memory lets users naturally narrow down from macro trends to specific action items.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Conversational chat interface",
          responsibility:
            "Provides an intuitive chat workspace with suggested analytical prompts, multi-turn history, and formatted insight responses.",
        },
        {
          name: "GenAI intent router & tool orchestrator",
          responsibility:
            "Parses user questions, extracts retailer/pillar/year entities, and selects the appropriate structured query or semantic retrieval tool.",
        },
        {
          name: "Assessment data & remarks retrieval layer",
          responsibility:
            "Executes quantitative aggregations over partner assessment scores and retrieves qualitative assessor notes.",
        },
        {
          name: "Grounded insight synthesizer",
          responsibility:
            "Formats verified assessment metrics, year-over-year comparisons, and enablement recommendations into clear executive answers.",
        },
      ],
      dataFlow: [
        "All retail partner capability assessments are completed, validated, and consolidated into the central assessment store.",
        "A stakeholder asks a natural-language question in Chat with Pi about retailer performance, gaps, or trends.",
        "The GenAI orchestrator identifies target retailers, pillars, categories, and fiscal years from the prompt.",
        "Structured query tools fetch exact capability scores and effort ratings while semantic search retrieves relevant assessor remarks.",
        "Azure OpenAI synthesizes a grounded, data-backed insight response and returns it to the user.",
      ],
    },
    decisions: [
      {
        title: "Tool-grounded data querying over pure free-text LLM prompting",
        options: ["Dump raw assessment tables into prompt", "Vector search only", "Hybrid structured querying + qualitative RAG"],
        chosen: "Hybrid structured query execution paired with qualitative remark retrieval.",
        tradeoff:
          "Prevents arithmetic hallucinations on capability scores while preserving rich qualitative context from assessor remarks.",
      },
      {
        title: "Dedicated conversational layer ('Chat with Pi') on top of POCA data",
        options: ["Static dashboard filters only", "Conversational GenAI insight assistant alongside dashboards"],
        chosen: "Dedicated 'Chat with Pi' GenAI assistant built over the consolidated assessment dataset.",
        tradeoff:
          "Gives non-technical partner managers instant self-serve answers to ad-hoc questions without waiting for manual analyst reports.",
      },
    ],
    challenges: [
      {
        problem:
          "Users asked diverse questions ranging from exact score lookups and year-over-year comparisons to open-ended capability gap summaries.",
        resolution:
          "Designed an intent-routing pipeline that pairs deterministic data aggregation for numerical accuracy with LLM synthesis for executive narrative clarity.",
      },
      {
        problem:
          "Retailer names, subsidiaries, and capability categories were often referenced colloquially by users in chat.",
        resolution:
          "Added entity normalization mapping user terms to canonical POCA pillars, categories, and retail partner accounts.",
      },
    ],
    myContribution: [
      "Designed and built the 'Chat with Pi' Generative AI conversational backend and orchestration pipeline at C5i for Microsoft.",
      "Integrated structured querying and semantic retrieval over the consolidated retailer capability assessment dataset.",
      "Implemented prompt guardrails and response synthesis to ensure every insight returned to stakeholders was accurately grounded in assessment data.",
    ],
    outcomes: [
      {
        value: "Self-Serve AI",
        label: "instant natural-language insights over 8,385+ retailer assessments",
        status: "verified",
      },
      {
        value: "4 Pillars & 12 Categories",
        label: "queryable on demand across global retail partners & fiscal years",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "Azure OpenAI",
      "FastAPI",
      "RAG & NL-to-SQL",
      "PostgreSQL / SQL",
      "Pandas",
      "React / Next.js",
    ],
    images: [
      {
        src: "/images/projects/chat-with-pi-1.png",
        alt: "3D isometric Chat with Pi conversational AI interface answering natural-language questions over retail partner capability assessments.",
        caption: "Chat with Pi conversational GenAI workspace delivering instant retailer capability insights.",
      },
      {
        src: "/images/projects/chat-with-pi-2.png",
        alt: "3D isometric architecture flow showing natural-language questions routed through GenAI structured querying and semantic retrieval over retailer assessment data.",
        caption: "Hybrid NL-to-SQL and qualitative RAG architecture powering grounded retailer assessment insights.",
      },
    ],
  },
  {
    slug: "txtsense",
    title: "TxtSense: AI-Driven Excel & Unstructured Text Analytics Platform",
    client: "Enterprise BI, Power BI / Tableau & Research Teams (via C5i)",
    domain: "LLM & NLP Text Intelligence · Self-Serve Tabular Analytics & Reporting",
    year: null,
    summary:
      "Delivered at C5i: a self-serve LLM and NLP platform where users upload large Excel datasets, select target columns, and run built-in AI models (Theme/Subtheme/Sub-subtheme extraction, PII detection, Gibberish filtering, Sentiment & Emotion) or custom user prompts—exporting enriched tables for Power BI, Tableau, and research teams alongside automated downloadable reports.",
    role: "AI & NLP Engineer at C5i · Multi-Model Text Pipeline & Custom Prompt Engine",
    problem:
      "Research and BI teams spent days manually reading, cleaning, and categorizing tens of thousands of free-text rows in large Excel files before feeding data into Power BI or Tableau dashboards. Analysts lacked a unified self-serve platform to apply NLP/LLM pipelines or custom prompts directly on spreadsheet columns without writing code.",
    solution:
      "Engineered TxtSense, an end-to-end text intelligence platform for large Excel and tabular datasets. Users upload spreadsheets, pick the columns to analyze, and choose from pre-built NLP/LLM modules—3-tier Theme → Subtheme → Sub-subtheme extraction, PII detection, Gibberish detection, Sentiment, and Emotion—or create custom models by entering their own prompts. Once processed, users download and share automated insight reports or feed the enriched data directly into Power BI, Tableau, and downstream research workflows, drastically cutting manual effort and turnaround time.",
    features: [
      {
        name: "Large Excel ingestion & interactive column selection",
        whatItDoes:
          "Allows users to upload high-volume Excel and CSV files, preview schemas, and select specific text columns for targeted AI processing.",
        howItWorks:
          "Streams and parses large workbooks into chunked tabular batches so users can run one or multiple AI models across chosen columns without memory bottlenecks.",
        stack: ["Python", "FastAPI", "Pandas / OpenPyXL", "React / Next.js"],
        whyThisApproach:
          "Letting analysts pick exact columns on their existing Excel files eliminates manual data wrangling and fits directly into their daily spreadsheet workflows.",
      },
      {
        name: "3-tier Theme, Subtheme & Sub-subtheme extraction",
        whatItDoes:
          "Automatically classifies unstructured text rows into a deep 3-level hierarchy: Theme, Subtheme, and Sub-subtheme.",
        howItWorks:
          "Combines LLM semantic classification and domain taxonomy mapping to assign consistent macro themes, mid-level subthemes, and granular sub-subthemes across thousands of rows.",
        stack: ["Azure OpenAI / LLMs", "NLP Classification", "Python"],
        whyThisApproach:
          "A 3-level hierarchy gives Power BI, Tableau, and research teams drill-down granularity from executive summaries down to root-cause micro-topics.",
      },
      {
        name: "Pre-built NLP suite: PII, Gibberish, Sentiment & Emotion",
        whatItDoes:
          "Provides toggleable AI models for PII detection & masking, Gibberish/noise detection, Sentiment polarity, and granular Emotion classification.",
        howItWorks:
          "Runs modular NLP and LLM classifiers that flag or redact sensitive PII, filter out low-quality gibberish responses, and score every row for sentiment and emotional tone.",
        stack: ["NLP Pipelines", "PII & Gibberish Detection", "Sentiment & Emotion AI", "Python"],
        whyThisApproach:
          "Cleaning gibberish and masking PII upfront ensures only high-quality, privacy-safe records reach downstream BI dashboards and research models.",
      },
      {
        name: "Custom prompt studio & user-defined AI models",
        whatItDoes:
          "Enables users to define their own custom prompts and run bespoke extractions or transformations across selected Excel columns.",
        howItWorks:
          "Users type a natural-language instruction or extraction rule, test it on sample rows, and execute it at scale across the entire spreadsheet with structured column output.",
        stack: ["Custom Prompt Engine", "Azure OpenAI", "Async Batch Workers"],
        whyThisApproach:
          "Research teams often have unique project questions; custom prompt models let them run tailored LLM analyses on demand without engineering intervention.",
      },
      {
        name: "Automated downloadable reports & BI-ready exports (Power BI / Tableau)",
        whatItDoes:
          "Generates downloadable, shareable automated insight reports as well as clean, enriched datasets ready for Power BI, Tableau, and research consumption.",
        howItWorks:
          "Appends all extracted model outputs (Themes, Subthemes, Sub-subthemes, Sentiment, Emotion, PII/Gibberish flags, and custom prompt results) as structured columns and compiles executive summary reports.",
        stack: ["Automated Reporting", "Excel / CSV Export", "Power BI & Tableau Integration"],
        whyThisApproach:
          "Delivering both shareable summary reports and structured BI tables bridges the gap between raw text analysis and enterprise visualization teams.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Spreadsheet upload & column configuration UI",
          responsibility:
            "Lets users upload large Excel files, select target columns, pick built-in NLP models, or author custom LLM prompts.",
        },
        {
          name: "Multi-model NLP & LLM execution engine",
          responsibility:
            "Orchestrates batch execution of Theme/Subtheme/Sub-subtheme, PII detection, Gibberish detection, Sentiment, Emotion, and custom prompt pipelines.",
        },
        {
          name: "Data enrichment & quality gate",
          responsibility:
            "Merges model predictions back into the tabular structure while flagging gibberish and masking detected PII.",
        },
        {
          name: "Automated report generator & BI export layer",
          responsibility:
            "Produces downloadable executive reports and structured data exports consumed by Power BI, Tableau, and research teams.",
        },
      ],
      dataFlow: [
        "User uploads a large Excel workbook and selects the text columns to analyze.",
        "User selects built-in models (Theme/Subtheme/Sub-subtheme, PII, Gibberish, Sentiment, Emotion) or enters a custom prompt.",
        "The batch engine processes rows through the selected NLP and LLM pipelines.",
        "Enriched columns are merged into the dataset and validated for downstream consumption.",
        "Users download automated shareable reports or connect the structured output directly to Power BI, Tableau, and research workflows.",
      ],
    },
    decisions: [
      {
        title: "Combining pre-built NLP modules with a Custom Prompt Studio",
        options: ["Fixed NLP models only", "Free-form prompting only", "Pre-built standardized models + Custom Prompt Studio"],
        chosen: "Offer one-click pre-built models alongside a flexible custom prompt builder.",
        tradeoff:
          "Standardized modules handle 80% of recurring hygiene and taxonomy tasks instantly, while custom prompts unlock unlimited ad-hoc research flexibility.",
      },
      {
        title: "3-level taxonomy (Theme → Subtheme → Sub-subtheme) with BI-native output",
        options: ["Single topic tag", "3-tier hierarchical tagging exported in tabular BI format"],
        chosen: "3-tier hierarchical extraction formatted directly for Power BI and Tableau hierarchies.",
        tradeoff:
          "Requires deeper semantic classification per row, but allows reporting teams to build interactive drill-down visuals immediately without manual re-tagging.",
      },
    ],
    challenges: [
      {
        problem:
          "Large Excel files contained noisy survey responses, accidental PII, and tens of thousands of rows that took analysts days to clean and tag manually.",
        resolution:
          "Integrated automated Gibberish detection and PII masking alongside batched async LLM processing, reducing turnaround time from days of manual reading to minutes.",
      },
      {
        problem:
          "Downstream Power BI, Tableau, and research teams needed consistent column schemas even when users ran custom prompts.",
        resolution:
          "Enforced structured output parsing so both built-in models and user-defined prompts produced clean, deterministic columns ready for BI ingestion.",
      },
    ],
    myContribution: [
      "Engineered the core LLM and NLP processing pipelines for TxtSense at C5i, including 3-tier Theme/Subtheme/Sub-subtheme extraction, PII masking, Gibberish detection, and Sentiment/Emotion analysis.",
      "Built the Custom Model prompt execution workflow allowing users to run bespoke instructions across selected Excel columns at scale.",
      "Implemented the automated report generation and structured export pipelines consumed by Power BI, Tableau, and enterprise research teams.",
    ],
    outcomes: [
      {
        value: "Major TAT Reduction",
        label: "eliminated days of manual Excel text tagging & cleaning across research teams",
        status: "verified",
      },
      {
        value: "Power BI & Tableau",
        label: "direct downstream consumption of enriched 3-tier themes & automated reports",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "Azure OpenAI / LLMs",
      "FastAPI",
      "NLP (Theme, PII, Gibberish, Sentiment)",
      "Pandas",
      "React / Next.js",
      "Power BI & Tableau Ready",
    ],
    images: [
      {
        src: "/images/projects/txtsense-platform-1.png",
        alt: "3D isometric architecture of TxtSense showing large Excel column selection flowing through modular NLP/LLM engines into automated reports and Power BI/Tableau.",
        caption: "TxtSense end-to-end Excel & text intelligence pipeline: built-in NLP models, custom prompts, and BI exports.",
      },
      {
        src: "/images/projects/txtsense-platform-2.png",
        alt: "3D isometric TxtSense workspace showing 3-tier Theme/Subtheme/Sub-subtheme extraction, PII and Gibberish detection, custom prompt studio, and downloadable reports.",
        caption: "Self-serve column selector, custom prompt studio, 3-level theme hierarchy, and automated report generation.",
      },
    ],
  },
  {
    slug: "scrapy-web-social-intelligence",
    title: "Scrapy: Multi-Source Web, Retailer & Social Media Intelligence Platform",
    client: "Amazon, Microsoft, Lenovo & LinkedIn Analytics Teams (via C5i)",
    domain: "Data Engineering & NLP · Web/API Scraping, Social Listening & BI Delivery",
    year: null,
    summary:
      "Built and maintained a multi-source web, retailer, social media, and API scraping & NLP analysis platform at C5i—extracting product reviews, descriptions, and comments from global e-commerce sites, YouTube, Facebook, Instagram, and Reddit, enriching them with themes, sentiment, and custom categories, and delivering BI-ready datasets for clients including Amazon, Microsoft, Lenovo, and LinkedIn.",
    role: "Python Data & AI Engineer at C5i · Scraper Architecture, NLP Models & Multi-Team Delivery",
    problem:
      "Multiple analytics and BI teams serving global enterprise clients (Amazon, Microsoft, Lenovo, LinkedIn) needed continuous, high-volume product reviews, product descriptions, social media comments, and community discussions across dozens of retailer websites and social platforms. Manual collection or fragmented scripts could not scale with frequent requests to onboard new websites, handle dynamic DOM/API changes, and apply custom NLP categorization before dashboard creation.",
    solution:
      "Engineered and maintained 'Scrapy', a centralized, extensible data harvesting and NLP enrichment platform. Continuously developed and maintained scrapers and API connectors for global retailer websites, social media channels (YouTube, Facebook, Instagram, Reddit), and third-party APIs based on cross-team requests. Whenever downstream teams required analytical enrichment, the platform ran custom NLP/LLM models to extract Themes, Sentiments, and domain-specific categories before delivering clean datasets to BI and reporting teams for client dashboards.",
    features: [
      {
        name: "Multi-retailer e-commerce & product review scraping",
        whatItDoes:
          "Extracts structured product descriptions, ratings, customer reviews, pricing, and metadata across numerous global retailer websites.",
        howItWorks:
          "Modular spider and headless browser pipelines navigate dynamic retailer storefronts, handle pagination and anti-bot throttling, and normalize heterogeneous HTML schemas into clean records.",
        stack: ["Python", "Scrapy", "Playwright / Selenium", "BeautifulSoup"],
        whyThisApproach:
          "A modular spider architecture makes it fast to onboard new retailer websites on request while keeping maintenance centralized when site layouts change.",
      },
      {
        name: "Social media & community listening (YouTube, Facebook, Instagram, Reddit)",
        whatItDoes:
          "Harvests public user comments, post discussions, engagement metrics, and brand mentions across YouTube, Facebook, Instagram, Reddit, and forums.",
        howItWorks:
          "Combines official platform APIs and specialized scraping connectors to ingest high-volume social comment threads and community discussions around target products and launches.",
        stack: ["REST & GraphQL APIs", "Python", "Social Data Connectors", "Async Workers"],
        whyThisApproach:
          "Unifying social media comments with retailer reviews gives brand teams a complete 360-degree view of consumer perception.",
      },
      {
        name: "On-demand NLP enrichment: themes, sentiment & custom categorization",
        whatItDoes:
          "Analyzes scraped reviews and social comments to extract Themes, Sentiment polarity, and custom team-specific categories.",
        howItWorks:
          "Applies tailored NLP and LLM classification models directly to ingested text streams based on each requesting team's taxonomy and business rules.",
        stack: ["NLP Classification", "Sentiment Analysis", "Python", "LLMs"],
        whyThisApproach:
          "Delivering pre-analyzed, categorized data saves downstream BI and research teams from manually tagging thousands of raw social and review comments.",
      },
      {
        name: "Rapid website onboarding & BI-ready dataset delivery",
        whatItDoes:
          "Continuously adds new target websites and APIs requested by internal teams and delivers validated datasets for client BI reports and dashboards.",
        howItWorks:
          "Standardizes output schemas, runs deduplication and data quality checks, and exports structured tables ready for Power BI, Tableau, and executive reporting teams serving Amazon, Microsoft, Lenovo, and LinkedIn.",
        stack: ["Pandas", "SQL / PostgreSQL", "Data Quality Pipelines", "BI Exports"],
        whyThisApproach:
          "Standardized delivery pipelines let BI teams immediately plug scraped and enriched datasets into client-facing dashboards.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Multi-source ingestion & spider layer",
          responsibility:
            "Executes web scrapers, headless browsers, and API connectors across retailer sites, YouTube, Facebook, Instagram, Reddit, and custom web sources.",
        },
        {
          name: "Data normalization & deduplication layer",
          responsibility:
            "Cleans raw HTML/JSON payloads, normalizes timestamps and product identifiers, and removes duplicate records.",
        },
        {
          name: "Custom NLP & categorization engine",
          responsibility:
            "Runs theme extraction, sentiment scoring, and custom rule/model categorization tailored to each team's project requirements.",
        },
        {
          name: "Enterprise BI & reporting delivery layer",
          responsibility:
            "Delivers structured, analysis-ready datasets to internal BI and analytics teams building dashboards for Amazon, Microsoft, Lenovo, and LinkedIn.",
        },
      ],
      dataFlow: [
        "Internal analytics or BI teams submit requests for specific retailer websites, social channels, or APIs alongside any custom categorization rules.",
        "Scrapy spiders and API connectors harvest reviews, product descriptions, and social comments from target platforms.",
        "Raw records are cleaned, normalized, and deduplicated in the data processing pipeline.",
        "NLP models extract Themes, Sentiment, and custom categories when requested by the consuming team.",
        "Enriched datasets are delivered to BI and reporting teams to build client dashboards and executive reports.",
      ],
    },
    decisions: [
      {
        title: "Hybrid web spiders + official API connectors",
        options: ["HTML scraping only", "APIs only", "Unified framework combining Scrapy spiders, headless browsers, and API connectors"],
        chosen: "Unified framework combining Scrapy spiders, dynamic browser automation, and API integrations.",
        tradeoff:
          "Supports both structured social/data APIs and complex JavaScript-rendered retailer storefronts within one maintainable codebase.",
      },
      {
        title: "Integrated NLP theme & sentiment tagging before BI handover",
        options: ["Deliver raw scraped text only", "Integrate configurable NLP theme, sentiment, and categorization models into the pipeline"],
        chosen: "Provide both raw normalized data and NLP-enriched outputs tailored to team requirements.",
        tradeoff:
          "Accelerates dashboard creation for BI teams servicing Amazon, Microsoft, Lenovo, and LinkedIn by handing over ready-to-visualize themes and sentiments.",
      },
    ],
    challenges: [
      {
        problem:
          "Frequent layout changes, dynamic JavaScript rendering, and rate limits across diverse retailer and social websites.",
        resolution:
          "Maintained modular spider adapters with automated health checks, retry policies, and headless browser fallbacks so new sites could be added and maintained reliably.",
      },
      {
        problem:
          "Different client teams (Amazon, Microsoft, Lenovo, LinkedIn) required custom taxonomies and categorization schemas for their scraped data.",
        resolution:
          "Built configurable NLP classification and tagging modules that adapted theme and category extraction to each team's reporting specification.",
      },
    ],
    myContribution: [
      "Developed and maintained the Scrapy multi-source web, retailer, and social media scraping codebase at C5i, continuously onboarding new websites and APIs for multiple teams.",
      "Built scrapers and connectors for e-commerce product reviews/descriptions and social platforms including YouTube, Facebook, Instagram, and Reddit.",
      "Implemented NLP models for theme extraction, sentiment analysis, and custom categorization, delivering structured datasets that powered BI dashboards for Amazon, Microsoft, Lenovo, and LinkedIn.",
    ],
    outcomes: [
      {
        value: "Multi-Client BI",
        label: "powered dashboards & reports for Amazon, Microsoft, Lenovo & LinkedIn",
        status: "verified",
      },
      {
        value: "Web, Social & APIs",
        label: "unified retailer reviews, YouTube, Instagram, Facebook & Reddit pipelines",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "Scrapy",
      "Playwright / Selenium",
      "REST & Social APIs",
      "NLP (Theme & Sentiment)",
      "Pandas",
      "PostgreSQL / SQL",
    ],
    images: [
      {
        src: "/images/projects/scrapy-intelligence-1.png",
        alt: "3D isometric architecture of Scrapy showing retailer sites, YouTube, Facebook, Instagram, Reddit, and APIs flowing through NLP theme/sentiment models into enterprise BI dashboards.",
        caption: "Multi-source retailer, social media, and API scraping pipeline with integrated NLP enrichment and BI delivery.",
      },
      {
        src: "/images/projects/scrapy-intelligence-2.png",
        alt: "3D isometric Scrapy control center displaying active website scrapers, social comment ingestion, theme and sentiment extraction, and BI dataset delivery.",
        caption: "Centralized scraper orchestration, custom categorization models, and structured delivery for client reporting teams.",
      },
    ],
  },
  {
    slug: "brandtrax-competitive-banking-intelligence",
    title: "BrandTrax: AI Brand Health & Competitive Banking Intelligence Platform",
    client: "Dubai Islamic Bank (via C5i)",
    domain: "Banking & Brand Intelligence · Social Listening, NLP & Competitive Alerting",
    year: null,
    summary:
      "Delivered BrandTrax for Dubai Islamic Bank: an AI brand-tracking and competitive intelligence product that ingests multi-platform social and web data via Brandwatch APIs across Dubai banks, extracts Themes, Subthemes, Sentiment, and Emotion, computes a composite Brand Tracking Health Score, powers competitive analysis dashboards, and triggers automated email alerts when rival banks launch new initiatives.",
    role: "AI & Data Engineer at C5i · Brandwatch API Pipelines, NLP Scoring & Automated Alerting",
    problem:
      "Dubai Islamic Bank needed continuous, real-time visibility into how customers perceived their brand versus rival banks across Dubai, as well as immediate awareness whenever competitors launched new banking products, campaigns, or digital features. Manually monitoring social platforms and competitor web announcements was slow and left leadership reactive to market shifts.",
    solution:
      "Engineered BrandTrax, an end-to-end brand health and competitive intelligence product powered by Brandwatch APIs and NLP/LLM pipelines. Using targeted keyword queries across Dubai's banking sector, the platform ingests both public customer social media posts and official bank publications, extracts Theme, Subtheme, Sentiment, and Emotion, computes a formula-driven Brand Tracking Score (Bank Health Score) across key banking dimensions, visualizes market positioning on competitive analysis dashboards, and automatically triggers executive email alerts when competitors roll out new offerings.",
    features: [
      {
        name: "Brandwatch API ingestion & Dubai banking keyword tracking",
        whatItDoes:
          "Continuously pulls multi-platform social media, news, forum, and web mentions across Dubai Islamic Bank and competing UAE banks using curated keyword taxonomies.",
        howItWorks:
          "Connects to Brandwatch APIs to stream both consumer-generated social posts and official digital publications from banks across Dubai into a normalized analytics pipeline.",
        stack: ["Python", "Brandwatch APIs", "REST Ingestion", "Automated Schedulers"],
        whyThisApproach:
          "Separating customer conversations from official bank posts enables side-by-side comparison of what banks promote versus how customers actually react.",
      },
      {
        name: "Theme, subtheme, sentiment & emotion extraction",
        whatItDoes:
          "Classifies every ingested customer post and bank announcement by Theme, Subtheme, Sentiment polarity, and granular Emotion.",
        howItWorks:
          "NLP and LLM classification models tag banking topics (e.g., mobile banking UX, Islamic finance products, cards, customer support, loan rates) alongside emotional intensity and sentiment.",
        stack: ["NLP & LLMs", "Sentiment & Emotion AI", "Python", "Topic Taxonomy"],
        whyThisApproach:
          "Granular theme and emotion tagging pinpoints whether a spike in social volume is driven by positive product excitement or customer service frustration.",
      },
      {
        name: "Formula-driven Brand Tracking Score (Bank Health Score)",
        whatItDoes:
          "Computes a unified Brand Tracking Health Score across multiple operational and perception dimensions for each bank.",
        howItWorks:
          "Combines net sentiment, emotional polarity, share of voice, engagement velocity, and theme weights into a standardized mathematical formula representing overall bank brand health.",
        stack: ["Quantitative Scoring Formula", "Pandas / NumPy", "Python"],
        whyThisApproach:
          "A single composite health score—broken down by aspect—gives executives an instant benchmark of Dubai Islamic Bank against every local competitor.",
      },
      {
        name: "Real-time competitor move detection & automated email alerts",
        whatItDoes:
          "Detects when competing banks in Dubai launch new products, campaigns, or policies and immediately notifies client stakeholders via automated email triggers.",
        howItWorks:
          "Monitors competitor bank activity streams for novel themes or campaign spikes and dispatches formatted intelligence alert emails summarizing what the competitor is doing in the market.",
        stack: ["Anomaly & Launch Detection", "Automated Email Alerting (SMTP / API)", "Python"],
        whyThisApproach:
          "Proactive email alerts ensure leadership knows about competitor launches as they happen rather than discovering them weeks later in monthly reviews.",
      },
      {
        name: "Executive competitive analysis dashboards",
        whatItDoes:
          "Visualizes brand health scores, share of voice, theme trajectories, and competitor comparisons in interactive dashboards.",
        howItWorks:
          "Consolidates Brandwatch streams, NLP outputs, and health score history into comparative views tracking Dubai Islamic Bank alongside peer UAE financial institutions.",
        stack: ["Competitive BI Dashboards", "SQL / PostgreSQL", "Data Visualization"],
        whyThisApproach:
          "Interactive competitive dashboards empower marketing and strategy teams to drill into competitor strengths, weaknesses, and emerging market trends.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Brandwatch API & keyword harvesting layer",
          responsibility:
            "Queries Brandwatch APIs using bank-specific and product-specific keywords across social media and web channels in Dubai.",
        },
        {
          name: "NLP theme, sentiment & emotion engine",
          responsibility:
            "Extracts Theme, Subtheme, Sentiment, and Emotion across both public customer posts and official bank content.",
        },
        {
          name: "Brand Tracking Health Score calculator",
          responsibility:
            "Applies the multi-aspect mathematical scoring formula to compute comparative brand health scores for each bank.",
        },
        {
          name: "Competitive dashboard & automated email alerting layer",
          responsibility:
            "Serves interactive competitive analysis dashboards and triggers automated email alerts when rival banks introduce new market initiatives.",
        },
      ],
      dataFlow: [
        "Brandwatch APIs stream multi-platform social and web data matched against Dubai banking keywords.",
        "Posts are segmented into customer voice vs. official bank communications.",
        "NLP models extract Theme, Subtheme, Sentiment, and Emotion for every record.",
        "The scoring engine calculates the multi-aspect Brand Tracking Health Score for Dubai Islamic Bank and its competitors.",
        "New competitor initiatives trigger automated executive email alerts while all metrics update the competitive analysis dashboards.",
      ],
    },
    decisions: [
      {
        title: "Dual-stream analysis: Customer Voice vs. Bank Publications",
        options: ["Track customer mentions only", "Track both public social posts and official bank digital activity"],
        chosen: "Track and analyze both what people post on social media and what rival banks publish online.",
        tradeoff:
          "Correlating bank announcements with immediate public reaction reveals which competitor launches are gaining real market traction.",
      },
      {
        title: "Formula-based Brand Tracking Score paired with event-driven email alerts",
        options: ["Static sentiment charts only", "Composite Brand Health Score + automated competitor launch email triggers"],
        chosen: "Combine a quantitative Brand Tracking Score formula with proactive email alerting.",
        tradeoff:
          "Delivers both continuous executive benchmarking and instant real-time awareness when competitors make a new move.",
      },
    ],
    challenges: [
      {
        problem:
          "Social media data across Dubai banks included noisy multi-channel chatter, making it difficult to isolate genuine competitor product launches from routine posts.",
        resolution:
          "Combined curated Brandwatch keyword filters with hierarchical Theme/Subtheme classification and anomaly rules to accurately trigger competitor alert emails.",
      },
      {
        problem:
          "Leadership needed an objective way to compare overall brand health across multiple banks and service dimensions.",
        resolution:
          "Designed a weighted Brand Tracking Score formula integrating sentiment, emotion, theme volume, and engagement into a clear bank health index.",
      },
    ],
    myContribution: [
      "Built the Brandwatch API data ingestion pipelines and keyword tracking workflows for Dubai Islamic Bank and rival UAE banks at C5i.",
      "Implemented the NLP extraction pipeline for Themes, Subthemes, Sentiment, and Emotion along with the mathematical Brand Tracking Health Score formula.",
      "Engineered the automated competitor activity email alerting workflow and data feeds powering the competitive analysis dashboards.",
    ],
    outcomes: [
      {
        value: "Brand Health Score",
        label: "formula-driven multi-aspect health benchmarking across Dubai banks",
        status: "verified",
      },
      {
        value: "Real-Time Alerts",
        label: "automated email triggers on competitor launches & market moves",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "Brandwatch APIs",
      "NLP (Theme, Sentiment & Emotion)",
      "Brand Health Scoring Engine",
      "Automated Email Alerting",
      "Pandas",
      "Competitive BI Dashboards",
    ],
    images: [
      {
        src: "/images/projects/brandtrax-banking-1.png",
        alt: "3D isometric architecture of BrandTrax showing Brandwatch API ingestion, NLP theme/sentiment/emotion extraction, Brand Tracking Health Score formula, and automated competitor email alerts.",
        caption: "BrandTrax end-to-end architecture: Brandwatch APIs, NLP extraction, Brand Health Score formula, and real-time alerting.",
      },
      {
        src: "/images/projects/brandtrax-banking-2.png",
        alt: "3D isometric competitive analysis dashboard comparing Dubai Islamic Bank brand health scores, theme/emotion trends, and automated competitor launch alert emails.",
        caption: "Competitive banking intelligence dashboard and automated competitor launch email notifications.",
      },
    ],
  },
  {
    slug: "brandtrust-linkedin-trust-intelligence",
    title: "BrandTrust: 4-Pillar Brand Trust & Social Intelligence Platform",
    client: "LinkedIn (via C5i)",
    domain: "Brand Trust & Social Intelligence · Live Data Pipelines, NLP & Trust Scoring",
    year: null,
    summary:
      "Delivered BrandTrust for LinkedIn at C5i: a live data-engineering and NLP platform that ingests keyword-targeted Brandwatch social data, extracts themes and sentiment, categorizes conversations into 4 core trust pillars—Loyalty, Benevolence, Integrity, and Competence—and computes a composite Brand Trust Score benchmarking market trust across peer platforms.",
    role: "AI & Data Engineer at C5i · Live Brandwatch Data Pipeline, 4-Pillar NLP & Trust Scoring",
    problem:
      "Understanding how much users and enterprise advertisers genuinely trust a brand requires more than raw mention counts or basic positive/negative sentiment. LinkedIn needed a live, automated way to quantify market trust across specific trust dimensions (Loyalty, Benevolence, Integrity, Competence) and benchmark its Brand Trust Score against peer digital and GenAI platforms.",
    solution:
      "Built BrandTrust, an end-to-end brand trust intelligence product backed by an automated live data-engineering pipeline. The system continuously ingests social and web conversations from Brandwatch using curated keyword rules, extracts Themes and Sentiments, classifies every mention into the 4 Trust Pillars (Loyalty, Benevolence, Integrity, and Competence), and calculates a standardized Brand Trust Score across verticals with Overview, Competitor Analysis, and Custom AI Analysis modules.",
    features: [
      {
        name: "4-pillar brand trust categorization (Loyalty, Benevolence, Integrity, Competence)",
        whatItDoes:
          "Categorizes unstructured social media and web mentions into four foundational dimensions of brand trust: Loyalty, Benevolence, Integrity, and Competence.",
        howItWorks:
          "NLP and LLM classifiers evaluate the semantic context and sentiment of each mention, mapping user discussions to one or more of the 4 trust pillars and computing individual pillar scores.",
        stack: ["Python", "NLP & LLMs", "4-Pillar Trust Classifier", "Semantic Taxonomy"],
        whyThisApproach:
          "Decomposing trust into Loyalty, Benevolence, Integrity, and Competence reveals whether a shift in brand perception stems from product capability (Competence) or ethical/user-first perception (Integrity & Benevolence).",
      },
      {
        name: "Live Brandwatch data engineering pipeline",
        whatItDoes:
          "Continuously ingests, cleans, and updates social media and web mention streams based on targeted brand and vertical keywords.",
        howItWorks:
          "Automated ETL jobs poll Brandwatch APIs on schedule, apply keyword filtering and mention volume cutoffs, deduplicate records, and trigger incremental NLP scoring so dashboards stay live.",
        stack: ["Brandwatch APIs", "Python Data Pipelines", "Automated ETL", "PostgreSQL / SQL"],
        whyThisApproach:
          "An automated live data engineering pipeline ensures executives always inspect up-to-date brand trust metrics without manual data refreshes.",
      },
      {
        name: "Composite Brand Trust Score & tier benchmarking",
        whatItDoes:
          "Calculates a unified Brand Trust Score (0–100) for LinkedIn and peer brands across Marketing Services, Social Platforms, and GenAI verticals.",
        howItWorks:
          "Aggregates weighted pillar scores (Loyalty, Benevolence, Integrity, Competence) and net sentiment polarity into an overall Trust Score graded across calibrated bands (Poor <20, Fair 20–40, Good 40–60, Excellent 60+).",
        stack: ["Trust Scoring Formula", "Pandas / NumPy", "Python"],
        whyThisApproach:
          "Standardized trust tiers and Market Leader cards let stakeholders immediately see where LinkedIn stands relative to peers across every vertical.",
      },
      {
        name: "Overview, Competitor Analysis & Custom AI Analysis workspace",
        whatItDoes:
          "Provides interactive views for cross-vertical brand comparisons, date-range filtering, source filtering, and one-click PDF executive exports.",
        howItWorks:
          "Exposes the live scored dataset through FastAPI endpoints to a modern web dashboard featuring Market Leader spotlights, 4-pillar horizontal progress breakdowns, and custom AI drill-downs.",
        stack: ["FastAPI", "React / Next.js", "Custom AI Analysis", "PDF Export"],
        whyThisApproach:
          "Combining executive scorecards with Custom AI Analysis lets strategy teams move seamlessly from high-level trust scores to deep thematic insights.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Live Brandwatch ingestion & keyword ETL layer",
          responsibility:
            "Fetches ongoing social and web mentions via Brandwatch APIs using brand- and vertical-specific keyword queries.",
        },
        {
          name: "Theme, sentiment & 4-pillar NLP classification layer",
          responsibility:
            "Extracts themes, computes sentiment polarity, and classifies every mention into Loyalty, Benevolence, Integrity, and Competence.",
        },
        {
          name: "Brand Trust Score aggregation engine",
          responsibility:
            "Computes pillar-level scores and the overall composite Brand Trust Score across time windows and mention volume thresholds.",
        },
        {
          name: "Interactive BrandTrust web dashboard",
          responsibility:
            "Renders Market Leader cards, 4-pillar scorebars, cross-vertical competitor cards, Custom AI Analysis, and PDF report exports.",
        },
      ],
      dataFlow: [
        "Scheduled data engineering pipelines pull live social and web mentions from Brandwatch APIs using curated keyword filters.",
        "Raw mentions are cleaned, deduplicated, and validated against time-window volume cutoffs.",
        "NLP models extract underlying themes, score sentiment, and map mentions into Loyalty, Benevolence, Integrity, and Competence.",
        "The scoring engine calculates individual pillar ratings and the overall Brand Trust Score for LinkedIn and benchmarked brands.",
        "Live scores populate the BrandTrust Overview, Competitor Analysis, and Custom AI Analysis modules.",
      ],
    },
    decisions: [
      {
        title: "4-pillar trust decomposition over single-number sentiment",
        options: ["Net sentiment score only", "4-Pillar Trust Framework (Loyalty, Benevolence, Integrity, Competence) + Composite Trust Score"],
        chosen: "Categorize and score every brand across Loyalty, Benevolence, Integrity, and Competence alongside a composite Trust Score.",
        tradeoff:
          "Requires multi-label semantic classification per mention, but provides actionable clarity on which specific trust dimension drives brand leadership.",
      },
      {
        title: "Automated live data-engineering pipeline with volume-cutoff calibration",
        options: ["Manual periodic CSV uploads", "Live automated Brandwatch pipeline with calibrated mention cutoffs"],
        chosen: "Live automated Brandwatch ingestion pipeline with minimum mention-volume thresholds per date window.",
        tradeoff:
          "Prevents small-sample noise from skewing trust scores while keeping the platform continuously updated.",
      },
    ],
    challenges: [
      {
        problem:
          "Social mentions often blended multiple brand variants (such as core LinkedIn and LinkedIn Premium) and varied widely in mention volume across date ranges.",
        resolution:
          "Unified brand entity mapping in the ETL pipeline and enforced dynamic mention-count cutoffs (<15 days, 15–30 days, >30 days) for statistically reliable Trust Scores.",
      },
      {
        problem:
          "Distinguishing nuanced trust dimensions like Benevolence vs. Integrity from short social media posts.",
        resolution:
          "Tuned LLM/NLP classification prompts and taxonomy rules with domain examples to accurately separate Competence, Integrity, Benevolence, and Loyalty signals.",
      },
    ],
    myContribution: [
      "Engineered the live Brandwatch data-engineering pipeline at C5i for LinkedIn so social mention data was automatically ingested, cleaned, and updated.",
      "Built the NLP theme extraction, sentiment analysis, and 4-pillar classification models mapping conversations into Loyalty, Benevolence, Integrity, and Competence.",
      "Implemented the composite Brand Trust Score calculation engine powering the Overview, Competitor Analysis, and Custom AI Analysis modules.",
    ],
    outcomes: [
      {
        value: "4 Trust Pillars",
        label: "Loyalty, Benevolence, Integrity & Competence scored live via Brandwatch",
        status: "verified",
      },
      {
        value: "Live Pipeline",
        label: "automated data engineering & Brand Trust Score benchmarking for LinkedIn",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "Brandwatch APIs",
      "Live Data Engineering ETL",
      "NLP & LLMs (4-Pillar Trust AI)",
      "FastAPI",
      "PostgreSQL / SQL",
      "React / Next.js",
    ],
    images: [
      {
        src: "/images/projects/brandtrust-linkedin-1.png",
        alt: "3D isometric BrandTrust analytics dashboard showing composite Trust Score rings and the 4 trust pillars: Loyalty, Benevolence, Integrity, and Competence.",
        caption: "BrandTrust 4-pillar scorecard (Loyalty, Benevolence, Integrity, Competence) and cross-vertical brand benchmarking.",
      },
      {
        src: "/images/projects/brandtrust-linkedin-2.png",
        alt: "3D isometric architecture of the live Brandwatch data engineering pipeline, NLP theme and sentiment extraction, and 4-pillar Brand Trust Score calculator.",
        caption: "Live Brandwatch ETL pipeline, 4-pillar NLP classification engine, and composite Brand Trust Score architecture.",
      },
    ],
  },
  {
    slug: "bioconferix-agentic-conference-planner",
    title: "Bio Conferix: Agentic Medical Congress & Clinical Intelligence Platform",
    client: "GSK, BMS (Hematology), Amgen & Organon (via C5i)",
    domain: "Healthcare & Life Sciences · Agentic AI, Congress Scraping & Clinical Extraction",
    year: null,
    summary:
      "Built Bio Conferix at C5i for global biopharma leaders (GSK, BMS-Heme, Amgen, Organon): an Agentic AI platform integrated with live medical conference web-scraping tools across AAD, AACR, ASRS, ASCO, EHA, and more—extracting NCT clinical trial IDs, new drug names, disease indications, biomarkers, mechanisms of action, trial phases, and sponsor companies, and delivering filtered insights, dashboards, and automated PowerPoint planners directly through agentic chat.",
    role: "AI & Agentic Systems Engineer at C5i · Autonomous Congress Scrapers, Biomedical NER & Agentic PPT Delivery",
    problem:
      "Pharmaceutical Medical Affairs and Competitive Intelligence teams at GSK, BMS, Amgen, and Organon previously built separate, manual Conference Planners for major medical congresses (AAD, AACR, ASRS, ASCO, EHA). Manually scraping thousands of conference sessions and abstracts, identifying clinical trials, tracking which competitor companies were testing novel drugs for emerging disease indications, and formatting custom PowerPoint planners for each congress was slow, repetitive, and difficult to keep updated as live schedules changed.",
    solution:
      "Engineered Bio Conferix, a unified Agentic AI platform integrated with autonomous web-scraping and clinical entity extraction tools. Through a conversational agentic chat interface, clients can trigger live date-filtered scraping across global medical congresses (AAD, AACR, ASRS, ASCO, EHA, and others), automatically extract structured clinical columns—including NCT Numbers, Investigational & Approved Drug Names, Drug Modalities (mAbs, ADCs, CAR-T, Bispecifics), Disease Indications, Biomarkers/Genetic Targets, Mechanism of Action (MoA), Clinical Trial Phase (Phase I–IV), Efficacy/Safety Endpoints (ORR, PFS, OS), Principal Investigators/KOLs, and Sponsoring Pharma Companies—and ask natural-language questions to filter studies and generate ready-to-share Dashboards and PowerPoint (.pptx) Conference Planners on demand.",
    features: [
      {
        name: "Autonomous multi-congress web scraping (AAD, AACR, ASRS, ASCO, EHA & more)",
        whatItDoes:
          "Scrapes live conference schedules, oral presentations, late-breaking abstracts (LBAs), posters, and symposiums across major dermatology, oncology, retina, and hematology congresses on demand.",
        howItWorks:
          "Agent-invoked Playwright and Scrapy tools crawl target conference portals based on user-specified dates and therapeutic filters, normalizing heterogeneous session catalogs into a unified biomedical schema.",
        stack: ["Python", "Agentic Tool Calling", "Playwright / Scrapy", "Async Ingestion"],
        whyThisApproach:
          "Replacing isolated single-event planners with a unified multi-congress scraping agent lets pharma teams track AAD (Organon), AACR (GSK), ASRS (Amgen), and ASCO/EHA (GSK, BMS-Heme) from one platform.",
      },
      {
        name: "Biomedical & clinical trial entity extraction (NCT, Drugs, Indications, Biomarkers & MoA)",
        whatItDoes:
          "Extracts rich clinical and competitive intelligence columns from raw conference titles, abstracts, and poster metadata.",
        howItWorks:
          "Combines biomedical NER and LLM structured extraction to pull: NCT Numbers (ClinicalTrials.gov IDs), New & Combination Drug Names, Drug Class/Modality (ADC, Bispecific, CAR-T, Small Molecule), Disease & Sub-Indication, Target Biomarkers & Mutations (e.g., PD-L1, KRAS, BCMA, VEGF), Mechanism of Action (MoA), Study Phase (Phase I/II/III/RWE), Clinical Endpoints (ORR, mPFS, OS, Adverse Events), Lead Authors/Institutions, and Sponsoring Biotech/Pharma Companies.",
        stack: ["Azure OpenAI / LLMs", "Biomedical NER", "Pydantic Schema Extraction", "Python"],
        whyThisApproach:
          "Structured clinical columns allow medical strategy teams to immediately map which company is advancing which drug and mechanism against specific diseases and trial phases.",
      },
      {
        name: "Conversational agentic chat for live querying & study filtering",
        whatItDoes:
          "Enables clients to ask natural-language questions, trigger live scraping by date, and dynamically filter clinical studies and competitor sessions.",
        howItWorks:
          "An agentic orchestrator routes user prompts between live scraper tools, structured SQL/dataframe filters, and semantic abstract search to answer complex competitive questions in real time.",
        stack: ["LangGraph / Agentic AI", "FastAPI", "NL-to-Filter & RAG", "React / Next.js"],
        whyThisApproach:
          "Giving Medical Affairs teams an interactive agentic chat eliminates manual spreadsheet filtering and lets them explore emerging clinical trial landscapes conversationally.",
      },
      {
        name: "Automated Conference Planner PowerPoint (.pptx) & dashboard generation",
        whatItDoes:
          "Generates and delivers customized Conference Planner decks (PowerPoint) and interactive dashboards directly from the agentic chat session.",
        howItWorks:
          "Compiles filtered sessions, priority competitor readouts, KOL speaker schedules, and drug-vs-indication matrices into downloadable native PowerPoint (.pptx) presentations and visual dashboards.",
        stack: ["python-pptx", "Automated Reporting", "Pandas", "Interactive Dashboards"],
        whyThisApproach:
          "Field medical and competitive intelligence teams need executive-ready PowerPoint itineraries and landscape summaries they can download and share immediately before and during congresses.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Agentic chat & orchestration layer",
          responsibility:
            "Interprets user prompts to trigger live date-based conference scraping, filter extracted clinical studies, or compile reports.",
        },
        {
          name: "Multi-congress autonomous scraper fleet",
          responsibility:
            "Harvests live sessions, abstracts, posters, and speaker schedules from AAD, AACR, ASRS, ASCO, EHA, and other medical congress portals.",
        },
        {
          name: "Biomedical NER & clinical extraction engine",
          responsibility:
            "Extracts NCT IDs, new drug names, modalities, disease indications, biomarkers, MoA, trial phases, endpoints, KOLs, and sponsor companies.",
        },
        {
          name: "Automated PowerPoint & dashboard delivery layer",
          responsibility:
            "Synthesizes filtered congress intelligence into interactive dashboards and downloadable PowerPoint (.pptx) conference planners.",
        },
      ],
      dataFlow: [
        "Client asks Bio Conferix in agentic chat to fetch or update conference data for specific dates or congresses (e.g., ASCO, EHA, AACR, AAD, ASRS).",
        "Autonomous scraping tools crawl the live conference portals and ingest abstracts, session schedules, and author affiliations.",
        "Biomedical LLM/NER pipeline extracts NCT numbers, drug names, modalities, disease indications, biomarkers, trial phases, and sponsor companies into structured columns.",
        "Client asks follow-up analytical questions or applies filters by drug, disease, company, or session type.",
        "The agent generates interactive competitive dashboards and downloadable PowerPoint (.pptx) Conference Planner decks directly in chat.",
      ],
    },
    decisions: [
      {
        title: "Unified Agentic Platform ('Bio Conferix') over bespoke per-congress planners",
        options: ["Build separate static tools for AAD, AACR, ASRS, ASCO, and EHA", "Single agentic platform with modular congress scrapers and chat-driven reporting"],
        chosen: "Consolidated all individual conference planners into the unified Bio Conferix agentic platform.",
        tradeoff:
          "Standardizes clinical entity extraction across Dermatology (Organon), Oncology/Hematology (GSK, BMS-Heme), and Retina (Amgen) while cutting per-conference engineering turnaround from weeks to minutes.",
      },
      {
        title: "Deep clinical schema extraction (NCT, Drug, Indication, Biomarker, MoA, Phase, Sponsor)",
        options: ["Keyword search over raw abstract text", "Structured multi-column biomedical extraction with strict schema validation"],
        chosen: "Extract explicit clinical trial columns for every conference abstract and session.",
        tradeoff:
          "Enables deterministic filtering and cross-company competitive matrices (Drug × Disease × Trial Phase × Company) rather than fuzzy text matching.",
      },
    ],
    challenges: [
      {
        problem:
          "Each medical congress (AAD, AACR, ASRS, ASCO, EHA) published abstracts and session schedules in different web formats with frequent last-minute updates prior to the event.",
        resolution:
          "Built date-aware autonomous scraping adapters triggered directly from the agentic workflow so users could pull the latest live schedule and late-breaking abstracts on demand.",
      },
      {
        problem:
          "Oncology and specialty pharma abstracts contain complex investigational drug codes, combination regimens, and biomarker notations.",
        resolution:
          "Designed a domain-tuned biomedical extraction pipeline that normalizes investigational compound codes, maps NCT trial identifiers, and links each study to its sponsoring pharma company and indication.",
      },
    ],
    myContribution: [
      "Developed the individual conference planner pipelines (AAD for Organon, AACR for GSK, ASRS for Amgen, ASCO & EHA for GSK and BMS-Heme) and unified them into the Bio Conferix Agentic AI product at C5i.",
      "Engineered the autonomous web-scraping integrations and biomedical extraction models capturing NCT numbers, new drug names, modalities, disease indications, biomarkers, trial phases, and sponsor companies.",
      "Built the agentic chat workflow enabling clients to query live congress data, filter clinical studies, and generate automated PowerPoint (.pptx) decks and dashboards on demand.",
    ],
    outcomes: [
      {
        value: "5+ Major Congresses",
        label: "AAD, AACR, ASRS, ASCO & EHA unified for GSK, BMS, Amgen & Organon",
        status: "verified",
      },
      {
        value: "Agentic Chat → PPT",
        label: "live congress scraping, NCT/drug extraction & automated deck delivery",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "Agentic AI (LangGraph / OpenAI)",
      "Playwright & Scrapy",
      "Biomedical NER (NCT, Drug, Disease)",
      "FastAPI",
      "python-pptx",
      "React / Next.js",
    ],
    images: [
      {
        src: "/images/projects/bioconferix-pharma-1.png",
        alt: "3D isometric architecture of Bio Conferix showing live scraping of AAD, AACR, ASRS, ASCO, and EHA congresses, biomedical extraction of NCT IDs and drug names, and agentic chat PPT generation.",
        caption: "Bio Conferix agentic architecture: live medical congress scraping, clinical entity extraction, and automated PPT delivery.",
      },
      {
        src: "/images/projects/bioconferix-pharma-2.png",
        alt: "3D isometric Bio Conferix agentic chat workspace displaying extracted NCT numbers, investigational drugs, disease indications, sponsor companies, and one-click PowerPoint planner generation.",
        caption: "Agentic chat workspace filtering clinical trial readouts by drug, indication, NCT ID, and sponsor company.",
      },
    ],
  },
  {
    slug: "synthetic-virtual-persona-mars",
    title: "Synthetic Virtual Persona: Consumer Research & Simulation Platform",
    client: "Mars — Petcare & Confectionery Consumer Insights (via C5i)",
    domain: "Consumer AI & Generative Simulation · Synthetic Personas, Focus Groups & Survey Validation",
    year: null,
    summary:
      "Delivered for Mars brand, insights, and R&D teams at C5i: an AI-driven consumer hypothesis and simulation platform featuring a first-party grounded Persona Studio, multi-mode Persona Chat (1-on-1, Focus Group, and AI Moderator with packaging/image stimulus evaluation), a Hybrid Statistical + LLM Synthetic Survey Data Generator, 4-stage Validation & Calibration checks, and an Insights & Driver Analysis dashboard.",
    role: "AI & Generative Systems Engineer at C5i · Persona Studio, Multi-Agent Focus Groups & Statistical Calibration",
    problem:
      "Early-stage consumer concept testing, packaging evaluation, and survey research across Mars business units (such as Petcare and Confectionery) required weeks of recruitment and fieldwork before brand and R&D teams could test an initial hypothesis. Teams needed a governed, fast way to simulate target consumer segments grounded in first-party Mars research while continuously calibrating synthetic responses against real consumer studies.",
    solution:
      "Engineered the Synthetic Virtual Persona Research Platform across four structured capability modules: (1) Persona Studio to build versioned, source-traceable composite AI personas grounded in first-party surveys and transcripts; (2) Persona Chat supporting 1-on-1 interviews, side-by-side Focus Groups, and an AI Moderator with multimodal vision support for packaging and ad stimuli; (3) a Hybrid Statistical + LLM Synthetic Survey Data Generator with automated quality gates; and (4) a 4-check Validation & Insights suite (Fidelity, Utility, Privacy Distance, and Real-vs-Synthetic Calibration) with driver analysis, concept scoring, and mandatory synthetic governance labels.",
    features: [
      {
        name: "Persona Studio with first-party RAG grounding & attribute provenance",
        whatItDoes:
          "Lets researchers build composite AI consumer personas from segment templates (e.g., Petcare or Confectionery households) or imported first-party survey and interview data.",
        howItWorks:
          "Extracts demographics, purchase drivers, category usage, media habits, and language style using embeddings and vector retrieval, attaching a source provenance note and confidence rating to every attribute across a versioned lifecycle (draft → in review → approved → retired).",
        stack: ["Python", "FastAPI", "Vector Store & RAG", "React / TypeScript"],
        whyThisApproach:
          "Tracing every persona attribute back to first-party Mars research prevents ungrounded stereotyping and tells researchers how much real data supports each profile.",
      },
      {
        name: "Multi-mode Persona Chat (1-on-1, Focus Group & AI Moderator) with vision stimuli",
        whatItDoes:
          "Allows teams to interview a single persona (1-on-1), compare multiple personas in a single thread (Focus Group), or run an autonomous AI Moderator following a discussion guide—including evaluating uploaded packaging images, ad scripts, and price lists.",
        howItWorks:
          "Uses Claude / multimodal LLMs with prompt versioning to generate in-character responses and interpret visual stimuli, paired with an automated consistency check that flags if a persona contradicts its own profile.",
        stack: ["Claude / Multimodal LLMs", "AI Moderator Agent", "Consistency Guardrails", "FastAPI"],
        whyThisApproach:
          "Combining multimodal vision with Focus Group and AI Moderator modes replicates qualitative concept testing in minutes while profile-consistency checks prevent persona drift.",
      },
      {
        name: "Hybrid Statistical + LLM Synthetic Survey Data Generator",
        whatItDoes:
          "Generates reproducible quantitative and qualitative survey datasets across scale ratings, multiple choice, rankings, and open-text questions with configurable quotas and weights.",
        howItWorks:
          "Supports Statistical generation (fitting distributions and correlations from real first-party data), LLM-based generation (for nuanced open-ended answers), and Hybrid mode combining both—recording seed/model metadata and running automated quality checks for straight-lining, duplicates, and low response diversity.",
        stack: ["Pandas / NumPy / SciPy", "Claude LLMs", "Async Job Queue", "PostgreSQL"],
        whyThisApproach:
          "Hybrid statistical + LLM sampling preserves realistic variable correlations from first-party data while capturing rich qualitative reasoning on open-ended questions.",
      },
      {
        name: "4-pillar validation & Real-vs-Synthetic calibration engine",
        whatItDoes:
          "Validates every synthetic dataset across Fidelity, Utility, Privacy Distance, and Benchmark Calibration before insights are used.",
        howItWorks:
          "Compares marginal/joint distributions against reference data (Fidelity), tests holdout performance (Utility), verifies nearest-neighbor distance so no synthetic row sits too close to a real individual (Privacy), and benchmarks synthetic vs. known real Mars study outcomes over time (Calibration).",
        stack: ["scikit-learn", "statsmodels", "SciPy", "Calibration Harness"],
        whyThisApproach:
          "Continuous calibration against real Mars studies proves where synthetic personas accurately predict real consumer behavior and where findings are directional only.",
      },
      {
        name: "Insights, regression driver analysis & built-in synthetic governance",
        whatItDoes:
          "Transforms synthetic surveys and chat transcripts into concept rankings, purchase-intent driver analysis, topic/sentiment clusters, and side-by-side Real-vs-Synthetic overlays.",
        howItWorks:
          "Runs regression driver models and NLP theme clustering to draft chart-backed insight reports, stamping every screen, transcript, and export with mandatory synthetic labels, sample sizes, calibration scores, and immutable audit logs.",
        stack: ["Driver Analysis (statsmodels)", "NLP Topic & Sentiment", "Audit Logging", "React / TypeScript"],
        whyThisApproach:
          "Clear synthetic labeling, confidence indicators, and side-by-side real data overlays ensure synthetic output acts as a disciplined hypothesis generator rather than an unverified substitute for real consumers.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Persona Studio & vector grounding layer",
          responsibility:
            "Ingests first-party Mars research and segmentation data into a vector store, extracting source-linked persona attributes with lifecycle versioning and privacy guardrails.",
        },
        {
          name: "Conversational & multimodal simulation layer",
          responsibility:
            "Powers 1-on-1, Focus Group, and AI Moderator sessions with vision stimulus analysis and real-time persona consistency checking.",
        },
        {
          name: "Hybrid synthetic data & background queue layer",
          responsibility:
            "Executes long-running statistical, LLM, and hybrid survey generation jobs with seed reproducibility and automated quality checks.",
        },
        {
          name: "Validation, driver analytics & governance layer",
          responsibility:
            "Runs Fidelity, Utility, Privacy, and Calibration checks, computes purchase-intent drivers and concept scores, and enforces SSO, RBAC, audit logging, and mandatory synthetic labeling.",
        },
      ],
      dataFlow: [
        "Researchers create or approve a composite consumer persona in Persona Studio grounded in first-party Mars segmentation and survey data.",
        "Users test concepts, packaging images, or pricing via 1-on-1 Chat, multi-persona Focus Groups, or AI Moderator sessions—or launch a Hybrid Synthetic Survey job.",
        "Automated quality gates check generated responses for profile consistency, straight-lining, and response diversity.",
        "The Validation engine runs Fidelity, Utility, Nearest-Neighbor Privacy, and Real-vs-Synthetic Calibration checks.",
        "The Insights module delivers concept rankings, regression driver analysis, Real-vs-Synthetic overlays, and synthetic-labeled exports.",
      ],
    },
    decisions: [
      {
        title: "Hybrid Statistical + LLM generation over pure LLM survey answering",
        options: ["Pure statistical sampling only", "Pure LLM prompting only", "Hybrid statistical distribution fitting + LLM qualitative synthesis"],
        chosen: "Hybrid mode pairing statistical distribution sampling for demographics/behaviors with LLM generation for open-ended nuance.",
        tradeoff:
          "Prevents LLM distribution collapse on numeric rating scales while retaining realistic consumer voice on open-text feedback.",
      },
      {
        title: "Hypothesis-first governance with mandatory calibration & synthetic labeling",
        options: ["Treat synthetic data as final consumer truth", "Enforce mandatory synthetic labels, privacy distance checks, and real-study calibration overlays"],
        chosen: "Embed mandatory synthetic labeling, nearest-neighbor privacy checks, and Real-vs-Synthetic calibration into every workflow.",
        tradeoff:
          "Prevents over-trust in uncalibrated synthetic outputs and satisfies enterprise legal, privacy, and bias-review standards.",
      },
    ],
    challenges: [
      {
        problem:
          "LLMs can drift from their assigned demographic or behavioral profile during multi-turn focus group discussions.",
        resolution:
          "Implemented version-pinned persona prompts grounded in vector-retrieved source attributes, paired with an automated consistency checker that flags profile contradictions.",
      },
      {
        problem:
          "Ensuring synthetic survey respondents neither memorize real individual records nor produce repetitive, low-variance ratings.",
        resolution:
          "Combined nearest-neighbor privacy distance checks with automated quality filters for straight-lining, duplicate answers, and marginal/joint distribution fidelity.",
      },
    ],
    myContribution: [
      "Architected and engineered the Synthetic Virtual Persona Research Platform for Mars at C5i using React, TypeScript, Python, FastAPI, and PostgreSQL.",
      "Built the Persona Studio grounding workflow and multi-mode Persona Chat (1-on-1, Focus Group, and AI Moderator with multimodal stimulus support and consistency checks).",
      "Implemented the Hybrid Statistical + LLM Synthetic Survey Data Generator, 4-stage Validation & Calibration suite, and regression driver analytics modules.",
    ],
    outcomes: [
      {
        value: "3 Chat Modes + Hybrid",
        label: "1-on-1, Focus Group & AI Moderator chat plus Statistical + LLM survey engine",
        status: "verified",
      },
      {
        value: "4-Stage Validation",
        label: "Fidelity, Utility, Privacy Distance & Real-vs-Synthetic Calibration",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Claude / Multimodal LLMs",
      "Vector Store & RAG",
      "Pandas / SciPy / statsmodels / scikit-learn",
      "PostgreSQL",
      "React & TypeScript",
    ],
    images: [
      {
        src: "/images/projects/synthetic-persona-mars-1.png",
        alt: "3D isometric architecture of the Synthetic Virtual Persona platform showing Persona Studio, Multi-Mode Focus Group Chat with packaging stimuli, and the Hybrid Survey & 4-Stage Validation engine.",
        caption: "Persona Studio, Multi-Mode Focus Group & AI Moderator arena, and Hybrid Statistical + LLM Survey Generator.",
      },
      {
        src: "/images/projects/synthetic-persona-mars-2.png",
        alt: "3D isometric consumer insights dashboard displaying Concept Scoring, Purchase Intent Driver Analysis, Real-vs-Synthetic calibration overlays, and Synthetic governance badges.",
        caption: "Concept scoring, regression driver analysis, and Real-vs-Synthetic calibration overlay dashboard.",
      },
    ],
  },
  {
    slug: "lenovo-4p-compass-inventory-health",
    title: "Lenovo 4P Compass: AI Inventory Health, Shipment & Replenishment Command Portal",
    client: "Lenovo — North America 4P & Supply Chain Operations (via C5i)",
    domain: "Supply Chain & Inventory Intelligence · Live SKU Risk Scoring, MoT Tracking & AI Insights",
    year: null,
    summary:
      "Replaced fragmented email-based inventory tracking with a unified web command center for Lenovo: integrating live SKU/MTM stock and in-transit shipments across US & Canada DCs, scoring product families across 5 risk dimensions, generating 'Why This Matters' AI insights (Situation, So What, Next Best Actions), and orchestrating multi-role replenishment approvals in one portal.",
    role: "AI & Full-Stack Engineer at C5i · 5-Dimension Risk Engine, AI Narrative Insights & Action Hub Workflow",
    problem:
      "Managing inventory health, safety stock breaches, aged stock exposure (>90 days), Air vs. Ocean replenishment shipments, and promotional demand spikes across hundreds of Lenovo SKUs (MTMs) and product sub-families (Consumer Web & Think Web) was previously handled through scattered spreadsheets and long email chains between Planners, Category Managers, 4P Leads, and Finance.",
    solution:
      "Engineered Lenovo 4P Compass, a single-pane inventory health and decision portal connected to Dynamics, ECC, SCI, and Flash feeds. The platform tracks live Finished Goods Inventory (FGI), On-Hand (OH), In-Transit (IT), Weeks of Inventory (WOI), and US/Canada DC splits across 24+ product sub-families; evaluates every MTM via a 5-dimension risk scoring engine and configurable 50-rule threshold engine; generates contextual 'Why This Matters' AI insights (Situation → So What → Next Best Actions); visualizes global Mode of Transport (MoT) Air/Ocean shipments against promotional calendars; and replaces email approvals with an integrated Inventory Action Hub and multi-stage audit trail.",
    features: [
      {
        name: "Live multi-DC inventory health & US/Canada geography split",
        whatItDoes:
          "Monitors real-time FGI On-Hand, In-Transit, Available-to-Sell (ATS), Safety Stock (SS), Aged Inventory (<10d, 10–90d, >90d), and WOI across Consumer Web and Think Web product families.",
        howItWorks:
          "Aggregates SKU-level (MTM) inventory across US distribution centers (DHAT, DHMA, DHWC, R690, R695, CA01, CA09) and Canada (DHOT), comparing actual vs. target geographic splits (70% US / 30% CA) and flagging drift.",
        stack: ["Python", "FastAPI", "Dynamics / ECC / SCI / Flash Feeds", "PostgreSQL"],
        whyThisApproach:
          "Unifying DC-level stock and in-transit POs in one view exposes when high aged inventory is masking a real Available-to-Sell shortage.",
      },
      {
        name: "5-dimension MTM risk scoring & interactive 50-rule engine",
        whatItDoes:
          "Scores every MTM and product sub-family across 5 risk dimensions: Shortage, Supply Delay, Aging, Excess, and Forecast Variance.",
        howItWorks:
          "Computes a weighted Priority Score = ((Shortage×3) + (Supply×2) + (Aging×2) + (Excess×1) + (Forecast×1)) × Financial Multiplier, rolling up SKU health into Action Required, Monitor, or Good statuses with a live slider-based Rules Engine.",
        stack: ["Quantitative Risk Engine", "50-Rule Threshold Evaluator", "Python", "React / JavaScript"],
        whyThisApproach:
          "Weighted multi-dimensional scoring ensures high-velocity stockout risks (like E Series at 0.4w WOI) are prioritized alongside high-value aging exposure (like Gaming NB and Workstation).",
      },
      {
        name: "'Why This Matters' AI insight generator (Situation → So What → Next Best Actions)",
        whatItDoes:
          "Synthesizes live inventory, aging, shipment delay, and promo overlap signals into structured executive AI briefings at Portfolio, Segment, Sub-Family, and SKU levels.",
        howItWorks:
          "Evaluates real-time WOI, aged percentages, open PO ETA slips, and upcoming promotional calendars (Cyber Five, Fall Gaming, Spring Sale) to generate a 3-part narrative: Situation, So What (financial/operational impact), and numbered Next Best Actions (NBAs).",
        stack: ["Azure OpenAI / LLMs", "Contextual Prompt Grounding", "FastAPI"],
        whyThisApproach:
          "Planners and Category Managers don't just need raw numbers—they need immediate clarity on 'So What' and the exact 1-2-3 actions to take today.",
      },
      {
        name: "Mode of Transport (MoT) live global shipment map & promo collision timeline",
        whatItDoes:
          "Tracks live Air and Ocean replenishment POs from Asian manufacturing origins (CN, TW, VN) to North American DCs alongside an interactive Promo & Campaign Calendar.",
        howItWorks:
          "Plots shipment arcs with milestone checkpoints, PSD/ETA slip badges, and a connected SKU timeline showing exact FGI depletion dates, active promo demand lifts (+22% to +35%), and gap-risk windows before replenishment arrival.",
        stack: ["Interactive SVG Geospatial Map", "Timeline Depletion Engine", "Supply Chain Telemetry"],
        whyThisApproach:
          "Visualizing FGI depletion directly against promo windows and delayed Ocean/Air arrivals immediately reveals 4-day stockout gaps that require air-freight escalation.",
      },
      {
        name: "Inventory Action Hub & multi-role approval workflow (replacing email threads)",
        whatItDoes:
          "Eliminates manual email coordination by managing replenishment and clearance decisions end-to-end inside the portal.",
        howItWorks:
          "Organizes staged MTM actions into 4 buckets (Increase Replen, Hold Future Qty, Monitor Aging, Push Sales), routes items through a multi-stage approval trail (Planner → Category Manager → 4P Lead → Finance) with Returned-for-revision notes, and exports approved batches via Package Prep to Excel/CSV.",
        stack: ["Workflow State Machine", "Role-Based Approval Trail", "Excel / CSV Package Export"],
        whyThisApproach:
          "Bringing Planner, Category Manager, 4P Lead, and Finance sign-offs into one auditable hub eliminates lost email threads and cuts replenishment approval turnaround from days to minutes.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Enterprise ERP & supply chain ingestion layer",
          responsibility:
            "Syncs live inventory, safety stock, run-rate, and open PO shipment telemetry from Dynamics, ECC, SCI, and Flash.",
        },
        {
          name: "5-dimension risk & rules evaluation engine",
          responsibility:
            "Computes MTM priority scores across Shortage, Supply, Aging, Excess, and Forecast dimensions and evaluates 50 configurable supply chain rules.",
        },
        {
          name: "AI insight & depletion simulation engine",
          responsibility:
            "Projects FGI depletion against L13W run rates and promo lifts, generating 'Why This Matters' (Situation, So What, Next Best Actions) narratives.",
        },
        {
          name: "Command Center UI & Action Hub workflow layer",
          responsibility:
            "Delivers the Summary, Inventory Health, Family View, MoT Shipment Map, MTM Detail, Rules Engine, and multi-role Action Hub approval portal.",
        },
      ],
      dataFlow: [
        "Live SKU/MTM stock, aging buckets, and open Air/Ocean POs are ingested across US and Canada distribution centers.",
        "The 5-dimension risk engine scores every MTM and rolls up risk flags to Sub-Families (IdeaPad, Yoga, Legion, ThinkBook, E/T/X1 Series, Workstations) and Segments.",
        "The AI engine correlates WOI, aged exposure, ETA delays, and promo calendars to generate Situation, So What, and Next Best Actions.",
        "Planners stage MTMs into the Inventory Action Hub (Increase Replen, Hold, Monitor Aging, Push Sales) and assign reviewers.",
        "Category Managers, 4P Leads, and Finance review, comment, and approve actions in-portal, releasing approved packages for immediate Excel/ERP execution.",
      ],
    },
    decisions: [
      {
        title: "Unified Command Center & Action Hub over email-based spreadsheet workflows",
        options: ["Continue daily Excel attachments and email approval threads", "Centralized web portal with embedded multi-role Action Hub and audit trail"],
        chosen: "Centralized web portal combining live inventory telemetry, AI insights, and an in-portal approval workflow.",
        tradeoff:
          "Replaces fragmented email chains between Planners, CMs, 4P Leads, and Finance with a single source of truth and full stage-by-stage accountability.",
      },
      {
        title: "Structured 'Situation → So What → Next Best Actions' AI insights",
        options: ["Free-form AI chat only", "Deterministic 3-block executive AI briefing scoped dynamically to Portfolio, Segment, Family, or MTM"],
        chosen: "Dynamic 3-block AI briefing (Situation, So What, Next Best Actions) updated automatically as users drill down.",
        tradeoff:
          "Gives supply chain leaders immediate, decision-ready recommendations without having to type prompts during time-critical stockout reviews.",
      },
    ],
    challenges: [
      {
        problem:
          "High on-hand Weeks of Inventory (WOI) often masked severe shortages because a large fraction of stock was aged (>90 days) or End-of-Life (EOL).",
        resolution:
          "Built side-by-side Aged Qty breakdowns, Available-to-Sell (ATS) separation, and multi-dimensional risk scoring so sub-families with high aged % and low sellable stock were accurately flagged for action.",
      },
      {
        problem:
          "Coordinating replenishment sign-offs across Planners, Category Managers, 4P Leads, and Finance over email caused delays right before major promotional events.",
        resolution:
          "Engineered the Inventory Action Hub with role-based assignment, Returned-for-revision feedback loops, and one-click Package Prep export.",
      },
    ],
    myContribution: [
      "Engineered the Lenovo 4P Compass portal architecture at C5i, unifying SKU/MTM inventory, DC splits, and live Air/Ocean shipment tracking into a single web command center.",
      "Implemented the 5-dimension MTM risk scoring algorithm, configurable Rules Engine, and 'Why This Matters' AI insight synthesis (Situation, So What, Next Best Actions).",
      "Built the Inventory Action Hub and multi-stage approval trail that transitioned Lenovo's replenishment and aging workflows from manual emails to an integrated portal.",
    ],
    outcomes: [
      {
        value: "Email → 1 Portal",
        label: "unified live SKU stock, MoT shipments, AI insights & multi-role approvals",
        status: "verified",
      },
      {
        value: "24+ Sub-Families",
        label: "tracked live across Consumer Web & Think Web (US & Canada DCs)",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Azure OpenAI (AI Insights)",
      "5-Dimension Risk & Rules Engine",
      "React / TypeScript",
      "Supply Chain ERP Feeds",
      "PostgreSQL / SQL",
    ],
    images: [
      {
        src: "/images/projects/lenovo-compass-1.png",
        alt: "3D isometric Lenovo 4P Compass Command Center showing dark KPI tiles, Sub-Family & MTM inventory health with US/CA DC split, and the purple Why This Matters AI Insight panel.",
        caption: "Lenovo 4P Compass Inventory Health Command Center with live KPIs, DC split, and 'Why This Matters' AI insights.",
      },
      {
        src: "/images/projects/lenovo-compass-2.png",
        alt: "3D isometric Lenovo 4P Compass supply chain view showing the Mode of Transport Air/Ocean live shipment map, 5-dimension risk engine, and multi-role Inventory Action Hub.",
        caption: "Mode of Transport (MoT) live global shipment map, 5-dimension risk scoring, and multi-role Inventory Action Hub.",
      },
    ],
  },
  {
    slug: "voc-agentic-customer-intelligence",
    title: "VoC (Voice of the Customer): Multi-Agent RAG, Databricks & MCP Copilot Platform",
    client: "Microsoft — Global Retail, Consumer & Cowork Ecosystem (via C5i)",
    domain: "Agentic AI, Databricks ETL & MCP Copilot · Multi-Source Customer & Macro Intelligence",
    year: null,
    summary:
      "Built at C5i for Microsoft: a multi-agent conversational intelligence layer over millions of rows of biweekly Databricks-ingested customer data—spanning online retailer reviews, offline in-store feedback, HML/HMC guided-selling telemetry, internal WOTS data, and scraped macroeconomic indicators—extracting Themes, Subthemes, Sentiment, Emotion, Churn Risk, and Purchase Stage, and exposed via SSO web portal, MCP Server, and a Microsoft Cowork Copilot Plugin.",
    role: "AI & Agentic Systems Engineer at C5i · Databricks LLM Pipeline, Multi-Agent RAG, MCP Server & Cowork Plugin",
    problem:
      "Microsoft received millions of rows of fragmented customer and market signals across online retailer reviews, physical store feedback, HML/HMC interactions, internal WOTS streams, and external macroeconomic shifts. Stakeholders needed an intelligent, self-serve way to query millions of biweekly-updated rows, correlate customer sentiment with macroeconomic context, and consume formatted insights directly inside their Microsoft environment and Cowork Copilot.",
    solution:
      "Engineered the Voice of the Customer (VoC) Agentic Intelligence Platform. A biweekly Azure Databricks data-engineering pipeline ingests and normalizes millions of rows across online/offline retail, HML/HMC, WOTS, and scraped macroeconomic datasets, applying LLMs to extract Theme, Subtheme, Sentiment, Emotion, Churn Risk, and Purchase Stage. On top of this lakehouse, built a multi-agent workflow equipped with specialized Skills and a hybrid RAG Tool that answers complex business questions in the user's requested output format. Migrated the platform into Microsoft's environment with enterprise SSO authentication and extended it with a dedicated MCP Server and Cowork Copilot Plugin for organization-wide adoption.",
    features: [
      {
        name: "Biweekly Databricks lakehouse pipeline across 5+ multi-modal data sources",
        whatItDoes:
          "Ingests, cleans, and unifies millions of rows of customer feedback every two weeks across online retailer product reviews, offline in-store feedback, HML/HMC telemetry, internal WOTS data, and scraped macroeconomic data.",
        howItWorks:
          "Distributed PySpark and Delta Lake jobs in Azure Databricks standardize schemas across disparate retail and internal feeds, joining qualitative macroeconomic indicators with product-level customer verbatims.",
        stack: ["Azure Databricks", "PySpark / Delta Lake", "Python", "Automated Biweekly ETL"],
        whyThisApproach:
          "Combining internal/retail feedback (Reviews, In-Store, HML/HMC, WOTS) with external macroeconomic data explains not just what customers are saying, but the broader market forces driving sentiment shifts.",
      },
      {
        name: "Large-scale LLM enrichment: Theme, Subtheme, Sentiment, Emotion, Churn Risk & Purchase Stage",
        whatItDoes:
          "Enriches every customer record with structured intelligence columns across millions of rows.",
        howItWorks:
          "Runs batched LLM and NLP inference pipelines to extract hierarchical Themes and Subthemes, Sentiment polarity, granular Emotion, Churn Risk scores, and customer Purchase Stage classification (Awareness, Consideration, Purchase, Onboarding, Retention).",
        stack: ["Azure OpenAI / LLMs", "Batch NLP Inference", "Churn & Purchase-Stage Models"],
        whyThisApproach:
          "Pre-computing Purchase Stage, Churn Risk, and Theme hierarchies in Databricks enables sub-second analytical aggregations paired with deep qualitative retrieval.",
      },
      {
        name: "Multi-agent workflow with Skills router & hybrid RAG Tool",
        whatItDoes:
          "Answers complex natural-language business questions over millions of rows and formats outputs dynamically according to the user's requested structure.",
        howItWorks:
          "A multi-agent orchestrator selects specialized Agent Skills and invokes a hybrid RAG Tool (combining quantitative SQL/Spark aggregations with vector retrieval over customer verbatims and macroeconomic reports) to synthesize grounded answers, tables, or executive briefs.",
        stack: ["Multi-Agent Orchestration", "Agent Skills & RAG Tool", "Vector Search", "FastAPI"],
        whyThisApproach:
          "Skill-based agent routing ensures quantitative volume questions, qualitative verbatim deep-dives, and macroeconomic correlations each use the optimal retrieval and formatting strategy.",
      },
      {
        name: "Microsoft client migration, SSO authentication, MCP Server & Cowork Copilot Plugin",
        whatItDoes:
          "Brings VoC intelligence directly into Microsoft's internal security perimeter and daily employee Copilot workflows.",
        howItWorks:
          "Migrated the application into the Microsoft client environment with enterprise Entra ID / SSO authentication, and engineered a standardized Model Context Protocol (MCP) Server and Cowork Plugin so Microsoft teams can query VoC agents directly from Cowork Copilot.",
        stack: ["Model Context Protocol (MCP) Server", "Microsoft Cowork Plugin", "Entra ID / SSO Auth", "Azure Cloud"],
        whyThisApproach:
          "Exposing the multi-agent RAG system through an MCP Server and Cowork Plugin removes friction and enables organization-wide adoption inside Microsoft's native Copilot interface.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Multi-source ingestion & macroeconomic scraping layer",
          responsibility:
            "Collects online retailer reviews, offline store feedback, HML/HMC data, internal WOTS feeds, and scraped macroeconomic qualitative data.",
        },
        {
          name: "Databricks biweekly ETL & LLM extraction lakehouse",
          responsibility:
            "Processes millions of rows biweekly, extracting Theme, Subtheme, Sentiment, Emotion, Churn Risk, and Purchase Stage.",
        },
        {
          name: "Multi-agent orchestrator, Skills & RAG Tool layer",
          responsibility:
            "Routes user queries across specialized Agent Skills, executing hybrid RAG over millions of customer rows and macroeconomic context.",
        },
        {
          name: "SSO web portal, MCP Server & Cowork Copilot Plugin layer",
          responsibility:
            "Secures access via Microsoft SSO and exposes the VoC agentic capabilities to both the web portal and Microsoft Cowork Copilot via MCP.",
        },
      ],
      dataFlow: [
        "Online retailer reviews, offline store feedback, HML/HMC, WOTS, and macroeconomic data flow into Azure Databricks every two weeks.",
        "LLM enrichment pipelines tag millions of rows with Theme, Subtheme, Sentiment, Emotion, Churn Risk, and Purchase Stage.",
        "A Microsoft user asks a question via the SSO-secured web portal or inside Microsoft Cowork Copilot.",
        "The MCP Server / API routes the request to the Multi-Agent workflow, which activates the relevant Skill and RAG Tool.",
        "The agents synthesize quantitative metrics, qualitative customer verbatims, and macroeconomic reasons into the exact format requested by the user.",
      ],
    },
    decisions: [
      {
        title: "Exposing the multi-agent system via an MCP Server & Cowork Plugin",
        options: ["Standalone web app only", "Standalone SSO web app + MCP Server & Microsoft Cowork Copilot Plugin"],
        chosen: "Build a dedicated MCP Server and Cowork Plugin alongside the SSO web platform.",
        tradeoff:
          "Allows Microsoft stakeholders to access VoC intelligence directly inside their existing Cowork Copilot workflow without switching tools.",
      },
      {
        title: "Blending macroeconomic qualitative data with product-level VoC telemetry",
        options: ["Analyze product reviews in isolation", "Correlate product/store VoC with scraped macroeconomic context"],
        chosen: "Integrate scraped macroeconomic qualitative data into the RAG knowledge base alongside customer verbatims.",
        tradeoff:
          "Helps leadership distinguish whether a dip in purchase sentiment is caused by a product defect or broader macroeconomic headwinds.",
      },
    ],
    challenges: [
      {
        problem:
          "Querying and performing RAG across millions of biweekly-updated rows from 5+ heterogeneous sources (online reviews, offline stores, HML/HMC, WOTS, macroeconomy) without high latency.",
        resolution:
          "Pre-indexed structured LLM attributes (Theme, Subtheme, Churn Risk, Purchase Stage) in Databricks Delta tables and paired them with a skill-routed hybrid RAG Tool.",
      },
      {
        problem:
          "Meeting enterprise security and integration standards when migrating to Microsoft's client environment.",
        resolution:
          "Implemented end-to-end SSO authentication, environment isolation, and standardized MCP protocol interfaces for seamless Cowork Copilot integration.",
      },
    ],
    myContribution: [
      "Architected and built the multi-agent conversational layer, Skills router, and RAG Tool over millions of rows of Microsoft VoC data at C5i.",
      "Contributed to the biweekly Databricks data-engineering and LLM extraction pipeline (Themes, Subthemes, Sentiment, Emotion, Churn Risk, Purchase Stage, and macroeconomic integration).",
      "Led the SSO authentication integration, migration into Microsoft's client environment, and development of the MCP Server and Cowork Copilot Plugin.",
    ],
    outcomes: [
      {
        value: "Millions of Rows",
        label: "updated biweekly in Databricks across Reviews, Stores, HML/HMC, WOTS & Macro",
        status: "verified",
      },
      {
        value: "MCP & Cowork Plugin",
        label: "migrated with SSO into Microsoft environment for Copilot-native adoption",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "Azure Databricks (PySpark)",
      "Multi-Agent RAG & Skills",
      "MCP Server & Cowork Plugin",
      "Azure OpenAI / LLMs",
      "FastAPI & SSO Auth",
      "React / Next.js",
    ],
    images: [
      {
        src: "/images/projects/voc-microsoft-1.png",
        alt: "3D isometric architecture of VoC showing Online Reviews, Offline Store Feedback, HML/HMC, WOTS, and Macroeconomic data flowing into Databricks, Multi-Agent RAG, MCP Server, and Microsoft Cowork Copilot.",
        caption: "End-to-end VoC architecture: 5 data sources, biweekly Databricks LLM pipeline, Multi-Agent RAG, MCP Server, and Cowork Plugin.",
      },
      {
        src: "/images/projects/voc-microsoft-2.png",
        alt: "3D isometric VoC Agentic Workspace and Microsoft Cowork Copilot Plugin displaying Purchase Stage funnel, Churn Risk, Sentiment/Emotion, and Macroeconomic insights.",
        caption: "Agentic VoC workspace and Cowork Copilot Plugin delivering skill-routed RAG insights over millions of customer records.",
      },
    ],
  },
  {
    slug: "nexora-agentic-document-intelligence",
    title: "Nexora: Agentic Document Intelligence, Azure Blob Repository & Multi-Deck RAG Hub",
    client: "Microsoft — Enterprise Strategy, Research & Knowledge Teams (via C5i)",
    domain: "Agentic Document Intelligence · Multi-Format PPTX/PDF RAG, Cross-Deck Discovery & Azure Storage",
    year: null,
    summary:
      "Built an enterprise document hub and agentic RAG platform for Microsoft teams managing hundreds of PowerPoint decks (PPTX) and PDFs in Azure Blob Storage—enabling conversational search, cross-document relationship discovery, slide-level source citations, and instant file downloads.",
    role: "AI & Backend Engineer at C5i · Azure Blob Ingestion, Multi-Deck RAG Pipeline & Source Citation Engine",
    problem:
      "Microsoft strategy, insights, and operations teams continuously receive hundreds of multi-slide PowerPoint presentations (PPT/PPTX), PDFs, and research reports across workstreams. Manually organizing these files, searching for specific metrics or strategic takeaways buried inside slide decks, and understanding how findings in one presentation connect to another was slow, fragmented, and error-prone.",
    solution:
      "Engineered Nexora, a centralized document management and agentic conversational intelligence platform backed by Azure Blob Storage containers. Users upload and organize hundreds of PPTs, PDFs, and reference files into secure Azure storage containers. An automated parsing and indexing pipeline extracts slide titles, bullet hierarchies, speaker notes, tables, and PDF sections into a hybrid vector and metadata index. Over this repository, an agentic RAG layer answers complex natural-language queries, uncovers hidden thematic connections across multiple decks, cites the exact source files and slide/page numbers used, and recommends relevant PPTX/PDF decks for immediate one-click download.",
    features: [
      {
        name: "Centralized Multi-Format Repository on Azure Blob Storage",
        whatItDoes:
          "Provides a unified workspace where enterprise teams upload, organize, version, and manage hundreds of PowerPoint presentations (PPT/PPTX), PDFs, and strategy documents stored securely in Azure Blob Storage containers.",
        howItWorks:
          "Documents uploaded through the portal are streamed directly into partitioned Azure Blob Storage containers with RBAC permissions, automated SHA-256 deduplication, and rich document metadata (author, workstream, date, tags, and file format).",
        stack: ["Azure Blob Storage", "Python", "FastAPI", "React / Next.js"],
        whyThisApproach:
          "Gives enterprise teams a single governed repository for hundreds of heavy presentation decks instead of scattered SharePoint links and email attachments.",
      },
      {
        name: "Slide-Aware PPTX & PDF Parsing + Hybrid Vector Indexing",
        whatItDoes:
          "Extracts granular structure from complex PowerPoint decks and PDFs—preserving slide numbers, titles, text boxes, embedded tables, chart labels, and speaker notes for high-precision retrieval.",
        howItWorks:
          "Uses an asynchronous document ingestion pipeline that parses PPTX XML structures slide-by-slide and PDF layouts page-by-page, generating hierarchical parent-child chunks (deck-level summary + slide-level detail) embedded into a hybrid vector and BM25 keyword index.",
        stack: ["Python", "python-pptx / PyMuPDF", "Azure AI Search / Vector DB", "Azure OpenAI Embeddings"],
        whyThisApproach:
          "Standard flat-text chunking loses slide boundaries and context; slide-aware hierarchical indexing ensures the RAG engine knows exactly which slide and presentation every fact came from.",
      },
      {
        name: "Agentic Conversational RAG & Cross-Document Connection Discovery",
        whatItDoes:
          "Allows users to ask natural-language questions across hundreds of stored presentations and uncovers how topics, KPIs, and strategic initiatives connect across separate files.",
        howItWorks:
          "An agentic query router decomposes multi-part user questions, executes parallel hybrid retrieval across the indexed document store, cross-references entities and themes shared across different PPTX/PDF files, and synthesizes a cohesive, structured answer.",
        stack: ["Agentic RAG Workflow", "Azure OpenAI (GPT-4o)", "Hybrid Semantic + Keyword Search", "Knowledge Graph Linking"],
        whyThisApproach:
          "Enables users not only to find a single fact, but to synthesize insights and understand relationships across dozens of independent presentations in seconds.",
      },
      {
        name: "Exact Source Attribution & Smart PPTX/PDF Download Suggestions",
        whatItDoes:
          "Displays transparent inline citations showing the exact presentation name, slide number, or PDF page behind every claim, and suggests the top matching source files for immediate download.",
        howItWorks:
          "Maps every retrieved chunk back to its Azure Blob object URI and slide/page metadata, rendering interactive citation badges alongside pre-signed Azure Blob SAS download links for the recommended PPTX and PDF files.",
        stack: ["Azure Blob SAS Tokens", "Citation Grounding Engine", "React / TypeScript", "FastAPI"],
        whyThisApproach:
          "Enterprise stakeholders need verifiable answers and immediate access to the original slides so they can verify context or reuse slides in upcoming executive reviews.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Document Hub & Azure Blob Storage Layer",
          responsibility:
            "Stores and versions hundreds of PowerPoint decks (PPT/PPTX), PDFs, and strategy reports inside partitioned Azure Blob Storage containers with RBAC and SAS download streaming.",
        },
        {
          name: "Slide-Aware Parsing & Hybrid Vector Indexing Layer",
          responsibility:
            "Extracts slide titles, bullet hierarchies, tables, speaker notes, and PDF pages into parent-child chunks indexed with dense vector embeddings and BM25 keyword metadata.",
        },
        {
          name: "Agentic RAG & Cross-Document Discovery Layer",
          responsibility:
            "Decomposes complex user queries, retrieves across hundreds of decks, links related themes across separate files, and attaches exact slide/page source citations.",
        },
        {
          name: "Conversational Workspace & File Recommendation UI",
          responsibility:
            "Presents synthesized answers, inline slide citations, cross-deck connection maps, and one-click PPTX/PDF download cards.",
        },
      ],
      dataFlow: [
        "Users upload hundreds of PPTX presentations, PDFs, and strategy documents into the Nexora portal.",
        "Files are persisted in Azure Blob Storage containers and queued for asynchronous slide-and-page structural extraction.",
        "Hierarchical chunks (deck summary + slide/page content) and metadata are indexed in the hybrid vector store.",
        "When a user asks a question, the Agentic RAG router retrieves relevant slides across multiple files and maps cross-document connections.",
        "The response is returned with exact source document names, slide/page numbers, and direct download links for the recommended PPTX/PDF files.",
      ],
    },
    decisions: [
      {
        title: "Slide-level hierarchical indexing instead of flat text chunking",
        options: ["Fixed-token flat text chunks", "Slide-aware and page-aware hierarchical parent-child indexing"],
        chosen: "Parse PPTX decks slide-by-slide (preserving slide title, body, tables, and speaker notes) and pair each slide chunk with deck-level metadata.",
        tradeoff:
          "Slightly more complex ingestion pipeline, but guarantees accurate slide-number citations and prevents context bleed across unrelated slides.",
      },
      {
        title: "Pairing conversational RAG answers with direct source deck downloads",
        options: ["Text-only answers with filename references", "Inline slide citations + one-click Azure Blob SAS download recommendations"],
        chosen: "Surface interactive source cards that let users immediately download the exact PPTX or PDF where the insight originated.",
        tradeoff:
          "Enables strategy teams to immediately inspect or reuse the original executive slides rather than manually hunting through folders.",
      },
    ],
    challenges: [
      {
        problem:
          "Searching and understanding connections across hundreds of dense PowerPoint decks where critical insights are split across slide titles, tables, and speaker notes.",
        resolution:
          "Built a structured PPTX/PDF parser combined with an agentic multi-hop RAG workflow that links shared entities and themes across separate presentations.",
      },
      {
        problem:
          "Ensuring zero hallucination and full traceability when synthesizing answers from hundreds of enterprise files.",
        resolution:
          "Enforced strict citation grounding tied to Azure Blob object URIs and slide/page indices, surfacing verifiable source badges alongside every answer.",
      },
    ],
    myContribution: [
      "Architected and built the Azure Blob Storage ingestion pipeline and slide-aware PPTX/PDF parsing engine at C5i for Microsoft.",
      "Engineered the agentic conversational RAG layer capable of searching across hundreds of presentations and discovering cross-document thematic connections.",
      "Implemented slide-level source attribution and automated source deck recommendation cards with secure one-click Azure Blob downloads.",
    ],
    outcomes: [
      {
        value: "100s of PPTs & PDFs",
        label: "centralized in Azure Blob Storage with slide-level semantic indexing",
        status: "verified",
      },
      {
        value: "Cited RAG + Downloads",
        label: "instant cross-deck synthesis with exact slide sources and file recommendations",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "Azure Blob Storage",
      "Agentic RAG",
      "Azure OpenAI (GPT-4o)",
      "Hybrid Vector Search",
      "FastAPI",
      "React / Next.js",
    ],
    images: [
      {
        src: "/images/projects/nexora-microsoft-1.png",
        alt: "3D isometric architecture of Nexora showing hundreds of PPTX slide decks and PDFs stored in Azure Blob Storage, indexed into an Agentic RAG & Cross-Document Knowledge Graph with slide citations.",
        caption: "Nexora architecture: Azure Blob Storage containers, slide-aware parsing, and Agentic RAG with source deck downloads.",
      },
      {
        src: "/images/projects/nexora-microsoft-2.png",
        alt: "3D isometric Nexora conversational workspace showing multi-deck RAG synthesis, exact slide citations, cross-document knowledge map, and one-click PPTX/PDF download suggestions.",
        caption: "Conversational document workspace surfacing cross-deck insights, slide-level citations, and recommended PPTX/PDF downloads.",
      },
    ],
  },
  {
    slug: "data-to-deck-multi-agent-ppt-automation",
    title: "Data to Deck: Multi-Agent Excel-to-PPTX Wave Automation & Persistent Memory Platform",
    client: "Enterprise Analytics, Delivery & Consulting Teams (C5i Internal & Client Delivery)",
    domain: "Multi-Agent Automation · Excel-to-PPTX Wave Generation, Validation & Persistent Agent Memory",
    year: null,
    summary:
      "Eradicated repetitive weekly, biweekly, and monthly PowerPoint creation across C5i by building a multi-agent platform that ingests Previous Wave Excel data, the Previously Delivered PPTX, and New Wave Excel data—reverse-engineering slide logic, validating metrics, clarifying ambiguities live with users, and persisting wave memory so future waves generate automatically.",
    role: "AI & Multi-Agent Systems Engineer at C5i · Blueprint Reverse-Engineering, Validation & Persistent Wave Memory",
    problem:
      "Analytics and client delivery teams across the organization had to produce and deliver complex PowerPoint presentations (PPTX) from large Excel datasets on a recurring weekly, biweekly, or monthly cadence ('waves'). Even though the prior wave's Excel file and completed PPTX already existed, every new wave of Excel data required analysts to manually recalculate KPIs, rebuild charts and tables, and rewrite slide takeaways from scratch—consuming hundreds of hours in repetitive rework.",
    solution:
      "Engineered Data to Deck, an end-to-end multi-agent automation platform that eliminates recurring presentation rework. On the first run, users upload three inputs: the Previous Wave Excel dataset, the Previously Delivered PPTX deck, and the New Wave Excel dataset. A coordinated team of AI agents analyzes the historical Excel-to-PPTX pair to reverse-engineer how every table, chart, metric callout, and executive headline was constructed, then applies that blueprint to the New Wave Excel data to generate a brand-new, client-ready PPTX. The workflow includes automated data-to-slide validations, an interactive Human-in-the-Loop (HITL) clarification chat whenever agents have doubts, and a Persistent Wave Memory layer that remembers the learned blueprint so subsequent waves require zero re-analysis.",
    features: [
      {
        name: "Multi-Agent Excel-to-PPTX Reverse-Engineering & Blueprint Extraction",
        whatItDoes:
          "Analyzes the Previous Wave Excel file alongside the Previously Delivered PPTX deck to automatically understand how every slide, chart, table, and narrative insight was derived from the underlying data.",
        howItWorks:
          "Specialized schema-mapping and slide-inspection agents parse Excel sheets, formulas, pivot structures, and PPTX XML shape trees—correlating numerical values, series labels, and text callouts to synthesize a deterministic Data-to-Slide Transformation Blueprint.",
        stack: ["Multi-Agent Orchestration", "Python", "openpyxl / pandas", "python-pptx", "Azure OpenAI (GPT-4o)"],
        whyThisApproach:
          "Instead of forcing analysts to manually code templates for every client report, the agents learn the template and business logic directly from the prior wave's Excel and delivered PPTX.",
      },
      {
        name: "Automated New Wave PPTX Generation & Multi-Layer Validation",
        whatItDoes:
          "Executes the learned transformation blueprint on the New Wave Excel dataset to generate an updated PowerPoint presentation with refreshed charts, tables, and AI-written executive summaries—backed by automated accuracy checks.",
        howItWorks:
          "A generation agent populates native PowerPoint chart series, tables, and dynamic text placeholders while a dedicated Validation Agent cross-checks every slide number against pandas/SQL aggregations on the New Wave Excel to guarantee 100% numerical fidelity.",
        stack: ["Validation Agent", "pandas / Polars", "python-pptx", "Automated Schema & Math Verification"],
        whyThisApproach:
          "Client-facing weekly and monthly deliverables demand zero numerical discrepancies; automated multi-step validation ensures numbers on every slide match the source Excel before download.",
      },
      {
        name: "Interactive Human-in-the-Loop (HITL) Live Clarification Workflow",
        whatItDoes:
          "Pauses and asks the user targeted clarifying questions in real time whenever an agent encounters structural shifts, ambiguous column mappings, or edge cases in the new wave data.",
        howItWorks:
          "When confidence on a mapping or calculation drops below threshold (e.g., a renamed column, a new product SKU, or an anomalous metric delta), the Clarification Agent surfaces an interactive prompt in the live workspace, incorporates the user's guidance immediately, and resumes execution.",
        stack: ["Human-in-the-Loop (HITL) State Machine", "WebSockets / Streaming API", "FastAPI", "React / Next.js"],
        whyThisApproach:
          "Real-world weekly/monthly datasets frequently evolve; asking the analyst live resolves ambiguity in seconds rather than failing silently or producing an incorrect slide.",
      },
      {
        name: "Persistent Wave Memory for Zero-Re-Learning Future Cadences",
        whatItDoes:
          "Stores all reverse-engineered slide blueprints, transformation formulas, validation rules, and user-approved clarifications in persistent memory so the next weekly, biweekly, or monthly wave runs instantaneously without re-thinking.",
        howItWorks:
          "Persists versioned dataset-to-deck knowledge graphs and user feedback rules in a structured memory store keyed by project and report cadence, allowing subsequent waves to take only the New Wave Excel file and generate the updated PPTX directly.",
        stack: ["Persistent Agent Memory", "PostgreSQL / Vector Memory Store", "JSON Transformation Blueprints"],
        whyThisApproach:
          "Eliminates redundant LLM reasoning cost and latency on recurring waves, turning a multi-day manual reporting cycle into a repeatable one-click workflow.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Tri-Input Ingestion & Parser Layer",
          responsibility:
            "Ingests Previous Wave Excel, Previously Delivered PPTX, and New Wave Excel files, extracting tabular schemas, formulas, and slide XML object trees.",
        },
        {
          name: "Multi-Agent Blueprint & Clarification Layer",
          responsibility:
            "Coordinates Reverse-Engineering, Transformation, Validation, and Human-in-the-Loop Clarification agents to map data-to-slide logic and resolve live user doubts.",
        },
        {
          name: "Persistent Wave Memory Layer",
          responsibility:
            "Saves validated data-to-slide mappings, aggregation rules, and user clarifications so future weekly/biweekly/monthly waves bypass re-discovery.",
        },
        {
          name: "Automated PPTX Synthesis & Verification Layer",
          responsibility:
            "Renders native PowerPoint charts, tables, and executive commentary for the new wave and runs end-to-end numerical audits before export.",
        },
      ],
      dataFlow: [
        "User uploads the Previous Wave Excel, Previously Delivered PPTX, and New Wave Excel (or selects an existing project with saved Wave Memory).",
        "Reverse-Engineering Agents align historical Excel cells/aggregations with PPTX slide elements to construct the transformation blueprint.",
        "If any ambiguity or schema change is detected, the Clarification Agent prompts the user live and records the answer.",
        "The learned blueprint and user clarifications are committed to Persistent Wave Memory for all future waves.",
        "Generation and Validation Agents compute new wave metrics, verify 100% data accuracy, and output the finished client-ready PPTX deck.",
      ],
    },
    decisions: [
      {
        title: "Persisting learned blueprints in Wave Memory across recurring cadences",
        options: ["Re-run LLM reverse-engineering on every wave", "Store deterministic transformation blueprints and user clarifications in Persistent Wave Memory"],
        chosen: "Persist the reverse-engineered blueprint and HITL clarifications after the initial wave so future waves execute deterministically.",
        tradeoff:
          "Drastically cuts generation time, token usage, and variance on Wave 2, Wave 3, and beyond while guaranteeing consistent slide formatting.",
      },
      {
        title: "Embedding live Human-in-the-Loop (HITL) clarification inside the agent loop",
        options: ["Best-guess autonomous execution", "Interactive live agent clarification when confidence is low"],
        chosen: "Have agents proactively ask the user when encountering ambiguous formulas or schema shifts, then memorize the user's answer.",
        tradeoff:
          "Combines autonomous speed with human domain certainty, ensuring the generated client deck is trusted on the first pass.",
      },
    ],
    challenges: [
      {
        problem:
          "Inferring how complex multi-column Excel calculations and pivot tables map to specific PowerPoint charts, tables, and narrative callouts.",
        resolution:
          "Combined structural PPTX XML inspection with value-matching heuristics and LLM reasoning agents to trace every slide number back to its exact Excel formula or aggregation.",
      },
      {
        problem:
          "Handling slight schema changes or new categories between weekly/monthly Excel waves without breaking automated slide generation.",
        resolution:
          "Built schema-diff detection that triggers the live HITL clarification prompt and updates the Persistent Wave Memory blueprint in place.",
      },
    ],
    myContribution: [
      "Architected and built the multi-agent workflow that reverse-engineers Previous Wave Excel + PPTX pairs into reusable transformation blueprints at C5i.",
      "Engineered the automated PPTX generation and numerical validation pipeline ensuring 100% fidelity between New Wave Excel data and generated slides.",
      "Designed and implemented the interactive Human-in-the-Loop live clarification flow and Persistent Wave Memory system for recurring weekly, biweekly, and monthly client deliverables.",
    ],
    outcomes: [
      {
        value: "Zero Manual Rework",
        label: "on recurring weekly, biweekly & monthly Excel-to-PPTX client waves",
        status: "verified",
      },
      {
        value: "Persistent Wave Memory",
        label: "remembers learned slide logic & user clarifications across all future waves",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "Multi-Agent Orchestration",
      "Persistent Agent Memory",
      "Azure OpenAI (GPT-4o)",
      "python-pptx / pandas",
      "FastAPI & WebSockets",
      "React / Next.js",
    ],
    images: [
      {
        src: "/images/projects/data-to-deck-1.png",
        alt: "3D isometric architecture of Data to Deck showing Previous Wave Excel, Previous Delivered PPTX, and New Wave Excel flowing into the Multi-Agent Mapping Core, Persistent Wave Memory Vault, and HITL Validation Engine.",
        caption: "Data to Deck architecture: Tri-input ingestion, multi-agent blueprint discovery, live user clarification, and Persistent Wave Memory.",
      },
      {
        src: "/images/projects/data-to-deck-2.png",
        alt: "3D isometric Data to Deck workspace showing automated Wave N PPTX slide generation, 100% Data Validated badges, Live Agent Clarification Chat, and Persistent Wave Memory status.",
        caption: "Live multi-agent workspace with interactive user clarification, automated slide validation, and zero-relearning Wave Memory.",
      },
    ],
  },
  {
    slug: "retailer-ai-maturity-microsoft",
    title: "Retailer AI Maturity: 191-Question Agentic AEO, Site-Scraping & Retail AI Readiness Platform",
    client: "Microsoft — Global Retail Account & Channel Ecosystem (via C5i)",
    domain: "Retail AI Readiness & AEO Intelligence · 4 Dimensions (D1–D4), 5 Maturity Levels (L1–L5) & Agentic Auditing",
    year: null,
    summary:
      "Built an automated retail AI readiness and Answer Engine Optimization (AEO) assessment platform for Microsoft across global retailers (Best Buy, Amazon, Currys, Yodobashi Camera, JB Hi-Fi, Ingram Micro) and product lines (Surface, Copilot+ PCs, Windows 11, Microsoft 365)—evaluating 191 questions across 4 dimensions (D1–D4) and 5 sequential maturity levels (L1–L5: Crawl, Walk, Run) via automated scraping, assistant probing, and evidence registers.",
    role: "AI & Data Systems Engineer at C5i · Automated Site/AEO Scraping Probes, D1–D4 Level-Gate Scoring & Evidence Register",
    problem:
      "As shoppers increasingly rely on AI answer engines and conversational shopping assistants to discover and purchase PCs and software, Microsoft needed a rigorous, objective way to measure whether global retail partners (Best Buy, Amazon, Currys, Yodobashi, JB Hi-Fi, Ingram Micro) are truly 'AI-ready' across Surface, Copilot+ PCs, Windows 11, and Microsoft 365. Without automated technical checks across hundreds of product pages, sitemaps, schemas, and on-site assistants, account teams could not pinpoint where a retailer's AI readiness stopped or prioritize which gaps to fix to drive higher AI-led conversion.",
    solution:
      "Engineered the Retailer AI Maturity platform—an agentic web-scraping, verification, and benchmarking system that evaluates global retailers monthly across a 191-question rubric spanning 4 core dimensions (D1: Discoverability & AEO Readiness, D2: Data & Content Foundation, D3: AI & Agent Adoption, D4: Operating Model & Measurement), 5 sequential maturity levels (L1 Ad hoc, L2 Defined [Crawl] -> L3 Operational [Walk] -> L4 Managed, L5 Adaptive [Run]), and 3 analytical lenses (Maturity, Competitive · Vendor vs. Apple/Dell/HP/Lenovo/ASUS/Acer, and Competitive · Retailer vs. Walmart/Costco/Target/Newegg/Micro Center). Automated probes inspect raw server HTML, `/llms.txt`, `robots.txt` AI crawler permissions (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`), JSON-LD structured data, NPU TOPS/Copilot+ spec completeness, and live retailer AI shopping assistants—producing audited dimension scores, 'Where It Stopped' diagnostics, and prioritized account action plans.",
    features: [
      {
        name: "191-Question Multi-Probe Scraping Across 4 Dimensions (D1–D4)",
        whatItDoes:
          "Automates technical site checks, on-site AI assistant probes, answer-engine observations, and press/careers scraping across 191 structured questions covering D1 (82 questions), D2 (19 questions), D3 (58 questions), and D4 (32 questions).",
        howItWorks:
          "Executes targeted monthly crawls per retailer, market (US, CA, GB, JP, AU), and product family (Surface, Copilot+ PCs, Windows 11, M365) to verify HTTP 200 vs. soft-404 status, non-JS server HTML rendering, `robots.txt` rules for named AI crawlers, `/llms.txt`, XML sitemap `lastmod` recency, JSON-LD schema accuracy, GTIN/MPN identifiers, and structured AI hardware attributes (NPU TOPS, Copilot+ badges).",
        stack: ["Python", "Playwright / Automated Web Probes", "JSON-LD & Schema Validators", "LLM Evidence Evaluators"],
        whyThisApproach:
          "Replaces subjective self-assessments with repeatable, empirical measurements taken directly from each retailer's live production pages, feeds, and AI assistants.",
      },
      {
        name: "Sequential L1–L5 Level-Gate Scoring (Crawl · Walk · Run) & 3 Lenses",
        whatItDoes:
          "Computes both weighted question averages (× 5 scale) and strict sequential level-gate scores from L1 (Ad hoc) and L2 (Defined — Crawl), to L3 (Operational — Walk), through L4 (Managed) and L5 (Adaptive — Run), while separating Maturity, Competitive Vendor, and Competitive Retailer lenses.",
        howItWorks:
          "Rates each question as Yes/Good (1.0), Partial/Okay (0.5), or No/Not Disclosed/Needs Optimization (0.0) while excluding N/A checks. A dimension advances to the next maturity level only when weighted evidence reaches the 35% gate threshold in strict sequence from L1 upward, and flags any score whose key evidence is older than 12 months (`H`).",
        stack: ["Sequential Level-Gate Scoring Engine", "FastAPI", "PostgreSQL / SQLite", "React / TypeScript"],
        whyThisApproach:
          "Ensures a flashy top-of-funnel AI feature cannot mask broken foundational crawlability or missing structured product data at L1/L2.",
      },
      {
        name: "Evidence Register, Human-in-the-Loop Approval & Crawler Allowlisting",
        whatItDoes:
          "Tracks every piece of scraped and primary-source evidence in a versioned Evidence Register with confidence ratings, 12-month freshness tracking, human review workflows, and automated retailer crawler allowlisting requests.",
        howItWorks:
          "Stores dated source citations, claim scope, and validation flags per question. Product evidence requiring human verification routes to an admin approval queue (`Human-verified` vs. `Rejected for cell`), while checks blocked by anti-bot rules are isolated from the score and paired with pre-drafted crawler allowlisting emails for the retailer's web team.",
        stack: ["Evidence Register v2", "HITL Approval Workflow", "Score Snapshot Versioning", "Microsoft Entra ID SSO"],
        whyThisApproach:
          "Gives Microsoft account leads auditable proof behind every single score when engaging retail executives, while preventing bot blocks from unfairly penalizing a retailer.",
      },
      {
        name: "Competitor & Peer Benchmarking, Journey Readiness & Next Actions",
        whatItDoes:
          "Benchmarks Microsoft SKUs against competing OEMs (Apple M-series / Apple Intelligence, Dell, HP, Lenovo, ASUS, Acer) and compares peer retailers side-by-side, translating gaps into prioritized Next Actions and Excel/PDF scorecards.",
        howItWorks:
          "Maps D1–D4 scores onto Customer and Distributor Journey stages (taking the lower of connected dimensions as stage readiness), pinpoints exact 'Where It Stopped' bottlenecks and missing evidence records needed to reach the next 35% level gate, and generates one-click multi-sheet Excel workbooks and print-ready executive briefings.",
        stack: ["React", "ExcelJS Workbook Exporter", "Customer & Distributor Journey Mapper", "Action Plan Prioritizer"],
        whyThisApproach:
          "Turns diagnostic readiness scores into an actionable commercial roadmap that helps Microsoft push retailers to unlock AI-driven product discovery and conversion.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Multi-Modal Scraping & Observation Probe Layer",
          responsibility:
            "Performs direct site observation (raw HTML, `/llms.txt`, `robots.txt`, sitemaps, JSON-LD, Core Web Vitals), live retailer AI assistant & cart journey probes, answer-engine checks, and earnings/careers scraping.",
        },
        {
          name: "Evidence Register & Validation Layer",
          responsibility:
            "Stores every finding with source URIs, confidence ratings, 12-month/30-day freshness policies, validation flags, HITL evidence approvals, and crawler allowlisting state.",
        },
        {
          name: "D1–D4 & Sequential L1–L5 Scoring Engine",
          responsibility:
            "Evaluates 191 questions across Maturity, Competitive Vendor, and Competitive Retailer lenses, computing sequential 35% level gates (Crawl/Walk/Run) and versioned monthly score snapshots.",
        },
        {
          name: "Executive Portal, Journey Mapper & Action Hub",
          responsibility:
            "Serves Microsoft SSO-authenticated interactive dashboards for Account Assessment, Dimension Deep-Dives, OEM/Retailer Comparisons, Evidence Gaps, and Next Actions with Excel/HTML report exports.",
        },
      ],
      dataFlow: [
        "Monthly assessment runs target global retailers (Best Buy, Amazon, Currys, Yodobashi, JB Hi-Fi, Ingram Micro) across markets and Microsoft SKU lines (Surface, Copilot+ PCs, Windows 11, M365).",
        "Automated site and assistant probes collect structured evidence across 191 questions spanning D1 (Discoverability & AEO), D2 (Data & Content), D3 (AI & Agent Adoption), and D4 (Operating Model & Measurement).",
        "Findings populate the Evidence Register; blocked checks trigger allowlisting workflows and ambiguous product evidence routes to human review.",
        "The scoring engine calculates question scores (1 / 0.5 / 0), dimension averages (× 5), and sequential L1–L5 level gates (Crawl -> Walk -> Run).",
        "Microsoft account teams review 'Where It Stopped' diagnostics, OEM/peer benchmarks, and prioritized Next Actions to guide retailers toward higher AI maturity.",
      ],
    },
    decisions: [
      {
        title: "Sequential L1–L5 level-gate scoring alongside weighted dimension averages",
        options: ["Simple flat percentage average only", "Sequential L1–L5 level gates (35% threshold per level) + weighted average progress"],
        chosen: "Require every lower level from L1 upward to meet the 35% weighted gate before counting higher levels, while displaying decimal progress toward the next level.",
        tradeoff:
          "Prevents retailers from achieving a high 'Run' rating through PR announcements if foundational crawlability, schema markup, or SKU spec completeness at L1/L2 is broken.",
      },
      {
        title: "Separating Competitive Vendor & Retailer lenses from the core Maturity score",
        options: ["Blend OEM share-of-shelf into the AI maturity score", "Report Competitive Vendor and Competitive Retailer lenses beside the Maturity score"],
        chosen: "Keep the 98 Maturity questions pure for D1–D4 scoring while reporting the 64 Vendor (Microsoft vs. Apple/Dell/HP/Lenovo) and 29 Retailer benchmark questions side-by-side.",
        tradeoff:
          "Maintains an objective, defensible technical readiness score for the retailer while still giving Microsoft commercial visibility into Copilot+ PC vs. Apple/OEM positioning.",
      },
    ],
    challenges: [
      {
        problem:
          "Distinguishing genuine lack of retailer AI readiness from anti-bot blocks (CAPTCHAs, WAF blocks) during automated site and cart-journey scraping.",
        resolution:
          "Built a dedicated Access Requests & Crawler Allowlisting module that marks blocked checks as 'Not assessed – access blocked', excludes them from the score denominator, and generates ready-to-send allowlisting requests for the retailer's web team.",
      },
      {
        problem:
          "Auditing both static HTML/schema signals for AI answer engines and dynamic conversational behavior inside each retailer's on-site AI shopping assistant.",
        resolution:
          "Combined raw non-JS HTTP inspection (`robots.txt`, `/llms.txt`, JSON-LD, canonicals) with scripted browser & assistant journey probes that test Copilot+ PC discovery, spec explanation, and Microsoft 365 attach recommendations.",
      },
    ],
    myContribution: [
      "Architected and built the automated web-scraping and AEO verification pipelines across the 191-question rubric (D1–D4) for Microsoft's global retail accounts at C5i.",
      "Engineered the sequential L1–L5 (Crawl, Walk, Run) level-gate scoring engine, Evidence Register v2, freshness tracking, and 'Where It Stopped' diagnostic logic.",
      "Developed the full-stack assessment portal featuring OEM/peer benchmarking (Copilot+ PCs & Surface vs. Apple, Dell, HP, Lenovo), Customer/Distributor journey mapping, and prioritized Next Actions.",
    ],
    outcomes: [
      {
        value: "191 Automated Checks",
        label: "across D1–D4 (AEO, Data, AI Agents & Operating Model) and L1–L5 levels",
        status: "verified",
      },
      {
        value: "Global Retail Accounts",
        label: "assessed monthly (Best Buy, Amazon, Currys, Yodobashi, JB Hi-Fi, Ingram Micro)",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "Playwright & AEO Scrapers",
      "FastAPI",
      "React / TypeScript",
      "Azure App Service & SSO",
      "JSON-LD & Schema Auditing",
      "LLM Evidence Evaluation",
    ],
    images: [
      {
        src: "/images/projects/retailer-ai-maturity-1.png",
        alt: "3D isometric architecture of Retailer AI Maturity showing automated site, AEO, and AI assistant probes across global retailers feeding the D1–D4 Scoring Engine, Evidence Register, and L1–L5 Crawl/Walk/Run gates.",
        caption: "Retailer AI Maturity architecture: 191-question multi-probe scraping, D1–D4 scoring engine, Evidence Register, and L1–L5 level gates.",
      },
      {
        src: "/images/projects/retailer-ai-maturity-2.png",
        alt: "3D isometric Retailer AI Maturity dashboard displaying D1–D4 dimension scores, Crawl/Walk/Run stage progression, 191-question AEO & schema checks, and Microsoft vs. OEM/Retailer benchmarks.",
        caption: "Executive assessment portal showing D1–D4 scores, `/llms.txt` & AI crawler checks, and Copilot+ PC / Surface competitive benchmarks.",
      },
    ],
  },
  {
    slug: "beacon-retail-sku-execution-scorecard",
    title: "Beacon: Automated Retail SKU Execution Scorecard & Weekly Partner Action-Email Engine",
    client: "Microsoft — Execution Excellence Online & Global Retail Partners (via C5i)",
    domain: "Retail Execution & Digital Shelf Intelligence · Automated SKU Auditing, Score Recovery & Weekly Digest Engine",
    year: null,
    summary:
      "Built an automated digital-shelf auditing and weekly HTML scorecard email engine for Microsoft's global retail partners across Surface and Microsoft 365 portfolios—scraping every SKU for product descriptions, AI/Copilot feature bullets, PDP videos, image galleries, minimum review counts, feature comparison tables, and cart attach UX, then delivering personalized weekly action plans that quantify exact score recovery potential per SKU.",
    role: "AI & Data Automation Engineer at C5i · Multi-Retailer SKU Scraping, Recovery Impact Scoring & Automated Weekly Email Engine",
    problem:
      "During the online product discovery, learning, and purchase phases, missing digital-shelf elements—such as absent AI/Copilot+ feature bullets, missing product videos or photo galleries, incomplete PDP specifications, low review counts, or broken M365 and accessory cross-sell popups in the cart—directly hurt customer comprehension and conversion across Microsoft retail partners. Tracking hundreds of Surface and M365 SKUs across global retailer webstores and communicating weekly SKU-level fixes manually was unscalable.",
    solution:
      "Engineered Beacon, an automated SKU execution tracking and weekly partner scorecard email platform for Microsoft Execution Excellence Online. Every week, Beacon scrapes all tracked Microsoft Surface and M365 SKUs across global retail partner webstores (such as Yamada and regional retail leaders), evaluates each listing against a comprehensive digital-shelf rubric (Categorization, Main Image & Gallery Photos, Specs PDP, Video PDP, Rich/A+ Content, AI/Copilot Product Bullets, Minimum Reviews, Feature Comparison Tables, and Surface Accessory / M365 Cart Attach UX), and dispatches customized, executive-ready HTML performance reports. Each weekly email highlights Week-over-Week (WoW) score trends, celebrates 100% execution wins, isolates 'Priority Drivers to Fix' with root-cause analysis ('What Happened?') and CMS remediation steps ('Recommended Action'), ranks the top Priority SKUs by score recovery potential (+%), and tracks partner task adoption velocity week over week.",
    features: [
      {
        name: "Automated SKU-Level Digital Shelf Scraping Across Surface & M365",
        whatItDoes:
          "Continuously scrapes and audits every tracked Microsoft Surface and M365 SKU across global retail partner websites to verify whether shoppers have complete discovery, learning, and purchase assets on the product detail page (PDP) and cart flow.",
        howItWorks:
          "Automated crawlers inspect each SKU listing across Discover, Learn, and Buy checkpoints: Product Categorization, Main Image & Photo Gallery count, Specs PDP & Description completeness, Video PDP presence, Rich/A+ Content, localized AI/Copilot+ feature bullets, minimum customer review thresholds, M365 Personal vs. Family feature comparison tables, and in-cart Accessory / M365 bundle attach popups.",
        stack: ["Python", "Playwright / BeautifulSoup Scrapers", "SKU Compliance Rule Engine", "Data Pipelines"],
        whyThisApproach:
          "Ensures every single factor that influences how well a new shopper understands and buys a Microsoft product is measured objectively at the individual SKU level every week.",
      },
      {
        name: "Driver Recovery Calculator & Priority SKU Ranking Engine",
        whatItDoes:
          "Quantifies the exact Week-over-Week (WoW) score delta, Pending Opportunity (+%), Driver Recovery potential, and per-SKU portfolio impact so retailers know precisely which fixes yield the fastest scorecard gain.",
        howItWorks:
          "Computes weighted execution scores per portfolio (e.g., Surface Portfolio vs. M365 Portfolio), attributes WoW drops to specific drivers (such as missing AI/Copilot bullets across 42 Copilot+ PC SKUs or missing M365 checkout attach across 142 Surface devices), and ranks the Top 5 Priority SKUs by multi-metric recovery potential.",
        stack: ["Python", "pandas / NumPy", "Weighted Score Recovery Model", "SQL / Analytical Store"],
        whyThisApproach:
          "Retail merchandisers have limited bandwidth; ranking the exact target SKUs and quantifying recovery (e.g., '+27.50% driver recovery / +3.44% portfolio impact') turns raw audit data into an immediate weekly checklist.",
      },
      {
        name: "AI-Generated Weekly Executive Summary & Root-Cause Action Cards",
        whatItDoes:
          "Generates personalized weekly HTML scorecard emails featuring an AI Executive Summary, Weekly Wins callouts, and structured 'What Happened?' + 'Recommended Action' cards for every critical gap.",
        howItWorks:
          "Synthesizes weekly telemetry deltas and catalog assortment shifts into natural-language narratives that explain why a metric dropped (e.g., template updates removing A+ comparison tables or new Copilot+ PC listings missing localized AI bullets) and prescribes the exact CMS or syndication portal action required.",
        stack: ["Azure OpenAI / LLMs", "Jinja2 / Responsive HTML Email Templates", "Automated SMTP / Graph Email Dispatcher"],
        whyThisApproach:
          "Delivers insights directly into retail account and partner merchandising inboxes every week with zero dashboard login friction.",
      },
      {
        name: "Closed-Loop Execution & Momentum Velocity Tracking",
        whatItDoes:
          "Tracks week-over-week partner task resolution—measuring Growth Realized (+%), Pending Opportunity (+%), Assortment Shift impact, and Combined Adoption Velocity (% of recommended tasks resolved).",
        howItWorks:
          "Compares the current week's SKU scrape against the prior week's flagged driver gaps and target SKUs, automatically detecting which recommended fixes the retailer implemented and crediting their realized score recovery.",
        stack: ["WoW Delta & Adoption Tracker", "Python", "Automated Weekly Scheduler"],
        whyThisApproach:
          "Creates a closed accountability loop between Microsoft account managers and retail partners, driving sustained improvements in product discovery and online conversion.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Multi-Retailer PDP & Cart Journey Scraping Layer",
          responsibility:
            "Scrapes all Microsoft Surface and M365 SKUs across global retail partner webstores, capturing PDP descriptions, AI/Copilot bullets, videos, photos, reviews, comparison tables, and cart cross-sell flows.",
        },
        {
          name: "SKU Execution Scoring & Recovery Impact Engine",
          responsibility:
            "Evaluates Discover, Learn, and Buy metrics per SKU, calculates WoW trends and Pending Opportunity (+%), and ranks Priority Drivers and Target SKUs by score recovery impact.",
        },
        {
          name: "AI Narrative & Weekly Scorecard Email Generator",
          responsibility:
            "Synthesizes Executive Summaries, 'What Happened?' root-cause diagnostics, and 'Recommended Action' steps into rich, responsive HTML partner scorecard emails.",
        },
        {
          name: "Closed-Loop Momentum & Adoption Tracker",
          responsibility:
            "Audits resolved vs. pending partner tasks across weekly runs to report Growth Realized, Assortment Shift, and Combined Adoption Velocity.",
        },
      ],
      dataFlow: [
        "Weekly scheduled scrapers inspect every Microsoft Surface and M365 SKU across target retailer webstores.",
        "Each SKU is audited across discovery and conversion metrics (Categorization, Main Image, Specs PDP, Video PDP, Rich Content, AI Bullets, Reviews, Feature Comparison, and M365/Accessory Cart Attach).",
        "The scoring engine calculates portfolio execution scores, WoW deltas, Priority Drivers to Fix, and Top 5 Priority SKUs with exact +recovery percentages.",
        "LLMs generate the customized Executive Summary, 'What Happened?' explanations, and 'Recommended Action' remedies.",
        "Personalized HTML scorecard emails are automatically delivered to retail partners and account teams, while resolved tasks feed next week's Momentum Review.",
      ],
    },
    decisions: [
      {
        title: "Pushing SKU-level action plans via automated weekly HTML emails",
        options: ["Passive BI dashboard requiring manual login", "Automated, self-contained weekly HTML scorecard emails with exact Target SKUs and recovery %"],
        chosen: "Deliver rich, visual weekly HTML scorecard emails directly to retail partner and account teams.",
        tradeoff:
          "Requires strict email-client HTML/CSS rendering engineering, but maximizes weekly partner engagement and task resolution velocity.",
      },
      {
        title: "Pairing every metric drop with 'What Happened?', 'Recommended Action', and Target SKU lists",
        options: ["Report aggregate category percentages only", "Tie every driver gap to root-cause explanation, exact CMS fix, and ranked Target SKUs"],
        chosen: "Show the exact flagged SKUs and step-by-step CMS remediation alongside the quantified score recovery potential.",
        tradeoff:
          "Allows retail webstore merchandisers to fix the highest-impact Surface and M365 listings immediately without hunting through hundreds of product pages.",
      },
    ],
    challenges: [
      {
        problem:
          "Verifying both static PDP content (AI/Copilot bullets, videos, photos, review counts, comparison tables) and interactive cart attach flows (Surface accessories and M365 bundle popups) across diverse retailer DOM structures.",
        resolution:
          "Built modular Playwright and DOM inspection pipelines capable of evaluating both PDP rich-content blocks and simulated add-to-cart / checkout cross-sell journeys.",
      },
      {
        problem:
          "Separating genuine partner merchandising improvements from catalog assortment shifts (newly added or discontinued SKUs) in week-over-week score changes.",
        resolution:
          "Engineered a 3-way Momentum decomposition that explicitly splits WoW changes into Growth Realized (from resolved tasks), Pending Opportunity, and Assortment Shift.",
      },
    ],
    myContribution: [
      "Architected and built the multi-retailer SKU scraping and digital-shelf auditing pipeline across Surface and M365 portfolios for Microsoft at C5i.",
      "Engineered the Driver Recovery Calculator, Priority SKU ranking logic, and 3-way Momentum & Adoption Velocity tracker.",
      "Developed the AI narrative generator ('Executive Summary', 'What Happened?', 'Recommended Action') and the automated weekly HTML partner scorecard email engine.",
    ],
    outcomes: [
      {
        value: "Automated Weekly Digests",
        label: "auditing Surface & M365 SKUs across photos, videos, AI bullets, specs & cart attach",
        status: "verified",
      },
      {
        value: "SKU-Level Recovery Tasks",
        label: "quantifying exact +score impact and tracking weekly partner adoption velocity",
        status: "verified",
      },
    ],
    stack: [
      "Python",
      "Playwright & Web Scrapers",
      "Azure OpenAI (LLMs)",
      "pandas & Score Recovery Engine",
      "Responsive HTML Email Engine",
      "Automated Weekly Pipelines",
    ],
    images: [
      {
        src: "/images/projects/beacon-microsoft-1.png",
        alt: "3D isometric architecture of Beacon showing automated retail PDP and cart scrapers auditing Surface and M365 SKUs across descriptions, AI/Copilot bullets, videos, photos, reviews, and cart attach to generate weekly partner scorecard emails.",
        caption: "Beacon architecture: Automated SKU digital-shelf scraping, recovery impact scoring, and weekly partner action-email dispatch.",
      },
      {
        src: "/images/projects/beacon-microsoft-2.png",
        alt: "3D isometric Beacon Weekly Partner Execution Scorecard displaying Surface and M365 portfolio scores, Priority Drivers to Fix, Target SKUs with +recovery impact, and 72% Partner Task Adoption Velocity.",
        caption: "Weekly Partner Execution Scorecard highlighting Surface & M365 metrics, Priority Drivers, Target SKUs, and Momentum Velocity.",
      },
    ],
  },
];
