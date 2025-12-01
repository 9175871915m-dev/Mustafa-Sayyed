"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Briefcase,
  GraduationCap,
  FileText,
  Target,
  Upload,
  Trophy,
  Star,
  Crown,
  Gem,
  MousePointerClick,
  CheckCircle,
  Quote,
  Send,
  User,
} from "lucide-react";

const USER_PHOTO_URL = "/second.png";

const WHITE_KNIGHT_ICON_URL =
  "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=100&h=100&fit=crop&auto=format";

const PROFILE_DATA = {
  name: "Mustafa Sayyed",
  role: "Project Manager & Strategist",
  tagline: "Bridging the gap between Vision and Execution.",
  email: "sayyedmustafa7452@gmail.com",
  phone: "+353 89 215 3839",
  linkedin: "www.linkedin.com/in/mustafa-sayyed-61729022a/",
  summary:
    "A results-driven Project Manager currently blending academic rigor at UCD with hands-on real estate operations. I specialize in turning complex requirements into streamlined workflows. Additionally, I am an expert in crafting high-impact Presentation Decks—transforming raw data into compelling visual narratives.",
  skills: [
    { name: "Project Lifecycle Management", level: 95 },
    { name: "Agile & Waterfall", level: 90 },
    { name: "Stakeholder Communication", level: 98 },
    { name: "Presentation Design & Storytelling", level: 100 },
    { name: "Risk Mitigation", level: 85 },
    { name: "Logistics Optimization", level: 88 },
    { name: "Data-Driven Decision Making", level: 92 },
    { name: "Technical Troubleshooting", level: 80 },
  ],
  experience: [
    {
      company: "VBS Estate Limited",
      role: "Real Estate Rental Manager",
      date: "Oct 2025 - Present",
      desc: "Managing the full rental lifecycle. Successfully reduced vacancy rates through strategic sourcing and streamlined tenant onboarding processes.",
    },
    {
      company: "University College Dublin",
      role: "Class Representative / Ambassador",
      date: "Sept 2025 - Present",
      desc: "Liaising between faculty and the MSc Project Management cohort to ensure smooth academic operations and effective communication flow.",
    },
    {
      company: "ISG Transportation Inc.",
      role: "Pricing Analyst",
      date: "Oct 2023 - Aug 2025",
      desc: "Optimized pricing models through detailed freight analysis. Negotiated carrier contracts to improve margins and utilized data analytics for forecasting.",
    },
    {
      company: "Aress Software",
      role: "Technical Support Engineer",
      date: "Feb 2023 - Sept 2023",
      desc: "Managed client technical issues with a focus on rapid resolution and high customer satisfaction scores.",
    },
  ],
  education: [
    {
      school: "University College Dublin",
      degree: "MSc Project Management",
      date: "Aug 2025 - Sept 2026",
    },
    {
      school: "MIT World Peace University",
      degree: "PGDM, Project Management",
      date: "Completed Oct 2023",
    },
    {
      school: "Sapkal College of Engineering",
      degree: "Bachelor's in Mechanical Engineering",
      date: "2019 - 2022",
    },
  ],
  // INSTRUCTIONS FOR PRESENTATIONS:
  // 1. Put your PDF files (e.g., 'deck1.pdf') inside the 'public' folder.
  // 2. Change the 'fileUrl' below to: "/deck1.pdf"
  presentations: [
    {
      title: "Mastering Vertical Integration & Costeffective Procurement",
      type: "PDF",
      size: "7 MB",
      fileUrl: "/strategy-deck.pdf",
    },
    {
      title: "Steel, Stone & Sacrifice The Story of the Brooklyn Bridge",
      type: "PDF",
      size: "2.6 MB",
      fileUrl: "/Industrial-Elegance.pdf",
    },

  ],
  testimonials: [
    {
      name: "Wilhelm David Tewari",
      role: "Rates Manager",
      text: "Mustafa's ability to analyze complex pricing structures and present them clearly was invaluable.",
    },
    {
      name: "Dr. Badguzar",
      role: "Head Of Department Mechanical Engineering",
      text: "A natural leader who bridges the gap between students and faculty.",
    },
    {
      name: "Advyit Verma",
      role: "Director VBS Estates",
      text: "Mustafa handles negotiations with a level of professionalism that is rare.",
    },
  ],
};

/* --- COMPONENTS --- */

const WireframeKnight = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.5"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 90 L80 90 L70 70 L30 70 Z" strokeOpacity="0.8" />
    <path d="M30 70 L40 40 L60 40 L70 70" strokeOpacity="0.6" />
    <path d="M40 40 L30 30 L40 10 L60 15 L70 25 L60 40" strokeOpacity="0.8" />
    <path d="M30 30 L20 35 L30 45 L40 40" strokeOpacity="0.8" />
    <path d="M40 10 L50 30 L60 15" strokeOpacity="0.4" />
    <path d="M30 30 L50 30 L70 25" strokeOpacity="0.4" />
    <path d="M20 35 L40 40 L60 40" strokeOpacity="0.4" />
    <path d="M30 70 L50 60 L70 70" strokeOpacity="0.3" />
    <path d="M40 40 L50 60 L60 40" strokeOpacity="0.3" />
    <path d="M20 90 L50 80 L80 90" strokeOpacity="0.3" />
    <path
      d="M50 10 L50 30 L50 60 L50 80"
      strokeOpacity="0.5"
      strokeDasharray="2 2"
    />
  </svg>
);

const RookIcon = ({
  size = 24,
  className,
}: {
  size?: number | string;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 20h14" />
    <path d="M5 20V9h4v2h6V9h4v11" />
    <path d="M4 5h16" />
    <path d="M4 5v4h4V5" />
    <path d="M16 5v4h4V5" />
    <path d="M9 5v4" />
    <path d="M15 5v4" />
  </svg>
);

interface HoverTextProps {
  text: string;
  className?: string;
  color?: string;
}

const HoverText: React.FC<HoverTextProps> = ({
  text,
  className,
  color = "text-white",
}) => {
  return (
    <span className={`inline-block cursor-default ${className ?? ""}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-transform duration-200 hover:-translate-y-2 hover:text-yellow-500 ${color}`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const SubtleChessFloor = () => (
  <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden z-0 pointer-events-none opacity-20 mask-image-fade">
    <div className="w-[150%] h-[200%] absolute -left-[25%] -bottom-[50%] transform rotate-x-60 origin-bottom">
      <div className="w-full h-full grid grid-cols-8 grid-rows-8">
        {[...Array(64)].map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const isBlack = (row + col) % 2 === 1;
          return (
            <div
              key={i}
              className={`${
                isBlack ? "bg-white/10" : "bg-transparent"
              } w-full h-full border border-white/5`}
            />
          );
        })}
      </div>
    </div>
    <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent" />
  </div>
);

type SectionHeadingProps = {
  text: string;
  icon: React.ComponentType<any>;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({
  text,
  icon: Icon,
}) => (
  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 text-white group cursor-default">
    <span className="bg-yellow-500 text-black p-2 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.4)] group-hover:rotate-12 transition-transform duration-300">
      <Icon size={24} />
    </span>
    <HoverText text={text} />
  </h2>
);

interface SkillBarProps {
  name: string;
  level: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level }) => {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), 200);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div className="mb-6 group">
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 font-bold group-hover:text-yellow-500 transition-colors">
          {name}
        </span>
        <span className="text-yellow-500 font-mono">{width}%</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
        <div
          className="h-full bg-yellow-500 rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${width}%` }}
        >
          <div className="absolute top-0 right-0 bottom-0 w-20 bg-white/20 skew-x-[-20deg] animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

const DeckInquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    type: "Professional",
    instructions: "",
  });

  interface DeckFormData {
    name: string;
    phone: string;
    type: string;
    instructions: string;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = formData as DeckFormData;
    const subject = `Deck Request: ${data.type} - ${data.name}`;
    const body = `Name: ${data.name}%0D%0APhone: ${data.phone}%0D%0AType: ${
      data.type
    }%0D%0A%0D%0AInstructions:%0D%0A${encodeURIComponent(data.instructions)}`;
    window.location.href = `mailto:${
      PROFILE_DATA.email
    }?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-[#111] p-8 rounded-xl border border-gray-800 shadow-xl"
    >
      <h3 className="text-2xl font-bold text-white mb-4">Commission a Deck</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Your Name</label>
          <input
            required
            type="text"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
            placeholder="John Doe"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Phone Number
          </label>
          <input
            required
            type="tel"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
            placeholder="+353 ..."
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-2">Deck Type</label>
        <div className="relative">
          <select
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none appearance-none transition-colors"
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            value={formData.type}
          >
            <option>Professional Corporate Deck</option>
            <option>Creative/Artistic Deck</option>
            <option>Startup Pitch Deck</option>
            <option>Educational/Training Deck</option>
            <option>Sales Proposal</option>
          </select>
          <div className="absolute right-3 top-3 text-gray-500 pointer-events-none">
            ▼
          </div>
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-2">
          Instructions (Max 20,000 chars)
        </label>
        <textarea
          required
          maxLength={20000}
          rows={6}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
          placeholder="Describe your vision..."
          onChange={(e) =>
            setFormData({ ...formData, instructions: e.target.value })
          }
        />
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Send size={20} /> Submit Inquiry via Email
      </button>
    </form>
  );
};

const HireMeModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#111] border border-yellow-500 w-full max-w-lg rounded-none p-1 relative shadow-[0_0_50px_rgba(234,179,8,0.2)]">
        <div className="border border-white/10 p-8 h-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 text-black shadow-lg animate-pulse">
              <MousePointerClick size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">
              Let's Execute.
            </h2>
            <div className="h-1 w-24 bg-yellow-500 mx-auto mt-4" />
          </div>
          <div className="flex gap-4">
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="flex-1 bg-yellow-500 text-black font-bold py-4 hover:bg-white transition-colors text-center uppercase tracking-widest text-sm"
            >
              Initiate Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TimelineItemProps {
  data: {
    company: string;
    role: string;
    date: string;
    desc: string;
  };
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ data, isLast }) => (
  <div className="relative flex gap-6 pb-12 group">
    {!isLast && (
      <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gray-800 group-hover:bg-yellow-500/50 transition-colors" />
    )}
    <div className="relative z-10 w-10 h-10 rounded-full bg-gray-900 border-2 border-yellow-500 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(234,179,8,0.2)] group-hover:scale-110 transition-transform">
      <Crown size={18} className="text-yellow-500" />
    </div>
    <div className="flex-1 bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition-all hover:transform hover:translate-x-2 group-hover:shadow-lg group-hover:shadow-yellow-500/5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
        <h3 className="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors">
          {data.role}
        </h3>
        <span className="text-gray-500 text-xs font-bold uppercase tracking-wider border border-gray-700 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
          {data.date}
        </span>
      </div>
      <p className="text-gray-300 font-medium mb-3 flex items-center gap-2">
        <Briefcase size={14} className="text-yellow-500" /> {data.company}
      </p>
      <p className="text-gray-400 text-sm leading-relaxed">{data.desc}</p>
    </div>
  </div>
);

interface EducationData {
  school: string;
  degree: string;
  date: string;
}

const EducationCard = ({ data }: { data: EducationData }) => (
  <div className="bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition-all hover:-translate-y-1 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Gem size={80} className="text-yellow-500" />
    </div>
    <div className="relative z-10">
      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-500 transition-colors">
        {data.degree}
      </h3>
      <p className="text-gray-400 text-sm font-medium mb-4">{data.school}</p>
      <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest">
        <GraduationCap size={14} />
        {data.date}
      </div>
    </div>
  </div>
);

interface TestimonialData {
  name: string;
  role: string;
  text: string;
}

const TestimonialCard = ({ data }: { data: TestimonialData }) => (
  <div className="bg-[#111] p-8 rounded-xl border border-gray-800 relative group hover:border-yellow-500 transition-colors">
    <Quote
      size={40}
      className="text-gray-800 absolute top-4 right-4 group-hover:text-yellow-500/20 transition-colors"
    />
    <p className="text-gray-300 italic mb-6 relative z-10">"{data.text}"</p>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-yellow-500">
        {data.name.charAt(0)}
      </div>
      <div>
        <h4 className="text-white font-bold text-sm">{data.name}</h4>
        <p className="text-gray-500 text-xs">{data.role}</p>
      </div>
    </div>
  </div>
);

// Changed from App to Home for Next.js conventions
export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  interface ScrollToFunction {
    (id: string): void;
  }

  const scrollTo: ScrollToFunction = (id) => {
    setActiveSection(id);
    setSidebarOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "home", label: "Home", icon: Star, type: "internal" },
    { id: "/who-am-I", label: "Who I Am", icon: User, type: "external" },
    { id: "about", label: "About", icon: Target, type: "internal" },
    { id: "skills", label: "Skills", icon: Trophy, type: "internal" },
    { id: "projects", label: "Projects", icon: RookIcon, type: "internal" },
    { id: "experience", label: "Experience", icon: Crown, type: "internal" },
    { id: "education", label: "Education", icon: Gem, type: "internal" },
    { id: "contact", label: "Contact", icon: Mail, type: "internal" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-yellow-500 selection:text-black overflow-x-hidden">
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto bg-black/80 backdrop-blur-md border border-gray-800 p-3 rounded-none flex items-center gap-4 shadow-2xl hover:border-yellow-500 transition-colors group cursor-default">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-yellow-500 transition-colors">
            <img
              src={WHITE_KNIGHT_ICON_URL}
              alt="White Knight"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-white font-black text-xl tracking-tighter leading-none group-hover:text-yellow-500 transition-colors">
              <HoverText
                text="MUSTAFA"
                color="text-white group-hover:text-yellow-500"
              />
            </div>
            <span className="text-gray-500 font-bold text-xs tracking-[0.3em] leading-none mt-1 group-hover:text-white transition-colors">
              SAYYED
            </span>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="pointer-events-auto bg-white text-black p-3 hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <Menu size={24} strokeWidth={3} />
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-[#0a0a0a] z-50 transform transition-transform duration-500 ease-out border-l border-gray-800 shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 flex justify-between items-center border-b border-gray-900">
          <span className="text-xl font-bold text-white tracking-widest">
            MENU
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-8 space-y-4">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            // Use an anchor tag for external/new page routes
            const ComponentTag = item.type === "external" ? "a" : "button";

            return (
              <ComponentTag
                key={item.id}
                onClick={() =>
                  item.type === "external"
                    ? setSidebarOpen(false)
                    : scrollTo(item.id)
                }
                href={item.type === "external" ? item.id : undefined} // Only needed for anchor tags
                className={`w-full flex items-center gap-4 p-4 border border-transparent hover:border-gray-800 hover:bg-gray-900 transition-all group ${
                  activeSection === item.id
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                <IconComponent
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="uppercase tracking-wider text-sm font-bold group-hover:text-yellow-500 transition-colors">
                  {item.label}
                </span>
                <ChevronRight
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  size={16}
                />
              </ComponentTag>
            );
          })}
        </div>
      </div>

      {/* SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 z-40"
        />
      )}

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full mx-auto">
        {/* --- HERO SECTION --- */}
        <section
          id="home"
          className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20"
        >
          <div className="absolute inset-0 z-0">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-5"
              style={{
                backgroundImage: "radial-gradient(#555 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          <div className="container max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-center h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0 z-0 text-white/20 pointer-events-none">
              <WireframeKnight className="w-[600px] h-[600px] md:w-[900px] md:h-[900px]" />
            </div>

            <div className="relative z-10 mt-10 md:mt-0 order-2 md:order-1">
              <div className="relative w-[300px] md:w-[450px] h-[450px] md:h-[650px] flex items-end justify-center">
                <div className="absolute inset-0 bg-yellow-500/5 blur-[120px] rounded-full" />
                <img
                  src={USER_PHOTO_URL}
                  height={1200}
                  width={1200}
                  alt="Mustafa Sayyed"
                  className="relative z-20 object-contain drop-shadow-[0_0_25px_rgba(0,0,0,0.8)] filter contrast-110 brightness-110"
                />
              </div>
            </div>

            <div className="absolute z-30 w-full h-full pointer-events-none flex flex-col justify-between py-12 md:py-24">
              <div className="md:absolute md:top-1/3 md:left-0 text-center md:text-left pointer-events-auto">
                <div className="text-5xl md:text-8xl font-black text-white mb-2 tracking-tighter leading-[0.9]">
                  <div className="block">
                    <HoverText text="PROJECT" />
                  </div>
                  <div className="block text-yellow-500">
                    <HoverText text="MANAGER." color="text-yellow-500" />
                  </div>
                </div>
                <p className="text-gray-400 text-lg md:text-xl max-w-md mt-6 font-light border-l-2 border-yellow-500 pl-4">
                  {PROFILE_DATA.tagline}
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <span className="bg-gray-800 text-yellow-500 px-4 py-1 rounded-full text-sm font-bold border border-yellow-500/30">
                    Deck Specialist
                  </span>
                  <span className="text-gray-400 text-sm">
                    Creative & Professional Presentations
                  </span>
                </div>
              </div>

              <div className="md:absolute md:bottom-1/4 md:right-10 flex flex-col items-center md:items-end gap-4 pointer-events-auto mt-8 md:mt-0">
                <button
                  onClick={() => scrollTo("contact")}
                  className="group bg-white text-black px-8 py-4 font-bold text-lg hover:bg-yellow-500 transition-colors flex items-center gap-3 uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                >
                  Request A Deck
                  <MousePointerClick
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <div className="flex gap-6 mt-2">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">
                      <HoverText text="15+" />
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">
                      Projects
                    </p>
                  </div>
                  <div className="w-px h-10 bg-gray-800" />
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">
                      <HoverText text="3+" />
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">
                      Years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SubtleChessFloor />
        </section>

        <div className="max-w-5xl mx-auto px-6 relative z-20 bg-[#050505]">
          <section id="about" className="py-24 border-b border-gray-900">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="flex-1">
                <SectionHeading text="PROJECT LEADERSHIP" icon={Target} />
                <p className="text-xl text-gray-300 leading-relaxed mb-6 font-light">
                  Effective Project Management is not just about timelines; it's
                  about <strong>orchestrating value</strong>.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  I specialize in managing the chaos of complex lifecycles. I
                  also bring a unique edge:{" "}
                  <strong>World-Class Presentation Design</strong>. I transform
                  boring data into compelling stories that win stakeholders and
                  secure funding.
                </p>
                <p className="text-gray-500 text-sm italic border-l border-yellow-500 pl-4">
                  "Strategy without tactics is the slowest route to victory.
                  Tactics without strategy is the noise before defeat."
                </p>
              </div>
              <div className="w-full md:w-1/3 space-y-4">
                <div className="bg-[#111] p-6 border-l-4 border-yellow-500">
                  <h3 className="text-white font-bold mb-1">
                    Execution Focused
                  </h3>
                  <p className="text-sm text-gray-400">
                    Turning abstract goals into concrete deliverables.
                  </p>
                </div>
                <div className="bg-[#111] p-6 border-l-4 border-gray-700 hover:border-white transition-colors">
                  <h3 className="text-white font-bold mb-1">
                    Visual Storytelling
                  </h3>
                  <p className="text-sm text-gray-400">
                    Expert in creative & professional pitch decks.
                  </p>
                </div>
                <div className="bg-[#111] p-6 border-l-4 border-gray-700 hover:border-white transition-colors">
                  <h3 className="text-white font-bold mb-1">Risk Mitigation</h3>
                  <p className="text-sm text-gray-400">
                    Identifying bottlenecks before they impact the critical
                    path.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="py-24 border-b border-gray-900">
            <SectionHeading text="TECHNICAL ARSENAL" icon={Trophy} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {PROFILE_DATA.skills.map((skill, index) => (
                <SkillBar key={index} name={skill.name} level={skill.level} />
              ))}
            </div>
          </section>

          <section id="projects" className="py-24 border-b border-gray-900">
            <SectionHeading text="FEATURED PROJECTS & DECKS" icon={RookIcon} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROFILE_DATA.presentations.map((pres, idx) => (
                // HERE WE USE THE FILE URL TO MAKE IT CLICKABLE
                <a
                  key={idx}
                  href={pres.fileUrl ? pres.fileUrl : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-[#111] p-6 border border-gray-800 hover:border-yellow-500 transition-colors flex flex-col justify-between h-48 group cursor-pointer">
                    <div className="flex justify-between items-start">
                      <RookIcon
                        size={32}
                        className="text-gray-600 group-hover:text-white transition-colors"
                      />
                      <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">
                        {pres.type}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold leading-tight mb-2 group-hover:translate-x-1 transition-transform">
                        {pres.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Project File • {pres.size}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="experience" className="py-24 border-b border-gray-900">
            <SectionHeading text="PROFESSIONAL EXPERIENCE" icon={Briefcase} />
            <div className="pl-4 border-l border-gray-800 ml-4">
              {PROFILE_DATA.experience.map((exp, index) => (
                <TimelineItem
                  key={index}
                  data={exp}
                  isLast={index === PROFILE_DATA.experience.length - 1}
                />
              ))}
            </div>
          </section>

          <section id="education" className="py-24 border-b border-gray-900">
            <div className="flex justify-end mb-8">
              <div className="text-right">
                <h2 className="text-xl md:text-3xl font-bold text-white flex items-center justify-end gap-3 group">
                  <HoverText text="ACADEMIC FOUNDATION" />
                  <span className="bg-white text-black p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                    <Gem size={24} />
                  </span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROFILE_DATA.education.map((edu, idx) => (
                <EducationCard key={idx} data={edu} />
              ))}
            </div>
          </section>

          <section id="testimonials" className="py-24 border-b border-gray-900">
            <SectionHeading text="REVIEWS & REFERENCES" icon={Quote} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROFILE_DATA.testimonials.map((test, idx) => (
                <TestimonialCard key={idx} data={test} />
              ))}
            </div>
          </section>

          <section id="contact" className="py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <SectionHeading text="INITIATE CONTACT" icon={Mail} />
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Whether you need a full-time Project Manager to lead your team
                  or a specialist to craft a winning presentation deck, I am
                  ready to execute.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-[#111] p-4 rounded-lg border border-gray-800">
                    <Mail className="text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-white font-bold">
                        {PROFILE_DATA.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-[#111] p-4 rounded-lg border border-gray-800">
                    <Phone className="text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-white font-bold">
                        {PROFILE_DATA.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-[#111] p-4 rounded-lg border border-gray-800">
                    <Linkedin className="text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-500">LinkedIn</p>
                      <a
                        href={`https://${PROFILE_DATA.linkedin}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white font-bold hover:text-yellow-500 transition-colors"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <DeckInquiryForm />
              </div>
            </div>
          </section>
        </div>
      </div>

      <HireMeModal
        isOpen={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
      />

      <style>{`
        .mask-image-fade {
          mask-image: linear-gradient(to top, transparent, black);
          -webkit-mask-image: linear-gradient(to top, transparent, black);
        }
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
}
