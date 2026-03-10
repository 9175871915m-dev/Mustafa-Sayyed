"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === "undefined" || !window.gsap) return;
    const gsap = window.gsap;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Eyebrow label slides up
      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.3
      });

      // Headline staggered letter drop
      tl.from(".hero-headline-char", {
        y: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "back.out(1.7)"
      }, "-=0.2");

      // Sub-headline + tagline
      tl.from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");

      // Stats row
      tl.from(".hero-stat", {
        y: 10,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1
      }, "-=0.2");

      // Animate numbers
      gsap.utils.toArray(".hero-counter").forEach((counter: any) => {
        const target = parseInt(counter.getAttribute("data-target") || "0", 10);
        gsap.to(counter, {
          innerHTML: target,
          duration: 1.5,
          snap: { innerHTML: 1 },
          ease: "power1.inOut",
          onUpdate: function() {
            counter.innerHTML = Math.round(this.targets()[0].innerHTML).toString();
          }
        });
      });

      // CTA Buttons
      tl.from(".hero-cta", {
        scale: 0.95,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2");

      // Portrait spring rise
      tl.from(".hero-portrait", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.4)"
      }, "-=0.8");

      // Canal photo blur dissolve
      tl.from(".hero-canal", {
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

    }, container);

    return () => ctx.revert();
  }, []);

  const headline = "Engineering Precision Meets Project Leadership.";

  return (
    <section ref={container} className="pt-32 lg:pt-48 pb-12 min-h-screen flex items-center relative" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left Column (60%) */}
        <div className="lg:col-span-7 flex flex-col pt-12">
          <div className="hero-eyebrow font-jetbrains text-[var(--color-theme-highlight)] text-xs tracking-[0.2em] font-bold mb-6 uppercase">
            Dublin, Ireland — Open to Opportunities
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-[var(--color-theme-text-primary)] mb-6 tracking-tight font-playfair flex flex-wrap gap-x-3 gap-y-2">
            {headline.split(" ").map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {word.split("").map((char, charIdx) => (
                  <span key={`${wordIdx}-${charIdx}`} className="hero-headline-char inline-block">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <h2 className="hero-sub font-cormorant italic text-2xl md:text-3xl text-[var(--color-theme-text-primary)] mb-4">
            Graduate Mechanical Engineer & Project Manager
          </h2>

          <p className="hero-sub font-inter text-[var(--color-theme-text-secondary)] text-lg max-w-xl mb-10 leading-relaxed">
            From factory floors and freight lanes to live industry consultancy — I build things that work.
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-12 font-jetbrains text-[var(--color-theme-primary)] font-medium text-sm">
            <div className="hero-stat flex items-center gap-2">
              [ <span className="hero-counter font-bold" data-target="3">0</span>+ Years Experience ]
            </div>
            <div className="hero-stat w-px h-4 bg-[var(--color-theme-divider)]"></div>
            <div className="hero-stat flex items-center gap-2">
              [ <span className="hero-counter font-bold" data-target="15">0</span>+ Projects ]
            </div>
            <div className="hero-stat w-px h-4 bg-[var(--color-theme-divider)]"></div>
            <div className="hero-stat flex items-center gap-2">
              [ BEng + MSc ]
            </div>
          </div>

          <div className="flex gap-4 font-inter text-sm font-semibold tracking-wide">
            <button
              onClick={() => window.open("/Mustafa_Sayyed_CV.pdf", "_blank")} 
              className="hero-cta bg-[var(--color-theme-primary)] text-white px-8 py-3.5 hover:bg-[var(--color-theme-secondary)] transition-colors"
            >
              Download CV
            </button>
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="hero-cta border border-[var(--color-theme-primary)] text-[var(--color-theme-primary)] px-8 py-3.5 hover:bg-[var(--color-theme-primary)] hover:text-white transition-colors"
            >
              View Projects
            </button>
          </div>
        </div>

        {/* Right Column (40%) */}
        <div className="lg:col-span-5 flex flex-col gap-8 items-center lg:items-end mt-12 lg:mt-0">
          <div className="hero-portrait relative shadow-[0_20px_60px_rgba(107,63,31,0.18)] animate-[float_4s_ease-in-out_infinite] w-64 h-80 lg:w-72 lg:h-[22rem] rounded-xl overflow-hidden">
            <Image
              src="/second.png"
              alt="Mustafa Sayyed"
              fill
              className="object-cover scale-[1.4] translate-y-6 origin-top"
              priority
            />
          </div>

          <div className="hero-canal flex flex-col items-center lg:items-end w-64 lg:w-72">
            <div className="w-full h-48 relative rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(107,63,31,0.15)]">
              <Image
                src="/IMG_7402.jpg"
                alt="Grand Canal, Dublin"
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="font-jetbrains text-[10px] text-[var(--color-theme-text-secondary)] mt-3 tracking-wider text-center lg:text-right uppercase">
              Dublin, Grand Canal — shot on the commute.
            </p>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
