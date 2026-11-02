import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface DuskAtmosphereProps {
  shadowsEnabled?: boolean;
}

export const DuskAtmosphere: React.FC<DuskAtmosphereProps> = ({ shadowsEnabled = true }) => {
  const sunLightRef = useRef<THREE.DirectionalLight>(null);
  const sunMeshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    // Very gentle slow sun shimmer
    if (sunMeshRef.current) {
      sunMeshRef.current.rotation.z = elapsed * 0.02;
    }
  });

  return (
    <>
      {/* Dusk Sky and Atmospheric Fog */}
      {/* Fog color blends golden dusk warmth into the horizon */}
      <color attach="background" args={['#d9825b']} />
      <fog attach="fog" args={['#d9825b', 28, 85]} />

      {/* Ambient Lighting: Cool lavender-blue dusk fill to complement warm sun */}
      <ambientLight color="#544c77" intensity={0.7} />

      {/* Hemisphere Light: Warm orange sky, earthy cool ground bounce */}
      <hemisphereLight
        color="#fca311"
        groundColor="#3d2b1f"
        intensity={0.65}
      />

      {/* Golden Hour Low-Angle Sun Light */}
      <directionalLight
        ref={sunLightRef}
        position={[38, 22, -28]}
        color="#ffb703"
        intensity={2.8}
        castShadow={shadowsEnabled}
        shadow-mapSize-width={shadowsEnabled ? 2048 : 512}
        shadow-mapSize-height={shadowsEnabled ? 2048 : 512}
        shadow-camera-near={1}
        shadow-camera-far={120}
        shadow-camera-left={-35}
        shadow-camera-right={35}
        shadow-camera-top={35}
        shadow-camera-bottom={-35}
        shadow-bias={-0.0003}
      />

      {/* Soft secondary rim/fill light from opposite side */}
      <directionalLight
        position={[-25, 15, 25]}
        color="#9381ff"
        intensity={0.4}
      />

      {/* Low-hanging voxel/squared dusk sun disc */}
      <group position={[52, 28, -38]}>
        <mesh ref={sunMeshRef}>
          <boxGeometry args={[7, 7, 1]} />
          <meshBasicMaterial color="#fff3b0" />
        </mesh>
        {/* Sun corona glow */}
        <mesh position={[0, 0, -0.5]}>
          <boxGeometry args={[11, 11, 0.8]} />
          <meshBasicMaterial color="#fb8500" transparent opacity={0.35} />
        </mesh>
        <mesh position={[0, 0, -1]}>
          <boxGeometry args={[16, 16, 0.6]} />
          <meshBasicMaterial color="#d94e34" transparent opacity={0.18} />
        </mesh>
      </group>
    </>
  );
};

