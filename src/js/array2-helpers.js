/*
export function getAdjacents (width, height, [x1, y1]) {
  const adjacents = []

  // This includes diagonals
  const ranges = {
    x: [x1 - 1, x1 + 1],
    y: [y1 - 1, y1 + 1]
  }

  // Look within the range, but exclude anything
  // outside of the map boundaries
  for (let y2 = ranges.y[0]; y2 <= ranges.y[1]; y2++) {
    if (y2 < 0 || y2 >= height) continue
    for (let x2 = ranges.x[0]; x2 <= ranges.x[1]; x2++) {
      if (x2 < 0 || x2 >= width) continue
      adjacents.push([x2, y2])
    }
  }

  return adjacents
}
*/

export function getDirectAdjacents (width, height, [x, y]) {
  // I couldn't think of a better way, and was lazy
  const adjacents = [
    [x, y - 1],
    [x - 1, y],
    [x, y],
    [x + 1, y],
    [x, y + 1]
  ]

  // Ensure each coordinate pair is within the map boundaries
  return adjacents.filter(([x, y]) => {
    return y >= 0 && y < height && x >= 0 && x < width
  })
}

// Given a map and a coordinate pair, returns the value at that point
/*
export function coordsToVal (map, [x, y]) {
  return map[x][y]
}
*/
