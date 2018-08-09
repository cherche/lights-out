import Array2 from './array2.js'
import { getDirectAdjacents, coordsToVal } from './array2-helpers.js'
import { getRandomBool } from './probability.js'

function Game (options) {
  // Someday, I'll implement a way to change the options
  // Someday...
  const game = { options }

  // coordsToVal(), but it's always using game.map
  game.coordsToVal = (coords) => coordsToVal(game.map, coords)

  game.getInitMap = () => {
    const { width, height } = game.options

    game.map = Array2({fill: false, size: [width, height]})
    game.randomizeMap()
  }

  game.randomizeMap = () => {
    do {
      // If each tile were set generally, randomizeMap() would
      // sometimes spit out unsolvable maps
      // This is technically more general
      game.map.forEach2((currentValue, indices) => {
        if (getRandomBool()) game.press(indices)
      })
      // I mean, it's slower, but yay for generality?
      // After all, speed is somewhat negligible for a game like this
    } while (game.isWon())
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

  // map needs to be defined before randomize()
  // can randomize it (duh)
  game.getInitMap()

  return game
}

export default Game
