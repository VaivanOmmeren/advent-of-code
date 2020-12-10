const parts = require("../advent");


describe("AoC day 10", () => {
    test('Part One', () => {
        expect(parts.PartOne("/test/input.txt")).toBe(220);
    })
    test('Part Two', () => {
        expect(parts.PartTwo("/test/input.txt")).toBe(1)
    })
})
