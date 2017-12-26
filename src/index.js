import Elem from './js/element.js'
import { getTableCellsArray, getTable } from './js/controller.js'
import { getRandomVal } from './js/probability.js'

import winMessages from './data/messages-processed.js'

/*
import './css/style.css'
import './css/win-messages.css'
import './css/mobile.css'

import './fonts/courgette.css'
*/

document.addEventListener('DOMContentLoaded', () => {
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
})
