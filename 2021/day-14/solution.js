const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input`, { encoding: "utf8" });

function solution(steps) {
  const split = input.split("\n\n");
  const polymer = split[0];
  const rules = split[1].split("\n").map((line) => line.split(" -> "));

  let map = {};
  for (let i = 0; i < polymer.length - 1; i++) {
    const key = polymer[i] + polymer[i + 1];
    map[key] = (map[key] || 0) + 1;
  }

  for (let i = 0; i < steps; i++) {
    const nextMap = {};
    for (const [pair, insert] of rules) {
      if (!map[pair]) continue;
      const keyA = pair[0] + insert;
      const keyB = insert + pair[1];
      nextMap[keyA] = (nextMap[keyA] || 0) + map[pair];
      nextMap[keyB] = (nextMap[keyB] || 0) + map[pair];
    }
    map = nextMap;
  }

  const count = {};
  for (const key in map) count[key[0]] = (count[key[0]] || 0) + map[key];
  count[polymer[polymer.length - 1]] += 1; // add last char
  const sorted = Object.values(count).sort((a, b) => a - b);

  return sorted[sorted.length - 1] - sorted[0];
}

console.log("2021 Day 14 - part 1:", solution(10));
console.log("2021 Day 14 - part 2:", solution(40));
