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
	convertedInput = inputToInt(input)
	PartOne()
	PartTwo()
}

var input []string
var convertedInput []int

func PartOne() {
	fmt.Printf("-- Answer for part 1: %d --\n", calculateDepthMeasurementIncrease(convertedInput))
}

func PartTwo() {
	sumValues := buildSumList(convertedInput)
	fmt.Printf("-- Answer for part 2: %d --\n", calculateDepthMeasurementIncrease(sumValues))

}

func calculateDepthMeasurementIncrease(values []int) int {
	increasedCount := 0
	for i, v := range values {
		if i != 0 {
			if values[i-1] < v {
				increasedCount++
			}
		}
	}

	return increasedCount
}

func buildSumList(values []int) []int {
	var sumSlice []int

	for i, v := range values {
		if i+2 < len(values) {
			sumGroup := v + values[i+1] + values[i+2]
			sumSlice = append(sumSlice, sumGroup)
		}
	}
	return sumSlice
}

func inputToInt(stringput []string) []int {
	var intput []int

	for _, v := range stringput {
		intVal, _ := strconv.Atoi(v)
		intput = append(intput, intVal)
	}

	return intput
}

func ReadInput() []string {
	content, err := ioutil.ReadFile("input")
	if err != nil {
		log.Fatal(err)
	}

	return strings.Split(string(content), "\n")
}
