// https://discord.com/channels/596708471102111744/596709196058066955/785825709377454081
parse = text => {
  const groups = text.match(/^(?<amount>\d+) (?<id>\w+)$/).groups;
  groups.amount -= 0;
  return groups;
}
input = document.body.innerText.trim().split('\n').map(input => {
  let [, inputs, output] = input.match(/^(.+) => (.+)$/);
  inputs = inputs.split(', ').map(_ => parse(_));
  output = parse(output);
  return { inputs, output };
});
find = (find) => input.find(({ output: { id } }) => id === find);
resolve = (id, amount, args = {  }) => {
  const store = args.store || {};
  let queue = [{ id, amount }], oreCost = args.oreCost || 0;
  for(let i = 5; queue.length; ){
    const { id, amount } = queue.pop();
    const { inputs, output } = find(id);
    if(store[id] === undefined) store[id] = 0;
    const repeat = Math.ceil((amount - store[id]) / output.amount);
    for(const { id: mat, amount: gen } of inputs){
      if(mat === 'ORE'){
        oreCost += gen * repeat;
        continue;
      }
      queue.push({ id: mat, amount: gen * repeat });
    }
    store[id] += output.amount * repeat - amount;
  }
  return { oreCost, store, queue };
}
for(let fuel = 0, step = 1, target = 1000000000000, result = { oreCost: 0, store: {} }; 1; ){
  fuel += step;
  if(step < 0) result = resolve('FUEL', fuel);
  else result = resolve('FUEL', step, result);
  if(result.oreCost > target && step > 0) step /= -2;
  if(result.oreCost < target && step < 0) step /= -2;
  else step *= 2;
  console.log(`generating ${fuel} fuel uses up ${result.oreCost} of ORE, current step at ${step}`);
  if(step == -1) break;
}
