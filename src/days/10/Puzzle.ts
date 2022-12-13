import { chunk } from '@utils/array'
import { Puzzle } from '@utils/puzzle'

export default class Day9 extends Puzzle {
  private getState(): number[] {
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

    return state
  }

  solveFirst(): number {
    const state = this.getState()

    const valueAt = (idx: number) => state[idx - 1] * idx

    return [20, 60, 100, 140, 180, 220].reduce(
      (acc, idx) => acc + valueAt(idx),
      0
    )
  }

  solveSecond(): string {
    const state = this.getState()

    const CRT = chunk(
      state.map((x, cycle) => (Math.abs(x - (cycle % 40)) <= 1 ? 'X' : ' ')),
      40
    )

    return CRT.map((row) => row.join('')).join('\n')
    // XXX  X  X  XX  X  X X  X XXX  XXXX X  X 
    // X  X X  X X  X X X  X  X X  X X    X X  
    // X  X X  X X  X XX   XXXX XXX  XXX  XX   
    // XXX  X  X XXXX X X  X  X X  X X    X X  
    // X X  X  X X  X X X  X  X X  X X    X X  
    // X  X  XX  X  X X  X X  X XXX  XXXX X  X 
  }
}
