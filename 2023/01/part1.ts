console.log('Part 1 Start')

import { readFileSync } from 'fs'

const file = readFileSync('./input.txt', 'utf-8')

const lines = file
  .split('\r\n')
  .map((line) => line.match(/\d/g))
  .map((digits) => (digits ? digits[0] + digits[digits.length - 1] : null))
  .filter((line) => line)
  .reduce((acc, line) => acc + parseInt(line || '0'), 0)

console.log(lines)
