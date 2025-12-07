// https://adventofcode.com/2025/day/3

package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func findLargest(line string, length int) int {
	nums := make([]int, length+1)

	for _, c := range line {
		d, _ := strconv.Atoi(string(c))

		for i := length; i > 0; i-- {
			num := nums[i-1]*10 + d
			if num > nums[i] {
				nums[i] = num
			}
		}
	}

	return nums[length]
}

func part1(lines []string) int {
	sum := 0
	for _, line := range lines {
		sum += findLargest(line, 2)
	}
	return sum
}

func part2(lines []string) int {
	sum := 0
	for _, line := range lines {
		sum += findLargest(line, 12)
	}
	return sum
}

func main() {
	data, _ := os.ReadFile("input")
	lines := strings.Split(string(data), "\n")

	fmt.Printf("part 1: %d\n", part1(lines))
	fmt.Printf("part 2: %d\n", part2(lines))
}
