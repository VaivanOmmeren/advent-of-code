const parts = require("../advent");

describe("AoC day 6", () => {
    test("Part One", () => {
        expect(parts.PartOne("/test/input.txt")).toBe(11);
    })
    test("Part Two", () => {
        expect(parts.PartTwo("/test/input.txt")).toBe(6);
    })
})