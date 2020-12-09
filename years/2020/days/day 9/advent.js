const fs = require("fs");
const path = require("path");


partOne("input.txt", 25)

function partOne(pathString, preamble) {
    const input = fs.readFileSync(path.join(__dirname, pathString))
    const nums = input.toString().trimEnd().split(new RegExp(/\n/, "g"))


    for (let p = preamble ; p < nums.length; p++){
        const pr = nums.slice(p - preamble, p)
        const n = nums.slice(p);

        let foundSum = false;
        pr.forEach((p) => {
            if(pr.includes((+n[0] - +p).toString())) foundSum = true;
        })

        if(!foundSum) return +n[0]
    }
}

function partTwo(pathString) {
    return 1
}

module.exports = {
    PartOne: partOne,
    PartTwo: partTwo
}