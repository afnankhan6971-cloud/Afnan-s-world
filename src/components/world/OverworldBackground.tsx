import React, { useEffect, useRef } from 'react';
import { TimeOfDay } from '../../types';

interface OverworldBackgroundProps {
  timeOfDay: TimeOfDay;
}

export const OverworldBackground: React.FC<OverworldBackgroundProps> = ({ timeOfDay }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  // Desktop subtle mouse parallax (bypassed on mobile & touch to guarantee rock-solid stability)
  useEffect(() => {
    // Check if device has fine pointer (mouse/trackpad on desktop) and allows motion
    const isDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktopPointer || prefersReducedMotion) {
      // Mobile / touch / reduced-motion: keep transform neutral and exit immediately
      if (imageRef.current) {
        imageRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
      return;
    }

    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 12; // Max 12px horizontal shift
      targetY = (e.clientY / innerHeight - 0.5) * 8;  // Max 8px vertical shift
      isMoving = true;
    };

    const updateParallax = () => {
      if (isMoving && imageRef.current) {
        // Direct DOM style mutation — ZERO React re-renders during mouse motion!
        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;
        imageRef.current.style.transform = `translate3d(${-currentX.toFixed(2)}px, ${-currentY.toFixed(2)}px, 0)`;

        // Pause animation when rested to conserve GPU/CPU cycles
        if (Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05) {
          isMoving = false;
        }
      }
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="overworld-bg-container" aria-hidden="true">
      {/* 
        Full-screen website background image using exact image:
        public/images/overworld-background.png
        On mobile: completely locked and static to prevent dynamic viewport/URL bar resizing jitter.
        On desktop: subtle direct-DOM parallax without React state overhead.
      */}
      <img
        ref={imageRef}
        src="/images/overworld-background.png"
        alt="Afnan's World Minecraft Overworld Background"
        className="absolute top-[-10px] left-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] object-cover object-[center_35%] md:object-[center_30%] pointer-events-none select-none will-change-transform"
        loading="eager"
      />

      {/* Subtle Depth & Vignette Overlay to enhance readability without obscuring background */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-stone-950/45 pointer-events-none" />

      {/* 
        Day / Night Cycle Overlay:
        - When 'dusk' (default): transparent, letting the warm golden sunset shine naturally.
        - When 'night': deep midnight blue/indigo tint + subtle moonlight cooling effect.
        Optimized without expensive backdrop-filter for smooth mobile touch scrolling.
      */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none ${
          timeOfDay === 'night'
            ? 'opacity-100 bg-[#060a18]/70 mix-blend-multiply'
            : 'opacity-0'
        }`}
      />

      {/* Moonlight cool glow during night */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(147,197,253,0.18)_0%,transparent_60%)] transition-opacity duration-700 pointer-events-none ${
          timeOfDay === 'night' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
