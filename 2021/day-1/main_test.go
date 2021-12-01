package main

import "testing"
import "fmt"

func TestDepthMeasurementIncrease(t *testing.T) {
	var tests = []struct {
		vals []int
		want int
	}{
		{
			[]int{199, 200, 208, 210, 200, 207, 240, 269, 260, 263},
			7,
		},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d", len(tt.vals))
		t.Run(testname, func(t *testing.T) {
			ans := calculateDepthMeasurementIncrease(tt.vals)
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}

func TestSumDepthMeasurementIncrease(t *testing.T) {
	var tests = []struct {
		vals []int
		want int
	}{
		{
			[]int{199, 200, 208, 210, 200, 207, 240, 269, 260, 263},
			5,
		},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d", len(tt.vals))
		t.Run(testname, func(t *testing.T) {
			sumList := buildSumList(tt.vals)
			ans := calculateDepthMeasurementIncrease(sumList)
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}
