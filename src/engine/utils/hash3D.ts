/**
 * Fast deterministic 3D integer hash function.
 * Given integer coordinates (x, y, z), returns a pseudo-random 32-bit unsigned integer.
 */
export function hash3D(x: number, y: number, z: number): number {
    let h = (x * 374761393) ^ (y * 668265263) ^ (z * 3141592653);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return (h ^ (h >>> 16)) >>> 0;
}

