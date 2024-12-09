import { readFileSync } from 'fs'
import { join } from 'path'

function getInput(example: boolean) {
  const file = example ? 'example.txt' : 'input.txt'
  const data = readFileSync(join(__dirname, file), { encoding: 'utf-8', flag: 'r' })
  const lines = data.split('\n')

  return lines.map((line) => line.split(''))
}

const grid = getInput(false)

const signalRegex = new RegExp(/[a-zA-Z0-9]/)
type Signal = { x: number; y: number; signal: string }
type SignalPair = [Signal, Signal]

function printGrid() {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''))
  }
}

function isInsideGrid(x: number, y: number) {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length
}

function findSignals() {
  const signals: Signal[] = []

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const val = grid[i][j]
      if (signalRegex.test(val)) {
        signals.push({ x: i, y: j, signal: val })
      }
    }
  }
  return signals
}

function findSignalPairs(signals: Signal[]) {
  const signalPairs: SignalPair[] = []

  for (let i = 0; i < signals.length; i++) {
    for (let j = i + 1; j < signals.length; j++) {
      if (signals[i].signal === signals[j].signal) {
        signalPairs.push([signals[i], signals[j]])
      }
    }
  }
  return signalPairs
}

function findAntiNodes(SignalPairs: SignalPair[]) {
  const antiNodes = []

  for (let i = 0; i < SignalPairs.length; i++) {
    const [signal1, signal2] = SignalPairs[i]
    const xDiff = signal1.x - signal2.x
    const yDiff = signal1.y - signal2.y

    const x1 = signal1.x + xDiff
    const y1 = signal1.y + yDiff

    const x2 = signal2.x - xDiff
    const y2 = signal2.y - yDiff

    if (isInsideGrid(x1, y1) && grid[x1][y1] === '.') {
      //   grid[x1][y1] = '#'
      antiNodes.push({ x: x1, y: y1 })
    }

    if (isInsideGrid(x2, y2) && grid[x2][y2] === '.') {
      //   grid[x2][y2] = '#'
      antiNodes.push({ x: x2, y: y2 })
    }
  }
  return antiNodes
}

function part1() {
  const signals = findSignals()
  const signalPairs = findSignalPairs(signals)
  const antiNodes = findAntiNodes(signalPairs)

  printGrid()
  return antiNodes.length
}

function part2() {}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
