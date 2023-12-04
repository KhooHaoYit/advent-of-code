// part 1
document.body.innerText.trim().split('\n').map(line => {
  const [[cardId], winningNumbers, numbers] = line.split(/: | \| /g).map(item => item.match(/\d+/g).map(val => +val));
  return [cardId, winningNumbers, numbers];
}).reduce((acc, card) => {
  const wonNumbers = card[2].filter(num => card[1].indexOf(num) !== -1);
  if (wonNumbers.length)
    acc += 2 ** (wonNumbers.length - 1);
  return acc;
}, 0);

// part 2
document.body.innerText.trim().split('\n').map(line => {
  const [[cardId], winningNumbers, numbers] = line.split(/: | \| /g).map(item => item.match(/\d+/g).map(val => +val));
  return [cardId, winningNumbers, numbers];
}).reduce((acc, card, index) => {
  acc[index] ??= 0;
  ++acc[index];
  const wonNumbers = card[2].filter(num => card[1].indexOf(num) !== -1);
  for (let remain = wonNumbers.length; remain--;) {
    acc[index + remain + 1] ??= 0;
    acc[index + remain + 1] += acc[index];
  }
  return acc;
}, []).reduce((a, b) => a + b, 0);
