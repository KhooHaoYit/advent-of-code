// part 1
input = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`;
input = document.body.innerText;
[ranges, ids] = input.trim().split('\n\n');
ranges = ranges.split('\n').map(line => {
    return line.split('-').map(Number);
});
ids = ids.split('\n').map(Number);
ids.filter(id => ranges.some(([start, end]) => id >= start && id <= end)).length;

// part 2
input = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`;
input = document.body.innerText;
[ranges, ids] = input.trim().split('\n\n');
ranges = ranges.split('\n').map(line => {
    return line.split('-').map(Number);
});
ranges.sort((a, b) => a[0] > b[0] ? 1 : -1);

while (mergeOverlaps(ranges));
ranges.reduce((acc, range) => acc + range[1] - range[0] + 1, 0);

function mergeOverlaps(ranges) {
    const overlapsIndex = ranges.findIndex((currentRange, index, arr) => {
        if (index === 0)
            return false;
        const lastRange = arr[index - 1];
        if (currentRange[0] > lastRange[1])
            return false;
        return true;
    });
    if (overlapsIndex === -1)
        return false;
    const [rangeA, rangeB] = ranges.splice(overlapsIndex - 1, 2);
    if (rangeB[1] <= rangeA[1]) {
        ranges.splice(overlapsIndex - 1, 0, rangeA);
    } else {
        rangeA[1] = rangeB[1];
        ranges.splice(overlapsIndex - 1, 0, rangeA);
    }
    return true;
}
