"use client";

import { useEffect, useRef } from "react";

const PAPERS_DATA = [
  {
    title: "Climate Governance and the Indian Labour Crisis — AITUC at the Crossroads",
    subtitle: "Graduate Polemic Report · MSc Project Management, UCD · 2026",
    role: "Author",
    grade: "First Class (A)",
    desc: "A rigorous, evidence-driven argument for why India's oldest trade union must fundamentally reform its governance model in the face of climate change — or risk irrelevance.",
    pdfLink: "/aituc-polemic.pdf",
  }
];

export default function WritingSection() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.gsap) return;
    const gsap = window.gsap;

    const ctx = gsap.context(() => {
      gsap.fromTo(".writing-heading", { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "back.out(1.4)",
        scrollTrigger: { trigger: container.current, start: "top 80%" }
      });

      gsap.fromTo(".writing-card", {
        y: 60,
        opacity: 0,
        rotationX: -5,
      }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    card.style.boxShadow = "0 30px 60px rgba(107,63,31,0.12)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    card.style.boxShadow = "0 10px 30px rgba(107,63,31,0.05)";
  };

  return (
    <section id="writing" ref={container} className="pt-24 min-h-[40vh]">
      <div className="writing-heading mb-16 text-center lg:text-left">
        <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-[var(--color-theme-text-primary)]">
          Papers &amp; Writing
        </h2>
        <p className="font-cormorant italic text-xl text-[var(--color-theme-text-secondary)] mt-2">
          Argued with evidence. Written to persuade.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 perspective-1000">
        {PAPERS_DATA.map((paper, idx) => (
          <div
            key={idx}
            className="writing-card bg-[var(--color-theme-surface)] border border-[var(--color-theme-primary)] p-8 flex flex-col justify-between"
            style={{
              transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease",
              boxShadow: "0 10px 30px rgba(107,63,31,0.05)"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              {/* Role + Grade row */}
              <div className="flex justify-between items-start mb-6">
                <span className="font-jetbrains text-[10px] uppercase font-bold tracking-widest text-[var(--color-theme-highlight)]">
                  Role: {paper.role}
                </span>
                <span className="font-jetbrains text-[10px] uppercase font-bold tracking-widest border border-[var(--color-theme-primary)] text-[var(--color-theme-primary)] px-2 py-1">
                  {paper.grade}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-playfair text-2xl font-bold text-[var(--color-theme-text-primary)] mb-2 leading-tight">
                {paper.title}
              </h3>

              {/* Subtitle */}
              <p className="font-jetbrains text-[10px] uppercase tracking-widest text-[var(--color-theme-text-secondary)] mb-6 opacity-70">
                {paper.subtitle}
              </p>

              {/* Description */}
              <p className="font-inter text-[var(--color-theme-text-secondary)] leading-relaxed mb-8">
                {paper.desc}
              </p>
            </div>

            {/* CTA */}
            <a
              href={paper.pdfLink}
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-[var(--color-theme-primary)] text-[var(--color-theme-surface)] font-inter font-bold uppercase tracking-widest text-sm py-4 hover:bg-[var(--color-theme-secondary)] transition-colors"
              style={{ transform: "translateZ(20px)" }}
            >
              Read Paper
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
