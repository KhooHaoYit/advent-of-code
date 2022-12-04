// https://discord.com/channels/596708471102111744/596709196058066955/791920709823103008
calc = (sub, loop = 1) => {
  let output = 1n;
  while(loop--){
    output *= sub; output %= 20201227n;
  }
  return output;
}
find = (num, pub, subject = 2n, loopLimit = 5000n) => {
  while(1){
    let current = 1n;
    for(let count = loopLimit; count--; ){
      current *= subject; current %= 20201227n;
      if(num === current) return console.log({ subject, loop: loopLimit - count, sk: calc(pub, loopLimit - count) });
    }
    if(++subject > 100000) break;
  }
}
console.log(find(12090988n, 240583n, 7n, 100000000));
console.log(find(240583n, 12090988n, 7n, 100000000));
