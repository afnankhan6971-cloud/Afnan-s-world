import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
import { CameraPreset } from '../../types';
import { CAMERA_PRESETS } from '../../data/worldConfig';

interface CameraControllerProps {
  currentPreset: CameraPreset;
  onUserInteracted?: () => void;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  currentPreset,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(26, 20, 28));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 4, 0));
  const isTransitioning = useRef<boolean>(true);

  // When preset changes, update target coordinates
  useEffect(() => {
    const config = CAMERA_PRESETS.find((p) => p.id === currentPreset) || CAMERA_PRESETS[0];
    targetPos.current.set(...config.position);
    targetLookAt.current.set(...config.target);
    isTransitioning.current = true;
  }, [currentPreset]);

  // Smooth lerp camera movement
  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    if (isTransitioning.current) {
      // Lerp camera position
      camera.position.lerp(targetPos.current, Math.min(1, delta * 3.2));
      // Lerp controls target
      controlsRef.current.target.lerp(targetLookAt.current, Math.min(1, delta * 3.2));
      controlsRef.current.update();

      // Check if arrived close enough
      const distPos = camera.position.distanceTo(targetPos.current);
      const distTarget = controlsRef.current.target.distanceTo(targetLookAt.current);
      if (distPos < 0.1 && distTarget < 0.1) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera going beneath terrain
      minDistance={6}
      maxDistance={65}
      onStart={() => {
        // User started dragging manually
        isTransitioning.current = false;
      }}
    />
  );
};

