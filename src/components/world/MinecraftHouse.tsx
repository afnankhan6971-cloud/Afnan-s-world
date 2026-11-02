import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  oakLogSideTexture,
  oakPlanksTexture,
  darkWoodTexture,
  cobblestoneTexture,
} from '../../utils/voxelTextures';

interface MinecraftHouseProps {
  shadowsEnabled?: boolean;
}

export const MinecraftHouse: React.FC<MinecraftHouseProps> = ({ shadowsEnabled = true }) => {
  // House base location on the western bluff
  const origin = useMemo(() => new THREE.Vector3(-12, 8, -1), []);

  const oakPlankMat = useMemo(() => new THREE.MeshLambertMaterial({ map: oakPlanksTexture }), []);
  const oakLogMat = useMemo(() => new THREE.MeshLambertMaterial({ map: oakLogSideTexture }), []);
  const darkRoofMat = useMemo(() => new THREE.MeshLambertMaterial({ map: darkWoodTexture }), []);
  const cobbleMat = useMemo(() => new THREE.MeshLambertMaterial({ map: cobblestoneTexture }), []);
  const glassMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#bae6fd',
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
    opacity: 0.65,
  }), []);

  return (
    <group position={origin} name="minecraft-house">
      {/* 1. Cobblestone Foundation */}
      <mesh position={[2, 0.5, 2]} receiveShadow={shadowsEnabled} castShadow={shadowsEnabled}>
        <boxGeometry args={[6.2, 1, 6.2]} />
        <primitive object={cobbleMat} attach="material" />
      </mesh>

      {/* 2. Oak Log Corner Pillars (4 corners, 4 blocks high) */}
      {[
        [-0.5, 3, -0.5],
        [4.5, 3, -0.5],
        [-0.5, 3, 4.5],
        [4.5, 3, 4.5],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]} castShadow={shadowsEnabled}>
          <boxGeometry args={[1, 4, 1]} />
          <primitive object={oakLogMat} attach="material" />
        </mesh>
      ))}

      {/* 3. Oak Plank Walls */}
      {/* Back Wall */}
      <mesh position={[2, 3, -0.5]} castShadow={shadowsEnabled} receiveShadow={shadowsEnabled}>
        <boxGeometry args={[4, 4, 0.8]} />
        <primitive object={oakPlankMat} attach="material" />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-0.5, 3, 2]} castShadow={shadowsEnabled} receiveShadow={shadowsEnabled}>
        <boxGeometry args={[0.8, 4, 4]} />
        <primitive object={oakPlankMat} attach="material" />
      </mesh>
      {/* Right Wall with Window */}
      <mesh position={[4.5, 2.2, 2]} castShadow={shadowsEnabled}>
        <boxGeometry args={[0.8, 2.4, 4]} />
        <primitive object={oakPlankMat} attach="material" />
      </mesh>
      <mesh position={[4.5, 4.4, 2]} castShadow={shadowsEnabled}>
        <boxGeometry args={[0.8, 1.2, 4]} />
        <primitive object={oakPlankMat} attach="material" />
      </mesh>
      {/* Glass window pane on right wall facing the river */}
      <mesh position={[4.5, 3.2, 2]}>
        <boxGeometry args={[0.4, 1.4, 2.4]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* Front Wall with Door opening */}
      <mesh position={[0.5, 3, 4.5]} castShadow={shadowsEnabled}>
        <boxGeometry args={[2, 4, 0.8]} />
        <primitive object={oakPlankMat} attach="material" />
      </mesh>
      <mesh position={[3.5, 3, 4.5]} castShadow={shadowsEnabled}>
        <boxGeometry args={[1, 4, 0.8]} />
        <primitive object={oakPlankMat} attach="material" />
      </mesh>
      <mesh position={[2.25, 4.3, 4.5]} castShadow={shadowsEnabled}>
        <boxGeometry args={[1.5, 1.4, 0.8]} />
        <primitive object={oakPlankMat} attach="material" />
      </mesh>
      {/* Wooden Door */}
      <mesh position={[2.25, 2.1, 4.35]}>
        <boxGeometry args={[1.3, 2.2, 0.2]} />
        <primitive object={darkRoofMat} attach="material" />
      </mesh>

      {/* 4. Stepped Dark Spruce Roof (A-frame gable roof) */}
      {/* Roof Tier 1 (overhang) */}
      <mesh position={[2, 5.2, 2]} castShadow={shadowsEnabled}>
        <boxGeometry args={[7.2, 0.6, 7.2]} />
        <primitive object={darkRoofMat} attach="material" />
      </mesh>
      {/* Roof Tier 2 */}
      <mesh position={[2, 5.8, 2]} castShadow={shadowsEnabled}>
        <boxGeometry args={[5.8, 0.6, 5.8]} />
        <primitive object={darkRoofMat} attach="material" />
      </mesh>
      {/* Roof Tier 3 (Peak ridge) */}
      <mesh position={[2, 6.4, 2]} castShadow={shadowsEnabled}>
        <boxGeometry args={[3.8, 0.6, 5.8]} />
        <primitive object={darkRoofMat} attach="material" />
      </mesh>
      <mesh position={[2, 7.0, 2]} castShadow={shadowsEnabled}>
        <boxGeometry args={[1.6, 0.6, 5.8]} />
        <primitive object={darkRoofMat} attach="material" />
      </mesh>

      {/* 5. Cobblestone Chimney on back left */}
      <mesh position={[-0.2, 6.2, 0.2]} castShadow={shadowsEnabled}>
        <boxGeometry args={[1.2, 3.8, 1.2]} />
        <primitive object={cobbleMat} attach="material" />
      </mesh>

      {/* 6. Front Deck / Porch with fence posts */}
      <mesh position={[2.25, 0.5, 6]} receiveShadow={shadowsEnabled}>
        <boxGeometry args={[2.5, 0.8, 2]} />
        <primitive object={oakPlankMat} attach="material" />
      </mesh>
      {/* Porch fence posts */}
      <mesh position={[1.1, 1.5, 6.8]}>
        <boxGeometry args={[0.2, 1.4, 0.2]} />
        <primitive object={oakLogMat} attach="material" />
      </mesh>
      <mesh position={[3.3, 1.5, 6.8]}>
        <boxGeometry args={[0.2, 1.4, 0.2]} />
        <primitive object={oakLogMat} attach="material" />
      </mesh>

      {/* 7. Warm Interior Glow shining through door & windows */}
      <pointLight
        position={[2, 3, 2]}
        color="#ffaa44"
        intensity={2.2}
        distance={9}
        decay={2}
      />
    </group>
  );
};

