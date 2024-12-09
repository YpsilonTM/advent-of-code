import { readFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })
const lines = data.split('\n')

function part1() {}

function part2() {}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
