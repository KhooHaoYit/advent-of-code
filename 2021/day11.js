// part 1
board = document.body.innerText.trim().split('\n').map(line => line.split('').map(c => +c));
neighbour = function* (board, x, y) {
  for (let xOffset = 3; xOffset--;) {
    const xAt = x + xOffset - 1;
    for (let yOffset = 3; yOffset--;) {
      if (xOffset === 1 && yOffset === 1) continue;
      const yAt = y + yOffset - 1;
      if (board[yAt]?.[xAt] === undefined) continue;
      yield [xAt, yAt];
    }
  }
}
step = board => {
  const queue = [];
  const reset = [];
  for (const y in board) {
    for (const x in board[y]) {
      queue.push([+x, +y]);
    }
  }
  while (queue.length) {
    const [x, y] = queue.pop();
    if (++board[y][x] !== 10) continue;
    //debugger;
    queue.push(...neighbour(board, x, y));
    reset.push([x, y]);
  }
  const lit = reset.length;
  for (const [x, y] of reset) {
    board[y][x] = 0;
  }
  return lit;
}
sum = 0;
for (let amount = 100; amount; --amount) {
  const lit = step(board);
  sum += lit;
  //  console.log(lit, JSON.parse(JSON.stringify(board)));
}
sum;



// part 2
board = document.body.innerText.trim().split('\n').map(line => line.split('').map(c => +c));
neighbour = function* (board, x, y) {
  for (let xOffset = 3; xOffset--;) {
    const xAt = x + xOffset - 1;
    for (let yOffset = 3; yOffset--;) {
      if (xOffset === 1 && yOffset === 1) continue;
      const yAt = y + yOffset - 1;
      if (board[yAt]?.[xAt] === undefined) continue;
      yield [xAt, yAt];
    }
  }
}
step = board => {
  const queue = [];
  const reset = [];
  for (const y in board) {
    for (const x in board[y]) {
      queue.push([+x, +y]);
    }
  }
  while (queue.length) {
    const [x, y] = queue.pop();
    if (++board[y][x] !== 10) continue;
    queue.push(...neighbour(board, x, y));
    reset.push([x, y]);
  }
  const lit = reset.length;
  for (const [x, y] of reset) {
    board[y][x] = 0;
  }
  return lit;
}
amount = 0;
while (true) {
  ++amount;
  const count = step(board);
  if (count === board.length * board[0].length) break;
}
amount;
