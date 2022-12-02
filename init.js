const fs = require("fs");

const year = process.argv[2];
const day = process.argv[3];

if (isNaN(Number(year)) || isNaN(Number(day))) {
  console.error("error: invalid year and/or day");
  process.exit(1);
}

try {
  // will throw if year folder doesn't exist
  fs.statSync(year);
} catch (error) {
  console.error(`error: folder for year "${year}" doesn't exist`);
  process.exit(1);
}

const dayFolder = `day-${Number(day) < 10 ? "0" + day : day}`;
const path = `${year}/${dayFolder}`;

try {
  fs.statSync(path);
  console.error(`error: folder for year "${year}" day "${day}" already exists`);
  process.exit(1);
} catch (error) {
  // expect statSync to throw because folder shouldn't exist
}

const content = `// https://adventofcode.com/${year}/day/${day}

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", { encoding: "utf8" })
  .split("\\n");

function part1() {
  // todo
}

function part2() {
  // todo
}

console.log("${year} Day ${day} - part 1:", part1());
console.log("${year} Day ${day} - part 2:", part2());
`;

fs.mkdirSync(path);
fs.writeFileSync(`${path}/input`, "", { encoding: "utf8" });
fs.writeFileSync(`${path}/main.js`, content, { encoding: "utf8" });

console.log(`successfully created "${path}"!`);
