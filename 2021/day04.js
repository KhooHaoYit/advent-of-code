// part 1
[draws, ...boards] = document.body.innerText.trim().split('\n\n');
draws = draws.split(',').map(num => +num);
boards = boards.map(board => {
  board = board.split('\n').map(line => line.match(/\d+/g).map(num => +num));
  return { board, marked: board.map(line => line.map(() => false)) };
});

checkWin = board => {
  for (const line of board.marked) {
    const result = line.reduce((result, val) => result && val);
    if (result) return true;
  }
  for (const index in board.marked[0]) {
    const result = board.marked.map(line => line[index])
      .reduce((result, val) => result && val);
    if (result) return true;
  }
  return false;
}

markNumber = (board, val) => {
  for (const indexY in board.board) {
    const line = board.board[indexY];
    for (const indexX in line) {
      const value = line[indexX];
      if (value !== val) continue;
      board.marked[indexY][indexX] = true;
    }
  }
}

calculateScore = ([board, draw]) => {
  const sumUnmarked = board.board.reduce((sum, line, indexY) => {
    const lineMask = board.marked[indexY];
    sum += line.reduce((sum, num, indexX) => {
      if (lineMask[indexX]) return sum;
      sum += num;
      return sum;
    }, 0);
    return sum;
  }, 0);
  return sumUnmarked * draw;
}

result = null;
loop: for (const draw of draws) {
  for (const board of boards) {
    markNumber(board, draw);
    if (!checkWin(board)) continue;
    result = [board, draw];
    break loop;
  }
}

calculateScore(result);



// part 2
[draws, ...boards] = document.body.innerText.trim().split('\n\n');
draws = draws.split(',').map(num => +num);
boards = boards.map(board => {
  board = board.split('\n').map(line => line.match(/\d+/g).map(num => +num));
  return { board, marked: board.map(line => line.map(() => false)) };
});

checkWin = board => {
  for (const line of board.marked) {
    const result = line.reduce((result, val) => result && val);
    if (result) return true;
  }
  for (const index in board.marked[0]) {
    const result = board.marked.map(line => line[index])
      .reduce((result, val) => result && val);
    if (result) return true;
  }
  return false;
}

markNumber = (board, val) => {
  for (const indexY in board.board) {
    const line = board.board[indexY];
    for (const indexX in line) {
      const value = line[indexX];
      if (value !== val) continue;
      board.marked[indexY][indexX] = true;
    }
  }
}

calculateScore = ([board, draw]) => {
  const sumUnmarked = board.board.reduce((sum, line, indexY) => {
    const lineMask = board.marked[indexY];
    sum += line.reduce((sum, num, indexX) => {
      if (lineMask[indexX]) return sum;
      sum += num;
      return sum;
    }, 0);
    return sum;
  }, 0);
  return sumUnmarked * draw;
}

result = null;

loop: for (const draw of draws) {
  //isssue with for of loop while removing item inside
  for (const board of boards) {
    markNumber(board, draw);
    if (!checkWin(board)) continue;
    if (boards.length !== 1) {
      boards = boards.slice(0);
      boards.splice(boards.indexOf(board), 1);
      continue;
    }
    result = [board, draw];
    break loop;
  }
}

calculateScore(result);
