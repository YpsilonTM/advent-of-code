import { readFileSync } from 'fs'

const amountRedCubes = 12
const amountGreenCubes = 13
const amountBlueCubes = 14

function part1(path: string) {
  const input = readFileSync(path, 'utf-8')
    .split('\n')
    .map((line) => {
      const game = parseInt(line.split(':')[0].split(' ')[1])
      const sets = line
        .split(':')[1]
        .split(';')
        .map((set) => set.split(',').map((cube) => ({ color: cube.trim().split(' ')[1], amount: parseInt(cube.trim().split(' ')[0]) })))
      return { game, sets }
    })

  let sum = 0
  for (const { game, sets } of input) {
    let maxRed = 0,
      maxGreen = 0,
      maxBlue = 0
    for (const set of sets) {
      let red = 0,
        green = 0,
        blue = 0
      for (const { color, amount } of set) {
        if (color === 'red') red += amount
        else if (color === 'green') green += amount
        else if (color === 'blue') blue += amount
      }
      maxRed = Math.max(maxRed, red)
      maxGreen = Math.max(maxGreen, green)
      maxBlue = Math.max(maxBlue, blue)
    }
    if (maxRed <= amountRedCubes && maxGreen <= amountGreenCubes && maxBlue <= amountBlueCubes) {
      sum += game
    }
  }

  return sum
}

console.log(part1('./2023/02/example.txt'))
console.log(part1('./2023/02/input.txt'))

function part2(path: string) {
  const input = readFileSync(path, 'utf-8')
    .split('\n')
    .map((line) => {
      const game = parseInt(line.split(':')[0].split(' ')[1])
      const sets = line
        .split(':')[1]
        .split(';')
        .map((set) => set.split(',').map((cube) => ({ color: cube.trim().split(' ')[1], amount: parseInt(cube.trim().split(' ')[0]) })))
      return { game, sets }
    })

  let sum = 0
  for (const { game, sets } of input) {
    let maxRed = 0,
      maxGreen = 0,
      maxBlue = 0
    for (const set of sets) {
      let red = 0,
        green = 0,
        blue = 0
      for (const { color, amount } of set) {
        if (color === 'red') red += amount
        else if (color === 'green') green += amount
        else if (color === 'blue') blue += amount
      }
      maxRed = Math.max(maxRed, red)
      maxGreen = Math.max(maxGreen, green)
      maxBlue = Math.max(maxBlue, blue)
    }
    sum += maxRed * maxGreen * maxBlue
  }

  return sum
}

console.log(part2('./2023/02/example.txt'))
console.log(part2('./2023/02/input.txt'))
