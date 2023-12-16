// part 1
map = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`;
map = document.body.innerText;
map = map.trim().split('\n').map(line => line.split(''));
getSlideAmount = (checkIfPossible) => {
  for (let amount = 1, rockAmount = 0; ; ++amount) {
    const [possible, type] = checkIfPossible(amount);
    if (type === 'O')
      ++rockAmount;
    if (possible)
      continue;
    return amount - 1 - rockAmount;
  }
}
rocksPos = map.map((line, y) => line.map((type, x) => type === 'O' ? [[x, y]] : []).flat()).flat()
rocksPos.reduce((acc, [x, y]) => {
  const amount = getSlideAmount(amount => [map[y - amount]?.[x] && map[y - amount][x] !== '#', map[y - amount]?.[x]]);
  acc += map.length - (y - amount);
  return acc;
}, 0);

// part 2
map = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`;
// map = document.body.innerText;
map = map.trim().split('\n').map(line => line.split(''));
getSlideAmount = checkIfPossible => {
  for (let amount = 1, rockAmount = 0; ; ++amount) {
    const [possible, type] = checkIfPossible(amount);
    if (type === 'O')
      ++rockAmount;
    if (possible)
      continue;
    return amount - 1 - rockAmount;
  }
}
rocksPos = map.map((line, y) => line.map((type, x) => type === 'O' ? [[x, y]] : []).flat()).flat();
rollUp = rocksPos => rocksPos.map(([x, y]) => {
  const amount = getSlideAmount(amount => [map[y - amount]?.[x] && map[y - amount][x] !== '#', rocksPos.find(([rx, ry]) => rx === x && ry === y - amount) ? 'O' : '.']);
  return [x, y - amount];
});
rollDown = rocksPos => rocksPos.map(([x, y]) => {
  const amount = getSlideAmount(amount => [map[y + amount]?.[x] && map[y + amount][x] !== '#', rocksPos.find(([rx, ry]) => rx === x && ry === y + amount) ? 'O' : '.']);
  return [x, y + amount];
});
rollLeft = rocksPos => rocksPos.map(([x, y]) => {
  const amount = getSlideAmount(amount => [map[y][x - amount] && map[y][x - amount] !== '#', rocksPos.find(([rx, ry]) => rx === x - amount && ry === y) ? 'O' : '.']);
  return [x - amount, y];
});
rollRight = rocksPos => rocksPos.map(([x, y]) => {
  const amount = getSlideAmount(amount => [map[y][x + amount] && map[y][x + amount] !== '#', rocksPos.find(([rx, ry]) => rx === x + amount && ry === y) ? 'O' : '.']);
  return [x + amount, y];
});
spin = rocksPos => rollRight(rollDown(rollLeft(rollUp(rocksPos))));
mapCache = new Map;
calcCacheKey = rocksPos => rocksPos.sort((r1, r2) => Math.sign(r1[0] - r2[0]) || Math.sign(r1[1] - r2[1])).map(pos => pos.join('.')).join(',');
doSpin = (beforeCacheKey) => {
  beforeCacheKey ||= calcCacheKey(rocksPos);
  rocksPos = spin(rocksPos);
  if (mapCache.has(beforeCacheKey))
    return mapCache.get(beforeCacheKey);
  const afterCacheKey = calcCacheKey(rocksPos);
  mapCache.set(beforeCacheKey, afterCacheKey);
  return afterCacheKey;
}
// console.log(map.map((line, y) => line.map((type, x) => type === '#' ? type : rocksPos.find(([rx, ry]) => rx === x && ry === y) ? 'O' : '.').join('')).join('\n'));
cacheKey = null;
doCycleJump = false;
console.time();
for (let amount = 1000000000; amount; --amount) {
  console.log('did spin');
  cacheKey = doSpin(cacheKey);
  if (mapCache.has(cacheKey) && !doCycleJump) {
    let cycleAmount = 1;
    for (let currentCacheKey = cacheKey; ; ++cycleAmount) {
      currentCacheKey = mapCache.get(currentCacheKey);
      if (currentCacheKey !== cacheKey)
        continue;
      break;
    }
    amount %= cycleAmount;
    doCycleJump = true;
  }
}
console.timeEnd();
rocksPos.reduce((acc, [x, y]) => {
  acc += map.length - y;
  return acc;
}, 0);
