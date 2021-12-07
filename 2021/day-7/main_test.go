package main

import "testing"
import "fmt"

func TestRunAlignCrabs(t *testing.T) {
	var tests = []struct {
		vals string
		want int
	}{
		{
			"16,1,2,0,4,2,7,1,2,14",
			37,
		},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d", len(tt.vals))
		t.Run(testname, func(t *testing.T) {
			pos := toPosArray(tt.vals)
			min, max := getMinAndMax(pos)
			ans := calc(min, max, pos)
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}

func TestRunExpensiveAlignCrab(t *testing.T) {
	var tests = []struct {
		vals string
		want int
	}{
		{
			"16,1,2,0,4,2,7,1,2,14",
			168,
		},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d", len(tt.vals))
		t.Run(testname, func(t *testing.T) {
			pos := toPosArray(tt.vals)
			min, max := getMinAndMax(pos)
			ans := calcExpensive(min, max, pos)
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}
