import Game from './game.js'
import Elem from './element.js'

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

    const triggerPress = () => {
      if (Controller.isPaused) return

      Game.press([x, y])
      refreshTable(tableCells)

      if (!Game.isWon()) return

      Controller.pause(onPause)
      // I guess this works
      // Surely, there's a better way to do it, though
      setTimeout(() => window.addEventListener('click', function startGame (e) {
        e.preventDefault()

        Game.getUnsolvedMap()
        Controller.play(onPlay)

        // Temporarily prevented actions
        // Re-allowed and reset game after clicking anywhere

        this.removeEventListener('click', startGame)
        refreshTable(tableCells)
      }), 0)
    }

    // Listen for both click and touchstart, but cancel the
    // click event if touchstart is triggered
    // https://www.html5rocks.com/en/mobile/touchandmouse/
    $td.addEventListener('click', triggerPress)
    $td.addEventListener('touchstart', (e) => {
      e.stopPropagation()
      e.preventDefault()
      triggerPress()
    })

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
