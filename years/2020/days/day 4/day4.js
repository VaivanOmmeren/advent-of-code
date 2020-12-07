//Assignment 1

const fs = require("fs");

const input = fs.readFileSync("input.js")

const passports = input.toString().split(/\n{2,}/g)
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
let totalValidPasswords = 0;

passports.forEach((passport) => {
    passport.replace(/(\r\n|\n|\r)/gm, "");

    let isValid = true;

    requiredFields.forEach((field) => {
        if(!passport.match(new RegExp(field, "g"))) isValid = false
    })

    if (isValid) totalValidPasswords++
})

console.log(`There are ${totalValidPasswords} valid passwords!`)


// Assignment 2

const fs = require("fs");

const input = fs.readFileSync("input.js")

const passports = input.toString().split(/\n{2,}/g)
const requiredField = {
    "byr": [1920, 2002],
    "iyr": [2010, 2020],
    "eyr": [2020, 2030],
    "hgt": {
        "cm": [150, 193],
        "in": [59, 76]
    },
    "hcl": /#[a-f0-9]{6}/,
    "ecl": ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"],
    "pid": /^[0-9]{9}$/,
}
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
let totalValidPasswords = 0;

console.log(passports.length)

passports.forEach((passport) => {
    passport.replace(/(\r\n|\n|\r)/gm, "");

    let hasAllFields = [];
    let fieldsAreValid = []

    requiredFields.forEach((field) => {
        !passport.match(new RegExp(field, "g")) ? hasAllFields.push(false) : hasAllFields.push(true)
    })

    const splitFields = passport.split(/[\s-\n]/g);

    if (!hasAllFields.includes(false)) {

        splitFields.forEach((f) => {
            const g = f.split(":")
            const type = g[0];
            const data = g[1];

            switch (type) {
            case "byr":
                (data >= requiredField[type][0] && data <= requiredField[type][1])
                    ? fieldsAreValid.push(true)
                    : fieldsAreValid.push(false)
                break;
            case "iyr":
                (data >= requiredField[type][0] && data <= requiredField[type][1])
                    ? fieldsAreValid.push(true)
                    : fieldsAreValid.push(false);
                break;
            case "eyr":
                if(data >= requiredField[type][0] && data <= requiredField[type][1])
                    fieldsAreValid.push(true)
                else fieldsAreValid.push(false);
                break;
            case "hgt":
                if(data.match(/cm/)) fieldsAreValid.push((+data.replace("cm", "") >= 150 && +data.replace("cm", "") <= 193))
                else if(data.match(/in/)) fieldsAreValid.push((+data.replace("in", "") >= 59 && +data.replace("in", "") <= 76))
                else fieldsAreValid.push(false);
                break;
            case "hcl":
                (data.match(/#[a-f0-9]{6}/))
                    ? fieldsAreValid.push(true)
                    : fieldsAreValid.push(false)

                break;
            case "ecl":
                (requiredField[type].findIndex((el) => el === data) !== -1)
                    ? fieldsAreValid.push(true)
                    : fieldsAreValid.push(false)
                break;
            case "pid":
                (data.match(requiredField[type]))
                    ? fieldsAreValid.push(true)
                    : fieldsAreValid.push(false);
                break;
            default:
                break;
            }
        })
    }

    if (!hasAllFields.includes(false) && !fieldsAreValid.includes(false)) {
        totalValidPasswords++
    }
})

console.log(`There are ${totalValidPasswords} valid passwords!`)