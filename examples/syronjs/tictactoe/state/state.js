/**
 * Initialize the game state.
 *
 * @returns {Object}
 */
export default function makeInitialState() {
    return {
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ],
        player: 'X',
        winner: null,
    }
}
