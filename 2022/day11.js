// part 1
input = document.body.innerText.trim().split('\n\n').map(item => {
  const [, startingItems, operation, test, ifTrue, ifFalse] = item.split('\n');
  return [
    startingItems.match(/\d+/g).map(a => +a),
    eval(`old => ${operation.split('=').at(-1)}`),
    +test.match(/\d+/)[0],
    +ifTrue.match(/\d+/)[0],
    +ifFalse.match(/\d+/)[0],
  ];
});
amountInspected = input.map(() => 0);
doRound = () => {
  for (const index in input) {
    const [items, operation, test, ifTrue, ifFalse] = input[index];
    amountInspected[index] += items.length;
    while (items.length) {
      const item = items.shift();
      const newWorryLevel = Math.floor(operation(item) / 3);
      input[newWorryLevel % test === 0 ? ifTrue : ifFalse][0].push(newWorryLevel);
    }
  }
}
Array(20).fill().forEach(() => doRound());
amountInspected.sort((a, b) => a > b ? -1 : 1);
amountInspected[0] * amountInspected[1];



// part 2
input = document.body.innerText.trim().split('\n\n').map(item => {
  const [, startingItems, operation, test, ifTrue, ifFalse] = item.split('\n');
  return [
    startingItems.match(/\d+/g).map(a => +a),
    eval(`old => ${operation.split('=').at(-1)}`),
    +test.match(/\d+/)[0],
    +ifTrue.match(/\d+/)[0],
    +ifFalse.match(/\d+/)[0],
  ];
});
modulo = input.map(a => a[2]).reduce((a, b) => a * b, 1);
amountInspected = input.map(() => 0);
doRound = () => {
  for (const index in input) {
    const [items, operation, test, ifTrue, ifFalse] = input[index];
    amountInspected[index] += items.length;
    while (items.length) {
      const item = items.shift();
      const newWorryLevel = operation(item) % modulo;
      input[newWorryLevel % test === 0 ? ifTrue : ifFalse][0].push(newWorryLevel);
    }
  }
}
Array(10000).fill().forEach(() => doRound());
amountInspected.sort((a, b) => a > b ? -1 : 1);
amountInspected[0] * amountInspected[1];
// part 1
input = document.body.innerText.trim().split('\n\n').map(item => {
  const [, startingItems, operation, test, ifTrue, ifFalse] = item.split('\n');
  return [
    startingItems.match(/\d+/g).map(a => +a),
    eval(`old => ${operation.split('=').at(-1)}`),
    +test.match(/\d+/)[0],
    +ifTrue.match(/\d+/)[0],
    +ifFalse.match(/\d+/)[0],
  ];
});
amountInspected = input.map(() => 0);
doRound = () => {
  for (const index in input) {
    const [items, operation, test, ifTrue, ifFalse] = input[index];
    amountInspected[index] += items.length;
    while (items.length) {
      const item = items.shift();
      const newWorryLevel = Math.floor(operation(item) / 3);
      input[newWorryLevel % test === 0 ? ifTrue : ifFalse][0].push(newWorryLevel);
    }
  }
}
Array(20).fill().forEach(() => doRound());
amountInspected.sort((a, b) => a > b ? -1 : 1);
amountInspected[0] * amountInspected[1];



// part 2
input = document.body.innerText.trim().split('\n\n').map(item => {
  const [, startingItems, operation, test, ifTrue, ifFalse] = item.split('\n');
  return [
    startingItems.match(/\d+/g).map(a => +a),
    eval(`old => ${operation.split('=').at(-1)}`),
    +test.match(/\d+/)[0],
    +ifTrue.match(/\d+/)[0],
    +ifFalse.match(/\d+/)[0],
  ];
});
modulo = input.map(a => a[2]).reduce((a, b) => a * b, 1);
amountInspected = input.map(() => 0);
doRound = () => {
  for (const index in input) {
    const [items, operation, test, ifTrue, ifFalse] = input[index];
    amountInspected[index] += items.length;
    while (items.length) {
      const item = items.shift();
      const newWorryLevel = operation(item) % modulo;
      input[newWorryLevel % test === 0 ? ifTrue : ifFalse][0].push(newWorryLevel);
    }
  }
}
Array(10000).fill().forEach(() => doRound());
amountInspected.sort((a, b) => a > b ? -1 : 1);
amountInspected[0] * amountInspected[1];
