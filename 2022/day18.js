// part 1
input = document.body.innerText.trim().split('\n').map(line => line.split(',').map(val => +val));

getGridNeighbourPosition = function* (x, y, z) {
  yield [x - 1, y, z];
  yield [x + 1, y, z];
  yield [x, y - 1, z];
  yield [x, y + 1, z];
  yield [x, y, z - 1];
  yield [x, y, z + 1];
}

grid = {};
merged = 0;
for (const [x, y, z] of input) {
  for (const [nx, ny, nz] of getGridNeighbourPosition(x, y, z)) {
    const neighbourKey = `${nx}.${ny}.${nz}`;
    if (grid[neighbourKey]) ++merged;
  }
  grid[`${x}.${y}.${z}`] = 1;
}
input.length * 6 - merged * 2;



// part 2
input = `
2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5
2,2,5
`.trim().split('\n').map(line => line.split(',').map(val => +val));

getGridNeighbourPosition = function* (x, y, z) {
  yield [x - 1, y, z];
  yield [x + 1, y, z];
  yield [x, y - 1, z];
  yield [x, y + 1, z];
  yield [x, y, z - 1];
  yield [x, y, z + 1];
}

grid = {};
merged = 0;
for (const [x, y, z] of input) {
  for (const [nx, ny, nz] of getGridNeighbourPosition(x, y, z)) {
    const neighbourKey = `${nx}.${ny}.${nz}`;
    if (grid[neighbourKey]) ++merged;
  }
  grid[`${x}.${y}.${z}`] = 1;
}
input.length * 6 - merged * 2;
