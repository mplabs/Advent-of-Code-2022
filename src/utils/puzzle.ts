import { readFile } from 'fs/promises'

export async function getPuzzle(puzzleName: string) {
  const puzzlePath = `src/days/${puzzleName}`
  const input = await readFile(`${puzzlePath}/input.txt`, 'utf8').catch((e) => {
    console.error(`Could not read input for puzzle ${puzzleName}`, e)
    process.exit(1)
  })

  const { default: puzzleClass } = await import(`../days/${puzzleName}/Puzzle`)
  const puzzle = new puzzleClass()
  puzzle.input = input

  return puzzle
}

export abstract class AbstractPuzzle {
  protected _input: string = ''
  set input(input: string) {
    this._input = input
  }
  get input(): string {
    return this._input
  }

  public abstract solveFirst(): string | number
}
