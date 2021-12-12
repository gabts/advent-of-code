const fs = require("fs");

/**
 * @type {{ [key: string]: string[] }}
 */
const input = fs
  .readFileSync(`${__dirname}/input`, { encoding: "utf8" })
  .split("\n")
  .map((line) => line.split("-"))
  .reduce((graph, [nodeA, nodeB]) => {
    if (!graph[nodeA]) graph[nodeA] = [];
    if (!graph[nodeB]) graph[nodeB] = [];
    graph[nodeA].push(nodeB);
    graph[nodeB].push(nodeA);
    return graph;
  }, {});

/**
 * @param {string} node
 * @param {{ [key: string]: string[] }} graph
 * @param {{ [key: string]: boolean }} visited
 * @param {boolean} skippedOneLowerCaseNode
 */
function traverse(node, graph, visited, skippedOneLowerCaseNode) {
  if (node === "end") return 1;

  if (visited[node] && node.toLowerCase() === node) {
    if (skippedOneLowerCaseNode) {
      return 0;
    } else {
      skippedOneLowerCaseNode = true;
    }
  }

  const newVisited = { ...visited, [node]: true };

  let paths = 0;
  for (const nextNode of graph[node]) {
    if (nextNode === "start") continue;
    paths += traverse(nextNode, graph, newVisited, skippedOneLowerCaseNode);
  }
  return paths;
}

console.log("2021 Day 11 - part 1:", traverse("start", input, {}, true));
console.log("2021 Day 11 - part 2:", traverse("start", input, {}, false));
