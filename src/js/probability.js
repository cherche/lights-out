export function getRandomInt (min, max, inclusive) {
  const range = max - min + (inclusive ? 1 : 0)
  const offset = min

  return Math.floor(Math.random() * range) + offset
}

export function getRandomBool () {
  return !!Math.floor(Math.random() * 2)
}

export function getRandomVal (arr) {
  const index = getRandomInt(0, arr.length)

  return arr[index]
}
