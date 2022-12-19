// https://adventofcode.com/2022/day/10

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n")
  .map((line) => line.split(" "));

/**
 * @param {(cycle: number, x: number) => void} cycleCallback
 */
function solve(cycleCallback) {
  let cycle = 0;
  let x = 1;

  function handleCycle() {
    cycle++;
    cycleCallback(cycle, x);
  }

  for (const [instr, val] of input) {
    handleCycle();
    if (instr === "addx") {
      handleCycle();
      x += Number(val);
    }
  }
}

function part1() {
  let sum = 0;

  solve((cycle, x) => {
    if ((cycle - 20) % 40 === 0) sum += x * cycle;
  });

  return sum;
}

function part2() {
  let output = "";

  solve((cycle, x) => {
    const index = cycle - 1;
    if (index % 40 === 0) output += "\n";
    output += Math.abs(x - (index % 40)) <= 1 ? "#" : ".";
  });

  return output;
}

console.log("2022 Day 10 - part 1:", part1());
console.log("2022 Day 10 - part 2:", part2());
