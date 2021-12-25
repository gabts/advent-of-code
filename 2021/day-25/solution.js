const fs = require("fs");

const input = fs
  .readFileSync(`${__dirname}/input`, { encoding: "utf8" })
  .trim();

/**
 * @returns {number}
 */
function solution() {
  let grid = input.split("\n").map((line) => line.split(""));
  const height = grid.length;
  const width = grid[0].length;

  let steps = 0;

  while (true) {
    let moved = false;
    steps++;

    const tempGrid = [...grid.map((row) => [...row])];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] !== ">") continue;
        const nextX = (x + 1) % width;
        if (grid[y][nextX] !== ".") continue;
        moved = true;
        tempGrid[y][nextX] = ">";
        tempGrid[y][x] = ".";
      }
    }

    grid = [...tempGrid.map((row) => [...row])];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (tempGrid[y][x] !== "v") continue;
        const nextY = (y + 1) % height;
        if (tempGrid[nextY][x] !== ".") continue;
        moved = true;
        grid[nextY][x] = "v";
        grid[y][x] = ".";
      }
    }

    if (!moved) return steps;
  }
}

console.log("2021 Day 25:", solution());
