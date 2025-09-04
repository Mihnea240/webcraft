#version 300 es
precision highp float;

uniform sampler2D terrain_atlas;

flat in vec3 face_normal;
in vec2 vUV;
out vec4 fragColor;

void main() {
	// Sample the texture atlas using the UV coordinates
	vec4 color = texture(terrain_atlas, vUV);
	if( color.a < 0.5) {
		discard; // Discard fragments with low alpha
	}
	float brightness = 0.0;

	// switch (face_normal) {
	// 	case 1: brightness = 1.0; break; // Top face
	// 	case 4: brightness = 0.5; break; // North face
	// 	default: brightness = 0.8; break; // Other faces
	// }
	if(face_normal.y > 0.0) {
		brightness = 1.0; // Top face
	} else if(face_normal.z < 0.0) {
		brightness = 0.5;
	} else {
		brightness = 0.8; // Other faces
	}
	
	// fragColor = vec4(1.0, 0.0, 0.0, 0.17); // Apply the texture color
	fragColor = vec4(color.rgb * brightness, color.a); // Use the texture color with alpha 0.17	
	// fragColor = vec4(vUV, 0.0, 1.0); // Use UV coordinates for color (for tes	ting)
}