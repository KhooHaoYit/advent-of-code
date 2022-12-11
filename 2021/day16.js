// part 1
binary = document.body.innerText.trim().split('').reduce((binary, hex) => {
  const string = (+`0x${hex}`).toString(2);
  binary.push(...'0'.repeat(4 - string.length), ...string);
  return binary;
}, []).map(c => +c);
toNum = binary => +`0b${binary.join('')}`;
read = (binary, amount, at) => {
  const output = [];
  while (amount--) {
    output.push(binary[at++]);
  }
  return output;
}
parsePacket = (binary, at = 0) => {
  const version = toNum(read(binary, 3, at));
  at += 3;
  const type = toNum(read(binary, 3, at));
  at += 3;
  if (type === 4) {
    const acc = [];
    while (true) {
      const [more, ...data] = read(binary, 5, at);
      at += 5;
      acc.push(...data);
      if (more === 1) continue;
      break;
    }
    return [at, version, type, toNum(acc)];
  }
  const lengthType = toNum(read(binary, 1, at));
  at += 1;
  if (lengthType === 0) {
    const length = toNum(read(binary, 15, at));
    at += 15;
    const endAt = at + length;
    const subpackets = [];
    while (at !== endAt) {
      const packet = parsePacket(binary, at);
      subpackets.push(packet);
      at = packet[0];
    }
    return [at, version, type, subpackets];
  }
  const amount = toNum(read(binary, 11, at));
  at += 11;
  const subpackets = [];
  for (let remain = amount; remain; --remain) {
    const packet = parsePacket(binary, at);
    subpackets.push(packet);
    at = packet[0];
  }
  return [at, version, type, subpackets];
}
sumVersion = packet => {
  if (packet[2] === 4) return packet[1];
  return packet[1] + packet[3].reduce((sum, packet) => {
    sum += sumVersion(packet);
    return sum;
  }, 0);
}
parsed = parsePacket(binary);
sumVersion(parsed);



// part 2
binary = document.body.innerText.trim().split('').reduce((binary, hex) => {
  const string = (+`0x${hex}`).toString(2);
  binary.push(...'0'.repeat(4 - string.length), ...string);
  return binary;
}, []).map(c => +c);
toNum = binary => +`0b${binary.join('')}`;
read = (binary, amount, at) => {
  const output = [];
  while (amount--) {
    output.push(binary[at++]);
  }
  return output;
}
parsePacket = (binary, at = 0) => {
  const version = toNum(read(binary, 3, at));
  at += 3;
  const type = toNum(read(binary, 3, at));
  at += 3;
  if (type === 4) {
    const acc = [];
    while (true) {
      const [more, ...data] = read(binary, 5, at);
      at += 5;
      acc.push(...data);
      if (more === 1) continue;
      break;
    }
    return [at, version, type, toNum(acc)];
  }
  const lengthType = toNum(read(binary, 1, at));
  at += 1;
  if (lengthType === 0) {
    const length = toNum(read(binary, 15, at));
    at += 15;
    const endAt = at + length;
    const subpackets = [];
    while (at !== endAt) {
      const packet = parsePacket(binary, at);
      subpackets.push(packet);
      at = packet[0];
    }
    return [at, version, type, subpackets];
  }
  const amount = toNum(read(binary, 11, at));
  at += 11;
  const subpackets = [];
  for (let remain = amount; remain; --remain) {
    const packet = parsePacket(binary, at);
    subpackets.push(packet);
    at = packet[0];
  }
  return [at, version, type, subpackets];
}
evalulate = packet => {
  switch (packet[2]) {
    case 0: { // sum
      let sum = 0;
      for (const subpack of packet[3]) {
        sum += evalulate(subpack);
      }
      return sum;
    } break;
    case 1: { // multiply
      let result = 1;
      for (const subpack of packet[3]) {
        result *= evalulate(subpack);
      }
      return result;
    } break;
    case 2: { // minimum
      let minimum = Infinity;
      for (const subpack of packet[3]) {
        const result = evalulate(subpack);
        if (minimum > result) minimum = result;
      }
      return minimum;
    } break;
    case 3: { // max
      let max = -Infinity;
      for (const subpack of packet[3]) {
        const result = evalulate(subpack);
        if (max < result) max = result;
      }
      return max;
    } break;
    case 4: { // number
      return packet[3];
    } break;
    case 5: { // greater than
      const first = evalulate(packet[3][0]);
      const second = evalulate(packet[3][1]);
      return first > second ? 1 : 0;
    } break;
    case 6: { // less than
      const first = evalulate(packet[3][0]);
      const second = evalulate(packet[3][1]);
      return first < second ? 1 : 0;
    } break;
    case 7: { // equals
      const first = evalulate(packet[3][0]);
      const second = evalulate(packet[3][1]);
      return first == second ? 1 : 0;
    } break;
  }
}
parsed = parsePacket(binary);
evalulate(parsed);
