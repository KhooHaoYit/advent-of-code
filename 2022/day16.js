// part 1
input = document.body.innerText.trim().split('\n').map(line => {
  const [left, right] = line.split(/to valves? /);
  return [
    left.match(/(?<= )[^ ]+/)[0],
    +left.match(/\d+/)[0],
    right.split(', '),
  ];
}).reduce((mapper, [name, rate, path]) => {
  mapper.set(name, [rate, path]);
  return mapper;
}, new Map());

buildPath = (graph, at) => {
  const visited = new Set([at]);
  const output = [];
  const queue = [[at, 0]];
  while (queue.length) {
    const [name, timeCost] = queue.shift();
    const [rate, path] = graph.get(name);
    for (const target of path) {
      if (visited.has(target)) continue;
      visited.add(target);
      queue.push([target, timeCost + 1]);
    }
    if (rate) output.push([name, timeCost + 1, rate]);
  }
  return output;
}

// location, openedValve, releasedPressure, releaseRate, timePassed
queue = [['AA', new Set(), 0, 0, 0]];
result = [];
while (queue.length) {
  const [location, openedValve, releasedPressure, releaseRate, timePassed] = queue.pop();
  const beforeLength = queue.length;
  for (const [targetLocation, timeCost, rate] of buildPath(input, location)) {
    if (openedValve.has(targetLocation)) continue;
    if (timePassed + timeCost >= 30) continue;
    const newOpenedValve = new Set(openedValve);
    newOpenedValve.add(targetLocation);
    queue.push([
      targetLocation,
      newOpenedValve,
      releasedPressure + releaseRate * timeCost,
      releaseRate + rate,
      timePassed + timeCost,
    ]);
  }
  if (beforeLength === queue.length) {
    result.push([location, openedValve, releasedPressure, releaseRate, timePassed]);
  }
}
result.map(entry => {
  entry[2] += entry[3] * (30 - entry[4]);
  entry[4] = 30;
  return entry;
}).sort((a, b) => a[2] > b[2] ? -1 : 1).at(0)[2];




// part 2 document.body.innerText
input = `
Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II
`.trim().split('\n').map(line => {
  const [left, right] = line.split(/to valves? /);
  return [
    left.match(/(?<= )[^ ]+/)[0],
    +left.match(/\d+/)[0],
    right.split(', '),
  ];
}).reduce((mapper, [name, rate, path]) => {
  mapper.set(name, [rate, path]);
  return mapper;
}, new Map());

pathCache = new Map();
buildPath = (graph, at) => {
  if (pathCache.has(at)) return pathCache.get(at);
  const visited = new Set([at]);
  const output = [];
  const queue = [[at, 0]];
  while (queue.length) {
    const [name, timeCost] = queue.shift();
    const [rate, path] = graph.get(name);
    for (const target of path) {
      if (visited.has(target)) continue;
      visited.add(target);
      queue.push([target, timeCost + 1]);
    }
    if (rate) output.push([name, timeCost + 1, rate]);
  }
  pathCache.set(at, output);
  return output;
}

// [p1, p2, p1Remain, p2Remain, openedValve, releasedPressure, rate, timeCost];
// timeline[timeCost][ [p1][p2][p1Remain][p2Remain] ] = [openedValve, releasedPressure, rate];

timelineKeyCache = new Map();
getTimelineKey = (p1, p2, p1Remain, p2Remain) => {
  const key = `${p1}.${p2}.${p1Remain}.${p2Remain}`;
  if (timelineKeyCache.has(key)) {
    const keyObj = timelineKeyCache.get(key).deref();
    if (keyObj) return keyObj;
  }
  const keyObj = { p1, p2, p1Remain, p2Remain };
  timelineKeyCache.set(key, new WeakRef(keyObj));
  return keyObj;
}

valveMapper = [...input.keys()];
attributeKeyCache = new Map();
getAttributeKey = (openedValve, releasedPressure, rate) => {
  const openedValveStateId = valveMapper.map(name => openedValve.has(name) ? '1' : '0').join('');
  const key = `${openedValveStateId}.${releasedPressure}.${rate}`;
  if (attributeKeyCache.has(key)) {
    const keyObj = attributeKeyCache.get(key).deref();
    if (keyObj) return keyObj;
  }
  const keyObj = { openedValve, releasedPressure, rate };
  attributeKeyCache.set(key, new WeakRef(keyObj));
  return keyObj;
}

goAllPath = function* (graph, went, p1, p2, p1Remain, p2Remain) {
  const [lower, higher, higherTime] = p1Remain > p2Remain ? [p2, p1, p1Remain] : [p1, p2, p2Remain];
  for (const [name, timeCost, newRate] of buildPath(graph, lower)) {
    if (went.has(name)) continue;
    if (higherTime) {
      yield [name, higher, timeCost, higherTime, Math.min(timeCost, higherTime)];
      continue;
    }
    for (const [name2, timeCost2, newRate2] of buildPath(graph, higher)) {
      if (went.has(name2) || name === name2) continue;
      yield [name, name2, timeCost, timeCost2, Math.min(timeCost, timeCost2)];
    }
  }
}

currentBest = 0;
timeline = Array(26).fill().map(() => new Map());
timeline[0].set(getTimelineKey('AA', 'AA', 0, 0), new Set([getAttributeKey(new Set(), 0, 0)]));
for (let time in timeline) {
  time -= 0;
  const current = timeline[time];
  console.log(time, current.size, [...current.values()].reduce((acc, val) => acc + val.size, 0));
  for (const [{ p1, p2, p1Remain, p2Remain }, entries] of current) {
    let gotNewPath = false;
    for (const { openedValve, releasedPressure, rate } of entries) {
      for (const [newP1, newP2, newP1Cost, newP2Cost, timeStep] of goAllPath(graph, openedValve, p1, p2, p1Remain, p2Remain)) {
        const newTime = time + timeStep;
        if (newTime >= timeline.length) continue;
        const newOpenedValve = new Set(openedValve);
        newOpenedValve.add(newP1);
        newOpenedValve.add(newP2);
        const timelineKey = getTimelineKey(newP1, newP2, newP1Cost - timeStep, newP2Cost - timeStep);
        const attributeKey = getAttributeKey(newOpenedValve, releasedPressure + rate * timeStep, rate);
        const newTimeline = timeline[newTime].get(timelineKey);
        if (newTimeline) newTimeline.add(attributeKey);
        else timeline[newTime].set(timelineKey, new Set([attributeKey]));
        gotNewPath = true;
      }
      // for (const [name, timeCost, newRate] of buildPath(input, lower)) {
      //   if (openedValve.has(name)) continue;
      //   const timeStep = Math.min(timeCost, higherTime);
      //   const newTime = time + timeStep;
      //   if (newTime >= timeline.length) continue;
      //   const newOpenedValve = new Set(openedValve);
      //   newOpenedValve.add(name);
      //   const timelineKey = getTimelineKey(name, higher, timeCost - timeStep, higherTime - timeStep);
      //   const attributeKey = getAttributeKey(newOpenedValve, releasedPressure + rate * timeStep, rate + newRate);
      //   const newTimeline = timeline[newTime].get(timelineKey);
      //   if (newTimeline) newTimeline.add(attributeKey);
      //   else timeline[newTime].set(timelineKey, new Set([attributeKey]));
      //   gotNewPath = true;
      // }
    }
    if (!gotNewPath) for (const { openedValve, releasedPressure, rate } of entries) {
      const waitedReleasedPressure = releasedPressure + rate * (timeline.length - time);
      if (currentBest < waitedReleasedPressure) currentBest = waitedReleasedPressure;
      if (waitedReleasedPressure > 1707) console.log('tes');
    }
  }
}
currentBest;




