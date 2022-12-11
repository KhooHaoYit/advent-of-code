// part 1
lines = document.body.innerText.trim().split('\n');
isStart = char => '([{<'.indexOf(char) !== -1;
isEnd = char => ')]}>'.indexOf(char) !== -1;
isPair = (start, end) => {
  switch (start + end) {
    default: return false;
    case '()':
    case '[]':
    case '{}':
    case '<>':
      return true;
  }
}
validator = line => {
  const queue = [];
  for (const char of line) {
    if (isStart(char)) {
      queue.push(char);
      continue;
    }
    if (isEnd(char)) {
      const start = queue.pop();
      if (isPair(start, char)) continue;
      return char;
    }
  }
  return null;
}
output = {};
for (const line of lines) {
  const result = validator(line);
  if (result === null) continue;
  if (!output[result]) output[result] = 0;
  ++output[result];
}
output[')'] * 3
  + output[']'] * 57
  + output['}'] * 1197
  + output['>'] * 25137;



// part 2
lines = document.body.innerText.trim().split('\n');
isStart = char => '([{<'.indexOf(char) !== -1;
isEnd = char => ')]}>'.indexOf(char) !== -1;
isPair = (start, end) => {
  switch (start + end) {
    default: return false;
    case '()':
    case '[]':
    case '{}':
    case '<>':
      return true;
  }
}
validator = line => {
  const queue = [];
  for (const char of line) {
    if (isStart(char)) {
      queue.push(char);
      continue;
    }
    if (isEnd(char)) {
      const start = queue.pop();
      if (isPair(start, char)) continue;
      return null;
    }
  }
  return queue;
}
findScore = start => {
  switch (start) {
    case '(': return 1;
    case '[': return 2;
    case '{': return 3;
    case '<': return 4;
  }
}
scores = lines.map(line => validator(line))
  .filter(line => line !== null)
  .map(unmatched => {
    let output = 0;
    while (unmatched.length) {
      const score = findScore(unmatched.pop());
      output *= 5;
      output += score;
    }
    return output;
  });
scores.sort((a, b) => a > b ? -1 : 1)[(scores.length - 1) / 2];
