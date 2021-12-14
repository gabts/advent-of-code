const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input`, { encoding: "utf8" });

function sumChars(map) {
  return Object.keys(map).reduce((acc, key, i, arr) => {
    const charA = key[0];
    acc[charA] = (acc[charA] || 0) + map[key];
    if (i === arr.length - 1) {
      const charB = key[1];
      acc[charB] = (acc[charB] || 0) + map[key];
    }
    return acc;
  }, {});
}

function differenceBetweenMaxAndMin(map) {
  const charsMap = sumChars(map);
  const sortedChars = Object.keys(charsMap).sort(
    (keyA, keyB) => charsMap[keyA] - charsMap[keyB]
  );

  const maxKey = sortedChars[sortedChars.length - 1];
  const minKey = sortedChars[0];

  const maxCount = charsMap[maxKey];
  const minCount = charsMap[minKey];

  return maxCount - minCount;
}

function solution(steps) {
  const split = input.split("\n\n");
  const rules = split[1]
    .split("\n")
    .map((line) => [line[0] + line[1], line[6]]);

  let map = {};
  for (let i = 0; i < split[0].length - 1; i++) {
    const key = split[0][i] + split[0][i + 1];
    map[key] = (map[key] || 0) + 1;
  }

  for (let i = 0; i < steps; i++) {
    const newMap = {};

    for (const [pair, insert] of rules) {
      if (!map[pair]) continue;
      const keyA = pair[0] + insert;
      const keyB = insert + pair[1];

      newMap[keyA] = (newMap[keyA] || 0) + map[pair];
      newMap[keyB] = (newMap[keyB] || 0) + map[pair];
    }
    map = newMap;
  }

  return differenceBetweenMaxAndMin(map) + 1;
}

console.log("2021 Day 14 - part 1:", solution(10));
console.log("2021 Day 14 - part 2:", solution(40));
