export function get2dArray(x, y, val) {
  const arr = [];

  for (let i = 0; i < x; i++) {
    const arr1 = [];
    for (let j = 0; j < y; j++) arr1.push(val);
    arr.push(arr1)
  }

  return arr;
}

export function getRandomInt(min, max) {
  if (arguments.length === 1) {
    return getRandomInt(0, min);
  } else {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export function getRandomBool() {
  return !!getRandomInt(2);
}
