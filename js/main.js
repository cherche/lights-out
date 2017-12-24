import Game from './game.js'
import { coordsToVal } from './grid.js'

do {
  Game.getMap([true, false])
} while (Game.isWon())

function refreshTable () {
  tableCells.forEach((row, x) => row.forEach((cell, y) => {
    cell.className = Game.map[x][y]
  }))
}

const tableCells = Game.map.map((row, x) => row.map((cell, y) => {
  const $td = document.createElement('td')

  $td.className = Game.map[x][y]
  $td.addEventListener('click', () => {
    Game.press([x, y])
    refreshTable()

    if (Game.isWon()) alert('you win!')
  })

  const $div = document.createElement('div')
  $td.appendChild($div)

  $div.className = 'circle'

  return $td
}))

const $table = document.createElement('table')
document.body.appendChild($table)

tableCells.forEach((row, x) => {
  const $tr = document.createElement('tr')
  $table.appendChild($tr)

  row.forEach(($td, y) => $tr.appendChild($td))
})
