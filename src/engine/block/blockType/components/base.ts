import { componentRegistry } from "../type";


export abstract class BlockComponent{
    public static id: number;

    public static *getComponentsFromJson(json: Record<string, any>) {
        for (const [key, value] of Object.entries(json)) {
            const implementation = componentRegistry.getImplementation(key);
            if (!implementation) continue;

            yield new implementation(value);
        }
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}