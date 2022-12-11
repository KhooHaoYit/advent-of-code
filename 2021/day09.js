// part 1
board = document.body.innerText.trim().split('\n').map(line => line.split('').map(c => +c));
output = 0;
for (let y in board) {
  y -= 0;
  for (let x in board[y]) {
    x -= 0;
    const current = board[y][x];
    if (board[y - 1]?.[x] !== undefined && current >= board[y - 1][x]) continue;
    if (board[y + 1]?.[x] !== undefined && current >= board[y + 1][x]) continue;
    if (board[y]?.[x - 1] !== undefined && current >= board[y][x - 1]) continue;
    if (board[y]?.[x + 1] !== undefined && current >= board[y][x + 1]) continue;
    console.log(current, board[y - 1]?.[x], board[y + 1]?.[x], board[y][x - 1], board[y][x + 1]);
    output += current + 1;
  }
}
output;



// part 2
board = document.body.innerText.trim().split('\n').map(line => line.split('').map(c => +c));
output = [];
checkExistsAndSmaller = (board, x, y, current, marked) => {
  const key = `${x}.${y}`;
  if (!marked.has(key) && board[y]?.[x] !== undefined && board[y]?.[x] !== 9 && current < board[y][x]) {
    marked.add(key);
    return true;
  }
  return false;
}
getLarger = function* (board, x, y, marked) {
  const current = board[y][x];
  if (checkExistsAndSmaller(board, x, y + 1, current, marked)) yield [x, y + 1];
  if (checkExistsAndSmaller(board, x, y - 1, current, marked)) yield [x, y - 1];
  if (checkExistsAndSmaller(board, x + 1, y, current, marked)) yield [x + 1, y];
  if (checkExistsAndSmaller(board, x - 1, y, current, marked)) yield [x - 1, y];
}
evaluateSize = (board, x, y) => {
  let output = 0;
  const queue = [[x, y]];
  const marked = new Set();
  while (queue.length) {
    output += queue.length;
    for (const [cx, cy] of queue.splice(0)) {
      queue.push(...getLarger(board, cx, cy, marked));
    }
  }
  return output;
}
for (let y in board) {
  y -= 0;
  for (let x in board[y]) {
    x -= 0;
    const current = board[y][x];
    if (board[y - 1]?.[x] !== undefined && current >= board[y - 1][x]) continue;
    if (board[y + 1]?.[x] !== undefined && current >= board[y + 1][x]) continue;
    if (board[y]?.[x - 1] !== undefined && current >= board[y][x - 1]) continue;
    if (board[y]?.[x + 1] !== undefined && current >= board[y][x + 1]) continue;
    //debugger;
    output.push(evaluateSize(board, x, y));
  }
}
[t1, t2, t3] = output.sort((a, b) => a > b ? -1 : 1);
t1 * t2 * t3;
