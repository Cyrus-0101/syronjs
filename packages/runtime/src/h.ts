import { DOM_TYPES } from './utils/types'
import { withoutNulls } from './utils/utils'

/**
 * @name h
 * @param {string} tag
 * @param {object} props
 * @param {Array<any>} children
 * @description h(tag: string, props: object, children: Array<VNode>) - takes a tag, props object, and an array of children and returns a virtual DOM node with the tag, props, and children passed to the function - elements.
 */
export function h(tag: string, props: any = {}, children: any = []) {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT,
        value: '',
    }
}

/**
 * @name mapTextNodes
 * @param children {Array<VNode>}
 * @description mapTextNodes(children: Array<VNode>) - takes an array of children and returns a new array with all string values converted to virtual DOM text nodes using the hString function.
 */
function mapTextNodes(children: any) {
    return children.map((child: any) =>
        typeof child === 'string' ? hString(child) : child
    )
}

/**
 * @name hString
 * @param str {string}
 * @description hString(str: string) - takes a string and returns a virtual DOM text node with the string passed to the function.
 */
export function hString(str: string) {
    return { type: DOM_TYPES.TEXT, value: str }
}

/**
 * @name hFragment
 * @param vNodes {Array<any>}
 * @description hFragment(vNodes: Array<any>) - takes an array of virtual DOM nodes and returns a virtual DOM fragment with the children of the fragment being the virtual DOM nodes passed to the function.
 */
export function hFragment(vNodes: any) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNodes)),
    }
}