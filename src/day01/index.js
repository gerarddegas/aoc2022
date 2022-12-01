import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const sumCalories = (input) => {
  const split = input.split("\n")

  const result = []
  let sum = 0
  for (const amt of split) {
    if (amt) {
      sum += Number(amt)
    } else {
      result.push(sum)
      sum = 0
    }
  }
  if (sum) {
    result.push(sum)
  }
  return result
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const calories = sumCalories(input)
  calories.sort((a, b) => a - b)
  return calories.at(-1)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const calories = sumCalories(input)

  calories.sort((a, b) => a - b)
  return calories.at(-1) + calories.at(-2) + calories.at(-3)
}

run({
  part1: {
    tests: [
      {
        input: `
              1000
      2000
      3000

      4000

      5000
      6000

      7000
      8000
      9000

      10000
              `,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
              1000
      2000
      3000

      4000

      5000
      6000

      7000
      8000
      9000

      10000
              `,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
