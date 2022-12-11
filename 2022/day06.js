func = (amount = 4) => {
  input = document.body.innerText.trim();
  chars = input.split('');
  list = [];
  for (const char of chars) {
    list.push(char);
    if (list.length < amount) continue;
    if (list.length > amount) list.shift();
    if (new Set(list).size !== amount) continue;
    break;
  }
  return input.indexOf(list.join('')) + amount;
}

// part 1
console.log(func());

// part 2
console.log(func(14));
