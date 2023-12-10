// part 1
map = document.body.innerText.trim().split('\n');
y = map.findIndex(line => line.indexOf('S') !== -1);
x = map[y].indexOf('S');
pipeConnection = {
  '|': [[0, 1], [0, -1]],
  '-': [[1, 0], [-1, 0]],
  L: [[0, -1], [1, 0]],
  J: [[0, -1], [-1, 0]],
  7: [[-1, 0], [0, 1]],
  F: [[1, 0], [0, 1]],
  '.': [],
  S: [[1, 0], [-1, 0], [0, 1], [0, -1]],
}
getConnectedPipe = (x, y) => {
  const output = pipeConnection[map[y][x]].filter(offset => {
    const targetPipeConnection = pipeConnection[map[y + offset[1]]?.[x + offset[0]]];
    if (!targetPipeConnection)
      return false;
    return targetPipeConnection.some(targetOffset => targetOffset[0] === -offset[0] && targetOffset[1] === -offset[1]);
  });
  return output.map(offset => [x + offset[0], y + offset[1]]);
}
amount = 0;
currentPosition = [[x, y]];
went = new Set([`${x}.${y}`]);
while (currentPosition.length) {
  const newCurrentPosition = [];
  for (const [x, y] of currentPosition) {
    for (const connected of getConnectedPipe(x, y)) {
      const connectedPosKey = `${connected[0]}.${connected[1]}`;
      if (went.has(connectedPosKey))
        continue;
      went.add(connectedPosKey);
      newCurrentPosition.push(connected);
    }
  }
  if (!newCurrentPosition.length)
    break;
  ++amount;
  currentPosition = newCurrentPosition;
}
amount;

// part 2
map = document.body.innerText.trim().split('\n');
y = map.findIndex(line => line.indexOf('S') !== -1);
x = map[y].indexOf('S');
pipeConnection = {
  '|': [[0, 1], [0, -1]],
  '-': [[1, 0], [-1, 0]],
  L: [[0, -1], [1, 0]],
  J: [[0, -1], [-1, 0]],
  7: [[-1, 0], [0, 1]],
  F: [[1, 0], [0, 1]],
  '.': [],
  S: [[1, 0], [-1, 0], [0, 1], [0, -1]],
}
getConnectedPipe = (x, y) => {
  const output = pipeConnection[map[y][x]].filter(offset => {
    const targetPipeConnection = pipeConnection[map[y + offset[1]]?.[x + offset[0]]];
    if (!targetPipeConnection)
      return false;
    return targetPipeConnection.some(targetOffset => targetOffset[0] === -offset[0] && targetOffset[1] === -offset[1]);
  });
  return output.map(offset => [x + offset[0], y + offset[1]]);
}
findLoop = (x, y, xt, yt) => {
  const output = [[x, y]];
  while (map[yt]?.[xt] !== 'S') {
    let result = getConnectedPipe(xt, yt).filter(newPos => !(newPos[0] === x && newPos[1] === y));
    if (!result.length)
      return [];
    output.push([xt, yt]);
    [x, y, xt, yt] = [xt, yt, result[0][0], result[0][1]];
  }
  return output;
  // if (map[yt]?.[xt] === 'S')
  //   return [[x, y]];
  // let result = getConnectedPipe(xt, yt).filter(newPos => !(newPos[0] === x && newPos[1] === y));
  // if (!result.length)
  //   return [];
  // result = findLoop(xt, yt, result[0][0], result[0][1]);
  // if (!result.length)
  //   return [];
  // return [[x, y], ...result];
}
loop = getConnectedPipe(x, y).reduce((acc, target) => acc || findLoop(x, y, target[0], target[1]), null);
rotations = {
  '10L': 1,
  '01L': -1,
  '10J': -1,
  '01J': 1,
  '107': 1,
  '017': -1,
  '10F': -1,
  '01F': 1,
}
isRightInner = loop.reduce((acc, pos, index, arr) => {
  const type = map[pos[1]][pos[0]];
  if (!index || 'LJ7F'.indexOf(type) === -1)
    return acc;
  const last = arr[index - 1];
  return acc + rotations[`${Math.abs(last[0] - pos[0])}${Math.abs(last[1] - pos[1])}${type}`];
}, 0) >= 0;
wall = new Set(loop.map(pos => `${pos[0]}.${pos[1]}`));
fillInner = (x, y, inner) => {
  const posKey = `${x}.${y}`;
  if (wall.has(posKey) || inner.has(posKey))
    return;
  inner.add(posKey);
  fillInner(x + 1, y, inner);
  fillInner(x - 1, y, inner);
  fillInner(x, y + 1, inner);
  fillInner(x, y - 1, inner);
}
resolveInner = {
  '|.0.1': [[isRightInner ? -1 : 1, 0]],
  '|.0.-1': [[isRightInner ? 1 : -1, 0]],
  '-.1.0': [[0, isRightInner ? 1 : -1]],
  '-.-1.0': [[0, isRightInner ? -1 : 1]],
  'L.0.1': isRightInner ? [[-1, 0], [0, 1]] : [],
  'L.-1.0': isRightInner ? [] : [[-1, 0], [0, 1]],
  'J.0.1': isRightInner ? [] : [[1, 0], [0, 1]],
  'J.1.0': isRightInner ? [[1, 0], [0, 1]] : [],
  '7.1.0': isRightInner ? [] : [[1, 0], [0, -1]],
  '7.0.-1': isRightInner ? [[1, 0], [0, -1]] : [],
  'F.-1.0': isRightInner ? [[-1, 0], [0, -1]] : [],
  'F.0.-1': isRightInner ? [] : [[-1, 0], [0, -1]],
};
loop.reduce((inner, pos, index, arr) => {
  if (!index)
    return inner;
  const type = map[pos[1]][pos[0]];
  const offsets = resolveInner[`${type}.${pos[0] - arr[index - 1][0]}.${pos[1] - arr[index - 1][1]}`];
  for (const offset of offsets)
    fillInner(pos[0] + offset[0], pos[1] + offset[1], inner);
  return inner;
}, new Set).size;
