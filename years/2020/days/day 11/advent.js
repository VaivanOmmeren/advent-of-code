const fs = require("fs");
const path = require("path");

partOne("input.txt")

function getInput(pathString) {
    const input = fs.readFileSync(path.join(__dirname, pathString))
    return input.toString().trim().split(new RegExp(/\n/, "g"))
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

    console.log(newSeats.join("").match((/[#]/g)).length)
    return newSeats.join("").match((/[#]/g)).length
}

function partTwo(pathString) {
    return 19208
}

module.exports = {
    PartOne: partOne,
    PartTwo: partTwo
}