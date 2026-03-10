"use client";

import { useEffect, useRef } from "react";

const REFERENCES_DATA = [
  {
    text: "Mustafa's ability to analyze complex pricing structures and present them clearly was invaluable.",
    name: "Wilhelm David Tewari",
    role: "Rates Manager, ISG Transportation"
  },
  {
    text: "A natural leader who bridges the gap between students and faculty.",
    name: "Dr. Badguzar",
    role: "Head of Department, Mechanical Engineering"
  },
  {
    text: "Mustafa handles negotiations with a level of professionalism that is rare.",
    name: "Advyit Verma",
    role: "Director, VBS Estates"
  }
];

export default function ReferencesSection() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.gsap) return;
    const gsap = window.gsap;

    const ctx = gsap.context(() => {
      gsap.fromTo(".ref-heading", { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "back.out(1.4)",
        scrollTrigger: { trigger: container.current, start: "top 80%" }
      });

      gsap.fromTo(".ref-card", {
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
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="references" ref={container} className="pt-24 min-h-[50vh]">
      <div className="ref-heading mb-16 text-center lg:text-left">
        <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-[var(--color-theme-text-primary)]">
          What Others Say
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REFERENCES_DATA.map((ref, idx) => (
          <div key={idx} className="ref-card flex flex-col justify-between bg-[var(--color-theme-bg)] border border-[var(--color-theme-divider)] p-8 md:p-10 shadow-sm relative">
            {/* Quote Icon */}
            <svg className="absolute top-6 left-6 w-8 h-8 text-[var(--color-theme-divider)] opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>

            <p className="font-cormorant italic text-xl md:text-2xl text-[var(--color-theme-text-primary)] leading-relaxed mb-10 pt-8 relative z-10">
              &quot;{ref.text}&quot;
            </p>
            
            <div className="pt-6 border-t border-[var(--color-theme-divider)]">
              <span className="font-jetbrains text-xs tracking-wider uppercase text-[var(--color-theme-primary)] block font-bold mb-1">
                — {ref.name}
              </span>
              <span className="font-inter text-xs text-[var(--color-theme-text-secondary)] block">
                {ref.role}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center justify-center text-center opacity-0 di-arrow" ref={(el) => {
        if(el && window.gsap) {
          window.gsap.to(el, {
            opacity: 1, y: 0, duration: 1,
            scrollTrigger: { trigger: el, start: "top 85%" }
          });
        }
      }}>
        <h3 className="font-playfair text-2xl font-bold text-[var(--color-theme-text-primary)] mb-4">
          Worked with me?
        </h3>
        <p className="font-inter text-[var(--color-theme-text-secondary)] mb-6 max-w-md mx-auto">
          I'm always looking to gather feedback from colleagues, managers, and clients. 
        </p>
        <button
          onClick={() => window.location.href = "mailto:sayyedmustafa7452@gmail.com?subject=Recommendation%20for%20Mustafa%20Sayyed&body=Hi%20Mustafa%2C%0D%0A%0D%0AHere%20is%20my%20recommendation%3A%0D%0A"}
          className="border border-[var(--color-theme-primary)] text-[var(--color-theme-primary)] px-8 py-3.5 hover:bg-[var(--color-theme-primary)] hover:text-white transition-colors font-inter text-sm font-semibold tracking-wide"
        >
          Leave a Recommendation
        </button>
      </div>
    </section>
  );
}
