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
	fmt.Printf("-- Answer for part 1: %d --\n", getAmountOfFish(80, input[0]))
}

func PartTwo() {
	fmt.Printf("-- Answer for part 2: %d --\n", getAmountOfFish(256, input[0]))
}

func ReadInput() []string {
	content, err := ioutil.ReadFile("input")
	if err != nil {
		log.Fatal(err)
	}

	return strings.Split(string(content), "\n")
}

func getAmountOfFish(days int, ip string) int {
	lines := strings.Split(ip, ",")
	var counts [9]int
	for _, fish := range lines {
		f, _ := strconv.Atoi(fish)
		counts[f]++
	}

	for i := 0; i < days; i++ {
		var next [9]int
		next[8] += counts[0]
		next[6] += counts[0]
		for i := 0; i < 8; i++ {
			next[i] += counts[i+1]
		}
		counts = next
	}
	totalFishies := 0
	for i := 0; i < len(counts); i++ {
		totalFishies += counts[i]
	}

	return totalFishies
}
