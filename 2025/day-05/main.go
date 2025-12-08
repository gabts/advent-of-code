// https://adventofcode.com/2025/day/5

package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

type Range struct {
	start int
	end   int
}

func part1(ranges []Range, ids []int) int {
	count := 0

	for _, id := range ids {
		for _, r := range ranges {
			if id >= r.start && id <= r.end {
				count++
				break
			}
		}
	}

	return count
}

func part2(ranges []Range) int {
	sort.Slice(ranges, func(i, j int) bool {
		return ranges[i].start < ranges[j].start
	})

	merged := []Range{ranges[0]}
	for _, a := range ranges[1:] {
		b := &merged[len(merged)-1]
		if a.start <= b.end+1 {
			b.end = max(b.end, a.end)
		} else {
			merged = append(merged, a)
		}
	}

	count := 0
	for _, r := range merged {
		count += (r.end - r.start) + 1
	}
	return count
}

func main() {
	data, _ := os.ReadFile("input")
	sections := strings.Split(string(data), "\n\n")

	ranges := []Range{}
	for r := range strings.SplitSeq(sections[0], "\n") {
		parts := strings.Split(r, "-")
		start, _ := strconv.Atoi(parts[0])
		end, _ := strconv.Atoi(parts[1])
		ranges = append(ranges, Range{start, end})
	}

	ids := []int{}
	for s := range strings.SplitSeq(sections[1], "\n") {
		id, _ := strconv.Atoi(s)
		ids = append(ids, id)
	}

	fmt.Printf("part 1: %d\n", part1(ranges, ids))
	fmt.Printf("part 2: %d\n", part2(ranges))
}
