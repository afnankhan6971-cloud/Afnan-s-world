import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds (staggering)
  duration?: number; // Duration in milliseconds (default 550ms)
  distance?: number; // Translate distance in pixels (default 20px)
  direction?: 'up' | 'none';
  as?: React.ElementType;
}

/**
 * Reusable ScrollReveal component using IntersectionObserver.
 * - Triggers once when the element enters the viewport.
 * - Respects prefers-reduced-motion for immediate appearance without motion.
 * - Safe fallback: reveals automatically if IntersectionObserver is unavailable.
 * - Leaves zero persistent transform after reveal to avoid creating unexpected stacking contexts.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 620,
  distance = 18,
  direction = 'up',
  as: Component = 'div',
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Immediate reveal for reduced-motion users or unsupported environments
    if (
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsRevealed(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target); // Reveal once only — never replays
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px', // Trigger slightly before full entrance
        threshold: 0.1,
      }
    );

    observer.observe(element);

    // Fallback safety timeout: ensure content is never hidden if observer stalls
    const safetyTimeout = setTimeout(() => {
      setIsRevealed(true);
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimeout);
    };
  }, []);

  const translateY = direction === 'up' ? `${distance}px` : '0px';

  return (
    <Component
      ref={elementRef}
      className={`scroll-reveal-item ${isRevealed ? 'is-revealed' : 'is-hidden'} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transform: isRevealed ? 'translate3d(0, 0, 0)' : `translate3d(0, ${translateY}, 0)`,
        opacity: isRevealed ? 1 : 0,
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isRevealed ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
};

