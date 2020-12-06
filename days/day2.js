const input = require("../input.txt")

let validPassword = 0;

input.forEach((el) => {
    const split = el.split(" ")
    const indexes = split[0].split("-");
    const firstIndex = indexes[0] - 1
    const secondIndex = indexes[1] - 1
    const char = split[1].replace(":", '')
    const password = split[2]

    if((password[firstIndex] === char || password[secondIndex] === char)
        && !(password[firstIndex] === char && password[secondIndex] === char))  validPassword++


})

console.log(validPassword)