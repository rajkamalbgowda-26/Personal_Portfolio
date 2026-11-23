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
    title: "Digital Banking Core: Video-Based Digital Onboarding",
    client: "Tier-1 international retail bank (via Modefin)",
    domain: "Fintech · Digital Onboarding & KYC",
    year: 2022,
    summary:
      "Replaced paper-heavy branch onboarding with a self-led and assisted digital flow, using OCR, liveness detection, and facial match to verify identity.",
    // TODO(owner): confirm exact role wording.
    role: "Full-Stack Python Engineer with AI ownership on the onboarding workstream",
    problem:
      "Customer onboarding required up to 5 business days for manual document handling, physical verification, and branch visits. Manual KYC was slow, expensive, and hard to scale to remote customers.",
    solution:
      "The onboarding flow combines customer-led and agent-assisted journeys with document capture, OCR, liveness detection, facial matching, and configurable pass, reject, or manual-review outcomes. Integration details beyond these stated capabilities need confirmation.",
    features: [
      {
        name: "Self-led onboarding",
        whatItDoes:
          "Lets a customer complete onboarding on a mobile device or web experience and submit identity documents without starting at a branch.",
        howItWorks:
          "The customer follows a digital flow and uploads identity documents for downstream verification. Specific screens, upload protocols, and session handling are not specified.",
        stack: ["Mobile and web", "Document upload"],
        whyThisApproach:
          "A self-led path gives remote customers a way to begin onboarding digitally instead of depending on branch visits.",
      },
      {
        name: "Assisted onboarding",
        whatItDoes:
          "Provides an agent-driven path for customers who need assistance completing onboarding.",
        howItWorks:
          "An agent guides the customer through the onboarding steps. The operating model and real-time interaction mechanism need confirmation.",
        stack: ["Agent workflow", "Digital onboarding"],
        whyThisApproach:
          "Keeping an assisted option supports customers who cannot complete the self-led journey independently.",
      },
      {
        name: "Document capture and OCR",
        whatItDoes:
          "Captures identity documents and extracts their fields into backend fields for review and verification.",
        howItWorks:
          "Document images are submitted to OCR, which extracts text fields that can be passed to downstream onboarding checks. Provider, preprocessing, confidence thresholds, and validation rules need confirmation.",
        stack: ["Document capture", "OCR", "Backend fields"],
        whyThisApproach:
          "Extracted fields reduce dependence on manually transcribing identity details from documents.",
      },
      {
        name: "Liveness detection",
        whatItDoes:
          "Checks that a live person is present during identity verification.",
        howItWorks:
          "A liveness check evaluates the submitted camera input. Whether this uses passive checks, active prompts, or both needs confirmation.",
        stack: ["Camera input", "Liveness detection"],
        whyThisApproach:
          "Liveness is an additional identity signal beyond comparing two static images.",
      },
      {
        name: "Facial match",
        whatItDoes:
          "Compares the identity-document photo with the customer's selfie or video input.",
        howItWorks:
          "A face comparison produces a match result from the document image and selfie or video. The model, thresholds, and handling of low-confidence results need confirmation.",
        stack: ["Face comparison", "Selfie or video"],
        whyThisApproach:
          "Comparing the submitted face with the ID photo helps validate that the person completing onboarding matches the document.",
      },
      {
        name: "Pass, reject, and manual-review rules",
        whatItDoes:
          "Routes a verification case to pass, reject, or manual review using configurable business rules.",
        howItWorks:
          "Business rules evaluate verification outputs and select a case outcome. Exact inputs, rule configuration, and override permissions need confirmation.",
        stack: ["Business rules", "Verification outcomes"],
        whyThisApproach:
          "A manual-review route avoids forcing every uncertain case into an automatic pass or reject decision.",
      },
      {
        name: "Video KYC session",
        whatItDoes:
          "Supports video KYC as part of digital identity verification.",
        howItWorks:
          "// TODO(owner): describe the session flow and confirm whether it is live-agent or recorded video KYC.",
        stack: ["Video KYC"],
        whyThisApproach:
          "Video KYC is included in the stated onboarding product scope; its exact operating model needs confirmation.",
      },
      {
        name: "E-signature and account creation",
        whatItDoes:
          "Represents the possible completion step after identity checks.",
        howItWorks:
          "// TODO(owner): confirm whether e-signature and account creation were part of this implementation and describe the integration flow.",
        stack: ["// TODO(owner): confirm e-signature and account-creation technologies."],
        whyThisApproach:
          "// TODO(owner): confirm the business and technical reason for this step in the delivered flow.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Customer and agent experiences",
          responsibility:
            "Expose the self-led mobile/web flow and the assisted onboarding path.",
        },
        {
          name: "Capture and verification",
          responsibility:
            "Receive identity documents and camera input, then run OCR, liveness, and facial-match checks.",
        },
        {
          name: "Decisioning",
          responsibility:
            "Apply configurable business rules and route cases to pass, reject, or manual review.",
        },
        {
          name: "Banking completion",
          responsibility:
            "// TODO(owner): confirm account creation, e-signature, and core-banking integration responsibilities.",
        },
      ],
      dataFlow: [
        "Customer starts a self-led mobile/web flow or an agent-assisted flow.",
        "Customer captures or uploads identity documents.",
        "OCR extracts document fields into backend fields.",
        "Liveness detection checks that a live person is present.",
        "Facial matching compares the ID photo with selfie or video input.",
        "Configurable rules route the case to pass, reject, or manual review.",
        "// TODO(owner): confirm the video KYC session flow and any e-signature or account-creation steps.",
      ],
    },
    decisions: [
      {
        title: "Offer both self-led and assisted journeys",
        options: ["Self-led only", "Assisted only", "Self-led and assisted"],
        chosen: "Self-led and assisted journeys are in the supplied project scope.",
        tradeoff:
          "Two paths cover customers who can proceed independently and those who need help, while requiring the product to support both flows.",
      },
      {
        title: "Combine multiple identity signals",
        options: ["Document review alone", "Liveness alone", "OCR, liveness, and facial match"],
        chosen: "The supplied scope includes OCR, liveness detection, and facial match.",
        tradeoff:
          "The checks provide distinct document and person-verification signals; exact sequencing, thresholds, and operational cost need confirmation.",
      },
      {
        title: "Keep a manual-review outcome",
        options: ["Automatic pass/reject only", "Pass/reject/manual review"],
        chosen: "Configurable pass, reject, and manual-review rules.",
        tradeoff:
          "Manual review gives uncertain cases a human route, with additional operational handling compared with fully automated decisions.",
      },
      {
        title: "Video KYC operating model",
        options: ["Live agent", "Recorded video", "Other"],
        // TODO(owner): confirm which option was implemented.
        chosen: "To confirm",
        tradeoff:
          "// TODO(owner): describe the selected model's trade-offs after confirming the implementation.",
      },
    ],
    challenges: [
      {
        problem:
          "The previous onboarding process involved manual document handling, physical verification, and branch visits.",
        resolution:
          "The project scope introduced self-led and assisted digital flows with OCR, liveness, facial matching, and rule-based review routing.",
      },
      {
        problem:
          "Remote customers were difficult to serve through a branch-centered process.",
        resolution:
          "A mobile/web self-led journey provides a remote path, while assisted onboarding remains available for customers who need help.",
      },
      {
        problem:
          "// TODO(owner): provide a real delivery or technical challenge and how you personally resolved it.",
        resolution:
          "// TODO(owner): confirm the actual resolution; do not infer implementation details.",
      },
    ],
    myContribution: [
      "The supplied role description assigns full-stack Python engineering and AI ownership on the onboarding workstream; confirm the exact wording and boundaries.",
      "// TODO(owner): list the components you personally implemented, led, reviewed, or made decisions on.",
      "// TODO(owner): separate your individual contribution from work completed by the wider team.",
    ],
    outcomes: [
      {
        value: "Up to 90%",
        label: "lower physical KYC cost (vendor-stated; not a measured project result)",
        status: "vendor-claim",
      },
      {
        value: "< 5 mins",
        label: "onboarding turnaround",
        status: "TODO",
      },
      {
        value: "Up to 5 business days",
        label: "previous onboarding turnaround; reduction needs confirmation",
        status: "TODO",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "WebSockets",
      "OpenCV",
      "Azure Cloud",
      "Docker",
      "PostgreSQL",
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
    title: "Conversational Banking Chatbot for Customer Service",
    client:
      "Retail bank (via Modefin); reference case: Universal Merchant Bank, Ghana",
    domain: "Fintech · Conversational AI",
    // TODO(owner): confirm the project year.
    year: null,
    summary:
      "An AI chatbot that answers banking FAQs and handles routine customer requests across web and messaging channels, available beyond business hours.",
    // TODO(owner): confirm exact role wording.
    role: "Full-Stack Python Engineer with AI development",
    problem:
      "Customers waited for responses to routine questions, and support was unavailable outside business hours.",
    solution:
      "The stated solution is a conversational banking chatbot for FAQs and routine customer requests across web and messaging channels. Specific NLU, channel, handoff, banking API, and analytics implementation details need confirmation.",
    features: [
      {
        name: "FAQ and intent handling",
        whatItDoes:
          "Identifies common banking questions and maps customer messages to supported intents so the chatbot can respond to FAQs.",
        howItWorks:
          "Natural-language understanding classifies an incoming message or extracts an intent before response handling. Training data, entity design, confidence thresholds, and fallback behavior need confirmation.",
        stack: ["NLU"],
        whyThisApproach:
          "Intent-based handling gives routine questions a structured response path rather than requiring every conversation to be handled manually.",
      },
      {
        name: "Dialog management and conversation flows",
        whatItDoes:
          "Guides a conversation through the steps needed to answer a customer request.",
        howItWorks:
          "// TODO(owner): confirm whether Rasa, Dialogflow, or both were used, and which dialog responsibilities each covered.",
        stack: ["Rasa NLU", "Dialogflow"],
        whyThisApproach:
          "// TODO(owner): confirm why the selected conversation-management approach fit the delivered requirements.",
      },
      {
        name: "Channel integration",
        whatItDoes:
          "Makes the chatbot available through web and messaging channels.",
        howItWorks:
          "A channel integration receives the customer message and returns the chatbot response. Confirm whether web, mobile app, WhatsApp, or other channels were personally built.",
        stack: ["Web", "Messaging channels"],
        whyThisApproach:
          "Using customer-facing channels gives customers a way to ask routine questions outside staffed support hours.",
      },
      {
        name: "Human-agent handoff",
        whatItDoes:
          "May transfer a conversation to a human agent when the bot cannot resolve a query.",
        howItWorks:
          "// TODO(owner): confirm whether handoff was implemented, what triggers it, and how context is transferred.",
        stack: ["// TODO(owner): confirm agent handoff technology."],
        whyThisApproach:
          "// TODO(owner): confirm the operational reason and human-support workflow.",
      },
      {
        name: "Real-time messaging",
        whatItDoes:
          "Supports real-time exchange between the customer interface and chatbot service.",
        howItWorks:
          "WebSockets are listed in the proposed stack; confirm where they were used, the message lifecycle, and reconnect behavior.",
        stack: ["WebSockets"],
        whyThisApproach:
          "A real-time channel can deliver responses and conversation updates without repeatedly polling for new messages.",
      },
      {
        name: "Core banking API integration",
        whatItDoes:
          "May support customer account queries through core banking APIs.",
        howItWorks:
          "// TODO(owner): confirm whether this integration was implemented, which account queries were supported, and its authentication/authorization flow.",
        stack: ["Core banking APIs"],
        whyThisApproach:
          "// TODO(owner): confirm the approved use cases and safeguards for exposing account information through conversation.",
      },
      {
        name: "Analytics and conversation logs",
        whatItDoes:
          "May record conversations and provide analytics about chatbot use.",
        howItWorks:
          "// TODO(owner): confirm what events or messages were logged, retention/access controls, and which analytics were available.",
        stack: ["Conversation logs", "Analytics"],
        whyThisApproach:
          "// TODO(owner): confirm the operational or product decisions the recorded data supported.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Customer channels",
          responsibility:
            "Accept customer messages through the confirmed web and messaging surfaces.",
        },
        {
          name: "Conversation transport",
          responsibility:
            "// TODO(owner): confirm the role of WebSockets and any channel adapters.",
        },
        {
          name: "NLU and dialog management",
          responsibility:
            "Identify FAQ intents and manage the confirmed conversation flow technology.",
        },
        {
          name: "Banking service integration",
          responsibility:
            "// TODO(owner): confirm whether core banking APIs were connected and which queries they served.",
        },
        {
          name: "Human support and analytics",
          responsibility:
            "// TODO(owner): confirm whether agent handoff, conversation logs, or analytics were included.",
        },
      ],
      dataFlow: [
        "Customer sends a message through a supported channel.",
        "The service receives the message over the confirmed channel transport.",
        "NLU identifies an FAQ or request intent.",
        "Dialog management selects the next response or conversation step.",
        "// TODO(owner): confirm whether a core banking API is called for account queries.",
        "// TODO(owner): confirm whether unresolved requests are handed to an agent and whether conversations are logged.",
        "The chatbot returns a response through the originating channel.",
      ],
    },
    decisions: [
      {
        title: "Natural-language understanding technology",
        options: ["Rasa NLU", "Dialogflow", "Both"],
        // TODO(owner): confirm which technology was selected and for which responsibilities.
        chosen: "To confirm",
        tradeoff:
          "// TODO(owner): explain the actual selection criteria and operational trade-offs.",
      },
      {
        title: "Supported customer channels",
        options: ["Web", "Mobile app", "WhatsApp", "Other messaging channels"],
        // TODO(owner): confirm which channels were implemented.
        chosen: "To confirm",
        tradeoff:
          "// TODO(owner): explain channel coverage versus integration and support cost.",
      },
      {
        title: "Human-agent handoff",
        options: ["Automated response only", "Transfer unresolved requests to an agent"],
        // TODO(owner): confirm whether human handoff was implemented.
        chosen: "To confirm",
        tradeoff:
          "// TODO(owner): describe the actual fallback and agent workflow.",
      },
      {
        title: "Account-query integration",
        options: ["FAQs only", "Core banking API queries"],
        // TODO(owner): confirm whether account queries were part of the delivered scope.
        chosen: "To confirm",
        tradeoff:
          "// TODO(owner): describe the verified security, authorization, and data-scope trade-offs.",
      },
    ],
    challenges: [
      {
        problem:
          "Customers waited for routine answers and support was unavailable outside business hours.",
        resolution:
          "The supplied product summary describes a chatbot for banking FAQs and routine requests that is available beyond business hours.",
      },
      {
        problem:
          "// TODO(owner): provide a real NLU, dialog, channel, or integration challenge from delivery.",
        resolution:
          "// TODO(owner): describe the actual fix and how it was validated.",
      },
      {
        problem:
          "// TODO(owner): provide another confirmed engineering or production challenge, if applicable.",
        resolution:
          "// TODO(owner): describe your actual resolution, if applicable.",
      },
    ],
    myContribution: [
      "The supplied role description is full-stack Python engineering with AI development; confirm the exact role wording.",
      "// TODO(owner): list the chatbot features and services you personally built.",
      "// TODO(owner): identify design decisions or technical leadership that were yours rather than the wider team's.",
    ],
    outcomes: [
      {
        value: "To confirm",
        label: "customer-service or operational outcome",
        status: "TODO",
      },
    ],
    stack: ["Python", "FastAPI", "Rasa NLU", "Dialogflow", "WebSockets"],
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
        caption: "Illustrated channel and service integrations; exact delivered channels need confirmation.",
      },
      {
        src: "/images/projects/conversational-banking-4.png",
        alt: "Customer messaging conversation alongside a human support agent desktop interface.",
        caption: "Customer chat and agent-support concept; whether agent handoff was implemented needs confirmation.",
      },
    ],
  },
];
