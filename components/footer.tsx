import React from "react";
import { Linkedin, Instagram, Facebook, Zap } from "lucide-react";

// Define the URLs for your social media profiles
const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/mustafa-sayyed-61729022a", // From Profile.pdf
  instagram:
    "https://www.instagram.com/mustafa_sayyed52?igsh=bmJkMDhsZ2k4emlw&utm_source=qr", // Placeholder
  facebook: "https://www.facebook.com/profile.php?id=100008350908048", // Placeholder
};

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-yellow-500/20 py-8 px-6 md:px-12 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Left Section: Copyright & Brand */}
        <div className="mb-4 md:mb-0 text-gray-500 text-sm flex items-center gap-3">
          <p>&copy; {new Date().getFullYear()} Mustafa Sayyed</p>
          {/* Replay intro trigger */}
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("intro_seen");
                window.location.href = "/intro";
              }
            }}
            title="Replay intro"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              opacity: 0.35,
              lineHeight: 1,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.75"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.35"; }}
            aria-label="Replay intro animation"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M4.93 4.93a10 10 0 0 0 0 14.14"/>
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
            </svg>
          </button>
        </div>

        {/* Center Section: Quick Link */}
        <a
          href="/contact"
          className="text-yellow-500 hover:text-white transition-colors font-bold flex items-center gap-2 mb-4 md:mb-0"
        >
          <Zap size={16} /> Request a Deck
        </a>

        {/* Right Section: Social Links */}
        <div className="flex space-x-6">
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-500 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-500 transition-colors"
            aria-label="Instagram Profile"
          >
            <Instagram size={24} />
          </a>
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-500 transition-colors"
            aria-label="Facebook Profile"
          >
            <Facebook size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
