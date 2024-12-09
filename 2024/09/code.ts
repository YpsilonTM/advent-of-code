import { readFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'input.txt'), { encoding: 'utf-8', flag: 'r' })

function getDataArray() {
  const diskdata = data.match(/.{1,2}/g)?.map((set, i) => ({
    diskId: i,
    size: Number(set[0]) || 0,
    free: Number(set[1]) || 0,
  }))

  return diskdata?.flatMap((disk) => [...Array(disk.size).fill(disk.diskId), ...Array(disk.free).fill(null)]) || []
}

function part1() {
  const dataArray = getDataArray()

  console.log(dataArray)

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i] === null) {
      for (let j = dataArray.length - 1; j > i; j--) {
        if (dataArray[j] !== null) {
          dataArray[i] = dataArray[j]
          dataArray[j] = null
          break
        }
      }
    }
  }

  return dataArray.reduce((acc, val, i) => (val === null ? acc : acc + i * Number(val)), 0)
}

function part2() {}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
