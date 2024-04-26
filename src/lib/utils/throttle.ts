type AnyFn = (...params: any[]) => any

export function throttle<T extends AnyFn>(callback: T, limit = 100) {
    let waiting = false
    return function (...args: Parameters<T>) {
        if (!waiting) {
            callback(...args)
            waiting = true
            setTimeout(function () {
                waiting = false
            }, limit)
        }
    }
}