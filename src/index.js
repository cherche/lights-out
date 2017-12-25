import Elem from './element.js'
import { getTableCellsArray, getTable } from './controller.js'
import { getRandomVal } from './probability.js'
import winMessages from '../data/win-messages.js'

const $body = document.body

const $gameContainer = Elem('div', { className: 'game-container flex-container' })
$body.appendChild($gameContainer)

const tableCells = getTableCellsArray({
  onPause: () => {
    $body.classList.add('paused')

    const winMessage = getRandomVal(winMessages)

    $winMessage.textContent = winMessage.text
    $winMessage.id = winMessage.type
  },
  onPlay: () => {
    $body.classList.remove('paused')
  }
})

const $table = getTable(tableCells)
$gameContainer.appendChild($table)

const $winContainer = Elem('div', { className: 'win-container flex-container' })
$body.appendChild($winContainer)

const $winMessage = Elem('h1', { className: 'win-message' })
$winContainer.appendChild($winMessage)
