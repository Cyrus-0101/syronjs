import { setAttributes } from './attributes';
import { addEventListeners } from './events';
import { DOM_TYPES, type Props, type VNode } from './utils/types';

/**
 * @name mountDOM
 * @param vdom VNode
 * @param parentEl HTMLElement
 * @description - Used to mount the virtual DOM to the browser's document.
 */
export const mountDOM = (vdom: VNode, parentEl: HTMLElement) => {
    switch (vdom.type) {
    case DOM_TYPES.TEXT:
        createTextNode(vdom, parentEl);
        break;

    case DOM_TYPES.ELEMENT:
        createElementNode(vdom, parentEl);
        break;

    case DOM_TYPES.FRAGMENT:
        createFragmentNodes(vdom, parentEl);
        break;

    default: {
        throw new Error(`Can't mount DOM of type: ${vdom.type}`)
    }
    }
}

/**
 * @name createTextNode
 * @param vdom VNode
 * @param parentEl HTMLElement
 * @description - creates a text node the Document API provides and stores a reference to the real DOM
 */
const createTextNode = (vdom: VNode, parentEl: HTMLElement) => {
    const { value } =  vdom;

    if (value !== undefined) {
        const textNode = document.createTextNode(value)
        vdom.el = textNode

        parentEl.append(textNode)
    }
}

/**
 * @name createElementNode
 * @param vdom VNode
 * @param parentEl HTMLElement
 * @description -
 */
const createElementNode = (vdom: VNode, parentEl: HTMLElement) => {
    const { tag, props, children } = vdom;

    if (tag && children && props !== undefined) {
        const element = document.createElement(tag);
        addProps(element, props, vdom);
        vdom.el = element;

        children.forEach((child) => mountDOM(child, element))
        parentEl.append(element)
    }
}

/**
 * @name createFragmentNodes
 * @param vdom VNode
 * @param parentEl HTMLElement
 * @description - 
 */
const createFragmentNodes = (vdom: VNode, parentEl: HTMLElement) => {
    const { children } = vdom;
    vdom.el = parentEl

    children?.forEach((child) => mountDOM(child, parentEl))
}

/**
 * @name addProps
 * @param el HTMLElement
 * @param props object
 * @param vdom VNode
* @description - 
 */
const addProps = (el: HTMLElement, props: Props, vdom: VNode) => {
    const { on: events, ...attrs } = props;

    vdom.listeners = addEventListeners(events, el);

    setAttributes(el, attrs)

}