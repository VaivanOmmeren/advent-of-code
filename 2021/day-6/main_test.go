package main

import "testing"
import "fmt"

func TestRunSpawnFishies(t *testing.T) {
	var tests = []struct {
		vals string
		want int
	}{
		{
			"3,4,3,1,2",
			5934,
		},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d", len(tt.vals))
		t.Run(testname, func(t *testing.T) {
			ans := getAmountOfFish(80, tt.vals)
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}

func TestRunSpawnMoreFishies(t *testing.T) {
	var tests = []struct {
		vals string
		want int
	}{
		{
			"3,4,3,1,2",
			26984457539,
		},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d", len(tt.vals))
		t.Run(testname, func(t *testing.T) {
			ans := getAmountOfFish(256, tt.vals)
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}
