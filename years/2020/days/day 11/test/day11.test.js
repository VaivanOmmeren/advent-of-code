const parts = require("../advent");


describe("AoC day 11", () => {
    test('Part One', () => {
        expect(parts.PartOne("/test/input.txt")).toBe(37);
    })
    test('Part Two', () => {
        expect(parts.PartTwo("/test/input.txt")).toBe(26)
    })
})
