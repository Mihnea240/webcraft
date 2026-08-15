export function *generatorAppend(...gens: Generator<any, any, any>[]) {
    for (const gen of gens) yield* gen;
}