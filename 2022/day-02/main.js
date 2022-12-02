// https://adventofcode.com/2022/day/2

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n");

const scoreMap = {
  "A X": 1 + 3, // rock     vs rock      => draw
  "A Y": 2 + 6, // rock     vs paper     => win
  "A Z": 3 + 0, // rock     vs scissors  => lose
  "B X": 1 + 0, // paper    vs rock      => lose
  "B Y": 2 + 3, // paper    vs paper     => draw
  "B Z": 3 + 6, // paper    vs scissors  => win
  "C X": 1 + 6, // scissors vs rock      => win
  "C Y": 2 + 0, // scissors vs paper     => lose
  "C Z": 3 + 3, // scissors vs scissors  => draw
};

function part1() {
  return input.reduce((score, game) => score + scoreMap[game], 0);
}

const resultMap = {
  "A X": "A Z", // lose vs rock     => scissors
  "A Y": "A X", // draw vs rock     => rock
  "A Z": "A Y", // win  vs rock     => paper
  "B X": "B X", // lose vs paper    => rock
  "B Y": "B Y", // draw vs paper    => paper
  "B Z": "B Z", // win  vs paper    => scissors
  "C X": "C Y", // lose vs scissors => paper
  "C Y": "C Z", // draw vs scissors => scissors
  "C Z": "C X", // win  vs scissors => rock
};

function part2() {
  return input.reduce((score, game) => score + scoreMap[resultMap[game]], 0);
}

console.log("2022 Day 2 - part 1:", part1());
console.log("2022 Day 2 - part 2:", part2());
