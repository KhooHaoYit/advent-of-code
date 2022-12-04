// https://discord.com/channels/596708471102111744/596709196058066955/790840945011589140
// https://discord.com/channels/596708471102111744/596709196058066955/790841002427809883
input = ((locations, tickets, nearby) => {
  locations = locations.split('\n').map(i => {
    let { location, ranges } = i.match(/^(?<location>[^:]+): (?<ranges>.+)$/).groups;
    ranges = ranges.split(' or ').map(i => {
      const { min, max } = i.match(/^(?<min>\d+)-(?<max>\d+)$/).groups;
      return { min: +min, max: +max };
    });
    return { location, ranges };
  });
  tickets = tickets.split(/\n|,/).map(i => +i).filter(i => !isNaN(i));
  nearby = nearby.split(/\n/).splice(1).map(line => line.split(',').map(n => +n));
  return { locations, tickets, nearby };
})(...document.body.innerText.trim().split('\n\n'));
checkValid = (locations, num) => {
  for(const { ranges } of locations){
    for(const { min, max } of ranges){
      if(num >= min && num <= max) return true;
    }
  }
  return false;
}
inRange = (ranges, num) => {
  for(const { min, max } of ranges){
    if(num >= min && num <= max) return true;
  }
  return false;
}
input.nearby.reduce((sum, line) => {
  const current = line.filter(n => !checkValid(input.locations, n)).reduce((sum, i) => sum + i, 0);
  return sum += current;
}, 0);
input.nearby = input.nearby.filter(line => {
  return line.map(n => checkValid(input.locations, n)).reduce((last, current) => last && current, true);
});
getNearby = (tickets, list) => {
  return tickets.map((t, index) => {
    return [t, ...list.map(tickets => tickets[index])];
  });
}
resolve = (locations, list) => {
  const output = [];
  for(const tickets of list){
    const possible = [];
    for(const { location, ranges } of locations){
      let allInRange = tickets.map(t => inRange(ranges, t));
      allInRange = allInRange.reduce((last, current) => last && current, true);
      if(!allInRange) continue;
      possible.push(location);
    }
    output.push({ possible, tickets });
  }
  return output;
}
nearby = getNearby(input.tickets, input.nearby);
queue = resolve(input.locations, nearby);
 
output = [];
while(queue.length){
  queue = queue.sort((a, b) => a.possible.length > b.possible.length ? 1 : -1);
  const first = queue.shift();
  for(const entry of queue) entry.possible = entry.possible.filter(l => l !== first.possible[0]);
  output.push(first);
}
output.filter(info => info.possible[0].startsWith('departure')).reduce((sum, { tickets: [v] }) => sum * v, 1);
