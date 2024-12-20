// part 1
input = `
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`;
input = document.body.innerText;
input = input.trim().match(/mul\(\d+,\d+\)/g).map(line => {
  const [a, b] = line.match(/\d+/g).map(item => +item);
  return a * b;
}).reduce((acc, val) => acc + val, 0);



// part 2
input = `
xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
`;
input = document.body.innerText;
input = input.trim().match(/mul\(\d+,\d+\)|don't\(\)|do\(\)/g).reduce((acc, val) => {
  if (val === 'do()') {
    acc.do = true;
  }
  else if (val === `don't()`) {
    acc.do = false;
  }
  else if (acc.do) {
    acc.list.push(val);
  }
  return acc;
}, { do: true, list: [] }).list.map(line => {
  const [a, b] = line.match(/\d+/g).map(item => +item);
  return a * b;
}).reduce((acc, val) => acc + val, 0);
