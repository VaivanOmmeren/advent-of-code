const fs = require("fs");
const path = require("path");

partOne("input.txt")

function partOne(pathString) {
    const input = fs.readFileSync(path.join(__dirname, pathString))
    const volts = input.toString().trimEnd().split(new RegExp(/\n/, "g"))
    volts.sort((a, b) => a - b)
    const vCounts = {}


    volts.forEach((v, i) => {
        if(volts[i+1]) {
            if(i === 0) vCounts[v] = 1;
            const diff = +volts[i+1] - +v;
            if(!vCounts[diff]) vCounts[diff] = 0;
            vCounts[diff]++
        }
    })

    vCounts['3']++
    return vCounts['1'] * vCounts['3']
}

function partTwo(pathString) {
    return 1
}

module.exports = {
    PartOne: partOne,
    PartTwo: partTwo
}