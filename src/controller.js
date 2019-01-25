import Game from './js/game.js'
import Elem from './js/element.js'
import PressHandler from './js/press.js'
import winMessages from './data/messages.js'
import { getRandomVal } from './js/probability.js'

export default function Controller ({ $body, $tbody, $winMessage }) {
  const c = {
    // Should contain long-term things like total number of puzzles solved
    player: {},
    // Should contain short-term things like move count
    session: {
      moves: 0,
      perfect: 0
    },
    settings: {
      width: 3,
      height: 3,
      showWin: true
    },
    screen: 0
  }

  const updateCells = function updateCells () {
    // Based on the internal game.map, the table is updated
    // to reflect the current state of the game
    c.cells.forEach2((cell, [i, j]) => {
      cell.className = c.game.map[i][j] ? 'lit' : ''
    })
  }

  // I guess we can have bigger maps now, but it's so much work
  // to add a screen to actually set the settings . . .
  c.loadSettings = () => {
    c.game = Game(c.settings)

    c.cells = c.game.map.map2((currentValue, [i, j]) => {
      const $td = Elem('td', {
        children: [
          Elem('div', {
            attr: { className: 'circle' }
          })
        ]
      })

      return $td
    })

    Elem.empty($tbody)
    c.cells.forEach((row, i) => {
      const $tr = Elem('tr', {
        children: row
      })

      $tbody.appendChild($tr)
    })

    updateCells()
  }

  function showScreen (id) {
    if (id !== 0 && id !== 1) return

    if (id === 0) {
      $body.className = ''
      handlers.win.$body.active = false
      handlers.main.$tbody.active = true
    } else {
      if (c.settings.showWin) $body.className = 'paused'
      handlers.main.$tbody.active = false
      handlers.win.$body.active = true
    }

    c.screen = id
  }

  const handlers = {}

  // I need to separate the part of each handler that is specific
  // to that event and the part that is the general user action
  // That way, it becomes easy to add more ways to interact with the game
  c.press = (indices) => {
    c.session.moves++
    c.game.press(indices)
    updateCells()

    if (!c.game.isWon()) return

    showScreen(1)

    let message

    if (c.session.moves === c.game.mapInfo.minMoves) {
      c.session.perfect++
      message = {
        type: 'perfect',
        text: `Perfect! (${c.session.perfect})`
      }
    } else {
      c.session.perfect = 0
      message = getRandomVal(winMessages)
    }

    $winMessage.className = message.type
    $winMessage.textContent = message.text

    c.session.moves = 0
  }

  c.showMap = () => {
    c.game.randomizeMap()
    updateCells()
    showScreen(0)
  }

  handlers.main = {
    // Event delegation is awesome
    $tbody: PressHandler($tbody, (e) => {
      // This should never happen, but if something goes
      // awry with the CSS, there will be no errors
      if (!['TD', 'DIV'].includes(e.target.tagName)) return

      const target = (e.target.tagName === 'TD')
        ? e.target
        : e.target.parentNode
      const indices = c.cells.indicesOf(target)

      // If we don't call stopPropagation(), the $body event listener is
      // triggered instantly and the win message is skipped.
      e.stopPropagation()

      c.press(indices)
    })
  }

  handlers.win = {
    $body: PressHandler($body, c.showMap)
  }
  handlers.win.$body.active = false

  c.loadSettings()

  return c
}
