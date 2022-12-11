a = document.body.innerText.trim().split('\n\n').map(line => {
  const items = line.split('\n').map(a => +a);
  const sum = items.reduce((acc, val) => acc + val);
  return [sum, items];
}).sort((a, b) => a[0] > b[0] ? -1 : 1);
console.log(a[0][0]); // part 1
console.log(a[0][0] + a[1][0] + a[2][0]); // part 2
