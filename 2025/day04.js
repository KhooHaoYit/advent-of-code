// part 1
input = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`;
input = document.body.innerText;
input = input.trim().split('\n').map(line => line.split(''));
input.map((line, y) => line
    .map((type, x) => type === '@' ? [x, y] : null)
).flat()
    .filter(Boolean)
    .filter(([x, y]) => {
        const count = surroundingPos(x, y)
            .map(([x, y]) => input[y][x])
            .filter(type => type === '@')
            .length;
        return count < 4;
    })
    .length;

function surroundingPos(xTarget, yTarget) {
    return new Array(3)
        .fill()
        .map((_, yOffset) => yTarget + yOffset - 1)
        .filter(y => y >= 0 && y < input.length)
        .map(y => new Array(3)
            .fill()
            .map((_, xOffset) => xTarget + xOffset - 1)
            .filter(x => x >= 0 && x < input[0].length)
            .map(x => [x, y])
            .filter(([x, y]) => !(x === xTarget && y === yTarget))
        ).flat();
}

// part 2
input = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`;
input = document.body.innerText;
input = input.trim().split('\n').map(line => line.split(''));

output = 0;
while (true) {
    const removablePos = input.map((line, y) => line
        .map((type, x) => type === '@' ? [x, y] : null)
    ).flat()
        .filter(Boolean)
        .filter(([x, y]) => {
            const count = surroundingPos(x, y)
                .map(([x, y]) => input[y][x])
                .filter(type => type === '@')
                .length;
            return count < 4;
        });
    output += removablePos.length;
    if (!removablePos.length)
        break;
    for (const [x, y] of removablePos) {
        input[y][x] = '.';
    }
}
output;

function surroundingPos(xTarget, yTarget) {
    return new Array(3)
        .fill()
        .map((_, yOffset) => yTarget + yOffset - 1)
        .filter(y => y >= 0 && y < input.length)
        .map(y => new Array(3)
            .fill()
            .map((_, xOffset) => xTarget + xOffset - 1)
            .filter(x => x >= 0 && x < input[0].length)
            .map(x => [x, y])
            .filter(([x, y]) => !(x === xTarget && y === yTarget))
        ).flat();
}
