// part 1
input = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;
input = document.body.innerText;
input = input.trim().split('\n').map(line => line.match(/\d+/g).map(val => +val));
input.map(line =>
  line.every((item, index, arr) => {
    const diff = Math.abs(item - arr[index - 1])
    return !index || (diff >= 1 && diff <= 3);
  })
  && line.every((item, index, arr) => {
    return index < 2 || Math.sign(arr[index - 1] - arr[index - 2]) === Math.sign(item - arr[index - 1])
  })
).filter(Boolean).length;

// part 2
input = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;
input = document.body.innerText;
input = input.trim().split('\n').map(line => line.match(/\d+/g).map(val => +val));
test = line => line.every((item, index, arr) => {
  const diff = Math.abs(item - arr[index - 1])
  return !index || (diff >= 1 && diff <= 3);
}) && line.every((item, index, arr) => {
  return index < 2 || Math.sign(arr[index - 1] - arr[index - 2]) === Math.sign(item - arr[index - 1])
});
input.map(line => 
  test(line)
  || line.some((val, index, arr) => 
    test(arr.filter((val, innerIndex) => index !== innerIndex))
  )
).filter(Boolean).length;
