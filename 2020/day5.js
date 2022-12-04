// https://discord.com/channels/596708471102111744/596709196058066955/784653480366833744
input = document.body.innerText.split('\n').filter(_ => _).map(input => {
  let y = 0x7f, mask = 0x1;
  for(let index = 7; index; mask <<= 1){
    switch(input[--index]){
      case 'F': y ^= mask; break;
      case 'B': break;
      default: throw `${input[index]}`;
    }
  }
  let x = 0x7;
  mask = 0x1;
  input = input.substring(7);
  for(let index = 3; index; mask <<= 1){
    switch(input[--index]){
      case 'L': x ^= mask; break;
      case 'R': break;
      default: throw `${input[index]}`;
    }
  }
  return y * 8 + x;
}).sort((a, b) => a > b ? 1 : -1).reduce((list, value) => {
  list[value] = 1;
  return list;
}, [])//.reduce((largest, current) => largest > current ? largest : current, -1);
