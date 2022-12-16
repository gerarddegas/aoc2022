import run from "aocrunner"

let stack = [[], []] // create empty array of arrays
let counter = 1 // rather than 0
let first = true // only needed for first row

const parseInput = (rawInput) => rawInput

function createStack(input) {
  const res = input.split(/\r?\n/)
  // console.log("🚀  file: index.js:11  createStack  res", res)

  res.forEach((line) => {
    counter = 1 // reset counter
    if (line[0] !== "m") {
      // ignore movements lines
      for (let c = 0; c < line.length; c += 4) {
        // c+=4 each column is 4 characters wide
        if (line[c + 1] !== " " && isNaN(Number(line[c + 1]))) {
          // ignore empty and numbered lines
          stack[counter].push(line[c + 1]) // add crate
        }
        if (first) stack.push([]) // create a new empty column
        counter++
      }
      !first
    }
  })
  let stackFiltered = stack.filter((e) => {
    // remove empty crates
    return e != null && e != "" && e != []
  })
  return stackFiltered
}

let crane = []

function movements(stack, input) {
  let result = ""
  const res = input.split(/\r?\n/)
  // console.log("🚀  file: index.js:39  movements  res", res)
  res.forEach((line) => {
    if (line[0] == "m") {
      // example: move 1 from 4 to 1
      let details = line.split(" ")
      let quantity = details[1] // how many crates to move
      let from = details[3] // from where
      let to = details[5] // to where
      for (let i = 0; i < quantity; i++) {
        crane = stack[from - 1].shift() // remove from top of current column
        stack[to - 1].unshift(crane) // add to top of new column
      }
    }
  })
  for (let i = 0; i < stack.length; i++) {
    // get top crate from each column
    result += stack[i].shift()
  }
  console.log("Answer", result)
  return result
}

function part1(rawInput) {
  const inp = parseInput(rawInput)
  return movements(createStack(inp), inp)
}

let crate = ""
let crane2 = ""
let result2 = ""

let count = 5
function movements2(stack, input) {
  const datas = input.split("\n\n")

  const groupByFour = (array) => {
    const result = []
    for (let i = 0; i < array.length; i += 4) {
      result.push(array.slice(i, i + 4))
    }
    return result
  }

  let table = datas[0].split("\n")
  table.pop()

  table = table
    .map((a) => a.split(""))
    .map((a) => groupByFour(a))
    .map((a) => a.map((b) => b[1]))
    .reverse()
  table = table[0].map((_, colIndex) => table.map((row) => row[colIndex])) // Transposing a 2D-array: https://stackoverflow.com/a/17428705
  table = table.map((a) => a.filter((b) => b !== " "))

  const moveRegex = /move (\d+) from (\d+) to (\d+)/
  const moves = datas[1]
    .trim()
    .split("\n")
    .map((a) => moveRegex.exec(a))
    .map((a) => [a[1], a[2], a[3]].map(Number))

  // part one
  let partOne = JSON.parse(JSON.stringify(table))

  moves.forEach((a) => {
    const [times, from, to] = a
    for (let i = 0; i < times; i++) {
      partOne[to - 1].push(partOne[from - 1].pop())
    }
  })
  // console.log(partOne.map((a) => a[a.length - 1]).join(""))

  // part two
  let partTwo = JSON.parse(JSON.stringify(table))

  moves.forEach((a) => {
    const [times, from, to] = a
    const queue = []
    for (let i = 0; i < times; i++) {
      queue.push(partTwo[from - 1].pop())
    }
    queue.reverse().forEach((a) => partTwo[to - 1].push(a))
  })
  const two = partTwo.map((a) => a[a.length - 1]).join("")
  console.log("two:", two)
  return two
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return movements2(createStack(input), input)
}

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   move 1 from 2 to 1
      //   move 3 from 1 to 3
      //   move 2 from 2 to 1
      //   move 1 from 1 to 2
      //   `,
      //   expected: "CMZ",
      // },
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
  onlyTests: false,
})
