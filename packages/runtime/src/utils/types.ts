
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
    props?: Props;
    /**
     * Represents the children of the virtual DOM node.
     */
    children?: VNode[];
    /**
     * Represents the value of the virtual DOM node.
     */
    value?: string;
    /**
     * Represents the real DOM node.
     */
    el?: Node | HTMLElement | null;
    /**
     * Represents the event listeners of the virtual DOM node.
     */
    listeners?: Record<string, (e: Event) => void>
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
    TEXT: 'text',
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
 * @name Props
 * @type {Props}
 * 
 * @description Props Represents the props of a virtual DOM node.
 */
export interface Props {
    on?: Record<string, (e: Event) => void>
}

/**
 * Represents the style attributes of an HTML element.
 * 
 * @description StyleAttributes Represents the style attributes of an HTML element.
 * @interface StyleAttributes
 * @property {string} [prop] - The property of the style attribute.
 */
export type StyleAttributes = Record<string, string>;

/**
 * Represents the attributes of an HTML element.
 * 
 * @description ElementAttributes Represents the attributes of an HTML element.
 * @interface ElementAttributes
 * @property {string} [class] - The class of the HTML element.
 * @property {StyleAttributes} [style] - The style of the HTML element.
 * @property {any} [attr] - The attributes of the HTML element.
 */
export interface ElementAttributes {
    class?: string
    style?: StyleAttributes
    [attr: string]: unknown
}

/**
 * Represents the payload of a command.
 * 
 * @interface Payload
 */
export interface Payload {
    /**
     * Represents the name of the command.
     */
    name: string;
    /**
     * Represents the data of the command.
     */
    data?: object;
}

/**
 * Represents a handler function.
 * 
 * @type {Handler}
 */
export type Handler = (payload: Payload) => void

/**
 * Represents a command name.
 * 
 * @interface State
 * 
 */
export type State = Record<string, unknown>;

/**
 * Represents a view function - renderer.
 * 
 * @type {ViewFunction}
 */
export type ViewFunction = (state: State, emit: Function) => VNode

/**
 * Represents a dispatcher.
 * 
 * @interface Dispatcher
 */
export interface App {
    /**
     * Mounts the application.
     * 
     * @param {HTMLElement | null} _parentEl - The parent element to mount the application.
     */
    mount: (_parentEl: HTMLElement | null) => void
}

/**
 * Represents a reducer function.
 * 
 * @type ReducerFunction
 * 
 * 
 */
export type ReducerFunction = (state: State, payload: Payload) => State

/**
 * Represents a record of reducers.
 * 
 * @type Reducers 
 */
export type Reducers = Record<string, ReducerFunction>