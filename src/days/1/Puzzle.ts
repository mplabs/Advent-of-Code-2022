import { Puzzle } from '@utils/puzzle'

export default class Day1 extends Puzzle {
  private aggregate(): number[] {
    const puzzleInput = this.input.split('\n')
    const aggregate: number[] = [0]
    
    let i = 0
    for (const line of puzzleInput) {
      if (line === '') {
        i++
        aggregate[i] = 0
        continue
      }
      aggregate[i] += Number(line)
    }

    return aggregate
  }

  public solveFirst(): number {
    const calories = this.aggregate()
    return calories.sort((a, b) => a - b)[calories.length - 1]
  }

  public solveSecond(): number {
    const calories = this.aggregate()
    return calories
      .sort((a, b) => a - b)
      .slice(-3)
      .reduce((a, b) => a + b, 0)
  }
}
