import { destroyDOM } from './destroy-dom';
import { Dispatcher } from './dispatcher';
import { mountDOM } from './mount-dom';
import type { Payload, Reducers, State, ViewFunction, VNode } from './utils/types';


/**
 * @name createApp
 * @param state State
 * @param view ViewFunction
 * @description - Creates an application instance.
 */
export const createApp = ({ state, view, reducers = {}}: { state: State, view: ViewFunction, reducers: Reducers }) => {
    let parentEl: HTMLElement | null = null
    let vdom: VNode | null = null

    const dispatcher = new Dispatcher()

    /**
     * Emits an event.
     *
     * @param eventName string
     * @param payload Payload
     */
    const emit = (eventName: string, payload: Payload) => {
        dispatcher.dispatch(eventName, payload)
    }

    /**
     * Renders the application.
     *
     */
    const renderApp = () => {
        if (vdom) {
            destroyDOM(vdom)
        }

        vdom = view(state, emit)

        if (parentEl && vdom) {
            mountDOM(vdom, parentEl)
        }
    }

    const subscriptions = [dispatcher.afterEveryCommand(renderApp)]

    for (const actionName in reducers) {
        const reducer = reducers[actionName]

        const subs = dispatcher.subscribe(actionName, (payload: Payload) => {
            state = reducer(state, payload)
        })

        subscriptions.push(subs)
    }

    return {
        mount(_parentEl: HTMLElement | null) {
            parentEl = _parentEl
            renderApp()
        },
        
        unmount(){
            if (vdom) {
                destroyDOM(vdom)
            }

            vdom = null;
            
            subscriptions.forEach((unsubscribe) => unsubscribe())
        }
    }
}
    