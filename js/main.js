import Game from './game.js'
import { coordsToVal } from './grid.js'

// Probably going to refactor main.js
// Currently a bit of a mess

const Controller = {
  isPaused: false
}

const $container = document.createElement('div')
document.body.appendChild($container)
$container.className = 'flex-container'

Game.getUnsolvedMap([true, false])

function refreshTable () {
  tableCells.forEach((row, x) => row.forEach((cell, y) => {
    cell.className = Game.map[x][y]
  }))
}

const tableCells = Game.map.map((row, x) => row.map((cell, y) => {
  const $td = document.createElement('td')

  $td.className = Game.map[x][y]
  $td.addEventListener('click', () => {
    if (Controller.isPaused) return

    Game.press([x, y])
    refreshTable()

    if (Game.isWon()) {
      Controller.isPaused = true

      const messageWin = document.getElementsByClassName('message-win')[0]

      messageWin.style.transition = '1s all';
      messageWin.style.opacity = 1
      // I guess this works
      // Surely, there's a better way to do it, though
      setTimeout(() => {
        document.body.addEventListener('click', function startGame () {
          Game.getUnsolvedMap([true, false])
          Controller.isPaused = false
          // Randomize the win message
          // It gets super bland after a while
          messageWin.style.transition = '0s all';
          messageWin.style.opacity = 0

          document.body.removeEventListener('click', startGame)
          refreshTable()
        })
      }, 0)
    }
  })

  const $div = document.createElement('div')
  $td.appendChild($div)
  $div.className = 'circle'

  return $td
}))

const $table = document.createElement('table')
$container.appendChild($table)

tableCells.forEach((row, x) => {
  const $tr = document.createElement('tr')
  $table.appendChild($tr)

  row.forEach(($td, y) => $tr.appendChild($td))
})
