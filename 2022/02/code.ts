import { readFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })
const rounds = data.split('\r\n').map((line) => line.split(' '))

// Opponent: A = Rock, B = Paper, C = Scissors
// Response: X = Rock, Y = Paper, Z = Scissors
// Score: Rock = 1, Paper = 2, Scissors = 3, Lose = 0, Draw = 3, Win = 6

const strategy = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3,
  },
}

const shapePoints = {
  X: 1,
  Y: 2,
  Z: 3,
}

function part1() {
  const scores = rounds.map((round) => {
    const [opponent, response] = round
    // @ts-ignore
    return strategy[opponent][response] + shapePoints[response]
  })
  return scores.reduce((acc, score) => acc + score, 0)
}

function part2() {}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
