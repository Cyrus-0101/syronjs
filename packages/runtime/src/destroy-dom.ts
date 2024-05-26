import { removeEventListeners } from "./events";
import { DOM_TYPES, type VNode } from "./utils/types";

/**
 * Destroys the virtual DOM.
 * 
 * @param vdom VNode
 */
export const destroyDOM = (vdom: VNode) => {
     const { type } = vdom;

     switch (type) {
         case DOM_TYPES.TEXT:
             removeTextNode(vdom);
             break;

         case DOM_TYPES.ELEMENT:
             removeElementNode(vdom);
             break;

         case DOM_TYPES.FRAGMENT:
             removeFragmentNodes(vdom);
             break;

         default:
             break
     }
}

/**
 * Removes a text node from the DOM.
 * 
 * @param vdom VNode
 */
const removeTextNode = (vdom: VNode) => {
    const { el } = vdom;
    
    if (el !== undefined && el.parentNode !== null) {
        el.parentNode.removeChild(el);
    }
}

/**
 * Removes an element node from the DOM.
 * 
 * @param vdom VNode
 */
const removeElementNode = (vdom: VNode) => {
    const { el, children, listeners } = vdom;

    if (
        el !== undefined &&
        el.parentNode !== null &&
        children !== undefined
    ) {
        el.parentNode.removeChild(el);
        children.forEach(destroyDOM)
    }

    if (listeners && el !== null) {
        removeEventListeners(listeners, el as HTMLElement)
        delete vdom.listeners;
    }
}

/**
 * Removes fragment nodes from the DOM.
 * 
 * @param vdom VNode
 */
const removeFragmentNodes = (vdom: VNode) => {
    const { children } = vdom;
    
    if (children !== undefined) {
        children.forEach(destroyDOM);
    }
}

