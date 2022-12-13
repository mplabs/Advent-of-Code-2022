import { Puzzle } from '@utils/puzzle'

export default class Day8 extends Puzzle {
  private _getAdjacent(
    trees: number[][],
    row: number,
    col: number
  ): { [k: string]: number[] } {
    return {
      left: trees[row].slice(0, col),
      right: trees[row].slice(col + 1),
      top: trees.map((row) => row[col]).slice(0, row),
      bottom: trees.map((row) => row[col]).slice(row + 1),
    }
  }

  solveFirst(): number {
    const trees = this.input
      .split('\n')
      .map((line) => line.split('').map(Number))
    let edges = 2 * (trees[0].length + trees.length - 2)

    for (let row = 1; row < trees.length - 1; row++) {
      for (let col = 1; col < trees[row].length - 1; col++) {
        const current = trees[row][col]
        const { left, right, top, bottom } = this._getAdjacent(trees, row, col)

        if (Math.max(...left) < current) {
          edges++
        } else if (Math.max(...right) < current) {
          edges++
        } else if (Math.max(...top) < current) {
          edges++
        } else if (Math.max(...bottom) < current) {
          edges++
        }
      }
    }

    return edges
  }

  solveSecond(): number {
    const trees = this.input
      .split('\n')
      .map((line) => line.split('').map(Number))
    let scenicScores: number[] = []

    for (let row = 1; row < trees.length - 1; row++) {
      for (let col = 1; col < trees[row].length - 1; col++) {
        const current = trees[row][col]
        const { left, right, top, bottom } = this._getAdjacent(trees, row, col)

        const scores = [
          getBlocked(left.reverse(), current),
          getBlocked(right, current),
          getBlocked(top.reverse(), current),
          getBlocked(bottom, current),
        ]
          .filter((score) => score > 0)
          .reduce((acc, score) => acc * score, 1)

        scenicScores = [...scenicScores, scores]
      }
    }

    return Math.max(...scenicScores)

    //////////////////////////////

    function getBlocked(treeLine: number[], current: number): number {
      const idx = treeLine.findIndex((tree) => tree >= current)

      if (idx === -1) {
        return treeLine.length
      }

      return idx + 1
    }
  }
}
