import { ArrayStorageUnit } from "../memory_management/arrayStorageUnit";
import { ResourceRegistry } from "./resourceRegistry";
import * as Constants from "../constants";

export type AtlasLayer = {
    filledSpots: number;
    mers: boolean;
    offset: number;
    padding: number;
}

export class AtlasRegistry extends ResourceRegistry<AtlasLayer, any> { 
    atlasBuffer!: ArrayBuffer;

    constructor(parent?: AtlasRegistry) {
        super(parent);
        if (parent) {
            this.atlasBuffer = parent.atlasBuffer;
        }
    }
    
    createStorageUnit() {
        this.atlasBuffer = new ArrayBuffer(Constants.INITIAL_ATLAS_SIZE);
        return new ArrayStorageUnit<AtlasLayer, any>();
    }

    public override checkoutBuffers(): ArrayBuffer[] {
        return [this.atlasBuffer];
    }

    public override importBuffers(buffers: ArrayBuffer[]): void {
        this.atlasBuffer = buffers[0];
    }
}