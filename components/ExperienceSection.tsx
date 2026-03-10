"use client";

import { useEffect, useRef } from "react";

const EXPERIENCE_DATA = [
  {
    role: "Project Manager — CSRD Consultancy",
    company: "University College Dublin / Expleo Group",
    date: "Jan 2026 – Present",
    desc: "Leading live student-industry consultancy on CSRD compliance. Full project lifecycle: scoping, stakeholder mapping, risk register, deliverable tracking. Cross-functional MSc team coordinated with Expleo industry representatives.",
    tags: ["Live Project", "Consultancy", "Sustainability"]
  },
  {
    role: "Mechanical Project Engineer — Operations & Quality",
    company: "VIP Industries Ltd.",
    date: "Jul 2022 – Sep 2023",
    desc: "Managed full production cycles for complex mechanical assemblies. Led quality walkdowns and root-cause analysis, reducing product rejections by 15%. Prepared technical QC reports, equipment logs, and production records. Coordinated CNC calibration. Achieved 12% material scrap reduction.",
    tags: ["Engineering", "Manufacturing", "Quality", "Nashik"]
  },
  {
    role: "Rates & Pricing Analyst",
    company: "ISG Transportation Inc.",
    date: "Oct 2023 – Aug 2025",
    desc: "Freight pricing models for FTL/LTL/intermodal. 30+ carrier partnerships. 500+ monthly lanes. Market analysis, margin optimisation, management reporting.",
    tags: ["Logistics", "Analytics", "Supply Chain"]
  },
  {
    role: "Technical Support & Software Sales Engineer (Part-time)",
    company: "Aress Software",
    date: "2022 – 2023",
    desc: "200+ support tickets resolved. 20% reduction in resolution time. 15% uplift in software sales. CRM, onboarding, cross-team collaboration.",
    tags: ["Sales", "Technical", "SaaS", "Part-time"]
  },
  {
    role: "Night Porter & Fire Warden (Part-time)",
    company: "Clayton Hotel Charlemont",
    date: "Dec 2025 – Present",
    desc: "Hotel operations, guest services, building safety, fire warden emergency procedures. Part-time alongside MSc.",
    tags: ["Operations", "Part-time"]
  }
];

export default function ExperienceSection() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.gsap) return;
    const gsap = window.gsap;

    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-heading", { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "back.out(1.4)",
        scrollTrigger: { trigger: container.current, start: "top 80%" }
      });

      gsap.fromTo(".exp-card", {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".exp-timeline",
          start: "top 75%",
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={container} className="pt-24 min-h-screen">
      <div className="exp-heading mb-16">
        <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-[var(--color-theme-text-primary)] mb-2">
          The Dossier
        </h2>
        <p className="font-cormorant italic text-xl text-[var(--color-theme-text-secondary)]">
          A record of work across engineering, logistics, and management.
        </p>
      </div>

      <div className="exp-timeline relative pl-4 md:pl-8 border-l border-[var(--color-theme-divider)] pb-8">
        {EXPERIENCE_DATA.map((item, idx) => (
           <div key={idx} className="exp-card relative mb-12 pl-6 md:pl-10 last:mb-0">
             {/* Timeline dot */}
             <div className="absolute top-2 -left-[5px] md:-left-[9px] w-2 h-2 md:w-4 md:h-4 bg-[var(--color-theme-bg)] border-[3px] border-[var(--color-theme-primary)] rounded-full"></div>
             
             <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
               <h3 className="font-playfair font-bold text-2xl text-[var(--color-theme-text-primary)]">
                 {item.role}
               </h3>
               <span className="font-jetbrains text-sm font-bold text-[var(--color-theme-highlight)] tracking-wider mt-2 md:mt-0 whitespace-nowrap">
                 {item.date}
               </span>
             </div>
             
             <h4 className="font-inter font-semibold text-[var(--color-theme-primary)] mb-4">
               {item.company}
             </h4>
             
             <p className="font-inter text-[var(--color-theme-text-secondary)] leading-relaxed mb-6">
               {item.desc}
             </p>
             
             <div className="flex flex-wrap gap-2">
               {item.tags.map((tag, tIdx) => (
                 <span key={tIdx} className="font-jetbrains text-[10px] uppercase tracking-widest text-[var(--color-theme-primary)] bg-[var(--color-theme-divider)]/30 px-2 py-1">
                   [{tag}]
                 </span>
               ))}
             </div>
           </div>
        ))}
      </div>
    </section>
  );
}
