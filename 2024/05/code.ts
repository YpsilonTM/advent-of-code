import { readFileSync } from 'fs'
import { join } from 'path'

const data = readFileSync(join(__dirname, 'example.txt'), { encoding: 'utf-8', flag: 'r' })

// Safety protocols clearly indicate that new pages for the safety manuals must be printed in a very specific order. The notation X|Y means that if both page number X and page number Y are to be produced as part of an update, page number X must be printed at some point before page number Y. The Elf has for you both the page ordering rules and the pages to produce in each update (your puzzle input), but can't figure out whether each update has the pages in the right order.

const [rawOrders, rawUpdates] = data.split('\r\n\r\n')
const orders = rawOrders.split('\r\n').map((order) => order.split('|'))
const updates = rawUpdates.split('\r\n').map((update) => update.split(','))

function part1() {
    updates.forEach((update) => {})
}

function part2() {}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
