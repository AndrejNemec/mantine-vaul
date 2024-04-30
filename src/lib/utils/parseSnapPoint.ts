export const parseSnapPoint = (snapPoint: string | number, viewportHeight: number) => {
    if (typeof snapPoint === 'number') {
        return snapPoint
    } else if (typeof snapPoint === 'string') {
        if (!snapPoint.endsWith('%')) {
            return undefined
        }
        const parsed = +snapPoint.slice(0, -1)
        if (Number.isNaN(parsed)) {
            return undefined
        }
        return Math.round((parsed / 100) * viewportHeight)
    }
    return undefined
}