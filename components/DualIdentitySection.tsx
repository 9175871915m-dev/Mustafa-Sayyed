"use client";

import { useEffect, useRef } from "react";

export default function DualIdentitySection() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.gsap) return;
    const gsap = window.gsap;

    const ctx = gsap.context(() => {
      // Parallax heading
      gsap.fromTo(".di-heading", {
        x: -50,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      });

      // Cards fall in
      gsap.fromTo(".di-card", {
        y: 60,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      });
      
      // Convergence arrow
      gsap.fromTo(".di-arrow", {
        opacity: 0,
        y: -10,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="pt-12 sm:pt-24 min-h-[50vh] flex flex-col justify-center">
      <h2 className="di-heading font-playfair text-4xl lg:text-5xl font-bold mb-16 text-center lg:text-left text-[var(--color-theme-text-primary)]">
        One Profile. Two Disciplines.
      </h2>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Engineering Card */}
        <div className="di-card flex-1 bg-[var(--color-theme-surface)] border border-[var(--color-theme-primary)] p-8 lg:p-10 relative shadow-sm">
          <svg className="w-8 h-8 text-[var(--color-theme-primary)] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div className="font-jetbrains text-xs tracking-[0.15em] font-bold text-[var(--color-theme-primary)] mb-4 uppercase">
            THE ENGINEER
          </div>
          <p className="font-inter text-[var(--color-theme-text-primary)] leading-relaxed">
            BEng Mechanical Engineering. QA/QC at VIP Industries. AutoCAD, SolidWorks, Creo, FEA. Trained in manufacturing processes, precision inspection, and technical documentation.
          </p>
        </div>

        {/* PM Card */}
        <div className="di-card flex-1 bg-[var(--color-theme-surface)] border border-[var(--color-theme-highlight)] p-8 lg:p-10 relative shadow-sm">
          <svg className="w-8 h-8 text-[var(--color-theme-highlight)] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <div className="font-jetbrains text-xs tracking-[0.15em] font-bold text-[var(--color-theme-highlight)] mb-4 uppercase">
            THE PROJECT MANAGER
          </div>
          <p className="font-inter text-[var(--color-theme-text-primary)] leading-relaxed">
            MSc Project Management, UCD. Active Project Manager — Expleo x UCD CSRD initiative. Freight pricing analytics across 500+ monthly lanes. Stakeholder management, risk registers, PRINCE2 (in progress).
          </p>
        </div>
      </div>

      <div className="di-arrow flex flex-col items-center mt-12 gap-4">
        <svg className="w-6 h-6 text-[var(--color-theme-divider)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <p className="font-inter italic font-medium text-[var(--color-theme-text-secondary)] text-center">
          Available for graduate roles across Engineering, PM, Operations & Supply Chain — Ireland.
        </p>
      </div>
    </section>
  );
}
