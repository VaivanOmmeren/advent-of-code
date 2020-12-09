const fs = require("fs");
const path = require("path");


partTwo("input.txt", 25)

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

function partTwo(pathString, preamble) {
    const input = fs.readFileSync(path.join(__dirname, pathString))
    const nums = input.toString().trimEnd().split(new RegExp(/\n/, "g"))
    const sumToFind = partOne(pathString, preamble)
    let idx = 0;
    let sumOf = []

    while (idx < nums.length) {
        for(let i = idx; i < nums.length; i++) {
            if(sumOf.length === 0) sumOf.push(+nums[i])
            else {

                const s = sumOf.reduce((a, b) => a + b, 0)
                if(s === sumToFind) {
                    const min = Math.min(...sumOf)
                    const max = Math.max(...sumOf);

                    return min + max
                } else if (s > sumToFind) sumOf = []
                else {
                    sumOf.push(+nums[i])
                }
            }
        }
        idx++;
    }

}

module.exports = {
    PartOne: partOne,
    PartTwo: partTwo
}