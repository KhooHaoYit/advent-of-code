// https://discord.com/channels/596708471102111744/596709196058066955/787366717407756318
input = document.body.innerText.trim().split('\n').map(input => {
  const [, direction, amount] = input.match(/^(\w)(\d+)$/);
  return { direction, amount: +amount };
});
rotateR = (amount, info) => {
  while(amount--){
    const { x, y } = info.direction;
    info.direction.x = y;
    info.direction.y = x * -1;
  }
}
calc = (input, info = { x: 0, y: 0, direction: { x: 10, y: 1 } }) => {
  for(const { direction, amount } of input){
    switch(direction){
      case 'N': {
        info.direction.y += amount;
      } break;
      case 'S': {
        info.direction.y -= amount;
      } break;
      case 'E': {
        info.direction.x += amount;
      } break;
      case 'W': {
        info.direction.x -= amount;
      } break;
      case 'R': {
        rotateR(amount / 90, info);
      } break;
      case 'L': {
        rotateR(4 - amount / 90, info);
      } break;
      case 'F': {
        info.x += info.direction.x * amount;
        info.y += info.direction.y * amount;
      } break;
      default: throw 'not implemented';
    }
    console.log(info.x, info.y, direction, amount, info.direction.x, info.direction.y);
  }
  return info;
}
calc(input);
