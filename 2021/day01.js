// part 1
document.body.innerText.trim().split('\n').map(a => +a).reduce((val, num) => {
  if (val.last !== null && num > val.last) ++val.inc;
  val.last = num;
  return val;
}, { inc: 0, last: null });



// part 2
arr = document.body.innerText.trim().split('\n').map(a => +a);
inc = 0;
last = null;
outerLoop: for (const index in arr) {
  let sum = 0;
  for (let offset = 0; offset < 3; ++offset) {
    const at = +index + offset;
    if (at >= arr.legnth) break outerLoop;
    sum += arr[at];
  }
  if (last !== null && sum > last) ++inc;
  last = sum;
}
inc;
