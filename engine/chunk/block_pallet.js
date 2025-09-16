import BlockState from "./block_state";

export default class BlockPallet {
	constructor() {
		/**
		 * @type {Map<string, Map<number, number>>} 
		*/
		this.block_name_map = new Map();

		this.block_state_array = [null];
	}

	/**@param {BlockState} type*/
	add(type) { 
		let bucket = this.block_name_map.get(type.name), id = 0;
		if (bucket) {
			id = bucket.get(type.data);
			if(id !== undefined) return id;
			
			bucket.set(type.data, id = this.block_state_array.length);
			// console.log("Adding block state", type.name, type.data, id);
			this.block_state_array.push(type.clone());
			return id;
		}

		this.block_name_map.set(type.name, bucket = new Map());
		bucket.set(type.data, id = this.block_state_array.length);
		this.block_state_array.push(type);

		return id;
	}

	/**@param {BlockState} type*/
	getId(type) { 
		return this.block_name_map.get(type.name)?.get(type.data);
	}

	/**
	 * @param {number} id
	 * @returns {BlockState}
	 */
	getType(id) {
		return this.block_state_array[id];
	}

	length() {
		return this.block_state_array.length;
	}
}