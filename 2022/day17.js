// part 1
jetPattern = document.body.innerText.trim().split('');

jetPatternGenerator = (function* () {
  while (true) yield* jetPattern;
})();

rockGenerator = (function* () {
  while (true) {
    yield [1, [0, 0], [1, 0], [2, 0], [3, 0]];
    yield [3, [1, 0], [0, 1], [1, 1], [2, 1], [1, 2]];
    yield [3, [0, 0], [1, 0], [2, 0], [2, 1], [2, 2]];
    yield [4, [0, 0], [0, 1], [0, 2], [0, 3]];
    yield [2, [0, 0], [1, 0], [0, 1], [1, 1]];
  }
})();

checkCanPush = (chamber, shapes, x, y, dx, dy) => {
  for (const [ox, oy] of shapes) {
    const newX = x + ox + dx;
    const newY = y + oy + dy;
    if (chamber[`${newX}.${newY}`]) return false;
    if (newY < 0) return false;
    if (newX < 0) return false;
    if (newX >= 7) return false;
  }
  return true;
}

chamber = {};
chamberTop = 0;
for (let amount = 2022; amount; --amount) {
  const [height, ...shapes] = rockGenerator.next().value;
  let x = 3 - 1;
  let y = chamberTop + 3;
  while (true) {
    const dx = jetPatternGenerator.next().value === '<' ? -1 : 1;
    if (checkCanPush(chamber, shapes, x, y, dx, 0)) x += dx;
    if (!checkCanPush(chamber, shapes, x, y, 0, -1)) break;
    y -= 1;
  }
  for (const [ox, oy] of shapes) {
    const px = x + ox;
    const py = y + oy;
    chamber[`${px}.${py}`] = 1;
    if (py >= chamberTop) chamberTop = py + 1;
  }
}
chamberTop;

// a = Array(15).fill().map((_, iy, arr) => Array(7).fill().map((_, ix) => chamber[`${ix}.${arr.length - iy - 1}`] ? '#' : ' ').join('')).join('\n');
// console.log(a);



// part 2
