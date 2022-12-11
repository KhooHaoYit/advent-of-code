// part 1
input = document.body.innerText.trim().split('\n').map(line => {
  const [input, output] = line.split(' | ');
  return {
    input: input.split(' '),
    output: output.split(' ')
  };
});
outputVal = 0;
for (const entry of input) {
  const { output } = entry;
  for (const ons of output) {
    if (ons.length === 2) ++outputVal;
    if (ons.length === 4) ++outputVal;
    if (ons.length === 3) ++outputVal;
    if (ons.length === 7) ++outputVal;
  }
}
outputVal;



// part 2
input = document.body.innerText.trim().split('\n').map(line => {
  const [input, output] = line.split(' | ');
  return {
    input: input.split(' '),
    output: output.split(' ')
  };
});
diff = (a, b) => {
  const amissing = a.split('').filter(c => b.indexOf(c) === -1);
  const bmissing = b.split('').filter(c => a.indexOf(c) === -1);
  return amissing.join('') + bmissing.join('');
}
getNumByOns = (list, count) => {
  return list.filter(ons => ons.length === count);
}
identifyStart = list => {
  const output = { known: [], unknown: [] };
  for (const ons of list) {
    if (ons.length === 2) output.known[1] = ons;
    else if (ons.length === 3) output.known[7] = ons;
    else if (ons.length === 4) output.known[4] = ons;
    else if (ons.length === 7) output.known[8] = ons;
    else output.unknown.push(ons);
  }
  return output;
}
buildMapper = list => {
  /*
  a = 1 diff 7
  9 = c6 diff 4 + a == 1
  e = 8 diff 9
  2 = c5 & e
  3 = c5 diff 2 == 2
  5 = c5
  6 = c6 diff 5 == 1
  0 = c6
  */
  const info = identifyStart(list);
  const aMapped = diff(info.known[1], info.known[7]);
  const [ons9] = getNumByOns(info.unknown, 6)
    .map(ons => [ons, diff(ons, info.known[4] + aMapped).length])
    .find(([ons, diff]) => diff === 1);
  info.unknown.splice(info.unknown.indexOf(ons9), 1);
  info.known[9] = ons9;
  const eMapped = diff(info.known[8], info.known[9]);
  const ons2 = getNumByOns(info.unknown, 5)
    .find(ons => ons.indexOf(eMapped) !== -1);
  info.unknown.splice(info.unknown.indexOf(ons2), 1);
  info.known[2] = ons2;
  const [ons3] = getNumByOns(info.unknown, 5)
    .map(ons => [ons, diff(ons, info.known[2]).length])
    .find(([ons, diff]) => diff === 2);
  info.unknown.splice(info.unknown.indexOf(ons3), 1);
  info.known[3] = ons3;
  const [ons5] = getNumByOns(info.unknown, 5);
  info.unknown.splice(info.unknown.indexOf(ons5), 1);
  info.known[5] = ons5;
  const [ons6] = getNumByOns(info.unknown, 6)
    .map(ons => [ons, diff(ons, info.known[5]).length])
    .find(([ons, diff]) => diff === 1);
  info.unknown.splice(info.unknown.indexOf(ons6), 1);
  info.known[6] = ons6;
  const [ons0] = getNumByOns(info.unknown, 6);
  info.unknown.splice(info.unknown.indexOf(ons0), 1);
  info.known[0] = ons0;
  return info.known;
}
mapInput = (mapper, inputs) => {
  return +inputs.map((iOns) => {
    return mapper.findIndex(ons => diff(iOns, ons).length === 0);
  }).join('');
}
sum = 0;
for (const { input: iarr, output: oarr } of input) {
  const mapper = buildMapper(iarr);
  sum += mapInput(mapper, oarr);
}
sum;
