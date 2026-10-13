import { InferCPUType } from "node_modules/bitpacker/dist";
import * as Three from "three";
import { BlockRefrence } from "../block/blockRefrence";
import { CubeStruct } from "../packing_schemas";
import { CubeGeometryRegistry } from "../resource_manager/registry";
import { Face } from "../utils/faces";
import { World } from "./world";

export type DdaLineCallback = (
    block: Readonly<BlockRefrence>,
    distance: number,
    hitFace: Face | undefined,
) => boolean | void;

export class RaycastHit {
    block: BlockRefrence;

    bakedGeometryId: number = -1;
    geometryIntersection: Three.Vector3 = new Three.Vector3();
    geometryHitFace: Face | undefined;

    voxelIntersection: Three.Vector3 = new Three.Vector3();
    voxelHitFace: Face | undefined;

    constructor(world: World) {
        this.block = new BlockRefrence(world);
    }

    getVoxelDistance(origin: Three.Vector3): number {
        return origin.distanceTo(this.voxelIntersection);
    }

    getGeometryDistance(origin: Three.Vector3): number {
        return origin.distanceTo(this.geometryIntersection);
    }
}

export interface Ray {
    origin: Three.Vector3;
    direction: Three.Vector3;
    maxDistance: number;
}

export class Raycaster {
    private readonly block: BlockRefrence;

    private readonly auxQuaternion = new Three.Quaternion();
    private readonly auxDirection = new Three.Vector3();
    private readonly auxWorldDirection = new Three.Vector3();
    private readonly auxOrigin = new Three.Vector3();
    private readonly auxOffset = new Three.Vector3();
    private readonly blockPosition = new Three.Vector3();

    constructor(public world: World) {
        this.block = new BlockRefrence(world);
    }

    intersectsModel(ray: Ray, hit: RaycastHit): RaycastHit | undefined {
        const block = hit.block;
        const cubeRegistry = this.world.resourcePack.get(CubeGeometryRegistry);
        const blockView = block.getBlockView();
        const bakedGeometry = blockView?.getBlockPermutation()?.bakedGeometry!;

        let closestDistance = Infinity;
        this.auxWorldDirection.copy(ray.direction).normalize();
        for (let i = 0; i < bakedGeometry.cubes.length; i++) {
            const bakedCube = bakedGeometry.cubes[i];
            const cubeView = cubeRegistry.get(bakedCube.cubeId);
            if (!cubeView) continue;

            const intersection = this.rayCubeIntersection(ray, cubeView);
            if (intersection && intersection.distance < closestDistance) {
                closestDistance = intersection.distance;
                hit.bakedGeometryId = i;
                hit.geometryIntersection
                    .copy(ray.origin)
                    .addScaledVector(this.auxWorldDirection, intersection.distance);
                hit.geometryHitFace = intersection.hitFace;
            }
        }

        return closestDistance < Infinity ? hit : undefined;
    }

    rayCubeIntersection(
        ray: Ray,
        cubeView: InferCPUType<typeof CubeStruct>,
    ): { distance: number; hitFace: Face } | undefined {
        const offsetX = cubeView.offset.get(0) / 16;
        const offsetY = cubeView.offset.get(1) / 16;
        const offsetZ = cubeView.offset.get(2) / 16;
        const scaleX = cubeView.scale.get(0) / 16;
        const scaleY = cubeView.scale.get(1) / 16;
        const scaleZ = cubeView.scale.get(2) / 16;

        this.auxOrigin
            .copy(ray.origin)
            .sub(this.blockPosition)
        this.auxOffset.set(offsetX, offsetY, offsetZ);
        this.auxOrigin.sub(this.auxOffset);
        this.auxDirection.copy(ray.direction).normalize();

        if (cubeView.rotation !== 0) {
            const packedRotation = cubeView.rotation >>> 0;
            const toSigned = (value: number) => value > 127 ? value - 256 : value;
            this.auxQuaternion.set(
                toSigned((packedRotation >> 24) & 0xFF) / 127,
                toSigned((packedRotation >> 16) & 0xFF) / 127,
                toSigned((packedRotation >> 8) & 0xFF) / 127,
                toSigned(packedRotation & 0xFF) / 127,
            ).normalize();
            this.auxQuaternion.invert();

            this.auxOrigin.applyQuaternion(this.auxQuaternion);
            this.auxDirection.applyQuaternion(this.auxQuaternion);
        }

        const minX = 0;
        const minY = 0;
        const minZ = 0;
        const maxX = scaleX;
        const maxY = scaleY;
        const maxZ = scaleZ;

        const invX = 1 / this.auxDirection.x;
        const invY = 1 / this.auxDirection.y;
        const invZ = 1 / this.auxDirection.z;

        const t1 = (minX - this.auxOrigin.x) * invX;
        const t2 = (maxX - this.auxOrigin.x) * invX;
        const t3 = (minY - this.auxOrigin.y) * invY;
        const t4 = (maxY - this.auxOrigin.y) * invY;
        const t5 = (minZ - this.auxOrigin.z) * invZ;
        const t6 = (maxZ - this.auxOrigin.z) * invZ;

        const tminX = Math.min(t1, t2);
        const tmaxX = Math.max(t1, t2);
        const tminY = Math.min(t3, t4);
        const tmaxY = Math.max(t3, t4);
        const tminZ = Math.min(t5, t6);
        const tmaxZ = Math.max(t5, t6);

        const tmin = Math.max(tminX, tminY, tminZ);
        const tmax = Math.min(tmaxX, tmaxY, tmaxZ);

        if (tmax < 0 || tmin > tmax || tmin > ray.maxDistance) {
            return undefined;
        }

        let hitFace: Face | undefined;
        if (tmin === tminX) {
            hitFace = this.auxDirection.x > 0 ? Face.LEFT : Face.RIGHT;
        } else if (tmin === tminY) {
            hitFace = this.auxDirection.y > 0 ? Face.BOTTOM : Face.TOP;
        } else if (tmin === tminZ) {
            hitFace = this.auxDirection.z > 0 ? Face.BACK : Face.FRONT;
        }

        return hitFace === undefined
            ? undefined
            : { distance: Math.max(0, tmin), hitFace };
    }

    dda(ray: Ray, hit?: RaycastHit): RaycastHit | undefined {
        let found = false;

        this.ddaLine(ray, (block, distance, hitFace) => {
            if (!block.chunk) {
                return false;
            }

            const descriptor = block.getDescriptor();
            if (descriptor === undefined || descriptor === -1) {
                return false;
            }

            hit ??= new RaycastHit(this.world);
            hit.block.setChunkPosition(
                block.chunk,
                block.localX,
                block.localY,
                block.localZ,
            );

            this.blockPosition.set(block.worldX, block.worldY, block.worldZ);
            hit.voxelIntersection
                .copy(ray.origin)
                .addScaledVector(this.auxWorldDirection, distance);
            hit.voxelHitFace = hitFace;

            found = this.intersectsModel(ray, hit) !== undefined;
            return found;
        });

        return found ? hit : undefined;
    }

    ddaLine(
        ray: Ray,
        callback: DdaLineCallback,
    ): void {
        const directionLength = ray.direction.length();
        if (directionLength === 0 || ray.maxDistance < 0) {
            return;
        }

        this.auxWorldDirection.copy(ray.direction).normalize();

        const directionX = this.auxWorldDirection.x;
        const directionY = this.auxWorldDirection.y;
        const directionZ = this.auxWorldDirection.z;
        const maxT = ray.maxDistance;

        let x = Math.floor(ray.origin.x);
        let y = Math.floor(ray.origin.y);
        let z = Math.floor(ray.origin.z);

        const stepX = Math.sign(directionX);
        const stepY = Math.sign(directionY);
        const stepZ = Math.sign(directionZ);

        const tDeltaX = stepX === 0 ? Infinity : Math.abs(1 / directionX);
        const tDeltaY = stepY === 0 ? Infinity : Math.abs(1 / directionY);
        const tDeltaZ = stepZ === 0 ? Infinity : Math.abs(1 / directionZ);

        const tMaxX = stepX > 0
            ? (x + 1 - ray.origin.x) / directionX
            : stepX < 0
                ? (x - ray.origin.x) / directionX
                : Infinity;
        const tMaxY = stepY > 0
            ? (y + 1 - ray.origin.y) / directionY
            : stepY < 0
                ? (y - ray.origin.y) / directionY
                : Infinity;
        const tMaxZ = stepZ > 0
            ? (z + 1 - ray.origin.z) / directionZ
            : stepZ < 0
                ? (z - ray.origin.z) / directionZ
                : Infinity;

        let nextX = tMaxX;
        let nextY = tMaxY;
        let nextZ = tMaxZ;
        let distance = 0;
        let hitFace: Face | undefined;

        this.block.setPosition(x, y, z);

        while (distance <= maxT) {
            if (callback(this.block, distance, hitFace)) {
                return;
            }

            if (nextX < nextY && nextX < nextZ) {
                x += stepX;
                distance = nextX;
                nextX += tDeltaX;
                this.block.step(stepX, 0, 0);
                hitFace = stepX > 0 ? Face.LEFT : Face.RIGHT;
            } else if (nextY < nextZ) {
                y += stepY;
                distance = nextY;
                nextY += tDeltaY;
                this.block.step(0, stepY, 0);
                hitFace = stepY > 0 ? Face.BOTTOM : Face.TOP;
            } else {
                z += stepZ;
                distance = nextZ;
                nextZ += tDeltaZ;
                this.block.step(0, 0, stepZ);
                hitFace = stepZ > 0 ? Face.BACK : Face.FRONT;
            }
        }

    }
}