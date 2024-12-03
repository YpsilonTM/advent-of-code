import { readFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })

function part1() {
    const functionPattern = /mul\((\d+),(\d+)\)/g
    const validFunctions = data.match(functionPattern)

    if (!validFunctions) return 0

    const results = validFunctions.map((func) => {
        const args = func.match(/\d+/g)?.map(Number)

        if (!args) return 0

        return args.reduce((acc, curr) => acc * curr, 1)
    })

    return results.reduce((acc, curr) => acc + curr, 0)
}

function part2() {
    const functionPattern = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g
    const validFunctions = data.match(functionPattern)

    if (!validFunctions) return 0

    let mulEnabled = true

    const results = validFunctions.map((func) => {
        if (func.includes('do()')) {
            mulEnabled = true
            return 0
        } else if (func.includes("don't()")) {
            mulEnabled = false
            return 0
        } else {
            const args = func.match(/\d+/g)?.map(Number)
            if (!args || !mulEnabled) return 0
            return args.reduce((acc, curr) => acc * curr, 1)
        }
    })

    const result = results.reduce((acc, curr) => acc + curr, 0)
    return result
}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
