import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ParticlesProps {
  count?: number;
}

export const Particles: React.FC<ParticlesProps> = ({ count = 90 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [geometry, initialPositions] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const inits = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Clustered across the river valley and forest terraces
      const x = (Math.random() - 0.5) * 44;
      const y = 1.5 + Math.random() * 10;
      const z = (Math.random() - 0.5) * 40;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      inits[i * 3] = x;
      inits[i * 3 + 1] = y;
      inits[i * 3 + 2] = z;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return [geo, inits];
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Gentle 3D floating harmonic drift
      positions[idx] = initialPositions[idx] + Math.sin(t * 0.8 + i) * 0.8;
      positions[idx + 1] = initialPositions[idx + 1] + Math.cos(t * 1.2 + i * 2) * 0.45;
      positions[idx + 2] = initialPositions[idx + 2] + Math.sin(t * 0.6 + i * 3) * 0.8;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.28}
        color="#fef08a" // Warm firefly yellow-green
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

