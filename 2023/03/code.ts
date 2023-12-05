import { readFileSync } from 'fs'

function isCharNumber(char: string) {
  const regex = new RegExp(/[0-9]/)
  return regex.test(char)
}

function isSymbol(char: string) {
  const regex = new RegExp(/[^0-9.]/)
  return regex.test(char)
}

function hasNumberAdjacent(grid: string[][], x: number, y: number) {
  const adjacent = [grid[y - 1]?.[x - 1], grid[y - 1]?.[x], grid[y - 1]?.[x + 1], grid[y]?.[x - 1], grid[y]?.[x + 1], grid[y + 1]?.[x - 1], grid[y + 1]?.[x], grid[y + 1]?.[x + 1]]
  const hasNumberAdjacant = adjacent.some((cell) => isCharNumber(cell))
  return hasNumberAdjacant
}

function getAllFullNumbersAdjacent(grid: string[][], x: number, y: number) {
  let number: any[] = []
  const adjacent = [grid[y - 1]?.[x - 1], grid[y - 1]?.[x], grid[y - 1]?.[x + 1], grid[y]?.[x - 1], grid[y]?.[x + 1], grid[y + 1]?.[x - 1], grid[y + 1]?.[x], grid[y + 1]?.[x + 1]]
  adjacent.forEach((cell) => {})
  return number
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
      if (isSymbol(current) && hasNumberAdjacent(grid, x, y)) {
        console.log(getAllFullNumbersAdjacent(grid, x, y))
      }
    }
  }

  return sum
}

console.log(part1('./2023/03/example.txt'))
