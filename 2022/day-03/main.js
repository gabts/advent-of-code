// https://adventofcode.com/2022/day/3

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n");

/**
 * @param {string} letter
 */
function priority(letter) {
  const positionInAlphabet = parseInt(letter, 36) - 10;
  const offset = letter.toLowerCase() === letter ? 1 : 27;
  return positionInAlphabet + offset;
}

function part1() {
  let sum = 0;

  for (const row of input) {
    const half = row.length / 2;
    const department1 = new Set(row.slice(0, half).split(""));
    const department2 = row.slice(half);

    for (const char of department2) {
      if (department1.has(char)) {
        sum += priority(char);
        break;
      }
    }
  }

  return sum;
}

function part2() {
  let sum = 0;

  /** @type {string[]} */
  const group = [];

  for (const row of input) {
    group.push(row);
    if (group.length < 3) continue;

    const set1 = new Set(group[1].split(""));
    const set2 = new Set(group[2].split(""));

    for (const char of group[0]) {
      if (set1.has(char) && set2.has(char)) {
        sum += priority(char);
        group.length = 0;
        break;
      }
    }
  }

  return sum;
}

console.log("2022 Day 3 - part 1:", part1());
console.log("2022 Day 3 - part 2:", part2());
