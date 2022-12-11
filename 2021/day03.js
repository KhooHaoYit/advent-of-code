// part 1
bins = document.body.innerText.trim().split('\n').map(line => {
  return line.split('');
});
binary = [];
for (const bits of bins) {
  for (const index in bits) {
    const bit = bits[index];
    if (!binary[index]) binary[index] = [0, 0];
    ++binary[index][bit];
  }
}
binaries = binary.map(freq => {
  freq = Object.entries(freq).sort((a, b) => a[1] > b[1] ? -1 : 1);
  return freq;
}).reduce((list, val) => {
  list[0] += val[0][0];
  list[1] += val[1][0];
  return list;
}, ['', '']);
+`0b${binaries[0]}` * +`0b${binaries[1]}`;



// part 2
list = document.body.innerText.trim().split('\n').map(line => {
  return line.split('');
});
func = (list, sort = 1) => {
  const output = [];
  for (const index in list[0]) {
    if (list.length === 1) {
      output.push(list[0][index]);
      continue;
    }
    let counts = [0, 0];
    for (const binary of list) {
      ++counts[binary[index]];
    }
    const freq = Object.entries(counts).sort((a, b) => {
      if (a[1] === b[1]) return a[0] == 1 ? -1 * sort : sort;
      return a[1] > b[1] ? -1 * sort : sort;
    });
    output.push(freq[0][0]);
    list = list.filter(binary => binary[index] === freq[0][0]);
  }
  return `0b${output.join('')}`;
}
func(list) * func(list, -1);
