import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Sliders,
  Compass,
  Info,
  X,
  Eye,
  Layers,
  Sparkles,
} from 'lucide-react';
import { CameraPreset, PerformanceTier } from '../../types';
import { CAMERA_PRESETS } from '../../data/worldConfig';
import { ambientAudio } from '../../utils/audio';

interface NavigationOverlayProps {
  currentPreset: CameraPreset;
  onSelectPreset: (id: CameraPreset) => void;
  tier: PerformanceTier;
  onSelectTier: (tier: PerformanceTier) => void;
}

export const NavigationOverlay: React.FC<NavigationOverlayProps> = ({
  currentPreset,
  onSelectPreset,
  tier,
  onSelectTier,
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showTierMenu, setShowTierMenu] = useState(false);

  const handleAudioToggle = () => {
    const active = ambientAudio.toggle();
    setIsAudioActive(active);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 md:p-6">
      {/* Top Header & Perspective Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
        {/* Brand / Logo */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-stone-900/90 border border-amber-500/40 flex items-center justify-center shadow-lg shadow-black/40">
            {/* Minecraft Diamond/Grass Icon */}
            <div className="w-5 h-5 bg-gradient-to-tr from-emerald-600 via-emerald-400 to-amber-300 rounded-sm transform rotate-45 border border-black/40" />
          </div>
          <div>
            <h1 className="font-cinzel text-xl md:text-2xl font-bold tracking-wide text-amber-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              AFNAN'S WORLD
            </h1>
            <p className="text-[11px] font-mono tracking-widest text-emerald-400 font-semibold uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Phase 1: Procedural Minecraft Overworld
            </p>
          </div>
        </div>

        {/* Viewpoint Camera Switcher */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 bg-black/50 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-xl">
          <div className="hidden sm:flex items-center gap-1 px-2 text-xs font-mono text-stone-400">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Vantage:</span>
          </div>
          {CAMERA_PRESETS.map((p) => {
            const isActive = currentPreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPreset(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500/90 text-stone-950 font-bold shadow-md shadow-amber-500/30'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
                title={p.subtitle}
              >
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Utility Tools: Audio, Quality, Info */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Audio Ambience Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`minecraft-btn p-2.5 rounded-lg flex items-center justify-center cursor-pointer ${
              isAudioActive ? 'text-amber-300 border-amber-400/50' : 'text-stone-400'
            }`}
            title={isAudioActive ? 'Mute Procedural Ambience' : 'Play Procedural Ambience'}
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Performance Tier Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowTierMenu(!showTierMenu)}
              className="minecraft-btn p-2.5 rounded-lg flex items-center justify-center text-stone-300 hover:text-amber-200 cursor-pointer"
              title="Performance & Graphics Tier"
            >
              <Sliders className="w-4 h-4" />
            </button>
            {showTierMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-stone-900/95 border border-stone-700 rounded-lg shadow-2xl p-2 text-xs font-mono z-30">
                <p className="text-stone-400 font-semibold px-2 py-1 mb-1 border-b border-stone-800">
                  Graphics Profile
                </p>
                {(['high', 'medium', 'low'] as PerformanceTier[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      onSelectTier(t);
                      setShowTierMenu(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between cursor-pointer ${
                      tier === t
                        ? 'bg-amber-500/20 text-amber-300 font-bold'
                        : 'text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <span className="capitalize">{t} Fidelity</span>
                    {tier === t && <span className="text-[10px] text-amber-400">● Active</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Button */}
          <button
            onClick={() => setShowInfoModal(true)}
            className="minecraft-btn p-2.5 rounded-lg flex items-center justify-center text-stone-300 hover:text-amber-200 cursor-pointer"
            title="World Architecture Details"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Hint and Subtitle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
        {/* Active Perspective Subtitle */}
        <div className="pointer-events-auto bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/5 text-xs font-mono text-stone-300 flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {CAMERA_PRESETS.find((p) => p.id === currentPreset)?.subtitle}
          </span>
        </div>

        {/* Orbit Control Tip */}
        <div className="pointer-events-auto bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/5 text-[11px] font-mono text-stone-400 flex items-center gap-3">
          <span>Left-click + Drag: <strong className="text-stone-200">Orbit</strong></span>
          <span>•</span>
          <span>Scroll: <strong className="text-stone-200">Zoom</strong></span>
          <span>•</span>
          <span>Right-click: <strong className="text-stone-200">Pan</strong></span>
        </div>
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="minecraft-panel max-w-xl w-full p-6 rounded-xl border border-stone-700 relative text-stone-200 text-sm">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-cinzel text-xl font-bold text-amber-200">
                Afnan's World • Architecture
              </h3>
            </div>

            <p className="text-stone-300 mb-4 leading-relaxed text-xs">
              A 100% procedural 3D Minecraft Overworld built with React Three Fiber, Three.js, and Tailwind CSS v4. Engineered to run smoothly at 60 FPS on Apple Silicon M2 and mobile devices.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="bg-stone-900/80 p-3 rounded border border-stone-800 flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-emerald-300">GPU Instanced Rendering:</strong>
                  <p className="text-stone-400 mt-0.5">
                    Thousands of voxel blocks batched into single-draw-call <code>THREE.InstancedMesh</code> matrices, eliminating draw call bottlenecks.
                  </p>
                </div>
              </div>

              <div className="bg-stone-900/80 p-3 rounded border border-stone-800 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-amber-300">Procedural 16x16 Pixel Textures:</strong>
                  <p className="text-stone-400 mt-0.5">
                    Crisp, authentic Minecraft pixel-art textures dynamically baked into memory using nearest-neighbor canvas filtering with zero external image asset dependencies.
                  </p>
                </div>
              </div>

              <div className="bg-stone-900/80 p-3 rounded border border-stone-800 flex items-start gap-2.5">
                <Volume2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-cyan-300">Web Audio Synthesizer:</strong>
                  <p className="text-stone-400 mt-0.5">
                    Real-time procedural river stream murmur and evening cricket chirps synthesized dynamically via the Web Audio API with zero audio download weight.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={() => setShowInfoModal(false)}
                className="minecraft-btn px-5 py-2 rounded text-xs font-semibold text-amber-200 cursor-pointer"
              >
                Close & Return to World
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

