import React, { useMemo, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { stoneTexture } from '../../utils/voxelTextures';

export const DistantMountains: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const mountainMaterial = useMemo(() => {
    return new THREE.MeshLambertMaterial({
      map: stoneTexture,
      color: '#8b8493', // Slight dusk atmospheric purple tint
    });
  }, []);

  const mountainTransforms = useMemo(() => {
    const list: THREE.Matrix4[] = [];
    const dummy = new THREE.Object3D();

    // Spires & Monolith coordinates (x, z, peakHeight, radius)
    const spires = [
      { x: -18, z: -38, peak: 32, radius: 4 },
      { x: -8, z: -44, peak: 42, radius: 5 },
      { x: 3, z: -48, peak: 48, radius: 6 }, // Center tall peak
      { x: 14, z: -42, peak: 38, radius: 5 },
      { x: 26, z: -36, peak: 34, radius: 4 },
      // Archway formation pillars (inspired by the arch in the reference image)
      { x: -1, z: -35, peak: 26, radius: 3 },
      { x: 7, z: -35, peak: 26, radius: 3 },
    ];

    spires.forEach((spire) => {
      for (let y = 4; y <= spire.peak; y += 2) {
        // Taper upwards
        const currentRadius = Math.max(1, spire.radius * (1 - (y / (spire.peak * 1.15))));
        const rInt = Math.ceil(currentRadius);

        for (let dx = -rInt; dx <= rInt; dx += 2) {
          for (let dz = -rInt; dz <= rInt; dz += 2) {
            if (dx * dx + dz * dz <= currentRadius * currentRadius * 4) {
              // 2x2 voxel chunks to build tall pillars efficiently
              dummy.position.set(spire.x + dx, y, spire.z + dz);
              dummy.scale.set(2, 2, 2);
              dummy.updateMatrix();
              list.push(dummy.matrix.clone());
            }
          }
        }
      }
    });

    // Archway bridge spanning between x = -1 and x = 7 at y = 22
    for (let x = -1; x <= 7; x += 2) {
      dummy.position.set(x, 22, -35);
      dummy.scale.set(2, 2, 2);
      dummy.updateMatrix();
      list.push(dummy.matrix.clone());
    }

    return list;
  }, []);

  useLayoutEffect(() => {
    if (meshRef.current) {
      mountainTransforms.forEach((mat, i) => meshRef.current!.setMatrixAt(i, mat));
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [mountainTransforms]);

  return (
    <group name="distant-mountains">
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, mountainTransforms.length]}
        material={mountainMaterial}
      >
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
    </group>
  );
};
