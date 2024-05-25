import { withoutNulls } from "./utils/arrays";

/**
 * @name DOM_TYPES
 * @type {DOM_TYPES}
 * 
 * @description DOM_TYPES Represents the types of DOM elements.
 */
export interface DOM_TYPES {
    /**
     * Represents a text node.
     */
    TEXT: string;
    /**
     * Represents an element node.
     */
    ELEMENT: string;
    /**
     * Represents a fragment node.
     */
    FRAGMENT: string;
}

/**
 * @name VNode
 * @type {VNode}
 * 
 * @description VNode Represents a virtual DOM node.
 */
export interface VNode {
    /**
     * Represents the type of the virtual DOM node.
     */
    type: string;
    /**
     * Represents the tag of the virtual DOM node.
     */
    tag?: string;
    /**
     * Represents the props of the virtual DOM node.
     */
    props?: object;
    /**
     * Represents the children of the virtual DOM node.
     */
    children?: Array<VNode>;
    /**
     * Represents the value of the virtual DOM node.
     */
    value?: string;
}

/**
 * @name DOM_TYPES
 * @type {DOM_TYPES}
 * @description DOM_TYPES is an object with three properties: TEXT, ELEMENT, and FRAGMENT and returns the type of DOM element.
 */
export const DOM_TYPES: DOM_TYPES = {
    /**
     * The TEXT property is a string with the value "text".
     */
    TEXT: "text",
    /**
     * The ELEMENT property is a string with the value "element".
     */
    ELEMENT: 'element',
    /**
     * The FRAGMENT property is a string with the value "fragment".
     */
    FRAGMENT: 'fragment',
}

/**
 * @name h
 * @param {string} tag
 * @param {object} props
 * @param {Array<VNode>} children
 * @returns {VNode}
 * @description h(tag: string, props: object, children: Array<VNode>) - takes a tag, props object, and an array of children and returns a virtual DOM node with the tag, props, and children passed to the function. The children array should be mapped with the mapTextNodes function before being assigned to the virtual DOM node. The function should also remove any null values from the children array using the withoutNulls function.
 */
export function h(tag: string, props: object = {}, children: Array<VNode> = []): VNode {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT,
    }
}

/**
 * @name mapTextNodes
 * @param children {Array<VNode>}
 * @returns {Array<VNode>}
 * @description mapTextNodes(children: Array<VNode>) - takes an array of children and returns a new array with all string values converted to virtual DOM text nodes using the hString function.
 */
function mapTextNodes(children: Array<VNode>): Array<VNode> {
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
export function hFragment(vNodes: Array<VNode>): VNode {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNodes)),
    }
}