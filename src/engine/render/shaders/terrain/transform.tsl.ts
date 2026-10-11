import { Fn, vec3, vec4 } from 'three/tsl';

export const extractQuaternionFromPacked = Fn(([packed], _builder) => {
    const p = packed.toUint();

    // Sign-extend 8-bit integers via arithmetic right shift
    const x = p.toInt().shiftRight(24).toFloat();
    const y = p.shiftLeft(8).toInt().shiftRight(24).toFloat();
    const z = p.shiftLeft(16).toInt().shiftRight(24).toFloat();
    const w = p.shiftLeft(24).toInt().shiftRight(24).toFloat();

    return vec4(x, y, z, w).div(127.0);
});

export const applyQuaternion = Fn(([quaternion, vector], _builder) => {
    const q = quaternion.toVar();
    const v = vector.toVar();

    // Three.js quaternion layout is (x, y, z, w) where w is the scalar component
    const qv = vec3(q.x, q.y, q.z);
    const uv = qv.cross(v);
    const uuv = qv.cross(uv);

    return v.add(uv.mul(q.w).mul(2.0)).add(uuv.mul(2.0));
});

