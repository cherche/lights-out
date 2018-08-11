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
      moves: 0
    },
    settings: {
      width: 3,
      height: 3
    }
  }

  c.game = Game(c.settings)

  c.getCells = () => c.game.map.map2((currentValue, [i, j]) => {
    const $td = Elem('td', {
      children: [
        Elem('div', {
          attr: { className: 'circle' }
        })
      ]
    })

    return $td
  })

  c.appendCells = () => {
    Elem.empty($tbody)

    c.cells.forEach((row, i) => {
      const $tr = Elem('tr', {
        children: row
      })

      $tbody.appendChild($tr)
    })
  }

  c.cells = c.getCells()

  const updateCells = function updateCells () {
    c.cells.forEach2((cell, [i, j]) => {
      cell.className = c.game.map[i][j] ? 'lit' : ''
    })
  }

  c.press = (indices) => {
    c.session.moves++
    c.game.press(indices)
    updateCells()

    if (!c.game.isWon()) return

    $body.className = 'paused'
    handlers.main.$tbody.active = false
    handlers.win.$body.active = true

    if (c.session.moves === c.game.mapInfo.minMoves) console.log('well done!')
    c.session.moves = 0

    const message = getRandomVal(winMessages)
    $winMessage.className = message.type
    $winMessage.textContent = message.text
  }

  const handlers = {}
  handlers.main = {
    // Event delegation is awesome
    $tbody: PressHandler($tbody, (e) => {
      // This should never happen, but if something goes
      // awry with the CSS, there will be no errors
      if (!['TD', 'DIV'].includes(e.target.tagName)) return

      const target = (e.target.tagName === 'TD')
        ? e.target
        : e.target.parentNode
      const indices = c.cells.getIndices(target)

      // If we don't call stopPropagation(), the $body event listener is
      // triggered instantly and the win message is skipped.
      e.stopPropagation()

      c.press(indices)
    })
  }
  handlers.win = {
    $body: PressHandler($body, (e) => {
      $body.className = ''
      c.game.randomizeMap()
      updateCells()
      handlers.win.$body.active = false
      handlers.main.$tbody.active = true
    })
  }
  handlers.win.$body.active = false
  updateCells()

  c.appendCells()

  return c
}
