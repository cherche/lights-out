import Game from './game.js'
import Elem from './element.js'
import PressHandler from './press.js'

const Controller = {
  isPaused: false,
  pause: (fn) => {
    if (fn) fn()
    Controller.isPaused = true
  },
  play: (fn) => {
    if (fn) fn()
    Controller.isPaused = false
  }
}

function refreshTable (tableCells) {
  tableCells.forEach((row, x) => row.forEach((cell, y) => {
    cell.className = Game.map[x][y]
  }))
}

// A 2D array with the same layout as the game
// map, but all booleans are replaced with elements
export function getTableCells ({ onPause, onPlay }) {
  const tableCells = Game.map.map((row, x) => row.map((cell, y) => {
    const $td = Elem('td', { className: Game.map[x][y] })

    const tdPressHandler = PressHandler($td, (e) => {
      if (Controller.isPaused) return

      // Call stopPropagation() to ensure that it does not
      // trigger the handler on the body and instantly
      // skip the win message screen
      e.stopPropagation()

      Game.press([x, y])
      refreshTable(tableCells)

      // Obviously, we don't care if the game isn't won
      if (!Game.isWon()) return

      // Temporarily prevent actions
      Controller.pause(onPause)

      const windowPressHandler = PressHandler(window, (e) => {
        e.stopPropagation()

        // Reset game after clicking anywhere
        Game.randomizeMap()
        Controller.play(onPlay)

        windowPressHandler.unbind()
        refreshTable(tableCells)
      })

      windowPressHandler.bind()
    })

    tdPressHandler.bind()

    const $circle = Elem('div', { className: 'circle' })
    $td.appendChild($circle)

    return $td
  }))

  return tableCells
}

export function getTable (tableCells) {
  const $table = Elem('table')

  tableCells.forEach((row, x) => {
    const $tr = Elem('tr')
    $table.appendChild($tr)

    row.forEach(($td, y) => $tr.appendChild($td))
  })

  return $table
}
