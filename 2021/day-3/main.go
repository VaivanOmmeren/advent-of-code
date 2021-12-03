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
	gamma := getGammaRateBit(input)
	epsilon := getEpsilonBit(gamma)
	g, _ := strconv.ParseInt(gamma, 2, 64)
	e, _ := strconv.ParseInt(epsilon, 2, 64)

	fmt.Printf("-- Answer for part 1: %d --\n", e*g)
}

func PartTwo() {
	oxygen := filterSlice(input, 0, true)
	co2 := filterSlice(input, 0, false)
	o, _ := strconv.ParseInt(oxygen, 2, 64)
	co, _ := strconv.ParseInt(co2, 2, 64)
	fmt.Printf("-- Answer for part 2: %d --\n", o*co)
}

func getGammaRateBit(numbers []string) string {
	var gamma string
	for i := 0; i < len(numbers[0]); i++ {
		freq := getMostOrLeastCommonBitAtPosition(numbers, i, true)
		gamma += freq
	}

	return gamma
}

func getEpsilonBit(gamma string) string {
	var e string

	for i := 0; i < len(gamma); i++ {
		switch gamma[i : i+1] {
		case "0":
			e += "1"
		case "1":
			e += "0"
		}
	}

	return e
}

func filterSlice(bits []string, pos int, c bool) string {
	if len(bits) == 1 {
		return bits[0]
	}
	num := getMostOrLeastCommonBitAtPosition(bits, pos, c)
	var newSlice []string

	for _, v := range bits {
		if v[pos:pos+1] == num {
			newSlice = append(newSlice, v)
		}
	}
	return filterSlice(newSlice, pos+1, c)
}

func getMostOrLeastCommonBitAtPosition(bits []string, pos int, c bool) string {
	m := map[string]int{}
	var max string
	var min string
	for _, v := range bits {
		m[v[pos:pos+1]]++
	}

	if m["0"] == m["1"] {
		max = "1"
		min = "0"
	} else if m["0"] > m["1"] {
		max = "0"
		min = "1"
	} else {
		max = "1"
		min = "0"
	}

	if c {
		return max
	} else {
		return min
	}
}

func ReadInput() []string {
	content, err := ioutil.ReadFile("input")
	if err != nil {
		log.Fatal(err)
	}

	return strings.Split(string(content), "\n")
}
