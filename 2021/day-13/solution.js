const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input`, { encoding: "utf8" });

const foldValuesRegex = /(x|y)=(\d+)$/;

/**
 * @returns {{ folds: { up: boolean, at: number }[], points: number[][] }}
 */
function parseInput() {
  const split = input.split("\n\n");
  const points = split[0]
    .split("\n")
    .map((line) => line.split(",").map(Number));

  const foldLines = split[1].split("\n");

  /**
   * @type {{ up: boolean, at: number }[]}
   */
  const folds = [];
  for (const line of foldLines) {
    const [, dir, value] = line.match(foldValuesRegex);
    folds.push({ up: dir === "y", at: Number(value) });
  }

  return { folds, points };
}

/**
 * @param {number[][]} points
 */
function draw(points) {
  const maxX = Math.max(...points.map((p) => p[0]));
  const maxY = Math.max(...points.map((p) => p[1]));
  const arr = [];
  for (let y = 0; y <= maxY; y++) {
    arr.push([]);
    for (let x = 0; x <= maxX; x++) arr[y][x] = "-";
  }
  for (const [x, y] of points) arr[y][x] = "X";
  return "\n\n" + arr.map((row) => row.join("")).join("\n");
}

/**
 * @param {void | boolean} part2
 * @returns {number | string}
 */
function solution(part2) {
  const { folds, points } = parseInput();

  for (const fold of folds) {
    const i = fold.up ? 1 : 0;
    const max = Math.max(...points.map((point) => point[i]));

    for (let j = 0; j < points.length; j++) {
      if (points[j][i] > fold.at) {
        points[j][i] = max - points[j][i];
      }
    }

    if (!part2) {
      return points
        .map(([x, y]) => "" + x + y)
        .filter((point, i, arr) => arr.indexOf(point) === i).length;
    }

    if (fold == folds[folds.length - 1]) {
      return draw(points);
    }
  }
}

console.log("2021 Day 13 - part 1:", solution());
console.log("2021 Day 13 - part 2:", solution(true));
