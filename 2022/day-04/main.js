// https://adventofcode.com/2022/day/4

const fs = require("fs");

const numbersRegex = /[0-9]+/g;

/**
 * @param {string} row
 * @returns {number[]}
 */
function rowToNumbers(row) {
  const match = row.match(numbersRegex);
  if (!match) throw "";
  return match.map(Number);
}

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n")
  .map(rowToNumbers);

function part1() {
  let count = 0;

  for (const [a1, a2, b1, b2] of input) {
    if ((a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2)) count++;
  }

  return count;
}

function part2() {
  let count = 0;

  for (const [a1, a2, b1, b2] of input) {
    if (!(a2 < b1 || a1 > b2)) count++;
  }

  return count;
}

console.log("2022 Day 4 - part 1:", part1());
console.log("2022 Day 4 - part 2:", part2());
