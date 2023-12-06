import { readFileSync } from 'fs'

const input = readFileSync('./2023/05/example.txt', 'utf-8')

type Mapping = { [key: number]: number }

function parseMapping(line: string): Mapping {
  const mapping: Mapping = {}
  const linesplit = line.trim().split(' ')

  if (linesplit[1] === 'map:') {
    console.log(linesplit)
  }
  return mapping
}

const seeds = input
  .split('\n')[0]
  .split(' ')
  .map(Number)
  .filter((val) => val)

const mappings = input.split('\n').slice(1).map(parseMapping)

// Find the minimum location
// const minLocation = findMinLocation(seeds, mappings)
console.log(mappings)
