
/**
 * Sets the attributes of a given HTML element.
 * 
 * @param el - The HTML element to set the attributes for.
 * @param attrs - An object where the keys are attribute names and the values are the attribute values.
 */
export function setAttributes(el: any, attrs: any) {
    const { class: className, style, ...otherAttrs } = attrs;

    if (className) {
        setClass(el, className);
    }

    if (style) {
        Object.entries(style).forEach(([prop, value]) => {
            setStyle(el, prop, value as any);
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
const setClass = (el: any, className: any) => {
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
const setStyle = (el: any, name: string, value: any) => {
    el.style[name] = value;
}

/**
 * Removes a style property from a given HTML element.
 * 
 * @param el - The HTML element to remove the style for.
 * @param style - An object where the keys are style properties and the values are the style values.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const removeStyle = (el: any, name: string) => {
    el.styl[name] = null;
}

/**
 * Sets an attribute of a given HTML element.
 * 
 * @param el - The HTML element to set the attribute for.
 * @param name - The name of the attribute to set.
 * @param value - The value to set the attribute to.
 */
const setAttribute = (el: any, name: string, value: any) => {
    if (value == null) {
        removeAttribute(el, name);
    } else if (name.startsWith('data-')) {
        el.setAttribute(name, value)
    } else {
        el[name] = value
    }
}
/**
 * Removes an attribute from a given HTML element.
 * 
 * @param el string
 * @param name string
 */
const removeAttribute = (el: any, name: any) => {
    el[name] = null;
    el.removeAttribute();
}
