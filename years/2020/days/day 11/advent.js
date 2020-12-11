const fs = require("fs");
const path = require("path");

partTwo("input.txt")

function getInput(pathString) {
    const input = fs.readFileSync(path.join(__dirname, pathString))
    return input.toString().trim().split(new RegExp(/\n/, "g"))
}


// ---------------------------------------------------------------------------------------------
// Part 1 - Find the amount of occupied seats based on a set of rules regarding adjacent seats
// ---------------------------------------------------------------------------------------------
function partOne(pathString) {
    let seats = getInput(pathString)
    let seatsChanged = []
    let newSeats = [];

    while(seatsChanged.length === 0 || seatsChanged.includes(true)) {
        if (seatsChanged.length !== 0) {
            seats = Array.from(newSeats);
            seatsChanged = [];
        }
        newSeats = [];
        seats.forEach((s, idx) => {
            let row = "";
            s.split("").forEach((r, i) => {
                switch(r) {
                    case ".":
                        row += "."
                        seatsChanged.push(false)
                        break;
                    case "L":
                        if(checkAdjacent(seats, idx, i) === 0) {
                            row += "#"
                            seatsChanged.push(true)
                        } else {
                            row += "L"
                            seatsChanged.push(false)
                        }
                        break;
                    case "#":
                        if(checkAdjacent(seats, idx, i) >= 4) {
                            row += "L"
                            seatsChanged.push(true)
                        } else {
                            row += "#"
                            seatsChanged.push(false)
                        }
                        break;
                }
            })
            newSeats.push(row);
        })
    }

    return newSeats.join("").match((/[#]/g)).length
}
function checkAdjacent(seats, row, seat) {
    let count = 0;
    if (seats[row - 1]) count = count + checkSeats(seat, seats[row - 1]);
    if (seats[row + 1]) count = count + checkSeats(seat, seats[row + 1])
    if (seats[row][seat - 1] === "#") count++
    if (seats[row][seat + 1] === "#") count++

    return count
}
function checkSeats(idx, row) {
    let count = 0;
    if (row[idx - 1] === "#") count++
    if (row[idx] === "#") count++
    if (row[idx + 1] === "#") count++

    return count
}


// -------------------------------------------------------------------------------------------------------------
// Part 2 - Find the amount of occupied seats based on a set of rules regarding the first visible adjacent seats
// -------------------------------------------------------------------------------------------------------------
function partTwo(pathString) {
    let seats = getInput(pathString)
    let seatsChanged = []
    let newSeats = [];

    while(seatsChanged.length === 0 || seatsChanged.includes(true)) {
        if (seatsChanged.length !== 0) {
            seats = Array.from(newSeats);
            seatsChanged = [];
        }
        newSeats = [];
        seats.forEach((s, idx) => {
            let row = "";
            s.split("").forEach((r, i) => {
                switch(r) {
                    case ".":
                        row += "."
                        seatsChanged.push(false)
                        break;
                    case "L":
                        if(checkVisibleAdjacent(seats, idx, i) === 0) {
                            row += "#"
                            seatsChanged.push(true)
                        } else {
                            row += "L"
                            seatsChanged.push(false)
                        }
                        break;
                    case "#":
                        if(checkVisibleAdjacent(seats, idx, i) >= 5) {
                            row += "L"
                            seatsChanged.push(true)
                        } else {
                            row += "#"
                            seatsChanged.push(false)
                        }
                        break;
                }
            })
            newSeats.push(row);
        })
    }

    return newSeats.join("").match((/[#]/g)).length
}
function checkVisibleAdjacent(seats, row, seat) {
    let count = 0;
    if(seats[row -1]) count = count
        + checkUp(seats, row - 1 , seat)
        + checkUpLeft(seats, row -1, seat - 1)
        + checkUpRight(seats, row -1, seat + 1)
    count = count
        + checkRight(seats, row, seat + 1)
        + checkLeft(seats, row, seat - 1)
    if(seats[row +1]) count = count
        + checkDown(seats, row + 1, seat)
        + checkDownLeft(seats, row + 1, seat -1)
        + checkDownRight(seats, row + 1, seat +1)

    return count
}
function checkUpLeft(seats, row, seat) {
    if(!seats[row] || !seats[row][seat]) return 0
    if(seats[row][seat] === ".") return checkUpLeft(seats, row - 1, seat - 1)
    else if (seats[row][seat] === "#") return 1
    return 0
}
function checkUp(seats, row, seat) {
    if(!seats[row] || !seats[row][seat]) return 0
    if(seats[row][seat] === ".") return checkUp(seats, row - 1, seat)
    else if (seats[row][seat] === "#") return 1
    return 0
}
function checkDown(seats, row, seat) {
    if(!seats[row] || !seats[row][seat]) return 0
    if(seats[row][seat] === ".") return checkDown(seats, row + 1, seat)
    else if (seats[row][seat] === "#") return 1
    return 0
}
function checkUpRight(seats, row, seat) {
    if(!seats[row] || !seats[row][seat]) return 0
    if(seats[row][seat] === ".") return checkUpRight(seats, row - 1, seat + 1)
    else if (seats[row][seat] === "#") return 1
    return 0
}
function checkRight(seats, row, seat) {
    if(!seats[row] || !seats[row][seat]) return 0
    if(seats[row][seat] === ".") return checkRight(seats, row, seat + 1)
    else if (seats[row][seat] === "#") return 1
    return 0
}
function checkLeft(seats, row, seat) {
    if(!seats[row] || !seats[row][seat]) return 0
    if(seats[row][seat] === ".") return checkLeft(seats, row, seat - 1)
    else if (seats[row][seat] === "#") return 1
    return 0
}
function checkDownLeft(seats, row, seat) {
    if(!seats[row] || !seats[row][seat]) return 0
    if(seats[row][seat] === ".") return checkDownLeft(seats, row + 1, seat - 1)
    else if (seats[row][seat] === "#") return 1
    return 0
}
function checkDownRight(seats, row, seat) {
    if(!seats[row] || !seats[row][seat]) return 0
    if(seats[row][seat] === ".") return checkDownRight(seats, row + 1, seat + 1)
    else if (seats[row][seat] === "#") return 1
    return 0
}


module.exports = {
    PartOne: partOne,
    PartTwo: partTwo
}