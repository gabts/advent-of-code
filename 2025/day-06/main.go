// https://adventofcode.com/2025/day/6

package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Column struct {
	values   []string
	operator string
}

func newColumn(lines []string, start int, end int) Column {
	values := []string{}
	for _, l := range lines[:len(lines)-1] {
		str := l[start:end]
		values = append(values, str)
	}
	op := lines[len(lines)-1][start : start+1]
	return Column{values: values, operator: op}
}

func findColumns(lines []string) []Column {
	rows := lines[len(lines)-1]
	columns := []Column{}
	start := -1

	for i := 0; i < len(rows); i++ {
		if rows[i] != ' ' {
			if start != -1 {
				columns = append(columns, newColumn(lines, start, i-1))
			}
			start = i
		}
	}

	columns = append(columns, newColumn(lines, start, len(rows)))

	return columns
}

func calcColumn(values []string, operator string) int {
	total := 0
	if operator == "*" {
		total = 1
	}
	for _, value := range values {
		num, _ := strconv.Atoi(strings.TrimSpace(value))
		switch operator {
		case "+":
			total += num
		case "*":
			total *= num
		}
	}
	return total
}

func part1(columns []Column) int {
	sum := 0

	for _, column := range columns {
		sum += calcColumn(column.values, column.operator)
	}

	return sum
}

func part2(columns []Column) int {
	sum := 0

	for _, column := range columns {
		maxLen := 0
		for _, v := range column.values {
			if len(v) > maxLen {
				maxLen = len(v)
			}
		}

		values := make([]string, maxLen)
		for _, v := range column.values {
			for k := len(v) - 1; k >= 0; k-- {
				values[len(values)-1-k] += string(v[k])
			}
		}

		sum += calcColumn(values, column.operator)
	}

	return sum
}

func main() {
	data, _ := os.ReadFile("input")
	columns := findColumns(strings.Split(string(data), "\n"))

	fmt.Printf("part 1: %d\n", part1(columns))
	fmt.Printf("part 2: %d\n", part2(columns))
}
