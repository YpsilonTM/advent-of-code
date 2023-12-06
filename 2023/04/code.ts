import { readFileSync } from 'fs'

const input = readFileSync('./2023/04/input.txt', 'utf-8')

const tickets = input
  .trim()
  .split('\n')
  .map((line) => line.trim())

const scratchtickets = tickets.map((ticket) => {
  const [cardname, numbers] = ticket.trim().split(':')
  const numbersplit = numbers.trim().split('|')
  const playnumbers = numbersplit[0]
    .trim()
    .split(' ')
    .filter((val) => val)
  const winningnumbers = numbersplit[1]
    .trim()
    .split(' ')
    .filter((val) => val)

  let winningNumbers = 0
  playnumbers.forEach((number) => {
    if (winningnumbers.includes(number)) {
      winningNumbers++
    }
  })

  const score = winningNumbers == 0 ? 0 : Math.pow(2, winningNumbers - 1)
  return { cardname, playnumbers, winningnumbers, winningNumbers, score }
})

const totalscore = scratchtickets.reduce((acc, ticket) => acc + ticket.score, 0)
console.log(totalscore)
