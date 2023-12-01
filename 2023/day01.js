// part 1
document.body.innerText.trim().split('\n').reduce((acc, line) => {
  const list = line.split('').map(c => +c).filter(n => !Number.isNaN(n));
  return acc + +`${list[0]}${list.at(-1)}`;
}, 0);

// part 2
document.body.innerText.trim().split('\n').reduce((acc, line) => {
  const list = line
    .replace(/(?=one|two|three|four|five|six|seven|eight|nine)/g, (found, index, line) => {
      const start = line.substring(index);
      if (start.startsWith('one')) return '1';
      else if (start.startsWith('two')) return '2';
      else if (start.startsWith('three')) return '3';
      else if (start.startsWith('four')) return '4';
      else if (start.startsWith('five')) return '5';
      else if (start.startsWith('six')) return '6';
      else if (start.startsWith('seven')) return '7';
      else if (start.startsWith('eight')) return '8';
      else if (start.startsWith('nine')) return '9';
    })
    .split('')
    .map(c => +c)
    .filter(n => !Number.isNaN(n));
  return acc + +`${list[0]}${list.at(-1)}`;
}, 0);
