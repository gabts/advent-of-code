const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split(",")
  .map(Number);

/**
 * @param {boolean} part2
 * @returns {number}
 */
function solution(part2 = false) {
  let leastSteps = Infinity;

  for (let target = Math.min(...input); target < Math.max(...input); target++) {
    let steps = 0;
    for (const position of input) {
      const diff = Math.abs(target - position);
      steps += part2 ? ((diff + 1) * diff) / 2 : diff;
    }
    if (steps < leastSteps) leastSteps = steps;
  }

  return leastSteps;
}

console.log("2021 Day 7 - part 1:", solution());
console.log("2021 Day 7 - part 2:", solution(true));
