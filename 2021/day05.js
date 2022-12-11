// part 1
lines = document.body.innerText.trim().split('\n').map(line => {
  const [start, end] = line.split(' -> ').map(cord => {
    const [x, y] = cord.split(',');
    return { x: +x, y: +y };
  });
  return { start, end };
}).filter(line => {
  if (line.start.x === line.end.x) return true;
  if (line.start.y === line.end.y) return true;
  return false;
});
draw = (board, line) => {
  const [xSmall, xBig] = [line.start.x, line.end.x].sort((a, b) => a > b ? 1 : -1);
  const [ySmall, yBig] = [line.start.y, line.end.y].sort((a, b) => a > b ? 1 : -1);
  for (let indexX = xSmall; indexX <= xBig; ++indexX) {
    for (let indexY = ySmall; indexY <= yBig; ++indexY) {
      const key = `${indexX}.${indexY}`;
      if (!board[key]) board[key] = 0;
      ++board[key];
    }
  }
}
countOverlap = (board, threshold) => {
  let output = 0;
  for (const key in board) {
    if (board[key] < threshold) continue;
    ++output;
  }
  return output;
}
board = {};
for (const line of lines) {
  draw(board, line);
}
fillEmpty = (arr, func) => [...arr].map(func);
visualise = (board) => {
  let output = [];
  for (const [key, value] of Object.entries(board)) {
    const [x, y] = key.split('.');
    if (!output[y]) output[y] = [];
    output[y][x] = value;
  }
  output = fillEmpty(output, val => val ?? []).map(line => {
    return fillEmpty(line, val => val ?? '-');
  });
  return output.map(line => line.join(' ')).join('\n');
}
//console.log(visualise(board));
countOverlap(board, 2);



// part 2
lines = document.body.innerText.trim().split('\n').map(line => {
  const [start, end] = line.split(' -> ').map(cord => {
    const [x, y] = cord.split(',');
    return { x: +x, y: +y };
  });
  return { start, end };
})
draw = (board, line) => {
  const deltaX = Math.sign(line.end.x - line.start.x);
  const deltaY = Math.sign(line.end.y - line.start.y);
  for (let indexX = line.start.x, indexY = line.start.y;
    true;
    indexX += deltaX, indexY += deltaY) {
    const key = `${indexX}.${indexY}`;
    if (!board[key]) board[key] = 0;
    ++board[key];
    if (indexX == line.end.x && indexY == line.end.y) break;
  }
}
countOverlap = (board, threshold) => {
  let output = 0;
  for (const key in board) {
    if (board[key] < threshold) continue;
    ++output;
  }
  return output;
}
board = {};
for (const line of lines) {
  draw(board, line);
}
fillEmpty = (arr, func) => [...arr].map(func);
visualise = (board) => {
  let output = [];
  for (const [key, value] of Object.entries(board)) {
    const [x, y] = key.split('.');
    if (!output[y]) output[y] = [];
    output[y][x] = value;
  }
  output = fillEmpty(output, val => val ?? []).map(line => {
    return fillEmpty(line, val => val ?? '-');
  });
  return output.map(line => line.join(' ')).join('\n');
}
//console.log(visualise(board));
countOverlap(board, 2);
