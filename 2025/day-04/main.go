// https://adventofcode.com/2025/day/4

package main

import (
	"fmt"
	"os"
	"strings"
)

func checkNeighbors(input [][]byte, y int, x int) int {
	h := len(input)
	w := len(input[0])
	count := 0

	for dy := -1; dy <= 1; dy++ {
		for dx := -1; dx <= 1; dx++ {
			if dy == 0 && dx == 0 {
				continue
			}

			ny := y + dy
			nx := x + dx
			if ny >= 0 && ny < h && nx >= 0 && nx < w && input[ny][nx] == '@' {
				count++
			}
		}
	}

	return count
}

func part1(grid [][]byte) int {
	count := 0

	for y := range grid {
		for x := range grid[y] {
			if grid[y][x] == '@' && checkNeighbors(grid, y, x) < 4 {
				count++
			}
		}
	}

	return count
}

func part2(grid [][]byte) int {
	count := 0
	nextGrid := make([][]byte, len(grid))

	for {
		removed := 0
		copy(nextGrid, grid)

		for y := range grid {
			for x := range grid[y] {
				if grid[y][x] == '@' && checkNeighbors(grid, y, x) < 4 {
					nextGrid[y][x] = '.'
					removed++
				}
			}
		}

		if removed == 0 {
			break
		}
		count += removed
		grid = nextGrid
	}

	return count
}

func main() {
	data, _ := os.ReadFile("input")
	lines := strings.Split(string(data), "\n")

	grid := make([][]byte, len(lines))
	for i, line := range lines {
		grid[i] = []byte(line)
	}

	fmt.Printf("part 1: %d\n", part1(grid))
	fmt.Printf("part 2: %d\n", part2(grid))
}
