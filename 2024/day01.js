// part 1
input = `
3   4
4   3
2   5
1   3
3   9
3   3
`;
input = document.body.innerText;
input = Object.groupBy(input.match(/\d+/g).map(val => +val), (item, index) => index % 2 ? 'right' : 'left');
input.left.sort((a, b) => a > b ? 1 : -1);
input.right.sort((a, b) => a > b ? 1 : -1);
input.left.reduce((acc, val, index) => {
  return acc + Math.abs(val - input.right[index]);
}, 0);

// part 2
input = `
3   4
4   3
2   5
1   3
3   9
3   3
`;
input = document.body.innerText;
input = Object.groupBy(input.match(/\d+/g).map(val => +val), (item, index) => index % 2 ? 'right' : 'left');
right = Object.groupBy(input.right, (item) => item);
input.left.reduce((acc, val) => {
  return acc + val * (right[val] ?? []).length;
}, 0);
