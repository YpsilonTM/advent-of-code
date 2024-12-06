import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'input.txt'), {
  encoding: 'utf-8',
  flag: 'r',
})
const grid = data.split('\n').map((row) => row.trim().split(''))

function part1() {
  const map = new MapInstance(grid)
  return map.start()
}

function part2() {}

console.log('Part 1:', part1())
console.log('Part 2:', part2())

class MapInstance {
  directionLegend = {
    '^': { x: 0, y: -1, description: 'up' },
    '>': { x: 1, y: 0, description: 'right' },
    'v': { x: 0, y: 1, description: 'down' },
    '<': { x: -1, y: 0, description: 'left' },
  } as const

  constructor(private grid: string[][]) {
    this.grid = grid
  }

  start() {
    const [startX, startY] = this.findStart()
    let [x, y, value] = [startX, startY, this.grid[startY][startX]]

    while (true) {
      const [nextX, nextY] = this.getNext(x, y)
      if (!this.isInGrid(nextX, nextY)) {
        console.log('Out of grid')
        grid[y][x] = 'X'
        break
      } else if (this.isEmpty(nextX, nextY)) {
        break
      } else if (this.isBlocked(nextX, nextY) && this.isDirection(value)) {
        const rightDirection = this.getRightRotateOfDirection(value)
        const { x: dx, y: dy } = this.directionLegend[rightDirection]
        this.move(x, y, x + dx, y + dy, rightDirection)
        ;[x, y, value] = [x + dx, y + dy, rightDirection]
      } else {
        this.move(x, y, nextX, nextY)
        ;[x, y] = [nextX, nextY]
      }
    }
    writeFileSync(join(__dirname, 'output.txt'), grid.map((row) => row.join('')).join('\n'))
    return this.countValues('X')
  }

  findStart(): [number, number] {
    let [startX, startY] = [0, 0]
    this.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (this.isDirection(cell)) {
          ;[startX, startY] = [x, y]
        }
      })
    })
    return [startX, startY]
  }

  countValues(value: string) {
    return this.grid.flat().filter((cell) => cell === value).length
  }

  move(oldX: number, oldY: number, newX: number, newY: number, value?: string) {
    const currentValue = this.grid[oldY][oldX]
    this.grid[oldY][oldX] = 'X'
    this.grid[newY][newX] = value || currentValue
  }

  getNext(x: number, y: number) {
    const cell = this.grid[y][x]
    if (this.isDirection(cell)) {
      const { x: dx, y: dy } = this.directionLegend[cell]
      return [x + dx, y + dy]
    }
    return [x, y]
  }

  isBlocked(x: number, y: number) {
    return this.grid[y][x] === '#'
  }

  isEmpty(x: number, y: number) {
    return !this.grid[y][x]
  }

  isDirection(cell: string): cell is keyof typeof this.directionLegend {
    return cell in this.directionLegend
  }

  getRightRotateOfDirection(direction: keyof typeof this.directionLegend) {
    const directions = Object.keys(this.directionLegend) as (keyof typeof this.directionLegend)[]
    const currentIndex = directions.indexOf(direction)
    const nextDirectionIndex = (currentIndex + 1) % directions.length
    return directions[nextDirectionIndex]
  }

  isInGrid(x: number, y: number) {
    return x >= 0 && x < this.grid[0].length && y >= 0 && y < this.grid.length
  }
}
