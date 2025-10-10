declare module "@utils/bit_packer" {
	// Base BitView class
	export class BitView {
		view: DataView;
		offset: number;
		onPropertyAccess: ((action: 'get' | 'set', fieldName: string, value?: any) => void) | null;
	}

	export class BitArrayField extends Array<number> {
		readonly length: number;
		
		// Array manipulation methods - key methods for BitPacker usage
		set(values: number[] | Float32Array | Uint32Array | ArrayLike<number>): this;
		get(): number[];
		
		// Element access methods
		setElement(index: number, value: number): boolean;
		getElement(index: number): number;
		
		// Override Array methods that should not mutate fixed-length arrays
		push(...items: number[]): never;
		pop(): never;
		shift(): never;
		unshift(...items: number[]): never;
		splice(start: number, deleteCount?: number, ...items: number[]): never;
	}

	export class BitField {
		size: number;
		bit_offset: number | null;
		array_length: number;
		alignment: number | null;
		type: string;
		readonly bit_mask: number;
		readonly setter_method: string;
		readonly getter_method: string;
		readonly byte_offset: number;
		readonly offset_in_quant: number;
		readonly quant_size: number;
		readonly field_size: number;
		readonly endian: boolean;
		input_sanitizer: (value: any) => any;
		output_sanitizer: (value: any) => any;

		constructor(type?: string);
		fromString(type: string): void;
		isArrayType(): boolean;
		applyAlignment(): number;
		getInputSanitezer(): (value: any) => any;
		getOutputSanitezer(): (value: any) => any;
		getOffsetOfIndex(index: number): number;
		setter(view: DataView, offset: number, value: any): boolean;
		getter(view: DataView, offset: number): any;
		getFunctionInterface(): { setter: (value: any) => boolean; getter: () => any; };
		getArrayAccessInterface(): { setElement: (index: number, value: any) => boolean; getElement: (index: number) => any; };
	}

	// Type mapping utilities - maps field definition strings to runtime types
	type FieldType<T extends string> = 
		T extends `${infer _type}[${infer _size}]` ? BitArrayField :
		number;

	// Mapped type that converts field definitions to BitView properties
	// Remove readonly constraint from the resulting types
	type BitViewFields<T extends Record<string, string>> = {
		-readonly [K in keyof T]: FieldType<T[K]>
	};

	type A = BitView & BitViewFields<{b: 'float32[16]', c: 'int16'}>;

	// Generic BitView type that includes the mapped fields
	export type TypedBitView<T extends Record<string, string>> = BitView & BitViewFields<T>;

	// Generic BitPacker class with automatic literal type preservation
	export class BitPacker<const T extends Record<string, string>> {
		static default_options: {
			bit_flow: 'MSB' | 'LSB';
			alignment: number;
		};

		options: any;
		wasted_bits: number;
		bucket_cnt: number;
		fields: Record<string, BitField>;
		class: new (buffer: ArrayBuffer, offset?: number) => TypedBitView<T>;
		bit_size: number;

		constructor(fields: T, options?: any);

		get BitView(): new (buffer: ArrayBuffer, offset?: number) => TypedBitView<T>;
		get bytes(): number;

		computeClass(): new (buffer: ArrayBuffer, offset?: number) => TypedBitView<T>;
		parseField(field_data: any): BitField;
		computeFieldData(fields: T): Record<string, BitField>;
	}
}