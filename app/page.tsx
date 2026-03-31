"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import DualIdentitySection from "@/components/DualIdentitySection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import WritingSection from "@/components/WritingSection";
import ReferencesSection from "@/components/ReferencesSection";
import PhotographySection from "@/components/PhotographySection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("intro_seen")) {
      router.replace("/intro");
    }
  }, [router]);

  return (
    <div className="min-h-screen text-[var(--color-theme-text-primary)]">
      <NavBar />
      <main className="max-w-6xl mx-auto px-6 pb-24 space-y-32">
        <HeroSection />
        <DualIdentitySection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <WritingSection />
        <ReferencesSection />
        <PhotographySection />
        <ContactSection />
      </main>
    </div>
  );
}
