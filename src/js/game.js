import Array2 from './array2.js'
import { getDirectAdjacents, coordsToVal } from './array2-helpers.js'
import { getRandomBool } from './probability.js'

const Game = {}

// coordsToVal(), but it's always using Game.map
Game.coordsToVal = (coords) => coordsToVal(Game.map, coords)

// Someday, I'll implement a way to change the options
// Someday...
Game.options = {
  width: 3,
  height: 3
}

Game.getInitMap = () => {
  const { width, height } = Game.options

  Game.map = Array2({fill: false, size: [width, height]})
  Game.randomizeMap()
}

Game.randomizeMap = () => {
  const { width, height } = Game.options

  do {
    // If each tile were set generally, randomizeMap() would
    // sometimes spit out unsolvable maps
    // This is technically more general
    Game.map.forEach2((currentValue, indices) => {
      if (getRandomBool()) Game.press(indices)
    })
    // I mean, it's slower, but yay for generality?
    // After all, speed is somewhat negligible for a game like this
  } while (Game.isWon())
}

// Toggle a single tile
Game.toggle = ([x, y]) => {
  Game.map[x][y] = !Game.map[x][y]
}

// Toggle a tile, and all that surround it
// (only up, down, left, and right)
Game.press = (coords) => {
  const { width, height } = Game.options

  const queue = getDirectAdjacents(width, height, coords)
  queue.forEach(coords => Game.toggle(coords))

  return queue
}

Game.isWon = () => {
  return Game.map.every2(val => val === false)
}

// map needs to be defined before randomize()
// can randomize it (duh)
Game.getInitMap()

export default Game
