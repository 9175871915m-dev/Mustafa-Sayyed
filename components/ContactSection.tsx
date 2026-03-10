"use client";

import { useEffect, useRef } from "react";

const PROFILE_DATA = {
  email: "sayyedmustafa7452@gmail.com",
  phone: "+353 89 215 3839",
  linkedin: "linkedin.com/in/mustafa-sayyed-61729022a/"
};

export default function ContactSection() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.gsap) return;
    const gsap = window.gsap;

    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-stagger", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: container.current, start: "top 80%" }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={container} className="py-24 min-h-[50vh] flex flex-col items-center justify-center text-center">
      <div className="contact-stagger mb-12 max-w-2xl px-6">
        <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-[var(--color-theme-text-primary)] mb-6">
          Let&apos;s Connect
        </h2>
        <p className="font-cormorant italic text-xl lg:text-2xl text-[var(--color-theme-text-secondary)]">
          Open to graduate opportunities across Ireland in Engineering, Project Management, Operations, and Supply Chain.
        </p>
      </div>

      <div className="contact-stagger flex flex-col md:flex-row gap-6 lg:gap-12 mb-16 text-[var(--color-theme-text-primary)] font-inter text-lg">
        <a href={`mailto:${PROFILE_DATA.email}`} className="hover:text-[var(--color-theme-highlight)] transition-colors underline decoration-[var(--color-theme-divider)] underline-offset-4">
          {PROFILE_DATA.email}
        </a>
        <a href={`tel:${PROFILE_DATA.phone}`} className="hover:text-[var(--color-theme-highlight)] transition-colors underline decoration-[var(--color-theme-divider)] underline-offset-4">
          {PROFILE_DATA.phone}
        </a>
        <a href={`https://${PROFILE_DATA.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-[var(--color-theme-highlight)] transition-colors underline decoration-[var(--color-theme-divider)] underline-offset-4">
          {PROFILE_DATA.linkedin}
        </a>
      </div>

      <div className="contact-stagger flex flex-col sm:flex-row gap-4 font-inter text-sm font-semibold tracking-wide">
        <button
          onClick={() => window.open("/Mustafa_Sayyed_CV.pdf", "_blank")} 
          className="bg-[var(--color-theme-primary)] text-white px-10 py-4 hover:bg-[var(--color-theme-secondary)] transition-colors"
        >
          Download CV
        </button>
        <button
          onClick={() => window.open(`https://${PROFILE_DATA.linkedin}`, "_blank")} 
          className="border border-[var(--color-theme-primary)] text-[var(--color-theme-primary)] px-10 py-4 hover:bg-[var(--color-theme-primary)] hover:text-white transition-colors"
        >
          Connect on LinkedIn
        </button>
      </div>
    </section>
  );
}
