export function inertialize(value: number, factor = 0.1) {
    // rounding greatly improves the performance
    return Math.round(value * factor)
}