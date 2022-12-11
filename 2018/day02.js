// part 1
line = document.body.innerText.trim().split('\n');
buildFreq = text => {
  const output = {};
  for (const char of text) {
    if (!output[char]) output[char] = 0;
    ++output[char];
  }
  const freq = {};
  for (const char in output) {
    const amount = output[char];
    if (!freq[amount]) freq[amount] = [];
    freq[amount].push(char);
  }
  return freq;
};
c2 = 0, c3 = 0;
for (const text of line) {
  const freq = buildFreq(text);
  if (freq[2]) ++c2;
  if (freq[3]) ++c3;
}
c2 * c3;



// part 2
line = document.body.innerText.trim().split('\n');
calcDiff = (a, b) => {
  let output = 0;
  for (const index in a) {
    if (a[index] === b[index]) continue;
    ++output;
  }
  return output;
}
result = null;
loop: for (const index in line) {
  for (const index2 in line) {
    if (index === index2) continue;
    if (calcDiff(line[index], line[index2]) !== 1) continue;
    result = [line[index], line[index2]];
    break loop;
  }
}
result;
