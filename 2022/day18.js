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
input = document.body.innerText.trim().split('\n').map(line => {
  const [x, y, z] = line.split(',').map(val => +val);
  return [x, y, z];
});

getPossibleMove = function* (x, y, z) {
  yield* [
    [x + 1, y, z],
    [x - 1, y, z],
    [x, y + 1, z],
    [x, y - 1, z],
    [x, y, z + 1],
    [x, y, z - 1],
  ];
}

boundary = input.reduce((acc, pos) => {
  if (acc === null) return [
    [pos[0], pos[0]],
    [pos[1], pos[1]],
    [pos[2], pos[2]],
  ];
  if (acc[0][0] > pos[0]) acc[0][0] = pos[0];
  if (acc[0][1] < pos[0]) acc[0][1] = pos[0];
  if (acc[1][0] > pos[1]) acc[1][0] = pos[1];
  if (acc[1][1] < pos[1]) acc[1][1] = pos[1];
  if (acc[2][0] > pos[2]) acc[2][0] = pos[2];
  if (acc[2][1] < pos[2]) acc[2][1] = pos[2];
  return acc;
}, null);

grid = new Map(input.map(pos => [pos.join('.'), 1]));

queue = [
  [
    boundary[0][0] - 1,
    boundary[1][0] - 1,
    boundary[2][0] - 1,
  ],
];
totalCube = 0;
removeMergeCount = 0;
while (queue.length) {
  const [tx, ty, tz] = queue.pop();
  const currentPositionKey = `${tx}.${ty}.${tz}`;
  if (grid.has(currentPositionKey)) continue;
  grid.set(currentPositionKey, 2);
  ++totalCube;
  for (const [x, y, z] of getPossibleMove(tx, ty, tz)) {
    if (
      x < boundary[0][0] - 1 || x > boundary[0][1] + 1
      || y < boundary[1][0] - 1 || y > boundary[1][1] + 1
      || z < boundary[2][0] - 1 || z > boundary[2][1] + 1
    ) continue;
    const positionKey = `${x}.${y}.${z}`;
    if (!grid.has(positionKey)) {
      queue.push([x, y, z]);
      continue;
    }
    if (grid.get(positionKey) === 1)
      continue;
    if (grid.get(positionKey) === 2) {
      ++removeMergeCount;
      continue;
    }
  }
}

width = Math.abs(boundary[0][0] - boundary[0][1]) + 3;
height = Math.abs(boundary[1][0] - boundary[1][1]) + 3;
depth = Math.abs(boundary[2][0] - boundary[2][1]) + 3;

totalCube * 6 - removeMergeCount * 2 - (
  width * height
  + height * depth
  + depth * width
) * 2
