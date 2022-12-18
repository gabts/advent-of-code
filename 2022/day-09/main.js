// https://adventofcode.com/2022/day/9

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n")
  .map((line) => line.split(" "));

/**
 * offset x, y to move up, down, left, right
 * @type {Record<string, { x: number, y: number }>}
 */
const dirs = {
  U: { x: 0, y: 1 },
  D: { x: 0, y: -1 },
  R: { x: 1, y: 0 },
  L: { x: -1, y: 0 },
};

/**
 * @param {number} knots
 */
function solve(knots) {
  /**
   * @type {{ x: number, y: number }[]}
   */
  const rope = [];
  for (let i = 0; i < knots; i++) rope.push({ y: 0, x: 0 });

  /**
   * @type {Record<string, undefined | true>}
   */
  const visited = {};

  for (const [dir, steps] of input) {
    for (let step = Number(steps); step > 0; step--) {
      // move head
      rope[0].x += dirs[dir].x;
      rope[0].y += dirs[dir].y;

      // move tails
      for (let i = 1; i < rope.length; i++) {
        const curr = rope[i];
        const prev = rope[i - 1];

        // move curr if not adjacent horizontally or vertically to prev
        if (Math.abs(curr.x - prev.x) > 1 || Math.abs(curr.y - prev.y) > 1) {
          curr.x += Math.sign(prev.x - curr.x);
          curr.y += Math.sign(prev.y - curr.y);
        }
      }

      // mark tail coordinates
      const tail = rope[rope.length - 1];
      visited[tail.x + "," + tail.y] = true;
    }
  }

  return Object.keys(visited).length;
}

console.log("2022 Day 9 - part 1:", solve(2));
console.log("2022 Day 9 - part 2:", solve(10));
