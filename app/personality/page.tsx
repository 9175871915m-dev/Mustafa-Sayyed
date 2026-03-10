/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import NavBar from "@/components/NavBar";

const PHOTOS = [
  { src: "/whoamI.jpeg", alt: "Personal Portrait" },
  { src: "/Gym.jpg", alt: "At the Gym" },
  { src: "/Beach.jpg", alt: "At the Beach" },
  { src: "/goa.jpg", alt: "Goa Trip" },
  { src: "/Social nondrinker.jpeg", alt: "Social Settings" },
  { src: "/IMG_7300.jpg", alt: "Travel Settings" },
  { src: "/IMG_7311.jpg", alt: "Adventures" },
  { src: "/IMG_7355.jpg", alt: "Exploring" },
];

export default function PersonalityPage() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.gsap) return;
    const gsap = window.gsap;

    const ctx = gsap.context(() => {
      gsap.fromTo(".persona-reveal", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[var(--color-theme-bg)] min-h-screen font-inter selection:bg-[var(--color-theme-primary)] selection:text-[var(--color-theme-bg)]" ref={container}>
      {/* Background blueprint dots */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-[radial-gradient(var(--color-theme-divider)_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <NavBar />
      
      <main className="max-w-6xl mx-auto px-6 relative z-10 pt-32 pb-24">
        <div className="persona-reveal mb-16 max-w-2xl">
          <div className="font-jetbrains text-[var(--color-theme-highlight)] text-xs tracking-[0.2em] font-bold mb-6 uppercase">
            Beyond the Desk
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-[var(--color-theme-text-primary)] mb-6">
            The Personality
          </h1>
          <p className="font-inter text-[var(--color-theme-text-secondary)] text-lg leading-relaxed">
            When I&apos;m not managing supply chains, conducting quality inspections, or analyzing project timelines, I&apos;m out living life. Here is a glimpse into who I am outside of the dossier.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {PHOTOS.map((photo, idx) => (
            <div key={idx} className="persona-reveal inline-block w-full relative overflow-hidden border-[4px] border-[var(--color-theme-surface)] shadow-[0_12px_40px_rgba(107,63,31,0.15)] break-inside-avoid">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto block hover:scale-[1.03] transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
