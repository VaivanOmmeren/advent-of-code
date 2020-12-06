// Assignment 1
const input = require("./input");

const max = 127
const seatIds = [];

let higestID = 0;

input.forEach((pass) => {
    const chars = pass.split('');
    let rowBinary = ""
    let seatBinary = ""

    chars.forEach((c) => {
        if(c === "F")
            rowBinary = rowBinary + "0"
        else if (c === "B")
            rowBinary = rowBinary + "1"
        else if (c === "R")
            seatBinary = seatBinary + "1"
        else if (c === "L")
            seatBinary = seatBinary + "0"
    })


    const seatId = ((parseInt(rowBinary, 2)) * 8) + parseInt(seatBinary, 2)
    seatIds.push(seatId);
    seatIds.sort((a, b) => a - b)


    if(seatId > higestID)
        higestID = seatId
})


// Assignment 2
let counter = seatIds[0] -1;

for(let i = 0; i < seatIds.length; i++ ){
    counter++;
    if(counter !== seatIds[i]) {
        console.log(`Your seat id is: ${counter}`)
        break;
    }
}