import { removeEventListeners } from './events';
import { DOM_TYPES } from './utils/types';

/**
 * Destroys the virtual DOM.
 * 
 * @param vdom VNode
 */
export const destroyDOM = (vdom: any) => {
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

        default: {
            throw new Error(`Can't destroy DOM of type: ${type}`);
        }
    }

    delete vdom.el;
}

/**
 * Removes a text node from the DOM.
 * 
 * @param vdom VNode
 */
const removeTextNode = (vdom: any) => {
    const { el } = vdom;
    
    el.remove();
}

/**
 * Removes an element node from the DOM.
 * 
 * @param vdom VNode
 */
const removeElementNode = (vdom: any) => {
    const { el, children, listeners } = vdom;

    el.remove();
    children.forEach(destroyDOM);

    if (listeners) {
        removeEventListeners(listeners, el);
        delete vdom.listeners;
    }
}

/**
 * Removes fragment nodes from the DOM.
 * 
 * @param vdom VNode
 */
const removeFragmentNodes = (vdom: any) => {
    const { children } = vdom;
    
    children.forEach(destroyDOM)
}

