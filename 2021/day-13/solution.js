const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input`, { encoding: "utf8" });

const foldValuesRegex = /(x|y)=(\d+)$/;

/**
 * @returns {{ grid: boolean[][], folds: { dir: string, value: number }[] }}
 */
function parseInput() {
  const split = input.split("\n\n");
  const pointLines = split[0].split("\n");
  const foldLines = split[1].split("\n");

  /**
   * @type {{ dir: string, value: number }[]}
   */
  const folds = [];
  for (const line of foldLines) {
    const [, dir, value] = line.match(foldValuesRegex);
    folds.push({ dir, value: Number(value) });
  }

  /**
   * @type {boolean[][]}
   */
  const grid = [];
  for (let y = 0; y <= folds[0].value * 2; y++) {
    grid.push([]);
    for (let x = 0; x <= folds[0].value * 2; x++) {
      grid[y][x] = false;
    }
  }

  for (const line of pointLines) {
    const [x, y] = line.split(",");
    grid[y][x] = true;
  }

  return { grid, folds };
}

/**
 * @param {void | boolean} part2
 */
function solution(part2) {
  const { folds, grid } = parseInput();

  for (const fold of folds) {
    if (fold.dir === "y") {
      const folded = grid.splice(fold.value, grid.length).reverse();
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          if (folded[y][x]) grid[y][x] = folded[y][x];
        }
      }
    } else {
      for (let y = 0; y < grid.length; y++) {
        const folded = grid[y].splice(fold.value, grid[y].length).reverse();
        for (let x = 0; x < grid[y].length; x++) {
          if (folded[x]) grid[y][x] = folded[x];
        }
      }
    }

    if (!part2) {
      let count = 0;
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) if (grid[y][x]) count++;
      }
      return count;
    }

    if (fold === folds[folds.length - 1]) {
      return (
        "\n\n" +
        grid
          .map((row) => row.map((cell) => (cell ? "#" : ".")).join(""))
          .join("\n") +
        "\n"
      );
    }
  }
}

console.log("2021 Day 13 - part 1:", solution());
console.log("2021 Day 13 - part 2:", solution(true));
