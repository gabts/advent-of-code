const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split(",")
  .map(Number);

/**
 * @param {number[]} input
 * @param {number} days
 */
function solution(input, days) {
  const fish = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  input.forEach((n) => fish[n]++);

  for (let day = 0; day < days; day++) {
    fish[7] += fish[0];
    fish.push(fish.shift());
  }

  return fish.reduce((acc, n) => acc + n, 0);
}

/**
 * 2021 Day 6 - part 1
 * @param {number[]} input
 * @returns {number}
 */
function part1(input) {
  return solution(input, 80);
}

/**
 * 2021 Day 6 - part 2
 * @param {number[]} input
 * @returns {number}
 */
function part2(input) {
  return solution(input, 256);
}

console.log("2021 Day 6 - part 1:", part1(input));
console.log("2021 Day 6 - part 2:", part2(input));
