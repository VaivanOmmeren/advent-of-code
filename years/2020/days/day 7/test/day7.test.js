const parts = require("../advent");


describe("AoC day 7", () => {
    test('Part One', () => {
        expect(parts.PartOne("/test/input.txt")).toBe(4);
    })
    test('Part Two', () => {
        expect(parts.PartTwo("/test/input.txt")).toBe(32)
    })
})

