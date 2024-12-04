import { readFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })
const lines = data.split('\n')
const grid = lines.map((line) => line.split(''))
const word = 'XMAS'

const directions = ['up', 'down', 'left', 'right', 'upleft', 'upright', 'downleft', 'downright'] as const
type Direction = (typeof directions)[number]

const directionOffsets: { [key in Direction]: [number, number] } = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
    upleft: [-1, -1],
    upright: [-1, 1],
    downleft: [1, -1],
    downright: [1, 1],
}

function isInBounds(grid: string[][], x: number, y: number): boolean {
    return y >= 0 && y < grid.length && x >= 0 && x < grid[y].length
}

function getDirection(grid: string[][], x: number, y: number, direction: Direction) {
    const [dy, dx] = directionOffsets[direction]
    const newY = y + dy
    const newX = x + dx
    if (isInBounds(grid, newX, newY)) {
        return grid[newY][newX]
    }
    return undefined
}

function part1() {
    let count = 0

    grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === word[0]) {
                for (const direction of directions) {
                    let currentX = x
                    let currentY = y
                    let currentWord = word[0]

                    while (currentWord.length < word.length) {
                        const next = getDirection(grid, currentX, currentY, direction)

                        if (next === undefined) {
                            break
                        }

                        currentWord += next
                        currentX += directionOffsets[direction][1]
                        currentY += directionOffsets[direction][0]
                    }

                    if (currentWord === word) {
                        count++
                    }
                }
            }
        })
    })

    return count
}

function part2() {}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
