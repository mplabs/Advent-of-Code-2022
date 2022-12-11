import { AbstractPuzzle } from '@utils/puzzle'

export default class Day9 extends AbstractPuzzle {
  solveFirst(): number {
    const state = [1]

    this.input.split('\n').forEach((line) => {
      const [op, arg] = line.split(' ')
      switch (op) {
        case 'noop':
          state.push(state.slice(-1)[0])
          return
        case 'addx':
          state.push(state.slice(-1)[0], state.slice(-1)[0] + Number(arg))
          return
        default:
          throw new Error(`Unknown op ${op}`)
      }
    })

    const valueAt = (idx: number) => state[idx - 1] * idx

    return [20, 60, 100, 140, 180, 220].reduce(
      (acc, idx) => acc + valueAt(idx),
      0
    )
  }

  solveSecond(): string {
    const CRT = new Array(6).fill(new Array(40).fill('.'))

    this.input.split('\n').forEach((line) => {
      // TODO      
    })

    return CRT.map((row) => row.join('')).join('\n')
  }
}
