// part 1
[items, steps] = document.body.innerText.split('\n\n');
steps = steps.trim().split('\n').map(line => line.match(/\d+/g).map(a => +a));
items = items.replace(/\n[^\n]+$/, '').split('\n').reduce((acc, line) => {
  for (let index in line) {
    index -= 0;
    const slot = (index + 3) / 4;
    const char = line[index];
    if (!/^[A-Z]$/.test(char)) continue;
    if (!acc[slot]) acc[slot] = [];
    acc[slot].unshift(char);
  }
  return acc;
}, []);
for (const [amount, fromSlot, toSlot] of steps) {
  const from = items[fromSlot];
  items[toSlot].push(...from.splice(from.length - amount).reverse());
}
items.map(slot => slot.at(-1)).join('');



// part 2
[items, steps] = document.body.innerText.split('\n\n');
steps = steps.trim().split('\n').map(line => line.match(/\d+/g).map(a => +a));
items = items.replace(/\n[^\n]+$/, '').split('\n').reduce((acc, line) => {
  for (let index in line) {
    index -= 0;
    const slot = (index + 3) / 4;
    const char = line[index];
    if (!/^[A-Z]$/.test(char)) continue;
    if (!acc[slot]) acc[slot] = [];
    acc[slot].unshift(char);
  }
  return acc;
}, []);
for (const [amount, fromSlot, toSlot] of steps) {
  const from = items[fromSlot];
  items[toSlot].push(...from.splice(from.length - amount));
}
items.map(slot => slot.at(-1)).join('');
