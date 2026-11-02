import React, { useState, useMemo } from 'react';
import {
  Terminal,
  Code2,
  FileCode,
  FileCode2,
  Database,
  Globe,
  Palette,
  Atom,
  Layers,
  Zap,
  Box,
  Server,
  Network,
  Flame,
  HardDrive,
  Eye,
  Scan,
  Activity,
  Sparkles,
  Cpu,
  GitBranch,
  Github,
  Laptop,
  CircuitBoard,
  Archive,
  BookOpen,
  Hammer,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { SkillCategory, SkillItem } from '../../types';
import { SKILLS_DATA } from '../../data/worldConfig';
import { ScrollReveal } from './ScrollReveal';

// Map skill IDs to semantic Lucide icons
const SKILL_ICONS: Record<string, React.ElementType> = {
  python: Terminal,
  java: Code2,
  javascript: FileCode,
  typescript: FileCode2,
  sql: Database,
  html5: Globe,
  css3: Palette,
  react: Atom,
  tailwind: Layers,
  vite: Zap,
  threejs: Box,
  nodejs: Server,
  express: Network,
  mysql: Database,
  supabase: Flame,
  mongodb: HardDrive,
  opencv: Eye,
  yolov8: Scan,
  mediapipe: Activity,
  gemini_api: Sparkles,
  genai: Cpu,
  git: GitBranch,
  github: Github,
  vscode: Laptop,
  arduino: CircuitBoard,
};

// Distinct theme accent colors per skill
const SKILL_COLORS: Record<string, string> = {
  python: 'text-amber-300',
  java: 'text-orange-400',
  javascript: 'text-yellow-300',
  typescript: 'text-sky-400',
  sql: 'text-cyan-400',
  html5: 'text-rose-400',
  css3: 'text-blue-400',
  react: 'text-cyan-300',
  tailwind: 'text-teal-300',
  vite: 'text-purple-400',
  threejs: 'text-emerald-300',
  nodejs: 'text-emerald-400',
  express: 'text-stone-300',
  mysql: 'text-blue-300',
  supabase: 'text-emerald-300',
  mongodb: 'text-green-400',
  opencv: 'text-red-400',
  yolov8: 'text-amber-400',
  mediapipe: 'text-cyan-400',
  gemini_api: 'text-indigo-300',
  genai: 'text-fuchsia-300',
  git: 'text-orange-400',
  github: 'text-stone-200',
  vscode: 'text-blue-400',
  arduino: 'text-teal-400',
};

const CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'languages', label: 'Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'databases', label: 'Databases' },
  { id: 'ai_ml', label: 'AI / ML' },
  { id: 'tools', label: 'Dev Tools' },
];

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');
  const [activeItem, setActiveItem] = useState<SkillItem | null>(null);
  const [sourceFilter, setSourceFilter] = useState<'all' | 'resume' | 'project'>('all');

  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchSource = sourceFilter === 'all' || skill.source === sourceFilter;
      return matchCategory && matchSource;
    });
  }, [selectedCategory, sourceFilter]);

  const handleKeyDown = (e: React.KeyboardEvent, skill: SkillItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveItem((prev) => (prev?.id === skill.id ? null : skill));
    }
  };

  return (
    <section id="skills" className="relative z-20 py-20 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto select-none scroll-mt-24">
      {/* Section Header */}
      <ScrollReveal duration={550} distance={20}>
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/40 backdrop-blur-md mb-3 shadow-md">
            <Archive className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-300 font-semibold">
              Chest Inventory // Skills Repository
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">ARSENAL</span>
          </h2>
          <p className="mt-2 text-stone-300 font-sans text-sm sm:text-base max-w-2xl">
            Categorized inventory slots presenting resume-listed languages and technologies used in practical projects.
          </p>

          {/* Legend: Clearly distinguishing resume-listed skills from project technologies */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs font-mono">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-amber-500/30 text-amber-200">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Resume Listed (Core Languages)</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-cyan-500/30 text-cyan-200">
              <Hammer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Project Experience (Applied in Projects)</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Chest / Inventory Container */}
      <ScrollReveal duration={600} delay={100} distance={22}>
        <div className="minecraft-panel rounded-2xl p-5 sm:p-7 md:p-9 border-2 border-white/15 bg-stone-950/85 shadow-2xl relative">
        
        {/* Inventory Tabs & Sub-filter bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
          {/* Category Tabs */}
          <div
            role="tablist"
            aria-label="Skill Categories"
            className="flex flex-wrap items-center gap-1.5"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isSelected
                      ? 'bg-amber-500/90 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-stone-300 hover:text-white hover:bg-white/10 bg-black/30'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Source Filter (All, Resume Listed, Project Tech) */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/10 text-xs font-mono">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 ml-1.5 mr-0.5" />
            <button
              onClick={() => setSourceFilter('all')}
              className={`px-2 py-1 rounded text-[11px] cursor-pointer transition-colors ${
                sourceFilter === 'all' ? 'bg-stone-700 text-white font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSourceFilter('resume')}
              className={`px-2 py-1 rounded text-[11px] cursor-pointer transition-colors ${
                sourceFilter === 'resume' ? 'bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Resume Listed
            </button>
            <button
              onClick={() => setSourceFilter('project')}
              className={`px-2 py-1 rounded text-[11px] cursor-pointer transition-colors ${
                sourceFilter === 'project' ? 'bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-500/40' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Project Tech
            </button>
          </div>
        </div>

        {/* Inventory Item Slot Grid (Minecraft 9-Column Chest Design, Arbitrary numbers removed) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-3">
          {filteredSkills.map((skill, idx) => {
            const Icon = SKILL_ICONS[skill.id] || Box;
            const colorClass = SKILL_COLORS[skill.id] || 'text-amber-200';
            const isSelected = activeItem?.id === skill.id;

            return (
              <ScrollReveal
                key={skill.id}
                delay={Math.min(idx * 25, 250)}
                duration={480}
                distance={10}
                className="w-full h-full"
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`${skill.name}, ${skill.sourceLabel}, ${skill.categoryLabel}`}
                  aria-pressed={isSelected}
                  onClick={() => setActiveItem(isSelected ? null : skill)}
                  onKeyDown={(e) => handleKeyDown(e, skill)}
                  className={`inventory-slot h-24 sm:h-28 rounded-xl p-2.5 flex flex-col items-center justify-between cursor-pointer relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isSelected
                      ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_18px_rgba(251,191,36,0.45)] ring-1 ring-amber-400'
                      : ''
                  }`}
                >
                  {/* Source indicator pin */}
                  <div className="w-full flex items-center justify-between">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        skill.source === 'resume' ? 'bg-amber-400' : 'bg-cyan-400'
                      }`}
                      title={skill.sourceLabel}
                    />
                    <span className="text-[10px] font-mono text-stone-500 uppercase">
                      {skill.source === 'resume' ? 'Res' : 'Proj'}
                    </span>
                  </div>

                  {/* Central Item Icon */}
                  <Icon
                    className={`w-7 h-7 sm:w-8 sm:h-8 ${colorClass} transition-transform duration-200 group-hover:scale-115`}
                  />

                  {/* Skill Name */}
                  <span className="font-mono text-xs text-stone-100 font-semibold truncate max-w-full text-center">
                    {skill.name}
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Empty Search / Filter State */}
        {filteredSkills.length === 0 && (
          <div className="py-12 text-center font-mono text-xs text-stone-400">
            No items found matching the selected filters.
          </div>
        )}

        {/* Minecraft Item Lore / Inspector Panel */}
        {activeItem && (
          <div className="mt-6 p-5 rounded-xl bg-black/75 border-2 border-amber-500/40 text-stone-100 shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setActiveItem(null)}
              aria-label="Close skill details"
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2 pb-2 border-b border-white/10 pr-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-900 border border-amber-400/50 flex items-center justify-center">
                  {React.createElement(SKILL_ICONS[activeItem.id] || Box, {
                    className: `w-5 h-5 ${SKILL_COLORS[activeItem.id] || 'text-amber-200'}`,
                  })}
                </div>
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-amber-200 tracking-wide">
                    {activeItem.name}
                  </h3>
                  <span className="text-[11px] font-mono text-stone-400">
                    Category: <strong className="text-stone-300">{activeItem.categoryLabel}</strong>
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold border ${
                    activeItem.source === 'resume'
                      ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                      : 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300'
                  }`}
                >
                  {activeItem.sourceLabel}
                </span>
                <span className="px-2 py-1 rounded-md text-[11px] font-mono bg-stone-800 text-stone-300 border border-stone-700">
                  {activeItem.tag}
                </span>
              </div>
            </div>

            {/* Practical Description */}
            <p className="text-stone-300 text-xs sm:text-sm font-sans leading-relaxed mt-2">
              {activeItem.description}
            </p>
          </div>
        )}

        {/* Footer Hint */}
        <div className="mt-5 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-stone-400 gap-2">
          <span>Click or press Enter on any slot to inspect practical project context.</span>
          <span>Showing {filteredSkills.length} of {SKILLS_DATA.length} technical inventory slots</span>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
};
