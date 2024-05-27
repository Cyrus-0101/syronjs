import type { ElementAttributes } from './utils/types';

/**
 * Sets the attributes of a given HTML element.
 * 
 * @param el - The HTML element to set the attributes for.
 * @param attrs - An object where the keys are attribute names and the values are the attribute values.
 */
export function setAttributes(el: HTMLElement, attrs: ElementAttributes): void {
    const { class: className, style, ...otherAttrs } = attrs;

    if (className) {
        setClass(el, className);
    }

    if (style) {
        Object.entries(style).forEach(([prop, value]) => {
            setStyle(el, prop, value);
        });
    }

    for (const [name, value] of Object.entries(otherAttrs)) {
        if (typeof value === 'string') {
            setAttribute(el, name, value);
        }
    }
}

/**
 * Sets the class of a given HTML element.
 * 
 * @param el - The HTML element to set the class for.
 * @param className - The class to set.
 */
const setClass = (el: HTMLElement, className: string) => {
    el.className = ''
    
    if (typeof className === 'string') {
        el.className = className
    } 

    if (Array.isArray(className)) {
        el.classList.add(...className)
    }
}

/**
 * Sets an attribute of a given HTML element.
 * 
 * @param el - The HTML element to set the attribute for.
 * @param name - The name of the attribute to set.
 * @param value - The value to set the attribute to.
 */
const setStyle = (el: HTMLElement, name: string, value: string) => {
    el.style.setProperty(name, value);
}

/**
 * Removes a style property from a given HTML element.
 * 
 * @param el - The HTML element to remove the style for.
 * @param style - An object where the keys are style properties and the values are the style values.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const removeStyle = (el: HTMLElement, name: string) => {
    el.style.removeProperty(name);
}

/**
 * Sets an attribute of a given HTML element.
 * 
 * @param el - The HTML element to set the attribute for.
 * @param name - The name of the attribute to set.
 * @param value - The value to set the attribute to.
 */
const setAttribute = (el: HTMLElement, name: string, value: string) => {
    if (value == null) {
        removeAttribute(el, name);
    } else {
        if (name.startsWith('data-')) {
            el.setAttribute(name, value)
        }
    } 
}
/**
 * Removes an attribute from a given HTML element.
 * 
 * @param el string
 * @param name string
 */
const removeAttribute = (el: HTMLElement, name: string) => {
    el.removeAttribute(name);
}
