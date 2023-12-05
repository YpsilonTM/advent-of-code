import fs from 'fs/promises'

async function main() {
  const scratchtickets = await fs.readFile('./2023/04/input.txt', 'utf-8')
  const step1 = scratchtickets.split('\r\n')
  const step2 = step1.map((ticket) => ticket.split(':')[1].split('|'))
  const step3 = step2.map((ticket) => {
    const first = ticket[0].split(' ')
    const second = ticket[1].split(' ')
    const matches = first.filter((value) => second.includes(value)).filter((value) => value)
    // 1 = 1 point , 2 = 2 points, 3 = 4 points, 4 = 8 points , 5 = 16 points , 6 = 32 points get a equation for this
    const score = matches.length === 0 ? 0 : Math.pow(2, matches.length - 1)
    return score
  })
  const step4 = step3.reduce((acc, v) => acc + v)
  console.log(step4)
}

main()
