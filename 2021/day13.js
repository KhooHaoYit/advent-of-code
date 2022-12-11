// part 1
[dots, ops] = document.body.innerText.trim().split('\n\n');
dots = dots.split('\n').map(line => {
  const [x, y] = line.split(',').map(num => +num);
  return { x, y };
});
ops = ops.split('\n').map(line => {
  const [, , location] = line.split(' ');
  const [axis, at] = location.split('=');
  return { axis, at: +at };
});
fold = (board, axis, at) => {
  const output = {};
  for (const key of Object.keys(board)) {
    let [x, y] = key.split('.').map(c => +c);
    if (axis === 'x' && x >= at) x = at - (x - at);
    if (axis === 'y' && y >= at) y = at - (y - at);
    const newAt = `${x}.${y}`;
    output[newAt] = true;
  }
  return output;
}
buildBoard = dots => {
  const output = {};
  for (const { x, y } of dots) {
    const key = `${x}.${y}`;
    output[key] = true;
  }
  return output;
}
board = buildBoard(dots);
board = fold(board, ops[0].axis, ops[0].at);
Object.keys(board).length;



// part 1
[dots, ops] = document.body.innerText.trim().split('\n\n');
dots = dots.split('\n').map(line => {
  const [x, y] = line.split(',').map(num => +num);
  return { x, y };
});
ops = ops.split('\n').map(line => {
  const [, , location] = line.split(' ');
  const [axis, at] = location.split('=');
  return { axis, at: +at };
});
fold = (board, axis, at) => {
  const output = {};
  for (const key of Object.keys(board)) {
    let [x, y] = key.split('.').map(c => +c);
    if (axis === 'x' && x >= at) x = at - (x - at);
    if (axis === 'y' && y >= at) y = at - (y - at);
    const newAt = `${x}.${y}`;
    output[newAt] = true;
  }
  return output;
}
buildBoard = dots => {
  const output = {};
  for (const { x, y } of dots) {
    const key = `${x}.${y}`;
    output[key] = true;
  }
  return output;
}
board = buildBoard(dots);
for (const { axis, at } of ops) {
  board = fold(board, axis, at);
}
[bx, by] = Object.keys(board).reduce((biggest, key) => {
  const [x, y] = key.split('.').map(c => +c);
  if (x > biggest[0]) biggest[0] = x;
  if (y > biggest[1]) biggest[1] = y;
  return biggest;
}, [0, 0]);
visual = [];
for (let oy = 0; oy <= by; ++oy) {
  const line = [];
  for (let ox = 0; ox <= bx; ++ox) {
    const key = `${ox}.${oy}`;
    line.push(board[key] ? '#' : ' ');
  }
  visual.push(line.join(''));
}
console.log(visual.join('\n'));
