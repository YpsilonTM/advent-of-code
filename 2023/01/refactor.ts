import { readFileSync } from 'fs'

const input = readFileSync('./2023/01/input.txt', 'utf-8')

const regexNumber = /\d/g
const regexWithText = /(\d|one|two|three|four|five|six|seven|eight|nine)/g
const numberDictionary = new Map([
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
])

function getNumberFromLine(line: string): number {
  const numbers = line.trim().match(regexNumber)
  if (!numbers) return 0
  const firstNumber = numbers[0]
  const lastNumber = numbers[numbers.length - 1]
  const numberString = firstNumber + lastNumber
  return Number(numberString)
}

function getNumberStringFromLine(line: string) {
  const numbers = line.trim().match(regexWithText)
  if (!numbers) return ''

  const numberArray = numbers.map((number) => {
    if (numberDictionary.has(number)) {
      return numberDictionary.get(number)
    }
    return number
  })

  const firstNumber = numberArray[0]?.toString()
  const lastNumber = numberArray[numberArray.length - 1]?.toString()

  if (!firstNumber || !lastNumber) return ''
  const numberString = firstNumber + lastNumber
  return numberString
}

function getPart1Solution() {
  const lines = input.split('\n').map((line) => {
    const number = getNumberFromLine(line)
    console.log(number)
    return number
  })

  return lines.reduce((acc, curr) => acc + curr, 0)
}

function getPart2Solution() {
  const lines = input.split('\n').map((line) => {
    const number = getNumberStringFromLine(line)
    console.log(number)
    return number
  })

  return lines.reduce((acc, curr) => acc + Number(curr), 0)
}

// console.log(getPart1Solution())
console.log(getPart2Solution())
