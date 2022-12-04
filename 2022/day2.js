// part 1
actionMapper = {
  A: { // rock
    Z: 3 + 0, // sisor
    Y: 2 + 6, // paper
    X: 1 + 3, // rock
  },
  B: { // paper
    Z: 3 + 6, // sisor
    Y: 2 + 3, // paper
    X: 1 + 0, // rock
  },
  C: { // sisor
    Z: 3 + 3, // sisor
    Y: 2 + 0, // paper
    X: 1 + 6, // rock
  },
}

// part 2
actionMapper = {
  A: { // rock
    X: 3 + 0, // lose
    Y: 1 + 3, // draw
    Z: 2 + 6, // win
  },
  B: { // paper
    X: 1 + 0,
    Y: 2 + 3,
    Z: 3 + 6,
  },
  C: { // sisor
    X: 2 + 0,
    Y: 3 + 3,
    Z: 1 + 6,
  },
}
// Z: 3 + 0, // sisor
// Y: 2 + 6, // paper
// X: 1 + 3, // rock
//
a = document.body.innerText.trim().split('\n').reduce((acc, line) => {
  const [opponent, me] = line.split(' ');
  return acc + actionMapper[opponent][me];
}, 0);
