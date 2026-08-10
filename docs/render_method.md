# Render Method — Concise

Summary: WebCraft uses Indexed Vertex Pulling (IVP). Shaders pull compact `QuadStruct` entries which index `CubeStruct` (transform) and `TextureStruct` (UVs/animation). The packing schemas are authoritative: see `engine/packing_schemas/quad.ts`, `engine/packing_schemas/cube.ts`, and `engine/packing_schemas/texture.ts`.

## Structural overview
- Vertex shader pulls a `QuadStruct` (16B) per vertex, then the referenced `CubeStruct` (48B) and `TextureStruct` (8B).
- `CubeStruct` contains a 32-bit packed quaternion (`rotation`), f16 `offset`/`scale`, face `uvs`, `inset`, `n_way_*`, `flags`, and `bone_id`.
- `QuadStruct` packs position indices, `transform_id`, `texture_id`, per-corner AO/light, and `chunk_id`.

## Pipeline (compact)
1. Decode quad index and corner from `vertexIndex`.
2. Pull `QuadStruct` → `CubeStruct` → `TextureStruct` (bone matrix only if `bone_id>0`).
3. Build local plane vertex, apply `inset`, then CPU-baked `scale` and `offset` (f16).
4. Apply rotations in order: cube quaternion → n-way steps (small-angle LUT) → placement LUT.
5. If `bone_id>0` load bone matrix (using `instanceIndex`) and apply; else skip.
6. Emit position, normal, and UVs to the fragment stage.

## Key design notes (short)
- Branching on `bone_id` avoids identity-matrix work and SSBO reads for static geometry.
- Inset stays axis-aligned (normal-only) to avoid per-face matrix work.
- Positions and normals use the same rotation chain to keep lighting coherent.
- Texture atlases are built with padding to avoid runtime seam fixes; `atlas_w` indexes layers when needed.

For implementation details and exact field widths, use the packing schemas in `engine/packing_schemas/`.
