// part 1
board = document.body.innerText.trim().split('\n').map(line => {
  return line.split('').map(c => +c);
});
generateValidPath = function* (board, x, y) {
  if (board[y]?.[x + 1] !== undefined) yield [x + 1, y];
  if (board[y]?.[x - 1] !== undefined) yield [x - 1, y];
  if (board[y + 1]?.[x] !== undefined) yield [x, y + 1];
  if (board[y - 1]?.[x] !== undefined) yield [x, y - 1];
}
generateNewPath = function* (board, went, x, y, risk) {
  for (const [atX, atY] of generateValidPath(board, x, y)) {
    const newRisk = board[atY][atX] + risk;
    const key = `${atX}.${atY}`;
    const lastRisk = went.get(key) ?? Infinity;
    if (newRisk >= lastRisk) continue;
    went.set(key, newRisk);
    yield [atX, atY, newRisk];
  }
}
paths = [[0, 0, 0]]; //x, y, risk
//debugger;
went = new Map([['0.0', 0]]);
while (paths[0][0] !== board[0].length - 1 || paths[0][1] !== board.length - 1) {
  paths.push(...generateNewPath(board, went, ...paths.shift()));
  paths = paths.sort((a, b) => a[2] > b[2] ? 1 : -1);
}
paths[0];



// part 2
map = document.body.innerText.trim().split('\n').map(line => {
  return line.split('').map(c => +c);
});
addRisk = (risk, amount) => {
  let newRisk = risk + amount;
  while (newRisk >= 10) {
    newRisk = newRisk % 10 + Math.floor(newRisk / 10);
  }
  return newRisk;
}
board = [];
for (let yo = 0; yo < 5; ++yo) {
  for (const line of map) {
    const newLine = [];
    for (let xo = 0; xo < 5; ++xo) {
      for (const risk of line) {
        let newRisk = addRisk(risk, yo + xo);
        newLine.push(newRisk);
      }
    }
    board.push(newLine);
  }
}
generateValidPath = function* (board, x, y) {
  if (board[y]?.[x + 1] !== undefined) yield [x + 1, y];
  if (board[y]?.[x - 1] !== undefined) yield [x - 1, y];
  if (board[y + 1]?.[x] !== undefined) yield [x, y + 1];
  if (board[y - 1]?.[x] !== undefined) yield [x, y - 1];
}
generateNewPath = function* (board, went, x, y, risk) {
  for (const [atX, atY] of generateValidPath(board, x, y)) {
    const newRisk = board[atY][atX] + risk;
    const key = `${atX}.${atY}`;
    const lastRisk = went.get(key) ?? Infinity;
    if (newRisk >= lastRisk) continue;
    went.set(key, newRisk);
    yield [atX, atY, newRisk];
  }
}
paths = [[0, 0, 0]]; //x, y, risk
//debugger;
went = new Map([['0.0', 0]]);
while (paths[0][0] !== board[0].length - 1 || paths[0][1] !== board.length - 1) {
  paths.push(...generateNewPath(board, went, ...paths.shift()));
  paths = paths.sort((a, b) => a[2] > b[2] ? 1 : -1);
}
paths[0];
