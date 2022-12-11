// part 1
fishs = document.body.innerText.trim().split(',').map(a => +a).reduce((fishs, day) => {
  if (!fishs[day]) fishs[day] = 0;
  ++fishs[day];
  return fishs;
}, []);
countFishs = fishs => fishs.reduce((sum, val) => sum + val, 0);
stepDay = fishs => {
  const reproduce = fishs.splice(0, 1)[0] ?? 0;
  fishs[8] = reproduce;
  fishs[6] = (fishs[6] ?? 0) + reproduce;
}
for (let count = 80; count; --count) stepDay(fishs);
countFishs(fishs);



// part 2
fishs = document.body.innerText.trim().split(',').map(a => +a).reduce((fishs, day) => {
  if (!fishs[day]) fishs[day] = 0;
  ++fishs[day];
  return fishs;
}, []);
countFishs = fishs => fishs.reduce((sum, val) => sum + val, 0);
stepDay = fishs => {
  const reproduce = fishs.splice(0, 1)[0] ?? 0;
  fishs[8] = reproduce;
  fishs[6] = (fishs[6] ?? 0) + reproduce;
}
for (let count = 256; count; --count) stepDay(fishs);
countFishs(fishs);
