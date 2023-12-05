import fs from 'fs/promises'

async function main() {
  const allTickets = []
  const scratchtickets = await fs.readFile('./2023/04/input.txt', 'utf-8')
  const step1 = scratchtickets.split('\r\n')
  const step2 = step1.map((ticket) => ticket.split(':')[1].split('|'))
  const step3 = step2.map((ticket, index) => {
    const first = ticket[0].split(' ')
    const second = ticket[1].split(' ')
    const matches = first.filter((value) => second.includes(value)).filter((value) => value)
    matches.forEach((match, i) => {
      allTickets.push('ticket')
    })
  })
  console.log(allTickets)
}

main()
