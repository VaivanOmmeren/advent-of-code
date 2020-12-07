// Assignment 1

const fs = require("fs");
const path = require("path");

function partOne(pathString) {
    const input = fs.readFileSync(path.join(__dirname, pathString))

    const groups = input.toString().split(/\n{2,}/g)
    let sum = 0;

    groups.forEach((group) => {
        const groupSet = new Set();
        const answers = group.split(/(\r\n|\n|\r)/gm).filter((el) => el !== '\n');
        answers.forEach((a) => {
            const individualAnswers = a.split("");
            individualAnswers.forEach((aw) => {
                groupSet.add(aw);
            })
        })

        sum = sum + groupSet.size;
    })

    return sum
}

function partTwo(pathString) {
    const input = fs.readFileSync(path.join(__dirname, pathString))

    const groups = input.toString().trimEnd().split(/\n{2,}/g)
    let sum = 0;

    groups.forEach((group) => {
        const groupSet = new Set();
        const answers = group.split(/(\r\n|\n|\r)/gm).filter((el) => el !== '\n');
        const answerResults = {};
        answers.forEach((a) => {
            const individualAnswers = a.split("");
            individualAnswers.forEach((aw) => {
                if(groupSet.has(aw)) answerResults[aw]++
                else {
                    groupSet.add(aw);
                    answerResults[aw] = 1;
                }
            })
        })

        let groupSum = 0;
        for (const [key, value] of Object.entries(answerResults)){
            if(value === answers.length) groupSum++
        }
        sum = sum + groupSum;
    })

    return sum;
}

module.exports = {
    PartOne: partOne,
    PartTwo: partTwo
}


