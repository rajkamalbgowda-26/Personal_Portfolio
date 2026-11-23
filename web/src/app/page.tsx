"use client";

import React, { useState } from "react";
import { CondensationPreloader } from "@/components/3d/CondensationPreloader";
import { ArchitectHero } from "@/components/hero/ArchitectHero";
import { AboutSection } from "@/components/about/AboutSection";
import { CapabilitiesSection } from "@/components/capabilities/CapabilitiesSection";
import { EducationSection } from "@/components/EducationSection";
import { JourneySection } from "@/components/journey/JourneySection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { AwardsSection } from "@/components/awards/AwardsSection";
import { CertificationsSection } from "@/components/credentials/CertificationsSection";
import { LeadershipSection } from "@/components/leadership/LeadershipSection";
import { ContactConsole } from "@/components/contact/ContactConsole";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { PlainNavBar } from "@/components/layout/PlainNavBar";
import { InteractiveParticles } from "@/components/3d/InteractiveParticles";

export default function HomePage() {
  const [activeStation, setActiveStation] = useState("hero");
  const [preloaderDone, setPreloaderDone] = useState(true);

  return (
    <div className="relative min-h-screen bg-slate-50/60 flex flex-col justify-between overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Radiant Ambient Aurora Background Orbs (Ethereal Depth & Rich Colors) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-blue-400/20 via-indigo-400/15 to-transparent blur-[130px] animate-pulse-subtle" />
        <div className="absolute top-[20%] -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-purple-500/18 via-violet-400/12 to-transparent blur-[140px]" />
        <div className="absolute top-[50%] left-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-cyan-400/18 via-sky-300/12 to-transparent blur-[140px]" />
        <div className="absolute top-[75%] -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-emerald-400/15 via-teal-300/10 to-transparent blur-[150px]" />
        <div className="absolute -bottom-40 left-[25%] w-[700px] h-[700px] rounded-full bg-gradient-to-t from-indigo-500/18 via-blue-400/12 to-transparent blur-[140px]" />
      </div>

      {/* Ambient Light Silver Background Particles (strictly behind all content at z-[1]) */}
      <InteractiveParticles />

      {/* Main Content Layer (strictly at z-10 so particles NEVER overlap cards, photos, or text) */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        {/* 3.0 Condensation Preloader */}
        {!preloaderDone && (
          <CondensationPreloader onComplete={() => setPreloaderDone(true)} />
        )}

        {/* Executive SideMenu Bar Navigation */}
        <SidebarNav activeStation={activeStation} setActiveStation={setActiveStation} />

        {/* Main Content Container Offset for Left Sidebar */}
        <div className="lg:pl-72 xl:pl-80 flex flex-col justify-between min-h-screen pt-14">
          {/* Plain Top Navigation Bar */}
          <PlainNavBar />

          {/* Continuous Page Sections */}
          <ArchitectHero />
          <AboutSection />
          <CapabilitiesSection />
          <EducationSection />
          <JourneySection />
          <ProjectsSection />
          <AwardsSection />
          <CertificationsSection />
          <LeadershipSection />
          <ContactConsole />
        </div>
      </div>
    </div>
  );
}
