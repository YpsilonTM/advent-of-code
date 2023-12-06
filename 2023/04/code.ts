import { readFileSync } from 'fs'

const input = readFileSync('./2023/04/input.txt', 'utf-8')

const tickets = input
  .trim()
  .split('\n')
  .map((line) =>
    line
      .trim()
      .substring(line.indexOf(':') + 1)
      .split('|')
      .map((numbers) =>
        numbers
          .trim()
          .split(' ')
          .filter((val) => val)
      )
  )
  .map(([playnumbers, winningnumbers]) => {
    return { count: 1, wins: winningnumbers.filter((number) => playnumbers.includes(number)).length }
  })
  .map(({ count, wins }, index, cards) => {
    for (let card = index + wins; card > index; card--) {
      cards[card].count += count
    }
    return count
  })
  .reduce((accumulator, value) => accumulator + value)

console.log(tickets)

// const extraCards: number[] = []

// const scratchtickets = tickets.map((ticket) => {
//   const [cardname, numbers] = ticket.trim().split(':')
//   const ticketnumber = Number(cardname.trim().split(' ')[1])
//   const numbersplit = numbers.trim().split('|')
//   const playnumbers = numbersplit[0]
//     .trim()
//     .split(' ')
//     .filter((val) => val)
//   const winningnumbers = numbersplit[1]
//     .trim()
//     .split(' ')
//     .filter((val) => val)

//   let winningNumbers = 0
//   playnumbers.forEach((number) => {
//     if (winningnumbers.includes(number)) {
//       winningNumbers++
//     }
//   })

//   for (let i = 1; i <= winningNumbers; i++) {
//     extraCards.push(ticketnumber + i)
//   }

//   const score = winningNumbers == 0 ? 0 : Math.pow(2, winningNumbers - 1)
//   return { ticketnumber, cardname, playnumbers, winningnumbers, winningNumbers, score }
// })

// // console.log(scratchtickets)
// console.log(extraCards)

// const totalscore = scratchtickets.reduce((acc, ticket) => acc + ticket.score, 0)
// // console.log(totalscore)
