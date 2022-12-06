// https://adventofcode.com/2022/day/5

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n");

const instructions = input
  .splice(input.findIndex((row) => row === "") + 1)
  .map((row) => {
    const match = row.match(/\d+/g);
    if (!match) throw "unexpected input";
    return [Number(match[0]), Number(match[1]) - 1, Number(match[2]) - 1];
  });

function getStacks() {
  /** @type {string[][]} */
  const stacks = [];

  for (let x = 1; x < input[input.length - 2].length; x += 4) {
    /** @type {string[]} */
    const stack = [];

    for (let y = 0; y < input.length - 1; y++) {
      const char = input[y][x];

      if (char === undefined || char === " ") continue;

      if (!isNaN(Number(char))) {
        stacks.push(stack);
        break;
      }

      stack.push(char);
    }
  }

  return stacks;
}

/**
 * @param {boolean} oneByOne
 * @returns {string}
 */
function crateMover(oneByOne) {
  const stacks = getStacks();

  for (const [amount, from, to] of instructions) {
    const crates = stacks[from].splice(0, amount);
    if (oneByOne) crates.reverse();
    stacks[to].unshift(...crates);
  }

  return Object.values(stacks)
    .map((stack) => stack[0])
    .join("");
}

function part1() {
  return crateMover(true);
}

function part2() {
  return crateMover(false);
}

console.log("2022 Day 5 - part 1:", part1());
console.log("2022 Day 5 - part 2:", part2());
