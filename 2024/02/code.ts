import { readFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })
const lines = data.split('\n')

function checkSafe(numbers: number[]): boolean {
    const onlyIncreasing = numbers.every((num, i, arr) => {
        if (i === 0) return true
        return num > arr[i - 1]
    })
    const onlyDecreasing = numbers.every((num, i, arr) => {
        if (i === 0) return true
        return num < arr[i - 1]
    })

    const noBigDifference = numbers.every((num, i, arr) => {
        if (i === 0) return true
        return Math.abs(num - arr[i - 1]) <= 3
    })

    return (onlyIncreasing || onlyDecreasing) && noBigDifference
}

function part1() {
    const processed = lines.map((line) => {
        const numbers = line.split(' ').map(Number)
        return checkSafe(numbers)
    })

    const totalSafe = processed.filter(Boolean).length

    return totalSafe
}

function part2() {
    const processed = lines.map((line) => {
        const numbers = line.split(' ').map(Number)

        const allScenarios = numbers.map((_, i) => {
            const copy = [...numbers]
            copy.splice(i, 1)
            return copy
        })

        const safe = allScenarios.some((scenario) => checkSafe(scenario))

        return safe
    })

    const totalSafe = processed.filter(Boolean).length

    return totalSafe
}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
