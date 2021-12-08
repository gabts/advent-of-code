const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\n")
  .map((row) => row.split(" | "))
  .map((row) => [row[0].split(" "), row[1].split(" ")]);

/**
 * 2021 Day 8 - part 1
 * @returns {number}
 */
function part1() {
  let count = 0;
  for (const digits of input) {
    for (const digit of digits[1]) {
      if (digit.length === 7 || (digit.length >= 2 && digit.length <= 4)) {
        count++;
      }
    }
  }
  return count;
}

/**
 * @param {string} s1
 * @param {string} s2
 * @returns {boolean}
 */
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;
  const seen = {};
  for (let i = 0; i < s1.length; i++) {
    seen[s1[i]] = (seen[s1[i]] || 0) + 1;
  }
  for (let i = 0; i < s2.length; i++) {
    if (!seen[s2[i]]) return false;
    seen[s2[i]]--;
  }
  return true;
}

/**
 * @param {string} str
 * @param  {string[]} chars
 * @returns {boolean}
 */
function includesAll(str, chars) {
  for (const char of chars) {
    if (!str.includes(char)) return false;
  }
  return true;
}

/**
 * 2021 Day 8 - part 2
 * @returns {number}
 */
function part2() {
  let sum = 0;
  const knownByLength = { 2: 1, 3: 7, 4: 4, 7: 8 };

  for (let [allDigits, activeDigits] of input) {
    const map = {};
    const twoThreeFive = [];
    const zeroSixNine = [];

    for (const digit of allDigits) {
      if (knownByLength[digit.length]) {
        map[knownByLength[digit.length]] = digit;
      } else if (digit.length === 5) {
        twoThreeFive.push(digit);
      } else {
        zeroSixNine.push(digit);
      }
    }

    const charsInOne = map[1].split("");
    const charsInFour = map[4].split("");
    const charsAtMiddleAndUpperLeft = charsInFour.filter(
      (char) => !charsInOne.includes(char)
    );

    for (const digit of twoThreeFive) {
      if (includesAll(digit, charsInOne)) {
        map[3] = digit;
      } else if (includesAll(digit, charsAtMiddleAndUpperLeft)) {
        map[5] = digit;
      } else {
        map[2] = digit;
      }
    }

    for (const digit of zeroSixNine) {
      if (includesAll(digit, charsInFour)) {
        map[9] = digit;
      } else if (includesAll(digit, charsAtMiddleAndUpperLeft)) {
        map[6] = digit;
      } else {
        map[0] = digit;
      }
    }

    const digits = [];
    for (const activeDigit of activeDigits) {
      for (const [digit, value] of Object.entries(map)) {
        if (isAnagram(activeDigit, value)) {
          digits.push(digit);
          break;
        }
      }
    }

    sum += Number(digits.join(""));
  }

  return sum;
}

console.log("2021 Day 8 - part 1:", part1());
console.log("2021 Day 8 - part 2:", part2());
