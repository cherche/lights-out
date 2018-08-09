import Game from './js/game.js'
import winMessages from './data/messages.js'
import Elem from './js/element.js'
import PressHandler from './js/press.js'
import { getRandomVal } from './js/probability.js'

const game = Game({
  width: 3,
  height: 3
})

// I would much rather use a framework, but it takes some time to learn
const $body = document.body

// Build everything
const $tbody = Elem('tbody')
const cells = game.map.map2((currentValue, [i, j]) => {
  const $td = Elem('td', {
    children: [
      Elem('div', {
        attr: { className: 'circle' }
      })
    ]
  })

  return $td
})
cells.forEach((row, i) => {
  const $tr = Elem('tr', {
    children: row
  })

  $tbody.appendChild($tr)
})

const $main = Elem('div', {
  attr: { className: 'main flex-container' },
  children: [
    Elem('table', {
      attr: { id: 'game' },
      children: [$tbody]
    })
  ]
})

const $winMessage = Elem('h1', {
  attr: { className: 'win-message' }
})
const $win = Elem('div', {
  attr: { className: 'win flex-container' },
  children: [$winMessage]
})

// Order matters
$body.appendChild($main)
$body.appendChild($win)

// All user inputs

// Disable touch scroll
window.addEventListener('touchmove', e => e.preventDefault())

// Really, I should create generic functions that connect to the game
// object and bind those to each element, but this will do for now.

const updateCells = function updateCells () {
  cells.forEach2((cell, [i, j]) => {
    cell.className = game.map[i][j] ? 'lit' : ''
  })
}

const handlers = {
  $body: PressHandler($body, (e) => {
    $body.className = ''
    game.randomizeMap()
    updateCells()
    handlers.$body.active = false
    handlers.$tbody.active = true
  }),

  // Event delegation is awesome
  $tbody: PressHandler($tbody, (e) => {
    const target = (e.target.tagName === 'TD')
      ? e.target
      : e.target.parentNode
    const indices = cells.getIndices(target)

    game.press(indices)
    updateCells()

    if (game.isWon()) {
      $body.className = 'paused'
      handlers.$tbody.active = false
      handlers.$body.active = true

      const message = getRandomVal(winMessages)
      $winMessage.className = message.type
      $winMessage.textContent = message.text

      // If we don't call stopPropagation(), the $body event listener is
      // triggered instantly and the win message is skipped.
      e.stopPropagation()
    }
  })
}
handlers.$body.active = false
updateCells()
