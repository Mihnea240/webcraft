import { Bones, Cubes } from "@bedrock-types/rp/models/entity/model_entity";
import { BlockModel, BlockModelRegistry, CubeGeometryMetadata, CubeGeometryRegistry } from "../registry";

import { InferCPUType } from "bitpacker";
import { CubeStruct } from "src/engine/packing_schemas/cube";
import Faces from "src/engine/utils/faces";
import { packQuaternion } from "src/engine/utils/quaternion";
import { Euler, Matrix4, Quaternion, Vector3 } from "three";

import { fileToJson, ZipFileEntry } from "@engine/utils/decoders";
import { Geometry, Model } from "src/bedrock-types/rp/models/entity/model_entity";

type Cube = Cubes[number] & { inset?: number };

type DefaultGeometryFile = {
    format_version: string;
    "minecraft:geometry": Model[];
}

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

    tempMat1 = new Matrix4();
    tempMat2 = new Matrix4();
    tempMat3 = new Matrix4();
    tempFinalMat = new Matrix4();
    tempQuat = new Quaternion();

    models: Iterable<[string, Geometry | DefaultGeometryFile]>;

    constructor(
        public zipBuffer: ArrayBuffer,
        public headers: Map<string, ZipFileEntry>,
        public cubeGeometryRegistry: CubeGeometryRegistry,
        public blockModelRegistry: BlockModelRegistry
    ) {
        this.models = this.headers.entries()
            .filter(([path]) => path.match(/^(?:resource_pack\/models\/blocks)\/.*\.json$/))
            .map<[string, Geometry]>(entry => [
                entry[0].replace(/^(?:resource_pack\/models\/blocks)\//g, ""),
                fileToJson(zipBuffer, entry[1]!)
            ]).toArray();
    }


    parse() {
        for (const [name, geometry] of this.models) {
            if (name === "vanilla_geometries.geo.json") {
                //Handel custom vannila blocks of which format is not determined yet
                for (const blockDef of (geometry as DefaultGeometryFile)["minecraft:geometry"]) {
                    this.parseBlockModel(blockDef);
                }
                continue; 
            }
            console.log(name, geometry);
            this.parseBlockModel(geometry[0]);
        }
    }


    parseBlockModel(model: Model) {
        const blockModel = new BlockModel();
        const name = model.description.identifier;

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

            let parentTransform: Matrix4;
            if (parentId === -1) {
                parentTransform = new Matrix4().identity();
            } else {
                if (!transforms[parentId]) {
                    resolveTransform(parentId);
                }
                parentTransform = transforms[parentId]!;
            }

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

        const offset = this.offset;
        if (cube.origin) offset.fromArray(cube.origin); else offset.copy(defaultOffset);

        const scale = this.scale;
        if (cube.size) scale.fromArray(cube.size); else scale.copy(defualtScale);

        if (cube.inflate) {
            offset.addScalar(-cube.inflate);
            scale.addScalar(cube.inflate * 2);
        }

        let finalTransform = transform;
        if (cube.rotation && (cube.rotation[0] !== 0 || cube.rotation[1] !== 0 || cube.rotation[2] !== 0)) {
            const pivot = cube.pivot ? this.pivot.fromArray(cube.pivot) : defaultPivot;
            const angles = this.angles.fromArray(cube.rotation).multiplyScalar(Math.PI / 180);
            const euler = this.euler.set(angles.x, angles.y, angles.z, "YXZ");

            const pivotTranslation = this.tempMat1.makeTranslation(pivot.x, pivot.y, pivot.z);
            const inversePivotTranslation = this.tempMat2.makeTranslation(-pivot.x, -pivot.y, -pivot.z);
            const rotationMatrix = this.tempMat3.makeRotationFromEuler(euler);
            finalTransform = this.tempFinalMat
                .multiplyMatrices(transform, pivotTranslation)
                .multiply(rotationMatrix)
                .multiply(inversePivotTranslation);
        }

        const finalRotation = this.tempQuat.setFromRotationMatrix(finalTransform);
        offset.applyMatrix4(finalTransform);

        view.offset.set(0, offset.x);
        view.offset.set(1, offset.y);
        view.offset.set(2, offset.z);

        view.scale.set(0, scale.x);
        view.scale.set(1, scale.y);
        view.scale.set(2, scale.z);

        view.rotation = packQuaternion(finalRotation);
        view.inset = cube.inset ? Math.floor(cube.inset * 4) : 0;

        const materials = this.resolveUvs(view, cube.uv, scale);
        return this.cubeGeometryRegistry.add(undefined, materials);
    }

    resolveFaceHeight(scale: Vector3, face: number) {
        switch (face) {
            case 0:
            case 5:
                return scale.y;
            case 1:
            case 4:
                return scale.z;
            case 2:
            case 3:
                return scale.y;
            default:
                return scale.y;
        }
    }

    resolveFaceWidth(scale: Vector3, face: number) {
        switch (face) {
            case 0:
            case 5:
                return scale.z;
            case 1:
            case 4:
                return scale.x;
            case 2:
            case 3:
                return scale.x;
            default:
                return scale.x;
        }
    }

    resolveUvs(view: InferCPUType<typeof CubeStruct>, uv: Cubes[number]["uv"], scale: Vector3) {
        const uvStorage = view.uvs;
        let materials = defaultMaterials;

        if (!uv) {
            for (let face = 0; face < 6; face++) {
                const faceStorage = uvStorage.get(face);
                faceStorage.u = 0;
                faceStorage.v = 0;
                faceStorage.w = this.resolveFaceWidth(scale, face);
                faceStorage.h = this.resolveFaceHeight(scale, face);
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

            for (let face = 0; face < 6; face++) {
                const faceStorage = uvStorage.get(face);
                faceStorage.u = u;
                faceStorage.v = v;
                faceStorage.w = this.resolveFaceWidth(scale, face);
                faceStorage.h = this.resolveFaceHeight(scale, face);
            }
            return materials;
        }

        let duplicatedMaterials = false;
        const faceNames = Faces.Cardinal;

        for (let face = 0; face < 6; face++) {
            const faceStorage = uvStorage.get(face);
            const faceUv = (uv as any)[faceNames[face]] as any;

            if (!faceUv) {
                faceStorage.u = 0;
                faceStorage.v = 0;
                faceStorage.w = this.resolveFaceWidth(scale, face);
                faceStorage.h = this.resolveFaceHeight(scale, face);
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