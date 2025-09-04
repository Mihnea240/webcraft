import BlockState from "./block_state";

export default class BlockRefrence{
	/**@param {BlockState} block_state*/
	
	constructor(x, y, z, block_state) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.block_state = block_state;
	}

	getProperty(property_name) {
		return this.block_state.getProperty(property_name);
	} 

}