const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n");

/**
 * @param {string} str
 * @returns {[string, number]}
 */
function parseLine(str) {
  const split = str.split(" ");
  return [split[0], Number(split[1])];
}

/**
 * 2021 Day 2 - part 1
 * @param {string[]} input
 * @returns {number}
 */
function part1(input) {
  let depth = 0;
  let horizontal = 0;
  for (let i = 0; i < input.length; i++) {
    const [dir, val] = parseLine(input[i]);
    if (dir === "forward") horizontal += val;
    else depth += dir === "up" ? -val : val;
  }
  return depth * horizontal;
}

/**
 * 2021 Day 2 - part 2
 * @param {string[]} input
 * @returns {number}
 */
function part2(input) {
  let aim = 0;
  let depth = 0;
  let horizontal = 0;
  for (let i = 0; i < input.length; i++) {
    const [dir, val] = parseLine(input[i]);
    if (dir === "forward") {
      horizontal += val;
      depth += aim * val;
    } else {
      aim += dir === "up" ? -val : val;
    }
  }
  return depth * horizontal;
}

console.log("2021 Day 2 - part 1:", part1(input));
console.log("2021 Day 2 - part 2:", part2(input));
