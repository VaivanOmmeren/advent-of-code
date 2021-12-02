package main

import "testing"
import "fmt"

func TestSubmarineCommands(t *testing.T) {
	var tests = []struct {
		vals []string
		want int
	}{
		{
			[]string{"forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"},
			150,
		},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d", len(tt.vals))
		t.Run(testname, func(t *testing.T) {
			ans := executeSubmarineCommands(tt.vals)
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}

func TestAdvancedSubmarineCommands(t *testing.T) {
	var tests = []struct {
		vals []string
		want int
	}{
		{
			[]string{"forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"},
			900,
		},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d", len(tt.vals))
		t.Run(testname, func(t *testing.T) {
			ans := executeAdvancedSubmarineCommands(tt.vals)
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}
