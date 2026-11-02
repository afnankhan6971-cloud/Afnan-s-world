import React, { useMemo, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import {
  oakLogSideTexture,
  willowLeavesTexture,
  pineLeavesTexture,
} from '../../utils/voxelTextures';

interface VoxelTreesProps {
  shadowsEnabled?: boolean;
}

export const VoxelTrees: React.FC<VoxelTreesProps> = ({ shadowsEnabled = true }) => {
  const trunkMeshRef = useRef<THREE.InstancedMesh>(null);
  const willowLeavesMeshRef = useRef<THREE.InstancedMesh>(null);
  const pineLeavesMeshRef = useRef<THREE.InstancedMesh>(null);

  const trunkMaterial = useMemo(() => {
    return new THREE.MeshLambertMaterial({ map: oakLogSideTexture });
  }, []);

  const willowMaterial = useMemo(() => {
    return new THREE.MeshLambertMaterial({
      map: willowLeavesTexture,
      transparent: true,
      alphaTest: 0.15,
    });
  }, []);

  const pineMaterial = useMemo(() => {
    return new THREE.MeshLambertMaterial({
      map: pineLeavesTexture,
    });
  }, []);

  const { trunkTransforms, willowTransforms, pineTransforms } = useMemo(() => {
    const trunks: THREE.Matrix4[] = [];
    const willows: THREE.Matrix4[] = [];
    const pines: THREE.Matrix4[] = [];
    const dummy = new THREE.Object3D();

    const addBlock = (arr: THREE.Matrix4[], x: number, y: number, z: number) => {
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      arr.push(dummy.matrix.clone());
    };

    // 1. Helper to generate a Weeping Willow tree (reference style: wide canopy + hanging vines)
    const buildWillowTree = (baseX: number, baseY: number, baseZ: number, height = 6) => {
      // Trunk
      for (let y = 1; y <= height; y++) {
        addBlock(trunks, baseX, baseY + y, baseZ);
      }
      // Branch splits
      addBlock(trunks, baseX + 1, baseY + height, baseZ);
      addBlock(trunks, baseX - 1, baseY + height, baseZ);
      addBlock(trunks, baseX, baseY + height, baseZ + 1);
      addBlock(trunks, baseX, baseY + height, baseZ - 1);

      const topY = baseY + height + 1;
      const canopyRadius = 3;

      // Canopy layers
      for (let dy = 0; dy <= 2; dy++) {
        const layerY = topY + dy;
        const r = canopyRadius - dy;
        for (let dx = -r; dx <= r; dx++) {
          for (let dz = -r; dz <= r; dz++) {
            if (dx * dx + dz * dz <= r * r + 1) {
              addBlock(willows, baseX + dx, layerY, baseZ + dz);
            }
          }
        }
      }

      // Hanging foliage strands / vines
      const perimeterCoords = [
        { dx: -3, dz: -1 }, { dx: -3, dz: 1 }, { dx: 3, dz: -1 }, { dx: 3, dz: 1 },
        { dx: -1, dz: -3 }, { dx: 1, dz: -3 }, { dx: -1, dz: 3 }, { dx: 1, dz: 3 },
        { dx: -2, dz: -2 }, { dx: 2, dz: -2 }, { dx: -2, dz: 2 }, { dx: 2, dz: 2 },
      ];

      perimeterCoords.forEach(({ dx, dz }) => {
        const hangLength = 2 + Math.floor(Math.sin(dx * 3 + dz * 5) * 1.5 + 1.5);
        for (let h = 0; h < hangLength; h++) {
          addBlock(willows, baseX + dx, topY - h, baseZ + dz);
        }
      });
    };

    // 2. Helper to generate an Evergreen Pine / Spruce conifer tree
    const buildPineTree = (baseX: number, baseY: number, baseZ: number, trunkHeight = 8) => {
      // Trunk
      for (let y = 1; y <= trunkHeight; y++) {
        addBlock(trunks, baseX, baseY + y, baseZ);
      }

      // Conical needle layers tapering upward
      const startFoliageY = baseY + 3;
      const layers = [
        { yOffset: 0, radius: 2.6 },
        { yOffset: 1, radius: 2.3 },
        { yOffset: 2, radius: 2.0 },
        { yOffset: 3, radius: 1.5 },
        { yOffset: 4, radius: 1.2 },
        { yOffset: 5, radius: 0.8 },
        { yOffset: 6, radius: 0.4 },
      ];

      layers.forEach(({ yOffset, radius }) => {
        const y = startFoliageY + yOffset;
        const rCeil = Math.ceil(radius);
        for (let dx = -rCeil; dx <= rCeil; dx++) {
          for (let dz = -rCeil; dz <= rCeil; dz++) {
            if (dx * dx + dz * dz <= radius * radius + 0.5) {
              if (dx !== 0 || dz !== 0 || y > baseY + trunkHeight) {
                addBlock(pines, baseX + dx, y, baseZ + dz);
              }
            }
          }
        }
      });
      // Pointed conifer tip
      addBlock(pines, baseX, startFoliageY + 7, baseZ);
    };

    // Willow Trees placement
    buildWillowTree(-15, 8, 12, 7); // Majestic foreground willow on left terrace
    buildWillowTree(-6, 2, 4, 5);  // River terrace willow
    buildWillowTree(-8, 4, -8, 6); // Upstream bluff willow
    buildWillowTree(8, 2, 9, 5);   // Lower right riverbank willow
    buildWillowTree(11, 5, -2, 6); // Waterfall terrace willow

    // Pine / Spruce Trees placement (mountain slopes & ridges)
    buildPineTree(14, 8, -6, 7);
    buildPineTree(17, 11, -12, 9);
    buildPineTree(21, 14, -8, 8);
    buildPineTree(13, 8, 14, 8);
    buildPineTree(18, 11, 11, 9);
    buildPineTree(22, 14, 6, 10);
    buildPineTree(-18, 8, -14, 8);
    buildPineTree(-21, 8, -6, 7);
    buildPineTree(-14, 6, 19, 7);
    buildPineTree(-19, 8, 3, 8);
    buildPineTree(6, 11, -19, 9); // Near upper waterfall ridge
    buildPineTree(10, 11, -22, 10);

    return {
      trunkTransforms: trunks,
      willowTransforms: willows,
      pineTransforms: pines,
    };
  }, []);

  useLayoutEffect(() => {
    if (trunkMeshRef.current) {
      trunkTransforms.forEach((m, i) => trunkMeshRef.current!.setMatrixAt(i, m));
      trunkMeshRef.current.instanceMatrix.needsUpdate = true;
    }
    if (willowLeavesMeshRef.current) {
      willowTransforms.forEach((m, i) => willowLeavesMeshRef.current!.setMatrixAt(i, m));
      willowLeavesMeshRef.current.instanceMatrix.needsUpdate = true;
    }
    if (pineLeavesMeshRef.current) {
      pineTransforms.forEach((m, i) => pineLeavesMeshRef.current!.setMatrixAt(i, m));
      pineLeavesMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [trunkTransforms, willowTransforms, pineTransforms]);

  return (
    <group name="voxel-trees">
      {/* Oak Log Trunks */}
      <instancedMesh
        ref={trunkMeshRef}
        args={[undefined, undefined, trunkTransforms.length]}
        material={trunkMaterial}
        castShadow={shadowsEnabled}
        receiveShadow={shadowsEnabled}
      >
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>

      {/* Weeping Willow Foliage */}
      <instancedMesh
        ref={willowLeavesMeshRef}
        args={[undefined, undefined, willowTransforms.length]}
        material={willowMaterial}
        castShadow={shadowsEnabled}
        receiveShadow={shadowsEnabled}
      >
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>

      {/* Pine Conifer Foliage */}
      <instancedMesh
        ref={pineLeavesMeshRef}
        args={[undefined, undefined, pineTransforms.length]}
        material={pineMaterial}
        castShadow={shadowsEnabled}
        receiveShadow={shadowsEnabled}
      >
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
    </group>
  );
};

