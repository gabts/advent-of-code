// https://adventofcode.com/2022/day/6

const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input", { encoding: "utf8" });

/**
 * @param {number} length
 */
function indexAfterFirstUniqueSequence(length) {
  for (let i = 0, j = length; j < input.length; i++, j++) {
    const set = new Set(input.slice(i, j).split(""));
    if (set.size === length) return j;
  }
}

console.log("2022 Day 6 - part 1:", indexAfterFirstUniqueSequence(4));
console.log("2022 Day 6 - part 2:", indexAfterFirstUniqueSequence(14));
