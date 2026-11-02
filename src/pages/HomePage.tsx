import React, { useState, useEffect } from 'react';
import { OverworldBackground } from '../components/world/OverworldBackground';
import { ForegroundParticles } from '../components/world/ForegroundParticles';
import { Navbar } from '../components/ui/Navbar';
import { HeroSection } from '../components/ui/HeroSection';
import { PlayerStatsCard } from '../components/ui/PlayerStatsCard';
import { AboutSection } from '../components/ui/AboutSection';
import { SkillsSection } from '../components/ui/SkillsSection';
import { ProjectsSection } from '../components/ui/ProjectsSection';
import { ExperienceSection } from '../components/ui/ExperienceSection';
import { AchievementsSection } from '../components/ui/AchievementsSection';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { NavSection, TimeOfDay } from '../types';

export const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('dusk');
  const [isLoading, setIsLoading] = useState(true);

  // Smooth loading screen fade out
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // IntersectionObserver to automatically track the active section during scroll accurately
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'achievements'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio to pick the prominent section in the reading viewport zone
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleEntries[0].target.id as NavSection);
        }
      },
      {
        rootMargin: '-15% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleToggleTimeOfDay = () => {
    setTimeOfDay((prev) => (prev === 'dusk' ? 'night' : 'dusk'));
  };

  const handleExploreClick = () => {
    setActiveSection('about');
    const aboutElem = document.getElementById('about');
    if (aboutElem) {
      aboutElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* 1. Full-Screen Minecraft Overworld Background with Parallax & Day/Night Overlay */}
      <OverworldBackground timeOfDay={timeOfDay} />

      {/* 2. Subtle Foreground Fireflies & Ambient Particle Layer */}
      <ForegroundParticles timeOfDay={timeOfDay} />

      {/* 3. Transparent Premium Minecraft-Style Navbar */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        timeOfDay={timeOfDay}
        onToggleTimeOfDay={handleToggleTimeOfDay}
      />

      {/* 4. Section 1: Hero Section (#home) */}
      <section
        id="home"
        className="relative z-20 min-h-screen flex items-center justify-center px-4 pt-24 pb-16 sm:px-8 md:px-12 lg:px-16 scroll-mt-24"
      >
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal duration={600} distance={20}>
              <HeroSection
                onExploreClick={handleExploreClick}
                hasResumePdf={false} // public/resume.pdf is verified missing
              />
            </ScrollReveal>
          </div>

          {/* Right Column: Compact Player Stats Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal duration={600} delay={140} distance={20}>
              <PlayerStatsCard />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Section 2: Minecraft-Inspired Player Profile & About Section (#about) */}
      <AboutSection />

      {/* 6. Section 3: Interactive Minecraft Skills Inventory (#skills) */}
      <SkillsSection />

      {/* 7. Section 4: Minecraft Creative Mode Project Showcase (#projects) */}
      <ProjectsSection />

      {/* 8. Section 5: Minecraft Quest Log & Experience (#experience) */}
      <ExperienceSection />

      {/* 9. Section 6: Minecraft Advancement Gallery & Achievements (#achievements) */}
      <AchievementsSection />

      {/* 10. Footer note */}
      <footer className="relative z-20 py-8 px-4 text-center font-mono text-xs text-stone-400 border-t border-white/5 bg-stone-950/50 backdrop-blur-sm">
        <p>Afnan's World • Minecraft Overworld Portfolio • Phase 7</p>
      </footer>

      {/* 9. Initial Loading Screen */}
      <LoadingScreen isLoading={isLoading} />
    </div>
  );
};
