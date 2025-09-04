struct FragmentInput {
    @location(0) vNormal: vec3<f32>,
    @location(1) vUV: vec2<f32>,
}

struct FragmentOutput {
    @location(0) color: vec4<f32>,
}

@binding(1) @group(0) var terrain_atlas: texture_2d<f32>;
@binding(2) @group(0) var atlas_sampler: sampler;

@fragment
fn fs_main(input: FragmentInput) -> FragmentOutput {
    var output: FragmentOutput;
    
    // Sample the texture atlas using the UV coordinates
    let color = textureSample(terrain_atlas, atlas_sampler, input.vUV);
    
    if (color.a < 0.5) {
        discard; // Discard fragments with low alpha
    }
    
    var brightness = 0.0;
    
    // Calculate brightness based on face normal
    if (input.vNormal.y > 0.0) {
        brightness = 1.0; // Top face
    } else if (input.vNormal.z < 0.0) {
        brightness = 0.5; // North face
    } else {
        brightness = 0.8; // Other faces
    }
    
    // Apply brightness to the texture color
    output.color = vec4<f32>(color.rgb * brightness, color.a);
    
    return output;
}