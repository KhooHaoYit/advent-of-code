// https://discord.com/channels/596708471102111744/596709196058066955/787510066222989313
input = document.body.innerText.trim().split('\n').map(input => {
  return input.split('');
});
occupied = (input, x, y, dx, dy) => {
  while(true){
    let at = input[y += dy];
    if(at === undefined) return false;
    at = at[x += dx];
    if(at === undefined) return false;
    if(at === 'L') return false;
    if(at === '#') return true;
  }
}
count = (input, x, y) => {
  let amount = 0;
  amount += occupied(input, x, y, 1, 1);
  amount += occupied(input, x, y, 0, 1);
  amount += occupied(input, x, y, -1, 1);
  amount += occupied(input, x, y, 1, 0);
  amount += occupied(input, x, y, -1, 0);
  amount += occupied(input, x, y, 1, -1);
  amount += occupied(input, x, y, 0, -1);
  amount += occupied(input, x, y, -1, -1);
  return amount;
}
nextTick = (input) => {
  const output = [];
  let update = false;
  for(let fill = input[0].length; fill--; output.push([]));
  for(let y in input){
    y -= 0;
    for(let x in input[y]){
      x -= 0;
      let result;
      switch(input[y][x]){
        case 'L': {
          if(count(input, x, y) !== 0) break;
          result = '#';
          update = true;
        } break;
        case '#': {
          if(count(input, x, y) < 5) break;
          result = 'L';
          update = true;
        } break;
      }
      output[y][x] = result || input[y][x];
    }
  }
  return { output, update };
}
result = nextTick(input);
while(result.update){
  result = nextTick(result.output);
}
result.output.map(i => i.filter(c => c === '#').length).reduce((s, c) => s += c);
