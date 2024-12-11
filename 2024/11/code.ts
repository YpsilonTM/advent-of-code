import { readFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })
let numbers = data.split(' ').map((number) => parseInt(number) || 0)

function blink(numbers: number[]) {
  const result: number[] = []
  for (const number of numbers) {
    if (number === 0) {
      result.push(1)
    } else if (number.toString().length % 2 === 0) {
      const strNum = number.toString()
      const half = strNum.length / 2
      result.push(parseInt(strNum.slice(0, half)) || 0, parseInt(strNum.slice(half)) || 0)
    } else {
      result.push(number * 2024)
    }
  }
  return result
}

function part1() {
  for (let i = 0; i < 25; i++) {
    numbers = blink(numbers)
    console.log('Blink #' + i, numbers.length)
  }
  return numbers.length
}

function part2() {}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
