// part 1
input = document.body.innerText.trim().split('\n').map(line => JSON.parse(line));
calcMagnitude = pair => {
  const left = pair[0]?.length ? calcMagnitude(pair[0]) : pair[0];
  const right = pair[1]?.length ? calcMagnitude(pair[1]) : pair[1];
  return left * 3 + right * 2;
}
getPathExplode = (pair, depth = 0) => {
  if (typeof pair === 'number') return null;
  if (depth >= 4) return [];
  let shouldExplode = getPathExplode(pair[0], depth + 1);
  if (shouldExplode) return [0, ...shouldExplode];
  shouldExplode = getPathExplode(pair[1], depth + 1);
  if (shouldExplode) return [1, ...shouldExplode];
  return null;
}
access = (pair, path) => {
  for (const index of path) pair = pair[index];
  return pair;
}
getRightPath = (pair, path) => {
  while (path.at(-1) === 1) path.pop();
  if (!path.length) return null;
  path.pop();
  path.push(1);
  pair = access(pair, path);
  while (typeof pair !== 'number') {
    pair = pair[0];
    path.push(0);
  }
  return path;
}
getLeftPath = (pair, path) => {
  path = path.slice();
  while (path.at(-1) === 0) path.pop();
  if (!path.length) return null;
  path.pop();
  path.push(0);
  pair = access(pair, path);
  while (typeof pair !== 'number') {
    pair = pair[1];
    path.push(1);
  }
  return path;
}
add = (pair, path, amount) => {
  const parentPath = path.slice(0, path.length - 1);
  const target = path.at(-1);
  access(pair, parentPath)[target] += amount;
}
explode = pair => {
  const found = getPathExplode(pair);
  if (found === null) return false;
  const valPair = access(pair, found);
  const parentPath = found.slice(0, found.length - 1);
  const childPath = found.at(-1);
  access(pair, parentPath)[childPath] = 0;
  const leftPath = getLeftPath(pair, found);
  if (leftPath !== null) add(pair, leftPath, valPair[0]);
  const rightPath = getRightPath(pair, found);
  if (rightPath !== null) add(pair, rightPath, valPair[1]);
  return true;
}
getSplitPath = pair => {
  if (typeof pair === 'number') return pair >= 10 ? [] : null;
  let shouldSplit = getSplitPath(pair[0]);
  if (shouldSplit) return [0, ...shouldSplit];
  shouldSplit = getSplitPath(pair[1]);
  if (shouldSplit) return [1, ...shouldSplit];
  return null;
}
split = pair => {
  const found = getSplitPath(pair);
  if (found === null) return false;
  const parentPath = found.slice(0, found.length - 1);
  const childPath = found.at(-1);
  const value = access(pair, found);
  access(pair, parentPath)[childPath] = generateSplit(value);
  return true;
}
generateSplit = value => [Math.floor(value / 2), Math.ceil(value / 2)];
doMath = pair => {
  while (true) {
    if (explode(pair)) continue;
    if (split(pair)) continue;
    break;
  }
}
pair = input.shift();
while (input.length) {
  pair = [pair, input.shift()];
  doMath(pair);
}
calcMagnitude(pair);



// part 2
input = document.body.innerText.trim().split('\n').map(line => JSON.parse(line));
calcMagnitude = pair => {
  const left = pair[0]?.length ? calcMagnitude(pair[0]) : pair[0];
  const right = pair[1]?.length ? calcMagnitude(pair[1]) : pair[1];
  return left * 3 + right * 2;
}
getPathExplode = (pair, depth = 0) => {
  if (typeof pair === 'number') return null;
  if (depth >= 4) return [];
  let shouldExplode = getPathExplode(pair[0], depth + 1);
  if (shouldExplode) return [0, ...shouldExplode];
  shouldExplode = getPathExplode(pair[1], depth + 1);
  if (shouldExplode) return [1, ...shouldExplode];
  return null;
}
access = (pair, path) => {
  for (const index of path) pair = pair[index];
  return pair;
}
getRightPath = (pair, path) => {
  while (path.at(-1) === 1) path.pop();
  if (!path.length) return null;
  path.pop();
  path.push(1);
  pair = access(pair, path);
  while (typeof pair !== 'number') {
    pair = pair[0];
    path.push(0);
  }
  return path;
}
getLeftPath = (pair, path) => {
  path = path.slice();
  while (path.at(-1) === 0) path.pop();
  if (!path.length) return null;
  path.pop();
  path.push(0);
  pair = access(pair, path);
  while (typeof pair !== 'number') {
    pair = pair[1];
    path.push(1);
  }
  return path;
}
add = (pair, path, amount) => {
  const parentPath = path.slice(0, path.length - 1);
  const target = path.at(-1);
  access(pair, parentPath)[target] += amount;
}
explode = pair => {
  const found = getPathExplode(pair);
  if (found === null) return false;
  const valPair = access(pair, found);
  const parentPath = found.slice(0, found.length - 1);
  const childPath = found.at(-1);
  access(pair, parentPath)[childPath] = 0;
  const leftPath = getLeftPath(pair, found);
  if (leftPath !== null) add(pair, leftPath, valPair[0]);
  const rightPath = getRightPath(pair, found);
  if (rightPath !== null) add(pair, rightPath, valPair[1]);
  return true;
}
getSplitPath = pair => {
  if (typeof pair === 'number') return pair >= 10 ? [] : null;
  let shouldSplit = getSplitPath(pair[0]);
  if (shouldSplit) return [0, ...shouldSplit];
  shouldSplit = getSplitPath(pair[1]);
  if (shouldSplit) return [1, ...shouldSplit];
  return null;
}
split = pair => {
  const found = getSplitPath(pair);
  if (found === null) return false;
  const parentPath = found.slice(0, found.length - 1);
  const childPath = found.at(-1);
  const value = access(pair, found);
  access(pair, parentPath)[childPath] = generateSplit(value);
  return true;
}
generateSplit = value => [Math.floor(value / 2), Math.ceil(value / 2)];
doMath = pair => {
  while (true) {
    if (explode(pair)) continue;
    if (split(pair)) continue;
    break;
  }
  return pair;
}
results = [];
for (const index1 in input) {
  for (const index2 in input) {
    if (index1 === index2) continue;
    const result = doMath(JSON.parse(JSON.stringify([input[index1], input[index2]])));
    const mag = calcMagnitude(result);
    results.push([mag, result]);
  }
}
results.sort((a, b) => a[0] > b[0] ? -1 : 1);
