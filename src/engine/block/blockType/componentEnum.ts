
/**Enum that maps component names to numeric values, mainly powers of 2 */
export const enum Components {
    Description = 0,
    MenuCategory = 3,
    Geometry = 1 << 0,             // 8
    MaterialInstances = 1 << 1,    // 16
    CollisionBox = 1 << 2,         // 32
    LightEmission = 1 << 3,        // 64
    SelectionBox = 1 << 4,         // 256
    Transformation = 1 << 5,       // 512
}