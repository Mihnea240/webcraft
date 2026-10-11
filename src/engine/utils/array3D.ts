type TypedArray =
	| Int8Array
	| Uint8Array
	| Uint8ClampedArray
	| Int16Array
	| Uint16Array
	| Int32Array
	| Uint32Array
	| Float32Array
	| Float64Array;

export class Array3D<T extends TypedArray = Uint16Array> {
	public data!: T;
	public readonly x: number;
	public readonly y: number;
	public readonly z: number;
	public size: number;

	private planeSize: number = 0;

	constructor(
		x: number,
		y: number = x,
		z: number = x,
	) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.size = x * y * z;
		this.planeSize = x * z;
	}

	/**
	 * Sets the underlying storage to point to a sub-region of the provided typed array view.
	 * It creates a new view sharing the same ArrayBuffer from the specified element offset,
	 * ensuring zero-copy memory management and allowing buffer reuse/pooling.
	 * 
	 * @param view The target TypedArray view.
	 * @param elementOffset The offset in elements from the start of the view.
	 */
	public setBuffer(view: T, elementOffset: number = 0) {
		this.data = view.subarray(elementOffset, elementOffset + this.size) as T;
		this.size = this.data.length;
	}

	allocateBuffer(ctor: { new (length: number): T }) {
		this.data = new ctor(this.size);
		return this;
	}

	/**
	 * Computes the 1D index corresponding to the given 3D coordinates.  
	 * x + z * size_x + y * size_x * size_z;
	 */
	public index(x: number, y: number, z: number): number {
		return x + z * this.x + y * this.planeSize;
	}

	/**
	 * Returns the value stored at coordinates (x, y, z).
	 */
	public get(x: number, y: number, z: number): number {
		return this.data[this.index(x, y, z)];
	}

	public getByIndex(index: number): number {
		return this.data[index];
	}

	/**
	 * Sets the value stored at coordinates (x, y, z).
	 */
	public set(x: number, y: number, z: number, value: number): void {
		this.data[this.index(x, y, z)] = value;
	}

	/**
	 * Fills the current buffer range with the specified value.
	 */
	public fill(value: number): T {
		return this.data.fill(value) as T;
	}
}


export class Array3DShift<T extends TypedArray = Uint16Array> extends Array3D<T> {
	private planeLog: number;

	constructor(logX: number, logY: number = logX, logZ: number = logX) {
		super(1 << logX, 1 << logY, 1 << logZ);

		this.size = 1 << (logX + logY + logZ);
		this.planeLog = logX + logZ;
	}

	override index(x: number, y: number, z: number) { 
		return x | (z << this.x) | (y << (this.planeLog));
	}
}

export class Array3DShift4 extends Array3DShift<Uint8Array> { 

	override set(x: number, y: number, z: number, value: number): void {
		const index = this.index(x, y, z);
		const realIndex = index >> 1;

		const data = this.data[realIndex];

		if (index & 1) {
			this.data[realIndex] = (data & 0x0F) | ((value & 0x0F) << 4);
		} else {
			this.data[realIndex] = (data & 0xF0) | (value & 0x0F);
		}
	}

	override get(x: number, y: number, z: number): number {
		return this.getByIndex(this.index(x, y, z));
	}

	override getByIndex(index: number): number {
		const realIndex = index >> 1;

		const data = this.data[realIndex];

		if (index & 1) {
			return (data & 0xF0) >> 4;
		} else {
			return data & 0x0F;
		}
	}

	override fill(value: number): Uint8Array {
		const packedValue = (value & 0x0F) | ((value & 0x0F) << 4);
		return this.data.fill(packedValue);
	}
}