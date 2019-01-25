import Array2 from './js/array2.js'

// This guy acts as a bit of a template for how scripts
// that interact with the controller should work
export default function KeyFriend (c) {
  // This next bit will only work for the default map size (3 by 3)
  const keyMap = Array2({ size: [3, 3] })

  // Initialize keyMap with values from a regular 2D array
  const keyArr = [
    ['q', 'w', 'e'],
    ['a', 's', 'd'],
    ['z', 'x', 'c']
  ]
  // I think I made things confusing for myself at some point
  // Oh well, this is just a rough thing
  keyArr.forEach((row, i) => {
    row.forEach((val, j) => {
      keyMap.set([i, j], val)
    })
  })

  let enabled = true

  const keyFriend = {
    setEnabled: (bool) => {
      if (typeof bool !== 'boolean') return
      // Basically, I made a closure for no reason
      // I guess you could argue that it's for privacy, but who knows?
      enabled = bool
    }
  }

  window.addEventListener('keydown', (e) => {
    if (!enabled) return

    if (c.screen === 1) {
      c.showMap()
      return
    }

    const indices = keyMap.indicesOf(e.key)
    if (indices !== -1) c.press(indices)
  })

  return keyFriend
}
