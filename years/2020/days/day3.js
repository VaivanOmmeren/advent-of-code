
// Assignment Part 1
const input = require("./input")


let trees = 0;
let currentIndex = 0


input.forEach((line, idx) => {
    input[idx] = input[idx].repeat(100)
})

input.forEach((_, idx) => {
    currentIndex = currentIndex + 3;

    if(input[idx +1]) {
        if(input[idx + 1][currentIndex] === "#") {
            console.log("Tree found")
            trees++
        }
    }
})


// Assignment Part 2

const input = require("./input")

const slopes = [[1,1], [1,3], [1,5], [1,7], [2,1]]
const slopeResults = [];

input.forEach((line, idx) => {
    input[idx] = input[idx].repeat(100)
})

let totalTrees = 1;

slopes.forEach((slope) => {
    let trees = 0;

    let currentIndex = 0;
    let down = 0;

    while (down < input.length){
        if(input[down][currentIndex] === "#") trees++;

        down = down + slope[0];
        currentIndex = currentIndex + slope[1]
    }

    slopeResults.push(trees);

    totalTrees = totalTrees * trees;
})



console.log(slopeResults)
console.log(`Total amount of trees ${totalTrees}`)
