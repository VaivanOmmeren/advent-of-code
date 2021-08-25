package main

import "testing"
import "fmt"

func TestFuelRequirements(t *testing.T) {
	var tests = []struct {
		mass int
		want int
	}{
		{12, 2},
		{14, 2},
		{1969, 654},
		{100756, 33583},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d", tt.mass)
		t.Run(testname, func(t *testing.T) {
			ans := CalculateFuelRequirements(tt.mass)
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}

func TestNestedFuelRequirements(t *testing.T) {
	var tests = []struct {
		mass int
		want int
	}{
		{14, 2},
		{1969, 966},
		{100756, 50346},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d", tt.mass)
		t.Run(testname, func(t *testing.T) {
			ans := CalculateNestedFuelRequirements(tt.mass)
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}