// part 1
input = `
11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124
`.replace(/\n/g, '');
input = document.body.innerText;
input.trim().split(',').map(entry => {
    const [start, end] = entry.split('-').map(Number);
    return new Array(end - start + 1)
        .fill()
        .map((_, index) => start + index)
        .filter(value => isInvalid(value));
}).flat()
    .reduce((acc, value) => acc + value, 0);

function isInvalid(value) {
    value += '';
    if (value[0] === '0')
        return true;
    const middleIndex = value.length / 2;
    if (!Number.isInteger(middleIndex))
        return false;
    const left = value.substring(0, middleIndex);
    const right = value.substring(middleIndex);
    return left === right;
}

// part 2
input = `
11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124
`.replace(/\n/g, '');
input = document.body.innerText;
input.trim().split(',').map(entry => {
    const [start, end] = entry.split('-').map(Number);
    return new Array(end - start + 1)
        .fill()
        .map((_, index) => start + index)
        .filter(value => isInvalid(value));
})
    .flat()
    .reduce((acc, value) => acc + value, 0);

function isInvalid(value) {
    value += '';
    return new Array(Math.floor(value.length / 2))
        .fill()
        .map((_, index) => value.substring(0, index + 1))
        .filter(substring => Number.isInteger(value.length / substring.length))
        .map(substring => new RegExp(`^(?:${substring})+$`).test(value))
        .some(Boolean);
}
