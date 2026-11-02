import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Medal,
  Award,
  Sparkles,
  Compass,
  Calendar,
  MapPin,
  Users,
  Shield,
  X,
  Star,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';
import { ACHIEVEMENTS_DATA, ADDITIONAL_ACTIVITIES_DATA } from '../../data/worldConfig';
import { AchievementItem, AdditionalActivityItem } from '../../types';
import { ScrollReveal } from './ScrollReveal';

export const AchievementsSection: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  // Keyboard accessibility: Escape key to dismiss modal + scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedAchievement(null);
      }
    };

    if (selectedAchievement) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedAchievement]);

  const handleCardKeyDown = (e: React.KeyboardEvent, item: AchievementItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedAchievement(item);
    }
  };

  return (
    <section
      id="achievements"
      className="relative z-20 py-20 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto select-none scroll-mt-24"
      aria-labelledby="achievements-title"
    >
      {/* Section Header */}
      <ScrollReveal duration={550} distance={20}>
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/40 backdrop-blur-md mb-3 shadow-md">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-300 font-semibold">
              Advancement System // Trophies & Expeditions
            </span>
          </div>
          <h2
            id="achievements-title"
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          >
            ACHIEVEMENTS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400">HACKATHONS</span>
          </h2>
          <p className="mt-2 text-stone-300 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
            Minecraft-inspired advancements showcasing verified hackathon awards, regional technical expeditions, and collegiate engineering symposiums.
          </p>

          {/* Type Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-xs font-mono">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-amber-500/40 text-amber-200">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Advancement: Challenge Complete (Awards)</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-emerald-500/40 text-emerald-200">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Advancement: Goal Reached (Participation)</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ======================================================== */}
      {/* 1. PRIMARY HACKATHON ADVANCEMENTS GRID */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        
        {/* Featured Card: Salutix AI Innovation Hackathon (Spans full width or 6 cols on lg) */}
        {ACHIEVEMENTS_DATA.map((item, idx) => {
          const isAward = item.type === 'award';
          const isFeatured = item.isFeatured;

          return (
            <ScrollReveal
              key={item.id}
              delay={idx * 100}
              duration={550}
              distance={22}
              className={isFeatured ? 'lg:col-span-12' : 'lg:col-span-6'}
            >
              <div
                role="button"
                tabIndex={0}
                aria-label={`Inspect advancement: ${item.title}`}
                onClick={() => setSelectedAchievement(item)}
                onKeyDown={(e) => handleCardKeyDown(e, item)}
                className={`minecraft-panel w-full rounded-2xl p-6 sm:p-7 border-2 transition-all duration-300 group cursor-pointer flex flex-col justify-between focus:outline-none focus-visible:ring-2 ${
                  isAward
                    ? 'border-amber-400/70 hover:border-amber-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(251,191,36,0.22)] bg-gradient-to-br from-amber-950/30 via-stone-950/90 to-stone-900 shadow-[0_0_25px_rgba(251,191,36,0.15)] focus-visible:ring-amber-400'
                    : 'border-emerald-500/30 hover:border-emerald-400/80 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(52,211,153,0.2)] bg-stone-950/85 hover:bg-stone-900/90 shadow-xl focus-visible:ring-emerald-400'
                }`}
              >
                <div>
                  {/* Advancement Header Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10">
                    <span className="font-mono text-[11px] text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Shield className={`w-3.5 h-3.5 ${isAward ? 'text-amber-400' : 'text-emerald-400'}`} />
                      <span>{item.advancementCode}</span>
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider ${
                        isAward
                          ? 'bg-amber-950/80 border border-amber-500/50 text-amber-300'
                          : 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                      }`}
                    >
                      {item.recognition}
                    </span>
                  </div>

                  {/* Card Title & Icon */}
                  <div className="flex items-start gap-4 mb-3.5">
                    <div
                      className={`w-12 h-12 rounded-xl border p-2 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform ${
                        isAward
                          ? 'bg-gradient-to-br from-amber-900/60 to-stone-950 border-amber-400/60 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                          : 'bg-gradient-to-br from-emerald-900/60 to-stone-950 border-emerald-400/50 text-emerald-300'
                      }`}
                    >
                      {isAward ? <Trophy className="w-6 h-6" /> : <Medal className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3
                        className={`font-cinzel text-lg sm:text-xl font-bold transition-colors leading-snug ${
                          isAward
                            ? 'text-amber-200 group-hover:text-amber-100'
                            : 'text-stone-100 group-hover:text-emerald-300'
                        }`}
                      >
                        {item.title}
                      </h3>
                      {item.organization && (
                        <p className="text-xs font-mono text-stone-300 mt-0.5">
                          Organized by: <span className="text-amber-300 font-semibold">{item.organization}</span>
                          {item.institutionContext && ` (${item.institutionContext})`}
                        </p>
                      )}
                      {item.event && !item.organization && (
                        <p className="text-xs font-mono text-emerald-400 mt-0.5">
                          {item.event}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Summary / Description */}
                  <p className="text-stone-300 text-xs sm:text-sm font-sans leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Card Meta / Location / Dates */}
                <div className="pt-3 border-t border-white/10">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-mono text-stone-400 mb-3">
                    {item.dates && (
                      <span className="flex items-center gap-1.5 text-stone-300">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span>{item.dates}</span>
                      </span>
                    )}
                    {item.venue && (
                      <span className="flex items-center gap-1.5 text-stone-300">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span className="truncate max-w-xs">{item.venue}</span>
                      </span>
                    )}
                    {item.team && (
                      <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <Users className="w-3.5 h-3.5" />
                        <span>Team {item.team}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-stone-400 group-hover:text-amber-300 transition-colors">
                    <span className="flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Inspect Advancement Lore</span>
                    </span>
                    <span className="text-stone-500 group-hover:text-amber-300 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 2. ADDITIONAL VERIFIED TECHNICAL ACTIVITIES & COMPETITIONS */}
      {/* ======================================================== */}
      <ScrollReveal duration={600} delay={120} distance={22}>
        <div className="minecraft-panel rounded-2xl p-6 sm:p-8 border-2 border-white/10 bg-stone-950/80 backdrop-blur-md shadow-xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-900 border border-white/15 flex items-center justify-center text-amber-300 shadow-inner">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-amber-100">
                  Additional Technical Expeditions
                </h3>
                <p className="text-[11px] font-mono text-stone-400">
                  Collegiate Symposiums, Robotics & Academic Competitions
                </p>
              </div>
            </div>
            <span className="self-start sm:self-auto px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-stone-900 border border-white/10 text-stone-300">
              {ADDITIONAL_ACTIVITIES_DATA.length} Verified Records
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ADDITIONAL_ACTIVITIES_DATA.map((act: AdditionalActivityItem) => {
              const isAward = act.type === 'award';

              return (
                <div
                  key={act.id}
                  className={`p-4 rounded-xl border transition-colors flex flex-col justify-between ${
                    isAward
                      ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
                      : 'bg-black/40 border-white/10 hover:border-emerald-500/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="font-mono text-[10px] text-stone-400 uppercase">
                        {act.yearOrPeriod}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isAward
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                            : 'bg-stone-900 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {act.recognition}
                      </span>
                    </div>

                    <h4 className="font-cinzel text-sm font-bold text-stone-100 mb-1">
                      {act.title}
                    </h4>
                    <p className="text-[11px] font-mono text-amber-300/90 mb-2">
                      {act.event}
                    </p>
                    <p className="text-stone-300 text-xs font-sans leading-relaxed">
                      {act.description}
                    </p>
                  </div>

                  {act.venueOrContext && (
                    <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-stone-400">
                      <MapPin className="w-3 h-3 text-stone-500 shrink-0" />
                      <span className="truncate">{act.venueOrContext}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </ScrollReveal>

      {/* ======================================================== */}
      {/* 3. ACCESSIBLE ADVANCEMENT DETAIL MODAL */}
      {/* ======================================================== */}
      {selectedAchievement && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-advancement-title"
          className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 bg-black/80 backdrop-blur-md flex items-center justify-center animate-fadeIn"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="minecraft-panel max-w-2xl w-full my-auto max-h-[85vh] overflow-y-auto overscroll-contain rounded-2xl p-6 sm:p-8 border-2 border-amber-500/50 bg-stone-950 text-stone-100 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative focus:outline-none"
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal body click
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedAchievement(null)}
              aria-label="Close advancement inspection"
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-xl bg-stone-900 border border-white/10 hover:border-amber-400 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pr-12 pb-4 mb-5 border-b border-white/10">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
                {selectedAchievement.advancementCode}
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <h3
                  id="modal-advancement-title"
                  className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200"
                >
                  {selectedAchievement.title}
                </h3>
                <span
                  className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold uppercase ${
                    selectedAchievement.type === 'award'
                      ? 'bg-amber-950/80 border border-amber-500/50 text-amber-300'
                      : 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                  }`}
                >
                  {selectedAchievement.recognition}
                </span>
              </div>
            </div>

            {/* Modal Body: Verified Technical Details */}
            <div className="space-y-5 text-xs sm:text-sm font-sans">
              
              {/* Description */}
              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-wider font-bold text-amber-300 flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Advancement Lore & Summary</span>
                </h4>
                <p className="text-stone-300 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/5">
                  {selectedAchievement.description}
                </p>
              </div>

              {/* Verified Record Checklist */}
              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-wider font-bold text-emerald-300 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Event Credentials</span>
                </h4>
                <div className="space-y-2">
                  {selectedAchievement.verifiedDetails.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-black/30 border border-white/5 font-mono text-xs text-stone-200"
                    >
                      <div className="w-3.5 h-3.5 rounded-xs bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rotate-45" />
                      </div>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate & Documentation Notice Placeholder */}
              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-white/10 flex items-start gap-3">
                <FileCheck2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs font-sans text-stone-400">
                  <span className="font-semibold text-stone-200 block mb-0.5">
                    Credential Verification Notice
                  </span>
                  Physical/institutional certificates maintained per official event records. In compliance with strict credibility guidelines, no unverified downloads or placeholder certificate images are displayed.
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedAchievement(null)}
                className="minecraft-btn px-5 py-2 rounded-xl text-xs font-mono font-semibold text-stone-200 hover:text-white cursor-pointer"
              >
                Close Lore
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

