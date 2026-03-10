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
    tags: ["Freight Pricing (FTL/LTL/Intermodal)", "Carrier Management", "Route Optimisation", "Demand Forecasting", "Procurement", "Contract Negotiation"]
  },
  {
    title: "Digital & Tools",
    tags: ["MS365", "BIM/Revit (learning)", "Data Analysis", "CRM Systems", "Presentation Design"]
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
              {group.tags.map((tag, tIdx) => (
                <span 
                  key={tIdx} 
                  className="skill-tag inline-block px-3 py-1.5 bg-[var(--color-theme-bg)] border border-[var(--color-theme-divider)] font-jetbrains text-xs tracking-wide text-[var(--color-theme-text-primary)] whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
