// part 1
[xs, xe, ys, ye] = document.body.innerText.trim().match(/-?\d+/g).map(n => +n);
//assuming position won't be smaller than the bound
isInBound = (position, velocity, boundStart, boundEnd, nextVelocity) => {
  let step = 0, start = null, biggest = position;
  while (true) {
    if (position > boundEnd) return [start, step - 1, biggest];
    if (boundStart >= position) start = step;
    if (position > biggest) biggest = position;
    position += velocity;
    const oldVelocity = velocity;
    velocity = nextVelocity(velocity);
    ++step;
    if (oldVelocity === 0 && velocity === 0) return [start, Infinity, biggest];
  }
}
isInBoundY = (position, velocity, lowerBound, upperBound, nextVelocity) => {
  let step = 0, start = null, biggest = position;
  while (true) {
    if (position < lowerBound) return [start, step - 1, biggest];
    if (position <= upperBound) start = step;
    if (position > biggest) biggest = position;
    position += velocity;
    const oldVelocity = velocity;
    velocity = nextVelocity(velocity);
    ++step;
    if (oldVelocity === 0 && velocity === 0) return [start, Infinity, biggest];
  }
}
//isInBound(0, 6, xs, xe, v => v - Math.sign(v));
for (let at = 1000; at--;) {
  const result = isInBoundY(0, at, ys, ye, v => v - 1);
  if (result[0] === null) continue;
  console.log(at, result);
}



// part 2
[xs, xe, ys, ye] = document.body.innerText.trim().match(/-?\d+/g).map(n => +n);
//assuming position won't be smaller than the bound
isInBound = (position, velocity, boundStart, boundEnd, nextVelocity) => {
  let step = 0, start = null, biggest = position;
  while (true) {
    if (position > boundEnd) return [start, step - 1, biggest];
    if (start === null && position >= boundStart) start = step;
    if (position > biggest) biggest = position;
    position += velocity;
    const oldVelocity = velocity;
    velocity = nextVelocity(velocity);
    ++step;
    if (oldVelocity === 0 && velocity === 0) return [start, Infinity, biggest];
  }
}
isInBoundY = (position, velocity, lowerBound, upperBound, nextVelocity) => {
  let step = 0, start = null, biggest = position;
  while (true) {
    if (position < lowerBound) return [start, step - 1, biggest];
    if (start === null && position <= upperBound) start = step;
    if (position > biggest) biggest = position;
    position += velocity;
    const oldVelocity = velocity;
    velocity = nextVelocity(velocity);
    ++step;
    if (oldVelocity === 0 && velocity === 0) return [start, Infinity, biggest];
  }
}
count = 0;
found = new Set();
for (let at = 100; at-- >= -100;) {
  const result = isInBoundY(0, at, ys, ye, v => v - 1);
  if (result[0] === null) continue;
  for (let atX = 400; atX--;) {
    const resultX = isInBound(0, atX, xs, xe, v => v - Math.sign(v));
    if (resultX[0] === null) continue;
    if (resultX[0] > result[1]) continue;
    if (resultX[1] < result[0]) continue;
    const key = `${atX},${at}`;
    if (found.has(key)) continue;
    found.add(key);
    ++count;
  }
}
count;
