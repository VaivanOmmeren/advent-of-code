const parts = require("../advent");


describe("AoC day 8", () => {
    test('Part One', () => {
        expect(parts.PartOne("/test/input.txt")).toBe(5);
    })
    test('Part Two', () => {
        expect(parts.PartTwo("/test/input.txt")).toBe(8)
    })
})

