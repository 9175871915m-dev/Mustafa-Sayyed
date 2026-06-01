"use client";

import { useEffect, useRef } from "react";

const SKILL_GROUPS = [
  {
    title: "Engineering & CAD",
    tags: ["AutoCAD 2D", "Creo Parametric 3D", "SolidWorks", "FEA basics", "CNC Knowledge", "GD&T", "QA/QC Inspection", "Technical Drawing"]
  },
  {
    title: "Project Management",
    tags: ["MS Project", "PRINCE2 Foundation (in progress)", "Agile Scrum (in progress)", "Risk Management", "Stakeholder Communication", "Project Documentation"]
  },
  {
    title: "Supply Chain & Logistics",
    tags: ["Freight Pricing (FTL/LTL/Intermodal)", "Carrier Management", "Route Optimisation", "Demand Forecasting", "Procurement", "Contract Negotiation"],
    note: "Active — led multiple live negotiation exercises, MSc 2026"
  },
  {
    title: "Digital & Tools",
    tags: [
      { name: "Jira", note: "Atlassian Jira Fundamentals and Perfection Badges Certified", isNew: true },
      { name: "Power BI", note: "Microsoft Learn — Fundamentals and Report Building", isNew: true },
      { name: "MS365" },
      { name: "BIM/Revit" },
      { name: "Data Analysis" },
      { name: "CRM Systems" },
      { name: "Presentation Design" }
    ]
  }
];

export default function SkillsSection() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.gsap) return;
    const gsap = window.gsap;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(".skills-heading", { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "back.out(1.4)",
        scrollTrigger: { trigger: container.current, start: "top 80%" }
      });

      // Scatter tags animation
      gsap.utils.toArray(".skill-tag").forEach((tag: any, i: any) => {
        gsap.fromTo(tag, {
          x: () => (Math.random() - 0.5) * 200,
          y: () => (Math.random() - 0.5) * 200,
          opacity: 0,
          rotation: () => (Math.random() - 0.5) * 45,
        }, {
          x: 0,
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: tag.closest(".skill-group") as Element,
            start: "top 85%"
          },
          delay: (i % 8) * 0.05 // stagger based on index in group
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={container} className="pt-24 min-h-[50vh]">
      <div className="skills-heading mb-16">
        <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-[var(--color-theme-text-primary)] mb-2">
          Technical Arsenal
        </h2>
        <p className="font-cormorant italic text-xl text-[var(--color-theme-text-secondary)]">
          Engineering depth. Commercial range.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILL_GROUPS.map((group, gIdx) => (
          <div key={gIdx} className="skill-group bg-[var(--color-theme-surface)] border border-[var(--color-theme-divider)] p-8">
            <h3 className="font-playfair font-bold text-xl text-[var(--color-theme-primary)] mb-6">
              {gIdx + 1}. {group.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {group.tags.map((tagObj, tIdx) => {
                const isObject = typeof tagObj === "object" && tagObj !== null;
                const name = isObject ? (tagObj as any).name : (tagObj as string);
                const note = isObject ? (tagObj as any).note : undefined;
                const isNew = isObject ? !!(tagObj as any).isNew : false;

                return (
                  <span 
                    key={tIdx} 
                    title={note}
                    className={`skill-tag inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-theme-bg)] font-jetbrains text-xs tracking-wide text-[var(--color-theme-text-primary)] whitespace-nowrap relative group/tag transition-all duration-300 ${
                      isNew 
                        ? "border border-[var(--color-theme-primary)] hover:border-[var(--color-theme-highlight)] shadow-[0_2px_8px_rgba(107,63,31,0.06)]" 
                        : "border border-[var(--color-theme-divider)]"
                    }`}
                  >
                    {isNew && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-theme-primary)] animate-pulse" />
                    )}
                    {name}
                    {note && (
                      <span className="absolute bottom-[calc(100%+8px)] left-1/2 transform -translate-x-1/2 hidden group-hover/tag:block bg-[var(--color-theme-surface)] border border-[var(--color-theme-primary)] text-[10px] text-[var(--color-theme-text-primary)] px-3 py-2 shadow-[0_10px_30px_rgba(107,63,31,0.15)] z-20 whitespace-normal min-w-[220px] text-center leading-relaxed">
                        <span className="font-bold text-[var(--color-theme-primary)] block mb-1">Badge Certified</span>
                        {note}
                        <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-[6px] border-transparent border-t-[var(--color-theme-primary)] w-0 h-0" />
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
            {(group as any).note && (
              <p className="mt-4 font-inter text-xs italic text-[var(--color-theme-text-secondary)] opacity-70">
                {(group as any).note}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
