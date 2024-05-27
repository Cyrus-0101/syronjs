import type { Payload } from './utils/types'

/**
 * Dispatcher is a simple event bus that allows to subscribe to commands and
 * dispatch them.
 */
export class Dispatcher {
    #subs = new Map<string, ((payload: Payload) => void)[]>()
    #afterHandlers: (() => void)[] = []

    /**
     * Dispatches a command to all subscribed handlers.
     * @param commandName Command name.
     */
    afterEveryCommand = (handler: () => void): (() => void) => {
        this.#afterHandlers.push(handler)

        return () => {
            const idx = this.#afterHandlers?.indexOf(handler)

            if (idx !== undefined) {
                this.#afterHandlers?.splice(idx, 1)
            }
        }
    }

    /**
     * Dispatches a command to all subscribed handlers.
     * @param commandName Command name.
     */
    dispatch(commandName: string, payload: Payload): void {
        if (this.#subs.has(commandName)) {
            this.#subs.get(commandName)?.forEach((handler) => handler(payload))
        } else {
            console.warn(`No handlers for command ${commandName}`)
        }

        this.#afterHandlers.forEach((handler) => handler())
    }

    /**
     * Dispatches a command to all subscribed handlers.
     * @param commandName Command name.
     */
    subscribe(commandName: string, handler: (payload: Payload) => void): () => void {
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

            if (idx !== undefined) {
                handlers?.splice(idx, 1)
            }
        }
    }
}