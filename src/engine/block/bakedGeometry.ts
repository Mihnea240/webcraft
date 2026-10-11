import { CullingMode } from "../resource_manager/registry/cullingRegistry";

export interface BakedCube {
    /** Index in CubeGeometryRegistry */
    cubeId: number;
    /** Index in BlockModel.boneData (for visibility evaluation) */
    boneIndex: number;
    /** Tile IDs in AtlasTileRegistry for faces 0..5 (East, West, Up, Down, South, North) */
    faceTileIds: [number, number, number, number, number, number];
}

export class BakedGeometry {
    public cullingLayer: number = 0;
    public cullingId: number = CullingMode.NONE;
    constructor(public cubes: BakedCube[] = []) {}

    public isSolid(): boolean {
        return this.cullingId > CullingMode.NONE && this.cullingId < CullingMode.CUSTOM_START;
    }
}
