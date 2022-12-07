import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const sortByEarlier = (shifts) => {
  return shifts
    .split(",")
    .map((_shifts) => _shifts.split("-").map((s) => Number(s)))
    .sort((a, b) => a[0] - b[0])
}

const doesOverlap = (firstStart, firstEnd, secondStart, secondEnd) => {
  if (firstStart === secondStart) {
    return true
  }
  if (firstStart < secondStart) {
    return firstEnd >= secondEnd
  } else {
    return secondEnd >= firstEnd
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split("\n")
  let totalOverlap = 0
  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    const [[firstStart, firstEnd], [secondStart, secondEnd]] =
      sortByEarlier(line)
    totalOverlap += doesOverlap(firstStart, firstEnd, secondStart, secondEnd)
      ? 1
      : 0
  }
  return totalOverlap
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split("\n")
  let totalOverlap = 0
  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    const [[firstStart, firstEnd], [secondStart, secondEnd]] =
      sortByEarlier(line)
    if (firstEnd >= secondStart) {
      totalOverlap += 1
    }
  }
  return totalOverlap
}

run({
  part1: {
    tests: [
      {
        input: `
        1-2,2-3
        `,
        expected: 1,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
