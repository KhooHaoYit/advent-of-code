// part 1
ops = document.body.innerText.trim().split('\n').map(line => {
  const [op, num] = line.split(' ');
  return [op, +num];
});
x = 0, y = 0;
for (const [op, amount] of ops) {
  switch (op) {
    default: throw new Error(op);
    case 'up': {
      y -= amount;
    } break;
    case 'down': {
      y += amount;
    } break;
    case 'forward': {
      x += amount;
    } break;
  }
}
x * y;



// part 2
ops = document.body.innerText.trim().split('\n').map(line => {
  const [op, num] = line.split(' ');
  return [op, +num];
});
x = 0, y = 0, aim = 0;
for (const [op, amount] of ops) {
  switch (op) {
    default: throw new Error(op);
    case 'up': {
      aim -= amount;
    } break;
    case 'down': {
      aim += amount;
    } break;
    case 'forward': {
      y += amount;
      x += amount * aim;
    } break;
  }
}
x * y;
