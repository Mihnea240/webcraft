# Block Rendering Architecture
---

## 1. Data Structure Overview

* **`QuadStruct` (16 Bytes):** 
  * Holds dynamic, per-quad world data (voxel position, size, light levels, face orientation).
  * Points to geometry and texture definitions via `geometry_id` and `texture_id`.
  * Encodes per-vertex smooth lighting and ambient occlusion states.
* **`CubeStruct` (Geometry SSBO):** 
  * Stores static model geometry per block type.
  * Contains local rotations, float16 scale/offsets, per-face UV bounds, and inset values.
* **`TextureStruct` (Texture SSBO):** 
  * Stores atlas UV placement, texture size exponents, and frame animation metadata.
* **`RandomOffsetStruct` (CPU / Uniform Buffer):** 
  * Defines min/max jitter ranges for randomized block placement (e.g., tall grass, flowers).

---

## 2. Rendering Steps (Vertex Shader)

* **Position Reconstruction:**
  * Uses quad coordinates `(x, y, z)` and `(n_way_x, n_way_y, n_way_z)` to build the base 3D quad.
  * Fetches `CubeStruct` via `geometry_id` to apply rotation, scale, offsets, and normal `inset`.
  * Applies randomized positional offsets if `random_offset_index` is set.
* **UV & Texture Mapping:**
  * Fetches per-face local UVs from `CubeStruct.uvs[face]`.
  * Translates local UVs to the global texture atlas using `TextureStruct` via `texture_id`.
  * Computes frame interpolation if `blend_frames` and `a_framae_cnt` are active.
  * Applies random rotations or UV lock if specified by `uv_transformation`.
* **Lighting & Shading Calculation:**
  * Bilinearly interpolates 4-corner block and sky light from `corner_light`.
  * Computes per-vertex corner shadows using `corner_ao` (0–3 level) scaled by `ambient_occlusion`.
  * Applies directional face shading if `face_dimming` is enabled.
  * Applies biome tinting via `tint_method`, masking by alpha if `alpha_mask_tint` is enabled.

---

## 3. Key Benefits

* **Zero Memory Waste:** Quads fit perfectly into 16 bytes (`vec4<u32>`), avoiding cache line splits on the GPU.
* **High Reusability:** Complex cube transforms and texture atlas definitions are stored once in buffers rather than duplicated per quad.
* **Efficient Greedy Meshing:** Large flat surfaces easily merge into single quads using the `n_way` dimensions.