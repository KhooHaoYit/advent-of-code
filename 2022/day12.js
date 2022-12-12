// part 1
map = document.body.innerText.trim().split('\n').map(line => line.split(''));
findPos = (map, type) => {
  for (let yIndex in map) {
    yIndex -= 0;
    const xIndex = map[yIndex].indexOf(type);
    if (xIndex === -1) continue;
    return [xIndex, yIndex];
  }
}
findPossibleRoute = (map, went, [x, y]) => {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ].filter(pos => {
    if (went.has(`${pos[0]}.${pos[1]}`)) return false;
    const newHeight = (map[pos[1]]?.[pos[0]] === 'E' ? 'z' : map[pos[1]]?.[pos[0]])?.charCodeAt(0);
    if (!newHeight) return false;
    const currentHeight = (map[y][x] === 'S' ? 'a' : map[y][x]).charCodeAt(0);
    if (newHeight - currentHeight > 1) return false;
    return true;
  });
}
// debugger;
startingPos = findPos(map, 'S');
finishPos = findPos(map, 'E');
went = new Set([`${startingPos[0]}.${startingPos[1]}`]);
currentRoutes = [startingPos];
step = 0;
for (; currentRoutes.length; ++step) {
  console.log(step, structuredClone(currentRoutes), currentRoutes.find(route => route[0] === finishPos[0] && route[1] === finishPos[1]));
  if (currentRoutes.find(route => route[0] === finishPos[0] && route[1] === finishPos[1])) break;
  for (const currentPos of currentRoutes.splice(0)) {
    const routes = findPossibleRoute(map, went, currentPos);
    for (const [x, y] of routes) {
      went.add(`${x}.${y}`);
    }
    currentRoutes.push(...routes);
  }
}
[step, currentRoutes.length];



// part 2
map = document.body.innerText.replace('S', 'a').trim().split('\n').map(line => line.split(''));
findPos = (map, type) => {
  for (let yIndex in map) {
    yIndex -= 0;
    const xIndex = map[yIndex].indexOf(type);
    if (xIndex === -1) continue;
    return [xIndex, yIndex];
  }
}
findPossibleRoute = (map, went, [x, y]) => {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ].filter(pos => {
    if (went.has(`${pos[0]}.${pos[1]}`)) return false;
    const newHeight = map[pos[1]]?.[pos[0]]?.charCodeAt(0);
    if (!newHeight) return false;
    const currentHeight = (map[y][x] === 'E' ? 'z' : map[y][x]).charCodeAt(0);
    if (currentHeight - newHeight > 1) return false;
    return true;
  });
}
// debugger;
startingPos = findPos(map, 'E');
went = new Set([`${startingPos[0]}.${startingPos[1]}`]);
currentRoutes = [startingPos];
step = 0;
for (; currentRoutes.length; ++step) {
  console.log(step, structuredClone(currentRoutes));
  if (currentRoutes.find(route => map[route[1]][route[0]] === 'a')) break;
  for (const currentPos of currentRoutes.splice(0)) {
    const routes = findPossibleRoute(map, went, currentPos);
    for (const [x, y] of routes) {
      went.add(`${x}.${y}`);
    }
    currentRoutes.push(...routes);
  }
}
[step, currentRoutes.length];
