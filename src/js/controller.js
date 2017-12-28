import Game from './game.js'
import Elem from './element.js'
import PressHandler from './press.js'

Game.getUnsolvedMap([true, false])

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

    const tdPressHandler = PressHandler($td, () => {
      if (Controller.isPaused) return

      Game.press([x, y])
      refreshTable(tableCells)

      if (!Game.isWon()) return

      Controller.pause(onPause)

      const windowPressHandler = PressHandler(window, (e) => {
        e.stopPropagation()
        e.preventDefault()

        Game.getUnsolvedMap()
        Controller.play(onPlay)

        // Temporarily prevented actions
        // Re-allowed and reset game after clicking anywhere

        windowPressHandler.unbind()
        refreshTable(tableCells)
      })

      // I don't even know how to bind this without it
      // instantly triggering because of the $td click
      setTimeout(() => windowPressHandler.bind(), 0)
    })

    tdPressHandler.bind()

    const $circle = Elem('div', { className: 'circle' })
    $td.appendChild($circle)

    return $td
  }))

  return tableCells
}

// Haha, because it's a portmanteau of "cell"
// and "elements". I'm funny.
export function getTable(tableCells) {
  const $table = Elem('table')

  tableCells.forEach((row, x) => {
    const $tr = Elem('tr')
    $table.appendChild($tr)

    row.forEach(($td, y) => $tr.appendChild($td))
  })

  return $table
}
