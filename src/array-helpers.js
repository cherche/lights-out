// Split array into 2D array where each
// sub-array has a desired length
export function splitInto2dArray (arr, len) {
  // Obviously, avoid mutation of argument
  const copy = arr.slice()
  const output = []

  // Pull out the leading chunk of the array
  // Repeat until the original is empty
  while (copy.length > 0) {
    output.push(copy.splice(0, len))
  }

  return output
}
