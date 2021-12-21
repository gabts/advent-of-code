const fs = require("fs");

const input = fs
  .readFileSync(`${__dirname}/input`, { encoding: "utf8" })
  .split("\n")
  .map((line) => Number(line[line.length - 1]));

/**
 * @returns {number}
 */
function part1() {
  const steps = [input[0], input[1]];
  const score = [0, 0];
  let player = 0;
  let rolls = 0;

  while (score[0] < 1000 && score[1] < 1000) {
    rolls += 3;
    steps[player] += rolls * 3 - 3;
    score[player] += ((steps[player] - 1) % 10) + 1;
    player = player ? 0 : 1;
  }

  return Math.min(...score) * rolls;
}

/**
 * @returns {number}
 */
function part2() {
  /**
   * @type {{ [key:string]: number }}
   */
  const diceMap = {};

  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      for (let k = 1; k <= 3; k++) {
        const sum = i + j + k;
        diceMap[sum] = (diceMap[sum] || 0) + 1;
      }
    }
  }

  const wins = [0, 0];

  /**
   * @param {number} player
   * @param {[number, number]} positions
   * @param {[number, number]} scores
   * @param {number} multiplier
   * @returns {void}
   */
  function calculate(player, positions, scores, multiplier) {
    for (let i = 3; i <= 9; i++) {
      const pos = positions[player];
      const score = scores[player];

      positions[player] = ((positions[player] - 1 + i) % 10) + 1;
      scores[player] += positions[player];

      const diceMultiplier = multiplier * diceMap[i];

      if (scores[player] >= 21) {
        wins[player] += diceMultiplier;
      } else {
        calculate(player ? 0 : 1, positions, scores, diceMultiplier);
      }

      positions[player] = pos;
      scores[player] = score;
    }
  }

  calculate(0, [input[0], input[1]], [0, 0], 1);
  return Math.max(...wins);
}

console.log("2021 Day 21 - part 1:", part1());
console.log("2021 Day 21 - part 2:", part2());
