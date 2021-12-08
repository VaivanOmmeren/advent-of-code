package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"sort"
	"strconv"
	"strings"

	"github.com/dlclark/regexp2"
)

func main() {
	input = ReadInput()
	PartOne()
	PartTwo()
}

var input []string

func PartOne() {
	output := getOutputValues(input)
	fmt.Printf("-- Answer for part 1: %d --\n", countUniqueOutput(output))
}

func PartTwo() {
	vals := getSplitValues(input)

	sum := 0
	for _, r := range vals {
		clock := constructClock(r[0])
		outputValue := getOutPutValue(clock, r[1])
		c, _ := strconv.Atoi(outputValue)
		sum += c
	}
	fmt.Printf("-- Answer for part 2: %d --\n", sum)
}

func ReadInput() []string {
	content, err := ioutil.ReadFile("input")
	if err != nil {
		log.Fatal(err)
	}

	return strings.Split(string(content), "\n")
}

func countUniqueOutput(outputs []string) int {
	counter := 0
	for _, o := range outputs {
		oSplit := strings.Split(o, " ")
		for _, op := range oSplit {
			if len(op) == 2 || len(op) == 3 || len(op) == 4 || len(op) == 7 {
				counter++
			}
		}
	}

	return counter
}

func getOutputValues(v []string) []string {
	var outputV []string
	for _, s := range v {
		split := strings.Split(s, "|")
		outputV = append(outputV, split[1])
	}

	return outputV
}

func getSplitValues(in []string) [][]string {
	var out [][]string

	for _, s := range in {
		split := strings.Split(s, "|")
		out = append(out, split)
	}

	return out
}

func constructClock(in string) map[string]string {
	inputs := strings.Split(in, " ")
	clock := make(map[string]string)
	var five []string
	var six []string

	for _, i := range inputs {
		switch len(i) {
		case 2:
			clock["1"] = i
		case 3:
			clock["7"] = i
		case 4:
			clock["4"] = i
		case 5:
			five = append(five, i)
		case 6:
			six = append(six, i)
		case 7:
			clock["8"] = i
		}
	}

	findSixNineZero(six, clock)
	findFiveTwoThree(five, clock)

	return clock
}

func getOutPutValue(c map[string]string, out string) string {
	outV := strings.Split(out, " ")
	outputValue := ""

	for _, v := range outV {
		for key, value := range c {
			if SortStringByCharacter(value) == SortStringByCharacter(strings.TrimSpace(v)) {
				outputValue += key
			}
		}
	}

	return outputValue
}

func findSixNineZero(vals []string, clock map[string]string) {

	var toRemove int
	for i, v := range vals {
		re := regexp2.MustCompile(buildContainsRegex(clock["4"]), 0)

		if isMatch, _ := re.MatchString(v); isMatch {
			clock["9"] = v
			toRemove = i
		}
	}

	vals = remove(vals, toRemove)

	for i, v := range vals {
		re := regexp2.MustCompile(buildContainsRegex(clock["1"]), 0)

		if isMatch, _ := re.MatchString(v); !isMatch {
			clock["6"] = v
			toRemove = i
		}
	}
	vals = remove(vals, toRemove)
	clock["0"] = vals[0]
}

func findFiveTwoThree(vals []string, clock map[string]string) {
	var toRemove int
	for i, v := range vals {
		re := regexp2.MustCompile(buildContainsRegex(clock["1"]), 0)

		if isMatch, _ := re.MatchString(v); isMatch {
			clock["3"] = v
			toRemove = i
		}
	}

	vals = remove(vals, toRemove)

	for i, v := range vals {
		re := regexp2.MustCompile(buildContainsRegex(v), 0)

		if isMatch, _ := re.MatchString(clock["6"]); isMatch {
			clock["5"] = v
			toRemove = i
		}
	}

	vals = remove(vals, toRemove)
	clock["2"] = vals[0]
}

func buildContainsRegex(num string) string {
	regex := ""

	for _, c := range num {
		regex += fmt.Sprintf("(?=.*%s)", string(c))
	}

	regex += ".+"

	return regex
}

func remove(s []string, i int) []string {
	s[i] = s[len(s)-1]
	return s[:len(s)-1]
}

func StringToRuneSlice(s string) []rune {
	var r []rune
	for _, runeValue := range s {
		r = append(r, runeValue)
	}
	return r
}

func SortStringByCharacter(s string) string {
	r := StringToRuneSlice(s)
	sort.Slice(r, func(i, j int) bool {
		return r[i] < r[j]
	})
	return string(r)
}
