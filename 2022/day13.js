// part 1
input = document.body.innerText.trim().split('\n\n').map(item => {
  return item.split('\n').map(line => JSON.parse(line));
});
compare = item => {
  const queue = [item];
  while (queue.length) {
    const [left, right] = queue.shift();
    if (Array.isArray(left) && Array.isArray(right)) {
      queue.unshift(...Array(Math.max(left.length, right.length))
        .fill()
        .map((_, index) => [left[index] ?? null, right[index] ?? null])
      );
      continue;
    }
    if (typeof left === 'number' && typeof right === 'number') {
      if (left === right) continue;
      return right > left ? true : false;
    }
    if (left === null || right === null) {

      return left === null ? true : false;
    }
    queue.unshift(typeof left === 'number' ? [[left], right] : [left, [right]]);
  }
}
input.map(val => compare(val)).reduce((acc, val, index) => {
  if (val) acc += index + 1;
  return acc;
}, 0);



// part 2
input = document.body.innerText.trim().split('\n\n').map(item => {
  return item.split('\n').map(line => JSON.parse(line));
}).flat()
input.push([[2]], [[6]]);
compare = item => {
  const queue = [item];
  while (queue.length) {
    const [left, right] = queue.shift();
    if (Array.isArray(left) && Array.isArray(right)) {
      queue.unshift(...Array(Math.max(left.length, right.length))
        .fill()
        .map((_, index) => [left[index] ?? null, right[index] ?? null])
      );
      continue;
    }
    if (typeof left === 'number' && typeof right === 'number') {
      if (left === right) continue;
      return right > left ? true : false;
    }
    if (left === null || right === null) {

      return left === null ? true : false;
    }
    queue.unshift(typeof left === 'number' ? [[left], right] : [left, [right]]);
  }
}
input.sort((a, b) => compare([a, b]) ? -1 : 1);
a = input.findIndex(a => a.length === 1 && a[0].length === 1 && a[0][0] === 2) + 1;
b = input.findIndex(a => a.length === 1 && a[0].length === 1 && a[0][0] === 6) + 1;
a * b;
