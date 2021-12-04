const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input", { encoding: "utf8" });

const numberRegex = /\d+/g;

/**
 * @param {string} input
 * @returns {{ numbers: number[], boards: number[][][] }}
 */
function parseInput(input) {
  const lines = input.split("\n");
  const numbers = lines[0].split(",").map(Number);
  const boards = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) {
      boards.push([]);
      continue;
    }
    const row = lines[i].match(numberRegex).map(Number);
    boards[boards.length - 1].push(row);
  }
  return { numbers, boards };
}

/**
 * @callback solveCallback
 * @param {number} number
 * @param {number[]} numbers
 * @param {number} boardIndex
 * @param {number[][][]} boards
 * @returns {number}
 */

/**
 * @param {number} number
 * @param {number[]} numbers
 * @param {number} boardIndex
 * @param {number[][][]} boards
 * @returns {number}
 */
function solve(number, numbers, boardIndex, boards) {
  return (
    boards[boardIndex]
      .map((row) => row.filter((n) => n !== undefined))
      .flat()
      .reduce((acc, n) => acc + n, 0) * number
  );
}

/**
 * @param {number} number
 * @param {number[]} numbers
 * @param {number} boardIndex
 * @param {number[][][]} boards
 * @param {solveCallback} solveCb
 * @returns {number}
 */
function handleCheckBoard(number, numbers, boardIndex, boards, solveCb) {
  const board = boards[boardIndex];

  for (const row of board) {
    for (let cell = 0; cell < 5; cell++) {
      if (row[cell] !== undefined) break;
      if (cell === 4) return solveCb(number, numbers, boardIndex, boards);
    }
  }
  for (let cell = 0; cell < 5; cell++) {
    for (let column = 0; column < 5; column++) {
      if (board[column][cell] !== undefined) break;
      if (column === 4) return solveCb(number, numbers, boardIndex, boards);
    }
  }

  if (boardIndex < boards.length - 1) {
    return handleCheckBoard(number, numbers, boardIndex + 1, boards, solveCb);
  }

  return handleNextNumber(numbers, boards, solveCb);
}

/**
 * @param {number[]} numbers
 * @param {number[][][]} boards
 * @param {solveCallback} solveCb
 * @returns {number}
 */
function handleNextNumber(numbers, boards, solveCb) {
  const number = numbers.shift();

  for (const board of boards) {
    for (const row of board) {
      const index = row.indexOf(number);
      if (index < 0) continue;
      row[index] = undefined;
    }
  }

  return handleCheckBoard(number, numbers, 0, boards, solveCb);
}

/**
 * 2021 Day 4 - part 1
 * @param {string} input
 * @returns {number}
 */
function part1(input) {
  const { numbers, boards } = parseInput(input);
  return handleNextNumber(numbers, boards, solve);
}

/**
 * 2021 Day 4 - part 2
 * @param {string} input
 * @returns {number}
 */
function part2(input) {
  const { numbers, boards } = parseInput(input);

  /**
   * @param {number} number
   * @param {number[]} numbers
   * @param {number} boardIndex
   * @param {number[][][]} boards
   * @returns {number}
   */
  function solveOrContinue(number, numbers, boardIndex, boards) {
    if (boards.length === 1) return solve(number, numbers, boardIndex, boards);

    const isLastBoard = boardIndex === boards.length - 1;
    boards.splice(boardIndex, 1);

    if (isLastBoard) return handleNextNumber(numbers, boards, solveOrContinue);

    return handleCheckBoard(
      number,
      numbers,
      boardIndex,
      boards,
      solveOrContinue
    );
  }

  return handleNextNumber(numbers, boards, solveOrContinue);
}

console.log("2021 Day 4 - part 1:", part1(input));
console.log("2021 Day 4 - part 2:", part2(input)); // lul needs node command --stack-size=1250
