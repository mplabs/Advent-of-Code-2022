import { distinct } from '@utils/array'
import { AbstractPuzzle } from '@utils/puzzle'

export default class Day6 extends AbstractPuzzle {
  solveFirst(): number {
    for (let i = 4; i < this.input.length; i++) {
      const window = Array.from(this.input.substring(i - 4, i))
      if (window.filter(distinct).length === 4) {
        return i
      }
    }
    
    throw new Error(`Could not find start-of-packet marker`)
  }

  solveSecond(): number {
    for (let i = 14; i < this.input.length; i++) {
      const window = Array.from(this.input.substring(i - 14, i))
      if (window.filter(distinct).length === 14) {
        return i
      }
    }
    
    throw new Error(`Could not find start-of-message marker`)
  }
}
