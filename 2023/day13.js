// part 1
maps = `

`;
maps = document.body.innerText;
maps = maps.trim().split('\n\n').map(map => map.split('\n').map(line => line.split('')));
findReflection = (width, height, getNode) => {
  outer: for (let x = 1; x < width; ++x) {
    for (let offset = 0; offset < Math.min(x, width - x); ++offset) {
      for (let y = 0; y < height; ++y) {
        if (getNode(x - 1 - offset, y) !== getNode(x + offset, y))
          continue outer;
      }
    }
    return x;
  }
  return null;
}
getMapReflection = map => [
  findReflection(map[0].length, map.length, (x, y) => map[y][x]),
  findReflection(map.length, map[0].length, (x, y) => map[x][y]),
]
maps.reduce((acc, map) => {
  const [xReflexIndex, yReflexIndex] = getMapReflection(map);
  acc += xReflexIndex ? xReflexIndex : yReflexIndex * 100;
  return acc;
}, 0);

// part 2
maps = `

`;
maps = document.body.innerText;
maps = maps.trim().split('\n\n').map(map => map.split('\n').map(line => line.split('')));
findReflection = (width, height, getNode) => {
  outer: for (let x = 1; x < width; ++x) {
    let isFixed = false;
    for (let offset = 0; offset < Math.min(x, width - x); ++offset) {
      for (let y = 0; y < height; ++y) {
        if (getNode(x - 1 - offset, y) !== getNode(x + offset, y)) {
          if (isFixed)
            continue outer;
          isFixed = true;
        }
      }
    }
    if (!isFixed)
      continue;
    return x;
  }
  return null;
}
getMapReflection = map => [
  findReflection(map[0].length, map.length, (x, y) => map[y][x]),
  findReflection(map.length, map[0].length, (x, y) => map[x][y]),
]
maps.reduce((acc, map) => {
  const [xReflexIndex, yReflexIndex] = getMapReflection(map);
  acc += xReflexIndex ? xReflexIndex : yReflexIndex * 100;
  return acc;
}, 0);
