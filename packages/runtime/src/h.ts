import { withoutNulls } from './utils/arrays';
import { DOM_TYPES, type VNode } from './utils/types';


/**
 * @name h
 * @param {string} tag
 * @param {object} props
 * @param {Array<VNode>} children
 * @returns {VNode}
 * @description h(tag: string, props: object, children: Array<VNode>) - takes a tag, props object, and an array of children and returns a virtual DOM node with the tag, props, and children passed to the function - elements.
 */
export function h(tag: string, props: object = {}, children: VNode[] = []): VNode {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT,
        value: ''
    }
}

/**
 * @name mapTextNodes
 * @param children {Array<VNode>}
 * @returns {Array<VNode>}
 * @description mapTextNodes(children: Array<VNode>) - takes an array of children and returns a new array with all string values converted to virtual DOM text nodes using the hString function.
 */
function mapTextNodes(children: VNode[]): VNode[] {
    return children.map((child) =>
        typeof child === 'string' ? hString(child) : child
    )
}

/**
 * @name hString
 * @param str {string}
 * @returns {VNode}
 * @description hString(str: string) - takes a string and returns a virtual DOM text node with the string passed to the function.
 */
export function hString(str: string): VNode {
    return { type: DOM_TYPES.TEXT, value: str}
}

/**
 * @name hFragment
 * @param vNodes {Array<VNode>}
 * @returns {VNode}
 * @description hFragment(vNodes: Array<VNode>) - takes an array of virtual DOM nodes and returns a virtual DOM fragment with the children of the fragment being the virtual DOM nodes passed to the function.
 */
export function hFragment(vNodes: VNode[]): VNode {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNodes)),
        value: ''
    }
}