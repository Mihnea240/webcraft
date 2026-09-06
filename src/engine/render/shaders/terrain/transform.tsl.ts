import { float, Fn, max, sqrt, Switch, uint, vec3, vec4 } from 'three/tsl';

const SQRT2 = float(Math.SQRT2);

export const extractQuaternionFromPacked = Fn(([packed], _builder) => {
    const p = packed.toUint();
    const axis = p.shiftRight(30);

    const rawA = p.shiftRight(20).bitAnd(0x3FF).toFloat();
    const rawB = p.shiftRight(10).bitAnd(0x3FF).toFloat();
    const rawC = p.bitAnd(0x3FF).toFloat();

    const a = rawA.div(1023.0).mul(2.0).sub(1.0).div(SQRT2);
    const b = rawB.div(1023.0).mul(2.0).sub(1.0).div(SQRT2);
    const c = rawC.div(1023.0).mul(2.0).sub(1.0).div(SQRT2);

    const sumSq = a.mul(a).add(b.mul(b)).add(c.mul(c));
    const d = sqrt(max(float(0.0), float(1.0).sub(sumSq)));

    const quaternion = vec4().toVar();
    Switch(axis)
        .Case(uint(0), () => { quaternion.assign(vec4(d, a, b, c)); })
        .Case(uint(1), () => { quaternion.assign(vec4(a, d, b, c)); })
        .Case(uint(2), () => { quaternion.assign(vec4(a, b, d, c)); })
        .Case(uint(3), () => { quaternion.assign(vec4(a, b, c, d)); });

    return quaternion;
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

