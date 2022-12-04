// https://discord.com/channels/596708471102111744/596709196058066955/791929683209486348
input = document.body.innerText.trim().split('\n').map(input => {
  for(let before = input; isNaN(+input); before = input){
    input = input.replace(/\(\d+ (?:\+|\*) \d+\)/g, eval);
    if(input === before) input = input.replace(/\d+ \+ \d+/g, eval);
    if(input === before) input = input.replace(/\(\d+(?: \* \d+)+\)/, eval);
    if(input === before) input = input.replace(/\d+ \* \d+/, eval);
    if(input === before) break;
  }
  return +input;
}).reduce((sum, v) => sum + v, 0);
