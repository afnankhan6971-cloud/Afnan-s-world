import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  BookOpen,
  Compass,
  FileText,
  Shield,
  Layers,
} from 'lucide-react';
import { INTERNSHIP_DATA, ACADEMIC_DATA } from '../../data/worldConfig';
import { ScrollReveal } from './ScrollReveal';

export const ExperienceSection: React.FC = () => {
  const internship = INTERNSHIP_DATA;
  const academic = ACADEMIC_DATA;

  return (
    <section
      id="experience"
      className="relative z-20 py-20 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto select-none scroll-mt-24"
      aria-labelledby="experience-title"
    >
      {/* Section Header */}
      <ScrollReveal duration={550} distance={20}>
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-emerald-500/40 backdrop-blur-md mb-3 shadow-md">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-300 font-semibold">
              Quest Log // Professional Journey
            </span>
          </div>
          <h2
            id="experience-title"
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          >
            PROFESSIONAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-500">QUEST LOG</span> & JOURNEY
          </h2>
          <p className="mt-2 text-stone-300 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
            Documenting verified industry internship experience, assigned technical workflows, and academic computer science progression.
          </p>
        </div>
      </ScrollReveal>

      {/* Main Grid: Responsive Timeline (Left) & Detailed Quest Dossiers (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: Vertical Minecraft Quest Progression Timeline */}
        {/* ======================================================== */}
        <ScrollReveal duration={600} delay={80} distance={22} className="lg:col-span-5 space-y-6">
          <div className="minecraft-panel rounded-2xl p-6 sm:p-7 border-2 border-emerald-500/30 bg-stone-950/85 backdrop-blur-md shadow-xl">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-amber-200">
                    Quest Progression
                  </h3>
                  <p className="text-[11px] font-mono text-stone-400">
                    Chronological Milestones
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                2 Milestones
              </span>
            </div>

            {/* Vertical Stepped Timeline Track */}
            <div className="relative pl-6 sm:pl-8 space-y-8">
              {/* Animated Connecting Timeline Line (CSS scaleY transition) */}
              <div
                className="timeline-track-line absolute left-3 sm:left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-emerald-400 via-amber-400 to-stone-700/60 rounded-full"
                aria-hidden="true"
              />

              {/* Timeline Item 1: Current AI Internship */}
              <ScrollReveal delay={120} duration={600} distance={16} className="relative group">
                {/* Glowing Minecraft Diamond Node with Beacon Pulse */}
                <div className="active-quest-beacon absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-md bg-stone-950 border-2 border-emerald-400 flex items-center justify-center transition-all duration-300">
                  <div className="w-2.5 h-2.5 bg-emerald-400 rotate-45 animate-pulse shadow-[0_0_8px_#34d399]" />
                </div>
                <div className="p-4 rounded-xl bg-stone-900/70 border border-emerald-500/30 hover:border-emerald-400/60 transition-colors">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                      Active Quest #01
                    </span>
                    <span className="text-[11px] font-mono text-emerald-300 flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      Ongoing
                    </span>
                  </div>
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-stone-100 group-hover:text-emerald-300 transition-colors">
                    {internship.role}
                  </h4>
                  <p className="text-xs font-sans text-amber-300 font-medium mt-0.5">
                    {internship.organization} • {internship.workMode}
                  </p>
                  <p className="text-[11px] font-mono text-stone-400 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-500" />
                    {internship.duration}
                  </p>
                </div>
              </ScrollReveal>

              {/* Timeline Item 2: Academic Degree */}
              <ScrollReveal delay={220} duration={600} distance={16} className="relative group">
                {/* Minecraft Diamond Node */}
                <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-md bg-stone-950 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_10px_rgba(251,191,36,0.4)] group-hover:shadow-[0_0_16px_rgba(251,191,36,0.7)] transition-shadow">
                  <div className="w-2.5 h-2.5 bg-amber-400 rotate-45" />
                </div>
                <div className="p-4 rounded-xl bg-stone-900/70 border border-amber-500/30 hover:border-amber-400/60 transition-colors">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-semibold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                      Academic Quest #02
                    </span>
                    <span className="text-[11px] font-mono text-amber-300 font-semibold">
                      In Progress
                    </span>
                  </div>
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {academic.degree}
                  </h4>
                  <p className="text-xs font-sans text-amber-200 mt-0.5">
                    {academic.institution}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-stone-400 mt-1.5">
                    <span className="text-emerald-400 font-medium">
                      Current: {academic.semester}
                    </span>
                    <span>•</span>
                    <span className="text-stone-300">
                      Expected {academic.expectedGraduation}
                    </span>
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* Verification & Integrity Footer Note */}
            <div className="mt-8 pt-5 border-t border-white/10 flex items-start gap-2.5 p-3 rounded-xl bg-stone-900/50 border border-white/5">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-[11px] font-sans text-stone-300 leading-relaxed">
                <span className="font-semibold text-emerald-300">Verified Experience Only:</span> Milestones strictly represent documented academic registration and the official Salutix AI internship offer.
              </p>
            </div>

          </div>
        </ScrollReveal>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Detailed Internship Experience Dossier */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Card: Salutix AI Internship Details */}
          <ScrollReveal duration={600} delay={140} distance={22}>
            <div className="minecraft-panel rounded-2xl p-6 sm:p-8 border-2 border-amber-500/40 bg-stone-950/90 backdrop-blur-md shadow-2xl relative">
            
            {/* Header / Badges */}
            <div className="flex flex-wrap items-start justify-between gap-3 pb-5 mb-5 border-b border-white/10">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 uppercase tracking-wider">
                    {internship.status}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-stone-900 border border-white/10 text-stone-300">
                    {internship.employmentType}
                  </span>
                </div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200">
                  {internship.role}
                </h3>
                <p className="text-sm font-semibold text-stone-200 mt-0.5 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>{internship.organization}</span>
                  <span className="text-stone-500">•</span>
                  <span className="text-emerald-400 font-mono text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {internship.workMode}
                  </span>
                </p>
              </div>

              {/* Duration Badge */}
              <div className="p-2.5 rounded-xl bg-stone-900/90 border border-amber-500/30 text-right">
                <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                  Internship Period
                </div>
                <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{internship.duration}</span>
                </div>
              </div>
            </div>

            {/* Neutral Overview Paragraph */}
            <div className="mb-6">
              <h4 className="font-cinzel text-xs uppercase tracking-wider font-bold text-stone-300 flex items-center gap-1.5 mb-2">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Role Overview</span>
              </h4>
              <p className="text-stone-300 text-xs sm:text-sm font-sans leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5">
                {internship.overview}
              </p>
            </div>

            {/* Dedicated Internship Project Card: CareerPilot */}
            <div className="mb-6">
              <div className="minecraft-panel rounded-xl p-5 border-2 border-emerald-500/40 bg-gradient-to-br from-stone-950 via-stone-900/90 to-emerald-950/30 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-inner">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                        Assigned Internship Project
                      </div>
                      <h4 className="font-cinzel text-base font-bold text-amber-200">
                        {internship.assignedProject.title}
                      </h4>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-amber-950/70 border border-amber-500/40 text-amber-300">
                    {internship.assignedProject.status}
                  </span>
                </div>

                <p className="text-stone-300 text-xs sm:text-sm font-sans leading-relaxed mb-3">
                  {internship.assignedProject.description}
                </p>

                <div className="flex items-start gap-2 pt-2.5 border-t border-white/5 text-[11px] font-mono text-stone-400">
                  <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    <span className="text-stone-300 font-medium">Assignment Context:</span> Working within the assigned project scope under Salutix AI. (Maintained distinct from separate portfolio project records).
                  </p>
                </div>
              </div>
            </div>

            {/* Assigned Scope & Responsibilities (Offer Letter Responsibilities) */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="font-cinzel text-xs uppercase tracking-wider font-bold text-stone-200 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                  <span>Assigned Responsibilities</span>
                </h4>
                <span className="text-[10px] font-mono text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-white/10">
                  Internship Offer Scope
                </span>
              </div>
              
              <p className="text-[11px] font-sans text-stone-400 mb-3 italic">
                The internship offer letter outlines the following assigned technical responsibilities (ongoing work in progress, not claims of completed deliverables):
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {internship.listedResponsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="w-4 h-4 rounded-sm bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rotate-45" />
                    </div>
                    <span className="text-xs font-sans text-stone-300 leading-snug">
                      {resp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
          </ScrollReveal>

          {/* Academic Milestone Card */}
          <ScrollReveal duration={600} delay={220} distance={22}>
            <div className="minecraft-panel rounded-2xl p-6 sm:p-7 border-2 border-white/10 hover:border-amber-500/30 bg-stone-950/80 backdrop-blur-md shadow-xl transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-900 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-inner">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-base sm:text-lg font-bold text-amber-100">
                      {academic.degree}
                    </h4>
                    <p className="text-xs font-sans text-stone-300">
                      {academic.institution}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                  Current: {academic.semester}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400 block mb-1">
                    Timeline & Status
                  </span>
                  <p className="text-stone-200 font-medium">
                    Expected Graduation: {academic.expectedGraduation}
                  </p>
                  <p className="text-stone-400 text-[11px] mt-0.5">
                    Academic progression in good standing
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400 block mb-1">
                    Core Engineering Scope
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {academic.focusAreas.map((area, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-stone-900 border border-white/10 text-[10px] font-mono text-stone-300"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
