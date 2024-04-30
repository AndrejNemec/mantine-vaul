export const setAttributeToElement = (element: HTMLElement, attribute: string, value: string) => {
    element.setAttribute(attribute, value)
}

export const getAttributeFromElement = (element: HTMLElement, attribute: string) => {
    return element.getAttribute(attribute)
}

export const setVariableToElement = (element: HTMLElement, variable: string, value: string) => {
    element.style.setProperty(variable, value)
}

export const getVariableFromElement = (element: HTMLElement, variable: string) => {
    return element.style.getPropertyValue(variable)
}

export const setStyleToElement = (element: HTMLElement, style: string, value: string) => {
    element.style[style as any] = value
}

export const getStyleFromElement = (element: HTMLElement, style: string) => {
    return element.style[style as any]
}