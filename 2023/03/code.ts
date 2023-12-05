import { readFileSync } from 'fs'

function isCharNumber(char: string) {
  const regex = new RegExp(/[0-9]/)
  return regex.test(char)
}

function isSymbol(char: string) {
  const regex = new RegExp(/[^0-9.]/)
  return regex.test(char)
}

function hasSymbolAdjacant(grid: string[][], x: number, y: number) {
  // All adjacent positions also diagonal ones
  const adjacentPositions = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ]

  for (const [x, y] of adjacentPositions) {
    // Out of bounds y
    if (y < 0 || y >= grid.length) {
      continue
    }
    // Out of bounds x
    if (x < 0 || x >= grid[y].length) {
      continue
    }
    if (grid[y] && grid[y][x] && isSymbol(grid[y][x])) {
      return true
    }
  }
}

function part1(path: string) {
  const input = readFileSync(path, 'utf-8')
  const grid = input
    .trim()
    .split('\n')
    .map((line) => line.trim().split(''))

  let sum = 0

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const current = grid[y][x]
      if (isCharNumber(current)) {
        let number = current
        let hasAnAdjectantSymbol = false

        if (hasSymbolAdjacant(grid, x, y)) {
          hasAnAdjectantSymbol = true
        }

        while (isCharNumber(grid[y][x + 1])) {
          number += grid[y][x + 1]
          if (hasSymbolAdjacant(grid, x + 1, y)) {
            hasAnAdjectantSymbol = true
          }
          x++
        }

        console.log(parseInt(number))
        console.log(hasAnAdjectantSymbol)

        if (hasAnAdjectantSymbol) {
          sum += parseInt(number)
        }
      }
    }
  }

  return sum
}

console.log(part1('./2023/03/example.txt'))
console.log(part1('./2023/03/input.txt'))
