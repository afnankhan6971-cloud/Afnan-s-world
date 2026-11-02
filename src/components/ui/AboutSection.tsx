import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  Code2,
  Cpu,
  BookOpen,
  Sparkles,
  Compass,
  Database,
  Layers,
  FileCode2,
  Terminal,
} from 'lucide-react';
import { PROFILE_DATA } from '../../data/worldConfig';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  const profile = PROFILE_DATA;
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  // Technical Inventory Items (Languages & Core Developer Interests)
  const inventorySlots = [
    {
      id: 0,
      name: 'Python',
      category: 'Language (Resume Listed)',
      icon: Terminal,
      color: 'text-amber-300',
      tag: 'Core Language',
      description: 'Used for coursework, algorithms, data processing scripts, and machine learning prototypes.',
    },
    {
      id: 1,
      name: 'Java',
      category: 'Language (Resume Listed)',
      icon: Code2,
      color: 'text-orange-400',
      tag: 'Core Language',
      description: 'Object-oriented programming, data structures, and foundational software concepts.',
    },
    {
      id: 2,
      name: 'SQL',
      category: 'Language (Resume Listed)',
      icon: Database,
      color: 'text-cyan-400',
      tag: 'Database Queries',
      description: 'Writing relational queries, table relationships, and schema structuring.',
    },
    {
      id: 3,
      name: 'HTML5',
      category: 'Language (Resume Listed)',
      icon: FileCode2,
      color: 'text-red-400',
      tag: 'Markup Language',
      description: 'Semantic document outlines and accessible structure for web applications.',
    },
    {
      id: 4,
      name: 'CSS3',
      category: 'Language (Resume Listed)',
      icon: Layers,
      color: 'text-blue-400',
      tag: 'Styling',
      description: 'Responsive styling, Flexbox, Grid, transitions, and user interface styling.',
    },
    {
      id: 5,
      name: 'Full-Stack Dev',
      category: 'Interest Area',
      icon: Compass,
      color: 'text-emerald-400',
      tag: 'Web Architecture',
      description: 'Developing responsive web interfaces connected to backend APIs and databases.',
    },
    {
      id: 6,
      name: 'Software Engineering',
      category: 'Interest Area',
      icon: Cpu,
      color: 'text-purple-400',
      tag: 'Methodology',
      description: 'Modular code structuring, testing fundamentals, and clean code principles.',
    },
    {
      id: 7,
      name: 'AI / Machine Learning',
      category: 'Interest Area',
      icon: Sparkles,
      color: 'text-amber-400',
      tag: 'Applied AI',
      description: 'Exploring machine learning concepts, computer vision pipelines, and analytical tools.',
    },
    {
      id: 8,
      name: 'Generative AI',
      category: 'Interest Area',
      icon: BookOpen,
      color: 'text-rose-400',
      tag: 'Next-Gen Models',
      description: 'Experimenting with prompt formulation, multimodal LLM APIs, and agent workflows.',
    },
  ];

  return (
    <section id="about" className="relative z-20 py-20 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto select-none scroll-mt-24">
      {/* Section Header */}
      <ScrollReveal duration={550} distance={20}>
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/40 backdrop-blur-md mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-300 font-semibold">
              Player Profile // Inventory
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            ABOUT THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">ADVENTURER</span>
          </h2>
          <p className="mt-2 text-stone-300 font-sans text-sm sm:text-base max-w-2xl">
            A Minecraft-inspired overview of academic background, technical skills, and engineering interests.
          </p>
        </div>
      </ScrollReveal>

      {/* Main Inventory Window Panel */}
      <ScrollReveal duration={600} delay={100} distance={22}>
        <div className="minecraft-panel rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-white/15 bg-stone-950/80 shadow-2xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pixel Character Placeholder & Details */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-full bg-black/40 border border-white/10 rounded-xl p-5 flex flex-col items-center relative shadow-inner">
              <span className="font-pixel text-xs text-stone-400 uppercase tracking-widest mb-3 self-start">
                // Character Model Preview
              </span>

              {/* Pixel-style character avatar placeholder */}
              <div className="relative w-36 h-48 sm:w-44 sm:h-56 flex items-center justify-center my-2 group">
                <svg
                  viewBox="0 0 64 80"
                  className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-105"
                  shapeRendering="crispEdges"
                >
                  {/* Hair / Headgear */}
                  <rect x="22" y="4" width="20" height="6" fill="#3e2723" />
                  <rect x="20" y="8" width="24" height="4" fill="#4e342e" />
                  
                  {/* Face */}
                  <rect x="22" y="12" width="20" height="14" fill="#d7ccc8" />
                  {/* Pixel Eyes */}
                  <rect x="24" y="16" width="3" height="3" fill="#ffffff" />
                  <rect x="25" y="16" width="2" height="3" fill="#1e88e5" />
                  <rect x="37" y="16" width="3" height="3" fill="#ffffff" />
                  <rect x="37" y="16" width="2" height="3" fill="#1e88e5" />
                  {/* Smile */}
                  <rect x="28" y="22" width="8" height="2" fill="#8d6e63" />

                  {/* Body / Tunic */}
                  <rect x="18" y="26" width="28" height="22" fill="#1565c0" />
                  <rect x="26" y="26" width="12" height="22" fill="#0d47a1" />
                  <rect x="28" y="28" width="8" height="8" fill="#e0e0e0" />

                  {/* Arms */}
                  <rect x="10" y="26" width="8" height="20" fill="#1565c0" />
                  <rect x="10" y="40" width="8" height="6" fill="#d7ccc8" />
                  <rect x="46" y="26" width="8" height="20" fill="#1565c0" />
                  <rect x="46" y="40" width="8" height="6" fill="#d7ccc8" />

                  {/* Belt */}
                  <rect x="18" y="48" width="28" height="4" fill="#3e2723" />
                  <rect x="29" y="48" width="6" height="4" fill="#ffb300" />

                  {/* Legs */}
                  <rect x="20" y="52" width="11" height="20" fill="#283593" />
                  <rect x="33" y="52" width="11" height="20" fill="#1a237e" />

                  {/* Boots */}
                  <rect x="20" y="70" width="11" height="6" fill="#212121" />
                  <rect x="33" y="70" width="11" height="6" fill="#212121" />
                </svg>

                {/* Subtitle Tag */}
                <div className="absolute bottom-0 inset-x-0 text-center">
                  <span className="px-2 py-0.5 rounded bg-black/80 border border-amber-500/30 text-[10px] font-mono text-amber-300">
                    Pixel Avatar Placeholder
                  </span>
                </div>
              </div>

              {/* Character Details */}
              <div className="w-full mt-3 pt-3 border-t border-white/10 text-center">
                <h3 className="font-cinzel text-lg font-bold text-amber-200">
                  {profile.fullName}
                </h3>
                <p className="text-xs font-mono text-emerald-400 mt-0.5">
                  {profile.currentRole}
                </p>
                <p className="text-[11px] font-mono text-stone-400 mt-0.5">
                  {profile.institution}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: About Narrative & Quest Timeline */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            
            {/* Professional Narrative (Neutral wording, no unverified claims) */}
            <div className="bg-black/35 border border-white/10 rounded-xl p-5 shadow-inner">
              <div className="flex items-center gap-2 mb-2.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <h4 className="font-cinzel text-sm font-bold uppercase tracking-wider text-amber-200">
                  About Me // Overview
                </h4>
              </div>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans">
                I am an undergraduate Computer Science & Engineering student in my 5th semester at <strong className="text-stone-100">Jain Institute of Technology, Davangere</strong>, and an <strong className="text-amber-200">AI Intern at Salutix AI</strong>. 
                My academic focus centers on full-stack web development, software engineering fundamentals, and exploring machine learning tools.
              </p>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans mt-3">
                I work primarily with Python, Java, SQL, HTML, and CSS, while continuously expanding my technical knowledge through coursework, prototypes, and applied projects.
              </p>
            </div>

            {/* Education Timeline */}
            <div className="bg-black/35 border border-white/10 rounded-xl p-5 shadow-inner">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-cinzel text-sm font-bold uppercase tracking-wider text-emerald-300">
                    Academic Progression
                  </h4>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Active
                </span>
              </div>

              {/* Stepped Quest Line */}
              <div className="space-y-3 font-mono text-xs">
                {/* Milestone 1: College Degree (5th Semester) */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-900/60 border border-white/5">
                  <div className="w-6 h-6 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0 font-bold text-xs mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="font-bold text-stone-100">{profile.degree}</span>
                      <span className="text-[11px] text-amber-300 font-semibold">
                        Expected {profile.expectedGraduation}
                      </span>
                    </div>
                    <p className="text-emerald-400 font-semibold text-[11px] mt-0.5">
                      Current Semester: {profile.semester}
                    </p>
                    <p className="text-stone-400 text-[11px] mt-0.5">
                      {profile.institution}
                    </p>
                  </div>
                </div>

                {/* Milestone 2: Internship (Neutral description, no unverified deliverables) */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-900/60 border border-white/5">
                  <div className="w-6 h-6 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 font-bold text-xs mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="font-bold text-stone-100">AI Intern</span>
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        Current Experience
                      </span>
                    </div>
                    <p className="text-amber-200 text-[11px] mt-0.5">
                      Salutix AI
                    </p>
                    <p className="text-stone-400 text-[10px] mt-0.5">
                      Interning at Salutix AI, gaining exposure to applied machine learning concepts and technical workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: Minecraft Inventory Grid for Skills & Interests */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <h4 className="font-cinzel text-sm font-bold uppercase tracking-wider text-stone-200">
                Skills & Interests Inventory
              </h4>
            </div>
            <span className="text-[11px] font-mono text-stone-400">
              Click or hover an item slot to inspect details
            </span>
          </div>

          {/* 9-Slot Inventory Hotbar (Arbitrary numbers removed) */}
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2.5">
            {inventorySlots.map((slot) => {
              const Icon = slot.icon;
              const isSelected = activeSlot === slot.id;
              return (
                <button
                  key={slot.id}
                  onClick={() => setActiveSlot(isSelected ? null : slot.id)}
                  className={`inventory-slot h-16 sm:h-20 rounded-xl p-2 flex flex-col items-center justify-center gap-1 cursor-pointer relative group ${
                    isSelected
                      ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                      : ''
                  }`}
                  title={`${slot.name} (${slot.category})`}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${slot.color} transition-transform duration-200 group-hover:scale-110`} />
                  <span className="font-mono text-[10px] sm:text-[11px] text-stone-200 truncate max-w-full font-medium">
                    {slot.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Item Inspector Panel for Active Slot */}
          {activeSlot !== null && (
            <div className="mt-4 p-4 rounded-xl bg-black/60 border border-amber-500/30 font-mono text-xs animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="font-bold text-amber-300 text-sm">
                  {inventorySlots[activeSlot].name}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                  {inventorySlots[activeSlot].category} • {inventorySlots[activeSlot].tag}
                </span>
              </div>
              <p className="text-stone-300 text-xs font-sans mt-1">
                {inventorySlots[activeSlot].description}
              </p>
            </div>
          )}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
};
