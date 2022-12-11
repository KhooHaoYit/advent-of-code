// part 1
document.body.innerText.trim().split('\n')
  .map(a => +a)
  .reduce((sum, val) => sum + val, 0);



// part 2
list = document.body.innerText.trim().split('\n')
  .map(a => +a);
marked = new Set([0]);
found = null, at = 0;
loop: while (true) {
  for (const delta of list) {
    at += delta;
    if (marked.has(at)) {
      found = at;
      break loop;
    }
    marked.add(at);
  }
}
found;
