import Game from './game.js'
import Elem from './element.js'
import FastClick from './fastclick.js'

Game.getUnsolvedMap([true, false])

document.addEventListener('DOMContentLoaded', () => {
  const $body = document.body
	FastClick.attach($body);
}, false);

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
export function getTableCellsArray ({ onPause, onPlay }) {
  const tableCells = Game.map.map((row, x) => row.map((cell, y) => {
    const $td = Elem('td', { className: Game.map[x][y] })

    $td.addEventListener('click', () => {
      if (Controller.isPaused) return

      Game.press([x, y])
      refreshTable(tableCells)

      if (!Game.isWon()) return

      Controller.pause(onPause)
      // I guess this works
      // Surely, there's a better way to do it, though
      setTimeout(() => window.addEventListener('click', function startGame () {
        Game.getUnsolvedMap()
        Controller.play(onPlay)

        // Temporarily prevented actions
        // Re-allowed and reset game after clicking anywhere

        this.removeEventListener('click', startGame)
        refreshTable(tableCells)
      }), 0)
    })

    const $circle = Elem('div', { className: 'circle' })
    $td.appendChild($circle)

    return $td
  }))

  return tableCells
}

// Haha, because it's a portmanteau of "cell"
// and "elements". I'm funny.
export function getTable(celements) {
  const $table = Elem('table')

  celements.forEach((row, x) => {
    const $tr = Elem('tr')
    $table.appendChild($tr)

    row.forEach(($td, y) => $tr.appendChild($td))
  })

  return $table
}
