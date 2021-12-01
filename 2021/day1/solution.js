const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n")
  .map(Number);

/**
 * Day 1 - part 1
 * @param {number[]} input
 * @returns {number}
 */
function part1(input) {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] > (input[i - 1] || Infinity)) count++;
  }
  return count;
}

/**
 * Day 1 - part 2
 * @param {number[]} input
 * @returns {number}
 */
function part2(input) {
  let count = 0;
  let prevSum = Infinity;
  for (let i = 1; i < input.length - 1; i++) {
    const sum = input[i - 1] + input[i] + input[i + 1];
    if (sum > prevSum) count++;
    prevSum = sum;
  }
  return count;
}

console.log("Day 1 - part 1:", part1(input));
console.log("Day 1 - part 2:", part2(input));
