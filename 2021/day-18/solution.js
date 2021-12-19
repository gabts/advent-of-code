const fs = require("fs");

const input = fs
  .readFileSync(`${__dirname}/input`, { encoding: "utf8" })
  .split("\n")
  .map((line) => JSON.parse(line));

/**
 * @typedef {{ left: number | Node, right: number | Node,  parent?: Node }} Node
 */

/**
 * @param {Node} node
 * @param {'left' | 'right'} side
 * @param {number | [number, number]} value
 */
function addNode(node, side, value) {
  node[side] = typeof value === "number" ? value : buildTree(value, node);
}

/**
 * @param {[number, number] | [number, number][]} arr
 * @param {void | Node} parent
 * @returns {Node}
 */
function buildTree(arr, parent) {
  /**
   * @type {Node}
   */
  const node = {};
  if (parent) node.parent = parent;
  addNode(node, "left", arr[0]);
  addNode(node, "right", arr[1]);
  return node;
}

const sidesMap = { left: "right", right: "left" };

/**
 * @param {Node} node
 * @param {string} side
 * @returns {void}
 */
function explodeSide(node, side) {
  const reverseSide = sidesMap[side];
  let prev = node;
  let curr = node.parent;

  while (curr) {
    if (prev !== curr[side]) {
      prev = curr;
      curr = curr[side];

      if (typeof curr === "object") {
        while (typeof curr[reverseSide] === "object") {
          curr = curr[reverseSide];
        }
        curr[reverseSide] += node[side];
        return;
      }
      prev[side] += node[side];
      return;
    }
    if (typeof curr[side] === "number") {
      curr[side] += node[side];
      return;
    }
    prev = curr;
    curr = curr.parent;
  }
}

/**
 * @param {Node} node
 */
function doExplode(node) {
  explodeSide(node, "left");
  explodeSide(node, "right");

  if (node == node.parent.left) {
    node.parent.left = 0;
  } else if (node == node.parent.right) {
    node.parent.right = 0;
  }
}

/**
 * @param {number | Node} node
 * @param {Node} parent
 * @returns {boolean}
 */
function split(node, parent) {
  let didSplit = false;

  if (typeof node === "number") {
    if (node > 9) {
      const side = parent.left === node ? "left" : "right";
      parent[side] = {
        left: Math.floor(node / 2),
        right: Math.ceil(node / 2),
        parent,
      };
      didSplit = true;
    }
    return didSplit;
  }

  didSplit = split(node.left, node);
  if (!didSplit) didSplit = split(node.right, node);

  return didSplit;
}

/**
 * @param {Node} node
 * @returns {boolean}
 */
function explode(node, depth = 0) {
  if (depth >= 4) {
    doExplode(node);
    return true;
  }

  let didExplode = false;

  if (typeof node.left === "object") {
    didExplode = explode(node.left, depth + 1);
  }
  if (!didExplode && typeof node.right === "object") {
    didExplode = explode(node.right, depth + 1);
  }

  return didExplode;
}

/**
 * @param {Node} left
 * @param {Node} right
 * @returns {Node}
 */
function add(left, right) {
  /**
   * @type {Node}
   */
  const node = { left, right };

  left.parent = node;
  right.parent = node;

  while (true) {
    if (explode(node)) continue;
    if (split(node, node)) continue;
    break;
  }

  return node;
}

/**
 * @param {Node} node
 * @returns {number}
 */
function magnitude(node, value = 0) {
  value +=
    3 * (typeof node.left === "number" ? node.left : magnitude(node.left));
  value +=
    2 * (typeof node.right === "number" ? node.right : magnitude(node.right));
  return value;
}

/**
 * @returns {number}
 */
function part1() {
  const nodes = input.map((line) => buildTree(line));
  let sum = nodes[0];
  for (let i = 1; i < nodes.length; i++) {
    sum = add(sum, nodes[i]);
  }
  return magnitude(sum);
}

/**
 * @returns {number}
 */
function part2() {
  let max = -Infinity;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (i === j) continue;
      const nodeA = buildTree(input[i]);
      const nodeB = buildTree(input[j]);
      const sum = magnitude(add(nodeA, nodeB));
      if (sum > max) max = sum;
    }
  }
  return max;
}

console.log("2021 Day 18 - part 1:", part1());
console.log("2021 Day 18 - part 2:", part2());
