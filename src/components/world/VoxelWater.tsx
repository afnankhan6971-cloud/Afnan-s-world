import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { waterTexture, foamTexture } from '../../utils/voxelTextures';

export const VoxelWater: React.FC = () => {
  const waterMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const splashParticlesRef = useRef<THREE.Points>(null);

  // Animated water texture offset & ripple
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (waterTexture) {
      waterTexture.offset.x = (t * 0.05) % 1;
      waterTexture.offset.y = (t * 0.08) % 1;
    }
    if (foamTexture) {
      foamTexture.offset.y = (t * 0.4) % 1;
    }

    // Gentle splash particles motion
    if (splashParticlesRef.current) {
      const positions = splashParticlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(t * 8 + i) * 0.015;
      }
      splashParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Waterfall cascades geometry (stepped voxel water columns)
  const waterfalls = useMemo(() => {
    return [
      // Upper high cascade
      { position: [4.5, 9.0, -11.5], scale: [3.2, 4.2, 1.2] },
      // Mid cascade step
      { position: [2.5, 5.5, -5.5], scale: [3.0, 3.2, 1.2] },
      // Lower cascade step into river
      { position: [1.2, 2.2, -0.5], scale: [2.8, 2.4, 1.2] },
      // Side tributary waterfall from right cliffs
      { position: [8.5, 8.0, 4.0], scale: [2.2, 6.0, 1.2] },
      { position: [6.5, 3.0, 4.0], scale: [2.4, 4.0, 1.2] },
    ];
  }, []);

  // Splash particles around waterfall pools
  const splashGeometry = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    const pools = [
      { x: 2.5, y: 4.2, z: -5.0, r: 1.8 },
      { x: 1.2, y: 1.1, z: 0.0, r: 2.2 },
      { x: 5.5, y: 1.1, z: 4.0, r: 1.8 },
    ];

    for (let i = 0; i < count; i++) {
      const pool = pools[i % pools.length];
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * pool.r;
      positions[i * 3] = pool.x + Math.cos(angle) * dist;
      positions[i * 3 + 1] = pool.y + 0.1 + Math.random() * 0.5;
      positions[i * 3 + 2] = pool.z + Math.sin(angle) * dist;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <group name="voxel-water">
      {/* Main River Surface */}
      <mesh position={[0, 0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[52, 50, 32, 32]} />
        <meshStandardMaterial
          ref={waterMatRef}
          map={waterTexture}
          color="#38bdf8"
          roughness={0.12}
          metalness={0.1}
          transparent
          opacity={0.82}
        />
      </mesh>

      {/* Waterfall Vertical Cascades */}
      {waterfalls.map((wf, idx) => (
        <group key={idx} position={wf.position as [number, number, number]}>
          {/* Water sheet */}
          <mesh scale={wf.scale as [number, number, number]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              map={waterTexture}
              color="#67e8f9"
              roughness={0.15}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* White foam crest */}
          <mesh position={[0, 0, 0.05]} scale={[wf.scale[0] * 1.02, wf.scale[1], 0.2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial
              map={foamTexture}
              transparent
              opacity={0.75}
            />
          </mesh>
        </group>
      ))}

      {/* Foam pool pads at waterfall base */}
      <mesh position={[1.2, 0.78, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 2.5]} />
        <meshBasicMaterial map={foamTexture} transparent opacity={0.7} />
      </mesh>
      <mesh position={[2.5, 4.05, -4.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.4, 2.2]} />
        <meshBasicMaterial map={foamTexture} transparent opacity={0.7} />
      </mesh>

      {/* Water splash mist particles */}
      <points ref={splashParticlesRef} geometry={splashGeometry}>
        <pointsMaterial
          size={0.22}
          color="#ffffff"
          transparent
          opacity={0.75}
          sizeAttenuation
        />
      </points>

      {/* Lily pads floating on calm river edges */}
      <group position={[-2.5, 0.74, 6]}>
        <mesh rotation={[-Math.PI / 2, 0, 0.3]}>
          <planeGeometry args={[0.9, 0.9]} />
          <meshLambertMaterial color="#2d6a4f" />
        </mesh>
      </group>
      <group position={[-1.8, 0.74, 9]}>
        <mesh rotation={[-Math.PI / 2, 0, -0.6]}>
          <planeGeometry args={[0.7, 0.7]} />
          <meshLambertMaterial color="#40916c" />
        </mesh>
      </group>
      <group position={[3.2, 0.74, 11]}>
        <mesh rotation={[-Math.PI / 2, 0, 1.1]}>
          <planeGeometry args={[0.85, 0.85]} />
          <meshLambertMaterial color="#2d6a4f" />
        </mesh>
      </group>
    </group>
  );
};
