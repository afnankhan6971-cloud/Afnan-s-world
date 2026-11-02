import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { lanternTexture, oakLogSideTexture } from '../../utils/voxelTextures';

interface CampfireAndLanternsProps {
  shadowsEnabled?: boolean;
}

export const CampfireAndLanterns: React.FC<CampfireAndLanternsProps> = ({ shadowsEnabled = true }) => {
  const campfireLightRef = useRef<THREE.PointLight>(null);
  const flameMeshRef = useRef<THREE.Mesh>(null);
  const smokePointsRef = useRef<THREE.Points>(null);

  // Animated campfire flickering and drifting smoke
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Campfire light organic flicker
    if (campfireLightRef.current) {
      campfireLightRef.current.intensity = 3.0 + Math.sin(t * 12) * 0.45 + Math.cos(t * 22) * 0.25;
    }

    // Flame mesh wobble
    if (flameMeshRef.current) {
      const s = 1.0 + Math.sin(t * 15) * 0.12;
      flameMeshRef.current.scale.set(s, 1.0 + Math.cos(t * 18) * 0.18, s);
    }

    // Smoke particles rising and drifting with the dusk breeze
    if (smokePointsRef.current) {
      const pos = smokePointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i + 1] += 0.035; // rise up
        pos[i] += Math.sin(t * 2 + pos[i + 1]) * 0.008; // breeze drift

        // Reset if reached height
        if (pos[i + 1] > 16) {
          pos[i + 1] = 8.8;
          pos[i] = -9.2 + (Math.random() - 0.5) * 0.4;
          pos[i + 2] = 7.0 + (Math.random() - 0.5) * 0.4;
        }
      }
      smokePointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Smoke particles geometry
  const smokeGeometry = useMemo(() => {
    const count = 30;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = -9.2 + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = 8.8 + (i / count) * 7.0;
      positions[i * 3 + 2] = 7.0 + (Math.random() - 0.5) * 0.5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const woodMat = useMemo(() => new THREE.MeshLambertMaterial({ map: oakLogSideTexture }), []);
  const lanternMat = useMemo(() => new THREE.MeshBasicMaterial({ map: lanternTexture }), []);

  // Lantern locations
  const lanterns = [
    { pos: [-10.8, 9.6, 5.0], lightPos: [-10.8, 9.4, 5.0] }, // House porch
    { pos: [-6.0, 4.8, 2.0], lightPos: [-6.0, 4.6, 2.0], hasPost: true, postH: 2.8 }, // River terrace post
    { pos: [3.5, 3.8, -2.5], lightPos: [3.5, 3.6, -2.5], hasPost: true, postH: 1.8 }, // Waterfall bluff post
    { pos: [7.5, 4.0, 7.5], lightPos: [7.5, 3.8, 7.5], hasPost: true, postH: 2.0 },  // River crossing post
  ];

  return (
    <group name="campfire-and-lanterns">
      {/* 1. Campfire on the House Overlook Terrace */}
      <group position={[-9.2, 8.2, 7.0]}>
        {/* Stone ring */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.6, 0.25, 1.6]} />
          <meshLambertMaterial color="#404040" />
        </mesh>
        {/* Ash bed */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.1, 0.15, 1.1]} />
          <meshLambertMaterial color="#222222" />
        </mesh>
        {/* Crossed Logs */}
        <mesh position={[0, 0.35, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[1.4, 0.25, 0.3]} />
          <primitive object={woodMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.35, 0]} rotation={[0, -Math.PI / 4, 0]}>
          <boxGeometry args={[1.4, 0.25, 0.3]} />
          <primitive object={woodMat} attach="material" />
        </mesh>

        {/* Dynamic Fire Flame voxels */}
        <mesh ref={flameMeshRef} position={[0, 0.65, 0]}>
          <boxGeometry args={[0.5, 0.75, 0.5]} />
          <meshBasicMaterial color="#ff7700" />
        </mesh>
        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[0.3, 0.85, 0.3]} />
          <meshBasicMaterial color="#ffdd00" />
        </mesh>

        {/* Campfire Warm Point Light with shadows */}
        <pointLight
          ref={campfireLightRef}
          position={[0, 0.8, 0]}
          color="#ff7b00"
          intensity={3.2}
          distance={16}
          decay={2}
          castShadow={shadowsEnabled}
          shadow-bias={-0.001}
        />
      </group>

      {/* Campfire Smoke Particles */}
      <points ref={smokePointsRef} geometry={smokeGeometry}>
        <pointsMaterial
          size={0.4}
          color="#d1d5db"
          transparent
          opacity={0.45}
          sizeAttenuation
        />
      </points>

      {/* 2. Hanging Lanterns & Fence Posts */}
      {lanterns.map((lan, idx) => (
        <group key={idx}>
          {lan.hasPost && (
            <mesh position={[lan.pos[0], lan.pos[1] - lan.postH / 2, lan.pos[2]]}>
              <boxGeometry args={[0.22, lan.postH, 0.22]} />
              <primitive object={woodMat} attach="material" />
            </mesh>
          )}

          {/* Lantern Core & Iron Housing */}
          <group position={lan.pos as [number, number, number]}>
            {/* Hanging chain / mount */}
            <mesh position={[0, 0.45, 0]}>
              <boxGeometry args={[0.08, 0.25, 0.08]} />
              <meshBasicMaterial color="#1f2937" />
            </mesh>
            {/* Lantern body */}
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[0.5, 0.65, 0.5]} />
              <primitive object={lanternMat} attach="material" />
            </mesh>
          </group>

          {/* Warm Amber Point Light */}
          <pointLight
            position={lan.lightPos as [number, number, number]}
            color="#f59e0b"
            intensity={1.8}
            distance={8.5}
            decay={2}
          />
        </group>
      ))}
    </group>
  );
};

