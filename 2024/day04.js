// part 1
input = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;
input = document.body.innerText;
input = input.trim();
inputReversed = input.split('\n').map(line => line.split('').reverse().join('')).join('\n');
maxLength = Math.max(input.split('\n')[0].length, input.split('\n').length);
input = [
  input,
  input.split('\n')[0].split('').map((_, xIndex) =>
    input.split('\n').map(line => line[xIndex]).join('')
  ).join('\n'),
  new Array(maxLength * 2 - 1).fill().map((_, lineOffset) =>
    new Array(lineOffset + 1).fill().map((_, charOffset) =>
      input.split('\n')[lineOffset - charOffset]?.[charOffset]
    ).join('')
  ).join('\n'),
  new Array(maxLength * 2 - 1).fill().map((_, lineOffset) =>
    new Array(lineOffset + 1).fill().map((_, charOffset) =>
      inputReversed.split('\n')[lineOffset - charOffset]?.[charOffset]
    ).join('')
  ).join('\n'),
].join('\n\n');
input.match(/(?=xmas|samx)/ig).length;



// part 2
input = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;
input = document.body.innerText;
input = input.trim();
input = input.split('\n').map((line, yIndex) => {
  return line.split('').map((char, xIndex) => [char, xIndex, yIndex]);
}).flat().filter(item => item[0] === 'A').map(([, xIndex, yIndex]) => {
  const chars = [
    [xIndex - 1, yIndex + 1],
    [xIndex + 1, yIndex + 1],
    [xIndex - 1, yIndex - 1],
    [xIndex + 1, yIndex - 1],
  ].map(([x, y]) => input.split('\n')[y]?.[x]).join('');
  return /mmss|ssmm|msms|smsm/i.test(chars);
}).filter(Boolean).length;
