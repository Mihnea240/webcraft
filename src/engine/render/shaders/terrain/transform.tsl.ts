import { float, Fn, sqrt, Switch, uint, vec3, vec4 } from 'three/tsl';

export const extractQuaternionFromPacked = Fn(([packed], _builder) => {
    const axis = packed.shiftRight(30);
    const a = packed.shiftRight(20).and(0x3FF).toFloat().div(1023).mul(2).sub(1);
    const b = packed.shiftRight(10).and(0x3FF).toFloat().div(1023).mul(2).sub(1);
    const c = packed.and(0x3FF).toFloat().div(1023).mul(2).sub(1);

    const d = sqrt(float(1).sub(a.mul(a)).sub(b.mul(b)).sub(c.mul(c)));

    const quaternion = vec4().toVar();
    Switch(axis)
        .Case(uint(0), () => quaternion.assign(vec4(d, a, b, c)))
        .Case(uint(1), () => quaternion.assign(vec4(a, d, b, c)))
        .Case(uint(2), () => quaternion.assign(vec4(a, b, d, c)))
        .Case(uint(3), () => quaternion.assign(vec4(a, b, c, d)));

    return quaternion;
    
});

export const applyQuaternion = Fn(([quaternion, vector], _builder) => {
    const q = quaternion.toVar();
    const v = vector.toVar();

    const qv = vec3(q.y, q.z, q.w);
    const uv = qv.cross(v);
    const uuv = qv.cross(uv);

    return v.add(uv.mul(q.x).mul(2)).add(uuv.mul(2));
});

