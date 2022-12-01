import { getPuzzle } from '@utils/puzzle'

const [dayToSolve] = process.argv.slice(2)

if (!dayToSolve) {
  console.error(`Usage: npm start <day>`)
  process.exit(1)
}

;(async () => {
  const puzzle = await getPuzzle(dayToSolve)
  console.log(puzzle.solveFirst())
  console.log(puzzle.solveSecond())
})()
