import * as THREE from 'three';

/**
 * Procedural Minecraft-style 16x16 pixel textures.
 * Rendered onto HTML Canvas elements and converted into Three.js textures
 * with NearestFilter for authentic crisp voxel visuals.
 */

function createPixelTexture(
  drawFn: (ctx: CanvasRenderingContext2D, size: number) => void,
  size = 16
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.imageSmoothingEnabled = false;
    drawFn(ctx, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Pseudo-random helper seeded by coordinate
function hash(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
  return n - Math.floor(n);
}

// 1. Grass Top Texture
export const grassTopTexture = createPixelTexture((ctx, s) => {
  const baseColors = ['#5b8f22', '#659c27', '#4e7e1c', '#6fa62b', '#568820'];
  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      const idx = Math.floor(hash(x, y) * baseColors.length);
      ctx.fillStyle = baseColors[idx];
      ctx.fillRect(x, y, 1, 1);
    }
  }
});

// 2. Grass Side Texture (Grass on top, dirt on bottom)
export const grassSideTexture = createPixelTexture((ctx, s) => {
  const dirtColors = ['#866043', '#77543a', '#694a32', '#8c6547', '#5f422b'];
  const grassColors = ['#5b8f22', '#659c27', '#4e7e1c', '#6fa62b'];

  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      const dirtIdx = Math.floor(hash(x, y) * dirtColors.length);
      ctx.fillStyle = dirtColors[dirtIdx];
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // Stepped grass hanging down
  for (let x = 0; x < s; x++) {
    const hang = 2 + Math.floor(hash(x, 1) * 3);
    for (let y = 0; y <= hang; y++) {
      const gIdx = Math.floor(hash(x, y + 10) * grassColors.length);
      ctx.fillStyle = grassColors[gIdx];
      ctx.fillRect(x, y, 1, 1);
    }
  }
});

// 3. Dirt Texture
export const dirtTexture = createPixelTexture((ctx, s) => {
  const dirtColors = ['#866043', '#77543a', '#694a32', '#8c6547', '#5f422b', '#9b714f'];
  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      const idx = Math.floor(hash(x, y + 20) * dirtColors.length);
      ctx.fillStyle = dirtColors[idx];
      ctx.fillRect(x, y, 1, 1);
    }
  }
});

// 4. Stone Texture
export const stoneTexture = createPixelTexture((ctx, s) => {
  const stoneColors = ['#7c7c7c', '#717171', '#666666', '#878787', '#5b5b5b'];
  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      const idx = Math.floor(hash(x + 30, y) * stoneColors.length);
      ctx.fillStyle = stoneColors[idx];
      ctx.fillRect(x, y, 1, 1);
    }
  }
});

// 5. Mossy Stone Texture (Cliff terraces inspired by the reference)
export const mossyStoneTexture = createPixelTexture((ctx, s) => {
  const stoneColors = ['#6d726b', '#60655e', '#535851', '#757a73'];
  const mossColors = ['#4d6b2c', '#3e5822', '#5b7d34'];
  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      const isMoss = hash(x * 1.5, y * 1.5) > 0.62;
      if (isMoss) {
        const mIdx = Math.floor(hash(x, y) * mossColors.length);
        ctx.fillStyle = mossColors[mIdx];
      } else {
        const sIdx = Math.floor(hash(x, y) * stoneColors.length);
        ctx.fillStyle = stoneColors[sIdx];
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }
});

// 6. Oak Planks Texture
export const oakPlanksTexture = createPixelTexture((ctx, s) => {
  const plankColors = ['#b8945f', '#a98552', '#9a7746', '#c49f6a'];
  for (let y = 0; y < s; y++) {
    const isSeam = y % 4 === 0;
    for (let x = 0; x < s; x++) {
      if (isSeam) {
        ctx.fillStyle = '#684d28';
      } else {
        const idx = Math.floor(hash(x + 40, y) * plankColors.length);
        ctx.fillStyle = plankColors[idx];
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }
});

// 7. Dark Spruce Planks / Roof
export const darkWoodTexture = createPixelTexture((ctx, s) => {
  const colors = ['#4a3319', '#3f2b15', '#553b1e', '#352411'];
  for (let y = 0; y < s; y++) {
    const isSeam = y % 4 === 0;
    for (let x = 0; x < s; x++) {
      if (isSeam) {
        ctx.fillStyle = '#26180a';
      } else {
        const idx = Math.floor(hash(x + 50, y) * colors.length);
        ctx.fillStyle = colors[idx];
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }
});

// 8. Oak Log Side
export const oakLogSideTexture = createPixelTexture((ctx, s) => {
  const barkColors = ['#6b5333', '#5d472a', '#785d3b', '#4f3c22'];
  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      const idx = Math.floor(hash(x * 2, y * 0.5) * barkColors.length);
      ctx.fillStyle = barkColors[idx];
      ctx.fillRect(x, y, 1, 1);
    }
  }
});

// 9. Oak Log Top
export const oakLogTopTexture = createPixelTexture((ctx, s) => {
  const center = 7.5;
  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      const dist = Math.sqrt((x - center) ** 2 + (y - center) ** 2);
      if (dist > 7) {
        ctx.fillStyle = '#5d472a'; // bark outer ring
      } else if (dist > 5.5) {
        ctx.fillStyle = '#a38150';
      } else if (dist > 4) {
        ctx.fillStyle = '#8f7043';
      } else if (dist > 2.5) {
        ctx.fillStyle = '#b38f5a';
      } else {
        ctx.fillStyle = '#9b7a49';
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }
});

// 10. Willow Leaves (Lush weeping willow foliage with hanging vines)
export const willowLeavesTexture = createPixelTexture((ctx, s) => {
  const leafColors = ['#538029', '#639931', '#456a21', '#72af38', '#38571a'];
  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      const val = hash(x + 70, y);
      if (val > 0.88) {
        ctx.clearRect(x, y, 1, 1); // semi-transparent cutouts for authentic leaf blocks
      } else {
        const idx = Math.floor(val * leafColors.length);
        ctx.fillStyle = leafColors[idx];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
});

// 11. Pine / Conifer Spruce Leaves (Darker mountain pine)
export const pineLeavesTexture = createPixelTexture((ctx, s) => {
  const pineColors = ['#2b4d2e', '#234126', '#355c39', '#1d361f', '#3c6840'];
  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      const val = hash(x + 80, y);
      const idx = Math.floor(val * pineColors.length);
      ctx.fillStyle = pineColors[idx];
      ctx.fillRect(x, y, 1, 1);
    }
  }
});

// 12. Water Texture (Translucent turquoise blue)
export const waterTexture = createPixelTexture((ctx, s) => {
  const waterColors = ['#299699', '#2eaab0', '#25888d', '#3bc0c5', '#1e7579'];
  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      const idx = Math.floor(hash(x + 90, y + 10) * waterColors.length);
      ctx.fillStyle = waterColors[idx];
      ctx.fillRect(x, y, 1, 1);
    }
  }
});

// 13. Waterfall Foam Texture
export const foamTexture = createPixelTexture((ctx, s) => {
  const foamColors = ['#eafaf8', '#ffffff', '#ccefe9', '#aee4dc'];
  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      const idx = Math.floor(hash(x * 3, y * 3) * foamColors.length);
      ctx.fillStyle = foamColors[idx];
      ctx.fillRect(x, y, 1, 1);
    }
  }
});

// 14. Cobblestone Texture
export const cobblestoneTexture = createPixelTexture((ctx, s) => {
  const colors = ['#5e5e5e', '#6e6e6e', '#7d7d7d', '#484848', '#8a8a8a'];
  ctx.fillStyle = '#404040';
  ctx.fillRect(0, 0, s, s);
  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      if ((x % 4 !== 0 || y % 3 !== 0) && hash(x, y + 33) > 0.25) {
        const idx = Math.floor(hash(x, y) * colors.length);
        ctx.fillStyle = colors[idx];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
});

// 15. Lantern Glow / Metal
export const lanternTexture = createPixelTexture((ctx, s) => {
  ctx.fillStyle = '#27272a'; // Iron rim
  ctx.fillRect(0, 0, s, s);
  ctx.fillStyle = '#f59e0b'; // Amber glow
  ctx.fillRect(3, 3, 10, 10);
  ctx.fillStyle = '#fef08a'; // Bright core
  ctx.fillRect(5, 5, 6, 6);
});

// 16. Cloud Texture
export const cloudTexture = createPixelTexture((ctx, s) => {
  const cloudColors = ['#fff5eb', '#ffe8d6', '#fed7aa', '#ffffff'];
  for (let x = 0; x < s; x++) {
    for (let y = 0; y < s; y++) {
      const idx = Math.floor(hash(x + 11, y + 22) * cloudColors.length);
      ctx.fillStyle = cloudColors[idx];
      ctx.fillRect(x, y, 1, 1);
    }
  }
});

