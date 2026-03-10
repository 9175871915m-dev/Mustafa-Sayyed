"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(107,63,31,0.08)] py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link 
          href="/"
          className="cursor-pointer text-[var(--color-theme-primary)] font-playfair font-bold text-2xl tracking-tighter"
        >
          MS
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={isHome ? `#${link.id}` : `/#${link.id}`}
              onClick={(e) => handleNavClick(link.id, e)}
              className="text-[var(--color-theme-primary)] font-inter text-sm hover:text-[var(--color-theme-highlight)] transition-colors uppercase tracking-widest font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/personality"
            className="text-[var(--color-theme-highlight)] underline decoration-[var(--color-theme-divider)] underline-offset-4 font-inter text-sm hover:text-[var(--color-theme-primary)] transition-colors uppercase tracking-widest font-bold"
          >
            Personality
          </Link>
        </div>
        <div className="md:hidden text-[var(--color-theme-primary)] cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </div>
    </nav>
  );
}
