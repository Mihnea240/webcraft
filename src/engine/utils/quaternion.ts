import * as THREE from "three";

const SQRT2 = Math.sqrt(2);
const oneOverSqrt2 = 1 / SQRT2;

function scaleTo10Bit(val: number) { 
    const normalized = Math.max(-oneOverSqrt2, Math.min(oneOverSqrt2, val));
    const zeroToOne = (normalized * SQRT2 + 1) * 0.5;
    return Math.round(zeroToOne * 1023) & 0x3FF;
}

/**
 * Compressor function to pack a Three.js Quaternion into a 32-bit uint using the smallest-three method.
 */
export function packQuaternion(q: THREE.Quaternion): number {
    q.normalize();
    
    let x = q.x, y = q.y, z = q.z, w = q.w;
    let absX = Math.abs(x), absY = Math.abs(y), absZ = Math.abs(z), absW = Math.abs(w);
    
    let maxVal = absX;
    let maxIndex = 0; // 0: x, 1: y, 2: z, 3: w
    
    if (absY > maxVal) { maxVal = absY; maxIndex = 1; }
    if (absZ > maxVal) { maxVal = absZ; maxIndex = 2; }
    if (absW > maxVal) { maxVal = absW; maxIndex = 3; }
    
    let sign = 1;
    if (maxIndex === 0 && x < 0) sign = -1;
    if (maxIndex === 1 && y < 0) sign = -1;
    if (maxIndex === 2 && z < 0) sign = -1;
    if (maxIndex === 3 && w < 0) sign = -1;
    
    x *= sign; y *= sign; z *= sign; w *= sign;
    
    let a = 0, b = 0, c = 0;
    if (maxIndex === 0) { a = y; b = z; c = w; }
    else if (maxIndex === 1) { a = x; b = z; c = w; }
    else if (maxIndex === 2) { a = x; b = y; c = w; }
    else { a = x; b = y; c = z; }
    
    const uA = scaleTo10Bit(a);
    const uB = scaleTo10Bit(b);
    const uC = scaleTo10Bit(c);
    
    return (maxIndex << 30) | (uA << 20) | (uB << 10) | uC;
}

const euler = new THREE.Euler();
const deg2Rad = Math.PI / 180;
const quaternion = new THREE.Quaternion();
export function anglesToQuaternion(angles: THREE.Vector3) { 
    return quaternion.setFromEuler(euler.set(angles.x * deg2Rad, angles.y * deg2Rad, angles.z * deg2Rad, "YXZ"));
}