// part 1
document.body.innerText.trim().split(/\s*[a-z\- ]+?:\s*/g).splice(1).reduce((acc, text) => {
  if (acc === null)
    return text.split(' ').map(val => +val);
  const mapper = text.split('\n').map(line => {
    const [destination, source, length] = line.split(' ').map(val => +val);
    return [source, destination, length];
  });
  for (const index in acc) {
    const value = acc[index];
    const found = mapper.find(item => value >= item[0] && value <= item[0] + item[2]);
    if (!found)
      continue;
    acc[index] = acc[index] - found[0] + found[1];
  }
  return acc;
}, null).sort((a, b) => a > b ? 1 : -1)[0];

// part 2
document.body.innerText.trim().split(/\s*[a-z\- ]+?:\s*/g).splice(1).reduce((acc, text) => {
  if (acc === null)
    return text.match(/\d+ \d+/g).map(pair => pair.split(' ').map(val => +val));
  const mapper = text.split('\n').map(line => {
    const [destination, source, length] = line.split(' ').map(val => +val);
    return [source, destination, length];
  });
  const mappedAcc = [];
  for (const [source, destination, length] of mapper) {
    const newAcc = [];
    for (const [startIndex, size] of acc) {
      if (startIndex > source + length || startIndex + size < source) {
        newAcc.push([startIndex, size]);
        continue;
      }
      if (startIndex < source)
        newAcc.push([startIndex, source - startIndex]);
      if (startIndex + size > source + length)
        newAcc.push([source + length, startIndex + size - (source + length)]);
      const startOverlap = Math.max(source, startIndex);
      const overlapLength = Math.min(source + length, startIndex + size) - startOverlap;
      mappedAcc.push([startOverlap - source + destination, overlapLength]);
    }
    acc = newAcc;
  }
  mappedAcc.push(...acc);
  return mappedAcc;
}, null).sort((a, b) => a[0] > b[0] ? 1 : -1)[0][0];
