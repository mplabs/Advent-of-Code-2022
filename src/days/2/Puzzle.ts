import { AbstractPuzzle } from '@utils/puzzle'

export default class Day2 extends AbstractPuzzle {
  private solve(matrix: number[][]): number {
    return this.input
      .split('\n')
      .map(round => round.split(' '))
      .map(([elf, shape]) => [elf.charCodeAt(0) - 65, shape.charCodeAt(0) - 88])
      .map(([elf, shape]) => matrix[elf][shape])
      .reduce((a, b) => a + b, 0)
  }

  public solveFirst(): number {
    return this.solve([
      [4,8,3],
      [1,5,9],
      [7,2,6],
    ])
  }

  public solveSecond(): number {
    return this.solve([
      [3,4,8],
      [1,5,9],
      [2,6,7],
    ])
  }
}
