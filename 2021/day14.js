// part 1
[start, ops] = document.body.innerText.trim().split('\n\n');
insertTable = ops.split('\n').map(line => {
  const [from, to] = line.split(' -> ');
  return [from, to];
}).reduce((insertTable, [from, to]) => {
  insertTable[from] = to;
  return insertTable;
}, {});
doStep = (arr, insertTable) => {
  for (let index = 1; index < arr.length; ++index) {
    const pair = arr[index - 1] + arr[index];
    const insert = insertTable[pair];
    if (!insert) continue;
    ++index;
    arr.splice(index - 1, 0, insert);
  }
}
arr = start.split('');
for (let amount = 10; amount; --amount) doStep(arr, insertTable);
freq = arr.reduce((freq, char) => {
  if (!freq[char]) freq[char] = 0;
  ++freq[char];
  return freq;
}, {});
sorted = Object.values(freq).sort((a, b) => a > b ? -1 : 1);
sorted[0] - sorted.at(-1);



// part 2
[start, ops] = document.body.innerText.trim().split('\n\n');
insertTable = ops.split('\n').map(line => {
  const [from, to] = line.split(' -> ');
  return [from, to];
}).reduce((insertTable, [from, to]) => {
  insertTable[from] = to;
  return insertTable;
}, {});
sum2Freq = (freq1, freq2) => {
  const output = {};
  for (const key in freq1) {
    if (!output[key]) output[key] = 0;
    output[key] += freq1[key];
  }
  for (const key in freq2) {
    if (!output[key]) output[key] = 0;
    output[key] += freq2[key];
  }
  return output;
}
resolvePairDepth = (c0, c1, depth, insertTable, cache) => {
  const cacheKey = `${c0}.${c1}.${depth}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);
  const insert = insertTable[c0 + c1];
  let freq = {}, temp;
  if (!insert || depth === 0) {
    cache.set(cacheKey, freq);
    return freq;
  }
  temp = resolvePairDepth(c0, insert, depth - 1, insertTable, cache);
  freq = sum2Freq(freq, temp);
  temp = resolvePairDepth(insert, c1, depth - 1, insertTable, cache);
  freq = sum2Freq(freq, temp);
  freq = sum2Freq(freq, { [insert]: 1 });
  cache.set(cacheKey, freq);
  return freq;
}
console.time('time');
depth = 40;
cache = new Map();
freq = { [start[0]]: 1 };
for (let index = 1; index < start.length; ++index) {
  depthFreq = resolvePairDepth(start[index - 1], start[index], depth, insertTable, cache);
  freq = sum2Freq(freq, depthFreq);
  freq = sum2Freq(freq, { [start[index]]: 1 });
}
console.timeEnd('time');
sorted = Object.values(freq).sort((a, b) => a > b ? -1 : 1);
sorted[0] - sorted.at(-1);
