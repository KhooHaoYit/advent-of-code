// https://discord.com/channels/596708471102111744/596709196058066955/791559676936323083
mapDirection = direction => {
  switch(direction){
    case 'ne': return { x: 0.5, y: 1 };
    case 'nw': return { x: -0.5, y: 1 };
    case 'sw': return { x: -0.5, y: -1 };
    case 'se': return { x: 0.5, y: -1 };
    case 'w': return { x: -1, y: 0 };
    case 'e': return { x: 1, y: 0 };
  }
}
calcLocation = ({ x, y }, { x: dx, y: dy }) => {
  return { x: x + dx, y: y + dy };
}
input = document.body.innerText.trim().split('\n').map(line => {
  return line.match(/ne|nw|sw|se|w|e/g).map(mapDirection).reduce(calcLocation, { x: 0, y: 0 });
});
directions = 'ne,nw,sw,se,w,e'.split(',').map(mapDirection);
blackCount = (map, x, y) => {
  let count = 0;
  for(const { x: dx, y: dy } of directions) count += !!map[`${x + dx} ${y + dy}`];
  return count;
}
filp = (locations, map = {}) => {
  for(const { x, y } of locations){
    const at = `${x} ${y}`;
    map[at] = !map[at];
  }
  return map;
}
sumBlack = map => Object.values(map).reduce((sum, v) => sum + v, 0);
simulate = (map) => {
  const after = {};
  const queue = Object.entries(map).filter(([, value]) => value).map(([key, value]) => {
    const [x, y] = key.split(' ').map(n => +n);
    return { x, y, value };
  });
  for(const { x, y, value } of queue){
    for(const { x: dx, y: dy } of directions){
      const ax = x + dx
        , ay = y + dy
        , at = `${ax} ${ay}`
        , a = !!map[at]
        , count = blackCount(map, ax, ay);
      if(count === 2 || (a && count === 1)) after[at] = true;
    }
    const at = `${x} ${y}`
      , count = blackCount(map, x, y);
    if(count === 2 || (value && count === 1)) after[at] = true;
  }
  return after;
}
map = {}
map = filp(input, map);
for(let amount = 100; amount--; map = simulate(map));
console.log(sumBlack(map));