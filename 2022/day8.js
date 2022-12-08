// part 1
grid = document.body.innerText.trim().split('\n').map(line => line.split('').map(a => +a));
scanFromLeft = function* (grid, indexY) {
  const line = grid[indexY];
  for (let indexX in line) {
    yield [line[indexX], `${indexX}.${indexY}`];
  }
}
scanFromRight = function* (grid, indexY) {
  const line = grid[indexY];
  for (let indexX = line.length; indexX--;) {
    yield [line[indexX], `${indexX}.${indexY}`];
  }
}
scanFromUp = function* (grid, indexX) {
  for (let indexY in grid) {
    indexY -= 0;
    yield [grid[indexY][indexX], `${indexX}.${indexY}`];
  }
}
scanFromDown = function* (grid, indexX) {
  for (let indexY = grid.length; indexY--;) {
    yield [grid[indexY][indexX], `${indexX}.${indexY}`];
  }
}
doVisibleMarker = (scanner) => {
  const visible = new Set();
  let lastBiggestNumber = null;
  for (const [number, position] of scanner) {
    const currentLastBiggestNumber = lastBiggestNumber;
    if (currentLastBiggestNumber === null || number > currentLastBiggestNumber) lastBiggestNumber = number;
    if (currentLastBiggestNumber !== null && currentLastBiggestNumber >= number) continue;
    visible.add(position);
  }
  return visible;
}
visible = new Set();
for (let indexY in grid) {
  indexY -= 0;
  [
    ...doVisibleMarker(scanFromLeft(grid, indexY)),
    ...doVisibleMarker(scanFromRight(grid, indexY)),
  ].forEach(pos => visible.add(pos));
}
for (let indexX in grid[0]) {
  indexX -= 0;
  [
    ...doVisibleMarker(scanFromUp(grid, indexX)),
    ...doVisibleMarker(scanFromDown(grid, indexX)),
  ].forEach(pos => visible.add(pos));
}
console.log(visible.size);



// part 2
grid = document.body.innerText.trim().split('\n').map(line => line.split('').map(a => +a));
scanFromLeft = function* (grid, indexX, indexY) {
  const line = grid[indexY];
  const oldIndexX = indexX;
  for (; indexX >= 0; --indexX) {
    yield [line[indexX], oldIndexX - indexX + 1];
  }
}
scanFromRight = function* (grid, indexX, indexY) {
  const line = grid[indexY];
  const oldIndexX = indexX;
  for (; indexX < line.length; ++indexX) {
    yield [line[indexX], indexX - oldIndexX + 1];
  }
}
scanFromUp = function* (grid, indexX, indexY) {
  const oldIndexY = indexY;
  for (; indexY >= 0; --indexY) {
    yield [grid[indexY][indexX], oldIndexY - indexY + 1];
  }
}
scanFromDown = function* (grid, indexX, indexY) {
  const oldIndexY = indexY;
  for (; indexY < grid.length; ++indexY) {
    indexY -= 0;
    yield [grid[indexY][indexX], indexY - oldIndexY + 1];
  }
}
doVisibleMarker = (scanner) => {
  let currentHeight = null;
  let distance = 1;
  for (const [number, currentDistance] of scanner) {
    if (currentHeight === null) {
      currentHeight = number;
      continue;
    }
    distance = currentDistance;
    if (number >= currentHeight) break;

  }
  return distance;
}
calcVisible = (grid, indexX, indexY) => {
  return [
    doVisibleMarker(scanFromLeft(grid, indexX, indexY)),
    doVisibleMarker(scanFromRight(grid, indexX, indexY)),
    doVisibleMarker(scanFromUp(grid, indexX, indexY)),
    doVisibleMarker(scanFromDown(grid, indexX, indexY)),
  ];
}
resultMap = {}
for (let indexY in grid) {
  indexY -= 0;
  for (let indexX in grid[indexY]) {
    indexX -= 0;
    resultMap[`${indexX}.${indexY}`] = calcVisible(grid, indexX, indexY).reduce((acc, val) => acc * (val - 1), 1);
  }
}
Object.entries(resultMap).sort((a, b) => a[1] > b[1] ? -1 : 1).at(0);
