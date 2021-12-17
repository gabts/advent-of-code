const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input`, { encoding: "utf8" });

const [xMin, xMax, yMin, yMax] = input.match(/(-)?\d+/g).map(Number);

let part1 = 0;
let part2 = 0;

for (let x = 0; x < 300; x++) {
  for (let y = -300; y < 500; y++) {
    let max = 0;
    let currentX = 0;
    let currentY = 0;
    let velocityX = x;
    let velocityY = y;

    while (currentY > yMin) {
      currentX += velocityX;
      currentY += velocityY;
      max = Math.max(max, currentY);

      if (
        currentX >= xMin &&
        currentX <= xMax &&
        currentY >= yMin &&
        currentY <= yMax
      ) {
        part1 = Math.max(max, part1);
        part2++;
        break;
      }

      velocityY--;
      if (velocityX > 0) velocityX--;
      else if (velocityX < 0) velocityX++;
    }
  }
}

console.log("2021 Day 17 - part 1:", part1);
console.log("2021 Day 17 - part 2:", part2);
