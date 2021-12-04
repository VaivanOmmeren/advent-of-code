package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

type bingo struct {
	draws           []string
	boards          []board
	boardsCompleted int
	finished        []board
}

type board struct {
	rows   []row
	hDraws map[int]int
	vDraws map[int]int
	won    bool
}

type row struct {
	values []value
}

type value struct {
	val      string
	position position
	marked   bool
}

type position struct {
	horizontal int
	vertical   int
}

func main() {
	input := ReadInput()
	game = bingo{}
	game.createBingoGame(input)
	game.startGame()
	PartOne()
	PartTwo()
}

var game bingo

func getGame() *bingo {
	return &game
}

func PartOne() {
	fmt.Printf("-- Answer for part 1: %d --\n", 3)
}

func PartTwo() {
	fmt.Printf("-- Answer for part 2: %d --\n", 2)
}

func ReadInput() []string {
	content, err := ioutil.ReadFile("input")
	if err != nil {
		log.Fatal(err)
	}

	return strings.Split(string(content), "\n\n")
}

func (b *bingo) createBingoGame(input []string) {
	b.draws = strings.Split(input[0], ",")

	for i := 1; i < len(input); i++ {
		b.boards = append(b.boards, createBoard(input[i]))
	}
}

func createBoard(vals string) board {
	b := board{
		hDraws: map[int]int{},
		vDraws: map[int]int{},
	}
	rowVals := strings.Split(vals, "\n")

	for i, v := range rowVals {
		b.rows = append(b.rows, createRow(v, i))
	}

	return b
}

func createRow(vals string, vPos int) row {
	r := row{}
	cValues := strings.ReplaceAll(vals, "  ", " ")
	values := strings.Split(cValues, " ")

	scuffedCounter := 0
	for i, v := range values {
		if v != "" {
			r.values = append(r.values, createValue(v, vPos, i-scuffedCounter))
		} else {
			scuffedCounter++
		}
	}

	return r
}

func createValue(val string, vPos int, hPos int) value {
	return value{
		val: val,
		position: position{
			horizontal: hPos,
			vertical:   vPos,
		},
	}
}

func (b *bingo) startGame() {

	for _, d := range b.draws {
		for i, board := range b.boards {
			board.checkForNumber(d, i)
		}
	}
}

func (b *board) checkForNumber(num string, boardNr int) {
	if b.won {
		return
	}
	for i, r := range b.rows {
		for x, v := range r.values {
			if v.val == num {
				b.hDraws[v.position.horizontal]++
				b.vDraws[v.position.vertical]++
				b.rows[i].values[x].marked = true

				if b.hDraws[v.position.horizontal] == 5 || b.vDraws[v.position.vertical] == 5 {
					// sum := b.getUnmarkedSum()
					// numConv, _ := strconv.Atoi(num)
					// fmt.Println(sum*numConv)
					if !b.won {
						game.boards[boardNr].won = true
						game.boardsCompleted++

						fmt.Println("Board completed by num", num)
						sum := b.getUnmarkedSum()
						numConv, _ := strconv.Atoi(num)
						fmt.Println(numConv * sum)
					}
					if game.boardsCompleted == len(game.boards) {
						fmt.Println("last board completed")
						fmt.Println(b)
						fmt.Println("by num", num)
						sum := b.getUnmarkedSum()
						numConv, _ := strconv.Atoi(num)
						fmt.Println(numConv * sum)
					}
				}
			}
		}
	}
}

func (b *board) getUnmarkedSum() int {
	var sum int

	for _, r := range b.rows {
		for _, v := range r.values {
			if !v.marked {
				c, _ := strconv.Atoi(v.val)
				sum += c
			}
		}
	}

	return sum
}
