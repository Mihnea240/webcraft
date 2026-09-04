export interface BakedCube {
    /** Index in CubeGeometryRegistry */
    cubeId: number;
    /** Index in BlockModel.boneData (for visibility evaluation) */
    boneIndex: number;
    /** Tile IDs in AtlasTileRegistry for faces 0..5 (East, West, Up, Down, South, North) */
    faceTileIds: [number, number, number, number, number, number];
}

export class BakedGeometry {
    constructor(public cubes: BakedCube[] = []) {}
}

