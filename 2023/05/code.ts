import { readFileSync } from 'fs'
import { join } from 'path'

const input = readFileSync(join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })

function mapResult(input: number, map: number[][]) {
  let soil = input
  map.forEach(([soilStart, seedStart, rangeLenght]) => {
    const seedEnd = seedStart + rangeLenght
    if (input >= seedStart && input < seedEnd) {
      soil = soilStart + (input - seedStart)
    }
  })
  return soil
}

const instructions = input.split('\r\n\r\n').map((line) =>
  line
    .split(':')[1]
    .trim()
    .split('\r\n')
    .map((row) => row.split(' ').map((val) => parseInt(val)))
)

const seeds = instructions[0][0]

const results = seeds.map((seed) => {
  const soil = mapResult(seed, instructions[1])
  const fertilizer = mapResult(soil, instructions[2])
  const water = mapResult(fertilizer, instructions[3])
  const light = mapResult(water, instructions[4])
  const temperature = mapResult(light, instructions[5])
  const humidity = mapResult(temperature, instructions[6])
  const location = mapResult(humidity, instructions[7])

  return { seed, soil, fertilizer, water, light, temperature, humidity, location }
})

const lowestLocation = results.reduce((acc, curr) => (curr.location < acc.location ? curr : acc))

console.log(lowestLocation.location)
