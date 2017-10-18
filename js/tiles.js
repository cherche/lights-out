import { get2dArray, getRandomBool } from './generators.js';

const adjacents = [
  [0, -1],
  [-1, 0],
  [0, 0],
  [1, 0],
  [0, 1],
];

export default class Tiles {
  constructor(x, y, val) {
    this.tiles = get2dArray(3, 3, true);
  }

  isExisting(x, y) {
    if (
      x < 0
      || y < 0
      || this.tiles[x] === undefined
      || this.tiles[x][y] === undefined
    ) {
        return false;
    }
    return true;
  }

  flip(x, y) {
    if (!this.isExisting(x, y)) return;

    this.tiles[x][y] = !this.tiles[x][y];
  }

  flipAdjacents(x1, y1) {
    adjacents.forEach(([x2, y2]) => {
      const x = x1 + x2;
      const y = y1 + y2;

      this.flip(x, y);
    });
  }

  randomize() {
    this.tiles.forEach((row, x) => {
      row.forEach((column, y) => {
        this.tiles[x][y] = getRandomBool();
      });
    });
  }
}
