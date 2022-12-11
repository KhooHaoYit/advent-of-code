// part 1
[p1p, p2p] = document.body.innerText.trim().match(/\d+(?=\n|$)/g).map(n => +n);
makeDie = function* () {
  let at = 1;
  while (true) {
    yield at;
    ++at;
    if (at <= 100) continue;
    at = 1;
  }
}
die = makeDie();
roll = amount => {
  let sum = 0;
  while (amount--) sum += die.next().value;
  return sum;
}
positionToBoard = position => {
  const at = position % 10;
  return at ? at : 10;
}
p1s = 0, p2s = 0, totalRoll = 0;
while (true) {
  const p1r = roll(3);
  totalRoll += 3;
  p1p = positionToBoard(p1p + p1r);
  p1s += p1p;
  if (p1s >= 1000) break;
  const p2r = roll(3);
  totalRoll += 3;
  p2p = positionToBoard(p2p + p2r);
  p2s += p2p;
  if (p2s >= 1000) break;
}
[p1s, p2s].sort((a, b) => a > b ? 1 : -1)[0] * totalRoll;



// part 2
[p1p, p2p] = document.body.innerText.trim().match(/\d+(?=\n|$)/g).map(n => +n); // && [4, 8];
generateGrid = () => [...new Array(10)].map(line => [...new Array(10)].map(() => 0));
addArr = (a, b) => {
  for (const index in a) {
    a[index] += b[index];
  }
}
addGrid = (a, b) => {
  for (const index in a) {
    const al = a[index];
    const bl = b[index];
    addArr(al, bl);
  }
}
getCount = arr => arr.reduce((sum, val) => sum + val, 0);
getIndexCount = (arr, index) => arr.reduce((arr, val) => arr[index] + val, 0);
rollBoard = (amount, playerAtBoard = 1) => (playerAtBoard + amount) % 10 || 10;
rollP1Grid = function* (key, grid, amount) {
  const [p1, p2] = key.split('.').map(a => +a);
  for (const index in grid) {
    const line = grid[index];
    const count = getCount(line);
    if (!count) continue;
    const newBoardPos = rollBoard(+index, amount);
    const newGrid = generateGrid();
    addArr(newGrid[newBoardPos % 10], line);
    const newKey = `${p1 + newBoardPos}.${p2}`;
    yield [newKey, newGrid];
  }
}
rollP2Grid = function* (key, grid, amount) {
  const [p1, p2] = key.split('.').map(a => +a);
  for (const indexInner in grid[0]) {
    const newBoardPos = rollBoard(+indexInner, amount);
    const newGrid = generateGrid();
    let haveAtLeast1 = false;
    for (const index in grid) {
      const count = grid[index][indexInner];
      haveAtLeast1 |= count !== 0;
      newGrid[index][newBoardPos % 10] += count;
    }
    if (!haveAtLeast1) continue;
    const newKey = `${p1}.${p2 + newBoardPos}`;
    yield [newKey, newGrid];
  }
}
pruneBoard = (boards, winScore) => {
  const winners = [0, 0];
  for (const [key, board] of boards.entries()) {
    const count = board.reduce((sum, line) => sum + getCount(line), 0);
    if (!count) {
      boards.delete(key);
      continue;
    }
    const [p1s, p2s] = key.split('.').map(a => +a);
    const leadingScore = Math.max(p1s, p2s);
    if (leadingScore < winScore) continue;
    const index = [p1s, p2s].indexOf(leadingScore);
    winners[index] += count;
    boards.delete(key);
  }
  return winners;
}
generateRoll = function* () {
  for (let a = 1; a <= 3; ++a) {
    for (let b = 1; b <= 3; ++b) {
      for (let c = 1; c <= 3; ++c) {
        yield [a, b, c];
      }
    }
  }
}
globalBoards = new Map();
firstGrid = generateGrid();

firstGrid[p1p][p2p] = 1;
winTarget = 21;

globalBoards.set('0.0', firstGrid);
wins = [0, 0];
newBoards = new Map();

quantumRoll = () => {
  for (const [key, board] of globalBoards.entries()) {
    for (const [a, b, c] of generateRoll()) {
      const roll = a + b + c;
      for (const [newKey, newBoard] of rollP1Grid(key, board, roll)) {
        if (!newBoards.has(newKey)) newBoards.set(newKey, generateGrid());
        addGrid(newBoards.get(newKey), newBoard);
      }
    }
    addArr(wins, pruneBoard(newBoards, winTarget));
  }
  globalBoards.clear();
  [globalBoards, newBoards] = [newBoards, globalBoards];
  for (const [key, board] of globalBoards.entries()) {
    for (const [a, b, c] of generateRoll()) {
      const roll = a + b + c;
      for (const [newKey, newBoard] of rollP2Grid(key, board, roll)) {
        if (!newBoards.has(newKey)) newBoards.set(newKey, generateGrid());
        addGrid(newBoards.get(newKey), newBoard);
      }
    }
    addArr(wins, pruneBoard(newBoards, winTarget));
  }
  globalBoards.clear();
  [globalBoards, newBoards] = [newBoards, globalBoards];
}

while (globalBoards.size) quantumRoll();
wins.sort((a, b) => a > b ? -1 : 1)[0];
