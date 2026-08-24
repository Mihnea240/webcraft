import { Bones, Cubes, Geometry } from "@bedrock-types/rp/models/entity/model_entity";
import { BlockModel, BlockModelRegistry, CubeGeometryMetadata, CubeGeometryRegistry } from "../registry";

import { InferCPUType } from "bitpacker";
import { CubeStruct } from "src/engine/packing_schemas/cube";
import Faces, { Face } from "src/engine/utils/faces";
import { packQuaternion } from "src/engine/utils/quaternion";
import { Euler, Matrix4, Quaternion, Vector3 } from "three";

type Cube = Cubes[number] & { inset?: number };
type CubeStruct = InferCPUType<typeof CubeStruct>;

const defaultOffset = new Vector3(0, 0, 0);
const defualtScale = new Vector3(16, 16, 16);
const defaultPivot = new Vector3(8, 8, 8);
const defaultAngles = new Vector3(0, 0, 0);
const defaultUv = [0, 0];
const defaultMaterials = [...Faces.Cardinal] as CubeGeometryMetadata;

export class GeometryMapper {
    offset = new Vector3();
    scale = new Vector3();
    euler = new Euler();
    angles = new Vector3();
    pivot = new Vector3();

    constructor(
        public cubeGeometryRegistry: CubeGeometryRegistry,
        public blockModelRegistry: BlockModelRegistry
    ) {

    }

    parseBlockModel(models: Geometry) {
        const blockModel = new BlockModel();
        const model = models[0]!;
        const description = model.description;
        const name = description.identifier;

        const id = this.blockModelRegistry.push(name, blockModel);
        if (!model.bones) return id;

        // Map bone names to their corresponding indices in the boneData array
        for (const bone of model.bones) {
            blockModel.boneNameToId.set(bone.name, blockModel.boneData.length);
        }

        // Create the tree structure of bones by mapping each bone's parent to its index in the boneData array
        blockModel.boneParents = new Array(model.bones.length).fill(-1);
        for (const bone of model.bones) {
            const boneId = blockModel.boneNameToId.get(bone.name)!;
            const parentId = bone.parent ? blockModel.boneNameToId.get(bone.parent) ?? -1 : -1;
            blockModel.boneParents[boneId] = parentId;
        }

        // Compute chains of static rotations for each bone based on its parent-child relationships
        const transforms = this.computeTransforms(model.bones, blockModel.boneParents);

        // Parse cubes in the bones
        for (let i = 0; i < model.bones.length; i++) {
            const bone = model.bones[i]!;
            const boneTransform = transforms[i]!;
            let cubeStart = -1, cubeCount = 0;

            for (const cube of bone.cubes || []) {
                const cubeId = this.parseCubeGeometry(cube, boneTransform);
                if (cubeStart === -1) cubeStart = cubeId;
                cubeCount++;
            }

            blockModel.boneData.push({
                cubeStartId: cubeStart,
                cubeCount: cubeCount,
                pivot: bone.pivot as [number, number, number] | undefined,
            });
        }

        return id;
    }

    computeTransforms(bones: Bones, boneParents: number[]) {
        const transforms = new Array<Matrix4>(bones.length);

        const resolveTransform = (boneId: number) => {
            const bone = bones[boneId]!;
            const parentId = boneParents[boneId]!;

            if (parentId === -1) {
                transforms[boneId] ??= new Matrix4().identity();
            } else if (!transforms[parentId]) {
                resolveTransform(parentId);
            }

            const parentTransform = transforms[parentId]!;

            const pivot = bone.pivot ? this.pivot.fromArray(bone.pivot) : defaultPivot;
            const angles = bone.rotation ? this.angles.fromArray(bone.rotation).multiplyScalar(Math.PI / 180) : defaultAngles;
            const euler = this.euler.set(angles.x, angles.y, angles.z, "YXZ");

            const translation = new Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z);
            const inverseTranslation = new Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z);
            const localTransform = new Matrix4()
                .makeRotationFromEuler(euler)
                .premultiply(translation)
                .multiply(inverseTranslation);

            transforms[boneId] = new Matrix4().multiplyMatrices(parentTransform, localTransform);
        }


        for (let i = 0; i < boneParents.length; i++) {
            if (!transforms[i]) {
                resolveTransform(i);
            }
        }

        return transforms;
    }

    parseCubeGeometry(cube: Cube, transform: Matrix4) {
        const id = this.cubeGeometryRegistry.writePointer();
        const view = this.cubeGeometryRegistry.get(id)!;

        const offset = cube.origin ? this.offset.fromArray(cube.origin) : defaultOffset.clone();
        const scale = cube.size ? this.scale.fromArray(cube.size) : defualtScale.clone();
        const pivot = cube.pivot ? this.pivot.fromArray(cube.pivot) : defaultPivot;
        const angles = cube.rotation ? this.angles.fromArray(cube.rotation).multiplyScalar(Math.PI / 180) : defaultAngles;
        const euler = this.euler.set(angles.x, angles.y, angles.z, "YXZ");

        if (cube.inflate) {
            offset.addScalar(-cube.inflate);
            scale.addScalar(cube.inflate * 2);
        }

        const pivotTranslation = new Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z);
        const inversePivotTranslation = new Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z);
        const rotationMatrix = new Matrix4().makeRotationFromEuler(euler);
        const finalTransform = new Matrix4()
            .multiply(transform)
            .multiply(pivotTranslation)
            .multiply(rotationMatrix)
            .multiply(inversePivotTranslation);
        const finalRotation = new Quaternion().setFromRotationMatrix(finalTransform);
        offset.applyMatrix4(finalTransform);

        view.offset[0] = offset.x;
        view.offset[1] = offset.y;
        view.offset[2] = offset.z;

        view.scale[0] = scale.x;
        view.scale[1] = scale.y;
        view.scale[2] = scale.z;

        view.rotation = packQuaternion(finalRotation);
        view.inset = cube.inset ? Math.floor(cube.inset * 4) : 0;

        const materials = this.resolveUvs(view, cube.uv, scale);
        return this.cubeGeometryRegistry.add(undefined, materials);
    }

    resolveFaceHeight(scale: Vector3, face: Face) {
        switch (face) {
            case Face.RIGHT:
            case Face.LEFT:
                return scale.y;
            case Face.TOP:
            case Face.BOTTOM:
                return scale.z;
            case Face.FRONT:
            case Face.BACK:
                return scale.y;
        }
    }

    resolveFaceWidth(scale: Vector3, face: Face) {
        switch (face) {
            case Face.RIGHT:
            case Face.LEFT:
                return scale.z;
            case Face.TOP:
            case Face.BOTTOM:
                return scale.x;
            case Face.FRONT:
            case Face.BACK:
                return scale.x;
        }
    }

    resolveUvs(view: CubeStruct, uv: Cubes[number]["uv"], scale: Vector3) {
        const uvStorage = view.uvs;
        let materials = defaultMaterials;

        if (!uv) {
            for (const face of Faces.Values) {
                const faceStorage = uvStorage[face];
                const width = this.resolveFaceWidth(scale, face);
                const height = this.resolveFaceHeight(scale, face);
                faceStorage.u = 0;
                faceStorage.v = 0;
                faceStorage.w = width;
                faceStorage.h = height;
            }

            return materials;
        }

        if (Array.isArray(uv)) {
            let u = 0, v = 0;
            switch (uv.length) {
                case 0:
                    u = v = 0;
                    break;
                case 1:
                    u = v = uv[0];
                    break;
                case 2:
                    u = uv[0];
                    v = uv[1];
                    break;
                default:
                    throw new Error("Invalid uv array length");
            }

            for (const face of Faces.Values) {
                const faceStorage = uvStorage[face];
                const width = this.resolveFaceWidth(scale, face);
                const height = this.resolveFaceHeight(scale, face);
                faceStorage.u = u;
                faceStorage.v = v;
                faceStorage.w = width;
                faceStorage.h = height;
            }
            return materials;
        }

        let duplicatedMaterials = false;

        for (const face of Faces.Values) {
            const faceStorage = uvStorage[face];
            const faceUv = (uv as any)[Faces.toString(face)] as any;

            if (!faceUv) {
                const width = this.resolveFaceWidth(scale, face);
                const height = this.resolveFaceHeight(scale, face);

                faceStorage.u = 0;
                faceStorage.v = 0;
                faceStorage.w = width;
                faceStorage.h = height;
                continue;
            }

            if (faceUv.material_instance) {
                if (!duplicatedMaterials) {
                    materials = [...defaultMaterials];
                    duplicatedMaterials = true;
                }

                (materials as any)[face] = faceUv.material_instance;
            }

            const [u, v] = faceUv.uv ?? defaultUv;
            const width = faceUv.uv_size?.[0] ?? this.resolveFaceWidth(scale, face);
            const height = faceUv.uv_size?.[1] ?? this.resolveFaceHeight(scale, face);

            faceStorage.u = u;
            faceStorage.v = v;
            faceStorage.w = width;
            faceStorage.h = height;
        }

        return materials;
    }
}