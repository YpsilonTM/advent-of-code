import { readFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'example.txt'), { encoding: 'utf-8', flag: 'r' })
const lines = data.split('\n')

function part1() {
  const equations = lines.map((line) => {
    const [left, right] = line.trim().split(':')
    const input = right
      .trim()
      .split(' ')
      .map((x) => Number(x))

    return { input, output: Number(left) }
  })

  // for the equation input, create all combinations with operators + and * and check if the result is equal to the output
  equations.forEach(({ input, output }) => {
    const operators = ['+', '*']

    const combinations = []
    const possibleCombinations = Math.pow(2, input.length - 1)
  })

  return equations
}

function part2() {}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
