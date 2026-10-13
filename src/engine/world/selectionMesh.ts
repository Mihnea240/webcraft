import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineSegments2 } from "three/addons/lines/webgpu/LineSegments2.js";
import * as THREE from "three/webgpu";

export class SelectionMesh {
    private readonly geometry = new THREE.BoxGeometry(1, 1, 1);
    private readonly edges = new THREE.EdgesGeometry(this.geometry);
    private readonly lineGeometry = new LineSegmentsGeometry().fromEdgesGeometry(this.edges);
    private readonly intersectionGeometry = new THREE.SphereGeometry(0.04, 8, 6);

    private readonly material = new THREE.Line2NodeMaterial({
        color: 0x00ff00, // Green color
        linewidth: 3, // pixels by default
    });
    private readonly intersectionMaterial = new THREE.MeshBasicNodeMaterial({
        color: 0xff0000,
    });

    private readonly mesh = new LineSegments2(this.lineGeometry, this.material);
    private readonly intersectionMesh = new THREE.Mesh(
        this.intersectionGeometry,
        this.intersectionMaterial,
    );
    private drawIntersectionPoint = true;

    constructor() {
        this.mesh.visible = false;  
        this.intersectionMesh.visible = false;
    }

    getMesh(): THREE.Object3D {
        return this.mesh;
    }

    getIntersectionMesh(): THREE.Mesh {
        return this.intersectionMesh;
    }

    setDrawIntersectionPoint(enabled: boolean) {
        this.drawIntersectionPoint = enabled;
        this.intersectionMesh.visible = enabled && this.mesh.visible;
    }

    setIntersectionPoint(x: number, y: number, z: number) {
        this.intersectionMesh.position.set(x, y, z);
    }

    setPosition(x: number, y: number, z: number) {
        this.mesh.position.set(x + 0.5, y + 0.5, z + 0.5);
    }

    hide() {
        this.mesh.visible = false;
        this.intersectionMesh.visible = false;
    }

    show() {
        this.mesh.visible = true;
        this.intersectionMesh.visible = this.drawIntersectionPoint;
    }

    setScale(x: number, y: number, z: number) {
        this.mesh.scale.set(x, y, z) // Add 1 to ensure the outline is slightly larger than the block
    }

    addToScene(scene: THREE.Scene) {
        scene.add(this.mesh);
        scene.add(this.intersectionMesh);
    }

    removeFromScene(scene: THREE.Scene) {
        scene.remove(this.mesh);
        scene.remove(this.intersectionMesh);
    }
}