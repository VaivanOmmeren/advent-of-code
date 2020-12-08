const fs = require("fs");
const path = require("path");
let accumulator = 0;

function partOne(pathString) {
    const input = fs.readFileSync(path.join(__dirname, pathString))
    const instructions = input.toString().trimEnd().split(new RegExp(/\n/, "g"))

    if (checkIfLoops(instructions)) return accumulator
}

function checkIfLoops(instructions) {
    const executedActions = new Set()

    let index = 0;
    while(index < instructions.length) {
        const i = instructions[index].split(" ");
        const action = i[0];
        const arg = i[1];

        switch (action) {
            case "nop":
                index++
                break;
            case "jmp":
                arg.match(/[+]/)
                    ? index = index + +arg.replace("+", "")
                    : index = index - +arg.replace("-", "")
                break;
            case "acc":
                arg.match(/[+]/)
                    ? accumulator = accumulator + +arg.replace("+", "")
                    : accumulator = accumulator - +arg.replace("-", "")
                index++
                break;
        }

        if (executedActions.has(index)) return true
        executedActions.add(index);
    }
}

function partTwo(pathString) {
    const input = fs.readFileSync(path.join(__dirname, pathString))
    const instructions = input.toString().trimEnd().split(new RegExp(/\n/, "g"))

    for (let i = 0; i < instructions.length; i++) {
        accumulator = 0;
        if(instructions[i].match(/nop/)) {
            const ic = JSON.parse(JSON.stringify(instructions));
            ic[i] = ic[i].replace("nop", "jmp");
            if(!checkIfLoops(ic)) return accumulator
        } else if (instructions[i].match(/jmp/)) {
            const ic = JSON.parse(JSON.stringify(instructions));
            ic[i] = ic[i].replace("jmp", "nop");
            if(!checkIfLoops(ic)) return accumulator
        }
    }
}

module.exports = {
    PartOne: partOne,
    PartTwo: partTwo
}