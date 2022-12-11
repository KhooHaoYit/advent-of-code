// document.body.innerText
input = document.body.innerText.trim().split('$ ').filter(a => a).map(item => {
  const [command, ...result] = item.trim().split('\n').map(a => a.trim().split(' '));
  return [command, result]
});
sumSize = 0;
root = {};
currentPath = [];
getWorkingDir = (path = currentPath) => {
  let current = root;
  for (const name of path) {
    current = current[name];
  }
  return current;
}
for (const [[command, arg], result] of input) {
  if (command.startsWith('cd')) {
    if (arg === '/') currentPath = [];
    else if (arg === '..') currentPath.pop();
    else currentPath.push(arg);
    continue;
  }
  for (const [typeOrSize, name] of result) {
    getWorkingDir()[name] = typeOrSize === 'dir' ? {} : + typeOrSize;
  }
}
sizes = {};
queue = Object.keys(root).map(name => [name]);
// debugger;
while (queue.length) {
  const path = queue.pop();
  const folderOrSize = getWorkingDir(path);
  if (typeof folderOrSize === 'number') {
    sumSize += folderOrSize;
    path.forEach((_, index, arr) => {
      if (index === arr.length - 1) return;
      const path = arr.slice(0, index + 1).join('/');
      if (!sizes[path]) sizes[path] = 0;
      sizes[path] += folderOrSize;
    });
    continue;
  }
  queue.push(...Object.keys(folderOrSize).map(name => [...path, name]));
}

// part 1
console.log(Object.values(sizes).filter(a => a < 100_000).reduce((a, b) => a + b, 0));

// part 2
freeUp = 30_000_000 - (70_000_000 - sumSize);
console.log(Object.values(sizes).filter(a => a >= freeUp).sort((a, b) => a > b ? 1 : -1).at(0));
