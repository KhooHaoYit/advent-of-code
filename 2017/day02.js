// part 1
input = `
5 1 9 5
7 5 3
2 4 6 8
`;
input = document.body.innerText;
input = input.trim();
input.split('\n').map(line => {
  const sorted = line.match(/\d+/g).map(item => +item)
    .sort((a, b) => a > b ? 1 : -1);
  return sorted.at(-1) - sorted[0];
}).reduce((acc, val) => acc + val, 0);

// part 2
input = `
5 9 2 8
9 4 7 3
3 8 6 5
`;
input = document.body.innerText;
input = input.trim();
input.split('\n').map(line => {
  const [[small, big]] = line.match(/\d+/g).map(item => +item)
    .map((val, index, arr) => {
      const found = arr.find((targetVal, targetIndex) => targetIndex !== index && Number.isInteger(targetVal / val));
      if (!found) return null;
      return [val, found]
    }).filter(val => val);
  return big / small;
}).reduce((acc, val) => acc + val, 0);
