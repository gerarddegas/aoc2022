import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const solve1 = (input, sizeLimit) => {
  const chars = new Set()
  let left = 0
  for (let right = 0; right < input.length; right++) {
    const char = input.charAt(right)
    // move left until you hit the same char as right
    while (chars.has(char)) {
      chars.delete(input.charAt(left))
      left += 1
    }
    chars.add(char)
    if (chars.size === sizeLimit) return right + 1
  }
  throw new Error("NEVER FOUND 4 UNIQUE CHARS")
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return solve1(input, 4)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return solve1(input, 14)
}

run({
  part1: {
    tests: [
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 10,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 26,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
