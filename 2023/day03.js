// part 1
numbers = [];
symbols = [];
document.body.innerText.trim().split('\n').forEach((line, y) => {
  for (const found of line.matchAll(/\d+/g)) {
    numbers.push([+found[0], [found.index, y]]);
  }
  for (const found of line.matchAll(/[^\d.]/g)) {
    symbols.push([found[0], [found.index, y]]);
  }
});
numbers.filter(number => {
  const [nx, ny] = number[1];
  const nLength = number[0].toString().length;
  for (const symbol of symbols) {
    const [sx, sy] = symbol[1];
    if (Math.abs(ny - sy) > 1)
      continue;
    if (sx < nx - 1 || sx > nx + nLength)
      continue;
    return true;
  }
  return false;
}).reduce((acc, val) => acc + val[0], 0);

// part 2
numbers = [];
gears = [];
document.body.innerText.trim().split('\n').forEach((line, y) => {
  for (const found of line.matchAll(/\d+/g)) {
    numbers.push([+found[0], [found.index, y]]);
  }
  for (const found of line.matchAll(/\*/g)) {
    gears.push([found[0], [found.index, y]]);
  }
});
gears.map(gear => {
  const [gx, gy] = gear[1];
  const nearbyNumbers = numbers.filter(number => {
    const [nx, ny] = number[1];
    const nLength = number[0].toString().length;
    if (Math.abs(ny - gy) > 1)
      return false;
    if (gx < nx - 1 || gx > nx + nLength)
      return false;
    return true;
  });
  return nearbyNumbers;
}).reduce((acc, val) => {
  if(val.length === 2)
    acc += val[0][0] * val[1][0];
  return acc;
}, 0);
