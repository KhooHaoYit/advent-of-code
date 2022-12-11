// part 1
ops = document.body.innerText.trim().split('\n').map(line => {
  const args = line.split(/:? (?:@ )?/);
  const id = +args[0].substring(1);
  const at = args[1].split(',').map(a => +a);
  const size = args[2].split('x').map(a => +a);
  return { id, at, size };
});
board = {};
for (const op of ops) {
  const { at: [atX, atY], size: [width, height] } = op;
  for (let x = atX; x < atX + width; ++x) {
    for (let y = atY; y < atY + height; ++y) {
      const key = `${x}.${y}`;
      if (!board[key]) board[key] = 0;
      ++board[key];
    }
  }
}
Object.values(board).filter(count => count >= 2).length;



// part 2
ops = document.body.innerText.trim().split('\n').map(line => {
  const args = line.split(/:? (?:@ )?/);
  const id = +args[0].substring(1);
  const at = args[1].split(',').map(a => +a);
  const size = args[2].split('x').map(a => +a);
  return { id, at, size };
});
board = {}, noOverlaps = [];
for (const op of ops) {
  const { id, at: [atX, atY], size: [width, height] } = op;
  noOverlaps.push(id);
  for (let x = atX; x < atX + width; ++x) {
    for (let y = atY; y < atY + height; ++y) {
      const key = `${x}.${y}`;
      if (!board[key]) board[key] = [];
      board[key].push(id);
      if (board[key].length !== 1) noOverlaps = noOverlaps.filter(val => board[key].indexOf(val) === -1);
    }
  }
}
noOverlaps[0];
