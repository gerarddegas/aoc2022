import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const getHalf = (input) => {
  const mid = Math.floor(input.length / 2)
  const output = [input.substring(0, mid), input.substring(mid)]
  return output
}

const getShared = (firstHalf, secondHalf) => {
  for (const char of firstHalf) {
    if (secondHalf.includes(char)) {
      return char
    }
  }
  throw new Error("No shared character!")
}

const getShared2 = (group) => {
  const [first, second, third] = group
  for (const char of first) {
    if (second.includes(char) && third.includes(char)) {
      return char
    }
  }
  throw new Error("No shared character!")
}

const isLowerCase = (char) => char === char.toLowerCase()

const getCharNum = (char) => {
  let charCode = char.charCodeAt()
  if (isLowerCase(char)) {
    charCode -= 96
  } else {
    charCode -= 38
  }
  return charCode
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const lines = input.split("\n")
  const halves = lines.map((l) => getHalf(l))
  let totalSum = 0
  for (const [firstHalf, secondHalf] of halves) {
    const shared = getShared(firstHalf, secondHalf)
    totalSum += getCharNum(shared)
  }
  return totalSum
}

const makeGroupsOfThree = (input) => {
  const result = []
  let temp = []
  while (input.length) {
    temp.push(input.shift())
    if (temp.length === 3) {
      result.push(temp)
      temp = []
    }
  }
  if (temp.length) {
    result.push(temp)
  }
  return result
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const lines = input.split("\n")

  const groups = makeGroupsOfThree(lines)
  let sum = 0
  for (const group of groups) {
    const shared = getShared2(group)
    sum += getCharNum(shared)
  }
  return sum
}

run({
  part1: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
