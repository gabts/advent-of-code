// https://adventofcode.com/2025/day/2

package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Range struct {
	start int
	end   int
}

func part1(ranges []Range) int {
	sum := 0

	for _, r := range ranges {
		for num := r.start; num <= r.end; num++ {
			str := strconv.Itoa(num)
			i := len(str) / 2
			if str[:i] == str[i:] {
				sum += num
			}
		}
	}

	return sum
}

func part2(ranges []Range) int {
	sum := 0

	for _, r := range ranges {
		for num := r.start; num <= r.end; num++ {
			str := strconv.Itoa(num)
			l := len(str)

		loop:
			for i := 1; i <= l/2; i++ {
				if l%i != 0 {
					continue
				}

				pattern := str[:i]
				for j := 1; j < l/i; j++ {
					chunk := str[j*i : (j+1)*i]
					if chunk != pattern {
						continue loop
					}
				}

				sum += num
				break
			}
		}
	}

	return sum
}

func main() {
	data, _ := os.ReadFile("input")
	lines := strings.Split(string(data), ",")
	ranges := []Range{}

	for _, line := range lines {
		parts := strings.Split(line, "-")
		start, _ := strconv.Atoi(parts[0])
		end, _ := strconv.Atoi(parts[1])
		ranges = append(ranges, Range{start, end})
	}

	fmt.Printf("part 1: %d\n", part1(ranges))
	fmt.Printf("part 2: %d\n", part2(ranges))
}
