// part 1
rounds = document.body.innerText.trim().split('\n').map(line => {
  const [left, right] = line.split(': ');
  return {
    gameId: +left.split(' ')[1],
    list: right.split('; ').map(list => list.split(', ').map(item => {
      const [amount, type] = item.split(' ');
      return [+amount, type];
    })),
  };
});
console.log(rounds);
rounds.filter(round => {
  for(const item of round.list){
    for(const [amount, type] of item){
      if(
        (type === 'red' && amount > 12)
        || (type === 'green' && amount > 13)
        || (type === 'blue' && amount > 14)
      ) return false;
    }
  }
  return true;
}).reduce((acc, round) => acc + round.gameId, 0);

// part 2
rounds = document.body.innerText.trim().split('\n').map(line => {
  const [left, right] = line.split(': ');
  return {
    gameId: +left.split(' ')[1],
    list: right.split('; ').map(list => list.split(', ').map(item => {
      const [amount, type] = item.split(' ');
      return [+amount, type];
    })),
  };
});
console.log(rounds);
rounds.reduce((acc, round) => {
  const most = {};
  for(const item of round.list){
    for(const [amount, type] of item){
      most[type] = Math.max(amount, most[type] ?? 0);
    }
  }
  return acc + Object.values(most).reduce((acc, val) => acc * val);
}, 0);
