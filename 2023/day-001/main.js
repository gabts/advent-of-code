// https://adventofcode.com/2023/day/1

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n");

function part1() {
  function findFromLeft(str) {
    for (let i = 0; i < str.length; i++) {
      const n = str[i];
      if (!isNaN(n)) return n;
    }
  }

  function findFromRight(str) {
    for (let i = str.length; i >= 0; i--) {
      const n = str[i];
      if (!isNaN(n)) return n;
    }
  }

  let answer = 0;

  for (const line of input) {
    const first = findFromLeft(line);
    const last = findFromRight(line);
    answer += Number(first + last);
  }

  return answer;
}

function part2() {
  const map = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  function findFromLeft(str) {
    for (let i = 0; i < str.length; i++) {
      const n = str[i];
      if (!isNaN(n)) return n;

      for (let j = 3; j <= 5; j++) {
        const seq = str.substring(i, i + j);
        const n = map[seq];
        if (n) return n;
      }
    }
  }

  function findFromRight(str) {
    for (let i = str.length; i >= 0; i--) {
      const n = str[i];
      if (!isNaN(n)) return n;

      for (let j = 3; j <= 5; j++) {
        const seq = str.substring(i - j, i);
        const n = map[seq];
        if (n) return n;
      }
    }
  }

  let answer = 0;

  for (const line of input) {
    const first = findFromLeft(line);
    const last = findFromRight(line);
    answer += Number(first + last);
  }

  return answer;
}

console.log("2023 Day 01 - part 1:", part1());
console.log("2023 Day 01 - part 2:", part2());
