import Tiles from './tiles.js';
import {createMap} from './map.js';

const map = new Tiles(3, 3, true);
map.randomize();

const $map = createMap(map.tiles);

$map.element.addEventListener('mousedown', (e) => {
  e.preventDefault();

  const target = e.target;

  const [x, y] = e.target.id.split('-').map(coord => parseInt(coord));

  const flipped = map.flipAdjacents(x, y);

  $map.update(map.tiles);
});

document.body.appendChild($map.element);

window.$map = $map.element;
window.map = map;
