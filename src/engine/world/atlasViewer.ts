import { float, texture, userData, uv, vec3 } from "three/tsl";
import * as ThREE from "three/webgpu";
import { AtlasRegistry } from "../resource_manager/registry";
import { World } from "./world";


export class AtlasViewer {
    layerQuads: ThREE.Mesh[] = [];
    quadMaterial = new ThREE.MeshBasicNodeMaterial({
        color: 0xffffff,
        side: ThREE.DoubleSide,
    });

    addToScene(scene: ThREE.Scene) {
        for (const quad of this.layerQuads) {
            scene.add(quad);
        }
    }

    removeFromScene(scene: ThREE.Scene) {
        for (const quad of this.layerQuads) {
            scene.remove(quad);
        }
    }

    generateQuads(world: World) {
        const atlasRegistry = world.resourcePack.get(AtlasRegistry);
        const terrainTexture = world.resourcePack.pipeline.terrainTexture;
        const layerCount = atlasRegistry.storage.size;

        this.quadMaterial.colorNode = texture(terrainTexture, vec3(uv().x, uv().y.oneMinus(), float(userData("layer", "int"))));

        for (let layerIndex = 0; layerIndex < layerCount; layerIndex++) {
            const quadGeometry = new ThREE.PlaneGeometry(10, 10);
            const mesh = new ThREE.Mesh(quadGeometry, this.quadMaterial);
            mesh.position.set(0, 5, -15 - layerIndex * 11);
            mesh.userData.layer = layerIndex;
            this.layerQuads.push(mesh);
        }
    }
}