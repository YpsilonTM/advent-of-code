import { readFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })
const lines = data.split('\n')

function part1() {
    const pairs = lines.map((line) => line.split(/\s+/).map(Number))

    const sortedList1 = pairs.map((pair) => pair[0]).sort((a, b) => a - b)
    const sortedList2 = pairs.map((pair) => pair[1]).sort((a, b) => a - b)

    const list = sortedList1.map((n, index) => Math.abs(n - sortedList2[index]))

    const sum = list.reduce((acc, curr) => acc + curr, 0)

    return sum
}

console.log('Part 1', part1())

function part2() {
    const pairs = lines.map((line) => line.split(/\D+/).map(Number))
    const list1 = pairs.map((pair) => pair[0])
    const list2 = pairs.map((pair) => pair[1])

    const calculation = list1.map((n) => {
        const occurrence = list2.filter((m) => m === n).length
        return n * occurrence
    })

    const sum = calculation.reduce((acc, curr) => acc + curr, 0)

    return sum
}

console.log('Part 2', part2())
