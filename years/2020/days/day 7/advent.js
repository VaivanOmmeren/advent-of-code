const fs = require("fs");
const path = require("path");
let canContainCount = 0;
const rulesObject = {}
const haveChecked = []

function partOne (pathString) {
    const input = fs.readFileSync(path.join(__dirname, pathString))
    const rules = input.toString().trimEnd().split(new RegExp(/\n/, "g"))
    const myBag = "shiny gold";

    rules.forEach((rule) => {
        const splitRule = rule.split("contain")
        rulesObject[splitRule[0]] = splitRule[1].split(',')
    })

    findBagThatContainsMe(myBag)
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

function partTwo(pathString) {
    const input = fs.readFileSync(path.join(__dirname, pathString))
    const rules = input.toString().trimEnd().split(new RegExp(/\n/, "g"))

    const bagInfo = {}

    rules.forEach((r) => {
        const splitRule = r.split("contain")
        const ruleKey = splitRule[0].split(" ").splice(0,2).join(" ");
        const ruleValues = splitRule[1].split(',');

        ruleValues.forEach((v) => {
            const amount = v.match(/[0-9]/)
            if(amount) {
                const bagName = v.split(" ").splice(2, 2).join(" ")
                if(!bagInfo[ruleKey]) bagInfo[ruleKey] = {}
                bagInfo[ruleKey][bagName] = amount[0]
            }
        })

    })

    return getNestedBagCount('shiny gold', 1, bagInfo)
}

function getNestedBagCount(bagName, amount, bagInfo) {

    if (!bagInfo[bagName]) return amount * 1;
    let total = 0;
    for(const [key, value] of Object.entries(bagInfo[bagName])) {
        total = total + (amount * getNestedBagCount(key, +value, bagInfo))
    }

    if(bagName !== "shiny gold") total = total + amount

    return total
}



module.exports = {
    PartOne: partOne,
    PartTwo: partTwo
}