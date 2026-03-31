"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "writing", label: "Writing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(107,63,31,0.08)] py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center relative">
        <Link 
          href="/"
          className="cursor-pointer text-[var(--color-theme-primary)] font-playfair font-bold text-2xl tracking-tighter"
          onClick={() => setMobileMenuOpen(false)}
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
        <div 
          className="md:hidden text-[var(--color-theme-primary)] cursor-pointer p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#FAF7F2] border-b border-[var(--color-theme-divider)] shadow-[0_10px_30px_rgba(107,63,31,0.1)] flex flex-col py-4 px-6 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={isHome ? `#${link.id}` : `/#${link.id}`}
              onClick={(e) => handleNavClick(link.id, e)}
              className="text-[var(--color-theme-primary)] font-inter text-sm hover:text-[var(--color-theme-highlight)] transition-colors uppercase tracking-widest font-medium py-4 border-b border-[var(--color-theme-divider)]/30"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/personality"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[var(--color-theme-highlight)] font-inter text-sm hover:text-[var(--color-theme-primary)] transition-colors uppercase tracking-widest font-bold py-4 pt-6 pb-2"
          >
            Personality
          </Link>
        </div>
      )}
    </nav>
  );
}
