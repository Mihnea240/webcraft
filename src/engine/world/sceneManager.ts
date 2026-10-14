import * as THREE from "three/webgpu";
import { SelectionBoxComponent } from "../block/components/selectionBox";
import { RaycastHit } from "./dda";
import { PlayerRegistry } from "./playerRegistry";
import { SelectionMesh } from "./selectionMesh";

export interface SceneOptions{
    showStatistics?: boolean;
    showAxis?: boolean;
    showGrid?: boolean;
    showAtlasSlices?: boolean;
}

export class SceneManager {
    scene: THREE.Scene;
    renderer: THREE.WebGPURenderer;

    selectionMesh = new SelectionMesh();
    axisHelper = new THREE.AxesHelper(96)
    gridHelper = new THREE.GridHelper(96, 96, 0xff4444, 0x444444);


    constructor(options: SceneOptions = {}) {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGPURenderer({ antialias: true });
        
        this.selectionMesh.addToScene(this.scene);
        this.scene.add(this.axisHelper);
        this.scene.add(this.gridHelper);
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

    debugVisuals() {
        
    }

    showSelectionMesh(hit?: RaycastHit) {
        if(!hit) {
            this.selectionMesh.hide();
            return;
        }

        const block = hit.block;
        const view = block.getBlockView()!;

        const selectionBoxComponent = view.getComponent(SelectionBoxComponent) as SelectionBoxComponent || SelectionBoxComponent.defaultSelectionBox;
        const data = selectionBoxComponent.data;

        this.selectionMesh.setPosition(block.worldX + data[0], block.worldY + data[1], block.worldZ + data[2]);
        this.selectionMesh.setScale(data[4], data[5], data[6]);

        const {x, y, z} = hit.geometryIntersection;
        this.selectionMesh.setIntersectionPoint(x, y, z);

        this.selectionMesh.show();
    }
}
