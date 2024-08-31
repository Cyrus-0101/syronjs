
/**
 * Dispatcher is a simple event bus that allows to subscribe to commands and
 * dispatch them.
 */
export class Dispatcher {
    #subs = new Map<any, any>()
    #afterHandlers: any = []

    /**
     * Dispatches a command to all subscribed handlers.
     * @param commandName Command name.
     */
    afterEveryCommand = (handler: any) => {
        this.#afterHandlers.push(handler)

        return () => {
            const idx = this.#afterHandlers?.indexOf(handler)
            this.#afterHandlers?.splice(idx, 1)
        }
    }

    /**
     * Dispatches a command to all subscribed handlers.
     * @param commandName Command name.
     */
    dispatch(commandName: string, payload: any) {
        if (this.#subs.has(commandName)) {
            this.#subs.get(commandName).forEach((handler: any) => handler(payload))
        } else {
            console.warn(`No handlers for command ${commandName}`)
        }

        this.#afterHandlers.forEach((handler: any) => handler())
    }

    /**
     * Dispatches a command to all subscribed handlers.
     * @param commandName Command name.
     */
    subscribe(commandName: string, handler: any) {
        if (!this.#subs.has(commandName)) {
            this.#subs.set(commandName, [])
        }

        const handlers = this.#subs.get(commandName)

        if (handlers?.includes(handler)) {
            throw new Error(
                `Handler is already subscribed to command ${commandName}`
            )
        }

        handlers?.push(handler)

        return () => {
            const idx = handlers?.indexOf(handler)

            handlers?.splice(idx, 1)
        }
    }
}