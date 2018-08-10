import Array2 from './array2.js'
import { getDirectAdjacents } from './array2-helpers.js'
import { getRandomBool } from './probability.js'

function Game (options) {
  // Someday, I'll implement a way to change the options
  // Someday...
  const game = {
    options,
    mapInfo: {}
  }

  game.getInitMap = () => {
    const { width, height } = game.options

    game.map = Array2({fill: false, size: [width, height]})
    // It'd be pretty bad to give the user a pre-solved map . . .
    game.randomizeMap()
  }

  game.randomizeMap = () => {
    let minMoves
    do {
      // It is necessary to reset the move count at the beginning
      // because resetting it at the end just erases all of our hard work!
      minMoves = 0
      // If each tile were set generally, for some map sizes,
      // randomizeMap() would sometimes spit out unsolvable maps
      // This is technically more general
      game.map.forEach2((currentValue, indices) => {
        // The minimum number of moves can be found this way because of math
        // But seriously, it's because press order is irrelevant, and because
        // pressing a tile twice is the same as doing nothing
        if (getRandomBool()) {
          game.press(indices)
          minMoves++
        }
      })
      // I mean, it's slower, but yay for generality?
      // After all, speed is somewhat negligible for a game like this
    } while (game.isWon())

    game.mapInfo.minMoves = minMoves
  }

  // Toggle a single tile
  game.toggle = ([x, y]) => {
    game.map[x][y] = !game.map[x][y]
  }

  // Toggle a tile, and all that surround it
  // (only up, down, left, and right)
  game.press = (coords) => {
    const { width, height } = game.options

    const queue = getDirectAdjacents(width, height, coords)
    queue.forEach(coords => game.toggle(coords))

    return queue
  }

  game.isWon = () => {
    return game.map.every2(val => val === false)
  }

  // It's cleaner to define this as its own function but it does
  // end up leaving a useless method under the game object
  game.getInitMap()

  return game
}

export default Game
