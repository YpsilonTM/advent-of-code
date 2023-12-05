import fs from 'fs'

const input = fs.readFileSync('./2023/01/input.txt', 'utf-8')

const textNumbersRegex = new RegExp(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].join('|'), 'g')

function part1(input: string) {
  const lines = input.split('\r\n')
  const allDigitsRegex = /\d/g
  const matches = lines
    .map((line) => {
      const digits = line.match(allDigitsRegex)
      if (!digits) return
      const first = digits?.[0]
      const last = digits?.[digits.length - 1]
      return first + last
    })
    .filter((value) => value)
    .reduce((acc, value) => {
      const number = parseInt(value || '0')
      return acc + number
    }, 0)
  return matches
}

function part2(input: string) {
  // get lines as array
  const lines = input.split('\r\n')

  // replace text numbers with digits
  const parsedLines = lines.map((line) => {
    const parsedLine = line.replace(textNumbersRegex, (match) => {
      const number = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].indexOf(match) + 1
      return number.toString()
    })
    return parsedLine
  })

  // get all digits
  const allDigitsRegex = /\d/g
  const matches = parsedLines
    .map((line) => {
      const digits = line.match(allDigitsRegex)
      if (!digits) return 0
      const first = digits?.[0]
      const last = digits?.[digits.length - 1]
      return Number(first + last) || 0
    })
    .filter((value) => value)
    .reduce((acc, value) => {
      return acc + value
    }, 0)

  return matches
}

console.log(part2(input))
