// https://discord.com/channels/596708471102111744/596709196058066955/783956592235118612
any = (args) => args.reduce((any, _) => any ? !!_.length : false, true)
balance = (args) => args.map(_ => _.reduce((sum, _) => sum += _, 0))
.reduce((info, amount) => {
  if(info.amount === null) info.amount = amount;
  else if(info.amount != amount) info.same = false;
  return info;
}, { same: true, amount: null }).same
put = function*(list, num){
  for(const arr of list){
    arr.push(num);
    yield list;
    arr.pop();
  }
}
gen = function*(list, first = true, ignore = -1){
  const output = [[], [], []];
  for(const index in list){
    if(index <= ignore) continue;
    const num = list[index];
    const generator = gen(list, false, index);
    let temp = generator.next();
    do {
      const genList = put(temp.value, num);
      let tempList = genList.next();
      do {
        const outList = tempList.value;
        if(!first || any(outList) && balance(outList)) yield outList;
        tempList = genList.next();
      } while(!tempList.done);
      temp = generator.next();
    } while(!temp.done);
  }
  return output;
}
generate = gen([1,2,3,4]), temp = generate.next();
do {
  console.log(temp.value.map(_ => _.join(', ')).join('"\n'));
  temp = generate.next();
} while(!temp.done);
