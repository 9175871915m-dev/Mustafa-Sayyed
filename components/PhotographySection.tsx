"use client";

import { useEffect, useRef } from "react";

const PHOTOS = [
  { src: "/IMG_7402.jpg", caption: "Grand Canal at golden hour. My favourite shot." },
  { src: "/IMG_7300.jpg", caption: "The Liffey. Sunrise. Right place, right second." },
  { src: "/IMG_7324.jpg", caption: "Grand Canal at blue hour. A barge, a lamppost, a moon." },
  { src: "/IMG_7393.jpg", caption: "The bike lane I take every morning." },
  { src: "/IMG_7311.jpg", caption: "Woodland path, somewhere near Milltown." },
  { src: "/IMG_7394.jpg", caption: "Cherry blossoms, sunset, utility wire. Still beautiful." },
  { src: "/IMG_7390.jpg", caption: "Pre-dawn. Trees as silhouettes." },
  { src: "/IMG_7312.jpg", caption: "Dublin suburb. That sky happened on a Tuesday." },
  { src: "/IMG_7355.jpg", caption: "Spring blossoms asserting themselves." },
  { src: "/IMG_7403.jpg", caption: "Winding road, warm light on the pines." },
];

export default function PhotographySection() {
  const container = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.gsap || !window.Draggable) return;
    const gsap = window.gsap;
    const Draggable = window.Draggable;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(".photo-heading-block", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: container.current, start: "top 80%" }
      });

      gsap.fromTo(".photo-body", { opacity: 0 }, {
        opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: container.current, start: "top 80%" }
      });

      gsap.fromTo(trackRef.current, { x: 80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 70%" }
      });

      // Draggable configuration
      if (trackRef.current && carouselRef.current) {
        Draggable.create(trackRef.current, {
          type: "x",
          bounds: carouselRef.current,
          inertia: false, // fallback since premium isn't loaded
          edgeResistance: 0.8,
          dragResistance: 0.1,
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="photography" ref={container} className="pt-32 pb-24 border-t border-[var(--color-theme-divider)] bg-[#EDE3D5] full-bleed">
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center photo-heading-block">
        <span className="font-jetbrains text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--color-theme-highlight)] mb-4 block">
          OUTSIDE WORK HOURS
        </span>
        <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-[var(--color-theme-text-primary)] mb-4">
          Away From the Blueprint
        </h2>
        <p className="font-cormorant italic text-lg lg:text-xl text-[var(--color-theme-text-secondary)] mb-6">
          Dublin, on foot. A different kind of observation.
        </p>
        <p className="photo-body font-inter text-[var(--color-theme-text-secondary)] text-sm max-w-2xl mx-auto">
          The same eye that catches a process defect also stops on a canal bridge at sunrise.
        </p>
      </div>

      <div 
        ref={carouselRef} 
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing relative"
        style={{ paddingLeft: "max(24px, calc((100vw - 1100px) / 2))" }} // aligns start with container
      >
        <div ref={trackRef} className="flex gap-4 w-max pr-6 lg:pr-24">
          {PHOTOS.map((photo, idx) => (
            <div 
              key={idx} 
              className="group relative h-[400px] md:h-[500px] shrink-0 w-[300px] md:w-[350px] overflow-hidden"
            >
              <img 
                src={photo.src} 
                alt={photo.caption} 
                loading="lazy" 
                className="w-full h-full object-cover transition-[filter] duration-300 ease-in-out brightness-100 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="font-jetbrains text-xs text-white leading-relaxed">
                  {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        .full-bleed {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
        }
      `}</style>
    </section>
  );
}
