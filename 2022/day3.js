// part 1
a = document.body.innerText.trim().split('\n').map(line => {
    const [left, right] = [line.substring(0, line.length / 2), line.substring(line.length / 2)];
    const common = (() => {
      for(const char of line){
         if(right.indexOf(char) === -1) continue;
          return char;
      }
        return null;
    })();
    return [common, left, right];
});
a.reduce((acc, item) => {
    const common = item[0];
    if(/^[a-z]$/.test(common)) acc += common.charCodeAt() - 'a'.charCodeAt() + 1;
    else acc += common.charCodeAt() - 'A'.charCodeAt() + 27;
    return acc;
}, 0);

// part 2
findAllCommon = (s1, s2) => {
  const common = new Set();
  for(const char of s1){
    if(s2.indexOf(char) === -1) continue;
     common.add(char);
  }
  return [...common];
}
a = document.body.innerText.trim().split(/([^\n]+\n[^\n]+\n[^\n]+)\n/g).filter(a => a).map(line => {
    const [s1,s2,s3] = line.split('\n');
    return [line, findAllCommon(findAllCommon(s1,s2).join(''), s3)];
});
a.reduce((acc, item) => {
    const common = item[1][0];
    if(/^[a-z]$/.test(common)) acc += common.charCodeAt() - 'a'.charCodeAt() + 1;
    else acc += common.charCodeAt() - 'A'.charCodeAt() + 27;
    return acc;
}, 0);
