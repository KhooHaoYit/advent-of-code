// part 1
paths = document.body.innerText.trim().split('\n').map(line => {
  return line.split(' -> ')
    .map(pos => pos.split(',').map(a => +a));
});
drawLine = (board, path) => {
  let [x, y] = path.at(0);
  board[`${x}.${y}`] = 1;
  for (const [tx, ty] of path) {
    const xDiff = Math.sign(tx - x);
    const yDiff = Math.sign(ty - y);
    while (x !== tx || y !== ty) {
      x += xDiff;
      y += yDiff;
      board[`${x}.${y}`] = 1;
    }
  }
}

doSand = (board, x, y) => {
  for (; ;) {
    if (!board[`${x}.${y + 1}`]) {
      const belowCurrent = Object.keys(board).map(a =>
        a.split('.')
          .map(a => +a)
      ).filter(a => a[0] === x && a[1] > y);
      if (!belowCurrent.length) return false;
      ++y;
      continue;
    }
    if (!board[`${x - 1}.${y + 1}`]) {
      --x;
      ++y;
      continue;
    }
    if (!board[`${x + 1}.${y + 1}`]) {
      ++x;
      ++y;
      continue;
    }
    board[`${x}.${y}`] = 2;
    return [x, y];
  }
}

board = {};
paths.forEach(path => drawLine(board, path));

amount = 0;
while (doSand(board, 500, 0)) ++amount;
amount;



// part 2
paths = document.body.innerText.trim().split('\n').map(line => {
  return line.split(' -> ')
    .map(pos => pos.split(',').map(a => +a));
});
drawLine = (board, path) => {
  let [x, y] = path.at(0);
  board[`${x}.${y}`] = 1;
  for (const [tx, ty] of path) {
    const xDiff = Math.sign(tx - x);
    const yDiff = Math.sign(ty - y);
    while (x !== tx || y !== ty) {
      x += xDiff;
      y += yDiff;
      board[`${x}.${y}`] = 1;
    }
  }
}

doSand = (board, x, y, floorY) => {
  for (; ;) {
    if (y < floorY - 1) {
      if (!board[`${x}.${y + 1}`]) {
        ++y;
        continue;
      }
      if (!board[`${x - 1}.${y + 1}`]) {
        --x;
        ++y;
        continue;
      }
      if (!board[`${x + 1}.${y + 1}`]) {
        ++x;
        ++y;
        continue;
      }
    }
    board[`${x}.${y}`] = 2;
    return [x, y];
  }
}

board = {};
paths.forEach(path => drawLine(board, path));
floorY = Object.keys(board).map(pos => pos.split('.').map(a => +a)).sort((a, b) => a[1] > b[1] ? -1 : 1)[0][1] + 2;

amount = 0;
for (; !board[`500.0`]; ++amount)doSand(board, 500, 0, floorY);
amount;

