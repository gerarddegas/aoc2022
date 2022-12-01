import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const main = (firstNum, secondNum) => {
  return firstNum + secondNum
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  console.log("input", input)

  return main(2, 3)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      {
        input: `1`,
        expected: 4,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
