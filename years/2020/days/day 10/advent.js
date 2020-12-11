const fs = require("fs");
const path = require("path");

partTwo("input.txt")

function getInput(pathString) {
    const input = fs.readFileSync(path.join(__dirname, pathString))
    const volts = input.toString().trim().split(new RegExp(/\n/, "g")).map((l) => +l)
    volts.push(0);
    volts.push(Math.max(...volts) + 3)
    volts.sort((a, b) => a - b)

    return volts
}

function partOne(pathString) {
    const volts = getInput(pathString)
    const vCounts = {}

    for(let i = 1; i < volts.length; i++) {
        const diff = volts[i] - volts[i-1]
        vCounts[diff] = (vCounts[diff] || 0) + 1;
    }

    return vCounts[1] * vCounts[3]
}

function partTwo(pathString) {
    const volts = getInput(pathString)
    const opts = new Array(volts.length).fill(0)
    opts[0] = 1;

    for (let i = 0; i < volts.length; ++i) {
        for(let j = i + 1; j < volts.length; ++j) {
            if(volts[j] - volts[i] > 3) break;
            opts[j] += opts[i]
        }
    }

    return opts[opts.length -1]
}


module.exports = {
    PartOne: partOne,
    PartTwo: partTwo
}