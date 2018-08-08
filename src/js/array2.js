export default function Array2 ({
  fill,
  size: [width, height]
}) {
  const arr2 = []
  for (let i = 0; i < width; i++) {
    arr2.push(new Array(height).fill(fill))
  }

  // There should be a better way to include the indices . . .

  arr2.forEach2 = (callback) => {
    return arr2.forEach((row, i) =>
      row.forEach((currentValue, j) =>
        callback(currentValue, [i, j])))
  }

  // map2() and forEach2() differ from their 1D versions as their callback takes in
  // 2D indices (Array) rather than a Number.
  // function callback (currentValue, indices) {}

  arr2.map2 = (callback) => {
    return arr2.map((row, i) =>
      row.map((currentValue, j) =>
        callback(currentValue, [i, j])))
  }

  /*
  arr2.fill2 = (val) => {
    return arr2.map(row => new Array(width).fill(val))
  }
  */

  arr2.every2 = (callback) => {
    return arr2.every(row => row.every(callback))
  }

  return arr2
}
