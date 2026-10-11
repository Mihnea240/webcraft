import { Fn, float, mix, select, uint } from 'three/tsl';
import { FACE_DIMMING_ARRAY } from './constants.tsl';

/**
 * Calculates per-vertex lighting using TSLPacker-extracted properties.
 *
 * @param blockLight TSL Node representing the corner block light (0..15)
 * @param skyLight TSL Node representing the corner sky light (0..15)
 * @param cornerAo TSL Node representing the corner ambient occlusion (0..3)
 * @param normalIndex TSL Node representing the face normal index (0..5)
 * @param faceDimming TSL Node representing whether directional dimming is enabled (0 or 1)
 */
export const calculateVertexLighting = Fn(([blockLight, skyLight, cornerAo, normalIndex, faceDimming], _builder) => {
    // 1. Normalize light values (0.0 to 1.0)
    const normBlock = float(blockLight).div(15.0);
    const normSky = float(skyLight).div(15.0);

    // 2. Compute Ambient Occlusion factor (0.4 to 1.0)
    const normAo = float(cornerAo).div(3.0);
    const aoMultiplier = mix(float(0.4), float(1.0), float(1.0).sub(normAo));

    // 3. Compute base light level (combining ambient, block light, and sky light)
    const combinedLight = mix(float(0.15), float(1.0), normBlock.max(normSky));

    // 4. Apply directional face dimming
    const dimmingFactor = FACE_DIMMING_ARRAY.element(normalIndex);
    const finalDimming = select(faceDimming.equal(uint(1)), dimmingFactor, float(1.0));

    return combinedLight.mul(aoMultiplier).mul(finalDimming);
});

