import React, { useEffect, useRef } from 'react';
import { TimeOfDay } from '../../types';

interface ForegroundParticlesProps {
  timeOfDay: TimeOfDay;
}

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const ForegroundParticles: React.FC<ForegroundParticlesProps> = ({ timeOfDay }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      // Avoid canvas buffer reallocation during mobile address bar expansion/collapse
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      if (newWidth !== width || Math.abs(newHeight - height) > 140) {
        width = canvas.width = newWidth;
        height = canvas.height = newHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Particle count scaled gracefully for mobile and desktop
    const count = window.innerWidth < 768 ? 20 : 42;
    const fireflies: Firefly[] = [];

    for (let i = 0; i < count; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.35, // slow upward drift
        radius: 1.5 + Math.random() * 2.2,
        baseAlpha: 0.25 + Math.random() * 0.45,
        pulseSpeed: 1.2 + Math.random() * 2.0,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Color palette based on dusk vs night
      const colorGlow = timeOfDay === 'night' ? '125, 211, 252' : '251, 191, 36';
      const colorCore = timeOfDay === 'night' ? '#e0f2fe' : '#fef08a';

      for (let i = 0; i < fireflies.length; i++) {
        const p = fireflies[i];

        // Drift motion
        p.x += p.vx + Math.sin(time * 0.001 + i) * 0.25;
        p.y += p.vy;

        // Wrap around screen edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Pulsing glow intensity
        const alpha = Math.max(
          0.05,
          p.baseAlpha + Math.sin(time * 0.002 * p.pulseSpeed + p.pulsePhase) * 0.3
        );

        // Soft radial glow aura
        const glowRadius = p.radius * 3.8;
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          p.radius * 0.3,
          p.x,
          p.y,
          glowRadius
        );
        gradient.addColorStop(0, `rgba(${colorGlow}, ${alpha})`);
        gradient.addColorStop(0.4, `rgba(${colorGlow}, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${colorGlow}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Bright pixel core
        ctx.fillStyle = colorCore;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [timeOfDay]);

  // Subtle foreground depth shift on desktop only (no scroll-linked jumping, bypassed on mobile)
  useEffect(() => {
    const isDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktopPointer || prefersReducedMotion || !canvasRef.current) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isMoving = false;
    let rAfId: number;

    const handlePointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 6; // Max 6px subtle foreground drift
      targetY = (e.clientY / innerHeight - 0.5) * 4;
      isMoving = true;
    };

    const updateDepth = () => {
      if (isMoving && canvasRef.current) {
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
        canvasRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

        if (Math.abs(targetX - currentX) < 0.04 && Math.abs(targetY - currentY) < 0.04) {
          isMoving = false;
        }
      }
      rAfId = requestAnimationFrame(updateDepth);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    rAfId = requestAnimationFrame(updateDepth);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(rAfId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10 will-change-transform"
      aria-hidden="true"
    />
  );
};
