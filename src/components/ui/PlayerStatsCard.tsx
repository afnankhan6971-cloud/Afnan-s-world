import React from 'react';
import { User, Heart, GraduationCap, Briefcase, Code } from 'lucide-react';
import { PROFILE_DATA } from '../../data/worldConfig';

export const PlayerStatsCard: React.FC = () => {
  const profile = PROFILE_DATA;

  return (
    <div className="minecraft-panel w-full max-w-sm rounded-2xl p-5 border border-amber-500/30 text-stone-100 select-none shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl">
      {/* Header with Player Badge */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          {/* Pixel-art Avatar Head Placeholder */}
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 via-amber-700 to-stone-900 border-2 border-amber-400/60 p-0.5 flex items-center justify-center shadow-md">
            <span className="font-pixel text-xl text-amber-200 font-bold">AK</span>
          </div>
          <div>
            <h2 className="font-cinzel text-base font-bold text-amber-200 tracking-wide">
              {profile.fullName}
            </h2>
            <p className="text-[11px] font-mono text-stone-300 font-medium">
              {profile.headline}
            </p>
          </div>
        </div>

        {/* Academic Tag */}
        <div className="px-2.5 py-1 rounded bg-stone-900/90 border border-white/10 flex items-center gap-1.5">
          <span className="font-mono text-[11px] text-stone-300 font-medium">
            Semester 5
          </span>
        </div>
      </div>

      {/* 
        Decorative Game UI Hearts
        Explicitly labeled as game UI aesthetic, not health metrics
      */}
      <div className="mb-4 bg-black/30 p-2.5 rounded-lg border border-white/5">
        <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-1.5">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3 text-amber-400" />
            <span>Character HUD</span>
          </span>
          <span className="text-stone-400 uppercase tracking-wider text-[9px]">Game UI (Decorative)</span>
        </div>
        <div className="flex items-center gap-1 text-red-500">
          {Array.from({ length: 10 }).map((_, i) => (
            <Heart key={i} className="w-3.5 h-3.5 fill-red-500 text-red-600" />
          ))}
        </div>
      </div>

      {/* Profile Attributes List */}
      <div className="space-y-2 text-xs font-mono">
        {/* Current Role */}
        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-start gap-2.5">
          <Briefcase className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Current Experience</span>
            <span className="text-amber-200 font-semibold text-xs">{profile.currentRole}</span>
          </div>
        </div>

        {/* Education */}
        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-start gap-2.5">
          <GraduationCap className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Education Pathway</span>
            <span className="text-stone-200 text-xs font-medium block">
              {profile.degree} • {profile.semester}
            </span>
            <span className="text-stone-400 text-[11px] block mt-0.5">
              {profile.institution} (Expected {profile.expectedGraduation})
            </span>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-stone-400 mb-1.5">
            <Code className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Skills</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {profile.languages.map((lang, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-[11px]"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
