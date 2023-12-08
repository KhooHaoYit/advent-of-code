// part 1
[directions, nodes] = document.body.innerText.trim().split('\n\n');
nodes = nodes.split('\n').reduce((nodes, line) => {
  const [currentNode, left, right] = line.split(/[^A-Z]+/g);
  nodes[currentNode] = [left, right];
  return nodes;
}, {});
amount = 0;
for (
  let currentNode = 'AAA', currentDirectionIndex = 0
  ; currentNode !== 'ZZZ'
  ; ++amount, ++currentDirectionIndex, currentDirectionIndex %= directions.length
) {
  const currentDirection = directions[currentDirectionIndex];
  currentNode = nodes[currentNode][currentDirection === 'L' ? 0 : 1];
}
amount;

// part 2
[directions, nodes] = document.body.innerText.trim().split('\n\n'); // document.body.innerText
nodes = nodes.split('\n').reduce((nodes, line) => {
  const [currentNode, left, right] = line.split(/[^A-Z0-9]+/g);
  nodes[currentNode] = [left, right];
  return nodes;
}, {});
globalFastMap = new Map
getZInterval = function* (currentNode) {
  const fastStep = new Map;
  globalFastMap.set(currentNode, fastStep)
  for (let currentDirectionIndex = 0; true;) {
    const currentFastStepKey = `${currentNode}.${currentDirectionIndex}`;
    if (fastStep.has(currentFastStepKey)) {
      const [stepAmount, newNode, newDirectionIndex] = fastStep.get(currentFastStepKey);
      yield stepAmount;
      currentNode = newNode;
      currentDirectionIndex = newDirectionIndex;
      continue;
    }
    let stepAmount = 0;
    for (; ;) {
      const currentDirection = directions[currentDirectionIndex];
      currentNode = nodes[currentNode][currentDirection === 'L' ? 0 : 1];
      ++stepAmount;
      ++currentDirectionIndex;
      currentDirectionIndex %= directions.length;
      if (currentNode[2] !== 'Z')
        continue;
      break;
    }
    yield stepAmount;
    fastStep.set(currentFastStepKey, [stepAmount, currentNode, currentDirectionIndex]);
  }
}
positions = Object.keys(nodes).filter(node => node[2] === 'A').map(node => {
  const gen = getZInterval(node);
  return [gen.next().value, gen];
});
// while (true) {
//   if (positions.every((pos, index, arr) => !index || arr[index - 1][0] === pos[0]))
//     break;
//   const minVal = Math.min(...positions.map(pos => pos[0]));
//   for (const pos of positions.filter(pos => pos[0] === minVal)) {
//     pos[0] += pos[1].next().value;
//   }
// }
positions.forEach(pos => pos[1].next());
gcd = (a, b) => {
  for (let temp = b; b !== 0;) {
    b = a % b;
    a = temp;
    temp = b;
  }
  return a;
}
lcm = (a, b) => {
  const gcdValue = gcd(a, b);
  return (a * b) / gcdValue;
}
[...globalFastMap.values()].map(a => a.values().next().value[0]).reduce((acc, val) => lcm(acc, val));
