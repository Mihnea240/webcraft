import * as THREE from "three/webgpu";
import { PlayerRegistry } from "./playerRegistry";


export class SceneManager {
    scene: THREE.Scene;
    renderer: THREE.WebGPURenderer;
    private logFrameCount = 0;

    constructor() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGPURenderer({antialias: true});
    }

    sizeRenderer(width: number, height: number) {
        this.renderer.setSize(width, height);
    }

    render(playerRegistry: PlayerRegistry, delta: number = 0) {
        for (const player of playerRegistry.getPlayers()) {
            player.renderWorld(delta);

            if (player.canvasTarget) {
                this.renderer.setCanvasTarget(player.canvasTarget);
                this.renderer.render(this.scene, player.camera);
            }
        }
    }
}
