import BlockState from "./block_state";

export default class BlockRefrence{
	/**@param {BlockState} block_state*/
	
	constructor() {
		
	}

	getProperty(property_name) {
		return this.block_state.getProperty(property_name);
	} 

}