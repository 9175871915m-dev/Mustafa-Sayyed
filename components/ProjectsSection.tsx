"use client";

import { useEffect, useRef } from "react";

const PROJECTS_DATA = [
  {
    title: "Expleo x UCD CSRD Consultancy",
    role: "Project Manager",
    status: "Live",
    pdfLink: "#",
    desc: "Industry-partnered consultancy on CSRD compliance for Expleo.",
    tags: ["Live", "PM", "Sustainability"]
  },
  {
    title: "Vertical Integration & Procurement Strategy",
    role: "Author & Designer",
    status: "PDF Deck",
    pdfLink: "/strategy-deck.pdf",
    desc: "Deep-dive analysis on vertical integration and cost-effective procurement, with data storytelling.",
  },
  {
    title: "The Brooklyn Bridge — Industrial Elegance",
    role: "Author & Designer",
    status: "PDF Deck",
    pdfLink: "/industrial-elegance.pdf",
    desc: "Engineering history meets premium presentation design. Steel, Stone & Sacrifice.",
  }
];

export default function ProjectsSection() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.gsap) return;
    const gsap = window.gsap;

    const ctx = gsap.context(() => {
      gsap.fromTo(".proj-heading", { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "back.out(1.4)",
        scrollTrigger: { trigger: container.current, start: "top 80%" }
      });

      gsap.fromTo(".proj-card", {
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
    
    // Max tilt is 5 degrees
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
    <section id="projects" ref={container} className="pt-24 min-h-[60vh]">
      <div className="proj-heading mb-16 text-center lg:text-left">
        <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-[var(--color-theme-text-primary)]">
          Featured Work
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-1000">
        {PROJECTS_DATA.map((proj, idx) => (
          <div 
            key={idx} 
            className="proj-card bg-[var(--color-theme-surface)] border border-[var(--color-theme-primary)] p-8 flex flex-col justify-between"
            style={{ 
              transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease",
              boxShadow: "0 10px 30px rgba(107,63,31,0.05)"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="font-jetbrains text-[10px] uppercase font-bold tracking-widest text-[var(--color-theme-highlight)] max-w-[60%]">
                  Role: {proj.role}
                </span>
                <span className="font-jetbrains text-[10px] uppercase font-bold tracking-widest border border-[var(--color-theme-primary)] text-[var(--color-theme-primary)] px-2 py-1">
                  {proj.status}
                </span>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-[var(--color-theme-text-primary)] mb-4 leading-tight">
                {proj.title}
              </h3>
              <p className="font-inter text-[var(--color-theme-text-secondary)] leading-relaxed mb-8">
                {proj.desc}
              </p>
              
              {proj.tags && (
                <div className="flex gap-2 mb-8">
                  {proj.tags.map((tag, t) => (
                    <span key={t} className="font-jetbrains text-[10px] uppercase text-[var(--color-theme-primary)]">
                      [{tag}]
                    </span>
                  ))}
                </div>
              )}
            </div>

            {proj.status === "PDF Deck" ? (
              <a 
                href={proj.pdfLink} 
                target="_blank" 
                rel="noreferrer"
                className="block text-center bg-[var(--color-theme-primary)] text-[var(--color-theme-surface)] font-inter font-bold uppercase tracking-widest text-sm py-4 hover:bg-[var(--color-theme-secondary)] transition-colors"
                style={{ transform: "translateZ(20px)" }} // for the 3D pop effect
              >
                View Deck
              </a>
            ) : (
              <div className="block text-center border border-[var(--color-theme-primary)] text-[var(--color-theme-primary)] opacity-50 cursor-not-allowed font-inter font-bold uppercase tracking-widest text-sm py-4">
                In Progress
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
