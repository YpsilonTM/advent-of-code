import { readFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })
const elfCalories = data.split('\r\n\r\n').map((line) => line.split('\r\n'))

function part1() {
  const caloriesPerElf = elfCalories.map((calories) => calories.reduce((acc, curr) => acc + parseInt(curr), 0))
  const highestCalories = Math.max(...caloriesPerElf)
  return highestCalories
}

function part2() {
  const caloriesPerElf = elfCalories.map((calories) => calories.reduce((acc, curr) => acc + parseInt(curr), 0))
  const topThreeCalories = caloriesPerElf.sort((a, b) => b - a).slice(0, 3)
  const sum = topThreeCalories.reduce((acc, curr) => acc + curr, 0)
  return sum
}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
