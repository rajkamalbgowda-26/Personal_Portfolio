import type { Metadata } from "next";
import "./globals.css";
import { LenisScrollProvider } from "@/components/layout/LenisScrollProvider";
import { QualityDetector } from "@/components/layout/QualityDetector";
import { MercuryMeltTransition } from "@/components/layout/MercuryMeltTransition";
import { CommandPalette } from "@/components/ui/CommandPalette";

export const metadata: Metadata = {
  metadataBase: new URL("https://rajkamalgowda.dev"),
  title: {
    default: "Rajkamal B Gowda | AI Application Architect",
    template: "%s | Rajkamal B Gowda",
  },
  description:
    "Spatial 3D portfolio and architecture systems of Rajkamal B Gowda. Designing agentic systems, enterprise RAG, high-throughput Python APIs, and Azure AI infrastructure.",
  keywords: [
    "AI Architect",
    "Agentic AI",
    "Generative AI",
    "Azure AI",
    "Azure Container Apps",
    "FastAPI",
    "Python 3.12",
    "RAG",
    "MLOps",
    "LangGraph",
    "Deep Learning",
  ],
  authors: [{ name: "Rajkamal B Gowda", url: "https://rajkamalgowda.dev" }],
  creator: "Rajkamal B Gowda",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rajkamalgowda.dev",
    siteName: "Rajkamal B Gowda — AI Application Architect",
    title: "Rajkamal B Gowda | AI Application Architect",
    description:
      "Designing agentic systems, enterprise RAG, high-throughput Python APIs, and Azure AI infrastructure. Leading 12 full-stack AI engineers from discovery to SLA.",
    images: [
      {
        url: "/assets/portrait/og-portrait.png",
        width: 1200,
        height: 630,
        alt: "Rajkamal B Gowda — AI Application Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajkamal B Gowda | AI Application Architect",
    description:
      "Designing agentic systems, enterprise RAG, high-throughput Python APIs, and Azure AI infrastructure.",
    images: ["/assets/portrait/og-portrait.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://rajkamalgowda.dev/#person",
      name: "Rajkamal B Gowda",
      givenName: "Rajkamal B",
      familyName: "Gowda",
      jobTitle: "AI Application Architect",
      description:
        "AI Application Architect leading a squad of 12 full-stack AI engineers delivering end-to-end agentic workflows, enterprise RAG, and Azure MLOps infrastructure.",
      url: "https://rajkamalgowda.dev",
      image: "https://rajkamalgowda.dev/assets/portrait/og-portrait.png",
      sameAs: [
        "https://github.com/rajkamalbgowda-26",
        "https://www.linkedin.com/in/rajkamal-b-gowda-751081170/",
      ],
      knowsAbout: [
        "Agentic AI",
        "Multi-Agent Graph Orchestration",
        "Generative AI & LLMOps",
        "Azure Cloud Architecture",
        "Python Systems & Concurrency",
        "Deep Learning & Fine-Tuning",
        "Distributed Systems",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://rajkamalgowda.dev/#website",
      url: "https://rajkamalgowda.dev",
      name: "Quicksilver — Rajkamal B Gowda Portfolio Atelier",
      publisher: {
        "@id": "https://rajkamalgowda.dev/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                  localStorage.removeItem('kairos_theme');
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-porcelain text-graphite-900 min-h-screen selection:bg-silver-300 selection:text-graphite-900">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-graphite-900 text-white rounded-lg font-mono text-xs shadow-lg outline-none ring-2 ring-signal"
        >
          Skip to main content
        </a>

        <QualityDetector />
        <MercuryMeltTransition />
        <CommandPalette />
        <LenisScrollProvider>
          <main id="main-content">{children}</main>
        </LenisScrollProvider>
      </body>
    </html>
  );
}
