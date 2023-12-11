// part 1
map = document.body.innerText.trim().split('\n');
pos = [];
for (const y in map) {
  for (const x in map[y]) {
    const type = map[y][x];
    if (type !== '#')
      continue;
    pos.push([+x, +y]);
  }
}
// emptyY = [...map.keys()].filter(y => !pos.find(([, py]) => y === py));
// emptyX = new Array(map[0].length).fill().map((_, index) => index).filter(x => !pos.find(([px]) => x === px));
// expanded = pos.map(([x,y]) => {
//   const emptyXCount = emptyX.filter(ex => x > ex).length;
//   const emptyYCount = emptyY.filter(ey => y > ey).length;
//   return [x + emptyXCount, y + emptyYCount];
// });
yFlatten = map.map((_, y) => pos.filter(([, py]) => y === py).length || [0, 0]).flat();
xFlatten = new Array(map[0].length).fill().map((_, x) => pos.filter(([px]) => x === px).length || [0, 0]).flat();
calcTotalDist = flatten => {
  const sum = flatten.reduce((acc, val) => acc + val);
  return flatten.reduce((acc, amount) => {
    // console.log(acc[0], acc[1], acc[2], amount);
    acc[1] -= amount;
    acc[2] += amount;
    acc[0] += acc[1] * acc[2];
    return acc;
  }, [0, sum, 0])[0]; // totalDist, amountRight, amountLeft
};
calcTotalDist(yFlatten) + calcTotalDist(xFlatten);

// part 2
map = document.body.innerText.trim().split('\n');
pos = [];
for (const y in map) {
  for (const x in map[y]) {
    const type = map[y][x];
    if (type !== '#')
      continue;
    pos.push([+x, +y]);
  }
}
// emptyY = [...map.keys()].filter(y => !pos.find(([, py]) => y === py));
// emptyX = new Array(map[0].length).fill().map((_, index) => index).filter(x => !pos.find(([px]) => x === px));
// expanded = pos.map(([x,y]) => {
//   const emptyXCount = emptyX.filter(ex => x > ex).length;
//   const emptyYCount = emptyY.filter(ey => y > ey).length;
//   return [x + emptyXCount, y + emptyYCount];
// });
yFlatten = map.map((_, y) => pos.filter(([, py]) => y === py).length || new Array(1000000).fill(0)).flat();
xFlatten = new Array(map[0].length).fill().map((_, x) => pos.filter(([px]) => x === px).length || new Array(1000000).fill(0)).flat();
calcTotalDist = flatten => {
  const sum = flatten.reduce((acc, val) => acc + val);
  return flatten.reduce((acc, amount) => {
    // console.log(acc[0], acc[1], acc[2], amount);
    acc[1] -= amount;
    acc[2] += amount;
    acc[0] += acc[1] * acc[2];
    return acc;
  }, [0, sum, 0])[0]; // totalDist, amountRight, amountLeft
};
calcTotalDist(yFlatten) + calcTotalDist(xFlatten);
