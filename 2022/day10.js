// part 1
ops = document.body.innerText.trim().split('\n').map(line => {
  const [type, amount] = line.split(' ');
  return [type, +amount];
});
cycle = 1;
x = 1;
currentOp = null;
signalStrength = 0;
for (; ops.length || currentOp; ++cycle) {
  [20, 60, 100, 140, 180, 220].forEach(targetCycle => {
    if (targetCycle !== cycle) return;
    signalStrength += targetCycle * x;
  });
  if (currentOp !== null) {
    const [opCycle, [type, amount]] = currentOp;
    if (type !== 'addx') throw type;
    if (cycle - opCycle + 1 === 2) {
      currentOp = null;
      x += amount;
    }
    continue;
  }
  const op = ops.shift();
  if (op[0] === 'noop') continue;
  currentOp = [cycle, op];
}
signalStrength;



// part 2
ops = document.body.innerText.trim().split('\n').map(line => {
  const [type, amount] = line.split(' ');
  return [type, +amount];
});
runOps = function* (ops) {
  let cycle = 1;
  let x = 1;
  let currentOp = null;
  for (; ops.length || currentOp; ++cycle) {
    yield [cycle, x];
    if (currentOp !== null) {
      const [opCycle, [type, amount]] = currentOp;
      if (type !== 'addx') throw type;
      if (cycle - opCycle + 1 === 2) {
        currentOp = null;
        x += amount;
      }
      continue;
    }
    const op = ops.shift();
    if (op[0] === 'noop') continue;
    currentOp = [cycle, op];
  }
}
screen = [];
for (let [cycle, x] of runOps(ops)) {
  cycle -= 1;
  const line = screen[Math.floor(cycle / 40)] ??= [];
  const cursorPosition = cycle % 40;
  line.push(cursorPosition >= x - 1 && cursorPosition <= x + 1 ? '#' : ' ');
}
console.log(screen.map(line => line.join('')).join('\n'));
