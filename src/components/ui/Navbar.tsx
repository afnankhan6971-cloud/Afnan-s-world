import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Menu,
  X,
  Compass,
  Lock,
} from 'lucide-react';
import { NavSection, TimeOfDay } from '../../types';
import { NAV_ITEMS } from '../../data/worldConfig';
import { ambientAudio } from '../../utils/audio';

interface NavbarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  timeOfDay: TimeOfDay;
  onToggleTimeOfDay: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSelectSection,
  timeOfDay,
  onToggleTimeOfDay,
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAudioToggle = () => {
    const active = ambientAudio.toggle();
    setIsAudioActive(active);
  };

  const handleNavClick = (sectionId: NavSection, isImplemented: boolean, statusHint?: string) => {
    if (isImplemented) {
      onSelectSection(sectionId);
      setMobileMenuOpen(false);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Gracefully notify user that this section is queued for future phases
      setToastMessage(`${statusHint || 'Section in progress'} • Coming in next phase!`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 md:px-8 md:py-4 select-none">
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2.5 md:px-6 md:py-3 rounded-2xl bg-stone-950/45 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300"
      >
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home', true);
          }}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
        >
          <div className="w-8 h-8 rounded-md bg-stone-900 border border-amber-500/40 flex items-center justify-center shadow-md group-hover:border-amber-400 transition-colors">
            {/* Minecraft Diamond Emblem */}
            <div className="w-4 h-4 bg-gradient-to-tr from-emerald-500 via-emerald-300 to-amber-300 rotate-45 rounded-xs shadow-inner" />
          </div>
          <span className="font-cinzel text-lg md:text-xl font-bold tracking-wider text-amber-100 group-hover:text-amber-300 transition-colors">
            AFNAN'S WORLD
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.isImplemented, item.statusHint)}
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 relative cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isActive
                    ? 'text-amber-300 font-bold bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
                    : item.isImplemented
                    ? 'text-stone-300 hover:text-white hover:bg-white/5'
                    : 'text-stone-500 hover:text-stone-300 hover:bg-stone-900/40 cursor-default'
                }`}
                title={item.isImplemented ? item.label : `${item.label} (${item.statusHint})`}
              >
                <span>{item.label}</span>
                {!item.isImplemented && (
                  <Lock className="w-3 h-3 text-stone-500 opacity-60" />
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls: Day/Night, Audio, Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Day / Night Cycle Toggle */}
          <button
            onClick={onToggleTimeOfDay}
            aria-label={`Switch to ${timeOfDay === 'dusk' ? 'Night' : 'Dusk'} mode`}
            className="minecraft-btn p-2 rounded-xl text-stone-300 hover:text-amber-300 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
            title={`Current: ${timeOfDay.toUpperCase()} • Click to toggle Day/Night`}
          >
            {timeOfDay === 'dusk' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-300" />
            )}
          </button>

          {/* Procedural Ambience Audio Toggle */}
          <button
            onClick={handleAudioToggle}
            aria-label={isAudioActive ? 'Mute Overworld audio' : 'Play Overworld audio'}
            className={`minecraft-btn p-2 rounded-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer ${
              isAudioActive
                ? 'text-emerald-400 border-emerald-500/50 bg-emerald-950/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title={isAudioActive ? 'Mute Nature Ambience' : 'Play Nature Ambience'}
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden minecraft-btn p-2 rounded-xl text-stone-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Toast notification for queued sections */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-stone-900/95 border border-amber-500/40 text-amber-200 text-xs font-mono shadow-2xl backdrop-blur-md animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-7xl px-4 py-4 rounded-2xl bg-stone-950/95 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.isImplemented, item.statusHint)}
                  className={`px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                      : item.isImplemented
                      ? 'text-stone-300 hover:bg-white/5 hover:text-white'
                      : 'text-stone-500 hover:bg-white/5 hover:text-stone-400'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {!item.isImplemented && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-400">
                        {item.statusHint}
                      </span>
                    )}
                  </span>
                  {isActive ? (
                    <Compass className="w-4 h-4 text-amber-400" />
                  ) : !item.isImplemented ? (
                    <Lock className="w-3.5 h-3.5 text-stone-600" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
