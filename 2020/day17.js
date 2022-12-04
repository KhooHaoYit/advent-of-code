// https://discord.com/channels/596708471102111744/596709196058066955/791924815241019462
map = document.body.innerText.trim().split('\n').reduce((map, line, y) => {
  return line.split('').reduce((map, char, x) => {
    if(char === '#') map[`${x} ${y} 0 0`] = true;
    return map;
  }, map);
}, {});
countNeightbour = (map, x, y, z, w) => {
  let count = 0;
  for(let dx = 3; dx--; ){
    for(let dy = 3; dy--; ){
      for(let dz = 3; dz--; ){
      for(let dw = 3; dw--; ){
        if(dx === 1 && dy === 1 && dz === 1 && dw === 1) continue;
        const at = `${x + dx - 1} ${y + dy - 1} ${z + dz - 1} ${w + dw - 1}`;
        count += !!map[at];
      }
      }
    }
  }
  return count;
}
textToXYZ = text => {
  const [x, y, z, w] = text.split(' ').map(i => +i);
  return { x, y, z, w };
}
simulate = (map, amount = 1) => {
  while(amount--){
  const output = {}
    , queue = Object.entries(map).filter(([, value]) => value).map(([key, value]) => {
      return { ...textToXYZ(key), value };
    });
  while(queue.length){
    const { x, y, z, w, value } = queue.shift();
    for(let dx = 3; dx--; ){
      for(let dy = 3; dy--; ){
        for(let dz = 3; dz--; ){
        for(let dw = 3; dw--; ){
          const at = `${x + dx - 1} ${y + dy - 1} ${z + dz - 1} ${w + dw - 1}`
            , count = countNeightbour(map, x + dx - 1, y + dy - 1, z + dz - 1, w + dw - 1);
          if(count === 3) output[at] = true;
          else if(map[at] && count === 2) output[at] = true;
        }
        }
      }
    }
  }
  map = output;
  }
  return map;
}
map = simulate(map, 6);
Object.values(map).length;
