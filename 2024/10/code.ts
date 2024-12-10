import { readFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })
const map = data.split('\n').map((line) => line.trim().split('').map(Number))

const directions = [
  [1, 0], // right
  [0, 1], // down
  [-1, 0], // left
  [0, -1], // up
]

function findTrailHeads() {
  const trailHeads = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 0) {
        trailHeads.push([y, x])
      }
    }
  }
  return trailHeads
}

function isValidStep(currentHeight: number, nextHeight: number): boolean {
  return nextHeight === currentHeight + 1
}

function findReachableNines(y: number, x: number): number {
  const queue = [[y, x]]
  const visited = new Set<string>()
  visited.add(`${y},${x}`)
  let count = 0

  while (queue.length > 0) {
    const [cy, cx] = queue.shift()!
    for (const [dy, dx] of directions) {
      const ny = cy + dy
      const nx = cx + dx
      if (ny >= 0 && ny < map.length && nx >= 0 && nx < map[0].length) {
        const nextHeight = map[ny][nx]
        if (!visited.has(`${ny},${nx}`) && isValidStep(map[cy][cx], nextHeight)) {
          if (nextHeight === 9) {
            count++
          }
          queue.push([ny, nx])
          visited.add(`${ny},${nx}`)
        }
      }
    }
  }

  return count
}

function part1() {
  const trailHeads = findTrailHeads()
  const scores = trailHeads.map(([y, x]) => findReachableNines(y, x))
  return scores.reduce((acc, score) => acc + score, 0)
}

function part2() {}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
