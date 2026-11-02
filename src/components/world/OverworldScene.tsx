import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { DuskAtmosphere } from './DuskAtmosphere';
import { VoxelTerrain } from './VoxelTerrain';
import { DistantMountains } from './DistantMountains';
import { VoxelWater } from './VoxelWater';
import { VoxelTrees } from './VoxelTrees';
import { MinecraftHouse } from './MinecraftHouse';
import { CampfireAndLanterns } from './CampfireAndLanterns';
import { VoxelClouds } from './VoxelClouds';
import { Particles } from './Particles';
import { CameraController } from './CameraController';
import { CameraPreset, WorldSettings } from '../../types';

interface OverworldSceneProps {
  currentPreset: CameraPreset;
  settings: WorldSettings;
  onLoaded?: () => void;
}

export const OverworldScene: React.FC<OverworldSceneProps> = ({
  currentPreset,
  settings,
}) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows={settings.shadows}
        dpr={settings.dpr}
        camera={{
          position: [26, 20, 28],
          fov: 48,
          near: 0.1,
          far: 250,
        }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Atmosphere, Sky and Lighting */}
          <DuskAtmosphere shadowsEnabled={settings.shadows} />

          {/* Voxel Overworld Geometry */}
          <VoxelTerrain shadowsEnabled={settings.shadows} />
          <DistantMountains />
          <VoxelWater />
          <VoxelTrees shadowsEnabled={settings.shadows} />
          <MinecraftHouse shadowsEnabled={settings.shadows} />
          <CampfireAndLanterns shadowsEnabled={settings.shadows} />

          {/* Environmental animations */}
          <VoxelClouds count={settings.cloudsCount} />
          <Particles count={settings.particlesCount} />

          {/* Camera Controller */}
          <CameraController currentPreset={currentPreset} />
        </Suspense>
      </Canvas>
    </div>
  );
};

