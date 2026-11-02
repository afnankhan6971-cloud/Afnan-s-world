import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(15);
  const [currentTip, setCurrentTip] = useState('Generating procedural chunk coordinates...');
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const tips = [
      'Generating procedural chunk coordinates...',
      'Erecting stepped stone cliff terraces...',
      'Cascading waterfall streams into the valley...',
      'Nurturing weeping willows & mountain conifers...',
      'Constructing wooden hillside haven...',
      'Igniting warm campfire embers & dusk lanterns...',
      'Simulating golden hour dusk sky & soft shadows...',
    ];

    let tipIdx = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        const next = prev + Math.floor(Math.random() * 15 + 10);
        return Math.min(next, 95);
      });

      tipIdx = (tipIdx + 1) % tips.length;
      setCurrentTip(tips[tipIdx]);
    }, 280);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      const timer = setTimeout(() => setShouldRender(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d1117] transition-opacity duration-500 ${
        !isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Minecraft Dirt/Stone Texture Pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        {/* Animated 3D Voxel Grass Block Icon */}
        <div className="w-16 h-16 mb-6 relative animate-bounce">
          <div className="w-full h-full bg-gradient-to-b from-[#5b8f22] to-[#3f6516] border-4 border-[#2d4710] shadow-[0_8px_0_#2b1b11] relative">
            <div className="absolute inset-x-0 bottom-0 h-7 bg-[#77543a] border-t-2 border-[#5b8f22]/50" />
            <div className="absolute top-1 left-1 w-3 h-2 bg-[#76b82c]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-wider text-amber-100 font-cinzel mb-2">
          AFNAN'S WORLD
        </h1>
        <p className="text-sm uppercase tracking-widest text-emerald-400 font-mono mb-8">
          Overworld Initialization • Phase 1
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-black/60 border-2 border-stone-600 p-1 mb-4 shadow-inner">
          <div
            className="h-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tip / Status readout */}
        <div className="flex justify-between w-full text-xs font-mono text-stone-400">
          <span className="truncate pr-2">{currentTip}</span>
          <span className="text-amber-300 font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

