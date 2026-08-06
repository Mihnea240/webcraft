
import { BlockComponent } from "./components/base";

export class ComponentSlot<T extends BlockComponent> {
    componentStack: (T | null)[] = [];

    get() {
        return this.componentStack.at(-1) ?? null;
    }

    push(component: T) {
        this.componentStack.push(component);
        return this.componentStack.length - 1;
    }

    private continiousPop() {
        while (this.componentStack.length > 0 && this.componentStack.at(-1) === null) {
            this.componentStack.pop();
        }
    }

    invalidate(index: number = -1) {
        const length = this.componentStack.length;

        if (index === -1) {
            index = length - 1;
        }

        this.componentStack[index] = null;

        if (index == length - 1) {
            this.continiousPop();
        }
        
    }
}

type ComponentConstructor = new (...args: any[]) => BlockComponent;

export class ComponentRegistry{
    componentImplementations: Map<string, ComponentConstructor> = new Map();
    componentIds: Map<ComponentConstructor, number> = new Map();
    componentCnt: number = 0;

    registerImplementation(componentName: string, componentImplementation: ComponentConstructor) {
        this.componentImplementations.set(componentName, componentImplementation);
        this.componentIds.set(componentImplementation, this.componentCnt++);
    }

    getImplementation(componentName: string) {
        return this.componentImplementations.get(componentName);
    }

    getComponentId(componentImplementation: ComponentConstructor) {
        return this.componentIds.get(componentImplementation);
    }
}