import BlockModel from "./blocks";
import BlockState from "../voxel/block_state";
import Faces from "../voxel/faces";
import { mod } from "three/tsl";

/**@param {string} str*/
function toCammelCase(str) {
	return str.replace(/(^|_)([a-z])/g, (m, p1, p2) => p2.toUpperCase());
}

export default class BlockObjectParser {
	getModifier(modifier_name, modifier_data) {
		switch (modifier_name) {
			case "geometry": return this.createGeometryModifier(modifier_data);
			case "material": return this.createMaterialModifier(modifier_data);
			default: {
				const property = BlockState[modifier_name.toUpperCase()];
				if(property !== undefined) {
					return this.createPropertyModifier(modifier_name, modifier_data);
				}
			}
		}
	}

	/**
	 * @param {BlockModel} block_model
	 */
	constructor(block_model) {
		this.blockModel = block_model;
		this.Blocks = {
			BlockState: BlockState
		};
	}

	parseJson(json_data) {
		for (const [name, block_json] of Object.entries(json_data)) {
			const [class_name, new_class] = this.parseClassEntry(name, block_json);
			this.Blocks[class_name] = new_class;
		}
	}

	/**@param {string} name*/
	parseClassEntry(name, json_data) {
		const class_name = toCammelCase(name);
		const default_ids = {
			geometry_id: 0,
			material_id: 0,
		}
		let inherited_class = json_data.inherit ?
			this.Blocks[toCammelCase(json_data.inherit)] || this.Blocks.BlockState :
			this.Blocks.BlockState;

		let defaults = [], default_func = null;
		for (const component in json_data.components) {
			const func = this.getModifier(component, json_data.components[component]);
			if(!func) continue;
			defaults.push(func);
		}
		if (defaults.length > 0) {
			default_func = function () {
				for (const func of defaults) func.call(this);
			}
		}

		const new_class = class extends inherited_class {
			static events = inherited_class.events.map((events) => [...events]);
			constructor() {
				super(name);

				default_func?.call(this);

				for (const events of this.constructor.events) {
					for (const event of events) event.call(this);
				}
			}
		};

		for (const condition_block of json_data.permutations || []) {
			const [condition_function, listeners] = this.parseConditionalBlock(new_class, condition_block);
			if (!condition_function) continue;

			for (const listener of listeners) {
				new_class.events[listener].push(condition_function);
			}

		}

		return [class_name, new_class];
	}

	parseConditionalBlock(context_class, condition_json) {
		const [validator, listeners] = this.createConditionFunction(condition_json.condition);
		/** @type {Array<Function>} */
		const action_functions = [];

		for (const [component, value] of Object.entries(condition_json.components)) {
			action_functions.push(this.getModifier(component, value));
		}

		return [function () {
			if (!validator.call(this)) return;
			for (const action of action_functions) action.call(this);
		}, listeners];
	}

	createGeometryModifier(new_geometry_name) {
		const geometry = this.blockModel.getGeometryId(new_geometry_name);
		if (geometry === undefined) {
			throw new Error(`Geometry ${new_geometry_name} not found`);
		}
		return function () {
			this.geometry_id = geometry;
		}
	}

	createMaterialModifier(new_material_name) {
		const material = this.blockModel.getMaterialId(new_material_name);

		if (material === undefined) {
			throw new Error(`Material ${new_material_name} not found`);
		}
		return function () {
			this.material_id = material;
		}
	}

	createPropertyModifier(property_name, property_value) {
		const property = BlockState[property_name.toUpperCase()];
		if(!property_name || property === undefined) {
			throw new Error(`Unknown property ${property_name} in property modifier`);
		}
		property_value = this.resolveValueKeyword(property_value);

		return new Function(`this.setProperty(${property}, ${property_value});`);
	}

	resolveValueKeyword(string) {
		switch (string) {
			case true: return 1;
			case false: return 0;
			case "true": return 1;
			case "false": return 0;
			default: {
				// Try to get face value using Faces.fromString
				const faceValue = Faces.fromString(string);
				return faceValue !== -1 ? faceValue : undefined;
			}
		}
	}

	/**@param {string} condition_text*/
	createConditionFunction(condition_text) {
		if (!condition_text) return [() => true, []];

		// Extract property names from the condition text to determine listeners
		const listeners = [];

		let processedCondition = condition_text
			// Replace entire comparison expressions: property operator value
			.replace(/\b(\w+)\s*([!=<>]=?)\s*(?:'(\w+)'|\b(\w+)\b)/g,
				(match, propName, operator, quotedValue, unquotedValue) => {
					// Process left-hand side (property name)
					const property = BlockState[propName.toUpperCase()];
					let leftSide = property ? `this.getProperty(${property})` : propName;
					let rightSide;

					// Process right-hand side (value)
					const value = quotedValue || unquotedValue;

					switch (value) {
						case 'true':
							rightSide = '1';
							break;
						case 'false':
							rightSide = '0';
							break;
						case 'side':
							rightSide = `${leftSide} !== ${Faces.TOP} && ${leftSide} !== ${Faces.BOTTOM}`;
							leftSide = operator = '';
							break;
						default: {
							// Try to get face value using Faces.fromString
							const faceValue = Faces.fromString(value);
							if (faceValue !== -1) {
								rightSide = `${faceValue}`;
							} else {
								rightSide = value; // Keep original if not recognized
							}
							break;
						}
					}
					if (property && !listeners.includes(property)) {
						listeners.push(property);
					}
					return `${leftSide} ${operator} ${rightSide}`;
				});
		// console.log('Processed condition:', processedCondition);
		try {
			const conditionFunction = new Function(`return ${processedCondition};`);
			return [conditionFunction, listeners];
		} catch (error) {
			throw new Error(`Invalid condition syntax: ${condition_text}. Error: ${error.message}`);
		}
	}
}