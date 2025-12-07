// https://adventofcode.com/2025/day/1

package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func part1(input []string) int {
	count := 0
	pos := 50

	for _, line := range input {
		num, _ := strconv.Atoi(line[1:])

		num = num % 100
		if line[0] == 'L' {
			num *= -1
		}

		pos = (((pos + num) % 100) + 100) % 100

		if pos == 0 {
			count++
		}
	}

	return count
}

func part2(input []string) int {
	count := 0
	pos := 50

	for _, line := range input {
		num, _ := strconv.Atoi(line[1:])

		count += num / 100

		num = num % 100
		if line[0] == 'L' {
			num *= -1
		}

		newPos := pos + num
		if pos != 0 && (newPos <= 0 || newPos > 99) {
			count++
		}

		pos = ((newPos % 100) + 100) % 100
	}

	return count
}

func main() {
	data, _ := os.ReadFile("input")
	lines := strings.Split(string(data), "\n")

	fmt.Printf("part 1: %d\n", part1(lines))
	fmt.Printf("part 2: %d\n", part2(lines))
}
