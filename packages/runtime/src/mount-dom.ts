import { setAttributes } from './attributes'
import { addEventListeners } from './events'
import { DOM_TYPES } from './utils/types'

/**
 * @name mountDOM
 * @param vdom VNode
 * @param parentEl HTMLElement
 * @description - Used to mount the virtual DOM to the browser's document.
 */
export const mountDOM = (vdom: any, parentEl: any) => {
    switch (vdom.type) {
        case DOM_TYPES.TEXT:
            createTextNode(vdom, parentEl)
            break

        case DOM_TYPES.ELEMENT:
            createElementNode(vdom, parentEl)
            break

        case DOM_TYPES.FRAGMENT:
            createFragmentNodes(vdom, parentEl)
            break

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
const createTextNode = (vdom: any, parentEl: any) => {
    const { value } = vdom

    const textNode = document.createTextNode(value)
    vdom.el = textNode

    parentEl.append(textNode)
}

/**
 * @name createElementNode
 * @param vdom VNode
 * @param parentEl HTMLElement
 * @description -
 */
const createElementNode = (vdom: any, parentEl: any) => {
    const { tag, props, children } = vdom

    const element = document.createElement(tag)
    addProps(element, props, vdom)
    vdom.el = element

    children.forEach((child: any) => mountDOM(child, element))
    parentEl.append(element)
}

/**
 * @name createFragmentNodes
 * @param vdom VNode
 * @param parentEl HTMLElement
 * @description -
 */
const createFragmentNodes = (vdom: any, parentEl: any) => {
    const { children } = vdom
    vdom.el = parentEl

    children.forEach((child: any) => mountDOM(child, parentEl))
}

/**
 * @name addProps
 * @param el HTMLElement
 * @param props object
 * @param vdom VNode
 * @description -
 */
const addProps = (el: any, props: any, vdom: any) => {
    const { on: events, ...attrs } = props

    vdom.listeners = addEventListeners(events, el)

    setAttributes(el, attrs)
}
