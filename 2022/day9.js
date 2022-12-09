// part 1
steps = document.body.innerText.trim().split('\n').map(line => {
  const [direction, amount] = line.split(' ');
  return [direction, +amount];
});
walk = function* ([direction, amount], startingPositions) {
  const [head, tail] = structuredClone(startingPositions);
  const spatialIndex = 'LR'.indexOf(direction) !== -1 ? 0 : 1;
  const step = 'RD'.indexOf(direction) !== -1 ? 1 : -1;
  for (; amount; --amount) {
    head[spatialIndex] += step;
    const xDist = head[0] - tail[0];
    const yDist = head[1] - tail[1];
    if (Math.abs(xDist) > 1 || Math.abs(xDist) + Math.abs(yDist) > 2) tail[0] += Math.sign(xDist);
    if (Math.abs(yDist) > 1 || Math.abs(xDist) + Math.abs(yDist) > 2) tail[1] += Math.sign(yDist);
    yield structuredClone([head, tail]);
  }
}

positions = [[0, 0], [0, 0]]; // head, tail
visited = new Set();
for (const step of steps) {
  for (const newPositions of walk(step, positions)) {
    positions = newPositions;
    visited.add(`${positions[1][0]}.${positions[1][1]}`);
  }
}
visited.size;



// part 2
steps = document.body.innerText.trim().split('\n').map(line => {
  const [direction, amount] = line.split(' ');
  return [direction, +amount];
});
calcTailNewPosition = (headPosition, tailPosition) => {
  const newTailPosition = structuredClone(tailPosition);
  const xDist = headPosition[0] - tailPosition[0];
  const yDist = headPosition[1] - tailPosition[1];
  if (Math.abs(xDist) > 1 || Math.abs(xDist) + Math.abs(yDist) > 2) newTailPosition[0] += Math.sign(xDist);
  if (Math.abs(yDist) > 1 || Math.abs(xDist) + Math.abs(yDist) > 2) newTailPosition[1] += Math.sign(yDist);
  return newTailPosition;
}
walk = function* ([direction, amount], startingPositions) {
  const positions = structuredClone(startingPositions);
  const spatialIndex = 'LR'.indexOf(direction) !== -1 ? 0 : 1;
  const step = 'RD'.indexOf(direction) !== -1 ? 1 : -1;
  for (; amount; --amount) {
    for (const index in positions) {
      if (index === '0') {
        positions[0][spatialIndex] += step;
        continue;
      }
      positions[index] = calcTailNewPosition(positions[index - 1], positions[index]);
    }
    yield structuredClone(positions);
  }
}

positions = Array(10).fill().map(() => [0, 0]); // head, 9 tail
visited = new Set();
for (const step of steps) {
  for (const newPositions of walk(step, positions)) {
    positions = newPositions;
    visited.add(`${positions.at(-1)[0]}.${positions.at(-1)[1]}`);
  }
}
visited.size;
