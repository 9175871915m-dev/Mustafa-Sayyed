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
        <div className="mb-4 md:mb-0 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Mustafa Sayyed</p>
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
