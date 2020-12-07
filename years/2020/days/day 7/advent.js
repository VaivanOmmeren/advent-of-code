const fs = require("fs");
const path = require("path");
let canContainCount = 0;
const rulesObject = {}
const haveChecked = []

function partOne (pathString) {
    const input = fs.readFileSync(path.join(__dirname, pathString))
    const rules = input.toString().split(new RegExp(/\n/, "g"))
    const myBag = "shiny gold";

    rules.forEach((rule) => {
        const splitRule = rule.split("contain")
        rulesObject[splitRule[0]] = splitRule[1].split(',')
    })

    findBagThatContainsMe(myBag)
    console.log(canContainCount)
    return canContainCount;
}

function findBagThatContainsMe(name) {
    if (name != null) {
        for(const [key, value] of Object.entries(rulesObject)) {
            value.forEach((bag) => {
                if(bag.match(new RegExp(name, "g"))) {
                    const splitKey = key.split(" ").splice(0,2).join(" ")

                    if (!haveChecked.includes(splitKey)) {
                        haveChecked.push(splitKey)
                        canContainCount++;
                        findBagThatContainsMe(splitKey);
                    }
                }
            })
        }
    }

    return;
}

module.exports = {
    PartOne: partOne
}