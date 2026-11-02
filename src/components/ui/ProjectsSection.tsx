import React, { useState, useEffect } from 'react';
import {
  Boxes,
  Eye,
  Building2,
  FileText,
  Bot,
  Trophy,
  ShoppingBag,
  Hammer,
  Clock,
  CheckCircle2,
  ExternalLink,
  Github,
  X,
  Compass,
  Sparkles,
  Layers,
  HelpCircle,
  Wrench,
} from 'lucide-react';
import { ProjectCategory, ProjectItem } from '../../types';
import { PROJECTS_DATA } from '../../data/worldConfig';
import { ScrollReveal } from './ScrollReveal';

// Semantic icon per voxel build type
const BUILD_ICONS: Record<string, React.ElementType> = {
  warehouse: Building2,
  citadel: Boxes,
  document: FileText,
  agent: Bot,
  vision: Eye,
  arena: Trophy,
  market: ShoppingBag,
};

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Builds' },
  { id: 'full_stack', label: 'Full Stack' },
  { id: 'ai_ml', label: 'AI / ML' },
  { id: 'computer_vision', label: 'Computer Vision' },
  { id: 'web_dev', label: 'Web Dev' },
];

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Lock background scroll when modal is open and restore on close / unmount
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
    };

    if (activeModalProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModalProject]);

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (selectedCategory === 'all') return true;
    return project.categories.includes(selectedCategory);
  });

  const getStatusBadge = (statusType: ProjectItem['statusType'], statusText: string) => {
    switch (statusType) {
      case 'prototype':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-amber-950/60 border border-amber-500/50 text-amber-300">
            <Hammer className="w-3 h-3 text-amber-400" />
            <span>{statusText}</span>
          </span>
        );
      case 'ongoing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-sky-950/60 border border-sky-500/50 text-sky-300">
            <Clock className="w-3 h-3 text-sky-400" />
            <span>{statusText}</span>
          </span>
        );
      case 'implemented':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-emerald-950/60 border border-emerald-500/50 text-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>{statusText}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono text-stone-300 bg-stone-800">
            {statusText}
          </span>
        );
    }
  };

  return (
    <section id="projects" className="relative z-20 py-20 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto select-none scroll-mt-24">
      {/* Section Header */}
      <ScrollReveal duration={550} distance={20}>
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/40 backdrop-blur-md mb-3 shadow-md">
            <Boxes className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-300 font-semibold">
              Creative Mode // Build Gallery
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">BUILDS</span> & PROJECTS
          </h2>
          <p className="mt-2 text-stone-300 font-sans text-sm sm:text-base max-w-2xl">
            Minecraft-inspired creative builds cataloging practical computer vision prototypes, intelligent full-stack platforms, and web applications.
          </p>

          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Project Categories"
            className="flex flex-wrap items-center justify-center gap-2 mt-6"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isSelected
                      ? 'bg-amber-500/90 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-stone-300 hover:text-white hover:bg-white/10 bg-black/40 border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* 
        Projects Grid: Centered Flex-Wrap Cards
        Displays all 7 cards reliably without clipping, and centers filtered results with staggered scroll reveal
      */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredProjects.map((project, idx) => {
          const BuildIcon = BUILD_ICONS[project.voxelIconType] || Boxes;

          return (
            <ScrollReveal
              key={project.id}
              delay={Math.min(idx * 75, 450)}
              duration={600}
              distance={20}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm sm:max-w-md lg:max-w-none flex-grow-0 flex-shrink-0 flex"
            >
              <div
                role="button"
                tabIndex={0}
                aria-label={`Inspect build: ${project.title}`}
                onClick={() => setActiveModalProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveModalProject(project);
                  }
                }}
                className="minecraft-panel project-card-interactive w-full rounded-2xl p-5 border-2 border-white/10 bg-stone-950/80 shadow-xl group cursor-pointer flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <div>
                  {/* Voxel Build Location Header */}
                  <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10 text-xs font-mono">
                    <span className="text-stone-400 truncate text-[11px] font-medium">
                      {project.locationCode}
                    </span>
                    {getStatusBadge(project.statusType, project.status)}
                  </div>

                {/* Card Top: Icon & Category */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-stone-900 to-stone-950 border border-amber-500/40 p-2 flex items-center justify-center text-amber-300 shrink-0 shadow-inner group-hover:scale-105 group-hover:border-amber-400 transition-all">
                    <BuildIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400 mt-0.5 block">
                      {project.categoryDisplay}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-stone-300 text-xs sm:text-sm font-sans line-clamp-3 leading-relaxed mb-4">
                  {project.summary}
                </p>
              </div>

              {/* Bottom: Tech Stack Pills & CTA */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-black/50 border border-white/10 text-[10px] font-mono text-stone-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded bg-stone-800 text-[10px] font-mono text-stone-400">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-amber-300/90 group-hover:text-amber-200">
                  <span className="flex items-center gap-1 font-semibold">
                    <Compass className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                    <span>Inspect Build</span>
                  </span>
                  <span className="text-[11px] text-stone-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Accessible Detailed Project Modal */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 bg-black/80 backdrop-blur-md flex items-center justify-center animate-fadeIn"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="minecraft-panel max-w-3xl w-full my-auto max-h-[85vh] overflow-y-auto overscroll-contain rounded-2xl p-6 sm:p-8 border-2 border-amber-500/50 bg-stone-950 text-stone-100 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative focus:outline-none"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              aria-label="Close build inspection"
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-xl bg-stone-900 border border-white/10 hover:border-amber-400 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pr-12 pb-4 mb-5 border-b border-white/10">
              <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block mb-1">
                {activeModalProject.locationCode}
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <h3
                  id="modal-project-title"
                  className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200"
                >
                  {activeModalProject.title}
                </h3>
                {getStatusBadge(activeModalProject.statusType, activeModalProject.status)}
              </div>
              <p className="text-xs font-mono text-emerald-400 mt-1">
                Category: {activeModalProject.categoryDisplay}
              </p>
            </div>

            {/* Modal Body: Structured Technical Information */}
            <div className="space-y-5 text-xs sm:text-sm font-sans">
              
              {/* 1. Project Overview */}
              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-wider font-bold text-amber-300 flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Project Overview</span>
                </h4>
                <p className="text-stone-300 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/5">
                  {activeModalProject.summary}
                </p>
              </div>

              {/* 2. Problem Addressed */}
              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-wider font-bold text-sky-300 flex items-center gap-1.5 mb-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Problem Addressed</span>
                </h4>
                <p className="text-stone-300 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/5">
                  {activeModalProject.problemAddressed}
                </p>
              </div>

              {/* 3. My Technical Contribution */}
              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-wider font-bold text-emerald-300 flex items-center gap-1.5 mb-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>My Technical Contribution</span>
                </h4>
                <p className="text-stone-300 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/5">
                  {activeModalProject.technicalContribution}
                </p>
              </div>

              {/* 4. Implementation Details */}
              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-wider font-bold text-amber-300 flex items-center gap-1.5 mb-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Implementation Details</span>
                </h4>
                <p className="text-stone-300 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/5">
                  {activeModalProject.implementationDetails}
                </p>
              </div>

              {/* 5. Technology Stack */}
              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-wider font-bold text-stone-200 flex items-center gap-1.5 mb-2">
                  <Boxes className="w-3.5 h-3.5 text-amber-400" />
                  <span>Technology Stack</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-stone-900 border border-white/10 text-xs font-mono text-stone-200 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 6. Repository & Live Demo Status */}
              <div className="pt-4 border-t border-white/10">
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-stone-400">
                    <Github className="w-4 h-4 text-stone-300" />
                    <span>
                      {activeModalProject.githubUrl
                        ? 'Repository Available'
                        : 'Source Repository: Private / Available on Request'}
                    </span>
                  </div>

                  {activeModalProject.githubUrl ? (
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="minecraft-btn px-4 py-1.5 rounded-lg text-amber-200 inline-flex items-center gap-1.5 font-semibold"
                    >
                      <span>View GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] px-2.5 py-1 rounded bg-stone-800 text-stone-400 border border-stone-700">
                      Link Provided on Request
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 text-right">
              <button
                onClick={() => setActiveModalProject(null)}
                className="minecraft-btn px-5 py-2.5 rounded-xl text-xs font-semibold text-amber-200 cursor-pointer hover:text-white"
              >
                Close Build Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
