import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const handToValue = {
  rock: 1,
  paper: 2,
  scissors: 3,
}

const handAssociation = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
}

const outcomeToValue = {
  win: 6,
  lose: 0,
  draw: 3,
}

const getOutcome = (theirs, mine) => {
  if (theirs === mine) return "draw"
  switch (theirs) {
    case "rock": {
      switch (mine) {
        case "paper": {
          return "win"
        }
        case "scissors": {
          return "lose"
        }
      }
    }
    case "paper": {
      switch (mine) {
        case "rock": {
          return "lose"
        }
        case "scissors": {
          return "win"
        }
      }
    }
    case "scissors": {
      switch (mine) {
        case "rock": {
          return "win"
        }
        case "paper": {
          return "lose"
        }
      }
    }
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const lines = input.split("\n")
  let totalPoints = 0
  for (const line of lines) {
    const [theirHand, myHand] = line.split(" ")
    const [theirs, mine] = [handAssociation[theirHand], handAssociation[myHand]]
    const outcome = getOutcome(theirs, mine)
    const outcomePoints = outcomeToValue[outcome]
    const handPoints = handToValue[mine]
    totalPoints += outcomePoints + handPoints
  }
  return totalPoints
}

const getOutComePart2 = (yourHand) => {
  switch (yourHand) {
    case "X":
      return "lose"
    case "Y":
      return "draw"
    case "Z":
      return "win"
  }
}

const getWin = (theirHand) => {
  switch (theirHand) {
    case "A":
      return "Y"
    case "B":
      return "Z"
    case "C":
      return "X"
  }
}
const getLose = (theirHand) => {
  switch (theirHand) {
    case "A":
      return "Z"
    case "B":
      return "X"
    case "C":
      return "Y"
  }
}

/**
 * X means you need to lose
 * Y means you need to end the round in a draw
 * Z means you need to win
 */
const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const lines = input.split("\n")
  let totalPoints = 0
  for (const line of lines) {
    const [theirHand, myHand] = line.split(" ")
    const [theirs, mine] = [handAssociation[theirHand], handAssociation[myHand]]
    const outcome = getOutComePart2(myHand)

    switch (outcome) {
      case "draw": {
        totalPoints += 3 + handToValue[theirs]
        break
      }
      case "lose": {
        const losingHand = handAssociation[getLose(theirHand)]
        totalPoints += 0 + handToValue[losingHand]
        break
      }
      case "win": {
        const winHand = handAssociation[getWin(theirHand)]
        totalPoints += 6 + handToValue[winHand]
        break
      }
    }
  }
  return totalPoints
}

run({
  part1: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
