// https://discord.com/channels/596708471102111744/596709196058066955/791197801286467625
nextValue = (last, turn, lastCalled, calledCount) => {
  if(calledCount[last] === 1) return 0;
  return turn + 1 - lastCalled[last];
}
numberAt = (at, ...board) => {
  let last = null, lastCalled = {}, calledCount = {};
  for(let turn = 0; turn < at; ++turn){
    const value = board.shift() ?? nextValue(last, turn, lastCalled, calledCount);
    if(last !== null) lastCalled[last] = turn + 1;
    last = value;
    if(calledCount[value] === undefined) calledCount[value] = 0;
    ++calledCount[value];
  }
  return { last, lastCalled, calledCount };
}
numberAt(30000000, 12,20,0,6,1,17,7);
