// https://adventofcode.com/2022/day/7

const fs = require("fs");

/**
 * @param {string} data
 * @returns {Record<string, number>}
 */
function parseInput(data) {
  const lines = data.split("\n");

  /** @type {Record<string, number>} */
  const dirs = {};

  /** @type {string[]} */
  const path = [];

  /** @type {RegExpMatchArray | null} */
  let fileSize = null;

  /** @type {RegExpMatchArray | null} */
  let dir = null;

  const cdPathRegex = /^\$ cd (.*)/;
  const fileSizeRegex = /^\d+/;

  for (const line of lines) {
    if ((dir = line.match(cdPathRegex))) {
      const dirName = dir[1];
      dirName === ".." ? path.pop() : path.push(dirName);
    } else if ((fileSize = line.match(fileSizeRegex))) {
      for (let i = 0; i < path.length; i++) {
        const dirname = path.slice(0, i + 1).join();
        dirs[dirname] = (dirs[dirname] || 0) + Number(fileSize[0]);
      }
    }
  }
  return dirs;
}

const input = parseInput(
  fs.readFileSync(__dirname + "/input", { encoding: "utf8" })
);

const sizes = Object.values(input);

function part1() {
  return sizes.reduce((sum, value) => (value <= 100000 ? sum + value : sum), 0);
}

function part2() {
  const missingSpace = 30000000 - (70000000 - input["/"]);
  return sizes.reduce((smallestSize, size) => {
    return size >= missingSpace && size < smallestSize ? size : smallestSize;
  }, Infinity);
}

console.log("2022 Day 7 - part 1:", part1());
console.log("2022 Day 7 - part 2:", part2());
