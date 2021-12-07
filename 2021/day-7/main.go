package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

func main() {
	input = ReadInput()
	PartOne()
	PartTwo()
}

var input []string

func PartOne() {
	pos := toPosArray(input[0])
	min, max := getMinAndMax(pos)
	fmt.Printf("-- Answer for part 1: %d --\n", calc(min, max, pos))
}

func PartTwo() {
	pos := toPosArray(input[0])
	min, max := getMinAndMax(pos)
	fmt.Printf("-- Answer for part 2: %d --\n", calcExpensive(min, max, pos))
}

func ReadInput() []string {
	content, err := ioutil.ReadFile("input")
	if err != nil {
		log.Fatal(err)
	}

	return strings.Split(string(content), "\n")
}

func toPosArray(pos string) []int {
	p := strings.Split(pos, ",")
	var new []int

	for _, v := range p {
		nv, _ := strconv.Atoi(v)
		new = append(new, nv)
	}

	return new
}

func calc(min int, max int, pos []int) int {
	var sSum int
	for i := min; i <= max; i++ {
		diffSum := 0
		for _, p := range pos {
			d := p - i
			if d < 0 {
				d = -d
			}
			diffSum += d
		}
		if i == 0 {
			sSum = diffSum
		} else if diffSum < sSum {
			sSum = diffSum
		}
	}

	return sSum
}

func calcExpensive(min int, max int, pos []int) int {
	var sSum int
	for i := min; i <= max; i++ {
		diffSum := 0
		for _, p := range pos {
			d := p - i
			if d < 0 {
				d = -d
			}
			diffSum += d * (d + 1) / 2
		}
		if i == 0 {
			sSum = diffSum
		} else if diffSum < sSum {
			sSum = diffSum
		}
	}

	return sSum
}

func getMinAndMax(pos []int) (int, int) {
	min := pos[0]
	max := pos[0]

	for _, p := range pos {
		if max < p {
			max = p
		}
		if min > p {
			min = p
		}
	}

	return min, max
}
