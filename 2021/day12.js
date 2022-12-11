// part 1
//start,A,b,A,c,A,b,A,end
connections = document.body.innerText.trim().split('\n').map(line => line.split('-'));
isBig = text => text.toUpperCase() === text;
buildMap = (connections) => {
  const map = new Map();
  for (const [start, end] of connections) {
    if (!map.has(start)) map.set(start, []);
    if (!map.has(end)) map.set(end, []);
    map.get(start).push(end);
    map.get(end).push(start);
  }
  return map;
}
queryPath = function* (map, at, went = new Set()) {
  for (const target of map.get(at)) {
    if (target === 'start') continue;
    const newWent = new Set(went);
    if (!isBig(target) && went.has(target)) {
      if (went.has('I WENT TWICE ALREADY')) continue;
      newWent.add('I WENT TWICE ALREADY');
    }
    newWent.add(target);
    yield [target, newWent];
  }
}
map = buildMap(connections);
query = [['start', new Set(['start']), ['start']]];
paths = 0;
while (query.length) {
  const [at, went, direction] = query.pop();
  for (const [newAt, newWent] of queryPath(map, at, went)) {
    const newDirection = [...direction, newAt];
    if (newAt === 'end') {
      console.log(newDirection.join(','));
      ++paths;
      continue;
    }
    query.push([newAt, newWent, newDirection]);
  }
}
paths;



// part 2
//start,A,b,A,c,A,b,A,end
connections = document.body.innerText.trim().split('\n').map(line => line.split('-'));
isBig = text => text.toUpperCase() === text;
buildMap = (connections) => {
  const map = new Map();
  for (const [start, end] of connections) {
    if (!map.has(start)) map.set(start, []);
    if (!map.has(end)) map.set(end, []);
    map.get(start).push(end);
    map.get(end).push(start);
  }
  return map;
}
queryPath = function* (map, at, went = new Set()) {
  for (const target of map.get(at)) {
    if (target === 'start') continue;
    const newWent = new Set(went);
    if (!isBig(target) && went.has(target)) {
      if (went.has('I WENT TWICE ALREADY')) continue;
      newWent.add('I WENT TWICE ALREADY');
    }
    newWent.add(target);
    yield [target, newWent];
  }
}
map = buildMap(connections);
query = [['start', new Set(['start']), ['start']]];
paths = 0;
while (query.length) {
  const [at, went, direction] = query.pop();
  for (const [newAt, newWent] of queryPath(map, at, went)) {
    const newDirection = [...direction, newAt];
    if (newAt === 'end') {
      console.log(newDirection.join(','));
      ++paths;
      continue;
    }
    query.push([newAt, newWent, newDirection]);
  }
}
paths;
