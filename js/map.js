const doc = document;

export function createMap(tiles) {
  const $table = doc.createElement('table');

  tiles.forEach((row, x) => {
    const $tr = doc.createElement('tr');
    $table.appendChild($tr);

    row.forEach((column, y) => {
      const $td = doc.createElement('td');
      $tr.appendChild($td);

      $td.id = `${x}-${y}`;
      $td.className = tiles[x][y];
    });
  });

  return {
    element: $table,
    update: (tiles) => {
      [...$table.children].forEach(($tr, x) => {
        [...$tr.children].forEach(($td, y) => {
          $td.className = tiles[x][y];
        });
      });
    }
  };
}
