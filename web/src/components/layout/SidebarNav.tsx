"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { soundSynth } from "@/lib/sound-synth";
import { useLenis } from "@/components/layout/LenisScrollProvider";
import {
  Home,
  User,
  Cpu,
  GraduationCap,
  FolderGit2,
  Briefcase,
  Trophy,
  Award,
  Users,
  Send,
  Menu,
  X,
  Download,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About Me", icon: User },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "journey", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "awards", label: "Awards", icon: Trophy },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "squad", label: "Leadership", icon: Users },
  { id: "contact", label: "Contact", icon: Send },
];

export function SidebarNav({ activeStation, setActiveStation }: { activeStation: string; setActiveStation: (id: string) => void }) {

  const [mobileOpen, setMobileOpen] = useState(false);

  const { lenis, scrollTo } = useLenis();

  // ScrollSpy: observe sections and accurately highlight the station in the viewport center
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((s) => s.id);
    const handleScroll = () => {
      const isMobile = window.innerWidth < 1024;
      const targetOffset = isMobile ? 70 : 0;
      const viewportFocus = window.scrollY + window.innerHeight * 0.45;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - targetOffset;
          if (viewportFocus >= top) {
            setActiveStation(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    if (lenis) {
      lenis.on("scroll", handleScroll);
    }
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (lenis) {
        lenis.off("scroll", handleScroll);
      }
    };
  }, [lenis, setActiveStation]);

  const handleNavClick = (id: string) => {
    soundSynth.playClick();
    setActiveStation(id);
    setMobileOpen(false);

    if (lenis) {
      scrollTo(`#${id}`, { offset: -56 });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop - 56;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Mobile Top Navbar with Brand & Hamburger Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-white/90 backdrop-blur-md border-b border-silver-200 px-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-silver-300 shadow-xs flex items-center justify-center bg-white p-0.5">
            <Image
              src="/assets/generated/monogram.png"
              alt="Rajkamal B Gowda Monogram"
              width={34}
              height={34}
              unoptimized
              priority
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-display font-bold text-sm text-graphite-900 block leading-none">
              Rajkamal B Gowda
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-graphite-500">
              AI Application Architect
            </span>
          </div>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Drawer"
          className="p-2 rounded-xl border border-silver-200 bg-silver-50 text-graphite-900 shadow-xs hover:bg-silver-100 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for Mobile Drawer */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-graphite-900/40 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Main Sidemenu Bar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 xl:w-80 h-screen bg-white/95 backdrop-blur-xl border-r border-silver-200/90 shadow-[4px_0_24px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-transform duration-300 ease-out select-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top: Identity Header */}
        <div className="p-5 border-b border-silver-100">
          <div className="flex items-start justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-silver-300 shadow-sm flex items-center justify-center bg-white group-hover:border-signal transition-colors p-1">
                <Image
                  src="/assets/generated/monogram.png"
                  alt="Rajkamal B Gowda Monogram"
                  width={40}
                  height={40}
                  unoptimized
                  priority
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base text-graphite-900 leading-tight group-hover:text-signal transition-colors">
                  Rajkamal B Gowda
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-graphite-600 font-semibold mt-0.5">
                  Forward Deployed Engineer
                </span>
              </div>
            </Link>

            {/* Close button inside mobile drawer */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-graphite-500 hover:text-graphite-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Clean Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-3 space-y-1.5 custom-scrollbar">
          <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
            Navigation
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive = activeStation === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 group relative ${
                  isActive
                    ? "bg-[linear-gradient(135deg,#1d4ed8_0%,#2563eb_26%,#cbd5e1_52%,#94a3b8_68%,#1e40af_100%)] text-white font-bold shadow-md shadow-blue-500/25 border border-white/40"
                    : "text-slate-700 hover:text-blue-700 hover:bg-slate-100/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-white/25 text-white shadow-xs backdrop-blur-xs border border-white/30"
                        : "bg-slate-100 text-slate-500 group-hover:text-blue-600 group-hover:bg-blue-100/60"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-display text-sm tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom: CV Download & Social Links */}
        <div className="p-4 border-t border-slate-200/80 bg-white/90 space-y-3">
          {/* Download Resume Button */}
          <a
            href="/assets/Rajkamal_Resume.pdf"
            download="Rajkamal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[linear-gradient(135deg,#1d4ed8_0%,#2563eb_26%,#cbd5e1_52%,#94a3b8_68%,#1e40af_100%)] hover:brightness-105 text-white font-mono text-xs font-bold shadow-md shadow-blue-500/20 border border-white/30 transition-all group"
          >
            <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">Download Resume (PDF)</span>
            <ExternalLink className="w-3 h-3 text-blue-100" />
          </a>

          {/* Social Icons with brand colors */}
          <div className="pt-1 flex items-center justify-center gap-4 text-slate-500">
            <a
              href="https://www.linkedin.com/in/rajkamal-b-gowda-751081170/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
              title="LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/917019953165"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
              title="WhatsApp (+91 7019953165)"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/rajkamalbgowda-26"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors"
              title="GitHub (rajkamalbgowda-26)"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
