const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n");

const openTagRegex = /(\(|\[|\{|<)/;

const closingTagMap = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

/**
 * @callback handleRemainingStack
 * @param {string} remaining
 */

/**
 * @param {string} line
 * @param {void | handleRemainingStack} handleRemainingStack
 * @returns {void | string}
 */
function handleLine(line, handleRemainingStack) {
  let stack = "";
  for (let i = 0; i < line.length; i++) {
    const currentTag = line[i];
    if (openTagRegex.test(currentTag)) {
      stack += currentTag;
      continue;
    }
    const openTag = stack[stack.length - 1];
    const expectedClosingTag = closingTagMap[openTag];
    if (currentTag !== expectedClosingTag) return currentTag;
    stack = stack.slice(0, -1);
  }
  if (handleRemainingStack) handleRemainingStack(stack);
}

/**
 * 2021 Day 10 - part 1
 * @returns {number}
 */
function part1() {
  const scoreMap = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  let score = 0;
  for (const line of input) {
    const illegalChuck = handleLine(line);
    if (illegalChuck) score += scoreMap[illegalChuck];
  }
  return score;
}

/**
 * 2021 Day 10 - part 2
 * @returns {number}
 */
function part2() {
  const scoreMap = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };

  /**
   * @type {number[]}
   */
  const scores = [];

  /**
   * @param {string} remaining
   */
  function handleRemaining(remaining) {
    let score = 0;
    for (let i = remaining.length - 1; i >= 0; i--) {
      score = score * 5 + scoreMap[closingTagMap[remaining[i]]];
    }
    scores.push(score);
  }

  for (const line of input) handleLine(line, handleRemaining);
  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
}

console.log("2021 Day 10 - part 1:", part1());
console.log("2021 Day 10 - part 2:", part2());
