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
	fmt.Printf("-- Answer for part 1: %d --\n", executeSubmarineCommands(input))
}

func PartTwo() {
	fmt.Printf("-- Answer for part 2: %d --\n", executeAdvancedSubmarineCommands(input))
}

func executeAdvancedSubmarineCommands(commands []string) int {
	horizontal := 0
	depth := 0
	aim := 0
	for _, c := range commands {
		splitCommand := strings.Split(c, " ")
		amount, _ := strconv.Atoi(splitCommand[1])
		switch splitCommand[0] {
		case "forward":
			horizontal += amount
			depth += (aim * amount)
		case "down":
			aim += amount
		case "up":
			aim -= amount
		}
	}

	return horizontal * depth
}

func executeSubmarineCommands(commands []string) int {
	horizontal := 0
	depth := 0
	for _, c := range commands {
		splitCommand := strings.Split(c, " ")
		amount, _ := strconv.Atoi(splitCommand[1])
		switch splitCommand[0] {
		case "forward":
			horizontal += amount
		case "down":
			depth += amount
		case "up":
			depth -= amount
		}
	}

	return horizontal * depth
}

func ReadInput() []string {
	content, err := ioutil.ReadFile("input")
	if err != nil {
		log.Fatal(err)
	}

	return strings.Split(string(content), "\n")
}
