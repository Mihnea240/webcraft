import { componentRegistry } from "../type";
import { BlockComponent } from "./base";

export class PermutationEntry {
    constructor(
        public condition: string,
        public components: BlockComponent[]
    ) {
    }

    *involvedProperties() {
        const regex = /q.block_state\((.+?)\)/g;
        const matches = this.condition.matchAll(regex);

        for (const match of matches) {
            yield match[1];
        }
    }
}

export class BlockPermutations extends BlockComponent {
    public rules: PermutationEntry[] = [];

    constructor(json: any[]) {
        super();
        this.rules = json.map((entry: any) => (new PermutationEntry(
            entry.condition,
            [...BlockComponent.getComponentsFromJson(entry.components)]
        )));
    }

    *components() {
        yield* this.rules.values().flatMap(rule => rule.components); 
    }
}

componentRegistry.registerImplementation("permutations", BlockPermutations);
