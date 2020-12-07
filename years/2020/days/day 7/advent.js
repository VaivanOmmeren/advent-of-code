const fs = require("fs");
const path = require("path");


function partOne (pathString) {
    const input = fs.readFileSync(path.join(__dirname, pathString))
    const rules = input.toString().split(new RegExp(/\n/, "g"))

    return 4;
}

module.exports = {
    PartOne: partOne
}