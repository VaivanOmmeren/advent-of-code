package main

import (
	"fmt"
	"math"
	"io/ioutil"
	"log"
	"strings"
	"strconv"
	"os"
)

func main() {
	PartOne()
	PartTwo()
}

func CalculateFuelRequirements(mass int) int {
	rounded := math.Floor(float64(mass / 3))
	return int(rounded) - 2
}

func CalculateNestedFuelRequirements(mass int) int {
	req := mass
	sum := 0;

	for req >= 0 {
		req = CalculateFuelRequirements(req)

		if !(req <= 0){
			sum += req;
		}
	}

	return sum
}

func ReadInput() []string {
	content, err := ioutil.ReadFile("input")
	if err != nil {
		log.Fatal(err)
   }

   return strings.Split(string(content), "\n")
}

func PartOne() {
	input := ReadInput()
	sum := 0

	for _, v := range input {
		i, err := strconv.Atoi(v)
		if err != nil {
			fmt.Println(err)
			os.Exit(2)
		}
		fuelRequirement := CalculateFuelRequirements(i)
		sum += fuelRequirement
	}

	fmt.Printf("-- Answer for part 1: %d --", sum)
}

func PartTwo() {
	input := ReadInput()
	sum := 0

	for _, v := range input {
		i, err := strconv.Atoi(v)
		if err != nil {
			fmt.Println(err)
			os.Exit(2)
		}
		req := CalculateNestedFuelRequirements(i)
		sum += req
	}
	fmt.Printf("-- Answer for part 2: %d --", sum)
}

