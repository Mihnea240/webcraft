
import { BlockComponent } from "./components/base";

export type ComponentConstructor<T extends BlockComponent = BlockComponent> = {
    new (...args: any[]): T;
    fromJson(json: any): T;
    id: number;
};

export class ComponentRegistry {
    componentImplementations: Map<string, ComponentConstructor> = new Map();
    componentIds: Map<ComponentConstructor, number> = new Map();
    componentCnt: number = 0;

    registerImplementation(componentName: string, componentImplementation: ComponentConstructor) {
        this.componentImplementations.set(componentName, componentImplementation);
        if (!this.componentIds.has(componentImplementation)) {
            const id = (componentImplementation as any).id ?? this.componentCnt++;
            (componentImplementation as any).id = id;
            this.componentIds.set(componentImplementation, id);
        }
    }

    getImplementation(componentName: string) {
        return this.componentImplementations.get(componentName);
    }

    getComponentId(componentImplementation: ComponentConstructor): number | undefined {
        return this.componentIds.get(componentImplementation) ?? (componentImplementation as any).id;
    }
}