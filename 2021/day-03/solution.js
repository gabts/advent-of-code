const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n");

/**
 * 2021 Day 3 - part 1
 * @param {string[]} input
 * @returns {number}
 */
function part1(input) {
  /** @type {[number, number][]} */
  const map = [];
  for (let i = 0; i < input[0].length; i++) map.push([0, 0]);
  for (const row of input) {
    for (let i = 0; i < row.length; i++) {
      row[i] === "0" ? map[i][0]++ : map[i][1]++;
    }
  }
  let gamma = "";
  let epsilon = "";
  for (let i = 0; i < map.length; i++) {
    const moreZeroes = map[i][0] > map[i][1];
    gamma += moreZeroes ? 0 : 1;
    epsilon += moreZeroes ? 1 : 0;
  }
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

/**
 * 2021 Day 3 - part 2
 * @param {string[]} input
 * @returns {number}
 */
function part2(input) {
  /**
   * @param {string[]} arr
   * @param {boolean} common
   * @param {number} i
   * @returns {number}
   */
  function find(arr, common, i = 0) {
    if (arr.length === 1) return parseInt(arr[0], 2);
    const zero = [];
    const one = [];
    for (const row of arr) row[i] === "0" ? zero.push(row) : one.push(row);
    const bool = common ? zero.length > one.length : zero.length <= one.length;
    return find(bool ? zero : one, common, i + 1);
  }
  return find(input, true) * find(input, false);
}

console.log("2021 Day 3 - part 1:", part1(input));
console.log("2021 Day 3 - part 2:", part2(input));
