import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { cloudTexture } from '../../utils/voxelTextures';

interface VoxelCloudsProps {
  count?: number;
}

export const VoxelClouds: React.FC<VoxelCloudsProps> = ({ count = 10 }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate stylized Minecraft cloud puffs (composed of flat 3D slabs)
  const clouds = useMemo(() => {
    const list: {
      position: [number, number, number];
      size: [number, number, number];
      speed: number;
    }[] = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 120;
      const y = 32 + (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 120;
      const w = 12 + Math.floor(Math.random() * 18);
      const d = 8 + Math.floor(Math.random() * 12);
      const speed = 0.8 + Math.random() * 0.7;

      list.push({
        position: [x, y, z],
        size: [w, 2.2, d],
        speed,
      });
    }
    return list;
  }, [count]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, index) => {
      const c = clouds[index];
      if (c) {
        child.position.x += c.speed * delta * 1.5;
        // Wrap around when drifting too far
        if (child.position.x > 70) {
          child.position.x = -70;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {clouds.map((cloud, idx) => (
        <mesh key={idx} position={cloud.position}>
          <boxGeometry args={cloud.size} />
          <meshLambertMaterial
            map={cloudTexture}
            color="#ffe9d6"
            transparent
            opacity={0.88}
          />
        </mesh>
      ))}
    </group>
  );
};

