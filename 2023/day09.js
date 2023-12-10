// part 1
inputs = document.body.innerText.trim().split('\n').map(line => line.split(/ +/g).map(val => +val));
buildPyramid = list => {
  if (list.length === 1 || list.every(val => !val))
    return [];
  const diff = list.map((val, index, arr) => val - arr[index - 1]).splice(1);
  return [diff, ...buildPyramid(diff)];
}
predictNextValue = (list, offset = 1) => {
  const pyramid = buildPyramid(list);
  return list[0] + pyramid.reduce((acc, list, index) => {
    return acc + combination(list.length + index + offset, index + 1) * list[0];
  }, 0);
}
factorial = n => Array(n).fill().reduce((acc, _, index) => acc * (index + 1), 1);
combination = (n, k) => factorial(n) / (factorial(k) * factorial(n - k));
inputs.reduce((acc, input) => acc + predictNextValue(input), 0);

// part 2
inputs = document.body.innerText.trim().split('\n').map(line => line.split(/ +/g).map(val => +val).reverse());
buildPyramid = list => {
  if (list.length === 1 || list.every(val => !val))
    return [];
  const diff = list.map((val, index, arr) => val - arr[index - 1]).splice(1);
  return [diff, ...buildPyramid(diff)];
}
predictNextValue = (list, offset = 1) => {
  const pyramid = buildPyramid(list);
  return list[0] + pyramid.reduce((acc, list, index) => {
    return acc + combination(list.length + index + offset, index + 1) * list[0];
  }, 0);
}
factorial = n => Array(n).fill().reduce((acc, _, index) => acc * (index + 1), 1);
combination = (n, k) => factorial(n) / (factorial(k) * factorial(n - k));
inputs.reduce((acc, input) => acc + predictNextValue(input), 0);
