// https://discord.com/channels/596708471102111744/596709196058066955/790463340144230410
input = document.body.innerText.trim().split('\n').map(i => {
  const { groups } = i.match(/^(?<ingredients>[^(]+) \(contains (?<contains>[^)]+)\)$/);
  groups.ingredients = groups.ingredients.split(' ');
  groups.contains = groups.contains.split(', ');
  return groups;
});
fetchAll = (finds) => {
  if(!Array.isArray(finds)) throw 'array please';
  return input.filter(({ contains }) => {
    for(const ingredient of finds) if(contains.indexOf(ingredient) === -1) return false;
    return true;
  });
}
findSimilar = (list) => {
  return list.reduce((last, current) => {
    return {
      ingredients: last.ingredients.filter(i => current.ingredients.indexOf(i) !== -1),
      contains: last.contains.filter(i => current.contains.indexOf(i) !== -1)
    }
  });
}
list = {};
for(const { contains } of input){
  for(const i of contains){
    if(list[i]) continue;
    list[i] = findSimilar(fetchAll([i])).ingredients;
  }
}
removeSimilar = (list, item) => {
  for(const index in list) list[index][1] = list[index][1].filter(food => food !== item);
  return list;
}
list = Object.entries(list);
table = {};
while(list.length){
  list = list.sort(([, a], [, b]) => a.length > b.length ? 1 : -1);
  [key, value] = list.shift();
  removeSimilar(list, value[0]);
  table[key] = value[0];
}
has = Object.values(table);
input.reduce((count, { ingredients }) => {
  count += ingredients.reduce((count, i) => has.indexOf(i) === -1 ? count + 1 : count, 0);
  return count;
}, 0);
Object.keys(table).sort().map(key => table[key]).join(',');
