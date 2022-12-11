// part 1
list = document.body.innerText.trim().split(',').map(a => +a).sort((a, b) => a > b ? 1 : -1);
smallest = list[0];
biggest = list.at(-1);
output = [];
calcFuelCost = (list, target) => {
  let output = 0;
  for (const current of list) {
    output += Math.abs(target - current);
  }
  return output;
}
for (let target = smallest; target <= biggest; ++target) {
  output.push(calcFuelCost(list, target));
}
output = output.sort((a, b) => a > b ? 1 : -1);
output[0];



// part 2
list = document.body.innerText.trim().split(',').map(a => +a).sort((a, b) => a > b ? 1 : -1);
smallest = list[0];
biggest = list.at(-1);
output = [];
calcFuelCost = (list, target) => {
  let output = 0;
  for (const current of list) {
    const distance = Math.abs(target - current);
    output += (distance * (distance + 1) / 2);
  }
  return output;
}
for (let target = smallest; target <= biggest; ++target) {
  output.push(calcFuelCost(list, target));
}
output = output.sort((a, b) => a > b ? 1 : -1);
output[0];
