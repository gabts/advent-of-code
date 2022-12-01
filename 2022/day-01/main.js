const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n")
  .reduce(
    (acc, row) => {
      if (!row) {
        acc.push(0);
        return acc;
      }
      acc[acc.length - 1] = acc[acc.length - 1] + Number(row);
      return acc;
    },
    [0]
  )
  .sort((a, b) => b - a);

function part1() {
  return input[0];
}

function part2() {
  return input[0] + input[1] + input[2];
}

console.log("2022 Day 1 - part 1:", part1());
console.log("2022 Day 1 - part 2:", part2());
