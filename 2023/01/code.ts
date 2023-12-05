import fs from 'fs'

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

function part2(path: string) {
  const input = fs.readFileSync(path, 'utf-8')

  const regex = /\d/g
  const dictionary = [/(one)/g, /(two)/g, /(three)/g, /(four)/g, /(five)/g, /(six)/g, /(seven)/g, /(eight)/g, /(nine)/g]

  const lines = input.split('\n').map((line) => {
    dictionary.map((dicExp, i) => (line = line.replace(dicExp, `$1${i + 1}$1`)))
    return line
  })

  const solution = lines.reduce((acc, curr) => {
    const matchs = curr.match(regex) ?? ['0']
    const number = (matchs.at(0) ?? '') + (matchs.at(-1) ?? '')
    return acc + +number
  }, 0)

  return solution
}

console.log(part2('./2023/01/example.txt'))
console.log(part2('./2023/01/input.txt'))
