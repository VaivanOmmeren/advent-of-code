package main

import "testing"
import "fmt"
import "strconv"

func TestRunBinaryDiagnostic(t *testing.T) {
	var tests = []struct {
		vals []string
		want int64
	}{
		{
			[]string{"00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010"},
			198,
		},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d", len(tt.vals))
		t.Run(testname, func(t *testing.T) {
			gamma := getGammaRateBit(tt.vals)
			epsilon := getEpsilonBit(gamma)
			g, _ := strconv.ParseInt(gamma, 2, 64)
			e, _ := strconv.ParseInt(epsilon, 2, 64)
			ans := e * g
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}

func TestVerifyLifeSupport(t *testing.T) {
	var tests = []struct {
		vals []string
		want int64
	}{
		{
			[]string{"00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010"},
			230,
		},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("%d", len(tt.vals))
		t.Run(testname, func(t *testing.T) {

			oxygen := filterSlice(tt.vals, 0, true)
			co2 := filterSlice(tt.vals, 0, false)
			o, _ := strconv.ParseInt(oxygen, 2, 64)
			co, _ := strconv.ParseInt(co2, 2, 64)

			ans := o * co
			if ans != tt.want {
				t.Errorf("got %d, want %d", ans, tt.want)
			}
		})
	}
}
