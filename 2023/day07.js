// part 1
getRanking = cards => {
  const cardStrength = parseInt(
    cards
      .replace(/2/g, '0')
      .replace(/3/g, '1')
      .replace(/4/g, '2')
      .replace(/5/g, '3')
      .replace(/6/g, '4')
      .replace(/7/g, '5')
      .replace(/8/g, '6')
      .replace(/9/g, '7')
      .replace(/T/g, '8')
      .replace(/J/g, '9')
      .replace(/Q/g, 'a')
      .replace(/K/g, 'b')
      .replace(/A/g, 'c'),
    13,
  );
  const freq = {};
  for (const card of cards) {
    freq[card] ??= 0;
    ++freq[card];
  }
  let groupStrength;
  if (Object.keys(freq).length === 1)
    groupStrength = 6;
  else if (Object.keys(freq).length === 2 && [1, 4].indexOf(Object.values(freq)[0]) !== -1)
    groupStrength = 5;
  else if (Object.keys(freq).length === 2 && [2, 3].indexOf(Object.values(freq)[0]) !== -1)
    groupStrength = 4;
  else if (Object.keys(freq).length === 3 && Object.values(freq).find(val => val === 3))
    groupStrength = 3;
  else if (Object.keys(freq).length === 3 && Object.values(freq).find(val => val === 2))
    groupStrength = 2;
  else if (Object.keys(freq).length === 4)
    groupStrength = 1;
  else groupStrength = 0;
  return cardStrength + groupStrength * parseInt('100000', 13);
}
document.body.innerText.trim().split('\n').map(line => {
  const [cards, bid] = line.split(' ');
  return [cards, bid];
}).sort((a, b) => getRanking(a[0]) > getRanking(b[0]) ? 1 : -1)
  .reduce((acc, item, index) => acc + item[1] * (index + 1), 0);

// part 2
getRanking = cards => {
  const cardStrength = parseInt(
    cards
      .replace(/J/g, '0')
      .replace(/2/g, '1')
      .replace(/3/g, '2')
      .replace(/4/g, '3')
      .replace(/5/g, '4')
      .replace(/6/g, '5')
      .replace(/7/g, '6')
      .replace(/8/g, '7')
      .replace(/9/g, '8')
      .replace(/T/g, '9')
      .replace(/Q/g, 'a')
      .replace(/K/g, 'b')
      .replace(/A/g, 'c'),
    13,
  );
  const freq = {};
  for (const card of cards) {
    freq[card] ??= 0;
    ++freq[card];
  }
  let groupStrength;
  if (
    Object.keys(freq).length === 1
    || (Object.keys(freq).length === 2 && freq.J)
  )
    groupStrength = 6;
  else if (
    (Object.keys(freq).length === 2 && [1, 4].indexOf(Object.values(freq)[0]) !== -1)
    || (Object.keys(freq).length === 3 && freq.J && Object.entries(freq).some(([k, v]) => k !== 'J' && v === 1))
  )
    groupStrength = 5;
  else if (
    (Object.keys(freq).length === 2 && [2, 3].indexOf(Object.values(freq)[0]) !== -1)
    || (Object.keys(freq).length === 3 && freq.J && Object.entries(freq).every(([k, v]) => k === 'J' || v === 2))
  )
    groupStrength = 4;
  else if (
    (Object.keys(freq).length === 3 && Object.values(freq).find(val => val === 3))
    || (Object.keys(freq).length === 4 && freq.J)
  )
    groupStrength = 3;
  else if (Object.keys(freq).length === 3 && Object.values(freq).find(val => val === 2))
    groupStrength = 2;
  else if (
    Object.keys(freq).length === 4
    || (Object.keys(freq).length === 5 && freq.J)
  )
    groupStrength = 1;
  else groupStrength = 0;
  return cardStrength + groupStrength * parseInt('100000', 13);
}
document.body.innerText.trim().split('\n').map(line => {
  const [cards, bid] = line.split(' ');
  return [cards, bid];
}).sort((a, b) => getRanking(a[0]) > getRanking(b[0]) ? 1 : -1)
  .reduce((acc, item, index) => acc + item[1] * (index + 1), 0);
