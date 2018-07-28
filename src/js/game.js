import { splitInto2dArray } from './array-helpers.js'
import { getDirectAdjacents, coordsToVal } from './grid.js'
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

  const map = []
  const vals = [true, false]

  for (let i = 0; i < width * height; i++) map.push(false)

  Game.map = splitInto2dArray(map, height)
}

Game.randomizeMap = () => {
  const { width, height } = Game.options

  do {
    // If each tile were set generally, randomizeMap() would
    // sometimes spit out unsolvable maps
    // This is technically more general
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (getRandomBool()) Game.press([x, y])
      }
    }
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
  const { width, height } = Game.options

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const cell = Game.map[x][y]

      // All lights must be off
      // As soon as you find a true value, return false
      if (cell) return false
    }
  }

  return true
}

// map needs to be defined before randomize()
// can randomize it (duh)
Game.getInitMap()
Game.randomizeMap()

export default Game
