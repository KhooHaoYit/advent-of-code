// part 1
input = `
1234
`;
input = document.body.innerText;
input = input.trim();
input += input[0];
(input.match(/(\d)(?=\1)/g) ?? []).map(val => +val[0]).reduce((sum, val) => sum + val, 0);

// part 2
input = `
12131415
`;
input = document.body.innerText;
input = input.trim();
amount = input.length / 2;
input += input.slice(0, amount);
(input.match(new RegExp(`(\\d)(?=[^]{${amount - 1}}\\1)`, 'g')) ?? []).map(val => +val[0]).reduce((sum, val) => sum + val, 0);
