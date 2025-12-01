"use client";
import React, { useState, useEffect } from "react";
import { Target, Heart, Zap, LucideIcon, Zap as ZapIcon, User, Layers, Handshake, Star, Crown, Gem, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

// --- TYPE DEFINITIONS ---

interface PassionDetail {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface VolunteeringStory {
  icon: LucideIcon;
  title: string;
  organization: string;
  description: string;
}

interface SectionHeadingProps {
  text: string;
  icon: LucideIcon;
}

// --- ASSETS & DATA ---
// NOTE: Please ensure these files are located in your project's 'public' directory
// You will replace these placeholders with the names of your actual photos in the public folder.
const PHOTO_GALLERY_URLS: string[] = [
    "/Professional.jpg", // Primary professional shot
    "/Social nondrinker.jpeg", // Volunteering or community work
    "/goa.jpg", // Strength training or wilderness
    "/Gym.jpg" // A casual/charming shot
    ];
const WHITE_KNIGHT_ICON_URL: string =
  "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=100&h=100&fit=crop&auto=format";

const PROFILE_DATA = {
  // Short Bio (approx 50-60 words)
  short_bio:
    "I am Mustafa Sayyed, and my life is defined by the powerful balance between precision engineering and limitless adventure. My professional journey from optimizing complex systems in Mechanical Engineering to leading multi-million dollar logistics as a Pricing Analyst—is proof of my intense focus and strategic intellect. Today, this discipline fuels my role as a Project Orchestrator, where I manage, build, and maximize value. Yet, this focus is not a constraint; it's a foundation. I am a free soul and a genuine wanderer who believes life is best lived fully, fueled by rich social bonds, shared laughter, and the necessity of escape. My greatest clarity is often found outside the city limits, ensuring I return to the high stakes world of business with an open mind and relentless drive. My core compass is simple: lead with an unbreakable heart, deliver with expert precision, and never stop seeking the next horizon.",

  passions_list: [
    {
      icon: Target,
      title: "Streangth Training",
      description:
        "When the screens fade, I enter my true element: the gym. This is my foundational discipline. The Reset Button: Training intensity is my ultimate mental cleanser, pushing out the constant calculations of my demanding professional roles. Engineered Stamina: I forge resilience here. The drive to push a final rep fuels my ability to push through complex projects and demanding negotiations. Peak Performance: I treat my mind and body as high performing systems, ensuring I always operate at full capacity and clarity.This discipline doesn't just manage stress, it guarantees my success.",
    },
    {
      icon: Layers,
      title: "Adventures of the wilderness",
      description:
        "When the strategy sessions end, I go where the signal drops: the mountains. My reset is pure adventure: friends, a truck loaded with our bikes, and the pursuit of soothing, silent nature. It’s an intentional escape from the noise. Driving high into the wilderness, camping under the stars, and tearing down a trail, this is where clarity is forged. The complexity of business is solved by the simplicity of the wild. This is where the Project Leader recharges their fire.",
    },
  ] as PassionDetail[],

  // VOLUNTEERING SECTION DATA
  volunteering: [
    {
      icon: Handshake,
      title: "The Covid Crisis",
      organization: "Local Nashik Friends Group",
      description:
        "During the most difficult days of the COVID crisis, I witnessed firsthand the desperation of foot travellers, people with nowhere to turn. This wasn't a business problem; it was a human crisis. My friends and I didn't wait. We immediately loaded a truck with essential fruits, food packets, and water bottles and drove out to distribute them. This simple act of filling a profound, immediate need provided both sustenance and dignity.",
    },
    {
      icon: Heart,
      title: "Anual Feasts",
      organization: "Local Nashik Friends Group",
      description:
        "My commitment is to radical fellowship. Every year, my friends and I organize two massive events built on welcome: The Annual Feast: We host a feast for 1,000 to 1,500 people a massive, unifying table open to everyone, rich or poor, from every background. Summer Relief: During the peak heat, we distribute cool, protein-rich milk drinks and cold drinks to anyone needing refreshment. This is more than giving; it's about building tangible community. We ensure everyone has a seat and essential care. My greatest purpose is building people up.",
    },
  ] as VolunteeringStory[],
};

// --- UTILITY COMPONENTS ---

// Dynamic Hover Text Component for reactivity
const HoverText: React.FC<{ text: string; color?: string }> = ({
  text,
  color = "text-white",
}) => {
  return (
    <span className={`inline-block cursor-default`}>
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

const PassionBlock: React.FC<{ passion: PassionDetail }> = ({ passion }) => {
  const IconComponent = passion.icon;
  return (
    <div className="bg-[#111] p-8 rounded-xl border border-gray-800 shadow-xl transition-all hover:shadow-yellow-500/10 hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <div className="bg-yellow-500 text-black p-3 rounded-full mr-4">
          <IconComponent size={24} />
        </div>
        <h3 className="text-xl font-bold text-white">{passion.title}</h3>
      </div>
      <p className="text-gray-400 leading-relaxed">{passion.description}</p>
    </div>
  );
};

const VolunteeringCard: React.FC<{ story: VolunteeringStory }> = ({
  story,
}) => {
  const IconComponent = story.icon;
  return (
    <div className="bg-[#111] p-6 rounded-xl border border-gray-800 shadow-xl transition-all hover:shadow-yellow-500/10 hover:border-yellow-500/50">
      <div className="flex items-center mb-4">
        <div className="bg-gray-800 text-yellow-500 p-3 rounded-full mr-4 border border-yellow-500/30">
          <IconComponent size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{story.title}</h3>
          <p className="text-sm text-gray-500 italic">{story.organization}</p>
        </div>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">
        {story.description}
      </p>
    </div>
  );
};

// --- NEW CAROUSEL COMPONENT ---
const PhotoCarousel: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const totalImages = PHOTO_GALLERY_URLS.length;

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    // Auto-advance the carousel every  seconds
    useEffect(() => {
        const timer = setInterval(nextImage, 5000);
        return () => clearInterval(timer);
    }, [totalImages]);


    return (
        <div className="w-full h-1/2 relative rounded-xl overflow-hidden shadow-2xl shadow-yellow-900/10 border-4 border-gray-800 hover:border-yellow-500 transition-colors duration-500 md:col-span-2 group">
            
            {/* Image Container with smooth transition */}
            <div 
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
                {PHOTO_GALLERY_URLS.map((url, index) => (
                    <div key={index} className="w-full flex-shrink-0 h-full relative">
                         <img
                            src={url}
                            alt={`Mustafa Sayyed - Gallery Photo ${index + 1}`}
                            className="w-full h-full object-cover object-center aspect-[16/9] md:aspect-auto"
                        />
                        {/* Semi-transparent overlay to keep the professional theme */}
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex justify-between items-center p-2 md:p-4">
                <button 
                    onClick={prevImage}
                    className="bg-black/50 text-white p-3 rounded-full hover:bg-yellow-500 hover:text-black transition-colors duration-300 shadow-lg"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={nextImage}
                    className="bg-black/50 text-white p-3 rounded-full hover:bg-yellow-500 hover:text-black transition-colors duration-300 shadow-lg"
                    aria-label="Next image"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {PHOTO_GALLERY_URLS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            index === currentImageIndex ? 'bg-yellow-500 scale-125' : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <p className="text-sm font-light text-white/90">
                    Image {currentImageIndex + 1} of {totalImages} | Personal Insight
                </p>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT (Must be 'use client' if hooks or interactivity are present) ---

const MoreAboutComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans overflow-x-hidden relative flex flex-col">
      {/* BACKGROUND CHARM: Subtle radial glow for soothing effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="w-1/3 h-1/3 bg-yellow-500/10 rounded-full blur-[100px] absolute top-10 left-10 animate-pulse" />
        <div className="w-1/4 h-1/4 bg-white/5 rounded-full blur-[80px] absolute bottom-10 right-10 animate-pulse delay-500" />
      </div>

      {/* HEADER BAR */}
      <header className="flex justify-between items-center p-6 md:p-12 border-b border-gray-800 pb-4 sticky top-0 z-20 bg-[#050505]/95 backdrop-blur-sm shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-500">
            <img
              src={WHITE_KNIGHT_ICON_URL}
              alt="Knight Icon"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-black text-white tracking-widest uppercase">
            {/* Applied HoverText to the name */}
            <HoverText text="Mustafa Sayyed" />
          </h1>
        </div>
        <a
          href="/"
          className="text-yellow-500 hover:text-white transition-colors font-bold flex items-center gap-2 border border-yellow-500 px-4 py-2 rounded-full shadow-md hover:shadow-lg"
        >
          <ZapIcon size={16} /> Back to Portfolio
        </a>
      </header>

      <div className="max-w-6xl mx-auto relative z-10 w-full flex-grow p-6 md:p-0">
        {/* --- 1. ABOUT ME (PHOTO + SHORT TEXT) SECTION --- */}
        <section id="about-me" className="py-12 border-b border-gray-800">
            <h1 className="text-2xl md:text-6xl font-extrabold text-white tracking-tight">
                <HoverText text="The Man Behind The Projects" color="text-yellow-500" />
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 items-center -mt-80">
                
                {/* DYNAMIC PHOTO CAROUSEL (2/3 width on desktop) */}
                <PhotoCarousel />
                
                {/* SHORT BIO COLUMN (1/3 width on desktop) */}
                <div className="w-full md:col-span-1 p-4">
                    <SectionHeading text="Who Am I?" icon={User} />
                    <p className="text-gray-300 leading-relaxed text-xl font-serif italic border-l-4 border-yellow-500 pl-4 py-2 shadow-sm">
                        "{PROFILE_DATA.short_bio}"
                    </p>
                    <p className="text-sm text-gray-600 mt-4">
                       — A brief summary of my professional drive.
                    </p>
                </div>
            </div>
        </section>

        {/* --- 2. PASSIONS SECTION --- (Personal & Professional Drivers) */}
        <section id="passions" className="py-12 border-b border-gray-800 -mt-96">
          <SectionHeading text="Things I love" icon={Heart} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {PROFILE_DATA.passions_list.slice(0, 2).map((passion, index) => (
              <PassionBlock key={index} passion={passion} />
            ))}
          </div>
        </section>

        {/* --- 3. VOLUNTEERING SECTION --- */}
        <section id="volunteering" className="py-12">
          <SectionHeading text="Community & Volunteering" icon={Handshake} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {PROFILE_DATA.volunteering.map((story, index) => (
              <VolunteeringCard key={index} story={story} />
            ))}
          </div>
        </section>
      </div>

      {/* Note: The main Layout or the caller of this component must add the Footer */}
    </div>
  );
};

// Export the component for use in your application.
export default MoreAboutComponent;
