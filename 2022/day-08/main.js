// https://adventofcode.com/2022/day/8

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n")
  .map((line) => line.split("").map(Number));

const yLength = input.length;
const xLength = input[0].length;

/**
 * @type {[number, number][]}
 */
const dirs = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

function part1() {
  let count = 0;

  for (let y = 0; y < input[0].length; y++) {
    for (let x = 0; x < input.length; x++) {
      if (y === 0 || x === 0 || y === yLength || x === xLength) {
        count++;
        continue;
      }

      let visible = false;

      for (const dir of dirs) {
        let xx = x;
        let yy = y;

        while (true) {
          xx += dir[0];
          yy += dir[1];

          if (input[yy] && input[yy][xx] >= input[y][x]) break;

          if (yy === 0 || xx === 0 || yy === yLength || xx === xLength) {
            count++;
            visible = true;
            break;
          }
        }

        if (visible) break;
      }
    }
  }

  return count;
}

function part2() {
  let score = 0;

  for (let y = 0; y < input[0].length; y++) {
    for (let x = 0; x < input.length; x++) {
      let positionScore = 0;

      for (const dir of dirs) {
        let xx = x;
        let yy = y;
        let distance = 0;

        while (true) {
          yy += dir[0];
          xx += dir[1];
          if (yy < 0 || xx < 0 || yy >= yLength || xx >= xLength) break;
          distance++;
          if (input[yy] && input[yy][xx] >= input[y][x]) break;
        }

        positionScore = (positionScore || 1) * (distance || 1);
      }

      score = Math.max(score, positionScore);
    }
  }

  return score;
}

console.log("2022 Day 8 - part 1:", part1());
console.log("2022 Day 8 - part 2:", part2());
