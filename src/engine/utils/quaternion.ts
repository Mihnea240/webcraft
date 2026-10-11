import * as THREE from "three";

/**
 * Packs a Three.js Quaternion into a 32-bit uint using 4 quantized signed 8-bit components.
 * Returns 0 if the rotation is identity (or negligible), allowing the GPU vertex shader to skip quaternion math entirely.
 */
export function packQuaternion(q: THREE.Quaternion): number {
    // Identity check (reserve 0u as identity flag)
    if (Math.abs(q.x) < 1e-4 && Math.abs(q.y) < 1e-4 && Math.abs(q.z) < 1e-4 && Math.abs(Math.abs(q.w) - 1) < 1e-4) {
        return 0;
    }

    q.normalize();

    let { x, y, z, w } = q;
    if (w < 0) {
        x = -x;
        y = -y;
        z = -z;
        w = -w;
    }

    const toInt8 = (val: number) => {
        const clamped = Math.max(-1, Math.min(1, val));
        return Math.round(clamped * 127) & 0xFF;
    };

    const qx = toInt8(x);
    const qy = toInt8(y);
    const qz = toInt8(z);
    const qw = toInt8(w);

    const packed = ((qx << 24) | (qy << 16) | (qz << 8) | qw) >>> 0;
    return packed === 0 ? 1 : packed;
}

const euler = new THREE.Euler();
const deg2Rad = Math.PI / 180;
const quaternion = new THREE.Quaternion();
export function anglesToQuaternion(angles: THREE.Vector3) { 
    return quaternion.setFromEuler(euler.set(angles.x * deg2Rad, angles.y * deg2Rad, angles.z * deg2Rad, "YXZ"));
}