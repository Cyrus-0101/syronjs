/**
 * Adds an event listener to a given HTML element and returns the handler.
 *
 * @param eventName - The name of the event to listen for.
 * @param handler - The function to execute when the event is triggered.
 * @param el - The HTML element to add the event listener to.
 * @returns The handler function.
 */
export const addEventListener = (
    eventName: string,
    handler: EventListener,
    el: HTMLElement
) => {
    el.addEventListener(eventName, handler)

    return handler
}

/**
 * Adds multiple event listeners to a given HTML element and returns an object with the added listeners.
 * 
 * @param listeners - An object where the keys are event names and the values are handler functions.
 * @param el - The HTML element to add the event listeners to.
 * @returns An object where the keys are event names and the values are the added listener functions.
 */
export const addEventListeners = (listeners: Record<string, EventListener> = {}, el: HTMLElement) => {
    const addedListeners: Record<string, EventListener> = {}

    Object.entries(listeners).forEach(([eventName, handler]) => {
        const listener = addEventListener(eventName, handler, el)
        addedListeners[eventName] = listener
    })

    return addedListeners
}

/**
 * Removes an event listener from a given HTML element.
 * 
 * @param eventName - The name of the event to remove the listener from.
 * @param handler - The handler function to remove.
 * @param el - The HTML element to remove the event listener from.
 */
export const removeEventListeners = (listeners: Record<string, EventListener> = {}, el: HTMLElement) => {
    Object.entries(listeners).forEach(([eventName, handler]) => {
        el.removeEventListener(eventName, handler);
    })
}