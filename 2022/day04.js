// part 1
document.body.innerText.trim().split('\n').map(line => {
  const [aStart, aEnd, bStart, bEnd] = line.split(/[-,]/g).map(a => +a);
  return [aStart, aEnd, bStart, bEnd];
}).reduce((acc, [aS, aE, bS, bE]) => {
  if(aS >= bS && aE <= bE) ++acc;
  else if(bS >= aS && bE <= aE) ++acc;
  return acc;
}, 0);

// part 2
document.body.innerText.trim().split('\n').map(line => {
  const [aStart, aEnd, bStart, bEnd] = line.split(/[-,]/g).map(a => +a);
  return [aStart, aEnd, bStart, bEnd];
}).reduce((acc, [aS, aE, bS, bE]) => {
  if(aE < bS) return acc;
  if(bE < aS) return acc;
  return ++acc;
}, 0);
