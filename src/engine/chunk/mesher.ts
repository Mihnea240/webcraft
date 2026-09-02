import { World } from "../world";
import { Chunk } from "./chunk";



export class ChunkMesher {
    public chunk!: Chunk;
    public world!: World;

    setChunk(chunk: Chunk) {
        this.chunk = chunk;
        this.world = chunk.world;
    }


    
}