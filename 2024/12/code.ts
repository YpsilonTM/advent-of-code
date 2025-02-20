import { readFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'example.txt'), { encoding: 'utf-8', flag: 'r' })
const gardenMap = data.split('\n').map((line) => line.trim().split(''))

type Map = string[][]

function loopMap(map: Map, cb: (x: number, y: number, value: string) => void) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      cb(x, y, map[y][x])
    }
  }
}

function part1() {
  // Go over map and group adjecaent plants together
  const areas = new Map<string, number[]>()

  loopMap(gardenMap, (x, y, value) => {
    if (areas.get(value) === undefined) {
      areas.set(value, [])
    } else {
      areas.get(value)?.push(x, y)
    }
  })
}

function part2() {}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
