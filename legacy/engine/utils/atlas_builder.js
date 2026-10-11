export default class AtlasBuilder {
	constructor() {
		this.terrain_settings = {
			width: 1024,
			height: 2048,
			cell_width: 16,
			cell_height: 16,
			padding: 8,
			get grid_size() {
				return {
					width: Math.floor(this.width / (this.cell_width + this.padding)),
					height: Math.floor(this.height / (this.cell_height + this.padding))
				};
			},
			get tile_padding() {
				return this.padding / 2;
			}
		}

		this.offscreen_canvas = new OffscreenCanvas(0, 0);

		this.cell_map_max_size = {width: 256, height: 256};
		this.cell_byte_map_size = { ... this.cell_map_max_size };
		this.cell_byte_map = new Uint8Array(this.cell_byte_map_size.width * this.cell_byte_map_size.height);

		this.util_size_obj = { width: 0, height: 0 };
		this.util_position_obj = { x: 0, y: 0 };

		this.atlas = {
			terrain: null,
		}
	}

	setCanvas(settings) {
		this.offscreen_canvas.width = settings.width;
		this.offscreen_canvas.height = settings.height;
		this.ctx = this.offscreen_canvas.getContext('2d');
	}

	setTerrainSettings(settings) {
		this.terrain_settings = {...this.terrain_settings, ...settings};
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.offscreen_canvas.width, this.offscreen_canvas.height);
	}

	getBitmapTileSize(bitmap, settings) {
		const { cell_width, cell_height, padding, tile_padding } = settings;
		const image_width = Math.ceil((bitmap.width + tile_padding) / (cell_width + padding));
		const image_height = Math.ceil((bitmap.height + tile_padding) / (cell_height + padding));

		this.util_size_obj.width = image_width;
		this.util_size_obj.height = image_height;
		return this.util_size_obj; 
	}

	setCellMapSize(width, height) {
		this.cell_byte_map_size.width = width;
		this.cell_byte_map_size.height = height;
	}

	clearCellMap() {
		this.cell_byte_map.fill(0);
	}

	setCell(x, y, value = 1) {
		const {width, height} = this.cell_byte_map_size;
		if (x < 0 || x >= width || y < 0 || y >= height) return false;

		this.cell_byte_map[x + y * width] = value;
		return true;
	}

	getCell(x, y) {
		const { width, height } = this.cell_byte_map_size;
		return this.cell_byte_map[x + y * width];
	}

	isBounded(x, y) {
		const {width, height} = this.cell_byte_map_size;
		return !(x < 0 || x >= width || y < 0 || y >= height);
	}

	isAvailable(x, y, w = 1, h = 1) {
		const {width, height} = this.cell_byte_map_size;
		if (x < 0 || x + w > width || y < 0 || y + h > height) return false;

		for(let i = 0; i < w; i++) {
			for(let j = 0; j < h; j++) {
				if (this.getCell(x + i, y + j) !== 0) return false;
			}
		}

		return true;
	}

	getAvailbleCell(x, y, w = 1, h = 1) {
		const { width, height } = this.cell_byte_map_size;
		
		while (y < height - h) {
			if (this.isAvailable(x, y, w, h)) {
				this.util_position_obj.x = x;
				this.util_position_obj.y = y;
				return this.util_position_obj;
			};

			x++;
			if (x >= width - w) {
				x = 0;
				y++;
			}
		}
	}

	fillAvailableCell(x, y, w = 1, h = 1, value = 1) {
		for (let i = 0; i < w; i++) {
			for (let j = 0; j < h; j++) {
				this.setCell(x + i, y + j, value);
			}
		}
	}

	copyToCanvas(image, x, y, settings) {
		const { cell_width, cell_height, padding } = settings;
		const tile_padding = padding / 2;
		const pixel_x = x * (cell_width + padding) + tile_padding;
		const pixel_y = y * (cell_height + padding) + tile_padding;

		this.ctx.drawImage(image, pixel_x, pixel_y);

		for (let i = 0; i < tile_padding; i++) {
			// Copy top row 
			this.ctx.drawImage(image, 0, 0, image.width, 1,
				pixel_x, pixel_y - i, image.width, 1);
			// Copy left column
			this.ctx.drawImage(image, 0, 0, 1, image.height,
				pixel_x - i, pixel_y, 1, image.height,);
			// Copy right column
			this.ctx.drawImage(image, image.width - 1, 0, 1, image.height,
				pixel_x + image.width + i, pixel_y, 1, image.height,);
			// Copy bottom row
			this.ctx.drawImage(image, 0, image.height - 1, image.width, 1,
				pixel_x, pixel_y + image.height + i, image.width, 1);
		}
	}

	createAtlasImage(path_to_bitmap) {
		this.setCanvas(this.terrain_settings);
		this.clearCanvas();
		this.clearCellMap();
		this.setCellMapSize(...Object.values(this.terrain_settings.grid_size));

		let last_x = 0, last_y = 0;
		const path_to_uv = new Map();

		for (const [path, bitmap] of path_to_bitmap.entries()) {
			const { width, height } = this.getBitmapTileSize(bitmap, this.terrain_settings);
			const available_pos = this.getAvailbleCell(last_x, last_y, width, height);

			if (!available_pos) {
				throw new Error(`Atlas texture size exceeded for ${path}`);
			}
			this.fillAvailableCell(available_pos.x, available_pos.y, width, height);

			this.copyToCanvas(bitmap, available_pos.x, available_pos.y, this.terrain_settings);

			last_x = available_pos.x;
			last_y = available_pos.y;

			path_to_uv.set(path, last_x << 8 | last_y);

			bitmap.close();
		}

		return path_to_uv;
	}

	async getBitmap() {
		const bitmap = await createImageBitmap(this.offscreen_canvas);
		return bitmap;
	}
}