const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input`, { encoding: "utf8" });

const split = input.split("\n\n");
const rule = split[0];
const sourceImage = split[1].split("\n");

/**
 * @param {number} steps
 */
function solution(steps) {
  /**
   * @type {string[]}
   */
  let enhancedImage = [];
  let image = sourceImage;

  for (let i = 0; i < steps; i++) {
    for (let y = -1; y < image.length + 1; y++) {
      enhancedImage.push("");

      for (let x = -1; x < image[0].length + 1; x++) {
        let bin = "";

        for (let yy = y - 1; yy <= y + 1; yy++) {
          for (let xx = x - 1; xx <= x + 1; xx++) {
            if (image[yy]?.[xx]) {
              bin += image[yy][xx] === "#" ? 1 : 0;
            } else {
              bin += i % 2 ? 1 : 0;
            }
          }
        }

        enhancedImage[enhancedImage.length - 1] += rule[parseInt(bin, 2)];
      }
    }

    image = enhancedImage;
    enhancedImage = [];
  }

  return image
    .join("")
    .split("")
    .filter((s) => s === "#").length;
}

console.log("2021 Day 20 - part 1:", solution(2));
console.log("2021 Day 20 - part 2:", solution(50));
