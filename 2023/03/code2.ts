import { readFileSync } from 'fs'

function isDigit(char: string) {
  const regex = new RegExp(/[0-9]/)
  return regex.test(char)
}

const input = readFileSync('./2023/03/input.txt', 'utf-8')
const grid = input
  .trim()
  .split('\n')
  .map((line) => line.trim().split(''))

const adjacentPositions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

let gearXY = new Array<{ x: number; y: number }>()

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] == '*') {
      gearXY.push({ x: y, y: x })
    }
  }
}

console.log(gearXY)

let result = 0

for (const coords of gearXY) {
  const partnumbers = new Map<string, { x: number; y: number; length: number }>()

  for (const [adjX, adjY] of adjacentPositions) {
    let target = { x: coords.x + adjX, y: coords.y + adjY }

    // is in bounds
    if (target.x < 0 || target.x >= grid.length || target.y < 0 || target.y >= grid[target.x].length) {
      continue
    }

    // if number add to map
    if (isDigit(grid[target.x][target.y])) {
      let firstDigit = target.y
      let lastDigit = target.y

      while (firstDigit > 0 && isDigit(grid[target.x][firstDigit - 1])) {
        firstDigit--
      }

      while (lastDigit < grid[target.x].length - 1 && isDigit(grid[target.x][lastDigit + 1])) {
        lastDigit++
      }

      partnumbers.set(`${target.x},${firstDigit}`, {
        x: target.x,
        y: firstDigit,
        length: lastDigit - firstDigit + 1,
      })
    }
  }
  if (partnumbers.size == 2) {
    let gearRatio = 1
    partnumbers.forEach((part) => {
      gearRatio *= parseInt(grid[part.x].slice(part.y, part.y + part.length).join(''))
    })
    result += gearRatio
  }
}

console.log(result)
