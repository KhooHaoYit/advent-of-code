// part 1
map = String.raw`
.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....
`;
map = document.body.innerText;
map = map.trim().split('\n').map(line => line.split(''));
walk = callback => {
  const queue = [[0, 0, 0]]; // right bottom left top
  while (queue.length) {
    const [x, y, directionType] = queue.pop();
    const nextTiles = callback(x, y, directionType)
      .filter(([x, y]) => {
        if (x < 0 || x >= map[0].length || y < 0 || y >= map.length)
          return false;
        return true;
      });
    queue.push(...nextTiles);
  }
}
energizedTiles = new Set;
went = new Set;
walk((x, y, directionType) => {
  const wentKey = `${x}.${y}.${directionType}`;
  if (went.has(wentKey))
    return [];
  went.add(wentKey);
  energizedTiles.add(`${x}.${y}`);
  const tileType = map[y][x];
  switch (tileType) {
    case '.': {
      switch (directionType) {
        case 0: ++x; break;
        case 1: ++y; break;
        case 2: --x; break;
        case 3: --y; break;
      }
      return [[x, y, directionType]];
    } break;
    case '/': {
      switch (directionType) {
        case 0: directionType = 3; --y; break;
        case 1: directionType = 2; --x; break;
        case 2: directionType = 1; ++y; break;
        case 3: directionType = 0; ++x; break;
      }
      return [[x, y, directionType]];
    } break;
    case '\\': {
      switch (directionType) {
        case 0: directionType = 1; ++y; break;
        case 1: directionType = 0; ++x; break;
        case 2: directionType = 3; --y; break;
        case 3: directionType = 2; --x; break;
      }
      return [[x, y, directionType]];
    } break;
    case '-': {
      switch (directionType) {
        case 0: ++x; break;
        case 2: --x; break;
        case 1:
        case 3: {
          return [[x + 1, y, 0], [x - 1, y, 2]];
        } break;
      }
      return [[x, y, directionType]];
    } break;
    case '|': {
      switch (directionType) {
        case 1: ++y; break;
        case 3: --y; break;
        case 0:
        case 2: {
          return [[x, y + 1, 1], [x, y - 1, 3]];
        } break;
      }
      return [[x, y, directionType]];
    } break;
  }
  return [];
});
energizedTiles.size;

// part 2
map = String.raw`
.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....
`;
map = document.body.innerText;
map = map.trim().split('\n').map(line => line.split(''));
walk = (queue, callback) => {
  queue ??= [[0, 0, 0]]; // right bottom left top
  while (queue.length) {
    const [x, y, directionType] = queue.pop();
    const nextTiles = callback(x, y, directionType)
      .filter(([x, y]) => {
        if (x < 0 || x >= map[0].length || y < 0 || y >= map.length)
          return false;
        return true;
      });
    queue.push(...nextTiles);
  }
}
getEnergizedCount = (x, y, directionType) => {
  const energizedTiles = new Set;
  const went = new Set;
  walk([[x, y, directionType]], (x, y, directionType) => {
    const wentKey = `${x}.${y}.${directionType}`;
    if (went.has(wentKey))
      return [];
    went.add(wentKey);
    energizedTiles.add(`${x}.${y}`);
    const tileType = map[y][x];
    switch (tileType) {
      case '.': {
        switch (directionType) {
          case 0: ++x; break;
          case 1: ++y; break;
          case 2: --x; break;
          case 3: --y; break;
        }
        return [[x, y, directionType]];
      } break;
      case '/': {
        switch (directionType) {
          case 0: directionType = 3; --y; break;
          case 1: directionType = 2; --x; break;
          case 2: directionType = 1; ++y; break;
          case 3: directionType = 0; ++x; break;
        }
        return [[x, y, directionType]];
      } break;
      case '\\': {
        switch (directionType) {
          case 0: directionType = 1; ++y; break;
          case 1: directionType = 0; ++x; break;
          case 2: directionType = 3; --y; break;
          case 3: directionType = 2; --x; break;
        }
        return [[x, y, directionType]];
      } break;
      case '-': {
        switch (directionType) {
          case 0: ++x; break;
          case 2: --x; break;
          case 1:
          case 3: {
            return [[x + 1, y, 0], [x - 1, y, 2]];
          } break;
        }
        return [[x, y, directionType]];
      } break;
      case '|': {
        switch (directionType) {
          case 1: ++y; break;
          case 3: --y; break;
          case 0:
          case 2: {
            return [[x, y + 1, 1], [x, y - 1, 3]];
          } break;
        }
        return [[x, y, directionType]];
      } break;
    }
    return [];
  });
  return energizedTiles.size;
}
[
  ...map.map((list, y) => [
    getEnergizedCount(0, y, 0),
    getEnergizedCount(list.length - 1, y, 2),
  ]).flat(),
  ...map[0].map((_, x) => [
    getEnergizedCount(x, 0, 1),
    getEnergizedCount(x, map.length - 1, 3),
  ]).flat(),
].sort((a, b) => a > b ? -1 : 1)[0];
