// When below 0, subtract from 100
// File are ./example.txt and ./input.txt

// ...existing code...

const input = await Bun.file('./2025/01/input.txt')
  .text()
  .then((text) =>
    text
      .trim()
      .split('\n')
      .map((line) => line.trim())
  )

let position = 50
let timesZero = 0

for (const rotation of input) {
  const direction = rotation[0]
  const distance = parseInt(rotation.slice(1), 10)

  if (direction === 'L') {
    position = (position - distance + 100) % 100
  } else if (direction === 'R') {
    position = (position + distance) % 100
  }

  if (position === 0) timesZero++
}

console.log('Result:', timesZero)
export {}
