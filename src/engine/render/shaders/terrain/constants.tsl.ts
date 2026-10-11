
import { array, float, vec2, vec3 } from 'three/tsl';

export const FACE_DIMMING_ARRAY = array([
    float(0.6), // 0: +X
    float(1.0), // 1: +Y
    float(0.8), // 2: +Z
    float(0.8), // 3: -Z
    float(0.5), // 4: -Y
    float(0.6), // 5: -X
]);


export const CUBE_VERTICES_ARRAY = array([
    // 0: +X face
    vec3(1.0, 0.0, 0.0), // Bottom Right
    vec3(1.0, 1.0, 0.0), // Top Right
    vec3(1.0, 1.0, 1.0), // Top Left
    vec3(1.0, 0.0, 1.0), // Bottom Left

    // 1: +Y face
    vec3(0.0, 1.0, 0.0), // Bottom Right
    vec3(0.0, 1.0, 1.0), // Top Right
    vec3(1.0, 1.0, 1.0), // Top Left
    vec3(1.0, 1.0, 0.0), // Bottom Left

    // 2: +Z face
    vec3(1.0, 0.0, 1.0), // Bottom Right
    vec3(1.0, 1.0, 1.0), // Top Right
    vec3(0.0, 1.0, 1.0), // Top Left
    vec3(0.0, 0.0, 1.0), // Bottom Left

    // 3: -Z face
    vec3(0.0, 0.0, 0.0), // Bottom Right
    vec3(0.0, 1.0, 0.0), // Top Right
    vec3(1.0, 1.0, 0.0), // Top Left
    vec3(1.0, 0.0, 0.0), // Bottom Left

    // 4: -Y face
    vec3(1.0, 0.0, 1.0), // Bottom Right
    vec3(0.0, 0.0, 1.0), // Top Right
    vec3(0.0, 0.0, 0.0), // Top Left
    vec3(1.0, 0.0, 0.0), // Bottom Left

    // 5: -X face
    vec3(0.0, 0.0, 1.0), // Bottom Right
    vec3(0.0, 1.0, 1.0), // Top Right
    vec3(0.0, 1.0, 0.0), // Top Left
    vec3(0.0, 0.0, 0.0), // Bottom Left
]);

export const NORMALS_ARRAY = array([
    vec3(1.0, 0.0, 0.0), // +X
    vec3(0.0, 1.0, 0.0), // +Y
    vec3(0.0, 0.0, 1.0), // +Z
    vec3(0.0, 0.0, -1.0), // -Z
    vec3(0.0, -1.0, 0.0), // -Y
    vec3(-1.0, 0.0, 0.0), // -X
]);

export const QUAD_UVS_ARRAY = array([
    vec2(1.0, 1.0), // 0: Bottom Right
    vec2(1.0, 0.0), // 1: Top Right
    vec2(0.0, 0.0), // 2: Top Left
    vec2(0.0, 1.0), // 3: Bottom Left
]);