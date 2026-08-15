import { ResourceRegistry } from "./resourceRegistry";
import type { ResourcePack } from "./RP";
import type { WorkerResponse } from "./worker/workerDataProtocol";

export type AtlasTile = number | number[] | { id: number, weight: number }[];

export class AtlasTileRegistry extends ResourceRegistry<AtlasTile> {
    tiles: AtlasTile[] = [];
    nameToIdMap: Map<string, number> = new Map();

    constructor(pack: ResourcePack) {
        super(pack);
        if (pack.parent) {
            this.tiles = pack.parent.atlasTileRegistry.tiles; // Share the underlying array
        }
    }

    protected override getLocalById(id: number): AtlasTile | undefined {
        return this.tiles[id];
    }

    protected override getLocalByName(name: string): AtlasTile | undefined {
        const id = this.nameToIdMap.get(name);
        if (id === undefined) return undefined;

        return this.getLocalById(id);
    }

    protected override getParentRegistry(): AtlasTileRegistry | undefined {
        return this.pack.parent?.atlasTileRegistry;
    }

    protected override localSize(): number {
        return this.tiles.length;
    }

    addTile(name: string, tile: AtlasTile): number {
        const id = this.tiles.length;
        this.tiles.push(tile);
        this.nameToIdMap.set(name, id);
        return id;
    }

    linkedClone(newPack: ResourcePack): AtlasTileRegistry {
        const clone = new AtlasTileRegistry(newPack);
        clone.nameToIdMap = new Map();
        return clone;
    }

    fromWorkerResponse(data: WorkerResponse["atlasTileRegistry"]) {
        for (const [name, tile] of data.nameToTile) {
            this.addTile(name, tile);
        }
    }
}