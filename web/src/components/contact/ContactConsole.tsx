"use client";

import React, { useState } from "react";
import Image from "next/image";
import { apiClient } from "@/lib/api-client";
import { soundSynth } from "@/lib/sound-synth";
import {
  CheckCircle2,
  Sparkles,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";

const WHATSAPP_NUMBER = "917019953165";
const WHATSAPP_DISPLAY = "+91 70199 53165";
const LINKEDIN_URL = "https://www.linkedin.com/in/rajkamal-b-gowda-751081170/";

const QUICK_TOPICS = [
  "Job / Career Opportunity",
  "AI & Multi-Agent Architecture",
  "Project Collaboration",
  "Quick Hello",
] as const;

function LinkedInBrandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function ContactConsole() {
  const [formData, setFormData] = useState({
    name: "",
    topic: "Job / Career Opportunity",
    message: "",
  });

  const [copiedLinkedInNote, setCopiedLinkedInNote] = useState(false);
  const [lastChannelUsed, setLastChannelUsed] = useState<"whatsapp" | "linkedin" | null>(null);

  const buildFormattedMessage = () => {
    const sender = formData.name.trim() ? formData.name.trim() : "a portfolio visitor";
    const body = formData.message.trim()
      ? formData.message.trim()
      : `Hi Rajkamal, I visited your portfolio and would love to connect regarding ${formData.topic}.`;
    return `Hi Rajkamal, I'm ${sender} (${formData.topic}).\n\n${body}`;
  };

  const logLeadSilently = (channel: "whatsapp" | "linkedin") => {
    try {
      void apiClient.submitContact({
        name: formData.name.trim() || "Portfolio Visitor",
        email: `${channel}@direct-connect.local`,
        message: `[${channel.toUpperCase()} · ${formData.topic}] ${
          formData.message.trim() || "Direct connection initiated."
        }`,
      });
    } catch {
      // Non-blocking background log
    }
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    soundSynth.playPacketTransmit();
    logLeadSilently("whatsapp");

    const text = encodeURIComponent(buildFormattedMessage());
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    setLastChannelUsed("whatsapp");
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleConnectLinkedIn = async () => {
    soundSynth.playClick();
    logLeadSilently("linkedin");

    const formatted = buildFormattedMessage();
    try {
      if (navigator.clipboard && (formData.name.trim() || formData.message.trim())) {
        await navigator.clipboard.writeText(formatted);
        setCopiedLinkedInNote(true);
        setTimeout(() => setCopiedLinkedInNote(false), 4000);
      }
    } catch {
      // Ignore clipboard permission errors
    }

    setLastChannelUsed("linkedin");
    window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-hidden selection:bg-blue-500 selection:text-white snap-start py-8 md:py-12"
    >
      {/* End-to-End Full Contact Background with Subtle Edge Feathering */}
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
          src="/assets/generated/contact-bg.png"
          alt="Contact Background"
          fill
          priority
          unoptimized
          className="object-cover object-center brightness-[0.98] contrast-[1.02] opacity-80"
        />
        <div className="absolute inset-x-0 top-0 h-8 md:h-10 bg-gradient-to-b from-slate-50/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-8 md:h-10 bg-gradient-to-t from-slate-50/40 to-transparent" />
      </div>

      {/* Main Content Container Layer over Background */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Frosted Glass Direct WhatsApp & LinkedIn Connect Console */}
          <div className="lg:col-span-7 xl:col-span-7 relative group">
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-emerald-500/20 via-blue-500/20 to-indigo-500/25 opacity-80 group-hover:opacity-100 blur-2xl pointer-events-none transition-opacity duration-500 animate-pulse-subtle" />

            <div className="relative bg-white/80 backdrop-blur-md p-6 sm:p-8 md:p-9 rounded-3xl border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.06)] space-y-5">
              {/* Eyebrow & Instant Response Pill */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs text-slate-600 uppercase tracking-widest font-bold">
                    DIRECT CONNECT · WHATSAPP &amp; LINKEDIN
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 font-mono text-xs text-emerald-800 font-bold shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Instant Direct Messaging</span>
                </div>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
                  Let&apos;s build <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
                    something exceptional.
                  </span>
                </h2>
                <p className="font-body text-sm md:text-base text-slate-600 mt-2.5 leading-relaxed max-w-xl">
                  Skip the email inbox—message me directly on{" "}
                  <span className="font-semibold text-emerald-700">WhatsApp</span> or{" "}
                  <span className="font-semibold text-blue-700">LinkedIn</span> for career
                  opportunities, enterprise AI &amp; multi-agent architecture, or consulting.
                </p>
              </div>

              {/* 2 Instant 1-Click Channel Cards (WhatsApp & LinkedIn) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi Rajkamal, I visited your portfolio and would love to connect!"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundSynth.playClick()}
                  className="group/wa flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-50/90 hover:bg-emerald-600 border border-emerald-200 hover:border-emerald-600 transition-all duration-200 shadow-xs cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 group-hover/wa:bg-white text-white group-hover/wa:text-emerald-600 flex items-center justify-center shrink-0 transition-colors shadow-xs">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-700 group-hover/wa:text-emerald-100 block">
                        WhatsApp Direct
                      </span>
                      <span className="font-display font-extrabold text-sm text-slate-900 group-hover/wa:text-white truncate block">
                        {WHATSAPP_DISPLAY}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-700 group-hover/wa:text-white shrink-0 group-hover/wa:translate-x-0.5 group-hover/wa:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundSynth.playClick()}
                  className="group/li flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-blue-50/90 hover:bg-[#0A66C2] border border-blue-200 hover:border-[#0A66C2] transition-all duration-200 shadow-xs cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#0A66C2] group-hover/li:bg-white text-white group-hover/li:text-[#0A66C2] flex items-center justify-center shrink-0 transition-colors shadow-xs">
                      <LinkedInBrandIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700 group-hover/li:text-blue-100 block">
                        LinkedIn Profile
                      </span>
                      <span className="font-display font-extrabold text-sm text-slate-900 group-hover/li:text-white truncate block">
                        /in/rajkamal-b-gowda
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-blue-700 group-hover/li:text-white shrink-0 group-hover/li:translate-x-0.5 group-hover/li:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Compose & Launch Direct Message Form */}
              <form onSubmit={handleSendWhatsApp} className="space-y-3.5 pt-1 border-t border-slate-200/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Name Field */}
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/95 border border-slate-200 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-body text-sm text-slate-900 placeholder:text-slate-400 transition-all shadow-2xs"
                    />
                  </div>

                  {/* Topic Selector */}
                  <div className="space-y-1">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold block">
                      Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/95 border border-slate-200 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-body text-sm text-slate-900 transition-all shadow-2xs cursor-pointer"
                    >
                      {QUICK_TOPICS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-1">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold block">
                    Your Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write your message here — then click Send on WhatsApp or Message on LinkedIn below..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-white/95 border border-slate-200 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-body text-sm text-slate-900 placeholder:text-slate-400 transition-all resize-none shadow-2xs"
                  />
                </div>

                {/* Feedback Banner when launched */}
                {lastChannelUsed && (
                  <div className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        {lastChannelUsed === "whatsapp"
                          ? `Opened WhatsApp chat with ${WHATSAPP_DISPLAY} with your pre-filled message!`
                          : copiedLinkedInNote
                          ? "Message copied to clipboard & opened LinkedIn — paste it directly in LinkedIn chat!"
                          : "Opened Rajkamal's LinkedIn profile in a new tab!"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Dual Action Buttons: Send via WhatsApp & Message on LinkedIn */}
                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:brightness-105 active:scale-[0.98] text-white font-mono text-xs font-bold shadow-lg shadow-emerald-500/25 border border-emerald-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </button>

                  <button
                    type="button"
                    onClick={handleConnectLinkedIn}
                    className="flex-1 px-5 py-3 rounded-2xl bg-[#0A66C2] hover:bg-[#004182] active:scale-[0.98] text-white font-mono text-xs font-bold shadow-lg shadow-blue-600/25 border border-blue-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedLinkedInNote ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied &amp; Opened LinkedIn</span>
                      </>
                    ) : (
                      <>
                        <LinkedInBrandIcon className="w-4 h-4" />
                        <span>Message on LinkedIn</span>
                        <Copy className="w-3 h-3 opacity-80" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: face-transition.png Artwork */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] group">
              <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-purple-500/20 opacity-80 blur-2xl pointer-events-none animate-pulse-subtle" />

              <div className="relative aspect-square rounded-[32px] overflow-hidden bg-white/60 backdrop-blur-sm border border-white/90 shadow-[0_20px_50px_rgba(37,99,235,0.12)] ring-1 ring-blue-500/15 transition-all duration-500 group-hover:shadow-[0_25px_60px_rgba(37,99,235,0.2)]">
                <Image
                  src="/assets/portrait/face-transition.png"
                  alt="Rajkamal B Gowda — AI Architect & Engineering Leader"
                  fill
                  priority
                  unoptimized
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 380px, (max-width: 1200px) 440px, 440px"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent p-5 pt-14 flex items-center justify-between text-white">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9.5px] uppercase tracking-widest text-cyan-400 font-bold">
                      HUMAN VISION × MACHINE INTELLIGENCE
                    </span>
                    <span className="font-display font-bold text-base text-white mt-0.5">
                      Rajkamal B Gowda
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xs">
                    <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
