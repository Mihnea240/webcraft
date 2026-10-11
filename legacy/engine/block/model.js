import BlockObjectParser from "./definitions";
import * as BMAT from "./material.js";
import * as BGEO from "./geometry.js";

export default class BlockModel {
	constructor() {

		this.classParser = new BlockObjectParser(this);
		this.geometryRegistry = new BGEO.GeometryRegistry();
		this.materialRegistry = new BMAT.MaterialRegistry();

		this.geometry_view = this.geometryRegistry.geometryView(0);
		this.transform_view = this.geometryRegistry.transformView(0);
		this.material_view = this.materialRegistry.materialView(0);
	}
	
	cacheResources() {
	}
	
	get textureRegistry() {
		return this.materialRegistry.textureRegistry;
	}
	
	get Blocks() {
		return this.classParser.Blocks;
	}

	getGeometryId(name) {
		return this.geometryRegistry.getGeometryId(name);
	}

	getMaterialId(name) {
		return this.materialRegistry.getMaterialId(name);
	}

	// getMaterialById(id) {
	// 	return this.materialRegistry.getMaterialById(id);
	// }

	// getGeometryById(id) {
	// 	return this.geometryRegistry.geometry_data.id_to_geometry[id];
	// }

	*cubes(geometry_id) {
		const geometry_view = this.geometry_view;
		const transform_view = this.transform_view;
		
		geometry_view.id = geometry_id;

		for (const transform_id of geometry_view.transforms()) {
			transform_view.id = transform_id;
			yield transform_view;
		}
	}

	getMaterialById(material_id) {
		const material_view = this.material_view;
		material_view.id = material_id;
		return material_view;
	}
}