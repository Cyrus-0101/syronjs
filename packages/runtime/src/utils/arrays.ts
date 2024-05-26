import { h, hFragment, hString, } from '../h'
import { type VNode } from './types'

/**
 * @name withoutNulls
 * @param arr {Array<VNode>}
 * @returns Array<VNode>
 * @description withoutNulls(arr: Array<VNode>) - takes an array and returns a new array with all null values removed.
 */
export const withoutNulls = (arr: VNode[]): VNode[] => {
    return arr.filter((item) => item != null)
}

/***
 * @name lipsum
 * @param num number
 * @returns VNode
 * @description lipsum(num: number) - takes a number and returns a virtual DOM fragment with the number of paragraphs of "Lorem ipsum" text specified by the number passed to the function.
 */
export const lipsum = (num: number): VNode  => {
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    return hFragment(Array<VNode>(num).fill(h('p', {}, [hString(lorem)])))
}

/**
 * @name MessageComponent
 * @param level string - 'info' | 'warning' | 'error'
 * @param message string
 * @returns VNode
 * 
 * @description MessageComponent({ level, message }: { level: 'info' | 'warning' | 'error', message: string }) - takes a level and message and returns a virtual DOM node with the message and level passed to the function.
 */
export const MessageComponent = ({ level, message }: { level: 'info' | 'warning' | 'error', message: string }): VNode => {
    return h('div', { class: `message message--${level}` }, [h('p', {}, [hString(message)])])
}
