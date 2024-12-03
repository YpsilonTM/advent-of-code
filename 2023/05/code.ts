import { readFileSync } from 'fs'

const input = readFileSync('./example.txt', 'utf-8')

// get everything on the line with'seeds:
const seeds = input
  .match(/seeds: (.*)/)?.[1]
  .split(' ')
  .map(Number)

// Get all the lines after seed-to-soil map: until the first empty line
const soilMap = input
  .trim()
  .replace('\r', '')
  .match(/seed-to-soil map:\n(.*?)\n\n/gm)?.[1]
  .split('\n')

console.log(soilMap)
