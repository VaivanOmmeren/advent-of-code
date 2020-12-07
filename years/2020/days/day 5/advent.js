// Assignment 1

const fs = require("fs");
const path = require("path");

const seatIds = [];


function partOne(pathString) {
    const rawInput = fs.readFileSync(path.join(__dirname, pathString))
    const input = rawInput.toString().trimEnd().split(/\n/);

    const conversion = {
        "B": "1",
        "F": "0",
        "L": "0",
        "R": "1"
    }

    let higestID = 0;

    input.forEach((pass) => {
        let passCopy = pass;

        for(const [key, value] of Object.entries(conversion)) {
            passCopy = passCopy.replace(new RegExp(key, "g"), value)
        }

        const rowNumber = (parseInt(passCopy.slice(0,7), 2));
        const seatNumber = (parseInt(passCopy.slice(passCopy.length - 3), 2));

        const seatId = (rowNumber * 8) + seatNumber

        seatIds.push(seatId);


        if(seatId > higestID)
            higestID = seatId
    })

    seatIds.sort((a, b) => a - b)

    return higestID;
}

function partTwo(pathString) {
    partOne(pathString)
    let counter = seatIds[0] -1;

    for(let i = 0; i < seatIds.length; i++ ){
        counter++;
        if(counter !== seatIds[i]) {
            console.log(`Your seat id is: ${counter}`)
            break;
        }
    }
}

module.exports = {
    PartOne: partOne,
    PartTwo: partTwo
}
