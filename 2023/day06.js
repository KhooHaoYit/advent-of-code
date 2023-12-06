// part 1
[durations, records] = document.body.innerText.trim().split('\n').map(line => line.match(/\d+/g).map(val => +val));
output = [];
for (const index in durations) {
  const duration = durations[index];
  const record = records[index];
  let ways = 0;
  for (let heldDuration = 0; heldDuration < duration; ++heldDuration) {
    const mm = (duration - heldDuration) * heldDuration;
    if (mm <= record)
      continue;
    ++ways;
  }
  output.push(ways);
}
output.reduce((acc, val) => acc * val);

// part 2
[duration, record] = document.body.innerText.trim().split('\n').map(line => +line.match(/\d+/g).join(''));
ways = 0;
for (let heldDuration = 0; heldDuration < duration; ++heldDuration) {
  const mm = (duration - heldDuration) * heldDuration;
  if (mm <= record)
    continue;
  ++ways;
}
ways;
