/**
 * Create a new game of Tic Tac Toe.
 * */
import {
    createApp,
    h,
    hFragment,
} from 'https://unpkg.com/syronjs-runtime@0.0.2/dist/index.js'
import markReducer from "./state/reducer.js"
import makeInitialState from './state/state.js'

// Generates a new game view
/**
 * Generates a new game view.
 * @param {object} state - The current state of the game.
 * @param {function} emit - The function to dispatch actions.
 * @returns HTMLFragment - A lightweight container that hold the app's elements.
 */
function View(state, emit) {
    return hFragment([Header(state), Board(state, emit)])
}

/**
 * Generates the game header - if there is a winner, a draw, or the current player's turn.
 * @param {object} state - The current state of the game.
 * @returns HTMLElement
 */
function Header(state) {
    if (state.winner) {
        return h('h3', { class: 'win-title' }, [`Player ${state.winner} wins!`])
    }

    if (state.draw) {
        return h('h3', { class: 'draw-title' }, [`It's a draw!`])
    }

    return h('h3', {}, [`It's ${state.player}'s turn!`])
}

/**
 * Generates the game board.
 * @param {object} state - The current state of the game.
 * @param {function} emit - The function to dispatch actions.
 * @returns HTMLElement
 */
function Board(state, emit) {
    const freezeBoard = state.winner || state.draw

    return h('table', { class: freezeBoard ? 'frozen' : '' }, [
        h(
            'tbody',
            {},
            state.board.map((row, i) => Row({ row, i }, emit))
        ),
    ])
}

/**
 * Generates a row of the game board.
 * 
 * @param {Array} row - The current row of the game board.
 * @param {number} i - The index of the current row.
 * @returns HTMLElement
 */
function Row({ row, i }, emit) {
    return h(
        'tr',
        {},
        row.map((cell, j) => Cell({ cell, i, j }, emit))
    )
}

/**
 * Generates a cell of the game board - if the cell is empty, it can be clicked to make a move.
 * 
 * @param {string} cell - The current cell of the game board.
 * @param {number} i - The index of the current row.
 * @param {number} j - The index of the current cell.
 * @returns HTMLElement
 */
function Cell({ cell, i, j }, emit) {
    const mark = cell
        ? h('span', { class: 'cell-text' }, [cell])
        : h(
              'div',
              {
                  class: 'cell',
                  on: { click: () => emit('mark', { row: i, col: j }) },
              },
              []
          )

    return h('td', {}, [mark])
}

// Mount the app to the DOM
createApp({
    state: makeInitialState(),
    reducers: {
        mark: markReducer,
    },
    view: View,
}).mount(document.body)