// part 1
input = `
987654321111111
811111111111119
234234234234278
818181911112111
`;
input = document.body.innerText;
input.trim().split('\n').map(line => {
    for (const [a, aIndex] of generateCandidate(line)) {
        for (const [b, bIndex] of generateCandidate(line.substring(aIndex + 1))) {
            return a + b;
        }
    }
}).map(Number)
    .reduce((acc, value) => acc + value);

function generateCandidate(value) {
    return value
        .split('')
        .map((value, index) => [value, index])
        .sort((a, b) => a[0] === b[0]
            ? a[1] > b[1] ? 1 : -1
            : a[0] > b[0] ? -1 : 1);
}

// part 2
input = `
987654321111111
811111111111119
234234234234278
818181911112111
`;
input = document.body.innerText;
input.trim().split('\n').map(line => {
    const queue = generateCandidate(line)
        .map(entry => [entry]);
    while (queue.length) {
        const current = queue.shift();
        if (current.length === 12)
            return current.reduce((acc, entry) => acc + entry[0], '');
        const [, index] = current.at(-1);
        queue.unshift(
            ...generateCandidate(line.substring(index + 1))
                .map(possible => {
                    possible[1] += index + 1;
                    return [...current, possible];
                })
        );
    }
}).map(Number)
    .reduce((acc, value) => acc + value);

function generateCandidate(value) {
    return value
        .split('')
        .map((value, index) => [value, index])
        .sort((a, b) => a[0] === b[0]
            ? a[1] > b[1] ? 1 : -1
            : a[0] > b[0] ? -1 : 1);
}
