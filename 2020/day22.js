// https://discord.com/channels/596708471102111744/596709196058066955/790839427848994856
input = document.body.innerText.trim().split('\n\n').map(i => {
  const cards = i.split('\n')
    , player = cards.shift().match(/^Player (\d+):$/)[1];
  return { cards: cards.map(i => +i), player: +player };
});
nextRound = (p1, p2) => {
  const played = [];
  while(1){
    const state = `${p1.cards.join()}\n${p2.cards.join()}`;
    const p1card = p1.cards.shift()
      , p2card = p2.cards.shift();
    let p1won = false;
    if(played.indexOf(state) !== -1) p1won = true;
    else if(p1card <= p1.cards.length && p2card <= p2.cards.length){
//      console.log('Recursive round');
      const result = nextRound({ cards: p1.cards.slice(0, p1card), player: 1 }
        , { cards: p2.cards.slice(0, p2card), player: 2 });
      if(result.player === 1){
        p1won = true;
//        console.log(`Recursive round did p1 won: ${p1won}`);
      }
    }
    else if(p1card > p2card) p1won = true;
//    console.log(p1card, p2card, `did p1 won: ${p1won}`);
    if(p1won) p1.cards.push(p1card, p2card);
    else p2.cards.push(p2card, p1card);
    if(p1.cards.length === 0) return p2;
    else if(p2.cards.length === 0) return p1;
    played.push(state);
  }
}
output = nextRound(...input);
output.cards.reverse().map((v, index) => v * (index + 1)).reduce((sum, v) => sum + v);
