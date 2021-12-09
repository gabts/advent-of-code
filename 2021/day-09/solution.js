const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n")
  .map((row) => row.split("").map(Number));

/**
 * @param {number} x
 * @param {number} y
 * @returns {number[][]}
 */
function findAdjacent(x, y) {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
}

/**
 * @param {number} height
 * @param {number} x
 * @param {number} y
 * @returns {boolean}
 */
function isLower(height, x, y) {
  if (input[x] === undefined || input[x][y] === undefined) return true;
  return height < input[x][y];
}

/**
 * @param {number} sourceX
 * @param {number} sourceY
 * @returns {boolean}
 */
function isLowerThanAdjacent(sourceX, sourceY) {
  const height = input[sourceX][sourceY];
  for (const [x, y] of findAdjacent(sourceX, sourceY)) {
    if (!isLower(height, x, y)) return false;
  }
  return true;
}

/**
 * @returns {[number,number][]}
 */
function findLowPoints() {
  /**
   * @type {[number,number][]}
   */
  const points = [];
  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      if (isLowerThanAdjacent(x, y)) points.push([x, y]);
    }
  }
  return points;
}

/**
 * @param {number} sourceX
 * @param {number} sourceY
 * @param {Object.<string, Object.<string, boolean>>} seen
 * @returns {number}
 */
function findBasinSize(sourceX, sourceY, seen) {
  let count = 1;
  for (const [x, y] of findAdjacent(sourceX, sourceY)) {
    if (!seen[x]) seen[x] = {};
    else if (seen[x][y]) continue;
    seen[x][y] = true;
    if (input[x] === undefined || input[x][y] === undefined) continue;
    else if (input[x][y] < 9) count += findBasinSize(x, y, seen);
  }
  return count;
}

/**
 * 2021 Day 9 - part 1
 * @returns {number}
 */
function part1() {
  return findLowPoints()
    .map(([x, y]) => input[x][y])
    .reduce((sum, n) => sum + n + 1, 0);
}

/**
 * 2021 Day 9 - part 2
 * @returns {number}
 */
function part2() {
  const basins = findLowPoints()
    .map(([x, y]) => findBasinSize(x, y, { [x]: { [y]: true } }))
    .sort((a, b) => b - a);
  return basins[0] * basins[1] * basins[2];
}

console.log("2021 Day 9 - part 1:", part1());
console.log("2021 Day 9 - part 2:", part2());
