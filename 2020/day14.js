// https://discord.com/channels/596708471102111744/596709196058066955/790864600425431051
input = document.body.innerText.trim().split('\n').map(i => {
  const op = i.startsWith('mask') ? 'mask' : 'memset';
  let info;
  if(op === 'mask') info = i.match(/(?<mask>[01X]+)/).groups;
  else {
    info = i.match(/(?<index>\d+)] = (?<value>\d+)/).groups;
    info.value -= 0; info.index -= 0;
  }
  return { op, info };
});
maskValue = (value, mask) => {
  let binary = value.toString(2).padStart(mask.length, '0');
  for(const index in binary){
    if(mask[index] === '0') continue;
    binary = [binary.substring(0, index), mask[index], binary.substring(+index + 1)].join('');
  }
  binary = binary.split('X');
  if(binary.length === 1) return [+`0b${binary.join('')}`];
  const size = binary.length - 1
    , output = [];
  for(let amount = 0; 1; ++amount){
    const fill = amount.toString(2).padStart(size, 0).split('');
    if(fill.length > size) break;
    let temp = [binary[0]];
    for(const index in fill) temp.push(fill[index], binary[+index + 1]);
    output.push(+`0b${temp.join('')}`);
  }
  return output;
}
run = (ops) => {
  const mem = [];
  let mask = null, sum = 0;
  for(const { op, info } of ops){
    switch(op){
      case 'mask': {
        mask = info.mask;
      } break;
      case 'memset': {
        const indexs = maskValue(info.index, mask);
        for(const index of indexs){
          if(mem[index] === undefined) mem[index] = 0;
          sum += info.value - mem[index];
          mem[index] = info.value;
        }
      } break;
    }
  }
  return { mem, mask, sum };
}
output = run(input);
