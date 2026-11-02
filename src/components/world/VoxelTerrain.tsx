import React, { useMemo, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import {
  grassTopTexture,
  grassSideTexture,
  dirtTexture,
  mossyStoneTexture,
} from '../../utils/voxelTextures';

interface VoxelTerrainProps {
  shadowsEnabled?: boolean;
}

export const VoxelTerrain: React.FC<VoxelTerrainProps> = ({ shadowsEnabled = true }) => {
  const grassMeshRef = useRef<THREE.InstancedMesh>(null);
  const stoneMeshRef = useRef<THREE.InstancedMesh>(null);
  const dirtMeshRef = useRef<THREE.InstancedMesh>(null);

  // Materials for authentic Minecraft grass block (6 cube faces)
  const grassMaterials = useMemo(() => {
    const sideMat = new THREE.MeshLambertMaterial({ map: grassSideTexture });
    const topMat = new THREE.MeshLambertMaterial({ map: grassTopTexture });
    const bottomMat = new THREE.MeshLambertMaterial({ map: dirtTexture });
    // [+x, -x, +y, -y, +z, -z]
    return [sideMat, sideMat, topMat, bottomMat, sideMat, sideMat];
  }, []);

  const stoneMaterial = useMemo(() => {
    return new THREE.MeshLambertMaterial({ map: mossyStoneTexture });
  }, []);

  const dirtMaterial = useMemo(() => {
    return new THREE.MeshLambertMaterial({ map: dirtTexture });
  }, []);

  // Compute terrain voxels
  const { grassTransforms, stoneTransforms, dirtTransforms } = useMemo(() => {
    const grass: THREE.Matrix4[] = [];
    const stone: THREE.Matrix4[] = [];
    const dirt: THREE.Matrix4[] = [];

    const dummy = new THREE.Object3D();
    const BLOCK_SIZE = 1;

    // Grid bounds
    const minX = -26;
    const maxX = 26;
    const minZ = -24;
    const maxZ = 24;

    // Heightmap calculation function for stepped Minecraft terraces
    const getHeight = (x: number, z: number): number => {
      // River channel formula
      const riverCenter = Math.sin(z * 0.14) * 4.5 + Math.cos(z * 0.06) * 2;
      const distToRiver = Math.abs(x - riverCenter);

      // Riverbed and water basin
      if (distToRiver < 3.2) {
        if (z < -10 && x > 2 && x < 8) {
          // Upper waterfall tier
          return 7;
        }
        if (z < -4 && x > 0 && x < 6) {
          // Mid waterfall tier
          return 4;
        }
        return 0; // Water level is 0.8, river bed is 0
      }

      // Shoreline banks
      if (distToRiver < 5.0) {
        return 1;
      }

      // Left Plateau (where House is built)
      if (x < riverCenter) {
        const d = (riverCenter - x);
        if (d < 8) return 2;
        if (d < 12) return 4;
        if (d < 17) return 6;
        return 8; // High bluff
      }

      // Right Tiered Cliffs & Waterfall Bluffs (reference style)
      const d = (x - riverCenter);
      if (d < 7) return 2;
      if (d < 11) return 5;
      if (d < 15) return 8;
      if (d < 19) return 11;
      return 14; // High right ridge
    };

    // Store heights in map for vertical cliff wall generation
    const heightMap: Record<string, number> = {};
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        heightMap[`${x},${z}`] = getHeight(x, z);
      }
    }

    // Build voxels with top grass and vertical cliff faces
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        const h = heightMap[`${x},${z}`];

        // Find minimum neighbor height to determine cliff exposure
        const hNorth = heightMap[`${x},${z - 1}`] ?? h;
        const hSouth = heightMap[`${x},${z + 1}`] ?? h;
        const hEast = heightMap[`${x + 1},${z}`] ?? h;
        const hWest = heightMap[`${x - 1},${z}`] ?? h;
        const lowestNeighbor = Math.min(hNorth, hSouth, hEast, hWest);

        // Place top grass block
        dummy.position.set(x * BLOCK_SIZE, h * BLOCK_SIZE, z * BLOCK_SIZE);
        dummy.updateMatrix();
        grass.push(dummy.matrix.clone());

        // Place subsurface cliff stone / dirt only where exposed to avoid hidden geometry
        for (let y = h - 1; y >= Math.max(0, lowestNeighbor); y--) {
          dummy.position.set(x * BLOCK_SIZE, y * BLOCK_SIZE, z * BLOCK_SIZE);
          dummy.updateMatrix();
          if (y === h - 1 && y > 1) {
            dirt.push(dummy.matrix.clone());
          } else {
            stone.push(dummy.matrix.clone());
          }
        }
      }
    }

    return {
      grassTransforms: grass,
      stoneTransforms: stone,
      dirtTransforms: dirt,
    };
  }, []);

  useLayoutEffect(() => {
    if (grassMeshRef.current) {
      grassTransforms.forEach((mat, i) => grassMeshRef.current!.setMatrixAt(i, mat));
      grassMeshRef.current.instanceMatrix.needsUpdate = true;
    }
    if (stoneMeshRef.current) {
      stoneTransforms.forEach((mat, i) => stoneMeshRef.current!.setMatrixAt(i, mat));
      stoneMeshRef.current.instanceMatrix.needsUpdate = true;
    }
    if (dirtMeshRef.current) {
      dirtTransforms.forEach((mat, i) => dirtMeshRef.current!.setMatrixAt(i, mat));
      dirtMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [grassTransforms, stoneTransforms, dirtTransforms]);

  return (
    <group name="voxel-terrain">
      {/* Grass Top Blocks */}
      <instancedMesh
        ref={grassMeshRef}
        args={[undefined, undefined, grassTransforms.length]}
        material={grassMaterials}
        castShadow={shadowsEnabled}
        receiveShadow={shadowsEnabled}
      >
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>

      {/* Exposed Cliff Stone Blocks */}
      <instancedMesh
        ref={stoneMeshRef}
        args={[undefined, undefined, stoneTransforms.length]}
        material={stoneMaterial}
        castShadow={shadowsEnabled}
        receiveShadow={shadowsEnabled}
      >
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>

      {/* Under-Grass Dirt Layer Blocks */}
      <instancedMesh
        ref={dirtMeshRef}
        args={[undefined, undefined, dirtTransforms.length]}
        material={dirtMaterial}
        castShadow={shadowsEnabled}
        receiveShadow={shadowsEnabled}
      >
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
    </group>
  );
};
