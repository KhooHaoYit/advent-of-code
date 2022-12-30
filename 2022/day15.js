// part 1
input = document.body.innerText.trim().split('\n').map(line => {
  const [sx, sy, bx, by] = line.match(/-?\d+/g).map(a => +a);
  return [sx, sy, bx, by];
});

generateLine = (input, ty) => {
  const line = {};
  for (const [x, y, bx, by] of input) {
    if (y === ty) line[x] = 2;
    if (by === ty) line[by] = 3;
    const distance = Math.abs(bx - x) + Math.abs(by - y);
    const effectiveDistance = distance - Math.abs(ty - y);
    if (effectiveDistance < 0) continue;
    for (let amount = effectiveDistance * 2 + 1; amount--;) {
      if (line[x - effectiveDistance + amount]) continue;
      line[x - effectiveDistance + amount] = 1;
    }
  }
  return line;
}

Object.entries(generateLine(input, 2000000))
  .map(([x, type]) => [+x, type])
  .filter(([x, type]) => type === 1)
  .length;




// part 2
input = document.body.innerText.trim().split('\n').map(line => {
  const [sx, sy, bx, by] = line.match(/-?\d+/g).map(a => +a);
  return [sx, sy, bx, by];
});

generateLine = (input, ty) => {
  const occupied = [];
  for (const [x, y, bx, by] of input) {
    if (y === ty) occupied.push([x, 1]);
    if (by === ty) occupied.push([by, 1]);
    const distance = Math.abs(bx - x) + Math.abs(by - y);
    const effectiveDistance = distance - Math.abs(ty - y);
    if (effectiveDistance < 0) continue;
    occupied.push([x - effectiveDistance, x + effectiveDistance]);
  }
  return occupied;
}

checkArea = (covers, end, start = 0) => {
  const output = [];
  for (let current = start; current < end;) {
    const [, end] = covers.find(cover => current >= cover[0] && current <= cover[1]) ?? [null, null];
    if (end !== null) {
      current = end + 1;
      continue;
    }
    output.push(current);
    ++current;
  }
  return output;
}

result = Array(4000000).fill().map((_, iy, arr) => {
  if (iy % 100000 === 0) console.log(iy);
  return checkArea(generateLine(input, iy), arr.length).map(x => [x, iy])
}).flat();

result[0][0] * 4000000 + result[0][1];
