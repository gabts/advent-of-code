const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input`, { encoding: "utf8" });

/**
 * @typedef {{ versionSum: number, size: number, value: number }} Packet
 */

/**
 * @param {number} type
 * @param {number[]} values
 * @returns {number}
 */
function calculateValue(type, values) {
  switch (type) {
    case 0:
      return values.reduce((a, b) => a + b);
    case 1:
      return values.reduce((a, b) => a * b);
    case 2:
      return values.reduce((a, b) => Math.min(a, b));
    case 3:
      return values.reduce((a, b) => Math.max(a, b));
    case 5:
      return values[0] > values[1] ? 1 : 0;
    case 6:
      return values[0] < values[1] ? 1 : 0;
    case 7:
      return values[0] == values[1] ? 1 : 0;
  }
}

/**
 * @param {string} binary
 * @returns {Packet}
 */
function parsePacket(binary) {
  /**
   * @type {Packet}
   */
  const packet = {
    size: 6,
    value: 0,
    versionSum: parseInt(binary.substr(0, 3), 2),
  };

  let type = parseInt(binary.substr(3, 3), 2);

  if (type == 4) {
    let bits = "";
    while (true) {
      bits += binary.substr(packet.size + 1, 4);
      packet.size += 5;
      if (binary[packet.size - 5] === "0") break;
    }
    packet.value = parseInt(bits, 2);
    return packet;
  }

  const values = [];
  let length = binary[6];

  if (length == "0") {
    let subLength = parseInt(binary.substr(7, 15), 2);
    packet.size = 22 + subLength;
    let i = 0;
    while (i < subLength) {
      let subPacket = parsePacket(binary.substr(22 + i));
      i += subPacket.size;
      values.push(subPacket.value);
      packet.versionSum += subPacket.versionSum;
    }
  } else {
    let subLength = parseInt(binary.substr(7, 11), 2);
    packet.size = 18;
    while (subLength--) {
      let subPacket = parsePacket(binary.substr(packet.size));
      values.push(subPacket.value);
      packet.size += subPacket.size;
      packet.versionSum += subPacket.versionSum;
    }
  }

  packet.value = calculateValue(type, values);
  return packet;
}

let binary = "";
for (let i = 0; i < input.length; i++) {
  binary += parseInt(input[i], 16).toString(2).padStart(4, "0");
}

const solution = parsePacket(binary);

console.log("2021 Day 16 - part 1:", solution.versionSum);
console.log("2021 Day 16 - part 2:", solution.value);
