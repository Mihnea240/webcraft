# WebCraft Architecture

WebCraft is a high-performance Bedrock-compatible voxel engine designed for the web, powered by WebGPU and Three.js TSL (Node Material system).

---

## 1. High-Level Data Flow

```
[ Bedrock Resource Pack (.zip) ]
      │
      ├──> TextureMapper ──> 3D DataTexture Atlas (2048x2048xN) + TextureStruct Storage Buffer
      └──> GeometryMapper ──> CubeStruct Storage Buffer (48B per cube element)
                                      │
[ World / Chunk Data (Palette) ]      │
      │                               │
      └──> ChunkMesher (CPU) ─────────┤
               │                      │
               ▼                      ▼
      [ QuadStruct Storage Buffer (16B per quad) ]
               │
               ▼
      [ Terrain Vertex Shader (TSL / WGSL) ]
        - Indexed Vertex Pulling (IVP) via vertexIndex >> 2
        - Unpacks quad position, normal, geometry_id, texture_id, uv_rotation, tint_method
        - Parallel fetch of CubeStruct & TextureStruct
        - Placement rotation (model duplication or octahedral group LUT)
        - Deterministic world position hash for natural jitter (grass, flowers)
        - Branchless 2-bit UV rotation via index shifting
        - Computes final per-vertex lighting, AO, face dimming & biome tint (vColor)
               │
               ▼
      [ Fragment Shader ]
        - Samples 3D Texture Atlas
        - Multiplies by interpolated vertex color (vColor)
        - Linear transfer (sRGBTransferEOTF) to output
```

---

## 2. Terrain Rendering Pipeline Specification

### A. CPU Mesher Responsibilities
The CPU mesher is designed as a lightweight classifier, doing zero floating-point matrix math:
- Evaluates visible block faces and writes a single 16-byte `QuadStruct` per quad into a flat buffer.
- **UV Transformation & Locking**: Decides whether a face requires UV-locking or random rotation on the CPU and collapses the decision into a 2-bit `uv_rotation` value ($0=0^\circ, 1=90^\circ, 2=180^\circ, 3=270^\circ$), eliminating branching in the shader.
- **Color & Light Encoding**: Encodes 4-corner ambient occlusion and block/sky light into dedicated packed bitfields.

### B. Vertex Stage (Geometry & Color Assembly)
1. **Parallel Buffer Fetch**: 
   From `quadNode[1u]`, the GPU issues concurrent loads for `CubeStruct` (`geometry_id`) and `TextureStruct` (`texture_id`).
2. **Placement Orientation**:
   Resolved either through pre-rotated model entries in `CubeStruct` or a 24-entry swizzle/sign lookup table representing the chiral octahedral group ($O_h$), eliminating runtime quaternion rotations for axis-aligned blocks.
3. **Deterministic Random Jitter**:
   Positional offsets for natural foliage (tall grass, flowers) are computed entirely in the vertex shader by hashing the global block coordinates:
   $$\text{offset} = \text{hash}(\text{worldX}, \text{worldY}, \text{worldZ}) \times \text{jitterScale}$$
   This requires zero extra VRAM and remains 100% deterministic across chunk boundaries and re-meshes.
4. **Branchless UV Rotation**:
   Rotates the corner UV coordinates by indexing the corner UV lookup table with an offset:
   $$\text{cornerIndex} = (\text{quadVertexIndex} + \text{uv\_rotation}) \ \& \ 3$$
5. **Per-Vertex Lighting, AO & Tint (Crucial for Fill-Rate)**:
   Color and lighting modulation are calculated **per-vertex in the vertex shader** rather than per-pixel:
   $$\text{vColor} = \text{biomeTint}(\text{tint\_method}) \times \text{faceDimming}(\text{normal}) \times \text{cornerAO} \times \text{cornerLight}$$
   The GPU's hardware rasterizer automatically interpolates `vColor` bilinearly across the face for free, keeping fragment shader ALU minimal.

### C. Fragment Stage (Minimal Pixel Work)
- Samples the 3D texture atlas: `texColor = texture3D(terrainTexture, vUv3D)`.
- Multiplies `texColor.rgb * vColor.rgb` (with optional alpha masking for partially-tinted textures such as grass side blocks).
- Applies `sRGBTransferEOTF` for color-space correct rendering.

---

## 3. Storage Buffer Contracts

All vertex data is pulled dynamically from storage buffers rather than traditional vertex attributes (Programmable Pulling). Every struct aligns cleanly to 32-bit words and 16-byte boundaries:

| Buffer Node | Schema | Word Stride | Byte Stride | WGSL Binding Type | Content |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `quadsStorageNode` | `QuadStruct` | 4 u32s | 16 Bytes | `array<vec4<u32>>` | Per-quad voxel position $(x,y,z)$, normal, `geometry_id`, `texture_id`, AO/lighting |
| `cubesStorageNode` | `CubeStruct` | 12 u32s | 48 Bytes | `array<CubeStruct>` | Static cube geometry: rotation quaternion, Float16 scale/offset, 6 face UV rects |
| `texturesStorageNode` | `TextureStruct` | 2 u32s | 8 Bytes | `array<vec2<u32>>` | Global atlas $(u, v, w)$ coordinates, mip/frame animation metadata |
| `chunksStorageNode` | `ChunkDataStruct` | 4 u32s | 16 Bytes | `array<ChunkDataStruct>` | Chunk world coordinates and metadata |

---

## 4. Core Subsystems

### A. Resource Ingestion (`src/engine/resource_manager/`)
- **Parsers**: Ingests Bedrock resource pack `.zip` files containing `terrain_texture.json`, `flipbook_textures.json`, and `.geo.json` models.
- **AtlasBuilder**: Automatically packs texture tiles into a 3D atlas with 8px edge padding to prevent mipmap/filtering bleeding.
- **Registries (`ResourceRegistry`)**: Flat typed buffers (`BufferStorageUnit`) backed by `ArrayBuffer`. Zero-copy bindings directly into Three.js `StorageBufferAttribute`.

### B. Chunk & Meshing Pipeline (`src/engine/chunk/`)
- **Chunk**: Holds 3D voxel data backed by a palette storage scheme.
- **ChunkMesher**: Iterates chunk volume, evaluates permutation models, and writes packed quads via CPU `DataViewPacker`.
- **ChunkRenderRegistry**: Manages chunk allocations in GPU storage buffers and tracks dirty mesh updates.

### C. Render Pipeline & Shaders (`src/engine/render/`)
- **`RenderPipeline`**: Global hub for Three.js WebGPU storage attributes, textures, and TSL packers.
- **`TerrainShaderNodes` (`src/engine/render/shaders/terrain/main.tsl.ts`)**: Modular TSL material that pulls quad, cube, and texture attributes on-the-fly per vertex index.

---

## 5. Key Rules & Invariants

1. **Bit Packing Order**: The CPU (`DataViewPacker`) and GPU (`TSLPacker`) must always agree on bit order (`packMsbFirst`).
2. **Buffer Element Sizing**: Statically allocated GPU stub buffers must allocate at least 2 elements (`stride * 2`) so Three.js infers `array<T>` in WGSL rather than a single struct uniform.
3. **Array Struct Serialization**: Three.js's WGSL transpiler does not rewrite inner GLSL vector types inside `array<...>`. Use WGSL-native type strings (e.g. `'array<vec4<u32>, 3>'`) for struct members containing vector arrays.
