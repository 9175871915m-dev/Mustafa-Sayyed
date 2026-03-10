"use client";

import { useEffect, useRef } from "react";

const EDUCATION_DATA = [
  {
    degree: "MSc Project Management",
    school: "University College Dublin",
    date: "2025 – 2026 (In Progress)",
    desc: "Class Rep & Student Ambassador"
  },
  {
    degree: "PGDip Logistics & Supply Chain",
    school: "MIT School of Distance Education",
    date: "2023 – 2025",
    desc: "First Class with Distinction"
  },
  {
    degree: "BEng Mechanical Engineering",
    school: "Sapkal College of Engineering, Savitribai Phule Pune University",
    date: "2020 – 2022",
  },
  {
    degree: "Diploma Mechanical Engineering",
    school: "Savitribai Phule Pune University",
    date: "2016 – 2018",
    desc: "First Class"
  }
];

export default function EducationSection() {
  const container = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.gsap) return;
    const gsap = window.gsap;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(".edu-heading", { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "back.out(1.4)",
        scrollTrigger: { trigger: container.current, start: "top 80%" }
      });

      // SVG Line Draw Animation
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".edu-timeline-container",
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          }
        });
      }

      // Nodes fade/slide
      gsap.fromTo(".edu-node", { opacity: 0, x: -20 }, {
        opacity: 1,
        x: 0,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".edu-timeline-container",
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={container} className="pt-24 min-h-[60vh]">
      <div className="edu-heading mb-16 text-center lg:text-left">
        <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-[var(--color-theme-text-primary)]">
          Academic Foundation
        </h2>
      </div>

      <div className="edu-timeline-container relative mx-auto lg:mx-0 max-w-4xl min-h-[400px]">
        {/* SVG Drawing Line */}
        <div className="absolute left-[15px] top-[24px] bottom-[24px] w-1 h-full z-0 overflow-visible">
          <svg className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100">
            <path 
              ref={pathRef}
              d="M 1 0 L 1 100" 
              fill="none" 
              stroke="var(--color-theme-divider)" 
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* content nodes */}
        <div className="flex flex-col gap-12 relative z-10 w-full">
          {EDUCATION_DATA.map((item, idx) => (
            <div key={idx} className="edu-node flex items-start gap-8 w-full group">
              <div className="w-8 h-8 rounded-full bg-[var(--color-theme-surface)] border border-[var(--color-theme-primary)] flex-shrink-0 flex items-center justify-center mt-1 z-10 shadow-sm transition-colors group-hover:bg-[var(--color-theme-highlight)]">
                <div className="w-2 h-2 rounded-full bg-[var(--color-theme-primary)]"></div>
              </div>
              
              <div className="flex-1 bg-[var(--color-theme-surface)] border border-transparent group-hover:border-[var(--color-theme-divider)] p-6 transition-all shadow-sm">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                  <h3 className="font-playfair text-2xl font-bold text-[var(--color-theme-text-primary)]">
                    {item.degree}
                  </h3>
                  <span className="font-jetbrains text-sm font-bold text-[var(--color-theme-highlight)] tracking-wider whitespace-nowrap mt-2 md:mt-0">
                    {item.date}
                  </span>
                </div>
                <h4 className="font-inter font-semibold text-[var(--color-theme-text-secondary)] mb-2">
                  {item.school}
                </h4>
                {item.desc && (
                  <p className="font-inter text-sm italic text-[var(--color-theme-primary)]">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
