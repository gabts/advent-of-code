const fs = require("fs");

/**
 * @typedef {{
 *   x1: number,
 *   x2: number,
 *   y1: number,
 *   y2: number,
 *   z1: number,
 *   z2: number
 * }} Cuboid
 */

/**
 * @param {number} x1
 * @param {number} x2
 * @param {number} y1
 * @param {number} y2
 * @param {number} z1
 * @param {number} z2
 * @returns {Cuboid}
 */
function createCuboid(x1, x2, y1, y2, z1, z2) {
  return { x1, x2, y1, y2, z1, z2 };
}

/**
 * @type {[boolean, Cuboid][]}
 */
const input = fs
  .readFileSync(`${__dirname}/input`, { encoding: "utf8" })
  .split("\n")
  .map((line) => line.match(/(on|off)|(-?\d+)/g))
  .map((line) => [
    line[0] === "on",
    createCuboid(
      Number(line[1]),
      Number(line[2]),
      Number(line[3]),
      Number(line[4]),
      Number(line[5]),
      Number(line[6])
    ),
  ]);

/**
 * @param {Cuboid} cuboid
 * @returns {number}
 */
function volume(cuboid) {
  return (
    (cuboid.x2 - cuboid.x1 + 1) *
    (cuboid.y2 - cuboid.y1 + 1) *
    (cuboid.z2 - cuboid.z1 + 1)
  );
}

/**
 * @param {Cuboid} cuboid
 * @param {Cuboid[]} prevCuboids
 * @returns {number}
 */
function overlap(cuboid, prevCuboids) {
  let total = 0;

  for (const prevCuboid of prevCuboids) {
    const x1 = Math.max(prevCuboid.x1, cuboid.x1);
    const x2 = Math.min(prevCuboid.x2, cuboid.x2);
    const y1 = Math.max(prevCuboid.y1, cuboid.y1);
    const y2 = Math.min(prevCuboid.y2, cuboid.y2);
    const z1 = Math.max(prevCuboid.z1, cuboid.z1);
    const z2 = Math.min(prevCuboid.z2, cuboid.z2);

    if (x2 - x1 >= 0 && y2 - y1 >= 0 && z2 - z1 >= 0) {
      const intersectionCuboid = createCuboid(x1, x2, y1, y2, z1, z2);

      total +=
        volume(intersectionCuboid) -
        overlap(
          intersectionCuboid,
          prevCuboids.slice(1 + prevCuboids.indexOf(prevCuboid))
        );
    }
  }

  return total;
}

/**
 * @param {number} length
 * @returns {number}
 */
function solution(length) {
  let total = 0;

  /**
   * @type {Cuboid[]}
   */
  const cuboids = [];

  for (let i = length - 1; i >= 0; i--) {
    const [doTurnOn, cuboid] = input[i];
    if (doTurnOn) total += volume(cuboid) - overlap(cuboid, cuboids);
    cuboids.push(cuboid);
  }

  return total;
}

console.log("2021 Day 22 - part 1:", solution(20));
console.log("2021 Day 22 - part 2:", solution(input.length));
