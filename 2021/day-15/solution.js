const fs = require("fs");

const input = fs
  .readFileSync(`${__dirname}/input`, { encoding: "utf8" })
  .split("\n")
  .map((line) => line.split("").map(Number));

const adjacentX = [-1, 0, 1, 0];
const adjacentY = [0, -1, 0, 1];

/**
 * @param {number} multiplier
 * @returns {number}
 */
function solution(multiplier) {
  const lenY = input.length;
  const lenX = input[0].length;
  const maxLenY = lenY * multiplier;
  const maxLenX = lenX * multiplier;

  /**
   * @type {number[][]}
   */
  const distances = [];

  for (let y = 0; y < maxLenY; y++) {
    distances.push([]);
    for (let x = 0; x < maxLenX; x++) {
      distances[y][x] = Infinity;
    }
  }

  distances[0][0] = 0;

  /**
   * @type {[number, number][]}
   */
  const queue = [[0, 0]];

  while (queue.length) {
    let closestNodeDistance = Infinity;
    let nodeIndex = 0;

    for (let i = 0; i < queue.length; i++) {
      const [y, x] = queue[i];
      if (distances[y][x] < closestNodeDistance) {
        closestNodeDistance = distances[y][x];
        nodeIndex = i;
      }
    }

    const [[y, x]] = queue.splice(nodeIndex, 1);

    for (let i = 0; i < 4; i++) {
      const xx = x + adjacentX[i];
      const yy = y + adjacentY[i];
      if (xx < 0 || xx >= maxLenX || yy < 0 || yy >= maxLenY) continue;

      let distance =
        input[yy % lenY][xx % lenX] +
        Math.floor(yy / lenY) +
        Math.floor(xx / lenX);

      if (distance > 9) distance = ((distance + 8) % 9) + 1;
      const cost = distances[y][x] + distance;
      if (cost >= distances[yy][xx]) continue;

      distances[yy][xx] = cost;
      queue.push([yy, xx]);
    }
  }

  return distances[maxLenY - 1][maxLenX - 1];
}

console.log("2021 Day 15 - part 1:", solution(1));
console.log("2021 Day 15 - part 2:", solution(5));
