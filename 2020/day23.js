// https://discord.com/channels/596708471102111744/596709196058066955/791197515940364299
map = new Map();
format = (value) => {
  return { value, previous: null, next: null };
}
adds = (map, end, starting = 1, start = []) => {
  let last = null, first = null;
  for(const val of start){
    const obj = format(val);
    if(last !== null) last.next = obj;
    if(first === null) first = obj;
    obj.previous = last;
    last = obj;
    map.set(val, obj);
  }
  while(starting <= end){
    const obj = format(starting);
    last.next = obj;
    obj.previous = last;
    last = obj;
    map.set(starting, obj);
    ++starting;
  }
  last.next = first;
  first.previous = last;
  return first;
}
first = adds(map, 1000000, 10, '538914762'.split('').map(i => +i));
nextValue = (value, map, ...ignore) => {
  for(; 1; --value){
    if(value <= 0) value = map.size;
    if(ignore.indexOf(value) !== -1) continue;
    return value;
  }
}
stateAt = (start, at, map) => {
  for(; at--; start = start.next){
    const pickStart = start.next
      , pickEnd = pickStart.next.next
      , value = nextValue(start.value - 1, map
        , start.value, pickStart.value, pickStart.next.value, pickEnd.value)
      , found = map.get(value)
      , next = found.next;
      start.next = pickEnd.next;
      pickEnd.next.previous = start;
      found.next = pickStart;
      pickStart.previous = found;
      pickEnd.next = next;
      next.previous = pickEnd;
  }
  return start;
}
console.time('a');
stateAt(first, 10000000, map);
found = map.get(1);
found.next.value * found.next.next.value;
console.timeEnd('a');
