import React, { useState } from 'react';
import { Compass, FileText, Sparkles, Terminal, AlertCircle } from 'lucide-react';
import { PROFILE_DATA } from '../../data/worldConfig';

interface HeroSectionProps {
  onExploreClick?: () => void;
  hasResumePdf?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  hasResumePdf = false, // Verified: public/resume.pdf is currently missing
}) => {
  const [showResumeNotice, setShowResumeNotice] = useState(false);

  const handleResumeButtonClick = (e: React.MouseEvent) => {
    if (!hasResumePdf) {
      e.preventDefault();
      setShowResumeNotice(true);
      setTimeout(() => setShowResumeNotice(false), 4500);
    }
  };

  return (
    <section className="flex flex-col items-start text-left max-w-2xl select-none relative">
      {/* Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/70 border border-emerald-500/40 backdrop-blur-md mb-4 shadow-lg">
        <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-widest text-emerald-300 font-semibold">
          Welcome to
        </span>
      </div>

      {/* Main Hero Heading */}
      <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
        AFNAN'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500">WORLD</span>
      </h1>

      {/* Verified Subtitles / Credentials */}
      <div className="space-y-2 mb-8">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-stone-200 text-sm md:text-base font-medium shadow-md">
          <Terminal className="w-4 h-4 text-amber-400 shrink-0" />
          <span>B.E. CSE Student (5th Sem) | AI Intern @ Salutix AI</span>
        </div>
        <p className="text-base sm:text-lg md:text-xl text-stone-200/90 font-sans font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Full-Stack Developer | AI/ML Enthusiast
        </p>
      </div>

      {/* Call to Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto relative">
        {/* Explore My World Button (Smoothly scrolls to About Section) */}
        <button
          onClick={onExploreClick}
          className="minecraft-btn px-6 py-3.5 rounded-xl font-cinzel font-bold text-amber-200 hover:text-white flex items-center justify-center gap-2.5 group cursor-pointer transition-all duration-200 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] w-full sm:w-auto"
        >
          <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
          <span className="tracking-wider">Explore My World</span>
        </button>

        {/* 
          View Resume Button:
          Disabled when public/resume.pdf is missing, with clear user explanation.
        */}
        {hasResumePdf ? (
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl font-cinzel font-semibold text-stone-200 hover:text-white bg-stone-900/60 hover:bg-stone-800/80 border border-white/20 backdrop-blur-md flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-200 hover:border-white/40 shadow-lg w-full sm:w-auto"
            title={`View PDF resume of ${PROFILE_DATA.fullName}`}
          >
            <FileText className="w-4 h-4 text-stone-300" />
            <span className="tracking-wider">View Resume</span>
          </a>
        ) : (
          <button
            type="button"
            onClick={handleResumeButtonClick}
            aria-disabled="true"
            className="px-6 py-3.5 rounded-xl font-cinzel font-semibold text-stone-400 bg-stone-900/40 border border-white/10 backdrop-blur-md flex items-center justify-center gap-2.5 cursor-not-allowed opacity-65 hover:opacity-85 transition-opacity shadow-sm w-full sm:w-auto"
            title="Resume PDF has not yet been placed into public/resume.pdf"
          >
            <FileText className="w-4 h-4 text-stone-400" />
            <span className="tracking-wider">View Resume</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-amber-400/90 border border-amber-500/20">
              PDF Pending
            </span>
          </button>
        )}

        {/* Clear Explanation Notice when clicked while missing */}
        {showResumeNotice && (
          <div className="absolute -bottom-14 left-0 sm:left-auto right-0 sm:right-auto z-30 px-3.5 py-2 rounded-lg bg-stone-900/95 border border-amber-500/50 text-amber-200 text-xs font-mono shadow-2xl flex items-center gap-2 backdrop-blur-md animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Resume file is missing from <code>public/resume.pdf</code>. Upload it to enable downloading.</span>
          </div>
        )}
      </div>
    </section>
  );
};
