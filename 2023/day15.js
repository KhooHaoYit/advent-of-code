// part 1
inputs = `
rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
`;
inputs = document.body.innerText;
inputs = inputs.trim().split(',').reduce((acc, string) => {
  let currentValue = 0;
  for (const char of string) {
    currentValue += char.charCodeAt();
    currentValue *= 17;
    currentValue %= 256;
  }
  return acc + currentValue;
}, 0);

// part 2
inputs = `
rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
`;
inputs = document.body.innerText;
calcHash = string => {
  let currentValue = 0;
  for (const char of string) {
    currentValue += char.charCodeAt();
    currentValue *= 17;
    currentValue %= 256;
  }
  return currentValue;
}
inputs = inputs.trim().split(',').reduce((boxes, string) => {
  let [label, type, focalLength] = string.split(/(?=[=-])|(?<=[=])/);
  focalLength -= 0;
  const boxIndex = calcHash(label);
  if (type === '-') {
    boxes[boxIndex] = boxes[boxIndex].filter(([boxLabel]) => boxLabel !== label);
  }
  else {
    if (boxes[boxIndex].some(([boxLabel]) => boxLabel === label))
      boxes[boxIndex].forEach((lens) => lens[0] === label && (lens[1] = focalLength));
    else boxes[boxIndex].push([label, focalLength]);
  }
  return boxes;
}, new Array(256).fill().map(() => [])).reduce((acc, box, boxIndex) => {
  if (!box.length)
    return acc;
  return acc + box.reduce((acc, lens, index) => acc + (boxIndex + 1) * (index + 1) * lens[1], 0);
}, 0);
