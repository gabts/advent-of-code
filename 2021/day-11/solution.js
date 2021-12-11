const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input", { encoding: "utf8" });

/**
 * @param {number[][]} grid
 * @param {number} y
 * @param {number} x
 * @param {Object.<string, Object.<string, boolean>>} flashed
 * @param {() => void} onFlash
 */
function flash(grid, y, x, flashed, onFlash) {
  grid[y][x] = 0;
  flashed[y][x] = true;
  onFlash();

  for (let yy = y - 1; yy <= y + 1; yy++) {
    for (let xx = x - 1; xx <= x + 1; xx++) {
      handlePoint(grid, yy, xx, flashed, onFlash);
    }
  }
}

/**
 * @param {number[][]} grid
 * @param {number} y
 * @param {number} x
 * @param {Object.<string, Object.<string, boolean>>} flashed
 * @param {() => void} onFlash
 */
function handlePoint(grid, y, x, flashed, onFlash) {
  if (y >= 0 && y < 10 && x >= 0 && x < 10) {
    if (grid[y][x] === 9) {
      flash(grid, y, x, flashed, onFlash);
    } else if (!flashed[y][x]) {
      grid[y][x]++;
    }
  }
}

/**
 * @param {number[][]} grid
 * @param {() => void} onFlash
 */
function step(grid, onFlash) {
  /**
   * @type {Object.<string, Object.<string, boolean>>}
   */
  const flashed = {};
  for (let i = 0; i < 10; i++) flashed[i] = {};

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      handlePoint(grid, y, x, flashed, onFlash);
    }
  }
}

/**
 * 2021 Day 11 - part 1
 * @returns {number}
 */
function part1() {
  const grid = input.split("\n").map((row) => row.split("").map(Number));

  let flashes = 0;
  for (let i = 0; i < 100; i++) step(grid, () => flashes++);
  return flashes;
}

/**
 * 2021 Day 11 - part 2
 * @returns {number}
 */
function part2() {
  const grid = input.split("\n").map((row) => row.split("").map(Number));

  let i = 1;
  while (true) {
    let flashes = 0;
    step(grid, () => flashes++);
    if (flashes === 100) return i;
    i++;
  }
}

console.log("2021 Day 11 - part 1:", part1());
console.log("2021 Day 11 - part 2:", part2());
