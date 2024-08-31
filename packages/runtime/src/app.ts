import { destroyDOM } from './destroy-dom'
import { Dispatcher } from './dispatcher'
import { mountDOM } from './mount-dom'

/**
 * @name createApp
 * @param state State
 * @param view ViewFunction
 * @description - Creates an application instance.
 */
export const createApp = ({
    state,
    view,
    reducers = {},
}: {
    state: any
    view: any
    reducers: any
}) => {
    let parentEl: any = null
    let vdom: any = null

    const dispatcher = new Dispatcher()

    /**
     * Emits an event.
     *
     * @param eventName string
     * @param payload Payload
     */
    const emit = (eventName: any, payload: any) => {
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

        mountDOM(vdom, parentEl)
    }

    const subscriptions = [dispatcher.afterEveryCommand(renderApp)]

    for (const actionName in reducers) {
        const reducer = reducers[actionName]

        const subs = dispatcher.subscribe(actionName, (payload: any) => {
            state = reducer(state, payload)
        })

        subscriptions.push(subs)
    }

    return {
        mount(_parentEl: any) {
            parentEl = _parentEl
            renderApp()
        },

        unmount() {
            destroyDOM(vdom)

            vdom = null
            subscriptions.forEach((unsubscribe) => unsubscribe())
        },
    }
}
